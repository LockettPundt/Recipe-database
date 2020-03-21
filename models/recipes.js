
const db = require('./conn');

class Recipes {
  constructor(id, name, rating, directions, ingredients) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.directions = directions;
    this.ingredients = ingredients;
  }

  static async getAll() {
    try {
      const response = db.any('SELECT * FROM recipes;');
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getReviewer(recipe_id) {
    try {
      const response = await db.any(`SELECT first_name, last_name FROM users JOIN recipes ON submit_id = users.id WHERE recipes.id = '${recipe_id}';`);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getOne(id) {
    try {
      const response = await db.any(`SELECT * from recipes WHERE id = ${id};`);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async addRecipe(name, rating, directions, ingredients, img, submit_id) {
    try {
      const response = await db.one(`INSERT INTO recipes 
            (name, rating, directions, ingredients, img, submit_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [name, rating, directions, ingredients, img, submit_id]);
      return response;
    } catch (error) {
      return error;
    }
  }

  static async getComments(recipe_id) {
    try {
      const response = await db.any(`SELECT * FROM comments WHERE recipes_id = ${recipe_id};`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Recipes;
