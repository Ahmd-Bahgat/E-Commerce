import mongoose, { Schema, Document, type ObjectId } from "mongoose";
import type { IProduct } from "./productModel.ts";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  qauntity: number;
}

export interface ICart extends Document {
  userId: string | ObjectId;
  item: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  unitPrice: { type: Number, required: true },
  qauntity: { type: Number, default: 1, required: true },
});

const CartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: [CartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: "String", enum: cartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", CartSchema);
