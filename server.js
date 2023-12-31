/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import dbConnection from "./src/config/database.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import subCategoryRoute from "./src/routes/subCategoryRoute.js";
import brandRoute from "./src/routes/brandRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";
import authRoute from "./src/routes/authRoute.js";
import ApiError from "./src/utils/apiError.js";
import reviewRoute from "./src/routes/reviewRoute.js";
import wishlistRoute from "./src/routes/wishlistRoute.js";
import addressRoute from "./src/routes/addressRoute.js";
import globalError from "./src/middleware/errorMiddleware.js";

const __dirname = path.resolve();

dotenv.config({ path: "config.env" });

//connect with db
dbConnection();

// express app
const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Route
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/wishlist", wishlistRoute);
app.use("/api/v1/addresses", addressRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

//Global error handling middleware

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

//Handle rejection outside express
process.on("unhandledRejection", (error) => {
  console.error(`UnhandledRejection Error:${error.name}| ${error.message}`);
  server.close(() => {
    console.error(`Shutting down.....`);
    process.exit(1);
  });
});
