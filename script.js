// footer year
document.getElementById("year").textContent = new Date().getFullYear();

// simple contact form handler (no backend)
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const mailto = `mailto:al.am.ali.19946@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(
    Name: ${name}\nEmail: ${email}\n\n${message}
  )}`;

  // open mail app
  window.location.href = mailto;
});