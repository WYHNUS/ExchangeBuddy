var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');

var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

var models  = require('../models');
var CountryCtrl = require('../controllers/CountryController');
var UniCtrl = require('../controllers/UniversityController');
var AuthCtrl = require('../controllers/AuthenticateController');
var UserCtrl = require('../controllers/UserController');
var StoryCtrl = require('../controllers/StoryController')
var GroupCtrl = require('../controllers/GroupController');
var MailCtrl = require('../controllers/MailController');
var EventCtrl = require('../controllers/EventController');
var ChatCtrl = require('../controllers/ChatController');

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

router.get('/user/:id', /*verifyToken,*/ UserCtrl.getUser);
router.put('/verificationemail', UserCtrl.createUser);
router.get('/verify/:token', MailCtrl.verifyToken);

router.get('/country', /*verifyToken,*/ CountryCtrl.getAllCountries);
router.get('/country/:id', /*verifyToken,*/ CountryCtrl.getCountry);

router.post('/messages', ChatCtrl.getMessages);

router.put('/university', UniCtrl.createUniversity);	// dummy
router.get('/university', /*verifyToken,*/ UniCtrl.getAllUniversities);
router.get('/university/:id', /*verifyToken,*/ UniCtrl.getUniversity);

router.get('/allStories', /*verifyToken,*/ StoryCtrl.getAllStories);
router.get('/story', /*verifyToken,*/ StoryCtrl.getStory);
router.put('/story', /*verifyToken,*/ StoryCtrl.createStory);

/*
get the groups a user currently belongs to
request:
{
    userId: 1
}
*/
router.post('/group', /*verifyToken,*/ GroupCtrl.getGroupIndex);
router.get('/group/:id', /*verifyToken,*/ GroupCtrl.getGroup);

/*
Get group members
request:
{
    GroupId: 1
}
*/
router.post('/members', GroupCtrl.getMembers);


/*
Retrieve all the events posted in requested groups

POST /allEvents
request:
{
    GroupId: 123
}
*/
router.post('/allEvents', EventCtrl.getAllEvents);

/*
Create a new event

PUT /event
request:
{
    lat: 1.111,
    lng: 1.111,
    title: "hello",
    startTime: 123456, (milliseconds)
    endTime: 123456,
    detail: "hello",
    GroupId: 1
    UserId: 1
}
*/
router.put('/event', EventCtrl.createEvent);

/*
Update an event information

PATCH /event
request:
{
    lat: 1.111,
    lng: 1.111,
    title: "hello",
    startTime: 123456, (milliseconds)
    endTime: 123456,
    detail: "hello",
    EventId: 1
}
response:
{
 success: true/false
}
*/
router.patch('/event', EventCtrl.updateEvent);

/*
Delete an event

DELETE /event
request:
{
    EventId: 1
}
*/
router.delete('/event', EventCtrl.deleteEvent);

/*
Record the user going for an event

POST /goToEvent
request:
{
    EventId: 1,
    UserId: 1
}
*/
router.post('/goToEvent', EventCtrl.goToEvent);

/*
Comment on a event

POST /comment
requset:
{
    content: "this is the content",
    EventId: 1,
    UserId: 1
}
*/
router.post('/comment', EventCtrl.comment);

/*
Retrievee all the comments of an event

GET /comment/:eventId

*/
router.get('/comment/:eventId', EventCtrl.getComments);

router.post('/uploadPhoto', function(req, res, err){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})

module.exports = router;
