/** -------------------------------------------------------------------------------- GRAVAÇÃO FCFO -------------------------------------------------------------------------------- **/

/**
 * @returns {Boolean}
 */
function MontaXMLFCFO() {
    var cep = document.getElementById("cep").value;
    var inscricaoEstadual = document.getElementById("inscricaoEstadual").value;
    var telefone = document.getElementById("telefone").value;
    var celular = document.getElementById("celular").value;
    var numRG = document.getElementById("numeroRG").value;

    var fieldsXml = "<FCFO>";
    fieldsXml += criaElementoXML("CODCOLIGADA", "0");
    fieldsXml += criaElementoXML("CODCFO", $("#codCfo").val());
    fieldsXml += criaElementoXML("NOMEFANTASIA", document.getElementById("nmPropriedade").value);
    fieldsXml += criaElementoXML("NOME", (document.getElementById("nome").value).toUpperCase());
    fieldsXml += criaElementoXML("INSCRESTADUAL", inscricaoEstadual);
    fieldsXml += criaElementoXML("PAGREC", "1"); //Classificação 1 - Cliente; 2 - Fornecedor; 3 - Ambos  
    fieldsXml += criaElementoXML("CEP", cep.replace(/[^\d,]/g, ""));
    fieldsXml += criaElementoXML("RUA", document.getElementById("rua").value);
    fieldsXml += criaElementoXML("NUMERO", document.getElementById("numero").value);
    fieldsXml += criaElementoXML("COMPLEMENTO", document.getElementById("complemento").value);
    fieldsXml += criaElementoXML("BAIRRO", document.getElementById("bairro").value);
    fieldsXml += criaElementoXML("CODETD", "--" /*document.getElementById("estado").value*/ );
    fieldsXml += criaElementoXML("CIDADE", document.getElementById("descMunicipio").value);
    fieldsXml += criaElementoXML("TELEX", telefone.replace(/[^\d,]/g, ""));
    fieldsXml += criaElementoXML("TELEFONE", celular.replace(/[^\d,]/g, ""));
    fieldsXml += criaElementoXML("EMAIL", document.getElementById("email").value);
    fieldsXml += criaElementoXML("ATIVO", "1"); //Classificação 1 - Sim; 0 - Não;
    fieldsXml += criaElementoXML("PESSOAFISOUJUR", "F");
    fieldsXml += criaElementoXML("CFOIMOB", "0"); //Classificação 1 - Sim; 0 - Não;
    fieldsXml += criaElementoXML("RAMOATIV", "16"); //Classificação 16 - Produtor Rural;
    //fieldsXml += criaElementoXML("CODTCF",                  document.getElementById("").value); 
    fieldsXml += criaElementoXML("CODCOLTCF", "1");

    //if(document.getElementById("tipoPessoa").value == "F"){		    
    fieldsXml += criaElementoXML("CIDENTIDADE", numRG.replace(/[^\d,]/g, ""));
    fieldsXml += criaElementoXML("CI_ORGAO", document.getElementById("orgaoExpedidor").value);
    fieldsXml += criaElementoXML("CI_UF", document.getElementById("estadoEmissor").value);
    fieldsXml += criaElementoXML("DTNASCIMENTO", document.getElementById("dataNascimento").value);
    //fieldsXml += criaElementoXML("NUMDEPENDENTES",          document.getElementById("numeroDependentes").value);  
    fieldsXml += criaElementoXML("ESTADOCIVIL", document.getElementById("estadoCivil").value);
    fieldsXml += criaElementoXML("CGCCFO", document.getElementById("cgc").value);

    fieldsXml += "</FCFO>";
    console.log("fieldsXml: " + fieldsXml)
    if (GravarRMFCFO(fieldsXml)) {
        return true
    } else {
        return false
    }
    return true;
}

/**
 * Gravar FCFO RM
 * @param fieldsXml
 * @returns
 */
function GravarRMFCFO(fieldsXml) {
    var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_fincfodatabr_saverecordauth", null, constraints, null);
    if (gravaRM.values.length > 0) {
        if (gravaRM.values[0].ERROR != null && gravaRM.values[0].ERROR != "") {
            MensagemAlerta('FCO', '<h3>Erro para gravar o registro, contate o Administrador</h3><br/>' + gravaRM.values[0].ERROR);
            return false;
        } else {
            document.getElementById("codCfo").value = gravaRM.values[0].RETORNO.substring(2, 8);
            return true;
        }
        /*
        if(gravaRM.values.length == 1){
        	document.getElementById("codCfo").value = gravaRM.values[0].RETORNO.substring(2,8);
        	return true;
        }else{
        	MensagemAlerta('FCO','<h3>Erro para gravar o registro, contate o Administrador</h3><br/>'+gravaRM.values[0].RETORNO);
        	return false;
        }
        */
    } else {
        MensagemAlerta('FCO', '<h3>Erro para gravar o registro, contate o Administrador</h3>');
        return false;
    }
}


function MontaXMLVinculo() {

    var idTabela = -1;
    var codigoEmpresa = $('#codCfo').val();
    var codigoPPessoa = "";
    var codigoCargo = "";

    codigoPPessoa = $("#codPessoa").val();

    //Consulta se existe vinculo
    var c1 = DatasetFactory.createConstraint('CODCFO', codigoEmpresa, codigoEmpresa, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('CODPESSOA', codigoPPessoa, codigoPPessoa, ConstraintType.MUST);
    var constraints = new Array(c1, c2);
    var dsVinculo = DatasetFactory.getDataset("rm_RMSPRJ4555776Server_consulta_vinculo", null, constraints, null);
    console.log("dsVinculo.values.length: " + dsVinculo.values.length)
    if (dsVinculo.values.length > 0) {
        idTabela = dsVinculo.values[0].ID
    }
    fieldsXml = "<ZMDVINCULOFCFOPPESSOA>";
    fieldsXml += criaElementoXML("ID", idTabela);
    fieldsXml += criaElementoXML("codPessoa", codigoPPessoa);
    fieldsXml += criaElementoXML("CODCFO", codigoEmpresa);
    //fieldsXml += criaElementoXML("CARGO",codigoCargo);
    //fieldsXml += criaElementoXML("DTVINCULOINI", document.getElementById('periodoDe___'+id).value);
    //fieldsXml += criaElementoXML("DTVINCULOFIM", document.getElementById('periodoAte___'+id).value);
    fieldsXml += criaElementoXML("ATIVO", "1");
    //fieldsXml += criaElementoXML("RESPONSAVEL",$("#responsavelSocio___"+id).prop("checked") ? 1 : 0);	
    fieldsXml += "</ZMDVINCULOFCFOPPESSOA>";

    if (!(GravarRMVinculo(fieldsXml))) {
        return false
    }

    console.log("fieldsXml: " + fieldsXml)
    idTabela = -1


    return true;
}

/**
 * 
 * @param fieldsXml      - XML 
 * @param pessoaFisOuJur
 */
function GravarRMVinculo(fieldsXml) {
    console.log("GravarRMVinculo(fieldsXml)")
    var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
    console.log("c1: " + c1)
    var constraints = new Array(c1);
    console.log("constraints: " + constraints)
    var gravaRM = DatasetFactory.getDataset("rm_RMSPRJ4555776Server_gravar_vinculo", null, constraints, null);
    console.log("gravaRM: " + gravaRM)

    if (gravaRM.values.length > 0) {
        console.log("if (gravaRM.values.length > 0 ){")
        if (gravaRM.values.length == 1) {
            return true;
        } else {
            MensagemAlerta('FCO', '<h3>Erro para gravar o registro, contate o Administrador</h3><br/>' + gravaRM.values[0].RETORNO);
            return false;
        }
    } else {
        MensagemAlerta('FCO', '<h3>Erro para gravar o registro, contate o Administrador</h3>');
        return false;
    }
}


/** -------------------------------------------------------------------------------- GRAVAÇÃO PROPRIEDADE RURAL -------------------------------------------------------------------------------- **/

/**
 * @returns {Boolean}
 */
function MontaXMLPropriedade() {

    var fieldsXml = "<ZMDPROPRIRURAL>";
    //fieldsXml += criaElementoXML("CODCOLIGADA"  ,"1");
    fieldsXml += criaElementoXML("ID", $("#idPropriedadeRural").val());
    fieldsXml += criaElementoXML("NOME", (document.getElementById("nmPropriedade").value).toUpperCase());
    fieldsXml += criaElementoXML("CODCFO", document.getElementById("codCfo").value);
    fieldsXml += criaElementoXML("AREA", document.getElementById("areaTotalPropriedade").value);
    fieldsXml += criaElementoXML("CCIR", document.getElementById("ccir").value);
    fieldsXml += criaElementoXML("NIRF", document.getElementById("nirf").value);
    fieldsXml += criaElementoXML("DAP", document.getElementById("dap").value);
    fieldsXml += criaElementoXML("INSCRESTADUAL", document.getElementById("inscricaoEstadual").value);
    fieldsXml += criaElementoXML("CEP", document.getElementById("cepPropriedade").value);
    fieldsXml += criaElementoXML("RUA", document.getElementById("logradouroPropriedade").value);
    fieldsXml += criaElementoXML("NUMERO", document.getElementById("numeroPropriedade").value);
    fieldsXml += criaElementoXML("COMPLEMENTO", document.getElementById("complementoPropriedade").value);
    fieldsXml += criaElementoXML("BAIRRO", document.getElementById("bairroPropriedade").value);
    fieldsXml += criaElementoXML("MUNICIPIO", document.getElementById("codMunicipioPropriedade").value);
    //fieldsXml += criaElementoXML("MUNICIPIO", document.getElementById("municipioPropriedade").value);
    fieldsXml += criaElementoXML("ESTADO", document.getElementById("estadoPropriedade").value);
    fieldsXml += criaElementoXML("TIPO", document.getElementById("tipoPropriedade").value);
    fieldsXml += criaElementoXML("PRODDESDE", document.getElementById("produtorRuralDesde").value);
    fieldsXml += criaElementoXML("ACESSO", document.getElementById("acessoPropriedade").value);
    fieldsXml += criaElementoXML("ENERGELETRICA", document.getElementById("possuiEnergia").value);
    fieldsXml += criaElementoXML("ESTIAGENS", document.getElementById("propriedadeAfetadaEstiagens").value);
    fieldsXml += criaElementoXML("MESESESTIAGENS", document.getElementById("estiagemMesesPAno").value);
    fieldsXml += criaElementoXML("TECNOLOGIA", document.getElementById("tecnologiaPraAdversidade").value);
    fieldsXml += criaElementoXML("DISTANCIAMUN", document.getElementById("distanciaMunicipio").value);
    fieldsXml += criaElementoXML("ROTEIRO", document.getElementById("roteiroAcesso").value);
    fieldsXml += criaElementoXML("LATITUDE", document.getElementById("latitude").value);
    fieldsXml += criaElementoXML("LONGITUDE", document.getElementById("longitude").value);
    fieldsXml += criaElementoXML("QUAISTEC", document.getElementById("quaisTecnologias").value);
    fieldsXml += criaElementoXML("CARRO", document.getElementById("mtCarroProprio").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("MOTO", document.getElementById("mtMotoProprio").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("BICICLETA", document.getElementById("mtBicicleta").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("ONIBUS", document.getElementById("mtOnibus").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("OUTROSTRANSPORTES", document.getElementById("mtOutros").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("NENHUMTRANSPORTE", document.getElementById("mtNenhum").checked ? "sim" : "não");
    fieldsXml += criaElementoXML("OUTROSMEIOS", document.getElementById("outroMeioTransporte").value);
    fieldsXml += "</ZMDPROPRIRURAL>";
    console.log("fieldsXml: " + fieldsXml)
    if (GravarRMPropriedade(fieldsXml)) {
        return true
    } else {
        return false
    }
}

/**
 * Gravar Propriedade RM
 * @param fieldsXml
 * @param pessoaFisOuJur
 * @returns
 */
function GravarRMPropriedade(fieldsXml, pessoaFisOuJur) {

    var c1 = DatasetFactory.createConstraint('fieldsXml', fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_propriedaderural_saverecordauth", null, constraints, null);

    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            document.getElementById("idPropriedade").value = gravaRM.values[0].RESULT;
            return true;
        } else {
            MensagemAlerta('Atenção!', '<h3>Erro para gravar dados da Propriedade Rural, contate o Administrador</h3>' + gravaRM.values[0].ERROR);
            return false;
        }
    } else {
        MensagemAlerta('Atenção!', '<h3>Erro para gravar dados da Propriedade Rural, contate o Administrador</h3>');
        return false;
    }
}