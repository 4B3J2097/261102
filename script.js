document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page-section');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioEmpty = document.querySelector('.portfolio-empty');

    function setActiveNav(sectionId) {
        navButtons.forEach(button => {
            const isActive = button.getAttribute('href') === `#${sectionId}`;
            button.classList.toggle('active', isActive);
            if (isActive) {
                button.setAttribute('aria-current', 'location');
            } else {
                button.removeAttribute('aria-current');
            }
        });
    }

    const initialSection = document.getElementById(location.hash.slice(1));
    if (initialSection && initialSection.classList.contains('page-section')) {
        setActiveNav(initialSection.id);
    }

    const sectionObserver = new IntersectionObserver(entries => {
        const visibleSections = entries
            .filter(entry => entry.isIntersecting)
            .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

        if (visibleSections.length > 0) {
            setActiveNav(visibleSections[0].target.id);
        }
    }, {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('href').slice(1);
            setActiveNav(targetId);
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;
            let visibleCardCount = 0;

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;
                filterButton.classList.toggle('active', isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            portfolioCards.forEach(card => {
                const isVisible = selectedCategory === 'all' || card.dataset.category === selectedCategory;
                card.hidden = !isVisible;
                if (isVisible) {
                    visibleCardCount += 1;
                }
            });

            portfolioEmpty.hidden = visibleCardCount > 0;
        });
    });
});

// 提供給內文按鈕呼叫的輔助函式
function navigateToSection(sectionId) {
    const targetLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (targetLink) {
        targetLink.click();
    }
}