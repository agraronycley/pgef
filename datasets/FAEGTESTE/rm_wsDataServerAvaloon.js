function createDataset(fields, constraints, sortFields) {
    try{
		var servico = ServiceManager.getServiceInstance("wsDataServerSenarMEX");
		var serviceHelper = servico.getBean();
	    var instancia = servico.instantiate("com.totvs.WsDataServer");
	    var ws = instancia.getRMIwsDataServer();
	    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", 'mestre', '707v5s3n4r');
        
        for(var i in constraints) {
            if(constraints[i]['fieldName'] == 'tabelaRM') DATASERVERNAME = constraints[i]['finalValue'];
            if(constraints[i]['fieldName'] == 'fieldsXml') XML = constraints[i]['finalValue'];
            //if(constraints[i]['fieldName'] == 'CONTEXTO') CONTEXTO = constraints[i]['finalValue'];
        }
        
        var CONTEXTO = "codcoligada=1;codfilial=1";
        
		var saveRecord =  authenticatedService.saveRecord(DATASERVERNAME, XML, CONTEXTO);
		
		var dataset = DatasetBuilder.newDataset();
		
		if ((saveRecord != null) && (saveRecord.indexOf("===") != -1)){
			var msgErro = saveRecord.substring(0, saveRecord.indexOf("==="));
			throw msgErro;
		}

		dataset.addColumn("SUCCESS");
		dataset.addRow(new Array(saveRecord));
		
        //dataset.addColumn("saveRecord");
        //dataset.addRow(new Array(saveRecord));
        return dataset;
    } catch(e){
    	if (e == null){
			e = "Erro desconhecido; verifique o log do AppServer";
		}

		var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
		log.error(mensagemErro);
		dataset.addColumn("ERROR");
		dataset.addRow(new Array(e));

		return dataset;
    }
    log.info('rm_wsDataServerAvaloon');
    log.info('DATASERVERNAME: '+DATASERVERNAME);
    log.info('XML: '+XML);
    log.info('CONTEXTO: '+CONTEXTO);
}

/*
 * function createDataset(fields, constraints, sortFields) {
 * 
 * log.info("--Debbug-- dataset: rm_wsDataServerAvaloon");
 * 
 * var NOME_SERVICO = "wsDataServerSenarMEX"; var CAMINHO_SERVICO =
 * "com.totvs.WsDataServer"; var dataset = DatasetBuilder.newDataset();
 * 
 * var fieldsXml = ""; var tabelaRM = "";
 * 
 * for (var c = 0; c < constraints.length; c++){ if (constraints[c].fieldName ==
 * "fieldsXml"){ fieldsXml = constraints[c].initialValue; log.warn("--Debbug--
 * fieldsXml: " + fieldsXml); }else if (constraints[c].fieldName == "tabelaRM"){
 * tabelaRM = constraints[c].initialValue; log.warn("--Debbug-- tabelaRM: " +
 * tabelaRM); } }
 * 
 * try{ var usuario = "mestre"; var senha = "707v5s3n4r"; var contexto =
 * "codcoligada=1;codfilial=1";
 * 
 * var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
 * log.info("Servico: " + servico);
 * 
 * var instancia = servico.instantiate(CAMINHO_SERVICO); log.info("Instancia: " +
 * instancia);
 * 
 * var ws = instancia.getWsDataServerSoap(); log.info("WS: " + ws);
 * 
 * log.info("DataSet enviado para o TBC " + fieldsXml);
 * 
 * var result = ws.saveRecordAuth(tabelaRM,fieldsXml,contexto,usuario,senha);
 * log.warn("--Debbug-- result: " + result);
 * 
 * if ((result != null) && (result.indexOf("===") != -1)){ var msgErro =
 * result.substring(0, result.indexOf("===")); throw msgErro; }
 * 
 * dataset.addColumn("SUCCESS"); dataset.addRow(new Array(result));
 * 
 * return dataset; } catch (e) {
 * 
 * if (e == null){ e = "Erro desconhecido; verifique o log do AppServer"; }
 * 
 * var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
 * log.error(mensagemErro); dataset.addColumn("ERROR"); dataset.addRow(new
 * Array(e));
 * 
 * return dataset; } }
 */