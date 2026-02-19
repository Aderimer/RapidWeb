class UserService {
  constructor(db) {
    this.db = require("../models");
    this.User = this.db.User;
  }

  async createUser(username, email, encryptedPassword, salt) {
    try {
      const newUser = await this.User.create({
        username,
        email,
        encryptedPassword,
        salt,
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(_email) {
    return await this.User.findOne({ where: { email: _email } });
  }

  async getUserById(id) {
    return await this.User.findByPk(id);
  }

  async getAllUsers() {
    return await this.User.findAll();
  }

  async authenticateUser(email, password) {
    const user = await this.User.findOne({ where: { email, password } });
    return user;
  }
}

module.exports = UserService;