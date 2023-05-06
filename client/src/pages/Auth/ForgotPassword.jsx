import React, { useState } from "react";
import Layoutt from "../../components/Layout/Layoutt";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../../Styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layoutt title="Forgot Password - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Reset Password</h1>

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

          {/* answer  */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              id={uuidv4()}
              placeholder="Enter your Favourite Sport"
              required
            />
          </div>

          {/* password  */}
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              //   id="exampleInputPassword1"
              id={uuidv4()}
              placeholder="Enter New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layoutt>
  );
};

export default ForgotPassword;
