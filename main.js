gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 4,            // Smoothness (higher is slower)
  effects: true,          // Enable data-speed & data-lag
});
// Responsive helper: interpolate a value between 1080p and 900p based on current viewport height
// Usage: getYvh( valueAt1080, valueAt900 ) -> returns a string like "NNNvh"
function getYvh(valueAt1080, valueAt900) {
  const h = window.innerHeight || window.screen.height || 1080;
  const minH = 900;   // 1440×900 baseline
  const maxH = 1080;  // 1920×1080 baseline
  const clampedH = Math.max(minH, Math.min(maxH, h));
  const t = (maxH - clampedH) / (maxH - minH); // 0 at 1080, 1 at 900
  const v = valueAt1080 + t * (valueAt900 - valueAt1080);
  return `${v}vh`;
}

// Recompute ScrollTrigger positions on resize so responsive values take effect
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

ScrollTrigger.matchMedia({
  "(min-width: 991px)": function () {

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section2',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '85vh',
      x: '18vw',
      width: '32vw',
      rotate: 90,
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
      y: '218vh',
      // move further to the right empty space beside the section content
      x: '30vw',
      width: '35vw',
      rotate: 35,
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '308vh',
      // recenter so it aligns with the product row in section 5
      x: '0vw',
      width: '42vw',
      rotate: 0,
      ease: 'power1.inOut',
      immediateRender: false
    });

     gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section5',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      // Lower slightly so it aligns visually with the product headphones
      // 1080p -> 356vh, 900p -> 372vh (interpolated for in-between heights)
      y: getYvh(356, 372),
      width: '28vw',
      ease: 'power1.inOut',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section5',
        start: 'center bottom',
        end: 'bottom bottom',
        scrub: true,
      },
      // Final settle position aligned with the row (nudged downward)
      // 1080p -> 436vh, 900p -> 451vh (interpolated for in-between heights)
      y: getYvh(436, 451),
      width: '300px',
      ease: 'power1.inOut',
      immediateRender: false
    });

    // content animation

    gsap.from('#section2 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section2',
        start: '-50% bottom',
        end: 'center center',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section3 .heading', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section4 img', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      width: 0,
      opacity: 0,
      ease: 'power1.inOut',
    });

    gsap.from('#section6 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section6',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '40%',
      duration: 2,
      ease: 'power1.inOut',
    });

    // hero section text animation
    let split = SplitText.create('#section1 .heading', {
      type: 'chars, words, lines',
      mask: 'lines'
    });

    gsap.from(split.chars, {
      yPercent: ()=> gsap.utils.random(-100, 100),
      rotation: ()=> gsap.utils.random(-30, 30),
      autoAlpha: 0,
      ease: 'back.out(1.5)',
      stagger: {
        amount: 0.5,
        from: 'random'
      },
      duration: 1.5
    });

    gsap.from('#headphone', {
      opacity: 0,
      scale: 0,
      duration: 1,
      delay: 1,
      ease: 'power1.inOut'
    })

  }
})

