import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";

const authSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  try {
    //     // Check if the password is modified
    // if (!this.isModified("password")) {
    //   return next();
    // }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
