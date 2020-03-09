'use strict'
const express = require('express');
const recipeModel = require('../models/recipes');
const userModel = require('../models/userModel');
const router = express.Router();


router.get('/', async (req, res, next) => {
  const recipeNames = await recipeModel.getAll();

  res.render('template', { 
    locals: {
      title: 'Recipes',
      recipeNames: recipeNames,
      session: req.session
    },
    partials: {
      partial: 'partial-recipelist'
    }
    });
})

router.get('/:id?', async (req, res) => {
  const {id} = req.params;
  const {user_id} = req.session;
  const recipeInfo = await recipeModel.getOne(id);
  const submittedBy = await recipeModel.getReviewer(id);
  const comments = await recipeModel.getComments(id);
  const commenter = await userModel.getCommenter(user_id);
  console.log(comments);
  console.log(commenter); 
  res.render('template', {
    locals: {
      title: !!recipeInfo ? recipeInfo[0].name : `Whoops no recipe here!`,
      recipeInfo: recipeInfo,
      session: req.session,
      submittedBy: submittedBy,
      comments: comments,
      commenter: commenter
    },
    partials: {
      partial: 'partial-singlerecipe'
    }
  })
})

router.post('/', async (req,res) => {
  const {user_id, first_name, last_name, title, rating, ingredients, directions, img_upload} = req.body;
  console.log('hi req.body is:', req.body);
  recipeModel.addRecipe(title, rating, directions, ingredients, img_upload, user_id);
  //name, rating, directions, ingredients, img, submit_id
  res.redirect(200, '/recipelist');
})

router.post('/:id', async (req, res) => {
  const {id} = req.params
  const {title, user_id, rating, comment} = req.body;
  console.log('req.body is: ', id,  req.body);
  userModel.leaveComment(title, comment, rating, user_id, id);
  res.redirect(200, '/recipelist')
})

module.exports = router;