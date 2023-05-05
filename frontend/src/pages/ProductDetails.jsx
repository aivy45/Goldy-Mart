import React, { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
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
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h2>Category: {product.category?.name}</h2>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <button className="btn btn-secondary ">ADD TO CART</button>
        </div>
      </div>

      <hr />
      {/* //Similar category valae products but not above one  */}
      <div className="row">
        <h1>
          {relatedProducts.length > 1 ? (
            <div>
              <h4>Similar Products</h4>
              <div className="d-flex flex-wrap">
                {relatedProducts?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <h6 className="card-text">
                        {p.description.substring(0, 30)}...
                      </h6>
                      <p className="card-text">Rs. {p.price}</p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => {
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h5 className="text-center">
              Only above product of this category is remaining...
            </h5>
          )}
        </h1>
      </div>
    </Layoutt>
  );
};

export default ProductDetails;
