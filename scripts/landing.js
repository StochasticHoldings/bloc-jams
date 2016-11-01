  var revealPoint = function() {
      $(this).css({
          opacity: 1,
          transform: 'scaleX(1) translateY(0)'
      });
  };

  $.each($('.point'), revealPoint);
  var animatePoints = function() {
      forEach(points, revealPoints);
  };

  $(window).load(function() {

      if ($(window).height() > 950) {
          animatePoints();
      }

      var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

      $(window).scroll(function(event) {
          if ($(window).scrollTop() >= scrollDistance) {
              animatePoints();
          }
      });
  });