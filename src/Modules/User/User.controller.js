import { Router } from "express";
import {
  signupService,
  upsertUserService,
  getUserByEmailService,
  getUserByIdService,
} from "./User.services.js";

const router = Router();

router.post("/signup", signupService);
router.put("/:id", upsertUserService);
router.get("/by-email", getUserByEmailService);
router.get("/:id", getUserByIdService);

export default router;