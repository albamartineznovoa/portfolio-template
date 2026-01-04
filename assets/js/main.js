(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Data ----------
  const PROJECTS = {
    p1: {
      kicker: "Proyecto 01 · Rebranding",
      title: "Kaiku",
      link: "#",
      desc: "Proyecto de rebranding con desarrollo de una propuesta de Kaiku en lata mediante modelado 3D, junto con el diseño de la web, los espacios de tienda y distintos soportes de marca, construyendo un sistema visual coherente pensado para funcionar de forma consistente en múltiples contextos.",
      list: [
        "<strong>Rol:</strong> diseño de identidad, UI y 3D",
        "<strong>Objetivo:</strong> coherencia y aplicación de marca",
        "<strong>Detalle:</strong> sistema visual adaptable a digital y físico",
        "<strong>Entrega:</strong> lata 3D, web, tiendas y soportes",
      ],
      tags: ["UI", "3D", "Branding"],
      impact: 90,
      media: {
        type: "carousel",
        images: [
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Kaiku/496876714_17949553232967116_3404958825649933614_n.jpg?updatedAt=1767567361226",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Kaiku/Sin%20ti%CC%81tulo-6.png",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Kaiku/keiku.png?updatedAt=1767567432796",
        ],
      },
    },
    p2: {
      kicker: "Proyecto 02 · Catálogo",
      title: "Miquel Barceló",
      link: "#",
      desc: "Proyecto editorial basado en la creación de una exposición concebida desde cero a partir de las piezas más representativas de Miquel Barceló, para la que se desarrolló un catálogo completo con un sistema visual propio. El diseño se aplicó también a un folleto díptico, un cartel de fachada y las entradas de la exposición.",
      list: [
        "<strong>Rol:</strong> dirección visual y diseño editorial",
        "<strong>Objetivo:</strong> coherencia y claridad expositiva",
        "<strong>Entregables:</strong> sistema gráfico aplicado a múltiples formatos",
        "<strong>Plus:</strong> catálogo, folleto díptico, cartel de fachada, entradas y piezas gráficas",
      ],
      tags: ["Identidad", "Grid", "Editorial"],
      impact: 70,
      media: {
        type: "grid",
        images: [
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Miquel%20Barcel%C3%B3/2.png?updatedAt=1767567971766",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Miquel%20Barcel%C3%B3/3.png?updatedAt=1767567971732",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Miquel%20Barcel%C3%B3/4.png?updatedAt=1767567971612",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Miquel%20Barcel%C3%B3/5.png?updatedAt=1767567971725",
        ],
      },
    },
    p3: {
      kicker: "Proyecto 03 · Revista",
      title: "Olvana",
      link: "#",
      desc: "Olvana es royecto editorial desarrollado como una revista centrada en el bienestar y el autocuidado, con una estética moderna y minimalista. La identidad visual se aplica tanto al diseño editorial como a la creación de un spot audiovisual para su promoción. La composición, el ritmo y las transiciones refuerzan una narrativa visual coherente.",
      list: [
        "<strong>Rol:</strong> diseño editorial y motion graphics",
        "<strong>Objetivo:</strong> fluidez y coherencia visual",
        "<strong>Detalle:</strong> composición, jerarquía y transiciones",
        "<strong>Entregables:</strong> revista, spot audiovisual y piezas de apoyo",
      ],
      tags: ["Motion", "Editorial", "Branding"],
      impact: 90,
      /* Este proyecto ahora muestra un vídeo (ejemplo MP4). Cambia media.src por la URL que quieras reproducir (YouTube o MP4). */
      media: {
        type: "video",
        src: "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Olvana/MARTINEZ_ALBA_SPOT.MP4",
        images: [
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Olvana/IMG_3675.heic",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Olvana/IMG_3679.HEIC",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Olvana/IMG_3659.HEIC",
          "https://ik.imagekit.io/3meimekutr/PORTFOLIO/Olvana/IMG_3689.HEIC",
        ],
      },
    },
  };

  // ---------- Basics ----------
  function setYear() {
    const y = qs("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------------------
     Extra subtle animations
     --------------------- */
  function initEnhancedReveals() {
    if (prefersReducedMotion || !window.ScrollTrigger) return;
    qsa(".project-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        scale: 0.995,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const hero = qs(".hero");
    if (!hero) return;
    const card = qs(".hero-card");
    const actions = qs(".hero-actions");

    function onMove(e) {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      if (card)
        gsap.to(card, {
          x: dx * 12,
          y: dy * 8,
          rotation: dx * 0.6,
          duration: 0.9,
          ease: "power2.out",
        });
      // keep hero action buttons static (no micro-translation) to avoid UI jitter
    }

    function onLeave() {
      if (card)
        gsap.to(card, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      // ensure no translation is applied to hero actions on leave
    }

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
  }

  function initAccentSheen() {
    if (prefersReducedMotion) return;
    const accent = qs(".hero-title .accent");
    const target = accent || qs(".hero-title");
    if (!target) return;

    // Prefer CSS-driven pseudo-element sheen when accent exists
    if (accent) {
      accent.classList.add("sheen-active");
      // remove the class after the animation finishes (matches CSS duration)
      setTimeout(() => accent.classList.remove("sheen-active"), 1700);
      return;
    }

    // Fallback: create a temporary element for the sheen
    const sheen = document.createElement("span");
    sheen.className = "js-sheen";
    sheen.style.position = "absolute";
    sheen.style.left = "-20%";
    sheen.style.top = "0";
    sheen.style.width = "40%";
    sheen.style.height = "100%";
    sheen.style.pointerEvents = "none";
    sheen.style.background =
      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))";
    sheen.style.transform = "skewX(-12deg)";
    sheen.style.opacity = "0";
    sheen.style.zIndex = "2";
    const parent = target;
    parent.style.position = parent.style.position || "relative";
    parent.appendChild(sheen);
    gsap.to(sheen, {
      opacity: 1,
      xPercent: 180,
      duration: 1.1,
      ease: "power2.out",
      onComplete() {
        gsap.to(sheen, {
          opacity: 0,
          duration: 0.4,
          delay: 0.05,
          onComplete() {
            sheen.remove();
          },
        });
      },
    });
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

  // ---------- Copy/Open helpers ----------
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  function initConsoleActions() {
    const hint = qs("#copyHint");
    if (!hint) return;

    qsa("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.getAttribute("data-copy") || "";
        if (!text) return;
        const ok = await copyToClipboard(text);
        hint.textContent = ok ? "Copiado ✓" : "No se pudo copiar";
        setTimeout(() => (hint.textContent = ""), 1600);
      });
    });

    qsa("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-open");
        if (!url) return;
        window.open(url, "_blank", "noopener");
      });
    });

    const mailShortcut = qs("#mailShortcut");
    if (mailShortcut) {
      mailShortcut.addEventListener("click", () => {
        window.location.href = "mailto:designalbamartinez@gmail.com";
      });
    }
  }

  // ---------- Contact form ----------
  function initContactForm() {
    const form = qs("#contact form");
    const hint = qs("#formHint");
    if (!form || !hint) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = [...form.querySelectorAll("input, textarea, select")];
    const endpoint = form.dataset.endpoint || form.getAttribute("action") || "";

    function setBusy(busy) {
      form.setAttribute("aria-busy", busy ? "true" : "false");
      if (submitBtn) submitBtn.disabled = busy;
      inputs.forEach((i) => (i.disabled = busy));
    }

    function validate() {
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const msg = form.querySelector('[name="msg"]');

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
        return;
      }

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="msg"]').value.trim();

      setBusy(true);

      try {
        if (endpoint) {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 12000);

          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
            signal: controller.signal,
          });

          clearTimeout(timeout);

          if (!res.ok) throw new Error("Error enviando. Intenta otra vez.");

          hint.textContent = "Mensaje enviado ✓";
          form.reset();
        } else {
          const subject = encodeURIComponent(
            "Contacto desde portfolio · " + name
          );
          const body = encodeURIComponent(
            "Nombre: " + name + "\nEmail: " + email + "\n\n" + message
          );
          window.location.href = `mailto:designalbamartinez@gmail.com?subject=${subject}&body=${body}`;
          hint.textContent = "Abriendo tu cliente de correo…";
          form.reset();
        }
      } catch (err2) {
        hint.textContent =
          err2.name === "AbortError"
            ? "Tiempo de espera. Intenta de nuevo."
            : err2.message || "Error enviando. Intenta otra vez.";
      } finally {
        setTimeout(() => {
          setBusy(false);
          setTimeout(() => (hint.textContent = ""), 2000);
        }, 650);
      }
    });

    form.querySelectorAll("input, textarea").forEach((el) =>
      el.addEventListener("input", () => {
        if (hint.textContent) hint.textContent = "";
      })
    );
  }

  // ---------- Project modal ----------
  function renderProjectMedia(project) {
    const wrap = document.createElement("div");

    if (project.media.type === "carousel") {
      const id = "pmCarousel";
      wrap.innerHTML = `
        <div id="${id}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${project.media.images
              .map(
                (src, i) => `
              <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${src}" class="d-block w-100" alt="Imagen del proyecto" loading="lazy" style="aspect-ratio:16/11; object-fit:cover;">
              </div>`
              )
              .join("")}
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev" aria-label="Anterior">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next" aria-label="Siguiente">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      `;
      return wrap;
    }
    if (project.media.type === "video") {
      const src = project.media.src || project.media.url || "";
      // If it's a YouTube link, convert to embed URL
      let embed = src;
      if (/youtube.com|youtu.be/.test(src)) {
        const idMatch = src.match(/(?:v=|\/)([\w-]{11})/);
        const id = idMatch ? idMatch[1] : null;
        if (id) embed = `https://www.youtube.com/embed/${id}`;
      }

      // Build video + optional thumbnails grid
      const thumbs =
        project.media.images && project.media.images.length
          ? project.media.images
          : [];

      wrap.innerHTML = `
        <div class="pm-video-wrap">
          <div class="pm-video">
            ${
              embed.includes("youtube.com/embed")
                ? `
              <iframe src="${embed}?rel=0&showinfo=0&autoplay=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `
                : `
              <video controls preload="metadata">
                <source src="${embed}" type="video/mp4" />
                Tu navegador no soporta vídeo.
              </video>
            `
            }
          </div>
          ${
            thumbs.length
              ? `
            <div class="pm-video-thumbs">
              ${thumbs
                .map(
                  (src) => `
                <button class="pm-thumb" type="button" data-lightbox="${src}" aria-label="Abrir imagen ampliada">
                  <img src="${src}" alt="Miniatura" loading="lazy" />
                </button>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `;
      return wrap;
    }

    // default: grid of images
    wrap.innerHTML = `
      <div class="pm-grid">
        ${project.media.images
          .map(
            (src) => `
          <button class="pm-tile" type="button" data-lightbox="${src}" aria-label="Abrir imagen ampliada">
            <img src="${src}" alt="Imagen del proyecto" loading="lazy" />
          </button>`
          )
          .join("")}
      </div>
    `;
    return wrap;
  }

  function initProjectModal() {
    const modalEl = qs("#projectModal");
    if (!modalEl) return;

    const pmKicker = qs("#pmKicker");
    const pmTitle = qs("#pmTitle");
    const pmDesc = qs("#pmDesc");
    const pmList = qs("#pmList");
    const pmTags = qs("#pmTags");
    const pmLink = qs("#pmLink");
    const pmMedia = qs("#pmMedia");

    const pmImpactVal = qs("#pmImpactVal");
    const pmImpactFill = qs("#pmImpactFill");

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    function fillProject(key) {
      const p = PROJECTS[key];
      if (!p) return;

      pmKicker.textContent = p.kicker;
      pmTitle.textContent = p.title;
      pmDesc.textContent = p.desc;

      pmLink.href = p.link || "#";
      pmLink.style.visibility = p.link && p.link !== "#" ? "visible" : "hidden";

      pmList.innerHTML = p.list.map((li) => `<li>${li}</li>`).join("");
      pmTags.innerHTML = p.tags
        .map((t) => `<span class="pill">${t}</span>`)
        .join("");

      pmMedia.innerHTML = "";
      pmMedia.appendChild(renderProjectMedia(p));

      pmImpactVal.textContent = String(p.impact);
      pmImpactFill.style.width = "0%";
      pmImpactFill.parentElement?.setAttribute(
        "aria-valuenow",
        String(p.impact)
      );
      requestAnimationFrame(() => {
        pmImpactFill.style.width = `${p.impact}%`;
      });

      bindLightbox();
    }

    qsa(".project-card[data-project]").forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.getAttribute("data-project");
        fillProject(key);
        modal.show();
      });
    });
  }

  // ---------- Lightbox ----------
  function ensureLightboxModal() {
    if (qs("#lightboxModal")) return;

    const el = document.createElement("div");
    el.className = "modal fade";
    el.id = "lightboxModal";
    el.tabIndex = -1;
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("aria-label", "Visor de imagen");

    el.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content modal-min">
          <div class="modal-head">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            <div class="mh-copy">
              <p class="mh-kicker">Vista</p>
              <h3 class="mh-title">Imagen ampliada</h3>
            </div>
            <span></span>
          </div>
          <div class="modal-body" style="grid-template-columns:1fr;">
            <div class="pm-media" style="border:none;">
              <img id="lightboxImg" class="img-fluid" alt="Imagen ampliada" style="width:100%; border-radius: 18px;" />
            </div>
          </div>
          <div class="modal-foot">
            <button class="btn btn-ghost" type="button" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(el);
  }

  function bindLightbox() {
    ensureLightboxModal();
    const modalEl = qs("#lightboxModal");
    const imgEl = qs("#lightboxImg");
    const triggers = qsa("[data-lightbox]");
    if (!modalEl || !imgEl || !triggers.length) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    triggers.forEach((t) => {
      if (t.__lbBound) return;
      t.__lbBound = true;

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

  // ---------- GSAP ----------
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
        scrub: 0.25,
      },
    });
  }

  // Entrance animation for elements already visible on load
  function initLoadEntrance() {
    if (prefersReducedMotion || !window.gsap) return;

    const nodes = qsa(".gsap-reveal");
    if (!nodes.length) return;

    const inView = nodes.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });

    if (!inView.length) return;

    gsap.from(inView, {
      opacity: 0,
      y: 12,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.06,
      onComplete() {
        inView.forEach((el) => el.setAttribute("data-animated", "true"));
      },
    });
  }

  function initRevealOnScroll() {
    if (prefersReducedMotion || !window.ScrollTrigger) return;

    qsa(".gsap-reveal").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 14,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  function initSkillBars() {
    const skills = qsa(".skill");
    if (!skills.length) return;

    if (prefersReducedMotion || !window.ScrollTrigger) {
      skills.forEach((node) => {
        const val = Number(node.getAttribute("data-skill") || "0");
        const fill = qs(".skill-fill", node);
        if (fill) fill.style.width = `${val}%`;
      });
      return;
    }

    skills.forEach((node) => {
      const val = Number(node.getAttribute("data-skill") || "0");
      const fill = qs(".skill-fill", node);
      if (!fill) return;

      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: `${val}%`,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }

  // ---------- CV button ----------
  function initCVDownload() {
    const cvBtn = qs("#contactDownload");
    if (!cvBtn) return;

    cvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const cvUrl =
        "https://drive.google.com/file/d/1ghok7nTDyyuJvbpibv-Bbe5-Wc3pHvT1/view?usp=sharing";
      window.open(cvUrl, "_blank", "noopener");
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initNavbarScrolled();
    initSmoothScroll();

    initConsoleActions();
    initContactForm();
    initCVDownload();

    initProjectModal();
    bindLightbox();

    if (ensureGSAP()) {
      // initial entrance for elements already visible
      initLoadEntrance();
      initScrollProgress();
      initRevealOnScroll();
      initEnhancedReveals();
      initHeroParallax();
      initAccentSheen();
      initSkillBars();
    } else {
      initSkillBars();
    }
  });
})();
