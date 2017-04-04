var router = require('express').Router();
var jwt = require('jsonwebtoken');
// Initialize Firebase Admin
var admin = require('firebase-admin');
var config = require('../../config');
var serviceAccountKey = require('../../serviceAccountKey');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://terrasite-58680.firebaseio.com"
});
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
  // Verify user is authenticated by Firebase
  // TODO: Set this function to verifyIdToken instead of getUser
  //admin.auth().verifyIdToken(req.body.idToken)
  admin.auth().getUser(req.body.idToken)
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
