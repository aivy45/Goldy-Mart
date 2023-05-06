import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../Styles/AdminMenu.css";
const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center adminMenu">
        <div className="list-group adminMenuDashboard">
          <h4 onClick={() => navigate("/dashboard/user")}>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
