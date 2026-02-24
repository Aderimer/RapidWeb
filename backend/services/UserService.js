require('dotenv').config()

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
    try {
    return await this.User.findOne({ where: { email: _email } });
    } catch(error) {
      throw error
    }
  }

  async getUserById(id) {
    try {
    return await this.User.findByPk(id);
    } catch(error) {
      throw error
    }
  }

  async getAllUsers() {
    try {
    return await this.User.findAll();
    } catch(error) {
      throw error
    }
  }

  async authenticateUser(email, password) {
    try {
    const user = await this.User.findOne({ where: { email, password } });
    return user;
    } catch(error) {
      throw error;
    }
  }

  async updateUserRole(id, newRole) {
    try {
    const user = await this.User.update({
      role: newRole
    }, { where: { id: id }})
    return user
  } catch (error) {
    throw error;
  }
  }

  async deleteUser(id) {
    try {
      const user = await this.User.destroy({
        where: { id: id }
      })
      return 'User deleted.'
    } catch(error) {
      throw error
    }
  }
}

module.exports = UserService;