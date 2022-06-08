UploadArquivo = function(campo, codigoPasta) {
    var file = campo.files[0];

    var reader = new FileReader();

    var fileChunk;
    var filesize = file.size;
    var filename = escape(file.name);

    reader.onload = (function(theFile) {
        return function(e) {
            fileChunk = e.target.result;

            var primeiraVirgula = fileChunk.indexOf(",");
            fileChunk = fileChunk.substring(primeiraVirgula);

            PopulaDocumentoGED(codigoPasta, fileChunk, filesize, filename);
        };
    })(file);
    reader.readAsDataURL(file);
};

/**
 * Função para Criar novo Arquivo no diretorio do Fluig quando é feito upload
 * @param codigoPasta
 * @param fileChunk
 * @param reportSize
 * @returns
 */
PopulaDocumentoGED = function(codigoPasta, fileChunk, reportSize, filename) {
    var parentDocumentId = codigoPasta;
    var documentDescription = filename.substring(0, filename.length - 4);

    if (top.WCMAPI == undefined) {
        var fluigAPI = parentOBJ.WCMAPI;
    } else {
        var fluigAPI = top.WCMAPI;
    }

    //var fluigAPI = (top.WCMAPI == undefined ? WCMAPI : top.WCMAPI);

    var wsUrl = fluigAPI.serverURL + "/webdesk/ECMDocumentService?wsdl";

    //Modelo da Requisição
    var soapRequest =
        '<?xml version="1.0" encoding="UTF-8"?>  	                   		' +
        "<soapenv:Envelope                                                             		" +
        '    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"                 		' +
        '    xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">                        		' +
        "    <soapenv:Header/>                                                         		" +
        "    <soapenv:Body>                                                            		" +
        "        <ws:createSimpleDocument>                                             		" +
        "         <username />                                                         		" +
        "         <password />                                                         		" +
        "            <companyId>" +
        fluigAPI.organizationId +
        "</companyId>                  		" +
        "            <parentDocumentId>" +
        codigoPasta +
        "</parentDocumentId>              		" +
        "            	 <publisherId>" +
        fluigAPI.userCode +
        "</publisherId>      		   		" +
        "                <documentDescription>" +
        documentDescription +
        "</documentDescription> " +
        "                <Attachments>                                                 		" +
        "                    <item>                                                    		" +
        "                        <descriptor>" +
        documentDescription +
        "</descriptor>      		" +
        "                        <fileName>" +
        filename +
        "</fileName>                     		" +
        "                        <fileSelected>                                        		" +
        "                            <fileSize>" +
        reportSize +
        "</fileSize>               		" +
        "                        </fileSelected>                                       		" +
        "                        <fileSize >" +
        reportSize +
        "</fileSize>                  		" +
        "                        <filecontent>" +
        fileChunk +
        "</filecontent>              		" +
        "                    </item>                                                   		" +
        "                </Attachments>                                                		" +
        "        </ws:createSimpleDocument>                                            		" +
        "    </soapenv:Body>                                                           		" +
        "</soapenv:Envelope>                                                           		";

    //Convertendo para XML, para facilitar a manipulação
    var parser = new DOMParser();
    var xmlRequest = parser.parseFromString(soapRequest, "text/xml");

    //Enviando a requisição
    fluigAPI.Create({
        url: wsUrl,
        contentType: "text/xml",
        dataType: "xml",
        data: xmlRequest,
        success: function(data) {
            var xmlResp = parser.parseFromString(
                data.firstChild.innerHTML,
                "text/xml"
            );
            var documentId = xmlResp.getElementsByTagName("documentId")[0].innerHTML;
            popularArquivos(documentId, "divArquivoCompromisso");
            telaEspera.hide();
        },
        fail: function(data) {
            alert(
                "Erro para salvar o formulpario, favor entrar em contato com o Administrador!"
            );
            telaEspera.hide();
        },
    });
};

function salvarDocumento(campo, pastaPai, nomePasta) {
    var pasta = getPasta(pastaPai, nomePasta);
    UploadArquivo(campo, pasta);
}

function getPasta(pastaPai, nomePasta) {
    var pasta = existePasta(nomePasta, pastaPai);
    if (pasta == "") {
        pasta = createFolder(nomePasta, pastaPai);
    }
    return pasta;
}

function existePasta(description, parentId) {
    /*
      var existePasta = $.ajax({
        async : false,
        type : "GET",
        dataType : "json",
        url : '/api/public/ecm/document/listDocument/'+parentId+'?limit=5000',
        success : function(data){

        }});
      for(var i = 0; i < existePasta.responseJSON.content.length; i++){
        if(existePasta.responseJSON.content[i].description.substring(mask, existePasta.responseJSON.content[i].description.length) == description.substring(mask, description.length)) {
          return existePasta.responseJSON.content[i].id;
        }
      }
       */

    var constraint = [];

    if (description) {
        constraint.push(
            DatasetFactory.createConstraint(
                "DS_PRINCIPAL_DOCUMENTO",
                description,
                description,
                ConstraintType.MUST
            )
        );
    }

    if (parentId) {
        constraint.push(
            DatasetFactory.createConstraint(
                "PASTA_PAI",
                parentId,
                parentId,
                ConstraintType.MUST
            )
        );
    }

    var dataset = DatasetFactory.getDataset("sqlGetGED", null, constraint, null);

    if (dataset.values.length) {
        return dataset.values[0]["NR_DOCUMENTO"];
    }
    return "";
}

function getDocumentosProdutor(description, parentId) {
    var c1 = DatasetFactory.createConstraint(
        "filtro",
        description,
        description,
        ConstraintType.MUST
    );
    var dataset = DatasetFactory.getDataset("sqlGED", null, new Array(c1), null);

    if (dataset.values.length) {
        return dataset;
    }
    return "";
}

function createFolder(description, parentId) {
    var param = { description: description, parentId: parentId };
    var createFolder = $.ajax({
        async: false,
        contentType: "application/json",
        type: "post",
        dataType: "json",
        url: "/api/public/ecm/document/createFolder",
        data: JSON.stringify(param),
        success: function(data) {
            if (data.content.id != "") {} else {
                alert("Erro para criar a pasta");
                return "";
            }
            console.log(data);
        },
    });
    return createFolder.responseJSON.content.id;
}

function popularArquivos(parentId, div) {
    /*
      var existePasta = $.ajax({
        async : false,
        type : "GET",
        dataType : "json",
        url : '/api/public/ecm/document/listDocument/'+parentId,
        success : function(data){
          console.log(data);
          var campo = $("#" + div);			
          for(var i = 0; i < data.content.length; i++){
            var url = "https://fluig.sistemafaeg.org.br/portal/p/Faeg/ecmnavigation?app_ecm_navigation_doc=" + data.content[i]['parentId'];
            var button = "<button class='btn btn-default' title='Visualizar Informações' id='btnVisualizarEvento' onclick='window.open(\" " + url + " \")'><span class='fluigicon fluigicon-file-pdf fluigicon-md'></span></button>"; 	
            campo.append(button)
          }
        }});
       */

    var campo = $("#" + div);
    var url = "/portal/p/Faeg/ecmnavigation?app_ecm_navigation_doc=" + parentId;
    //var button = "<button class='btn btn-default' title='Visualizar Informações' id='btnVisualizarEvento' onclick='window.open(\" " + url + " \")'><span class='fluigicon fluigicon-file-pdf fluigicon-md'></span></button>";
    //campo.append(button);
    $("a#btnAttach")
        .attr({
            disabled: true,
            onclick: 'javascript:document.getElementById("documentoTermoCompromisso").click();',
        })
        .addClass("disabled");
    $("a#btnRemove")
        .attr({
            disabled: false,
            onclick: "javascript:removerArquivos(" + parentId + ', "' + div + '");',
        })
        .removeClass("disabled");
    $("a#btnView")
        .attr({
            disabled: false,
            onclick: 'javascript:window.open("' + url + '");',
        })
        .removeClass("disabled");
}

function removerArquivos(parentId, div) {
    var campo = $("#" + div);
    if (confirm("Deseja mesmo Remover?")) {
        $.ajax({
                url: top.WCMAPI.serverURL +
                    "/api/public/2.0/documents/deleteDocument/" +
                    parentId,
                crossDomain: true,
                type: "POST",
                async: false,
                contentType: "application/json",
                data: "",
            })
            .done(function(data) {
                console.log("data", data);

                enableUploadNewFile();
            })
            .fail(function(jqXHR, textStatus) {
                //console.log('jqXHR', jqXHR, 'textStatus', textStatus);
                alert(
                    "Erro ao remover o arquivo, favor entrar em contato com o Administrador!"
                );
                telaEspera.hide();
            });
    } else {
        alert("Remoção Cancelada!");
    }
}

function enableUploadNewFile() {
    $("a#btnAttach")
        .attr({
            disabled: false,
            onclick: 'javascript:document.getElementById("documentoTermoCompromisso").click();',
        })
        .removeClass("disabled");
    $("a#btnRemove").attr({ disabled: true, onclick: "" }).addClass("disabled");
    $("a#btnView").attr({ disabled: true, onclick: "" }).addClass("disabled");
}