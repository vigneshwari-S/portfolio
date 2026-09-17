const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => links.classList.remove("open"));
});
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => observer.observe(section));

fetch("https://9gn16gjpei.execute-api.ap-south-1.amazonaws.com/visitors")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Visitor counter API failed");
    }

    return response.json();
  })
  .then((data) => {
    console.log("Visitor count:", data.count);
  })
  .catch((error) => {
    console.error("Visitor counter error:", error);
  });
