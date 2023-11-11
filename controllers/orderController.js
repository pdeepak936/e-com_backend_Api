import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty. Add products to the cart first.' });
    }

    const order = new Order({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
    });

    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user
    const orders = await Order.find({ userId }).populate('products.productId');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user
    const order = await Order.findOne({ _id: orderId, userId }).populate('products.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

