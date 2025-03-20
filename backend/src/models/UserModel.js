const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  firstname: {
    type: String,
    minLength:[3, "Firstname must be at least 3 characters long."],
    maxLength: []
  }
})