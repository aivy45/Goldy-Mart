import React from "react";
import Layoutt from "../../components/Layout/Layoutt";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layoutt title="Dashboard - Ecommerce App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name: {auth?.user?.name}</h3>
              <h3>User Email: {auth?.user?.email}</h3>
              <h3>User Address: {auth?.user?.address}</h3>
              <h3>User Mobile No: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Dashboard;
