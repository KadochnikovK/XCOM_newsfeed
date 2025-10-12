// news-feed.js
class NewsFeed {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSlider();
    }

    setupEventListeners() {
        // Date quick buttons
        this.container.querySelectorAll('.date-quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.container.querySelectorAll('.date-quick-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterByDate(e.target.textContent);
            });
        });

        // Sort select
        this.container.querySelector('.sort-select').addEventListener('change', (e) => {
            this.sortNews(e.target.value);
        });
    }

    setupSlider() {
        if (this.container.classList.contains('news-feed--slider')) {
            this.slider = new Swiper('.news-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
        });
    }
}

filterByDate(range) {
    // Implementation for date filtering
    console.log('Filter by date:', range);
}

sortNews(criteria) {
    // Implementation for sorting
    console.log('Sort by:', criteria);
}
}

// Modal functions
function openFilterModal() {
    const modal = document.querySelector('.filter-modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('animate__fadeIn');
        modal.querySelector('.modal__window').classList.add('animate__zoomIn');
    }, 10);
}

function closeFilterModal() {
    const modal = document.querySelector('.filter-modal');
    modal.classList.remove('animate__fadeIn');
    modal.querySelector('.modal__window').classList.remove('animate__zoomIn');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function applyFilters() {
    closeFilterModal();
    // Apply filter logic
}

// Initialize news feed
document.addEventListener('DOMContentLoaded', () => {
    const newsFeed = new NewsFeed(document.querySelector('.news-feed'));
});