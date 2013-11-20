var querystring = require('querystring'),
    Q = require('q'),
    http = require('http');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('home/home', {
      googleAnalyticsId: app.config.googleAnalyticsId,
      googleAnalyticsDomain: app.config.googleAnalyticsDomain
    });
  });

  app.get('/metaphor/:word/:metaphor', function(req, res){
    var article = 'a';

    if(req.params.metaphor[0].match(/[aeiou]/)){
      article = 'an';
    }

    res.render('home/home', {
      subtitle: 'Game',
      word: req.params.word.replace(/-/g, ' '),
      metaphor: req.params.metaphor.replace(/-/g, ' '),
      article: article,
      googleAnalyticsId: app.config.googleAnalyticsId,
      googleAnalyticsDomain: app.config.googleAnalyticsDomain
    });
  });

  app.get('/metaphor', function(req, res){
    if(req.query.word){
      res.redirect('/metaphor/' + req.query.word);
    }else{
      res.redirect('/');
    }
  });

  var getRandom = function(){
    var deferred = Q.defer();

    var query = {
      hasDictionaryDef: true,
      includePartOfSpeech: 'noun',
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
        deferred.resolve(r.word);
      });

    }).on('error', function(e) {
      deferred.reject(e.message);
    });

    return deferred.promise;
  };

  var getAdjective = function(){
    var deferred = Q.defer();

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
        deferred.resolve(r.word);
      });

    }).on('error', function(e) {
      deferred.reject(e.message)
    });

    return deferred.promise;
  };

  var getMetaphor = function(word){
    var deferred = Q.defer();

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
          deferred.resolve(metaphor)
        }else{
          getRandom().then(deferred.resolve, deferred.reject);
        }
      });

    }).on('error', function(e) {
      deferred.reject(e.message)
    });

    return deferred.promise;
  };

  app.get('/metaphor/:word', function(req, res){
    var word = decodeURIComponent(req.params.word.replace(/-/g, ' ')),
        promise = Q.all([getMetaphor(word), getAdjective()]);

    promise.then(function(arr){
      var metaphor = arr[0],
          adjective = arr[1];

      var fullMetaphor = adjective + ' ' + metaphor;

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
};

