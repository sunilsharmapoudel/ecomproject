import app from "./app.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 8000;
connectDB()
    .then(app.listen(5000, () => console.log(`Server is up on ${PORT} and running`)));

