// YouTube Modal Functionality
const modal = document.getElementById('videoModal');
const modalVideo = modal.querySelector('.modal__video');
const closeBtn = modal.querySelector('.modal__close');
const portfolioItems = document.querySelectorAll('.portfolio__item');

// Open YouTube modal on click
portfolioItems.forEach(item => {
    const youtubeId = item.getAttribute('data-youtube');
    
    item.addEventListener('click', function() {
        if (youtubeId) {
            // Create YouTube iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&rel=0`;
            iframe.width = '100%';
            iframe.height = '450';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Clear modal content and add iframe
            modalVideo.innerHTML = '';
            modalVideo.appendChild(iframe);
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add fade-in animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    });
});

// Close modal with animation
function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        modalVideo.innerHTML = ''; // Clear the iframe
        document.body.style.overflow = 'auto';
    }, 300);
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.portfolio__item, .about__content, .contact__actions').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(53, 27, 72, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#351B48';
        header.style.backdropFilter = 'none';
    }
});

// Mobile Navigation Toggle
const navToggle = document.createElement('button');
navToggle.className = 'nav__toggle';
navToggle.innerHTML = '<i class="fas fa-bars"></i>';

function toggleMobileNav() {
    const navInfo = document.querySelector('.nav__info');
    navInfo.classList.toggle('nav__info--mobile-active');
}

if (window.innerWidth <= 768) {
    document.querySelector('.nav').appendChild(navToggle);
    navToggle.addEventListener('click', toggleMobileNav);
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navToggle.remove();
        document.querySelector('.nav__info').classList.remove('nav__info--mobile-active');
    } else if (!document.querySelector('.nav__toggle')) {
        document.querySelector('.nav').appendChild(navToggle);
        navToggle.addEventListener('click', toggleMobileNav);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero__content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize animations on page load
window.addEventListener('load', function() {
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
});