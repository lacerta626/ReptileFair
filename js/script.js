gsap.registerPlugin(ScrollTrigger);

/* ==============================
   Header Scroll Transition
================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 50);
});

/* ==============================
   1. Main Visual (Kinetic)
================================ */
gsap.set(".convergence-target span", {
    x: () => (Math.random() - 0.5) * 4500,
    y: () => (Math.random() - 0.5) * 2500,
    z: () => gsap.utils.random(1500, 3500),
    scale: 10,
    rotationX: () => gsap.utils.random(-360, 360),
    rotationY: () => gsap.utils.random(-360, 360),
    opacity: 0,
    filter: "blur(50px)",
    color: "#222"
});
gsap.set(".sub-title", { opacity: 0, y: 50 });

const mainVisualTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".main_visual",
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 1.2,
        snap: { snapTo: 1, duration: 1.5, ease: "power3.inOut" },
        onLeave: () => {
            document.documentElement.style.overflow = "hidden";
            setTimeout(() => document.documentElement.style.overflow = "", 1000);
        }
    }
});

mainVisualTimeline
    .to(".bg_image", { scale: 1, duration: 5, ease: "sine.inOut" }, 0)
    .to(".overlay", { opacity: 1, duration: 2.5 }, 0.5)
    .to(".convergence-target span", {
        x: 0, y: 0, z: 0,
        scale: 1,
        rotationX: 0, rotationY: 0,
        opacity: 1,
        filter: "blur(0)",
        color: "#d2ff00",
        duration: 4.5,
        stagger: { each: 0.08, from: "center" },
        ease: "back.out(1.7)"
    }, "-=4")
    .fromTo(".convergence-target",
        { letterSpacing: "1.5em" },
        { letterSpacing: "0.05em", duration: 2.5, ease: "expo.out" },
        "-=2.5"
    )
    .fromTo(".convergence-target",
        { scale: 0.85, filter: "brightness(2.5)" },
        { scale: 1, filter: "brightness(1)", duration: 1.2, ease: "elastic.out(1,0.4)" },
        "-=0.8"
    )
    .to(".sub-title", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "-=1");

/* ==============================
   2. Marquee
================================ */
gsap.to(".marquee_wrapper", {
    xPercent: -50,
    repeat: -1,
    duration: 25,
    ease: "none"
});

/* ==============================
   3. Reveal Sections
================================ */
gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out"
    });
});

/* ==============================
   4. Tabs
================================ */
const tabBtns = document.querySelectorAll('.tab_btn');
const programLists = document.querySelectorAll('.program_list');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        programLists.forEach(l => l.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
});

/* ==============================
   5. Orbital Partners
================================ */
document.querySelectorAll(".sub_partner").forEach((item, i, arr) => {
    const data = { angle: (i / arr.length) * Math.PI * 2 };

    gsap.to(data, {
        angle: `+=${Math.PI * 2}`,
        duration: 20 + i * 5,
        repeat: -1,
        ease: "none",
        onUpdate: () => {
            gsap.set(item, {
                x: Math.cos(data.angle) * 220,
                y: Math.sin(data.angle) * 220
            });
        }
    });
});

/* ==============================
   6. Ticket Countdown
================================ */
const targetDate = new Date("May 23, 2026 10:00:00").getTime();

setInterval(() => {
    const gap = targetDate - Date.now();

    days.innerText    = Math.floor(gap / 86400000);
    hours.innerText   = Math.floor((gap / 3600000) % 24);
    minutes.innerText= Math.floor((gap / 60000) % 60);
    seconds.innerText= Math.floor((gap / 1000) % 60);
}, 1000);

gsap.to(".progress_fill", {
    scrollTrigger: { trigger: ".s_ticketing", start: "top 80%" },
    width: "85%",
    duration: 2
});

/* ==============================
   7. Stats Counter
================================ */
document.querySelectorAll('.stat_num').forEach(stat => {
    const target = +stat.dataset.target;

    gsap.to(stat, {
        scrollTrigger: { trigger: ".s_stats", start: "top 85%" },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        onUpdate() {
            if (target === 240000) {
                stat.innerText = Math.floor(this.targets()[0].innerText / 1000) + "K";
            }
        }
    });
});

/* ==============================
   8. FAQ Accordion
================================ */
document.querySelectorAll('.faq_q').forEach(q => {
    q.addEventListener('click', () => {
        document.querySelectorAll('.faq_item')
            .forEach(i => i.classList.remove('active'));
        q.parentElement.classList.toggle('active');
    });
});

/* ==============================
   9. Card Tilt
================================ */
document.querySelectorAll(".i_card").forEach(card => {

    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        gsap.to(card, {
            rotateX: (e.clientY - r.top - r.height / 2) / 10,
            rotateY: (r.width / 2 - (e.clientX - r.left)) / 10,
            duration: 0.5
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1,0.4)"
        });
    });
});
