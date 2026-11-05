// Each section owns one interaction. No build tools required.
const $ = (selector) => document.querySelector(selector);
const projects = window.portfolioProjects || [];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));
const icon = (name) => '<svg class="icon" aria-hidden="true"><use href="#icon-' + name + '"/></svg>';

// No pretend submission form: contact links appear only when actually configured.
function renderContact() {
  const contact = window.portfolioContact || {};
  const links = [];
  const email = String(contact.email || '').trim();
  if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    links.push({label: 'Email me', detail: email, href: 'mailto:' + encodeURIComponent(email).replace(/%40/g, '@'), external: false});
    $('#contact-links-label').textContent = 'Say hello';
  }
  for (const [key, label, allowedHost] of [['linkedin', 'LinkedIn', /^(www\.)?linkedin\.com$/], ['github', 'GitHub', /^(www\.)?github\.com$/]]) {
    if (!contact[key]) continue;
    try {
      const url = new URL(contact[key]);
      if (url.protocol !== 'https:' || !allowedHost.test(url.hostname) || url.username || url.password) continue;
      links.push({label, detail: url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, ''), href: url.href, external: true});
    } catch { /* Keep invalid or unconfigured contact methods out of the page. */ }
  }
  $('#contact-links').innerHTML = links.map(link =>
    '<a class="contact-link" href="' + escapeHTML(link.href) + '"' + (link.external ? ' target="_blank" rel="noopener noreferrer"' : '') + '><span><strong>' + escapeHTML(link.label) + '</strong><small>' + escapeHTML(link.detail) + '</small></span>' + icon(link.external ? 'external' : 'arrow') + (link.external ? '<span class="sr-only"> (opens in a new tab)</span>' : '') + '</a>'
  ).join('');
}
renderContact();

const visuals = {
  curve: '<figure class="project-photo cmm-photo"><img src="assets/formula-student-reference.webp" alt="A Formula Student race car negotiating an autocross course, with front suspension visible." width="2000" height="1333" loading="lazy"><figcaption>Formula Student reference · not the CMM car.<br><a href="https://commons.wikimedia.org/wiki/File:FSG_Autocross_Kroeger.jpg" target="_blank" rel="noopener noreferrer">© FSG / Ole Kröger · CC BY-SA 3.0 DE</a></figcaption></figure>',
  compute: '<figure class="project-photo compute-photo"><img src="assets/dgx-hardware-reference.webp" alt="Close-up photograph of an NVIDIA DGX B200 HGX GPU board with large heatsinks." width="2977" height="3021" loading="lazy"><figcaption>DGX-family hardware reference · not my campus system.<br><a href="https://commons.wikimedia.org/wiki/File:Nvidia_DGX-B200-HGX.jpg" target="_blank" rel="noopener noreferrer">Pokiiri · CC BY-SA 4.0</a></figcaption></figure>',
  type: '<div class="project-visual"><span class="visual-label">A personal space on the web</span><div class="type-mark" aria-hidden="true">aditya<span>.</span></div><span class="visual-note">Designed to evolve, one iteration at a time.</span></div>',
};

function renderProjects(filter = 'all') {
  const selected = projects.filter((project) => filter === 'all' || project.category === filter);
  $('#projects').innerHTML = selected.map((project) =>
    '<article class="project' + (project.id === 'cmm' ? ' project-featured' : '') + '">' +
      (visuals[project.visual] || '') +
      '<div class="project-body">' +
        '<div class="project-meta"><span>' + escapeHTML(project.type) + '</span><span class="status">' + escapeHTML(project.status) + '</span></div>' +
        '<h3>' + escapeHTML(project.title) + '</h3>' +
        '<p>' + escapeHTML(project.short) + '</p>' +
        '<div class="tags">' + project.tags.map((tag) => '<span>' + escapeHTML(tag) + '</span>').join('') + '</div>' +
        '<button type="button" class="project-action" data-project="' + escapeHTML(project.id) + '" aria-label="Read project notes: ' + escapeHTML(project.heading) + '"><span>Read project notes</span><span class="action-icon">' + icon('plus') + '</span></button>' +
      '</div>' +
    '</article>'
  ).join('');
  $('#project-count').textContent = selected.length + (selected.length === 1 ? ' project' : ' projects');
}
renderProjects();
$('#next-projects').innerHTML = (window.portfolioNext || []).map((item) =>
  '<article class="next-card" id="next-' + escapeHTML(item.id) + '"><div class="next-meta"><span class="eyebrow">' + escapeHTML(item.label) + '</span><span class="status">' + escapeHTML(item.status) + '</span></div><h3>' + escapeHTML(item.title) + '</h3><p>' + escapeHTML(item.description) + '</p>' +
  (item.difference ? '<p class="next-difference">' + escapeHTML(item.difference) + '</p>' : '') +
  '<div class="next-step"><span>First step</span><p>' + escapeHTML(item.next) + '</p></div>' +
  (item.notes ? '<details class="next-details"><summary>The idea & its limits</summary>' + item.notes.map(([title, text]) => '<h4>' + escapeHTML(title) + '</h4><p>' + escapeHTML(text) + '</p>').join('') + '<p class="next-references">' + (item.references || []).map(([label, href]) => '<a href="' + escapeHTML(href) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(label) + '<span class="sr-only"> (opens in a new tab)</span></a>').join(' · ') + '</p></details>' : '') +
  '<div class="tags">' + item.tags.map((tag) => '<span>' + escapeHTML(tag) + '</span>').join('') + '</div></article>'
).join('');
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    renderProjects(button.dataset.filter);
  });
});

// Native dialog: Escape closes it; focus returns to the card that opened it.
const dialog = $('#project-dialog');
let opener;
$('#projects').addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects.find((item) => item.id === button.dataset.project);
  if (!project) return;
  opener = button;
  $('#dialog-content').innerHTML =
    '<p class="dialog-meta">' + escapeHTML(project.type) + ' / ' + escapeHTML(project.status) + '</p>' +
    '<h2 id="dialog-title" tabindex="-1">' + escapeHTML(project.heading) + '</h2>' +
    project.sections.map(([title, description]) =>
      '<section><h3>' + escapeHTML(title) + '</h3><p>' + escapeHTML(description) + '</p></section>'
    ).join('');
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  $('#dialog-title').focus({ preventScroll: true });
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  if (opener?.isConnected) opener.focus({ preventScroll: true });
});

// Illustrative response, NOT the private or validated CMM model.
// Shared by the plot, numeric summary, and accessible HTML data table.
function lateralForce(load, angle) {
  const D = load * (2.3 - 0.00025 * load);
  const B = 0.18;
  const C = 1.4;
  const E = -0.2;
  return D * Math.sin(C * Math.atan(B * angle - E * (B * angle - Math.atan(B * angle))));
}
const format = (number) => Math.round(number).toLocaleString('en-IN');
function updateCurve(announce = false) {
  const load = Number($('#load').value);
  let path = '';
  let peak = 0;
  let endY = 0;
  for (let index = 0; index <= 120; index++) {
    const angle = index / 10;
    const force = lateralForce(load, angle);
    const x = angle / 12 * 500;
    const y = 219 - force / 3000 * 218;
    peak = Math.max(peak, force);
    endY = y;
    path += (index ? 'L' : 'M') + x.toFixed(2) + ',' + y.toFixed(2) + ' ';
  }
  $('#curve').setAttribute('d', path);
  $('#curve-area').setAttribute('d', path + 'L500,219 L0,219 Z');
  $('#curve-end').setAttribute('cx', '500');
  $('#curve-end').setAttribute('cy', endY.toFixed(2));
  $('#load-value').value = format(load) + ' N';
  $('#load').setAttribute('aria-valuetext', load + ' newtons');
  $('#peak').innerHTML = format(peak) + ' <small>N</small>';
  const description = 'Synthetic curve at ' + load + ' newtons vertical load. Peak lateral force within 0 to 12 degrees is ' + format(peak) + ' newtons.';
  $('#chart-desc').textContent = description;
  $('#sample-rows').innerHTML = [0, 3, 6, 9, 12].map((angle) =>
    '<tr><th scope="row">' + angle + '°</th><td>' + format(lateralForce(load, angle)) + ' N</td></tr>'
  ).join('');
  if (announce) $('#chart-update').textContent = description;
}
$('#load').addEventListener('input', () => updateCurve());
$('#load').addEventListener('change', () => updateCurve(true));
$('#reset').addEventListener('click', () => {
  $('#load').value = 800;
  updateCurve(true);
});
updateCurve();

// Use a current-location marker after following a navigation link.
const navLinks = [...document.querySelectorAll('nav a')];
navLinks.forEach((link) => link.addEventListener('click', () => {
  navLinks.forEach((item) => item.removeAttribute('aria-current'));
  link.setAttribute('aria-current', 'location');
}));
$('#year').textContent = new Date().getFullYear();
