import React from "react";
import Layoutt from "./../../components/Layout/Layoutt";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "../../Styles/DashboardAdminUser.css";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layoutt title="Admin Dashboard">
      <div className="container-fluid m-3 p-3 Dashboardd">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 adUsDashboard">
            <h3>
              <u>Dashboard of Admin</u>
            </h3>
            <div className="card w-70 p-3 adUsDetails">
              <h4>
                Admin Name : <span>{auth?.user?.name}</span>
              </h4>
              <h4>
                Admin Email : <span>{auth?.user?.email}</span>
              </h4>
              <h4>
                Admin Contact : <span>{auth?.user?.phone}</span>
              </h4>
              <h4>
                Admin Address : <span>{auth?.user?.address}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default AdminDashboard;
