const messages = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;
let heartTimer;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createConfetti(count) {
  const colors = ["#ff5a7b", "#ffd166", "#6ec6ff", "#95f08b"]; 
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = random(0, 100) + "%";
    piece.style.background = colors[Math.floor(random(0, colors.length))];
    piece.style.transform = `rotate(${Math.floor(random(0,360))}deg)`;
    piece.style.animationDuration = random(1.8, 3.8) + "s";
    piece.style.animationDelay = random(0, 0.4) + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "2px" : "999px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = random(5, 95) + "%";
  heart.style.fontSize = random(16, 28) + "px";
  heart.style.animationDuration = random(3.5, 6.5) + "s";
  document.querySelector(".ambient").appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

function startHearts() {
  if (heartTimer) clearInterval(heartTimer);
  heartTimer = setInterval(createHeart, 1200);
}

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  const next = Math.min(currentSize * 1.35, 64);
  yesButton.style.fontSize = `${next}px`;
  yesButton.classList.add("pulse");
  const dx = random(-160, 160);
  const dy = random(-100, 100);
  noButton.style.transform = `translate(${dx}px, ${dy}px)`;
}

function handleYesClick() {
  const yesButton = document.querySelector(".yes-button");
  const noButton = document.querySelector(".no-button");
  yesButton.disabled = true;
  noButton.disabled = true;
  createConfetti(120);
  yesButton.classList.add("pulse");
  setTimeout(() => { window.location.href = "yes_page.html"; }, 1400);
}

document.addEventListener("DOMContentLoaded", () => {
  startHearts();
  const noButton = document.querySelector(".no-button");
  noButton.addEventListener("mouseenter", () => {
    const dx = random(-120, 120);
    const dy = random(-80, 80);
    noButton.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "y") handleYesClick();
    if (e.key.toLowerCase() === "n") handleNoClick();
    if (e.key === "Enter") handleYesClick();
  });
});