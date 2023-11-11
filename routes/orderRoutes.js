// routes/orderRoutes.js
import express from "express";
const router = express.Router();
import userAuth from "../middelwares/authMiddleware.js";
import { placeOrder, getOrderHistory, getOrderDetails } from '../controllers/orderController.js';

router.post('/order/place', userAuth, placeOrder);
router.get('/order/history', userAuth, getOrderHistory);
router.get('/order/:orderId', userAuth, getOrderDetails);

export default router;
