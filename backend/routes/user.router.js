import express from "express"
import { login, signup, logout, getUser, getUsers, getUserProfile, updateUserProfile, deleteUser, updateUser } from "../controller/user.controller.js"
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getuser/:id", checkAuth, checkAdmin, getUser);
router.get("/getusers", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);
router.delete("/profile/:id", checkAuth, deleteUser);
router.put("/user/:id", checkAuth, updateUser);

export default router;