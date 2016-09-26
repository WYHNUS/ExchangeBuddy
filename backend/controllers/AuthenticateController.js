var graph = require('fbgraph');
var models = require('../models');
var User = models.User;

exports.authenticate = function (req, res) {
  if (!req.body.token) {
    return res.status(400)
      .json({
        message: 'Invalid authenticate data.'
      });
  }
  var facebookToken = req.body.token;
  graph.get("/me?fields=name,id,email&access_token=" + facebookToken, function (error, response) {
    if (error) {
      return res.status(400)
        .json({
          message: error.message
        });
    }

    // If user exists, login.
    // Else, create a login as new user.
    User
      .findOrCreate({
        where: {
          fbUserId: response.id
        },
        defaults: {
          displayName: response.name,
          email: response.email
        }
      })
      .spread(function (user, created) {
        if (created) {
          // For new users, perform other operations before returning the token
          res.json(user.generateJwt());
        } else {
          res.json(user.generateJwt());
        }
      })
      .catch(function(err) {
        return res.status(500).json({
          message: err.message
        });
      });
  });
};
