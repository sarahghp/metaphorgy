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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvamFjay9Qcm9qZWN0cy9tZXRhcGhvcmd5L3NyYy9hc3NldHMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBSdW4gYWxsIG9mIHRoaXMgd2hlbiB0aGUgZG9jdW1lbnQncyByZWFkeVxuJChmdW5jdGlvbigpe1xuXG4gIC8vIExvYWQgYWxsIG9mIG91ciBVSSBlbGVtZW50cyBoZXJlIHNvIHRoYXQgdGhleSdyZSBjYWNoZWQgYW5kIHN1cGVyIGZhc3RcbiAgdmFyIG1ldGFmb3JtID0gJCgnI21ldGFmb3JtJyksXG4gICAgICB3b3JkRW50cnkgPSAkKCcjd29yZC1lbnRyeScpLFxuICAgICAgYnRuRW50cnkgPSAkKCcuYnRuLWVudHJ5JyksXG4gICAgICBxdWVzdGlvbiA9ICQoJyNxdWVzdGlvbicpLFxuICAgICAgYW5zd2VyID0gJCgnI2Fuc3dlcicpLFxuICAgICAgYW5zd2VyV29yZCA9ICQoJyN3b3JkJyksXG4gICAgICBhbnN3ZXJNZXRhcGhvciA9ICQoJyNtZXRhcGhvcicpO1xuXG4gIC8vIFVzZWQgbGF0ZXIgZm9yIGhpc3Rvcnkgc3RhdGUgY2hhbmdlc1xuICB2YXIgbWV0YXBob3JVcmxSZWdleCA9IC9tZXRhcGhvclxcLyguKylcXC8oLispLztcblxuICB2YXIgc2hvd0Fuc3dlciA9IGZ1bmN0aW9uKHdvcmQsIG1ldGFwaG9yKXtcbiAgICAvLyBTZXQgdGhlIHRleHRcbiAgICBhbnN3ZXJXb3JkLnRleHQod29yZCk7XG4gICAgYW5zd2VyTWV0YXBob3IudGV4dChtZXRhcGhvcik7XG5cbiAgICAvLyBUb2dnbGUgYWxsIHRoZSBjbGFzc2VzLCBhbmQgdW5kaXNhYmxlIHRoZSBidXR0b25cbiAgICBidG5FbnRyeS5hZGRDbGFzcygnYnRuLXN1Y2Nlc3MzZCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgcXVlc3Rpb24uYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIGFuc3dlci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgaGlkZGVuIGNsYXNzZXMgYW5kIHdoYXRub3RcbiAgdmFyIHJlc2V0Rm9ybSA9IGZ1bmN0aW9uKCl7XG4gICAgd29yZEVudHJ5LnZhbCgnJyk7XG4gICAgYnRuRW50cnkucmVtb3ZlQ2xhc3MoJ2J0bi1zdWNjZXNzM2QnKTtcbiAgICBxdWVzdGlvbi5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgYW5zd2VyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLCBlaXRoZXIgc3VibWl0IHRoZSBmb3JtIG9yIHJlc2V0IHRoZSBzdGF0ZVxuICBidG5FbnRyeS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZighYnRuRW50cnkuYXR0cignZGlzYWJsZWQnKSl7XG4gICAgICBpZihidG5FbnRyeS5oYXNDbGFzcygnYnRuLXN1Y2Nlc3MzZCcpKXtcbiAgICAgICAgLy8gU2F2ZSBpdCBpbiB0aGUgaGlzdG9yeSBzbyBpdCBsb29rcyBsaWtlICBhIGxlZ2l0IHVybFxuICAgICAgICBpZihoaXN0b3J5ICYmIGhpc3RvcnkucHVzaFN0YXRlKXtcbiAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCAnLycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIGZvcm0sIHJlbW92ZSBjbGFzc2VzIGFuZCB3aGF0bm90XG4gICAgICAgIHJlc2V0Rm9ybSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIC8vIE90aGVyd2lzZSwgZ28gYWhlYWQgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICBtZXRhZm9ybS5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIFdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkLCBnZXQgdGhlIGRhdGFcbiAgbWV0YWZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgIC8vIFByZXZlbnQgdGhlIGZvcm0gZnJvbSBhY3R1YWxseSBzdWJtaXR0aW5nOyBhamF4IGluc3RlYWRcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgd29yZCA9IHdvcmRFbnRyeS52YWwoKTtcblxuICAgIC8vIE9ubHkgY29udGludWUgaWYgd29yZCBpc24ndCBlbXB0eVxuICAgIGlmKHdvcmQgIT0gXCJcIil7XG4gICAgICBidG5FbnRyeS5yZW1vdmVDbGFzcygnYnRuLWVycm9yM2QnKTtcblxuICAgICAgLy8gT25seSBkbyBhIHRoaW5nIGlmIHdlJ3JlIG5vdCB3YWl0aW5nIG9uIGEgcmVzcG9uc2VcbiAgICAgIGlmKCFidG5FbnRyeS5hdHRyKCdkaXNhYmxlZCcpKXtcblxuICAgICAgICAvLyBTZXQgdGhlIGJ1dHRvbiB0byBkaXNhYmxlZCB3aGlsZSBpdCBsb2Fkc1xuICAgICAgICBidG5FbnRyeS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIC8vIExvYWQgdGhlIG1ldGFwaG9yIGZyb20gdGhlIHNlcnZlclxuICAgICAgICAkLmdldEpTT04oJy9tZXRhcGhvci8nICsgd29yZCwgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgaWYoZGF0YS5tZXRhcGhvcil7XG4gICAgICAgICAgICAvLyBTYXZlIGl0IGluIHRoZSBoaXN0b3J5IHNvIGl0IGxvb2tzIGxpa2UgIGEgbGVnaXQgdXJsXG4gICAgICAgICAgICBpZihoaXN0b3J5ICYmIGhpc3RvcnkucHVzaFN0YXRlKXtcbiAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgJy9tZXRhcGhvci8nICsgZGF0YS53b3JkICsgJy8nICsgZGF0YS5tZXRhcGhvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNob3cgdGhlIGFuc3dlciBpbiB0aGUgZmllbGRzXG4gICAgICAgICAgICBzaG93QW5zd2VyKGRhdGEud29yZCwgZGF0YS5tZXRhcGhvcik7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBidG5FbnRyeS5hZGRDbGFzcygnYnRuLWVycm9yM2QnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICB2YXIgc3RhdGVDaGFuZ2UgPSBmdW5jdGlvbihwYXRoLCBmbil7XG5cbiAgfVxuXG4gIHZhciBoYW5kbGVIaXN0b3J5Q2hhbmdlID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciByZWdleFJlc3VsdCA9IG1ldGFwaG9yVXJsUmVnZXguZXhlYyhsb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICBpZihyZWdleFJlc3VsdCAmJiByZWdleFJlc3VsdC5sZW5ndGggPT0gMyl7XG4gICAgICB2YXIgd29yZCA9IGRlY29kZVVSSShyZWdleFJlc3VsdFsxXSksXG4gICAgICAgICAgbWV0YXBob3IgPSBkZWNvZGVVUkkocmVnZXhSZXN1bHRbMl0pO1xuICAgICAgc2hvd0Fuc3dlcih3b3JkLCBtZXRhcGhvcik7XG4gICAgfWVsc2V7XG4gICAgICByZXNldEZvcm0oKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgaGlzdG9yeSBjaGFuZ2VzLCBsb2FkIHRoZSBtZXRhcGhvciBvciByZXNldCB0aGUgZm9ybS4gV2F0Y2ggZm9yXG4gIC8vIGhpc3RvcnkgY2hhbmdlcy5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVIaXN0b3J5Q2hhbmdlKTtcbn0pO1xuXG4iXX0=
;