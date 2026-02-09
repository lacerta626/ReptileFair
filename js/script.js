// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);
// 헤더 배경 변경 스크립트
gsap.to("header", {
    scrollTrigger: {
        trigger: ".main_visual", 
        start: "top top", 
        end: "bottom top", 
        onEnter: () => document.querySelector("header").classList.add("active"),
        onLeaveBack: () => document.querySelector("header").classList.remove("active"),
    }
});

window.addEventListener('load', () => {
    
    /** 1. 메인 비주얼 : 글자 사방에서 모여드는 효과 (Convergence) **/
    const mainVisualTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".main_visual",
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1.5,
        }
    });

    // 초기 상태 설정 (흩어져 있는 상태)
    gsap.set(".convergence-target span", {
        x: () => (Math.random() - 0.5) * 1500,
        y: () => (Math.random() - 0.5) * 1000, 
        z: () => Math.random() * 500,
        rotation: () => (Math.random() - 0.5) * 360, 
        opacity: 0
    });
    gsap.set(".sub-title", { opacity: 0, y: 50 });

    // 타임라인 애니메이션 실행
    mainVisualTimeline
        .to(".overlay", { opacity: 1, duration: 1 })
        .to(".convergence-target span", {
            x: 0, y: 0, z: 0, rotation: 0, opacity: 1,
            duration: 2,
            stagger: { each: 0.05, from: "random" }
        }, "-=0.5")
        .to(".sub-title", {
            opacity: 1, y: 0, duration: 1, ease: "power2.out"
        }, "-=0.5");


    /** 2. 마키 효과 (흐르는 글자) : 무한 루프 **/
    const marqueeWrapper = document.querySelector('.marquee_wrapper');
    if (marqueeWrapper) {
        gsap.to(marqueeWrapper, {
            xPercent: -50,
            duration: 30,
            ease: "none",
            repeat: -1
        });
    }


    /** 3. 섹션 타이틀 (s_title) : 텍스트 마스킹 리빌 효과 **/
    const lines = document.querySelectorAll('.s_title h2 .line');
    lines.forEach((line) => {
        const text = line.innerText;
        line.innerHTML = `<span style="display:inline-block; transform:translateY(100%)">${text}</span>`;
        
        gsap.to(line.querySelector('span'), {
            scrollTrigger: {
                trigger: ".s_title",
                start: "top 80%",
            },
            y: 0,
            duration: 1,
            ease: "power4.out"
        });
    });

    // s_title 하단 p태그 페이드 인
    gsap.to(".s_title p", {
        scrollTrigger: {
            trigger: ".s_title",
            start: "top 70%",
        },
        opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out"
    });


    /** 4. 공통 섹션 리빌 (Reveal) : 나중에 추가될 섹션들 자동 적용 **/
    // HTML에 <section class="reveal"> 형태로 사용 시 작동
    const reveals = document.querySelectorAll('.s_info, .reveal'); // s_info와 나중에 추가될 reveal 섹션들
    reveals.forEach((section) => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 }, 
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse",
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );
    });
});
/* card interaction */
const iCards=document.querySelectorAll('.i_card');

iCards.forEach(card=>{

card.addEventListener('mousemove',e=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

card.style.setProperty('--x',`${x}px`);
card.style.setProperty('--y',`${y}px`);

const centerX=rect.width/2;
const centerY=rect.height/2;
const rotateX=(y-centerY)/10;
const rotateY=(centerX-x)/10;

gsap.to(card,{rotateX,rotateY,duration:.5,ease:"power2.out"});

const icon=card.querySelector('.magnetic_icon');
if(icon){
const mX=(x-centerX)*.15;
const mY=(y-centerY)*.15;
gsap.to(icon,{x:mX,y:mY,duration:.3});
}
});

card.addEventListener('mouseleave',()=>{
gsap.to(card,{rotateX:0,rotateY:0,duration:.8,ease:"elastic.out(1,0.3)"});
const icon=card.querySelector('.magnetic_icon');
if(icon)gsap.to(icon,{x:0,y:0,duration:.5});
});

});
