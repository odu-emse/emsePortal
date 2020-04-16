import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  middleName: {
    type: String,
    trim: true,
    default: ""
  },
  dob: {
    type: Date,
    default: ""
  },
  degree: {
    type: String,
    trim: true,
    default: ""
  },
  adviser: {
    type: String,
    trim: true,
    default: ""
  },
  email: {
    type: String,
    trim: true,
    require: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  classTaken: [
    {
      type: String,
      default: "empty"
    }
  ],
  classNeeded: [
    {
      type: String,
      default: "all"
    }
  ],
  probation: {
    type: Boolean,
    default: false
  },
  probationExpire: {
    type: Date,
    default: Date.now
  },
  admitted: {
    type: Boolean,
    default: false
  }
});

User.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export default mongoose.model("User", User);
