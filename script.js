const textContainer = document.getElementById("text-sequence");
const forgiveBtn = document.getElementById("forgive-btn");
const successMessage = document.getElementById("success-message");
const particleContainer = document.getElementById("particle-container");
const explosionContainer = document.getElementById("explosion-container");

const sequences = [
    "Iga raali ahow Samira 🥺",
    "Aad Iyo Ayaa Ugu Xumahay xppti ",
    "Aad baan kuu jecelahay Samira 🥺"
];

let currentSequence = 0;

function typeText(text, callback) {
  textContainer.innerHTML = "";
  // Use spread operator to correctly handle Unicode/Emojis
  const letters = [...text];
  letters.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";
    span.style.animationDelay = `${index * 0.08}s`;
    textContainer.appendChild(span);
  });

  if (callback) {
    const totalDuration = letters.length * 80 + 1000;
    setTimeout(callback, totalDuration);
  }
}

function startSequence() {
  typeText(sequences[0], () => {
    setTimeout(() => {
      typeText(sequences[1], () => {
        setTimeout(() => {
          typeText(sequences[2], () => {
            setTimeout(() => {
              forgiveBtn.classList.remove("hidden");
              forgiveBtn.style.animation = "fadeInLetter 1s forwards";
            }, 1000);
          });
        }, 2000);
      });
    }, 2000);
  });
}

function createFloatingElement() {
  const elements = ["❤️", "💖", "🌸", "🌹", "✨", "🌷"];
  const el = document.createElement("div");
  el.className = "floating-element";
  el.textContent = elements[Math.floor(Math.random() * elements.length)];

  const startX = Math.random() * 100;
  const duration = 5 + Math.random() * 10;
  const size = 15 + Math.random() * 30;
  const drift = (Math.random() - 0.5) * 200; // Drift left or right

  el.style.left = `${startX}%`;
  el.style.setProperty("--duration", `${duration}s`);
  el.style.setProperty("--drift", `${drift}px`);
  el.style.fontSize = `${size}px`;

  particleContainer.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, duration * 1000);
}

function createExplosion(x, y) {
  const particles = 50;
  const elements = ["❤️", "💖", "🌸", "🌹", "✨", "🌷"];

  for (let i = 0; i < particles; i++) {
    const p = document.createElement("div");
    p.className = "explosion-particle";
    p.textContent = elements[Math.floor(Math.random() * elements.length)];

    const angle = Math.random() * Math.PI * 2;
    const velocity = 100 + Math.random() * 200;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty("--x", `${tx}px`);
    p.style.setProperty("--y", `${ty}px`);
    p.style.animation = `explode 1.5s ease-out forwards`;

    explosionContainer.appendChild(p);

    setTimeout(() => p.remove(), 1500);
  }
}

forgiveBtn.addEventListener("click", (e) => {
  const rect = forgiveBtn.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  createExplosion(x, y);

  // Hide sequence and button
  textContainer.style.display = "none";
  forgiveBtn.style.display = "none";

  // Show success message
  successMessage.classList.remove("hidden");
  successMessage.style.display = "block";
  successMessage.style.animation = "fadeInLetter 1.5s forwards";

  // Extra explosions
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createExplosion(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
      );
    }, i * 300);
  }
});

// Start background particles
setInterval(createFloatingElement, 400);

// Initialize
window.onload = () => {
  setTimeout(startSequence, 1000);
};
