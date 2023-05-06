import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layoutt from "../../components/Layout/Layoutt";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layoutt title="All Products">
      <div className="container-fluid m-3 p-3">
        <div className="row dashboard mt-2">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9  ">
            <h1 className="text-center">All Products List</h1>

            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  className="product-link"
                  to={`/dashboard/admin/product/${p.slug}`}
                  key={p._id}
                >
                  <div className="card m-2 " style={{ width: "18rem" }}>
                    <div className="adminProductsImage">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-center ">{p.name}</h5>
                      <p className="card-text text-center">
                        {p.description.substring(0, 60)}...
                      </p>
                    </div>

                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <button className="btn btn-primary">
                        Click anywhere to update it
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Products;
