var jwt = require('jsonwebtoken');
var admin = require('../middleware/firebaseAdmin');
var config = require('../../config');

module.exports = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var idToken = req.body.idToken || req.query.idToken || req.headers['idtoken'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;

      jwt.verify(token, config.secret, function(err, decoded) {
        if (err || uid !== decoded) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    }).catch(function(error) {
      console.log(error);
      return res.json({ success: false, message: 'Failed to authenticate token.' });
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
};
