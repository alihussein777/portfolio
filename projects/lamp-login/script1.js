const root = document.documentElement;
const body = document.body;
const card = document.getElementById("card");
const chain = document.getElementById("chain");
const clickSound = document.getElementById("clickSound");

let isOn = false;
let pulling = false;
let startY = 0;
let currentPull = 0; //  track pull value directly (no need to read CSS)

function setOn(v) {
  root.style.setProperty("--on", v);
  document.body.style.background = v > 0.5 ? "#1c1f24" : "#121417";
}

function toggleLamp() {
  isOn = !isOn;
  body.setAttribute("data-on", String(isOn));
  setOn(isOn ? 1 : 0);

  if (isOn) card.classList.add("active");
  else card.classList.remove("active");

  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (e) {}
}

function onDown(e) {
  pulling = true;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
  chain.style.transition = "transform 0.08s ease";
}

function onMove(e) {
  if (!pulling) return;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  currentPull = Math.max(0, Math.min(40, y - startY)); //  store directly
  root.style.setProperty("--pull", `${currentPull}px`);

  const preview = Math.min(1, (currentPull / 40) * 0.35 + (isOn ? 1 : 0));
  setOn(preview);
}

function onUp() {
  if (!pulling) return;
  pulling = false;

  root.style.setProperty("--pull", "0px");
  chain.style.transition = "transform 0.18s ease";

  if (currentPull >= 26) toggleLamp(); //  use stored value, not getComputedStyle
  else setOn(isOn ? 1 : 0);

  currentPull = 0; //  reset
}

chain.addEventListener("mousedown", onDown);
window.addEventListener("mousemove", onMove);
window.addEventListener("mouseup", onUp);

chain.addEventListener("touchstart", onDown, { passive: true });
window.addEventListener("touchmove", onMove, { passive: true });
window.addEventListener("touchend", onUp);

//  REMOVED: chain.addEventListener("click", toggleLamp)
// click fires after mouseup/touchend causing double-toggle — removed

setOn(0);