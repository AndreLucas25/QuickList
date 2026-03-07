const input = document.querySelector("#novo-item")
const button = document.querySelector(".add-button")
const elementList = document.querySelector(".element-list")
const alerta = document.querySelector("#alerta")

button.addEventListener("click", (event) => {
  event.preventDefault()

  if (input.value === ""){
    alert("Digite algo")
    return
  }

  const item = input.value.trim()


  const element = document.createElement("div")
  element.classList.add("element")
  element.innerHTML = `
    <div>
      <input type="checkbox" id="${item}" name="item">
      <label for="${item}">${item}</label>
    </div>

      <span>
        <img src="imagens/lixeira.svg" alt="">
      </span>
  `;

  elementList.append(element)

  input.value = ""
})

function mostrarAlerta(mensagem){
  alerta.textContent = mensagem
  alerta.classList.add("mostrar")

  setTimeout(() => {
    alerta.classList.remove("mostrar")
  }, 2000)
}

elementList.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG"){
      event.target.closest(".element").remove()

      mostrarAlerta("O item foi removido da lista")
  }
})
