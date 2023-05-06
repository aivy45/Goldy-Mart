import React from "react";
import Layoutt from "../components/Layout/Layoutt";
import aboutImg from "../images/about.jpeg";
const About = () => {
  return (
    <Layoutt
      title={"About us - Goldy-Mart app"}
      description={"Online Shopping"}
      keywords={"Watch, Quality Products, Phones"}
      author={"Akshun Verma"}
    >
      <div className="aboutUs">
        <div className="aboutLeft">
          <img src={aboutImg} alt="aboutImg" />
        </div>
        <div className="aboutRight">
          <p>
            Welcome to our online ecommerce store, your one-stop destination for
            all your shopping needs. We offer a wide range of products across
            various categories, ensuring that you find everything you need in
            one place. From electronics and gadgets to clothing and accessories,
            we have it all.
          </p>

          <p>
            At our online ecommerce store, we value our customers and strive to
            provide them with the best possible shopping experience. We are
            constantly updating our product range to keep up with the latest
            trends and offer our customers the latest and greatest products. So,
            whether you're looking for the perfect gift or treating yourself to
            something special, we have everything you need right here. Thank you
            for choosing us as your go-to online shopping destination.
          </p>
        </div>
      </div>
    </Layoutt>
  );
};

export default About;
