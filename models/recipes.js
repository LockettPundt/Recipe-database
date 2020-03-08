'use strict'
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
            const response = db.any(`SELECT * FROM recipes;`);
            return response;
        } catch (error) {
            return error;
        }
    }
    
    static async getOne(id) {
        try {
            const response = await db.any(`SELECT * from recipes WHERE id = ${id};`)
            return response;
        } catch (error) {
            return error;
        }
    }
}

module.exports = Recipes;