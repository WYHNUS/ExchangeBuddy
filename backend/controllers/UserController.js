var helper = require('sendgrid').mail;
var models = require('../models');
var User = models.User;
var University = models.University;
var Exchange = models.Exchange;

// Show a specific user
exports.getUser = function(req, res) {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'email', 'name', 'profilePictureUrl', 'bio']
    }).then(function(user) {
        res.json(user);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUser = function(req, res){
    models.sequelize.Promise.all([
        User.create({
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            fbUserId: req.body.facebookToken,
            isEmailVerified: 0
        }),
        University.findOne({
            where: {
                id: req.body.homeUniversity.id
            }
        }),
        Exchange.findOne({
            where: {
                year: req.body.exchangeYear,
                term: req.body.exchangeSem,
                UniversityId: req.body.exchangeUniversity.id
            }
        })
    ]).spread(function(user, homeUniversity, exchange){
        if(!!user && !!homeUniversity && !!exchange){
            user.setUniversity(homeUniversity);
            user.addExchangeEvent(exchange);

            // send verification email

            var from_email = new helper.Email('exchangebuddy@exchangebuddy.com');
            var to_email = new helper.Email('zhang.hanming.official@gmail.com');
            var subject = 'Hello World from the SendGrid Node.js Library!';
            var content = new helper.Content('text/plain', 'Hello, Email!');
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON(),
            });
            sg.API(request, function(error, response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
            res.status(200).send({
                success: true
            });
        }
    }).catch(function(err){
        resError(res, err);
    });
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
