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
var FeedPostCtrl = require('../controllers/FeedPostController');
var FeedPostCommentCtrl = require('../controllers/FeedPostCommentController');
var FeedPostCommentReplyCtrl = require('../controllers/FeedPostCommentReplyController');
var QuestionCtrl = require('../controllers/QuestionController');

// Set up token authenticate
var verifyToken = jwt({secret: config.secret});



// AUTHENTICATE CONTROLLER

// Authenticate with Facebook access token or email with password
router.post('/authenticateOrCreateByFB', AuthCtrl.authenticateOrCreateByFB);
router.post('/authenticateByEmail', AuthCtrl.authenticateByEmail);


// USER CONTROLLER
router.patch('/updateUni', UserCtrl.updateUni);
router.get('/user/:id', verifyToken, UserCtrl.getUser);
router.patch('/updateUser', verifyToken, UserCtrl.updateUser);
router.put('/createUser', UserCtrl.createUser);
router.post('/uploadProfile',[verifyToken, upload.single('profilePicture'), UserCtrl.uploadProfile]);


// UNIVERSITY CONTROLLER
router.patch('/updateUniInfo', verifyToken, UniCtrl.updateUniInfo);
router.post('/updateUniLogo', [verifyToken, upload.single('uniLogo'), UniCtrl.updateUniLogo]);
router.get('/universities', UniCtrl.getAllUniversities);
router.put('/university', verifyToken, UniCtrl.createUniversity);
router.get('/university/:id', UniCtrl.getUniversity);
router.get('/universitiesByCountry/:alpha2Code', UniCtrl.getAllUniversitiesForCountry);


// MAIL CONTROLLER
router.get('/verify/:token', MailCtrl.verifyToken);
router.get('/resendVerificationMail/:userId', MailCtrl.resend);

// COUNTRY CONTROLLER
// countries and universities data are public (no need to authenticate)
router.get('/country', CountryCtrl.getAllCountries);
router.get('/country/:id', CountryCtrl.getCountry);

// WIKI CONTROLLER
// use query String to get particular wiki page
router.get('/wikiRecommend', WikiCtrl.getRecommendation);
router.get('/wikiCustomizedRecommend', verifyToken, WikiCtrl.getCustomizedRecommendation);
router.get('/wiki', WikiCtrl.getWiki);  // ?q= &param= [stringified array: {section= &version=}]
router.put('/wiki', verifyToken, WikiCtrl.createNewWiki);
router.put('/wiki/section', verifyToken, WikiCtrl.createNewSection);
router.delete('/wiki/section', verifyToken, WikiCtrl.deleteSection);
router.get('/wiki/section/allVersions', WikiCtrl.getWikiSectionAllVersions);  // ?q= &sectionIndex=
router.put('/wiki/section/version', verifyToken, WikiCtrl.createNewSectionVersion);
// router.post('/wiki/section/version/vote', verifyToken, WikiCtrl.vote);


// STORY CONTROLLER
router.get('/allStories', /*verifyToken,*/ StoryCtrl.getAllStories);
router.post('/story/:id', /*verifyToken,*/ StoryCtrl.getStory);
router.put('/story', verifyToken, StoryCtrl.createStory);


// GROUP CONTROLLER
router.post('/joinGroup', verifyToken, GroupCtrl.joinGroup);
router.post('/leaveGroup', verifyToken, GroupCtrl.leaveGroup);
router.post('/group', verifyToken, GroupCtrl.getGroupIndex);
router.get('/group/:id', verifyToken, GroupCtrl.getGroup);
router.get('/getGroups', GroupCtrl.getGroups);
router.post('/members', verifyToken, GroupCtrl.getMembers);

// FEEDPOST CONTROLLER
router.put('/feedpost', verifyToken, FeedPostCtrl.createFeedPost);
router.get('/feedposts/:id', verifyToken, FeedPostCtrl.getFeedPostByGroup);
router.get('/feedpostsWithComment/:id', verifyToken, FeedPostCtrl.getFeedPostByGroupWithComment);
router.get('/feedpostComment/:id', verifyToken, FeedPostCtrl.getFeedPostComment);
router.patch('/feedpost', verifyToken, FeedPostCtrl.updateFeedPost);
router.delete('/feedpost', verifyToken, FeedPostCtrl.deleteFeedPost);
router.post('/reactToFeedPost', verifyToken, FeedPostCtrl.reactToFeedPost);
router.post('/unreactToFeedPost', verifyToken, FeedPostCtrl.unreactToFeedPost);

// FEEDPOST COMMENT CONTROLLER
router.put('/feedpostComment', verifyToken, FeedPostCommentCtrl.createComment);
router.patch('/feedpostComment', verifyToken, FeedPostCommentCtrl.updateComment);
router.delete('/feedpostComment', verifyToken, FeedPostCommentCtrl.deleteComment);
router.post('/reactToFeedPostComment', verifyToken, FeedPostCommentCtrl.reactToComment);
router.post('/unreactToFeedPostComment', verifyToken, FeedPostCommentCtrl.unreactToComment);

// FEEDPOST COMMENT REPLY CONTROLLER
router.put('/feedpostCommentReply', verifyToken, FeedPostCommentReplyCtrl.createReply);
router.delete('/feedpostCommentReply', verifyToken, FeedPostCommentReplyCtrl.deleteReply);
router.patch('/feedpostCommentReply', verifyToken, FeedPostCommentReplyCtrl.updateReply);

// QUESTION CONTROLLER
router.post('/question', verifyToken, QuestionCtrl.createQuestion);
router.post('/question/:id/vote', verifyToken, QuestionCtrl.voteQuestion);

// MISC
router.get('/signups', function(req, res){
    models.User.findAll().then(function(users){
        res.send('Number of users: ' + users.length)
    })
})
router.get('/me', verifyToken, function(req, res) {
    res.send(req.user);
});

router.get('/', function(req, res) {
    res.json({
        status: 'ok'
    });
});
module.exports = router;
