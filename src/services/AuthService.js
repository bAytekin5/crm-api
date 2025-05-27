import { HTTP_CODES } from "../config/Enum.js";
import User from "../db/models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import { generateToken } from "../utils/tokenUtils.js";

export default class AuthService {
  async register(data) {
    const userExists = await User.findOne({ email: data.email });

    if (userExists) throw new ApiError(HTTP_CODES.BAD_REQUEST,"Email already registered");

    const user = await User.create(data);
    const token = generateToken(user);
    return { user, token };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(HTTP_CODES.NOT_FOUND,"User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(HTTP_CODES.BAD_REQUEST,"Password is incorrect");

    const token = generateToken(user);
    return { user, token };
  }
}
