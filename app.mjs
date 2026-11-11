import { STEPS, QUESTIONS, Q_BY_ID, isVisible, validate, normalizePhone, setBranchOptions, COUNTRY_PINNED } from "./schema.mjs";

/* ── i18n ─────────────────────────────────────────────── */
const T = {
  en: {
    "w.tileHand": "una llave a más", "w.eyebrow": "HOMESÍ DIVISION · NEW HIRE",
    "w.title": 'Welcome a new<br><span class="red">SÍ</span>-Team member',
    "w.lead": 'Tell us who\'s joining Supreme Lending. Seven short chapters, about 8 minutes. <span class="hand cream">¡Bienvenidos!</span>',
    "w.start": "Start application", "w.trackTitle": "Follow up on an existing process", "w.trackSub": "Check where your new hire is in the HOMESÍ pipeline", "r.track": "Track existing process", "w.resume": "Resume draft", "w.f1": "chapters", "w.f2": "bilingual", "w.f3": "auto-saves your draft",
    "r.title": "NEW HIRE APPLICATION", "n.back": "Back", "n.next": "Continue", "n.review": "Review answers", "n.submit": "Submit application",
    "n.sending": "Sending…", chapter: "Chapter", of: "of", review: "Review", reviewHand: "one last look",
    reviewTitle: "Review & submit", reviewNote: "Once you submit, the record is created on the HOMESÍ New Hire board and the team is notified automatically.",
    edit: "Edit", empty: "—", saved: "Draft saved", required: "This question is required.", email: "Enter a valid email address.",
    phone: "Enter a valid phone number (10+ digits).", number: "Enter a number.", max: "Too long.", option: "Choose an option.",
    fixErrors: "A few answers need attention.", nbEyebrow: "NEW BRANCH", nbTitle: "New branch information", nbHand: "nueva sucursal",
    leadsEyebrow: "LO / BM", leadsTitle: "Lead compensation", leadsHand: "en bps", pctTotal: "Loan mix total:",
    search: "Search states…", selected: "selected", fileCta: "Drop a photo or browse", fileNone: "No file chosen", remove: "Remove",
    startWarn: "Heads-up: this is less than 5 business days from today.",
    doneMsg: (n) => `${n}'s application is now on the HOMESÍ New Hire board. The team has been notified and will follow up shortly.`,
    doneFileFail: " Note: the headshot could not be attached — please send it to the team directly.",
    again: "Submit another new hire", errNet: "We couldn't reach the server. Check your connection and try again.",
    errServer: "Something went wrong saving to monday. Your answers are still here — please try again.", errFile: "The photo is too large. Please use one under 4 MB.",
    draftFound: "You have a saved draft.", yes: "Yes", no: "No", choose: "Select an option…", "d.hand": "¡Listo!", "d.title": "Application received", "d.again": "Submit another new hire",
    "np.eyebrow": "EQUIPMENT", "np.title": "No laptop selected", noPc: "No PC required",
    "np.body": "You didn't choose Standard or Premium. Do you confirm you want to create this request with NO PC required?",
    "np.cancel": "No, choose a laptop", "np.ok": "Yes, no PC required",
    errNoFn: "Submit service not found: the Netlify function was not deployed.", errToken: "Server not configured: MONDAY_API_TOKEN is missing in Netlify.",
  },
  es: {
    "w.tileHand": "a key to more", "w.eyebrow": "DIVISIÓN HOMESÍ · NUEVO INGRESO",
    "w.title": 'Bienvenido un nuevo<br>miembro del <span class="red">SÍ</span>-Team',
    "w.lead": 'Cuéntanos quién se une a Supreme Lending. Siete capítulos cortos, unos 8 minutos. <span class="hand cream">Welcome!</span>',
    "w.start": "Comenzar solicitud", "w.trackTitle": "Seguimiento a un proceso existente", "w.trackSub": "Consulta en qué etapa va tu nuevo ingreso en el pipeline de HOMESÍ", "r.track": "Seguimiento a un proceso", "w.resume": "Retomar borrador", "w.f1": "capítulos", "w.f2": "bilingüe", "w.f3": "guarda tu borrador",
    "r.title": "SOLICITUD DE NUEVO INGRESO", "n.back": "Atrás", "n.next": "Continuar", "n.review": "Revisar respuestas", "n.submit": "Enviar solicitud",
    "n.sending": "Enviando…", chapter: "Capítulo", of: "de", review: "Revisión", reviewHand: "un último vistazo",
    reviewTitle: "Revisar y enviar", reviewNote: "Al enviar, el registro se crea en el board New Hire de HOMESÍ y el equipo recibe la notificación automáticamente.",
    edit: "Editar", empty: "—", saved: "Borrador guardado", required: "Esta pregunta es obligatoria.", email: "Ingresa un correo válido.",
    phone: "Ingresa un teléfono válido (10+ dígitos).", number: "Ingresa un número.", max: "Demasiado largo.", option: "Elige una opción.",
    fixErrors: "Algunas respuestas necesitan atención.", nbEyebrow: "NUEVA SUCURSAL", nbTitle: "Información de la nueva sucursal", nbHand: "new branch",
    leadsEyebrow: "LO / BM", leadsTitle: "Compensación por leads", leadsHand: "en bps", pctTotal: "Total mezcla de préstamos:",
    search: "Buscar estados…", selected: "seleccionados", fileCta: "Arrastra una foto o explora", fileNone: "Ningún archivo", remove: "Quitar",
    startWarn: "Atención: faltan menos de 5 días hábiles desde hoy.",
    doneMsg: (n) => `La solicitud de ${n} ya está en el board New Hire de HOMESÍ. El equipo fue notificado y dará seguimiento pronto.`,
    doneFileFail: " Nota: no se pudo adjuntar la foto; envíala directamente al equipo.",
    again: "Enviar otro nuevo ingreso", errNet: "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.",
    errServer: "Algo falló al guardar en monday. Tus respuestas siguen aquí; intenta de nuevo.", errFile: "La foto es muy pesada. Usa una de menos de 4 MB.",
    draftFound: "Tienes un borrador guardado.", yes: "Sí", no: "No", choose: "Selecciona una opción…", "d.hand": "¡Listo!", "d.title": "Solicitud recibida", "d.again": "Enviar otro nuevo ingreso",
    "np.eyebrow": "EQUIPO", "np.title": "No seleccionaste laptop", noPc: "No requiere PC",
    "np.body": "No elegiste Standard ni Premium. ¿Confirmas que deseas crear esta solicitud SIN PC requerido?",
    "np.cancel": "No, elegir laptop", "np.ok": "Sí, sin PC",
    errNoFn: "No se encontró el servicio de envío: la función de Netlify no se publicó.", errToken: "Servidor sin configurar: falta MONDAY_API_TOKEN en Netlify.",
  },
};
const ORD = { en: ["ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN"], es: ["UNO","DOS","TRES","CUATRO","CINCO","SEIS","SIETE"] };

/* ── state ────────────────────────────────────────────── */
const DRAFT_KEY = "homesi-newhire-draft-v1", LANG_KEY = "homesi-newhire-lang";
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} },
};
const REVIEW = STEPS.length;
const savedLang = store.get(LANG_KEY);
const S = { lang: savedLang === "es" || savedLang === "en" ? savedLang : (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en",
  step: 0, max: 0, answers: {}, errors: {}, headshot: null, shownCond: new Set(), sending: false, msOpen: null };

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const t = (k) => T[S.lang][k] ?? T.en[k] ?? k;
const L = (o) => (o ? o[S.lang] ?? o.en : "");
/** ISO-2 code → flag emoji (regional indicator pair). */
const flag = (cc) => String(cc).toUpperCase().replace(/[A-Z]/g, (c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0)));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function applyPrefills() {
  for (const q of QUESTIONS) if (q.prefill && S.answers[q.id] === undefined) S.answers[q.id] = q.prefill;
}

/* ── screens ──────────────────────────────────────────── */
function show(id) {
  $$(".screen").forEach((s) => s.classList.toggle("is-active", s.id === id));
  window.scrollTo({ top: 0 });
}

function applyLang() {
  document.documentElement.lang = S.lang;
  $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
  $$("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === S.lang)));
  if ($("#app").classList.contains("is-active")) renderStep(false);
}

/* ── field renderers ──────────────────────────────────── */
function fieldHTML(q) {
  const v = S.answers[q.id];
  const err = S.errors[q.id];
  const isNew = q.show && !S.shownCond.has(q.id);
  const cls = ["field", q.show && !q.group ? "cond" : "", err ? "has-error" : "", q.group && (q.type === "status" || q.id === "single_selectp8762a7") ? "span2" : ""]
    .filter(Boolean).join(" ");
  const style = q.show && !isNew ? ' style="animation:none"' : "";
  const labelFor = ["dropdown", "file"].includes(q.type) ? "" : ` for="f_${q.id}"`;
  let control = "";
  const name = `f_${q.id}`;
  switch (q.type) {
    case "country": {
      // Pinned (CO, US) first, then the rest sorted in the current language.
      const pin = q.options.slice(0, COUNTRY_PINNED), rest = q.options.slice(COUNTRY_PINNED).slice().sort((a, b) => L(a).localeCompare(L(b), S.lang));
      const opt = (o) => `<option value="${o.v}" ${v === o.v ? "selected" : ""}>${flag(o.v)}  ${esc(L(o))}</option>`;
      control = `<select class="select" id="${name}" name="${name}" autocomplete="country">
        <option value="" ${!v ? "selected" : ""}>${esc(t("choose"))}</option>${pin.map(opt).join("")}
        <option disabled>──────────</option>${rest.map(opt).join("")}</select>`;
      break;
    }
    case "status": {
      // Single-select dropdown, as in the original monday form.
      control = `<select class="select" id="${name}" name="${name}">
        <option value="" ${v === undefined ? "selected" : ""}>${esc(t("choose"))}</option>` +
        q.options.map((o) => `<option value="${o.v}" ${v === o.v ? "selected" : ""}>${esc(L(o) + (o.sub ? " — " + L(o.sub) : ""))}</option>`).join("") + `</select>`;
      break;
    }
    case "dropdown": {
      // Multi-select dropdown: trigger shows the chosen tags; panel has search + checkboxes.
      const sel = Array.isArray(v) ? v : [];
      const open = S.msOpen === q.id;
      control = `<div class="ms${open ? " open" : ""}" data-ms="${q.id}">
        <div class="ms-trigger" role="button" tabindex="0" aria-haspopup="listbox" aria-expanded="${open}">
          <div class="ms-selected">${sel.length ? sel.map((id) => `<button type="button" class="ms-tag" data-rm="${id}">${esc(q.options.find((o) => o.v === id)?.en)}<i>×</i></button>`).join("") : `<span class="ms-ph">${esc(t("choose"))}</span>`}</div>
          <svg class="ico chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="ms-panel" role="listbox" aria-multiselectable="true">
          <div class="ms-top"><input class="input ms-search" type="search" placeholder="${esc(t("search"))}" aria-label="${esc(t("search"))}">
          <span class="ms-count">${sel.length} ${esc(t("selected"))}</span></div>
          <div class="ms-list">${q.options.map((o) => `<label class="ms-opt" data-label="${esc(o.en.toLowerCase())}"><input type="checkbox" value="${o.v}" ${sel.includes(o.v) ? "checked" : ""}><span>${esc(o.en)}</span></label>`).join("")}</div>
        </div>
      </div>`;
      break;
    }
    case "file": {
      const h = S.headshot;
      control = `<label class="drop" id="drop">
        <span class="thumb">${h ? `<img src="${h.url}" alt="">` : `<svg class="ico" viewBox="0 0 24 24" style="width:28px;height:28px"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>`}</span>
        <span><b>${h ? esc(h.name) : esc(t("fileCta"))}</b><small>${h ? Math.round(h.blob.size / 1024) + " KB" : esc(t("fileNone"))}</small></span>
        ${h ? `<button type="button" class="link-btn" id="rmFile">${esc(t("remove"))}</button>` : ""}
        <input type="file" accept="image/*" id="f_${q.id}"></label>`;
      break;
    }
    case "longtext":
      control = `<textarea class="textarea" id="${name}" name="${name}" ${q.max ? `maxlength="${q.max + 50}"` : ""}>${esc(v)}</textarea>` +
        (q.max ? `<div class="counter ${String(v || "").length > q.max ? "over" : ""}" data-counter="${q.id}">${String(v || "").length}/${q.max}</div>` : "");
      break;
    case "date": {
      const today = new Date().toISOString().slice(0, 10);
      control = `<input class="input" type="date" id="${name}" name="${name}" min="${today}" value="${esc(v)}">` +
        (v && businessDaysUntil(v) < 5 ? `<div class="warn">${esc(t("startWarn"))}</div>` : "");
      break;
    }
    case "number":
      control = `<div class="input-wrap">${q.pct ? "" : q.id.match(/numbercpxymmlg|numbernu5xtwua|number8qvzza6a/) ? `<span class="affix pre">$</span>` : ""}
        <input class="input" type="number" inputmode="decimal" step="any" min="0" id="${name}" name="${name}" value="${esc(v)}">${q.pct ? `<span class="affix post">%</span>` : ""}</div>`;
      break;
    default: {
      const type = q.type === "email" ? "email" : q.type === "phone" ? "tel" : "text";
      const ac = { short_texth3kal7a2: "given-name", short_text7tokc9gk: "family-name", short_textv52j2d2b: "email", short_texth6pd3dvb: "tel" }[q.id] || "off";
      control = q.money
        ? `<div class="input-wrap"><span class="affix pre">$</span><input class="input" type="text" inputmode="decimal" id="${name}" name="${name}" value="${esc(v)}"></div>`
        : `<input class="input" type="${type}" id="${name}" name="${name}" autocomplete="${ac}" value="${esc(v)}"${q.suggest ? ` list="dl_${q.id}"` : ""}${q.type === "phone" ? ' inputmode="tel" placeholder="555-555-5555"' : ""}>` +
          (q.suggest ? `<datalist id="dl_${q.id}">${q.suggest.map((s) => `<option value="${esc(s)}">`).join("")}</datalist>` : "");
    }
  }
  return `<div class="${cls}"${style} data-q="${q.id}">
    <label class="f-label"${labelFor}>${esc(L(q))}${q.req ? '<span class="req" aria-hidden="true">*</span>' : ""}</label>
    ${q.hint ? `<p class="f-hint">${esc(L(q.hint))}</p>` : ""}
    <div class="f-control">${control}</div>
    <p class="f-error">${err ? esc(t(err)) : ""}</p></div>`;
}

function businessDaysUntil(iso) {
  const d0 = new Date(); d0.setHours(0, 0, 0, 0);
  const d1 = new Date(iso + "T00:00:00");
  let n = 0;
  for (const d = new Date(d0); d < d1; d.setDate(d.getDate() + 1)) { const w = d.getDay(); if (w !== 0 && w !== 6) n++; }
  return n;
}

function pctSumHTML() {
  const ids = QUESTIONS.filter((q) => q.pct).map((q) => q.id);
  const vals = ids.map((id) => Number(S.answers[id])).filter(Number.isFinite);
  if (!vals.length) return "";
  const sum = vals.reduce((a, b) => a + b, 0);
  return `<div class="pct-sum ${Math.round(sum) === 100 ? "" : "off"}" id="pctSum">${esc(t("pctTotal"))} <b>${+sum.toFixed(2)}%</b></div>`;
}

function groupHTML(kind, qs) {
  if (kind === "newbranch") {
    return `<div class="group group-nb"><div class="group-head"><div><div class="eyebrow">${esc(t("nbEyebrow"))}</div><h3>${esc(t("nbTitle"))}</h3></div>
      <div class="hand amber">${esc(t("nbHand"))}</div></div><div class="group-grid">${qs.map(fieldHTML).join("")}</div><span id="pctHost">${pctSumHTML()}</span></div>`;
  }
  return `<div class="group group-leads"><div class="group-head"><div><div class="eyebrow">${esc(t("leadsEyebrow"))}</div><h3>${esc(t("leadsTitle"))}</h3></div>
    <div class="hand" style="color:var(--navy-400)">${esc(t("leadsHand"))}</div></div><div class="group-grid">${qs.map(fieldHTML).join("")}</div></div>`;
}

/* ── step rendering ───────────────────────────────────── */
function renderStep(animate = true) {
  const host = $("#stepHost");
  const i = S.step;
  let html;
  if (i === REVIEW) html = reviewHTML();
  else {
    const st = STEPS[i];
    const qs = QUESTIONS.filter((q) => q.step === st.id && isVisible(q, S.answers));
    let body = "", k = 0;
    while (k < qs.length) {
      const g = qs[k].group;
      if (g) { const run = []; while (k < qs.length && qs[k].group === g) run.push(qs[k++]); body += groupHTML(g, run); }
      else body += fieldHTML(qs[k++]);
    }
    html = `<div class="step${animate ? " rise-in" : ""}">
      <div class="step-head rise"><div class="step-num">0${i + 1}</div><div class="eyebrow">${esc(t("chapter"))} ${ORD[S.lang][i]}</div></div>
      <h2 class="rise d1">${esc(L(st))}</h2><div class="hand hand-sub rise d2">${esc(L(st.hand))}</div>
      <div class="step-body">${body}</div></div>`;
    qs.forEach((q) => q.show && S.shownCond.add(q.id));
  }
  host.innerHTML = html;
  renderChrome();
}

function renderChrome() {
  const i = S.step;
  $("#chapters").innerHTML = [...STEPS.map((s) => L(s)), t("review")].map((lbl, k) => `
    <li class="${k === i ? "current" : k < S.max || (k <= S.max && k !== i) ? "done" : ""}">
      <button type="button" data-go="${k}" ${k > S.max ? "disabled" : ""}><span class="num">${k === REVIEW ? "✓" : "0" + (k + 1)}</span><span class="lbl">${esc(lbl)}</span></button></li>`).join("");
  $("#back").style.visibility = i === 0 ? "hidden" : "visible";
  $("#nextLabel").textContent = S.sending ? t("n.sending") : i === REVIEW ? t("n.submit") : i === REVIEW - 1 ? t("n.review") : t("n.next");
  $("#next").disabled = S.sending;
  $("#navCount").textContent = i === REVIEW ? t("review") : `${i + 1} ${t("of")} ${STEPS.length}`;
  $("#mbStep").textContent = i === REVIEW ? t("review") : `0${i + 1} · ${L(STEPS[i])}`;
  $("#mbBar").style.width = `${((i + 1) / (REVIEW + 1)) * 100}%`;
}

function displayValue(q) {
  if (q.type === "file") return S.headshot ? S.headshot.name : "";
  const v = S.answers[q.id];
  if ((v === undefined || v === "" || v === null) && q.noPcConfirm) return t("noPc");
  if (v === undefined || v === "" || v === null) return "";
  if (q.type === "country") return `${flag(v)} ${L(q.options.find((o) => o.v === v))}`;
  if (q.type === "status") return L(q.options.find((o) => o.v === v));
  if (q.type === "dropdown") return (v || []).map((id) => q.options.find((o) => o.v === id)?.en.split(" - ")[0]).join(", ");
  if (q.pct) return v + "%";
  if (q.money) return "$" + v;
  return String(v);
}

function reviewHTML() {
  const secs = STEPS.map((st, k) => {
    const rows = QUESTIONS.filter((q) => q.step === st.id && isVisible(q, S.answers)).map((q) => {
      const dv = displayValue(q);
      return `<dt>${esc(L(q))}</dt><dd class="${dv ? "" : "empty"}">${dv ? esc(dv) : t("empty")}</dd>`;
    }).join("");
    return `<section class="review-sec"><header><h3><span class="mini">0${k + 1}</span>${esc(L(st))}</h3>
      <button type="button" class="link-btn" data-go="${k}">${esc(t("edit"))}</button></header><dl>${rows}</dl></section>`;
  }).join("");
  return `<div class="step rise-in"><div class="step-head rise"><div class="step-num">✓</div><div class="eyebrow">${esc(t("review"))}</div></div>
    <h2 class="rise d1">${esc(t("reviewTitle"))}</h2><div class="hand hand-sub rise d2">${esc(t("reviewHand"))}</div>
    <div class="step-body">${secs}<div class="review-note">${esc(t("reviewNote"))}</div></div></div>`;
}

/* ── events ───────────────────────────────────────────── */
let saveTimer;
function saveDraft() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    store.set(DRAFT_KEY, { answers: S.answers, step: S.step, max: S.max, ts: Date.now() });
    const el = $("#saved"); el.textContent = "✓ " + t("saved");
  }, 400);
}

function clearError(id) {
  if (!S.errors[id]) return;
  delete S.errors[id];
  const f = $(`[data-q="${id}"]`); f && f.classList.remove("has-error");
}

function rerenderKeepScroll() {
  const y = window.scrollY;
  renderStep(false);
  window.scrollTo({ top: y });
}

$("#stepHost").addEventListener("input", (e) => {
  const f = e.target.closest("[data-q]"); if (!f) return;
  const q = Q_BY_ID[f.dataset.q];
  const el = e.target;
  if (el.classList.contains("ms-search")) {
    const term = el.value.trim().toLowerCase();
    $$(".ms-list .ms-opt", f).forEach((p) => (p.style.display = p.dataset.label.includes(term) ? "" : "none"));
    return;
  }
  if (q.type === "status" || q.type === "dropdown" || q.type === "file") return;
  S.answers[q.id] = q.type === "number" ? (el.value === "" ? "" : Number(el.value)) : el.value;
  clearError(q.id);
  if (q.max) { const c = $(`[data-counter="${q.id}"]`); c.textContent = `${el.value.length}/${q.max}`; c.classList.toggle("over", el.value.length > q.max); }
  if (q.pct) { const h = $("#pctHost"); if (h) h.innerHTML = pctSumHTML(); }
  saveDraft();
});

$("#stepHost").addEventListener("change", (e) => {
  const f = e.target.closest("[data-q]"); if (!f) return;
  const q = Q_BY_ID[f.dataset.q];
  if (q.type === "status") {
    if (q.noPcConfirm) S.noPcOk = false; // re-confirm if the laptop is cleared again
    if (e.target.value === "") delete S.answers[q.id];
    else S.answers[q.id] = /^-?\d+$/.test(e.target.value) ? Number(e.target.value) : e.target.value;
    clearError(q.id);
    // Re-render only if this answer controls conditional questions.
    if (QUESTIONS.some((x) => x.show?.q === q.id)) rerenderKeepScroll();
    saveDraft();
  } else if (q.type === "country") {
    if (e.target.value === "") delete S.answers[q.id]; else S.answers[q.id] = e.target.value;
    clearError(q.id); saveDraft();
  } else if (q.type === "dropdown" && e.target.type === "checkbox") {
    const cur = new Set(S.answers[q.id] || []);
    e.target.checked ? cur.add(Number(e.target.value)) : cur.delete(Number(e.target.value));
    S.answers[q.id] = q.options.map((o) => o.v).filter((v) => cur.has(v));
    clearError(q.id);
    updateMs(f, q);
    saveDraft();
  } else if (q.type === "file" && e.target.files?.[0]) {
    handleFile(e.target.files[0]);
  } else if (q.type === "date") {
    S.answers[q.id] = e.target.value; clearError(q.id); rerenderKeepScroll(); saveDraft();
  } else if (q.type === "phone" && e.target.value.trim()) {
    // Standardize on blur: (305) 555 1234 / +1 305.555.1234 → 305-555-1234
    e.target.value = S.answers[q.id] = normalizePhone(e.target.value); saveDraft();
  } else if (q.id === "short_textmubbf5vr") {
    S.answers[q.id] = e.target.value.trim().toUpperCase().replace(/\s+/g, " ");
    e.target.value = S.answers[q.id]; saveDraft();
  }
});

function updateMs(f, q) {
  const sel = S.answers[q.id] || [];
  $(".ms-count", f).textContent = `${sel.length} ${t("selected")}`;
  $(".ms-selected", f).innerHTML = sel.length
    ? sel.map((id) => `<button type="button" class="ms-tag" data-rm="${id}">${esc(q.options.find((o) => o.v === id)?.en)}<i>×</i></button>`).join("")
    : `<span class="ms-ph">${esc(t("choose"))}</span>`;
}

function setMsOpen(id) {
  S.msOpen = id;
  $$(".ms").forEach((m) => {
    const on = m.dataset.ms === id;
    m.classList.toggle("open", on);
    $(".ms-trigger", m).setAttribute("aria-expanded", String(on));
    if (on) setTimeout(() => $(".ms-search", m)?.focus(), 30);
  });
}
// Close the multi-select when clicking outside it or pressing Escape.
document.addEventListener("click", (e) => { if (S.msOpen && !e.target.closest(".ms")) setMsOpen(null); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && S.msOpen) setMsOpen(null); });

$("#stepHost").addEventListener("click", (e) => {
  const rm = e.target.closest("[data-rm]");
  if (rm) {
    const f = rm.closest("[data-q]"); const q = Q_BY_ID[f.dataset.q];
    const id = Number(rm.dataset.rm);
    S.answers[q.id] = (S.answers[q.id] || []).filter((x) => x !== id);
    const cb = $(`.ms-list input[value="${id}"]`, f); if (cb) cb.checked = false;
    updateMs(f, q); saveDraft(); e.stopPropagation(); return;
  }
  const trig = e.target.closest(".ms-trigger");
  if (trig) { const id = trig.closest(".ms").dataset.ms; setMsOpen(S.msOpen === id ? null : id); return; }
  if (e.target.closest("#rmFile")) { e.preventDefault(); S.headshot = null; rerenderKeepScroll(); return; }
  const go = e.target.closest("[data-go]"); if (go) goTo(Number(go.dataset.go));
});

$("#stepHost").addEventListener("dragover", (e) => { const d = e.target.closest("#drop"); if (d) { e.preventDefault(); d.classList.add("drag"); } });
$("#stepHost").addEventListener("dragleave", (e) => { const d = e.target.closest("#drop"); if (d) d.classList.remove("drag"); });
$("#stepHost").addEventListener("drop", (e) => { const d = e.target.closest("#drop"); if (d) { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); } });

/** Downscale large photos client-side so uploads stay well under the function's payload limit. */
async function handleFile(file) {
  if (!file.type.startsWith("image/")) return;
  let blob = file, name = file.name;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    if (scale < 1 || file.size > 1.5 * 1024 * 1024) {
      const c = document.createElement("canvas");
      c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
      c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
      blob = await new Promise((r) => c.toBlob(r, "image/jpeg", 0.88));
      name = name.replace(/\.\w+$/, "") + ".jpg";
    }
  } catch {}
  if (blob.size > 4 * 1024 * 1024) return toast(t("errFile"));
  if (S.headshot?.url) URL.revokeObjectURL(S.headshot.url);
  S.headshot = { blob, name, url: URL.createObjectURL(blob) };
  rerenderKeepScroll();
}

$("#chapters").addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b && !b.disabled) goTo(Number(b.dataset.go)); });

function goTo(k) {
  S.step = k; S.errors = {};
  renderStep(true); window.scrollTo({ top: 0, behavior: "smooth" }); saveDraft();
}

function checkStep(i) {
  const errs = validate(S.answers, { only: STEPS[i].id });
  S.errors = errs;
  if (Object.keys(errs).length) {
    rerenderKeepScroll();
    const first = $(".has-error"); first?.scrollIntoView({ behavior: "smooth", block: "center" });
    first?.querySelector("input,textarea")?.focus({ preventScroll: true });
    toast(t("fixErrors"));
    return false;
  }
  return true;
}

/* ── "No PC required" confirmation ────────────────────── */
const LAPTOP = QUESTIONS.find((q) => q.noPcConfirm);
const laptopEmpty = () => LAPTOP && (S.answers[LAPTOP.id] === undefined || S.answers[LAPTOP.id] === "");

function confirmNoPc() {
  return new Promise((resolve) => {
    const m = $("#noPcModal"), ok = $("#npOk"), cancel = $("#npCancel");
    const done = (val) => {
      m.hidden = true; ok.onclick = cancel.onclick = m.onclick = null; document.removeEventListener("keydown", onKey);
      resolve(val);
    };
    const onKey = (e) => { if (e.key === "Escape") done(false); };
    ok.onclick = () => done(true);
    cancel.onclick = () => done(false);
    m.onclick = (e) => { if (e.target === m) done(false); };
    document.addEventListener("keydown", onKey);
    m.hidden = false; cancel.focus();
  });
}

/** Returns true when it's OK to continue: a laptop is chosen, or the requestor confirmed "no PC". */
async function ensureLaptopDecision() {
  if (!laptopEmpty() || S.noPcOk) return true;
  if (await confirmNoPc()) { S.noPcOk = true; return true; }
  if (S.step !== STEPS.findIndex((s) => s.id === LAPTOP.step)) goTo(STEPS.findIndex((s) => s.id === LAPTOP.step));
  setTimeout(() => { const el = $(`#f_${LAPTOP.id}`); el?.scrollIntoView({ behavior: "smooth", block: "center" }); el?.focus({ preventScroll: true }); }, 80);
  return false;
}

$("#next").addEventListener("click", async () => {
  if (S.step < REVIEW) {
    if (!checkStep(S.step)) return;
    if (LAPTOP && STEPS[S.step].id === LAPTOP.step && !(await ensureLaptopDecision())) return;
    S.max = Math.max(S.max, S.step + 1);
    goTo(S.step + 1);
  } else submit();
});
$("#back").addEventListener("click", () => S.step > 0 && goTo(S.step - 1));
$("#form").addEventListener("submit", (e) => e.preventDefault());

async function submit() {
  // Full validation across all chapters before sending.
  for (let i = 0; i < STEPS.length; i++) {
    if (Object.keys(validate(S.answers, { only: STEPS[i].id })).length) { goTo(i); checkStep(i); return; }
  }
  if (!(await ensureLaptopDecision())) return;
  S.sending = true; renderChrome();
  const fd = new FormData();
  fd.append("answers", JSON.stringify(S.answers));
  fd.append("website", $("#hp").value);
  if (S.headshot) fd.append("headshot", S.headshot.blob, S.headshot.name);
  try {
    const res = await fetch("/api/submit", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return finish(data);
    if (data.error === "validation" && data.fields) {
      S.errors = data.fields;
      const firstStep = STEPS.findIndex((s) => QUESTIONS.some((q) => q.step === s.id && data.fields[q.id]));
      S.step = Math.max(0, firstStep); renderStep(false); toast(t("fixErrors"));
    } else if (res.status === 404) toast(t("errNoFn"));
    else if (data.error === "server_not_configured") toast(t("errToken"));
    else toast(data.error === "file_too_large" ? t("errFile") : t("errServer") + (data.error ? ` (${data.error})` : ` (HTTP ${res.status})`));
  } catch { toast(t("errNet")); }
  finally { S.sending = false; renderChrome(); }
}

function finish(data) {
  const n = [S.answers.short_texth3kal7a2, S.answers.short_text7tokc9gk].filter(Boolean).join(" ");
  $("#doneMsg").textContent = t("doneMsg")(n) + (S.headshot && !data.fileUploaded ? t("doneFileFail") : "");
  store.del(DRAFT_KEY);
  show("done");
}

let toastTimer;
function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.hidden = false;
  el.style.animation = "none"; el.offsetHeight; el.style.animation = "";
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 4200);
}

/* ── boot ─────────────────────────────────────────────── */
function reset() {
  S.answers = {}; S.errors = {}; S.step = 0; S.max = 0; S.headshot = null; S.shownCond = new Set(); S.noPcOk = false;
  applyPrefills();
}
$$("[data-lang]").forEach((b) => b.addEventListener("click", () => { S.lang = b.dataset.lang; store.set(LANG_KEY, S.lang); applyLang(); }));
$("#start").addEventListener("click", () => { reset(); store.del(DRAFT_KEY); show("app"); renderStep(true); });
$("#resume").addEventListener("click", () => {
  const d = store.get(DRAFT_KEY); reset();
  if (d) { S.answers = { ...S.answers, ...d.answers }; S.step = d.step || 0; S.max = d.max || 0; }
  QUESTIONS.forEach((q) => q.show && S.shownCond.add(q.id));
  show("app"); renderStep(true);
});
$("#again").addEventListener("click", () => { reset(); show("welcome"); $("#resume").hidden = true; });

const draft = store.get(DRAFT_KEY);
if (draft && Object.keys(draft.answers || {}).length > 2) $("#resume").hidden = false;
reset();
applyLang();

// Load the live Branch Number list from monday (includes branches added through "Other").
fetch("/api/branches").then((r) => (r.ok ? r.json() : null)).then((d) => {
  if (d?.labels?.length) { setBranchOptions(d.labels); if ($("#app").classList.contains("is-active")) rerenderKeepScroll(); }
}).catch(() => {});
