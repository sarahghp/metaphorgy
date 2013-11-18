var querystring = require('querystring'),
    http = require('http');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('home/home', {
      subtitle: 'Home'
    });
  });

  app.get('/metaphor/:word/:metaphor', function(req, res){
    res.render('home/home', {
      subtitle: 'Game',
      word: req.params.word,
      metaphor: req.params.metaphor
    });
  });

  app.get('/metaphor', function(req, res){
    if(req.query.word){
      res.redirect('/metaphor/' + req.query.word);
    }else{
      res.redirect('/');
    }
  });

  var getMetaphor = function(word, callback){
    var query = {
      useCanonical: true,
      relationshipTypes: 'same-context',
      limitPerRelationshipType: 10,
      api_key: app.config.wordnikAPIKey
    };

    var qs = querystring.stringify(query);

    var url = 'http://api.wordnik.com/v4/word.json/' + word + '/relatedWords?' + qs;

    http.get(url, function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var r = JSON.parse(body),
            metaphor = '',
            words;

        if(r && r.length && r[0].words){
          words = r[0].words,
          metaphor = words[parseInt(Math.random() * words.length)];
        }

        callback(null, metaphor)
      });

    }).on('error', function(e) {
      callback(e, null)
    });
  };

  var getAdjective = function(callback){
    var query = {
      hasDictionaryDef: true,
      includePartOfSpeech: 'adjective',
      minCorpusCount: 1,
      maxCorpusCount: -1,
      minDictionaryCount: 3,
      maxDictionaryCount: -1,
      minLength: 5,
      maxLength: -1,
      api_key: app.config.wordnikAPIKey
    };

    var qs = querystring.stringify(query);

    var url = 'http://api.wordnik.com/v4/words.json/randomWord?' + qs;

    http.get(url, function(res) {
      var body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        var r = JSON.parse(body);
        callback(null, r.word)
      });

    }).on('error', function(e) {
      callback(e, null)
    });

  };

  app.get('/metaphor/:word', function(req, res){
    getMetaphor(req.params.word, function(err, data){
      if(err){
        return app.err(err);
      }

      var word = req.params.word;

      getMetaphor(word, function(err, metaphor){
        getAdjective(function(err, adjective){
          var fullMetaphor = '';

          if(metaphor){
            var fullMetaphor = adjective + ' ' + metaphor;
          }

          res.format({
            html: function(){
              res.redirect('/metaphor/' + word + '/' + fullMetaphor + '/');
            },

            json: function(){
              res.send({
                word: word,
                metaphor: fullMetaphor
              });
            }
          });
        });
      });
    });
  });
};

