// Run all of this when the document's ready
$(function(){

  // Load all of our UI elements here so that they're cached and super fast
  var metaform = $('#metaform'),
      wordEntry = $('#word-entry'),
      btnEntry = $('.btn-entry'),
      question = $('#question'),
      answer = $('#answer'),
      answerWord = $('#word'),
      answerMetaphor = $('#metaphor');

  // Used later for history state changes
  var metaphorUrlRegex = /metaphor\/(.+)\/(.+)/;

  var showAnswer = function(word, metaphor){
    // Set the text
    answerWord.text(word);
    answerMetaphor.text(metaphor);

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
        $.getJSON('/metaphor/' + word, function(data){
          if(data.metaphor){
            // Save it in the history so it looks like  a legit url
            if(history && history.pushState){
              history.pushState(null, null, '/metaphor/' + data.word + '/' + data.metaphor);
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
      var word = decodeURI(regexResult[1]),
          metaphor = decodeURI(regexResult[2]);
      showAnswer(word, metaphor);
    }else{
      resetForm();
    };
  }

  // When the history changes, load the metaphor or reset the form. Watch for
  // history changes.
  window.addEventListener("popstate", handleHistoryChange);
});

