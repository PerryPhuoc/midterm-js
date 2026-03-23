import express from "express";
import * as c from "../controllers/product.controller.js";
import { validateProduct } from "../middlewares/validate.middleware.js";

const r = express.Router();

r.put("/checkout", c.checkout);
r.get("/", c.getAll);
r.get("/:id", c.getOne);
r.post("/", validateProduct, c.create);
r.put("/:id", validateProduct, c.update);
r.delete("/:id", c.remove);

export default r;