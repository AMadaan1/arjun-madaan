/* ===========================================================================
   site.js
   ---------------------------------------------------------------------------
   Deliberately small. Every page works completely with JavaScript disabled —
   the content is real HTML, the layout is CSS, the animation is CSS. This file
   only adds convenience on top. If you ever find yourself moving content into
   JavaScript, stop: search engines, screen readers and people on bad
   connections all do better with content in the HTML.

   Two jobs:
     1. Mark outbound links so they open in a new tab, safely.
     2. Let people copy your email with one click.
   =========================================================================== */

(function () {
  "use strict";

  /* 1. OUTBOUND LINKS ------------------------------------------------------
     Any link pointing at a different host gets target="_blank" plus
     rel="noopener". noopener matters: without it, the page you open can reach
     back into yours through window.opener. It's a real (if small) security
     hole, and it's the kind of thing that's easy to forget by hand — so it's
     done here instead of trusted to memory.

     Setting target here also triggers the ↗ arrow in styles.css, which keys
     off [target="_blank"]. One source of truth. */
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    if (link.host !== window.location.host) {
      link.target = "_blank";
      link.rel = "noopener";
    }
  });

  /* 2. COPY EMAIL ----------------------------------------------------------
     Progressive enhancement done properly: the button does not exist in the
     HTML. It's created here, so if JavaScript fails there's no dead button on
     the page — just the mailto link, which already worked.

     To use it, give any element data-copy="the text to copy". */
  document.querySelectorAll("[data-copy]").forEach(function (el) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "copy";
    button.setAttribute("aria-label", "Copy " + el.dataset.copy + " to clipboard");

    button.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(el.dataset.copy);
        button.textContent = "copied";
      } catch (err) {
        /* Clipboard access can be refused — insecure context, or the user
           denied permission. Say what happened rather than failing silently
           or pretending it worked. */
        button.textContent = "copy failed";
      }
      setTimeout(function () { button.textContent = "copy"; }, 2000);
    });

    el.insertAdjacentElement("afterend", button);
  });

  /* Note on what is deliberately NOT here:

     No auto-updating "last updated" date. It would be trivial to write
     today's date into the footer on every page load, and it would be a lie —
     the page would claim to be current on a day you hadn't touched it. Edit
     that date by hand when you actually change something. */
})();
