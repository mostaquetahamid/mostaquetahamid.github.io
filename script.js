'use strict';

const stories = {
  nasa: {
    category: 'NASA JOHNSON SPACE CENTER / 2026',
    title: 'Help good knowledge travel.',
    summary: 'I helped make information easier to find, share, and put to work at NASA.',
    detail: 'My IT internship brought together knowledge management, software request tracking, and AI compliance tools. I learned that a useful system starts with understanding the people who rely on it.',
    image: 'assets/portrait-nasa-1600.webp',
    alt: 'Mostaque at NASA Johnson Space Center',
    stats: [['3,000+', 'Knowledge hub views'], ['90%', 'Faster software request delivery'], ['55%', 'Growth in tool adoption']],
    note: 'Separate outcomes across three initiatives during my January to May 2026 internship.'
  },
  bp: {
    category: 'BP / PROCUREMENT / SUMMER 2026',
    title: 'Look closer. Find a better way.',
    summary: 'I connected contract details, logistics data, and supplier conversations to uncover value and improve performance.',
    detail: 'From recovering medevac costs to making trucking performance more visible, my focus was making the analysis useful to the people making decisions.',
    stats: [['$213K+', 'Medevac costs recovered'], ['$142K', 'Annual logistics savings'], ['41,517', 'Trucking loads analyzed']],
    note: 'Procurement internship at bp · May to August 2026.'
  },
  amazon: {
    category: 'AMAZON / AREA MANAGER INTERN / SUMMER 2025',
    title: 'Good operations start with people.',
    summary: 'At Amazon’s GYR2 site, I learned to lead on the floor, listen to the team, and improve how work moves.',
    detail: 'I worked with 60+ associates on workflow, safety, and equipment integration. The experience taught me how small changes can make a meaningful difference at scale.',
    image: 'assets/amazon-gyr2-1600.webp',
    alt: 'Mostaque at Amazon’s GYR2 site',
    imageClass: 'amazon-story',
    stats: [['60+', 'Associates led'], ['18%', 'Higher throughput'], ['10%', 'Fewer peak delays']],
    note: 'Area Manager internship in the Phoenix area · May to July 2025.'
  },
  schneider: {
    category: 'SCHNEIDER ELECTRIC / BUSINESS DEVELOPMENT / 2026',
    title: 'Explore what could come next.',
    summary: 'I’m helping connect emerging technologies with real business opportunities in energy, infrastructure, and AI.',
    detail: 'My work spans market research, physical AI, engineering simulation, and potential partnerships. I enjoy turning an early idea into a focused conversation about what is possible.',
    stats: [['23+', 'Companies researched'], ['Energy', 'Utilities & AI data centers'], ['People', 'Partnerships & new possibilities']],
    note: 'Business Development and Innovation internship · Fall 2026.'
  },
  macromap: {
    category: 'PERSONAL PROJECT / ENTREPRENEURSHIP',
    title: 'An everyday problem. A new possibility.',
    summary: 'MacroMap helps students explore meals that fit their goals, budget, and day.',
    detail: 'I shaped the concept in my entrepreneurship class, then used AI assistance to bring it into a working prototype. You can filter meals, compare options, save favorites, and explore different Houston areas.',
    image: 'assets/macromap-preview.jpg',
    alt: 'MacroMap meal discovery prototype',
    imageClass: 'macro-story',
    link: ['Try MacroMap', 'https://mostaquetahamid.github.io/macromap/'],
    note: 'An interactive class prototype built with AI assistance. Restaurant details, nutrition, prices, and distances are fictional sample data.'
  },
  community: {
    category: 'LEADERSHIP / COMMUNITY',
    title: 'Make the opportunity bigger than yourself.',
    summary: 'I helped build Cougar Product at UH, a place for students to connect around technology, design, and business.',
    detail: 'As Co Founder and Vice President, I’ve mentored students, helped bring industry partners into the community, and supported the organization’s finances. Giving back also includes fundraising for Star of Hope, volunteering at Houston Food Bank and a local homeless shelter, and leading inclusive cultural events with Kerr Desi Club.',
    stats: [['500+', 'Cougar Product members'], ['$3,000+', 'Raised for Star of Hope'], ['MLT', 'Career Prep Fellow']],
    note: 'Also involved with ABSA and MISSO at UH. Earlier leadership includes Kerr Fitness Club, Student Council, and Varsity Chorale.'
  }
};

const career = [
  ['Schneider Electric', 'Business Development & Innovation Intern', 'Fall 2026', 'Exploring growth opportunities across energy, AI, and emerging technology.'],
  ['bp', 'Procurement Intern', 'Summer 2026', 'Using data and supplier relationships to recover value and improve logistics.'],
  ['NASA Johnson Space Center', 'IT Intern · Knowledge Management', 'Spring 2026', 'Building tools that help people find information and work more effectively.'],
  ['SEKCO', 'Business Development Intern', '2025 to 2026', 'Supporting business growth through driver onboarding, retention, and operational improvements.'],
  ['DoorDash', 'Campus Launcher · University of Houston', '2025 to 2026', 'Connecting with students through campus outreach and marketing.'],
  ['Enterprise Mobility', 'Management Trainee Intern', 'Fall 2025', 'Working across customer relationships, sales, and branch operations.'],
  ['Amazon', 'Area Manager Intern', 'Summer 2025', 'Leading teams and improving everyday fulfillment workflows.'],
  ['The Home Depot', 'Electrical Sales Associate', '2023 to 2025', 'Helping customers find practical answers to their project needs.'],
  ['Netbrands Media Corp', 'Production & quality experience', 'Early career', 'Building attention to detail through quality control and equipment maintenance.'],
  ['Macquarie Group', 'Commodities & Global Markets Extern', 'Fall 2024', 'Exploring the connections between clean energy, finance, and supply chain.'],
  ['Shell Ethics Case Competition', 'Research Lead', 'Spring 2025', 'Researching ethical influencer marketing and consumer trust.']
];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
try { if (localStorage.getItem('mostaque-motion') === 'paused') paused = true; } catch (error) {}
const motionButton = document.querySelector('.motion-toggle');
const revealElements = Array.from(document.querySelectorAll('.reveal'));
let motionFrame = null;
let phoneMode = window.innerWidth <= 700;
const portraitRail = document.querySelector('#portrait-rail');
const portraitCards = Array.from(portraitRail.querySelectorAll('.portrait-card'));
const progress = document.querySelector('.reading-progress span');
const scenicSection = document.querySelector('.scenic-section');
const scenicImages = document.querySelector('.scenic-images');

function requestMotionFrame() {
  if (motionFrame !== null) return;
  motionFrame = requestAnimationFrame(updateScrollMotion);
}
function updateScrollMotion() {
  motionFrame = null;
  const height = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - height;
  progress.style.transform = 'scaleX(' + (documentHeight > 0 ? Math.min(1, window.scrollY / documentHeight) : 0) + ')';
  if (paused) {
    portraitCards.forEach(function (card) { card.style.removeProperty('--portrait-y'); });
    scenicImages.style.removeProperty('--scenic-y');
    return;
  }
  if (!phoneMode && window.scrollY < height * 1.5) {
    const amount = Math.min(window.scrollY * .065, 45);
    portraitCards[0].style.setProperty('--portrait-y', (10 - amount) + 'px');
    portraitCards[1].style.setProperty('--portrait-y', (amount * .25) + 'px');
    portraitCards[2].style.setProperty('--portrait-y', (10 - amount * .7) + 'px');
  }
  const rect = scenicSection.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < height) {
    const offset = (rect.top + rect.height / 2 - height / 2) * -.055;
    scenicImages.style.setProperty('--scenic-y', Math.max(-28, Math.min(28, offset)) + 'px');
  }
}
function applyMotionPreference() {
  document.body.classList.toggle('motion-enabled', !paused);
  document.body.classList.toggle('motion-paused', paused);
  document.documentElement.style.scrollBehavior = paused ? 'auto' : '';
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.querySelector('.motion-label').textContent = paused ? 'Motion paused' : 'Pause motion';
  motionButton.querySelector('.motion-glyph').textContent = paused ? '▶' : 'Ⅱ';
  motionButton.setAttribute('aria-label', paused ? 'Resume animations' : 'Pause animations');
  if (paused) revealElements.forEach(function (element) { element.classList.remove('pending'); });
  requestMotionFrame();
}
motionButton.addEventListener('click', function () {
  paused = !paused;
  try { localStorage.setItem('mostaque-motion', paused ? 'paused' : 'enabled'); } catch (error) {}
  applyMotionPreference();
});
reducedMotion.addEventListener('change', function (event) { paused = event.matches; applyMotionPreference(); });
applyMotionPreference();
window.addEventListener('scroll', requestMotionFrame, { passive: true });

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .09, rootMargin: '0px 0px 35px 0px' });
  revealElements.forEach(function (element) {
    if (!paused && element.getBoundingClientRect().top > window.innerHeight * .85) element.classList.add('pending');
    revealObserver.observe(element);
  });
}

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); }
menuButton.addEventListener('click', function () {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });

const portraitDots = Array.from(document.querySelectorAll('[data-portrait]'));
function showPortrait(index, instant) {
  const card = portraitCards[index];
  const left = card.offsetLeft - portraitRail.offsetLeft - (portraitRail.clientWidth - card.offsetWidth) / 2;
  portraitRail.scrollTo({ left: left, behavior: instant || paused ? 'instant' : 'smooth' });
}
portraitDots.forEach(function (button) { button.addEventListener('click', function () { showPortrait(Number(button.dataset.portrait), false); }); });
if (phoneMode) showPortrait(1, true);
let railFrame = null;
portraitRail.addEventListener('scroll', function () {
  if (railFrame !== null) return;
  railFrame = requestAnimationFrame(function () {
    railFrame = null;
    const center = portraitRail.scrollLeft + portraitRail.clientWidth / 2;
    let selected = 0;
    let distance = Infinity;
    portraitCards.forEach(function (card, index) {
      const cardCenter = card.offsetLeft - portraitRail.offsetLeft + card.offsetWidth / 2;
      const difference = Math.abs(cardCenter - center);
      if (difference < distance) { distance = difference; selected = index; }
    });
    portraitDots.forEach(function (button, index) {
      button.classList.toggle('active', index === selected);
      button.setAttribute('aria-pressed', String(index === selected));
    });
  });
}, { passive: true });
window.addEventListener('resize', function () {
  if (window.innerWidth > 700) closeMenu();
  const nextPhoneMode = window.innerWidth <= 700;
  if (nextPhoneMode && !phoneMode) showPortrait(1, true);
  phoneMode = nextPhoneMode;
  requestMotionFrame();
}, { passive: true });

let scene = 0;
const sceneImages = Array.from(document.querySelectorAll('[data-landscape]'));
const sceneButtons = Array.from(document.querySelectorAll('[data-scene]'));
function showScene(index) {
  scene = index;
  sceneImages.forEach(function (image, position) { image.classList.toggle('active', position === scene); image.setAttribute('aria-hidden', String(position !== scene)); });
  sceneButtons.forEach(function (button, position) { button.classList.toggle('active', position === scene); button.setAttribute('aria-pressed', String(position === scene)); });
  document.querySelector('#scenic-count').textContent = scene === 0 ? '01 / 02' : '02 / 02';
}
sceneButtons.forEach(function (button) { button.addEventListener('click', function () { showScene(Number(button.dataset.scene)); }); });
document.querySelector('.scene-next').addEventListener('click', function () { showScene((scene + 1) % sceneImages.length); });

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      const element = entry.target;
      const target = Number(element.dataset.count);
      const started = performance.now();
      if (paused) return;
      function tick(now) {
        if (paused) { element.textContent = String(target); return; }
        const fraction = Math.min((now - started) / 1100, 1);
        element.textContent = String(Math.round(target * (1 - Math.pow(1 - fraction, 3))));
        if (fraction < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: .8 });
  document.querySelectorAll('[data-count]').forEach(function (counter) { counterObserver.observe(counter); });
}

const dialog = document.querySelector('#story-dialog');
let previousFocus = null;
function makeElement(tag, content, className) {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  if (className) element.className = className;
  return element;
}
function openStory(key, trigger) {
  const story = key === 'journey' ? { category: 'THE JOURNEY SO FAR', title: 'Always something to learn.', summary: 'A few chapters across business, technology, operations, and people.' } : stories[key];
  if (!story) return;
  const container = document.querySelector('#story-content');
  container.replaceChildren();
  if (story.image) {
    const hero = makeElement('div', '', 'story-hero ' + (story.imageClass || ''));
    const image = makeElement('img');
    image.src = story.image;
    image.alt = story.alt;
    hero.append(image);
    container.append(hero);
  }
  const main = makeElement('div', '', 'story-main');
  const title = makeElement('h2', story.title, 'story-title');
  title.id = 'story-title';
  main.append(makeElement('p', story.category, 'eyebrow'), title, makeElement('p', story.summary, 'story-summary'));
  if (story.detail) main.append(makeElement('p', story.detail, 'story-detail'));
  if (story.stats) {
    const stats = makeElement('div', '', 'story-stats');
    story.stats.forEach(function (stat) { const item = makeElement('div'); item.append(makeElement('strong', stat[0]), makeElement('small', stat[1])); stats.append(item); });
    main.append(stats);
  }
  if (key === 'journey') {
    const list = makeElement('div', '', 'career-list');
    career.forEach(function (job) {
      const row = makeElement('article', '', 'career-row');
      const copy = makeElement('div');
      copy.append(makeElement('h3', job[0]), makeElement('p', job[1], 'career-role'), makeElement('p', job[3]));
      row.append(copy, makeElement('span', job[2]));
      list.append(row);
    });
    main.append(list);
  }
  if (story.link) {
    const link = makeElement('a', story.link[0] + ' ↗', 'pill pill-dark');
    link.href = story.link[1];link.target = '_blank';link.rel = 'noopener noreferrer';
    main.append(link);
  }
  if (story.note) main.append(makeElement('p', story.note, 'story-footer'));
  container.append(main);
  previousFocus = trigger;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('body-modal');
}
document.querySelectorAll('[data-story]').forEach(function (button) { button.addEventListener('click', function () { openStory(button.dataset.story, button); }); });
document.querySelector('.dialog-close').addEventListener('click', function () { dialog.close(); });
dialog.addEventListener('click', function (event) {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', function () { document.body.classList.remove('body-modal'); if (previousFocus) previousFocus.focus({ preventScroll: true }); });

document.querySelector('#copy-email').addEventListener('click', async function () {
  try { await navigator.clipboard.writeText('mostaquetahamid@gmail.com'); document.querySelector('#copy-status').textContent = 'Email copied. Say hello when you’re ready.'; }
  catch (error) { document.querySelector('#copy-status').textContent = 'mostaquetahamid@gmail.com'; }
});

if ('IntersectionObserver' in window) {
  const navLinks = Array.from(navigation.querySelectorAll('a'));
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
  ['home', 'work', 'journey', 'about', 'contact'].forEach(function (id) { sectionObserver.observe(document.getElementById(id)); });
}

