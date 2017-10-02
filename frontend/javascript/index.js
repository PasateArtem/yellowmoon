'use strict';

requirejs.config({
    baseUrl: './js',
    paths: {
        
    }
});

requirejs([
     'domReady',
    'jquery',
    'jquery-ui',
    'slick'
], function(a, $) {
    
     
    $('.slider').slick({
        dots: true,
        autoplay: true,
        appendDots: false,
        prevArrow: false,
        nextArrow: false,
        slidesToShow: 6,
        responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
     });

$(".auth_buttons").click(function() {
    $(this).next().slideToggle();
  });
    
});