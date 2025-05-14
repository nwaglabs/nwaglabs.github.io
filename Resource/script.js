function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) { // Only update if element exists
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString('en-GB');
    }
}

// Only set interval if the element exists
if (document.getElementById('current-time')) {
    setInterval(updateTime, 1000);
    updateTime(); // Initial call
}

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-svg');
    const nav = document.querySelector('nav');
    
    // Initial check in case page is loaded scrolled down
    if (window.scrollY > 50) {
        logo.classList.add('scrolled');
        nav.classList.add('scrolled');
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                logo.classList.add('scrolled');
                nav.classList.add('scrolled');
            } else {
                logo.classList.remove('scrolled');
                nav.classList.remove('scrolled');
            }
            handleServicesAnimation();
            handleWorkAnimation();
        });
    });

    handleServicesAnimation();
    handleWorkAnimation();
    initParallaxTitle();
});

function handleServiceScroll() {
    const services = document.querySelectorAll('.service-item');
    const windowHeight = window.innerHeight;
    
    services.forEach(service => {
        const rect = service.getBoundingClientRect();
        const centerY = rect.top + (rect.height / 2);
        const viewportCenter = windowHeight / 2;
        
        // Check if service is near center of viewport (within 200px)
        if (Math.abs(centerY - viewportCenter) < 200) {
            service.classList.add('in-view');
        } else {
            service.classList.remove('in-view');
        }
    });
}

window.addEventListener('scroll', handleServiceScroll);
handleServiceScroll(); // Initial check

function handleServicesAnimation() {
    const servicesHeader = document.querySelector('.services-header');
    const servicesMeta = document.querySelector('.services-meta');
    const services = document.querySelectorAll('.service-item');
    const windowHeight = window.innerHeight;
    
    // Handle header and meta animations
    const headerRect = servicesHeader.getBoundingClientRect();
    if (headerRect.top < windowHeight * 0.95) {
        servicesHeader.classList.add('animate');
        servicesMeta.classList.add('animate');
    }
    
    // Handle service items
    services.forEach(service => {
        const rect = service.getBoundingClientRect();
        
        if (rect.top < windowHeight * 0.95) {
            service.classList.add('appear');
        }
        
        const centerY = rect.top + (rect.height / 2);
        const viewportCenter = windowHeight / 2;
        
        if (Math.abs(centerY - viewportCenter) < 200) {
            service.classList.add('in-view');
        } else {
            service.classList.remove('in-view');
        }
    });
}

// Initial check
handleServicesAnimation();

function handleWorkAnimation() {
    const workHeader = document.querySelector('.work-header');
    const workTitle = document.querySelector('.work-title');
    const workItems = document.querySelectorAll('.work-item');
    const windowHeight = window.innerHeight;

    const headerRect = workHeader.getBoundingClientRect();
    if (headerRect.top < windowHeight * 0.95) {
        workHeader.classList.add('animate');
        workTitle.classList.add('animate');
    }

    // Handle work items animation
    workItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.95) {
            item.classList.add('animate');
        }
    });
}

// Parallax scroll effect for hero title
function initParallaxTitle() {
    const title = document.querySelector('.hero-title');
    const wordLeft = document.querySelectorAll('.word-left');
    const wordRight = document.querySelector('.word-right');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const triggerPoint = window.innerHeight * 0.2; // 20% of viewport height
        
        if (scrolled > triggerPoint) {
            const factor = (scrolled - triggerPoint) * 0.15;
            
            // Apply horizontal parallax only
            wordLeft.forEach((word, index) => {
                word.style.transform = `translateX(-${factor * (index + 1)}px)`;
            });
            
            wordRight.style.transform = `translateX(${factor}px)`;
            
            // Remove the vertical translation
            title.style.transform = 'none';
        } else {
            // Reset transforms when scrolling back up
            wordLeft.forEach(word => {
                word.style.transform = 'translateX(0)';
            });
            wordRight.style.transform = 'translateX(0)';
            title.style.transform = 'none';
        }
    });
}

// Create the hover element
const hoverElement = document.createElement('div');
hoverElement.className = 'hover-view-project';
hoverElement.textContent = 'View Project';
hoverElement.style.whiteSpace = 'nowrap';  // Add this line
document.body.appendChild(hoverElement);

// Add mouse move event listeners to work items
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoverElement.style.opacity = '1';
    });

    item.addEventListener('mouseleave', () => {
        hoverElement.style.opacity = '0';
    });

    item.addEventListener('mousemove', (e) => {
        hoverElement.style.left = e.clientX + 'px';
        hoverElement.style.top = e.clientY + 'px';
    });
});

// Create a new hover element specifically for email
const emailHoverElement = document.createElement('div');
emailHoverElement.className = 'hover-view-project';
emailHoverElement.textContent = 'Let\'s connect';
emailHoverElement.style.whiteSpace = 'nowrap';  // Add this line
document.body.appendChild(emailHoverElement);

// Add mouse events to footer email
document.querySelector('.footer-email').addEventListener('mouseenter', () => {
    emailHoverElement.style.opacity = '1';
});

document.querySelector('.footer-email').addEventListener('mouseleave', () => {
    emailHoverElement.style.opacity = '0';
});

document.querySelector('.footer-email').addEventListener('mousemove', (e) => {
    const ease = 0.15;
    currentX += (e.clientX - currentX) * ease;
    currentY += (e.clientY - currentY) * ease;

    emailHoverElement.style.left = `${currentX + 70}px`;
    emailHoverElement.style.top = `${currentY + 30}px`;
});

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    const ease = 0.15;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    // Update cursor position with offset and rotation
    hoverElement.style.left = `${currentX + 70}px`;
    hoverElement.style.top = `${currentY + 30}px`;
    
    requestAnimationFrame(animate);
}

animate();

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about-section');
    let initialPosition = 0;
    
    // Parallax effect strength (smaller = more subtle)
    const parallaxStrength = 0.15;

    window.addEventListener('scroll', () => {
        // Get the scroll position
        const scrolled = window.pageYOffset;
        
        // Get the offset of the about section from the top of the page
        const aboutOffset = aboutSection.offsetTop;
        
        // Only apply parallax when the section is in view
        if (scrolled >= aboutOffset - window.innerHeight && 
            scrolled <= aboutOffset + aboutSection.offsetHeight) {
            
            // Calculate the parallax offset
            const parallaxOffset = (scrolled - aboutOffset) * parallaxStrength;
            
            // Apply the transform
            aboutSection.style.backgroundPosition = `center ${parallaxOffset}px`;
        }
    });
});

window.addEventListener('scroll', () => {
    const logo = document.querySelector('.logo');
    if (window.scrollY > 50) {
        logo.classList.add('shrink');
    } else {
        logo.classList.remove('shrink');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            logo.classList.add('shrink');
        } else {
            nav.classList.remove('scrolled');
            logo.classList.remove('shrink');
        }
    });
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.work-item').forEach(item => {
    observer.observe(item);
});