var models = require('../models');
var User = models.User;
var Wiki = models.Wiki;
var Section = models.WikiSection;
var Version = models.WikiSectionVersion;

// user get specific wiki page
exports.getWiki = function(req, res) {
    if (!req.body.wikiId) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // find all wikiSections and all current WikiSectionVersion content specific with wiki
        models.sequelize.Promise.all([
            Wiki.findOne({
                where: {
                    id: req.body.wikiId
                }
            }),
            Section.findAll({
                where: {
                    WikiId: req.body.wikiId
                },
                order: '"sectionIndex" DESC'
            })
        ]).spread(function(wiki, sections){
            var displayedSectionVersionArray = sections.map(section => {
                // find list of sectionVersions belong to corresponding section
                return Version.find({
                    where: {
                        WikiSectionId: section.id,
                        versionNumber: section.displayVersionNumber
                    },
                    include: [
                        { model: Section },
                        { 
                            model: User,
                            attributes: ['id', 'name', 'profilePictureUrl']
                        }
                    ]
                });
            });

            models.sequelize.Promise.all(displayedSectionVersionArray).then(versions => {
                res.send({
                    status: 'success',
                    wiki: wiki,
                    sections: versions
                });
            }).catch(function(err) {
                resError(res, err);
            });
        }).catch(function(err) {
            resError(res, err);
        });
    }
}

// get WikiSectionVersion with specified version number
exports.getSectionVersion = function(req, res) {
    // check if version number is valid and return all info if valid
    if (!req.body.wikiId || !req.body.sectionIndex || !req.body.versionNumber) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // find specific version of given section for that wiki

    }
}

// user upload a new version of wiki section
exports.postNewSectionVersion = function(req, res) {
    // this part not sure yet... but quick version is:
    // create new version, hence increase version number and 
    //      --> should this be done (or how else should we differentiate edition and rewrite)?
    // update WikiSection's displayVersionNumber to latest one 
    //      --> should this be done (only until admin change this WikiSection's type)? 
    // IMPORTANT: get user id from token
    // CHECK: disable user frequently editing same version --> should this check exists?
    if (!req.body.wikiId || !req.body.sectionIndex || !req.body.vote) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // change vote and version score
        
    }
}

// user vote up or done for specific version of WikiSectionVersion
exports.vote = function(req, res) {
    // edit user's previous vote or create new Vote if none exists
    // change WikiSectionVersion's score
    // change author's credibility
    if (!req.body.wikiId || !req.body.sectionIndex || !req.body.versionNumber || !req.body.vote) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // change vote and version score
        
    }
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
