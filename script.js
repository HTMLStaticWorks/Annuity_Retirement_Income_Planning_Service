
document.addEventListener("DOMContentLoaded", () => {
  // 0. Clone Header Actions into Mobile Hamburger Menu Dropdown
  const setupMobileNavActions = () => {
    const navLinks = document.querySelector(".nav-links");
    const navActions = document.querySelector(".site-header .nav-actions");
    if (navLinks && navActions && !navLinks.querySelector(".mobile-nav-actions")) {
      const mobileActions = document.createElement("div");
      mobileActions.className = "mobile-nav-actions";
      mobileActions.innerHTML = navActions.innerHTML;
      navLinks.appendChild(mobileActions);
    }
  };
  setupMobileNavActions();

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
      links.classList.toggle("open");
    });
  }

  // 6. Dashboard Section Tab Switching
  initDashboardTabs();
});

function switchDashTab(targetId) {
  if (!targetId) targetId = "overview";
  const sections = document.querySelectorAll(".dash-section");
  const dashLinks = document.querySelectorAll("a[data-dash-target]");
  if (!sections.length) return;

  sections.forEach(sec => {
    if (sec.getAttribute("data-dash-section") === targetId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });

  dashLinks.forEach(link => {
    if (link.getAttribute("data-dash-target") === targetId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initDashboardTabs() {
  const dashLinks = document.querySelectorAll("a[data-dash-target]");
  const sections = document.querySelectorAll(".dash-section");
  const dashMobileToggle = document.getElementById("dashMobileToggle");
  const dashMobileDropdown = document.getElementById("dashMobileDropdown");

  if (dashMobileToggle && dashMobileDropdown) {
    dashMobileToggle.addEventListener("click", () => {
      dashMobileDropdown.classList.toggle("open");
    });
  }

  if (!sections.length) return;

  dashLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-dash-target");
      switchDashTab(targetId);
      history.replaceState(null, null, "#" + targetId);
      if (dashMobileDropdown) {
        dashMobileDropdown.classList.remove("open");
      }
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

// Live Income Gap Calculator Handler for Home 2
function initGapCalculator() {
  const targetExpenseInput = document.getElementById("targetExpense");
  const socialSecurityInput = document.getElementById("socialSecurity");
  const targetExpenseVal = document.getElementById("targetExpenseVal");
  const socialSecurityVal = document.getElementById("socialSecurityVal");
  const gapResultVal = document.getElementById("gapResultVal");
  const gapCoveragePct = document.getElementById("gapCoveragePct");

  const updateGapCalc = () => {
    if (!targetExpenseInput || !socialSecurityInput) return;
    const expense = parseInt(targetExpenseInput.value) || 6000;
    const socSec = parseInt(socialSecurityInput.value) || 2400;

    if (targetExpenseVal) targetExpenseVal.textContent = "$" + expense.toLocaleString();
    if (socialSecurityVal) socialSecurityVal.textContent = "$" + socSec.toLocaleString();

    const gapNeeded = Math.max(0, expense - socSec);
    if (gapResultVal) gapResultVal.textContent = "$" + gapNeeded.toLocaleString() + " / mo";

    const coverage = Math.min(100, Math.round((socSec / expense) * 100));
    if (gapCoveragePct) gapCoveragePct.textContent = coverage + "% Base Floor Coverage";
  };

  if (targetExpenseInput && socialSecurityInput) {
    targetExpenseInput.addEventListener("input", updateGapCalc);
    socialSecurityInput.addEventListener("input", updateGapCalc);
    updateGapCalc();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initGapCalculator();
});


