'use strict'
const express = require('express');
const recipeModel = require('../models/recipes');
const router = express.Router();


router.get('/', async (req, res, next) => {
  const recipeNames = await recipeModel.getAll();

  res.render('template', { 
    locals: {
      title: 'Recipes',
      recipeNames: recipeNames
    },
    partials: {
      partial: 'partial-recipelist'
    }
    });
})

router.get('/:id?', async (req, res) => {
  const {id} = req.params;
  const recipeInfo = await recipeModel.getOne(id);
  console.log(recipeInfo);
  res.render('template', {
    locals: {
      title: !!recipeInfo ? recipeInfo[0].name : `Whoops no recipe here!`,
      recipeInfo: recipeInfo
    },
    partials: {
      partial: 'partial-singlerecipe'
    }
  })
})

module.exports = router;