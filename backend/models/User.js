import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookPreferences: {
      type: [String],
      // required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    likedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    dislikedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    toReadBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    readBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
