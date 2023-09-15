import React, { useState, useEffect } from "react";
import Layoutt from "../../components/Layout/Layoutt";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
// import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // time stamps
  // Get the current timestamp in milliseconds
  // const timestamp = Date.now();

  // Create a Date object from the timestamp
  // const currentDate = new Date(timestamp);

  // Get the day, month, and year
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  useEffect(() => {
    // Check if day, month, and year are stored in local storage
    const storedDay = localStorage.getItem("day");
    const storedMonth = localStorage.getItem("month");
    const storedYear = localStorage.getItem("year");

    if (storedDay && storedMonth && storedYear) {
      // Data already stored, retrieve and set the state
      setDay(storedDay);
      setMonth(storedMonth);
      setYear(storedYear);
    } else {
      // Data not stored, get the current date
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; // Add 1 to get 1-12 months
      const currentYear = currentDate.getFullYear();

      // Store the current date in local storage
      localStorage.setItem("day", currentDay);
      localStorage.setItem("month", currentMonth);
      localStorage.setItem("year", currentYear);

      // Set the state with the current date
      setDay(currentDay);
      setMonth(currentMonth);
      setYear(currentYear);
    }
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // getting all the orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layoutt title="Your Orders">
      <div className="container p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow p-3">
                  <table className="table">
                    <thead className="adminorderss">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="adminorderss">
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>
                          {day}/{month}/{year}
                        </td>
                        {/* <td>{moment(o?.createAt).fromNow()}</td> */}
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>
                            <b>{p.name}</b>
                          </p>
                          <p>{p.description}</p>
                          <p>Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layoutt>
  );
};

export default Orders;
