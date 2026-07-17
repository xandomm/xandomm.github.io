(function () {
  "use strict";

  var html = document.documentElement;
  var LANG_KEY = "am-lang";

  function setLang(lang) {
    html.setAttribute("data-lang", lang);
    localStorage.setItem(LANG_KEY, lang);
  }

  var savedLang = localStorage.getItem(LANG_KEY);
  if (savedLang === "en" || savedLang === "pt") setLang(savedLang);

  var langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", function () {
    var current = html.getAttribute("data-lang") || "en";
    setLang(current === "en" ? "pt" : "en");
  });

  var burger = document.getElementById("nav-burger");
  var navLinks = document.getElementById("nav-links");
  burger.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
})();
