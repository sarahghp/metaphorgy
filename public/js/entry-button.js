$(document).ready(function(){
  $(".btn-entry").click(
    function(){
      $(".btn-entry").toggleClass("btn-success3d");
      $("#question").fadeToggle("5000", function(){
        $("#answer").fadeToggle("5000");
      });
    }
    );
})