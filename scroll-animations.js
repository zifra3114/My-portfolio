// =========================================================
// SCROLL REVEAL ANIMATIONS
// Har element jis par data-reveal attribute laga hai,
// woh scroll karke jab screen par aayega to fade/slide/
// scale ho kar dikhega. Ek baar reveal hone ke baad
// dobara hide nahi hota (one-time animation, jaisa
// premium portfolio sites mai hota hai).
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const revealEls = document.querySelectorAll("[data-reveal]");

  if (!revealEls.length) return;


  // Agar user ne reduced motion on kar rakha hai,
  // to seedha sab kuch dikha do, animation mat karo.
  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add("in-view"));
    return;
  }


  // Har element apna transition-delay data-reveal-delay
  // attribute se leta hai (milliseconds mai). Agar attribute
  // nahi diya to delay 0 rehti hai.
  revealEls.forEach(el => {
    const delay = el.dataset.revealDelay;
    if (delay) {
      el.style.transitionDelay = `${delay}ms`;
    }
  });


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // ek baar reveal ho gaya to observe karna band —
          // scroll up/down karne par baar baar flicker nahi hoga
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealEls.forEach(el => observer.observe(el));


  // Nav bar page load hote hi turant reveal ho jaye,
  // scroll ka wait na kare.
  const navEl = document.querySelector("nav[data-reveal]");
  if (navEl) {
    requestAnimationFrame(() => {
      navEl.classList.add("in-view");
    });
  }

});


// =========================================================
// SCROLL PROGRESS BAR (top of page)
// Batata hai user ne page kitna scroll kiya hai —
// har section mai chalte rehne se page zinda lagta hai.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  document.body.appendChild(bar);

  function updateBar() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateBar, { passive: true });
  updateBar();

});


// =========================================================
// NAVBAR — shrink / add background on scroll
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("nav");
  if (!nav) return;

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

});
document.addEventListener("DOMContentLoaded", () => {
  const skillRows = document.querySelectorAll(".skill-row");
  if (!skillRows.length) return;

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("bar-in-view"), i * 120);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  skillRows.forEach(row => barObserver.observe(row));
});