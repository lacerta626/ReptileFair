gsap.registerPlugin(ScrollTrigger);


/* ==============================
   Header Navigation Scroll
================================ */
document.querySelectorAll('.gnb a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 이동 막기

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // GSAP ScrollToPlugin이 없어도 일반 window.scrollTo로 구현 가능
            window.scrollTo({
                top: targetSection.offsetTop - 70, // 헤더 높이만큼 뺌
                behavior: 'smooth'
            });
        }
    });
});

/* ==============================
   Main Visual (Kinetic) 
================================ */
// 초기 상태 설정 (2026 포함)
gsap.set(".convergence-target span, .year_text span", {
    x: () => (Math.random() - 0.5) * 2000,
    y: () => (Math.random() - 0.5) * 1000,
    z: () => gsap.utils.random(500, 1000),
    scale: 3,
    rotationX: () => gsap.utils.random(-180, 180),
    rotationY: () => gsap.utils.random(-180, 180),
    opacity: 0,
    filter: "blur(20px)",
    color: "#222"
});

const mainVisualTimeline = gsap.timeline({
    paused: true,
    onComplete: () => {
        document.body.style.overflow = "";
    }
});

mainVisualTimeline
    .to(".bg_image", { scale: 1, duration: 5, ease: "sine.inOut" }, 0)
    .to(".overlay", { opacity: 1, duration: 2.5 }, 0.5)

    // 1. REPTILE EXPO 글자들 모이기
    .to(".convergence-target span", {
        x: 0, y: 0, z: 0,
        scale: 1,
        rotationX: 0, rotationY: 0,
        opacity: 1,
        filter: "blur(0px)",
        color: "#ffffff",
        duration: 3,
        stagger: { each: 0.03, from: "start" },
        ease: "expo.out",
        force3D: true
    }, "-=4.2")

    // 2. 2026 숫자들 모이기 (추가된 부분)
    .to(".year_text span", {
        x: 0, y: 0, z: 0,
        scale: 1,
        rotationX: 0, rotationY: 0,
        opacity: 1,
        filter: "blur(0px)",
        color: "#fff", // 우아콘처럼 검정색으로 강조
        duration: 2.5,
        stagger: 0.1,
        ease: "expo.out",
        force3D: true
    }, "-=3.5") // 제목 애니메이션 중간에 시작되도록 타이밍 조절

    .fromTo(".convergence-target",
        { letterSpacing: "1em" },
        { letterSpacing: "0.05em", duration: 3, ease: "power4.out" },
        "-=2.8"
    )
    .to(".bg_video", { scale: 0.9, ease: "none" }, 0)
    .to(".sub-title", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "-=1")
    .to(".sub-title", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "-=1");
ScrollTrigger.create({
    trigger: ".main_visual",
    start: "top top",
    end: "+=1000", // 애니메이션 동안 머무를 거리
    pin: true,     // 화면 고정
    onEnter: (self) => {
        // 스크롤이 진입하면 타임라인 재생
        if (mainVisualTimeline.progress() === 0) {
            mainVisualTimeline.play();
        }
    },
    fastScrollEnd: true,
    preventOverScroll: true
});

/* ==============================
   Marquee
================================ */
gsap.to(".marquee_wrapper", {
    xPercent: -50,
    repeat: -1,
    duration: 25,
    ease: "none"
});
/* ==============================
   Sticky Header Transition
================================ */
const header = document.querySelector('header');
const movingText = document.querySelector('.moving_text');

ScrollTrigger.create({
    trigger: movingText,
    start: "bottom top", // 무빙텍스트가 화면 위로 완전히 사라지는 순간
    onEnter: () => {
        header.classList.add('sticky');
    },
    onLeaveBack: () => {
        header.classList.remove('sticky');
    }
});
/* ==============================
   Reveal Sections & Text
================================ */
gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out"
    });

    const title = el.querySelector('.section_title');
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%"
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out"
        });
    }
});

// 2. 개별 .fade-up 요소 애니메이션 (추가)
gsap.utils.toArray(".fade-up").forEach((item) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
});
/* ==============================
   Visitor Info Section Toggle
================================ */
const infoBtn = document.querySelector('.info_toggle_btn');
const infoSection = document.getElementById('visitorInfoSection');

if (infoBtn && infoSection) {
    infoBtn.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(infoSection).display === 'none';

        if (isHidden) {
            // 보이기 (Fade In)
            infoSection.style.display = 'block';
            gsap.fromTo(infoSection,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
            infoBtn.classList.add('active');

            setTimeout(() => {
                infoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            gsap.to(infoSection, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                onComplete: () => {
                    infoSection.style.display = 'none';
                }
            });
            infoBtn.classList.remove('active');
        }
    });
}
gsap.from(".v_text .reveal", {
    scrollTrigger: {
        trigger: ".video_section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});
/* ==============================
   Tabs
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
    sns_slider
================================ */
const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    autoplay: { delay: 3000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

gsap.to(".marquee_inner", {
    xPercent: -50, // 절반만큼 이동 (반복 배치 기준)
    repeat: -1,
    duration: 20,
    ease: "none"
});

/* ==============================
   Orbital Partners
================================ */
document.querySelectorAll(".sub_partner").forEach((item, i, arr) => {
    const data = { angle: (i / arr.length) * Math.PI * 2 };
    const radius = 230; // 궤도 선 반지름과 일치시킴

    const orbitAnimation = gsap.to(data, {
        angle: `+=${Math.PI * 2}`,
        duration: 25 + i * 3, // 너무 빠르지 않게 조정
        repeat: -1,
        ease: "none",
        onUpdate: () => {
            gsap.set(item, {
                x: Math.cos(data.angle) * radius,
                y: Math.sin(data.angle) * radius
            });
        }
    });

    item.addEventListener("mouseenter", () => {
        orbitAnimation.pause(); // 애니메이션 일시정지
    });

    // 마우스 떼면 다시 재생
    item.addEventListener("mouseleave", () => {
        orbitAnimation.play(); // 애니메이션 재개
    });
});
/* ==============================
   6. Ticket Countdown
================================ */
const targetDate = new Date("May 23, 2026 10:00:00").getTime();

setInterval(() => {
    const gap = targetDate - Date.now();

    days.innerText = Math.floor(gap / 86400000);
    hours.innerText = Math.floor((gap / 3600000) % 24);
    minutes.innerText = Math.floor((gap / 60000) % 60);
    seconds.innerText = Math.floor((gap / 1000) % 60);
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
   8. FAQ Accordion (Fixed)
================================ */
document.querySelectorAll('.faq_q').forEach(q => {
    q.addEventListener('click', () => {
        const parent = q.parentElement;
        const wasActive = parent.classList.contains('active');

        document.querySelectorAll('.faq_item').forEach(item => {
            item.classList.remove('active');
        });

        if (!wasActive) {
            parent.classList.add('active');
        }
    });
});

/* ==============================
   9. Card Tilt & Effects 
================================ */
document.querySelectorAll(".i_card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        gsap.to(card, {
            rotateX: (y - r.height / 2) / 10,
            rotateY: (r.width / 2 - x) / 10,
            duration: 0.5
        });

        card.style.setProperty("--x", `${(x / r.width) * 100}%`);
        card.style.setProperty("--y", `${(y / r.height) * 100}%`);
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
/* ==============================
   Smooth Scroll for Navigation
================================ */
document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 70 },
                ease: "power3.inOut"
            });
        }
    });
});
