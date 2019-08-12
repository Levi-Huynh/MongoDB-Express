import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
