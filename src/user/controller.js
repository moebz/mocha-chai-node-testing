const status = require('http-status');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res, next) {
    const { name, email } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string"
    ) {
      return res.status(status.BAD_REQUEST).json({
        message: "Invalid params",
      });
    }
    const user = await this.userService.create(name, email);
    return res.status(status.CREATED).json({
      data: user,
    });
  }

  async getUser(req, res) {
    const { id } = req.params;

    const user = await this.userService.getUser(id);
    return res.json({
      data: user,
    });
  }
}

module.exports = { UserController };
