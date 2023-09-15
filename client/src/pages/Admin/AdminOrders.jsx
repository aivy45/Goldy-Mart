import React, { useState, useEffect } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layoutt from "../../components/Layout/Layoutt";
import axios from "axios";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
// import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  // const [changeStatus, setChangeStatus] = useState("");
  /**UPDATION
   * Already made delete order controller
   * Just need to make button and with api call
   * Need to delete the order
   */
  const handleDelete = async (orderId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/auth/order/cancel/${orderId}`
      );

      if (data.success) {
        // toast.success(data.message);
        toast.success(`Product is deleted Successfully`);
        getOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the product");
    }
  };

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // changing status of order whether its processing , processed ....
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // time when the order buys
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

  return (
    <Layoutt title="All Orders Data">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <h1 className="text-center">All Orders</h1>

            <div className="border shadow">
              <table className="table">
                <thead></thead>
              </table>
            </div>

            <div>
              {/* <table className="table">
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
              </table> */}

              <div>
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow">
                      <table className="table">
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
                        </table>
                        <tbody className="adminorderss">
                          <tr>
                            <td>{i + 1}</td>
                            <td>
                              <Select
                                bordered={false}
                                onChange={(value) => handleChange(o._id, value)}
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{o?.buyer?.name}</td>
                            {/* <td>{moment(o?.createAt).fromNow()}</td> */}
                            <td>
                              {day}/{month}/{year}
                            </td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                            <td>{o?.products?.length}</td>
                          </tr>

                          {/* // button for delete  */}
                          <button
                            className="btn btn-danger ms-2 mt-2"
                            onClick={() => {
                              handleDelete(o._id);
                            }}
                          >
                            Delete
                          </button>
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
        </div>
      </div>
    </Layoutt>
  );
};

export default AdminOrders;
