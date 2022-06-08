var paginaPai = top.window['HelloWorld_' + top.$("#campoInstanceId").val()], _codigoPPessoa = null;

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
	})

	$("#dataRelatorio").val(moment().format("YYYY-MM"));

	$("#btnFiltrar").on("click", function(){
		Calendario();
	})

	$("#btnImprimir").off().on("click", function(){
		//ImprimeRelatorioPopostaMensal();

		var dataRelatorio = $("#dataRelatorio").val();

		if(!dataRelatorio){
			MensagemAlerta("Alerta","Favor preencher a Data do Evento");
			return;
		}

		dataRelatorio = dataRelatorio.split("-").reverse().join("");

		var idMov = consultaIdMov(dataRelatorio, paginaPai.codigoProfessor);

		if(!idMov){
			MensagemAlerta("Alerta","Não existe evento para esta data!");
			return;
		}
		propriedadesSemVisita(paginaPai.codigoProfessor);
		myLoadingParam("Aguarde", "Carregando dados do relatório..", 'downloadRelatorio', idMov, true, false);

	})

	$( window ).load(function() {
		PreencheDataPlanejamento();
		Calendario();
	})

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
	var c3 = DatasetFactory.createConstraint('CODTMV', '1.1.12', '1.1.12', ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('SERIE', 'OS', 'OS', ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG054', null, new Array(c1, c2, c3, c4), null);

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

	var dataSelecionda = document.getElementById("dataRelatorio").value;

	var mes = dataSelecionda.split("-")[1];
	var ano = dataSelecionda.split("-")[0];
	var qtdDiasMes = daysInMonth(mes, ano);
	var html = "";
	var contLinha = 0;
	$("#table > tbody > tr > td").html("");
	$("#linha_5").show();
	var mensagem = "";

	var c1 = DatasetFactory.createConstraint('DATA_INICIAL_EVENTO', ano+mes+'01', ano+mes+'01', ConstraintType.MUST);
	//var c2 = DatasetFactory.createConstraint('STATUS_VISITA', '1', '1', ConstraintType.MUST);
	//var c3 = DatasetFactory.createConstraint('EMAIL_PROFESSOR', top.WCMAPI.userEmail, top.WCMAPI.userEmail, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('EMAIL_PROFESSOR', top.emailTecnico, top.emailTecnico, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG048', null, new Array(c1 /*, c2 */, c3), null);

	dataset = _.orderBy(dataset.values, ['DATA_AGENDAMENTO', 'PERIODO_VISITA'], ['asc', 'asc']);

	for (var i = 1;  i <= qtdDiasMes; i++) {
		mensagem = i + "<br>";
		diaSemana = new Date(ano, parseInt(mes) - 1, i).getDay();
		if(diaSemana == 0 && i > 1){
			contLinha++;
		}

		for(var j = 0; j < dataset.length; j++){
			if( ano +"-"+mes+"-"+(i < 10 ? '0' + i : i) == dataset[j]["DATA_AGENDAMENTO"].substring(0,10)){
				mensagem += (dataset[j]["PERIODO_VISITA"].toUpperCase() == "MATUTINO" ? " 08:00h - 12:00h " : " 14:00h - 18:00h ") + " - " + dataset[j]["NOME_PRODUTOR"] +  "<br>";
			}
		}

		$("#"+contLinha+"_"+diaSemana).val(i).html(mensagem)
	}

	if(RemoveLinha()){
		$("#linha_5").hide();
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