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
var AnswerCtrl = require('../controllers/AnswerController');
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
router.get('/group/:id/feedposts', verifyToken, FeedPostCtrl.getFeedPostByGroup);
router.put('/group/:id/feedpost', verifyToken, FeedPostCtrl.createFeedPost);
router.get('/group/:id/feedpostsWithComments', verifyToken, FeedPostCtrl.getFeedPostByGroupWithComment);
router.get('/feedpost/:id/comments', verifyToken, FeedPostCtrl.getFeedPostComments);
router.patch('/feedpost/:id', verifyToken, FeedPostCtrl.updateFeedPost);
router.delete('/feedpost/:id', verifyToken, FeedPostCtrl.deleteFeedPost);
router.put('/feedpost/:id/reaction', verifyToken, FeedPostCtrl.reactToFeedPost);
router.delete('/feedpost/:id/reaction', verifyToken, FeedPostCtrl.unreactToFeedPost);

// QUESTION CONTROLLER
router.post('/question', verifyToken, QuestionCtrl.createQuestion);
router.patch('/question/:id', verifyToken, QuestionCtrl.updateQuestion);
router.delete('/question/:id', verifyToken, QuestionCtrl.deleteQuestion);
router.get('/questions', verifyToken, QuestionCtrl.getQuestions);
router.post('/question/:id/vote', verifyToken, QuestionCtrl.voteQuestion);
router.delete('/question/:id/vote', verifyToken, QuestionCtrl.unvoteQuestion);

// ANSWER CONTROLLER
router.put('/question/:id/answer', verifyToken, AnswerCtrl.createAnswer);
router.patch('/answer/:id', verifyToken, AnswerCtrl.updateAnswer);
router.delete('/answer/:id', verifyToken, AnswerCtrl.deleteAnswer);
router.get('/question/:id/answers', verifyToken, AnswerCtrl.getAnswers);
router.post('/answer/:id/vote', verifyToken, AnswerCtrl.voteAnswer);

// FEEDPOST COMMENT CONTROLLER
router.put('/feedpost/:id/comment', verifyToken, FeedPostCommentCtrl.createComment);
router.patch('/feedpost/comment/:id', verifyToken, FeedPostCommentCtrl.updateComment);
router.delete('/feedpost/comment/:id', verifyToken, FeedPostCommentCtrl.deleteComment);
router.put('/feedpost/comment/:id/reaction', verifyToken, FeedPostCommentCtrl.reactToComment);
router.delete('/feedpost/comment/:id/reaction', verifyToken, FeedPostCommentCtrl.unreactToComment);

// FEEDPOST COMMENT REPLY CONTROLLER
router.put('/feedpost/comment/:id/reply', verifyToken, FeedPostCommentReplyCtrl.createReply);
router.patch('/feedpost/comment/reply/:id', verifyToken, FeedPostCommentReplyCtrl.updateReply);
router.delete('/feedpost/comment/reply/:id', verifyToken, FeedPostCommentReplyCtrl.deleteReply);

// MISC
router.get('/signups', function(req, res){
    models.User.findAll().then(function(users){
        res.send('Number of users: ' + users.length)
    })
})
router.get('/me', verifyToken, function(req, res) {
    models.User.findOne({
        where: {
            id: req.user.id
        },
        include: [{
            model: models.University,
            include: [{
                model: models.Country,
                attributes: ['alpha2Code', 'name']
            }]
        }],
        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'fbUserId', 'bio']
    }).then(function(user) {
        console.log(user);
        user.getExchangeEvent().then(function(exchanges){
            models.University.findAll({
                where: {
                    id: {
                        $in: exchanges.map(exchange => exchange.UniversityId)
                    }
                }
            }).then(function(universities){
                for(var university of universities){
                    for(var exchange of exchanges){
                        if(exchange.UniversityId == university.id){
                            exchange.setDataValue("University", university);
                        }
                    }
                }
                user.setDataValue("Exchanges", exchanges);

                res.json(user);
            })

        })

    }).catch(function(err) {
        resError(res, err);
    });
});

router.get('/', function(req, res) {
    res.json({
        status: 'ok'
    });
});


function resError(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}

module.exports = router;
