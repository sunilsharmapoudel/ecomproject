import express from "express";
import { addProduct, getProduct, getallProduct, updateProduct, deleteProduct, addReviews } from "../controller/product.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.route("/").get(getallProduct).post(checkAuth, checkAdmin, addProduct);
router.route("/:name").get(getProduct).put(checkAuth, checkAdmin, updateProduct).delete(checkAuth, checkAdmin, deleteProduct);
router.put("/reviews/:id", checkAuth, addReviews);
export default router;