import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

export const checkGivenId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.NOT_FOUND, "Invalid blog ID");
  }
};

export const validateAndFilterPayload = <T extends object>(
  payload: T,
  allowedFields: string[]
): Partial<T> => {
  const filteredData = Object.keys(payload).reduce((filtered, key) => {
    if (!allowedFields.includes(key)) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        `Invalid field: '${key}' is not allowed. Allowed fields are: ${allowedFields.join(
          ", "
        )}`
      );
    }
    filtered[key as keyof T] = payload[key as keyof T];
    return filtered;
  }, {} as Partial<T>);
  if (Object.keys(filteredData).length === 0) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, "No valid fields provided");
  }

  return filteredData;
};
