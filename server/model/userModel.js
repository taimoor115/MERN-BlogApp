import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new Schema({
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
});

userSchema.pre("save", async function (next) {
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

const User = mongoose.model("User", userSchema);

export default User;
