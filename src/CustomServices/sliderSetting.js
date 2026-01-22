import { Margin } from "@mui/icons-material";

export const settings = {
  slidesToShow: 5, // Show 4 cards on desktop
  slidesToScroll: 1, // Scroll 1 slide at a time
  centerPadding: "0", // Adjust spacing between slides
  infinite: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1200, // Large tablets / small laptops
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992, // Tablets
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576, // Mobile
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
  
 export const setting2 = {
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  export const autoSlideSlider = {
    slidesToShow: 3, // Show 3 slides initially
    slidesToScroll: 1, // Scroll 1 slide at a time
    centerPadding: "0", // Adjust spacing between slides
    // autoplay: true, // Enable auto slide
    autoplaySpeed: 1000, // Set autoplay speed (in ms)
    infinite: false, // Disable infinite looping

    responsive: [
      {
        breakpoint: 576, // Adjust breakpoint according to your design needs
        settings: {
          slidesToShow: 1, // Show 1 slide at this breakpoint
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
      {
        breakpoint: 1200, // Adjust breakpoint according to your design needs
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1, 
        },
      },
    ],
  };


  export var testimonialVideo = {
    dots: false,
    infinite: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  export var testimonial = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  export var mediaSlider = {
    dots: false,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  export var blogVideosSlider = {
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0, 
    arrows: false,
    stagePadding: 0, // Customize stage padding
    margin: 0,
  };