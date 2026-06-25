const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjyHw9P64k2-0i8idYr8b0X8Cn9XcuUXoDdCijssXvEriK8JaPZLt4vdXLe5ISCjdPwQ/exec';
const categoryButtons = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.work-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');
const viewWorkBtn = document.querySelector('.action-button');
const portfolioSection = document.querySelector('.portfolio-section');

if (viewWorkBtn && portfolioSection) {
    viewWorkBtn.addEventListener('click', () => {
        portfolioSection.scrollIntoView();
    });
}

const slideTrack = document.querySelector('.slide-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

if (slideTrack && slides.length > 0 && prevBtn && nextBtn) {
    let slideTimer;

    function updateSliderPosition() {
        slideTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderPosition();
    }

    function startAutoSlide() {
        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 3500);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderPosition();
        startAutoSlide();
    });

    startAutoSlide();
}

function filterProjects(event) {
    const clickedButton = event.target;
    const filterValue = clickedButton.getAttribute('data-filter');

    categoryButtons.forEach(button => {
        button.classList.remove('active');
    });

    clickedButton.classList.add('active');

    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', filterProjects);
});

function openModal(event) {
    const videoUrl = event.target.getAttribute('data-video');
    if (videoUrl) {
        modalContent.innerHTML = `<iframe width="100%" height="100%" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="aspect-ratio: 16/9;"></iframe>`;
        videoModal.classList.add('active');
    }
}

function closeVideoModal(event) {
    if (event.target === videoModal || event.target === closeModal) {
        videoModal.classList.remove('active');
        modalContent.innerHTML = '';
    }
}

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', openModal);
});

if (videoModal && closeModal) {
    videoModal.addEventListener('click', closeVideoModal);
    closeModal.addEventListener('click', closeVideoModal);
}

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('show-button');
    } else {
        backToTopBtn.classList.remove('show-button');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const customCursor = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
});

const interactiveElements = document.querySelectorAll('button, a, .work-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('cursor-grow');
    });

    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('cursor-grow');
    });
});

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeOverlayBtn = document.getElementById('close-overlay-btn');
const overlayLinks = document.querySelectorAll('.overlay-link');

if (mobileMenuBtn && mobileOverlay && closeOverlayBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    closeOverlayBtn.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    });

    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

const emailForm = document.getElementById('email-form');

if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = emailForm.querySelector('.submit-button');
        const emailInputField = emailForm.querySelector('.email-input');
        const capturedFormData = new FormData(emailForm);

        if (submitBtn) {
            submitBtn.innerText = 'SAVING...';
            submitBtn.disabled = true;
        }

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: capturedFormData,
            mode: 'no-cors'
        })
        .then(() => {
            if (submitBtn) {
                submitBtn.innerText = 'DONE!';
                submitBtn.disabled = false;
            }
            if (emailInputField) {
                emailInputField.value = '';
            }
        })
        .catch(error => {
            if (submitBtn) {
                submitBtn.innerText = 'ERROR!';
                submitBtn.disabled = false;
            }
        });
    });
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('contact-submit-btn');
        const requiredInputs = contactForm.querySelectorAll('[required]');
        let isFormValid = true;

        requiredInputs.forEach(input => {
            input.classList.remove('input-error');
            const inputValue = input.value.trim();

            if (!inputValue) {
                isFormValid = false;
                input.classList.add('input-error');
            } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
                isFormValid = false;
                input.classList.add('input-error');
            }
        });

        if (!isFormValid) {
            return;
        }

        if (submitBtn) {
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;
        }

        const contactFormData = new FormData(contactForm);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: contactFormData,
            mode: 'no-cors'
        })
        .then(() => {
            if (submitBtn) {
                submitBtn.innerText = 'MESSAGE SENT!';
                submitBtn.disabled = true;
            }
            contactForm.reset();
        })
        .catch(() => {
            if (submitBtn) {
                submitBtn.innerText = 'ERROR!';
                submitBtn.disabled = false;
            }
        });
    });
}
