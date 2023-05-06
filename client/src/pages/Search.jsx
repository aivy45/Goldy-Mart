import React from "react";
import Layoutt from "../components/Layout/Layoutt";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import "../Styles/Search.css";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  return (
    <Layoutt title="Serach Results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Results`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2 searchImage" style={{ width: "18rem" }}>
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
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <button
                    className="btn btn-success btn-details"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1 "
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Item Added to cart");

                      // using local storage otherwise after refresh cart becomes vanish
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Search;
