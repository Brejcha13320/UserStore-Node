import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

userSchema.set("toJSON", {
  virtuals: true, //Agrega el campo id con el mismo valor del _id
  versionKey: false, //Quita el __v
  transform(doc, ret, options) {
    delete ret._id; //Elimina el _id
    delete ret.password; //Elimina el password
  },
});

export const UserModel = mongoose.model("User", userSchema);
