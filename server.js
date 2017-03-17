//Configure express server
var express    = require('express');
var app        = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API TEST MESSAGE' });
});

//Register routes
app.use('/api', router);

//Start server
app.listen(port);
console.log('Server listening on port %d in %s mode', app.get('port'), app.get('IP'));
