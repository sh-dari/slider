const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderLine = document.querySelector('.slider__line');
const continueButton = document.querySelector('.body__button');

const sliderButtonPrev = document.querySelector('.slider__prev');
const sliderButtonNext = document.querySelector('.slider__next');
const sliderDots = document.querySelectorAll('.slider__dot');

let sliderWidth = slider.offsetWidth;
let count = 0;
let buttonClicked = ['1'];

const rollSlider = () => {
    sliderLine.style.transform = `translateX(${-count * sliderWidth}px)`;
}

const showSlide = () => {
    sliderWidth = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = `${sliderWidth * sliderItems.length}px`;
    sliderItems.forEach(item => item.style.width = `${sliderWidth}px`);
    rollSlider();
}
showSlide();

const rollToSlide = (index) => {
    sliderDots.forEach(dot => dot.classList.remove('slider__dot_active'));
    sliderDots[index].classList.add('slider__dot_active');
}

const prevSlide = () => {
    count--;
    if (count < 0) count = sliderItems.length - 1;
    rollSlider();
    rollToSlide(count);
}

const isAllSlides = () => {
    buttonClicked.push('' + (count+1));
    let intersection = ['1', '2', '3', '4'].filter(x => !buttonClicked.includes(x));
    if (intersection.length == 0) {
        continueButton.disabled = false;
    }
}

const nextSlide = () => {
    count++;
    if (count >= sliderItems.length) count = 0;
    rollSlider();
    rollToSlide(count);
    isAllSlides();
}

window.addEventListener('resize', showSlide);
sliderButtonPrev.addEventListener('click', prevSlide);
sliderButtonNext.addEventListener('click', nextSlide);
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        count = index;
        rollSlider();
        rollToSlide(count);
        isAllSlides();
    });
});
