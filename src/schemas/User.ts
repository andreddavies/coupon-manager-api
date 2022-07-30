import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const UserSchema = new Schema(
  {
    id: String,
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
