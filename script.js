// ========== LOADER ==========
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loader-pct');
const loaderFill = document.getElementById('loader-fill');
let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.random() * 12 + 4;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);
    setTimeout(() => loader.classList.add('hidden'), 500);
  }
  loaderPct.textContent = Math.floor(progress) + '%';
  loaderFill.style.width = progress + '%';
}, 180);

// ========== NAV DATE ==========
const navDate = document.getElementById('nav-date');
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const now = new Date();
navDate.textContent = '█ ' + days[now.getDay()] + ', ' + (now.getMonth()+1) + '/' + now.getDate() + '/' + now.getFullYear();

// ========== NAV TOGGLE (mobile) ==========
const navToggle = document.getElementById('nav-toggle');
const navPills = document.getElementById('nav-pills');
navToggle.addEventListener('click', () => navPills.classList.toggle('open'));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); navPills.classList.remove('open'); }
  });
});

// ========== TERMINAL ==========
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

const cmds = {
  help: `Available commands:
  about     — who am I
  skills    — my tech stack
  projects  — what I've built
  contact   — how to reach me
  hackathons — competitions
  clear     — clear terminal
  echo <msg> — echo text back
  date      — current date
  sudo      — try it ;)
  game      — number guessing game`,

  about: `> Harshwardhan Sharma
  Backend Developer | B.Tech CSE @ AITR Indore (2023-2027)
  Building products with Python, Flask, Docker & AI.
  15 repos | 6+ projects | 5+ hackathons | Always shipping.`,

  skills: `> Languages:  Python, C++, JavaScript, SQL
  Backend:    Flask, Django, REST APIs, Microservices
  Frontend:   React, HTML5, CSS3, Jinja2
  Databases:  PostgreSQL, MySQL, SQLite
  DevOps:     Docker, Git, Linux, Postman
  AI:         Google Gemini Integration`,

  projects: `> 01. Vyapar-AI       — Flask + Gemini AI + Docker + PostgreSQL
  02. Placement Tracker — React + Node.js + PostgreSQL
  03. AI Study Planner  — Gemini AI + PDF parsing
  04. NextDegree        — AI study abroad platform
  05. Gap2Growth        — Flask timetable gap finder
  06. Taskflow          — Django task manager (deployed)`,

  contact: `> Email:    Harshwardhans279@gmail.com
  GitHub:   github.com/Harshwardhans-hub
  LinkedIn: linkedin.com/in/harshwardhan-sharma-a15808312`,

  hackathons: `> DAVV Indore Hackathon — 2026
  Symbiosis Skill Hackathon — 2026
  HackIndore 3.0 — 2026
  Smart India Hackathon — Institute Level
  MongoDB Hack Day — 2026`,

  sudo: `> Nice try! You don't have root access 😄
  But seriously, feel free to explore with "help"`,

  date: '> ' + new Date().toString(),
};

let gameActive = false;
let gameNumber = 0;
let gameAttempts = 0;

function handleTerminal(cmd) {
  if (!cmd) return;

  const aliases = {
    'who am i': 'about',
    'my tech stack': 'skills',
    "what i've built": 'projects',
    'what i have built': 'projects',
    'how to reach me': 'contact',
    'competitions': 'hackathons',
    'clear terminal': 'clear',
    'current date': 'date',
    'number guessing game': 'game'
  };
  let resolvedCmd = aliases[cmd] || cmd;

  // Fallback: If exact match isn't a command, try matching the first word 
  // (handles cases where user copy-pastes "skills - my tech stack")
  if (!cmds[resolvedCmd] && resolvedCmd !== 'clear' && resolvedCmd !== 'game' && !resolvedCmd.startsWith('echo ')) {
    const firstWord = resolvedCmd.split(/[\s-]/)[0].trim();
    if (cmds[firstWord] || firstWord === 'clear' || firstWord === 'game' || firstWord === 'echo') {
      resolvedCmd = firstWord;
    }
  }

  cmd = resolvedCmd;
  // Game mode
  if (gameActive) {
    const guess = parseInt(cmd);
    if (isNaN(guess)) {
      return '> Please enter a number between 1-10';
    }
    gameAttempts++;
    if (guess === gameNumber) {
      gameActive = false;
      return `> 🎉 Correct! The number was ${gameNumber}. You got it in ${gameAttempts} attempts!`;
    } else if (guess < gameNumber) {
      return '> Too low! Try again.';
    } else {
      return '> Too high! Try again.';
    }
  }

  if (cmd === 'clear') {
    termOutput.textContent = '';
    return null;
  }

  if (cmd.startsWith('echo ')) {
    return '> ' + cmd.slice(5);
  }

  if (cmd === 'game') {
    gameActive = true;
    gameNumber = Math.floor(Math.random() * 10) + 1;
    gameAttempts = 0;
    return '> 🎮 Guess a number between 1 and 10!';
  }

  const response = cmds[cmd];
  if (response) return response;
  return `> Command not found: "${cmd}". Type "help" for available commands.`;
}

termInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const cmd = this.value.trim().toLowerCase();
    this.value = '';
    const result = handleTerminal(cmd);
    if (result !== null) {
      termOutput.textContent += (termOutput.textContent ? '\n' : '') + '$ ' + cmd + '\n' + result + '\n';
    }
    termOutput.scrollTop = termOutput.scrollHeight;
  }
});

// ========== ACCORDIONS ==========
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    const body = document.getElementById('body-' + target);
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open');
    btn.textContent = isOpen ? 'OPEN' : 'CLOSE';
  });
});

// ========== CONTACT MODAL ==========
const modal = document.getElementById('contact-modal');
const contactBtn = document.getElementById('contact-btn');
const navContactBtn = document.getElementById('nav-contact-btn');
const modalClose = document.getElementById('modal-close');

function openModal() { modal.classList.add('show'); }
function closeModal() { modal.classList.remove('show'); }

contactBtn.addEventListener('click', openModal);
navContactBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ========== DOODLE CANVAS ==========
const canvas = document.getElementById('doodle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let color = '#ffffff';
  let lastX = 0, lastY = 0;

  function resizeCanvas() {
    const wrap = canvas.parentElement;
    const rect = wrap.getBoundingClientRect();
    canvas.width = rect.width - 28;
    canvas.height = Math.max(280, rect.height - 80);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }
  function startDraw(e) { drawing = true; const p = getPos(e); lastX = p.x; lastY = p.y; }
  function draw(e) {
    if (!drawing) return; e.preventDefault();
    const p = getPos(e);
    ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
    lastX = p.x; lastY = p.y;
  }
  function stopDraw() { drawing = false; }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);

  document.querySelectorAll('.chalk-btn[data-color]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chalk-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      color = btn.getAttribute('data-color');
    });
  });

  document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
}
