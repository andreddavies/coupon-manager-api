import { Router, Request, Response } from "express";

const router = Router();

import UserController from "@controllers/UserController";

router.get("/api", (req: Request, res: Response) => {
  res.send("Hello world!");
});

router.get("/api/user/:id", UserController.findOne);

export default router;
