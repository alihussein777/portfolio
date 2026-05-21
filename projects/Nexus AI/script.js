const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  const number = card.querySelector("h2");
  const target = Number(card.dataset.target);
  const type = card.dataset.type;

  let current = 0;
  const increment = target / 60;

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(counter);
    }

    if (type === "percent") {
      number.textContent = Math.floor(current) + "%";
    } else if (type === "tb") {
      number.textContent = current.toFixed(1) + "TB";
    } else {
      number.textContent = Math.floor(current);
    }
  }, 20);

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / 12) * -1;
    const rotateY = (x - rect.width / 2) / 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

const launchBtn = document.getElementById("launchBtn");

launchBtn.addEventListener("click", () => {
  launchBtn.textContent = "Launching...";
  launchBtn.disabled = true;

  setTimeout(() => {
    launchBtn.textContent = "Nexus AI Online";
  }, 1500);
});

const links = document.querySelectorAll(".sidebar nav a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const glow = document.querySelector(".ai-glow");

let move = 0;

setInterval(() => {
  move += 1;
  glow.style.transform = `translate(${Math.sin(move * 0.04) * 24}px, ${Math.cos(move * 0.04) * 16}px)`;
}, 30);