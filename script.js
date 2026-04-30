// Preloader Logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  document.body.style.overflow = "hidden"; // Prevent scroll while loading

  setTimeout(() => {
    preloader.classList.add("loaded");
    document.body.style.overflow = "auto"; // Restore scroll
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, 2000);
});

const toggleBtn = document.getElementById("toggleBtn");
const navbar = document.getElementById("navbar");

toggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

const typedText = document.querySelector(".typing");

const textList = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Welcome To My Portfolio",
  "Creative Coder",
];

let index = 0;
let charIndex = 0;

function type() {
  if (charIndex < textList[index].length) {
    typedText.innerHTML += textList[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.innerHTML = textList[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % textList.length;
    setTimeout(type, 300);
  }
}

type();

document.addEventListener("DOMContentLoaded", () => {
  const bars = document.querySelectorAll(".progress-bar span");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          animateProgress(bar);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 },
  );

  bars.forEach((bar) => observer.observe(bar));
});

function animateProgress(bar) {
  let target = parseInt(bar.dataset.width);
  let current = 0;
  let label = bar.querySelector(".percent");

  let animation = setInterval(() => {
    if (current >= target) {
      clearInterval(animation);
    } else {
      current++;
      bar.style.width = current + "%";
      label.textContent = current + "%";
    }
  }, 15);
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.querySelector('input[name="fullName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const whatsappNumber = "+923412620272";
    const formattedMessage = `New message from ${fullName} (${email}):\n\n${message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      formattedMessage,
    )}`;

    window.open(whatsappUrl, "_blank");
  });

const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastX = mouseX;
let lastY = mouseY;
let particles = [];

// Smooth follow (main fix 🔥)
let smoothX = mouseX;
let smoothY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class FireShine {
  constructor(x, y, targetX, targetY) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;
    this.targetX = targetX;
    this.targetY = targetY;

    this.life = 1;
    this.decay = 0.15 + Math.random() * 0.05; // FAST fade (no trail)
    this.thickness = Math.random() * 10 + 6;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.targetX, this.targetY);

    ctx.shadowBlur = 20; // controlled glow
    ctx.shadowColor = "#e6b800";

    let gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
    );
    gradient.addColorStop(0, `rgba(255,255,150,${this.life})`);
    gradient.addColorStop(0.4, `rgba(255,190,0,${this.life * 0.8})`);
    gradient.addColorStop(1, `rgba(255,50,0,0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.thickness * this.life;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore();
  }

  update() {
    this.y -= 1.2; // smoother upward
    this.life -= this.decay;
  }
}

function animate() {
  // clear (no black bg)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // smooth cursor interpolation 🔥
  smoothX += (mouseX - smoothX) * 0.25;
  smoothY += (mouseY - smoothY) * 0.25;

  // LESS particles → smooth
  for (let i = 0; i < 3; i++) {
    particles.push(new FireShine(smoothX, smoothY, lastX, lastY));
  }

  lastX = smoothX;
  lastY = smoothY;

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add("active");
  } else {
    backToTopBtn.classList.remove("active");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  document.body.style.overflow = "hidden";

  setTimeout(() => {
    preloader.classList.add("loaded");

    // after animation remove completely
    setTimeout(() => {
      preloader.style.display = "none";
      document.body.style.overflow = "auto";
    }, 50);
  }, 200); // loading time
});
