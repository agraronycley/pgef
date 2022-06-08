var myLoadingFluig = FLUIGC.loading('#divTabela');

var paginaPai = top.window['HelloWorld_' + top.$("#campoInstanceId").val()], _codigoPPessoa = null;

var dadosTecnico = null;
var dadosVisitas = null;

$(document).ready(function(){
	$('.btn').on('click', function() {
		//Atualiza botao e tela
		var myLoading = FLUIGC.loading(window);
		myLoading.show();
		var $this = $(this);
		$this.button('loading');
		var _processor = setInterval(function(){ 
			$this.button('reset');
			myLoading.hide();
			clearInterval(_processor);
		}, 500);

	});


	$("#btnFiltrar").on("click", function(){
		Calendario();
	});


	$( window ).load(function() {
		Calendario();
		populaSelects();
	});

});

function populaSelects() {
	this.cst = DatasetFactory.createConstraint('CODIGO_DO_PROFESSOR', paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
	this.constraints = new Array(cst);	
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG046', null, this.constraints, null);
	if(dataset.values.length > 0){
		arStatus = new Array();
		arrayStatus = new Array();
		for(key in dataset.values){
			this.status = dataset.values[key].STATUS_PROPRIEDADE;
			if(arStatus.indexOf(this.status) == -1){
				arStatus.push(this.status);
				arrayStatus.push(dataset.values[key]);
			}
		}

		var statusPropriedade = _.orderBy(arrayStatus, ['STATUS_PROPRIEDADE'], ['asc', 'asc']);
		populaSelect(statusPropriedade, "STATUS_PROPRIEDADE", "STATUS_PROPRIEDADE", "STATUS_PROPRIEDADE");
	}
}

function Calendario() {
	myLoadingFluig.show();

	$("table#tabelaVinculo").find("tbody#tbodyVinculos").find('tr').remove();
	var html = "";
	var mensagem = "";

	this.email = top.emailTecnico;
	//NOTE: Constraints e Consulta de Dataset
	this.cst = DatasetFactory.createConstraint('CODIGO_DO_PROFESSOR', paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
	this.constraints = new Array(cst);	
	var status_propriedade = $("#STATUS_PROPRIEDADE").val();

	if(status_propriedade){
		this.cst2 = DatasetFactory.createConstraint('STATUS_PROPRIEDADE', status_propriedade, status_propriedade, ConstraintType.MUST);
		this.constraints.push(this.cst2);
	}
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG046', null, this.constraints, null);
	if(dataset.values.length > 0){

		datasetorderBy = _.orderBy(dataset.values, ['NOME_PRODUTOR_RURAL'], ['asc']);
		var linkProdutor, linkPropriedade;		
		for(var i = 0; i < datasetorderBy.length; i++){			
			linkProdutor = '/ategTecnico/resources/js/dependente/index.html?codpessoa='+datasetorderBy[i]['COD_PESSOA_PRODUTOR']+ '&mode=view';
			linkPropriedade = '/ategTecnico/resources/js/propriedade/index.html?idPropriedade='+datasetorderBy[i]['ID_PROPRIEDADE_RURAL']+ '&mode=view';
			html +=  '<tr>';
			html += '	<td><a href="'+linkProdutor+'" target="_blank">' + datasetorderBy[i]['NOME_PRODUTOR_RURAL'] + '</a></td>'
			html += '	<td><a href="'+linkPropriedade+'" target="_blank">' + datasetorderBy[i]['NOME_PROPRIEDADE'] + '</td>'	
			html += '	<td>' + datasetorderBy[i]['MUNICIPIO_PROPRIEDADE'] + '</td>'
			//html += '	<td>' + datasetorderBy[i]['TESTE'] + '</td>'
			html += '	<td>' + datasetorderBy[i]['DESCRICAO_CADEIAPRODUTIVA'] + '</td>'
			html += '	<td>' + datasetorderBy[i]['NOME_PARCEIRO'] + '</td>'
			html += '	<td>' + datasetorderBy[i]['STATUS_PROPRIEDADE'] + '</td>'
			html += '</tr>'; 
		}		
		html += '<tr class="active text-right"><td colspan="6">Quantidade de Registros: '+ datasetorderBy.length +'</td></tr>';		
		$("table#tabelaVinculo").find("tbody#tbodyVinculos").append(html);
	}else{
		mensagem += '<tr class="active info"><td colspan="6">Vocês ainda não possui vínculos!</td></tr>';
		$("table#tableVisitaAgendada").find("tbody#tbodyVinculos").append(mensagem);
	}
	setTimeout(function(){ myLoadingFluig.hide(); }, 1000);
}

function populaSelect(dataset, inputSelect, valueSelect, textSelect){

	var option;
	var select = document.getElementById(inputSelect);
	$('select#'+inputSelect).find('option').remove();	
	$('select#'+inputSelect).append('<option value="">Selecione...</option>');

	dataset = _.intersectionBy(dataset, textSelect);

	for(var i = 0; i < dataset.length; i++){
		option = document.createElement("option");
		option.value = dataset[i][valueSelect];
		option.text = dataset[i][textSelect];
		select.appendChild(option);
	}

}

function RemoveLinha(){

	var ultimaLinha = $("#linha_5")["0"].children;

	for(var i = 0; i < ultimaLinha.length; i++){
		if( $("#5_"+i).html() != ""){
			return false;
		}    	
		if( $("#5_"+i).html() == "" && i == (ultimaLinha.length - 1)){
			return true;
		}
	}
}

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function formataDataRm(dataRM) { //NOTE: Função para formatar a data do RM e popular o campo
	this.dateRM = dataRM;
	this.dateAdapt = '';
	if (this.dateRM != '' && this.dateRM != null) {
		this.date = this.dateRM.slice(0, 10);
		this.dateAdapt = this.date.split('-').reverse().join('/');
	}
	return this.dateAdapt;
}

function MascaraCpfCnpj(element, teclapres, value) { //NOTE: public method mask for CPF/CNPJ
	this.vr = (value != null && value != "" && value != "undefined" && value != undefined) ? value : myUtils.appComponents.getElement(element);
	if (teclapres != null) {
		this.tecla = teclapres.keyCode;
		if ((this.tecla < 48 || this.tecla > 57) && (this.tecla < 96 || this.tecla > 105) && this.tecla != 46 && this.tecla != 8 && this.tecla != 9) {
			return false;
		}
	}
	this.vr = this.vr.replace(/[^\d,]/g, "");
	this.vr = this.vr.replace(/\//g, "");
	this.vr = this.vr.replace(/-/g, "");
	this.vr = this.vr.replace(/\./g, "");
	this.tam = this.vr.length;
	if (this.tam <= 2) {
		document.getElementById(element).value = this.vr;
	}
	if ((this.tam > 2) && (this.tam <= 5)) {
		document.getElementById(element).value = (this.vr.substr(0, this.tam - 2) + '-' + this.vr.substr(this.tam - 2, this.tam));
	}
	if ((this.tam >= 6) && (this.tam <= 8)) {
		document.getElementById(element).value = (this.vr.substr(0, this.tam - 5) + '.' + this.vr.substr(this.tam - 5, 3) + '-' + this.vr.substr(this.tam - 2, this.tam));
	}
	if ((this.tam >= 9) && (this.tam <= 11)) {
		this.result = this.vr.substr(0, this.tam - 8) + '.' + this.vr.substr(this.tam - 8, 3) + '.' + this.vr.substr(this.tam - 5, 3) + '-' + this.vr.substr(this.tam - 2, this.tam);
		if (value != null && value != "" && value != "undefined" && value != undefined) {
			return this.result
		} else {
			document.getElementById(element).value = this.result;
		}
	}
	if ((this.tam == 12)) {
		document.getElementById(element).value = (this.vr.substr(this.tam - 12, 3) + '.' + this.vr.substr(this.tam - 9, 3) + '/' + this.vr.substr(this.tam - 6, 4) + '-' + this.vr.substr(this.tam - 2, this.tam));
	}
	if ((this.tam > 12) && (this.tam <= 14)) {
		this.result = this.vr.substr(0, this.tam - 12) + '.' + this.vr.substr(this.tam - 12, 3) + '.' + this.vr.substr(this.tam - 9, 3) + '/' + this.vr.substr(this.tam - 6, 4) + '-' + this.vr.substr(this.tam - 2, this.tam);
		if (value != null && value != "" && value != "undefined" && value != undefined) {
			return this.result
		} else {
			document.getElementById(element).value = this.result;
		}
	}
	if (this.tam > 13) {
		if (this.tecla != 8) {
			return false;
		}
	}
}