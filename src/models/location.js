import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  wifi: {
    type: Boolean
  }
});

const Business = mongoose.model("Business", businessSchema);

export default Business;
