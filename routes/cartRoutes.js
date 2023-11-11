// routes/cartRoutes.js
import express from "express";
const router = express.Router();
import userAuth from "../middelwares/authMiddleware.js";
import { addToCart, viewCart, updateCartItem, removeFromCart } from '../controllers/cartController.js'; // Make sure the path is correct

router.post('/cart/add', userAuth, addToCart);
router.get('/cart/view', userAuth, viewCart);
router.put('/cart/update', userAuth, updateCartItem);
router.delete('/cart/remove/:productId', userAuth, removeFromCart);

export default router;
