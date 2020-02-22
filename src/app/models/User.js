const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String
  },
  biography: {
    type: String
  },
  siteBlog: {
    type: String
  },
  githubUsername: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String
  },
  linkedin: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
  return next();
  // bcrypt.genSalt((err, salt) => {
  //   bcrypt.hash(this.password, salt, (err, hash) => {
  //     this.password = hash;
  //     return next();
  //   });
  // });
});

UserSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);

  // try {
  //   // return new Promise((resolve, reject) => {
  //   //   bcrypt.compare(password, this.password, (err, isMatch) => {
  //   //     if (err) {
  //   //       return reject(err);
  //   //     } else {
  //   //       return resolve(isMatch);
  //   //     }
  //   //   });
  //   // });
  // } catch ({ response }) {
  //   console.log(response);
  // }
};

module.exports = mongoose.model("User", UserSchema);
