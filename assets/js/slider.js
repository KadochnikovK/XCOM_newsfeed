document.addEventListener("DOMContentLoaded", function () {
  console.log("1: перед newsSlider");
  const newsSlider = new Swiper(".news-slider", {
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    simulateTouch: true,
    grabCursor: true,

    touchRatio: 0.6,
    touchAngle: 45,

    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 2,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 2,
      sticky: true,
    },

    speed: 600,
    resistanceRatio: 0.6,

    breakpoints: {
      320: {
        slidesPerView: 1.05,
        freeMode: {
          enabled: true,
          momentum: true,
          momentumRatio: 3,
          sticky: true,
        },
        speed: 800,
      },
      640: {
        slidesPerView: 2.5,
        freeMode: {
          enabled: true,
          momentum: true,
          momentumRatio: 2,
        },
      },
      1000: {
        slidesPerView: 3.5,
        freeMode: {
          enabled: true,
          momentum: true,
          momentumRatio: 2,
        },
      },
    },

    on: {
      init: function () {
        console.log("News Swiper инициализирован");
      },
      slideChange: function () {
        console.log("Текущий слайд новостей:", this.realIndex);
      },
    },
  });
});
