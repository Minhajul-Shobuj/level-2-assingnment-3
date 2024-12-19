import { model, Schema, Types } from "mongoose";
import { TFullName, TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { userRole } from "./user.constant";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [7, "Name can not be less than 7 characters"],
      maxlength: [20, "Name can not be more than 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: userRole,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//make password hash and only for database using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//checking is user exist
userSchema.statics.isUserExistsById = async function (id: Types.ObjectId) {
  return await User.findById(id);
};
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};
userSchema.statics.isUserBlocked = async function (email: string) {
  const user = await User.findOne({ email });
  return user?.isBlocked;
};
userSchema.statics.isPasswordMatched = async function (
  plaintextPassword,
  hashPassword
) {
  return bcrypt.compare(plaintextPassword, hashPassword);
};
export const User = model<TUser, UserModel>("User", userSchema);
