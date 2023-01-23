const { UserModel } = require("../database");

class UserRepository {
  constructor() {
    this.user = UserModel;
    this.user.sync({ force: true });
  }
  async create(name, email) {
    return this.user.create({
      name,
      email,
    });
  }
  async getUser(id) {
    console.log({sdfasadfsafsafdid: id});
    return this.user.findOne({
      where: {
        id: id,
      },
    });
  }
}

module.exports = { UserRepository };
