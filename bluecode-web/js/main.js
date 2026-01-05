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

  // Plans modal
  const planModal = document.getElementById("planModal");
  const planTitle = document.getElementById("planModalTitle");
  const planDesc = document.getElementById("planModalDesc");
  const planList = document.getElementById("planModalList");
  const planWhatsApp = document.getElementById("planModalWhatsApp");
  const planTelegram = document.getElementById("planModalTelegram");
  const planOpeners = document.querySelectorAll("[data-open-plan]");
  const planClosers = document.querySelectorAll("[data-close-modal]");

  // Configura aquí tus datos reales
  const WHATSAPP_NUMBER = "67434769";
  // Nota: sin "@" (t.me/<username>)
  const TELEGRAM_USERNAME = "elsato2112";

  const plans = {
    ondemand: {
      title: "On-Demand IT",
      desc: "Soporte puntual y resolución rápida para necesidades específicas. Ideal si necesitas ayuda inmediata sin un contrato mensual.",
      items: [
        "Atención por requerimiento (ticket o por horas)",
        "Diagnóstico + propuesta de solución",
        "Ejecución y entrega con checklist",
      ],
      message: "Hola, quiero más información sobre el plan On-Demand IT.",
    },
    outsourcing: {
      title: "Full Outsourcing",
      desc: "Nos convertimos en tu área IT: gestión, mantenimiento y mejoras continuas con acuerdos de servicio (SLA).",
      items: [
        "Soporte continuo y preventivo",
        "Gestión de infraestructura y herramientas",
        "Mejoras y roadmap mensual",
      ],
      message: "Hola, quiero más información sobre el plan Full Outsourcing.",
    },
    custom: {
      title: "Custom Development",
      desc: "Desarrollo a medida: desde MVP hasta sistemas completos, integraciones y automatización de procesos.",
      items: [
        "Levantamiento y alcance funcional",
        "Diseño, desarrollo e integración",
        "Entrega por hitos + documentación",
      ],
      message: "Hola, quiero más información sobre el plan Custom Development.",
    },
  };

  let lastFocus = null;

  const openPlanModal = (key) => {
    if (!planModal || !planTitle || !planDesc || !planList || !planWhatsApp || !planTelegram) return;
    const data = plans[key];
    if (!data) return;

    lastFocus = document.activeElement;

    planTitle.textContent = data.title;
    planDesc.textContent = data.desc;
    planList.innerHTML = "";
    data.items.forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      planList.appendChild(li);
    });

    const msg = encodeURIComponent(data.message);
    planWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    planTelegram.href = `https://t.me/${TELEGRAM_USERNAME}`;

    planModal.classList.add("is-open");
    planModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // focus first action for accessibility
    planWhatsApp.focus();
  };

  const closePlanModal = () => {
    if (!planModal) return;
    planModal.classList.remove("is-open");
    planModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  planOpeners.forEach((btn) => {
    btn.addEventListener("click", () => openPlanModal(btn.getAttribute("data-open-plan")));
  });
  planClosers.forEach((el) => el.addEventListener("click", closePlanModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && planModal && planModal.classList.contains("is-open")) closePlanModal();
  });

  // Active nav link on scroll (desktop + mobile)
  const navLinks = Array.from(document.querySelectorAll(".nav__link, .mobile-menu__link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const linkById = new Map();
  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#") && href.length > 1) linkById.set(href.slice(1), a);
  });

  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.remove("is-active"));
    if (!id) return;
    navLinks
      .filter((a) => (a.getAttribute("href") || "") === `#${id}`)
      .forEach((a) => a.classList.add("is-active"));
  };

  if (sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible && visible.target && visible.target.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.25, 0.35, 0.5], rootMargin: "-25% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
  }
})();
