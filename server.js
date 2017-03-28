//server.js

// BASE SETUP
// =============================================================================

//Configure express server
var express    = require('express');
var app        = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
var uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);//connect to db

var ARposts = require('./app/models/terrasiteDB')

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


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
        arpost.longitude = req.body.longitude;
        arpost.latitude = req.body.latitude;
        arpost.content = req.body.content;
    
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
        ARPosts.findById(req.params.arpost_id, function(err, arpost) {
            if (err)
                res.send(err);
            res.json(arpost);
        });
    })
    //change the name of a poster (what parts of a post do we want to be changed? name? content? not sure)
    .put(function(req, res){
        
        ARPosts.findById(req.params.arpost_id, function(err, arpost){
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
        ARPosts.remove({
            _id: req.params.arpost_id
        }, function(err, bear){
            if(err)
                res.send(err);
                
            res.json({message: 'Successfully deleted'});
        });
    });


//Register routes
app.use('/api', router);

//Start server
var Server = app.listen(port);
console.log('Server listening on port %d in %s mode', port, app.get('env'));

module.exports = Server;
