import { Schema, model, Document } from "mongoose";

interface ICoupon extends Document {
  id?: string;
  link: string;
  logo: string;
  code: string;
  due_date: Date;
  description: string;
  company_name: string;
  discount_percentage: number;
  status: "active" | "inactive";
}

const CouponSchema = new Schema(
  {
    id: String,
    link: { type: String, required: true },
    logo: { type: String, required: true },
    due_date: { type: Date, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    company_name: { type: String, required: true },
    discount_percentage: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<ICoupon>("Coupon", CouponSchema);
