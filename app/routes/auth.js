var router = require('express').Router();
var jwt = require('jsonwebtoken');
// Initialize Firebase Admin
var admin = require('../middleware/firebaseAdmin');
var config = require('../../config');

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
  // Verify user is authenticated by Firebase

  admin.auth().verifyIdToken(req.body.idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    // create a token
    var token = jwt.sign(uid, config.secret);
    // return the information including token as JSON
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
    });
  }).catch(function(error) {
    console.log("Error fetching user data:", error);
    res.json({ success: false, message: 'Authentication failed!'});
  });
});

module.exports = router;
