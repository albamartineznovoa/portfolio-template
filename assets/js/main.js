/* ==========================================================================
   main.js — minimal + navbar correcto + animaciones elegantes
   ========================================================================== */

(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];

  function setYear() {
    const y = qs("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function initNavbarScrolled() {
    const nav = qs(".navbar");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function closeMobileNav() {
    const navCollapse = qs("#nav");
    if (!navCollapse) return;
    if (navCollapse.classList.contains("show")) {
      const instance = bootstrap.Collapse.getOrCreateInstance(navCollapse);
      instance.hide();
    }
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;

      a.addEventListener("click", (e) => {
        const target = qs(href);
        if (!target) return;

        e.preventDefault();
        closeMobileNav();

        // con GSAP si está, si no fallback
        if (
          !prefersReducedMotion &&
          window.gsap &&
          gsap.plugins?.ScrollToPlugin
        ) {
          gsap.to(window, {
            duration: 0.8,
            ease: "power2.out",
            scrollTo: { y: target, offsetY: 80 },
          });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function initLightbox() {
    const modalEl = qs("#lightboxModal");
    const imgEl = qs("#lightboxImg");
    const triggers = qsa("[data-lightbox]");
    if (!modalEl || !imgEl || !triggers.length) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    triggers.forEach((t) => {
      t.addEventListener("click", () => {
        const src = t.getAttribute("data-lightbox");
        if (!src) return;
        imgEl.src = src;
        modal.show();
      });
    });

    modalEl.addEventListener("hidden.bs.modal", () => {
      imgEl.removeAttribute("src");
    });
  }

  function initContactForm() {
    const form = qs("#contact form");
    const hint = qs("#formHint");
    if (!form || !hint) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = [...form.querySelectorAll("input, textarea, select")];
    const endpoint = form.dataset.endpoint || form.getAttribute("action") || "";

    const emailFallback = (() => {
      const mailEl = qs(".contact-quick a.link-plain");
      if (!mailEl) return "hola@alba.example";
      const href = mailEl.getAttribute("href") || "";
      if (href.startsWith("mailto:")) return href.replace("mailto:", "");
      return mailEl.textContent.trim() || "hola@alba.example";
    })();

    function setBusy(busy) {
      form.setAttribute("aria-busy", busy ? "true" : "false");
      if (submitBtn) submitBtn.disabled = busy;
      inputs.forEach((i) => (i.disabled = busy));
    }

    function validate() {
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const msg = form.querySelector('[name="msg"]');
      if (!name || !email || !msg) return "Faltan campos del formulario.";
      if (!name.value.trim()) return "Por favor, indica tu nombre.";
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email.value.trim())) return "Introduce un correo válido.";
      if (!msg.value.trim()) return "Escribe un mensaje, por favor.";
      const hp = form.querySelector('[name="hp"]');
      if (hp && hp.value.trim()) return "Spam detectado.";
      return null;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hint.textContent = "";
      const err = validate();
      if (err) {
        hint.textContent = err;
        const firstInvalid =
          form.querySelector("input:invalid, textarea:invalid") ||
          form.querySelector(
            'input:not(:disabled):not([value=""]), textarea:not(:disabled):not(:empty)'
          );
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="msg"]').value.trim();

      setBusy(true);

      try {
        if (endpoint) {
          // POST as JSON, but many providers accept form data; keep JSON for clarity
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 12000);
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
            signal: controller.signal,
          });
          clearTimeout(timeout);
          if (!res.ok) {
            let json = null;
            try {
              json = await res.json();
            } catch (err) {}
            throw new Error((json && json.message) || "Error en el servidor");
          }

          hint.textContent = "Mensaje enviado. Gracias :)";
          form.reset();
        } else {
          // fallback: open mail client with mailto
          const subject = encodeURIComponent(
            "Contacto desde portfolio · " + name
          );
          const body = encodeURIComponent(
            "Nombre: " + name + "\nEmail: " + email + "\n\n" + message
          );
          window.location.href = `mailto:${emailFallback}?subject=${subject}&body=${body}`;
          hint.textContent =
            "Se abrirá tu cliente de correo para enviar el mensaje.";
          form.reset();
        }
      } catch (err) {
        if (err.name === "AbortError")
          hint.textContent = "Tiempo de espera. Intenta de nuevo.";
        else
          hint.textContent = err.message || "Error enviando. Intenta otra vez.";
      } finally {
        setTimeout(() => {
          setBusy(false);
          setTimeout(() => (hint.textContent = ""), 2200);
        }, 700);
      }
    });

    // clear hint when user types
    form.querySelectorAll("input, textarea").forEach((el) =>
      el.addEventListener("input", () => {
        if (hint.textContent) hint.textContent = "";
      })
    );
  }

  // ==========================
  // GSAP (elegante, sin show-off)
  // ==========================
  function ensureGSAP() {
    if (!window.gsap) return false;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (gsap.plugins?.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);
    return true;
  }

  function initScrollProgress() {
    const bar = qs(".scroll-progress");
    if (!bar || prefersReducedMotion || !window.ScrollTrigger) return;

    gsap.to(bar, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  }

  function initHeroIntro() {
    if (prefersReducedMotion) return;

    gsap
      .timeline({ defaults: { ease: "power2.out" } })
      .from(".navbar", { y: -10, opacity: 0, duration: 0.35 })
      .from(".hero .kicker", { y: 12, opacity: 0, duration: 0.35 }, "-=0.15")
      .from(".hero-title", { y: 14, opacity: 0, duration: 0.45 }, "-=0.12")
      .from(".hero-subtitle", { y: 10, opacity: 0, duration: 0.35 }, "-=0.22")
      .from(
        ".hero-cta .btn",
        { y: 10, opacity: 0, duration: 0.35, stagger: 0.08 },
        "-=0.18"
      )
      .from(
        ".hero-meta .meta-pill",
        { y: 8, opacity: 0, duration: 0.28, stagger: 0.06 },
        "-=0.18"
      )
      .from(".hero-card", { y: 12, opacity: 0, duration: 0.45 }, "-=0.28");
  }

  function initRevealOnScroll() {
    if (prefersReducedMotion || !window.ScrollTrigger) return;

    qsa(".gsap-reveal").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 14,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  function initProjectMotion() {
    if (prefersReducedMotion || !window.ScrollTrigger) return;

    // underline animado en títulos de proyecto (creativo pero sutil)
    qsa(".project-title").forEach((t) => {
      t.style.setProperty("--u", "0");
      gsap.to(t, {
        "--u": 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: t.closest(".project"),
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // parallax suave solo en el media del primer proyecto (carousel)
    const first = qs('.project[data-cat="web"] .project-media');
    if (first) {
      gsap.to(first, {
        y: -10,
        ease: "none",
        scrollTrigger: {
          trigger: first.closest(".project"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // micro stagger en imágenes de grids
    qsa(".media-grid").forEach((grid) => {
      const tiles = qsa(".media-tile", grid);
      gsap.from(tiles, {
        opacity: 0,
        y: 10,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initNavbarScrolled();
    initSmoothScroll();
    initLightbox();
    initContactForm();

    if (ensureGSAP()) {
      initScrollProgress();
      initHeroIntro();
      initRevealOnScroll();
      initProjectMotion();
    }
    // download CV handler — open Google Drive link
    const cvBtn = qs("#contactDownload");
    if (cvBtn) {
      cvBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const cvUrl =
          "https://drive.google.com/file/d/1ghok7nTDyyuJvbpibv-Bbe5-Wc3pHvT1/view?usp=sharing";
        window.open(cvUrl, "_blank", "noopener");
      });
    }
  });
})();
