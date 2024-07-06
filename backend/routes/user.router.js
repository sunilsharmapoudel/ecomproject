import express from "express"
import { login, signup, logout, getUsers, getUserProfile, updateUserprofile } from "../controller/user.controller.js"
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getuser", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserprofile);


export default router;