// 1. The Mouse Glow Engine
const glow = document.getElementById('glow');

document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    
    // Use requestAnimationFrame for hardware-accelerated smooth rendering
    glow.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 3000, fill: "forwards" });
};

// 2. The Scroll Reveal Physics
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Triggers when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const elementsToReveal = document.querySelectorAll('.reveal');
elementsToReveal.forEach(el => observer.observe(el));
