/* Shrey Mehra, portfolio v3 interactions.
   No JS still leaves a readable site. Reduced motion is honoured throughout. */

(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* dev helper: ?solo=work|about|faq|contact shows one section only */
  var solo = new URLSearchParams(window.location.search).get("solo");
  if (solo) {
    ["top", "work", "about", "faq", "contact"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && id !== solo) el.style.display = "none";
    });
    var mq = document.querySelector(".marquee");
    if (mq && solo !== "top") mq.style.display = "none";
  }

  /* ---------- scroll progress hairline ---------- */
  var progress = document.querySelector(".progress");
  if (progress) {
    var pRaf = null;
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var x = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = "scaleX(" + Math.min(Math.max(x, 0), 1) + ")";
      pRaf = null;
    };
    window.addEventListener("scroll", function () {
      if (!pRaf) pRaf = requestAnimationFrame(updateProgress);
    }, { passive: true });
    updateProgress();
  }

  /* ---------- hero: cursor aura ---------- */
  var hero = document.querySelector(".hero");
  var aura = document.querySelector(".aura-follow");
  if (hero && aura && fine && !reduced) {
    var ax = 0, ay = 0, tx = 0, ty = 0, auraRaf = null;
    var auraTick = function () {
      var dx = tx - ax;
      var dy = ty - ay;
      if (Math.abs(dx) + Math.abs(dy) < 0.6) {
        /* settled: stop repainting so the page can go idle */
        ax = tx; ay = ty;
        auraRaf = null;
      } else {
        ax += dx * 0.09;
        ay += dy * 0.09;
        auraRaf = requestAnimationFrame(auraTick);
      }
      aura.style.setProperty("--ax", ax.toFixed(1) + "px");
      aura.style.setProperty("--ay", ay.toFixed(1) + "px");
    };
    hero.addEventListener("pointermove", function (ev) {
      var r = hero.getBoundingClientRect();
      tx = ev.clientX - r.left;
      ty = ev.clientY - r.top;
      if (!hero.classList.contains("is-awake")) {
        ax = tx; ay = ty;
        hero.classList.add("is-awake");
      }
      if (auraRaf == null) auraRaf = requestAnimationFrame(auraTick);
    });
    hero.addEventListener("pointerleave", function () {
      hero.classList.remove("is-awake");
      if (auraRaf != null) {
        cancelAnimationFrame(auraRaf);
        auraRaf = null;
      }
    });
  }

  /* ---------- the ID card: tilt + flip ---------- */
  var card = document.getElementById("idcard");
  if (card) {
    if (fine && !reduced) {
      var zone = card.parentElement;
      zone.addEventListener("pointermove", function (ev) {
        var r = card.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--rx", (-y * 10).toFixed(2));
        card.style.setProperty("--ry", (x * 13).toFixed(2));
      });
      zone.addEventListener("pointerleave", function () {
        card.style.setProperty("--rx", 0);
        card.style.setProperty("--ry", 0);
      });
    }
    var flip = function () {
      card.classList.add("is-flipping");
      card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", card.classList.contains("is-flipped") ? "true" : "false");
      setTimeout(function () { card.classList.remove("is-flipping"); }, 650);
    };
    card.addEventListener("click", flip);
    card.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        flip();
      }
    });
  }

  /* ---------- work index: hover swaps the preview ---------- */
  var PV = [
    { file: "01_LOREAL.CASE", big: "Hair or not,<br>here we come", cap: "A scalp line for the people the category stopped talking to", tags: "Brand · Creative Strategy · Spec", year: "Spec", ink: "#E8401B" },
    { file: "02_VASTR.GTM", big: "You already<br>own the outfit", cap: "Named, positioned and launched from a blank page", tags: "PMM · GTM · Spec", year: "Spec", ink: "#0E7B5B" },
    { file: "03_ABSOLUT.CASE", big: "Absolutely<br>yours", cap: "Forty years of cultural fluency, meet a generation that drinks less", tags: "Creative Strategy · Spec", year: "In development", ink: "#1A1713" },
    { file: "04_DUOLINGO.CASE", big: "Keep the<br>gremlin", cap: "The hard part is not building the personality. It is not losing it", tags: "Creative Strategy · Comms · Spec", year: "In development", ink: "#E8401B" },
    { file: "05_VRL.SHIPPED", big: "VRL", cap: "Logo and identity for a family logistics company", tags: "Brand Identity · Real Client", year: "Shipped", ink: "#0E7B5B" },
  ];
  var rows = document.querySelectorAll(".row[data-pv]");
  var pvBody = document.getElementById("pv-body");
  if (rows.length && pvBody) {
    var pvFile = document.getElementById("pv-file");
    var pvBig = document.getElementById("pv-big");
    var pvCap = document.getElementById("pv-cap");
    var pvTags = document.getElementById("pv-tags");
    var pvYear = document.getElementById("pv-year");
    var current = 0;
    var swapTimer = null;
    var setActive = function (i) {
      if (i === current) return;
      current = i;
      var d = PV[i];
      if (!d) return;
      rows.forEach(function (r) {
        r.classList.toggle("is-active", Number(r.getAttribute("data-pv")) === i);
      });
      pvFile.textContent = d.file;
      pvBig.innerHTML = d.big;
      pvBig.style.color = d.ink;
      pvCap.textContent = d.cap;
      pvTags.textContent = d.tags;
      pvYear.textContent = d.year;
      if (!reduced) {
        pvBody.classList.remove("is-swap");
        void pvBody.offsetWidth; /* restart the jitter */
        pvBody.classList.add("is-swap");
        clearTimeout(swapTimer);
        swapTimer = setTimeout(function () { pvBody.classList.remove("is-swap"); }, 300);
      }
    };
    rows.forEach(function (r) {
      var i = Number(r.getAttribute("data-pv"));
      r.addEventListener("mouseenter", function () { setActive(i); });
      r.addEventListener("focus", function () { setActive(i); });
    });
    rows[0].classList.add("is-active");
  }

  /* ---------- section stamps ---------- */
  var stamps = document.querySelectorAll(".stamp-mini");
  if (stamps.length && "IntersectionObserver" in window && !reduced) {
    var stObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-stamped");
          stObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    stamps.forEach(function (s) { stObs.observe(s); });
  } else {
    stamps.forEach(function (s) { s.classList.add("is-stamped"); });
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (o) {
        o.classList.remove("open");
        var b = o.querySelector(".faq-q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- nav: active-section awareness ---------- */
  var spyLinks = document.querySelectorAll("[data-spy]");
  if (spyLinks.length && "IntersectionObserver" in window) {
    var order = ["work", "process", "about", "faq", "contact"];
    var inBand = {};
    var setSpy = function (id) {
      spyLinks.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("data-spy") === id);
      });
    };
    var spyObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) { inBand[e.target.id] = e.isIntersecting; });
        var active = null;
        order.forEach(function (id) { if (inBand[id]) active = id; });
        setSpy(active);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    order.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spyObs.observe(el);
    });
  }

  /* ---------- reveals ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- vinyl music toggle ---------- */
  var vinyl = document.getElementById("vinyl");
  var vinylAudio = document.getElementById("vinyl-audio");
  var vinylNote = document.getElementById("vinyl-note");
  if (vinyl && vinylAudio && vinylNote) {
    var noteTimer = null;
    var flash = function (msg) {
      vinylNote.textContent = msg;
      vinyl.classList.remove("is-note");
      void vinyl.offsetWidth;
      vinyl.classList.add("is-note");
      clearTimeout(noteTimer);
      noteTimer = setTimeout(function () {
        vinyl.classList.remove("is-note");
        vinylNote.textContent = vinyl.classList.contains("is-playing") ? "on the platter" : "off";
      }, 1800);
    };
    vinyl.addEventListener("click", function () {
      if (vinyl.classList.contains("is-playing")) {
        vinylAudio.pause();
        vinyl.classList.remove("is-playing");
        vinyl.setAttribute("aria-pressed", "false");
        vinylNote.textContent = "off";
        return;
      }
      vinylAudio.volume = 0.6;
      var p = vinylAudio.play();
      if (p && p.then) {
        p.then(function () {
          vinyl.classList.add("is-playing");
          vinyl.setAttribute("aria-pressed", "true");
          vinylNote.textContent = "on the platter";
        }).catch(function () {
          flash("drop track.mp3 in assets");
        });
      }
    });
  }

  /* ---------- Melbourne clock ---------- */
  var clocks = document.querySelectorAll("[data-clock]");
  if (clocks.length) {
    var tick = function () {
      var t;
      try {
        t = new Date().toLocaleTimeString("en-AU", {
          timeZone: "Australia/Melbourne",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      } catch (err) {
        t = "";
      }
      clocks.forEach(function (c) { c.textContent = t; });
    };
    tick();
    setInterval(tick, 30000);
  }
})();
