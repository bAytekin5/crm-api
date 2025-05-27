import { HTTP_CODES } from "../config/Enum.js";

export default class AuthController {
  constructor(authService) {
    this.authService = authService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req, res, next) {
    try {
      const result = await this.authService.register(req.body);
      res.status(HTTP_CODES.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await this.authService.login(req.body);
      res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  getProfile(req, res) {
    res.status(HTTP_CODES.OK).json({ user: req.user });
  }
}
