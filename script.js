
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year Update
  document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());

  // 2. Theme Toggle (Dark / Light Mode Icon Toggle)
  const initTheme = () => {
    const savedTheme = localStorage.getItem("retira_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  };

  const updateThemeIcon = (theme) => {
    document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  };

  document.querySelectorAll('[data-action="toggle-theme"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("retira_theme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  });

  initTheme();

  // 3. RTL Theme Layout Direction Logic (Text Button Toggle)
  const initRTL = () => {
    const savedDir = localStorage.getItem("retira_theme_dir");
    if (savedDir) {
      document.documentElement.setAttribute("dir", savedDir);
    }
  };

  document.querySelectorAll('[data-action="toggle-rtl"]').forEach(btn => {
    btn.addEventListener("click", () => {
      const currentDir = document.documentElement.getAttribute("dir");
      const nextDir = currentDir === "rtl" ? "ltr" : "rtl";
      document.documentElement.setAttribute("dir", nextDir);
      localStorage.setItem("retira_theme_dir", nextDir);
    });
  });

  initRTL();

  // 3. Form Redirect Handler
  document.querySelectorAll("form[data-redirect]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      window.location.href = form.dataset.redirect || "index.html";
    });
  });

  // 4. Newsletter Form Handler
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const msg = form.querySelector(".newsletter-msg");
      if (input && input.value) {
        if (msg) {
          msg.textContent = "✓ Thank you for subscribing!";
          msg.style.display = "block";
        }
        input.value = "";
        setTimeout(() => {
          if (msg) msg.style.display = "none";
        }, 4000);
      }
    });
  });

  // 5. Mobile Toggle Navigation
  const toggle = document.querySelector(".mobile-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isVisible = links.style.display === "flex";
      links.style.display = isVisible ? "none" : "flex";
      links.style.flexDirection = "column";
      links.style.position = "absolute";
      links.style.top = "68px";
      links.style.left = "12px";
      links.style.right = "12px";
      links.style.background = "#fff";
      links.style.padding = "18px";
      links.style.borderRadius = "16px";
      links.style.boxShadow = "0 12px 35px rgba(0,0,0,.12)";
      links.style.zIndex = "100";
    });
  }
});

