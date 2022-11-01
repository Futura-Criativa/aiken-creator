let form = document.querySelector("#qtForm");
let qtList = document.getElementById('templates');
let deleteButtons;
let qtInfo = [];
let inputText = document.querySelector("[type=text]");
let validacao = document.querySelectorAll('.needs-validation');
let addQt = document.getElementById('addQt');
let clearCache = document.getElementById('clearCache');

// Limpa o cache de questões
//window.localStorage.clear();
if (window.localStorage.getItem("templates")) {
    qtInfo = JSON.parse(localStorage.getItem("templates") || "[]");
}

// Funções

// Adicionando Itens
function addQuestion(title) {
    let qt = {
        id: Date.now(),
        title: title,
    };

    qtInfo.push(qt);

    window.localStorage.setItem("templates", JSON.stringify(qtInfo));

    addItemList(qt);
}

// Listando quantidade de Itens
function totalQtItem() {
    var totalItem = $(".item-list").length;
    if (totalItem >= 1) {
        $(".total-list").html(totalItem);
    } else {
        $(".total-list").html("0");
    }
}

// Removendo Itens
function deleteQuestion(qt) {
    qtInfo.forEach((e, index) => {
        if (e.title === qt.firstChild.textContent) {
            qtInfo.splice(index, 1);
        }
    });
    window.localStorage.setItem("templates", JSON.stringify(qtInfo));
    qt.remove();
    totalQtItem();
}

function addItemList(qt) {

    // Define os elementos HTML a serem criados
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let div = document.createElement('div');
    let h6 = document.createElement('h6');
    let small = document.createElement('small');
    let span = document.createElement('span');
    let input0 = document.createElement('input');
    let button = document.createElement('button');
    let icon = document.createElement('i');

    //Define as classes, Ids e conteúdos de texto dos elementos
    ul.classList.add('list-group', 'mb-3', 'item-list')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm')
    h6.classList.add('my-0');
    small.classList.add('text-muted', 'description');
    span.classList.add('text-muted');
    button.classList.add('delete');
    icon.classList.add('bi', 'bi-trash3');
    button.addEventListener('click', (e) => {
        deleteQuestion(e.target.parentElement.parentElement);
    });
    h6.textContent = 'Questão';
    small.textContent = (qt.title).substring(0, 30) + '...';
    button.setAttribute('data-toggle', 'tooltip');
    button.setAttribute('data-placement', 'bottom');
    button.setAttribute('title', 'Excluir item');

    // Enumera as questões
    var qtNumCount = $(".item-list").length;
    var qtNum = qtNumCount + 1;
    span.textContent = "n° " + qtNum;

    // Cria os elementos HTML definidos
    ul.append(li, button);
    li.append(div);
    div.append(h6);
    div.append(small);
    li.append(span);
    li.append(input0);
    button.append(icon);
    qtList.append(ul);

    // Oculta os inputs da lista
    var inputAll = document.querySelectorAll('#templates input');
    for (var i = 0; i < inputAll.length; i++) {
        inputAll[i].setAttribute('type', 'hidden');
    }

    // Adiciona IDs sequenciais
    var idAnswer = document.querySelectorAll('#templates input');
    for (var i = 0; i < idAnswer.length; i++) {
        idAnswer[i].setAttribute('id', 'answer-' + i);
    }

    addItemQt();
}

function itemArray() {
    itemInput = document.querySelectorAll('input').value;
    qtItems.push(itemInputs);
    console.log(qtItems);
}

function addItemQt() {

    // Obtém o texto do enunciado
    let answer = document.getElementById('answer0').value;

    //Remove quebra de linha
    const answer0 = answer.replace(/(\r\n|\n|\r)/gm, ' ');

    // Obtém os valores das respostas
    let answer1 = document.getElementById('answer1').value;
    let answer2 = document.getElementById('answer2').value;
    let answer3 = document.getElementById('answer3').value;
    let answer4 = document.getElementById('answer4').value;
    let answer5 = document.getElementById('answer5').value;

    // Obtém os IDs dos últim0s inputs

    var qtItemList = document.querySelectorAll('#templates input').length;

    let ordem0 = qtItemList - 1;

    // Obtém os valores do input que irá receber os valores
    let inputQt0 = document.getElementById('answer-' + ordem0).value;

    // Concatena os dois valores e adiciona ao input
    let itemQuestao = 
        '\r\nQuestão: ' +
        inputQt0 + answer0 + 
        '\r\nA. ' + answer1 + 
        '\r\nB. ' + answer2 + 
        '\r\nC. ' + answer3 + 
        '\r\nD. ' + answer4 + 
        '\r\nE. ' + answer5 +
        '\r\nANSWER: A';

    // Define os valores dos inputs
    document.getElementById('answer-' + ordem0).value = itemQuestao;

    totalQtItem();

    // Limpa o formulário de questões
    $('form :input').val('');

    // Devolve o valor dos botões/input
    $('#addQt').val('Adicionar questão');
    $('#btnExport').val('Exportar');

}

// Válida formulário e inicia
(function() {
    'use strict'

    Array.prototype.slice.call(validacao)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault()
                let qtValue = document.querySelector('#answer0');

                if (!form.checkValidity()) {
                    event.stopPropagation()
                    form.classList.add('was-validated')
                } else {
                    addQuestion(qtValue.value)
                    form.classList.remove('was-validated')
                }
            }, false)
        })
})()

// Imprime os itens da lista
if (window.localStorage.getItem("templates")) {
    console.log(qtInfo.length);
    for (let i = 0, size = qtInfo.length; i < size; i++) {
        addItemList(qtInfo[i]);
    }
}
// Deleta os itens da lista
deleteButtons = document.querySelectorAll("button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        deleteQuestion(e.target.parentNode.parentElement);
        totalQtItem();
    });
});

// Limpa o cache local

clearCache.addEventListener('click', () => {
    window.localStorage.clear();
    location.reload();
});