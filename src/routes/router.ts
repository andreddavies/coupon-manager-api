import { Router, Request, Response } from "express";

const router = Router();

import UserController from "@controllers/UserController";
import CouponController from "@controllers/CouponController";

router.get("/api", (req: Request, res: Response) => {
  res.send("Hello world!");
});

router.get("/api/user/:id", UserController.findOne);
router.post("/api/user/signup", UserController.create);
router.post("/api/user/signin", UserController.login);
router.patch("/api/user/:id", UserController.update);
router.delete("/api/user/:id", UserController.delete);

router.get("/api/coupon", CouponController.list);
router.get("/api/coupon/:id", CouponController.getCoupon);
router.post("/api/coupon", CouponController.create);
router.patch("/api/coupon/:id", CouponController.update);
router.delete("/api/coupon/:id", CouponController.delete);

export default router;
