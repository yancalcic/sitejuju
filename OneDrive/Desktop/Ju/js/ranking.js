const lista = document.getElementById("ranking-list");
const itens = lista.querySelectorAll("li");
const botaoConfirmar = document.getElementById("confirmar");

let ordemAtual = [];

itens.forEach(item => {
  item.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.dataset.value);
    e.target.classList.add("dragging");
  });

  item.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
});

lista.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(lista, e.clientY);
  if (afterElement == null) {
    lista.appendChild(dragging);
  } else {
    lista.insertBefore(dragging, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll("li:not(.dragging)")];
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

botaoConfirmar.addEventListener("click", () => {
  const ordemCorreta = ["4", "3", "1", "2"]; 
  ordemAtual = [...lista.querySelectorAll("li")].map(item => item.dataset.value);

  if (JSON.stringify(ordemAtual) === JSON.stringify(ordemCorreta)) {
    window.location.href = "desafio_5.html";
  } else {
    window.location.href = "fracasso_4.html";
  }
});
