$(document).ready(function(){
  $(".btn-entry").click(
    function(){
      $(".btn-entry").toggleClass("btn-success3d");
      $("#question, #answer").toggleClass("hidden");
      });
})