/* =========================================================================
   EXHIBITION DOWNLOAD CENTER — script.js
   Handles: mobile nav, quote rotator, video metadata, rotating facts,
   scroll reveal.
   No external dependencies. Safe to run on GitHub Pages (static hosting).
   ========================================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     Mobile navigation toggle
     ------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after a link is chosen (mobile).
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Scroll-to-top links (Home / Back to Top / brand)
     Handled explicitly rather than relying on "#top" anchor scrolling,
     since a position: sticky header can't reliably be an anchor target.
     ------------------------------------------------------------------- */
  document.querySelectorAll("[data-scroll-top]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      mainNav && mainNav.classList.remove("is-open");
      navToggle && navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------------------
     Video: now hosted on Google Drive via an <iframe> embed, so there is
     no local <video> element to read duration/size from. Edit the
     "Format / Size / Duration" values directly in index.html once you
     know the real numbers — see the #meta-format / #meta-size /
     #meta-duration spans in the Video section.
     ------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------
     "Quotes of the Day" — one quote at a time, auto-advancing every 10s
     on a loop (pauses on hover or when the tab isn't visible). Prev/Next
     also work and reset the 10s timer. Add more quotes any time by
     adding { text, author } objects below — the nav buttons, counter,
     and loop all pick it up automatically.
     ------------------------------------------------------------------- */
  var quotes = [
    {
      text: "Combine technology with any field that sparks your own interest, and it will turn your work into something truly fun.",
      author: "Thanushkar Sivakumar"
    },
  ];

  var quoteText = document.getElementById("quote-text");
  var quoteAuthor = document.getElementById("quote-author");
  var quoteCounter = document.getElementById("quote-counter");
  var prevQuoteBtn = document.getElementById("prev-quote-btn");
  var nextQuoteBtn = document.getElementById("next-quote-btn");
  var quoteBox = document.getElementById("quote-box");
  var currentQuoteIndex = 0;
  var quoteAutoAdvanceMs = 5000;
  var quoteTimer = null;

  function renderQuote(index) {
    if (!quoteText || !quotes.length) return;
    var q = quotes[index];

    quoteText.classList.add("is-fading");
    if (quoteAuthor) quoteAuthor.classList.add("is-fading");

    window.setTimeout(function () {
      quoteText.textContent = q.text;
      if (quoteAuthor) quoteAuthor.textContent = q.author;
      if (quoteCounter) quoteCounter.textContent = (index + 1) + " / " + quotes.length;
      quoteText.classList.remove("is-fading");
      if (quoteAuthor) quoteAuthor.classList.remove("is-fading");
    }, 180);

    currentQuoteIndex = index;
  }

  function goToQuote(step) {
    var next = (currentQuoteIndex + step + quotes.length) % quotes.length;
    renderQuote(next);
  }

  function startQuoteAutoAdvance() {
    if (quotes.length < 2) return;
    stopQuoteAutoAdvance();
    quoteTimer = window.setInterval(function () {
      goToQuote(1);
    }, quoteAutoAdvanceMs);
  }

  function stopQuoteAutoAdvance() {
    if (quoteTimer) {
      window.clearInterval(quoteTimer);
      quoteTimer = null;
    }
  }

  if (quoteText && quotes.length) {
    renderQuote(0);

    // Only one quote right now, so Prev/Next (and the loop) have nothing
    // to move to yet; hide the buttons until there are at least two.
    if (quotes.length < 2) {
      if (prevQuoteBtn) prevQuoteBtn.style.display = "none";
      if (nextQuoteBtn) nextQuoteBtn.style.display = "none";
    } else {
      startQuoteAutoAdvance();
    }
  }

  // A manual click still counts as "moving on," so just restart the
  // 10s timer from zero rather than letting it fire again right away.
  if (prevQuoteBtn) {
    prevQuoteBtn.addEventListener("click", function () {
      goToQuote(-1);
      startQuoteAutoAdvance();
    });
  }

  if (nextQuoteBtn) {
    nextQuoteBtn.addEventListener("click", function () {
      goToQuote(1);
      startQuoteAutoAdvance();
    });
  }

  // Pause the loop while the tab isn't visible, and while the visitor's
  // pointer is resting on the quote (so it doesn't jump mid-read).
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopQuoteAutoAdvance();
    } else {
      startQuoteAutoAdvance();
    }
  });

  if (quoteBox) {
    quoteBox.addEventListener("mouseenter", stopQuoteAutoAdvance);
    quoteBox.addEventListener("mouseleave", startQuoteAutoAdvance);
  }

  /* ---------------------------------------------------------------------
     "Did You Know?" rotating facts
     ------------------------------------------------------------------- */
  var facts = [
    "A translation can be grammatically correct while still failing to communicate the original cultural meaning.",
    "Machine translation can process large amounts of text quickly, but context and cultural interpretation can still require human judgment.",
    "Many languages encode information English leaves out entirely, such as formality, gender, or social distance between speakers.",
    "Idioms rarely translate word for word — a phrase that makes sense in one language can sound meaningless in another.",
    "Human translators often make deliberate creative choices, while machine systems typically optimize for the statistically likely phrasing.",
    "The same sentence can require a completely different sentence structure once translated, since languages order ideas differently.",
    "Early machine translation research began in the 1950s, long before the neural network methods used today.",
    "Bilingual speakers often report that certain concepts feel easier to express in one of their languages than the other."
  ];

  var factText = document.getElementById("fact-text");
  var anotherFactBtn = document.getElementById("another-fact-btn");
  var lastFactIndex = -1;

  function pickFactIndex() {
    if (facts.length <= 1) return 0;
    var next;
    do {
      next = Math.floor(Math.random() * facts.length);
    } while (next === lastFactIndex);
    return next;
  }

  function showFact(index) {
    if (!factText) return;
    factText.classList.add("is-fading");
    window.setTimeout(function () {
      factText.textContent = facts[index];
      factText.classList.remove("is-fading");
    }, 180);
    lastFactIndex = index;
  }

  if (factText) {
    showFact(pickFactIndex());
  }

  if (anotherFactBtn) {
    anotherFactBtn.addEventListener("click", function () {
      showFact(pickFactIndex());
    });
  }

  /* ---------------------------------------------------------------------
     Scroll reveal (lightweight, no library)
     ------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".section-inner, .card--featured, .card-grid, .fact-box, .quote-box"
  );

  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No IntersectionObserver support: show everything immediately.
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
