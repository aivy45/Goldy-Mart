import { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/CategoryProducts.css";
const CategoryProducts = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  return (
    <Layoutt>
      <div className="category">
        <h1>Category Products</h1>
        <h2 className="text-center">
          Category - {category?.name}
          <span className="catResult">
            {products?.length <= 1
              ? ` - ${products?.length} result found`
              : ` - ${products?.length} results found`}
          </span>
        </h2>
        <div>
          <div>
            <div className="categoryProducts">
              {products?.map((p) => (
                <div
                  className="card m-1"
                  key={p._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>

                      <p className="card-text card-price">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>

                    <div className="card-name-price">
                      <button
                        className="btn btn-success ms-1"
                        onClick={() => {
                          navigate(`/product/${p.slug}`);
                        }}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default CategoryProducts;
