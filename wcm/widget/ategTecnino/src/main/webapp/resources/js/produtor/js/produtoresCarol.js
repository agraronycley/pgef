var offset = 0;

/** Object of Register for the DataTable**/
var dataSource = new Object({
    mydata: new Array(),
    registerCarol: new Object(),
    filterCarol: new Object(),
    authorization: null,
});

this.parant = new Object({
    mdmname: "", //NOTE: Nome do Produtor
    mdmpersonid: "", //NOTE: CPF do Produtor
    mdmbirthday: "", //NOTE: Data de Nascimento do Produtor
});

function loadFiltersApi(cpf) {

    this.mdmmustList = new Array();
    this.mdmmustNotList = new Array();
    //NOTE: Inicialização dos Filtros para Api Carol
    this.filter = new Object({
        "mustList": [{
            "mdmFilterType": "TYPE_FILTER",
            "mdmValue": "personGolden"
        }, {
            "mdmFilterType": "NESTED_WILDCARD_FILTER",
            "mdmKey": "mdmGoldenFieldAndValues.relation.relationtype.raw",
            "mdmPath": "mdmGoldenFieldAndValues.relation",
            "mdmValue": "Produtor"
        }],
        "mustNotList": [{
            "mdmFilterType": "TERM_FILTER",
            "mdmKey": "mdmGoldenFieldAndValues.mdmname.raw",
            "mdmValue": ""
        }, {
            "mdmFilterType": "EXISTS_FILTER",
            "mdmKey": "mdmGoldenFieldAndValues.relation.relationtype"
        }, {
            "mdmFilterType": "TERM_FILTER",
            "mdmKey": "mdmGoldenFieldAndValues.mdmpersonid.raw",
            "mdmValue": ""
        }],
        "minimumShouldMatch": 1,
        "resolveRelationships": false,
        "excludeMergePending": false
    });

    this.mdmmustList.push({
        "mdmFilterType": "TERM_FILTER",
        "mdmKey": "mdmGoldenFieldAndValues.mdmpersonid.raw",
        "mdmPath": "mdmGoldenFieldAndValues.mdmpersonid",
        "mdmValue": cpf
    });

    if (this.mdmmustList.length > 0) {
        this.filter.mustList = this.filter.mustList.concat(this.mdmmustList);
    }
    if (this.mdmmustNotList.length > 0) {
        this.filter.mustNotList = this.filter.mustNotList.concat(this.mdmmustNotList);
    }
    this.parant = this.filter;
    if (this.parant != undefined && this.parant != null && this.parant != "" && Object.keys(this.parant).length > 0) {
        var myObj = JSON.stringify(this.parant);
        //var func_run = false;
        //var progressfilter = setInterval(function () {
        //if (!func_run) {
        //func_run = true
        loadOauthCarol();
        //}
        if (dataSource.authorization != null) {
            var options = new Object({
                url: 'https://senargo.carol.ai/api/v2/queries/filter?offset=' + offset + '&pageSize=100&sortOrder=ASC&indexType=MASTER',
                data: myObj,
                access_token: dataSource.authorization.access_token,
            });
            loadDataCarol(options);
            //func_run = false;
            //clearInterval(progressfilter);
        }
        //}, 100);
    }
}

function loadOauthCarol() {
    /** Object Oauth Carol **/
    var parantOauth = new Object({
        grant_type: 'password',
        username: 'suporte@senar-go.com.br',
        password: 'sd@#fg&',
        subdomain: 'senargo',
        applicationId: '0a0829172fc2433c9aa26460c31b78f0',
        connectorId: '0a0829172fc2433c9aa26460c31b78f0',
    });

    $.when(
        $.ajax({
            url: 'https://totvslabs.carol.ai/api/v2/oauth2/token',
            dataType: "json",
            type: 'POST',
            data: parantOauth,
            async: false
        }).done(function(data) {
            //console.log('data', data);
            return data;
        }).fail(function(jqXHR, textStatus) {
            //console.log('jqXHR', jqXHR, 'textStatus', textStatus);
            return textStatus;
        })
    ).then(function(data, textStatus, jqXHR) {
        //console.log('data', data, 'jqXHR', jqXHR, 'textStatus', textStatus);
        if (textStatus == 'success' && data != undefined && data != null) {
            dataSource.authorization = data;
            return true;
        } else {
            myUtils.byMessage.alertError("<h3>Comunicado Importante!</h3>", "Ocorreu um erro de autenticação na CAROL. Error:" + textStatus);
        }
    });
}

function loadDataCarol(request) {
    $.when(
        $.ajax({
            url: request.url,
            dataType: "json",
            type: 'POST',
            data: request.data,
            async: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', request.access_token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
        }).done(function(data) {
            return data;
        }).fail(function(jqXHR, textStatus) {
            return textStatus;
        })
    ).then(function(response, textStatus, jqXHR) {

        console.log('Registros:', response.hits, 'Qtd. Registros:', response.totalHits);

        if (response.totalHits > 0) {

            document.getElementById("cgc").value = (response.hits[0].mdmGoldenFieldAndValues.mdmpersonid == undefined ? "" : response.hits[0].mdmGoldenFieldAndValues.mdmpersonid);
            document.getElementById("nome").value = (response.hits[0].mdmGoldenFieldAndValues.mdmname == undefined ? "" : response.hits[0].mdmGoldenFieldAndValues.mdmname);
            document.getElementById("nomeSocial").value = (response.hits[0].mdmGoldenFieldAndValues.mdmname == undefined ? "" : response.hits[0].mdmGoldenFieldAndValues.mdmname);
            document.getElementById("dataNascimento").value = (response.hits[0].mdmGoldenFieldAndValues.mdmbirthday == undefined ? "" : response.hits[0].mdmGoldenFieldAndValues.mdmbirthday.substring(0, 10).split("-").reverse().join("/"));

            if (response.hits[0].mdmGoldenFieldAndValues.mdmbirthday == undefined) {
                $("#dataNascimento").prop("disabled", false);
            }

            if (!(response.hits["0"].mdmGoldenFieldAndValues.mdmaddress.length == 0)) {
                document.getElementById("cep").value = response.hits["0"].mdmGoldenFieldAndValues.mdmaddress["0"].mdmzipcode;
                ConsultaCep('cep');
            }

            document.getElementById("telefone").value = (response.hits["0"].mdmGoldenFieldAndValues.mdmphone.length == 0 ? "" : response.hits["0"].mdmGoldenFieldAndValues.mdmphone["0"].mdmphonenumber);

            if (!(response.hits["0"].mdmGoldenFieldAndValues.mdmphone.length == 0)) {
                if (response.hits["0"].mdmGoldenFieldAndValues.mdmphone.length > 1 && response.hits["0"].mdmGoldenFieldAndValues.mdmphone["0"].mdmphonenumber != response.hits["0"].mdmGoldenFieldAndValues.mdmphone["1"].mdmphonenumber) {
                    document.getElementById("celular").value = response.hits["0"].mdmGoldenFieldAndValues.mdmphone["1"].mdmphonenumber;
                }
            }

            if (response.hits["0"].mdmGoldenFieldAndValues.mdmemail.length > 0) {
                document.getElementById("email").value = response.hits["0"].mdmGoldenFieldAndValues.mdmemail["0"].mdmemailaddress;
            } else {
                document.getElementById("email").value = "";
            }

            document.getElementById("divBuscaPessoaFisica").style.display = "none";
            document.getElementById("divConsultaPessoaFisica").style.display = "none";
            document.getElementById("fsPessoa").style.display = "block";
            document.getElementById("tipoProcesso").value = "incluir";
            document.getElementById("codPessoa").value = "-1";
            document.getElementById("idImagem").value = "-1";
            document.getElementById("buscaPessoaFisica").value = "-1";

            $("#nome").attr("disabled", true);
            //$("#dataNascimento").attr("disabled", true);
            $("#dataNascimento").val() == "" || $("#dataNascimento").val() == null ? "" : CalculaIdade();
            $("#fsSolicitante").fadeOut();
            HabilitaBotaoSalvarProdutor();
            return true;
        } else {

            return false;
        }
    });
}