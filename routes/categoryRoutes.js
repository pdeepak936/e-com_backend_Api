// routes/categoryRoutes.js
import express from "express";
const router = express.Router();
import { getCategories } from "../controllers/categoryController.js";
import userAuth from "../middelwares/authMiddleware.js";

router.get('/categories',userAuth, getCategories);

export default router;
