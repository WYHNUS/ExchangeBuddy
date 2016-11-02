var helper = require('sendgrid').mail;
var graph = require('fbgraph');
var md5 = require('md5');

var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;
var Group = models.Group;
var MailCtrl = require('./MailController');

var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('ProfilePic');

// Show a specific user
exports.getUser = function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: University
        }],
        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'fbUserId', 'bio', 'UniversityId']
    }).then(function(user) {
        user.getExchangeEvent().then(function(exchanges){
            user.setDataValue("Exchanges", exchanges);
            res.json(user);
        })

    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUser = function(req, res){
    if (!req.body.password) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid authenticate data.'
            });
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(existingUser) {
        if (!!existingUser) {
            res.status(409)
                .json({
                    status: 'fail',
                    message:'Email account already registered. ' +
                            'Please check your email for account verification. ' +
                            'OR contact ExchangeBuddy admins via admin@exchangebuddy.com'
                });
        } else {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password),
                isEmailVerified: 0
            }).then(function(user){
                MailCtrl.sendVerificationEmail(user)
                .then(function(value) {
                    console.log(value); // Success!
                    res.status(201)
                        .json({
                            status: 'success',
                            message: 'Verification email sent.'
                        });
                }, function(reason) {
                    console.log(reason); // Error!
                    res.status(400)
                        .json({
                            status: 'fail',
                            message: reason
                        });
                })
            })
        }
    }).catch(function(err){
        console.log('error HERE: ', err);
        resError(res, err);
    });
}

exports.updateUser = function(req, res){
    // upload(req, res, function(err){
    //     if(err) console.log(err);
    //     else res.send('ok');
    // });
    var query = {};
    Object.keys(req.body).map((key) => {
        if(req.body[key] != null){
            if(key == "password"){
                query[key] = md5(req.body[key]);
            }else if(key == "birthday"){
                query[key] = new Date(req.body[key]);
            }else{
                query[key] = req.body[key]
            }
        }

    });

    User.update(query, {
        where: {
            id: req.user.id
        }
    }).then(function(user){
        res.send({
            status: 'success'
        })
    }, function(err){
        res.send({
            status: 'fail'
        })
    })
}

function resError(res, err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}
