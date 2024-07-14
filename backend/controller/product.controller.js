import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import Product from "../models/product.model.js";
import ApiError from "../utils/apierror.js";

const addProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.create({ ...req.body, user: req.user._id })
    res.send({ message: "Product added sucessfully", product });
});

const getProduct = asyncHandler(async (req, res, next) => {
    let product = req.params.name;
    const findProduct = await Product.findOne({ name: product });
    if (!findProduct) {
        throw new ApiError(400, `${product} not found `);
    }
    res.send(findProduct);
});

// @desc update all product
// @route /api/v1/products/:name
// @access private/admin
const getallProduct = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.send(products);
})

// @desc update product
// @route /api/v1/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
    let name = req.params.name;
    let product = await Product.findOne({ name });
    if (!product) throw new ApiError(404, "Product not found!");
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    let updatedProduct = await product.save();
    res.send({
        message: "Product updated successfully!",
        product: updatedProduct,
    });
});

// @desc delete product
// @route /api/v1/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res, next) => {
    let name = req.params.name;
    let product = await Product.findOne({ name });
    if (!product) throw new ApiError(404, "Product not found!");
    await Product.findOneAndDelete(product);
    res.send({ message: "Product deleted successfully!" });
});

const addReviews = asyncHandler(async (req, res, next) => {
    let id = req.params.id;
    let { rating, comment } = req.body;
    let product = await Product.findById(id);
    if (!product) throw new ApiError(400, `${product} not found`);

    const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

    if (alreadyReviewed) throw new ApiError(400, `You have alredy reviewed the ${product}`);

    product.reviews.push({
        name: req.user.name,
        user: req.user._id,
        rating,
        comment,
    });

    product.numReviews = product.reviews.length;
    let totalRating = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    product.rating = (totalRating / product.reviews.length).toFixed(2);
    await product.save();
    res.send({ message: "Review added to product" });

})





export { addProduct, getProduct, getallProduct, updateProduct, deleteProduct, addReviews };  