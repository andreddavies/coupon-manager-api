import { Schema, model, Document } from "mongoose";

interface ICoupon extends Document {
  id: string;
  link: string;
  code: string;
  logo: string;
  due_date: Date;
  description: string;
  company_name: string;
  discount_percentage: number;
  status: "active" | "inactive";
}

const CouponSchema = new Schema(
  {
    id: String,
    link: String,
    code: String,
    logo: String,
    due_date: Date,
    status: String,
    description: String,
    company_name: String,
    discount_percentage: Number,
  },
  {
    timestamps: true,
  }
);

export default model<ICoupon>("Coupon", CouponSchema);
