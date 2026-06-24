const categoryButtons = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.work-item');

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
