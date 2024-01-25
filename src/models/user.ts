import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: String,
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: Date,
});

export default mongoose.models.User || model("Users", userSchema);
