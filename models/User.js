const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  }
});

UserSchema.statics.register = async function (Name, Email, Password,){
  const exists = await this.findOne({ Email });
  if (exists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);
  const user = await this.create({
    Name,
    Email,
    Password: hashedPassword,
  });
  return user;
};

UserSchema.statics.login = async function (Email, Password) {
  const user = await this.findOne({ Email });
  if (!user) {
    throw Error("Account does not exists.");
  }
  const match = await bcrypt.compare(Password, user.Password);
  if (!match) {
    throw Error("Invalid credentials.");
  }
  return user;
};
module.exports = mongoose.model("User", UserSchema);