gsap.registerPlugin(ScrollTrigger);
gsap.set(".convergence-target span", {
    x: () => (Math.random() - 0.5) * 1500,
    y: () => (Math.random() - 0.5) * 1000, 
    z: () => Math.random() * 500,
    rotation: () => (Math.random() - 0.5) * 360, 
    opacity: 0
});
gsap.set(".sub-title", { 
    opacity: 0, 
    y: 50 
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main_visual",
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 1.5,
    }
});

tl.to(".overlay", { opacity: 1, duration: 1 })
  .to(".convergence-target span", {
      x: 0,
      y: 0,
      z: 0,
      rotation: 0,
      opacity: 1,
      duration: 2,
      stagger: {
          each: 0.05,
          from: "random" 
      }
  }, "-=0.5")

  .to(".sub-title", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
  }, "-=0.5"); 
  window.addEventListener('load', () => {
    // 1. 타이틀 애니메이션 (한 줄씩 올라오기)
    const lines = document.querySelectorAll('.s_title h2 .line');
    
    lines.forEach((line) => {
        // 실제 글자 내용을 span으로 감싸서 움직이게 함
        const text = line.innerText;
        line.innerHTML = `<span style="display:inline-block; transform:translateY(100%)">${text}</span>`;
        
        gsap.to(line.querySelector('span'), {
            scrollTrigger: {
                trigger: ".s_title",
                start: "top 80%", // 섹션이 화면 80% 지점에 도달했을 때
            },
            y: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.2 // 줄마다 시차를 둠
        });
    });

    // 2. 하단 설명글 애니메이션 (페이드 인 업)
    gsap.to(".s_title p", {
        scrollTrigger: {
            trigger: ".s_title",
            start: "top 70%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5, // 타이틀이 나오고 나서 나중에 나옴
        ease: "power3.out"
    });
});

  window.addEventListener('load', () => {
    const wrapper = document.querySelector('.marquee_wrapper');
    
    // 전체 너비의 절반(한 세트)만큼 왼쪽으로 이동
    gsap.to(wrapper, {
        xPercent: -50,
        duration: 15, // 숫자가 낮을수록 빨라집니다 (원디렉션은 약간 빠른 편)
        ease: "none",
        repeat: -1
    });
});