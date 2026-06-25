const categoryButtons = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.work-item');
const thumbnails = document.querySelectorAll('.thumbnail');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

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
        modalContent.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
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
