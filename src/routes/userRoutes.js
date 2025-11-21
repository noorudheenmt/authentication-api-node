import express from "express";
import { viewUsers, viewUserById } from "../controllers/userController.js";

const router = express.Router();

//user route
router.get("/", viewUsers);

//user by id route
router.get("/:id", viewUserById);

export default router;