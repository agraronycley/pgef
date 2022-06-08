var modalMyLoading,
    autoClose = false;

function MensagemAlerta(titulo, mensagem, fechar) {
    autoClose = fechar;

    modalMyLoading = FLUIGC.modal({
        title: titulo,
        content: mensagem,
        id: "fluig-modal",
        size: "larger",
        actions: [{
            label: "Ok",
            bind: "data-open-modal",
            autoClose: true,
        }, ],
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
                window[func]();
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
                window[func](param);
            }
            if (!modalMyLoading.isOpen() || autoClose) {
                modalMyLoading.remove();
                clearInterval(_processor);
            }
            _busy = false;
        }
    }, 100);
}

function getSelectedOptionFromSelectOptions(options, selectedValue) {
    return Array.from(options).find((option) => option.value === selectedValue);
}

function getCodigoTermoCompromisso() {
    let code = 0;

    const btnView = document.querySelector("#btnView");
    const fromWord = `app_ecm_navigation_doc=`;
    const untilWord = `&quot;);">`;

    const start = btnView.outerHTML.indexOf(fromWord) + fromWord.length;
    const end = btnView.outerHTML.indexOf(untilWord);

    if (start > fromWord.length && end > 0) {
        code = parseInt(btnView.outerHTML.substring(start, end));
    }

    return code;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    return parts.length === 2 ? parts.pop().split(";").shift() : "";
}

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
}