/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');


let emailStatus = '';


router.get('/', async (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'User Log in',
      session: req.session,
    },
    partials: {
      partial: 'partial-users',
    },
  });
  // res.send('respond with a resource');
});

router.get('/login', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Log in',
      session: req.session,
    },
    partials: {
      partial: 'partial-login',
    },
  });
});

router.get('/register', async (req, res) => {
  res.render('template', {
    locals: {
      title: 'Register',
      email: emailStatus,
      session: req.session,
    },
    partials: {
      partial: 'partial-register',
    },
  });
});

router.post('/register', async (req, res) => {
  const {
    first_name, last_name, user_email, user_password,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user_password, salt);
  const newUser = new UserModel(null, first_name, last_name, user_email, hash);
  const checkEmail = await newUser.existingEmail();
  if (!checkEmail) {
    newUser.createUser();
    res.redirect(200, '/');
  } else {
    emailStatus = 'This email address is already registered.';
    res.render('template', {
      locals: {
        title: 'Register',
        email: emailStatus,
        session: req.session,
      },
      partials: {
        partial: 'partial-register',
      },
    });
  }
});

router.post('/login', async (req, res) => {
  const { user_email, user_password } = req.body;
  const user = new UserModel(null, null, null, user_email, user_password);
  const response = await user.logIn();
  if (response.isValid) {
    req.session.is_logged_in = response.isValid;
    req.session.user_id = response.id;
    req.session.first_name = response.first_name;
    req.session.last_name = response.last_name;
    res.redirect(200, '/');
  } else {
    res.redirect(403, '/users/login');
  }
});

router.get('/logout', async (req, res) => {
  res.render('template', {
    locals: {
      title: `GoodBye ${req.session.first_name}.`,
      session: req.session,
    },
    partials: {
      partial: 'partial-logout',
    },
  });
  req.session.destroy();
});


module.exports = router;
