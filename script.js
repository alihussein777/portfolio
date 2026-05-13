//Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form handler
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const mailto = `mailto:al.am.ali.19946@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  )}`;

  window.location.href = mailto;
});

/* ===== THEME SWITCHER ===== */

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Save theme
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌙";
  }
});
