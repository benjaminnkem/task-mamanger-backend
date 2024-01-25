import { connect } from "mongoose";

const connectToDb = async () => connect(process.env.MONGODB_URI ?? "");

export default connectToDb;
