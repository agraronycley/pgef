var Matricula = SuperWidget.extend({
    //variáveis da widget
    variavelNumerica: null,
    variavelCaracter: null,

    //método iniciado quando a widget é carregada
    init: function() {
        inicio();
    },
  
    //BIND de eventos
    bindings: {
        local: {
            'curso': ['change_curso'],
            'turmas': ['change_turmas'],
            'tipoCurso': ['change_tipoCurso'],
			'limparCamposTurma' : ['click_limparCamposTurma'],
			'buscarDadosTurma' : ['click_buscarDadosTurma'],
			'empresa' : ['click_empresa'],
			'buscarAlunos' : ['click_buscarAlunos'],
			//'nome': ['click_nome'],
			//'cpf': ['click_cpf'],
			'buscarAlunosNome' : ['click_buscarAlunosNome']
		},	
        global: {}
    },

    curso: function(htmlElement, event) {
        var cs_STURMA_CODTIPOCURSO= DatasetFactory.createConstraint("STURMA_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
		var cs_STURMA_CODMODALIDADECURSO= DatasetFactory.createConstraint("STURMA_CODMODALIDADECURSO", $('#STURMADISC_CODMODALIDADE').val(), $('#STURMADISC_CODMODALIDADE').val(), ConstraintType.MUST);
		var constraintsCodcurso = new Array(cs_STURMA_CODTIPOCURSO, cs_STURMA_CODMODALIDADECURSO);
		var ds_CadastroTurma_Cursos = DatasetFactory.getDataset("ds_CadastroTurma_Cursos", null, constraintsCodcurso, null);
		
		//limparCamposTurma();
		$('#STURMADISC_CODCURSO').empty();
		
		//if($('#STURMADISC_CODMODALIDADE').val() != '') {
			$('#STURMADISC_CODCURSO').append('<option value="" >SELECIONE</option>');
			if (ds_CadastroTurma_Cursos.values.length > 0) {
				$.each(ds_CadastroTurma_Cursos.values, function(key, value) {
					if(value.STURMA_CODCURSO == $('#STURMADISC_CODCURSO').val()){
						$('#STURMADISC_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '" selected >' + value.SCURSO_NOME + '</option>');
					} else {
						$('#STURMADISC_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '">' + value.SCURSO_NOME + '</option>');
					}
				});
			}
		//}
		
    },

    turmas: function(htmlElement, event) {
    	
        $('#STURMADISC_CODTURMA').removeAttr("style");
        var cs_STURMADISC_CODTIPOCURSO= DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
        var cs_STURMADISC_IDPERLET= DatasetFactory.createConstraint("STURMADISC_IDPERLET", $('#STURMADISC_IDPERLET').val(), $('#STURMADISC_IDPERLET').val(), ConstraintType.MUST);
        
        var cs_STURMADISC_CODMODALIDADE= DatasetFactory.createConstraint("STURMADISC_CODMODALIDADE", $('#STURMADISC_CODMODALIDADE').val(), $('#STURMADISC_CODMODALIDADE').val(), ConstraintType.MUST);
        var cs_STURMADISC_CODCURSO= DatasetFactory.createConstraint("STURMADISC_CODCURSO", $('#STURMADISC_CODCURSO').val(), $('#STURMADISC_CODCURSO').val(), ConstraintType.MUST);
        
        //var cs_STURMADISC_NOMERED= DatasetFactory.createConstraint("STURMADISC_NOMERED", $('#STURMADISC_NOMERED').val(), $('#STURMADISC_NOMERED').val(), ConstraintType.MUST);
        
        var constraintsTurmas = new Array(cs_STURMADISC_CODTIPOCURSO, cs_STURMADISC_IDPERLET, cs_STURMADISC_CODMODALIDADE, cs_STURMADISC_CODCURSO);
        var ds_CadastroTurmaDisciplina_CodTurma = DatasetFactory.getDataset("ds_CadastroTurmaDisciplina_CodTurma", null, constraintsTurmas, null);
        
        $('#STURMADISC_CODTURMA').empty();
        $('#STURMADISC_CODTURMA').append('<option value="" >SELECIONE</option>');
        if (ds_CadastroTurmaDisciplina_CodTurma.values.length > 0) {
            $.each(ds_CadastroTurmaDisciplina_CodTurma.values, function(key, value) {
                if(value.STURMADISC_CODTURMA == $('#STURMADISC_CODTURMA').val()){
                    $('#STURMADISC_CODTURMA').append('<option value="' + value.STURMADISC_CODTURMA + '" selected >' + value.STURMADISC_NOMETURMA + '</option>');
                } else {
                    $('#STURMADISC_CODTURMA').append('<option value="' + value.STURMADISC_CODTURMA + '">' + value.STURMADISC_NOMETURMA + '</option>');
                }
            });
        }

    
    },

    tipoCurso: function(htmlElement, event) {
    	var cs_STURMADISC_IDPERLET= DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
		var constraintsIdperlet = new Array(cs_STURMADISC_IDPERLET);
		var ds_CadastroTurmaDisciplina_PeriodoLetivo = DatasetFactory.getDataset("ds_CadastroTurmaDisciplina_PeriodoLetivo", null, constraintsIdperlet, null);
        
        $('#STURMADISC_IDPERLET').empty();
        //$('#STURMADISC_CODMODALIDADE').empty();
        //$('#STURMADISC_CODCURSO').empty();
        //$('#STURMADISC_CODTURMA').empty();

		$('#STURMADISC_IDPERLET').append('<option value="" >SELECIONE</option>');
		if (ds_CadastroTurmaDisciplina_PeriodoLetivo.values.length > 0) {
			$.each(ds_CadastroTurmaDisciplina_PeriodoLetivo.values, function(key, value) {
				if(value.STURMADISC_IDPERLET == $('#STURMA_IDPERLET').val()){
					$('#STURMADISC_IDPERLET').append('<option value="' + value.STURMADISC_IDPERLET + '" selected >' + value.SPLETIVO_DESCRICAO + '</option>');
				} else {
					$('#STURMADISC_IDPERLET').append('<option value="' + value.STURMADISC_IDPERLET + '">' + value.SPLETIVO_DESCRICAO + '</option>');
				}
			});
        }
        
        /*var ds_ConsultaTurma_Modalidade = DatasetFactory.getDataset("ds_ConsultaTurma_Modalidade", null, null, null);
				
        $('#STURMADISC_CODMODALIDADE').append('<option value="" >SELECIONE</option>');
        if (ds_ConsultaTurma_Modalidade.values.length > 0) {
            $.each(ds_ConsultaTurma_Modalidade.values, function(key, value) {
                if(value.STURMA_CODMODALIDADECURSO == $('#STURMADISC_CODMODALIDADE').val()){
                    $('#STURMADISC_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '" selected >' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
                } else {
                    $('#STURMADISC_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '">' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
                }
            });
        }*/
	},
	
	limparCamposTurma: function(htmlElement, event) {
		limparCamposTurma();
		inicio();
	},

	buscarDadosTurma: function(htmlElement, event) {
		var valida  = validaCamposTurma();
		if (valida == false) {
			return false;
		} else {
			limpaTabela('tableDisc','linhaDisc');

			var cs_STURMADISC_CODTIPOCURSO = DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
			var cs_STURMADISC_IDPERLET = DatasetFactory.createConstraint("STURMADISC_IDPERLET", $('#STURMADISC_IDPERLET').val(), $('#STURMADISC_IDPERLET').val(), ConstraintType.MUST);
			var cs_STURMADISC_CODTURMA = DatasetFactory.createConstraint("STURMADISC_CODTURMA", $('#STURMADISC_CODTURMA').val(), $('#STURMADISC_CODTURMA').val(), ConstraintType.MUST);
			var cs_STURMADISC_CODMODALIDADE = DatasetFactory.createConstraint("STURMADISC_CODMODALIDADE", $('#STURMADISC_CODMODALIDADE').val(), $('#STURMADISC_CODMODALIDADE').val(), ConstraintType.MUST);
			
			var constraintsTurma = new Array(cs_STURMADISC_CODTIPOCURSO, cs_STURMADISC_IDPERLET, cs_STURMADISC_CODTURMA, cs_STURMADISC_CODMODALIDADE);
			var ds_ConsultaTurmaDisciplina_TurmaDisc = DatasetFactory.getDataset("ds_ConsultaTurmaDisciplina_TurmaDisc", null, constraintsTurma, null);
			
			if (ds_ConsultaTurmaDisciplina_TurmaDisc.values.length > 0) {
				var dados = ds_ConsultaTurmaDisciplina_TurmaDisc.values;
				$('#turmas').append('<input type="hidden" id="STURMADISC_IDHABILITACAOFILIAL" value="' + dados[0].STURMADISC_IDHABILITACAOFILIAL + '" />');
				$('#turmas').append('<input type="hidden" id="STURMADISC_MAXALUNOS" value="' + dados[0].STURMADISC_MAXALUNOS + '" />');
				$('#turmas').append('<input type="hidden" id="STURMADISC_CODTURNO" value="' + dados[0].STURMADISC_CODTURNO + '" />');
				//$('#turmas').append('<input type="hidden" id="STURMA_CODMUNICIPIO" value="' + dados[0].STURMADISC_CODMUNICIPIO + '" />');
				
				
				$('#divdisciplinas').show();
				$('#empresa').show();
				$('#selecaoaluno').show();
				$.each(ds_ConsultaTurmaDisciplina_TurmaDisc.values, function(key, value) {
					if(value.STURMADISC_CODTURMA == $('#STURMADISC_CODTURMA').val() &&
					value.STURMADISC_CODTIPOCURSO == $('#STURMADISC_CODTIPOCURSO').val() &&
					value.STURMADISC_IDPERLET == $('#STURMADISC_IDPERLET').val()){
						
						$('#STURMADISC_CODTIPOCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
						$('#STURMADISC_IDPERLET').attr("style", "pointer-events: none;background: #EEE; border: none;");
						$('#STURMADISC_CODTURMA').attr("style", "pointer-events: none;background: #EEE; border: none;");
						//$('#nomered').attr("style", "pointer-events: none;background: #EEE; border: none;");
						
						
						$('#tabela-disciplinas').append('<tbody id="tableDisc" name="tableDisc">'+
												'<tr id="linhaDisc" name="linhaDisc">' + 
												'<td> <input type="checkbox" class="disciplina" name="disciplina[]" value="'+ value.STURMADISC_IDTURMADISC + '">' + 
												'<td>' + value.STURMADISC_CODPERIODO + '</td>' +
												'<td>' + value.STURMADISC_CODDISC + '</td>' +
												'<td>' + value.STURMADISC_DISCIPLINA + '</td>' +
												'<td>' + value.STURMADISC_CH + '</td>' +
												//'<td><button class="btn btn-primary">Editar</button></td>' +
												'</tbody>');
					} else {
							$('#tabela-disciplinas').append('<tbody id="body-table" name="body-table">'+
													'<tr id="LINHA" name="LINHA">' + 
													'<td> <input type="checkbox" class="disciplina" name="disciplina[]" value="'+ value.STURMADISC_IDTURMADISC + '">' +  
													'<td>' + value.STURMADISC_CODPERIODO + '</td>' +
													'<td>' + value.STURMADISC_CODDISC + '</td>' +
													'<td>' + value.STURMADISC_DISCIPLINA + '</td>' +
													'<td>' + value.STURMADISC_CH + '</td>' +
													//'<td><button class="btn btn-primary">Editar</button></td>' +
													'</tbody>');
					}	
				});
			} else {
				$('#divdisciplinas').show();
				$('#divdisciplinas').append('<p>Nenhum resultado encontrado! </p>');
			}
		}
	},

	empresa: function(htmlElement, event) {
		var ds_Matricula_ClienteFornecedor = DatasetFactory.getDataset("ds_Matricula_ClienteFornecedor", null, null, null);
		
		var objDestino = [];
		
		for (var i = 0; i < ds_Matricula_ClienteFornecedor.values.length; i++) {
        	objDestino.push(ds_Matricula_ClienteFornecedor.values[i].FCFO_NOME);
        }
		
		var myAutocomplete = FLUIGC.autocomplete('#FCFO_CODCFO', {
            source: substringMatcher(objDestino),
            maxTags: 1,
            name: 'cities',
            displayKey: 'description',
            tagClass: 'tag-gray',
            type: 'tagAutocomplete'
        });
	},

	/*
	nome: function(htmlElement, event) {
		var ds_Matricula_ClienteFornecedor = DatasetFactory.getDataset("ds_Matricula_Alunos_Nome", null, null, null);
		console.log("nome");
		var objDestino = [];
		
		for (var i = 0; i < ds_Matricula_ClienteFornecedor.values.length; i++) {
        	objDestino.push(ds_Matricula_ClienteFornecedor.values[i].SALUNO_NOME);
        }
		
		var myAutocomplete = FLUIGC.autocomplete('#FCFO_NOME', {
            source: substringMatcher(objDestino),
            maxTags: 1,
            name: 'cities',
            displayKey: 'description',
            tagClass: 'tag-gray',
            type: 'tagAutocomplete'
        });
	},
	*/
	buscarAlunos: function(htmlElement, event) {
		$('#efetuarMatricula').show();
		var codcfo = $('#FCFO_CODCFO').val().substr(0,6);
		
		limpaTabela('tableAlunos','linhaAlunos');
		var cs_SALUNO_CODCFO = DatasetFactory.createConstraint("SALUNO_CODCFO", codcfo, codcfo, ConstraintType.MUST);
		var constraints = new Array(cs_SALUNO_CODCFO);
		var ds_Matricula_Alunos = DatasetFactory.getDataset("ds_Matricula_Alunos", null, constraints, null);

		if (ds_Matricula_Alunos.values.length > 0) {
				//var dados = ds_Matricula_Alunos.values;
				//$('#turmas').append('<input type="hidden" id="SALUNO_RA" value="' + dados[0].SALUNO_RA + '" />');
				//$('#turmas').append('<input type="hidden" id="STURMADISC_MAXALUNOS" value="' + dados[0].STURMADISC_MAXALUNOS + '" />');
				//$('#turmas').append('<input type="hidden" id="STURMA_CODMUNICIPIO" value="' + dados[0].STURMADISC_CODMUNICIPIO + '" />');
				
				
				$('#alunos').show();
				$.each(ds_Matricula_Alunos.values, function(key, value) {

					$('#tabela-alunos').append('<tbody id="tableAlunos" name="tableAlunos">'+
											'<tr id="linhaAlunos" name="linhaAlunos">' + 
											'<td> <input type="checkbox" class="aluno" name="aluno[]" value="'+ value.SALUNO_RA + '">' + 
											'<td>' + value.SALUNO_RA + '</td>' +
											'<td>' + value.SALUNO_NOME + '</td>' +
											'<td>' + value.SALUNO_CPF + '</td>' +
											'<td>' + value.SALUNO_TELEFONE1 + '</td>' +
											'<td>' + value.SALUNO_TELFONE2 + '</td>' +
											'<td>' + value.SALUNO_EMAIL + '</td>' +
											'</tbody>');
						
				});
			} else {
				$('#alunos').show();
				$('#alunos').append('<p>Nenhum resultado encontrado! </p>');
			}

	},

	buscarAlunosNome: function(htmlElement, event) {
		$('#efetuarMatricula').show();
		var nomealuno = $('#FCFO_NOME').val();
		var cpfaluno = $('#FCFO_CPF').val();
		console.log(nomealuno);
		console.log(cpfaluno);
		
		limpaTabela('tableAlunos','linhaAlunos');
		var cs_SALUNO_NOME = DatasetFactory.createConstraint("SALUNO_NOME", nomealuno, nomealuno, ConstraintType.MUST);
		var cs_SALUNO_CPF = DatasetFactory.createConstraint("SALUNO_CPF", cpfaluno, cpfaluno, ConstraintType.MUST);
		var constraints = new Array(cs_SALUNO_NOME,cs_SALUNO_CPF);
		var ds_Matricula_Alunos = DatasetFactory.getDataset("ds_Matricula_Alunos_Nome", null, constraints, null);

		if (ds_Matricula_Alunos.values.length > 0) {
			$('#alunos').show();
			$.each(ds_Matricula_Alunos.values, function(key, value) {

				$('#tabela-alunos').append('<tbody id="tableAlunos" name="tableAlunos">'+
										'<tr id="linhaAlunos" name="linhaAlunos">' + 
										'<td> <input type="checkbox" class="aluno" name="aluno[]" value="'+ value.SALUNO_RA + '">' + 
										'<td>' + value.SALUNO_RA + '</td>' +
										'<td>' + value.SALUNO_NOME + '</td>' +
										'<td>' + value.SALUNO_CPF + '</td>' +
										'<td>' + value.SALUNO_TELEFONE1 + '</td>' +
										'<td>' + value.SALUNO_TELFONE2 + '</td>' +
										'<td>' + value.SALUNO_EMAIL + '</td>' +
										'</tbody>');
					
			});
		} else {
			$('#alunos').show();
			$('#alunos').append('<p>Nenhum resultado encontrado! </p>');
		}

	},

	matricular: function(htmlElement, event) {

		var ids = coletaDados('aluno');
		var array = coletaIDs(ids);
		var xmlCursoHab = "";
		var xmlMatricular = "";


		
		for( var i = 0; i < array.length; i++ ){
			xmlCursoHab = "";
			var valorRa = array[i];
			var retorno = 0;
			
			

			xmlCursoHab =	"<EduHabilitacaoAluno> " +
							"  <SHabilitacaoAluno> " +
							"    <CODCOLIGADA>1</CODCOLIGADA> " +
							"    <IDHABILITACAOFILIAL>"+ $('#STURMADISC_IDHABILITACAOFILIAL').val() +"</IDHABILITACAOFILIAL> " +
							"    <RA>"+ valorRa +"</RA> " +
							"    <CODSTATUS>69</CODSTATUS> " +
							"    <CODCURSO>"+ $('#STURMADISC_CODCURSO').val() +"</CODCURSO> " +
							"    <CODHABILITACAO>"+ $('#STURMADISC_CODCURSO').val() +"</CODHABILITACAO> " +
							"    <CODGRADE>"+ $('#STURMADISC_CODCURSO').val() +"</CODGRADE> " +
							"    <CODFILIAL>1</CODFILIAL> " +
							"    <CODTURNO>"+ $('#STURMADISC_CODTURNO').val() +"</CODTURNO> " +
							"  </SHabilitacaoAluno> " +
							"  <SHabilitacaoAlunoCompl> " +
							"    <CODCOLIGADA>1</CODCOLIGADA> " +
							"    <IDHABILITACAOFILIAL>"+ $('#STURMADISC_IDHABILITACAOFILIAL').val() +"</IDHABILITACAOFILIAL> " +
							"    <RA>"+ valorRa +"</RA> " +
							"  </SHabilitacaoAlunoCompl> " +
							" </EduHabilitacaoAluno>";

			console.log(xmlCursoHab);

			var tabelaCursoHab= DatasetFactory.createConstraint("tabelaRM", 'EduHabilitacaoAlunoData', 'EduHabilitacaoAlunoData', ConstraintType.MUST);
			var fieldsXml= DatasetFactory.createConstraint("fieldsXml", xmlCursoHab, xmlCursoHab, ConstraintType.MUST);
			var tela = "Curso / Habilitação";
			retorno += persisteDados(tabelaCursoHab,fieldsXml,tela);

			/*if (retorno == 0){
				MensagemAlerta('Atenção!','Erro ao gravar dados de "'+ tela + '" !');
				return false;
			} else if (retorno == 1) {
				MensagemAlerta('Atenção!','Dados gravados com sucesso! "'+ tela + '"');
			}*/

			
			
			var dataDia = new Date();

			var dia     = dataDia.getDate();           // 1-31
			if(dia <= 9) {
				dia = '0'+dia;
			}

			var mes     = dataDia.getMonth();          // 0-11 (zero=janeiro)
			if(mes <= 9) {
				mes = '0'+(mes+1);
			} else {
				mes = mes+1;
			}

			var ano4    = dataDia.getFullYear();       // 4 dígitos
			var hora    = dataDia.getHours();          // 0-23
			if(hora <= 9) {
				hora = '0'+hora;
			}

			var min     = dataDia.getMinutes();        // 0-59
			if(min <= 9) {
				min = '0'+min;
			}

			var seg     = dataDia.getSeconds();        // 0-59
			if(seg <= 9) {
				seg = '0'+seg;
			}

			var dataMatricula = ano4 + '-' + mes + '-' + dia + 'T' + hora + ':' + min + ':' + seg;

			console.log(dataMatricula);



			var idsDisc = coletaDados('disciplina');
			var arrayDisc = coletaIDs(idsDisc);

			var numero = 4;

			for( var x = 0; x < arrayDisc.length; x++ ){
				xmlMatricular =	"";
				var idTurmaDisc = arrayDisc[x];
				var retorno = 0;

				var cs_SMATRICPL_IDPERLET= DatasetFactory.createConstraint("SMATRICPL_IDPERLET", $('#STURMADISC_IDPERLET').val(), $('#STURMADISC_IDPERLET').val(), ConstraintType.MUST);
				var cs_SMATRICPL_IDHABILITACAOFILIAL= DatasetFactory.createConstraint("SMATRICPL_IDHABILITACAOFILIAL", $('#STURMADISC_IDHABILITACAOFILIAL').val(), $('#STURMADISC_IDHABILITACAOFILIAL').val(), ConstraintType.MUST);
				var cs_SMATRICPL_RA= DatasetFactory.createConstraint("SMATRICPL_RA", valorRa, valorRa, ConstraintType.MUST);
				var constraintsIdperlet = new Array(cs_SMATRICPL_IDPERLET, cs_SMATRICPL_IDHABILITACAOFILIAL, cs_SMATRICPL_RA);
				var ds_Matricula_MatriculaPL = DatasetFactory.getDataset("ds_Matricula_MatriculaPL", null, constraintsIdperlet, null);
				
				var discMatricula = ds_Matricula_MatriculaPL.values[0]['SMATRICPL_DISPONIVEL'];

				var cs_SMATRICULA_RA= DatasetFactory.createConstraint("SMATRICULA_RA", valorRa, valorRa, ConstraintType.MUST);
				var cs_SMATRICULA_CODTIPOCURSO= DatasetFactory.createConstraint("SMATRICULA_CODTIPOCURSO", $('#SMATRICULA_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
				var cs_SMATRICULA_IDTURMADISC= DatasetFactory.createConstraint("SMATRICULA_IDTURMADISC", idTurmaDisc, idTurmaDisc, ConstraintType.MUST);
				var cs_SMATRICULA_CODCURSO= DatasetFactory.createConstraint("SMATRICULA_CODCURSO", $('#STURMADISC_CODCURSO').val(), $('#STURMADISC_CODCURSO').val(), ConstraintType.MUST);
				var constraints = new Array(cs_SMATRICULA_RA, cs_SMATRICULA_CODTIPOCURSO, cs_SMATRICULA_IDTURMADISC, cs_SMATRICULA_CODCURSO);
				var ds_Matricula_MatriculaDisc = DatasetFactory.getDataset("ds_Matricula_MatriculaDisc", null, constraints, null);

				var matriculado = ds_Matricula_MatriculaDisc.values[0]['SMATRICPL_MATRICULADO'];

				if(matriculado == "Nao") {

				
					xmlMatricular =	'<?xml version="1.0" encoding="utf-16"?> ' +
									' <EduMatriculaParamsProc z:Id="i1" xmlns="http://www.totvs.com.br/RM/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/"> ' +
									'   <ActionModule xmlns="http://www.totvs.com/">S</ActionModule> ' +
									'   <ActionName xmlns="http://www.totvs.com/">EduMatriculaProcAction</ActionName> ' +
									'   <CanParallelize xmlns="http://www.totvs.com/">true</CanParallelize> ' +
									'   <CanSendMail xmlns="http://www.totvs.com/">false</CanSendMail> ' +
									'   <CanWaitSchedule xmlns="http://www.totvs.com/">false</CanWaitSchedule> ' +
									'   <CodUsuario xmlns="http://www.totvs.com/">mestre</CodUsuario> ' +
									'   <ConnectionId i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <ConnectionString i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <Context z:Id="i2" xmlns="http://www.totvs.com/" xmlns:a="http://www.totvs.com.br/RM/"> ' +
									'     <a:_params xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EXERCICIOFISCAL</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">3</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODLOCPRT</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODTIPOCURSO</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">8</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$EDUTIPOUSR</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUNIDADEBIB</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODCOLIGADA</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$RHTIPOUSR</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODIGOEXTERNO</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODSISTEMA</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">S</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIOSERVICO</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema" /> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODUSUARIO</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">mestre</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$IDPRJ</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CHAPAFUNCIONARIO</b:Key> ' +
									'         <b:Value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">-1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'       <b:KeyValueOfanyTypeanyType> ' +
									'         <b:Key i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">$CODFILIAL</b:Key> ' +
									'         <b:Value i:type="c:int" xmlns:c="http://www.w3.org/2001/XMLSchema">1</b:Value> ' +
									'       </b:KeyValueOfanyTypeanyType> ' +
									'     </a:_params> ' +
									'     <a:Environment>DotNet</a:Environment> ' +
									'   </Context> ' +
									'   <CustomData i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <DisableIsolateProcess xmlns="http://www.totvs.com/">false</DisableIsolateProcess> ' +
									'   <DriverType i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <ExecutionId xmlns="http://www.totvs.com/">7f168aab-879e-4cb7-a54b-98b76eaccbef</ExecutionId> ' +
									'   <FailureMessage xmlns="http://www.totvs.com/">Falha na execução do processo</FailureMessage> ' +
									'   <FriendlyLogs i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <HideProgressDialog xmlns="http://www.totvs.com/">false</HideProgressDialog> ' +
									'   <Initialized xmlns="http://www.totvs.com/">true</Initialized> ' +
									'   <Ip xmlns="http://www.totvs.com/">10.0.1.58</Ip> ' +
									'   <IsolateProcess xmlns="http://www.totvs.com/">false</IsolateProcess> ' +
									'   <JobID xmlns="http://www.totvs.com/"> ' +
									'     <Children /> ' +
									'     <ExecID>1</ExecID> ' +
									'     <ID>1658604</ID> ' +
									'     <IsPriorityJob>false</IsPriorityJob> ' +
									'   </JobID> ' +
									'   <JobServerHostName xmlns="http://www.totvs.com/">VMTOTVSFAEGHOMO</JobServerHostName> ' +
									'   <MasterActionName xmlns="http://www.totvs.com/">EduHabilitacaoAlunoAction</MasterActionName> ' +
									'   <MaximumQuantityOfPrimaryKeysPerProcess xmlns="http://www.totvs.com/">1000</MaximumQuantityOfPrimaryKeysPerProcess> ' +
									'   <MinimumQuantityOfPrimaryKeysPerProcess xmlns="http://www.totvs.com/">1</MinimumQuantityOfPrimaryKeysPerProcess> ' +
									'   <NetworkUser xmlns="http://www.totvs.com/">tatiane.paula</NetworkUser> ' +
									'   <NotifyEmail xmlns="http://www.totvs.com/">false</NotifyEmail> ' +
									'   <NotifyEmailList i:nil="true" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays" /> ' +
									'   <NotifyFluig xmlns="http://www.totvs.com/">false</NotifyFluig> ' +
									'   <OnlineMode xmlns="http://www.totvs.com/">false</OnlineMode> ' +
									'   <PrimaryKeyList xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
									'     <a:ArrayOfanyType> ' +
									'       <a:anyType i:type="b:short" xmlns:b="http://www.w3.org/2001/XMLSchema">1</a:anyType> ' +
									'       <a:anyType i:type="b:int" xmlns:b="http://www.w3.org/2001/XMLSchema">' + $('#STURMADISC_IDHABILITACAOFILIAL').val() + '</a:anyType> ' +
									'       <a:anyType i:type="b:string" xmlns:b="http://www.w3.org/2001/XMLSchema">' + valorRa + '</a:anyType> ' +
									'     </a:ArrayOfanyType> ' +
									'   </PrimaryKeyList> ' +
									'   <PrimaryKeyNames xmlns="http://www.totvs.com/" xmlns:a="http://schemas.microsoft.com/2003/10/Serialization/Arrays"> ' +
									'     <a:string>CODCOLIGADA</a:string> ' +
									'     <a:string>IDHABILITACAOFILIAL</a:string> ' +
									'     <a:string>RA</a:string> ' +
									'   </PrimaryKeyNames> ' +
									'   <PrimaryKeyTableName xmlns="http://www.totvs.com/">SHabilitacaoAluno</PrimaryKeyTableName> ' +
									'   <ProcessName xmlns="http://www.totvs.com/">Matricular aluno</ProcessName> ' +
									'   <QuantityOfSplits xmlns="http://www.totvs.com/">0</QuantityOfSplits> ' +
									'   <SaveLogInDatabase xmlns="http://www.totvs.com/">true</SaveLogInDatabase> ' +
									'   <SaveParamsExecution xmlns="http://www.totvs.com/">false</SaveParamsExecution> ' +
									'   <ScheduleDateTime xmlns="http://www.totvs.com/">2021-06-28T11:06:51.4831164-03:00</ScheduleDateTime> ' +
									'   <Scheduler xmlns="http://www.totvs.com/">JobMonitor</Scheduler> ' +
									'   <SendMail xmlns="http://www.totvs.com/">false</SendMail> ' +
									'   <ServerName xmlns="http://www.totvs.com/">EduMatriculaProcData</ServerName> ' +
									'   <ServiceInterface i:type="b:RuntimeType" z:FactoryType="c:UnitySerializationHolder" xmlns="http://www.totvs.com/" xmlns:a="http://schemas.datacontract.org/2004/07/System" xmlns:b="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType" xmlns:c="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder"> ' +
									'     <Data i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Edu.Interfaces.IEduMatriculaProc</Data> ' +
									'     <UnityType i:type="d:int" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">4</UnityType> ' +
									'     <AssemblyName i:type="d:string" xmlns="" xmlns:d="http://www.w3.org/2001/XMLSchema">RM.Edu.Interfaces.Intf, Version=12.1.29.259, Culture=neutral, PublicKeyToken=null</AssemblyName> ' +
									'   </ServiceInterface> ' +
									'   <ShouldParallelize xmlns="http://www.totvs.com/">false</ShouldParallelize> ' +
									'   <ShowReExecuteButton xmlns="http://www.totvs.com/">true</ShowReExecuteButton> ' +
									'   <StatusMessage i:nil="true" xmlns="http://www.totvs.com/" /> ' +
									'   <SuccessMessage xmlns="http://www.totvs.com/">Processo executado com sucesso</SuccessMessage> ' +
									'   <SyncExecution xmlns="http://www.totvs.com/">false</SyncExecution> ' +
									'   <UseJobMonitor xmlns="http://www.totvs.com/">true</UseJobMonitor> ' +
									'   <UserName xmlns="http://www.totvs.com/">mestre</UserName> ' +
									'   <WaitSchedule xmlns="http://www.totvs.com/">false</WaitSchedule> ' +
									'   <CadastrarDisciplinas>true</CadastrarDisciplinas> ' +
									'   <MatricPLParams z:Id="i3"> ' +
									'     <AlteraMatrizContratoOriginal>false</AlteraMatrizContratoOriginal> ' +
									'     <ApagarNumeroDiario>false</ApagarNumeroDiario> ' +
									'     <ArquivoRelatorioContrato i:nil="true" /> ' +
									'     <CR i:nil="true" /> ' +
									'     <CadastrarContrato>false</CadastrarContrato> ' +
									'     <CancelarLancamentos>true</CancelarLancamentos> ' +
									'     <CarteiraEmitida>false</CarteiraEmitida> ' +
									'     <ClientIP i:nil="true" /> ' +
									'     <CobrarDocsTipoIngressoRematriculaEB>true</CobrarDocsTipoIngressoRematriculaEB> ' +
									'     <CodColigada>1</CodColigada> ' +
									'     <CodContrato i:nil="true" /> ' +
									'     <CodFilial>1</CodFilial> ' +
									'     <CodFormula i:nil="true" /> ' +
									'     <CodInstDestino i:nil="true" /> ' +
									'     <CodMotivo i:nil="true" /> ' +
									'     <CodMotivoTransferencia i:nil="true" /> ' +
									'     <CodPlanoPgto i:nil="true" /> ' +
									'     <CodStatus>69</CodStatus> ' +
									'     <CodStatusNovo i:nil="true" /> ' +
									'     <CodStatusPendenteDisc i:nil="true" /> ' +
									'     <CodStatusPendentePL i:nil="true" /> ' +
									'     <CodStatusRes i:nil="true" /> ' +
									'     <CodTipoCurso>' + $('#STURMADISC_CODTIPOCURSO').val() + '</CodTipoCurso> ' +
									'     <CodTipoMat>21</CodTipoMat> ' +
									'     <CodTurma>' + $('#STURMADISC_CODTURMA').val() + '</CodTurma> ' +
									'     <CodTurmaAnterior i:nil="true" /> ' +
									'     <CodUsuario>mestre</CodUsuario> ' +
									'     <ColigadaRelatBoleto i:nil="true" /> ' +
									'     <ColigadaRelatContrato i:nil="true" /> ' +
									'     <ContratosTemp xmlns:a="http://www.totvs.com/" /> ' +
									'     <CopiarDescontoPorAntecipacao>false</CopiarDescontoPorAntecipacao> ' +
									'     <CopiarRespFinanceiroContrato>false</CopiarRespFinanceiroContrato> ' +
									'     <CopiarVencimentos>false</CopiarVencimentos> ' +
									'     <CotaFinal i:nil="true" /> ' +
									'     <CotaInicial i:nil="true" /> ' +
									'     <DataCancelamentoContrato i:nil="true" /> ' +
									'     <DataCancelamentoParcelas i:nil="true" /> ' +
									'     <DataFinalParc i:nil="true" /> ' +
									'     <DataIngresso i:nil="true" /> ' +
									'     <DataInicialParc i:nil="true" /> ' +
									'     <DataMatricula>' + dataMatricula + '</DataMatricula> ' +
									'     <DataMatriculaAnterior i:nil="true" /> ' +
									'     <DataMatriculaEncerra i:nil="true" /> ' +
									'     <DataMatriculaEncerraAnterior i:nil="true" /> ' +
									'     <DataMatriculaEncerraNova i:nil="true" /> ' +
									'     <DataMatriculaNova i:nil="true" /> ' +
									'     <DiaFixo>Nao</DiaFixo> ' +
									'     <DiaVencimento i:nil="true" /> ' +
									'     <DiasVencimentoPrimeiraParcela>0</DiasVencimentoPrimeiraParcela> ' +
									'	  <Disciplinas> ' +
									'  <EduMatriculaDiscParams z:Id="i4"> ' +
									'	<AlunoRegular>false</AlunoRegular> ' +
									'	<ApagarNumeroDiario>false</ApagarNumeroDiario> ' +
									'	<AtendeuCreditoMinimo>false</AtendeuCreditoMinimo> ' +
									'	<ClientIP i:nil="true" /> ' +
									'	<CobPosteriorMatric>N</CobPosteriorMatric> ' +
									'	<CodCampus i:nil="true" /> ' +
									'	<CodColigada>1</CodColigada> ' +
									'	<CodCurso i:nil="true" /> ' +
									'	<CodFilial>1</CodFilial> ' +
									'	<CodFormula i:nil="true" /> ' +
									'	<CodGrade i:nil="true" /> ' +
									'	<CodHabilitacao i:nil="true" /> ' +
									'	<CodItinerarioFormativo i:nil="true" /> ' +
									'	<CodMotivo i:nil="true" /> ' +
									'	<CodPerLet i:nil="true" /> ' +
									'	<CodSituacaoMatriculaEspera>0</CodSituacaoMatriculaEspera> ' +
									'	<CodStatus>69</CodStatus> ' +
									'	<CodStatusNovo>69</CodStatusNovo> ' +
									'	<CodStatusPL>69</CodStatusPL> ' +
									'	<CodStatusRes i:nil="true" /> ' +
									'	<CodTipoCurso>' + $('#STURMADISC_CODTIPOCURSO').val() + '</CodTipoCurso> ' +
									'	<CodTurma>' + $('#STURMADISC_CODTURMA').val() + '</CodTurma> ' +
									'	<CodTurno>' + $('#STURMADISC_CODTURNO').val() + '</CodTurno> ' +
									'	<CodUsuario>mestre</CodUsuario> ' +
									'	<CoeficienteRendimeto i:nil="true" /> ' +
									'	<DataMatricula>' + dataMatricula + '</DataMatricula> ' +
									'	<DescStatusNovo i:nil="true" /> ' +
									'	<DtAlteracao i:nil="true" /> ' +
									'	<EnturmandoTurmaMista>false</EnturmandoTurmaMista> ' +
									'	<ExcluirMatricula>false</ExcluirMatricula> ' +
									'	<GerarLogMatricPL>true</GerarLogMatricPL> ' +
									'	<IdHabilitacaoFilial>' + $('#STURMADISC_IDHABILITACAOFILIAL').val() + '</IdHabilitacaoFilial> ' +
									'	<IdHabilitacaoFilialOrigem i:nil="true" /> ' +
									'	<IdHabilitacaoFilialTurmaDisc i:nil="true" /> ' +
									'	<IdPerLet>' + $('#STURMADISC_IDPERLET').val() + '</IdPerLet> ' +
									'	<IdTurmaDisc>' + idTurmaDisc + '</IdTurmaDisc> ' +
									'	<IdTurmaDiscOrigem i:nil="true" /> ' +
									'	<IdTurmaDiscPrincipal i:nil="true" /> ' +
									'	<IdTurmaDiscSubst i:nil="true" /> ' +
									'	<IncluirListaEspera>false</IncluirListaEspera> ' +
									'	<IsEnturmacao>false</IsEnturmacao> ' +
									'	<ListaTurmaMista i:nil="true" /> ' +
									'	<PermiteAlterarDados>true</PermiteAlterarDados> ' +
									'	<PermiteTransfInternaAlunoInadimplente>false</PermiteTransfInternaAlunoInadimplente> ' +
									'	<PodeRodarNumeracaoAutomatica>true</PodeRodarNumeracaoAutomatica> ' +
									'	<PossivelFormando>false</PossivelFormando> ' +
									'	<ProcessoListaEsperaPrioridade>false</ProcessoListaEsperaPrioridade> ' +
									'	<ProcurarOutraTurma>false</ProcurarOutraTurma> ' +
									'	<RA>' + valorRa + '</RA> ' +
									'	<Rematricula>false</Rematricula> ' +
									'	<SalvouMatricula>false</SalvouMatricula> ' +
									'	<TipoDiscGrade>Obrigatoria</TipoDiscGrade> ' +
									'	<TipoDisciplina>Normal</TipoDisciplina> ' +
									'	<TipoMat>21</TipoMat> ' +
									'	<TransferenciaInterna>false</TransferenciaInterna> ' +
									'	<ValidadoTurmaMista>false</ValidadoTurmaMista> ' +
									'	<ValidarInadimplencia>true</ValidarInadimplencia> ' +
									'	<ValidarIntegracaoBiblioteca>true</ValidarIntegracaoBiblioteca> ' +
									'  </EduMatriculaDiscParams> ' +
									'</Disciplinas> ' +
									'     <DtMatriculaPag i:nil="true" /> ' +
									'     <DtResultado i:nil="true" /> ' +
									'     <DtSolicitacaoAlteracao i:nil="true" /> ' +
									'     <EmTransacao>false</EmTransacao> ' +
									'     <GerarContratoAssinado>false</GerarContratoAssinado> ' +
									'     <GerarLancamento>Nao</GerarLancamento> ' +
									'     <GerarLog>true</GerarLog> ' +
									'     <GerouContratoComPlano>true</GerouContratoComPlano> ' +
									'     <IDPS>0</IDPS> ' +
									'     <IdHabilitacaoFilial>' + $('#STURMADISC_IDHABILITACAOFILIAL').val() + '</IdHabilitacaoFilial> ' +
									'     <IdHabilitacaoFilialOrigem i:nil="true" /> ' +
									'     <IdPerLet>' + $('#STURMADISC_IDPERLET').val() + '</IdPerLet> ' +
									'     <IsDesenturmacao>false</IsDesenturmacao> ' +
									'     <IsEnturmacao>false</IsEnturmacao> ' +
									'     <IsRematricula>false</IsRematricula> ' +
									'     <MatriculaNovoPortal>false</MatriculaNovoPortal> ' +
									'     <MatriculaWeb>false</MatriculaWeb> ' +
									'     <MudancaStatus>false</MudancaStatus> ' +
									'     <MudancaTurma>false</MudancaTurma> ' +
									'     <NumeroInscricao>0</NumeroInscricao> ' +
									'     <ParametrosDiversos> ' +
									'       <AproveitarContratoNaMudancaTurma>false</AproveitarContratoNaMudancaTurma> ' +
									'       <BloquearAltStatusInadimplentes i:nil="true" /> ' +
									'       <CarregarLstDocumentosCadaAluno>true</CarregarLstDocumentosCadaAluno> ' +
									'       <CarregarLstHabilitacaoesCadaAluno>true</CarregarLstHabilitacaoesCadaAluno> ' +
									'       <CarregarLstLancamentosCadaAluno>false</CarregarLstLancamentosCadaAluno> ' +
									'       <CarregarLstMatricIsoladaCadaAluno>true</CarregarLstMatricIsoladaCadaAluno> ' +
									'       <CarregarLstMtzAplicadaCursoHabAluno>true</CarregarLstMtzAplicadaCursoHabAluno> ' +
									'       <CarregarLstOcorrenciasCadaAluno>true</CarregarLstOcorrenciasCadaAluno> ' +
									'       <DataMatriculaUtilizadaDiscDestino>DisciplinaOrigem</DataMatriculaUtilizadaDiscDestino> ' +
									'       <IdPerLetCorrente i:nil="true" /> ' +
									'       <IgnorarConflitoHorario i:nil="true" /> ' +
									'       <IgnorarTurmaCheia i:nil="true" /> ' +
									'       <IsEnturmacao>false</IsEnturmacao> ' +
									'       <MatriculaWeb>false</MatriculaWeb> ' +
									'       <MudancaStatus>false</MudancaStatus> ' +
									'       <NumeroMaximoPeriodosTrancados i:nil="true" /> ' +
									'       <VerificarInadimplenciaBib>false</VerificarInadimplenciaBib> ' +
									'       <VerificarInadimplenciaFin>false</VerificarInadimplenciaFin> ' +
									'     </ParametrosDiversos> ' +
									'     <PendenteDocumento>Nao</PendenteDocumento> ' +
									'     <PendenteInadimplencia>Nao</PendenteInadimplencia> ' +
									'     <PendenteInadimplenciaBib>Nao</PendenteInadimplenciaBib> ' +
									'     <PendenteOcorrenciaBloqMatricula>Nao</PendenteOcorrenciaBloqMatricula> ' +
									'     <Periodo>1</Periodo> ' +
									'     <PermiteTransfInternaAlunoInadimplente>false</PermiteTransfInternaAlunoInadimplente> ' +
									'     <PodeRodarNumeracaoAutomatica>true</PodeRodarNumeracaoAutomatica> ' +
									'     <PossuiPendencia>false</PossuiPendencia> ' +
									'     <RA>' + valorRa + '</RA> ' +
									'     <RematriculaEBasicoAjusteContratoHabFilial>false</RematriculaEBasicoAjusteContratoHabFilial> ' +
									'     <ResponsaveisFinanceirosContrato xmlns:a="http://www.totvs.com/" /> ' +
									'     <TipoOperacao>Inclusao</TipoOperacao> ' +
									'     <TipoSelecaoParcela>IdParcela</TipoSelecaoParcela> ' +
									'     <TransferenciaInterna>false</TransferenciaInterna> ' +
									'     <TurnosDiferentes>false</TurnosDiferentes> ' +
									'     <UsarPlanoPgtoParametrizacaoCurso>true</UsarPlanoPgtoParametrizacaoCurso> ' +
									'     <ValidarInadimplenciaBiblioteca>true</ValidarInadimplenciaBiblioteca> ' +
									'   </MatricPLParams> ' +
									'   <MatricularDisc>' + discMatricula + '</MatricularDisc> ' +
									' </EduMatriculaParamsProc> ';

					xmlMatricular = xmlMatricular.replace(/\\/g, '');
					console.log(xmlMatricular);

					var tabelaRM= DatasetFactory.createConstraint("PROCESSSERVERNAME", 'EduMatriculaProcData', 'EduMatriculaProcData', ConstraintType.MUST);
					var fieldsXml= DatasetFactory.createConstraint("XML", xmlMatricular, xmlMatricular, ConstraintType.MUST);
					var constraints = new Array(tabelaRM, fieldsXml);
					var rm_processSENAR = DatasetFactory.getDataset("rm_processSENAR", null, constraints, null);
				}
			}
		}			

	}
	
});

function inicio() {
	$('#divdisciplinas').hide();
	$('#empresa').hide();
	$('#alunos').hide();
	$('#efetuarMatricula').hide();
	$('#selecaoaluno').hide();

    //$('#STURMADISC_CODTURMA').attr("style", "pointer-events: none;background: #EEE; border: none;");
	
	$('#STURMADISC_CODTIPOCURSO').ready(
			function(){
				var ds_CadastroTurmaDisciplina_Contexto = DatasetFactory.getDataset("ds_CadastroTurmaDisciplina_Contexto", null, null, null);
				
				$('#STURMADISC_CODTIPOCURSO').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroTurmaDisciplina_Contexto.values.length > 0) {
					$.each(ds_CadastroTurmaDisciplina_Contexto.values, function(key, value) {
						if(value.STURMADISC_CODTIPOCURSO == 8){ //$('#STURMA_CODTIPOCURSO').val()
							$('#STURMADISC_CODTIPOCURSO').append('<option value="' + value.STURMADISC_CODTIPOCURSO + '" selected >' + value.STURMA_NOMECONTEXTO + '</option>');
						} else {
							$('#STURMADISC_CODTIPOCURSO').append('<option value="' + value.STURMADISC_CODTIPOCURSO + '">' + value.STURMA_NOMECONTEXTO + '</option>');
						}
					});
				}
			}
	);

	$('#STURMADISC_IDPERLET').ready(
			function(){//teste
				var cs_STURMADISC_IDPERLET= DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
				var constraintsIdperlet = new Array(cs_STURMADISC_IDPERLET);
				var ds_CadastroTurmaDisciplina_PeriodoLetivo = DatasetFactory.getDataset("ds_CadastroTurmaDisciplina_PeriodoLetivo", null, constraintsIdperlet, null);
				
				$('#STURMADISC_IDPERLET').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroTurmaDisciplina_PeriodoLetivo.values.length > 0) {
					$.each(ds_CadastroTurmaDisciplina_PeriodoLetivo.values, function(key, value) {
						if(value.STURMADISC_IDPERLET == 26){//$('#STURMA_IDPERLET').val()
							$('#STURMADISC_IDPERLET').append('<option value="' + value.STURMADISC_IDPERLET + '" selected >' + value.SPLETIVO_DESCRICAO + '</option>');
						} else {
							$('#STURMADISC_IDPERLET').append('<option value="' + value.STURMADISC_IDPERLET + '">' + value.SPLETIVO_DESCRICAO + '</option>');
						}
					});
				}
			}
	);
	
	$('#STURMADISC_CODMODALIDADE').empty();
	$('#STURMADISC_CODMODALIDADE').ready(
			function(){
				var ds_ConsultaTurma_Modalidade = DatasetFactory.getDataset("ds_ConsultaTurma_Modalidade", null, null, null);
				
				$('#STURMADISC_CODMODALIDADE').append('<option value="" >SELECIONE</option>');
				if (ds_ConsultaTurma_Modalidade.values.length > 0) {
					$.each(ds_ConsultaTurma_Modalidade.values, function(key, value) {
						if(value.STURMA_CODMODALIDADECURSO == $('#STURMADISC_CODMODALIDADE').val()){
							$('#STURMADISC_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '" selected >' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
						} else {
							$('#STURMADISC_CODMODALIDADE').append('<option value="' + value.STURMA_CODMODALIDADECURSO + '">' + value.SMODALIDADECURSO_DESCRICAO + '</option>');
						}
					});
				}
			}
	);

	$('#STURMADISC_CODCURSO').empty();
	$('#STURMADISC_CODCURSO').ready(
			function(){
			var cs_STURMA_CODTIPOCURSO= DatasetFactory.createConstraint("STURMA_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
			var cs_STURMA_CODMODALIDADECURSO= DatasetFactory.createConstraint("STURMA_CODMODALIDADECURSO", $('#STURMADISC_CODMODALIDADE').val(), $('#STURMADISC_CODMODALIDADE').val(), ConstraintType.MUST);
			var constraintsCodcurso = new Array(cs_STURMA_CODTIPOCURSO, cs_STURMA_CODMODALIDADECURSO);
			var ds_CadastroTurma_Cursos = DatasetFactory.getDataset("ds_CadastroTurma_Cursos", null, constraintsCodcurso, null);
			
			//limparCamposTurma();
			$('#STURMADISC_CODCURSO').empty();
			
			$('#STURMADISC_CODCURSO').append('<option value="" >SELECIONE</option>');
			if (ds_CadastroTurma_Cursos.values.length > 0) {
				$.each(ds_CadastroTurma_Cursos.values, function(key, value) {
					if(value.STURMA_CODCURSO == $('#STURMADISC_CODCURSO').val()){
						$('#STURMADISC_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '" selected >' + value.SCURSO_NOME + '</option>');
					} else {
						$('#STURMADISC_CODCURSO').append('<option value="' + value.STURMA_CODCURSO + '">' + value.SCURSO_NOME + '</option>');
					}
				});
			}
		}
	);

	
	$('#STURMADISC_CODTURMA').ready(
		function(){
			var cs_STURMADISC_CODTIPOCURSO= DatasetFactory.createConstraint("STURMADISC_CODTIPOCURSO", $('#STURMADISC_CODTIPOCURSO').val(), $('#STURMADISC_CODTIPOCURSO').val(), ConstraintType.MUST);
			var cs_STURMADISC_IDPERLET= DatasetFactory.createConstraint("STURMADISC_IDPERLET", $('#STURMADISC_IDPERLET').val(), $('#STURMADISC_IDPERLET').val(), ConstraintType.MUST);
			
			var cs_STURMADISC_CODMODALIDADE= DatasetFactory.createConstraint("STURMADISC_CODMODALIDADE", $('#STURMADISC_CODMODALIDADE').val(), $('#STURMADISC_CODMODALIDADE').val(), ConstraintType.MUST);
			var cs_STURMADISC_CODCURSO= DatasetFactory.createConstraint("STURMADISC_CODCURSO", $('#STURMADISC_CODCURSO').val(), $('#STURMADISC_CODCURSO').val(), ConstraintType.MUST);
			
			//var cs_STURMADISC_NOMERED= DatasetFactory.createConstraint("STURMADISC_NOMERED", $('#STURMADISC_NOMERED').val(), $('#STURMADISC_NOMERED').val(), ConstraintType.MUST);
			
			var constraintsTurmas = new Array(cs_STURMADISC_CODTIPOCURSO, cs_STURMADISC_IDPERLET, cs_STURMADISC_CODMODALIDADE, cs_STURMADISC_CODCURSO);
			var ds_CadastroTurmaDisciplina_CodTurma = DatasetFactory.getDataset("ds_CadastroTurmaDisciplina_CodTurma", null, constraintsTurmas, null);
			
			$('#STURMADISC_CODTURMA').empty();
			$('#STURMADISC_CODTURMA').append('<option value="" >SELECIONE</option>');
			if (ds_CadastroTurmaDisciplina_CodTurma.values.length > 0) {
				$.each(ds_CadastroTurmaDisciplina_CodTurma.values, function(key, value) {
					if(value.STURMADISC_CODTURMA == $('#STURMADISC_CODTURMA').val()){
						$('#STURMADISC_CODTURMA').append('<option value="' + value.STURMADISC_CODTURMA + '" selected >' + value.STURMADISC_NOMETURMA + '</option>');
					} else {
						$('#STURMADISC_CODTURMA').append('<option value="' + value.STURMADISC_CODTURMA + '">' + value.STURMADISC_NOMETURMA + '</option>');
					}
				});
			}
		}
	);
}

function validaCamposTurma(){
	
	if($('#STURMADISC_CODTIPOCURSO').val() == '' || $('#STURMADISC_CODTIPOCURSO').val() == null) {
		MensagemAlerta('Atenção','O preencha o campo "Contexto"');
		return false;
	}

	if($('#STURMADISC_IDPERLET').val() == '' || $('#STURMADISC_IDPERLET').val() == null) {
		MensagemAlerta('Atenção','O preencha o campo "Período Letivo"');
		return false;
	}

	if($('#STURMADISC_CODMODALIDADE').val() == '' || $('#STURMADISC_CODMODALIDADE').val() == null) {
		MensagemAlerta('Atenção','O preencha o campo "Modalidade"');
		return false;
	}
	
	if($('#STURMADISC_CODCURSO').val() == '' || $('#STURMADISC_CODCURSO').val() == null) {
		MensagemAlerta('Atenção','O preencha o campo "Curso"');
		return false;
	}

	if($('#STURMADISC_CODTURMA').val() == '' || $('#STURMADISC_CODTURMA').val() == null) {
		MensagemAlerta('Atenção','O preencha o campo "Turma"');
		return false;
	}
}

function substringMatcher(strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
 
        matches = [];
 
        substrRegex = new RegExp(q, 'i');
 
        $.each(strs, function (i, str) {
            if (substrRegex.test(str)) {
                matches.push({
                    description: str
                });
            }
        });
        cb(matches);
    };
}

function marcarTodos(marcar, elemento){
    var itens = document.getElementsByName(elemento+'[]');

    var i = 0;
    for(i=0; i<itens.length;i++){
        itens[i].checked = marcar;
    }

}

function limparCamposTurma() {
	$('#STURMADISC_CODTIPOCURSO').empty();
	$('#STURMADISC_IDPERLET').empty();
	$('#STURMADISC_CODMODALIDADE').empty();
	$('#STURMADISC_CODCURSO').empty();
	$('#STURMADISC_CODTURMA').empty();
	limpaTabela('tableDisc', 'linhaDisc');
	limpaTabela('tableAlunos', 'linhaAlunos');
}

function MensagemAlerta(titulo, mensagem, fechar){
	autoClose = fechar == true ? (true) : (false);
	modalMyLoading = FLUIGC.modal({
		title: titulo,
		content: mensagem,
		id: 	'fluig-modal',
		size: 	'larger',
		actions: [{
			'label': 	'Ok',
			'bind': 	'data-open-modal',
			'autoClose': true
		}]
	});	
	$(".modal-title").text(titulo);
	$(".modal-body").text(mensagem);
}

function limpaTabela(corpoTabela, linhaTabela){
	for(i=0; i<=3000; i++){
		$('#'+corpoTabela).remove();
		$('#'+linhaTabela).remove();
		
	}
}

function coletaDados(classe){
	var ids = document.getElementsByClassName(classe);
	return ids; //coletaIDs(ids);         
}  
	        
function coletaIDs(dados){
	var array_dados = dados; 
	var newArray = [];
	for(var x = 0; x <= array_dados.length; x++){     
		if(typeof array_dados[x] == 'object'){
			if(array_dados[x].checked){
				newArray.push(array_dados[x].defaultValue)          
			}          
		}
	}
	if(newArray.length <= 0){
		alert("Selecione um pelo menos 1 item!");     
	}else{
	return newArray; //alert("Seu novo array de IDs tem os seguites ids [ "+newArray+" ]");
	}  
}

function persisteDados(tabelaRM, fieldsXml){
	
	var constraints = new Array(tabelaRM, fieldsXml);
	var rm_saverecordauth = DatasetFactory.getDataset("rm_saverecordauth", null, constraints, null);
	
	if (rm_saverecordauth.values.length > 0 ){
		if(rm_saverecordauth.values[0]["ERROR"]){
			//MensagemAlerta('Atenção!','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+rm_saverecordauth.values[0]["ERROR"]);
			return 0;//false;
		} else{
			if(rm_saverecordauth.values[0]["SUCCESS"]){
				return 1;
				//MensagemAlerta('Atenção!','Dados gavados com sucesso! ' + tela);
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