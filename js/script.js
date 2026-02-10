gsap.registerPlugin(ScrollTrigger);

/* ==============================
   Header Scroll Transition
================================ */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 50);
});
/* ==============================
   Header Navigation Scroll
================================ */
document.querySelectorAll('.gnb a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

const mainVisualTimeline = gsap.timeline({ 
    paused: true,
    onComplete: () => {
        // 애니메이션이 끝나면 스크롤 트리거를 강제로 종료시켜 다음 섹션으로 이동하게 함
        document.body.style.overflow = ""; 
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
        duration: 3,           // 전체 재생 시간을 살짝 단축
        stagger: { 
            each: 0.03,        // 글자 간 간격을 0.08에서 0.03으로 촘촘하게 (핵심!)
            from: "start"      // center보다 왼쪽부터 촤라락 오는 게 더 자연스럽습니다
        },
        ease: "expo.out"       // 튕기는 back 대신, 부드럽게 감속하는 expo 사용 (핵심!)
    }, "-=4.2")
    .fromTo(".convergence-target",
        { letterSpacing: "1em" }, // 시작 간격을 살짝 줄임
        { letterSpacing: "0.05em", duration: 3, ease: "power4.out" },
        "-=2.8"
    )
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
    // 스크롤을 무시하고 애니메이션만 집중하게 하려면 이 옵션을 활용합니다.
    fastScrollEnd: true, 
    preventOverScroll: true
});

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
   3. Reveal Sections & Text (수정본)
================================ */
// 1. .reveal 클래스가 붙은 섹션 전체 등장 애니메이션
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

    // 섹션 내의 .section_title 애니메이션
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
   5. Orbital Partners (완종 수정본)
================================ */
document.querySelectorAll(".sub_partner").forEach((item, i, arr) => {
    const data = { angle: (i / arr.length) * Math.PI * 2 };
    const radius = 230; // 궤도 선 반지름과 일치시킴

    // 개별 애니메이션 인스턴스 생성
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

    // 호버 시 애니메이션 멈추고 컬러 표시
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
                scrollTo: { y: target, offsetY: 70 }, // 헤더 높이만큼 오프셋
                ease: "power3.inOut"
            });
        }
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
            
            // 정보가 나타난 곳으로 부드럽게 이동
            setTimeout(() => {
                infoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            // 숨기기 (Fade Out)
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
