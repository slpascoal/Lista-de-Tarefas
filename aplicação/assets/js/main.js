const inputTarefa = document.querySelector('.input-tarefa')
const btnAdicionar = document.querySelector('.btn-adicionar')
const lista = document.querySelector('.lista')

function botaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'Apagar Tarefa'
    li.appendChild(botaoApagar)
    botaoApagar.setAttribute('class', 'apagar')
}

function criarTarefa(tarefa){
    const li = document.createElement('li')
    li.innerText = tarefa
    lista.appendChild(li)
    botaoApagar(li)
    salvarTarefa()
}

function limparTarefa(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function salvarTarefa(){
    const tarefas = lista.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of tarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar Tarefa', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa)
    }
}

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if (!inputTarefa.value) return
        criarTarefa(inputTarefa.value)
        limparTarefa()
    }
})

btnAdicionar.addEventListener('click', function(e){
    if (!inputTarefa.value) return
    criarTarefa(inputTarefa.value)
    limparTarefa()    
})

document.addEventListener('click', function(e){
    const el = e.target

    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefa()
    }
})

adicionaTarefasSalvas()