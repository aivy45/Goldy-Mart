import React, { useState } from "react";
import Layoutt from "../../components/Layout/Layoutt";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../../Styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        alert(res.data.message);
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
    <Layoutt title="Register - Goldy-Mart App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Register Form</h1>

          {/* Name  */}
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              id={uuidv4()}
            />
          </div>

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

          {/* phone  */}
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              id={uuidv4()}
              placeholder="Enter your Phone Number"
              required
            />
          </div>

          {/* address  */}
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              id={uuidv4()}
              placeholder="Enter your Address"
              required
            />
          </div>

          {/* question  */}
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              //   id="exampleInputEmail1"
              id={uuidv4()}
              placeholder="What is your Favourite Sport"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layoutt>
  );
};

export default Register;
