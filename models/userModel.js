/* eslint-disable camelcase */

const bcrypt = require('bcryptjs');
const db = require('./conn');

class UserModel {
  constructor(id, first_name, last_name, email, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }

  async createUser() {
    try {
      const response = await db.one('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id', [this.first_name, this.last_name, this.email, this.password]);
      return response;
    } catch (error) {
      return error;
    }
  }

  async existingEmail() {
    try {
      const response = await db.any(`SELECT * FROM users WHERE email = '${this.email}';`);
      return !!response.length;
    } catch (error) {
      return error;
    }
  }

  async logIn() {
    try {
      const response = await db.one('SELECT id, first_name, last_name, password FROM users WHERE email = $1', [this.email]);
      const {
        id, first_name, last_name, password,
      } = response;
      const isValid = this.checkPassword(password);

      return isValid ? {
        isValid, id, first_name, last_name,
      } : isValid;
    } catch (error) {
      return error;
    }
  }

  static async leaveComment(title, comment, rating, users_id, recipes_id) {
    try {
      const response = await db.one(`INSERT INTO comments (title, comment, rating, users_id, recipes_id) 
            VAlUES ($1, $2, $3, $4, $5) RETURNING id`, [title, comment, rating, users_id, recipes_id]);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getCommenter(id) {
    try {
      const response = await db.one(`SELECT * FROM users WHERE id = ${id};`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserModel;
