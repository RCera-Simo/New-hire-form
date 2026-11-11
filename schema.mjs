// HOMESÍ New Hire Application — single source of truth for the client form AND the Netlify function.
// Mirrors the monday.com form "New hire Application" (board 18149631343, view 217023335):
// same question order, same required flags, same conditional rules. Column ids are the board's column ids.

export const BOARD_ID = 18149631343;
export const GROUP_ID = "topics"; // "Incoming responses"

const YN = [
  { v: 0, en: "Yes", es: "Sí" },
  { v: 1, en: "No", es: "No" },
];

export const STATES = [
  "AL - Alabama","AK - Alaska","AZ - Arizona","AR - Arkansas","CA - California","CO - Colorado","CT - Connecticut",
  "DE - Delaware","DC - District of Columbia","FL - Florida","GA - Georgia","HI - Hawaii","ID - Idaho","IL - Illinois",
  "IN - Indiana","IA - Iowa","KS - Kansas","KY - Kentucky","LA - Louisiana","ME - Maine","MD - Maryland","MA - Massachusetts",
  "MI - Michigan","MN - Minnesota","MS - Mississippi","MO - Missouri","MT - Montana","NE - Nebraska","NV - Nevada",
  "NH - New Hampshire","NJ - New Jersey","NM - New Mexico","NY - New York","NC - North Carolina","ND - North Dakota",
  "OH - Ohio","OK - Oklahoma","OR - Oregon","PA - Pennsylvania","RI - Rhode Island","SC - South Carolina","SD - South Dakota",
  "TN - Tennessee","TX - Texas","UT - Utah","VT - Vermont","VA - Virginia","WA - Washington","WV - West Virginia",
  "WI - Wisconsin","WY - Wyoming","PR - Puerto Rico","N/A - Not Licensed","N/A - Defective License",
].map((label, i) => ({ v: i + 1, en: label, es: label })); // dropdown ids 1..54 on multi_selectufysqp5y

// ISO 3166-1 alpha-2 codes; names come from Intl.DisplayNames (EN/ES). Colombia and US are pinned on top.
const ISO = ("AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BV BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF TF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HM VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW").split(" ");
const PINNED_COUNTRIES = ["CO", "US"];
const dn = (lang) => { try { return new Intl.DisplayNames([lang], { type: "region" }); } catch { return null; } };
const DN_EN = dn("en"), DN_ES = dn("es");
export const COUNTRIES = ISO.map((c) => ({ v: c, en: DN_EN?.of(c) || c, es: DN_ES?.of(c) || DN_EN?.of(c) || c }))
  .sort((a, b) => {
    const pa = PINNED_COUNTRIES.indexOf(a.v), pb = PINNED_COUNTRIES.indexOf(b.v);
    if (pa !== -1 || pb !== -1) return (pa === -1 ? 99 : pa) - (pb === -1 ? 99 : pb);
    return a.en.localeCompare(b.en);
  });
export const COUNTRY_PINNED = PINNED_COUNTRIES.length;

// Steps (chapters). Page breaks only — question order is identical to the monday form.
export const STEPS = [
  { id: "candidate", en: "The candidate", es: "El candidato", hand: { en: "who's joining", es: "¿quién llega?" } },
  { id: "role", en: "Role & recruiter", es: "Rol y reclutador", hand: { en: "the position", es: "la posición" } },
  { id: "license", en: "Licensing & branch", es: "Licencias y sucursal", hand: { en: "credentials", es: "credenciales" } },
  { id: "contact", en: "Contact", es: "Contacto", hand: { en: "stay in touch", es: "siempre en contacto" } },
  { id: "comp", en: "Compensation", es: "Compensación", hand: { en: "the offer", es: "la oferta" } },
  { id: "equipment", en: "Equipment", es: "Equipo", hand: { en: "ready day one", es: "listos desde el día uno" } },
  { id: "marketing", en: "Marketing & requests", es: "Marketing y solicitudes", hand: { en: "make it shine", es: "a brillar" } },
];

// type: text | longtext | email | phone | date | number | status | dropdown | file | name
// show: { q: questionId, eq: statusIndex } — conditional rule copied from the monday form.
export const QUESTIONS = [
  // ── Step 1 ─────────────────────────────────────────────
  { id: "country_mm8zcwff", step: "candidate", type: "country", req: true,
    en: "Where will the new hire be based?", es: "¿Dónde estará basado el nuevo ingreso?",
    hint: { en: "Country where the new hire will work from", es: "País desde donde trabajará el nuevo ingreso" },
    options: COUNTRIES },
  { id: "short_texth3kal7a2", step: "candidate", type: "text", req: true,
    en: "Legal First Name", es: "Nombre legal",
    hint: { en: "Candidate's LEGAL first name", es: "Nombre LEGAL del candidato" } },
  { id: "short_text7tokc9gk", step: "candidate", type: "text", req: true,
    en: "Legal Last Name", es: "Apellido legal",
    hint: { en: "Candidate's LEGAL last name", es: "Apellido LEGAL del candidato" } },
  { id: "short_text2iwhqzlj", step: "candidate", type: "text", req: false,
    en: "Has a Preferred Name", es: "Nombre preferido" },
  { id: "short_textmubbf5vr", step: "candidate", type: "text", req: true, suggest: ["LO", "LOA", "BM", "BD"],
    en: "Employee Title", es: "Cargo del empleado",
    hint: { en: "LO, LOA, BM, BD, etc", es: "LO, LOA, BM, BD, etc." } },
  { id: "single_select2o228f7", step: "candidate", type: "status", req: true,
    en: "Is the new hire a NPPM?", es: "¿El nuevo ingreso es NPPM?", options: YN },
  { id: "datecx5vtfwh", step: "candidate", type: "date", req: true,
    en: "Estimated Start Date", es: "Fecha estimada de inicio",
    hint: { en: "This date should be at least 5 business days after the form is filled. Start dates are usually on MONDAYS.",
            es: "Debe ser al menos 5 días hábiles después de llenar el formulario. Los inicios suelen ser los LUNES." } },
  { id: "single_selectiond02l", step: "candidate", type: "status", req: true,
    en: "Employee Type", es: "Tipo de empleado",
    hint: { en: "Default answer is BRANCH", es: "La respuesta por defecto es BRANCH" },
    options: [{ v: 0, en: "Branch", es: "Branch" }, { v: 1, en: "Corporate", es: "Corporate" }] },

  // ── Step 2 ─────────────────────────────────────────────
  { id: "name", step: "role", type: "name", req: true,
    en: "Recruiter or BD Name", es: "Nombre del reclutador o BD",
    hint: { en: "Who is bringing in the candidate", es: "Quién trae al candidato" } },
  { id: "single_selectkprqyl3", step: "role", type: "status", req: true,
    en: "Full or part-time", es: "Tiempo completo o parcial",
    hint: { en: "NPPM should be part time", es: "Un NPPM debe ser tiempo parcial" },
    options: [{ v: 0, en: "Full time", es: "Tiempo completo" }, { v: 1, en: "Part time", es: "Tiempo parcial" }] },
  { id: "single_selectxax0iuv", step: "role", type: "status", req: true,
    en: "Seasonal Employee", es: "Empleado temporal (estacional)",
    hint: { en: "Typical answer is NO", es: "La respuesta típica es NO" }, options: YN },
  { id: "single_selectshdnr7i", step: "role", type: "status", req: true,
    en: "Role type", es: "Tipo de rol",
    options: [
      { v: 0, en: "Sales", es: "Ventas" }, { v: 1, en: "Operations", es: "Operaciones" },
      { v: 2, en: "Administration", es: "Administración" }, { v: 3, en: "Management", es: "Gerencia" }] },
  { id: "single_select3orh11o", step: "role", type: "status", req: true,
    en: "Rehire", es: "Recontratación",
    hint: { en: "Did this person work for Supreme Lending in the past?", es: "¿Esta persona trabajó antes en Supreme Lending?" },
    options: YN },

  // ── Step 3 ─────────────────────────────────────────────
  { id: "single_select00o10p9", step: "license", type: "status", req: true,
    en: "Does the Candidate have an NMLS License?", es: "¿El candidato tiene licencia NMLS?",
    hint: { en: "NPPM shouldn't have a NMLS license", es: "Un NPPM no debería tener licencia NMLS" }, options: YN },
  { id: "short_text1f7lbjyl", step: "license", type: "text", req: true, show: { q: "single_select00o10p9", eq: 0 },
    en: "NMLS ID Number", es: "Número de ID NMLS" },
  { id: "short_texttt4hawjo", step: "license", type: "text", req: true, show: { q: "single_select00o10p9", eq: 0 },
    en: "NMLS First Name", es: "Nombre en NMLS",
    hint: { en: "This needs to be exact to the NMLS system", es: "Debe coincidir exactamente con el sistema NMLS" } },
  { id: "short_texty3ntwbhn", step: "license", type: "text", req: true, show: { q: "single_select00o10p9", eq: 0 },
    en: "NMLS Last Name", es: "Apellido en NMLS",
    hint: { en: "This needs to be exact to the NMLS system", es: "Debe coincidir exactamente con el sistema NMLS" } },
  { id: "multi_selectufysqp5y", step: "license", type: "dropdown", req: true, show: { q: "single_select00o10p9", eq: 0 },
    en: "Licensed States", es: "Estados con licencia",
    hint: { en: "Add all the states where the license is active", es: "Agrega todos los estados donde la licencia está activa" },
    options: STATES },
  { id: "single_selectcuaewa7", step: "license", type: "status", req: true, display: "chips",
    en: "Branch Number", es: "Número de sucursal",
    options: [
      [0,"700"],[1,"701"],[2,"702"],[3,"703"],[4,"707"],[19,"710"],[6,"712"],[7,"716"],[8,"718"],[9,"721"],
      [10,"724"],[11,"728"],[12,"733"],[13,"741"],[14,"747"],[102,"760"],[18,"770"],[17,"771"],[101,"776"],
      [15,"Other"],[16,"New branch"],
    ].map(([v, l]) => ({ v, en: l, es: l === "Other" ? "Otra" : l === "New branch" ? "Nueva sucursal" : l })) },
  { id: "short_text8h04nu6q", step: "license", type: "text", req: true, show: { q: "single_selectcuaewa7", eq: 15 },
    en: "Type your Branch Number", es: "Escribe el número de sucursal" },

  // New branch section (shown when Branch Number = "New branch")
  { id: "numbercpxymmlg", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "BM Sales Volume", es: "Volumen de ventas del BM",
    hint: { en: "Branch Manager's sales volume", es: "Volumen de ventas del Branch Manager" } },
  { id: "single_selectp8762a7", step: "license", type: "status", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Do you have Current or Previous Employee's Agreement?", es: "¿Tiene acuerdo de empleo actual o anterior?", options: YN },
  { id: "numberlirp9r67", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Anticipated Number of Staff in Branch", es: "Número anticipado de personal en la sucursal" },
  { id: "numbernu5xtwua", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Estimated Branch Volume", es: "Volumen estimado de la sucursal" },
  { id: "number8qvzza6a", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Average Loan Size", es: "Tamaño promedio de préstamo" },
  { id: "number41o4ztc1", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Anticipated Units", es: "Unidades anticipadas" },
  { id: "number06x8rz3m", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "Conventional %", es: "% Convencional", hint: { en: "Percentage of conventional loans", es: "Porcentaje de préstamos convencionales" } },
  { id: "numberfcgzv2k9", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "Government %", es: "% Gobierno", hint: { en: "Percentage of government loans", es: "Porcentaje de préstamos de gobierno" } },
  { id: "numberwxtoqquh", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "Bond %", es: "% Bond", hint: { en: "Percentage of bond loans", es: "Porcentaje de préstamos bond" } },
  { id: "numberi5pdv2zh", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "High Balance %", es: "% High Balance", hint: { en: "Percentage of high balance loans", es: "Porcentaje de préstamos high balance" } },
  { id: "numberjdemygwa", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "Jumbo %", es: "% Jumbo", hint: { en: "Percentage of jumbo loans", es: "Porcentaje de préstamos jumbo" } },
  { id: "number7b4aotgr", step: "license", type: "number", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch", pct: true,
    en: "Condos %", es: "% Condominios", hint: { en: "Percentage of condo loans", es: "Porcentaje de préstamos de condominios" } },
  { id: "single_selectcnts8v6", step: "license", type: "status", req: true, show: { q: "single_selectcuaewa7", eq: 16 }, group: "newbranch",
    en: "Does the recruit currently have a lease for office/building space?", es: "¿El candidato tiene actualmente un contrato de arriendo de oficina/local?", options: YN },

  { id: "single_select79hzs54", step: "license", type: "status", req: true,
    en: "Is temporary authority needed?", es: "¿Se necesita autoridad temporal?",
    hint: { en: "Default option is NO", es: "La opción por defecto es NO" }, options: YN },
  { id: "short_textly9u4xvm", step: "license", type: "text", req: true,
    en: "Are there any items that may prevent the candidate from becoming licensed?", es: "¿Hay algo que pueda impedir que el candidato obtenga la licencia?",
    hint: { en: "If not applicable, use N/A", es: "Si no aplica, escribe N/A" } },
  { id: "single_selectl8yxs0r", step: "license", type: "status", req: true,
    en: "Does the candidate have a realtor's license?", es: "¿El candidato tiene licencia de realtor?", options: YN },
  // Realtor license states → board column "What state(s) are they licensed in?" (dropdown ids 1..52).
  { id: "dropdown_mm53hfry", step: "license", type: "dropdown", req: true, show: { q: "single_selectl8yxs0r", eq: 0 },
    en: "What state(s) are they licensed in? (real estate)", es: "¿En qué estado(s) tiene licencia de bienes raíces?",
    hint: { en: "This question applies for licensed realtors only", es: "Aplica solo para realtors con licencia" },
    options: STATES.filter((o) => o.v <= 52) },
  { id: "single_selectppma397", step: "license", type: "status", req: true,
    en: "Will this employee continue to actively use their real estate license and perform Loan Officer duties (Dual capacity)? If \"Yes\", the Branch employee will be part-time only.",
    es: "¿Este empleado seguirá usando activamente su licencia de bienes raíces y ejercerá como Loan Officer (doble capacidad)? Si es \"Sí\", el empleado de la sucursal será solo tiempo parcial.",
    hint: { en: "Default option is NO.", es: "La opción por defecto es NO." }, options: YN },
  { id: "short_textpesxwnbm", step: "license", type: "text", req: false, show: { q: "single_selectl8yxs0r", eq: 0 },
    en: "Name of Real Estate Company", es: "Nombre de la compañía de bienes raíces",
    hint: { en: "If applicable. If not, use N/A.", es: "Si aplica. Si no, escribe N/A." } },

  // ── Step 4 ─────────────────────────────────────────────
  { id: "short_textv52j2d2b", step: "contact", type: "email", req: true,
    en: "Personal Email Address", es: "Correo electrónico personal",
    hint: { en: "This is VERY important. ALL documentation will be sent to this e-mail address. Please VERIFY it.",
            es: "MUY importante. TODA la documentación se enviará a este correo. Por favor VERIFÍCALO." } },
  { id: "short_texth6pd3dvb", step: "contact", type: "phone", req: true,
    en: "Cellphone", es: "Celular",
    hint: { en: "This is VERY important in case we need to contact the new hire.", es: "MUY importante por si necesitamos contactar al nuevo ingreso." } },
  { id: "short_textomozqsqq", step: "contact", type: "longtext", req: true,
    en: "Home Address", es: "Dirección de residencia",
    hint: { en: "Please add ALL of the following: Street Address, City, State, Zip code, Address line 2, Other Address.",
            es: "Incluye TODO: dirección, ciudad, estado, código postal, línea 2 y otra dirección." } },

  // ── Step 5 ─────────────────────────────────────────────
  { id: "single_selecti3kd6j3", step: "comp", type: "status", req: true,
    en: "Salary", es: "Salario",
    options: [{ v: 0, en: "Hourly (Min Wage)", es: "Por hora (salario mínimo)" }, { v: 1, en: "Hourly (Other)", es: "Por hora (otro)" }, { v: 2, en: "Annual", es: "Anual" }] },
  { id: "single_selectua0x33l", step: "comp", type: "status", req: true,
    en: "Sign-on Bonus", es: "Bono de contratación", options: YN },
  { id: "short_text3srh03aq", step: "comp", type: "text", req: true, show: { q: "single_selectua0x33l", eq: 0 },
    en: "Sign-on bonus Amount", es: "Monto del bono de contratación" },
  { id: "single_selectzzxyrcf", step: "comp", type: "status", req: true, show: { q: "single_selectua0x33l", eq: 0 },
    en: "Sign-on Bonus Recoverable", es: "Bono de contratación recuperable",
    hint: { en: "Typical answer is NO.", es: "La respuesta típica es NO." }, options: YN },
  { id: "short_textkrmh7wdf", step: "comp", type: "text", req: true, show: { q: "single_selectzzxyrcf", eq: 0 },
    en: "Recoverable Time Frame", es: "Plazo de recuperación",
    hint: { en: "Typical answer is N/A", es: "La respuesta típica es N/A" } },
  { id: "short_texta2cctacq", step: "comp", type: "longtext", req: true,
    en: "Additional Compensation Notes", es: "Notas adicionales de compensación" },
  { id: "short_text3x17eidc", step: "comp", type: "text", req: true,
    en: "Has Guarantee", es: "Tiene garantía",
    hint: { en: "Typical answer is NO", es: "La respuesta típica es NO" } },
  { id: "short_textvjzo2o2k", step: "comp", type: "text", req: true, prefill: "1000", money: true,
    en: "Minimum per Transaction ($)", es: "Mínimo por transacción ($)",
    hint: { en: "1000 USD standard", es: "Estándar: 1000 USD" } },
  { id: "short_text4w2hg3n5", step: "comp", type: "text", req: true, prefill: "20000", money: true,
    en: "Maximum per Transaction ($)", es: "Máximo por transacción ($)",
    hint: { en: "20000 USD standard", es: "Estándar: 20000 USD" } },
  { id: "short_text23o3s3c1", step: "comp", type: "longtext", req: true,
    en: "Additional Compensation Notes (2)", es: "Notas adicionales de compensación (2)" },
  // LEADS (shown when NPPM = No)
  { id: "short_text5ce8k38u", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Self-Generated", es: "LEADS: Autogenerados", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_text7rtpn28p", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: In-house", es: "LEADS: Internos", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_text5cxw8pqp", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Marketing", es: "LEADS: Marketing", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_textj0hxvuj0", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Management referral", es: "LEADS: Referidos de gerencia", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_text73ipbw1c", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Internet", es: "LEADS: Internet", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_textjzizfqcs", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Transition", es: "LEADS: Transición", hint: { en: "Add the number in bps", es: "Número en bps" } },
  { id: "short_text3ry54vv3", step: "comp", type: "text", req: true, show: { fn: "loBm" }, group: "leads",
    en: "LEADS: Friends and family", es: "LEADS: Amigos y familia", hint: { en: "500 USD standard", es: "Estándar: 500 USD" } },
  { id: "single_selectw6a395e", step: "comp", type: "status", req: true,
    en: "Branch Manager P&L Owner", es: "Branch Manager dueño del P&L", options: YN },
  { id: "short_textv7tfmah2", step: "comp", type: "longtext", req: true, show: { q: "single_selectw6a395e", eq: 0 },
    en: "Additional Compensation notes (P&L)", es: "Notas adicionales de compensación (P&L)" },

  // ── Step 6 ─────────────────────────────────────────────
  // Optional: leaving it empty means "No PC required" (the form asks the requestor to confirm).
  { id: "single_selectx5vj4yj", step: "equipment", type: "status", req: false, noPcConfirm: true,
    en: "Laptop", es: "Laptop",
    hint: { en: "Premium is only for high-mobility users. Leave empty if no PC is required.", es: "Premium solo para usuarios de alta movilidad. Déjalo vacío si no se requiere PC." },
    options: [
      { v: 0, en: "Standard", es: "Estándar", sub: { en: "16\" with numeric keypad · 4.06 lb", es: "16\" con teclado numérico · 4.06 lb" } },
      { v: 1, en: "Premium", es: "Premium", sub: { en: "14\" without numeric keypad · 3.09 lb", es: "14\" sin teclado numérico · 3.09 lb" } }] },
  { id: "single_selectxxlyf2y", step: "equipment", type: "status", req: true,
    en: "Docking Station", es: "Docking station", options: YN },
  { id: "single_selectzq1xchm", step: "equipment", type: "status", req: true,
    en: "Monitor", es: "Monitor",
    options: [{ v: 0, en: "0", es: "0" }, { v: 1, en: "1", es: "1" }, { v: 3, en: "2", es: "2" }] },
  { id: "single_selectln89xtx", step: "equipment", type: "status", req: true,
    en: "Wireless keyboard and Mouse", es: "Teclado y mouse inalámbricos", options: YN },
  { id: "single_selectyjh5sd5", step: "equipment", type: "status", req: true,
    en: "Zoom options", es: "Opciones de Zoom",
    options: [{ v: 0, en: "Without phone", es: "Sin teléfono" }, { v: 1, en: "With phone", es: "Con teléfono" }] },
  { id: "short_text5hnj0sdf", step: "equipment", type: "text", req: false,
    en: "Zoom Number - Preferred Area", es: "Número de Zoom - Área preferida",
    hint: { en: "Preferred State / Area for commercial purposes.", es: "Estado / área preferida para fines comerciales." } },
  { id: "single_selecty5y8xie", step: "equipment", type: "status", req: true,
    en: "Fax2Mail", es: "Fax2Mail",
    hint: { en: "Only if the person sends faxes regularly", es: "Solo si la persona envía faxes con regularidad" }, options: YN },
  { id: "single_selectvnk55tq", step: "equipment", type: "status", req: true,
    en: "Ship to address", es: "Dirección de envío",
    hint: { en: "Where shall we ship the laptop and equipment to?", es: "¿A dónde enviamos el laptop y el equipo?" },
    options: [{ v: 0, en: "Home", es: "Casa" }, { v: 1, en: "Office", es: "Oficina" }, { v: 2, en: "Other", es: "Otra" },
      { v: "NA", en: "N/A", es: "N/A", mondayLabel: "N/A" }] },
  { id: "single_selectsef3dde", step: "equipment", type: "status", req: true,
    en: "Supreme T-Shirt size", es: "Talla de camiseta Supreme",
    hint: { en: "(US Personnel only)", es: "(Solo personal en EE. UU.)" },
    options: [[7,"N/A - Not applicable","N/A - No aplica"],[0,"S"],[1,"M"],[2,"L"],[3,"XL"],[4,"2XL"],[6,"3XL"]]
      .map(([v, en, es]) => ({ v, en, es: es || en })) },
  { id: "short_textm34jnxew", step: "equipment", type: "longtext", req: false, show: { q: "single_selectvnk55tq", eq: 2 },
    en: "Address to ship", es: "Dirección para el envío" },

  // ── Step 7 ─────────────────────────────────────────────
  { id: "short_textphy8uldc", step: "marketing", type: "longtext", req: true,
    en: "Does the candidate have any specific requirements upon their hiring?", es: "¿El candidato tiene algún requerimiento específico para su contratación?",
    hint: { en: "E.g. Enroll in B2B strategy, dedicated resource, marketing request upon signing, any other specific request",
            es: "Ej.: inscripción en estrategia B2B, recurso dedicado, solicitud de marketing al firmar, cualquier otra solicitud" } },
  { id: "file4vfqpeqe", step: "marketing", type: "file", req: false,
    en: "Please upload the headshot for marketing material", es: "Sube la foto (headshot) para el material de marketing",
    hint: { en: "JPG or PNG. We'll optimize it automatically.", es: "JPG o PNG. La optimizamos automáticamente." } },
  { id: "short_texto9frvezf", step: "marketing", type: "longtext", req: false, max: 200,
    en: "Please add a short Bio for the landing page", es: "Agrega una biografía corta para la landing page",
    hint: { en: "Max 200 characters", es: "Máximo 200 caracteres" } },
  { id: "short_textf5x6xd1m", step: "marketing", type: "longtext", req: false,
    en: "Please add the social media account links", es: "Agrega los enlaces de redes sociales",
    hint: { en: "E.g. Facebook, Instagram, LinkedIn, TikTok", es: "Ej.: Facebook, Instagram, LinkedIn, TikTok" } },
];

export const Q_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

/** Employee Title is free text: LO / BM (or Loan Officer / Branch Manager) trigger the LEADS section. LOA does not. */
export const LO_BM_RE = /\b(LO|BM|LOAN OFFICER|BRANCH MANAGER)\b/i;

/** Normalizes phones to the board's standard: 10-digit US → XXX-XXX-XXXX (a leading 1 is dropped). Others: +digits. */
export function normalizePhone(v) {
  const raw = String(v ?? "").trim();
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return d ? "+" + d : raw;
}

export const BRANCH_Q = "single_selectcuaewa7";
export const BRANCH_OTHER = 15, BRANCH_NEW = 16;

/** Replaces the Branch Number options with the board's live labels (so branches added via "Other" show up). */
export function setBranchOptions(labels) {
  const q = Q_BY_ID[BRANCH_Q];
  const nums = labels
    .filter((l) => l.v !== BRANCH_OTHER && l.v !== BRANCH_NEW)
    .sort((a, b) => (parseInt(a.label, 10) || 1e9) - (parseInt(b.label, 10) || 1e9) || a.label.localeCompare(b.label))
    .map((l) => ({ v: l.v, en: l.label, es: l.label }));
  q.options = [...nums, { v: BRANCH_OTHER, en: "Other", es: "Otra" }, { v: BRANCH_NEW, en: "New branch", es: "Nueva sucursal" }];
}

/** A question is visible when its rule (if any) matches and its parent is visible too. */
export function isVisible(q, answers) {
  if (!q.show) return true;
  if (q.show.fn === "loBm") return LO_BM_RE.test(String(answers.short_textmubbf5vr || ""));
  const parent = Q_BY_ID[q.show.q];
  if (parent && !isVisible(parent, answers)) return false;
  return answers[q.show.q] === q.show.eq;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns { [questionId]: errorKey } for visible questions. errorKey: required | email | phone | number | max | option */
export function validate(answers, { only } = {}) {
  const errors = {};
  for (const q of QUESTIONS) {
    if (only && q.step !== only) continue;
    if (q.type === "file") continue;
    if (!isVisible(q, answers)) continue;
    const v = answers[q.id];
    const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
    if (empty) { if (q.req) errors[q.id] = "required"; continue; }
    if (q.type === "email" && !EMAIL_RE.test(String(v).trim())) errors[q.id] = "email";
    if (q.type === "phone" && String(v).replace(/\D/g, "").length < 10) errors[q.id] = "phone";
    if (q.type === "number" && !Number.isFinite(Number(v))) errors[q.id] = "number";
    if (q.max && String(v).length > q.max) errors[q.id] = "max";
    if (q.type === "status" && !q.options.some((o) => o.v === v)) errors[q.id] = "option";
    if (q.type === "country" && !q.options.some((o) => o.v === v)) errors[q.id] = "option";
    if (q.type === "dropdown" && (!Array.isArray(v) || v.some((x) => !q.options.some((o) => o.v === x)))) errors[q.id] = "option";
    if (q.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(v)) errors[q.id] = "required";
  }
  return errors;
}

/** Builds { itemName, columnValues } in monday's column_values format. Hidden (conditional) answers are dropped. */
/** True when the payload uses a label that may not exist yet on the board (create_labels_if_missing). */
export function needsNewLabels(answers) {
  return QUESTIONS.some((q) => q.type === "status" && isVisible(q, answers) && q.options.some((o) => o.mondayLabel && o.v === answers[q.id]));
}

export function toMonday(answers) {
  const columnValues = {};
  let itemName = "";
  for (const q of QUESTIONS) {
    if (q.type === "file" || !isVisible(q, answers)) continue;
    const v = answers[q.id];
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) continue;
    switch (q.type) {
      case "name": itemName = String(v).trim(); break;
      case "status": {
        const opt = q.options.find((o) => o.v === v);
        columnValues[q.id] = opt && opt.mondayLabel ? { label: opt.mondayLabel } : { index: v };
        break;
      }
      case "country": columnValues[q.id] = { countryCode: v, countryName: q.options.find((o) => o.v === v)?.en || v }; break;
      case "dropdown": columnValues[q.id] = { ids: v }; break;
      case "date": columnValues[q.id] = { date: v }; break;
      case "phone": columnValues[q.id] = normalizePhone(v); break;
      case "number": columnValues[q.id] = String(Number(v)); break;
      // monday "text" columns are single-line: fold line breaks into ", "
      default: columnValues[q.id] = String(v).trim().replace(/\s*\n+\s*/g, ", ");
    }
  }
  return { itemName, columnValues };
}
