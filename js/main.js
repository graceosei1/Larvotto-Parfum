/* Larvotto – landingspagina
   - Formulier: controle in het Nederlands + verzenden naar MailerLite
   - Video: speelt automatisch (zonder geluid) als ze in beeld komt,
     behalve bij "beperkte beweging" in de systeeminstellingen */

/* ---------- instellingen ---------- */
const CONFIG = {
  // Uit de share-url van het formulier: preview.mailerlite.io/preview/2735616/forms/203717007416231823
  action: "https://assets.mailerlite.com/jsonp/2735616/forms/203717007416231823/subscribe",

  // Optioneel: ID's van de interessegroepen in MailerLite (staan in de embed-code als groups[] value="…").
  // Leeg laten = de keuze kust/reiziger wordt niet doorgestuurd.
  groups: {
    kust: "",
    reiziger: ""
  }
};

/* ---------- formulier ---------- */
const form = document.getElementById("signup-form");

if (form) {
  const success = document.getElementById("signup-success");
  const status = document.getElementById("form-status");
  const button = form.querySelector('button[type="submit"]');

  const checks = [
    {
      input: form.querySelector("#name"),
      error: form.querySelector("#name-error"),
      valid: (el) => el.value.trim().length > 0
    },
    {
      input: form.querySelector("#email"),
      error: form.querySelector("#email-error"),
      valid: (el) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())
    },
    {
      input: form.querySelector("#optin"),
      error: form.querySelector("#optin-error"),
      valid: (el) => el.checked
    }
  ];

  const showError = (check, show) => {
    check.error.hidden = !show;
    check.input.setAttribute("aria-invalid", show ? "true" : "false");
  };

  // fouten verdwijnen zodra het veld klopt
  checks.forEach((check) => {
    const evt = check.input.type === "checkbox" ? "change" : "input";
    check.input.addEventListener(evt, () => {
      if (check.input.getAttribute("aria-invalid") === "true") {
        showError(check, !check.valid(check.input));
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";

    let firstInvalid = null;
    checks.forEach((check) => {
      const ok = check.valid(check.input);
      showError(check, !ok);
      if (!ok && !firstInvalid) firstInvalid = check.input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData();
    data.append("fields[name]", form.querySelector("#name").value.trim());
    data.append("fields[email]", form.querySelector("#email").value.trim());
    data.append("ml-submit", "1");
    data.append("anticsrf", "true");

    const segment = form.querySelector('input[name="segment"]:checked');
    if (segment && CONFIG.groups[segment.value]) {
      data.append("groups[]", CONFIG.groups[segment.value]);
    }

    button.disabled = true;
    button.textContent = "Even geduld…";

    try {
      // no-cors: MailerLite ontvangt de inschrijving, het antwoord is niet leesbaar.
      // Controleer nieuwe inschrijvers in MailerLite > Subscribers.
      await fetch(CONFIG.action, { method: "POST", body: data, mode: "no-cors" });
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (err) {
      status.textContent = "Er ging iets mis bij het versturen. Controleer je internetverbinding en probeer het opnieuw.";
      button.disabled = false;
      button.textContent = "Schrijf je in";
    }
  });
}

/* ---------- video ---------- */
const video = document.getElementById("story-video");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (video && !reduceMotion && "IntersectionObserver" in window) {
  let userPaused = false;
  video.addEventListener("pause", () => { if (!video.dataset.auto) userPaused = true; });
  video.addEventListener("play", () => { userPaused = false; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !userPaused) {
        video.play().catch(() => {});
      } else if (!entry.isIntersecting && !video.paused) {
        video.dataset.auto = "1";
        video.pause();
        delete video.dataset.auto;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(video);
}
