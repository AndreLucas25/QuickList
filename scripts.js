const input = document.querySelector("#novo-item")
const button = document.querySelector(".add-button")
const elementList = document.querySelector(".element-list")
const alerta = document.querySelector("#alerta")
const btnLimpar = document.querySelector(".btnChild")

let items = JSON.parse(localStorage.getItem("items")) || []

// função para salvar no localStorage
function salvarItems() {
  localStorage.setItem("items", JSON.stringify(items))
}

// função para criar item na tela
function criarItem(item) {
  const element = document.createElement("div")
  element.classList.add("element")

  element.innerHTML = `
    <div>
      <input type="checkbox" id="${item.id}" name="item">
      <label for="${item.id}">${item.nome}</label>
    </div>

    <span>
      <img src="imagens/lixeira.svg" alt="">
    </span>
  `

  const checkbox = element.querySelector("input")
  const label = element.querySelector("label")

  checkbox.checked = item.checked

  if (item.checked) {
    label.style.textDecoration = "line-through"
  }

  checkbox.addEventListener("change", () => {
    item.checked = checkbox.checked

    if (checkbox.checked) {
      label.style.textDecoration = "line-through"
    } else {
      label.style.textDecoration = "none"
    }

    salvarItems()
  })

  elementList.append(element)
}

function ativarBtnLimpar(){
  if (items.length > 3){
    btnLimpar.classList.remove("btnOff")
  } else{
     btnLimpar.classList.add("btnOff")
  }
}

btnLimpar.addEventListener("click", () => {
  items = []
  salvarItems()

  elementList.innerHTML = ""
  mostrarAlerta("Lista Limpa")
})


// mostrar itens salvos quando a página abrir
items.forEach((item) => {
  criarItem(item)
})
ativarBtnLimpar()

button.addEventListener("click", (event) => {
  event.preventDefault()

  if (input.value.trim() === "") {
    alert("Digite algo")
    return
  }

  const item = {
    id: crypto.randomUUID(),
    nome: input.value,
    checked: false
  }

  items.push(item)
  salvarItems()
  criarItem(item)
  ativarBtnLimpar()

  input.value = ""
})

// Função para mostrar mensagem de remoção
function mostrarAlerta(mensagem) {
  alerta.textContent = mensagem
  alerta.classList.add("mostrar")

  setTimeout(() => {
    alerta.classList.remove("mostrar")
  }, 2000)
}

// Função para capturar click no botão de remoção
elementList.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {

    const element = event.target.closest(".element")

    const id = element.querySelector("input").id

    items = items.filter((i) => i.id !== id)

    salvarItems()

    element.remove()
    ativarBtnLimpar()
    mostrarAlerta("O item foi removido da lista")
  }
})
