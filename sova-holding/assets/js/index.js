$(document).ready(function() {
  $('.main-page').first().delay(200).animate({'opacity':'1'},500);
});

$(document).ready(function() {
  $(".menu-link").click(function(event) {
  			  event.preventDefault();
  			  $(".menu-overlay").toggleClass("open");
  			  $(".menu").toggleClass("open");
  			});
});

$(document).ready(function(){
	$(".top-menu").changeActiveNav();
});
