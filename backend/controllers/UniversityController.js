var models = require('../models');
var AWS = require('aws-sdk');
var s3 = require('s3');
var fs = require('fs');
var config = require('../config/config')

var Bucket = "exchangebuddy-university-public-image";
var s3Options = {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
}

var awsS3Client = new AWS.S3(s3Options);
var options = {
    s3Client: awsS3Client
};
var client = s3.createClient(options);

exports.getAllUniversities = function(req, res) {
    models.University.findAll({
        attributes: ['id', 'name', 'city', 'logoImageUrl', 'emailDomains', 'terms']
    }).then(function(universities) {
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUniversity = function(req, res) {
    models.University.create({
        name: req.body.name,
        logoImageUrl: req.body.logoImageUrl,
        emailDomains: JSON.stringify(req.body.emailDomains)
    }).then(function(university) {
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getUniversity = function(req, res) {
    models.University.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(university) {
        res.json(university);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.updateUniInfo = function(req, res) {
    var query = req.body;

    models.University.update(query, {
        where: {
            id: req.body.UniversityId,
        }
    }).then(function(user) {
        res.json({
            status: 'success'
        });
    }).catch(function(err) {
        resError(res, err);
    });
}

exports.updateUniLogo = function(req, res) {
    models.User.findOne({
        where: {
            id: req.body.UniversityId
        }
    }).then(function(university) {
        if (!!university) {
            var dbName = university.name;
            var Key = dbName.split('/')[0].split('(')[0].trim().toLowerCase().replace(/ /g, '-') + '.jpg';
            var params = {
                localFile: req.file.path,
                s3Params: {
                    Bucket,
                    Key,
                    ACL: 'public-read'
                }
            }

            var uploader = client.uploadFile(params);

            uploader.on('error', function(err) {
                console.log(err);
            })

            uploader.on('end', function() {
                var url = s3.getPublicUrl(Bucket, Key, "ap-southeast-1");



                if (!!university.logoImageUrl) {
                    var splitString = university.logoImageUrl.split('/');
                    var Key = splitString[splitString.length - 1];
                    if (!!Key) {
                        client.deleteObjects({
                            Bucket,
                            Delete: {
                                Objects: [{
                                    Key,
                                }]
                            }
                        })
                    }
                }


                university.update({
                    logoImageUrl: url
                })

                fs.unlinkSync(req.file.path);
                res.status(200).send({
                    url,
                    status: 'success'
                })

            })
        } else {
            res.status(400).send({
                status: 'fail',
                message: 'invalid university'
            })
        }
    })

}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
