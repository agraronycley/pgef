var dataset = "";

$(document).ready( function () {
	$('#labelSequencia').on("click", function() {ReMontaTabela(dadosTabela, "sequencia")});
	$('#labelEvento').on("click", function() {ReMontaTabela(dadosTabela, "evento") });
	$('#labelProdutor').on("click", function() {ReMontaTabela(dadosTabela, "produtor") });	
	$('#labelPropriedade').on("click", function() {ReMontaTabela(dadosTabela, "propriedade") });
	$('#labelMunicipio').on("click", function() {ReMontaTabela(dadosTabela, "municipio") });
	$('#labelProjeto').on("click", function() {ReMontaTabela(dadosTabela, "projeto") });
	$('#labelCadeiaProdutiva').on("click", function() {ReMontaTabela(dadosTabela, "cadeiaProdutiva") });
	$('#labelDataAgendamento').on("click", function() {ReMontaTabela(dadosTabela, "dataAgendamento") });
	$('#labelDataVisita').on("click", function() {ReMontaTabela(dadosTabela, "dataVisita") });
	$('#labelStatus').on("click", function() {ReMontaTabela(dadosTabela, "status") });
	$('#labelProblema').on("click", function() {ReMontaTabela(dadosTabela, "problema") });
	$('#labelProcesso').on("click", function() {ReMontaTabela(dadosTabela, "processo") });
})

function ReMontaTabela(dataset, ordenacao){
//	window.loading.show();
	
	
	setTimeout( () => {
		var html = "";
		var tabelaCorpo = $("#tabela tbody");
		var arrFiltro = new Array();
		
		$("#tabela tbody tr").remove();
		if(dadosTabela != '' && dadosTabela.length > 0){
			
			switch(ordenacao) {
				case "sequencia":
					dadosTabela.sort(function(a, b) {
					    if(a.SEQUENCIA === "" || a.SEQUENCIA === null) return 1;
					    if(b.SEQUENCIA === "" || b.SEQUENCIA === null) return -1;
					    if(a.SEQUENCIA === b.SEQUENCIA) return 0;
					    return a.SEQUENCIA < b.SEQUENCIA ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelSequencia').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconSequencia').show();
					break;
				case "evento":
					dadosTabela.sort(function(a, b) {
					    if(a.EVENTO === "" || a.EVENTO === null) return 1;
					    if(b.EVENTO === "" || b.EVENTO === null) return -1;
					    if(a.EVENTO === b.EVENTO) return 0;
					    return a.EVENTO < b.EVENTO ? -1 : 1;
					});
					
					dataset = dadosTabela;	
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelEvento').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconEvento').show();
					break;
			
				case "produtor":
					dadosTabela.sort(function(a, b) {
					    if(a.NOME_PRODUTOR === "" || a.NOME_PRODUTOR === null) return 1;
					    if(b.NOME_PRODUTOR === "" || b.NOME_PRODUTOR === null) return -1;
					    if(a.NOME_PRODUTOR === b.NOME_PRODUTOR) return 0;
					    return a.NOME_PRODUTOR < b.NOME_PRODUTOR ? -1 : 1;
					});
					
					dataset = dadosTabela;	
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelProdutor').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconProdutor').show();
					break;
					
				case "propriedade":
					dadosTabela.sort(function(a, b) {
					    if(a.NOME_PROPRIEDADE === "" || a.NOME_PROPRIEDADE === null) return 1;
					    if(b.NOME_PROPRIEDADE === "" || b.NOME_PROPRIEDADE === null) return -1;
					    if(a.NOME_PROPRIEDADE === b.NOME_PROPRIEDADE) return 0;
					    return a.NOME_PROPRIEDADE < b.NOME_PROPRIEDADE ? -1 : 1;
					});
					
					dataset = dadosTabela;					
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelPropriedade').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconPropriedade').show();
					break;
				case "municipio":
					dadosTabela.sort(function(a, b) {
					    if(a.MUNICIPIO === "" || a.MUNICIPIO === null) return 1;
					    if(b.MUNICIPIO === "" || b.MUNICIPIO === null) return -1;
					    if(a.MUNICIPIO === b.MUNICIPIO) return 0;
					    return a.MUNICIPIO < b.MUNICIPIO ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelMunicipio').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconMunicipio').show();
					break;
				case "projeto":
					dadosTabela.sort(function(a, b) {
					    if(a.PROJETO_PROGRAMA_PROPRIEDADE === "" || a.PROJETO_PROGRAMA_PROPRIEDADE === null) return 1;
					    if(b.PROJETO_PROGRAMA_PROPRIEDADE === "" || b.PROJETO_PROGRAMA_PROPRIEDADE === null) return -1;
					    if(a.PROJETO_PROGRAMA_PROPRIEDADE === b.PROJETO_PROGRAMA_PROPRIEDADE) return 0;
					    return a.PROJETO_PROGRAMA_PROPRIEDADE < b.PROJETO_PROGRAMA_PROPRIEDADE ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelProjeto').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconProjeto').show();
					break;
				case "cadeiaProdutiva":
					dadosTabela.sort(function(a, b) {
					    if(a.CADEIAPRODUTIVA_PROPRIEDADE === "" || a.CADEIAPRODUTIVA_PROPRIEDADE === null) return 1;
					    if(b.CADEIAPRODUTIVA_PROPRIEDADE === "" || b.CADEIAPRODUTIVA_PROPRIEDADE === null) return -1;
					    if(a.CADEIAPRODUTIVA_PROPRIEDADE === b.CADEIAPRODUTIVA_PROPRIEDADE) return 0;
					    return a.CADEIAPRODUTIVA_PROPRIEDADE < b.CADEIAPRODUTIVA_PROPRIEDADE ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelCadeiaProdutiva').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconCadeiaProdutiva').show();
					break;
				case "dataAgendamento":
					dadosTabela.sort(function(a, b) {
					    if(a.DATA_AGENDAMENTO === "" || a.DATA_AGENDAMENTO === null) return 1;
					    if(b.DATA_AGENDAMENTO === "" || b.DATA_AGENDAMENTO === null) return -1;
					    if(a.DATA_AGENDAMENTO === b.DATA_AGENDAMENTO) return 0;
					    return a.DATA_AGENDAMENTO < b.DATA_AGENDAMENTO ? -1 : 1;
					});
					
					dataset = dadosTabela;					
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelDataAgendamento').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconDataAgendamento').show();
					break;
				case "dataVisita":
					dadosTabela.sort(function(a, b) {
					    if(a.DATA_REAL_VISITA === "" || a.DATA_REAL_VISITA === null) return 1;
					    if(b.DATA_REAL_VISITA === "" || b.DATA_REAL_VISITA === null) return -1;
					    if(a.DATA_REAL_VISITA === b.DATA_REAL_VISITA) return 0;
					    return a.DATA_REAL_VISITA < b.DATA_REAL_VISITA ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelDataVisita').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconDataVisita').show();
					break;
				case "status":
					dadosTabela.sort(function(a, b) {
					    if(a.PROCESSO_STATUS === "" || a.PROCESSO_STATUS === null) return 1;
					    if(b.PROCESSO_STATUS === "" || b.PROCESSO_STATUS === null) return -1;
					    if(a.PROCESSO_STATUS === b.PROCESSO_STATUS) return 0;
					    return a.PROCESSO_STATUS < b.PROCESSO_STATUS ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelStatus').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconStatus').show();
					break;
				case "problema":
					dadosTabela.sort(function(a, b) {
					    if(a.PROBLEMA === "" || a.PROBLEMA === null) return 1;
					    if(b.PROBLEMA === "" || b.PROBLEMA === null) return -1;
					    if(a.PROBLEMA === b.PROBLEMA) return 0;
					    return a.PROBLEMA < b.PROBLEMA ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelProblema').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconProblema').show();
					break;
				case "processo":
					dadosTabela.sort(function(a, b) {
					    if(a.PROCESSO === "" || a.PROCESSO === null) return 1;
					    if(b.PROCESSO === "" || b.PROCESSO === null) return -1;
					    if(a.PROCESSO === b.PROCESSO) return 0;
					    return a.PROCESSO < b.PROCESSO ? -1 : 1;
					});
					
					dataset = dadosTabela;
					
					$('.table > thead > tr > th').removeClass('active');
					$('#labelProcesso').addClass('active');
					$('.fa-caret-down').hide();
					$('#iconProcesso').show();
					break;
					
					
				default:
					dadosTabela.sort(function(a, b) {
					    if(a.DATA_AGENDAMENTO === "" || a.DATA_AGENDAMENTO === null) return 1;
					    if(b.DATA_AGENDAMENTO === "" || b.DATA_AGENDAMENTO === null) return -1;
					    if(a.DATA_AGENDAMENTO === b.DATA_AGENDAMENTO) return 0;
					    return a.DATA_AGENDAMENTO < b.DATA_AGENDAMENTO ? -1 : 1;
					});
					
					dataset = dadosTabela;
			}
			//dataset = _.orderBy(dataset.values, ['DATA_AGENDAMENTO', 'DATA_REAL_VISITA'], ['asc', 'asc']);
			
			
			for(var i = 0; i < dataset.length; i++){
				if(arrFiltro.indexOf(dataset[i].PROCESSO) === -1 ){
					arrFiltro.push(dataset[i].PROCESSO);
					console.log('Processo Passou -> ' + arrFiltro[i]);
						
						var link = top.WCMAPI.serverURL+'/portal/p/Faeg/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dataset[i]['PROCESSO'];
						var disabled = ((dataset[i]['PROCESSO_STATUS'] == 'Finalizado' || dataset[i]['PROCESSO_STATUS'] == 'Realizado')? '' : 'disabled');
						var identificador = dataset[i]['CODIGO_DA_PROPRIEDADE'] +"_"+ new Date().getTime().toString();
						html = "<tr id='"+identificador+"'>";
						//html += '<td><button class="btn btn-default" title="Visualizar Informações" id="btnVisualizarEvento" '+disabled+'><span class="fluigicon fluigicon-picture fluigicon-md" id="'+dataset[i]['PROCESSO']+'"></span></button></td>';
						
						html += '<td>';
						html += '<button type="button" name="btnVisualizarEvento" id="btnVisualizarEvento" class="btn btn-default" '+ disabled +' data-button-view-event="${instanceId}" title="Visualizar Informações" data-loading-text="<i class=\'fluigicon fluigicon-tint\'></i> Aguarde...">';
						html += '<span class="fluigicon fluigicon-picture fluigicon-md" id="'+ dataset[i]['PROCESSO'] +'"></span>';
						html += '</button>';
						html += '</td>';
						
						html += "<td>"+dataset[i]['SEQUENCIA'] +"</td>";
						html += "<td>"+dataset[i]['EVENTO'] +"</td>";
						html += "<td>"+dataset[i]['NOME_PRODUTOR'] +"</td>";
						html += "<td>"+dataset[i]['NOME_PROPRIEDADE'] +"</td>";
						html += "<td>"+dataset[i]['MUNICIPIO'] +"</td>";
						html += "<td>"+dataset[i]['PROJETO_PROGRAMA_PROPRIEDADE'] +"</td>";
						html += "<td>"+dataset[i]['CADEIAPRODUTIVA_PROPRIEDADE'] +"</td>";
						html += "<td>"+dataDDMMYYYY(dataset[i]['DATA_AGENDAMENTO']) +"</td>";
						html += "<td>"+dataDDMMYYYY(dataset[i]['DATA_REAL_VISITA']) +"</td>";
						html += "<td>"+dataset[i]['PROCESSO_STATUS']+"</td>";
						html += "<td>"+dataset[i]['PROBLEMA']+"</td>";
						html += "<td><a href='"+link+"' target='_blank'>" + dataset[i]['PROCESSO']+ "</a></td>";
						html += "</tr>";
						
						tabelaCorpo.append(html);
						BtnVisualizarEvento();
					
				}
				console.log('MontaTabela() arrFilro.length -> ' + arrFiltro.length);
				console.log('MontaTabela() dataset.length -> ' + dataset.length);
				
			}// end for
		}
		
//		window.loading.hide();
	}, 200);
}