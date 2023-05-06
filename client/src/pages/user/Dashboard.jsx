import React from "react";
import Layoutt from "../../components/Layout/Layoutt";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../../Styles/DashboardAdminUser.css";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layoutt title="Dashboard - Goldy-Mart">
      <div className="container-fluid m-3 p-3 Dashboardd">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 adUsDashboard">
            <h3>
              <u>Dashboard of User</u>
            </h3>
            <div className="card w-75 p-3 adUsDetails">
              <h4>
                User Name: <span>{auth?.user?.name}</span>
              </h4>
              <h4>
                User Email: <span>{auth?.user?.email}</span>
              </h4>
              <h4>
                User Address: <span>{auth?.user?.address}</span>
              </h4>
              <h4>
                User Mobile No: <span>{auth?.user?.phone}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Dashboard;
