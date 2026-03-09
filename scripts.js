const input = document.querySelector("#novo-item")
const button = document.querySelector(".add-button")
const elementList = document.querySelector(".element-list")
const alerta = document.querySelector("#alerta")

let items = JSON.parse(localStorage.getItem("items")) || []

// função para salvar no localStorage
function salvarItems(){
  localStorage.setItem("items", JSON.stringify(items))
}

// função para criar item na tela
function criarItem(item){
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
  `

  elementList.append(element)
}

// mostrar itens salvos quando a página abrir
items.forEach((item) => {
  criarItem(item)
})

button.addEventListener("click", (event) => {
  event.preventDefault()

  if (input.value.trim() === ""){
    alert("Digite algo")
    return
  }

  const item = input.value.trim()

  criarItem(item)

  items.push(item)

  salvarItems()

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

      const element = event.target.closest(".element")

      const texto = element.querySelector("label").textContent

      items = items.filter((i) => i !== texto)

      salvarItems()

      element.remove()

      mostrarAlerta("O item foi removido da lista")
  }
})
