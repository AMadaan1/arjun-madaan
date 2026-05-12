// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis (Hardware Accelerated Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom friction easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 2. Mouse Glow Tracker
const glow = document.getElementById('glow');
window.addEventListener('pointermove', (e) => {
    // requestAnimationFrame handled via GSAP natively, but using Web Animations API for the glow
    glow.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 3000, fill: "forwards" });
});

// 3. Initial Load Timeline (Hero Section)
const tl = gsap.timeline();

tl.fromTo(".load-anim", 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.2 }
);

// 4. Scroll Reveal Engine
// Animates regular elements when they enter the viewport
const triggerElements = document.querySelectorAll('.trigger-anim');

triggerElements.forEach((el) => {
    gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Trigger when top of element hits 85% down the viewport
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 5. The "Thesis" Text Splitter effect
// Splits the thesis paragraph into individual words for a cascading reveal
const splitText = document.querySelector('.split-text');
const text = splitText.innerText;
splitText.innerHTML = ''; // Clear existing

// Wrap each word in a span for individual animation control
text.split(' ').forEach(word => {
    const span = document.createElement('span');
    span.innerText = word + ' ';
    span.style.opacity = '0.2'; // Base state
    splitText.appendChild(span);
});

// Animate the words lighting up as you scroll through the section
gsap.to('.split-text span', {
    opacity: 1,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
        trigger: ".thesis-content",
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1 // Ties the animation directly to the scrollbar
    }
});
