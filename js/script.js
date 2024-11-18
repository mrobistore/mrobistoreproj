document.addEventListener("DOMContentLoaded", () => {
    // Floating Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".menu-items");

    // Toggle Floating Menu
    menuToggle.addEventListener("click", () => {
        menuItems.classList.toggle("hidden");
        menuToggle.querySelector("i").classList.toggle("fa-bars");
        menuToggle.querySelector("i").classList.toggle("fa-times");
    });

    // Hide Floating Menu on Outside Click
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !menuItems.contains(event.target)) {
            menuItems.classList.add("hidden");
            menuToggle.querySelector("i").classList.add("fa-bars");
            menuToggle.querySelector("i").classList.remove("fa-times");
        }
    });

    // Hide Floating Menu When Clicking a Menu Item
    menuItems.addEventListener("click", () => {
        menuItems.classList.add("hidden");
        menuToggle.querySelector("i").classList.add("fa-bars");
        menuToggle.querySelector("i").classList.remove("fa-times");
    });

    // Carousel
    const slides = document.querySelectorAll(".carousel-slide");
    const carouselContainer = document.querySelector(".carousel-container");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const indicators = document.querySelectorAll(".indicator");

    let currentSlide = 0;

    // Update Slide Position
    function updateSlidePosition() {
        const offset = -currentSlide * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
        updateIndicators(currentSlide);
    }

    // Update Active Indicators
    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === index);
        });
    }

    // Go to Next Slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    }

    // Go to Previous Slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    // Add Event Listeners for Carousel
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentSlide = index;
            updateSlidePosition();
        });
    });

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeLightbox = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".carousel-slide img");

    // Open Lightbox
    galleryImages.forEach((image) => {
        image.addEventListener("click", () => {
            lightboxImage.src = image.src;
            lightbox.classList.add("visible");
        });
    });

    // Close Lightbox
    closeLightbox.addEventListener("click", () => {
        lightbox.classList.remove("visible");
    });

    // Close Lightbox on Outside Click
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove("visible");
        }
    });
});
