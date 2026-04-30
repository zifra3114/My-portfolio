const chatIconEl = document.getElementById("chat-icon");
const chatWindowEl = document.getElementById("chat-window");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

chatIconEl.addEventListener("click", () => {
  chatWindowEl.style.display = "flex";
  chatIconEl.style.display = "none";
  addMessage(
    "bot",
    "Hello! I'm here to help. Ask me anything about this portfolio, projects, or skills."
  );
});
closeBtn.addEventListener("click", () => {
  chatWindowEl.style.display = "none";
  chatIconEl.style.display = "flex";
});

sendBtn.addEventListener("click", () => {
  sendMessage();
});
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = userInput.scrollHeight + "px";
});

function addMessage(sender, message) {
  const msgEl = document.createElement("div");
  msgEl.classList.add("message", sender + "-message");
  msgEl.innerText = message;
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function botResponse(text) {
  const msg = text.toLowerCase();
  let response =
    "I'm trained only to answer questions about this portfolio, projects, and skills.";

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    response = "Hello! How can I help you explore this portfolio?";
  } else if (msg.includes("name") || msg.includes("who are you")) {
    response = "The creator of this portfolio is Zifra Firdous.";
  } else if (
    msg.includes("skill") ||
    msg.includes("technologies") ||
    msg.includes("stack")
  ) {
    response =
      "Zifra is skilled in HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Bootstrap, and Python.";
  } else if (
    msg.includes("project") ||
    msg.includes("work") ||
    msg.includes("portfolio")
  ) {
    response =
      "This portfolio showcases responsive websites, landing pages, dashboards, and interactive web apps.";
  } else if (
    msg.includes("experience") ||
    msg.includes("years") ||
    msg.includes("worked")
  ) {
    response =
      "Zifra has experience in frontend development, UI/UX implementation, and responsive web design.";
  } else if (
    msg.includes("education") ||
    msg.includes("study") ||
    msg.includes("qualification")
  ) {
    response =
      "Zifra has a background in Medical Science and is learning Web Development at SMIT and GIAIC.";
  } else if (
    msg.includes("service") ||
    msg.includes("offer") ||
    msg.includes("do you build")
  ) {
    response =
      "Zifra offers services in website development, responsive design, portfolio websites, and landing pages.";
  } else if (
    msg.includes("hire") ||
    msg.includes("available") ||
    msg.includes("freelance") ||
    msg.includes("job")
  ) {
    response =
      "Yes! Zifra is available for freelance work and collaborations. Use the contact form to get in touch.";
  } else if (
    msg.includes("contact") ||
    msg.includes("email") ||
    msg.includes("reach") ||
    msg.includes("message")
  ) {
    response =
      "You can contact Zifra through the contact form available on this portfolio.";
  } else if (
    msg.includes("price") ||
    msg.includes("cost") ||
    msg.includes("charges") ||
    msg.includes("budget")
  ) {
    response =
      "Project pricing depends on requirements. You can share details using the contact form.";
  } else if (
    msg.includes("tools") ||
    msg.includes("software") ||
    msg.includes("framework")
  ) {
    response =
      "Zifra uses modern tools like VS Code, Git, GitHub, Figma, Tailwind CSS, and React.";
  } else if (
    msg.includes("location") ||
    msg.includes("where") ||
    msg.includes("based")
  ) {
    response = "Zifra is based in Pakistan and works with clients worldwide.";
  } else if (
    msg.includes("time") ||
    msg.includes("delivery") ||
    msg.includes("how long")
  ) {
    response =
      "Project timelines depend on complexity, usually ranging from a few days to a couple of weeks.";
  } else if (
    msg.includes("review") ||
    msg.includes("testimonial") ||
    msg.includes("feedback")
  ) {
    response =
      "Client feedback is available in the testimonials section of this portfolio.";
  }

  addMessage("bot", response);
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;
  addMessage("user", text);
  userInput.value = "";
  setTimeout(() => {
    botResponse(text);
  }, 500);
}
