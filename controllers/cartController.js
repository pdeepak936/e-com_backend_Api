import Product from '../models/productModel.js';
import Cart from '../models/cartModel.js';
import User from '../models/userModel.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find((p) => p.productId.equals(productId));
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.products.find((p) => p.productId.equals(productId));

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart item updated successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id; // Assuming you have middleware to attach user information to req.user

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter((p) => !p.productId.equals(productId));
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
