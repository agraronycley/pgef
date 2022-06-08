function createDataset(fields, constraints, sortFields) {
	
	log.info("--Debbug-- dataset: rm_saverecordauth.js");
	
	var NOME_SERVICO = "RM SENAR - wsDataServer"; 
	var CAMINHO_SERVICO = "br.com.totvs.br.WsDataServer"; 
	var dataset = DatasetBuilder.newDataset();
	
	var fieldsXml = "";
	var tabelaRM = "";
	
	for (var c = 0; c < constraints.length; c++){
		if (constraints[c].fieldName == "fieldsXml"){
			fieldsXml = constraints[c].initialValue;
			log.warn("--Debbug-- fieldsXml: " + fieldsXml);
		}else if (constraints[c].fieldName == "tabelaRM"){
			tabelaRM = constraints[c].initialValue;
			log.warn("--Debbug-- tabelaRM: " + tabelaRM);
		}
	}
	
	try{		
		var usuario = "mestre";  
		var senha   = "707v5s3n4r"; 
		var contexto = "codcoligada=1;codfilial=1"
		
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO); 
		log.info("Servico: " + servico);

		var instancia = servico.instantiate(CAMINHO_SERVICO); 	
		log.info("Instancia: " + instancia);

		var ws = instancia.getWsDataServerSoap(); 
		log.info("WS: " + ws);		

		log.info("DataSet enviado para o TBC " + fieldsXml);

		var result = ws.saveRecordAuth(tabelaRM,fieldsXml,contexto,usuario,senha);
		log.warn("--Debbug-- result: " + result);
		
		if ((result != null) && (result.indexOf("===") != -1)){
			var msgErro = result.substring(0, result.indexOf("==="));
			throw msgErro;
		}

		dataset.addColumn("SUCCESS");
		dataset.addRow(new Array(result)); 

		return dataset;
	}
	catch (e) {

		if (e == null){
			e = "Erro desconhecido; verifique o log do AppServer";
		}

		var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
		log.error(mensagemErro);
		dataset.addColumn("ERROR");
		dataset.addRow(new Array(e));

		return dataset;
	}
}