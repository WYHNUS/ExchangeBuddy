var models = require('../models');

// user create journal
exports.createJournal = function(req, res) {
    var isJournalPublic = true;
    if (!!req.body.isPublic) {
        isJournalPublic = req.body.isPublic;
    }
    models.Journal.create({
        content: req.body.journalContent,
        isPublic: req.body.isJournalPublic,
        UserId: req.body.userId
    }).then(function(journal) {
        res.json(journal);
    }).catch(function(err) {
        resError(res, err);
    });
}

// get journal with specified journal id
exports.getJournal = function(req, res) {
    models.Journal.findOne({
        where: {
            id: req.body.journalId
        },
        include: [{
            model: models.User,
            attributes: ['id']
        }]
    }).then(function(journal){
        if (!!journal) {
            if (!journal.isPublic && journal.UserId === req.body.userId) {
                res.json(journals);
            } else {
                res.status(401)
                    .json({
                        status: 'fail',
                        message: 'Sorry, you are not allowed to view this journal. :o'
                    });
            }
        } else {
            res.status(404)
                .json({
                    status: 'fail',
                    message: 'Journal not found.'
                });
        }
    }).catch(function(err) {
        resError(res, err);
    });
}

// get all journals id belongs to all people
exports.getAllJournals = function(req, res){
    models.Journal.findAll({
        where: {
            isPublic: true
        }
    }).then(function(journals){
        res.json(journals);
    }).catch(function(err) {
        resError(res, err);
    });
};

function resError(res, err) {
    return res.status(500).json({
        message: err.message
    });
}
