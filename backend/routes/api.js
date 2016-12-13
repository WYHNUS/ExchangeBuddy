var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config');
var multer = require('multer');
var upload = multer({dest: __dirname+'/../public/uploads'});

var models  = require('../models');
var CountryCtrl = require('../controllers/CountryController');
var UniCtrl = require('../controllers/UniversityController');
var AuthCtrl = require('../controllers/AuthenticateController');
var UserCtrl = require('../controllers/UserController');
var StoryCtrl = require('../controllers/StoryController');
var WikiCtrl = require('../controllers/WikiController');
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

// Authenticate with Facebook access token or email with password
router.post('/authenticateOrCreateByFB', AuthCtrl.authenticateOrCreateByFB);
router.post('/authenticateByEmail', AuthCtrl.authenticateByEmail);
// Verify JSWT
router.get('/me', verifyToken, function(req, res) {
    res.send(req.user);
});

/*
request:
{
    userId: 1,
    exchangeUniversityId: 1,
    homeUniversityId: 2,
    term: fall/spring,
    year: 2017
}
*/
router.patch('/updateUni', UniCtrl.updateUni);

router.get('/user/:id', verifyToken, UserCtrl.getUser);

/*
request:
{
    bio: "abc",
    website: "a.com",
    birthday: 1234567 (in milliseconds),
    name: "haha",
}
*/
router.patch('/updateUser', verifyToken, UserCtrl.updateUser);
router.put('/createUser', UserCtrl.createUser);
router.post('/uploadProfile',[verifyToken, upload.single('profilePicture'), UserCtrl.uploadProfile]);

router.get('/verify/:token', MailCtrl.verifyToken);
router.get('/resendVerificationMail/:userId', MailCtrl.resend);

// countries and universities data are public (no need to authenticate)
router.get('/country', CountryCtrl.getAllCountries);
router.get('/country/:id', CountryCtrl.getCountry);

router.get('/university', UniCtrl.getAllUniversities);
/*
request:
{
    name: National University of Singapore,
    logoImageUrl: http://...
}
*/
router.put('/university', verifyToken, UniCtrl.createUniversity);
router.get('/university/:id', UniCtrl.getUniversity);

router.post('/messages', verifyToken, ChatCtrl.getMessages);

// use query String to get particular wiki page
router.get('/wikiRecommend', WikiCtrl.getRecommendation);
router.get('/wikiCustomizedRecommend', verifyToken, WikiCtrl.getCustomizedRecommendation);
router.get('/wiki', WikiCtrl.getWiki);  // ?q= &param= [stringified array: {section= &version=}]
router.put('/wiki', verifyToken, WikiCtrl.createNewWiki);
/*
request:
{
    wikiTitle: Singapore,
    versionTitle: History,
    content: <div><p>Singapore has a loooong history. :)</p></div>
}
*/
router.put('/wiki/section', verifyToken, WikiCtrl.createNewSection);
/*
request:
{
    wikiTitle: Singapore,
    sectionIndex: 10
}
*/
router.delete('/wiki/section', verifyToken, WikiCtrl.deleteSection);
router.get('/wiki/section/allVersions', WikiCtrl.getWikiSectionAllVersions);  // ?q= &sectionIndex= 
/*
request:
{
    wikiTitle: Singapore,
    sectionIndex: 1,
    sectionTitle: Food,
    content: <div><p>Singapore has a variety of nice food. :)</p></div>
}
*/
router.put('/wiki/section/version', verifyToken, WikiCtrl.createNewSectionVersion);
// router.post('/wiki/section/version/vote', verifyToken, WikiCtrl.vote);

router.get('/allStories', /*verifyToken,*/ StoryCtrl.getAllStories);
router.post('/story/:id', /*verifyToken,*/ StoryCtrl.getStory);
router.put('/story', verifyToken, StoryCtrl.createStory);

/*
get the groups a user currently belongs to
request:
{
    userId: 1
}
*/
router.post('/joinGroup', verifyToken, GroupCtrl.joinGroup);
router.post('/leaveGroup', verifyToken, GroupCtrl.leaveGroup);
router.post('/group', verifyToken, GroupCtrl.getGroupIndex);
router.get('/group/:id', verifyToken, GroupCtrl.getGroup);
router.get('/getGroups', GroupCtrl.getGroups);

/*
Get group members
request:
{
    GroupId: 1
}
*/
router.post('/members', verifyToken, GroupCtrl.getMembers);


/*
Retrieve all the events posted in requested groups

POST /allEvents
request:
{
    GroupId: 123
}
*/
router.post('/allEvents', verifyToken, EventCtrl.getAllEvents);

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
router.put('/event', verifyToken, EventCtrl.createEvent);

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
router.patch('/event', verifyToken, EventCtrl.updateEvent);

/*
Delete an event

DELETE /event
request:
{
    EventId: 1
}
*/
router.delete('/event', verifyToken, EventCtrl.deleteEvent);

/*
Record the user going for an event

POST /goToEvent
request:
{
    EventId: 1,
    UserId: 1
}
*/
router.post('/unattend', verifyToken, EventCtrl.unGoToEvent);
router.post('/goToEvent', verifyToken, EventCtrl.goToEvent);

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
router.post('/comment', verifyToken, EventCtrl.comment);

/*
Retrievee all the comments of an event

GET /comment/:eventId

*/
router.get('/comment/:eventId', verifyToken, EventCtrl.getComments);
router.get('/signups', function(req, res){
    models.User.findAll().then(function(users){
        res.send('Number of users: ' + users.length)
    })
})
module.exports = router;
