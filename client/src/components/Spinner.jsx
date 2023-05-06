import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// The spinner only comes when logout/unauthroized user is try to access
// dashboard route
// Now useLocation know this thing that user before coming to login is in dashboard
// As user redirect in login from dashboard
// This info is stored in useLocation
// And after that when user login from the page it will redirect him/her into dashboard

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center  justify-content-center"
        style={{ height: "100vh" }}
      >
        <h2 className="Text-center">Redirecting to you in {count} second</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
