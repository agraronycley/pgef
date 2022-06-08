var wg_PainelAceiteInstrutor = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        inicioFiltro();
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'editar': ['click_editar'],
			'voltar': ['click_voltar']
        },
        global: {}
    },

	voltar: function(htmlElement, event){
		location.reload();
		$("#formPainelAceiteInstrutor").show();
    	$("#cadastroTurmaDisc").hide();
        //inicioFiltro();
	},
 
    editar: function(htmlElement, event) {
        $("#formPainelAceiteInstrutor").hide();
    	$("#cadastroTurmaDisc").show();
        inicio();

        var row = '';
    	var element = '';
    	var idturmadisc = '';

        $("button[id^='btneditar_']").each(function(key, value){
    		var id = $(this).prop("id"), index = id.split('_');
    		if($('#btneditar_'+index[1]).val() == event.currentTarget.value) {
    			row = document.getElementById("tabelaAgendamento").getElementsByTagName("tr")[event.currentTarget.value];
    			element = row.getElementsByTagName("td");
				idturmadisc = element[0].lastChild.data;
				//idturmadisc = element[12].lastChild.value;
				
				carregaDadosAgendamento(idturmadisc);
            	
        			
            }
    	});
    }

});

function inicioFiltro(){
    $('#cadastroTurmaDisc').hide();

	var email = window.prompt();
    //var ACEITE_EMAIL = 'edi.henrique@gmail.com';
    var ACEITE_EMAIL;// = 'adesvaldojr@gmail.com';// 'dobisspo@gmail.com';
    
    
    var usuarioId = WCMAPI.getUserCode();
    var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuarioId , usuarioId, ConstraintType.MUST);
    var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
    var mail = datasetAttachment.values[0].mail;
	var name = datasetAttachment.values[0].colleagueName;
	ACEITE_EMAIL = mail;
    // console.log("E-mail: " + mail);
    // console.log("Usuário: " + usuarioId);
    // console.log("Teste");

	if(mail == 'contato@avaloon.com.br'){
		ACEITE_EMAIL = 'adesvaldojr@gmail.com';
	} else {
		ACEITE_EMAIL = email;
	}


    
    $('#nomeInstrutor').append(name + ' - ' + ACEITE_EMAIL);    
    
    var cs_ACEITE_EMAIL= DatasetFactory.createConstraint("ACEITE_EMAIL", ACEITE_EMAIL, ACEITE_EMAIL, ConstraintType.MUST);
    	
    var constraintsAceite = new Array(cs_ACEITE_EMAIL);
    var ds_PainelAceiteInstrutor_Disciplinas = DatasetFactory.getDataset("ds_PainelAceiteInstrutor_Disciplinas", null, constraintsAceite, null);
    
    if (ds_PainelAceiteInstrutor_Disciplinas.values.length > 0) {
        //$('#divresultado').show();
        var ordem = 1;
        
        $.each(ds_PainelAceiteInstrutor_Disciplinas.values, function(key, value) {
            
            $('#tabelaAgendamento').append('<tbody id="body-table" name="body-table">'+
                '<tr id="LINHA" name="LINHA"> <td>'+ value.ACEITE_IDTURMADISC + '</td>' +
                '<td>' + value.ACEITE_CURSO + '</td>' +
                '<td>' + value.ACEITE_DISCIPLINA + '</td>' +
                '<td>' + value.ACEITE_DATAINICIAL + '</td>' +
                '<td>' + value.ACEITE_DATAFINAL + '</td>' +
                '<td>' + value.ACEITE_MUNICIPIO + '</td>' +
                '<td>' + value.ACEITE_DISTANCIA + 'km</td>' +
                // '<td>' + value.CURSO_AREA + '</td>' +
                // '<td>' + value.CURSO_NROVAGAS + '</td>' +
                // '<td>' + value.CURSO_STATUSCURSO + '</td>' +
                '<td><button id="btneditar_'+ordem+'" data-editar class="btn btn-primary" value="'+ordem+'">Editar</button></td>' +
            '</tbody>');
            
            ordem++;
        });
    } else {
        $('#divresultado').hide();
        MensagemAlerta('Atenção!','Nenhum registro Encontrado!');
    }
}

function inicio(){
    var AGENDAMENTO_DTAINICIAL = FLUIGC.calendar('#AGENDAMENTO_DTAINICIAL', {
		language: 'pt-BR'
	});
	
	var AGENDAMENTO_DTFINAL = FLUIGC.calendar('#AGENDAMENTO_DTFINAL', {
		language: 'pt-BR'
	});
}

function carregaDadosAgendamento(idTurmaDisc){
	var myLoading3 = FLUIGC.loading(window);
    myLoading3.show();

	$('#informacaoTurmaDisc').find('input, textarea, button, select').attr("style", "pointer-events: none;background: #EEE; border: none;");

    var cs_AGENDAMENTO_IDTURMADISC = DatasetFactory.createConstraint("STURMADISC_IDTURMADISC", idTurmaDisc, idTurmaDisc, ConstraintType.MUST);
	var constraintsTurmaDisc = new Array(cs_AGENDAMENTO_IDTURMADISC);
	var ds_ConsultaTurmaDisciplina_DadosTurmaDisc = DatasetFactory.getDataset("ds_ConsultaTurmaDisciplina_DadosTurmaDisc", null, constraintsTurmaDisc, null);
	
	var AGENDAMENTO_CODTIPOCURSO = 0;
	var AGENDAMENTO_IDPERLET = 0;
	var AGENDAMENTO_CODMODALIDADE = 0;
	var AGENDAMENTO_CODCURSO = 0;
	var AGENDAMENTO_LOCAL = 0;
	var AGENDAMENTO_TIPOTURMA = 0;
	var AGENDAMENTO_CODDISC = 0;
	var AGENDAMENTO_IDTURMADISC = 0;
	var AGENDAMENTO_CODTURNO = 0;
	
	if (ds_ConsultaTurmaDisciplina_DadosTurmaDisc.values.length > 0) {
		$.each(ds_ConsultaTurmaDisciplina_DadosTurmaDisc.values, function(key, value) {
			
				AGENDAMENTO_CODTIPOCURSO = value.STURMADISC_CODTIPOCURSO;
				AGENDAMENTO_IDPERLET = value.STURMADISC_IDPERLET;
				AGENDAMENTO_CODMODALIDADE = value.STURMADISC_MODALIDADE;
				AGENDAMENTO_CODCURSO = value.STURMADISC_CODCURSO;
				AGENDAMENTO_LOCAL = value.STURMADISC_LOCAL;
				AGENDAMENTO_TIPOTURMA = value.STURMADISC_TIPOTURMA;
				AGENDAMENTO_CODDISC = value.STURMADISC_CODDISC;
				AGENDAMENTO_IDTURMADISC = value.STURMADISC_IDTURMADISC;
				AGENDAMENTO_CODTURNO = value.STURMADISC_CODTURNO;
				
				$('#AGENDAMENTO_CODTURMA').val(value.STURMADISC_CODTURMA);
				$('#AGENDAMENTO_NOMERED').val(value.STURMADISC_NOMERED);
				$('#AGENDAMENTO_MAXALUNOS').val(value.STURMADISC_MAXALUNOS);
				$('#AGENDAMENTO_DTINICIAL').val(value.STURMADISC_DTINICIAL);
				$('#AGENDAMENTO_DTFINAL').val(value.STURMADISC_DTFINAL);
				$('#AGENDAMENTO_IDTURMADISC').val(value.STURMADISC_IDTURMADISC);
				$('#AGENDAMENTO_CODTURNO').val(value.STURMADISC_CODTURNO);
				$('#AGENDAMENTO_CH').val(value.STURMADISC_CH);
				
				$('#AGENDAMENTO_CODTIPOCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#AGENDAMENTO_IDPERLET').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#AGENDAMENTO_CODMODALIDADE').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#AGENDAMENTO_CODCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#AGENDAMENTO_DISCIPLINA').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#AGENDAMENTO_IDHABILITACAOFILIAL').attr("style", "pointer-events: none;background: #EEE; border: none;");
			
		});

		$('#AGENDAMENTO_DTINICIAL').datetimepicker({ 
			pickDate: true, 
			pickTime: false,
			language: 'pt-BR'
		});	

		$('#AGENDAMENTO_DTFINAL').datetimepicker({ 
			pickDate: true, 
			pickTime: false,
			language: 'pt-BR'
		});	
		
		$('#AGENDAMENTO_CODTIPOCURSO').empty();
		$('#AGENDAMENTO_CODTIPOCURSO').ready(
				function(){
					var ds_CadastroTurma_Contexto = DatasetFactory.getDataset("ds_CadastroTurma_Contexto", null, null, null);
					
					$('#AGENDAMENTO_CODTIPOCURSO').append('<option value="" >SELECIONE</option>');
					if (ds_CadastroTurma_Contexto.values.length > 0) {
						$.each(ds_CadastroTurma_Contexto.values, function(key, value) {
							if(value.STURMA_CODTIPOCURSO == AGENDAMENTO_CODTIPOCURSO){ 
								$('#AGENDAMENTO_CODTIPOCURSO').append('<option value="' + value.STURMA_CODTIPOCURSO + '" selected >' + value.STURMA_NOMECONTEXTO + '</option>');
							} else {
								$('#AGENDAMENTO_CODTIPOCURSO').append('<option value="' + value.STURMA_CODTIPOCURSO + '">' + value.STURMA_NOMECONTEXTO + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_IDPERLET').empty();
		$('#AGENDAMENTO_IDPERLET').ready(
				function(){
					var cs_AGENDAMENTO_IDPERLET= DatasetFactory.createConstraint("STURMA_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
					var constraintsIdperlet = new Array(cs_AGENDAMENTO_IDPERLET);
					var ds_CadastroTurma_PeriodoLetivo = DatasetFactory.getDataset("ds_CadastroTurma_PeriodoLetivo", null, constraintsIdperlet, null);
					
					$('#AGENDAMENTO_IDPERLET').append('<option value="" >SELECIONE</option>');
					if (ds_CadastroTurma_PeriodoLetivo.values.length > 0) {
						$.each(ds_CadastroTurma_PeriodoLetivo.values, function(key, value) {
							if(value.STURMA_IDPERLET == AGENDAMENTO_IDPERLET){
								$('#AGENDAMENTO_IDPERLET').append('<option value="' + value.STURMA_IDPERLET + '" selected >' + value.SPLETIVO_DESCRICAO + '</option>');
							} else {
								$('#AGENDAMENTO_IDPERLET').append('<option value="' + value.STURMA_IDPERLET + '">' + value.SPLETIVO_DESCRICAO + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_CODMODALIDADE').empty();
		$('#AGENDAMENTO_CODMODALIDADE').ready(
				function(){
					var ds_ConsultaTurma_Modalidade = DatasetFactory.getDataset("ds_ConsultaTurma_Modalidade", null, null, null);
					
					$('#AGENDAMENTO_CODMODALIDADE').append('<option value="" >SELECIONE</option>');
					if (ds_ConsultaTurma_Modalidade.values.length > 0) {
						$.each(ds_ConsultaTurma_Modalidade.values, function(key, value) {
							if(value.STURMA_CODMODALIDADECURSO == AGENDAMENTO_CODMODALIDADE){
								$('#AGENDAMENTO_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '" selected >' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
							} else {
								$('#AGENDAMENTO_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '">' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_CODCURSO').empty();
		$('#AGENDAMENTO_CODCURSO').ready(
			function(){//teste
				var cs_AGENDAMENTO_CODCURSO= DatasetFactory.createConstraint("STURMA_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
				var cs_AGENDAMENTO_CODMODALIDADECURSO= DatasetFactory.createConstraint("STURMA_CODMODALIDADECURSO", $('#AGENDAMENTO_CODMODALIDADE').val(), $('#AGENDAMENTO_CODMODALIDADE').val(), ConstraintType.MUST);
				var constraintsCodcurso = new Array(cs_AGENDAMENTO_CODCURSO, cs_AGENDAMENTO_CODMODALIDADECURSO);
				var ds_CadastroTurma_Cursos = DatasetFactory.getDataset("ds_CadastroTurma_Cursos", null, constraintsCodcurso, null);
				
				$('#AGENDAMENTO_CODCURSO').empty();
				$('#AGENDAMENTO_CODCURSO').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroTurma_Cursos.values.length > 0) {
					$.each(ds_CadastroTurma_Cursos.values, function(key, value) {
						if(value.STURMA_CODCURSO == AGENDAMENTO_CODCURSO){
							$('#AGENDAMENTO_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '" selected >' + value.SCURSO_NOME + '</option>');
						} else {
							$('#AGENDAMENTO_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '">' + value.SCURSO_NOME + '</option>');
						}
					});
				}
			}
		);
		
		$('#AGENDAMENTO_TIPOTURMA').empty();
		$('#AGENDAMENTO_TIPOTURMA').ready(
				function(){
					var ds_ConsultaTurmaDisciplina_TipoTurma = DatasetFactory.getDataset("ds_ConsultaTurmaDisciplina_TipoTurma", null, null, null);
					
					$('#AGENDAMENTO_TIPOTURMA').append('<option value="" >SELECIONE</option>');
					if (ds_ConsultaTurmaDisciplina_TipoTurma.values.length > 0) {
						$.each(ds_ConsultaTurmaDisciplina_TipoTurma.values, function(key, value) {
							if(value.STURMADISC_TIPOTURMA == AGENDAMENTO_TIPOTURMA){
								$('#AGENDAMENTO_TIPOTURMA').append('<option value="' + value.STURMADISC_TIPOTURMA + '" selected >' + value.STURMADISC_DESCTIPOTURMA + '</option>');
							} else {
								$('#AGENDAMENTO_TIPOTURMA').append('<option value="' + value.STURMADISC_TIPOTURMA + '">' + value.STURMADISC_DESCTIPOTURMA + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_DISCIPLINA').empty();
		$('#AGENDAMENTO_DISCIPLINA').ready(
				function(){
					var cs_AGENDAMENTO_CODTIPOCURSO = DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
					var cs_AGENDAMENTO_IDTURMADISC = DatasetFactory.createConstraint("STURMADISC_IDTURMADISC", AGENDAMENTO_IDTURMADISC, AGENDAMENTO_IDTURMADISC, ConstraintType.MUST);
					var constraintsTipoCurso = new Array(cs_AGENDAMENTO_CODTIPOCURSO, cs_AGENDAMENTO_IDTURMADISC);
					var ds_ContultaTurmaDisciplina_Disciplina = DatasetFactory.getDataset("ds_ContultaTurmaDisciplina_Disciplina", null, constraintsTipoCurso, null);
					
					$('#AGENDAMENTO_DISCIPLINA').append('<option value="" >SELECIONE</option>');
					if (ds_ContultaTurmaDisciplina_Disciplina.values.length > 0) {
						$.each(ds_ContultaTurmaDisciplina_Disciplina.values, function(key, value) {
							if(value.STURMADISC_CODDISC == AGENDAMENTO_CODDISC){
								$('#AGENDAMENTO_DISCIPLINA').append('<option value="' + value.STURMADISC_CODDISC + '" selected >' + value.STURMADISC_DISCIPLINA + '</option>');
							} else {
								$('#AGENDAMENTO_DISCIPLINA').append('<option value="' + value.STURMADISC_CODDISC + '">' + value.STURMADISC_DISCIPLINA + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_IDHABILITACAOFILIAL').empty();
		$('#AGENDAMENTO_IDHABILITACAOFILIAL').ready(
				function(){
					var cs_AGENDAMENTO_CODTIPOCURSO = DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
					var cs_AGENDAMENTO_IDTURMADISC = DatasetFactory.createConstraint("STURMADISC_IDTURMADISC", AGENDAMENTO_IDTURMADISC, AGENDAMENTO_IDTURMADISC, ConstraintType.MUST);
					var constraintsTipoCurso = new Array(cs_AGENDAMENTO_CODTIPOCURSO, cs_AGENDAMENTO_IDTURMADISC);
					var ds_ContultaTurmaDisciplina_Disciplina = DatasetFactory.getDataset("ds_ContultaTurmaDisciplina_Disciplina", null, constraintsTipoCurso, null);
					
					$('#AGENDAMENTO_IDHABILITACAOFILIAL').append('<option value="" >SELECIONE</option>');
					if (ds_ContultaTurmaDisciplina_Disciplina.values.length > 0) {
						$.each(ds_ContultaTurmaDisciplina_Disciplina.values, function(key, value) {
							if(value.STURMADISC_CODTURNO == AGENDAMENTO_CODTURNO){
								$('#AGENDAMENTO_IDHABILITACAOFILIAL').append('<option value="' + value.STURMADISC_IDHABILITACAOFILIAL + '" selected >' + value.STURMADISC_TURNO + '</option>');
							} else {
								$('#AGENDAMENTO_IDHABILITACAOFILIAL').append('<option value="' + value.STURMADISC_IDHABILITACAOFILIAL + '">' + value.STURMADISC_TURNO + '</option>');
							}
						});
					}
				}
		);
		
		$('#AGENDAMENTO_LOCAL').empty();
		$('#AGENDAMENTO_LOCAL').ready(
				function(){
					var cs_AGENDAMENTO_CODTIPOCURSO = DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
					var constraintsTipoCurso = new Array(cs_AGENDAMENTO_CODTIPOCURSO);
					var ds_ContultaTurmaDisciplina_Local = DatasetFactory.getDataset("ds_ContultaTurmaDisciplina_Local", null, constraintsTipoCurso, null);
					
					$('#AGENDAMENTO_LOCAL').append('<option value="" >SELECIONE</option>');
					if (ds_ContultaTurmaDisciplina_Local.values.length > 0) {
						$.each(ds_ContultaTurmaDisciplina_Local.values, function(key, value) {
							if(value.STURMADISC_LOCAL == AGENDAMENTO_LOCAL){
								$('#AGENDAMENTO_LOCAL').append('<option value="' + value.STURMADISC_LOCAL + '" selected >' + value.STURMADISC_DESCLOCAL + '</option>');
							} else {
								$('#AGENDAMENTO_LOCAL').append('<option value="' + value.STURMADISC_LOCAL + '">' + value.STURMADISC_DESCLOCAL + '</option>');
							}
						});
					}
				}
		);
		
		$('#SHORARIO_HORAINICIAL').empty();
		$('#SHORARIO_HORAINICIAL').ready(
				function(){
					var cs_SHORARIO_CODTURNO = DatasetFactory.createConstraint("SHORARIO_CODTURNO", $('#AGENDAMENTO_CODTURNO').val(), $('#AGENDAMENTO_CODTURNO').val(), ConstraintType.MUST);
					var constraintsCodTurno = new Array(cs_SHORARIO_CODTURNO);
					var ds_PainelAgendamento_Horarios = DatasetFactory.getDataset("ds_PainelAgendamento_Horarios", null, constraintsCodTurno, null);
					
					$('#SHORARIO_HORAINICIAL').append('<option value="" >SELECIONE</option>');
					if (ds_PainelAgendamento_Horarios.values.length > 0) {
						$.each(ds_PainelAgendamento_Horarios.values, function(key, value) {
							if(value.SHORARIO_HORAINICIAL == $('#SHORARIO_HORAINICIAL').val()){
								$('#SHORARIO_HORAINICIAL').append('<option value="' + value.SHORARIO_HORARIO + '" selected >' + value.SHORARIO_HORARIO + '</option>');
							} else {
								$('#SHORARIO_HORAINICIAL').append('<option value="' + value.SHORARIO_HORARIO + '">' + value.SHORARIO_HORARIO + '</option>');
							}
						});
					}
				}
		);
		
	}

	var cs_TAPPS_IDTURMADISC = DatasetFactory.createConstraint("TAPPS_IDTURMADISC", idTurmaDisc, idTurmaDisc, ConstraintType.MUST);
	var constraintsDadosTapps = new Array(cs_TAPPS_IDTURMADISC);
	var ds_PainelAceiteInstrutor_DadosTapps = DatasetFactory.getDataset("ds_PainelAceiteInstrutor_DadosTapps", null, constraintsDadosTapps, null);
	var dados = ds_PainelAceiteInstrutor_DadosTapps.values[0];

	var totalGeral = 0;
	var kmTotal = 0;

	$('#codccusto').val(dados.CODCCUSTO);
	$('#codcfo').val(dados.CODCFO);

	$('#TAPPS_IDPROFESSORTURMA').val(dados.TAPPS_IDPROFESSORTURMA);

	var TAPPS_EMPRESA = document.getElementById("TAPPS_EMPRESA");
	TAPPS_EMPRESA.textContent = dados.TAPPS_EMPRESA;
	
	var TAPPS_CNPJ = document.getElementById("TAPPS_CNPJ");
	TAPPS_CNPJ.textContent = dados.TAPPS_CNPJ;

	var TAPPS_INSTRUTOR = document.getElementById("TAPPS_INSTRUTOR");
	TAPPS_INSTRUTOR.textContent = dados.TAPPS_INSTRUTOR;

	var TAPPS_LOCAL = document.getElementById("TAPPS_LOCAL");
	TAPPS_LOCAL.textContent = dados.TAPPS_LOCAL;

	// var TAPPS_DISTANCIA = document.getElementById("TAPPS_DISTANCIA");
	// TAPPS_DISTANCIA.textContent = (dados.TAPPS_DISTANCIA * 2) + 'km';

	var TAPPS_CURSO = document.getElementById("TAPPS_CURSO");
	TAPPS_CURSO.textContent = dados.TAPPS_CURSO;
	
	var TAPPS_IDTURMADISC = document.getElementById("TAPPS_IDTURMADISC");
	TAPPS_IDTURMADISC.textContent = dados.TAPPS_IDTURMADISC;
	
	var TAPPS_DISCIPLINA = document.getElementById("TAPPS_DISCIPLINA");
	TAPPS_DISCIPLINA.textContent = dados.TAPPS_DISCIPLINA;

	var TAPPS_CHTOTAL = document.getElementById("TAPPS_CHTOTAL");
	TAPPS_CHTOTAL.textContent = dados.TAPPS_CHTOTAL + 'h';
	
	$('#aditivo').text(dados.ADITIVO + '/' + dados.ANOADITIVO);
	$('#codcontrato').text(dados.CODCONTRATO);
	$('#codprof').val(dados.TAPPS_CODPROF);
	$('#aditivoCont').val(dados.ADITIVO);
	$('#anoAditivoCont').val(dados.ANOADITIVO);
	$('#roteiro').text(dados.LOCALORIGEM + ' / ' + dados.TAPPS_LOCAL + ' / ' + dados.TAPPS_LOCAL + ' / ' + dados.LOCALORIGEM);

	// $('#TAPPS_EMPRESA').val(dados.TAPPS_EMPRESA);
	// $('#TAPPS_CNPJ').val(dados.TAPPS_CNPJ);

	var cs_TAPPS_CODTIPOCURSO = DatasetFactory.createConstraint("TAPPS_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
	var cs_TAPPS_IDTURMADISC = DatasetFactory.createConstraint("TAPPS_IDTURMADISC", $('#AGENDAMENTO_IDTURMADISC').val(), $('#AGENDAMENTO_IDTURMADISC').val(), ConstraintType.MUST);
	
	var constraintsTapps = new Array(cs_TAPPS_CODTIPOCURSO, cs_TAPPS_IDTURMADISC);
	var ds_PainelAceiteInstrutor_DadosTappsPeriodos = DatasetFactory.getDataset("ds_PainelAceiteInstrutor_DadosTappsPeriodos", null, constraintsTapps, null);
	
	var qtdeKm = 0;

	if (ds_PainelAceiteInstrutor_DadosTappsPeriodos.values.length > 0) {
		
		$('#TITULO_PERIODOS').append('Períodos de execução');

		for(var i = 0; i < ds_PainelAceiteInstrutor_DadosTappsPeriodos.values.length; i++) {
			var dadosTapps = ds_PainelAceiteInstrutor_DadosTappsPeriodos.values[i];

			var distancia = 1.32 * Number(dadosTapps.DISTANCIA);
			var total = Number(dadosTapps.VALORTOTAL) + Number(distancia);
			
			var htmlPeriodos = 	'<strong>Período: </strong>' + dadosTapps.DATAINICIO + ' a ' + dadosTapps.DATAFIM + '<br />' +
								'<strong>Carga horária: </strong>' + dadosTapps.TOTALHORAS + 'h<br />' +
								'<strong>Valor carga horária x hora aula: </strong>' + dadosTapps.TOTALHORAS + ' x R$ ' + mascaraValorVirgula(dadosTapps.VALORHORA) + ' = R$ ' + mascaraValorVirgula(dadosTapps.VALORTOTAL) + '<br />' +
								'<strong>Valor km x total de km percorrido: </strong> R$ 1,42 x ' + dadosTapps.DISTANCIA + ' = R$ '+ mascaraValorVirgula(distancia) +'<br />' +
								'<strong>Custo da prestação de serviço por período: </strong>R$ ' + mascaraValorVirgula(total.toFixed(2)) + '<br />' +
								'<strong>Valor extenso: </strong>' + ValorPorExtenso(total) + ' <br />';
								
								qtdeKm += dadosTapps.QTDESEMANAS;
								totalGeral += total;
								kmTotal += parseInt(dadosTapps.DISTANCIA);

			if(i < (ds_PainelAceiteInstrutor_DadosTappsPeriodos.values.length - 1)){
				htmlPeriodos += '<hr>';
			}

			$('#periodosDisciplinas').append(htmlPeriodos);
			
		}
	}

	var VALOR_TOTAL =  document.getElementById("VALOR_TOTAL");
	VALOR_TOTAL.textContent = mascaraValorVirgula(totalGeral);
	
	var VALOR_TOTALEXTENSO = document.getElementById("VALOR_TOTALEXTENSO");
	VALOR_TOTALEXTENSO.textContent = ValorPorExtenso(totalGeral);


	var dataDoDia = new Date();
	dataDoDia = dataDoDia.getDate() + '/' + (dataDoDia.getMonth()+1) + '/' + dataDoDia.getFullYear();
	$('#dataDia').text(DataExtenso(dataDoDia));

	$('#kmtotal').val(kmTotal);
	$('#valorHora').val(dadosTapps.VALORHORA);
	$('#TAPPS_DISTANCIA').val(qtdeKm + 'km');

	myLoading3.hide();

}

function atualizarAceite(aceite){
	var titulo = '';
	var texto = '';
	var botao = '';
	var classe = '';

	if(aceite == 'R'){
		titulo = 'Rejeitar';
		texto = 'rejeitar';
		botao = 'Rejeitar';
		classe = 'btn btn-danger';

	} else if(aceite == 'A'){
		titulo = 'Aceitar';
		texto = 'aceitar';
		botao = 'Aceitar';
		classe = 'btn btn-success';
	}


	var myModal = FLUIGC.modal({ 
        title: titulo, 
        content: 'Tem certeza que deseja '+ texto + ' a agenda?',
    
        id: 'fluig-modal-aceite',
            size: 'small',
            actions: [{
                'label': botao,
                'bind': 'data-aceite',
				'classType': classe,
                'autoClose': true
            }, {
                'label': 'Cancelar',
                'autoClose': true,
                'bind':'data-fechar'
            }]
    
    }, function (err, data) {
        
        $("#fluig-modal-aceite").find("button[data-aceite]").on("click", function() {
			//console.log('cliquei no botão' + botao);
			var myLoading3 = FLUIGC.loading(window);
    		myLoading3.show();

			var aceito;

			if(aceite == 'R'){
				aceito = 2;	
			} else if(aceite == 'A'){
				aceito = 1;
			}

			var xmlInstrutor = "<EduProfessorTurma>" +
							   " <SPROFESSORTURMA> " +
							   "   <CODCOLIGADA>1</CODCOLIGADA> " +
							   "   <IDPROFESSORTURMA>" + $('#TAPPS_IDPROFESSORTURMA').val() + "</IDPROFESSORTURMA> " +
							   "   <IDPERLET>" + $('#AGENDAMENTO_IDPERLET').val() + "</IDPERLET> " +
							   "   <IDTURMADISC>" + $('#AGENDAMENTO_IDTURMADISC').val() + "</IDTURMADISC> " +
							   " </SPROFESSORTURMA> " +
							   " <SPROFESSORTURMACOMPL> " +
							   "   <CODCOLIGADA>1</CODCOLIGADA> " +
							   "   <IDPROFESSORTURMA>" + $('#TAPPS_IDPROFESSORTURMA').val() + "</IDPROFESSORTURMA> " +
							   "   <ACEITO>" + aceito + "</ACEITO> " +
							   " </SPROFESSORTURMACOMPL> " +
							   "</EduProfessorTurma>";
				
			//console.log(xmlInstrutor);
			
			var tabelaInstrutor= DatasetFactory.createConstraint("tabelaRM", 'EduProfessorTurmaData', 'EduProfessorTurmaData', ConstraintType.MUST);
			var xml= DatasetFactory.createConstraint("fieldsXml", xmlInstrutor, xmlInstrutor, ConstraintType.MUST);
			var tela = "Instrutor";
			var retornoInstrutor = persisteDados(tabelaInstrutor,xml,tela);

			if(retornoInstrutor != 1) {
				myLoading3.hide();
				MensagemAlerta('Atenção!','Erro ao gravar Instrutor! ' + retornoInstrutor);
				return false;
			}
			
			if(aceite == 'A'){
				var XML_MOVIMENTO = "", XML_MOVIMENTOITEM = "";
				XML_MOVIMENTO = "<MovMovimento >";
				//if (hAPI.getChildrenIndexes("FCFOCONTATO").length > 0) {
					//for (var i = 0; i < ds_fluig_solicitacao_de_compra_movimento.values.length; i++) {
						XML_MOVIMENTO += "<TMOV>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTO += "<CODFILIAL>1</CODFILIAL>";
							XML_MOVIMENTO += "<CODLOC>001.000</CODLOC>";
							XML_MOVIMENTO += "<CODCFO>"+$('#codcfo').val()+"</CODCFO>";
							XML_MOVIMENTO += "<SERIE>TAPPS</SERIE>";
							XML_MOVIMENTO += "<CODTMV>1.1.20</CODTMV>";
							XML_MOVIMENTO += "<TIPO>A</TIPO>";
							XML_MOVIMENTO += "<STATUS>A</STATUS>";
							XML_MOVIMENTO += "<CODCPG>20</CODCPG>";
							XML_MOVIMENTO += "<CODMOEVALORLIQUIDO>R$</CODMOEVALORLIQUIDO>";
							XML_MOVIMENTO += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTO += "<CODCOLCFO>0</CODCOLCFO>";
							XML_MOVIMENTO += "<INTEGRADOAUTOMACAO>0</INTEGRADOAUTOMACAO>";
							XML_MOVIMENTO += "<INTEGRAAPLICACAO>T</INTEGRAAPLICACAO>";
							XML_MOVIMENTO += "<IDMOVCFO>-1</IDMOVCFO>";
							XML_MOVIMENTO += "<HISTORICOCURTO>Movimento gerado pela integração TOTVS EDUCACIONAL [Educação Formal]</HISTORICOCURTO>";
							XML_MOVIMENTO += "<IDINTEGRACAO>T</IDINTEGRACAO>";
							XML_MOVIMENTO += "<CODCOLIGADA1>1</CODCOLIGADA1>";
							XML_MOVIMENTO += "<IDMOVHST>-1</IDMOVHST>";
						XML_MOVIMENTO += "</TMOV>";
					
						XML_MOVIMENTO += "<TNFE>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
						XML_MOVIMENTO += "</TNFE>";

						XML_MOVIMENTO += "<TMOVFISCAL>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTO += "<CONTRIBUINTECREDENCIADO>0</CONTRIBUINTECREDENCIADO>";
							XML_MOVIMENTO += "<OPERACAOCONSUMIDORFINAL>0</OPERACAOCONSUMIDORFINAL>";
							XML_MOVIMENTO += "<OPERACAOPRESENCIAL>0</OPERACAOPRESENCIAL>";
						XML_MOVIMENTO += "</TMOVFISCAL>";

						XML_MOVIMENTO += "<TMOVRATCCU>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTO += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTO += "<VALOR>0</VALOR>";
							XML_MOVIMENTO += "<IDMOVRATCCU>-1</IDMOVRATCCU>";
						XML_MOVIMENTO += "</TMOVRATCCU>";
		
						//ITEM HORA AULA
						XML_MOVIMENTOITEM += "<TITMMOV>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>1</NSEQITMMOV>";
							XML_MOVIMENTOITEM += "<CODFILIAL>1</CODFILIAL>";
							XML_MOVIMENTOITEM += "<NUMEROSEQUENCIAL>1</NUMEROSEQUENCIAL>";
							XML_MOVIMENTOITEM += "<IDPRD>3847</IDPRD>";
							XML_MOVIMENTOITEM += "<QUANTIDADE>"+$('#TAPPS_CHTOTAL').text().replace('h','')+"</QUANTIDADE>";
							XML_MOVIMENTOITEM += "<PRECOUNITARIO>"+$('#valorHora').val().replace('.',',')+"</PRECOUNITARIO>";
							XML_MOVIMENTOITEM += "<CODUND>UN</CODUND>";
							XML_MOVIMENTOITEM += "<CODCPG>20</CODCPG>";
							XML_MOVIMENTOITEM += "<VALORUNITARIO>"+$('#valorHora').val().replace('.',',')+"</VALORUNITARIO>";
							XML_MOVIMENTOITEM += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTOITEM += "<QUANTIDADEORIGINAL>" + $('#TAPPS_CHTOTAL').text().replace('h','') + "</QUANTIDADEORIGINAL>";
							XML_MOVIMENTOITEM += "<QTDEVOLUMEUNITARIO>" + $('#TAPPS_CHTOTAL').text().replace('h','') + "</QTDEVOLUMEUNITARIO>";
							XML_MOVIMENTOITEM += "<CODTBORCAMENTO>2.07.26</CODTBORCAMENTO>";
							XML_MOVIMENTOITEM += "<CODLOC>001.000</CODLOC>";
							XML_MOVIMENTOITEM += "<QUANTIDADETOTAL>" + $('#TAPPS_CHTOTAL').text().replace('h','') + "</QUANTIDADETOTAL>";
							XML_MOVIMENTOITEM += "<INTEGRAAPLICACAO>T</INTEGRAAPLICACAO>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA1>1</CODCOLIGADA1>";
							XML_MOVIMENTOITEM += "<IDMOVHST>-1</IDMOVHST>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV1>1</NSEQITMMOV1>";
						XML_MOVIMENTOITEM += "</TITMMOV>";

						//ITEM KM
						XML_MOVIMENTOITEM += "<TITMMOV>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>2</NSEQITMMOV>";
							XML_MOVIMENTOITEM += "<CODFILIAL>1</CODFILIAL>";
							XML_MOVIMENTOITEM += "<NUMEROSEQUENCIAL>2</NUMEROSEQUENCIAL>";
							XML_MOVIMENTOITEM += "<IDPRD>1766</IDPRD>";
							XML_MOVIMENTOITEM += "<QUANTIDADE>"+$('#kmtotal').val().replace('h','')+"</QUANTIDADE>";
							XML_MOVIMENTOITEM += "<PRECOUNITARIO>1,42</PRECOUNITARIO>";
							XML_MOVIMENTOITEM += "<CODUND>UN</CODUND>";
							XML_MOVIMENTOITEM += "<CODCPG>20</CODCPG>";
							XML_MOVIMENTOITEM += "<VALORUNITARIO>1,42</VALORUNITARIO>";
							XML_MOVIMENTOITEM += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTOITEM += "<QUANTIDADEORIGINAL>" + $('#kmtotal').val().replace('h','') + "</QUANTIDADEORIGINAL>";
							XML_MOVIMENTOITEM += "<QTDEVOLUMEUNITARIO>" + $('#kmtotal').val().replace('h','') + "</QTDEVOLUMEUNITARIO>";
							XML_MOVIMENTOITEM += "<CODTBORCAMENTO>2.07.26</CODTBORCAMENTO>";
							XML_MOVIMENTOITEM += "<CODLOC>001.000</CODLOC>";
							XML_MOVIMENTOITEM += "<QUANTIDADETOTAL>" + $('#kmtotal').val().replace('h','') + "</QUANTIDADETOTAL>";
							XML_MOVIMENTOITEM += "<INTEGRAAPLICACAO>T</INTEGRAAPLICACAO>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA1>1</CODCOLIGADA1>";
							XML_MOVIMENTOITEM += "<IDMOVHST>-1</IDMOVHST>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV1>2</NSEQITMMOV1>";
						XML_MOVIMENTOITEM += "</TITMMOV>";

						XML_MOVIMENTOITEM += "<TITMMOVRATCCU>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>1</NSEQITMMOV>";
							XML_MOVIMENTOITEM += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTOITEM += "<PERCENTUAL>100</PERCENTUAL>";
							XML_MOVIMENTOITEM += "<VALOR>0</VALOR>";
							XML_MOVIMENTOITEM += "<IDMOVRATCCU>-1</IDMOVRATCCU>";
						XML_MOVIMENTOITEM += "</TITMMOVRATCCU>";

						XML_MOVIMENTOITEM += "<TITMMOVRATCCU>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>2</NSEQITMMOV>";
							XML_MOVIMENTOITEM += "<CODCCUSTO>"+$('#codccusto').val()+"</CODCCUSTO>";
							XML_MOVIMENTOITEM += "<PERCENTUAL>100</PERCENTUAL>";
							XML_MOVIMENTOITEM += "<VALOR>0</VALOR>";
							XML_MOVIMENTOITEM += "<IDMOVRATCCU>-1</IDMOVRATCCU>";
						XML_MOVIMENTOITEM += "</TITMMOVRATCCU>";

						XML_MOVIMENTOITEM += "<TITMMOVCOMPL>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>1</NSEQITMMOV>";
						XML_MOVIMENTOITEM += "</TITMMOVCOMPL>";
						
						XML_MOVIMENTOITEM += "<TITMMOVCOMPL>";
							XML_MOVIMENTOITEM += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTOITEM += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTOITEM += "<NSEQITMMOV>2</NSEQITMMOV>";
						XML_MOVIMENTOITEM += "</TITMMOVCOMPL>";
						
						XML_MOVIMENTO += XML_MOVIMENTOITEM;

						XML_MOVIMENTO += "<TMOVCOMPL>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
							XML_MOVIMENTO += "<MODALIDADE>13</MODALIDADE>";
							XML_MOVIMENTO += "<IDTURMADISC>"+$('#AGENDAMENTO_IDTURMADISC').val()+"</IDTURMADISC>";
							XML_MOVIMENTO += "<ADITIVOCONTRATUAL>"+$('#aditivoCont').val()+"</ADITIVOCONTRATUAL>";
							XML_MOVIMENTO += "<ANOCONTRATO>"+$('#anoAditivoCont').val()+"</ANOCONTRATO>";
							XML_MOVIMENTO += "<NRDOCUMENTO>"+$('#codcontrato').text()+"</NRDOCUMENTO>";
							XML_MOVIMENTO += "<KMDESLOCAMENTO>"+$('#kmtotal').val()+"</KMDESLOCAMENTO>";
							XML_MOVIMENTO += "<ROTEIROEVENTO>"+$('#roteiro').text()+"</ROTEIROEVENTO>";
							XML_MOVIMENTO += "<CODPROF>"+$('#codprof').val()+"</CODPROF>";
							XML_MOVIMENTO += "<DATAINICIOAULA>"+$('#AGENDAMENTO_DTINICIAL').val()+"</DATAINICIOAULA>";
							XML_MOVIMENTO += "<DATAFIMAULA>"+$('#AGENDAMENTO_DTFINAL').val()+"</DATAFIMAULA>";
						XML_MOVIMENTO += "</TMOVCOMPL>";
						
						XML_MOVIMENTO += "<TMOVTRANSP>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
						XML_MOVIMENTO += "</TMOVTRANSP>";
						
						XML_MOVIMENTO += "<TCTRCMOV>";
							XML_MOVIMENTO += "<CODCOLIGADA>1</CODCOLIGADA>";
							XML_MOVIMENTO += "<IDMOV>-1</IDMOV>";
						XML_MOVIMENTO += "</TCTRCMOV>";				
					//}			
				//}
				
				XML_MOVIMENTO += "</MovMovimento>";

				var tabelaMovimento= DatasetFactory.createConstraint("tabelaRM", 'MovMovimentoTbcData', 'MovMovimentoTbcData', ConstraintType.MUST);
				var xmlMov= DatasetFactory.createConstraint("fieldsXml", XML_MOVIMENTO, XML_MOVIMENTO, ConstraintType.MUST);
				var tela = "Movimento";
				var retornoMovimento = persisteDados(tabelaMovimento,xmlMov,tela);

				
				//hAPI.setCardValue('XML_MOVIMENTO', XML_MOVIMENTO);
			
				// var cs_AGENDAMENTO_IDTURMADISC= DatasetFactory.createConstraint("AGENDAMENTO_IDTURMADISC", $('#AGENDAMENTO_IDTURMADISC').val(), $('#AGENDAMENTO_IDTURMADISC').val(), ConstraintType.MUST);
					
				// var constraints = new Array(cs_AGENDAMENTO_IDTURMADISC);
				// var	ds_PainelAgendamento_PlanoAula = DatasetFactory.getDataset("ds_PainelAgendamento_PlanoAula", null, constraints, null);

				// var SPLANOAULA_DATAINICIAL = ds_PainelAgendamento_PlanoAula.values[0].SPLANOAULA_DATAINICIAL;
				// var SPLANOAULA_DATAFINAL = ds_PainelAgendamento_PlanoAula.values[0].SPLANOAULA_DATAFINAL;


				// var xmlFormulaVisual = '<?xml version="1.0" encoding="utf-16"?> ' +
				// '<GlbWorkflowExecParamsProc z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/"> ' +
				// '  <ActionModule xmlns="http://www.totvs.com/">G</ActionModule> ' +
				// '  <ActionName xmlns="http://www.totvs.com/">GlbWorkflowExecAction</ActionName> ' +
				// '  <CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize> ' +
				// '  <CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail> ' +
				// '  <CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule> ' +
				// '  <CodUsuario xmlns="http://www.totvs.com/">mestre</CodUsuario> ' +
				// '  <ConnectionId i:nil="true" xmlns="http://www.totvs.com/" /> ' +
				// '  <ConnectionString i:nil="true" xmlns="http://www.totvs.com/" /> ' +
				// '  <Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/"> ' +
				// '    <a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EXERCICIOFISCAL</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">3</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODLOCPRT</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODTIPOCURSO</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">8</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EDUTIPOUSR</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUNIDADEBIB</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$RHTIPOUSR</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODIGOEXTERNO</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">S</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIOSERVICO</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema" /> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">mestre</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$IDPRJ</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">10</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CHAPAFUNCIONARIO</b:Key> ' +
				// '        <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '      <b:KeyValueOfanyTypeanyType> ' +
				// '        <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODFILIAL</b:Key> ' +
				// '        <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value> ' +
				// '      </b:KeyValueOfanyTypeanyType> ' +
				// '    </a:_params> ' +
				// '    <a:Environment>DotNet</a:Environment> ' +
				// '  </Context> ' +
				// '  <FailureMessage xmlns="http://www.totvs.com/">Falha na execução do processo</FailureMessage> ' +
				// '  <FriendlyLogs i:nil="true" xmlns="http://www.totvs.com/" /> ' +
				// '  <PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
				// '    <a:ArrayOfanyType> ' +
				// '      <a:anyType i:type="b:short" xmlns:b="http://www.w3.org/2001/XMLSchema">1</a:anyType> ' +
				// '      <a:anyType i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">' + $('#AGENDAMENTO_IDTURMADISC').val() + '</a:anyType> ' +
				// '    </a:ArrayOfanyType> ' +
				// '  </PrimaryKeyList> ' +
				// '<PrimaryKeyNames xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
				// '    <a:string>CODCOLIGADA</a:string> ' +
				// '    <a:string>IDTURMADISC</a:string> ' +
				// '  </PrimaryKeyNames> ' +
				// '  <PrimaryKeyTableName xmlns="http://www.totvs.com/">STURMADISC</PrimaryKeyTableName> ' +
				// '  <ProcessName xmlns="http://www.totvs.com/">Executar Fórmula Visual</ProcessName> ' +
				// '  <SaveLogInDatabase xmlns="http://www.totvs.com/">true</SaveLogInDatabase> ' +
				// '  <ServerName xmlns="http://www.totvs.com/">GlbWorkflowExecProc</ServerName> ' +
				// '  <StatusMessage i:nil="true" xmlns="http://www.totvs.com/" /> ' +
				// '  <SuccessMessage xmlns="http://www.totvs.com/">Processo executado com sucesso</SuccessMessage> ' +
				// '  <CodColigada>1</CodColigada> ' +
				// '  <DataSet> ' +
				// '    <xs:schema id="NewDataSet" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop"> ' +
				// '      <xs:element name="NewDataSet" msdata:IsDataSet="true" msdata:UseCurrentLocale="true" msdata:EnforceConstraints="False" msprop:_x0023__x0023_ReadViewSchemaDataClient="00:00:00" msprop:_x0023__x0023_EduTurmaDiscFormView.ctor_x0028__x0029_="00:00:00.0779980" msprop:_x0023__x0023_FormShown="00:00:01.5287608" msprop:_x0023__x0023_InternalReadViewSchemaClient="00:00:00" msprop:_x0040_PaginationData="True;0;100;0;1;False;;0;;False;False;" msprop:_x0023__x0023_InternalReadViewServer="00:00:00.0155996" msprop:_x0023__x0023_ServerDatabaseOperations="2" msprop:_x0040_DataServerDataSetMaxRecordsExceeded="False" msprop:_x0024_DataServerName="RM.Edu.PeriodoLetivo.EduTurmaDiscData" msprop:_x0023__x0023_InternalReadViewClient="00:00:00.0623984" msprop:_x0023__x0023_WFReadViewPost="00:00:00" msprop:_x0040_DataServerDataSetMaxRecs="500" msprop:_x0023__x0023_WFGetDataSetPropsPre="00:00:00" msprop:_x0023__x0023_WFGetDataSetPropsPost="00:00:00" msprop:_x0023__x0023_WFGetDataSetPost="00:00:00" msprop:_x0023__x0023_WFReadViewPre="00:00:00" msprop:_x0040_DataServerDataSetDefaultMaxRecs="500" msprop:_x0040_DataServerDataSet="True" msprop:_x0040_DataServerUsesPagination="True" msprop:_x0023__x0023_ReadViewDataClient="00:00:00.0467988"> ' +
				// '        <xs:complexType> ' +
				// '          <xs:choice minOccurs="0" maxOccurs="unbounded"> ' +
				// '            <xs:element name="STURMADISC" msprop:_x0024_Caption="Turma Disciplina" msprop:_x0024_OriginTables="System.String[]" msprop:_x0024_Modified="False" msprop:_x0024_Id="IDTURMADISC;CODTURMA;CODDISC" > ' +
				// '              <xs:complexType> ' +
				// '                <xs:sequence> ' +
				// '                  <xs:element name="CODCOLIGADA" msdata:Caption="Coligada" msprop:_x0024_AllowInsert="False" msprop:_x0024_SecTableOrigin="STURMADISC" msprop:_x0024_AllowFilter="False" msprop:_x0024_Origin="STURMADISC.CODCOLIGADA" msprop:_x0024_Alias="STURMADISC.CODCOLIGADA" msprop:_x0024_SecField="CODCOLIGADA" msprop:_x0024_Visible="False" msprop:_x0024_AllowEdit="False" type="xs:short" /> ' +
				// '                  <xs:element name="IDTURMADISC" msdata:Caption="Código" msprop:_x0024_AllowInsert="False" msprop:_x0024_SecTableOrigin="STURMADISC" msprop:_x0024_AllowFilter="True" msprop:_x0024_Origin="STURMADISC.IDTURMADISC" msprop:_x0024_Alias="STURMADISC.IDTURMADISC" msprop:_x0024_SecField="IDTURMADISC" msprop:_x0024_Visible="True" msprop:_x0024_AllowEdit="False" type="xs:int" default="0" /> ' +
				// '                </xs:sequence> ' +
				// '              </xs:complexType> ' +
				// '            </xs:element> ' +
				// '          </xs:choice> ' +
				// '        </xs:complexType> ' +
				// '        <xs:unique name="Constraint1" msdata:PrimaryKey="true"> ' +
				// '          <xs:selector xpath=".//STURMADISC" /> ' +
				// '          <xs:field xpath="CODCOLIGADA" /> ' +
				// '          <xs:field xpath="IDTURMADISC" /> ' +
				// '        </xs:unique> ' +
				// '      </xs:element> ' +
				// '    </xs:schema> ' +
				// '    <diffgr:diffgram xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"> ' +
				// '      <NewDataSet xmlns=""> ' +
				// '        <STURMADISC diffgr:id="STURMADISC1" msdata:rowOrder="0"> ' +
				// '          <CODCOLIGADA>1</CODCOLIGADA> ' +
				// '          <CODFILIAL>1</CODFILIAL> ' +
				// '          <IDTURMADISC>' + $('#AGENDAMENTO_IDTURMADISC').val() + '</IDTURMADISC> ' +
				// '          <IDPERLET>' + $('#AGENDAMENTO_IDPERLET').val() + '</IDPERLET> ' +
				// '          <CODTURMA>' + $('#AGENDAMENTO_CODTURMA').val() + '</CODTURMA> ' +
				// '          <CODDISC>' + $('#AGENDAMENTO_DISCIPLINA').val() + '</CODDISC> ' +
				// '          <CODCURSO>' + $('#AGENDAMENTO_CODCURSO').val() + '</CODCURSO> ' +
				// '          <CODHABILITACAO>' + $('#AGENDAMENTO_CODCURSO').val() + '</CODHABILITACAO> ' +
				// '          <CODGRADE>' + $('#AGENDAMENTO_CODCURSO').val() + '</CODGRADE> ' +
				// '          <IDHABILITACAOFILIAL>' + $('#AGENDAMENTO_IDHABILITACAOFILIAL').val() + '</IDHABILITACAOFILIAL> ' +
				// '          <DTINICIAL>' + FormataStringData($('#AGENDAMENTO_DTINICIAL').val()) + '</DTINICIAL> ' +
				// '          <DTFINAL>' + FormataStringData($('#AGENDAMENTO_DTFINAL').val()) + '</DTFINAL> ' +
				// '          <CODTIPOCURSO>' + $('#AGENDAMENTO_CODTIPOCURSO').val() + '</CODTIPOCURSO> ' +
				// '        </STURMADISC> ' +
				// '      </NewDataSet> ' +
				// '    </diffgr:diffgram> ' +
				// '  </DataSet> ' +
				// '  <IdWorkflow>61</IdWorkflow> ' +
				// '  <Parameters> ' +
				// '    <xs:schema id="Parameters" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:msprop="urn:schemas-microsoft-com:xml-msprop"> ' +
				// '      <xs:element name="Parameters" msdata:IsDataSet="true" msdata:Locale="pt-BR" msdata:EnforceConstraints="False"> ' +
				// '        <xs:complexType> ' +
				// '          <xs:choice minOccurs="0" maxOccurs="unbounded"> ' +
				// '            <xs:element name="Tabela1" msprop:_x0024_Modified="False" msprop:_x0024_Caption="Data Inicial e Final Desejada" msprop:_x0024_Required="True" msprop:_x0024_AllowMultipleRecords="False"> ' +
				// '              <xs:complexType> ' +
				// '                <xs:sequence> ' +
				// '                  <xs:element name="DATAINICIOAULA" msdata:Caption="Data Inicial" msprop:_x0024_Visible="True" msprop:_x0024_ControlType="Default" msprop:_x0024_ControlVisible="True" type="xs:dateTime" /> ' +
				// '                  <xs:element name="DATAFIMAULA" msdata:Caption="Data Final" msprop:_x0024_Visible="True" msprop:_x0024_ControlType="Default" msprop:_x0024_ControlVisible="True" type="xs:dateTime" /> ' +
				// '                </xs:sequence> ' +
				// '              </xs:complexType> ' +
				// '            </xs:element> ' +
				// '          </xs:choice> ' +
				// '        </xs:complexType> ' +
				// '      </xs:element> ' +
				// '    </xs:schema> ' +
				// '    <diffgr:diffgram xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata"> ' +
				// '      <Parameters xmlns=""> ' +
				// '        <Tabela1 diffgr:id="Tabela11" msdata:rowOrder="0" diffgr:hasChanges="inserted"> ' +
				// '          <DATAINICIOAULA>' + SPLANOAULA_DATAINICIAL + '</DATAINICIOAULA> ' +
				// '          <DATAFIMAULA>' + SPLANOAULA_DATAFINAL + '</DATAFIMAULA> ' +
				// '        </Tabela1> ' +
				// '      </Parameters> ' +
				// '    </diffgr:diffgram> ' +
				// '  </Parameters> ' +
				// '</GlbWorkflowExecParamsProc> ';
				
				// //console.log(xmlFormulaVisual);
				
				// var tabelaRM= DatasetFactory.createConstraint("PROCESSSERVERNAME", 'GlbWorkflowExecProc', 'GlbWorkflowExecProc', ConstraintType.MUST);
				// var fieldsXml= DatasetFactory.createConstraint("XML", xmlFormulaVisual, xmlFormulaVisual, ConstraintType.MUST);
				
				// var constraints = new Array(tabelaRM, fieldsXml);
				// var	retornoFormulaVisual = DatasetFactory.getDataset("rm_processSENAR", null, constraints, null);
					
				//console.log(retornoFormulaVisual);

				//if(retornoFormulaVisual.values[0].DS_RETORNO != 1) {
				if(retornoMovimento != 1) {
					var xmlInstrutor = "<EduProfessorTurma>" +
							   " <SPROFESSORTURMA> " +
							   "   <CODCOLIGADA>1</CODCOLIGADA> " +
							   "   <IDPROFESSORTURMA>" + $('#TAPPS_IDPROFESSORTURMA').val() + "</IDPROFESSORTURMA> " +
							   "   <IDPERLET>" + $('#AGENDAMENTO_IDPERLET').val() + "</IDPERLET> " +
							   "   <IDTURMADISC>" + $('#AGENDAMENTO_IDTURMADISC').val() + "</IDTURMADISC> " +
							   " </SPROFESSORTURMA> " +
							   " <SPROFESSORTURMACOMPL> " +
							   "   <CODCOLIGADA>1</CODCOLIGADA> " +
							   "   <IDPROFESSORTURMA>" + $('#TAPPS_IDPROFESSORTURMA').val() + "</IDPROFESSORTURMA> " +
							   "   <ACEITO>3</ACEITO> " +
							   " </SPROFESSORTURMACOMPL> " +
							   "</EduProfessorTurma>";
				
					//console.log(xmlInstrutor);
					
					var tabelaInstrutor= DatasetFactory.createConstraint("tabelaRM", 'EduProfessorTurmaData', 'EduProfessorTurmaData', ConstraintType.MUST);
					var xml= DatasetFactory.createConstraint("fieldsXml", xmlInstrutor, xmlInstrutor, ConstraintType.MUST);
					var tela = "Instrutor"
					var retornoInstrutor = persisteDados(tabelaInstrutor,xml,tela);

					myLoading3.hide();
					MensagemAlerta('Atenção!','Erro ao gravar Instrutor! ' + retornoInstrutor + ' Erro Movimento: ' + retornoMovimento);
					return false;
				}

				// if(retornoFormulaVisual.values[0].DS_RETORNO == 1){
				// 	//Incluir dados no metadados



				// 	var cs_TAPPS_CODTIPOCURSO = DatasetFactory.createConstraint("TAPPS_CODTIPOCURSO", $('#AGENDAMENTO_CODTIPOCURSO').val(), $('#AGENDAMENTO_CODTIPOCURSO').val(), ConstraintType.MUST);
				// 	var cs_TAPPS_IDTURMADISC = DatasetFactory.createConstraint("TAPPS_IDTURMADISC", $('#AGENDAMENTO_IDTURMADISC').val(), $('#AGENDAMENTO_IDTURMADISC').val(), ConstraintType.MUST);
					
				// 	var constraintsTapps = new Array(cs_TAPPS_CODTIPOCURSO, cs_TAPPS_IDTURMADISC);
				// 	var ds_PainelAceiteInstrutor_DadosTappsPeriodos = DatasetFactory.getDataset("ds_PainelAceiteInstrutor_DadosTappsPeriodos", null, constraintsTapps, null);

					
				// 	if (ds_PainelAceiteInstrutor_DadosTappsPeriodos.values.length > 0) {
						
				// 		for(var i = 0; i < ds_PainelAceiteInstrutor_DadosTappsPeriodos.values.length; i++) {
				// 			var dadosTapps = ds_PainelAceiteInstrutor_DadosTappsPeriodos.values[i];
							
				// 			var ds_ContultaTappsId = DatasetFactory.getDataset("ds_ContultaTappsId", null, null, null);
							
				// 			var xmlTapps = "<PRJ3720704> " +
				// 					" <ZMDTAPPSEDUFORMAL> " +
				// 					"   <ID>"+ds_ContultaTappsId.values[0].ID+"</ID> " +
				// 					"   <CODCOLIGADA>1</CODCOLIGADA> " +
				// 					"   <CODTIPOCURSO>"+$('#AGENDAMENTO_CODTIPOCURSO').val()+"</CODTIPOCURSO> " +
				// 					"   <IDTURMADISC>"+$('#AGENDAMENTO_IDTURMADISC').val()+"</IDTURMADISC> " +
				// 					"   <IDPROFESSORTURMA>"+$('#TAPPS_IDPROFESSORTURMA').val()+"</IDPROFESSORTURMA> " +
				// 					"   <DTINICIOPERIODO>"+dadosTapps.DATAINICIO+"</DTINICIOPERIODO> " +
				// 					"   <DTFIMPERIODO>"+ dadosTapps.DATAFIM+"</DTFIMPERIODO> " +
				// 					"   <CHPERIODO>"+dadosTapps.HORAS+"</CHPERIODO> " +
				// 					"   <VALORHORAAULA>"+dadosTapps.VALORHORA+"</VALORHORAAULA> " +
				// 					"   <VALORPERIODO>"+dadosTapps.VALORTOTAL+"</VALORPERIODO> " +
				// 					"   <VALORKM>"+"1.17"+"</VALORKM> " +
				// 					"   <QTDEKM>"+"174"+"</QTDEKM> " +
				// 					"   <VALORTOTALKM>"+"203.58"+"</VALORTOTALKM> " +
				// 					"   <VALOREXTENSO>"+"Um mil, novecentos e setenta e cinco reais e noventa e oito centavos"+"</VALOREXTENSO> " +
				// 					" </ZMDTAPPSEDUFORMAL> " +
				// 					"</PRJ3720704>";
							
				// 			console.log(xmlTapps);
			
				// 			var tabelaTapps= DatasetFactory.createConstraint("tabelaRM", 'RMSPRJ3720704Server', 'RMSPRJ3720704Server', ConstraintType.MUST);
				// 			var xml= DatasetFactory.createConstraint("fieldsXml", xmlTapps, xmlTapps, ConstraintType.MUST);
				// 			var tela = "Tapps"
				// 			var retornoTapps = persisteDados(tabelaTapps,xml,tela);

				// 			if(retornoTapps != 1){
				// 				myLoading3.hide();
				// 				MensagemAlerta('Atenção!','Erro ao gravar Instrutor! ' + retornoInstrutor);
				// 				return false;
				// 			}
							
				// 		}
				// 	}


					
				
					
				// }
			}
			
			
			
			
			if(retornoInstrutor == 1){
				if(aceite == 'A' && retornoMovimento == 1){
					//if(retornoTapps == 1){
						myLoading3.hide();
						MensagemAlerta('Atenção!','Dados gravados com sucesso! ');
						document.location.reload();
					//}
				} else {
					myLoading3.hide();
					MensagemAlerta('Atenção!','Dados gravados com sucesso! ');
					document.location.reload();
				}
			}            
        });


        if (err) {
            // do error handling
        } else {
            // do something with data
        }
    });

}

function persisteDados(tabelaRM, fieldsXml, tela){
	
	var constraints = new Array(tabelaRM, fieldsXml);
	var rm_saverecordauth = DatasetFactory.getDataset("rm_wsDataServerAvaloon", null, constraints, null);
	
	if (rm_saverecordauth.values.length > 0 ){
		if(rm_saverecordauth.values[0]["ERROR"]){
			//MensagemAlerta('Atenção!','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+rm_saverecordauth.values[0]["ERROR"]);
			return rm_saverecordauth.values[0]["ERROR"];//0;// false;
		} else{
			if(rm_saverecordauth.values[0]["SUCCESS"]){
				/*if(tela == "progCurso" || tela == "martrizAplicada") {
					MensagemAlerta('Atenção!','Dados gravados com sucesso! ' + tela);
					return rm_saverecordauth.values[0]["SUCCESS"].split("\n");
				} else {*/
					return 1; //MensagemAlerta('Atenção!','Dados gravados com sucesso! ' + tela);
				//}
				
				/*$('#STIPOCURSO_CODTIPOCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
				$('#SCURSO_CODCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");*/
			}
			return true;
		}
	}else{
		MensagemAlerta('Atenção!','<h3>Erro para gravar o registro, contate o Administrador</h3>');
		return false;
	}
	
}

function MensagemAlerta(titulom, mensagem, fechar){
	autoClose = fechar == true ? (true) : (false);
	modalMyLoading = FLUIGC.modal({
		title: titulom,
		content: mensagem,
		id: 	'fluig-modal',
		size: 	'larger',
		actions: [{
			'label': 	'Ok',
			'bind': 	'data-open-modal',
			'autoClose': true
		}]
	});	
	$(".modal-title").text(titulom);
	$(".modal-body").text(mensagem);
};

function mascaraValorVirgula(valor){
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
    return valor                    
}

function FormataStringData(data) {
	var dia  = data.split("/")[0];
	var mes  = data.split("/")[1];
	var ano  = data.split("/")[2];
  
	return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
	// Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

function number_format(a, b, c, d) {
	a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
	e = a + '';
	f = e.split('.');
	if (!f[0]) {
	f[0] = '0';
	}
	if (!f[1]) {
	f[1] = '';
	}
	if (f[1].length < b) {
	g = f[1];
	for (i=f[1].length + 1; i <= b; i++) {
	g += '0';
	}
	f[1] = g;
	}
	if(d != '' && f[0].length > 3) {
	h = f[0];
	f[0] = '';
	for(j = 3; j < h.length; j+=3) {
	i = h.slice(h.length - j, h.length - j + 3);
	f[0] = d + i + f[0] + '';
	}
	j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
	f[0] = j + f[0];
	}
	c = (b <= 0) ? '' : c;
	return f[0] + c + f[1];
}

function ValorPorExtenso(valor) {

	if (!valor) return 'Zero';
	
	var singular = ["centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão"];
	var plural = ["centavos", "reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões"];
	
	var c = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
	var d = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
	var d10 = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove"];
	var u = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
	
	var z = 0;
	
	valor = valor.toString();
	valor = number_format(valor, 2, '.', '.');
	
	var inteiro = valor.split(/\./);
	
	for (var i = 0; i < inteiro.length; i++) {
	inteiro[i] = inteiro[i].toString();
	for (var ii = inteiro[i].length; ii < 3; ii++) {
	inteiro[i] = '0' + inteiro[i];
	}
	}
	
	var fim = inteiro.length - ( inteiro[inteiro.length-1] > 0 ? 1 : 2 );
	
	var rc, rd, ru;
	var r, t;
	var rt = '';
	var valor_split;
	for (var i = 0; i < inteiro.length; i++) {
	
	valor = inteiro[i];
	valor_split = valor.match(/./g);
	
	rc = ((valor > 100) && (valor < 200)) ? "cento" : c[valor_split[0]];
	rd = (valor_split[1] < 2) ? "" : d[valor_split[1]];
	ru = (valor > 0) ? ((valor_split[1] == 1) ? d10[valor_split[2]] : u[valor_split[2]]) : "";
	
	r = rc + ((rc && (rd || ru)) ? " e " : "") + rd + ((rd && ru) ? " e " : "") + ru;
	t = inteiro.length - 1 - i;
	
	r = r + (r ? " " + (valor > 1 ? plural[t] : singular[t]) : "");
	if (valor == "000") z++;
	else if (z > 0) z--;
	
	if ((t==1) && (z>0) && (inteiro[0] > 0)) {
	r = r + ((z>1) ? " de " : "") + plural[t];
	}
	if (r) {
	rt = rt + (((i > 0) && (i <= fim) && (inteiro[0] > 0) && (z < 1)) ? ( (i < fim) ? ", " : " e ") : " ") + r;
	}
	
	}
	
	return (rt ? rt : "zero");
	
}

function DataExtenso(data_informada) {

	meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
	
	semana = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");
	
	var dia_informado = data_informada.split('/')[0];
	
	var mes_informado = data_informada.split('/')[1];
	
	var ano_informado = data_informada.split('/')[2];
	
	var data = ano_informado + '-' + mes_informado + '-' + dia_informado + " 00:00:00";
	
	var dataInfo = new Date(data);
	
	
	
	var dia = dataInfo.getDate();
	
	var dias = dataInfo.getDay();
	
	var mes = dataInfo.getMonth();
	
	var ano = dataInfo.getFullYear();
	
	var diaext = semana[dias] + ", " + dia + " de " + meses[mes] + " de " + ano;
	
	return diaext;
	
}