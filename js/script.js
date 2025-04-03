const btnMovel = document.getElementById("btnMovel");
const distanciaFuga = 100; 
const suavidade = 0.1; 
const intensidadeFuga = 100; 

let alvoX = window.innerWidth / 2;
let alvoY = window.innerHeight / 2 - 47;
let posX = alvoX;
let posY = alvoY;

btnMovel.style.position = "fixed";
btnMovel.style.left = `${posX}px`;
btnMovel.style.top = `${posY}px`;

function calcularDistancia(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function atualizarPosicao() {
  posX += (alvoX - posX) * suavidade;
  posY += (alvoY - posY) * suavidade;

  btnMovel.style.left = `${posX}px`;
  btnMovel.style.top = `${posY}px`;

  requestAnimationFrame(atualizarPosicao);
}

function moverBotao(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const btnRect = btnMovel.getBoundingClientRect();
  const btnX = btnRect.left + btnRect.width / 2;
  const btnY = btnRect.top + btnRect.height / 2;

  const distancia = calcularDistancia(mouseX, mouseY, btnX, btnY);

  if (distancia < distanciaFuga) {
    const angulo = Math.atan2(btnY - mouseY, btnX - mouseX);

    alvoX += Math.cos(angulo) * (intensidadeFuga * 0.2);
    alvoY += Math.sin(angulo) * (intensidadeFuga * 0.2);

    alvoX = Math.max(10, Math.min(window.innerWidth - btnRect.width - 10, alvoX));
    alvoY = Math.max(10, Math.min(window.innerHeight - btnRect.height - 10, alvoY));
  }
}

atualizarPosicao();

document.addEventListener("mousemove", moverBotao);
