var models = require('../models');
var Wiki = models.Wiki;
var Section = models.WikiSection;
var Version = models.WikiSectionVersion;
var defaultUniWikiTemplate = require('../public/DefaultUniversityWikiContent.json');

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
        attributes: ['id', 'name', 'city', 'logoImageUrl', 'website']
    }).then(function(universities){
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.getAllUniversitiesForCountry = function(req, res){
    models.University.findAll({
        where: { 
            countryCode: req.params.alpha2Code 
        },
    	attributes: ['id', 'name', 'city', 'logoImageUrl', 'website']
    }).then(function(universities){
        res.json(universities);
    }).catch(function(err) {
        resError(res, err);
    });
};

exports.createUniversity = function(req, res) {
    var userId = req.body.userId;

    if (!req.body.name || !req.body.logoImageUrl) {
        return res.status(400).json({
                status: 'fail',
                message: 'Invalid post parameter.'
            });
    }
    models.University.create({
        name: req.body.name,
        logoImageUrl: req.body.logoImageUrl
    }).then(function(university) {
        // create wiki and wikiSection for newly added wiki
        Wiki.create({
            title: req.body.name,
            UserId: userId
        }).then(function(wiki){
            var resultSectionArray = Object.keys(defaultUniWikiTemplate).map(title => {
                return Section.create({
                    sectionIndex: defaultUniWikiTemplate[title].index,
                    displayVersionNumber: 1,    // default first version number
                    totalVersionCount: 1,
                    sectionType: 'OpenToEdit',  // default value for now
                    WikiId: wiki.id,
                    UserId: userId
                });
            });

            models.sequelize.Promise.all(resultSectionArray).then(sections => {
                var resultVersionArray = sections.map(section => {
                    for (var title in defaultUniWikiTemplate) {
                        if (defaultUniWikiTemplate[title].index === section.sectionIndex) {
                            return Version.create({
                                title: title,
                                content: defaultUniWikiTemplate[title].content,
                                versionNumber: 1,   // only one exists
                                WikiSectionId: section.id,
                                UserId: userId
                            });
                        }
                    }
                });

                models.sequelize.Promise.all(resultVersionArray).then(versions => {
                    for (var i in versions) {
                        if (!versions[i]) {
                            return res.status(500).json({
                                message: 'university wiki section version creation fail'
                            });
                        }
                    }
                    // indicate successful
                    return res.status(200)
                        .json({
                            status: 'success',
                            university: university
                        });
                });
            });                    
        });
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
