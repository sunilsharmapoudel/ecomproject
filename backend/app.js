import express from 'express';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errormiddleware.js';
import notfoundMiddleware from './middleware/notfoundMiddleware.js';
import cookieParser from 'cookie-parser';
//router imports
import userRouter from "./routes/user.router.js";
import productRouter from './routes/product.router.js';

//initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);

//errorhandlers
app.use(errorHandler);
app.use(notfoundMiddleware);

export default app;

