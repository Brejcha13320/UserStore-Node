import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

productSchema.set("toJSON", {
  virtuals: true, //Agrega el campo id con el mismo valor del _id
  versionKey: false, //Quita el __v
  transform(doc, ret, options) {
    delete ret._id; //Elimina el _id
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
