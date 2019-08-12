import mongoose from "mongoose";

import User from "./user";
import Message from "./message";
import Business from "./location";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message, Business };

export { connectDb };

export default models;
