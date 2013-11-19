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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYnJlYWtlcnMvU2l0ZXMvbWV0YXBob3JneS9zcmMvYXNzZXRzL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUnVuIGFsbCBvZiB0aGlzIHdoZW4gdGhlIGRvY3VtZW50J3MgcmVhZHlcbiQoZnVuY3Rpb24oKXtcblxuICAvLyBMb2FkIGFsbCBvZiBvdXIgVUkgZWxlbWVudHMgaGVyZSBzbyB0aGF0IHRoZXkncmUgY2FjaGVkIGFuZCBzdXBlciBmYXN0XG4gIHZhciBtZXRhZm9ybSA9ICQoJyNtZXRhZm9ybScpLFxuICAgICAgd29yZEVudHJ5ID0gJCgnI3dvcmQtZW50cnknKSxcbiAgICAgIGJ0bkVudHJ5ID0gJCgnLmJ0bi1lbnRyeScpLFxuICAgICAgcXVlc3Rpb24gPSAkKCcjcXVlc3Rpb24nKSxcbiAgICAgIGFuc3dlciA9ICQoJyNhbnN3ZXInKSxcbiAgICAgIGFuc3dlcldvcmQgPSAkKCcjd29yZCcpLFxuICAgICAgYW5zd2VyTWV0YXBob3IgPSAkKCcjbWV0YXBob3InKTtcblxuICAvLyBVc2VkIGxhdGVyIGZvciBoaXN0b3J5IHN0YXRlIGNoYW5nZXNcbiAgdmFyIG1ldGFwaG9yVXJsUmVnZXggPSAvbWV0YXBob3JcXC8oLispXFwvKC4rKS87XG5cbiAgdmFyIHNob3dBbnN3ZXIgPSBmdW5jdGlvbih3b3JkLCBtZXRhcGhvcil7XG4gICAgLy8gU2V0IHRoZSB0ZXh0XG4gICAgYW5zd2VyV29yZC50ZXh0KHdvcmQpO1xuICAgIGFuc3dlck1ldGFwaG9yLnRleHQobWV0YXBob3IpO1xuXG4gICAgLy8gVG9nZ2xlIGFsbCB0aGUgY2xhc3NlcywgYW5kIHVuZGlzYWJsZSB0aGUgYnV0dG9uXG4gICAgYnRuRW50cnkuYWRkQ2xhc3MoJ2J0bi1zdWNjZXNzM2QnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIHF1ZXN0aW9uLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICBhbnN3ZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIGhpZGRlbiBjbGFzc2VzIGFuZCB3aGF0bm90XG4gIHZhciByZXNldEZvcm0gPSBmdW5jdGlvbigpe1xuICAgIHdvcmRFbnRyeS52YWwoJycpO1xuICAgIGJ0bkVudHJ5LnJlbW92ZUNsYXNzKCdidG4tc3VjY2VzczNkJyk7XG4gICAgcXVlc3Rpb24ucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIGFuc3dlci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZCwgZWl0aGVyIHN1Ym1pdCB0aGUgZm9ybSBvciByZXNldCB0aGUgc3RhdGVcbiAgYnRuRW50cnkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYoIWJ0bkVudHJ5LmF0dHIoJ2Rpc2FibGVkJykpe1xuICAgICAgaWYoYnRuRW50cnkuaGFzQ2xhc3MoJ2J0bi1zdWNjZXNzM2QnKSl7XG4gICAgICAgIC8vIFNhdmUgaXQgaW4gdGhlIGhpc3Rvcnkgc28gaXQgbG9va3MgbGlrZSAgYSBsZWdpdCB1cmxcbiAgICAgICAgaWYoaGlzdG9yeSAmJiBoaXN0b3J5LnB1c2hTdGF0ZSl7XG4gICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IHRoZSBmb3JtLCByZW1vdmUgY2xhc3NlcyBhbmQgd2hhdG5vdFxuICAgICAgICByZXNldEZvcm0oKTtcbiAgICAgIH1lbHNle1xuICAgICAgICAvLyBPdGhlcndpc2UsIGdvIGFoZWFkIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgbWV0YWZvcm0uc3VibWl0KCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBXaGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCwgZ2V0IHRoZSBkYXRhXG4gIG1ldGFmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAvLyBQcmV2ZW50IHRoZSBmb3JtIGZyb20gYWN0dWFsbHkgc3VibWl0dGluZzsgYWpheCBpbnN0ZWFkXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHdvcmQgPSB3b3JkRW50cnkudmFsKCk7XG5cbiAgICAvLyBPbmx5IGNvbnRpbnVlIGlmIHdvcmQgaXNuJ3QgZW1wdHlcbiAgICBpZih3b3JkICE9IFwiXCIpe1xuICAgICAgYnRuRW50cnkucmVtb3ZlQ2xhc3MoJ2J0bi1lcnJvcjNkJyk7XG5cbiAgICAgIC8vIE9ubHkgZG8gYSB0aGluZyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhIHJlc3BvbnNlXG4gICAgICBpZighYnRuRW50cnkuYXR0cignZGlzYWJsZWQnKSl7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBidXR0b24gdG8gZGlzYWJsZWQgd2hpbGUgaXQgbG9hZHNcbiAgICAgICAgYnRuRW50cnkuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAvLyBMb2FkIHRoZSBtZXRhcGhvciBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgICAgJC5nZXRKU09OKCcvbWV0YXBob3IvJyArIHdvcmQsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgIGlmKGRhdGEubWV0YXBob3Ipe1xuICAgICAgICAgICAgLy8gU2F2ZSBpdCBpbiB0aGUgaGlzdG9yeSBzbyBpdCBsb29rcyBsaWtlICBhIGxlZ2l0IHVybFxuICAgICAgICAgICAgaWYoaGlzdG9yeSAmJiBoaXN0b3J5LnB1c2hTdGF0ZSl7XG4gICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsICcvbWV0YXBob3IvJyArIGRhdGEud29yZCArICcvJyArIGRhdGEubWV0YXBob3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTaG93IHRoZSBhbnN3ZXIgaW4gdGhlIGZpZWxkc1xuICAgICAgICAgICAgc2hvd0Fuc3dlcihkYXRhLndvcmQsIGRhdGEubWV0YXBob3IpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgYnRuRW50cnkuYWRkQ2xhc3MoJ2J0bi1lcnJvcjNkJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHN0YXRlQ2hhbmdlID0gZnVuY3Rpb24ocGF0aCwgZm4pe1xuXG4gIH1cblxuICB2YXIgaGFuZGxlSGlzdG9yeUNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgcmVnZXhSZXN1bHQgPSBtZXRhcGhvclVybFJlZ2V4LmV4ZWMobG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgaWYocmVnZXhSZXN1bHQgJiYgcmVnZXhSZXN1bHQubGVuZ3RoID09IDMpe1xuICAgICAgdmFyIHdvcmQgPSBkZWNvZGVVUkkocmVnZXhSZXN1bHRbMV0pLFxuICAgICAgICAgIG1ldGFwaG9yID0gZGVjb2RlVVJJKHJlZ2V4UmVzdWx0WzJdKTtcbiAgICAgIHNob3dBbnN3ZXIod29yZCwgbWV0YXBob3IpO1xuICAgIH1lbHNle1xuICAgICAgcmVzZXRGb3JtKCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIGhpc3RvcnkgY2hhbmdlcywgbG9hZCB0aGUgbWV0YXBob3Igb3IgcmVzZXQgdGhlIGZvcm0uIFdhdGNoIGZvclxuICAvLyBoaXN0b3J5IGNoYW5nZXMuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlSGlzdG9yeUNoYW5nZSk7XG59KTtcblxuIl19
;