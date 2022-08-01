import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
