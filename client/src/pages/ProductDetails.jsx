import React, { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import axios from "axios";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/ProductDetails.css";
const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  // getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //   get similar Products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layoutt>
      <div className="row container mt-2 product-details">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 product-details-info ">
          <h1 className="text-center">Product Details</h1>
          <h2>Category: {product.category?.name}</h2>
          <h5>Name: {product.name}</h5>
          <h6>Description: {product.description}</h6>
          <h6 className="price">
            Price:{" "}
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <button
            className="btn btn-success ms-1"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item Added to cart");

              // using local storage otherwise after refresh cart becomes vanish
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr />
      {/* //Similar category valae products but not above one  */}
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 30)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-success ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layoutt>
  );
};

export default ProductDetails;
