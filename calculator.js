// --- BACKGROUND CANVAS PARTICLES ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let lastMoveTime = Date.now();

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 2 + 1
  });
}

function drawParticles() {
  const now = Date.now();
  const mouseMoving = now - lastMoveTime < 200;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    const speed = mouseMoving ? 1.5 : 1;
    p.x += p.vx * speed;
    p.y += p.vy * speed;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = mouseMoving ? '#c49a6ccc' : '#c49a6c22';
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const mouseDist = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
        const opacity = (1 - mouseDist / 400) * (mouseMoving ? 1.2 : 1);
        if (opacity > 0) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 160, 90, ${Math.min(opacity, 1)})`;
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  lastMoveTime = Date.now();
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// --- CARD 3D TILT BASED ON CURSOR POSITION ---
const cards = document.querySelectorAll('.card');
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCardTilt() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const offsetX = (mouseX / winW - 0.5) * 2;
  const offsetY = (mouseY / winH - 0.5) * 2;

  cards.forEach(card => {
    const isHover = card.matches(':hover');
    const multiplier = isHover ? 35 : 18;

    card.style.transform = `
      perspective(1000px)
      rotateX(${ -offsetY * multiplier }deg)
      rotateY(${ offsetX * multiplier }deg)
      translateZ(${isHover ? 40 : 20}px)
    `;
  });

  requestAnimationFrame(animateCardTilt);
}
animateCardTilt();

// --- TITLE FLOAT EFFECT (Gentle Autonomous Motion) ---
const title = document.getElementById('floating-title');
let angle = 0;

function animateTitleFloat() {
  angle += 0.0125;

  const rotateX = Math.sin(angle) * 6;
  const rotateY = Math.cos(angle / 2) * 6;
  const translateZ = 15 + Math.sin(angle * 1.5) * 6;

  title.style.transform = `
    perspective(800px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(${translateZ}px)
  `;

  requestAnimationFrame(animateTitleFloat);
}
animateTitleFloat();
