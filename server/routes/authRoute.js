import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  orderCancelController,
  LoginSuccess,
  LoginFailure,
  Logout,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

//Register || method: Post
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

// Forgot Password || Post
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected route auth for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// update profile route for user
router.put("/profile", requireSignIn, updateProfileController);

// Orders of user
router.get("/orders", requireSignIn, getOrdersController);

// All orders display from Admin side
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Order update from admin side
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Order cancel from admin side
router.delete(
  "/order/cancel/:orderId",
  requireSignIn,
  isAdmin,
  orderCancelController
);

// *************===============Google login routes

router.get("/login/success", LoginSuccess);

router.get("/login/failed", LoginFailure);

router.get("/logout", Logout);

export default router;
