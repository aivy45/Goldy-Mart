import React from "react";
import Layoutt from "../components/Layout/Layoutt";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contactus from "../images/contact.jpeg";
const Contact = () => {
  return (
    <Layoutt
      title={"Contact us - Goldy-Mart app"}
      description={"Online Shopping"}
      keywords={"MERN, Quality Products, Phones"}
      author={"Akshun Verma"}
    >
      <div className="row contactus">
        <div className="contact-left">
          <img src={contactus} alt="contact Us" />
        </div>

        <div className="contact-right">
          <h1 className="">CONTACT US</h1>
          <p className="">
            Any query and info about product feel free to call anytime we are
            24*7 available
          </p>
          <p className="">
            <BiMailSend /> : www.helpsupport45@mail.com
          </p>
          <p className="">
            <BiPhoneCall /> : 012-987654
          </p>
          <p className="">
            <BiSupport /> : 1800-0000-0000 (tool free)
          </p>
        </div>
      </div>
    </Layoutt>
  );
};

export default Contact;
