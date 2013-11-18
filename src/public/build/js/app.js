;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamFjay9Qcm9qZWN0cy9jLW0vc3JjL2Fzc2V0cy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFJ1biBhbGwgb2YgdGhpcyB3aGVuIHRoZSBkb2N1bWVudCdzIHJlYWR5XG4kKGZ1bmN0aW9uKCl7XG5cbiAgLy8gTG9hZCBhbGwgb2Ygb3VyIFVJIGVsZW1lbnRzIGhlcmUgc28gdGhhdCB0aGV5J3JlIGNhY2hlZCBhbmQgc3VwZXIgZmFzdFxuICB2YXIgbWV0YWZvcm0gPSAkKCcjbWV0YWZvcm0nKSxcbiAgICAgIHdvcmRFbnRyeSA9ICQoJyN3b3JkLWVudHJ5JyksXG4gICAgICBidG5FbnRyeSA9ICQoJy5idG4tZW50cnknKSxcbiAgICAgIHF1ZXN0aW9uID0gJCgnI3F1ZXN0aW9uJyksXG4gICAgICBhbnN3ZXIgPSAkKCcjYW5zd2VyJyksXG4gICAgICBhbnN3ZXJXb3JkID0gJCgnI3dvcmQnKSxcbiAgICAgIGFuc3dlck1ldGFwaG9yID0gJCgnI21ldGFwaG9yJyk7XG5cbiAgLy8gVXNlZCBsYXRlciBmb3IgaGlzdG9yeSBzdGF0ZSBjaGFuZ2VzXG4gIHZhciBtZXRhcGhvclVybFJlZ2V4ID0gL21ldGFwaG9yXFwvKC4rKVxcLyguKykvO1xuXG4gIHZhciBzaG93QW5zd2VyID0gZnVuY3Rpb24od29yZCwgbWV0YXBob3Ipe1xuICAgIC8vIFNldCB0aGUgdGV4dFxuICAgIGFuc3dlcldvcmQudGV4dCh3b3JkKTtcbiAgICBhbnN3ZXJNZXRhcGhvci50ZXh0KG1ldGFwaG9yKTtcblxuICAgIC8vIFRvZ2dsZSBhbGwgdGhlIGNsYXNzZXMsIGFuZCB1bmRpc2FibGUgdGhlIGJ1dHRvblxuICAgIGJ0bkVudHJ5LmFkZENsYXNzKCdidG4tc3VjY2VzczNkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICBxdWVzdGlvbi5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgYW5zd2VyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBoaWRkZW4gY2xhc3NlcyBhbmQgd2hhdG5vdFxuICB2YXIgcmVzZXRGb3JtID0gZnVuY3Rpb24oKXtcbiAgICB3b3JkRW50cnkudmFsKCcnKTtcbiAgICBidG5FbnRyeS5yZW1vdmVDbGFzcygnYnRuLXN1Y2Nlc3MzZCcpO1xuICAgIHF1ZXN0aW9uLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICBhbnN3ZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQsIGVpdGhlciBzdWJtaXQgdGhlIGZvcm0gb3IgcmVzZXQgdGhlIHN0YXRlXG4gIGJ0bkVudHJ5Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlmKCFidG5FbnRyeS5hdHRyKCdkaXNhYmxlZCcpKXtcbiAgICAgIGlmKGJ0bkVudHJ5Lmhhc0NsYXNzKCdidG4tc3VjY2VzczNkJykpe1xuICAgICAgICAvLyBTYXZlIGl0IGluIHRoZSBoaXN0b3J5IHNvIGl0IGxvb2tzIGxpa2UgIGEgbGVnaXQgdXJsXG4gICAgICAgIGlmKGhpc3RvcnkgJiYgaGlzdG9yeS5wdXNoU3RhdGUpe1xuICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCB0aGUgZm9ybSwgcmVtb3ZlIGNsYXNzZXMgYW5kIHdoYXRub3RcbiAgICAgICAgcmVzZXRGb3JtKCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBnbyBhaGVhZCBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgIG1ldGFmb3JtLnN1Ym1pdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gV2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQsIGdldCB0aGUgZGF0YVxuICBtZXRhZm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgLy8gUHJldmVudCB0aGUgZm9ybSBmcm9tIGFjdHVhbGx5IHN1Ym1pdHRpbmc7IGFqYXggaW5zdGVhZFxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciB3b3JkID0gd29yZEVudHJ5LnZhbCgpO1xuXG4gICAgLy8gT25seSBjb250aW51ZSBpZiB3b3JkIGlzbid0IGVtcHR5XG4gICAgaWYod29yZCAhPSBcIlwiKXtcbiAgICAgIGJ0bkVudHJ5LnJlbW92ZUNsYXNzKCdidG4tZXJyb3IzZCcpO1xuXG4gICAgICAvLyBPbmx5IGRvIGEgdGhpbmcgaWYgd2UncmUgbm90IHdhaXRpbmcgb24gYSByZXNwb25zZVxuICAgICAgaWYoIWJ0bkVudHJ5LmF0dHIoJ2Rpc2FibGVkJykpe1xuXG4gICAgICAgIC8vIFNldCB0aGUgYnV0dG9uIHRvIGRpc2FibGVkIHdoaWxlIGl0IGxvYWRzXG4gICAgICAgIGJ0bkVudHJ5LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgLy8gTG9hZCB0aGUgbWV0YXBob3IgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgICQuZ2V0SlNPTignL21ldGFwaG9yLycgKyB3b3JkLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICBpZihkYXRhLm1ldGFwaG9yKXtcbiAgICAgICAgICAgIC8vIFNhdmUgaXQgaW4gdGhlIGhpc3Rvcnkgc28gaXQgbG9va3MgbGlrZSAgYSBsZWdpdCB1cmxcbiAgICAgICAgICAgIGlmKGhpc3RvcnkgJiYgaGlzdG9yeS5wdXNoU3RhdGUpe1xuICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCAnL21ldGFwaG9yLycgKyBkYXRhLndvcmQgKyAnLycgKyBkYXRhLm1ldGFwaG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2hvdyB0aGUgYW5zd2VyIGluIHRoZSBmaWVsZHNcbiAgICAgICAgICAgIHNob3dBbnN3ZXIoZGF0YS53b3JkLCBkYXRhLm1ldGFwaG9yKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGJ0bkVudHJ5LmFkZENsYXNzKCdidG4tZXJyb3IzZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHZhciBzdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKHBhdGgsIGZuKXtcblxuICB9XG5cbiAgdmFyIGhhbmRsZUhpc3RvcnlDaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHJlZ2V4UmVzdWx0ID0gbWV0YXBob3JVcmxSZWdleC5leGVjKGxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgIGlmKHJlZ2V4UmVzdWx0ICYmIHJlZ2V4UmVzdWx0Lmxlbmd0aCA9PSAzKXtcbiAgICAgIHZhciB3b3JkID0gZGVjb2RlVVJJKHJlZ2V4UmVzdWx0WzFdKSxcbiAgICAgICAgICBtZXRhcGhvciA9IGRlY29kZVVSSShyZWdleFJlc3VsdFsyXSk7XG4gICAgICBzaG93QW5zd2VyKHdvcmQsIG1ldGFwaG9yKTtcbiAgICB9ZWxzZXtcbiAgICAgIHJlc2V0Rm9ybSgpO1xuICAgIH07XG4gIH1cblxuICAvLyBXaGVuIHRoZSBoaXN0b3J5IGNoYW5nZXMsIGxvYWQgdGhlIG1ldGFwaG9yIG9yIHJlc2V0IHRoZSBmb3JtLiBXYXRjaCBmb3JcbiAgLy8gaGlzdG9yeSBjaGFuZ2VzLlxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZUhpc3RvcnlDaGFuZ2UpO1xufSk7XG5cbiJdfQ==
;