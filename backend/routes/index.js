var express = require('express');
var router = express.Router();
const {getUserData} = require('../middleware/authmiddleware.js')
const jsend = require('jsend')

/* GET home page. */
router.use(jsend.middleware)
router.get('/', getUserData, function(req, res, next) {
  const locals = {
    title: 'Rapid Crew'
  }
  if (!req.userData) {
    res.render('index', { title: locals.title, user: null });
  }
  res.render('index', { title: locals.title, userData: req.userData });
});

module.exports = router;
