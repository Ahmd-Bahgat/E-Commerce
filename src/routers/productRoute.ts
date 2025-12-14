import { getAllProduct } from "../services/productService";
import express from "express";

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const proudcts = await getAllProduct();
  res.status(200).send(proudcts);
});
export default productRoute;
