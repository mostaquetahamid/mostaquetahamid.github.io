'use strict';

const caseStudies = {
  macromap: {
    category: 'PERSONAL PROJECT / ENTREPRENEURSHIP 3310',
    title: 'A simpler way to choose lunch.',
    intro: 'MacroMap started with an everyday student problem: finding a meal that fits your nutrition goals, your budget, and the time you actually have.',
    stats: [['5', 'Houston area presets'], ['3', 'Items compared at once'], ['1', 'Interactive prototype']],
    sections: [
      ['The opportunity', 'Students can spend more time searching for a suitable meal than they want to. I developed MacroMap as an entrepreneurship class concept centered on Houston students and young professionals.'],
      ['My contribution', 'I shaped the problem, target audience, business concept, and product priorities, then used AI assistance to bring the idea into a working web prototype. I focused on a clear experience that makes tradeoffs easy to see.'],
      ['What you can try', 'Filter meals and drinks by budget, calories, protein, distance, and food preferences. Compare up to three items, save favorites, build a meal, and switch between Houston area presets.'],
      ['What I learned', 'A useful product starts with a specific problem. The prototype made it possible to test the interaction and explain the idea through a live demonstration.']
    ],
    note: 'MacroMap is a class project and interactive prototype built with AI assistance. Restaurants, nutrition, prices, and distances are fictional sample data. The prototype does not place orders or imply restaurant partnerships.',
    link: ['Try the live prototype', 'https://mostaquetahamid.github.io/macromap/']
  },
  medevac: {
    category: 'BP / PROCUREMENT INTERNSHIP / SUMMER 2026',
    title: 'Finding value in the details.',
    intro: 'A medevac cost recovery initiative connected contract language, flight records, and supplier conversations to recover more than $213,000.',
    stats: [['51+', 'Cases reviewed'], ['17', 'Supplier attributable flights'], ['$213K+', 'Costs recovered']],
    sections: [
      ['The challenge', 'Determine which medevac flights were attributable to suppliers and build a clear, evidence based case for recovering the associated costs.'],
      ['My approach', 'I reviewed 51+ cases, checked flight records against contract terms, and identified 17 supplier attributable flights. I organized the findings so the team could trace the supporting evidence and engage suppliers with a consistent explanation.'],
      ['The outcome', 'The initiative recovered $213K+ through contract analysis, flight record validation, and supplier engagement.'],
      ['What stayed with me', 'Data creates more value when people can follow the reasoning. Clear documentation and constructive supplier conversations were central to moving the work forward.']
    ],
    note: 'Procurement internship at bp · May to August 2026.'
  },
  logistics: {
    category: 'BP / PROCUREMENT & LOGISTICS / SUMMER 2026',
    title: 'Turning data into better operations.',
    intro: 'Two years of trucking performance data helped make detention costs visible and supported more focused conversations with suppliers.',
    stats: [['41,517', 'Loads analyzed'], ['$284K', 'Detention charges identified'], ['$142K', 'Annual logistics savings']],
    sections: [
      ['The challenge', 'Understand where detention costs were building up across a large trucking data set, then turn those findings into something the business could act on.'],
      ['My approach', 'I analyzed two years of data across 41,517 loads and built executive dashboards using Excel and Power BI. The work identified $284K in detention charges and gave stakeholders a clearer view of performance patterns.'],
      ['The outcome', 'I led supplier corrective action initiatives that generated $142K in annual logistics savings. The dashboards helped support recurring, data informed conversations about performance.'],
      ['What stayed with me', 'A dashboard is useful when it changes a conversation or a decision. The most meaningful part was connecting the analysis to specific actions with suppliers.']
    ],
    note: 'Procurement and logistics experience at bp · May to August 2026. The card artwork is illustrative.'
  },
  nasa: {
    category: 'NASA JOHNSON SPACE CENTER / IT INTERNSHIP / 2026',
    title: 'Helping knowledge travel further.',
    intro: 'At Johnson Space Center, I worked on knowledge management, IT request tracking, and AI compliance tools that helped people access information and support.',
    stats: [['3,000+', 'Knowledge hub views'], ['90%', 'Improvement in delivery speed'], ['55%', 'Increase in tool adoption']],
    sections: [
      ['The opportunity', 'Make knowledge sharing more visible and improve the everyday systems that help people request software and work with compliance tools.'],
      ['What I built', 'I created the first SharePoint site for JSC Knowledge Management Week, developed a master tracker for IT software requests, and developed and tested Luna AI compliance tools.'],
      ['The outcome', 'The knowledge hub generated 3,000+ views. The request tracker improved delivery speed by 90%, and the Luna AI work helped increase adoption by 55%.'],
      ['What stayed with me', 'Making a tool accessible and useful is as important as building it. Information architecture, clear tracking, and adoption all shaped the outcome.']
    ],
    note: 'These are separate outcomes across three initiatives during my NASA IT internship from January to May 2026.'
  },
  shell: {
    category: 'SHELL ETHICS CASE COMPETITION / JAN TO APR 2025',
    title: 'Looking beyond the campaign.',
    intro: 'As Research Lead, I examined the ethical and compliance questions surrounding influencer marketing in the fashion industry.',
    stats: [['25+', 'Industry and regulatory sources'], ['3', 'Core areas of impact'], ['2025', 'Case competition']],
    sections: [
      ['The question', 'How can brands work with influencers while protecting consumer trust, mental health, and brand reputation?'],
      ['My contribution', 'I researched 25+ industry and regulatory sources, evaluated ethical risks, and analyzed FTC guidelines to support the team’s recommendations.'],
      ['The recommendation', 'The research informed strategies for clearer disclosures, stronger compliance, and more responsible digital campaigns.']
    ],
    note: 'Research Lead · Academic case competition · January to April 2025.'
  },
  macquarie: {
    category: 'MACQUARIE GROUP / EXTERNSHIP / SEP TO NOV 2024',
    title: 'Where finance meets the energy transition.',
    intro: 'A Commodities and Global Markets externship gave me a closer look at the connections between clean energy, supply chain, and financial strategy.',
    stats: [['15+', 'Industry reports researched'], ['6+', 'Senior leaders consulted'], ['10', 'Slides in the final synthesis']],
    sections: [
      ['The focus', 'Explore clean energy trends, sustainable financial strategies, and opportunities for sector growth.'],
      ['My contribution', 'I researched 15+ industry reports and learned from 6+ senior leaders through mentorship and program conversations.'],
      ['The output', 'I synthesized the research into a 10 slide presentation highlighting three strategic intersections of finance, supply chain, and clean energy.']
    ],
    note: 'This experience was an externship and professional learning program.'
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuToggle.addEventListener('click', function () {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', function () { if (window.innerWidth > 620) closeMenu(); });

const filters = document.querySelectorAll('[data-filter]');
const experienceItems = document.querySelectorAll('.experience-item');
filters.forEach(function (button) {
  button.addEventListener('click', function () {
    const selected = button.dataset.filter;
    filters.forEach(function (filter) {
      const active = filter === button;
      filter.setAttribute('aria-pressed', String(active));
      filter.classList.toggle('active', active);
    });
    let visible = 0;
    experienceItems.forEach(function (item) {
      const show = selected === 'all' || item.dataset.category === selected;
      item.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelector('#filter-status').textContent = 'Showing ' + visible + ' experiences';
  });
});

const dialog = document.querySelector('#case-dialog');
let returnFocus = null;
function textElement(tag, content, className) {
  const element = document.createElement(tag);
  element.textContent = content;
  if (className) element.className = className;
  return element;
}
function openCase(key, trigger) {
  const study = caseStudies[key];
  if (!study) return;
  returnFocus = trigger;
  document.querySelector('#case-category').textContent = study.category;
  const container = document.querySelector('#case-content');
  container.replaceChildren();
  const inner = document.createElement('div');
  inner.className = 'case-inner';
  const title = textElement('h2', study.title, 'dialog-title');
  title.id = 'case-title';
  inner.append(title, textElement('p', study.intro, 'case-intro'));
  const stats = document.createElement('div');
  stats.className = 'case-stats';
  study.stats.forEach(function (stat) {
    const item = document.createElement('div');
    item.append(textElement('strong', stat[0]), textElement('span', stat[1]));
    stats.append(item);
  });
  inner.append(stats);
  study.sections.forEach(function (section) {
    const item = document.createElement('section');
    item.className = 'case-section';
    item.append(textElement('h3', section[0]), textElement('p', section[1]));
    inner.append(item);
  });
  if (study.link) {
    const link = textElement('a', study.link[0] + ' ↗', 'button button-dark case-link');
    link.href = study.link[1];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    inner.append(link);
  }
  inner.append(textElement('p', study.note, 'case-note'));
  container.append(inner);
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('body-modal');
}
document.querySelectorAll('[data-case]').forEach(function (button) {
  button.addEventListener('click', function () { openCase(button.dataset.case, button); });
});
function closeCase() { dialog.close(); }
document.querySelectorAll('.close-dialog, .close-case').forEach(function (button) { button.addEventListener('click', closeCase); });
dialog.addEventListener('click', function (event) {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCase();
});
dialog.addEventListener('close', function () {
  document.body.classList.remove('body-modal');
  if (returnFocus) returnFocus.focus({ preventScroll: true });
});

document.querySelector('#copy-email').addEventListener('click', async function () {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('mostaquetahamid@gmail.com');
    status.textContent = 'Email copied. Talk soon!';
  } catch (error) {
    status.textContent = 'mostaquetahamid@gmail.com';
  }
});

if ('IntersectionObserver' in window) {
  const navigationLinks = Array.from(navigation.querySelectorAll('a'));
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(function (link) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  ['work', 'experience', 'about', 'contact'].forEach(function (id) { observer.observe(document.getElementById(id)); });
}
