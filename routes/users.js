'use strict'
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');


let emailStatus = '';




router.get('/', async (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'User Log in'
    },
    partials: {
      partial: 'partial-users'
    }
  });
  //res.send('respond with a resource');
});

router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Log in'
    },
    partials: {
      partial: 'partial-login'
    }
  })
})

router.get('/register', async (req, res) => {

  res.render('template', {
    locals: {
      title: 'Register',
      email: emailStatus
    },
    partials: {
      partial: 'partial-register'
    }
  })
})

router.post('/register', async (req, res) => {
  const {first_name, last_name, user_email, user_password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user_password, salt);
  const newUser = new userModel(null, first_name, last_name, user_email, hash);
  const checkEmail = await newUser.existingEmail();
  //console.log(checkEmail);
  if (!checkEmail) {
    newUser.createUser();
    res.redirect(200, '/');
  } else {
    emailStatus = `This email address is already registered.`;
    res.render('template', {
      locals: {
        title: 'Register',
        email: emailStatus
      },
      partials: {
        partial: 'partial-register'
      }
    })
  }
  console.log(newUser);
  
})

router.post('/login', async (req, res) => {
  const {user_email, user_password} = req.body;
  console.log(req.body);
  const user = new userModel(null, null, null, user_email, user_password);
  console.log(user);
  const response = await user.logIn();
  console.log('login response is: ', response);
  if (!!response.isValid) {
    req.session.is_logged_in = response.isValid;
    //req.session.id = response.id;
    req.session.first_name = response.first_name;
    req.session.last_name = response.last_name;
    res.redirect(200, '/');
  } else {
    res.redirect(403, '/users/login');
  }
})
module.exports = router;
