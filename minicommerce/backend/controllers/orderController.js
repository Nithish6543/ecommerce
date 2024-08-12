const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

// Create order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    try {
        const cartItems = req.body;
        const amount = Number(cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)).toFixed(2);
        const status = 'pending';
        
        // Create the order in the database
        const order = await orderModel.create({ cartItems, amount, status });

        // Update product stock
        const updateStockPromises = cartItems.map(async (item) => {
            const product = await productModel.findById(item.product._id);
            if (!product) {
                throw new Error(`Product with ID ${item.product._id} not found`);
            }
            product.stock = product.stock - item.qty;
            await product.save();
        });

        // Wait for all stock updates to complete
        await Promise.all(updateStockPromises);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        next(error);
    }
};
