
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

  // 6. Dashboard Section Tab Switching
  initDashboardTabs();
});

function switchDashTab(targetId) {
  if (!targetId) targetId = "overview";
  const sections = document.querySelectorAll(".dash-section");
  const sideLinks = document.querySelectorAll(".side-links a[data-dash-target]");
  if (!sections.length) return;

  sections.forEach(sec => {
    if (sec.getAttribute("data-dash-section") === targetId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  sideLinks.forEach(link => {
    if (link.getAttribute("data-dash-target") === targetId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initDashboardTabs() {
  const sideLinks = document.querySelectorAll(".side-links a[data-dash-target]");
  const sections = document.querySelectorAll(".dash-section");
  if (!sections.length) return;

  sideLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-dash-target");
      switchDashTab(targetId);
      history.replaceState(null, null, "#" + targetId);
    });
  });

  const hash = window.location.hash.replace("#", "");
  if (hash && document.querySelector(`.dash-section[data-dash-section="${hash}"]`)) {
    switchDashTab(hash);
  } else {
    switchDashTab("overview");
  }

  window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash && document.querySelector(`.dash-section[data-dash-section="${currentHash}"]`)) {
      switchDashTab(currentHash);
    }
  });
}

function sendAdvisorNote() {
  const input = document.getElementById("advisorNoteInput");
  if (input && input.value.trim() !== "") {
    if (typeof showToast === "function") {
      showToast("✓ Message sent securely to Sarah Johnson, CFP®!");
    } else {
      alert("✓ Message sent securely to Sarah Johnson, CFP®!");
    }
    input.value = "";
  } else {
    if (typeof showToast === "function") {
      showToast("Please write a message before sending.");
    }
  }
}


