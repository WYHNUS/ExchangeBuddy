var helper = require('sendgrid').mail;
// var AWS = require('aws-sdk');
var models = require('../models');
var User = models.User;

exports.sendVerificationEmail = function(user) {
    var token = user.verificationToken;
    var from_email = new helper.Email('noreply@exchangebuddy.com');
    var to_email = new helper.Email(user.email);
    var subject = 'Verify Your Email on ExchangeBuddy';
    var content = new helper.Content('text/plain',
'Please verify your email on ExchangeBuddy by clicking the follwing link.\n http://'+ process.env.HOSTNAME + '/verify/' + token
);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    return new Promise(function(resolve, reject) {
        sg.API(request, function(error, response) {
            if (error===null) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                if (response.body.error) {
                    console.log(response.body + " error on server");
                    reject(response.body.error);
                }
                resolve(response);
            } else {
                console.log(error);
                reject(error);
            }
        });
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
                    status: 'success',
                    user: user
                });
            });
        }else{
            res.status(422).json({
                status: 'fail',
                message: 'verification failed'
            });
        }

    });
}
