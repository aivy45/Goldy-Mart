import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

// import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
// import CategoryProducts from "./pages/CategoryProducts";
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* if any param in this app it means if we click on one card then new page open realted to info of that particular card, so no need to make new page  it is because of slug or param hook */}
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <CategoryProducts />
            </Suspense>
          }
        />
        <Route path="/search" element={<Search />} />

        {/*Private routes once it checked then inner routes will work  */}
        {/* It is for user who logged in  */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        {/* Private route for admin as admin dashboard is different  */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />

          {/* if any param in this app it means if we click on one card then new page open realted to info of that particular card  */}
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route
            path="admin/orders"
            element={
              <Suspense fallback={<div>Loading....</div>}>
                <AdminOrders />
              </Suspense>
            }
          />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading....</div>}>
              <About />
            </Suspense>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
