// gsap register
gsap.registerPlugin(ScrollTrigger);

// header background change
gsap.to("header", { scrollTrigger: { trigger: ".main_visual", start: "top top", end: "bottom top", onEnter: () => document.querySelector("header").classList.add("active"), onLeaveBack: () => document.querySelector("header").classList.remove("active") } });

// main init
window.addEventListener("load", () => {

    // 1 main visual convergence
    const mainVisualTimeline = gsap.timeline({ scrollTrigger: { trigger: ".main_visual", start: "top top", end: "+=3000", pin: true, scrub: 1.5 } });
    gsap.set(".convergence-target span", { x: () => (Math.random() - .5) * 1500, y: () => (Math.random() - .5) * 1000, z: () => Math.random() * 500, rotation: () => (Math.random() - .5) * 360, opacity: 0 });
    gsap.set(".sub-title", { opacity: 0, y: 50 });
    mainVisualTimeline.to(".overlay", { opacity: 1, duration: 1 }).to(".convergence-target span", { x: 0, y: 0, z: 0, rotation: 0, opacity: 1, duration: 2, stagger: { each: .05, from: "random" } }, "-=.5").to(".sub-title", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=.5");

    // 2 marquee infinite loop
    const marqueeWrapper = document.querySelector(".marquee_wrapper");
    if (marqueeWrapper) { gsap.to(marqueeWrapper, { xPercent: -50, duration: 30, ease: "none", repeat: -1 }); }

    // 3 section title reveal
    const lines = document.querySelectorAll(".s_title h2 .line");
    lines.forEach(line => { const text = line.innerText; line.innerHTML = `<span style="display:inline-block;transform:translateY(100%)">${text}</span>`; gsap.to(line.querySelector("span"), { scrollTrigger: { trigger: ".s_title", start: "top 80%" }, y: 0, duration: 1, ease: "power4.out" }); });
    gsap.to(".s_title p", { scrollTrigger: { trigger: ".s_title", start: "top 70%" }, opacity: 1, y: 0, duration: 1, delay: .5, ease: "power3.out" });

    // 4 common reveal
    const reveals = document.querySelectorAll(".s_info,.reveal");
    reveals.forEach(section => { gsap.fromTo(section, { opacity: 0, y: 50 }, { scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" }, opacity: 1, y: 0, duration: 1, ease: "power2.out" }); });

});

// card interaction
const iCards = document.querySelectorAll(".i_card");
iCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        gsap.to(card, { rotateX, rotateY, duration: .5, ease: "power2.out" });
        const icon = card.querySelector(".magnetic_icon");
        if (icon) { const mX = (x - centerX) * .15; const mY = (y - centerY) * .15; gsap.to(icon, { x: mX, y: mY, duration: .3 }); }
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: .8, ease: "elastic.out(1,0.3)" });
        const icon = card.querySelector(".magnetic_icon");
        if (icon) gsap.to(icon, { x: 0, y: 0, duration: .5 });
    });
});

// 7 irregular orbital partner
window.addEventListener("load", () => {
    const subPartners = document.querySelectorAll(".sub_partner");
    const radius = 275;
    subPartners.forEach((item, i) => {
        const rotationData = { angle: (i / subPartners.length) * (Math.PI * 2) };
        function animatePartner() {
            const randomDuration = gsap.utils.random(2, 5);
            const randomAngleAdd = gsap.utils.random(Math.PI / 4, Math.PI / 4);
            gsap.to(rotationData, { angle: `+=${randomAngleAdd}`, duration: randomDuration, ease: "power2.inOut", onUpdate: () => { const x = Math.cos(rotationData.angle) * radius; const y = Math.sin(rotationData.angle) * radius; gsap.set(item, { x, y }); }, onComplete: animatePartner });
        }
        gsap.to(item, { y: "+=20", x: "+=15", duration: gsap.utils.random(2, 4), repeat: -1, yoyo: true, ease: "sine.inOut" });
        animatePartner();
    });
});

// 8 countdown & ticket animation
const targetDate = new Date("May 23, 2026 10:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const gap = targetDate - now;
    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((gap % (1000 * 60)) / 1000);
    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
}
setInterval(updateCountdown, 1000);

gsap.to(".progress_fill", { scrollTrigger: { trigger: ".s_ticketing", start: "top 80%" }, width: "85%", duration: 2, ease: "power4.out" });
gsap.from(".counter", { scrollTrigger: { trigger: ".s_ticketing", start: "top 80%" }, textContent: 0, duration: 4, snap: { textContent: 1 }, stagger: 1 });
