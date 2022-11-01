let btnExport = document.getElementById('btnExport')

btnExport.addEventListener('click', function(event) {

    event.preventDefault()

    var getList = document.querySelectorAll('#templates input')
    var filenameCheck = document.getElementById('filename')

    if (getList.length == 0) {

        alert('Não há questões a serem exportadas')

    } else if (!filenameCheck.value) {

        alert('É necessário nomear o arquivo')

    } else {

        var qtItens = []

        for (var i = 0; i < getList.length; i++) {

            var qtItemList = getList[i].value;
            var qtFinalItens = qtItemList; 
            
            qtItens.push(qtFinalItens);            
        }
            
            //Limpa os valores da input final das questões (para evitar erro)
            document.getElementById('totalQt').value = '';
        
            // Obtém o valor do input que irá receber totas as questões
            var totalQt = document.getElementById('totalQt').value

            // Adiciona o novo valor ao input selecionado anteriormente
            document.getElementById('totalQt').value = totalQt + qtItens;

            // Obtém o valor atualizada do input
            var totalQt = document.getElementById('totalQt').value

            // Remove a vírgula após o 'A' de 'ANSWER' 
            var substituir = document.getElementById('totalQt').value;

            // Substitui pelo novo valor
            document.getElementById('totalQt').value = substituir.replace(/ANSWER: A,/g, "ANSWER: A");

            // Obtém o valor atulizado
            var totalQt = document.getElementById('totalQt').value

            //Cria o arquivo para download
            var blob = new Blob([totalQt]);
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filenameCheck.value + '.txt';
            link.click();
    }
})