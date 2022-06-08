var CadastroDisciplina = SuperWidget.extend({
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
            'valorBasicoPorCurso': ['click_valorBasicoPorCurso'],
            'ajudaCusto': ['click_ajudaCusto'],
            'cadeiaProdutiva': ['click_cadeiaProdutiva'],
            'novo': ['click_novo'],
            'voltar': ['click_voltar'],
            'buscarDadosFiltro': ['click_buscarDadosFiltro'],
            'editar': ['click_editar'],
            'limparCamposFiltro': ['click_limparCamposFiltro'],
            'limparCampos': ['click_limparCampos'],
            'gravarDados': ['click_gravarDados'],
            'tipoCurso': ['change_tipoCurso']
        },
        global: {}
    },
    
    novo: function(htmlElement, event) {
    	$("#form-painelDisciplinas").hide();
    	$("#cadastroDisciplina").show();
    	$('#ADDEDIT').val('novo');
    	inicio();
    	
    },
    
    voltar: function(htmlElement, event) {
    	$("#cadastroDisciplina").hide();
    	$("#form-painelDisciplinas").show();
    	limparCamposFiltro();
    	inicioFiltro();
    },
    
    limparCamposFiltro: function(htmlElement, event) {
    	limparCamposFiltro();
    	inicioFiltro();
    },
    
    limparCampos: function(htmlElement, event) {
		limparCampos();
		limparCamposContexto();
    	inicio();
    },
	
    buscarDadosFiltro: function(htmlElement, event) {
    	
    	limpaTabelaFiltro();
    	
    	var cs_SDISCIPLINA_CODTIPOCURSO = DatasetFactory.createConstraint("SDISCIPLINA_CODTIPOCURSO", $('#DISCIPLINA_CODTIPOCURSO').val(), $('#DISCIPLINA_CODTIPOCURSO').val(), ConstraintType.MUST);
    	var cs_SDISCIPLINA_NOMEREDUZIDO = DatasetFactory.createConstraint("SDISCIPLINA_NOMEREDUZIDO", $('#DISCIPLINA_NOMEREDUZIDO').val(), $('#DISCIPLINA_NOMEREDUZIDO').val(), ConstraintType.MUST);
    	var cs_SDISCIPLINA_NOME = DatasetFactory.createConstraint("SDISCIPLINA_NOME", $('#DISCIPLINA_NOME').val(), $('#DISCIPLINA_NOME').val(), ConstraintType.MUST);
    	var cs_SDISCIPLINA_CODDISC = DatasetFactory.createConstraint("SDISCIPLINA_CODDISC", $('#DISCIPLINA_CODDISC').val(), $('#DISCIPLINA_CODDISC').val(), ConstraintType.MUST);
    	
    	var constraintsDisc = new Array(cs_SDISCIPLINA_CODTIPOCURSO, cs_SDISCIPLINA_NOMEREDUZIDO, cs_SDISCIPLINA_NOME, cs_SDISCIPLINA_CODDISC);
		var ds_CadastroDisciplina_Disciplinas = DatasetFactory.getDataset("ds_CadastroDisciplina_Disciplinas", null, constraintsDisc, null);
		
		//var STURMA_CODMODALIDADECURSO = 0;
		
		if (ds_CadastroDisciplina_Disciplinas.values.length > 0) {
			$('#divresultado').show();
			var ordem = 1;
			
			$.each(ds_CadastroDisciplina_Disciplinas.values, function(key, value) {
					
				$('#tabelaDisciplinas').append('<tbody id="body-table" name="body-table">'+
						   '<tr id="LINHA" name="LINHA"> <td>'+ ordem + '</td>' +
						   	    '<td>' + value.SDISCIPLINA_CONTEXTO + '</td>' +
						   	    '<td>' + value.SDISCIPLINA_CODDISC + '</td>' +
						   	    '<td>' + value.SDISCIPLINA_NOME + '</td>' +
						   	    '<td>' + value.SDISCIPLINA_NOMEREDUZIDO + '</td>' +
								'<td>' + value.SDISCIPLINA_COMPLEMENTO + '</td>' +
								'<td>' + value.SDISCIPLINA_CH + '</td>' +
								'<td><button id="btneditar_'+ordem+'" data-editar class="btn btn-primary" value="'+ordem+'">Editar</button></td>' +
								'<td><input type="hidden" value="' + value.SDISCIPLINA_CODTIPOCURSO + '" /></td>' +
								//'<td><button onclick="editar('+value.STURMA_CODTIPOCURSO+','+value.STURMA_IDPERLET+','+value.STURMA_CODTURMA+');" class="btn btn-primary">Editar</button></td>' +
						   '</tbody>');
				
				ordem++;
			});
		} else {
			$('#divresultado').hide();
			MensagemAlerta('Atenção!','Nenhum registro Encontrado!');
		}
    	
    },
    
    editar: function(htmlElement, event) {
    	var myLoading1 =FLUIGC.loading(window);
    	myLoading1.show();
    	
    	$("#form-painelDisciplinas").hide();
    	$('#SDISCIPLINA_NENHUM').removeAttr("checked");
		$("#cadastroDisciplina").show();
		
		$("#ADDEDIT").val('editar');
    	
    	var row = '';
    	var element = '';
    	var codtipocurso = '';
    	var coddisc = '';
    	
    	$("button[id^='btneditar_']").each(function(key, value){
    		var id = $(this).prop("id"), index = id.split('_');
    		if($('#btneditar_'+index[1]).val() == event.target.value) {
    			row = document.getElementById("tabelaDisciplinas").getElementsByTagName("tr")[event.target.value];
    			element = row.getElementsByTagName("td");
    			codtipocurso = element[8].lastChild.value;
    			coddisc = element[2].innerText;
            	
            	carregaDadosDisciplina(codtipocurso, coddisc);
            	
    		}
    	});
    	
		myLoading1.hide();
    },
    
    tipoCurso: function(htmlElement, event) {
    	/*Preencher Campo Código do Curso na aba "Curso"*/
    	var cs_SDISCIPLINA_CODTIPOCURSO= DatasetFactory.createConstraint("SDISCIPLINA_CODTIPOCURSO", $('#SDISCIPLINA_CODTIPOCURSO').val(), $('#SDISCIPLINA_CODTIPOCURSO').val(), ConstraintType.MUST);
		var constraintsTipoCurso = new Array(cs_SDISCIPLINA_CODTIPOCURSO);
		var ds_CadastroDisciplina_CodDisc = DatasetFactory.getDataset("ds_CadastroDisciplina_CodDisc", null, constraintsTipoCurso, null);
		
		
		if ($("#SDISCIPLINA_CODTIPOCURSO").val() == ''){
			$("#SDISCIPLINA_CODDISC").val('');
		} else {
			if (ds_CadastroDisciplina_CodDisc.values.length > 0) {
				$.each(ds_CadastroDisciplina_CodDisc.values, function(key, value) {
					$("#SDISCIPLINA_CODDISC").val(value.SDISCIPLINA_CODDISC);
				});
			} 
		}
    },
    
    gravarDados: function(htmlElement, event) {
    	var valida = validaCamposObrigatorios();
    	if (valida == false){
    		return false;
    	} else {
    	
    		$('#cadastroDisciplina').attr("style", "pointer-events: none;background: #EEE; border: none;");
    		var myLoading1 = FLUIGC.loading('#cadastroDisciplina');
    		myLoading1.show();
    		
			var retornoDisciplina = 0;
			var retornoVBParticipante = 0;
			var retornoAjudaCusto = 0;
			var retornoCadeiaProdutiva = 0;	
    		
    		var checkboxEstagio = $('#SDISCIPLINA_ESTAGIO');
    		var estagio;
    		if(checkboxEstagio.is(":checked")) {
    			estagio = 'S';
    		} else {
    			estagio = 'N';
    		}
    		
    		var checkboxCLivre = $('#SDISCIPLINA_CURSOLIVRE');
    		var cursoLivre;
    		if(checkboxCLivre.is(":checked")) {
    			cursoLivre = 'S';
    		} else {
    			cursoLivre = 'N';
    		}
    		
    		var xmlEduDisciplina = " <EduDisciplina> " +
    		"   <SDISCIPLINA> " +
    		"     <CODCOLIGADA>1</CODCOLIGADA> " +
    		"     <CODDISC>" + $('#SDISCIPLINA_CODDISC').val() + "</CODDISC> " +
    		"     <NOME>" + $('#SDISCIPLINA_NOME').val() + "</NOME> " +
    		"     <NOMEREDUZIDO>" + $('#SDISCIPLINA_NOMEREDUZIDO').val() + "</NOMEREDUZIDO> " +
    		"	 <COMPLEMENTO>" + $('#SDISCIPLINA_COMPLEMENTO').val() + "</COMPLEMENTO> " +
    		"     <CH>" + $('#SDISCIPLINA_CH').val() + "</CH> " +
    		"	 <DECIMAIS>2</DECIMAIS> " +
    		"     <CODTIPOCURSO>" + $('#SDISCIPLINA_CODTIPOCURSO').val() + "</CODTIPOCURSO> " +
    		"	 <CHESTAGIO>" + $('#SDISCIPLINA_CHESTAGIO').val() + "</CHESTAGIO> " +
    		"     <CURSOLIVRE>" + cursoLivre + "</CURSOLIVRE> " +
    		"     <TIPOAULA>T</TIPOAULA> " +
    		"     <TIPODISCPROVAO>B</TIPODISCPROVAO> " +
    		"     <TIPONOTA>N</TIPONOTA> " +
    		"     <ESTAGIO>" + estagio + "</ESTAGIO> " +
    		"	 <CHTEORICA>" + $('#SDISCIPLINA_CHTEORICA').val() + "</CHTEORICA> " +
    		"	 <CHPRATICA>" + $('#SDISCIPLINA_CHPRATICA').val() + "</CHPRATICA> " +
    		"	 <ITINERARIOFORMATIVO>N</ITINERARIOFORMATIVO> " +
    		"   </SDISCIPLINA> " +
    		" </EduDisciplina> ";
    		
    		
    		var tabelaDisciplina= DatasetFactory.createConstraint("tabelaRM", 'EduDisciplinaData', 'EduDisciplinaData', ConstraintType.MUST);
    		var fieldsXml= DatasetFactory.createConstraint("fieldsXml", xmlEduDisciplina, xmlEduDisciplina, ConstraintType.MUST);
    		var tela = "Disciplina";
    		retornoDisciplina = persisteDados(tabelaDisciplina,fieldsXml,tela);
    		
    		if(retornoDisciplina == 0) {
    			$('#cadastroDisciplina').removeAttr("style");
    			myLoading1.hide();
    			MensagemAlerta('Atenção!','Erro ao gravar dados da Disciplina! ');
    			return false;
    		}     		
    		
    		/* GRAVA DADOS DO VALOR BÁSICO POR PARTICIPANTE */
    		if($("input[id^='VBPARTDISC_ID___']").length > 0) {
    			var xmlVBPartic = "<PRJ4995328>";
    			
    			$("input[id^='VBPARTDISC_ID___']").each(function(key, value){
    				
    				var id = $(this).prop("id"), index = id.split('_');
					var valorBasicoPart = $('#VBPARTDISC_VALORBASICO___'+index[4]).val().replace('.','');//.replace(',','.');
					
					//valorBasicoPart = parseFloat(valorBasicoPart);
					valorBasicoPart = valorBasicoPart.toString();
    				
    				xmlVBPartic += " <ZMDVBPARTDISC> " +
    				"   <ID>" + $('#VBPARTDISC_ID___'+index[4]).val() + "</ID> " +
    				"   <CODCOLIGADA>1</CODCOLIGADA> " +
    				"   <CODDISCIPLINA>" + $('#SDISCIPLINA_CODDISC').val() + "</CODDISCIPLINA> " +
    				"   <VIGENTEAPARTIR>" + $('#VBPARTDISC_VIGENTEAPARTIR___'+index[4]).val() + "</VIGENTEAPARTIR> " +
    				"   <VALORBASICO>" + valorBasicoPart + "</VALORBASICO> " +
    				" </ZMDVBPARTDISC> ";
    			});
    			
    			xmlVBPartic += " </PRJ4995328>";
    			
    			console.log(xmlVBPartic);
    			
    			var tabelaVBPartic= DatasetFactory.createConstraint("tabelaRM", 'RMSPRJ4995328Server', 'RMSPRJ4995328Server', ConstraintType.MUST);
    			var xmlVBParticipante= DatasetFactory.createConstraint("fieldsXml", xmlVBPartic, xmlVBPartic, ConstraintType.MUST);
    			var tela = "V. B. Participante"
    				retornoVBParticipante = persisteDados(tabelaVBPartic,xmlVBParticipante,tela);
				
				if(retornoVBParticipante == 0) {
					$('#cadastroDisciplina').removeAttr("style");
					myLoading1.hide();
					MensagemAlerta('Atenção!','Erro ao gravar dados do Valor Básico por Participante! ');
					return false;
				}	
				
    			
    		} 
    		
    		/* GRAVA DADOS AJUDA DE CUSTO */
    		if($("input[id^='AJUDACUSTO_ID___']").length > 0) {
    			var xmlAjudaCusto = "<PRJ4130560>";
    			
    			$("input[id^='AJUDACUSTO_ID___']").each(function(key, value){
    				
    				var id = $(this).prop("id"), index = id.split('_');
					var valorAjudaCusto = $('#AJUDACUSTO_VALOR___'+index[4]).val().replace('.','');//.replace(',','.');
					
					//valorBasicoPart = parseFloat(valorBasicoPart);
					valorAjudaCusto = valorAjudaCusto.toString();
    				
    				xmlAjudaCusto += " <ZMDAJUDACUSTO> " +
    				"   <ID>" + $('#AJUDACUSTO_ID___'+index[4]).val() + "</ID> " +
    				"   <COLIGADA>1</COLIGADA> " +
    				"   <APLICACAO>S</APLICACAO> " +
    				"   <CODIGO>" + $('#AJUDACUSTO_CODIGO___'+index[4]).val() + "</CODIGO> " +
    				"   <CODDISCIPLINA>" + $('#SDISCIPLINA_CODDISC').val() + "</CODDISCIPLINA> " +
    				"   <DATAINICIAL>" + $('#AJUDACUSTO_DATAINICIAL___'+index[4]).val() + "</DATAINICIAL> " +
    				"   <DATAFINAL>" + $('#AJUDACUSTO_DATAFINAL___'+index[4]).val() + "</DATAFINAL> " +
    				"   <VALOR>" + valorAjudaCusto + "</VALOR> " +
    				"   <OBS>" + $('#AJUDACUSTO_OBS___'+index[4]).val() + "</OBS> " +
    				" </ZMDAJUDACUSTO> ";
    			});
    			
    			xmlAjudaCusto += " </PRJ4130560>";
    			
    			console.log(xmlAjudaCusto);
    			
    			var tabelaAjudaCusto= DatasetFactory.createConstraint("tabelaRM", 'RMSPRJ4130560Server', 'RMSPRJ4130560Server', ConstraintType.MUST);
    			var xmlAjudaDeCusto= DatasetFactory.createConstraint("fieldsXml", xmlAjudaCusto, xmlAjudaCusto, ConstraintType.MUST);
    			var tela = "Ajuda de Custo"
    				retornoAjudaCusto = persisteDados(tabelaAjudaCusto,xmlAjudaDeCusto,tela);
    			
				if(retornoAjudaCusto == 0) {
					$('#cadastroDisciplina').removeAttr("style");
					myLoading1.hide();
					MensagemAlerta('Atenção!','Erro ao gravar dados da Ajuda de Custo! ');
					return false;
				}
				
				
    		}
    		
    		/* GRAVA DADOS CADEIA PRODUTIVA */
    		if($("input[id^='CADEIADISCIPLINA_ID___']").length > 0) {
    			var xmlCadeiaProdutiva = "<PRJ4595712>";
    			
    			$("input[id^='CADEIADISCIPLINA_ID___']").each(function(key, value){
    				
    				var id = $(this).prop("id"), index = id.split('_');
    				
    				var checkbox = $('#CADEIADISCIPLINA_ATIVO___'+index[4]);
    				var ativo;
    				if(checkbox.is(":checked")) {
    					ativo = 1;
    				} else {
    					ativo = 0;
    				}
    				
    				xmlCadeiaProdutiva += " <ZMDCADEIADISCIPLINA> " +
    				"   <ID>" + $('#CADEIADISCIPLINA_ID___'+index[4]).val() + "</ID> " +
    				"   <CODDISC>" + $('#SDISCIPLINA_CODDISC').val() + "</CODDISC> " +
    				"   <CODIGO>" + $('#CADEIADISCIPLINA_CODIGO___'+index[4]).val() + "</CODIGO> " +
    				"   <OBSERVACAO>" + $('#CADEIADISCIPLINA_OBSERVACAO___'+index[4]).val() + "</OBSERVACAO> " +
    				"   <ATIVO>" + ativo + "</ATIVO> " +
    				" </ZMDCADEIADISCIPLINA> ";
    			});
    			
    			xmlCadeiaProdutiva += " </PRJ4595712>";
    			
    			console.log(xmlAjudaCusto);
    			
    			var tabelaCProdutiva= DatasetFactory.createConstraint("tabelaRM", 'RMSPRJ4595712Server', 'RMSPRJ4595712Server', ConstraintType.MUST);
    			var xmlCProdutiva= DatasetFactory.createConstraint("fieldsXml", xmlCadeiaProdutiva, xmlCadeiaProdutiva, ConstraintType.MUST);
    			var tela = "Cadeia Produtiva"
    				retornoCadeiaProdutiva = persisteDados(tabelaCProdutiva,xmlCProdutiva,tela);
				
				if(retornoCadeiaProdutiva == 0) {
					$('#cadastroDisciplina').removeAttr("style");
					myLoading1.hide();
					MensagemAlerta('Atenção!','Erro ao gravar dados da Cadeia Produtiva! ');
					return false;
				}

				$('#ADDEDIT').val('editar');
				
				var classe = document.getElementsByClassName("in active");
	        
				for(var i = 0; i < 2; i++){
					classe[0].classList.remove("fade", "in", "active");
				}
				
				var classeli = document.getElementsByClassName("active");
				
				for(var i = 0; i < classeli.length; i++){
					classeli[i].classList.remove("active");
				}

				$('#disciplina').addClass("tab-pane fade in active");
				$('#btn-disciplina').addClass("active");
				var codtipocurso = $('#SDISCIPLINA_CODTIPOCURSO').val();
				var coddisc = $('#SDISCIPLINA_CODDISC').val();
				limparCampos();
				carregaDadosDisciplina(codtipocurso, coddisc);

    			if(retornoDisciplina == 1 && retornoVBParticipante == 1 && retornoAjudaCusto == 1 && retornoCadeiaProdutiva == 1){
    				$('#cadastroDisciplina').removeAttr("style");
    				myLoading1.hide();
    				MensagemAlerta('Atenção!','Dados gravados com sucesso! ');
    				$('#SDISCIPLINA_CODTIPOCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
    			}
    			
    			
    		}
    		
	
    	}
					
    },
    
    valorBasicoPorCurso: function(htmlElement, event) {
    	//MaskEvent.init();
    	//wdkAddChild('valorBasicoPorCurso');
    	
		$("input[id^='VBPARTDISC_VIGENTEAPARTIR___']").each(function(key, value){
			
			var id = $(this).prop("id"), index = id.split('_');

			$('#VBPARTDISC_VALORBASICO___'+index[4]).maskMoney({showSymbol:true, symbol:"", decimal:",", thousands:".", precision: 4});

			$('#VBPARTDISC_VIGENTEAPARTIR___'+index[4]).datetimepicker({ 
				pickDate: true, 
				pickTime: false,
				language: 'pt-BR'
			});	
			
			if($('#VBPARTDISC_ID___'+index[4]).val() == "" || $('#VBPARTDISC_ID___'+index[4]).val() == ""){
				$('#VBPARTDISC_ID___'+index[4]).val('-1');
				//$('#RECURSOPARCEIRO_QUANTIDADE___'+index[4]).mask("0000,00");
			}
		});

		//$(document).ready(function(){
			//$("input.dinheiro").maskMoney({showSymbol:true, symbol:"", decimal:",", thousands:".", precision: 4});
	  //});
		
    },
    
    ajudaCusto: function(htmlElement, event) {
    	//MaskEvent.init();
    	//wdkAddChild('valorBasicoPorCurso');
    	
		$("input[id^='AJUDACUSTO_DATAINICIAL___']").each(function(key, value){
			
			var id = $(this).prop("id"), index = id.split('_');

			$('#AJUDACUSTO_VALOR___'+index[4]).maskMoney({showSymbol:true, symbol:"", decimal:",", thousands:".", precision: 4});
			
			$('#AJUDACUSTO_DATAINICIAL___'+index[4]).datetimepicker({ 
				pickDate: true, 
				pickTime: false,
				language: 'pt-BR'
			});	
			
			$('#AJUDACUSTO_DATAFINAL___'+index[4]).datetimepicker({ 
				pickDate: true, 
				pickTime: false,
				language: 'pt-BR'
			});	
			
			if($('#AJUDACUSTO_ID___'+index[4]).val() == "" || $('#AJUDACUSTO_ID___'+index[4]).val() == ""){
				$('#AJUDACUSTO_ID___'+index[4]).val('-1');
				//$('#RECURSOPARCEIRO_QUANTIDADE___'+index[4]).mask("0000,00");
			}
			
			//$('#AJUDACUSTO_CODIGO___'+index[4]).empty();
			var ds_CadastroDisciplina_TipoCusto = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoCusto", null, null, null);
						
			$('#AJUDACUSTO_CODIGO___'+index[4]).append('<option value="" >SELECIONE</option>');
			if (ds_CadastroDisciplina_TipoCusto.values.length > 0) {
				$.each(ds_CadastroDisciplina_TipoCusto.values, function(key, value) {
					if(value.AJUDACUSTO_TIPOCUSTO == $('#AJUDACUSTO_CODIGO___'+index[4]).val()){
						$('#AJUDACUSTO_CODIGO___'+index[4]).append('<option value="' + value.AJUDACUSTO_TIPOCUSTO + '" selected >' + value.AJUDACUSTO_DESCTIPOCUSTO + '</option>');
					} else {
						$('#AJUDACUSTO_CODIGO___'+index[4]).append('<option value="' + value.AJUDACUSTO_TIPOCUSTO + '">' + value.AJUDACUSTO_DESCTIPOCUSTO + '</option>');
					}
				});
			}
		});
			
		
		
		
    },
    
    cadeiaProdutiva: function(htmlElement, event) {
    	//MaskEvent.init();
    	//wdkAddChild('valorBasicoPorCurso');
    	
		$("input[id^='CADEIADISCIPLINA_ID___']").each(function(key, value){
			
			var id = $(this).prop("id"), index = id.split('_');
			
			if($('#CADEIADISCIPLINA_ID___'+index[4]).val() == "" || $('#CADEIADISCIPLINA_ID___'+index[4]).val() == ""){
				$('#CADEIADISCIPLINA_ID___'+index[4]).val('-1');
				//$('#RECURSOPARCEIRO_QUANTIDADE___'+index[4]).mask("0000,00");
			}
			
			//$('#AJUDACUSTO_CODIGO___'+index[4]).empty();
			var ds_CadastroDisciplina_TipoCadeiaProdutiva = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoCadeiaProdutiva", null, null, null);
						
			$('#CADEIADISCIPLINA_CODIGO___'+index[4]).append('<option value="" >SELECIONE</option>');
			if (ds_CadastroDisciplina_TipoCadeiaProdutiva.values.length > 0) {
				$.each(ds_CadastroDisciplina_TipoCadeiaProdutiva.values, function(key, value) {
					if(value.CADEIAPRODUTIVA_CODIGO == $('#CADEIADISCIPLINA_CODIGO___'+index[4]).val()){
						$('#CADEIADISCIPLINA_CODIGO___'+index[4]).append('<option value="' + value.CADEIAPRODUTIVA_CODIGO + '" selected >' + value.CADEIAPRODUTIVA_DESCRICAO + '</option>');
					} else {
						$('#CADEIADISCIPLINA_CODIGO___'+index[4]).append('<option value="' + value.CADEIAPRODUTIVA_CODIGO + '">' + value.CADEIAPRODUTIVA_DESCRICAO + '</option>');
					}
				});
			}
		});
			
		
		
		
    }
    
    

});

function inicioFiltro(){
	$('#divresultado').hide();
	$('#cadastroDisciplina').hide();
	
	$('#DISCIPLINA_CODTIPOCURSO').ready(
			function(){
				var ds_CadastroDisciplina_Contexto = DatasetFactory.getDataset("ds_CadastroDisciplina_Contexto", null, null, null);
				
				$('#DISCIPLINA_CODTIPOCURSO').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroDisciplina_Contexto.values.length > 0) {
					$.each(ds_CadastroDisciplina_Contexto.values, function(key, value) {
						if(value.SDISCIPLINA_CODTIPOCURSO == $('#DISCIPLINA_CODTIPOCURSO').val()){
							$('#DISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '" selected >' + value.STIPOCURSO_NOME + '</option>');
						} else {
							$('#DISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '">' + value.STIPOCURSO_NOME + '</option>');
						}
					});
				}
			}
	);
	
}

function limparCamposFiltro() {
	$('#DISCIPLINA_CODTIPOCURSO').empty();
	$('#DISCIPLINA_NOMEREDUZIDO').val('');
	$('#DISCIPLINA_CODDISC').val('');
	$('#DISCIPLINA_NOME').val('');
}

function limparCamposContexto(){
	$('#SDISCIPLINA_CODTIPOCURSO').empty();
	$('#SDISCIPLINA_CODDISC').val('');
}

function limparCampos() {
	$('#SDISCIPLINA_NOMEREDUZIDO').val('');
	$('#SDISCIPLINA_NOME').val('');
	$('#SDISCIPLINA_COMPLEMENTO').val('');
	$('#SDISCIPLINA_CH').val('');
	$('#SDISCIPLINA_CHTEORICA').val('');
	$('#SDISCIPLINA_CHPRATICA').val('');
	$('#SDISCIPLINA_CHESTAGIO').val('');
	$('#SDISCIPLINA_NENHUM').removeAttr("checked");
	$('#SDISCIPLINA_CURSOLIVRE').removeAttr("checked");
	$('#SDISCIPLINA_ESTAGIO').removeAttr("checked");
	//$('#SDISCIPLINA_NENHUM').attr("checked", "checked");
	document.getElementById("SDISCIPLINA_NENHUM").checked = true;
	
	//Limpar campos da aba Valor Básico por Participante
	if ($("input[id^='VBPARTDISC_ID___']")) {
		
		$("input[id^='VBPARTDISC_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			$('#VBPARTDISC_VIGENTEAPARTIR___'+index[4]).val('');
			$('#VBPARTDISC_VALORBASICO___'+index[4]).val('');
			fnWdkRemoveChild(this);
		});
		
	}
	
	//Limpar campos da aba Ajuda de Custo
	if ($("input[id^='AJUDACUSTO_ID___']")) {
		
		$("input[id^='AJUDACUSTO_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			$('#AJUDACUSTO_CODIGO___'+index[4]).empty();
			$('#AJUDACUSTO_VALOR___'+index[4]).val('');
			$('#AJUDACUSTO_DATAINICIAL___'+index[4]).val('');
			$('#AJUDACUSTO_DATAFINAL___'+index[4]).val('');
			$('#AJUDACUSTO_OBS___'+index[4]).val('');
			fnWdkRemoveChild(this);
		});
		
	}
	
	//Limpar campos da aba Cadeia Produtiva
	if ($("input[id^='CADEIADISCIPLINA_ID___']")) {
		
		$("input[id^='CADEIADISCIPLINA_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			$('#CADEIADISCIPLINA_CODIGO___'+index[4]).empty();
			$('#CADEIADISCIPLINA_OBSERVACAO___'+index[4]).val('');
			document.getElementById("CADEIADISCIPLINA_ATIVO___"+index[4]).checked = false;
			fnWdkRemoveChild(this);
		});
		
	}

}

function carregaDadosDisciplina(codtipocurso, coddisc){
	var cs_SDISCIPLINA_CODTIPOCURSO = DatasetFactory.createConstraint("SDISCIPLINA_CODTIPOCURSO", codtipocurso, codtipocurso, ConstraintType.MUST);
	var cs_SDISCIPLINA_CODDISC = DatasetFactory.createConstraint("SDISCIPLINA_CODDISC", coddisc, coddisc, ConstraintType.MUST);
	
	var constraintsDisc = new Array(cs_SDISCIPLINA_CODTIPOCURSO, cs_SDISCIPLINA_CODDISC);
	var ds_CadastroDisciplina_Disciplinas = DatasetFactory.getDataset("ds_CadastroDisciplina_Disciplinas", null, constraintsDisc, null);
	
	var SDISCIPLINA_CODTIPOCURSO = 0;
	var SDISCIPLINA_TIPOAULA = 0;
	var SDISCIPLINA_TIPONOTA = 0;
	
	if (ds_CadastroDisciplina_Disciplinas.values.length > 0) {
		$.each(ds_CadastroDisciplina_Disciplinas.values, function(key, value) {
				
			SDISCIPLINA_CODTIPOCURSO = value.SDISCIPLINA_CODTIPOCURSO;
			SDISCIPLINA_TIPOAULA = value.SDISCIPLINA_TIPOAULA;
			SDISCIPLINA_TIPONOTA = value.SDISCIPLINA_TIPONOTA;
				
			$('#SDISCIPLINA_CODDISC').val(value.SDISCIPLINA_CODDISC);
			$('#SDISCIPLINA_DECIMAIS').val(value.SDISCIPLINA_DECIMAIS);
			$('#SDISCIPLINA_NOME').val(value.SDISCIPLINA_NOME);
			$('#SDISCIPLINA_COMPLEMENTO').val(value.SDISCIPLINA_COMPLEMENTO);
			$('#SDISCIPLINA_NOMEREDUZIDO').val(value.SDISCIPLINA_NOMEREDUZIDO);
			$('#SDISCIPLINA_CH').val(value.SDISCIPLINA_CH);
			$('#SDISCIPLINA_CHTEORICA').val(value.SDISCIPLINA_CHTEORICA);
			$('#SDISCIPLINA_CHPRATICA').val(value.SDISCIPLINA_CHPRATICA);
			$('#SDISCIPLINA_CHESTAGIO').val(value.SDISCIPLINA_CHESTAGIO);
			
			if(value.SDISCIPLINA_ESTAGIO == 'S'){
				document.getElementById("SDISCIPLINA_ESTAGIO").checked = true;
			} else if(value.SDISCIPLINA_CURSOLIVRE == 'S'){
				document.getElementById("SDISCIPLINA_CURSOLIVRE").checked = true;
			} else {
				document.getElementById("SDISCIPLINA_NENHUM").checked = true;
			}
			
			$('#SDISCIPLINA_CODTIPOCURSO').attr("style", "pointer-events: none;background: #EEE; border: none;");
		});
		
		$('#SDISCIPLINA_CODTIPOCURSO').ready(
				function(){
					var ds_CadastroDisciplina_Contexto = DatasetFactory.getDataset("ds_CadastroDisciplina_Contexto", null, null, null);
					
					$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="" >SELECIONE</option>');
					if (ds_CadastroDisciplina_Contexto.values.length > 0) {
						$.each(ds_CadastroDisciplina_Contexto.values, function(key, value) {
							if(value.SDISCIPLINA_CODTIPOCURSO == SDISCIPLINA_CODTIPOCURSO){
								$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '" selected >' + value.STIPOCURSO_NOME + '</option>');
							} else {
								$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '">' + value.STIPOCURSO_NOME + '</option>');
							}
						});
					}
				}
		);
	}

	/******* PREENCHE PAI E FILHO "VALOR BÁSICO POR PARTICIPANTE" DA DISCIPLINA *******/
	var cs_VBPARTDISC_CODDISCIPLINA = DatasetFactory.createConstraint("VBPARTDISC_CODDISCIPLINA", coddisc, coddisc, ConstraintType.MUST);
	var constraintsCDisc = new Array(cs_VBPARTDISC_CODDISCIPLINA);
	var ds_CadastroDisciplina_ValorBasicoParticipante = DatasetFactory.getDataset("ds_CadastroDisciplina_ValorBasicoParticipante", null, constraintsCDisc, null);	
	
	rowIndex.valorBasico = 0;
	
	for (var i = 0; i < ds_CadastroDisciplina_ValorBasicoParticipante.values.length; i++){
		wdkAddChild('valorBasico');
	}
	
	
	for(i=1; i <= ds_CadastroDisciplina_ValorBasicoParticipante.values.length; i++){
		$('#VBPARTDISC_ID___'+i).val(ds_CadastroDisciplina_ValorBasicoParticipante.values[i-1]["VBPARTDISC_ID"]);
		$('#VBPARTDISC_VIGENTEAPARTIR___'+i).val(ds_CadastroDisciplina_ValorBasicoParticipante.values[i-1]["VBPARTDISC_VIGENTEAPARTIR"]);
		$('#VBPARTDISC_VALORBASICO___'+i).maskMoney({showSymbol:true, symbol:"", decimal:",", thousands:".", precision: 4});
		$('#VBPARTDISC_VALORBASICO___'+i).val(mascaraValorVirgula(ds_CadastroDisciplina_ValorBasicoParticipante.values[i-1]["VBPARTDISC_VALORBASICO"]));
		
		$('#VBPARTDISC_VIGENTEAPARTIR___'+i).datetimepicker({ 
			pickDate: true, 
			pickTime: false,
			language: 'pt-BR'
		});	
		
		document.getElementById("removeValorBasico___"+i).disabled = true;
		
	}
	
	/******* PREENCHE PAI E FILHO "AJUDA DE CUSTO" DA DISCIPLINA *******/
	var cs_AJUDACUSTO_CODDISCIPLINA = DatasetFactory.createConstraint("AJUDACUSTO_CODDISCIPLINA", coddisc, coddisc, ConstraintType.MUST);
	var constraintsCodDisc = new Array(cs_AJUDACUSTO_CODDISCIPLINA);
	var ds_CadastroDisciplina_AjudaCusto = DatasetFactory.getDataset("ds_CadastroDisciplina_AjudaCusto", null, constraintsCodDisc, null);	
	
	var AJUDACUSTO_CODIGO = 0;
	
	rowIndex.ajudaCusto = 0;
	
	for (var i = 0; i < ds_CadastroDisciplina_AjudaCusto.values.length; i++){
		wdkAddChild('ajudaCusto');
	}
	
	
	for(i=1; i <= ds_CadastroDisciplina_AjudaCusto.values.length; i++){
		var AJUDACUSTO_CODIGO = ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_CODIGO"];
		
		$('#AJUDACUSTO_ID___'+i).val(ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_ID"]);
		$('#AJUDACUSTO_VALOR___'+i).maskMoney({showSymbol:true, symbol:"", decimal:",", thousands:".", precision: 4});
		$('#AJUDACUSTO_VALOR___'+i).val(mascaraValorVirgula(ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_VALOR"]));
		$('#AJUDACUSTO_DATAINICIAL___'+i).val(ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_DATAINICIAL"]);
		$('#AJUDACUSTO_DATAFINAL___'+i).val(ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_DATAFINAL"]);
		$('#AJUDACUSTO_OBS___'+i).val(ds_CadastroDisciplina_AjudaCusto.values[i-1]["AJUDACUSTO_OBS"]);
		
		$('#AJUDACUSTO_CODIGO___'+i).empty();
		var ds_CadastroDisciplina_TipoCusto = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoCusto", null, null, null);
					
		$('#AJUDACUSTO_CODIGO___'+i).append('<option value="" >SELECIONE</option>');
		if (ds_CadastroDisciplina_TipoCusto.values.length > 0) {
			$.each(ds_CadastroDisciplina_TipoCusto.values, function(key, value) {
				if(value.AJUDACUSTO_TIPOCUSTO == AJUDACUSTO_CODIGO){
					$('#AJUDACUSTO_CODIGO___'+i).append('<option value="' + value.AJUDACUSTO_TIPOCUSTO + '" selected >' + value.AJUDACUSTO_DESCTIPOCUSTO + '</option>');
				} else {
					$('#AJUDACUSTO_CODIGO___'+i).append('<option value="' + value.AJUDACUSTO_TIPOCUSTO + '">' + value.AJUDACUSTO_DESCTIPOCUSTO + '</option>');
				}
			});
		}
		
		$('#AJUDACUSTO_DATAINICIAL___'+i).datetimepicker({ 
			pickDate: true, 
			pickTime: false,
			language: 'pt-BR'
		});	
		
		$('#AJUDACUSTO_DATAFINAL___'+i).datetimepicker({ 
			pickDate: true, 
			pickTime: false,
			language: 'pt-BR'
		});	
		
		document.getElementById("removeAjudaCusto___"+i).disabled = true;
		
	}
	
	
	/******* PREENCHE PAI E FILHO "CADEIA PRODUTIVA" DA DISCIPLINA *******/
	var cs_CADEIADISCIPLINA_CODDISCIPLINA = DatasetFactory.createConstraint("CADEIADISCIPLINA_CODDISCIPLINA", coddisc, coddisc, ConstraintType.MUST);
	var constraintsDisciplina = new Array(cs_CADEIADISCIPLINA_CODDISCIPLINA);
	var ds_CadastroDisciplina_CadeiaProdutiva = DatasetFactory.getDataset("ds_CadastroDisciplina_CadeiaProdutiva", null, constraintsDisciplina, null);	
	
	var CADEIADISCIPLINA_CODIGO = 0;
	
	rowIndex.cadeiaProdutiva = 0;
	
	for (var i = 0; i < ds_CadastroDisciplina_CadeiaProdutiva.values.length; i++){
		wdkAddChild('cadeiaProdutiva');
	}
	
	
	for(i=1; i <= ds_CadastroDisciplina_CadeiaProdutiva.values.length; i++){
		var CADEIADISCIPLINA_CODIGO = ds_CadastroDisciplina_CadeiaProdutiva.values[i-1]["CADEIADISCIPLINA_CODIGO"];
		
		$('#CADEIADISCIPLINA_ID___'+i).val(ds_CadastroDisciplina_CadeiaProdutiva.values[i-1]["CADEIADISCIPLINA_ID"]);
		$('#CADEIADISCIPLINA_OBSERVACAO___'+i).val(ds_CadastroDisciplina_CadeiaProdutiva.values[i-1]["CADEIADISCIPLINA_OBSERVACAO"]);
		
		$('#CADEIADISCIPLINA_CODIGO___'+i).empty();
		var ds_CadastroDisciplina_TipoCusto = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoCusto", null, null, null);
					
		var ds_CadastroDisciplina_TipoCadeiaProdutiva = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoCadeiaProdutiva", null, null, null);
		
		$('#CADEIADISCIPLINA_CODIGO___'+i).append('<option value="" >SELECIONE</option>');
		if (ds_CadastroDisciplina_TipoCadeiaProdutiva.values.length > 0) {
			$.each(ds_CadastroDisciplina_TipoCadeiaProdutiva.values, function(key, value) {
				if(value.CADEIAPRODUTIVA_CODIGO == CADEIADISCIPLINA_CODIGO){
					$('#CADEIADISCIPLINA_CODIGO___'+i).append('<option value="' + value.CADEIAPRODUTIVA_CODIGO + '" selected >' + value.CADEIAPRODUTIVA_DESCRICAO + '</option>');
				} else {
					$('#CADEIADISCIPLINA_CODIGO___'+i).append('<option value="' + value.CADEIAPRODUTIVA_CODIGO + '">' + value.CADEIAPRODUTIVA_DESCRICAO + '</option>');
				}
			});
		}
		
		if(ds_CadastroDisciplina_CadeiaProdutiva.values[i-1]["CADEIADISCIPLINA_ATIVO"] == 1){
			$('#CADEIADISCIPLINA_ATIVO___'+i).attr("checked", "checked");
		}
		
		document.getElementById("removeCadeiaProdutiva___"+i).disabled = true;
		
	}
}

function limpaTabelaFiltro(){
	for(i=0; i<=30000; i++){
		$('#body-table').remove();
		$('#LINHA').remove();
	}
}

function inicio(){
	$('#SDISCIPLINA_CODTIPOCURSO').ready(
			function(){
				var ds_CadastroDisciplina_Contexto = DatasetFactory.getDataset("ds_CadastroDisciplina_Contexto", null, null, null);
				
				$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroDisciplina_Contexto.values.length > 0) {
					$.each(ds_CadastroDisciplina_Contexto.values, function(key, value) {
						if(value.SDISCIPLINA_CODTIPOCURSO == $('#SDISCIPLINA_CODTIPOCURSO').val()){
							$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '" selected >' + value.STIPOCURSO_NOME + '</option>');
						} else {
							$('#SDISCIPLINA_CODTIPOCURSO').append('<option value="' + value.SDISCIPLINA_CODTIPOCURSO + '">' + value.STIPOCURSO_NOME + '</option>');
						}
					});
				}
			}
	);
	
	$('#SDISCIPLINA_TIPOAULA').ready(
			function(){
				var ds_CadastroDisciplina_TipoAula = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoAula", null, null, null);
				
				$('#SDISCIPLINA_TIPOAULA').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroDisciplina_TipoAula.values.length > 0) {
					$.each(ds_CadastroDisciplina_TipoAula.values, function(key, value) {
						if(value.SDISCIPLINA_TIPOAULA == $('#SDISCIPLINA_TIPOAULA').val()){
							$('#SDISCIPLINA_TIPOAULA').append('<option value="' + value.SDISCIPLINA_TIPOAULA + '" selected >' + value.SDISCIPLINA_DESCTIPOAULA + '</option>');
						} else {
							$('#SDISCIPLINA_TIPOAULA').append('<option value="' + value.SDISCIPLINA_TIPOAULA + '">' + value.SDISCIPLINA_DESCTIPOAULA + '</option>');
						}
					});
				}
			}
	);
	
	$('#SDISCIPLINA_TIPONOTA').ready(
			function(){
				var ds_CadastroDisciplina_TipoNota = DatasetFactory.getDataset("ds_CadastroDisciplina_TipoNota", null, null, null);
				
				$('#SDISCIPLINA_TIPONOTA').append('<option value="" >SELECIONE</option>');
				if (ds_CadastroDisciplina_TipoNota.values.length > 0) {
					$.each(ds_CadastroDisciplina_TipoNota.values, function(key, value) {
						if(value.SDISCIPLINA_TIPONOTA == $('#SDISCIPLINA_TIPONOTA').val()){
							$('#SDISCIPLINA_TIPONOTA').append('<option value="' + value.SDISCIPLINA_TIPONOTA + '" selected >' + value.SDISCIPLINA_DESCTIPONOTA + '</option>');
						} else {
							$('#SDISCIPLINA_TIPONOTA').append('<option value="' + value.SDISCIPLINA_TIPONOTA + '">' + value.SDISCIPLINA_DESCTIPONOTA + '</option>');
						}
					});
				}
			}
	);
}

function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}

function validaCamposObrigatorios() {
	// VALIDA CAMPO NÃO PREENCHIDO "Contexto" NA ABA DE Disciplina
	if($('#SDISCIPLINA_CODTIPOCURSO').val() == '' || $('#SDISCIPLINA_CODTIPOCURSO').val() == null){
		MensagemAlerta('Atenção!','Preencha o campo "Contexto"! na aba Disciplina');
		return false;
	} 
	
	// VALIDA CAMPO NÃO PREENCHIDO "Nome Reduzido" NA ABA DE Disciplina
	if($('#SDISCIPLINA_NOMEREDUZIDO').val() == '' || $('#SDISCIPLINA_NOMEREDUZIDO').val() == null){
		MensagemAlerta('Atenção!','Preencha o campo "Nome Reduzido" na aba Disciplina!');
		return false;
	}
	
	// VALIDA CAMPO NÃO PREENCHIDO "Descrição" NA ABA DE Disciplina
	if($('#SDISCIPLINA_NOME').val() == '' || $('#SDISCIPLINA_NOME').val() == null){
		MensagemAlerta('Atenção!','Preencha o campo "Descrição" na aba Disciplina!');
		return false;
	}
	
	// VALIDA CAMPO NÃO PREENCHIDO "Segundo Nome" NA ABA DE Disciplina
	if($('#SDISCIPLINA_COMPLEMENTO').val() == '' || $('#SDISCIPLINA_COMPLEMENTO').val() == null){
		MensagemAlerta('Atenção!','Preencha o campo "Segundo Nome" na aba Disciplina!');
		return false;
	}
	
	// VALIDA CAMPO NÃO PREENCHIDO "CH Total" NA ABA DE Disciplina
	if($('#SDISCIPLINA_CH').val() == '' || $('#SDISCIPLINA_CH').val() == null){
		MensagemAlerta('Atenção!','Preencha o campo "CH Total" na aba Disciplina!');
		return false;
	} 
	
	// VALIDA CAMPOS NÃO PREENCHIDOS NA ABA Valor Básico por Participante
	if ($("input[id^='VBPARTDISC_ID___']")) {
		var validacao = 0;
		
		$("input[id^='VBPARTDISC_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			
			if($('#VBPARTDISC_ID___'+index[4]).val() == '' || $('#VBPARTDISC_ID___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "id" na aba Valor Básico por Participante!');
				validacao = 1;
				return false;
			}
			
			if($('#VBPARTDISC_VIGENTEAPARTIR___'+index[4]).val() == '' || $('#VBPARTDISC_VIGENTEAPARTIR___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "Vigente a partir de" na aba Valor Básico por Participante!');
				validacao = 1;
				return false;
			}
			
			if($('#VBPARTDISC_VALORBASICO___'+index[4]).val() == '' || $('#VBPARTDISC_VALORBASICO___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o "campo" Valor Básico por Participante!');
				validacao = 1;
				return false;
			}
			
		});
		if (validacao > 0){
			return false;    			
		}
	}
	
	// VALIDA CAMPOS NÃO PREENCHIDOS NA ABA Ajuda de Custo
	if ($("input[id^='AJUDACUSTO_ID___']")) {
		var validacao = 0;
		
		$("input[id^='AJUDACUSTO_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			
			if($('#AJUDACUSTO_ID___'+index[4]).val() == '' || $('#AJUDACUSTO_ID___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "id" na aba Ajuda de Custo!');
				validacao = 1;
				return false;
			}
			
			if($('#AJUDACUSTO_CODIGO___'+index[4]).val() == '' || $('#AJUDACUSTO_CODIGO___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "Tipo de Ajuda de Custo" na aba Ajuda de Custo!');
				validacao = 1;
				return false;
			}
			
			if($('#AJUDACUSTO_VALOR___'+index[4]).val() == '' || $('#AJUDACUSTO_VALOR___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "Valor" na aba Ajuda de Custo!');
				validacao = 1;
				return false;
			}
			
			if($('#AJUDACUSTO_DATAINICIAL___'+index[4]).val() == '' || $('#AJUDACUSTO_DATAINICIAL___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "Data Inicial" na aba Ajuda de Custo!');
				validacao = 1;
				return false;
			}
			
		});
		if (validacao > 0){
			return false;    			
		}
	}
	
	// VALIDA CAMPOS NÃO PREENCHIDOS NA ABA Cadeia Produtiva
	if ($("input[id^='CADEIADISCIPLINA_ID___']")) {
		var validacao = 0;
		
		$("input[id^='CADEIADISCIPLINA_ID___']").each(function(key, value){
			var id = $(this).prop("id"), index = id.split('_');
			
			if($('#CADEIADISCIPLINA_ID___'+index[4]).val() == '' || $('#CADEIADISCIPLINA_ID___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "id" na aba Cadeia Produtiva!');
				validacao = 1;
				return false;
			}
			
			if($('#CADEIADISCIPLINA_CODIGO___'+index[4]).val() == '' || $('#CADEIADISCIPLINA_CODIGO___'+index[4]).val() == null){
				MensagemAlerta('Atenção!','Preencha o campo "Cadeia Produtiva" na aba Cadeia Produtiva!');
				validacao = 1;
				return false;
			}
			
		});
		if (validacao > 0){
			return false;    			
		}
	}
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
};

function persisteDados(tabelaRM, fieldsXml, tela){
	
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




/* ===============  IMPLEMENTAÇÃO DE PAI E FILHO NO WIDGET  =============== */
var detail;
var newId = 0;
var rowIndex = {};
var element;
function WdksetNewId(lastRowIndex) {
	var id = parseInt(lastRowIndex);
	if (isNaN(id)) {
		rowIndex = JSON.parse(lastRowIndex)
	} else {
		newId = id
	}
}
function wdkLoadChild(tablename, skipLoadZoom) {
	var form = $("#Adhocform")[0];
	if (!form) {
		return
	}
	var countLine = $("#tbatividades").find(".bpm-mobile-trash-column").length;
	if (countLine) {
		for (var i = 1; i < countLine; i++) {
			FLUIGC.calendar("#dtprazoativ___" + i, {
				minDate : new Date()
			})
		}
	}
	WdkSearchElementsinPage(form, tablename);
	if ($("td.bpm-mobile-column").length) {
		$(".bpm-mobile-expand").last().click()
	}
	if (skipLoadZoom != false && typeof loadZoomTablename === "function") {
		loadZoomTablename(tablename)
	}
	if (skipLoadZoom != false && typeof loadRicheditorTablename === "function") {
		loadRicheditorTablename(tablename)
	}
}
function wdkAddChild(tablename, skipLoadZoom) {
	var id = ++rowIndex[tablename];
	var form = document.getElementsByTagName("form")[2];
	if (isNaN(id)) {
		newId++
	} else {
		newId = id
	}
	WdkSearchElementsinPage(form, tablename);
	if (detail != null) {
		var nd = detail.cloneNode(true);
		WdkchangeNames(nd);
		if (nd.tagName == "TR") {
			if (navigator.userAgent.indexOf("MSIE 9") != -1) {
				nd.style.display = "block"
			} else {
				nd.style.display = "table-row"
			}
		} else {
			nd.style.display = "inline"
		}
		if (nd.id) {
			nd.id = nd.id + "___" + newId
		}
		if (detail.parentNode != null) {
			detail.parentNode.appendChild(nd)
		} else {
			var parentNode = document.getElementsByTagName(tablename)[0];
			if (parentNode != null) {
				parentNode.appendChild(nd)
			} else {
				detail.appendChild(nd)
			}
		}
	}
	if ($("td.bpm-mobile-column").length > 0) {
		$(".bpm-mobile-expand").last().click()
	}
	if (skipLoadZoom != false && typeof loadZoomTablename === "function") {
		loadZoomTablename(tablename)
	}
	if (skipLoadZoom != false && typeof loadRicheditorTablename === "function") {
		loadRicheditorTablename(tablename)
	}
	return newId
}
function WdkSearchElementsinPage(e, tablename) {
	if (detail != null && detail.getAttribute("detailname") != tablename) {
		detail = null
	}
	if (detail == null) {
		var y = e.childNodes;
		for (var i = 0; i < y.length; i++) {
			try {
				var table = y[i].getAttribute("detail");
				var dname = y[i].getAttribute("detailname");
				if (table != null && dname == tablename) {
					detail = y[i];
					break
				} else {
					WdkSearchElementsinPage(y[i], tablename)
				}
			} catch (e) {
			}
		}
	}
}
function WdkchangeNames(e) {
	var nodes = e.childNodes;
	var name;
	var value;
	for (var i = 0; i < nodes.length; i++) {
		try {
			if (nodes[i].getAttribute("name") != null) {
				if (nodes[i].getAttribute("name").indexOf("___") == -1) {
					element = nodes[i].getAttribute("name");
					value = nodes[i].getAttribute("value");
					name = element
				} else {
					if (element != nodes[i].getAttribute("name").substring(0,
							nodes[i].getAttribute("name").indexOf("___"))) {
						element = nodes[i].getAttribute("name").substring(0,
								nodes[i].getAttribute("name").indexOf("___"));
						name = element
					} else {
						name = nodes[i].getAttribute("name");
						value = nodes[i].getAttribute("value")
					}
				}
			}
			if (name == null) {
				if (nodes[i].getAttribute("id") != null) {
					if (nodes[i].getAttribute("id").indexOf("___") == -1) {
						element = nodes[i].getAttribute("id");
						value = nodes[i].getAttribute("value");
						name = element
					} else {
						if (element != nodes[i].getAttribute("id").substring(0,
								nodes[i].getAttribute("id").indexOf("___"))) {
							element = nodes[i].getAttribute("id").substring(0,
									nodes[i].getAttribute("id").indexOf("___"));
							name = element
						} else {
							name = nodes[i].getAttribute("id")
						}
					}
				}
			}
			if (name != null) {
				var ignoreReference = false;
				if (nodes[i].getAttribute("type") != null
						&& (nodes[i].getAttribute("type") == "radio" || nodes[i]
								.getAttribute("type") == "label")) {
					if (name.indexOf("___") != -1) {
						ignoreReference = true
					}
				}
				if (!ignoreReference && nodes[i].tagName != null) {
					var tn = nodes[i].tagName.toLowerCase();
					if (tn == "div" || tn == "fieldset" || tn == "label") {
						if (name.indexOf("___") != -1) {
							ignoreReference = true
						}
					}
				}
				if (!ignoreReference) {
					name = name + "___" + newId;
					nodes[i].setAttribute("name", name);
					nodes[i].setAttribute("id", name)
				} else {
					if (nodes[i].getAttribute("name") != null) {
						var intReference = nodes[i].getAttribute("name")
								.indexOf("___");
						intReference = intReference + 3;
						var newReference = nodes[i].getAttribute("name")
								.substring(0, intReference);
						newReference = newReference + newId;
						nodes[i].setAttribute("name", newReference);
						nodes[i].setAttribute("id", newReference)
					} else {
						if (nodes[i].getAttribute("id") != null) {
							var intReference = nodes[i].getAttribute("id")
									.indexOf("___");
							intReference = intReference + 3;
							var newReference = nodes[i].getAttribute("id")
									.substring(0, intReference);
							newReference = newReference + newId;
							nodes[i].setAttribute("name", newReference);
							nodes[i].setAttribute("id", newReference)
						}
					}
				}
				var type = nodes[i].getAttribute("type");
				if (type != null) {
					if (value != null && type != "text") {
						nodes[i].setAttribute("value", value);
						nodes[i].value = value
					} else {
						if (type != "checkbox") {
							nodes[i].setAttribute("value", "");
							nodes[i].value = ""
						}
					}
				} else {
					nodes[i].setAttribute("value", "");
					nodes[i].value = ""
				}
			}
			WdkchangeNames(nodes[i])
		} catch (e) {
		}
	}
}
function fnWdkRemoveChild(element) {
	var form, row = null;
	var hasRow, hasForm = false;
	while (element != null) {
		if (element.id != null) {
			if (!hasRow && element.nodeName.toUpperCase() == "TR") {
				row = element;
				hasRow = true
			} else {
				if (!hasForm && element.nodeName.toUpperCase() == "FORM") {
					form = element;
					hasForm = true
				}
			}
		}
		element = element.parentNode
	}
	var arrayInput = $(row).find("input");
	$.each(arrayInput, function(index, input) {
		if ($(input).prop("readonly") || $(input).prop("disabled")) {
			$
					.each($(form).find("input[type=hidden]"),
							function(i, inputHidden) {
								var idInput = $(input).attr("name");
								var idInputHidden = "_"
										+ $(inputHidden).attr("name");
								if (idInput
										&& idInputHidden.valueOf() == idInput
												.valueOf()) {
									$(inputHidden).remove()
								}
							})
		}
	});
	$(row).remove()
}
function restoreCachedRows(formfields, isClearTables) {
	if (typeof isClearTables === "undefined") {
		isClearTables = false
	}
	var organized = {};
	$.each(formfields, function(index, value) {
		if (index.indexOf("___") != -1) {
			var fieldName = index.substring(0, index.lastIndexOf("___"));
			var fieldIndex = index.substring(index.lastIndexOf("___") + 3);
			var tablename = $("[name=" + fieldName + "]").closest(
					"table[tablename]").attr("tablename");
			if (tablename == undefined) {
				return
			}
			if (organized[tablename] == undefined) {
				organized[tablename] = {}
			}
			if (organized[tablename][fieldIndex] == undefined) {
				organized[tablename][fieldIndex] = {}
			}
			organized[tablename][fieldIndex][fieldName] = value
		}
	});
	if (isClearTables) {
		$("table[tablename] tbody tr:visible").remove()
	}
	$.each(organized, function(tablename, rows) {
		rowIndex[tablename] = 0;
		$.each(rows, function(tempId, fields) {
			var rowId = wdkAddChild(tablename, false);
			$.each(fields, function(fieldName, fieldValue) {
				var type = $("#" + fieldName + "___" + rowId).prop("type")
						.toLowerCase();
				if (type == "zoom") {
					var values = fieldValue.split(String.fromCharCode(24));
					for (i = 0; i < values.length; i++) {
						$("#" + fieldName).append(
								'<option selected value="' + values[i] + '">'
										+ values[i] + "</option>")
					}
				} else {
					$("#" + fieldName + "___" + rowId).val(fieldValue)
				}
			})
		});
		loadZoomTablename(tablename);
		loadRichEditorTablename(tablename)
	})
}
function clearTables(tablename) {
	$("[tablename=" + tablename + "] tbody tr:visible").remove()
}
function renderRowsTableDetail(formfields, isClearTables) {
	var organized = {};
	var isClearCache = false;
	$
			.each(
					formfields,
					function(i, fields) {
						isClearCache = false;
						$
								.each(
										fields,
										function(index, value) {
											if (index.indexOf("___") != -1) {
												var fieldName = index
														.substring(
																0,
																index
																		.lastIndexOf("___"));
												var fieldIndex = index
														.substring(index
																.lastIndexOf("___") + 3);
												var tablename = $(
														"[name=" + fieldName
																+ "]").closest(
														"table[tablename]")
														.attr("tablename");
												if (tablename == undefined) {
													return
												}
												if (organized[tablename] == undefined) {
													organized[tablename] = {}
												}
												if (organized[tablename][fieldIndex] == undefined) {
													organized[tablename][fieldIndex] = {}
												}
												if (organized[tablename][fieldIndex][fieldName] == undefined) {
													organized[tablename][fieldIndex][fieldName] = value
												} else {
													organized[tablename][fieldIndex][fieldName] = organized[tablename][fieldIndex][fieldName]
															+ ";multiSelect;"
															+ value
												}
											}
											if (isClearTables && !isClearCache) {
												clearTables(tablename);
												isClearCache = true
											}
										})
					});
	$.each(organized, function(tablename, rows) {
		rowIndex[tablename] = 0;
		$.each(rows, function(tempId, fields) {
			var rowId = wdkAddChild(tablename, false);
			$.each(fields, function(fieldName, fieldValue) {
				var $field = $("#" + fieldName + "___" + rowId);
				var type = $field.prop("type").toLowerCase();
				if (type == "zoom") {
					var values = fieldValue.split(String.fromCharCode(24));
					for (i = 0; i < values.length; i++) {
						$("#" + fieldName).append(
								'<option selected value="' + values[i] + '">'
										+ values[i] + "</option>")
					}
				} else {
					var values = fieldValue.split(";multiSelect;");
					if (values.length > 1) {
						var value = "[";
						for (i = 0; i < values.length; i++) {
							value = value + '"' + values[i] + '",'
						}
						fieldValue = value.substr(0, value.length - 1) + "]";
						$field.val(eval(fieldValue))
					} else {
						if (type == "checkbox") {
							$field.prop("checked", true)
						} else {
							if (type == "radio") {
								$(
										"#" + fieldName + "___" + rowId
												+ "[value='" + fieldValue
												+ "']").prop("checked", true)
							} else {
								$field.val(fieldValue)
							}
						}
					}
				}
			})
		});
		loadZoomTablename(tablename);
		loadRichEditorTablename(tablename)
	})
};

function mascaraValorVirgula(valor){
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{10})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{7})$/,"$1.$2");
    //valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
	valor = valor.toString().replace(/(\d)(\d{4})$/,"$1,$2");
    return valor                    
}

function somenteNumeroDecimal(objTextBox, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    if (e.which) {
        var whichCode = e.which;
    } else {
        var whichCode = e.keyCode;
    }
    if ((whichCode == 13) || (whichCode == 0) || (whichCode == 8)) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for (i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != ",")) break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = '';
    if (len == 1) objTextBox.value = '0' + "," + '0' + aux;
    if (len == 2) objTextBox.value = '0' + "," + aux;
    if (len > 2 && len < 13) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += ".";
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            objTextBox.value += aux2.charAt(i);
        objTextBox.value += "," + aux.substr(len - 2, len);
    }
    return false;
}

function currencyFormat(fld, milSep, decSep, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter
	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
	len = fld.value.length;
	for(i = 0; i < len; i++)
	if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
	if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) fld.value = '';
	if (len == 1) fld.value = '0'+ decSep + '0' + aux;
	if (len == 2) fld.value = '0'+ decSep + aux;
	if (len > 2) {
	aux2 = '';
	for (j = 0, i = len - 3; i >= 0; i--) {
	if (j == 3) {
	aux2 += milSep;
	j = 0;
	}
	aux2 += aux.charAt(i);
	j++;
	}
	fld.value = '';
	len2 = aux2.length;
	for (i = len2 - 1; i >= 0; i--)
	fld.value += aux2.charAt(i);
	fld.value += decSep + aux.substr(len - 3, len);
	}
	return false;
	}