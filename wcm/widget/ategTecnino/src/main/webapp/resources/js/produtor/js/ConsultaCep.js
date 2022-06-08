//var inputsCEP = $('#rua, #bairro, #complemento, #descMunicipio');
var inputsCEP = [];
inputsCEP['cep'] = $('#estado, #rua, #bairro, #complemento, #codigoMunicipio, #descMunicipio');
inputsCEP['cepEnderecoTrabalho'] = $('#estadoEnderecoTrabalho, #ruaEnderecoTrabalho, #bairroEnderecoTrabalho, #complementoEnderecoTrabalho, #idMunicipioEnderecoTrabalho, #descMunicipioEnderecoTrabalho');
//var inputsRUA = $('#cep, #bairro, #rua');


function limpa_formulário_cep(campoCEP, alerta) {
    //	if (alerta !== undefined) {
    //	alert(alerta);
    //	}
    //	inputsCEP.val('');

    if (alerta === undefined) {
        alerta = "Validação de CEP";
    }
    $('#' + campoCEP).parent('div').removeClass('has-success');
    $('#' + campoCEP).parent('div').addClass('has-error');

    /*
	FLUIGC.message.confirm({
		title:   alerta,
		message: 'Deseja limpar os campos relativos ao CEP automaticamente (RUA, BAIRRO, COMPLEMENTO, MUNICÍPIO) ?',
		labelYes: 'SIM',
		labelNo:  'NÃO'
	}, function(result, el, ev) {
		if(result){
			inputsCEP[campoCEP].val('');
			fnCEPPopulaMunicipio( campoCEP );
		} else {
//			alert('NÃO');
		}
	});
	*/
}

function get(url, campoCEP) {

    $.get(url, function(data) {

        if (!("erro" in data)) {

            if (Object.prototype.toString.call(data) === '[object Array]') {
                var data = data[0];
            }

            $.each(data, function(nome, info) {
                //				console.log('nome: ', nome);
                //				console.log('info: ', info);
                if (campoCEP == 'cep') {
                    if (nome == 'cep') {
                        $('#cep').val(info);
                    } else if (nome == 'logradouro') {
                        $('#rua').val(info);
                    } else if (nome == 'complemento') {
                        $('#complemento').val(info);
                    } else if (nome == 'bairro') {
                        $('#bairro').val(info);
                    } else if (nome == 'uf') {
                        $('#estado').val(info);
                    } else if (nome == 'localidade') {
                        $('#descMunicipio').val(info);
                    } else if (nome == 'ibge') { // Retorna o CODMUNICIPIO da tabela GMUNICIPIO
                        $('#codigoMunicipio').val(info.substring(2, 7));
                    }
                    //} else if(campoCEP == 'cep'){
                } else if (campoCEP == 'cepEnderecoTrabalho') {
                    if (nome == 'cep') {
                        $('#cepEnderecoTrabalho').val(info);
                    } else if (nome == 'logradouro') {
                        $('#ruaEnderecoTrabalho').val(info);
                    } else if (nome == 'complemento') {
                        $('#complementoEnderecoTrabalho').val(info);
                    } else if (nome == 'bairro') {
                        $('#bairroEnderecoTrabalho').val(info);
                    } else if (nome == 'uf') {
                        $('#estadoEnderecoTrabalho').val(info);
                    } else if (nome == 'localidade') {
                        $('#descMunicipioEnderecoTrabalho').val(info);
                    } else if (nome == 'ibge') { // Retorna o CODMUNICIPIO da tabela GMUNICIPIO 
                        //$('#codigoMunicipioEnderecoTrabalho').val(info.substring(2,7)); 
                        $('#idMunicipioEnderecoTrabalho').val(info.substring(2, 7));
                    }
                }

                fnCEPPopulaMunicipio(campoCEP);
                $('#' + campoCEP).parent('div').removeClass('has-error');
                $('#' + campoCEP).parent('div').addClass('has-success');
            });



        } else {
            limpa_formulário_cep(campoCEP, "CEP não encontrado.");
        }

    });
}

//Digitando CEP
/*
$('#cep').on('blur', function(e) {
	var cep = $('#cep').val().replace(/\D/g, '');

	if (cep !== "" && validacep.test(cep)) {
		inputsCEP.val('...');
		get('https://viacep.com.br/ws/' + cep + '/json/');

	} else {
		limpa_formulário_cep(cep == "" ? undefined : "Formato de CEP inválido.");
	}
})
 */

function ConsultaCep(campoCEP) {
    var cep = $('#' + campoCEP).val().replace(/\D/g, '');
    var validacep = /^[0-9]{8}$/;

    console.log('ConsultaCep: ', campoCEP, cep);
    if (cep !== "" && validacep.test(cep)) {
        //inputsCEP.val('...');
        get('https://viacep.com.br/ws/' + cep + '/json/', campoCEP);

    } else {

        limpa_formulário_cep(campoCEP, (cep == "" ? undefined : "Formato de CEP inválido."));
    }
}