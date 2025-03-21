const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      maxLength: 50,
      trim: true,
      required: true,
    },

    lastname: {
      type: String,
      minLength: 3,
      maxLength: 50,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      minLength: 6,
      required: true,
      select: false
    },

    gender: {
      type: String,
      enum: ["unknown", "male", "female", "Others"],
      default: "unknown",
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
