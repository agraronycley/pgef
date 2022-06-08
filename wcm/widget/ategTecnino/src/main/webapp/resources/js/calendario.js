console.log('calendario.js')

/**
 * Calendario
 */

function MontaCalendario(){

	var tooltip = $('<div/>').qtip({
		id: 'fullcalendario',
		prerender: true,
		content: {
			text: ' ',
			title: {
				button: true
			}
		},
		position: {
			my: "center",
			at: "center",
			target: 'event',
			adjust: {
				mouse: false,
				scroll: false
			}
		},
		show: true,
		hide: false,
		style: 'qtip-bootstrap'
	}).qtip('api');

	$('#calendario').fullCalendar({
		editable: true,
		height: 800,
		header: {
			left: 'title',
			center: '',
			right: 'today prev,next'
		},
		eventClick: function(data, event, view) {
			
			/*var mensagem = data.id.split(';');
			var content = "<h4>Solicitação de Evento " + mensagem[1] + "</h4>" +
			"<b>Evento:</b> " +
			"<b>Processo:</b> " 
			tooltip.set({
				'content.text': content
			}).reposition(event).show(event);
			*/
			VisualizarEvento(data.id)
		},
		dayClick: function() { tooltip.hide() },
		eventResizeStart: function() { tooltip.hide() },
		eventDragStart: function() { tooltip.hide() },
		viewDisplay: function() { tooltip.hide() },
		events: ConsultaEventosCalendario(),
		eventColor: 'blue'
	});

	$("#legenda").fadeIn();

}


function ConsultaEventosCalendario(){
	
	var retorno = [];
	/*
	var email = WCMAPI.userEmail; //'marco.santos@faeg.com.br'; //WCMAPI.userEmail
	
	var codStatus = CodStatus(status);
	var c1 = DatasetFactory.createConstraint('EMAILEDU', email, email, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CODSTATUS_EVENTO', codStatus, codStatus, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('DATA_INICIAL', dtInicial, dtInicial, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('DATA_FINAL'  , dtFinal, dtFinal, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('CODTIPOCURSO'  , codTipoCurso, codTipoCurso, ConstraintType.MUST);
	var constraint = new Array(c1,c2,c3,c4,c5);
	var dataset = DatasetFactory.getDataset('rmSql_eduCalendario', null, constraint, null);
	*/
	
	var TURMA_EVENTO          = $("#TURMA_EVENTO").val()
	var TURMA_CODDISC         = $("#TURMA_CODDISC").val()
	var PROPRIEDADE_NOME      = $("#PROPRIEDADE_NOME").val()
	var PROPRIEDADE_MUNICIPIO = $("#PROPRIEDADE_MUNICIPIO").val()
	var PROPRIEDADE_CADEIA    = $("#PROPRIEDADE_CADEIA").val()
	var ANO_MES               = $("#ANO_MES").val()
	var AGENDA_STATUS         = $("#AGENDA_STATUS").val()
	
	if(ANO_MES != ""){
		var ANO = ANO_MES.split("-")[0]
		var MES = ANO_MES.split("-")[1]
	}else{
		var ANO = " ";
		var MES = " ";
	}	
	
	var c1 = DatasetFactory.createConstraint('TURMA_EVENTO', TURMA_EVENTO, TURMA_EVENTO, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('TURMA_CODDISC', TURMA_CODDISC, TURMA_CODDISC, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('PROPRIEDADE_NOME', PROPRIEDADE_NOME, PROPRIEDADE_NOME, ConstraintType.MUST);
	var c4 = DatasetFactory.createConstraint('PROPRIEDADE_MUNICIPIO', PROPRIEDADE_MUNICIPIO, PROPRIEDADE_MUNICIPIO, ConstraintType.MUST);
	var c5 = DatasetFactory.createConstraint('PROPRIEDADE_CADEIA', PROPRIEDADE_CADEIA, PROPRIEDADE_CADEIA, ConstraintType.MUST);
	var c6 = DatasetFactory.createConstraint('ANO', ANO, ANO, ConstraintType.MUST);
	var c7 = DatasetFactory.createConstraint('AGENDA_STATUS', AGENDA_STATUS, AGENDA_STATUS, ConstraintType.MUST);
	var c8 = DatasetFactory.createConstraint('MES', MES, MES, ConstraintType.MUST);
	var constraint = new Array(c1,c2,c3,c4,c5,c6,c7,c8);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG016', null, constraint, null);
	
	if( dataset.values.length > 0){
		for(var i = 0; i < dataset.values.length; i++){		
			
			if(dataset.values[i].AGENDA_DATA_AGENDAMENTO == ""){
				continue;
			}
			var horarioInicio = dataset.values[i].AGENDA_PERIODO.toUpperCase() == "MATUTINO" ? "T08:00:00" : "T14:00:00";
			var horarioTermino = dataset.values[i].AGENDA_PERIODO.toUpperCase() == "MATUTINO" ? "T12:00:00" : "T18:00:00";
			var cores = Cores(dataset.values[i].AGENDA_STATUS);
			var identificador = dataset.values[i].TURMA_IDTURMADISC+"_"+dataset.values[i].PROPRIEDADE_ID+"_"+dataset.values[i].PROFESSOR_CODPROF;
			retorno.push({			
				title: /*dataset.values[i].AGENDA_PERIODO.toUpperCase() == "MATUTINO" ? "08:00 " : "14:00 " +*/ dataset.values[i].PROPRIEDADE_NOME, //dataset.values[i].NOME_EDUCADOR,		
				id: identificador,
				/*+dataset.values[i].TURMA_EVENTO +';'
				+dataset.values[i].PROFESSOR_NOME,*/
				start: dataset.values[i].AGENDA_DATA_AGENDAMENTO.substring(0,10) + "" + horarioInicio ,
				end: dataset.values[i].AGENDA_DATA_AGENDAMENTO.substring(0,10)  + "" + horarioTermino,
				backgroundColor: cores[0],
				textColor: cores[1]
			});
		}		
	}
	$("#calendario").fullCalendar('removeEvents'); 
	$("#calendario").fullCalendar('addEventSource', retorno); 

	return retorno;
}


function Cores(status){

	if(status.toUpperCase() == 'PENDENTE'){
		return new Array('orange','white');
	}else if(status.toUpperCase() == 'APROVADO'){
		return new Array('blue','white');
	}else if(status.toUpperCase() == 'REPROVADO'){
		return new Array('red','white');
	}else{
		return new Array('gray','white');
	}

}

function BotaoSwitch(){

	FLUIGC.switcher.init('#switchButton');

	$('div.bootstrap-switch-id-switchButton >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-on.bootstrap-switch-success').html('Calendário');
	$('div.bootstrap-switch-id-switchButton >div.bootstrap-switch-container').find('span.bootstrap-switch-handle-off.bootstrap-switch-danger').html('Lista');

	FLUIGC.switcher.onChange('#switchButton', function(event, state){
		var _busy = false;
		modal = FLUIGC.modal({
			title: 'Aguarde',
			content: 'Consultando informações..',
			id: 'fluig-modal',
			size: 'larger'
		});		
		var _processor = setInterval(function() 	{
			if(!_busy){ 
				_busy = true;
				if (state == true){					
					swtichButton  = 'calendario';
					$("#divTabela").fadeOut();
					$("#divCalendario").fadeIn();
					$("#ANO_MES").val("");
					MontaCalendario();	
					$("#btnAgendarVisita, #btnRecomendacao, #btnEditPropriedade").fadeOut();
				}else if(state == false){
					swtichButton  = 'tabela';
					$("#divCalendario").fadeOut();
					$("#divTabela").fadeIn();
					$("#btnAgendarVisita, #btnRecomendacao, #btnEditPropriedade").fadeIn();
					$("#ANO_MES").val(moment().format("YYYY-MM"));
					MontaTabela();
				}
				_busy = false;
				modal.remove();
				clearInterval(_processor);
			}			
		}, 100);
	});
}