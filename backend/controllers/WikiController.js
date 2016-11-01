var models = require('../models');

// user get specific wiki page
exports.getWiki = function(req, res) {
    // return wiki page (together with all wikiSections and all current WikiSectionVersion content)
}

// get WikiSectionVersion with specified version number
exports.getSectionVersion = function(req, res) {
    // check if version number is valid and return all info if valid
}

// user upload a new version of wiki section
exports.postNewVersion = function(req, res) {
    // this part not sure yet... but quick version is:
    // create new version, hence increase version number and 
    //      --> should this be done (or how else should we differentiate edition and rewrite)?
    // update WikiSection's displayVersionNumber to latest one 
    //      --> should this be done (only until admin change this WikiSection's type)? 
    // IMPORTANT: get user id from token
    // CHECK: disable user frequently editing same version --> should this check exists?
}

// user vote up or done for specific version of WikiSectionVersion
exports.vote = function(req, res) {
    // edit user's previous vote or create new Vote if none exists
    // change WikiSectionVersion's score
    // change author's credibility
}

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
