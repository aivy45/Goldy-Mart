import React, { useState, useEffect } from "react";
import Layoutt from "../components/Layout/Layoutt";
import useCategory from "./../hooks/useCategory";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layoutt title="All Categories">
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layoutt>
  );
};

export default Categories;
