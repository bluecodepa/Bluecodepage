(() => {
  const burger = document.querySelector(".header__burger");
  const menu = document.getElementById("mobileMenu");
  const closeTargets = document.querySelectorAll("[data-close-menu]");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");

  if (!burger || !menu) return;

  const openMenu = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", openMenu);
  closeTargets.forEach(el => el.addEventListener("click", closeMenu));
  mobileLinks.forEach(a => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Header shadow on scroll
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 6 ? "0 6px 18px rgba(0,0,0,.08)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
