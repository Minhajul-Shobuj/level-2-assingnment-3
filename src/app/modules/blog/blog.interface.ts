import { Types } from "mongoose";

export interface TBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  name: string;
  isBlocked: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
