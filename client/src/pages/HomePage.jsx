import React, { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../Styles/Homepage.css";
import bannerImg from "../images/bannergold.jpg";
import banGoldImg from "../images/postergold.jpg";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  // getTotal count it will give us the total items or products available
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);

  // load more items it will load according to the no of times we are pressing button as each time button press page count increase
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]); // combine array
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    console.log(value);
    if (value) {
      all.push(id); // if value is true then push checkbox id into all
    } else {
      all = all.filter((c) => c !== id); // if value is false then remove it out
    }
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    //eslint-disable-next-line
  }, [checked, radio]);

  // set filterd products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layoutt title={"Goldy-Mart - Best Offers"}>
      {/* banner image  */}
      <div className="homeImages">
        {/* left  */}
        <div className="bangoldImg">
          <img src={banGoldImg} alt="advertisement" />
        </div>
        {/* right */}
        <div className="bannerImg">
          <img src={bannerImg} alt="bannerImg" />
        </div>
      </div>

      {/* swiper  */}
      {/* <SwiperHome /> */}
      <div className="row mt-3 container-fluid home-page">
        <div className="col-md-3 filters">
          {/* Filter via checked  */}
          <h4 className="text-center ">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* filter via price  */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio key={p._id} value={p.array}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/* clear all  */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()} // window option
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap align-items-center justify-content-center ">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
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
                    className="btn btn-info ms-1 mb-2 btn-details"
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

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Click here for Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default HomePage;
