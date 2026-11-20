const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("[data-nav-link]");
const revealElements = document.querySelectorAll(".reveal");
const toTopButton = document.getElementById("to-top");
const yearElement = document.getElementById("year");

/* Tahun di footer */
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* Menu mobile */
function setMenu(open) {
  if (!menuButton || !navMenu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  navMenu.classList.toggle("hidden", !open);
  navMenu.classList.toggle("flex", open);
}

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

/* Reveal saat elemen masuk viewport */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

/* Link aktif + tombol kembali ke atas saat scroll */
const sections = Array.from(document.querySelectorAll("main section[id]"));
let ticking = false;

function updateOnScroll() {
  const scrollPosition = window.scrollY + 140;
  let activeId = "";

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) activeId = section.id;
  });

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${activeId}`) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (toTopButton) {
    const show = window.scrollY > 400;
    toTopButton.classList.toggle("hidden", !show);
    toTopButton.classList.toggle("flex", show);
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateOnScroll);
  },
  { passive: true },
);

if (toTopButton) {
  toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

updateOnScroll();
