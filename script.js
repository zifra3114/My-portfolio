// ===================================================
// TYPING ANIMATION — Full Stack Developer heading
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  const typingEl = document.getElementById("typing-text");
  if (!typingEl) return;

  // Yahan jo words dikhane hain unki list. Chaho to change/add kar sakte ho.
  const words = [
    "Full Stack Developer",
    "Web Developer",
    "App Builder",
    "Problem Solver"
  ];

  const typeSpeed = 90;    // typing speed (ms per letter)
  const eraseSpeed = 45;   // erasing speed (ms per letter)
  const holdTime = 1400;   // pause after word is fully typed (ms)
  const gapTime = 400;     // pause after erasing, before next word (ms)

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // typing forward
      charIndex++;
      typingEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        // full word typed, pause then start deleting
        isDeleting = true;
        setTimeout(tick, holdTime);
        return;
      }

      setTimeout(tick, typeSpeed);
    } else {
      // erasing
      charIndex--;
      typingEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, gapTime);
        return;
      }

      setTimeout(tick, eraseSpeed);
    }
  }

  tick();
});
// ===================================================
// SELECTED WORK — MARQUEE PROJECTS
// ===================================================

document.addEventListener("DOMContentLoaded", () => {

  const projects = [

  {
    title: "SupportFlow",
    tech: "React · Node.js · Express · MongoDB",
    github: "#",
    live: "#",
    video: "assets/complain-portal.mp4"
  },

  {
    title: "DevBlog",
    tech: "MERN · JWT · Cloudinary · REST API",
    github: "#",
    live: "#",
    video: "assets/news.mp4"
  },

  {
    title: "Complaint Portal",
    tech: "React · Node.js · MongoDB · Firebase",
    github: "#",
    live: "https://complaint-portal-phi.vercel.app/",
    video: "./assets/makeup-ui.mp4"
  },

  {
    title: "School Management",
    tech: "Next.js · Django · PostgreSQL",
    github: "#",
    live: "#",
    video: "assets/juice-ui.mp4"
  },

  {
    title: "E-Commerce Platform",
    tech: "React · Django · PostgreSQL",
    github: "#",
    live: "#",
    video: "assets/chatApp.mp4"
  },

  {
    title: "AI Web Application",
    tech: "Next.js · Python · AI",
    github: "#",
    live: "#",
    video: "assets/resume.mp4"
  }

];


  const template = document.getElementById(
    "project-card-template"
  );

  const row1 = document.getElementById("row-1");
  const row2 = document.getElementById("row-2");


  if (!template || !row1 || !row2) return;


  const REPEATS = 6;


  // ===================================================
  // BUILD PROJECT CARD
  // ===================================================

  function buildCard(project, displayIndex) {

    const node = template.content.cloneNode(true);

    const thumb = node.querySelector(".project-thumb");
    const video = node.querySelector(".project-video");


    // ===================================================
    // NUMBER
    // ===================================================

    node.querySelector(".project-num").textContent =
      String(displayIndex + 1).padStart(2, "0");


    // ===================================================
    // PROJECT CONTENT
    // ===================================================

    node.querySelector(".project-title").textContent =
      project.title;

    node.querySelector(".project-sub").textContent =
      project.tech;


    // ===================================================
    // LINKS
    // ===================================================

    node.querySelector(".gh-link").href =
      project.github;

    node.querySelector(".live-link").href =
      project.live;


    // ===================================================
    // VIDEO
    // ===================================================

    if (project.video) {

      thumb.classList.add("has-video");

      video.src = project.video;

      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;

      /*
        Video automatically starts.
        No mouseenter.
        No mouseleave.
        No click pause/play.
      */

      video.play().catch(() => {

        /*
          Browser autoplay policy can sometimes
          block the first play attempt.
        */

        const startVideo = () => {

          video.play().catch(() => {});

          document.removeEventListener(
            "click",
            startVideo
          );

          document.removeEventListener(
            "touchstart",
            startVideo
          );

        };

        document.addEventListener(
          "click",
          startVideo,
          { once: true }
        );

        document.addEventListener(
          "touchstart",
          startVideo,
          { once: true }
        );

      });

    }


    return node;
  }


  // ===================================================
  // FILL MARQUEE ROW
  // ===================================================

  function fillRow(track, rowProjects) {

    for (let pass = 0; pass < REPEATS; pass++) {

      rowProjects.forEach((entry) => {

        track.appendChild(
          buildCard(
            entry.project,
            entry.index
          )
        );

      });

    }

  }


  // ===================================================
  // SPLIT PROJECTS BETWEEN ROWS
  // ===================================================

  const rowA = [];
  const rowB = [];


  projects.forEach((project, index) => {

    if (index % 2 === 0) {

      rowA.push({
        project,
        index
      });

    } else {

      rowB.push({
        project,
        index
      });

    }

  });


  // ===================================================
  // BUILD ROWS
  // ===================================================

  fillRow(row1, rowA);

  fillRow(row2, rowB);

});
// =========================================================
// SKILLS SECTION
// INTERACTIVE CIRCULAR PERCENTAGE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {


  const orbitSkills =
    document.querySelectorAll(".orbit-skill");


  const skillRows =
    document.querySelectorAll(".skill-row");


  const activeSkill =
    document.getElementById("activeSkill");


  const percentageEl =
    document.getElementById("skillPercentage");


  const progressRing =
    document.querySelector(
      ".progress-ring-fill"
    );


  if (
    !orbitSkills.length ||
    !skillRows.length ||
    !progressRing ||
    !percentageEl
  ) {
    return;
  }



  // =======================================================
  // CIRCLE CALCULATION
  // =======================================================

  const radius = 68;

  const circumference =
    2 * Math.PI * radius;


  progressRing.style.strokeDasharray =
    circumference;


  progressRing.style.strokeDashoffset =
    circumference;



  // =======================================================
  // ANIMATION VARIABLES
  // =======================================================

  let percentageAnimation;


  let currentPercentage = 0;



  // =======================================================
  // ANIMATE NUMBER
  // =======================================================

  function animateNumber(target) {


    cancelAnimationFrame(
      percentageAnimation
    );


    const start =
      currentPercentage;


    const difference =
      target - start;


    const duration = 900;


    const startTime =
      performance.now();



    function animate(time) {


      const elapsed =
        time - startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      // Smooth ease-out

      const eased =
        1 -
        Math.pow(
          1 - progress,
          4
        );


      const value =
        Math.round(
          start +
          difference * eased
        );


      percentageEl.textContent =
        value;


      if (progress < 1) {

        percentageAnimation =
          requestAnimationFrame(
            animate
          );

      } else {

        currentPercentage =
          target;

      }

    }


    percentageAnimation =
      requestAnimationFrame(
        animate
      );

  }



  // =======================================================
  // UPDATE CIRCLE
  // =======================================================

  function updateCircle(level) {


    const percentage =
      Number(level);


    const offset =
      circumference -
      (
        percentage / 100
      ) *
      circumference;


    progressRing.style.strokeDashoffset =
      offset;


    animateNumber(
      percentage
    );

  }



  // =======================================================
  // ACTIVATE SKILL
  // =======================================================

  function activateSkill(
    skillName,
    level
  ) {


    // Center title

    activeSkill.textContent =
      skillName;



    // Orbit active state

    orbitSkills.forEach(
      skill => {

        skill.classList.toggle(
          "active",

          skill.dataset.skill ===
          skillName
        );

      }
    );



    // List active state

    skillRows.forEach(
      row => {

        row.classList.toggle(
          "active",

          row.dataset.skill ===
          skillName
        );

      }
    );



    // Circular percentage

    updateCircle(
      level
    );

  }



  // =======================================================
  // ORBIT SKILL EVENTS
  // =======================================================

  orbitSkills.forEach(
    skill => {


      skill.addEventListener(
        "mouseenter",
        () => {

          activateSkill(
            skill.dataset.skill,
            skill.dataset.level
          );

        }
      );



      skill.addEventListener(
        "click",
        () => {

          activateSkill(
            skill.dataset.skill,
            skill.dataset.level
          );

        }
      );

    }
  );



  // =======================================================
  // RIGHT LIST EVENTS
  // =======================================================

  skillRows.forEach(
    row => {


      row.addEventListener(
        "mouseenter",
        () => {

          activateSkill(
            row.dataset.skill,
            row.dataset.level
          );

        }
      );



      row.addEventListener(
        "click",
        () => {

          activateSkill(
            row.dataset.skill,
            row.dataset.level
          );

        }
      );

    }
  );



  // =======================================================
  // INITIAL ANIMATION
  // =======================================================

  setTimeout(
    () => {

      activateSkill(
        "React.js",
        90
      );

    },
    500
  );


});

// =========================================================
// ZIA — Zifra's Intelligent Assistant
// Scoped chatbot: sirf portfolio-related sawalon ka jawab
// deta hai. Baaki sab politely decline karta hai.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const widget      = document.querySelector(".zia-widget");
  const toggle      = document.getElementById("ziaToggle");
  const win         = document.getElementById("ziaWindow");
  const messagesBox = document.getElementById("ziaMessages");
  const form        = document.getElementById("ziaForm");
  const input       = document.getElementById("ziaInput");
  const suggestions = document.getElementById("ziaSuggestions");

  if (!widget || !toggle || !messagesBox || !form || !input) return;


  // =======================================================
  // KNOWLEDGE BASE — sirf yehi info chatbot jaanta hai
  // =======================================================

  const KB = {

    greeting: [
      "Hi! I'm ZIA 👋 — I can tell you about Zifra Firdous's skills, projects, experience, and how to get in touch. What would you like to know?"
    ],

    name: [
      "I'm ZIA, Zifra Firdous's personal assistant here to answer questions about her work as a Full Stack Developer."
    ],

    about: [
      "Zifra Firdous is a Full Stack Developer who builds fast, reliable web applications — from database design to polished frontend interfaces. She's currently a Backend Developer Trainee at SKONZS."
    ],

    skills: [
      "Zifra works with: React.js (90%), Node.js (88%), Express.js (86%), MongoDB (84%), Python (82%), and Django (80%). She also uses REST APIs, Git, and GitHub in her workflow."
    ],

    projects: [
      "Some of her projects include SupportFlow, DevBlog, a Complaint Portal (React + Node + MongoDB), a School Management System (Next.js + Django), an E-Commerce site, and an AI Web Application. You can check out the 'Projects' section above for live links and details!"
    ],

    experience: [
      "She's currently a Backend Developer Trainee at SKONZS (2026–Present), has been doing Full Stack freelance/personal projects since 2024, and works as a Full Stack Development Trainer since 2025, teaching others web development."
    ],

    certificates: [
      "Zifra holds certifications in Web Development and Advanced Development from Saylani Mass IT Training, plus an achievement from FemHack 2K25. Check the 'Certificates' section for details."
    ],

    contact: [
      "You can reach Zifra at zifrafirdous.dev@gmail.com, or use the contact form in the 'Contact' section of this site. She usually replies within 24 hours!"
    ],

    availability: [
      "Yes! Zifra is currently available for freelance and full-time opportunities. Feel free to reach out via the Contact section."
    ],

    location: [
      "Zifra is based in Pakistan and open to remote work."
    ],

    thanks: [
      "You're welcome! Let me know if you'd like to know anything else about Zifra's work. 😊"
    ],

    fallback: [
      "I'm only trained to answer questions about Zifra Firdous — her skills, projects, experience, or how to contact her. Could you ask something related to that?",
      "That's outside what I can help with — I only know about Zifra's portfolio (skills, projects, experience, contact). Try asking about one of those!"
    ]

  };


  // =======================================================
  // INTENT MATCHING — keyword based, scoped strictly
  // =======================================================

  const INTENTS = [
    { key: "greeting",     patterns: ["hi", "hello", "hey", "salam", "assalam", "aoa"] },
    { key: "name",         patterns: ["who are you", "your name", "what is ZF", "tumhara naam", "aap kon"] },
    { key: "about",        patterns: ["about zifra", "who is zifra", "tell me about her", "introduce", "who is she"] },
    { key: "skills",       patterns: ["skill", "technology", "tech stack", "programming language", "what does she know", "expertise", "kya aati", "stack"] },
    { key: "projects",     patterns: ["project", "work", "portfolio piece", "built", "made", "app she built", "kaam"] },
    { key: "experience",   patterns: ["experience", "job", "work history", "trainee", "career", "where does she work", "skonzs"] },
    { key: "certificates", patterns: ["certificate", "certification", "achievement", "course", "training program"] },
    { key: "contact",      patterns: ["contact", "email", "reach", "message", "get in touch", "hire", "connect"] },
    { key: "availability", patterns: ["available", "hire", "freelance", "open to work", "job available", "free hai"] },
    { key: "location",     patterns: ["location", "where is she", "based in", "country", "city"] },
    { key: "thanks",       patterns: ["thanks", "thank you", "shukriya", "great", "nice"] }
  ];

  function detectIntent(text) {
    const t = text.toLowerCase().trim();

    for (const intent of INTENTS) {
      if (intent.patterns.some(p => t.includes(p))) {
        return intent.key;
      }
    }
    return null;
  }

  function getReply(text) {
    const intent = detectIntent(text);
    const pool = intent ? KB[intent] : KB.fallback;
    return pool[Math.floor(Math.random() * pool.length)];
  }


  // =======================================================
  // UI HELPERS
  // =======================================================

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `zia-msg ${sender}`;
    msg.textContent = text;
    messagesBox.appendChild(msg);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "zia-typing";
    typing.id = "ziaTyping";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messagesBox.appendChild(typing);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function removeTyping() {
    const typing = document.getElementById("ziaTyping");
    if (typing) typing.remove();
  }

  function respondTo(text) {
    addMessage(text, "user");
    if (suggestions) suggestions.style.display = "none";

    showTyping();

    setTimeout(() => {
      removeTyping();
      addMessage(getReply(text), "bot");
    }, 600 + Math.random() * 500);
  }


  // =======================================================
  // EVENTS
  // =======================================================

  toggle.addEventListener("click", () => {
    widget.classList.toggle("open");

    if (widget.classList.contains("open") && !messagesBox.dataset.greeted) {
      messagesBox.dataset.greeted = "true";
      setTimeout(() => addMessage(KB.greeting[0], "bot"), 300);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    respondTo(text);
    input.value = "";
  });

  if (suggestions) {
    suggestions.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        respondTo(btn.dataset.q);
      });
    });
  }

});
// =========================================================
// NAVBAR — shrink on scroll + hide on scroll-down, show on scroll-up
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector("nav");
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavScroll() {
    const currentScrollY = window.scrollY;

    // shrink/background effect (jo pehle se tha)
    if (currentScrollY > 40) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }

    // top ke bilkul paas ho to hamesha dikhao
    if (currentScrollY < 80) {
      nav.classList.remove("nav-hidden");
      nav.classList.add("nav-visible");
    }
    // neeche scroll ho raha hai -> chhupao
    else if (currentScrollY > lastScrollY) {
      nav.classList.add("nav-hidden");
      nav.classList.remove("nav-visible");
    }
    // upar scroll ho raha hai -> dikhao
    else if (currentScrollY < lastScrollY) {
      nav.classList.remove("nav-hidden");
      nav.classList.add("nav-visible");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(handleNavScroll);
      ticking = true;
    }
  }, { passive: true });

  handleNavScroll();

});