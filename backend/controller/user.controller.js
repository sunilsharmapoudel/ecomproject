import User from "../models/user.model.js";
import createToken from "../utils/token.utils.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apierror.js";


const signup = asyncHandler(async (req, res, next) => {
    let { name, email, password, isAdmin } = req.body;
    let userexists = await User.findOne({ email });
    if (userexists) {
        throw new ApiError(400, `User with email ${email} already exists.`);
    }

    let newUser = await User.create({
        name, email, password, isAdmin
    });

    createToken(res, newUser._id);

    res.send({
        message: "User registered sucessfully",
        user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        },
    })
});

const login = asyncHandler(async (req, res, next) => {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, `${email} not registered!`);
    }
    if (await user.matchPassword(password)) {
        createToken(res, user._id);
        res.send({ message: 'Login Success' })
    } else {
        throw new ApiError(400, "Invalid Password");
    }
})

const logout = asyncHandler(async (req, res, next) => {
    res.clearCookie("jwt");
    res.send({ message: "Logout Success" });
})

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select("-password");
    res.send(users);
})

const getUserProfile = asyncHandler(async (req, res, next) => {
    if (req.user) {
        res.send(req.user);
    }
});

const updateUserprofile = asyncHandler(async (req, res, next) => {
    if (req.user) {
        let user = await User.findById(req.user._id);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        let updatedUser = await user.save();
        res.send({
            message: "User updated sucessfully",
            user: updatedUser
        });
    }
})

export { signup, login, logout, getUsers, getUserProfile, updateUserprofile };