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
                // increase wiki view count
                wiki.update({
                    view: wiki.view + 1;
                }).then(function(updatedWiki) {
                    console.log(updatedWiki);
                    res.send({
                        status: 'success',
                        wiki: updatedWiki,
                        sections: versions
                    });
                }).catch(function(err) {
                    resError(res, err);
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

// user create a new wiki page
exports.createNewWiki = function(req, res) {
    // check if wiki name exists
    if (!req.body.wikiTitle) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // check if wiki exists
        Wiki.findOne({
            where: {
                title: req.body.wikiTitle
            }
        }).then(function(existingWiki) {
            if (!!existingWiki) {
                return res.status(409)
                    .json({
                        status: 'fail',
                        message:'wiki already exists',
                        wiki: existingWiki
                    });
            } else {
                Wiki.create({
                    name: req.body.wikiTitle,
                    UserId: req.user.id
                }).then(function(wiki){    
                    return res.status(200)
                        .json({
                            status: 'success',
                            wiki: wiki
                        });
                });
            }
        }).catch(function(err){
            resError(res, err);
        });
    }
}

// user create a new wikiSection page, together with first version
exports.createNewWikiSection = function(req, res) {
    // check if wiki name exists
    if (!req.body.wikiId || !req.body.sectionName || !req.body.content) {
        return res.status(400)
            .json({
                status: 'fail',
                message: 'Invalid query data.'
            });
    } else {
        // check if wiki exists
        Wiki.findOne({
            where: {
                title: req.body.wikiId
            }
        }).then(function(existingWiki) {
            if (!existingWiki) {
                return res.status(404)
                    .json({
                        status: 'fail',
                        message:'wiki doesn\'t exist'
                    });
            } else {
                // wiki exists, check if section already exist
                Section.findAll({
                    where: {
                        WikiId: existingWiki.WikiId
                    }
                }).then(function(existingSections) {
                    for (var i=0; i<existingSections.length; i++) {
                        if (existingSections[i].name === req.body.sectionName) {
                            return res.status(409)
                                .json({
                                    status: 'fail',
                                    message:'wiki section already exist'
                                });
                        }
                    }
                    // filter content -> disallow content less than 100 char?
                    if (req.body.content.length <= 100) {
                        return res.status(409)
                                .json({
                                    status: 'fail',
                                    message: 'too little content'
                                });
                    } else {
                        // create wikiSection
                        Section.create({
                            name: req.body.sectionName,
                            sectionIndex: existingSections.length + 1,
                            displayVersionNumber: 1,    // default first version number
                            sectionType: 'OpenToEdit',  // default value for now...
                            WikiId: existingWiki.WikiId,
                            UserId: req.user.id
                        }).then(function(section) {
                            // create first version and assign it to wikiSection
                            Version.create({
                                content: req.body.content,
                                versionNumber: 1,   // only one exists
                                WikiSectionId: section.id,
                                UserId: req.user.id
                            }).then(function(version) {
                                // link the new section to Wiki 
                                existingWiki.addWikiSection(section).then(function(wiki) {
                                    return res.status(200)
                                        .json({
                                            status: 'success',
                                            wiki: wiki,
                                            section: section,
                                            version: version
                                        });
                                }).catch(function(err) {
                                    resError(res, err);
                                });
                            }).catch(function(err) {
                                resError(res, err);
                            });
                        }).catch(function(err) {
                            resError(res, err);
                        });
                    }
                }).catch(function(err) {
                    resError(res, err);
                });
            }
        }).catch(function(err) {
            resError(res, err);
        });
    }
}

// user upload a new version of wiki section
exports.createNewSectionVersion = function(req, res) {
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
