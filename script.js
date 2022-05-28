const slider = document.querySelector(".slider");
const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const navigations = document.querySelectorAll(".slider-button");
const indicator = document.querySelector(".slider-indicator");
const rewievs = document.querySelectorAll(".rewievs-text");

let activeOrder = 0;

init();

function init() {
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];

        slide.dataset.order = i;

        slide.addEventListener("click", clickHandler);
    }

    for (const navigation of navigations) {
        navigation.addEventListener("click", navigationHandler);
    }

    activeOrder = Math.floor(slides.length / 2);

    update();
}

function update() {
    const {
        width,
        height
    } = container.getBoundingClientRect();

    const a = width / 2;
    const b = height / 2 + 50;

    const delta = Math.PI / slides.length / 2;

    for (let i = 0; i < slides.length; i++) {
        const activeSlide = document.querySelector(
            `.slide[data-order = "${activeOrder}"]`
        );

        const leftSlide = document.querySelector(
            `.slide[data-order = "${activeOrder - i}"]`
        );

        if (leftSlide) {
            leftSlide.style.zIndex = slides.length - i;

            leftSlide.style.width = "290px";
            leftSlide.style.left = `${a - 400 * i}px`;

            leftSlide.style.top = `${b - 150 * i}px`;
        }

        const rightSlide = document.querySelector(
            `.slide[data-order = "${activeOrder + i}"]`
        );

        if (rightSlide) {
            rightSlide.style.zIndex = slides.length - i;

            rightSlide.style.width = "290px";
            rightSlide.style.left = `${a + 400 * i}px`;

            rightSlide.style.top = `${b - 150 * i}px`;
        }

        activeSlide.style.width = "400px";
        // activeSlide.style.height = "400px";
        // console.log(`${activeOrder + 1}/${slides.length}`)
        indicator.textContent = `${activeOrder + 1}/${slides.length}`;
        swapRewievsText();
    }
}

function swapRewievsText() {
    rewievs.forEach((item) => {
        item.style.display = "none"
    });
    rewievs[activeOrder].style.display = "block";
}

function clickHandler() {
    const order = parseInt(this.dataset.order, 10);
    activeOrder = order;
    update();
    console.log(navigations)
}

function navigationHandler() {
    const {
        dir
    } = this.dataset;

    if (dir === "prev") {
        activeOrder = Math.max(0, activeOrder - 1);
    } else if (dir === "next") {
        activeOrder = Math.min(slides.length - 1, activeOrder + 1);
    }
    update();
}