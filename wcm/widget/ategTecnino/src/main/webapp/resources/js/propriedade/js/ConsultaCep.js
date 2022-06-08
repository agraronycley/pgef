var inputsCEP = $('#rua, #bairro, #complemento, #descMunicipio');
var inputsRUA = $('#cep, #bairro, #rua');
var validacep = /^[0-9]{8}$/;

function limpa_formulário_cep(alerta) {
    if (alerta !== undefined) {
        alert(alerta);
    }
    inputsCEP.val('');
};

function get(url) {
    $.get(url, function(data) {
        if (!("erro" in data)) {
            if (Object.prototype.toString.call(data) === '[object Array]') {
                var data = data[0];
            }
            $.each(data, function(nome, info) {
                console.log('nome: ' + nome);
                console.log('info: ' + info);
                if (nome == 'cep') {
                    $('#cep').val(info);
                } else if (nome == 'logradouro') {
                    $('#rua').val(info);
                }
                /*else if(nome == 'complemento'){
                	$('#complemento').val(info);
                }*/
                else if (nome == 'bairro') {
                    $('#bairro').val(info);
                } else if (nome == 'uf') {
                    $('#estado').val(info);
                } else if (nome == 'localidade') {
                    $('#descMunicipio').val(info);
                } else if (nome == 'ibge') {
                    $('#codigoMunicipio').val(info.substring(2, 7));
                }
            });
            removeZoomData("codMunicipio");
            PopulaMunicipio($('#estado').val(), $('#codigoMunicipio').val());
        } else {
            limpa_formulário_cep("CEP não encontrado.");
        }
    });
};

//Digitando CEP
$('#cep').on('blur', function(e) {
    var cep = $('#cep').val().replace(/\D/g, '');
    if (cep !== "" && validacep.test(cep)) {
        inputsCEP.val('...');
        get('https://viacep.com.br/ws/' + cep + '/json/');
    } else {
        limpa_formulário_cep(cep == "" ? undefined : "Formato de CEP inválido.");
    }
});