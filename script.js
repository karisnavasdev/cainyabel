(function () {
  const CONFIG = {
    ca: "YOUR_CONTRACT_ADDRESS_pump",
    ticker: "$CAINYABEL",
    name: "CAINYABEL",
    x: "https://x.com/cainyabels",
    xHandle: "@cainyabels",
  };

  const SOL = "So11111111111111111111111111111111111111112";
  const pumpswap = `https://swap.pump.fun/?input=${SOL}&output=${CONFIG.ca}`;
  const dexscreener = `https://dexscreener.com/solana/${CONFIG.ca}`;
  const dexEmbed = `${dexscreener}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTimeframesToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`;

  document.querySelectorAll("[data-pumpswap]").forEach((el) => {
    el.href = pumpswap;
  });

  document.querySelectorAll("[data-dex]").forEach((el) => {
    el.href = dexscreener;
  });

  document.querySelectorAll("[data-x]").forEach((el) => {
    el.href = CONFIG.x;
  });

  ["ca-text", "ca-inline", "ca-footer"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = CONFIG.ca;
  });

  const chartFrame = document.getElementById("chart-frame");
  if (chartFrame) chartFrame.src = dexEmbed;

  const copyBtn = document.getElementById("copy-ca");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.ca);
        const prev = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = prev;
        }, 2000);
      } catch {
        copyBtn.textContent = "Failed";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 40
          ? "0 6px 0 rgba(61, 35, 20, 0.25)"
          : "0 4px 0 rgba(61, 35, 20, 0.15)";
    });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    const heroReveals = document.querySelectorAll(".hero .reveal");
    heroReveals.forEach((el) => {
      requestAnimationFrame(() => el.classList.add("is-visible"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .stagger").forEach((el) => {
      if (!el.closest(".hero")) observer.observe(el);
    });

    const heroLogoWrap = document.querySelector(".hero-logo-wrap");
    const hypnoRings = document.querySelectorAll(".hypno-ring");

    if (heroLogoWrap) {
      window.addEventListener("scroll", () => {
        const y = Math.min(window.scrollY, 400);
        heroLogoWrap.style.transform = `translateY(${y * 0.12}px) scale(${1 - y * 0.0002})`;
        hypnoRings.forEach((ring, i) => {
          ring.style.opacity = String(Math.max(0, 1 - y / 500));
          ring.style.transform = `translate(-50%, calc(-58% + ${y * (i ? 0.08 : 0.05)}px)) rotate(${y * (i ? -0.15 : 0.2)}deg)`;
        });
      }, { passive: true });
    }
  } else {
    document.querySelectorAll(".reveal, .stagger").forEach((el) => {
      el.classList.add("is-visible");
    });
  }
})();
