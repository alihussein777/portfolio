// ===== STATS COUNTER ANIMATION =====

const counters = document.querySelectorAll(".card h2");

counters.forEach(counter => {

  const updateCounter = () => {

    const target = +counter.innerText.replace("%", "").replace("TB", "");
    let current = 0;

    const increment = target / 50;

    const timer = setInterval(() => {

      current += increment;

      if (current >= target) {

        current = target;

        clearInterval(timer);
      }

      // ADD SYMBOLS
      if (counter.innerText.includes("%")) {

        counter.innerText = Math.floor(current) + "%";

      } else if (counter.innerText.includes("TB")) {

        counter.innerText = current.toFixed(1) + "TB";

      } else {

        counter.innerText = Math.floor(current);
      }

    }, 20);
  };

  updateCounter();
});

// ===== CARD 3D EFFECT =====

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 10) * -1;
    const rotateY = (x - centerX) / 10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

// ===== AI BUTTON EFFECT =====

const aiButton = document.querySelector(".ai-content button");

aiButton.addEventListener("click", () => {

  aiButton.innerText = "Launching...";

  aiButton.style.background = "#c7a6ff";

  setTimeout(() => {

    aiButton.innerText = "Nexus AI Online";

  }, 2000);
});

// ===== FLOATING GLOW EFFECT =====

const glow = document.querySelector(".ai-glow");

let moveX = 0;

setInterval(() => {

  moveX += 1;

  glow.style.transform =
    `translateX(${Math.sin(moveX * 0.05) * 20}px)`;

}, 30);

// ===== SIDEBAR ACTIVE LINK =====

const links = document.querySelectorAll(".sidebar nav a");

links.forEach(link => {

  link.addEventListener("click", () => {

    links.forEach(item =>
      item.classList.remove("active")
    );

    link.classList.add("active");
  });
});