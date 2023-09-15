import React, { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import "../Styles/CartPage.css";

const CartPage = () => {
  const [count, setCount] = useState(1);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(""); // dropIn require
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        total = total * count;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      // if id is equal then gives true
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1); // from index 1 item delete
      setCart(myCart);
      // As when we delete in local storage still it exists , so when we refresh the again it comes so in local storage also we are removing the items
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.error("Item removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway  token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      // as payment done then our cart must be empty
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layoutt>
      <div className=" mainCart">
        <div className="">
          <div className="cartUser">
            <h2 className="text-center">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h2>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  } `
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          {/* show cart items  */}
          <div className="col-md-8">
            <div className="row">
              {cart?.map((p) => (
                <div className="mb-2 p-3 card flex-row cartPageFlex ">
                  {/* left part  */}
                  <div className="col-md-3 cartItemsLeft" key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      height={"150px"}
                    />
                  </div>
                  {/* right part  */}
                  <div className="col-md-8 cartItemsRight">
                    <p>
                      <b>{p.name}</b>
                    </p>
                    <p>{p.description}</p>
                    <p>Price: {p.price}</p>
                    <div className="my-2 incDec">
                      <span
                        className="border p-1 my-1 "
                        onClick={() =>
                          count === 1 ? count : setCount(count - 1)
                        }
                      >
                        -
                      </span>
                      <span className="px-4">{count}</span>
                      <span
                        className="border p-1 my-1 "
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </span>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For checkout and card Payment  */}
          <div className="col-md-4 text-center">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3>Total : {totalPrice()}</h3>

            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart", // it means after login cart page will open
                        })
                      }
                    >
                      Please login to Checkout
                    </button>
                  )}
                </div>
              </>
            )}

            <div className="mt-2 cartPayment">
              {!clientToken || !cart?.length ? (
                <>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/")}
                  >
                    Add Items to Cart for payment
                  </button>
                </>
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    // disabled={!loading || !instance || !auth?.user?.address}
                    disabled={
                      !instance || !auth?.user?.address || !auth?.user?.name
                    }
                  >
                    {loading
                      ? "Processing ...."
                      : " Chose way and Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default CartPage;
