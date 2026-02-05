gsap.registerPlugin(ScrollTrigger);
gsap.set(".convergence-target span", {
    x: () => (Math.random() - 0.5) * 1500, // 랜덤 좌우 (-750 ~ 750)
    y: () => (Math.random() - 0.5) * 1000, // 랜덤 상하 (-500 ~ 500)
    z: () => Math.random() * 500,          // 앞뒤 거리감
    rotation: () => (Math.random() - 0.5) * 360, // 회전
    opacity: 0
});
gsap.set(".sub-title", { 
    opacity: 0, 
    y: 50 
});
// 1. 타임라인 선언 (전체 애니메이션의 대본 역할을 함)
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".main_visual", // 애니메이션이 시작될 기준점
        start: "top top",      // 브라우저 상단에 섹션 상단이 닿을 때 시작
        end: "+=3000",         // 3000px 스크롤되는 동안 애니메이션 실행
        pin: true,             // 중요! 애니메이션 도중 화면을 고정시킴
        scrub: 1.5,            // 스크롤 속도와 동기화 (1.5초 정도의 부드러운 지연)
    }
});

tl.to(".overlay", { opacity: 1, duration: 1 }) // 1. 배경 암전

  .to(".convergence-target span", {           // 2. h1 글자 모이기
      x: 0,
      y: 0,
      z: 0,
      rotation: 0,
      opacity: 1,
      duration: 2,
      stagger: {
          each: 0.05,
          from: "random" // 랜덤하게 모여서 더 역동적임
      }
  }, "-=0.5")

  .to(".sub-title", {                         // 3. p 태그 슬라이드 업
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
  }, "-=0.5"); // 글자들이 거의 다 모일 때쯤 시작