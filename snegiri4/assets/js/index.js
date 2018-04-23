$(document).ready(function() {
  
  $(".menu-link").click(function(event) {
    event.preventDefault();
    $(".menu-overlay").toggleClass("open");
    $(".menu").toggleClass("open");

  });

  $(".regular").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $('a[href^="#"]').click(function(){
  var target = $(this).attr('href');
  $('html, body').animate({scrollTop: $(target).offset().top}, 400);
  return false;
  });
});