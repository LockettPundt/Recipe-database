'use strict'
const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {

  res.render('template', { 
    locals: {
      title: 'Welcome!',
      session: req.session
    },
    partials: {
      partial: 'partial-index'
    }
    });
})



module.exports = router;
