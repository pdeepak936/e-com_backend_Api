import Product from "../models/productModel.js";

export const getProductsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const products = await Product.find({ categoryId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Assuming your Product model has a method like findById to find a product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};