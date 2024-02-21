import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

categorySchema.set("toJSON", {
  virtuals: true, //Agrega el campo id con el mismo valor del _id
  versionKey: false, //Quita el __v
  transform(doc, ret, options) {
    delete ret._id; //Elimina el _id
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
