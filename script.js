// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis (Hardware Accelerated Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
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


// 2. Initial Load Timeline (Hero Section)
const tl = gsap.timeline();

tl.fromTo(".load-anim", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
);

// 3. Scroll Reveal Engine (Professional fade up)
const triggerElements = document.querySelectorAll('.trigger-anim');

triggerElements.forEach((el) => {
    gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%", 
                toggleActions: "play none none reverse"
            }
        }
    );
});

// 4. The "Thesis" Text Splitter effect
const splitText = document.querySelector('.split-text');
const text = splitText.innerText;
splitText.innerHTML = ''; 

// Wrap each word in a span for individual animation control
text.split(' ').forEach(word => {
    const span = document.createElement('span');
    span.innerText = word + ' ';
    // Starts off adopting the border-color (faded grey) from CSS
    splitText.appendChild(span);
});

// Animate the words lighting up to pure black/dark grey as you scroll
gsap.to('.split-text span', {
    color: '#1A1A1A', // var(--text-main)
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
        trigger: ".thesis-content",
        start: "top 75%",
        end: "bottom 65%",
        scrub: 1 
    }
});
