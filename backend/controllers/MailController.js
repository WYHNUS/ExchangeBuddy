var helper = require('sendgrid').mail;
// var AWS = require('aws-sdk');
var models = require('../models');
var User = models.User;

var sendToken = function(token, user){
    var from_email = new helper.Email('noreply@exchangebuddy.com');
    var to_email = new helper.Email(user.email);
    var subject = 'Verify Your Email on ExchangeBuddy';
    var content = new helper.Content('text/html',
        '<html><body>' +
        '<div style="text-align:center; margin: 50px">' +
            '<p>Welcome to ExchangeBuddy!</p>' +
            '<p>Please verify your email on ExchangeBuddy by clicking the follwing link.</p>' + 
            '<a href="http://'+ process.env.HOSTNAME + '/verify/' + token + '" target="_blank" ' +
            'style="line-height: 28px;padding: 10px 12px;background: #4d90fe;border-color: #3079ed;' +
            'border-radius: 10px;color: #ffffff;text-decoration: none;">' +
                'Confirm Email' +
            '</a>' +
        '</div>' +
        '<p> Cheers,</p><p> ExchangeBuddy Team</p>' +
        '</body></html>'
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
                // console.log(response.statusCode);
                // console.log(response.body);
                // console.log(response.headers);
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

exports.resend = function(req, res){
    var userId = req.params.userId;
    User.findOne({
        where: {
            id: userId
        }
    }).then(function(user){
        if(!!user){
            if(user.isEmailVerified){
                res.send({
                    status: 'failed',
                    message: "user is already verified"
                })
            }else{
                exports.sendVerificationEmail(user)
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
                    });
            }
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'user does not exist'
            })
        }
    })
}

exports.sendVerificationEmail = function(user) {
    return models.Token.findOrCreate({
        where: {
            UserId: user.id
        }
    }).then(function(response){
        var token = response[0];
        var created = response[1];
        if(created){
            return sendToken(token.token, user);
        }else{
            var createdAt = token.createdAt.getTime();
            var now = Date.now();
            var disableTime = (process.env.MAIL_DISABLE_TIME || 180000)
            if(now - createdAt >= disableTime){ // disable time 3 mins
                token.setDataValue("createdAt", new Date(now));
                token.save();

                return sendToken(token.token, user);
            }else{
                return new Promise(function(resolve, reject){
                    reject("Resend disabled temporarily, retry in 3 mins");
                })
            }
        }
    })

}

exports.verifyToken = function(req, res){
    models.Token.findOne({
        where: {
            token: req.params.token
        }
    }).then(function(token){
        token.getUser().then(function(user){
            if(!!user){
                if(user.isEmailVerified){
                    res.send({
                        status: 'success',
                        user: user
                    })
                }else{
                    user.isEmailVerified = true;
                    user.save().then(function(){
                        res.send({
                            status: 'success',
                            user: user
                        });
                    });
                }
            }else{
                res.status(422).json({
                    status: 'fail',
                    message: 'verification failed'
                });
            }

        })

    });
}
