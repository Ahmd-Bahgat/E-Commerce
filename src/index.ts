import express from "express";
import mongoose from "mongoose";
import router from "./routers/userRouter.ts";

const app = express();
const port = 3001;

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("mongo connected"));

app.use(express.json());
app.use("/user", router);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
