console.log("custom.js");

var retConsultaCPF = false;

$(function(){
	/*
	energiaEletricaPropriedade()
	tecnologiaPAdversidade()
	propriedadeAfetadaEstiagens()
	possuiFuncPropriedade()
	possuiProUrbana()
	*/
})

var ehFuncionario = false;

/**
 * Mascara do CEP
 */
$(document).ready(function(){
		
	/**********************************************************************************************
	 * Menu Produtor																			  *
	 **********************************************************************************************/	
	$( window ).load(function() {
//		console.log("------------------------$( window ).load(function() 1");
//		console.log(codMunicipioNatal);
//		console.log("------------------------$( window ).load(function() 2");
		InicioMenuProdutor();
		var onlyDate = FLUIGC.calendar('#divDataNascimentoPessoaFisica, #divDataNascimento', {
			pickDate: true,
			pickTime: false
		});	
		
		var _processor = setInterval(function(){ 
			$("#dataNascimento").attr('disabled', true);
			EditarTecnico ();
			clearInterval(_processor);
			
		}, 100);		
		
	})
	
	$("#btnAdicionarDisciplina").on("click", function(){
		AdicionarDisciplina();
	})
	
	/**
	 * 
	 */
});


function InicioMenuProdutor(){
	
	$('.hidden-inputs').hide();
	$("#haQuantoTempoExerce").parent('div').hide();
	$("#dataAbertura").attr('readonly', 'readonly');
	$("#nomeSolicitante").attr('readonly', 'readonly');
	$("#departamentoSolicitante").attr('readonly', 'readonly');
	$("#cgc").attr('readonly', 'readonly');
	$("#idade").attr('readonly', 'readonly');
	$("#idMunicipioNatal").attr('readonly', 'readonly');
	$("#naturalidade").attr('readonly', 'readonly');
	$("#codigoMunicipio").attr('readonly', 'readonly');
	$("#descMunicipio").attr('readonly', 'readonly');
	$("#idMunicipioEnderecoTrabalho").attr('readonly', 'readonly');  
	$("#descMunicipioEnderecoTrabalho").attr('readonly', 'readonly');
	$("nomePessoaFisica").attr("placeholder", "Digite o nome");
	$("cpfPessoaFisica").attr("placeholder", "Digite o CPF");
	$('input[name^="in_buscaCurso"]').attr("placeholder", "Digite a descri&ccedil;&#259;o do curso.")
	$('input[name^="anoCurso"]').attr("placeholder", "0000");
	$("#dataNascimentoPessoaFisica").attr("placeholder", "__/__/____");
	$("#dataNascimento").attr("placeholder", "__/__/____");
	$("#cgc").attr("placeholder", "___.___.___-__");
	$("#tituloEleitorZona").attr("placeholder", "0");
	$("#tituloEleitorSecao").attr("placeholder", "0");
	$("#cep").attr("placeholder", "__.___-___");
	//$("#cepEnderecoTrabalho").attr("placeholder", "__.___-___");
	$("#telefone").attr("placeholder", "(__)____-_____");
	$("#confirmaTelefone").attr("placeholder", "(__)____-_____");
	$("#celular").attr("placeholder", "(__)_____-____");
	$("#confirmaCelular").attr("placeholder", "(__)_____-____");
	//$("#").attr("placeholder", "(__)____-_____");
	$("#nome").attr('maxlength','120');
	$("#nomeSocial").attr('maxlength','120');
	$("#apelido").attr('maxlength','40');
	$("#orgaoExpedidor").attr('maxlength','15');
	$("#tituloEleitor").attr('maxlength','14');
	$("#tituloEleitorZona").attr('maxlength','6');
	$("#tituloEleitorSecao").attr('maxlength','6');
	$("#rua").attr('maxlength','140');
	$("#complemento").attr('maxlength','60');
	$("#bairro").attr('maxlength','80');
	$("#email").attr('maxlength','60');
	//$("#localTrabalho").attr('maxlength','60');
	//$("#ruaEnderecoTrabalho").attr('maxlength','140');
	//$("#complementoEnderecoTrabalho").attr('maxlength','60');
	//$("#bairroEnderecoTrabalho").attr('maxlength','80');

	$("#btnPesquisar").click(function(){
		
		myLoading("Aguarde", "Consultando CPF...", "Consulta", false, true);		

		if(ehFuncionario){DesabilitaCamposProdutor();}
	});
	
	$("#btnAdicionar").click(function(){
		
		var modal = FLUIGC.modal({
			title: 'Aguarde',
			content: 'Consultando informações..',
			id: 'fluig-modal',
			size: 'larger'
		});

		var i = 0, _limit = 60, _busy = false; 	
		var _processor = setInterval(function() 	{ 
			if(!_busy){ 
				_busy = true; 
				if(i == 0){
					//IncluirPessoa();
					IncluirPessoaSWS(modal)
//					modal.remove();
//					return MensagemAlerta("Atenção", "Consulte novamente daqui 15 minutos.")
//					IncluirPessoaOff();	i = _limit -1;
				}
				if(++i == _limit ){
					modal.remove();
					clearInterval(_processor);
				}
				_busy = false; 
			} 
		}, 100);

	});

	$('#divDtFalecimento').hide();

	$("#estadoNatal").change(function(){
		BuscaMunicipio('estadoNatal', 'codMunicipioNatal');
	});

	$("#estado").change(function(){
		BuscaMunicipio('estado', 'codMunicipio');
	});
	
	$("#cep").blur(function(){
		if($(this).val().length >= 8){			
			ConsultaCep( $(this).attr('id') );
		}
	});
	
	$("#cpfPessoaFisica").blur(function(){
		ValidaCGC( $(this).attr('id') );
	});

	$("#confirmaTelefone, #confirmaCelular").keydown(function( event ){
		ValidaTecla(event, $(this).attr('id'));
	});

	$("#idade").blur(function( event ){
		CalculaIdade();
	});
	$("#idade").focus(function( event ){
		CalculaIdade();
	});

	/** ------------------ CURSOS PRETENDIDOS ------------------ */
	//fnAddCursosPretendidos();

	/*DADOS DA PROPRIEDADE RURAL*/
	$("#divMeioTransporte, #divEstiagemMesesPAno, #divTecnologiaPraAdversidade, #divQuaisTecnologias, #divCampoPropriedadeRural").hide();

	$('input[name^="mtOutros"]').on("click",function(){
		if($("#mtOutros").prop("checked")){
			$("#divMeioTransporte").show();
		}else{
			$("#divMeioTransporte").hide();
		}
	});

	$('#nome').keyup(function() {
		this.value = this.value.toUpperCase();
	});

	$("#btnAdicionarPropriedade").on("click",function(){
		$("#idPropriedadeRural").val("-1");
		$("#divConsultaPropriedadeRural").hide();
		$("#divVinculoFcfoPpessoa").hide();
		$("#divCampoPropriedadeRural").show();
		$("#divBtnAdicionarPropriedade").hide();
		if( $("#codCfo").val() == ""){
			$("#codCfo").val("-1")
		}
	});
	
	$("#numero").blur(function(){
		if($(this).val() != "SN" && $(this).val() != "S/N"){
			if(!$.isNumeric($(this).val())){
				MensagemAlerta("Atenção","Valor informado inválido.",false);
				$(this).val("");
			}
		}
	});	
	
	$("#btnSalvarDadosProdutor").on('click',function(){
		/*
		modalSalvarProdutorRural = FLUIGC.modal({
			title: 'Aguarde',
			content: 'Salvando dados do produtor...',
			id: 'fluig-modal-salvar',
			size: 'larger',
			actions: [{
				'label': 	'Ok',
				'bind': 	'fluig-modal-salvar-ok',
				'autoClose': true
			}]
		});	
		$(".modal-footer").find("button").attr("disabled",true).fadeOut();
		
		var i = 0, _busy = false; 	
		var _processor = setInterval(function(){ 

			if(!_busy){ 
				_busy = true; 
				if(i == 0){
					i++;
					
					SalvarDadosProdutorRural();
				}
				if(!modalSalvarProdutorRural.isOpen()){
					modalSalvarProdutorRural.remove();
					clearInterval(_processor);
				}
				_busy = false; 
			} 
		}, 100);
		*/
		myLoading("Aguarde","Salvando informações do produtor.", "SalvarDadosProdutorRural");
	})
	
	$("#btnNovoProdutor").on('click',function(){
		/*
		LimparCamposProdutor();
		HabilitaCamposProdutor();
		InicioMenuProdutor();
		*/
		location.reload();
	})
	
	$("#codProfessor").val("0");
	
	$("#divCadastroProdutor").fadeIn();
	$("#fsSolicitante").fadeIn();
	$("#divConsultaPessoaFisica").fadeIn();
	HabilitaBotaoSalvarProdutor();
	DesativaCamposAoIncluirAlterar();
	//LimparCamposProdutor();
	HabilitaCamposProdutor();
	
	$("#nomePessoaFisica").focus();
	
}
var modalSalvarProdutorRural;

function Consulta() {

	var nome = $("#nomePessoaFisica").val()
	var cpfCnpj = $("#cpfPessoaFisica").val()
	cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
	var dataNascimento =  $("#dataNascimentoPessoaFisica").val()
	var filtro = '';

	if(cpfCnpj == '' || cpfCnpj == null){
		MensagemAlerta('Atenção','Favor Digitar o CPF!',false)
		return;
	}else if((nome == '' || nome == null) && (dataNascimento == '' || dataNascimento == null)){
		MensagemAlerta('Atenção','Favor Digitar o Nome e/ou Data Nascimento!',false);
		return;
	}

	filtro = "CPF = '" + cpfCnpj + "'"

	if(nome != '' && nome != null){
		filtro += " AND NOME = '" + nome + "'";
	} else {
		filtro += " AND DTNASCIMENTO = '" + dataNascimento.substring(6, 10) + '-' + dataNascimento.substring(3, 5) + '-' + dataNascimento.substring(0, 2) + "'";
	}

	var c1 = DatasetFactory.createConstraint('filtro', filtro, filtro, ConstraintType.MUST);
	var constraints = new Array(c1);
	var ppessoa = DatasetFactory.getDataset("rm_ppessoa_senar_seguro", null, constraints, null);
	
	if(ppessoa.values.length > 0){
		if (ppessoa.values[0].CODIGO != null && ppessoa.values[0].CODIGO != ""){
			var codigoPessoaFisica = ppessoa.values[0].CODIGO;
			var codigoProfessor = ConsultaCodigoProfessor(codigoPessoaFisica)
			ConsultaPPessoa(codigoPessoaFisica)
			//document.getElementById("divBuscaPessoaFisica").style.display = "none";
			$("#fsSolicitante").fadeOut();
			$("#fsTabs").fadeIn();
			
			if(codigoProfessor != "0"){
				PopulaDisciplinaProfessor(codigoProfessor)
			}
			
			$("#codProfessor").val(codigoProfessor);
		} else if(ppessoa.values[0].ERROR != null && ppessoa.values[0].ERROR != ""){
			MensagemAlerta('Atençao', 'Erro: ' + ppessoa.values[0].ERROR,false);
			return;
		}
	} else {
		MensagemAlerta('Atenção', 'Registro não encontrado favor digitar novamente os dados!',false);
		return;
	}
	
	var aVinculo = ConsultaVinculoFCFO(codigoPessoaFisica);
	
	if(aVinculo.length > 0){
		PopulaTabelaVinculo(aVinculo);
		ZoomContratoEmpresa(aVinculo);
		PopulaDadosContrato();
	}
	$("#fsEmpresa").fadeIn();
	
	/*
	ConsultaFCFO();
	$("#idPropriedadeRural").val("-1");
	*/
};


function ConsultaCodigoProfessor(codigoPessoa){
	
	var codigoRM = "0";
	
	var c1 = DatasetFactory.createConstraint('CODPESSOA', codigoPessoa, codigoPessoa, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('ds_eduListaSqlProfessores', null, new Array(c1), null);

	if(dataset.values.length > 0){
		codigoRM = dataset.values[dataset.values.length-1].CODPROF;
	}
	
	return codigoRM;
}


function PopulaDisciplinaProfessor(codProf){
	
	var c1 = DatasetFactory.createConstraint('CODPROF', codProf, codProf,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CODTIPOCURSO', '4', '4', ConstraintType.MUST);
	var dsDisciplinas = DatasetFactory.getDataset('rm_EduDiscAutorizadaProfessorData_readviewauth', null, new Array(c1, c2), null);
	
	var itemDisciplina = null;

	if(dsDisciplinas.values.length > 0 ){
		//for(var i = 0; i < dsDisciplinas.values.length; i++){
			itemDisciplina = {
					'codCurso': dsDisciplinas.values[dsDisciplinas.values.length-1].CODDISC,
					'nomeCurso': dsDisciplinas.values[dsDisciplinas.values.length-1].NOMEDISC
			};
			$("#codCadeiaProdutiva").val(dsDisciplinas.values[dsDisciplinas.values.length-1].CODDISC.split(".")[1]);
			window["dsCadeiaProdutiva"].setValue(itemDisciplina);
		//}
	}
}


/**
 * Transforma texto em maiuscula
 */
function maiuscula(z){
	v = z.value.toUpperCase();
	z.value = v;
}

function ConsultaFCFO(){
	var cpf = $("#cgc").val().substring(0,3) +"."+$("#cgc").val().substring(3,6)+"."+$("#cgc").val().substring(6,9)+"-"+$("#cgc").val().substring(9,11);
	var c1 = DatasetFactory.createConstraint('CPFCNPJ', cpf, cpf, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("rm_fincfodatabr_readviewauth", null,constraints, null);

	if(dataset.values.length > 0){
		$("#codCfo").val(dataset.values[0].CODCFO);
	}else{
		$("#codCfo").val("-1")
	}
}


/**
 * Calcula a idade conforme a Data de Nascimento
 */
function CalculaIdade(){

	var dataNascimento = document.getElementById("dataNascimento").value;
	if(dataNascimento==''){	return '';}
	var idade = document.getElementById("idade");
	var d = new Date;
	var anoAtual = d.getFullYear();
	var mesAtual = d.getMonth() + 1;
	var diaAtual = d.getDate();
	var diaAniversario = dataNascimento.substring(0, 2);
	var mesAniversario = dataNascimento.substring(3, 5);
	var anoAniversario = dataNascimento.substring(6, 10);

	idade.value = anoAtual - anoAniversario;

	if (mesAtual < mesAniversario || (mesAtual == mesAniversario && diaAtual < diaAniversario)) {
		idade.value--;
	}

	if(idade.value < 0){
		idade.value = 0
	}
}

/**
 * Para obter outros atributos do registro selecionado pelo usuário pode ser adicionada a seguinte função JavaScript ao formulário do processo
 * @param selectedItem - Registro selecionado pelo usuário na tela de zoom
 */
function setSelectedZoomItem(selectedItem){

	var inputsAux = '';

	if(selectedItem.inputId == 'buscaPessoaFisica'){
		var codigoPessoaFisica = selectedItem.CODIGO;
		document.getElementById('codPessoa').value = codigoPessoaFisica;

		if (ConsultaPPessoa(codigoPessoaFisica)){
			document.getElementById('fsPessoa').style.display = "block";
			document.getElementById('divBuscaPessoaFisica').style.display = "none";
			document.getElementById('divConsultaPessoaFisica').style.display = "none";
			ConsultaAluno(codigoPessoaFisica);

		} else {
			MensagemAlerta('Atenção', 'Registro não encontrado.',false)
		}
	} else if(selectedItem.inputId == 'codMunicipio'){
		document.getElementById('estado').value = selectedItem.cdEstado;
		document.getElementById('codigoMunicipio').value = selectedItem.cdMunicipio;
		document.getElementById('descMunicipio').value = selectedItem.nmMunicipio;
		inputsAux = '#estado, #codigoMunicipio, #descMunicipio';

	} else if(selectedItem.inputId == 'codMunicipioNatal'){
		document.getElementById('estadoNatal').value = selectedItem.cdEstado;
		document.getElementById('idMunicipioNatal').value = selectedItem.cdMunicipio;
		document.getElementById('naturalidade').value = selectedItem.nmMunicipio;
		inputsAux = '#estado, #codigoMunicipio, #descMunicipio';

	}else if(selectedItem.inputId == 'vinculoFcfoPpessoa'){
		var codigoFCFO = selectedItem.CODCFO;  
		/*
		 $("#codigoVinculoFcfoPpessoa").val(codigoFCFO);
		$("#divBtnAdicionarPropriedade").show();
		ConsultaPropriedadeRural(codigoFCFO);
		*/
	}else if(selectedItem.inputId == 'buscaClienteFornecedor'){
		var codCFO = selectedItem.CODCFO;
		var codColigada = selectedItem.CODCOLIGADA;	
		//PreencheCamposEmpresa(codCFO,codColigada);
		var dadosVinculo = {
				"nome": selectedItem.NOME,
				"codFCFO" : codCFO,
				"codColigada" : codColigada,
				"codigoCargo" : "",
				"descCargo": ""
		}
		$("#divDadosVinculo").fadeIn();
		$("#objVinculoFCFO").val(JSON.stringify(dadosVinculo))
	}else if( selectedItem.inputId == 'buscaCargo'){
		var dadosVinculo = JSON.parse($("#objVinculoFCFO").val());
		dadosVinculo.codigoCargo = selectedItem.ID;
		dadosVinculo.descCargo = selectedItem.DESCRICAO;
		$("#objVinculoFCFO").val(JSON.stringify(dadosVinculo))
	}

	if (selectedItem.inputId.substr(0, 8) == 'in_busca'){
		var idZoom 	 = selectedItem.inputId.substring(selectedItem.inputId.lastIndexOf('_') + 1, selectedItem.inputId.length);
		var tipoZoom = selectedItem.inputId.replace('___' + idZoom, '');
	} else {
		var idZoom   = '0';
		var tipoZoom = selectedItem.inputId;
	}

	if(tipoZoom == 'in_buscaCurso'){
		$('#codCursoIntencao___' + 	idZoom).val( selectedItem.codCurso );
		$('#cbTipoCurso___' + 		idZoom).val( selectedItem.codTipoCurso );

		inputsAux = '#codCursoIntencao___' + idZoom;

	} else if(tipoZoom == 'in_buscaProfissao'){
		$('#ocupacaoAtual').val( selectedItem.CODCLIENTE );

		inputsAux = '#ocupacaoAtual';

	}
	zoomSpanDisplay('#' + selectedItem.inputId, 'hide');
	zoomRemoveDiplay('#' + selectedItem.inputId, inputsAux);
}

function setZoomData(inputObj, item){
	/** ------->> ESSA FUNÇÃO SÓ PODE SER CHAMADA APÓS A PÁGINA SER CARREGADA ------- */
	
	var aux = (inputObj).toString();
	if(jQuery.type( inputObj )  === "string"){
		window[aux].setValue(item);
	} else {
		inputObj.setValue(item);
	}
}

function removeZoomData(inputName){

	if(jQuery.type(inputName)  === "string"){
		window[inputName].removeAll();
		zoomSpanDisplay('#' + inputName, 'show');
	} else {
		inputName.removeAll();
		zoomSpanDisplay('#' + inputName, 'show');
	}

}

zoomSpanDisplay = function(input, type){
	if(type == 'hide'){
		$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').hide();
	} else {
		$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').show();
		//$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead > input.tt-input').css('width', '300px');
	}
}


zoomRemoveDiplay = function(input, inputsAux, evalAux){
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').on('click', function(){
		zoomSpanDisplay(input, 'show');

		if((inputsAux !== undefined) && (inputsAux != '')){
			$(inputsAux).val('');  // Apaga a informação dos campos auxiliares ao Zoom (ID, CODIGO, DESCRICAO .. etc)
		}
		if((evalAux !== undefined) && (evalAux != '')){
			eval(evalAux);
		}
	});
}


zoomReadonly = function(input){

	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').css('width', '90%')
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span.tag-text').css('max-width', '100%');
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').hide();

	$(input).parent('div').find('div.input-group-addon').attr('id', '');  // Desabilita botão do input Zoom
	$(input).parent('div').find('div.input-group-addon > span.fluigicon').removeClass('fluigicon-zoom-in');
	$(input).parent('div').find('div.input-group-addon > span.fluigicon').addClass('fluigicon-verified');

	zoomSpanDisplay(input, 'hide')

}


zoomDisabled = function(inputName){

	if(jQuery.type( inputName )  === "string"){
		window[inputName].disable(true);
	} else {
		inputName.disable(true);
	}
}


function PopulaPropriedadeRural(codigoFCFO,id){
	var c1 = DatasetFactory.createConstraint('CODCFO', codigoFCFO, codigoFCFO,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('ID', id, id,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var dataset = DatasetFactory.getDataset("rm_propriedaderural_readviewauth", null,constraints, null);

	if(dataset.values.length > 0){
		document.getElementById("idPropriedade").value =                dataset.values[0].ID;
		document.getElementById("nmPropriedade").value =                dataset.values[0].NOME;   
		document.getElementById("areaTotalPropriedade").value =         dataset.values[0].AREA;      
		document.getElementById("ccir").value =                         dataset.values[0].CCIR;        
		document.getElementById("nirf").value =                         dataset.values[0].NIRF;        
		document.getElementById("dap").value =                          dataset.values[0].DAP;         
		document.getElementById("inscricaoEstadual").value =            dataset.values[0].INSCRESTADUAL;
		document.getElementById("cepPropriedade").value =               dataset.values[0].CEP;       
		document.getElementById("logradouroPropriedade").value =        dataset.values[0].RUA          
		document.getElementById("numeroPropriedade").value =            dataset.values[0].NUMERO;       
		document.getElementById("complementoPropriedade").value =       dataset.values[0].COMPLEMENTO;  
		document.getElementById("bairroPropriedade").value =            dataset.values[0].BAIRRO;     
		document.getElementById("codMunicipioPropriedade").value =      dataset.values[0].MUNICIPIO;    
		document.getElementById("estadoPropriedade").value = 			dataset.values[0].ESTADO;
		document.getElementById("tipoPropriedade").value =              dataset.values[0].TIPO;    
		document.getElementById("produtorRuralDesde").value =           dataset.values[0].PRODDESDE;      
		document.getElementById("acessoPropriedade").value =            dataset.values[0].ACESSO;          
		document.getElementById("possuiEnergia").value =                dataset.values[0].ENERGELETRICA;
		document.getElementById("propriedadeAfetadaEstiagens").value =  dataset.values[0].ESTIAGENS;       
		document.getElementById("estiagemMesesPAno").value =        dataset.values[0].MESESESTIAGENS; 
		document.getElementById("tecnologiaPraAdversidade").value = dataset.values[0].TECNOLOGIA;         
		document.getElementById("distanciaMunicipio").value =       dataset.values[0].DISTANCIAMUN;   
		document.getElementById("roteiroAcesso").value =            dataset.values[0].ROTEIRO;          
		document.getElementById("latitude").value =                 dataset.values[0].LATITUDE;        
		document.getElementById("longitude").value =                dataset.values[0].LONGITUDE;        
		document.getElementById("quaisTecnologias").value =         dataset.values[0].QUAISTEC; 
		document.getElementById("mtCarroProprio").checked =         dataset.values[0].CARRO == "sim" ? true : false;                                                               
		document.getElementById("mtMotoProprio").checked  =         dataset.values[0].MOTO  == "sim" ? true : false;                                                                      
		document.getElementById("mtBicicleta").checked =            dataset.values[0].BICICLETA  == "sim" ? true : false;                                                             
		document.getElementById("mtOnibus").checked =               dataset.values[0].ONIBUS     == "sim" ? true : false;                                                              
		document.getElementById("mtOutros").checked =               dataset.values[0].OUTROSTRANSPORTES  == "sim" ? true : false;  	
		document.getElementById("mtNenhum").checked =               dataset.values[0].NENHUMTRANSPORTE   == "sim" ? true : false;                                                   
		document.getElementById("outroMeioTransporte").value =      dataset.values[0].OUTROSMEIOS;

		propriedadeAfetadaEstiagens();
		tecnologiaPAdversidade();	
		if(dataset.values[0].OUTROSTRANSPORTES  == "sim"){
			$("#divMeioTransporte").show();
		}		

		itemSelected = {
				'cdEstado':	$("#estadoPropriedade").val(),
				'cdMunicipio': dataset.values[0].MUNICIPIO,
				'nmMunicipio': '?'
		};
		setZoomData('municipioPropriedade', itemSelected);


	}
}


function ConsultaPropriedadeRural(codigoFCFO){
	var c1 = DatasetFactory.createConstraint('CODCFO', codigoFCFO, codigoFCFO,ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("rm_propriedaderural_readviewauth", null,constraints, null);

	if(dataset.values.length > 0 ){
		var filter = 'CODCFO,' + codigoFCFO;
		reloadZoomFilterValues('propriedadeRural', filter);
		$("#divConsultaPropriedadeRural").show();
	}else{
		$("#divConsultaPropriedadeRural").hide();	
	}
	$("#vinculoFcfoPpessoa").val("-1");
}


function ConsultaPPessoa(codigo){
	var itemSelected = {};
	var c1 = DatasetFactory.createConstraint('CODIGO', codigo, codigo,ConstraintType.MUST);
	var constraints = new Array(c1);
	var pPessoa = DatasetFactory.getDataset("rm_ppessoa_readrecordauth", null,constraints, null);
	var i = 0;
	if(pPessoa.values.length > 0 ){

		document.getElementById("codPessoa").value           	= pPessoa.values[i].CODIGO;
		document.getElementById("nome").value                	= pPessoa.values[i].NOME;
		document.getElementById("nomeSocial").value          	= pPessoa.values[i].NOMESOCIAL;
		document.getElementById("apelido").value             	= pPessoa.values[i].APELIDO;
		document.getElementById("cgc").value                 	= pPessoa.values[i].CPF;
		document.getElementById("numeroRG").value            	= pPessoa.values[i].CARTIDENTIDADE;  
		document.getElementById("orgaoExpedidor").value      	= pPessoa.values[i].ORGEMISSORIDENT;
		document.getElementById("estadoEmissor").value       	= pPessoa.values[i].UFCARTIDENT;
		document.getElementById("dataNascimento").value      	= AjustaDataRm(pPessoa.values[i].DTNASCIMENTO);
		document.getElementById("sexo").value                	= pPessoa.values[i].SEXO;
		document.getElementById("estadoCivil").value         	= pPessoa.values[i].ESTADOCIVIL;
		document.getElementById("nacionalidade").value       	= pPessoa.values[i].NACIONALIDADE;
		document.getElementById("estadoNatal").value         	= pPessoa.values[i].ESTADONATAL;
		document.getElementById("naturalidade").value      	 	= pPessoa.values[i].NATURALIDADE;
		if($("#naturalidade").val() != ""){
			itemSelected = {
					'cdEstado':	$("#estadoNatal").val(),
					'cdMunicipio': '?',
					'nmMunicipio': $("#naturalidade").val()
			};
			setZoomData('codMunicipioNatal', itemSelected);
		}
		//document.getElementById("etniaPessoa").value         	= pPessoa.values[i].CORRACA;		
		//document.getElementById("deficienteFisico").value   	= pPessoa.values[i].DEFICIENTEFISICO;
		//document.getElementById("deficienteAuditivo").value 	= pPessoa.values[i].DEFICIENTEAUDITIVO;
		//document.getElementById("deficienteFala").value 		= pPessoa.values[i].DEFICIENTEFALA;
		//document.getElementById("deficienteVisual").value 	= pPessoa.values[i].DEFICIENTEVISUAL;
		//document.getElementById("deficienteMental").value		= pPessoa.values[i].DEFICIENTEMENTAL;     
		document.getElementById("cep").value                 	= pPessoa.values[i].CEP;
		document.getElementById("rua").value                 	= pPessoa.values[i].RUA;
		document.getElementById("numero").value              	= pPessoa.values[i].NUMERO;
		document.getElementById("complemento").value         	= pPessoa.values[i].COMPLEMENTO;
		document.getElementById("bairro").value              	= pPessoa.values[i].BAIRRO;
		document.getElementById("estado").value              	= pPessoa.values[i].ESTADO;
		document.getElementById("descMunicipio").value       	= pPessoa.values[i].CIDADE;
		if($("#descMunicipio").val() != ""){
			itemSelected = {
					'cdEstado':	$("#estado").val(),
					'cdMunicipio': '?',
					'nmMunicipio': $("#descMunicipio").val()
			};
			setZoomData('codMunicipio', itemSelected);
		}

		document.getElementById("telefone").value            	= pPessoa.values[i].TELEFONE1;
		document.getElementById("celular").value             	= pPessoa.values[i].TELEFONE2;
		document.getElementById("email").value               	= pPessoa.values[i].EMAIL;
		document.getElementById("escolaridadePessoa").value  	= pPessoa.values[i].GRAUINSTRUCAO;
		
		if(pPessoa.values[i].TELEFONE1 != "" || pPessoa.values[i].TELEFONE2){
			document.getElementById("possuiTelefone").value = "sim";
		}else{
			document.getElementById("possuiTelefone").value = "nao";
		}		
		
		var codProfissao = pPessoa.values[i].CODPROFISSAO
		document.getElementById("ocupacaoAtual").value  		= codProfissao;
		if(codProfissao != ""){
			var c_c1 = DatasetFactory.createConstraint('CODCLIENTE', codProfissao, codProfissao, ConstraintType.MUST);
			var c_constraints = new Array(c_c1);
			var db_profissao = DatasetFactory.getDataset('ds_grListaProfissoes', null, c_constraints, null);
			var qtdRegistros = db_profissao.values.length;
			var itemSelected = {};
			if(qtdRegistros > 0){

				itemSelected = {
						'CODCLIENTE':	db_profissao.values[i].CODCLIENTE,
						'CODINTERNO': 	db_profissao.values[i].CODINTERNO,
						'DESCRICAO': 	db_profissao.values[i].DESCRICAO
				};
				setZoomData('in_buscaProfissao', itemSelected);
			} else {
				removeZoomData('in_buscaProfissao');
			}
		}

		//document.getElementById("tipoSanguineo").value       	= pPessoa.values[i].TIPOSANG;
		if( (pPessoa.values[i].IDIMAGEM != '' && pPessoa.values[i].IDIMAGEM != null) &&  (pPessoa.values[i].IMAGEM != '' && pPessoa.values[i].IMAGEM != null)){
			ExibeImagem(pPessoa.values[i].IMAGEM,"imagem");
		}

		var constraintRm_crmfuncionariodata_senar1 = DatasetFactory.createConstraint('CPF', pPessoa.values[i].CPF, pPessoa.values[i].CPF, ConstraintType.MUST);
		var datasetRm_crmfuncionariodata_senar = DatasetFactory.getDataset('rm_crmfuncionariodata_senar', null, new Array(constraintRm_crmfuncionariodata_senar1), null);


		if (datasetRm_crmfuncionariodata_senar.values.length > 0){
			ehFuncionario = true;
		}

		CalculaIdade();		
		return true
	}
	return false

}

function DesabilitaCamposProdutor(){
	$("#cgc, #idade, #nome, #nomeSocial, #apelido, #numeroRG, #orgaoExpedidor, #estadoEmissor, " +
			"#dataNascimento,#sexo, #estadoCivil, #nacionalidade, #escolaridadePessoa, " +
			"#estudandoPessoa, #pretendeContinuarEstudar, #in_buscaProfissao, #cep, #rua, #numero, " +
			"#complemento, #bairro, #estado, #codMunicipio, " +
			"#telefone, #celular, #possuiTelefone, #email").attr("disabled", true);	
}

function HabilitaCamposProdutor(){
	$("#cgc, #idade, #nome, #nomeSocial, #apelido, #numeroRG, #orgaoExpedidor, #estadoEmissor, " +
			"#dataNascimento,#sexo, #estadoCivil, #nacionalidade, #escolaridadePessoa, " +
			"#estudandoPessoa, #pretendeContinuarEstudar, #in_buscaProfissao, #cep, #rua, #numero, " +
			"#complemento, #bairro, #estado, #codMunicipio, " +
			"#telefone, #celular, #possuiTelefone, #email").attr("disabled", false).val("");
}

function LimparCamposProdutor(){
	$("#divCadastroProdutor").find("input, textare, select").each(function(){
		$(this).val("");
	})
	
	$("#divCadastroProdutor").find("input[type=zoom]").each(function(){
		//if(this.value != null && this.value != ""){
			removeZoomData(this.id)
		//}
	})
}

/**
 * Função para formatar a data do RM e popular o campo
 * @param dataRM - Data para convertida
 */
function AjustaDataRm(dataRM){

	var dataAjustada = '';
	if(dataRM != '' && dataRM != null){
		dataAjustada = dataRM.substring(8, 10) + '/' + dataRM.substring(5, 7) + '/' + dataRM.substring(0, 4);
	}

	return dataAjustada;
}

/**
 * Função para validar o CPF
 * @returns {Boolean}
 */
function ValidaCGC(campo) {
	var cpfCnpj = document.getElementById(campo).value
	var strCPF = cpfCnpj.replace(/[^\d]+/g, '');
	var soma = 0;
	var resto;

	$('#btnAdicionar').removeClass('btn-success');

	if (strCPF != "" && strCPF != null)  {

		if (strCPF.length != 11 || strCPF == "00000000000"
			|| strCPF == "11111111111" || strCPF == "22222222222"
			|| strCPF == "33333333333" || strCPF == "44444444444"
			|| strCPF == "55555555555" || strCPF == "66666666666"
			|| strCPF == "77777777777" || strCPF == "88888888888"
			|| strCPF == "99999999999") {
			document.getElementById("btnAdicionar").disabled = true;
			MensagemAlerta("Atenção","O CPF digitado é inválido!",false);
			return false;
		}

		for (i = 1; i <= 9; i++)
			soma = soma + parseInt(strCPF.substring(i - 1, i))
			* (11 - i);
		resto = (soma * 10) % 11;
		if ((resto == 10) || (resto == 11))
			resto = 0;
		if (resto != parseInt(strCPF.substring(9, 10))) {
			document.getElementById("btnAdicionar").disabled = true;
			MensagemAlerta("Atenção","O CPF digitado é inválido!",false);
			return false;
		}
		soma = 0;
		for (i = 1; i <= 10; i++)
			soma = soma + parseInt(strCPF.substring(i - 1, i))
			* (12 - i);
		resto = (soma * 10) % 11;
		if ((resto == 10) || (resto == 11))
			resto = 0;
		if (resto != parseInt(strCPF.substring(10, 11))) {
			document.getElementById("btnAdicionar").disabled = true;
			MensagemAlerta("Atenção", "O CPF digitado é inválido!", false);
			return false;
		}
		
		var c1 = DatasetFactory.createConstraint('cpf', strCPF, strCPF, ConstraintType.MUST);
		var constraints = new Array(c1);
		var ppessoa = DatasetFactory.getDataset("rm_ppessoa_senar", null, constraints, null);
		if(ppessoa.values.length > 0){
			document.getElementById("btnAdicionar").disabled = true;
			$('#btnAdicionar').removeClass('btn-success')
			document.getElementById("btnPesquisar").disabled = false;			
			$('#btnPesquisar').addClass('btn-success');
		}else{
			document.getElementById("btnAdicionar").disabled = false;
			$('#btnAdicionar').addClass('btn-success');
			document.getElementById("btnPesquisar").disabled = true;			
			$('#btnPesquisar').removeClass('btn-success')
		}
		return true;
	}

}


function BuscaMunicipio(campoEstado, campoZoomMunicipio){

	var estado = $('#' + campoEstado).val();

	var filter = 'cdEstado,' + estado;
	reloadZoomFilterValues(campoZoomMunicipio, filter);
}


function ConsultaCursosPretendidos(codPessoa){

	var c1 = DatasetFactory.createConstraint('CODPESSOA', codPessoa, codPessoa, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('ATIVO', 1, 1, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var db_cursosIntecao = DatasetFactory.getDataset("ds_eduListaSqlCursosIntencao", null, constraints, null);
	var qtdRegistros = db_cursosIntecao.values.length;
	var nBanco = 0;
	var itemSelected = {};

	if(qtdRegistros > 0){
		for (nBanco = 0; nBanco < qtdRegistros; nBanco++) { 
			wdkAddChild('tableCursosPretendidos');
			$("#idIntencao___" + 		(nBanco + 1) + "").val( 			db_cursosIntecao.values[nBanco].IDINTENCAO );			
			$("#codCursoIntencao___" + 	(nBanco + 1) + "").val( 			db_cursosIntecao.values[nBanco].CODCURSO );
			$("#in_buscaCurso___" + 	(nBanco + 1) + "").val( 			db_cursosIntecao.values[nBanco].DESC_CURSO );
			$("#anoCurso___" + 			(nBanco + 1) + "").val( 			db_cursosIntecao.values[nBanco].ANOPRETENCAO );

			itemSelected = {
					'codCurso': 	db_cursosIntecao.values[nBanco].CODCURSO,
					'nomeCurso': 	db_cursosIntecao.values[nBanco].DESC_CURSO
			};
			
			setZoomData("in_buscaCurso___" + (nBanco + 1), itemSelected);

			$("#cbTipoCurso___" + 		(nBanco + 1) + " option[value='" + 	db_cursosIntecao.values[nBanco].CODTIPOCURSO 	+ "']").prop("selected", true);
			$("#cbMesCurso___" + 		(nBanco + 1) + " option[value='" + 	db_cursosIntecao.values[nBanco].MESPRETENCAO 	+ "']").prop("selected", true);
			zoomFitSize("#in_buscaCurso___" + (nBanco + 1));
		}
	}

	return true
}


function criaElementoXML(campo, valor){	
	if(campo == 'CEP'){
		var valor = valor.replace(/[^\d]+/g, '');
	} 

	if ((valor != null) && (valor != "")){
		var element = "<" + campo + ">" + valor + "</" + campo + "> ";
		return element;
	}else{
		return "";
	}
}


function MensagemNaoEncontrado(titulo, mensagem){
	FLUIGC.message.confirm({
		message: mensagem,
		title:   titulo,
		labelYes: 'Sim',
		labelNo:  'Não'
	}, function(result, el, ev) {

		if(result){		

		}

	});
}

function IncluirPessoaOff(){
	document.getElementById("fsSolicitante").style.display = "none";
	document.getElementById("divBuscaPessoaFisica").style.display = "none";
	document.getElementById("divConsultaPessoaFisica").style.display = "none";
	document.getElementById("fsPessoa").style.display = "block";
	document.getElementById("tipoProcesso").value = "incluir";
	document.getElementById("codPessoa").value = "-1";
	document.getElementById("idImagem").value = "-1";
	document.getElementById("buscaPessoaFisica").value = "-1";	
	$("#cgc").val($('#cpfPessoaFisica').val())
}

function IncluirPessoa(){

	var chave = "EE918-467UQ-357UQ-C49VL";
	var dataNascimento = $("#dataNascimentoPessoaFisica").val();
	var cpf = $("#cpfPessoaFisica").val();
	var msg = "";
	
	if(dataNascimento == "" || dataNascimento == null){
		MensagemAlerta("Atenção","Favor informar a Data de Nascimento.", false);
		return
	}
	
	if (ValidaCGC('cpfPessoaFisica')){
		
		var retornoCpf = new Array();
		var consulta = $.getJSON("https://ws.iwebservice.com.br/CPF/?chave="+chave+"&cpf="+cpf+"&dataNascimento="+dataNascimento+"&formato=JSON", function(data) {
			retornoCpf = data;
			console.log('data: ', data);
			console.log('data.RetornoCpf: ', data.RetornoCpf);
			console.log('data.RetornoCpf.msg: ', data.RetornoCpf.msg.Resultado);
			console.log('retornoCpf: ', retornoCpf);
			
			if(data.RetornoCpf.msg.Resultado == "4"){
				msg += "Código: " + data.RetornoCpf.msg.Resultado + " - " + data.RetornoCpf.msg.ResultadoTXT;
				MensagemAlerta("Atenção!", "Favor contactar o Administrador. " + msg, false);
				return false;			
			}else if(data.RetornoCpf.msg.Resultado == "5"){
				msg += "Código: " + data.RetornoCpf.msg.Resultado + " - " + data.RetornoCpf.msg.ResultadoTXT;
				MensagemAlerta("Atenção!", "Favor contactar o Administrador. " + msg, false);
				return false;			
			}else if(dataNascimento != data.RetornoCpf.DadosTitular.DataNascimento){
				MensagemAlerta("Atenção!", "A data de nascimento digitada está incorreta.", false);
				return false;	
			}else{
				//Dados Titular
				document.getElementById("cgc").value = data.RetornoCpf.DadosTitular.Cpf;
				document.getElementById("nome").value =  data.RetornoCpf.DadosTitular.Titular;
				document.getElementById("nomeSocial").value = data.RetornoCpf.DadosTitular.Titular;
				document.getElementById("dataNascimento").value =  data.RetornoCpf.DadosTitular.DataNascimento;
				document.getElementById("sexo").value = data.RetornoCpf.DadosTitular.Sexo == "MASCULINO" ? "M" : "F";

				document.getElementById("divBuscaPessoaFisica").style.display = "none";
				document.getElementById("divConsultaPessoaFisica").style.display = "none";
				document.getElementById("fsPessoa").style.display = "block";
				document.getElementById("tipoProcesso").value = "incluir";
				document.getElementById("codPessoa").value = "-1";
				document.getElementById("idImagem").value = "-1";
				document.getElementById("buscaPessoaFisica").value = "-1"				
				
				$("#nome, #dataNascimento, #cgc").prop("readonly", true);
				$("#sexo").prop("disabled",true);
				$("#dataNascimento").val() == "" || $("#dataNascimento").val() == null ? "" : CalculaIdade();
				
			}
		});			
	}
}


function IncluirPessoaSWS(modal){

	var dataNascimento = $("#dataNascimentoPessoaFisica").val();
	var cpf = $("#cpfPessoaFisica").val();

	if(dataNascimento == "" || dataNascimento == null){
		modal.remove();
		MensagemAlerta("Atenção","Favor informar a Data de Nascimento.", false);
		return;
	}

	if (ValidaCGC('cpfPessoaFisica')){

		var requisicao = {
				"Credenciais": {
					"Email": "pedrohl@faeg.com.br",
					"Senha": "6gzIQkLa"
				},
				"Documento": cpf,
				"DataNascimento": dataNascimento
		};

		$.ajax({
			url: "https://www.soawebservices.com.br/restservices/producao/cdc/pessoafisicanfe.ashx",
			data: JSON.stringify(requisicao),
			async:false,
			type: 'POST',
			dataType: 'json'
		})
		.done(function (data) {
			console.log((data));
			console.log(JSON.stringify(data));

			if(data.Status){
				document.getElementById("cgc").value = data.Documento;
				document.getElementById("nome").value =  data.Nome;
				document.getElementById("nomeSocial").value = data.Nome;
				document.getElementById("dataNascimento").value =  dataNascimento;

				document.getElementById("divBuscaPessoaFisica").style.display = "none";
				document.getElementById("divConsultaPessoaFisica").style.display = "none";
				document.getElementById("fsPessoa").style.display = "block";
				document.getElementById("tipoProcesso").value = "incluir";
				document.getElementById("codPessoa").value = "-1";
				document.getElementById("idImagem").value = "-1";
				document.getElementById("buscaPessoaFisica").value = "-1";				

				$("#nome").attr("disabled", true);
				$("#dataNascimento").attr("disabled", true);
				$("#dataNascimento").val() == "" || $("#dataNascimento").val() == null ? "" : CalculaIdade();
				$("#fsSolicitante").fadeOut();
				$("#fsTabs").fadeIn();
				return true;
			}else{
				modal.remove();
				MensagemAlerta("Atenção!", data.Mensagem, false);
				return false;
			}
		})
		.fail(function(xhr, err) {
			console.log(xhr);
			console.log(err);
			return false;
		});
	}
}


function DesativaCamposAoIncluirAlterar(){
	document.getElementById("divBuscaPessoaFisica").style.display = "none";
	//document.getElementById("fsPessoa").style.display = "none";
	document.getElementById("btnAdicionar").disabled = true;	
	document.getElementById("btnPesquisar").disabled = true;
	$('#btnAdicionar').removeClass('btn-success');
	$('#btnPesquisar').removeClass('btn-success');
}

/**
 * Ocorre antes da solicitação ser movimentada, após já ter sido selecionada 
 * a atividade destino, o usuário e demais informações necessárias à solicitação.
 */
function SalvarDadosProdutorRural(){
	
	var msgAlerta = "";
	var camposAlerta = "";

	try {

		$('.has-error').removeClass('has-error');

		camposAlerta += fnValidaCampos('nome', 						'NOME');
		camposAlerta += fnValidaCampos('cgc', 						'CPF');
		camposAlerta += fnValidaCampos('dataNascimento', 			'DATA NASCIIMENTO');
		camposAlerta += fnValidaCampos('estadoCivil', 				'ESTADO CIVIL');
		camposAlerta += fnValidaCampos('nacionalidade', 			'NACIONALIDADE');
		camposAlerta += fnValidaCampos('escolaridadePessoa', 		'ESCOLARIDADE');
		camposAlerta += fnValidaCampos('sexo', 		'SEXO');
		//camposAlerta += fnValidaCampos('tipoAluno', 		'TIPO ALUNO');
		camposAlerta += fnValidaCampos('cep', 						'CEP');
		camposAlerta += fnValidaCampos('rua', 						'RUA');
		camposAlerta += fnValidaCampos('numero', 					'NÚMERO', '0');
		camposAlerta += fnValidaCampos('bairro', 					'BAIRRO');
		camposAlerta += fnValidaCampos('descMunicipio', 			'MUNICÍPIO END.');
		camposAlerta += fnValidaCampos('dsCadeiaProdutiva', 		'CADEIA PRODUTIVA.');
		//camposAlerta += fnValidaCampos('deficienteFisico', 			'DEFICIENTE FÍSICO', '0');
		//camposAlerta += fnValidaCampos('deficienteAuditivo', 		'DEFICIENTE AUDITIVO', '0');
		//camposAlerta += fnValidaCampos('deficienteFala', 			'DEFICIENTE FALA', '0');
		//camposAlerta += fnValidaCampos('deficienteVisual', 			'DEFICIENTE VISUAL', '0');
		//camposAlerta += fnValidaCampos('deficienteMental', 			'DEFICIENTE MENTAL', '0');
		//camposAlerta += fnValidaCampos('etniaPessoa', 				'ETNIA', '0');

		if(camposAlerta != ""){
			camposAlerta = (camposAlerta + "?").replace(",?", "").replace("?", ".");
			msgAlerta += "Favor preencher o(s) campo(s) " + camposAlerta;
			throw msgAlerta;
		}
		
		/*
		if($("#possuiTelefone").val() == "sim"){
			camposAlerta += fnValidaCampos('celular', 					'CELULAR');
			camposAlerta += fnValidaCampos('confirmaCelular', 			'CONFIRMAR CELULAR');
			camposAlerta = fnValidaCampos('confirmaCelular', 'CONFIRMAR CELULAR', '<>', $('#celular').val() );
			if(camposAlerta != ""){
				$('#confirmaCelular').focus();
				$('#confirmaCelular').select();
				msgAlerta += "O campo 'CELULAR' deve ser igual ao " + camposAlerta + ".<br>";
			}
			camposAlerta = fnValidaCampos('telefone', 'TELEFONE', '=', $('#celular').val() );
			if(camposAlerta != ""){
				$('#celular').focus();
				$('#celular').select();
				msgAlerta += "O campo 'CELULAR' não pode ser igual ao " + camposAlerta + ".<br>";
			}
		}
		*/
		if(msgAlerta != ""){
			throw msgAlerta;
		}

		console.log('PPessoa');
		if (!MontaXMLPPessoa()){ 
			return false;
		}
		
		/*
		console.log('SAluno');
		if(!MontaXMLSAluno()){
			return false;
		}
		*/
		
		var codPessoa = $("#codPessoa").val();
		var codProfessor = $("#codProfessor").val()
		
		//Existe o cadastro do ppessoa no RM, mas nao existe o professor,
		//logo será necessário repassar TODAS as informações da pessoa e gravar o novo professor
		if( codPessoa != "-1" && codProfessor == "0"){
			if(!GravarNovoProfessorRM(codPessoa)){
				alert(false);
				return false;
			}else{
				alert(true);
			}
		}else if(codPessoa == "-1" && codProfessor == "0"){
			if(!MontaXMLEduProfessor()){
				alert(false);
				return false;
			}else{
				alert(true);
			}			
		}	
		
		/*
		if(!MontaXMLEduDiscAutorizadaProfessor()){
			return false;
		}
		*/
		
		if(!MontaXMLEduDiscAutorizadaProfessorData()){
			return false;
		}
		
		/*
		var vinculoEmpresaJuridica = $("#vinculoEmpresaJuridica").val();		
		if(vinculoEmpresaJuridica == "-1"){
			var codigoFCFO = $("#codFCFOEmpresaJuridica").val();
			if(!MontaXMLZMDVINCULOFCFOPPESSOA(codPessoa, codigoFCFO)){
				return false;
			}
		}
										
		var vinculoEmpresaFisica= $("#vinculoEmpresaFisica").val();
		if(vinculoEmpresaFisica == "-1"){
			var codigoFCFO = $("#codFCFOEmpresaFisica").val();
			if(!MontaXMLZMDVINCULOFCFOPPESSOA(codPessoa, codigoFCFO)){
				return false;
			}
		}
		*/
		
		if(!MontaXMLZMDVINCULOFCFOPPESSOA()){
			return false;
		}
		
		if(!MontaXMLZMDCONTRATOENTIDADE()){
			return false;
		}
		
		DesabilitaCamposProdutor();
		DesabilitaBotaoSalvarProdutor();
		$(".modal-body").text("Dados do produtor salvo com sucesso.")
		$(".modal-footer").find("button").attr("disabled",false).fadeIn();
		return true;

	} catch(erro) {
		console.log('erro:', erro);
		var msgErro = "";
		if (erro == null)	{
			erro = "Erro desconhecido: verifique o log do FLUIG.";
			msgErro = erro;
		} else {
			if(typeof(erro) == 'object'){
				msgErro = "(" + erro.lineNumber + "): Erro:" + erro.message;
			} else {
				msgErro = erro;
			}
		}
		
		MensagemAlerta("ERRO",msgErro, false);
		
		return false;
	}

}


function DesabilitaBotaoSalvarProdutor(){
	$("#btnSalvarDadosProdutor").attr("disabled",true).fadeOut();
	$("#btnNovoProdutor").attr("disabled",false).fadeIn();
}

function HabilitaBotaoSalvarProdutor(){
	$("#btnSalvarDadosProdutor").attr("disabled",false).fadeIn();
	$("#btnNovoProdutor").attr("disabled",true).fadeOut();
}


function fnValidaCampos(inputName, desc, tipoValidacao, valCompare){
	var inputVal = $('#' + inputName).val();

	if(tipoValidacao == "="){
		if((inputName.search(/tel/i) >= 0) || (inputName.search(/cel/i) >= 0)){
			inputVal = inputVal.trim().replace(/\D/g, '');
			valCompare = valCompare.trim().replace(/\D/g, '');
		}

		if(inputVal == valCompare){
			$('#' + inputName).parent( 'div' ).addClass('has-error');
			return " '" + desc + "'";
		} else {
			return "";
		}
	} else if(tipoValidacao == "<>"){
		if((inputName.search(/tel/i) >= 0) || (inputName.search(/cel/i) >= 0)){
			inputVal = inputVal.trim().replace(/\D/g, '');
			valCompare = valCompare.trim().replace(/\D/g, '');
		}

		if(inputVal != valCompare){
			$('#' + inputName).parent( 'div' ).addClass('has-error');
			return " '" + desc + "'";
		} else {
			return "";
		}
	} else {
		var zeroYes;
		(tipoValidacao == "0") ?  zeroYes = true : zeroYes = false ; 
		if ( isStringNullOrWhiteSpace( inputVal, zeroYes ) ){
			$('#' + inputName).parent( 'div' ).addClass('has-error');
			return " '" + desc + "',";
		} else {
			return "";
		}
	}
}

//Check is string null or empty
isStringNullOrEmpty = function (val, zeroYes) {
	switch (val) {
	case "":
	case null:
	case false:
	case undefined:
	case typeof this === 'undefined':
		return true;
	case 0:
	case "0":
		if(zeroYes){
			return false;
		} else {
			return true;
		}
	default: 
		return false;
	}
}

//Check is string null or whitespace
isStringNullOrWhiteSpace = function (val, zeroYes) {
	return this.isStringNullOrEmpty(val, zeroYes) || val.trim().replace(/\s/g, "") === '';
}

//If string is null or empty then return Null or else original value
nullIfStringNullOrEmpty = function (val) {
	if (this.isStringNullOrEmpty(val)) {
		return null;
	}
	return val;
}



ValidaTecla = function(e, campoConfirmar){

	var vKey = 86;
	var cKey = 67;

	if(e.ctrlKey) {
		if(e.keyCode == vKey || e.keyCode == cKey){
			e.preventDefault();
		}
	}

}

/** Adiciona linhas e colunas no PaixFilho do Curso Pretendido 
 * @param qtdTableAdd - Numero de Linha da tableCursosPretendidos
 **/ 
fnAddCursosPretendidos = function(qtdTableAdd){
	$('button#tbPretAdd').on('click', function(event){
		var qtdTableCursosRow = $("table#tableCursosPretendidos > tbody > tr").length - 1;  // Retorna a quantidade de registros inseridos na tabela e subtrai a linha padrão que fica escondida
		var qtdMaxRows = 3;
		var newId = true;
		var spanDisplay = "";

		if( ((qtdTableCursosRow + 1) <= qtdMaxRows) || (qtdMaxRows == 0) ){
			wdkAddChild('tableCursosPretendidos');

			if(newId){ // NÃO FAZ SENTIDO POR QUE O BOTÃO SEMPRE CHAMA UM REGISTRO NOVO
				spanDisplay = "show";
			} else {
				spanDisplay = "hide";
			}
			$('#idIntencao___' +  (qtdTableCursosRow + 1)).val( "-1" );  // Novo registro
			$('#cbTipoCurso___' + (qtdTableCursosRow + 1)).val( "1" );
			fnSelecionaCursosPretendidos();
			$('input[name^="in_buscaCurso"]').attr("placeholder", "Digite a descri&ccedil;&#259;o do curso.")
			$('input[name^="anoCurso"]').attr("placeholder", "0000");

			zoomSpanDisplay('#in_buscaCurso___' +  (qtdTableCursosRow + 1), spanDisplay);  // Somente para registros novos
			zoomRemoveDiplay('#in_buscaCurso___' +  (qtdTableCursosRow + 1), '#codCursoIntencao___' + (qtdTableCursosRow + 1));
		} else {
			FLUIGC.toast({
				title: 	 'Alerta: ',
				message: 'Número máximo de cursos pretendidos excedido (' + qtdTableCursosRow + ').',
				type: 	 'danger'
			});
		}
	});
}

fnSelecionaCursosPretendidos = function(){
	$('[id^="cbTipoCurso___"]').change(function(){
		var id = $(this).attr('id').replace('cbTipoCurso___', '');

		removeZoomData('in_buscaCurso', id);
		reloadZoomFilterValues('in_buscaCurso___' + id, 'codTipoCurso,' + $('#cbTipoCurso___' + id).val() );
	});
}

fnCEPPopulaMunicipio = function(inputId){
	var inputZoom = '';
	var itemSelected = {};
	var descMunicipio = "";
	if(inputId == 'cep'){
		inputZoom = 'codMunicipio';
		descMunicipio = $("#descMunicipio").val();
		itemSelected = {
				'cdEstado':	$("#estado").val(),
				'cdMunicipio': $("#codigoMunicipio").val(),
				'nmMunicipio': $("#descMunicipio").val()
		};

	} 

	removeZoomData(inputZoom);
	if(descMunicipio != ""){
		setZoomData(inputZoom, itemSelected);
		zoomSpanDisplay('#' + inputZoom, 'hide');
	} else {
		zoomSpanDisplay('#' + inputZoom, 'show');
	}
}



/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ **/
/** --------------------------------------------------------------------- FUNÇÕES DE INICIALIZAÇÃO E CUSTOMIZAÇÃO DOS SWITCH BUTTONS --------------------------------------------------------------------- **/
/** ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ **/
/**
 * Função para button treinamento Funcionario Propriedade
 * @param 
 **/ 
treinoFuncPropriedade = function(){
	FLUIGC.switcher.init('#treinoFuncionario');

	if($('#treinamentoFuncionario').val() == ''){
		$('#treinamentoFuncionario').val('nao');
		FLUIGC.switcher.setFalse('#treinoFuncionario');
	}

	if($('#treinamentoFuncionario').val() == 'sim'){
		FLUIGC.switcher.setTrue('#treinoFuncionario');
	}else if($('#treinamentoFuncionario').val() == 'nao'){
		FLUIGC.switcher.setFalse('#treinoFuncionario');
	}

	$('div.bootstrap-switch-id-treinoFuncionario >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-treinoFuncionario >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#treinoFuncionario', function(event, state){
		if (state == true){
			$('#treinamentoFuncionario').val('sim');
		}else if(state == false){
			$('#treinamentoFuncionario').val('nao');
		}
	});
}

/**
 * Função para button possui Funcionario Propriedade
 * @param 
 **/ 
possuiFuncPropriedade = function(){
	FLUIGC.switcher.init('#propPossuiFuncionario');

	if($('#possuiFuncionarios').val() == ''){
		$('#possuiFuncionarios').val('nao');
		FLUIGC.switcher.setFalse('#propPossuiFuncionario');
	} 

	if($('#possuiFuncionarios').val() == 'sim'){
		FLUIGC.switcher.setTrue('#propPossuiFuncionario');
	}else if($('#possuiFuncionarios').val() == 'nao'){
		FLUIGC.switcher.setFalse('#propPossuiFuncionario');
	}

	$('div.bootstrap-switch-id-propPossuiFuncionario >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-propPossuiFuncionario >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#propPossuiFuncionario', function(event, state){
		if (state == true){
			$('#possuiFuncionarios').val('sim');
			$('#divTreinoFuncionario').show();
		}else if(state == false){
			$('#possuiFuncionarios').val('nao');
			$('#divTreinoFuncionario').hide();
		}
	});
}

/**
 * Função para button energia Eletrica
 * @param 
 **/ 
energiaEletricaPropriedade = function(){
	FLUIGC.switcher.init('#possuiEnergia');

	if($('#energiaEletrica').val() == ''){
		$('#energiaEletrica').val('sim');
		FLUIGC.switcher.setTrue('#possuiEnergia');
	} 

	if($('#energiaEletrica').val() == 'sim'){
		FLUIGC.switcher.setTrue('#possuiEnergia');
	}else if($('#energiaEletrica').val() == 'nao'){
		FLUIGC.switcher.setFalse('#possuiEnergia');
	}

	$('div.bootstrap-switch-id-possuiEnergia >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-possuiEnergia >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#possuiEnergia', function(event, state){
		if (state == true){
			$('#energiaEletrica').val('sim');
		}else if(state == false){
			$('#energiaEletrica').val('nao');
		}
	});
}


/**
 * Função para button tecnologia para Adversidade
 * @param 
 **/ 
tecnologiaPAdversidade = function(){
	FLUIGC.switcher.init('#tecnologiaPAdversidade');

	if($('#tecnologiaPraAdversidade').val() == ''){
		$('#tecnologiaPraAdversidade').val('nao');
		FLUIGC.switcher.setFalse('#tecnologiaPAdversidade');
		$('#divQuaisTecnologias').hide();
	} 

	if($('#tecnologiaPraAdversidade').val() == 'sim'){
		FLUIGC.switcher.setTrue('#tecnologiaPAdversidade');
		$('#divQuaisTecnologias').show();
	}else if($('#tecnologiaPraAdversidade').val() == 'nao'){
		FLUIGC.switcher.setFalse('#tecnologiaPAdversidade');
		$('#divQuaisTecnologias').hide();
	}

	$('div.bootstrap-switch-id-tecnologiaPAdversidade >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-tecnologiaPAdversidade >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#tecnologiaPAdversidade', function(event, state){
		if (state == true){
			$('#tecnologiaPraAdversidade').val('sim');
			$('#divQuaisTecnologias').show();
		}else if(state == false){
			$('#tecnologiaPraAdversidade').val('nao');
			$('#divQuaisTecnologias').hide();
		}
	});
}

propriedadeAfetadaEstiagens = function(){
	FLUIGC.switcher.init('#propAfetadaEstiagens');

	if($('#propriedadeAfetadaEstiagens').val() == ''){
		$('#propriedadeAfetadaEstiagens').val('nao');
		FLUIGC.switcher.setFalse('#propAfetadaEstiagens');
	} 

	if($('#propriedadeAfetadaEstiagens').val() == 'sim'){
		FLUIGC.switcher.setTrue('#propAfetadaEstiagens');
	}else if($('#propriedadeAfetadaEstiagens').val() == 'nao'){
		FLUIGC.switcher.setFalse('#propAfetadaEstiagens');
	}

	$('div.bootstrap-switch-id-propAfetadaEstiagens >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-propAfetadaEstiagens >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#propAfetadaEstiagens', function(event, state){
		if (state == true){
			$('#propriedadeAfetadaEstiagens').val('sim');
			$('#divEstiagemMesesPAno').show();
			$('#divTecnologiaPraAdversidade').show();
		}else if(state == false){
			$('#propriedadeAfetadaEstiagens').val('nao');
			$('#estiagemMesesPAno').val('');
			$('#tecnologiaPraAdversidade').val('nao');
			FLUIGC.switcher.setFalse('#tecnologiaPAdversidade');
			$('#quaisTecnologias').val('');
			$('#divEstiagemMesesPAno').hide();
			$('#divTecnologiaPraAdversidade').hide();
			$('#divQuaisTecnologias').hide();
		}
	});
}


possuiProUrbana = function(){
	FLUIGC.switcher.init('#enderecoRural');

	if($('#enderecoCidade').val() == ''){
		$('#enderecoCidade').val('nao');
		FLUIGC.switcher.setFalse('#enderecoRural');
	}

	if($('#enderecoCidade').val() == 'sim'){
		FLUIGC.switcher.setTrue('#enderecoRural');
	}else if($('#enderecoCidade').val() == 'nao'){
		FLUIGC.switcher.setFalse('#enderecoRural');
	}

	$('div.bootstrap-switch-id-enderecoRural >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Sim');
	$('div.bootstrap-switch-id-enderecoRural >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-default').html('N&atilde;o');

	FLUIGC.switcher.onChange('#enderecoRural', function(event, state){
		if (state == true){
			$('#enderecoCidade').val('sim');
			$('#divPropriedadeRural').show();
		}else if(state == false){
			$('#enderecoCidade').val('nao');
			$('#divPropriedadeRural').hide();
		}
	});
}


function IncluirNovaPessoa(){
	
	if ("j0jwkiw2gvfpmmmc1487368938236" != WCMAPI.userCode){
		MensagemAlerta("Atenção","Aguarde.. estamos em manutenção.", false)
		return;
	}

	//var chave = "EE918-467UQ-357UQ-C49VL";
	var dtNascimento = $("#consultaDataNascimento").val().split("-");
	var dataNascimento = dtNascimento[2]+"/"+dtNascimento[1]+"/"+dtNascimento[0];
	var cpf = $('#consultaCPF').val().replace(/[^\d]+/g, '');
	var msg = "";

	if(cpf == "" || cpf == null){
		MensagemAlerta("Atenção","Favor preencher o campo CPF",false)
		retConsultaCPF = false;
		return false;
	}else if(dataNascimento == "" || dataNascimento == null){
		MensagemAlerta("Atenção","Favor preencher o campo DATA DE NASCIMENTO",false)
		retConsultaCPF = false;
		return false;
	}

	var retornoCpf = new Array();
	var consulta = $.getJSON("https://ws.iwebservice.com.br/CPF/?chave="+chave+"&cpf="+cpf+"&dataNascimento="+dataNascimento+"&formato=JSON", function(data) {

		retornoCpf = data;
		console.log('data: ', data);
		console.log('data.RetornoCpf: ', data.RetornoCpf);
		console.log('data.RetornoCpf.msg: ', data.RetornoCpf.msg.Resultado);
		console.log('retornoCpf: ', retornoCpf);

		if(data.RetornoCpf.msg.Resultado == "4"){
			msg += "Código: " + data.RetornoCpf.msg.Resultado + " - " + data.RetornoCpf.msg.ResultadoTXT;
			MensagemAlerta("Atenção",msg,false);
			retConsultaCPF = false;
			return false;			
		}else if(data.RetornoCpf.msg.Resultado == "5"){
			msg += "Código: " + data.RetornoCpf.msg.Resultado + " - " + data.RetornoCpf.msg.ResultadoTXT;
			MensagemAlerta("Atenção",msg,false);
			retConsultaCPF = false;
			return false;			
		}else if(dataNascimento != data.RetornoCpf.DadosTitular.DataNascimento){
			MensagemAlerta("Atenção","A data de nascimento digitada está incorreta.",false);
			retConsultaCPF = false;
			return false;	
		}else{
			//Dados Titular
			document.getElementById("cgc_1").value = data.RetornoCpf.DadosTitular.Cpf;
			document.getElementById("nome_1").value =  data.RetornoCpf.DadosTitular.Titular;
			document.getElementById("dataNascimento_1").value =  $("#consultaDataNascimento").val(); //data.RetornoCpf.DadosTitular.DataNascimento;
			document.getElementById("sexo_1").value = data.RetornoCpf.DadosTitular.Sexo == "MASCULINO" ? "M" : "F";
			retConsultaCPF = true;
		}
	});
	
}


function MontaXMLPPessoa(){

	var cpf = document.getElementById("cgc").value;
	cpf = cpf.replace(".","");
	cpf = cpf.replace(".","");
	cpf = cpf.replace("-","");
	var codigo = document.getElementById("codPessoa").value;
	var idImagem = document.getElementById("idImagem").value;
	var imagem = document.getElementById("imagem").src.substring(0,4) 

	var fieldsXml = "<PPESSOA>";
	fieldsXml += criaElementoXML("CODCOLIGADA",			"1");
	fieldsXml += criaElementoXML("CODIGO",				codigo);
	fieldsXml += criaElementoXML("NOME", 				document.getElementById("nome").value);
	fieldsXml += criaElementoXML("NOMESOCIAL", 			document.getElementById("nomeSocial").value);
	fieldsXml += criaElementoXML("APELIDO", 			document.getElementById("apelido").value);
	fieldsXml += criaElementoXML("CPF", 				cpf);
	fieldsXml += criaElementoXML("CARTIDENTIDADE", 		document.getElementById("numeroRG").value);
	fieldsXml += criaElementoXML("ORGEMISSORIDENT", 	document.getElementById("orgaoExpedidor").value);
	fieldsXml += criaElementoXML("UFCARTIDENT", 		document.getElementById("estadoEmissor").value);
	fieldsXml += criaElementoXML("DTNASCIMENTO", 		document.getElementById("dataNascimento").value);
	fieldsXml += criaElementoXML("SEXO", 				document.getElementById("sexo").value);
	fieldsXml += criaElementoXML("ESTADOCIVIL", 		document.getElementById("estadoCivil").value);
	fieldsXml += criaElementoXML("NACIONALIDADE", 		document.getElementById("nacionalidade").value);
	fieldsXml += criaElementoXML("ESTADONATAL", 		document.getElementById("estadoNatal").value);
	fieldsXml += criaElementoXML("NATURALIDADE", 		document.getElementById("naturalidade").value);	
	fieldsXml += criaElementoXML("CEP", 				document.getElementById("cep").value);
	fieldsXml += criaElementoXML("RUA", 				document.getElementById("rua").value);
	fieldsXml += criaElementoXML("NUMERO", 				document.getElementById("numero").value);
	fieldsXml += criaElementoXML("COMPLEMENTO", 		document.getElementById("complemento").value);
	fieldsXml += criaElementoXML("BAIRRO", 				document.getElementById("bairro").value);
	fieldsXml += criaElementoXML("ESTADO", 				document.getElementById("estado").value);
	fieldsXml += criaElementoXML("CIDADE", 				document.getElementById("descMunicipio").value);
	fieldsXml += criaElementoXML("TELEFONE1", 			document.getElementById("telefone").value);
	fieldsXml += criaElementoXML("TELEFONE2", 			document.getElementById("celular").value);
	fieldsXml += criaElementoXML("EMAIL", 				document.getElementById("email").value);
	fieldsXml += criaElementoXML("GRAUINSTRUCAO", 		document.getElementById("escolaridadePessoa").value);
	fieldsXml += criaElementoXML("CODPROFISSAO", document.getElementById("ocupacaoAtual").value);
	if (imagem != '' && imagem != null && imagem != 'http'){
		fieldsXml += criaElementoXML("IDIMAGEM", idImagem);
		fieldsXml += criaElementoXML("IMAGEM", ConverteBase64ParaHexadecimal());
	}
	fieldsXml += "</PPESSOA>";

	if (GravarRMPPessoa(fieldsXml)){
		return true
	}else{
		return false
	}

}

function GravarRMPPessoa(fieldsXml){

	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_ppessoa_saverecordauth", null, constraints, null);
	console.log('... gravando PPessoa [' + gravaRM.values.length + ']');

	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			console.log('PPESSOA: ', gravaRM.values[0].RETORNO);
			$('#codPessoa').val( gravaRM.values[0].RETORNO );
			return true;
		}else{
			MensagemAlerta('PPessoa','<h3>Erro para gravar o registro:</h3><br/>' + gravaRM.values[0].RETORNO, false);
			return false;
		}
	}else{
		MensagemAlerta('PPessoa','<h3>Erro para gravar o registro, contate o Administrador</h3>', false);
		return false;
	}
}


function MontaXMLEduProfessor(){

	var cpf = document.getElementById("cgc").value;
	cpf = cpf.replace(".","");
	cpf = cpf.replace(".","");
	cpf = cpf.replace("-","");
	var codigo = document.getElementById("codPessoa").value;
	var idImagem = document.getElementById("idImagem").value;
	var imagem = document.getElementById("imagem").src.substring(0,4) 

	var fieldsXml = "<EduProfessor>"
	fieldsXml 	+=	"<SProfessor>"	
	fieldsXml += criaElementoXML("CODCOLIGADA",		"1");
	fieldsXml += criaElementoXML("CODPROF",			"0");
	fieldsXml += criaElementoXML("CODIGO",			codigo);	
	fieldsXml += criaElementoXML("CODPESSOA",		codigo);	
	fieldsXml += criaElementoXML("NOME", 			document.getElementById("nome").value);
	fieldsXml += criaElementoXML("NOMESOCIAL", 		document.getElementById("nomeSocial").value);
	fieldsXml += criaElementoXML("APELIDO", 		document.getElementById("apelido").value);
	fieldsXml += criaElementoXML("CPF", 			cpf);
	fieldsXml += criaElementoXML("CARTIDENTIDADE", 	document.getElementById("numeroRG").value);
	fieldsXml += criaElementoXML("ORGEMISSORIDENT",	document.getElementById("orgaoExpedidor").value);
	fieldsXml += criaElementoXML("UFCARTIDENT", 	document.getElementById("estadoEmissor").value);
	fieldsXml += criaElementoXML("DTNASCIMENTO", 	document.getElementById("dataNascimento").value);
	fieldsXml += criaElementoXML("SEXO", 			document.getElementById("sexo").value);
	fieldsXml += criaElementoXML("ESTADOCIVIL", 	document.getElementById("estadoCivil").value);
	fieldsXml += criaElementoXML("NACIONALIDADE", 	document.getElementById("nacionalidade").value);
	fieldsXml += criaElementoXML("ESTADONATAL", 	document.getElementById("estadoNatal").value);
	fieldsXml += criaElementoXML("NATURALIDADE", 	document.getElementById("naturalidade").value);	
	fieldsXml += criaElementoXML("CEP", 			document.getElementById("cep").value);
	fieldsXml += criaElementoXML("RUA", 			document.getElementById("rua").value);
	fieldsXml += criaElementoXML("NUMERO", 			document.getElementById("numero").value);
	fieldsXml += criaElementoXML("COMPLEMENTO", 	document.getElementById("complemento").value);
	fieldsXml += criaElementoXML("BAIRRO", 			document.getElementById("bairro").value);
	fieldsXml += criaElementoXML("ESTADO", 			document.getElementById("estado").value);
	fieldsXml += criaElementoXML("CIDADE", 			document.getElementById("descMunicipio").value);
	fieldsXml += criaElementoXML("TELEFONE1", 		document.getElementById("telefone").value);
	fieldsXml += criaElementoXML("TELEFONE2", 		document.getElementById("celular").value);
	fieldsXml += criaElementoXML("EMAIL", 			document.getElementById("email").value);
	fieldsXml += criaElementoXML("GRAUINSTRUCAO", 	document.getElementById("escolaridadePessoa").value);
	fieldsXml += criaElementoXML("CODPROFISSAO", document.getElementById("ocupacaoAtual").value);
	
	if (imagem != '' && imagem != null && imagem != 'http'){
		fieldsXml += criaElementoXML("IDIMAGEM", idImagem);
		fieldsXml += criaElementoXML("IMAGEM", ConverteBase64ParaHexadecimal());
	}
	
	fieldsXml += "</SProfessor>";	
	fieldsXml += "<SProfessorCompl>";
	fieldsXml += "<CODCOLIGADA>1</CODCOLIGADA>";
	fieldsXml += "<CODPROF>0</CODPROF>";
	fieldsXml += "<TIPO>01</TIPO>";
	fieldsXml += "</SProfessorCompl>";
	fieldsXml += "</EduProfessor>";
	
	console.log(fieldsXml);
	
	if (GravarRMEduProfessor(fieldsXml)){
		return true
	}else{
		return false
	}

}


function GravarRMEduProfessor(fieldsXml){
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_eduprofessor_saverecordauth", null, constraints, null);
	console.log('... gravando PPessoa [' + gravaRM.values.length + ']');

	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			console.log('PROFESSOR: ', gravaRM.values[0].RETORNO.split(";")[1]);
			$('#codProfessor').val( gravaRM.values[0].RETORNO.split(";")[1] );
			return true;
		}else{
			MensagemAlerta('SProfessor','<h3>Erro para gravar o registro:</h3><br/>' + gravaRM.values[0].RETORNO, false);
			return false;
		}
	}else{
		MensagemAlerta('SProfessor','<h3>Erro para gravar o registro, contate o Administrador</h3>', false);
		return false;
	}
}


function DadosPPessoaReadRecord(codPessoa){
	
	var constraintRm_ppessoa_readrecordauth1 = DatasetFactory.createConstraint('CODIGO', codPessoa, codPessoa, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rm_ppessoa_readrecordauth', null, new Array(constraintRm_ppessoa_readrecordauth1), null);
	var retorno = new Array();
	
	if(dataset.values.length > 0){

		for(var i = 0; i < dataset.columns.length; i++){
			retorno.push(new Array(
					dataset.columns[i], 
					dataset.values[0][dataset.columns[i]])
			)
		}

	}	

	return retorno;
}

function DadaosPPessoaFormulario(){

	var cpf = document.getElementById("cgc").value;
	cpf = cpf.replace(".","");
	cpf = cpf.replace(".","");
	cpf = cpf.replace("-","");
	var codigo = document.getElementById("codPessoa").value;
	var idImagem = document.getElementById("idImagem").value;
	var imagem = document.getElementById("imagem").src.substring(0,4) 
	
	var retorno = new Array();

	retorno.push( new Array("CODCOLIGADA",		"1"));
	retorno.push( new Array("CODIGO",			codigo));
	retorno.push( new Array("NOME", 			document.getElementById("nome").value));
	retorno.push( new Array("NOMESOCIAL", 		document.getElementById("nomeSocial").value));
	retorno.push( new Array("APELIDO", 			document.getElementById("apelido").value));
	retorno.push( new Array("CPF", 				cpf));
	retorno.push( new Array("CARTIDENTIDADE", 	document.getElementById("numeroRG").value));
	retorno.push( new Array("ORGEMISSORIDENT", 	document.getElementById("orgaoExpedidor").value));
	retorno.push( new Array("UFCARTIDENT", 		document.getElementById("estadoEmissor").value));
	retorno.push( new Array("DTNASCIMENTO", 	document.getElementById("dataNascimento").value));
	retorno.push( new Array("SEXO", 			document.getElementById("sexo").value));
	retorno.push( new Array("ESTADOCIVIL", 		document.getElementById("estadoCivil").value));
	retorno.push( new Array("NACIONALIDADE", 	document.getElementById("nacionalidade").value));
	retorno.push( new Array("ESTADONATAL", 		document.getElementById("estadoNatal").value));
	retorno.push( new Array("NATURALIDADE", 	document.getElementById("naturalidade").value));	
	retorno.push( new Array("CEP", 				document.getElementById("cep").value));
	retorno.push( new Array("RUA", 				document.getElementById("rua").value));
	retorno.push( new Array("NUMERO", 			document.getElementById("numero").value));
	retorno.push( new Array("COMPLEMENTO", 		document.getElementById("complemento").value));
	retorno.push( new Array("BAIRRO", 			document.getElementById("bairro").value));
	retorno.push( new Array("ESTADO", 			document.getElementById("estado").value));
	retorno.push( new Array("CIDADE", 			document.getElementById("descMunicipio").value));
	retorno.push( new Array("TELEFONE1", 		document.getElementById("telefone").value));
	retorno.push( new Array("TELEFONE2", 		document.getElementById("celular").value));
	retorno.push( new Array("EMAIL", 			document.getElementById("email").value));
	retorno.push( new Array("GRAUINSTRUCAO", 	document.getElementById("escolaridadePessoa").value));
	retorno.push( new Array("CODPROFISSAO", 	document.getElementById("ocupacaoAtual").value));
	
	if (imagem != '' && imagem != null && imagem != 'http'){
		retorno.push( new Array("IDIMAGEM", idImagem));
		retorno.push( new Array("IMAGEM", ConverteBase64ParaHexadecimal()));
	}

	return retorno;
}

function GravarNovoProfessorRM(codPessoa){
	
	var dadosPessoaRM = DadosPPessoaReadRecord(codPessoa);
	var dadosPessoaForm = DadaosPPessoaFormulario();
	var existeRegistro = false;
	
	for(var i = 0; i < dadosPessoaRM.length; i++){
		existeRegistro = false
		for(var j = 0; j < dadosPessoaForm.length; j++){
			if(dadosPessoaRM[i][0] == dadosPessoaForm[j][0]){
				dadosPessoaRM[i][1] = dadosPessoaForm[j][1];
				existeRegistro = true;
			}
			if(existeRegistro){
				break;
			}
		}
	}
	
	var fieldsXml = "<EduProfessor>"
	fieldsXml 	+=	"<SProfessor>"	
	fieldsXml += criaElementoXML("CODCOLIGADA",		"1");
	fieldsXml += criaElementoXML("CODPROF",			"0");
	fieldsXml += criaElementoXML("CODPESSOA",		codPessoa);		
	for(var x = 0; x < dadosPessoaRM.length; x++){		
		fieldsXml += criaElementoXML(dadosPessoaRM[x][0],dadosPessoaRM[x][1]);
	}	
	fieldsXml += "</SProfessor>";	
	fieldsXml += "<SProfessorCompl>";
	fieldsXml += "<CODCOLIGADA>1</CODCOLIGADA>";
	fieldsXml += "<CODPROF>0</CODPROF>";
	fieldsXml += "<TIPO>01</TIPO>";
	fieldsXml += "</SProfessorCompl>";
	fieldsXml += "</EduProfessor>";
	
	console.log(fieldsXml);
	
	if (GravarRMEduProfessor(fieldsXml)){
		return true
	}else{
		return false
	}
	
}


function MontaXMLEduDiscAutorizadaProfessor(){

	var fieldsXml = "<EduDiscAutorizadaProfessor>"; 
	fieldsXml +=	"<SDISCAUTORIZADA>";
	fieldsXml += criaElementoXML("CODCOLIGADA"     ,"1");
	fieldsXml += criaElementoXML("CODPROF"         , $("#codProfessor").val());
	fieldsXml += criaElementoXML("CODDISC"         , $("#codCadeiaProdutiva").val());
	fieldsXml += criaElementoXML("CODPESSOA"       , $("#codPessoa").val());
	fieldsXml += "</SDISCAUTORIZADA>";
	fieldsXml += "</EduDiscAutorizadaProfessor>"; 
	console.log("fieldsXml: " + fieldsXml);

	if (!GravarEduDiscAutorizadaProfessor(fieldsXml)){
		return false
	}		

	return true;
}

function GravarEduDiscAutorizadaProfessor(fieldsXml){
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_EduDiscAutorizadaProfessorData_saverecordauth", null,constraints, null);

	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			MensagemAlerta('EduDiscAutorizadaProfessor','Erro para gravar o registro: '+gravaRM.values[0].ERROR);
			return false;
		}
	}
	return true;
}


function DataInicialFinal(mes, ano){
	
	var data = new Date(ano, month, 0);
	var mesAno = ((data.getMonth() < 9) ? "0" : "")+ (data.getMonth()+1) +"/"+ data.getFullYear()
	
	var dataInicial = "01/" + mesAno;
	var dataFinal =  data.getDate() +"/"+ mesAno; 
	
	return new Array(dataInicial, dataFinal);
}


function ProximoCodTurma(ano){
	
	var retorno = ano+"040001";
	
	var filtro = "SUBSTRING(CODTURMA,1,6) = '" +ano+ "' AND LEN(CODTURMA) = 10";
	var c1 = DatasetFactory.createConstraint('FILTRO', "SUBSTRING(CODTURMA,1,6) = '201704' AND LEN(CODTURMA) = 10", "SUBSTRING(CODTURMA,1,6) = '201704' AND LEN(CODTURMA) = 10", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rm_eduturmadata_readviewauth', null, new Array(c1), null);
	
	if(dataset.values.length){
		retorno = (parseInt(dataset.values[dataset.values.length-1]["CODTURMA"])+1).toString();
	}
	
	return retorno;
}

/*
function MontaXMLTURMA(){

	var coddisc = $("#codCadeiaProdutiva").val();
	var mesEventos = $("#mesEvento input[type=checkbox]:checked");

	var c1 = DatasetFactory.createConstraint('CODDISC', coddisc, coddisc, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG012', null, new Array(c1), null);

	if(dataset.values.length > 0){

		for(var i = 0; i < mesEventos.length; i++){

			if(mesEventos[0].id != "mes_00"){
				var mesSelecionado = mesEventos[0].id.substring(4);			
				var datas = DataInicialFinal(mesSelecionado, "2017");
				var codTurma = ProximoCodTurma("2017");

				var fieldsXml = "<STURMA>";
				fieldsXml += criaElementoXML("CODCOLIGADA", 		"1");
				fieldsXml += criaElementoXML("CODFILIAL", 			"1");
				fieldsXml += criaElementoXML("IDPERLET", 			"4");
				fieldsXml += criaElementoXML("CODTURMA",			codTurma);
				fieldsXml += criaElementoXML("IDHABILITACAOFILIAL",	dataset.values[0]["IDHABILITACAOFILIAL"]);
				fieldsXml += criaElementoXML("DTINICIAL",			datas[0]);
				fieldsXml += criaElementoXML("DTFINAL",				datas[1]);
				fieldsXml += criaElementoXML("CODTIPOCURSO", 		dataset.values[0]["CODTIPOCURSO"]);
				fieldsXml += criaElementoXML("CODCURSO",			dataset.values[0]["CODCURSO"]);
				fieldsXml += criaElementoXML("CODHABILITACAO",		dataset.values[0]["CODHABILITACAO"]);
				fieldsXml += criaElementoXML("CODGRADE", 			dataset.values[0]["CODGRADE"]);
				fieldsXml += criaElementoXML("CODPERLET",			"001");
				fieldsXml += criaElementoXML("NOMECURSO",			dataset.values[0]["NOMECURSO"]);
				fieldsXml += criaElementoXML("NOMEHABILITACAO",		dataset.values[0]["NOMEHABILITACAO"]);
				fieldsXml += criaElementoXML("DESCGRADE",			dataset.values[0]["DESCGRADE"]);
				fieldsXml += criaElementoXML("TURNO", 				"Integral");
				fieldsXml += "</STURMA>";

				if (GravarRMTURMA(fieldsXml)){
					MontaXMLSTurmaDisciplina(dataset,codTurma,datas);
				}else{
					return false
				}
			}
		}

	}else{
		return false;
	}
}
*/

/**
 * @param fieldsXml
 */
function GravarRMTURMA(fieldsXml){
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_turma_saverecordauth", null,constraints, null);
	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			var codTurma = gravaRM.values[0].RESULT;
			//document.getElementById("codTurma").value = codTurma.substring(6, codTurma.lenght);
			return true;
		}else{
			MensagemAlerta('Atenção!','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+gravaRM.values[0].ERROR);
			return false;
		}
	}else{
		MensagemAlerta('Atenção!','<h3>Erro para gravar o registro, contate o Administrador</h3>');
		return false;
	}
}


/**
 * function MontaXMLSTurmaDisciplina
 * @param turmaDisc
 * @param statusTurmaDisc
 * @returns
 */
function MontaXMLSTurmaDisciplina(dataset,codTurma,datas){
	
	
	var distancia = turmaDisc.getValue(0, "DISTANCIA");
	var distanciaRes = distancia.replace('.', ',');
	var fieldsXml = "<EduTurmaDisc>";
	fieldsXml += "<STURMADISC>";
	fieldsXml += criaElementoXML("CODCOLIGADA", 		"1");
	fieldsXml += criaElementoXML("CODFILIAL", 			"1");
	fieldsXml += criaElementoXML("CODTURMA", 			codTurma);
	fieldsXml += criaElementoXML("IDTURMADISC", 		"");
	fieldsXml += criaElementoXML("NOME",				dataset.values[0]["CODCURSO"]+"-"+$("#codCadeiaProdutiva").val() );
	fieldsXml += criaElementoXML("IDHABILITACAOFILIAL", dataset.values[0]["IDHABILITACAOFILIAL"]);
	fieldsXml += criaElementoXML("CODDISC", 			$("#codCadeiaProdutiva").val());
	fieldsXml += criaElementoXML("IDPERLET", 			"4");
	fieldsXml += criaElementoXML("CODPERLET", 			"001");
	fieldsXml += criaElementoXML("CODTIPOCURSO", 		dataset.values[0]["CODTIPOCURSO"]);
	fieldsXml += criaElementoXML("CODCURSO", 			dataset.values[0]["CODCURSO"]);
	fieldsXml += criaElementoXML("CODHABILITACAO", 		dataset.values[0]["CODHABILITACAO"]);
	fieldsXml += criaElementoXML("CODGRADE", 			dataset.values[0]["CODGRADE"]);
//	fieldsXml += criaElementoXML("NOMEDISC", 			turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("NOMECURSO",			turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("NOMEHABILITACAO",		turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("DESCGRADE", 			turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("NOMETURNO", 			turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("TURNODISCIPLINA", 	turmaDisc.getValue(0, ""));
	fieldsXml += criaElementoXML("CODTURNO", 			turmaDisc.getValue(0, "CODTURNO"));
	fieldsXml += criaElementoXML("DTINICIAL", 			datas[0]);
	fieldsXml += criaElementoXML("DTFINAL", 			datas[1]);
	fieldsXml += criaElementoXML("ATIVA", 				"1");
	fieldsXml += criaElementoXML("TIPO", 				"P");
//	fieldsXml += criaElementoXML("GERENCIAL", 			turmaDisc.getValue(0, "GERENCIAL"));
	fieldsXml += criaElementoXML("MAXALUNOS", 			"30");
	fieldsXml += criaElementoXML("MINALUNOS", 			"1");
//	fieldsXml += criaElementoXML("NUMAULASEM", 			turmaDisc.getValue(0, "NUMAULASEM"));
	fieldsXml += criaElementoXML("DURACAOAULA", 		"4");
//	fieldsXml += criaElementoXML("DTINICIOMATPRES", 	turmaDisc.getValue(0, "DTINICIOMATPRES"));
//	fieldsXml += criaElementoXML("DTFIMMATPRES", 		turmaDisc.getValue(0, "DTFIMMATPRES"));
//	fieldsXml += criaElementoXML("DTINICIOMATPORTAL",	turmaDisc.getValue(0, "DTINICIOMATPORTAL"));
//	fieldsXml += criaElementoXML("DTFIMMATPORTAL",  	turmaDisc.getValue(0, "DTFIMMATPORTAL"));
	fieldsXml += "</STURMADISC>";
	fieldsXml += "<STURMADISCCOMPL>";
	fieldsXml += criaElementoXML("CODCOLIGADA", 		turmaDisc.getValue(0, "CODCOLIGADA"));
	fieldsXml += criaElementoXML("IDTURMADISC", 		turmaDisc.getValue(0, "IDTURMADISC"));
//	fieldsXml += criaElementoXML("SOLICITANTE", 		turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("EVENTO", 				turmaDisc.getValue(0, ""));
//	fieldsXml += criaElementoXML("PROJETO", 			turmaDisc.getValue(0, ""));
	fieldsXml += criaElementoXML("DISTANCIA", 			distanciaRes);
	fieldsXml += criaElementoXML("LOCAL", 				turmaDisc.getValue(0, "LOCAL"));
	fieldsXml += criaElementoXML("LOCALREL", 			turmaDisc.getValue(0, "LOCALREL"));
	fieldsXml += criaElementoXML("ROTEIRO", 			turmaDisc.getValue(0, "ROTEIRO"));
	fieldsXml += criaElementoXML("TIPOLOCAL", 			turmaDisc.getValue(0, "TIPOLOCAL"));
	fieldsXml += criaElementoXML("STATUS", 				statusTurmaDisc);
	fieldsXml += criaElementoXML("NPROCESSO", 			turmaDisc.getValue(0, "NPROCESSO"));
	fieldsXml += "</STURMADISCCOMPL>";
	fieldsXml += "</EduTurmaDisc>";
	
	var res = AtualizaTurmaDisciplina_RM(fieldsXml);
	if (res.length > 0){
		return res;
	}else{
		var result = new Array({ERROR : 'Erro para alterar o registro, contate o Administrador'});
		return result;
	}
}

/**
 * function AtualizaTurmaDisciplina_RM
 * @param fieldsXml
 * @returns
 */
function AtualizaTurmaDisciplina_RM(fieldsXml){
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_turmadisciplina_saverecordauth", null, constraints, null);
	if (gravaRM.rowsCount > 0){
		if(gravaRM.rowsCount == 1 && gravaRM.getValue(0, "RESULT") != null){
			var result = new Array({RESULT : gravaRM.getValue(0, "RESULT")});
			return result;
		} else {
			log.info("--Debbug-- Erro para alterar o registro, contate o Administrador"+gravaRM.getValue(0, "ERROR"));
			var result = new Array({ERROR : gravaRM.getValue(0, "ERROR")});
			return result;
		}
	} else {
		log.info("--Debbug-- Erro para alterar o registro, contate o Administrador");
		var result = new Array({ERROR : 'Erro para alterar o registro, contate o Administrador'});
		return result;
	}
}


/**
 * Verifica se é edição de propriedade
 */
function EditarTecnico (){
	
	var paramSite = window.location.href.split('=');
	console.log("paramSite: " +paramSite);
	
	if(paramSite.length > 1 ){
		
		var dadosPessoaRM = DadosPPessoaReadRecord(paramSite[1]);
		var cpf = "";
		var dtNascimento = "";
		
		for(var i = 0; i < dadosPessoaRM.length; i++){
			
			if(dadosPessoaRM[i][0] == "CPF"){
				cpf = dadosPessoaRM[i][1];
				$("#cpfPessoaFisica").val(cpf).trigger('blur');
			}else if(dadosPessoaRM[i][0] == "DTNASCIMENTO"){
				dtNascimento = AjustaDataRm(dadosPessoaRM[i][1]);
				$("#dataNascimentoPessoaFisica").val(dtNascimento);
			}
			
			if(cpf != "" && dtNascimento != ""){
				break;
			}
		}
		
		myLoading("Aguarde", "Consultando CPF...", "Consulta", false, true);	
		
	}
}

function MontaXMLEduDiscAutorizadaProfessorData(){
	
	console.log("MontaXMLEduDiscAutorizadaProfessorData()");
	var codPessoa = $("#codPessoa").val();
	var codCurso = $("#codCadeiaProdutiva").val();	
	var constraintRmSql_FLUIG0151 = DatasetFactory.createConstraint('CODCURSO', codCurso, codCurso, ConstraintType.MUST);
	var datasetRmSql_FLUIG015 = DatasetFactory.getDataset('rmSql_FLUIG015', null, new Array(constraintRmSql_FLUIG0151), null);
	var aDatasetSQL = new Array();
	
	if(datasetRmSql_FLUIG015.values.length > 0){
		for(var i = 0; i < datasetRmSql_FLUIG015.values.length; i++){
			aDatasetSQL.push(new Array(datasetRmSql_FLUIG015.values[i]["CODDISC"], datasetRmSql_FLUIG015.values[i]["NOME"]))
		}
	}
	
	
	var codProfessor = $("#codProfessor").val()
	var c1 = DatasetFactory.createConstraint('CODPROF', codProfessor, codProfessor,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CODTIPOCURSO', '4', '4', ConstraintType.MUST);
	var dsDisciplinas = DatasetFactory.getDataset('rm_EduDiscAutorizadaProfessorData_readviewauth', null, new Array(c1, c2), null);	
	var aDisciplinaDataset = new Array();

	if(dsDisciplinas.values.length > 0 ){
		for(var i = 0; i < dsDisciplinas.values.length; i++){
			aDisciplinaDataset.push(new Array(dsDisciplinas.values[i]["CODDISC"], dsDisciplinas.values[i]["NOMEDISC"]));
		}
	}
	
	var aDiscAutorizadas = new Array();
	
	if(aDatasetSQL.length > 0 && aDisciplinaDataset.length > 0){
		
		for(var i = 0; i < aDatasetSQL.length; i++){
			var lGrava = false;
			for(var j = 0; j < aDisciplinaDataset.length; j++){
				
				if( aDatasetSQL[i][0] ==  aDisciplinaDataset[j][0]){
					lGrava = false;
					break;
				}else if(aDatasetSQL[i][0] !=  aDisciplinaDataset[j][0]){
					lGravra = true;
				}				
				
				if( j+1 ==  aDisciplinaDataset.length && lGravra){
					aDiscAutorizadas.push(new Array(aDatasetSQL[i][0], aDatasetSQL[i][1]))
				}
			}
		}
	}else{
		aDiscAutorizadas = aDatasetSQL.slice()
	}
	
	
	if(aDiscAutorizadas.length > 0){
		for(var i = 0; i < aDiscAutorizadas.length; i ++){
			var fieldsXml = "<SDISCAUTORIZADA>";
			fieldsXml += criaElementoXML("CODCOLIGADA",	 "1");
			fieldsXml += criaElementoXML("CODPROF",		 codProfessor);
			fieldsXml += criaElementoXML("CODDISC",	     aDiscAutorizadas[i][0]);
			fieldsXml += criaElementoXML("CODTIPOCURSO", "4");
			fieldsXml += criaElementoXML("NOMEDISC",	 aDiscAutorizadas[i][1]);
			fieldsXml += criaElementoXML("CODPESSOA",	 codPessoa);
			fieldsXml += "</SDISCAUTORIZADA>";
			
			console.log(fieldsXml);
			
			if (!GravarRMEduDiscAutorizadaProfessorData(fieldsXml)){
				return false
			}
		}
	}
	
	return true;
}


function GravarRMEduDiscAutorizadaProfessorData(fieldsXml){
	
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_edudiscautorizadaprofessordata_save", null, constraints, null);
	console.log('... gravando edudiscautorizadaprofessordata [' + gravaRM.values.length + ']');

	if (gravaRM.values.length > 0 ){
		if(gravaRM.values.length == 1){
			console.log('edudiscautorizadaprofessordata: ', gravaRM.values[0].RETORNO.split(";")[1]);
			//$('#codProfessor').val( gravaRM.values[0].RETORNO.split(";")[1] );
			return true;
		}else{
			MensagemAlerta('SProfessor','<h3>Erro para gravar o registro:</h3><br/>' + gravaRM.values[0].RETORNO, false);
			return false;
		}
	}else{
		MensagemAlerta('SProfessor','<h3>Erro para gravar o registro, contate o Administrador</h3>', false);
		return false;
	}
}


function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
 
        matches = [];
 
        substrRegex = new RegExp(q, 'i');
 
        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    code: str[0],
                    description: str[1]
                 });
            }else if(substrRegex.toString().indexOf("%") > 0 && substrRegex.toString().length == 4){
            	matches.push({
            		code: str[0],
                    description: str[1]
                 });
            }
        });
        cb(matches);
    };
}