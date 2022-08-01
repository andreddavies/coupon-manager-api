import { Router } from "express";

import { authMiddleware } from "@middlewares/auth";
import { imageUploaderMiddleware } from "@middlewares/imageUploader";

import UserController from "@controllers/UserController";
import CouponController from "@controllers/CouponController";

const router = Router();

router.get("/api/user/:id", authMiddleware, UserController.findOne);
router.post("/api/user/signup", UserController.create);
router.post("/api/user/signin", UserController.login);
router.patch("/api/user/:id", authMiddleware, UserController.update);
router.delete("/api/user/:id", authMiddleware, UserController.delete);

router.get("/api/coupon", CouponController.list);
router.get("/api/coupon/:id", authMiddleware, CouponController.getCoupon);
router.post(
  "/api/coupon",
  authMiddleware,
  imageUploaderMiddleware.single("logo"),
  CouponController.create
);
router.patch("/api/coupon/:id", authMiddleware, CouponController.update);
router.delete("/api/coupon/:id", authMiddleware, CouponController.delete);

export default router;
