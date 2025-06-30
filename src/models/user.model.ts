// src/models/user.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "../interfaces/user.interface";

// Extend Document and include _id with ObjectId type
export interface IUserModel extends IUser, Document {
  _id: Types.ObjectId;
}

const UserSchema: Schema<IUserModel> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    photoURL: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Export Mongoose Model
const User = mongoose.model<IUserModel>("User", UserSchema);
export default User;
