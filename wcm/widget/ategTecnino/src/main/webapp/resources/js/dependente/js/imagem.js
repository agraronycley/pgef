/***
 * Mostra a imagem selecionada
 */
function VisualizarImagem() {

    var imagem = document.getElementById('imagem'); //seleciona a imagem
    var reader = new FileReader();

    reader.onloadend = function() {
        imagem.src = reader.result;
    }

    if (btnIMagem.files.length > 0) {
        reader.readAsDataURL(btnIMagem.files[0]); //le a imagem
    } else {
        imagem.src = "";
    }
}

/***
 * Valida o formato da imagem selcionado
 * @param campo - Id do File
 */
function ValidaFormato(campo) {
    //console.log("campo : " + campo)
    var extensao = new Array("jpg");
    //console.log("extensao : " + extensao)
    var imagem = document.getElementById(campo).value
        //console.log("imagem : " + imagem)
    var extensaoArquivo = imagem.split('.').pop();
    //console.log("extensaoArquivo : " + extensaoArquivo)
    for (var i = 0; i <= extensao.length; i++) {
        //console.log("extensao[i] " +extensao[i]) 
        if (extensao[i] == extensaoArquivo) {
            VisualizarImagem()
            return true
        } else {
            MensagemAlerta('Atenção', 'Formato inválido, favor selecionar uma imagem .JPG!')
            return false
        }
    }
}

function ConverteBase64ParaHexadecimal() {
    var imagem = document.getElementById('imagem').src;
    //console.log(imagem)
    var imagemHex = document.getElementById('imagemHex');
    //console.log(imagemHex)
    var retorno = ""
    imagem = imagem.substring(22, imagem.length)
        //console.log("imagem: " +imagem)
    if (imagem.substring(0, 1) == ',') {
        imagem = imagem.substring(1, imagem.length)
    }

    return imagem;
}

function ExibeImagem(imagemHex, campoImagem) {
    //var imagemBase64 = hexToBase64(imagemHex);
    document.getElementById(campoImagem).src = "data:image/jpeg;base64," + imagemHex;
}

function hexToBase64(str) {
    var convertido = btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    return convertido;
}