(function () {
  const pages = [
    { section: "Overview" },
    { href: "index.html", label: "Home" },
    { section: "Verbs & Tenses" },
    { href: "verbs.html", label: "Verb tenses" },
    { href: "modals.html", label: "Modal verbs" },
    { href: "irregular-verbs.html", label: "Irregular verbs" },
    { href: "regular-verbs.html", label: "Regular verbs" },
    { section: "Grammar" },
    { href: "sentence-structure.html", label: "Sentence structure" },
    { href: "adverbs.html", label: "Adverbs" },
    { href: "adjectives.html", label: "Adjectives" },
    { section: "Vocabulary" },
    { href: "phrasal-verbs.html", label: "Phrasal verbs" },
    { href: "idioms.html", label: "Idioms" },
  ];

  function currentFile() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function render() {
    const mount = document.getElementById("sidebar-mount");
    if (!mount) return;
    const here = currentFile();

    const parts = [
      '<h1 class="brand">English Rules</h1>',
      '<p class="brand-sub">A personal grammar handbook</p>',
    ];

    let listOpen = false;
    for (const item of pages) {
      if (item.section) {
        if (listOpen) { parts.push("</ul>"); listOpen = false; }
        parts.push(`<div class="nav-section">${item.section}</div>`);
        parts.push('<ul class="nav">');
        listOpen = true;
      } else {
        const cls = item.href === here ? ' class="active"' : "";
        parts.push(`<li><a href="${item.href}"${cls}>${item.label}</a></li>`);
      }
    }
    if (listOpen) parts.push("</ul>");

    mount.innerHTML = parts.join("");
  }

  function bindToggle() {
    const btn = document.getElementById("nav-toggle");
    const sb = document.querySelector(".sidebar");
    if (!btn || !sb) return;
    btn.addEventListener("click", () => sb.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (window.innerWidth > 860) return;
      if (sb.contains(e.target) || btn.contains(e.target)) return;
      sb.classList.remove("open");
    });
  }

  function bindSearch() {
    const input = document.querySelector("[data-search]");
    if (!input) return;
    const target = document.querySelector(input.dataset.search);
    if (!target) return;
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      target.querySelectorAll("tbody tr").forEach((tr) => {
        tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? "" : "none";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    bindToggle();
    bindSearch();
  });
})();
