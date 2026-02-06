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