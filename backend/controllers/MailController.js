var helper = require('sendgrid').mail;
var models = require('../models');
var User = models.User;

var host = 'localhost:3000';

exports.sendVerificationEmail = function(user) {
    var token = user.verificationToken;
    var from_email = new helper.Email('noreply@exchangebuddy.com');
    var to_email = new helper.Email(user.email);
    var subject = 'Verify Your Email on ExchangeBuddy';
    var content = new helper.Content('text/plain',
'Please verify your email on ExchangeBuddy by clicking the follwing link.\n http://'+ host + '/verify/' + token
);
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
}

exports.verifyToken = function(req, res){
    User.findOne({
        where: {
            verificationToken: req.params.token
        }
    }).then(function(user){
        if(!!user){
            user.isEmailVerified = true;
            user.save().then(function(){
                res.send({
                    status: 'success'
                });
            });

        }else{
            res.send({
                status: 'verification failed'
            });
        }

    });
}
