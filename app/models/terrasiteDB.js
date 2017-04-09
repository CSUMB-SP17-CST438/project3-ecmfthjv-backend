//app/models/terasiteDB.js

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = Schema.Types;

var PostsSchema = new Schema({
    name: String,
    longitude: {
      type: SchemaTypes.Double
    },
    latitude: {
      type: SchemaTypes.Double
    },
    altitude: {
      type: SchemaTypes.Double
    },
    content: String,
});

module.exports = mongoose.model('ARposts', PostsSchema);
