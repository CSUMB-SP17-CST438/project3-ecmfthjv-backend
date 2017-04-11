var admin = require('firebase-admin');
var config = require('../../config');

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseAdmin),
  databaseURL: "https://terrasite-58680.firebaseio.com"
});

module.exports = admin;
