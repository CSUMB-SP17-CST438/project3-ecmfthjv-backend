//app/models/terasiteDB.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var PostsSchema = new Schema({
    name: String,
    location: {
      type: {
        type: String,
        default: 'Point'
      },
      coordinates: [Number]
    },
    altitude: {
      type: Number
    },
    content: String,
});

PostsSchema.index({ location : '2dsphere' });

module.exports = mongoose.model('ARposts', PostsSchema);
