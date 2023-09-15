import React, { useState } from "react";
import Layoutt from "../../components/Layout/Layoutt";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import "../../Styles/AuthStyles.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // alert(res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        // here location.state only work if user previously in dashboard
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Google signin
  const googleSignin = () => {
    window.open("http://localhost:8080/api/v1/auth/login/success", "_self");
  };

  return (
    <Layoutt title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Login Form</h1>

          {/* email  */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              id={uuidv4()}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* password  */}
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              //   id="exampleInputPassword1"
              id={uuidv4()}
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          {/* login with google  */}
          {/* <button
            type="submit"
            className="btn btn-primary"
            onClick={googleSignin}
          >
            Login with Google
          </button> */}

          <div className="mt-3">
            <button
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="btn forgot-btn"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </Layoutt>
  );
};

export default Login;
