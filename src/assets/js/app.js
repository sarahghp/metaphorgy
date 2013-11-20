// Run all of this when the document's ready
$(function(){

  // Load all of our UI elements here so that they're cached and super fast
  var metaform = $('#metaform'),
      wordEntry = $('#word-entry'),
      btnEntry = $('.btn-entry'),
      question = $('#question'),
      answer = $('#answer'),
      answerWord = $('#word'),
      answerMetaphor = $('#metaphor'),
      answerArticle = $('#article'),
      twitterShare = $('#twitter-share'),
      title = $('title');

  // Used later for history state changes
  var metaphorUrlRegex = /metaphor\/(.+)\/(.+)/;

  var showAnswer = function(word, metaphor){
    var metaphorSlug = metaphor.replace(/\s/g, '-'),
        wordSlug = word.replace(/\s/g, '-'),
        article = 'a';

    if(metaphor[0].match(/[aeiou]/)){
      article = 'an';
    }


    // Set the text
    answerWord.text(word);
    answerMetaphor.text(metaphor);
    answerArticle.text(article);

    title.text('Metaphorgy: My ' + word + ' is ' + article + ' ' + metaphor);

    twitterShare.attr('href',
      'http://twitter.com/intent/tweet?url=http://www.metaphor.gy/metaphor/' + wordSlug + '/' + metaphorSlug +
        '&text=My ' + word + ' is ' + article + ' ' + metaphor + '.&hashtags=metaphorgy');

    // Toggle all the classes, and undisable the button
    btnEntry.addClass('btn-success3d').removeAttr('disabled');
    question.addClass('hidden');
    answer.removeClass('hidden');
  }

  // Reset the hidden classes and whatnot
  var resetForm = function(){
    wordEntry.val('');
    btnEntry.removeClass('btn-success3d');
    question.removeClass('hidden');
    answer.addClass('hidden');

    title.text('Metaphorgy: Metaphor Generator');
  }

  // When the button is clicked, either submit the form or reset the state
  btnEntry.on('click', function(e){
    e.preventDefault();

    if(!btnEntry.attr('disabled')){
      if(btnEntry.hasClass('btn-success3d')){
        // Save it in the history so it looks like  a legit url
        if(history && history.pushState){
          history.pushState(null, null, '/');
        }

        // Reset the form, remove classes and whatnot
        resetForm();
      }else{
        // Otherwise, go ahead and submit the form
        metaform.submit();
      }
    }
  });

  // When the form is submitted, get the data
  metaform.on('submit', function(e){
    // Prevent the form from actually submitting; ajax instead
    e.preventDefault();

    var word = wordEntry.val();

    // Only continue if word isn't empty
    if(word != ""){
      btnEntry.removeClass('btn-error3d');

      // Only do a thing if we're not waiting on a response
      if(!btnEntry.attr('disabled')){

        // Set the button to disabled while it loads
        btnEntry.attr('disabled', 'disabled');

        // Load the metaphor from the server
        $.getJSON('/metaphor/' + encodeURIComponent(word.replace(/\s/g, '-')), function(data){
          if(data.metaphor){
            var metaphorSlug = encodeURIComponent(data.metaphor.replace(/\s/g, '-')),
                wordSlug = encodeURIComponent(word.replace(/\s/g, '-'));

            // Save it in the history so it looks like  a legit url
            if(history && history.pushState){
              history.pushState(null, null, '/metaphor/' + wordSlug + '/' + metaphorSlug);
            }

            // Track the metaphor in google analytics, if available
            if(typeof ga != 'undefined' && ga){
              ga('send', 'event', 'metaphor', 'create', word);
            }

            // Show the answer in the fields
            showAnswer(data.word, data.metaphor);
          }else{
            btnEntry.addClass('btn-error3d').removeAttr('disabled');
          }
        });
      }
    }
  });

  var stateChange = function(path, fn){

  }

  var handleHistoryChange = function(e) {
    var regexResult = metaphorUrlRegex.exec(location.pathname);

    if(regexResult && regexResult.length == 3){
      var word = decodeURIComponent(regexResult[1]).replace(/-/g, ' '),
          metaphor = decodeURIComponent(regexResult[2]).replace(/-/g, ' ');

      showAnswer(word, metaphor);
    }else{
      resetForm();
    };
  }

  // When the history changes, load the metaphor or reset the form. Watch for
  // history changes.
  window.addEventListener("popstate", handleHistoryChange);
});

