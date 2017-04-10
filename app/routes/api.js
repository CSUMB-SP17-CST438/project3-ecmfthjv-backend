var router = require('express').Router();
var geolib = require('geolib');

var ARposts = require('../models/terrasiteDB');

//middleware to use for all requests
router.use(function(req, res, next){
  //do logging
  console.log('Request was received.');
  next();//go to next routes, don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'API TEST MESSAGE' });
});

//routes that end with /arposts
//----------------------------------------------
router.route('/arposts')

//create a new post (accessed at POST http://localhost:8080/api/arposts)
.post(function(req, res){

  var arpost = new ARposts();//create new instance of post model
  arpost.name = req.body.name;//set name & other values of post
  arpost.location.coordinates = [req.body.longitude, req.body.latitude];
  arpost.content = req.body.content;
  arpost.altitude = req.body.altitude;

  //save the post & check for errors
  arpost.save(function(err){
    if(err)
    res.send(err);

    res.json({message: 'Post created!'});
  });
})

//get all the posts
.get(function(req, res) {
  ARposts.find(function(err, arposts){
    if(err)
    res.send(err);

    res.json(arposts);
  });
});

router.route('/arposts/:arpost_id')

// get the post with that id
.get(function(req, res) {
  ARposts.findById(req.params.arpost_id, function(err, arpost) {
    if (err)
    res.send(err);
    res.json(arpost);
  });
})
//change the name of a poster (what parts of a post do we want to be changed? name? content? not sure)
.put(function(req, res){

  ARposts.findById(req.params.arpost_id, function(err, arpost){
    if(err)
    res.send(err);

    arpost.name = req.body.name;//update post name

    arpost.save(function(err){
      if(err)
      res.send(err);

      res.json({message: 'Poster name updated!'});
    });
  });
})

//delete a post
.delete(function(req, res){
  ARposts.remove({
    _id: req.params.arpost_id
  }, function(err, bear){
    if(err)
    res.send(err);

    res.json({message: 'Successfully deleted'});
  });
});


router.route('/arposts/:latitude/:longitude/:altitude')

.get(function(req, res) {
  // Query for data points inside of boundaries
  ARposts.aggregate(
    [
      { "$geoNear": {
        near: {
          type: 'Point',
          coordinates: [geolib.useDecimal(req.params.longitude), geolib.useDecimal(req.params.latitude)]
        },
        "distanceField": "distance",
        "spherical": true,
        "maxDistance": 200
      }}
    ],
    function(err,results) {
      if(err){
        //console.log(err);
      }
      console.log(results);
      res.json(results);
    }
  );

});

module.exports = router;
