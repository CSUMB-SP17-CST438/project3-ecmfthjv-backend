//app/models/terasiteDB.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostsSchema = new Schema({
    name: String,
    longitude: String,//what's the best datatype for long/lat?
    latitude: String,
    content: String
})

module.exports = mongoose.model('ARposts', PostsSchema);
