var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');

var models  = require('../models');
var CountryCtrl = require('../controllers/CountryController');
var UniCtrl = require('../controllers/UniversityController');
var AuthCtrl = require('../controllers/AuthenticateController');
var UserCtrl = require('../controllers/UserController');
var GroupCtrl = require('../controllers/GroupController');
var MailCtrl = require('../controllers/MailController');
var EventCtrl = require('../controllers/EventController');

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
router.put('/verificationemail', UserCtrl.createUser);
router.get('/verify/:token', MailCtrl.verifyToken);

router.get('/country', verifyToken, CountryCtrl.getAllCountries);
router.get('/country/:id', verifyToken, CountryCtrl.getCountry);

router.put('/university', UniCtrl.createUniversity);	// dummy
router.get('/university', /*verifyToken,*/ UniCtrl.getAllUniversities);
router.get('/university/:id', verifyToken, UniCtrl.getUniversity);

router.get('/group', verifyToken, GroupCtrl.getGroupIndex);
router.get('/group/:id', verifyToken, GroupCtrl.getGroup);

router.get('/allEvents', EventCtrl.getAllEvents);
router.put('/event', EventCtrl.createEvent);
router.patch('/event', EventCtrl.updateEvent);
router.delete('/event', EventCtrl.deleteEvent);

module.exports = router;
