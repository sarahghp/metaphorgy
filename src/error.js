module.exports = function(req, res, err){
  if(res.status){
    res.status(err.status);
  }

  if(res.headers){
    var i = 0, h;

    for(h in res.headers){
      res.set(h, res.headers[h]);
    }
  }

  res.format({
    html: function(){
      res.render('error/404', {
        subtitle: 'Home',
        title: 'Metaphorgy'
      });
    },

    json: function(){
      res.send(err)
    }
  });
}

