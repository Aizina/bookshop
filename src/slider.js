document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const sliderButtons = document.querySelectorAll('.slider-button');
    let currentIndex = 0;
    const intervalTime = 6000; // 6 секунд
    let autoSlideInterval; // Объявление переменной для хранения идентификатора интервала
  
    function showSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      slides.forEach((slide) => {
      slide.style.display = 'none';
      });
      sliderButtons.forEach((button) => {
        button.classList.remove('active');
      });
  
      slides[index].style.display = 'block';
      sliderButtons[index].classList.add('active');
      currentIndex = index;
    }
  
    sliderButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        showSlide(index);
        resetInterval();
      });
    });
  
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        currentIndex++;
        showSlide(currentIndex);
      }, intervalTime);
    }

    function resetInterval() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    showSlide(currentIndex);
    startAutoSlide();
  });
  