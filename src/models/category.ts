import mongoose from "mongoose";
import { User } from "../interfaces/user.interface.js";

const categoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: Date,
});

export default mongoose.models.Category || mongoose.model("Category", categoryScheme);
