import jwt from "jsonwebtoken";
import config from "../config";

const generateToken = (data: any) => {
  return jwt.sign(data, config.jwt_secret as string, {
    expiresIn: config.jwt_expiration_time,
  });
};

export default generateToken;
