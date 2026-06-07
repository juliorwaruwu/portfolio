// =========================
// LOADER
// =========================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 1,
        onComplete: () => {
            loader.style.display = "none";
        }
    });

});

// =========================
// CUSTOM CURSOR
// =========================

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

// =========================
// TYPING EFFECT
// =========================

const roles = [
    "Flutter Developer",
    "Java Developer",
    "Spring Boot Enthusiast",
    "Future Data Analyst"
];

let roleIndex = 0;
let charIndex = 0;

const typingElement =
document.getElementById("typing");

function typeEffect() {

    if (charIndex < roles[roleIndex].length) {

        typingElement.textContent +=
            roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);

    }

}

function eraseEffect() {

    if (charIndex > 0) {

        typingElement.textContent =
            roles[roleIndex].substring(
                0,
                charIndex - 1
            );

        charIndex--;

        setTimeout(eraseEffect, 50);

    } else {

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        setTimeout(typeEffect, 500);

    }

}

typeEffect();

// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background =
            "rgba(5,8,22,.9)";

        navbar.style.backdropFilter =
            "blur(25px)";

    } else {

        navbar.style.background =
            "rgba(255,255,255,.04)";
    }

});

// =========================
// MOBILE MENU
// =========================

const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");

if(menuToggle){

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("active");

        }
    );

}

// =========================
// GSAP HERO
// =========================

gsap.from(".hero h1", {

    y: 100,
    opacity: 0,
    duration: 1.2

});

gsap.from(".hero h2", {

    y: 80,
    opacity: 0,
    duration: 1.2,
    delay: .2

});

gsap.from(".hero-description", {

    y: 50,
    opacity: 0,
    duration: 1,
    delay: .4

});

gsap.from(".hero-buttons", {

    y: 50,
    opacity: 0,
    duration: 1,
    delay: .6

});

// =========================
// SECTION REVEAL
// =========================

gsap.utils.toArray(".section")
.forEach(section => {

    gsap.from(section, {

        scrollTrigger: {

            trigger: section,
            start: "top 80%"

        },

        opacity: 0,
        y: 80,
        duration: 1

    });

});

// =========================
// PROJECT CARD TILT
// =========================

VanillaTilt.init(

    document.querySelectorAll(
        ".project-card"
    ),

    {

        max: 15,
        speed: 400,
        glare: true,
        "max-glare": .4

    }

);

// =========================
// SKILL CARD TILT
// =========================

VanillaTilt.init(

    document.querySelectorAll(
        ".skill-card"
    ),

    {

        max: 10,
        speed: 400

    }

);

// =========================
// STATS COUNTER
// =========================

const counters =
document.querySelectorAll(".stat h3");

counters.forEach(counter => {

    const updateCounter = () => {

        const target =
            parseInt(
                counter.innerText
            );

        let current = 0;

        const increment =
            target / 50;

        const timer =
            setInterval(() => {

                current += increment;

                if(current >= target){

                    counter.innerText =
                        target + "+";

                    clearInterval(timer);

                } else {

                    counter.innerText =
                        Math.floor(current);

                }

            },20);

    };

    ScrollTrigger.create({

        trigger: counter,

        start:"top 80%",

        once:true,

        onEnter:updateCounter

    });

});