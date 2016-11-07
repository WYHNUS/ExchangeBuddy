var models = require('../models');
var User = models.User;
var Wiki = models.Wiki;
var Section = models.WikiSection;
var Version = models.WikiSectionVersion;
var Vote = models.WikiSectionVote;

// give default recommendation
exports.getRecommendation = function(req, res) {
    Wiki.findAll({
        attributes: ['title'],
        limit: 6,
        order: '"view" DESC'
    }).then(function(wiki) {
        var result = [];
        for (var i=0; i<wiki.length; i++) {
            result.push({
                imageUrl: wiki[i].image,
                name: wiki[i].title
            })
        }

        return res.status(200)
            .json({
                status: 'success',
                wiki: result
            });
    });
}


function shouldAdd(arr, name) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i].name === name) {
            return false;
        }
    }
    return true;
}

// give wiki recommendation based on User
exports.getCustomizedRecommendation = function(req, res) {
    var result = [];

    User.findOne({
        attributes: ['id', 'CountryAlpha2Code', 'UniversityId'],
        where: {
            id: req.user.id
        }
    }).then(function(user) {
        // search for homeUni and homeCountry wiki as well as exchange uni wiki
        models.sequelize.Promise.all([
            models.University.findOne({
                attributes: ['name', 'logoImageUrl', 'bgImageUrl'],
                where: {
                    id: user.UniversityId
                }
            }),

            models.Country.findOne({
                where: {
                    alpha2Code: user.CountryAlpha2Code
                }
            }),

            models.Exchange.findAll({
                include: [{
                    model: User,
                    as: 'exchangeStudent',
                    through: {
                        where: {
                            Userid: user.id
                        }
                    }
                }]
            })
        ]).spread(function(homeUniversity, homeCountry, exchange) {
            if (!!homeUniversity) {
                result.push({
                    imageUrl: homeUniversity.logoImageUrl,
                    name: homeUniversity.name
                });
            }

            if (!!homeCountry) {
                result.push({
                    imageUrl: null,
                    name: homeCountry.name
                });
            }

            if (!!exchange) {
                var exchangeUnis = exchange.map(ex => {
                    // find list of exchange universities
                    return models.University.find({
                        attributes: ['name', 'logoImageUrl', 'bgImageUrl'],
                        where: {
                            id: ex.UniversityId
                        }
                    });
                });

                models.sequelize.Promise.all(exchangeUnis).then(exUni => {
                    for (var i=0; i<exUni.length; i++) {
                        if (shouldAdd(result, exUni[i].name)) {
                            result.push({
                                imageUrl: exUni[i].logoImageUrl,
                                name: exUni[i].name
                            });
                        }
                    }

                    return res.status(200)
                        .json({
                            status: 'success',
                            wiki: result
                        });
                }).catch(function(err) {
                    resError(res, err);
                });
            } else {
                return res.status(200)
                    .json({
                        status: 'success',
                        wiki: result
                    });
            }
        }).catch(function(err) {
            resError(res, err);
        });
    });
}

// user get specific wiki page, if 
exports.getWiki = function(req, res) {
    var query = req.query;
    var historyArray = null;    // to store parsed history

    if (!query.q) {
        invalidError(res);
    } else {
        // check for param validity
        if (!!query.param) {
            try {
                historyArray = JSON.parse(query.param);
            } catch (e) {
                invalidError(res);
            }
        }

        // find all wikiSections
        Wiki.findOne({
            attributes: ['id', 'title', 'view', 'createdAt', 'updatedAt', 'UserId'],
            where: {
                title: query.q
            },
            include: [{
                model: Section,
                attributes: ['id', 'displayVersionNumber', 'totalVersionCount', 'sectionIndex'],
                order: '"sectionIndex" DESC'
            }]
        }).then(function(wiki) {
            if (!wiki) {
                return res.status(404)
                    .json({
                        status: 'fail',
                        message: 'Requested wiki page doesn\'t exist'
                    });
            }

            var displayedSectionVersionArray = wiki.WikiSections.map(section => {
                // find list of sectionVersions belong to corresponding section
                var versionNumber = section.displayVersionNumber;

                // process historyArray if present -- format: [{ sectionIndex: a, versionIndex: b }, ...]
                if (!!historyArray) {
                    for (var i=0; i<historyArray.length; i++) {
                        // if not numerical, return false
                        if (isNaN(historyArray[i].sectionIndex) || isNaN(historyArray[i].versionIndex)) {
                            invalidError(res);
                        }

                        // if match sectionIndex --> 
                        //      here assumes to ignore sectionIndex if it is not valid
                        if (parseInt(historyArray[i].sectionIndex) === section.sectionIndex) {
                            var requestVersionIndex = parseInt(historyArray[i].versionIndex);

                            // if section version number is not valid
                            if (section.totalVersionCount < requestVersionIndex || requestVersionIndex < 1) {
                                invalidError(res);
                            } else {
                                versionNumber = parseInt(historyArray[i].versionIndex);
                            }
                        }
                    }
                }

                return Version.find({
                    attributes: ['title', 'content', 'versionNumber', 'score', 'createdAt', 'updatedAt'],
                    where: {
                        WikiSectionId: section.id,
                        versionNumber: versionNumber
                    },
                    include: [
                        { 
                            model: Section
                        },
                        { 
                            model: User,    // get author
                            attributes: ['id', 'name', 'profilePictureUrl']
                        }
                    ]
                });
            });

            models.sequelize.Promise.all(displayedSectionVersionArray).then(versions => {
                // increase wiki view count
                wiki.update({
                    view: wiki.view + 1
                }).then(function(updatedWiki) {
                    return res.status(200)
                        .json({
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

// user create a new wiki page
exports.createNewWiki = function(req, res) {
    // check if wiki name exists
    if (!req.body.wikiTitle) {
        invalidError(res);
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
                    title: req.body.wikiTitle,
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
exports.createNewSection = function(req, res) {
    // check if wiki name exists
    if (!req.body.wikiTitle || !req.body.versionTitle || !req.body.content) {
        invalidError(res);
    } else {
        // check if wiki exists
        Wiki.findOne({
            attributes: ['id', 'title', 'view', 'createdAt', 'updatedAt', 'UserId'],
            where: {
                title: req.body.wikiTitle
            },
            include: [{
                model: Section,
                attributes: ['id', 'displayVersionNumber'],
                order: '"sectionIndex" DESC'
            }]
        }).then(function(existingWiki) {
            if (!existingWiki) {
                return res.status(404)
                    .json({
                        status: 'fail',
                        message:'wiki doesn\'t exist'
                    });
            } else {
                var displayedSectionVersionArray = existingWiki.WikiSections.map(section => {
                    // find list of sectionVersions belong to corresponding section
                    return Version.find({
                        attributes: ['title', 'content', 'versionNumber', 'score', 'createdAt', 'updatedAt'],
                        where: {
                            WikiSectionId: section.id,
                            versionNumber: section.displayVersionNumber
                        },
                        include: [
                            { 
                                model: Section
                            },
                            { 
                                model: User,    // get author
                                attributes: ['id', 'name', 'profilePictureUrl']
                            }
                        ]
                    });
                });

                models.sequelize.Promise.all(displayedSectionVersionArray).then(versions => {
                    // check if duplicate section title exist
                    for (var i=0; i<versions.length; i++) {
                        if (versions[i].title === req.body.versionTitle) {
                            return res.status(409)
                                .json({
                                    status: 'fail',
                                    message:'wiki section already exist'
                                });
                        }
                    }

                    // filter content -> disallow content less than 10 char?
                    if (req.body.content.length <= 10) {
                        return res.status(409)
                                .json({
                                    status: 'fail',
                                    message: 'too little content'
                                });
                    } else {
                        // create new wikiSection
                        Section.create({
                            sectionIndex: existingWiki.WikiSections.length + 1,
                            displayVersionNumber: 1,    // default first version number
                            totalVersionCount: 1,
                            sectionType: 'OpenToEdit',  // default value for now...
                            WikiId: existingWiki.WikiId,
                            UserId: req.user.id
                        }).then(function(section) {
                            // create first version and assign it to wikiSection
                            Version.create({
                                title: req.body.versionTitle,
                                content: req.body.content,
                                versionNumber: 1,   // only one exists
                                WikiSectionId: section.id,
                                UserId: req.user.id
                            }).then(function(version) {
                                // link the new section to Wiki 
                                existingWiki.addWikiSection(section).then(function(wiki) {
                                    versions.push(version);
                                    return res.status(200)
                                        .json({
                                            status: 'success',
                                            message: 'creation succeed'
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
    // this part not sure yet... but quick solution is:
    // create new version, hence increase version number and 
    //      --> should this be done (or how else should we differentiate edition and rewrite)?
    // update WikiSection's displayVersionNumber to latest one 
    //      --> should this be done (only until admin change this WikiSection's type)? 
    // IMPORTANT: get user id from token
    // CHECK: disable user frequently editing same version --> should this check exists?
    if (!req.body.wikiTitle || !req.body.sectionIndex || !req.body.sectionTitle || !req.body.content) {
        invalidError(res);
    } else {
        // check if wiki and section exists
        Wiki.findOne({
            attributes: ['id', 'title', 'view', 'createdAt', 'updatedAt', 'UserId'],
            where: {
                title: req.body.wikiTitle
            },
            include: [{
                model: Section,
                attributes: ['id', 'displayVersionNumber', 'totalVersionCount', 'sectionIndex'],
                where: {
                    sectionIndex: req.body.sectionIndex
                }
            }]
        }).then(function(wiki) {
            console.log(wiki);
            if (!wiki) {
                return res.status(404)
                    .json({
                        status: 'fail',
                        message:'wiki doesn\'t exist'
                    });
            } 
            // check if new content is the same as the old one
            Version.findOne({
                where: { 
                    versionNumber: wiki.WikiSections[0].displayVersionNumber,
                    WikiSectionId: wiki.WikiSections[0].id
                }
            }).then(function(currentVersion) {
                if (currentVersion.title === req.body.sectionTitle &&
                    currentVersion.content === req.body.content) {
                    return res.status(304)
                            .json({
                                status: 'fail',
                                message: 'Content is the same as previous version.'
                            });
                } else {
                    /*
                        >>>>>>>>>>>>>>>>>>>>  TODO  <<<<<<<<<<<<<<<<<<<<<
                            check if user has the permission to edit
                            based on User.role, User.credibility and
                            WikiSection.sectionType
                        >>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<
                    */
                    // filter content -> disallow content less than 10 char?
                    if (req.body.content.length <= 10) {
                        return res.status(409)
                                .json({
                                    status: 'fail',
                                    message: 'too little content'
                                });
                    } else {
                        Version.create({
                            title: req.body.sectionTitle,
                            content: req.body.content,
                            versionNumber: wiki.WikiSections[0].totalVersionCount + 1,
                            WikiSectionId: wiki.WikiSections[0].id,
                            UserId: req.user.id
                        }).then(function(version) {
                            // update WikiSection's display with the latest version 
                            wiki.WikiSections[0].update({
                                displayVersionNumber: version.versionNumber,
                                totalVersionCount: wiki.WikiSections[0].totalVersionCount + 1
                            }).then(function(updatedSection) {
                                return res.status(200)
                                    .json({
                                        status: 'success',
                                        section: updatedSection,
                                        version: version
                                    });
                                /*
                                    >>>>>>>>>>>>>>>>>>>>  Consider  <<<<<<<<<<<<<<<<<<<<<
                                        maybe can update author's credibility here?
                                    >>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<
                                */
                            }).catch(function(err) {
                                resError(res, err);
                            });
                        }).catch(function(err) {
                            resError(res, err);
                        });
                    }
                }
            }); 
        }).catch(function(err) {
            resError(res, err);
        });
    }
}

// user vote up or done for specific version of WikiSectionVersion
exports.vote = function(req, res) {
    // edit user's previous vote or create new Vote if none exists
    // change WikiSectionVersion's score
    // change author's credibility
    if (!req.body.wikiId || !req.body.sectionIndex || !req.body.versionNumber || !req.body.vote) {
        invalidError(res);
    } else {
        if (req.body.vote !== 0 || req.body.vote !== 1 || req.body.vote !== -1 || req.body.comment.length > 1000) {
            invalidError(res);
        }
        // check if wikiId, SectionIndex and versionNumber are valid
        models.sequelize.Promise.all([
            Wiki.findOne({
                where: {
                    id: req.body.wikiId
                }
            }),
            Section.findOne({
                where: {
                    WikiId: req.body.wikiId,
                    sectionIndex: req.body.sectionIndex
                },
                include: [{
                    model: Version,
                    attributes: ['score'],
                    where: {
                        versionNumber: req.body.versionNumber
                    }
                }]
            })
        ]).spread(function(wiki, section){
            console.log(wiki);
            console.log(section);
            if (!wiki || !section || !section.versions) {
                return res.status(404)
                    .json({
                        status: 'fail',
                        message: 'requested section version doesn\'t exist'
                    });
            } else {
                // check if user has voted before
                Vote.findOne({
                    where: {
                        WikiSectionVersionId: section.versions[0].id,
                        UserId: req.user.id
                    }
                }).then(function(vote) {
                    var userComment = req.body.comment || "";
                    // change vote and version score
                    if (!!vote) {
                        /*
                            >>>>>>>>>>>>>>>>>>>>  TODO  <<<<<<<<<<<<<<<<<<<<<
                                user a weighted sum to calculate based on 
                                User.role (maybe?) and User.credibility
                            >>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<
                        */
                        var previousScore = vote.score;
                        models.sequelize.Promise.all([
                            vote.update({
                                score: req.body.vote,
                                comment: userComment
                            }),
                            section.versions[0].update({
                                score: section.versions[0].score - previousScore + req.body.vote
                            })
                        ]).spread(function(newVote, newSection){
                            console.log(newVote);
                            console.log(newSection);
                            return res.status(200)
                                    .json({
                                        status: 'success'
                                    });
                        });

                    } else {
                        // submit new vote
                        Vote.create({
                            score: req.body.vote,
                            comment: userComment,
                            WikiSectionVersionId: section.versions[0].id,
                            UserId: req.user.id 
                        }).then(function(newVote) {
                            /*
                                >>>>>>>>>>>>>>>>>>>>  TODO  <<<<<<<<<<<<<<<<<<<<<
                                    user a weighted sum to calculate based on 
                                    User.role (maybe?) and User.credibility
                                >>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<
                            */
                            section.versions[0].update({
                                score: section.versions[0].score + newVote.score
                            }).then(function(updatedVersion) {
                                console.log(updatedVersion);
                                return res.status(200)
                                    .json({
                                        status: 'success'
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

function invalidError(res) {
    return res.status(400).json({
        status: 'fail',
        message: 'Invalid query data.'
    });
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}