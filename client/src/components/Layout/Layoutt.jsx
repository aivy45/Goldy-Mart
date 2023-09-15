import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layoutt = ({
  children,
  title = "Goldy-Mart - Shop now",
  description = "MERN Stack Project",
  keywords = "MERN, react, node, mogodb",
  author = "Akshun Verma",
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>

      <Header />

      <main style={{ minHeight: "70vh" }}>
        {children}
        <Toaster />
      </main>

      <Footer />
    </div>
  );
};

export default Layoutt;
