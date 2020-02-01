const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  biography: String,
  siteBlog: String,
  github: String,
  linkedin: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt((err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      return next();
    });
  });
});

UserSchema.methods.checkPassword = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(isMatch);
      }
    });
  });
};

module.exports = mongoose.model("User", UserSchema);
