const root = document.documentElement;
const body = document.body;
const card = document.getElementById("card");
const chain = document.getElementById("chain");
const clickSound = document.getElementById("clickSound");

let isOn = false;
let pulling = false;
let startY = 0;

function setOn(v){
  root.style.setProperty("--on", v);
  // background switch
  document.body.style.background = v > 0.5 ? "#1c1f24" : "#121417";
}

function toggleLamp(){
  isOn = !isOn;
  body.setAttribute("data-on", String(isOn));
  setOn(isOn ? 1 : 0);

  if (isOn) card.classList.add("active");
  else card.classList.remove("active");

  try { clickSound.currentTime = 0; clickSound.play(); } catch(e){}
}

function onDown(e){
  pulling = true;
  startY = (e.touches ? e.touches[0].clientY : e.clientY);
  chain.style.transition = "transform .08s ease";
}

function onMove(e){
  if(!pulling) return;
  const y = (e.touches ? e.touches[0].clientY : e.clientY);
  let delta = Math.max(0, Math.min(40, y - startY));
  root.style.setProperty("--pull", `${delta}px`);

  const preview = Math.min(1, (delta / 40) * 0.35 + (isOn ? 1 : 0));
  setOn(preview);
}

function onUp(){
  if(!pulling) return;
  pulling = false;

  const pullVal = parseFloat(getComputedStyle(root).getPropertyValue("--pull")) || 0;
  root.style.setProperty("--pull", "0px");
  chain.style.transition = "transform .18s ease";

  if (pullVal >= 26) toggleLamp();
  else setOn(isOn ? 1 : 0);
}

chain.addEventListener("mousedown", onDown);
window.addEventListener("mousemove", onMove);
window.addEventListener("mouseup", onUp);

chain.addEventListener("touchstart", onDown, {passive:true});
window.addEventListener("touchmove", onMove, {passive:true});
window.addEventListener("touchend", onUp);
chain.addEventListener("click", toggleLamp)

setOn(0);