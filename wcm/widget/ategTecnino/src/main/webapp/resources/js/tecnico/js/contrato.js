var aTiposContrato = new Array();

$(document).ready(function(){
	
	TiposContrato()
	
	$("#btnAdicionarContrato").on('click', function(){
		AdicionarContato()
	})
})


function TiposContrato(){
	aTiposContrato = new Array();
	var constraintRm_RMSPRJ5579520Server1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
	var datasetRm_RMSPRJ5579520Server = DatasetFactory.getDataset('rm_RMSPRJ5579520Server', null, new Array(constraintRm_RMSPRJ5579520Server1), null);
	if(datasetRm_RMSPRJ5579520Server.values.length > 0){
		for(var i = 0; i < datasetRm_RMSPRJ5579520Server.values.length; i++){
			aTiposContrato.push(new Array(
					datasetRm_RMSPRJ5579520Server.values[i]["CODIGO"],
					datasetRm_RMSPRJ5579520Server.values[i]["DESCRICAO"]
			));
		}
	}
}

function PopulaDadosContrato(){

	var tabelaVinculo = $("#tabelaVinculo tbody tr");
	var tabelaCorpo = $("#tabelaContrato tbody");
	$("#tabelaContrato tbody tr").remove();
	for(var x = 0; x < tabelaVinculo.length; x++){

		var codigoFCFO = tabelaVinculo[x].childNodes["0"].textContent

		var c1 = DatasetFactory.createConstraint('ENTIDADE', codigoFCFO, codigoFCFO, ConstraintType.MUST);
		var dsContrato = DatasetFactory.getDataset('rm_RMSPRJ4236032Server_consulta_contrato', null, new Array(c1), null);

		if(dsContrato.values.length > 0){
			for(var i = 0; i < dsContrato.values.length; i++){
				html = "<tr id='"+i+"'>";
				html += "<td>" +dsContrato.values[i].ENTIDADE+ "</td>";
				html += "<td>" +dsContrato.values[i].ID+ "</td>";
				html += "<td>" +dsContrato.values[i].ANO+ "</td>";
				html += "<td>" +dsContrato.values[i].NRDOCUMENTO+ "</td>";
				html += "<td>" +DescricaoTipoContrato(dsContrato.values[i].TIPO)+ "</td>";
				html += "<td>" +dsContrato.values[i].CODAUTORIZACAO+ "</td>";
				html += "<td>" +dsContrato.values[i].EMISSAO.substring(0,10).split('-').reverse().join('/')+ "</td>";
				html += "<td>" +dsContrato.values[i].VENCIMENTO.substring(0,10).split('-').reverse().join('/')+ "</td>";				
				html += "<td>" +(dsContrato.values[i].STATUS == "1" ? "Ativo" : "Inativo")+ "</td>";
				html += '<td><button class="btn btn-default" title="Editar Contrato" onclick="EditarContrato('+i+')"><span class="fluigicon fluigicon-pen fluigicon-md"></span></button></td>';
				html += "</tr>";
				tabelaCorpo.append(html);
			}
		}
	}
}

function DescricaoTipoContrato(id){

	for(var i = 0; i < aTiposContrato.length; i++){
		if(aTiposContrato[i][0] == id){
			return aTiposContrato[i][1];
		}
	}

	return "";
}

function CodigoTipoContrato(descricao){

	for(var i = 0; i < aTiposContrato.length; i++){
		if(aTiposContrato[i][1] == descricao){
			return aTiposContrato[i][0];
		}
	}

	return "";
}

function AdicionarContato(){
	var tabelaCorpo = $("#tabelaContrato tbody");

	if($("#contratoAno").val() == "" || $("#contratoAno").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Ano");
		return false;
	}else if($("#contratoNumDocumento").val() == "" || $("#contratoNumDocumento").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Nº Documento");
		return false;
	}else if($("#contratoTipo").val() == "" || $("#contratoTipo").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Tipo");
		return false;
	}else if($("#contratoPeriodoDe").val() == "" || $("#contratoPeriodoDe").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Emissão");
		return false;
	}else if($("#contratoPeriodoAte").val() == "" || $("#contratoPeriodoAte").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Vencimento");
		return false;
	}else if($("#contratoStatus").val() == "" || $("#contratoStatus").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Status");
		return false;
	}else if($("#codContratoEmpresa").val() == "" || $("#codContratoEmpresa").val() == null){
		MensagemAlerta("Atenção","Favor selecionar a Entidade");
		return false;
	}

	var	html = "<tr id='"+tabelaCorpo[0].rows.length+"'>";
	html += "<td>" +$("#codContratoEmpresa").val()+ "</td>";
	html += "<td>-1</td>";
	html += "<td>" +$("#contratoAno").val()+ "</td>";
	html += "<td>" +$("#contratoNumDocumento").val()+ "</td>";	
	html += "<td>" +$("#contratoTipo").val()+ "</td>";
	html += "<td>" +$("#contratoAutorizacao").val()+ "</td>";
	html += "<td>" +$("#contratoPeriodoDe").val().split('-').reverse().join('/')+ "</td>";
	html += "<td>" +$("#contratoPeriodoAte").val().split('-').reverse().join('/')+ "</td>";
	html += "<td>" + ($("#contratoStatus").val() == "1" ? "Ativo" : "Inativo")+ "</td>";
	html += '<td><button class="btn btn-default" title="Editar Contrato" onclick="EditarContrato('+tabelaCorpo[0].rows.length+')"><span class="fluigicon fluigicon-pen fluigicon-md"></span></button></td>';
	html += "</tr>";
	tabelaCorpo.append(html);

	$("#contratoAno, #contratoNumDocumento, #contratoNumDocumento, #contratoAutorizacao, #contratoPeriodoDe, #contratoPeriodoAte, #contratoStatus, #codContratoEmpresa").val("");
	removeZoomData("contratoTipo");
	$("#divBuscaClienteFornecedor").fadeOut();
	$("#divDadosVinculo").fadeOut();

}


function MontaXMLZMDCONTRATOENTIDADE(){	

	var tabelaContrato = $("#tabelaContrato tbody tr");

	for(var i = 0; i < tabelaContrato.length; i++){
		//if(tabelaContrato[i].childNodes["1"].textContent == "-1"){

			var fieldsXml = "";
			fieldsXml = "<ZMDCONTRATOENTIDADE>";
			fieldsXml += criaElementoXML("ID",			   tabelaContrato[i].childNodes["1"].textContent);
			fieldsXml += criaElementoXML("ENTIDADE",       tabelaContrato[i].childNodes["0"].textContent);
			fieldsXml += criaElementoXML("ANO",            tabelaContrato[i].childNodes["2"].textContent);  
			fieldsXml += criaElementoXML("NRDOCUMENTO",    tabelaContrato[i].childNodes["3"].textContent) ;         
			fieldsXml += criaElementoXML("TIPO",           CodigoTipoContrato(tabelaContrato[i].childNodes["4"].textContent));      
			fieldsXml += criaElementoXML("CODAUTORIZACAO", tabelaContrato[i].childNodes["5"].textContent);   
			fieldsXml += criaElementoXML("EMISSAO",        tabelaContrato[i].childNodes["6"].textContent.split('/').reverse().join('-'));    
			fieldsXml += criaElementoXML("VENCIMENTO",     tabelaContrato[i].childNodes["7"].textContent.split('/').reverse().join('-'));     
			fieldsXml += criaElementoXML("ADITIVO",        "");
			fieldsXml += criaElementoXML("STATUS",         (tabelaContrato[i].childNodes["8"].textContent == "Ativo" ? "1" : "0") );  
			fieldsXml += "</ZMDCONTRATOENTIDADE>";

			if (!GravarRMContrato(fieldsXml)){
				return false;
			}
		//}
	}
	return true;
}


function GravarRMContrato(fieldsXml){

	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_RMSPRJ4236032Server_grava_contrato", null,constraints, null);

	if(gravaRM.values.length > 1){
		MensagemAlerta('<h3>Erro para gravar o registro, contate o Administrador</h3></h3><p>'+gravaRM.values[0].RETORNO+'</p>');
		return false
	}

	return true;
}

function ZoomContratoEmpresa(aVinculo){

	var zoomContratoEmpresa = new Array();	
	var codEmpresa = "";

	for(var i = 0; i < aVinculo.length; i++){			
		if(codEmpresa != aVinculo[i][0]){
			codEmpresa = aVinculo[i][2];
			zoomContratoEmpresa.push(new Array(
					aVinculo[i][0], 
					aVinculo[i][2]
			));
		}					
	}


	var zoom = FLUIGC.autocomplete('#zoomContratoEmpresa', {
		source: substringMatcher(zoomContratoEmpresa),
		name: 'empresa',
		displayKey: 'description',
		tagClass: 'tag-gray',
		type: 'tagAutocomplete'
	});

	zoom.on('fluig.autocomplete.selected', function(ev) {
		$("#codContratoEmpresa").val(ev.item.code)
	}); 
	
	zoom.on('fluig.autocomplete.itemRemoved', function(ev) {
		$("#codContratoEmpresa").val("");
	});
}


function EditarContrato(id){
	
	var linhaTabela = $("#tabelaContrato tbody tr");
	
	var contrato = linhaTabela[id.toString()].childNodes["5"].textContent;
	var dataEmissao = linhaTabela[id.toString()].childNodes["6"].textContent;
	dataEmissao = dataEmissao == "" ? "" : dataEmissao = dataEmissao.split('/').reverse().join('-');
	var dataVencimento = linhaTabela[id.toString()].childNodes["7"].textContent;
	dataVencimento = dataVencimento == "" ? "" : dataVencimento = dataVencimento.split('/').reverse().join('-');
	var status = linhaTabela[id.toString()].childNodes["8"].textContent; 
	
	var html = '';	
	//html += '<input type="text" class="form-control" name="idLinhaTabelaHistorico" id="idLinhaTabelaHistorico" value="'+linha+'">';
	html += '<div class="panel panel-default">';
	html += '	<div class="panel-heading">Alteração de Contrato</div>';
	html += '	<div class="panel-body">';
	html += '		<div class="form-group fs-clearfix ">';						
	html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="dataResolucao">';
	html += '				<label for="dataEmissao">Data Emissao</label>';
	html += '				<input type="date" class="form-control" name="dataEmissao" id="dataEmissao" value="'+dataEmissao+'">';
	html += '			</div>';
	html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="dataResolucao">';
	html += '				<label for="dataVencimento">Data Emissao</label>';
	html += '				<input type="date" class="form-control" name="dataVencimento" id="dataVencimento" value="'+dataVencimento+'">';
	html += '			</div>';
	html += '		</div>';	
	html += '		<div class="form-group fs-clearfix ">';	
	html += '			<div class="col-sm-6 col-xs-12">';
	html += '				<label for="statusModalContrato">Status</label>'; 
	html += '				<select class="form-control" name="statusModalContrato" id="statusModalContrato">';
	html += '					<option value="1" "'+(status == "Ativo" ? "selected" : "")+'">Ativo</option>';
	html += '					<option value="0" "'+(status != "Ativo" ? "selected" : "")+'">Inativo</option>';
	html += '				</select>';
	html += '			</div>';
	html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="contratoModal">';
	html += '				<label for="contratoModal">Contrato</label>';
	html += '				<input type="text" class="form-control" name="contratoModal" id="contratoModal" value="'+contrato+'">';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';				
	html += '</div>';
	
	var myModal = FLUIGC.modal({
	    title: 'Alteração de Contrato',
	    content: html,
	    id: 'fluig-modal-contrato',
	    size: 	'larger',
	    actions: [{
	        'label': 'Salvar',
	        'bind': 'data-modal-save',
	        'classType' : 'btn btn-primary modalSave',
	        'autoClose': true
	    },{
	        'label': 'Cancelar',
	        'autoClose': true
	    }]
	}, function() {
		
		$(".modalSave").on('click', function(){
			linhaTabela[id.toString()].childNodes["5"].textContent = $("#contratoModal").val();
			linhaTabela[id.toString()].childNodes["6"].textContent = $("#dataEmissao").val().split('-').reverse().join('/');
			linhaTabela[id.toString()].childNodes["7"].textContent = $("#dataVencimento").val().split('-').reverse().join('/');
			linhaTabela[id.toString()].childNodes["8"].textContent = ($("#statusModalContrato").val() == "1" ? "Ativo" : "Inativo");
			
			/*
			var naoEfetuar = $("#naoEfetuar");
			if(naoEfetuar[0].checked){
				$("#dataResolucao___"+linha).text("");
				$("#resolucao___"+linha).text("");
				$("#situacao___"+linha).text("Não será efetuada");
			}else{
				var dataResolucao = $("#dataResolucao").val();
				dataResolucao = dataResolucao.split('-').reverse().join('/');			
				var obsResolucao = $("#obsResolucao").val();
				
				if(dataResolucao != "" && obsResolucao != ""){
					$("#dataResolucao___"+linha).text(dataResolucao);
					$("#resolucao___"+linha).text(obsResolucao);
					$("#situacao___"+linha).text("Resolvido");
				}else{
					$("#dataResolucao___"+linha).text("");
					$("#resolucao___"+linha).text("");
					$("#situacao___"+linha).text("Pendente");
				}
			}	
			*/		
		})
	});
}