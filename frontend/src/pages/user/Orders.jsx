import React from "react";
import Layoutt from "../../components/Layout/Layoutt";
import UserMenu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layoutt title="Your Orders">
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Orders;
