const slides = [...document.querySelectorAll(".slide")];
const navLinks = [...document.querySelectorAll(".nav-link")];
const progress = document.querySelector("#progress");
const counter = document.querySelector("#sceneCounter");
let currentSlide = 0;
let petalTimer = null;
let letterTimer = null;

const messages = {
  hug: "Sending you the biggest, warmest bear hug! 🤗💗",
  kiss: "Mwah! One tiny kiss, just for you! 😘💕",
  play: "Playtime! Let's make a million silly memories! 🎮",
  eat: "Sharing strawberries with my favourite bear! 🍓",
  laugh: "Your smile is my favourite thing in the world! 😊",
  dance: "Dance with me, Dudu! Wiggle, wiggle! 🎶💃"
};
const momentMessages = {
  eat: "Yummy strawberries taste sweeter together! 🍓",
  movie: "Snuggles, popcorn, and our favourite movie! 🍿",
  sleep: "Sleep tight, my little bear. Sweet dreams! 🌙",
  play: "Just two silly bears having the best day ever! 🎾"
};

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, i) => {
    const active = i === currentSlide;
    slide.classList.toggle("active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  navLinks.forEach(link => {
    const active = Number(link.dataset.go) === currentSlide;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "step");
    else link.removeAttribute("aria-current");
  });
  [...progress.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-current", i === currentSlide ? "step" : "false");
  });
  counter.textContent = `Scene ${currentSlide + 1} of ${slides.length}`;
  document.querySelector("#prevButton").disabled = currentSlide === 0;
  document.querySelector("#nextButton").disabled = currentSlide === slides.length - 1;
  if (currentSlide === 6) resetLetter();
  else clearInterval(letterTimer);
}

slides.forEach((slide, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to scene ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  progress.appendChild(dot);
});
navLinks.forEach(link => link.addEventListener("click", () => showSlide(Number(link.dataset.go))));
document.querySelector("#startButton").addEventListener("click", () => {
  showSlide(1);
  burstHearts(innerWidth / 2, innerHeight / 2);
});
document.querySelector("#prevButton").addEventListener("click", () => showSlide(currentSlide - 1));
document.querySelector("#nextButton").addEventListener("click", () => showSlide(currentSlide + 1));
document.querySelector("#restartButton").addEventListener("click", () => {
  resetLetter();
  showSlide(0);
  document.querySelector("#heroCaption").textContent = "Our little story begins again! 🧸💗";
  burstHearts(innerWidth / 2, innerHeight / 2);
});

document.querySelectorAll(".heart-card").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector("#specialMessage").textContent = button.dataset.message;
    button.animate([{transform:"scale(1)"},{transform:"scale(1.1)"},{transform:"scale(1)"}], {duration:350});
    const r = button.getBoundingClientRect();
    burstHearts(r.left + r.width / 2, r.top + r.height / 2);
  });
});
document.querySelectorAll(".moment-card").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.moment;
    document.querySelector("#momentMessage").textContent = momentMessages[key] || "A sweet moment together! 💗";
    document.querySelectorAll(".moment-card").forEach(card => card.classList.remove("selected"));
    button.classList.add("selected");
    const r = button.getBoundingClientRect();
    burstHearts(r.left + r.width / 2, r.top + r.height / 2);
  });
});
document.querySelectorAll(".activity-button").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const stage = document.querySelector("#activityStage");
    const characters = document.querySelector("#activityCharacters");
    const art = {
      hug: "🐻🤗🐼", kiss: "🐻😘🐼", play: "🐻🎮🐼",
      eat: "🐻🍓🐼", laugh: "🐻😂🐼", dance: "🐻💃🐼"
    };
    document.querySelector("#activityMessage").textContent = messages[action] || "Let's have fun! 💗";
    characters.textContent = art[action] || "🐻 💗 🐼";
    stage.className = "activity-stage";
    void stage.offsetWidth;
    stage.classList.add("playing", `action-${action}`);
    burstHearts(innerWidth / 2, innerHeight / 2, action === "hug" || action === "kiss" ? 18 : 10);
  });
});
document.querySelectorAll(".promise-card").forEach(button => {
  button.addEventListener("click", () => {
    const text = button.querySelector("span").textContent;
    document.querySelector("#promiseMessage").textContent = `A little promise from my heart: ${text} 💗`;
    button.animate([{transform:"rotate(0deg)"},{transform:"rotate(-3deg) scale(1.04)"},{transform:"rotate(3deg) scale(1.04)"},{transform:"rotate(0deg)"}], {duration:450});
    const r = button.getBoundingClientRect();
    burstHearts(r.left + r.width / 2, r.top + r.height / 2);
  });
});
document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    const responses = {
      yes: "Awww! Sending you a million hugs! 💗🤗",
      maybe: "That's okay! Take your time, little bear. 😊",
      forever: "A forever-sized bear hug just for you! 🐻💕"
    };
    document.querySelector("#answerMessage").textContent = responses[button.dataset.answer];
    burstHearts(innerWidth / 2, innerHeight / 2, 20);
  });
});

const letterText =
  "To My Favourite Person, My Dudu 💗🐻\n\n" +
  "Sometimes, I wonder how one person can bring so much happiness into my little world. Then I think of you, and I understand. ❤️\n\n" +
  "You are the smile that brightens my ordinary days, the warmth that makes my heart feel safe, and the sweetest thought that comes to my mind before I fall asleep. 🌙💕\n\n" +
  "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Then you would understand how special, beautiful, and precious you truly are to me. 🥹💖\n\n" +
  "I don't need every day to be perfect. I just want the little moments with you — silly jokes, random talks, cute fights, warm hugs, and memories that make us smile even years later. 🧸🌷\n\n" +
  "No matter how busy life gets or how far apart we may be, I hope you always remember that you deserve happiness, peace, and all the love this world can offer.\n\n" +
  "You are my favourite hello, my sweetest thought, and the person I wish to make a million beautiful memories with. 💞\n\n" +
  "So, my Bubu's Dudu, keep smiling, keep dreaming, and never forget how precious you are to me.\n\n" +
  "With all my love, today and always. 💗\n\n" +
  "Forever your little bear, 🐻💕\n" +
  "Your Bubu ❤️";
function resetLetter() {
  clearInterval(letterTimer);
  const output = document.querySelector("#typedMessage");
  if (output) output.textContent = "";
}
function typeLetter() {
  clearInterval(letterTimer);
  const output = document.querySelector("#typedMessage");
  output.textContent = "";
  let i = 0;
  letterTimer = setInterval(() => {
    output.textContent += letterText[i++];
    if (i >= letterText.length) clearInterval(letterTimer);
  }, 38);
}
document.querySelector("#letterButton").addEventListener("click", () => {
  typeLetter();
  burstHearts(innerWidth / 2, innerHeight / 2);
});
document.querySelector("#loveButton").addEventListener("click", () => {
  document.querySelector("#finalMessage").textContent = "You are loved more than a thousand little hearts can say! 💗🐻🐼";
  burstHearts(innerWidth / 2, innerHeight / 2, 28);
});

function burstHearts(x, y, count = 12) {
  const decorations = ["💗","💕","💖","❤️","✨"];
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "heart-particle";
    item.textContent = decorations[Math.floor(Math.random() * decorations.length)];
    item.style.left = `${x + (Math.random() - .5) * 110}px`;
    item.style.top = `${y + (Math.random() - .5) * 45}px`;
    item.style.fontSize = `${16 + Math.random() * 18}px`;
    item.style.animationDelay = `${Math.random() * .2}s`;
    document.body.appendChild(item);
    item.addEventListener("animationend", () => item.remove(), {once:true});
  }
}
function createPetal() {
  const container = document.querySelector("#floatingDecor");
  if (!container || document.hidden) return;
  const petal = document.createElement("span");
  petal.className = "falling-petal";
  const symbols = ["🌸","🌷","💕","✨","🌼"];
  petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${12 + Math.random() * 18}px`;
  petal.style.animationDuration = `${7 + Math.random() * 7}s`;
  container.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove(), {once:true});
}
petalTimer = setInterval(createPetal, 650);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) createPetal();
});

const musicButton = document.querySelector("#musicButton");
musicButton.addEventListener("click", () => {
  // No audio track is bundled, so the button clearly reports that music is not yet added.
  musicButton.textContent = musicButton.dataset.on === "true" ? "♫ Music: Off" : "♫ Music: No track added yet";
  musicButton.dataset.on = musicButton.dataset.on === "true" ? "false" : "true";
  musicButton.setAttribute("aria-pressed", musicButton.dataset.on);
});
document.addEventListener("keydown", event => {
  if (event.target.matches("button, input, textarea, a")) return;
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
});

showSlide(0);
createPetal();
