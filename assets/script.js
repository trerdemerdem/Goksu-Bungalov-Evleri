document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LUCIDE ICONS
    ========================= */

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    /* =========================
       GALLERY
    ========================= */

    const track = document.querySelector(".gallery-track");
    const slides = document.querySelectorAll(".gallery-slide");
    const nextButton = document.querySelector(".gallery-next");
    const prevButton = document.querySelector(".gallery-prev");
    const currentCounter = document.getElementById("galleryCurrent");
    const totalCounter = document.getElementById("galleryTotal");

    let currentIndex = 0;

    if (track && slides.length > 0) {

        const totalSlides = slides.length;

        if (totalCounter) {
            totalCounter.textContent =
                String(totalSlides).padStart(2, "0");
        }


        function updateGallery() {

            track.style.transform =
                `translateX(-${currentIndex * 100}%)`;

            if (currentCounter) {
                currentCounter.textContent =
                    String(currentIndex + 1).padStart(2, "0");
            }
        }


        function nextSlide() {

            currentIndex++;

            if (currentIndex >= totalSlides) {
                currentIndex = 0;
            }

            updateGallery();
        }


        function previousSlide() {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
            }

            updateGallery();
        }


        if (nextButton) {
            nextButton.addEventListener(
                "click",
                nextSlide
            );
        }


        if (prevButton) {
            prevButton.addEventListener(
                "click",
                previousSlide
            );
        }


        /* TOUCH SWIPE */

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener("touchstart", (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        }, { passive: true });


        track.addEventListener("touchend", (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchStartX - touchEndX;

            if (Math.abs(distance) < 50) {
                return;
            }

            if (distance > 0) {
                nextSlide();
            } else {
                previousSlide();
            }

        }, { passive: true });


        updateGallery();
    }


    /* =========================
       IMAGE MODAL
    ========================= */

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalClose =
        document.querySelector(".modal-close");


    function openModal(image) {

        if (!modal || !modalImage) {
            return;
        }

        modalImage.src = image.src;
        modalImage.alt = image.alt || "";

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    document
        .querySelectorAll(".gallery-slide img")
        .forEach((image) => {

            image.addEventListener("click", () => {
                openModal(image);
            });

        });


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeModal
        );
    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );

    }


    /* =========================
       ESC KEY
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {
                closeModal();
            }

        }
    );


    /* =========================
       SMOOTH SCROLL
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

});
/* =========================
   VIDEO MODAL
========================= */

const heroVideo = document.getElementById("heroVideo");
const videoExpand = document.getElementById("videoExpand");

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoModalClose =
    document.getElementById("videoModalClose");


function openVideoModal() {

    if (!heroVideo || !videoModal || !modalVideo) {
        return;
    }

    modalVideo.src = heroVideo.currentSrc || heroVideo.src;

    videoModal.classList.add("active");

    videoModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    modalVideo.play().catch(() => {});
}


function closeVideoModal() {

    if (!videoModal || !modalVideo) {
        return;
    }

    modalVideo.pause();

    modalVideo.removeAttribute("src");

    modalVideo.load();

    videoModal.classList.remove("active");

    videoModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}


if (videoExpand) {
    videoExpand.addEventListener(
        "click",
        openVideoModal
    );
}


if (heroVideo) {
    heroVideo.addEventListener(
        "dblclick",
        openVideoModal
    );
}


if (videoModalClose) {
    videoModalClose.addEventListener(
        "click",
        closeVideoModal
    );
}


if (videoModal) {

    videoModal.addEventListener(
        "click",
        (event) => {

            if (event.target === videoModal) {
                closeVideoModal();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            videoModal &&
            videoModal.classList.contains("active")
        ) {
            closeVideoModal();
        }

    }
);
