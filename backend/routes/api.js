var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var models  = require('../models');
var AuthCtrl = require('../controllers/AuthenticateController');
var CountryCtrl = require('../controllers/CountryController');
var UniCtrl = require('../controllers/UniversityController');

// Set up token authenticate
var verifyToken = jwt({secret: config.secret});

router.get('/', function(req, res) {
  res.json({
    status: 'ok'
  });
});

// Authenticate with Facebook access token
router.post('/authenticate', AuthCtrl.authenticate);
// Verify JSWT
router.get('/me', verifyToken, function(req, res) {
  res.send(req.user);
});

router.get('/user/:id', verifyToken, UserCtrl.getUser);

router.get('/country', verifyToken, CountryCtrl.getAllCountries);
router.get('/country/:id', verifyToken, CountryCtrl.getCountry);

router.get('/university', verifyToken, UniCtrl.getAllUniversities);
router.get('/university/:id', verifyToken, UniCtrl.getUniversity);

module.exports = router;
