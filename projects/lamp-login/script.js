const root = document.documentElement;
const body = document.body;
const card = document.getElementById("card");
const chain = document.getElementById("chain");
const clickSound = document.getElementById("clickSound");

let isOn = false;
let pulling = false;
let startY = 0;

function setOn(value) {
  root.style.setProperty("--on", value);
}

function toggleLamp() {
  isOn = !isOn;

  body.setAttribute("data-on", String(isOn));
  setOn(isOn ? 1 : 0);

  card.classList.toggle("active", isOn);

  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (error) {}
}

function getClientY(event) {
  return event.touches ? event.touches[0].clientY : event.clientY;
}

function onDown(event) {
  pulling = true;
  startY = getClientY(event);
  chain.style.transition = "transform 0.08s ease";
}

function onMove(event) {
  if (!pulling) return;

  const y = getClientY(event);
  const delta = Math.max(0, Math.min(45, y - startY));

  root.style.setProperty("--pull", `${delta}px`);

  const preview = isOn ? 1 : Math.min(0.45, delta / 90);
  setOn(preview);
}

function onUp() {
  if (!pulling) return;

  pulling = false;

  const pullValue =
    parseFloat(getComputedStyle(root).getPropertyValue("--pull")) || 0;

  root.style.setProperty("--pull", "0px");
  chain.style.transition = "transform 0.2s ease";

  if (pullValue >= 26) {
    toggleLamp();
  } else {
    setOn(isOn ? 1 : 0);
  }
}

chain.addEventListener("mousedown", onDown);
window.addEventListener("mousemove", onMove);
window.addEventListener("mouseup", onUp);

chain.addEventListener("touchstart", onDown, { passive: true });
window.addEventListener("touchmove", onMove, { passive: true });
window.addEventListener("touchend", onUp);

chain.addEventListener("click", () => {
  if (!pulling) toggleLamp();
});

card.addEventListener("mousemove", (event) => {
  if (!isOn) return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateX = ((y - rect.height / 2) / 18) * -1;
  const rotateY = (x - rect.width / 2) / 18;

  card.style.transform = `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

card.addEventListener("mouseleave", () => {
  if (!isOn) return;
  card.style.transform = "translateY(0) rotateX(0) rotateY(0) scale(1)";
});

setOn(0);