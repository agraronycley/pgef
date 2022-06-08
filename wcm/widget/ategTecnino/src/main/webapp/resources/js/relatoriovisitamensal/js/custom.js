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

	$("#dataRelatorio").on('change', function(){
		PreencheDataPlanejamento();
	});

	$("#dataRelatorio").val(moment().format("YYYY-MM"));

	$("#btnFiltrar").on("click", function(){
		Calendario();
	});

	$("#btnImprimir").off().on("click", function(){
		//ImprimeRelatorioPopostaMensal();
		//var dataRelatorio = document.getElementById("dataRelatorio").value;
		//dataRelatorio = dataRelatorio.split("-").reverse().join("");

		//MensagemAlerta("Alerta","Em Desenvolvimento");
		printPDF();		
	});

	$( window ).load(function() {
		PreencheDataPlanejamento();
		Calendario();
	});

})


function propriedadesSemVisita(codigoProfessor){

	var c1 = DatasetFactory.createConstraint('CODIGO_DO_PROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG051', null, new Array(c1), null);
	var email, mensagem;

	if(dataset.values.length > 0){

		for(var i = 0; i < dataset.values.length; i ++ ) {	

			email = dataset.values[i]['EMAIL_TECNICO'] + ';' + dataset.values[i]['EMAIL_PARCEIRO'] + ';' + dataset.values[i]['EMAIL_COORDENADOR'] + ';' + dataset.values[i]['EMAIL_SUPERVISOR']			
			if( dataset.values[i]['DATA_ULTIMA_VISITA'] ){
				if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA']) >= 90){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA']) >= 60){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA']) >= 30){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMA_VISITA'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				}
			} else if( dataset.values[i]['DATA_ULTIMO_AGENDAMENTO'] ){
				if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO']) >= 90){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO']) >= 60){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO']) >= 30){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_ULTIMO_AGENDAMENTO'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				}
			} else {
				if(parseInt(dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE']) >= 90){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE']) >= 60){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				} else if(parseInt(dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE']) >= 30){
					mensagem = "Atenção, a " +
					"propriedade rural <b>" + dataset.values[i]['NOME_PROPRIEDADE'] + "</b> do " +
					"município <b>" + dataset.values[i]['MUNICIPIO_PROPRIEDADE'] + "</b> do " +
					"produtor rural <b>" + dataset.values[i]['NOME_PRODUTOR'] + "</b>, " +
					"está a " + dataset.values[i]['QTDE_DIAS_CADASTRO_PROPRIEDADE'] + " dias sem visita técnica. <br>" +
					"A partir de 90 dias sem visita a propriedade será considerada como <b>Desistente</b>.";
					enviarEmail('patrick.carmo@totvs.com.br;patrick_alvesdc@hotmail.com;', mensagem );
				}
			}
		}

	}
}

function enviarEmail(email, mensagem){

	var api = "/api/public/alert/customEmailSender";

	var obj =  {
			"to" : email, 
			"from" : "informatica@faeg.org.br", 
			"subject" : "ATeG - Propriedade sem visita técnica.", 
			"templateId" : "ateg_aviso_propriedade", 
			"dialectId"  : "pt_BR", 
			"param" : {
				"MENSAGEM": mensagem
			}
	}

	var email = $.ajax({
		    async : false,
		    contentType: "application/json",
		    type : "post",
		    dataType : "json",
		    url : api, 
		    data : JSON.stringify(obj),
		    success:function(obj){			                 
			console.log(obj)
		}	               
	});

}

function consultaIdMov(dataRelatorio, codigoProfessor){

	var retorno = '';

	var c1 = DatasetFactory.createConstraint('CODPROF', codigoProfessor, codigoProfessor, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('MMYYYY', dataRelatorio, dataRelatorio, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG054', null, new Array(c1, c2), null);

	if(dataset.values.length > 0){
		retorno = dataset.values[0]['IDMOV'];
	}

	return retorno;

}

function PreencheDataPlanejamento(){

	var dataRelatorio = $("#dataRelatorio").val();
	var ano = dataRelatorio.split("-")[0]
	var mes = dataRelatorio.split("-")[1]
	var mesExtenso = "";
	switch (mes)
	{
	case "01":
		mesExtenso = "Janeiro";
		break;
	case "02":
		mesExtenso = "Fevereiro";
		break;
	case "03":
		mesExtenso = "Março";
		break;
	case "04":
		mesExtenso = "Abril";
		break;
	case "05":
		mesExtenso = "Maio";
		break;
	case "06":
		mesExtenso = "Junho";
		break;
	case "07":
		mesExtenso = "Julho";
		break;
	case "08":
		mesExtenso = "Agosto";
		break;
	case "09":
		mesExtenso = "Setembro";
		break;
	case "10":
		mesExtenso = "Outubro";
		break;
	case "11":
		mesExtenso = "Novembro";
		break;
	case "12":
		mesExtenso = "Dezembro";
		break;	
	}

	if(mesExtenso){
		$("#dataPlanejamento").html(mesExtenso +" de "+ ano);
	}	
}

function Calendario() {
	myLoadingFluig.show();
	var dataSelecionda = document.getElementById("dataRelatorio").value;
	this.month = dataSelecionda.split("-")[1];
	this.year = dataSelecionda.split("-")[0];
	this.lastDay = daysInMonth(this.month, this.year);
	$("table#tableVisitaAgendada").find("tbody#visitaAgendada").find('tr').remove();
	var html = "";
	var mensagem = "";
	var datainicio = this.year + "-" + this.month + "-01";
	var datafim = this.year + "-" + this.month + "-" + this.lastDay;
	//this.email = (top.WCMAPI.userEmail == 'paulocalixto@totvs.com.br')? 'gustavohzootec@gmail.com': top.WCMAPI.userEmail;
	this.email = top.emailTecnico;
	//NOTE: Constraints e Consulta de Dataset
	this.cst = DatasetFactory.createConstraint('EMAILTECNICO', this.email, this.email, ConstraintType.MUST);
	this.constraints = new Array(cst);
	dadosTecnico = null;
	var dsTecnicoEmpresa = DatasetFactory.getDataset('rm_wsConsulta_FluigS0039', null, this.constraints, null);
	if(dsTecnicoEmpresa.values.length > 0){
		datasetTec = _.orderBy(dsTecnicoEmpresa.values, ['NOME', 'NOMECFO', 'NOMEFANTASIA'], ['asc', 'asc', 'asc']);
		var i = 0;
		dadosTecnico = new Object({
			tecnico: datasetTec[i].NOME,
			empresa: datasetTec[i].NOMEFANTASIA,
			cnpj: MascaraCpfCnpj(null, null, datasetTec[i].CGCCFO.replace(/[^\d]+/g, '')),
			referencia: document.getElementById('dataPlanejamento').textContent
		});
	}
	dadosVisitas = new Array();
	this.cst2 = DatasetFactory.createConstraint('DATAAGENDAMENTO', datainicio, datafim, ConstraintType.MUST);
	this.constraints.push(cst2);
	var dsAgendaVisita = DatasetFactory.getDataset('rm_wsConsulta_FluigS0038', null, this.constraints, null);
	if(dsAgendaVisita.values.length > 0){
		datasetAg = _.orderBy(dsAgendaVisita.values, ['DATA_AGENDAMENTO', 'NOME_PROPRIEDADE', 'NOME_PRODUTOR'], ['asc', 'asc', 'asc']);
		for(var x = 0; x < datasetAg.length; x++){
			dadosVisitas.push({
				processo: datasetAg[x].NUM_PROCESSO,
				propriedade: datasetAg[x].NOME_PROPRIEDADE,
				produtor: datasetAg[x].NOME_PRODUTOR,
				dataagendada: formataDataRm(datasetAg[x].DATA_AGENDAMENTO),
				periodo: datasetAg[x].PERIODO_VISITA,
				status: datasetAg[x].STATUS_VISITA,
				evento: datasetAg[x].EVENTO,
			});
			html += "<tr>";
			html += "<td>" + datasetAg[x].NUM_PROCESSO + "</td>";
			html += "<td>" + datasetAg[x].NOME_PROPRIEDADE + "</td>";
			html += "<td>" + datasetAg[x].NOME_PRODUTOR + "</td>";
			html += "<td>" + formataDataRm(datasetAg[x].DATA_AGENDAMENTO) + "</td>";
			html += "<td>" + datasetAg[x].PERIODO_VISITA + "</td>";
			html += "<td>___/___/_____</td>";
			html += "<td>___:___</td>";
			html += "<td>___:___</td>";
			html += "<td></td>";//html += "<td>" + datasetAg[x].STATUS_VISITA + "</td>";			
			html += "<td></td>";
			html += "</tr>";
			//console.log('Evento: x', x, datasetAg[x].EVENTO);
		}
		$("table#tableVisitaAgendada").find("tbody#visitaAgendada").append(html);
		if(dadosVisitas.length > 0 && dadosTecnico != null){
			printCreate();
		}else{
			$('button#btnImprimir').prop('disabled', true);
			mensagem += '<tr class="active info"><td colspan="10">Não foi possível gerar o Relatório!</td></tr>';
			$("table#tableVisitaAgendada").find("tbody#visitaAgendada").append(mensagem);
		}		
	}else{
		$('button#btnImprimir').prop('disabled', true);
		var dtinicio = datainicio.split('-').reverse().join('/');
		var dtfim = datafim.split('-').reverse().join('/');
		mensagem += '<tr class="active info"><td colspan="10">Nenhum Agendamento Encontrado para o Técnico no período de <strong>' + dtinicio + '</strong> à <strong>' + dtfim + '</strong>!</td></tr>';
		$("table#tableVisitaAgendada").find("tbody#visitaAgendada").append(mensagem);
	}
	setTimeout(function(){ myLoadingFluig.hide(); }, 1000);
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