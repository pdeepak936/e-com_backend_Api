// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { getProductsByCategory, getProductDetails, getAllProduct } from '../controllers/productController.js';
import userAuth from "../middelwares/authMiddleware.js";

router.get('/products/:categoryId', userAuth, getProductsByCategory);
router.get('/products/:productId', userAuth, getProductDetails);
router.get('/products', userAuth, getAllProduct);
export default router;
