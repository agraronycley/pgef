var modalMyLoading,
    autoClose = false;

function MensagemAlerta(titulo, mensagem, fechar) {

    autoClose = fechar;

    modalMyLoading = FLUIGC.modal({
        title: titulo,
        content: mensagem,
        id: 'fluig-modal',
        size: 'larger',
        actions: [{
            'label': 'Ok',
            'bind': 'data-open-modal',
            'autoClose': true
        }]
    });
    $(".modal-title").text(titulo);
    $(".modal-body").text(mensagem);
}


function myLoading(title, content, func, disable, close) {

    MensagemAlerta(title, content, close);

    if (disable) {
        $(".modal-footer").find("button").attr("disabled", true);
    }

    var i = 0,
        _busy = false;
    var _processor = setInterval(function() {

        if (!_busy) {
            _busy = true;
            if (i == 0) {
                i++;
                window[func]()
            }
            if (!modalMyLoading.isOpen() || autoClose) {
                modalMyLoading.remove();
                clearInterval(_processor);
            }
            _busy = false;
        }
    }, 100);
}

function criaElementoXML(campo, valor) {

    var element = "<" + campo + ">" + valor + "</" + campo + "> ";
    return element;

}

//Executa uma função e apresenta mensagem na tela enquanto processa
//Ex: myLoading("Exemplo" "Mensagem de Exemplo enquanto carrega", nomeFuncaoComParametro, 'parametro', false, true);
function myLoadingParam(title, content, func, param, disable, close) {

    MensagemAlerta(title, content, close);

    if (disable) {
        $(".modal-footer").find("button").attr("disabled", true);
    }

    var i = 0,
        _busy = false;
    var _processor = setInterval(function() {

        if (!_busy) {
            _busy = true;
            if (i == 0) {
                i++;
                window[func](param)
            }
            if (!modalMyLoading.isOpen() || autoClose) {
                modalMyLoading.remove();
                clearInterval(_processor);
            }
            _busy = false;
        }
    }, 100);
}