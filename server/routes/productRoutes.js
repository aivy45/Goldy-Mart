import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersControllers,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes

//Create Product   || Post
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get all Products || Get
router.get("/get-product", getProductController);

// single Product || GET
router.get("/get-product/:slug", getSingleProductController);

// get single photo
router.get("/product-photo/:pid", productPhotoController);

// delete single product || delete
router.delete("/delete-product/:pid", deleteProductController);

// update single product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter products
router.post("/product-filters", productFiltersControllers);

// Product count
router.get("/product-count", productCountController);

// product per page (it will help in loading the more items/products)
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

// similar products
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise routes
router.get("/product-category/:slug", productCategoryController);

//************Payments routes************ */
// token (it verify the account)
router.get("/braintree/token", braintreeTokenController);

// payments only happen if the user is loged in
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
