$(document).ready(function(){
	
	$("#btnAdicionarEmpresa,#btnPesquisarEmpresa").prop("disabled", true);

	$("#btnAdicionarEmpresa").on('click', function (){
		NaoEncontrado();
	})

	$("#btnPesquisarEmpresa").on('click', function () {
		PopulaEmpresa();
	})	
	
	$("#cpfCnpj,#nomePropriedade").on('blur', function () {
		ConsultaEmpresa();
	})
	
	$("#btnVincular").on('click', function(){
		VincularTabelaEmpresa();		
	})
})


/** rm_fincfodatabr_readviewauth
 *	Função para validar os campos
 */
function ConsultaEmpresa() {
	var nome = $("#nomePropriedade").val();
	var cpfCnpj = $("#cpfCnpj").val().replace(/\D/g, '')

	if (cpfCnpj == '___.___.___-__' || cpfCnpj == '__.___.___/____-__' || cpfCnpj == '   .   .   -  ' || cpfCnpj == '  .   .   /    -  '){
		cpfCnpj = ''		
	}

	var filter = 'NOME,' + nome + ',CGCCFO,'+ cpfCnpj;

	if (filter != 'NOME,,CGCCFO,'){
		var c1 = DatasetFactory.createConstraint('NOME', nome, nome,ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint('CPFCNPJ', cpfCnpj, cpfCnpj,ConstraintType.MUST);
		var constraints = new Array(c1,c2);
		var quant = DatasetFactory.getDataset("rm_fincfodatabr_readviewauth_cgc", null,
				constraints, null);
		if(quant.values.length > 0 ){
			$("#btnPesquisarEmpresa").prop("disabled", false);
			$("#btnAdicionarEmpresa").prop("disabled", true);
			reloadZoomFilterValues('buscaClienteFornecedor', filter)
		}else{
			$("#btnPesquisarEmpresa").prop("disabled", true);
			$("#btnAdicionarEmpresa").prop("disabled", false);						
		}
	}
};


function NaoEncontrado(){
		
	//abrir a tela do cadastro de empresa

}


function PopulaEmpresa(){
	$("#divBuscaClienteFornecedor").fadeIn()
}


/**
 * Preenche os campos do Formulário de acordo com o Cliente / Fornecedor selecionado
 * @param codCFO - Codigo selecionado
 */
/*
function PreencheCamposEmpresa(codCFO,codColigada){

	var c1 = DatasetFactory.createConstraint('CODCOLIGADA', codColigada, codColigada,ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CODCFO', codCFO, codCFO,ConstraintType.MUST);
	var constraints = new Array(c1,c2);
	var fincfodatabr = DatasetFactory.getDataset("rm_fincfodatabr_readrecordauth", null,
			constraints, null);

	if(fincfodatabr.values.length > 0) {	
		
		var codCfo = fincfodatabr.values[i].CODCFO;
		var nome = fincfodatabr.values[i].NOME;
		var nomeFantasia = fincfodatabr.values[i].NOMEFANTASIA;
		var cgcCfo = fincfodatabr.values[i].CGCCFO
		var codPessoa = $("#codPessoa").val()
		var vinculo = ConsultaVinculo(codCfo, codPessoa)
		
		if(fincfodatabr.values[i].PESSOAFISOUJUR == "J"){
			$("#divDadosEmpresaJuridica").fadeIn();
			$("#codFCFOEmpresaJuridica").val(codCfo);
			$("#vinculoEmpresaJuridica").val(vinculo);
			$("#nomeEmpresaJuridica").val(nome);
			$("#nomeFantasiaEmpresaJuridica").val(nomeFantasia);
			$("#cgcEmpresaJuridica").val(cgcCfo);
		}else{
			$("#divDadosEmpresaFisica").fadeIn();
			$("#codFCFOEmpresaFisica").val(codCfo);
			$("#vinculoEmpresaFisica").val(vinculo);
			$("#nomeEmpresaFisica").val(nome);
			$("#nomeFantasiaEmpresaFisica").val(nomeFantasia);
			$("#cgcEmpresaFisica").val(cgcCfo);
		}
	}
}
*/
function ConsultaVinculo(codCfo, codPessoa){
	
	var c1 = DatasetFactory.createConstraint('CODCFO', codCfo, codCfo, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CODPESSOA', codPessoa, codPessoa, ConstraintType.MUST);
	var constraint = new Array(c1, c2);
	var dataset = DatasetFactory.getDataset('rmSql_FLUIG004', null, constraint, null);
	
	if(dataset.values.length > 0){
		return dataset.values[0]["IDVINCULO"];
	}else{
		return "-1"
	}
}

function ConsultaVinculoFCFO(codigoPessoaFisica){
	
	var c1 = DatasetFactory.createConstraint('CODPESSOA', codigoPessoaFisica, codigoPessoaFisica,ConstraintType.MUST);
	var constraints = new Array(c1);
	var dsVinculo = DatasetFactory.getDataset("rmSql_FLUIG004", null,constraints, null);
	var aVinculo = new Array();
	
	if(dsVinculo.values.length > 0 ){
		
		for(var i = 0; i < dsVinculo.values.length; i++){
			aVinculo.push(new Array(	
				dsVinculo.values[i].CODCFO,
				dsVinculo.values[i].IDVINCULO,
				dsVinculo.values[i].NOME_CFO,
				dsVinculo.values[i].NOMEFANTASIA,
				dsVinculo.values[i].CGCCFO,
				dsVinculo.values[i].PESSOAFISOUJUR == "F" ? "Física" : "Jurídica",
				dsVinculo.values[i].FCFO_ATIVO == "1" ? "Ativo" : "Inativo",
 				dsVinculo.values[i].CARGO,
				dsVinculo.values[i].DTVINCULOINI.substring(0,10).split('-').reverse().join('/'),
				dsVinculo.values[i].DTVINCULOFIM.substring(0,10).split('-').reverse().join('/')
				
			));				
		}
	}
	
	return aVinculo;
}

function MontaXMLZMDVINCULOFCFOPPESSOA(){
	
	var codPessoa = $("#codPessoa").val(); 
	var tabelaCorpo = $("#tabelaVinculo tbody tr");
	
	for(var i = 0; i < tabelaCorpo.length; i++){
		//if(tabelaCorpo[i].childNodes["1"].textContent == "-1"){
			fieldsXml = "<ZMDVINCULOFCFOPPESSOA>";
			fieldsXml += criaElementoXML("ID", tabelaCorpo[i].childNodes["1"].textContent);
			fieldsXml += criaElementoXML("codPessoa", codPessoa);
			fieldsXml += criaElementoXML("CODCFO", tabelaCorpo[i].childNodes["0"].textContent);
			fieldsXml += criaElementoXML("CARGO", tabelaCorpo[i].childNodes["7"].textContent);
			fieldsXml += criaElementoXML("DTVINCULOINI", tabelaCorpo[i].childNodes["8"].textContent.split('/').reverse().join('-'));
			fieldsXml += criaElementoXML("DTVINCULOFIM", tabelaCorpo[i].childNodes["9"].textContent.split('/').reverse().join('-'));
			fieldsXml += criaElementoXML("ATIVO", (tabelaCorpo[i].childNodes["6"].textContent == "Ativo" || tabelaCorpo[i].childNodes["6"].textContent == "1"? "1" : "0"));	
			fieldsXml += "</ZMDVINCULOFCFOPPESSOA>";			
			if (!(GravarRMZMDVINCULOFCFOPPESSOA(fieldsXml))){
				return false
			}
		//}
	}	
	return true;
}


function GravarRMZMDVINCULOFCFOPPESSOA(fieldsXml){
	
	var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml,ConstraintType.MUST);
	var constraints = new Array(c1);
	var gravaRM = DatasetFactory.getDataset("rm_RMSPRJ4555776Server_gravar_vinculo", null,constraints, null);

	if (gravaRM.values.length > 0 ){	
		if(gravaRM.values.length == 1){
			return true;
		}else{
			MensagemAlerta('FCO','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+gravaRM.values[0].RETORNO);
			return false;
		}
	}else{
		MensagemAlerta('FCO','<h3>Erro para gravar o registro, contate o Administrador</h3>');
		return false;
	}
}

function PopulaTabelaVinculo(aVinculo){
	
	var tabelaCorpo = $("#tabelaVinculo tbody");
	$("#tabelaVinculo tbody tr").remove();
	var html = "";
	for(var i = 0; i < aVinculo.length; i++){
		html = "<tr id='"+i+"'>";
		html += "<td>"+aVinculo[i][0]+"</td>";
		html += "<td>"+aVinculo[i][1]+"</td>";
		html += "<td>"+aVinculo[i][2]+"</td>";
		html += "<td>"+aVinculo[i][3]+"</td>";
		html += "<td>"+aVinculo[i][4]+"</td>";
		html += "<td>"+aVinculo[i][5]+"</td>";
		html += "<td>"+aVinculo[i][6]+"</td>";
		html += "<td>"+aVinculo[i][7]+"</td>";
		html += "<td>"+aVinculo[i][8]+"</td>";
		html += "<td>"+aVinculo[i][9]+"</td>";
		html += '<td><button class="btn btn-default" title="Editar Contrato" onclick="EditarVinculo('+i+')"><span class="fluigicon fluigicon-pen fluigicon-md"></span></button></td>';
		//html += "<td><button class='btn btn-default' onclick='downloadPDF_TAPPS()'>Imprimir</button></td>"
		html += "</tr>";
		tabelaCorpo.append(html);
	}
	
}


function VincularTabelaEmpresa(){
	var tabelaCorpo = $("#tabelaVinculo tbody");
	var objVinculoFCFO = JSON.parse($("#objVinculoFCFO").val());
	var cpfCnpj = $("#cpfCnpj").val();
	var tipoPessoa = cpfCnpj.length > 11 ? 'Jurídica' : 'Física';
	var statusVinculo = $("#statusVinculo").val(); 
	
	if($("#buscaClienteFornecedor").val() == "" || $("#buscaClienteFornecedor").val() == null){
		MensagemAlerta("Atenção","Favor selecionar a Entidade");
		return false;
	}else if($("#buscaCargo").val() == "" || $("#buscaCargo").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Cargo");
		return false;
	}else if($("#periodoDe").val() == "" || $("#periodoDe").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Periodo De");
		return false;
	}else if($("#periodoAte").val() == "" || $("#periodoAte").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Periodo Ate");
		return false;
	}else if($("#statusVinculo").val() == "" || $("#statusVinculo").val() == null){
		MensagemAlerta("Atenção","Favor selecionar o Status");
		return false;
	}
	
	var	html = "<tr id='"+tabelaCorpo[0].rows.length+"'>";
	html += "<td>" +$("#buscaClienteFornecedor").val()+ "</td>";
	html += "<td>-1</td>";
	html += "<td>" +objVinculoFCFO.nome+ "</td>";
	html += "<td></td>";
	html += "<td>" +cpfCnpj+ "</td>";
	html += "<td>" +tipoPessoa+ "</td>";
	html += "<td>" +statusVinculo+ "</td>";
	html += "<td>" +$("#buscaCargo").val()+ "</td>";
	html += "<td>" +$("#periodoDe").val().split('-').reverse().join('/')+ "</td>";
	html += "<td>" +$("#periodoAte").val().split('-').reverse().join('/')+ "</td>";
	//html += "<td><button class='btn btn-default' onclick='downloadPDF_TAPPS()'>Imprimir</button></td>"
	html += '<td><button class="btn btn-default" title="Editar Contrato" onclick="EditarVinculo('+tabelaCorpo[0].rows.length+')"><span class="fluigicon fluigicon-pen fluigicon-md"></span></button></td>';
	html += "</tr>";
	tabelaCorpo.append(html);
	
	$("#nomePropriedade, #cpfCnpj, #periodoDe, #periodoAte, #statusVinculo, #objVinculoFCFO").val("");
	removeZoomData("buscaClienteFornecedor");
	removeZoomData("buscaCargo");
	$("#divBuscaClienteFornecedor").fadeOut();
	$("#divDadosVinculo").fadeOut();
	TiposContrato();
	
}



function EditarVinculo(id){
	
	var linhaTabela = $("#tabelaVinculo tbody tr");
	
	var dataEmissao = linhaTabela[id.toString()].childNodes["8"].textContent;
	dataEmissao = dataEmissao == "" ? "" : dataEmissao = dataEmissao.split('/').reverse().join('-');
	var dataVencimento = linhaTabela[id.toString()].childNodes["9"].textContent;
	dataVencimento = dataVencimento == "" ? "" : dataVencimento = dataVencimento.split('/').reverse().join('-');
	var status = linhaTabela[id.toString()].childNodes["6"].textContent; 
	
	var html = '';	
	//html += '<input type="text" class="form-control" name="idLinhaTabelaHistorico" id="idLinhaTabelaHistorico" value="'+linha+'">';
	html += '<div class="panel panel-default">';
	html += '	<div class="panel-heading">Alteração de Vinculo</div>';
	html += '	<div class="panel-body">';
	html += '		<div class="form-group fs-clearfix ">';						
	html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="dataEmissaoModalVinculo">';
	html += '				<label for="dataEmissaoModalVinculo">Data Emissao</label>';
	html += '				<input type="date" class="form-control" name="dataEmissaoModalVinculo" id="dataEmissaoModalVinculo" value="'+dataEmissao+'">';
	html += '			</div>';
	html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="dataVencimentoModalVinculo">';
	html += '				<label for="dataVencimentoModalVinculo">Data Emissao</label>';
	html += '				<input type="date" class="form-control" name="dataVencimentoModalVinculo" id="dataVencimentoModalVinculo" value="'+dataVencimento+'">';
	html += '			</div>';
	html += '		</div>';	
	html += '		<div class="form-group fs-clearfix ">';	
	html += '			<div class="col-sm-6 col-xs-12">';
	html += '				<label for="statusModalVinculo">Status</label>'; 
	html += '				<select class="form-control" name="statusModalVinculo" id="statusModalVinculo">';
	html += '					<option value="1" "'+(status == "Ativo" ? "selected" : "")+'">Ativo</option>';
	html += '					<option value="0" "'+(status != "Ativo" ? "selected" : "")+'">Inativo</option>';
	html += '				</select>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';				
	html += '</div>';
	
	var myModal = FLUIGC.modal({
	    title: 'Alteração de Vinculo',
	    content: html,
	    id: 'fluig-modal-vinculo',
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
			linhaTabela[id.toString()].childNodes["8"].textContent = $("#dataEmissaoModalVinculo").val().split('-').reverse().join('/');
			linhaTabela[id.toString()].childNodes["9"].textContent = $("#dataVencimentoModalVinculo").val().split('-').reverse().join('/');
			linhaTabela[id.toString()].childNodes["6"].textContent = ($("#statusModalVinculo").val() == "1" ? "Ativo" : "Inativo");		
		})
	});
}