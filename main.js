
/**
 * Main JavaScript for Portfolio
 * Handles scroll animations using Intersection Observer
 */

document.addEventListener('DOMContentLoaded', () => {

    // Select all elements to be animated
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Options for the observer
    const observerOptions = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    // Callback for when elements intersect
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                entry.target.classList.add('visible');

                // Stop observing once animated (optional, for one-time animation)
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element
    animatedElements.forEach(el => observer.observe(el));

    // Console log for verification
    console.log(`Initialized animations for ${animatedElements.length} elements.`);

    // --- Advanced Dragon Animation Animation ---

    // Config
    const screen = document.getElementById("dragon-screen");
    const xmlns = "http://www.w3.org/2000/svg";
    const xlinkns = "http://www.w3.org/1999/xlink";

    if (screen) {
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
        };
        window.addEventListener("resize", resize, false);
        resize();

        const prepend = (use, i) => {
            const elem = document.createElementNS(xmlns, "use");
            elems[i].use = elem;
            elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
            screen.prepend(elem); // Prepend to stack correctly (head on top usually? Or reverse order)
        };

        const N = 40;
        const elems = [];

        // Initialize elements array
        for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };

        // Initial pointer position
        const pointer = { x: width / 2, y: height / 2 };
        const radm = Math.min(pointer.x, pointer.y) - 20;
        let frm = Math.random();
        let rad = 0;

        // Create SVG Use elements for dragon segments
        // Order: Head (1) -> Fins -> Spine
        // The original loop creates them. 
        for (let i = 1; i < N; i++) {
            if (i === 1) prepend("Cabeza", i);
            else if (i === 8 || i === 14) prepend("Aletas", i);
            else prepend("Espina", i);
        }

        // Animation Loop
        const run = () => {
            requestAnimationFrame(run);

            // Logic to move the first segment (leader) based on sine waves + pointer tracking
            let e = elems[0];
            const ax = Math.cos(3 * frm) * rad * width / height;
            const ay = Math.sin(4 * frm) * rad * height / width;

            // Updated Speed: Increased divisor from 10 to 40 for slower/sailboat effect
            e.x += (ax + pointer.x - e.x) / 40;
            e.y += (ay + pointer.y - e.y) / 40;

            // Constrain head to viewport
            e.x = Math.max(0, Math.min(width, e.x));
            e.y = Math.max(0, Math.min(height, e.y));

            // Follow logic for the rest of segments
            for (let i = 1; i < N; i++) {
                let e = elems[i];
                let ep = elems[i - 1]; // Previous element
                const a = Math.atan2(e.y - ep.y, e.x - ep.x);

                // Slower follow speed
                e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 10;
                e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 10;

                // Scaling segments to taper the tail
                // Decreased size: Divide by 100 instead of 50
                const s = (162 + 4 * (1 - i)) / 100;

                e.use.setAttributeNS(
                    null,
                    "transform",
                    `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a
                    }) translate(${0},${0}) scale(${s},${s})`
                );
            }

            if (rad < radm) rad++;
            frm += 0.003;

            // Idle movement if not moving much? 
            if (rad > 60) {
                pointer.x += (width / 2 - pointer.x) * 0.05;
                pointer.y += (height / 2 - pointer.y) * 0.05;
            }
        };

        // Pointer tracking
        window.addEventListener(
            "mousemove",
            (e) => {
                pointer.x = e.clientX;
                pointer.y = e.clientY;
                rad = 0;
            },
            false
        );

        // Start animation
        run();
    }

    // --- Typing Animation ---
    const text1 = "Hello, I'm ";
    const text2 = "Devashish Pathak.";
    const speed = 100; // Typing speed in ms
    const el1 = document.getElementById("type-text-1");
    const el2 = document.getElementById("type-text-2");

    // Only run if elements exist
    if (el1 && el2) {
        let i = 0;
        let j = 0;

        function typeWriter() {
            if (i < text1.length) {
                el1.textContent += text1.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else if (j < text2.length) {
                el2.textContent += text2.charAt(j);
                j++;
                setTimeout(typeWriter, speed);
            }
        }

        // Start typing after a slight delay to coordinate with fade-in
        setTimeout(typeWriter, 1000);
    }
});
