import { Router, Request, Response } from "express";

const router = Router();

import UserController from "@controllers/UserController";

router.get("/api", (req: Request, res: Response) => {
  res.send("Hello world!");
});

router.get("/api/user/:id", UserController.findOne);
router.patch("/api/user/:id", UserController.update);
router.delete("/api/user/:id", UserController.delete);

export default router;
