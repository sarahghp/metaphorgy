// Load all of the dependencies we need to start up the web server

var http = require('http'),
    connect = require('connect'),
    express = require('express'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    hbs = require('express-hbs');

// Start up a new Express instance, and set the config
var app = express();
app.config = require('./config/config.js');

// Set the port that the webserver should run on
app.set('port', app.config.port);

// Configure the webserver, and set up middleware
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use(connect.compress());

  // Set up static directories; if a file isn't found in one directory, it will
  // fall back to the next
  app.use(express.static(__dirname + '/public/build'));
  app.use(express.static(__dirname + '/assets'));
  app.use(express.static(__dirname + '/public'));

  // Set up handlebars parsing on the server
  app.engine('hbs', hbs.express3({
    partialsDir: __dirname + '/templates',
    layoutsDir: __dirname + '/templates/layouts',
    handlebars: handlebars
  }));

  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/templates');

  // ./routes.js contains all of the routes that the webserver should parse
  require('./routes.js')(app);
});

// Require in error handler
app.err = require('./error');

// Use express's error handler if we're in development, for pretty stack traces
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Create a server using http,
var server = http.createServer(app);

// Start listening on the configured port
server.listen(app.get('port'));


// server running, display welcome message 
console.info('Welcome to Metaphorgy.');

console.info('Running on port ' + app.get('port') + ' using the '
              + app.config.environment + ' environment settings.');

if(app.config.environment == 'development'){
  console.info('Open: http://localhost:' + app.get('port'));
}

