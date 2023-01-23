class UserService {
  constructor(UserRepository) {
    this.userRepository = new UserRepository();
  }

  async create(name, email) {
    return this.userRepository.create(name, email);
  }

  getUser(id) {
    return this.userRepository.getUser(id);
  }
}

module.exports = { UserService };
