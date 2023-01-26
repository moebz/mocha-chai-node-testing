const { UserModel } = require("../database");

class UserRepository {
  constructor() {
    this.user = UserModel;

    // "sync" (without { force: true }) will create
    // the table if it doesn't exist.
    // If it already exists, it won't do anything.
    this.user.sync();
  }
  async create(name, email) {
    return this.user.create({
      name,
      email,
    });
  }
  async getUser(id) {
    return this.user.findOne({
      where: {
        id: id,
      },
    });
  }
}

module.exports = { UserRepository };
