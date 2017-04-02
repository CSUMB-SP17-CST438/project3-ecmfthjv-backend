module.exports = {
  secret: process.env.JWT_SECRET,
  databaseURI: process.env.MONGODB_URI,
  firebaseAdmin: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: '-----BEGIN PRIVATE KEY-----\n' + process.env.FIREBASE_PRIVATE_KEY + '\n-----END PRIVATE KEY-----\n'
  }
};
