import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(5000, () => console.log("BE running 5000"));
