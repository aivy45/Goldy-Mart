import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  // This is for normal user not for admin
  // Here we are checking that whether token is present or not
  // As token only present if user login and if user is login
  // Then only we will give him access of dashboard
  // So in App.js dashboard is in nested routes
  // As if token is present or user login
  // then only user can access the dashboard

  // As soon as the user login we pass token to the header via axios
  // It is in auth.jsx

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
  // outlet means ready to return its children and its children are in nested in app.js
}
