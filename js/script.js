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

    // Zoom Feature for About Section
    const zoomableItems = document.querySelectorAll("[data-zoomable]");
    const zoomOverlay = document.createElement("div");
    zoomOverlay.classList.add("zoom-overlay");
    document.body.appendChild(zoomOverlay);

    const zoomContent = document.createElement("div");
    zoomContent.classList.add("zoom-content");
    zoomOverlay.appendChild(zoomContent);

    // Function for Zoom-in when item is clicked
    zoomableItems.forEach((item) => {
        item.addEventListener("click", () => {
            zoomContent.innerHTML = item.innerHTML; // Copy the content of the clicked item
            zoomOverlay.classList.add("visible"); // Show the overlay
        });
    });

    // Close zoom when the overlay is clicked
    zoomOverlay.addEventListener("click", () => {
        zoomOverlay.classList.remove("visible"); // Hide the overlay
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const floatingMenu = document.querySelector(".floating-menu");
    let isDragging = false;
    let offsetX, offsetY;

    // Event mousedown untuk memulai dragging
    floatingMenu.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - floatingMenu.getBoundingClientRect().left;
        offsetY = e.clientY - floatingMenu.getBoundingClientRect().top;
        floatingMenu.classList.add("dragging");
    });

    // Event mousemove untuk menggerakkan menu
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            floatingMenu.style.left = `${e.clientX - offsetX}px`;
            floatingMenu.style.top = `${e.clientY - offsetY}px`;
            floatingMenu.style.right = "auto"; // Hilangkan posisi kanan
            floatingMenu.style.bottom = "auto"; // Hilangkan posisi bawah
        }
    });

    // Event mouseup untuk menghentikan dragging
    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            floatingMenu.classList.remove("dragging");
        }
    });
});
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const menuWidth = floatingMenu.offsetWidth;
        const menuHeight = floatingMenu.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Cegah keluar dari batas layar
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX + menuWidth > viewportWidth) newX = viewportWidth - menuWidth;
        if (newY + menuHeight > viewportHeight) newY = viewportHeight - menuHeight;

        floatingMenu.style.left = `${newX}px`;
        floatingMenu.style.top = `${newY}px`;
        floatingMenu.style.right = "auto";
        floatingMenu.style.bottom = "auto";
    }
});