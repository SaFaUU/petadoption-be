import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_expiration_time: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwt_refresh_expiration_time: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};
