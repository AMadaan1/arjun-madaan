gsap.registerPlugin(ScrollTrigger);

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

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero animation
const tl = gsap.timeline();
tl.fromTo(".load-anim",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2 }
);

// Scroll reveal for section elements
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

// Split text reveal for thesis section
const splitText = document.querySelector('.split-text');
if (splitText) {
    const text = splitText.innerText;
    splitText.innerHTML = '';

    text.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.innerText = word + ' ';
        splitText.appendChild(span);
    });

    gsap.to('.split-text span', {
        color: '#1A1918',
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
            trigger: ".thesis-content",
            start: "top 75%",
            end: "bottom 65%",
            scrub: 1
        }
    });
}

// Smooth navigation scroll
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { duration: 1.5 });
        }
    });
});
