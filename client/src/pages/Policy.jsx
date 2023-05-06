import React from "react";
import Layoutt from "../components/Layout/Layoutt";
import PrivacyImg from "../images/contactus.jpeg";

const Policy = () => {
  return (
    <Layoutt
      title={"Policy - Goldy-Mart app"}
      description={"Online Shopping"}
      keywords={"MERN, Quality Products, Phones"}
      author={"Akshun Verma"}
    >
      <div className="privacyPolicy">
        <div className="privacyLeft">
          <img src={PrivacyImg} alt="PrivacyImg" />
        </div>
        <div className="privacyRight">
          <p>
            Thank you for visiting our website. At our ecommerce store, we are
            committed to protecting your privacy and ensuring that your personal
            information is kept confidential. This privacy policy outlines our
            practices for collecting, using, and sharing your personal
            information.
          </p>

          <p>
            <h4>What information do we collect?</h4>
            When you visit our website, we may collect personal information such
            as your name, email address, phone number, and shipping address. We
            may also collect information about your browsing behavior, such as
            the pages you visit and the items you view.
          </p>

          <p>
            <h4>How do we use your information?</h4>
            We may use your personal information to process and fulfill your
            orders, communicate with you about your purchases, and improve our
            website and services. We may also use your information to send you
            promotional offers or updates about our products and services, but
            only if you have given us permission to do so.
          </p>
        </div>
      </div>
    </Layoutt>
  );
};

export default Policy;
