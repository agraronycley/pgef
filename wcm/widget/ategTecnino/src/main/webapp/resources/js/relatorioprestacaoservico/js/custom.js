var paginaPai = top.window['HelloWorld_' + top.$("#campoInstanceId").val()],
    _codigoPPessoa = null;

$(document).ready(function() {

    $('.btn').on('click', function() {
        //Atualiza botao e tela
        var myLoading = FLUIGC.loading(window);
        myLoading.show();
        var $this = $(this);
        $this.button('loading');
        var _processor = setInterval(function() {
            $this.button('reset');
            myLoading.hide();
            clearInterval(_processor);
        }, 500);

    });

    $("#dataRelatorio").on('change', function() {
        //PreencheDataPlanejamento();
    })

    $("#dataRelatorio").val(moment().format("YYYY-MM"));

    $("#btnImprimir").off().on("click", function() {
        //ImprimeRelatorioPopostaMensal();
        var dataRelatorio = $("#dataRelatorio").val();

        if (!dataRelatorio) {
            MensagemAlerta("Alerta", "Favor preencher a Data do Evento");
            return;
        }
        dataRelatorio = dataRelatorio.split("-").reverse().join("");

        //tiago - validação agendamentos do próximo mês
        //console.log("debug -- tiago -- antes chamada consultaAgendas dataRelatorio "+dataRelatorio);
        var agendaOk = consultaAgendas(dataRelatorio, paginaPai.codigoProfessor);

        //console.log("debug -- tiago -- agendaOk "+agendaOk.toString());
        if (agendaOk.values.length > 0) {
            var msgProdutores = ("\n* " + agendaOk.values.join('\n* '));
            FLUIGC.message.alert({
                title: 'Atenção!',
                message: 'Para gerar relatório do mês especificado, realize o agendamento de todas visitas deste técnico no mês subsequente!.' + msgProdutores,
                label: 'OK'
            }, function(el, ev) {

            });
            return;
        }

        //VERIFICA SE TODAS PROPRIEDADES DO FECHAMENTO TEM O TERMO DE COMPROMISSO ANEXADO
        //console.log("Inicio termoCompromisso "+moment().toString());
        //var termoCompromisso = verificaTermoCompromisso(paginaPai.codigoProfessor);

        myLoadingParam("Aguarde", "Verificando termos de compromisso..", 'verificaTermoCompromisso', paginaPai.codigoProfessor, true, false);
        //myLoadingParam("Aguarde", "Verificando termos de compromisso..", 'verificaTermoCompromissoRest', paginaPai.codigoProfessor, true, false);
        if ($("#termo").val() == "") {
            //MensagemAlerta("Alerta","Para gerar relatório do mês especificado, realize o agendamento de todas visitas deste técnico no mês subsequente!");
            return;
        }
        var idMov = consultaIdMov(dataRelatorio, paginaPai.codigoProfessor);
        if (!idMov) {
            MensagemAlerta("Alerta", "Não existe evento para esta data!");
            return;
        }
        //propriedadesSemVisita(paginaPai.codigoProfessor);

        myLoadingParam("Aguarde", "Carregando dados do relatório..", 'downloadRelatorio', idMov, true, false);

    })

    $(window).load(function() {
        PreencheDataPlanejamento();
        //Calendario();
    })

})


function consultaIdMov(dataRelatorio, codigoProfessor) {

    var retorno = '';

    var c1 = DatasetFactory.createConstraint('CODPROF', codigoProfessor, codigoProfessor, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('MMYYYY', dataRelatorio, dataRelatorio, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('CODTMV', '1.1.12', '1.1.12', ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('SERIE', 'OS', 'OS', ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('rmSql_FLUIG054', null, new Array(c1, c2, c3, c4), null);

    if (dataset.values.length > 0) {
        retorno = dataset.values[0]['IDMOV'];
    }

    return retorno;

}


function PreencheDataPlanejamento() {

    var dataRelatorio = $("#dataRelatorio").val();
    var ano = dataRelatorio.split("-")[0]
    var mes = dataRelatorio.split("-")[1]
    var mesExtenso = "";
    switch (mes) {
        case "01":
            mesExtenso = "Janeiro";
            break;
        case "02":
            mesExtenso = "Fevereiro";
            break;
        case "03":
            mesExtenso = "Março";
            break;
        case "04":
            mesExtenso = "Abril";
            break;
        case "05":
            mesExtenso = "Maio";
            break;
        case "06":
            mesExtenso = "Junho";
            break;
        case "07":
            mesExtenso = "Julho";
            break;
        case "08":
            mesExtenso = "Agosto";
            break;
        case "09":
            mesExtenso = "Setembro";
            break;
        case "10":
            mesExtenso = "Outubro";
            break;
        case "11":
            mesExtenso = "Novembro";
            break;
        case "12":
            mesExtenso = "Dezembro";
            break;
    }

    if (mesExtenso) {
        $("#dataPlanejamento").html(mesExtenso + " de " + ano);
    }
}


function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/*
 *  Tiago Camargos - Fluig
 *  28/01/2019
 *  Consulta se todas as visitas do mês seguinte já foram agendadas,
 *  impedindo que o técnico gere o relatório de prestação de serviços
 *  do mês, caso não tenha feito os agendamentos de todas propriedades vinculadas.
 */
function consultaAgendas(dataRelatorio, codigoProfessor) {
    var retorno = new Array();
    var prorpriedadeAgendada = new Array();
    var qtdVinculadasAtivasProfessor = 0;
    var qtdAgendadasMes = 0;
    var contratosAtivos = new Array();

    var dataRelatorio = $("#dataRelatorio").val();
    dataRelatorio = (dataRelatorio + '-01').split('-').join('/');
    var data = new Date(dataRelatorio);
    var dia = ((data.getDate() < 10) ? "0" : "") + data.getDate();
    var mes = ((data.getMonth() < 9) ? "0" : "") + (data.getMonth() + 1);
    var ano = (data.getFullYear()).toString();
    if (parseInt(mes) == 12) {
        data.setMonth(0);
        data.setFullYear(data.getFullYear() + 1);
    } else {
        data.setMonth(data.getMonth() + 1);
    }

    //validacao de contratos do professor/tecnico
    dataRelatorio = $("#dataRelatorio").val();
    /*
    var ardate = (dataRelatorio).split('-');
    var firstDate = new Date(ardate[0], ardate[1], 1);
    var lastDate = new Date(ardate[0], ardate[1], 0);
    var firstDay = ((firstDate.getDate() < 10) ? "0" : "") + firstDate.getDate();
    var lastDay = ((lastDate.getDate() < 10) ? "0" : "") + lastDate.getDate();
    var dtStart = `${dataRelatorio}-${firstDay}`;
    var dtFinish = `${dataRelatorio}-${lastDay}`;
    */
    var month = ((data.getMonth() < 9) ? "0" : "") + (data.getMonth() + 1);
    var year = (data.getFullYear()).toString();
    var lastDate = new Date(year, month, 0);
    var dtStart = `${year}-${month}-01`;
    var dtFinish = lastDate.toISOString().substr(0, 10);
    var constraint = new Array(
        DatasetFactory.createConstraint('CODPROF_TECNICO', codigoProfessor, codigoProfessor, ConstraintType.MUST),
        DatasetFactory.createConstraint('DTINICIAL', dtStart, dtStart, ConstraintType.MUST),
        DatasetFactory.createConstraint('DTFINAL', dtFinish, dtFinish, ConstraintType.MUST)
    );
    var dataset_ = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIGS0089', null, constraint, null);
    if (dataset_.values.length > 0) {
        for (var i = 0; i < dataset_.values.length; i++) {
            if ((dataset_.values[i].STATUS).toString() == "1") {
                contratosAtivos.push(dataset_.values[i].IDCONTRATO);
            }
        }
    }
    if (contratosAtivos.length > 0) {
        //quantidade de propriedades vinculadas ao professor/tecnico
        //let cst = DatasetFactory.createConstraint('CODIGO_DO_PROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST);
        //let cst2 = DatasetFactory.createConstraint('STATUS_PROPRIEDADE', "Ativo", "Ativo", ConstraintType.MUST);
        //var dataset = DatasetFactory.getDataset('rmSql_FLUIG046', null, new Array(cst, cst2), null);

        var isdata = ((data.toISOString()).substr(0, 10));
        var constraint_ = new Array(
            DatasetFactory.createConstraint('CODPROF_TECNICO', codigoProfessor, codigoProfessor, ConstraintType.MUST),
            DatasetFactory.createConstraint('DTFINAL', isdata, isdata, ConstraintType.MUST)
        );
        var dataset = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIGS0084', null, constraint_, null);
        if (dataset.values.length > 0) {
            qtdVinculadasAtivasProfessor = dataset.values.length;
        }
        //quantidade de propriedades agendadas no mês seguinte
        let DATA_INICIAL_EVENTO = isdata.split('-').join('');
        var constraint_2 = new Array(
            DatasetFactory.createConstraint('CODIGO_TECNICO_PROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST),
            DatasetFactory.createConstraint('DATA_INICIAL_EVENTO', DATA_INICIAL_EVENTO, DATA_INICIAL_EVENTO, ConstraintType.MUST)
        );
        var dataset2 = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIG048', null, constraint_2, null);
        if (dataset2.values.length > 0) {
            qtdAgendadasMes = dataset2.values.length;
            for (var i = 0; i < dataset2.values.length; i++) {
                prorpriedadeAgendada.push(dataset2.values[i].CODIGO_DA_PROPRIEDADE);
            }
        }
        if (qtdAgendadasMes < qtdVinculadasAtivasProfessor) {
            for (var x = 0; x < dataset.values.length; x++) {
                let record = dataset.values[x];
                if (prorpriedadeAgendada.indexOf(record.ID_PROPRIEDADE) === -1) {
                    let propriedadeProdutor = `Propriedade: ${record.NOME_PROPRIEDADE} - Produtor: ${record.NOME_PRODUTOR}`;
                    retorno.push(propriedadeProdutor);
                }
            }
            return new Object({ values: retorno });
        } else if (qtdAgendadasMes >= qtdVinculadasAtivasProfessor) {
            return new Object({ values: retorno });
        }
    }
    return new Object({ values: retorno });
}

//tiago fluig - 29/01/19
//função que busca se produtor tem termo de compromisso
function listarDocumentos(codAluno) {

    var c1 = DatasetFactory.createConstraint('CODIGOALUNOPESSOA', codAluno, codAluno, ConstraintType.MUST);
    var dataset_aluno = DatasetFactory.getDataset('rmSql_FLUIG0401', null, new Array(c1), null);

    if (dataset_aluno.values.length) {
        var cpf_aluno = dataset_aluno.values[0].CPF;
        var nome_aluno = dataset_aluno.values[0].NOMEALUNO;
    }
    //console.log(" debug - tiago - CPF + NOME: "+cpf_aluno + " - " + nome_aluno)

    var produtor = cpf_aluno + " - " + nome_aluno;
    var parentId = "";

    //console.log(produtor);

    return produtor
}

function getDocumentosProdutor(description) {

    var c1 = DatasetFactory.createConstraint('filtro', description, description, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('sqlGED', null, new Array(c1), null);

    if (dataset.values.length) {
        return dataset;
    }
    return "";

}

function getDocumentosProdutor2(description) {

    var c1 = DatasetFactory.createConstraint('filtro', description, description, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('sqlGED_2', null, new Array(c1), null);

    if (dataset.values.length) {
        return dataset;
    }
    return "";

}


function verificaTermoCompromisso(codigoProfessor) {

    //console.log("debug - tiago - verificaTermoCompromisso")

    var constraints = [];
    var termoCompromisso = "";
    var aProdutor = new Array();
    var produtor = "";
    constraints.push(DatasetFactory.createConstraint('CODIGO_TECNICO_PROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST));

    var dataRelatorio = $("#dataRelatorio").val();
    dataRelatorio = dataRelatorio.split('-').join("");
    var DATA_INICIAL_EVENTO = dataRelatorio + "01";
    constraints.push(DatasetFactory.createConstraint('DATA_INICIAL_EVENTO', DATA_INICIAL_EVENTO, DATA_INICIAL_EVENTO, ConstraintType.MUST));

    var dataset = DatasetFactory.getDataset('rmSql_FLUIG48_4', null, constraints, null);
    if (dataset.values.length > 0) {
        for (var i = 0; i < dataset.values.length; i++) {

            var CODIGO_PRODUTOR = dataset.values[i].CODIGO_PRODUTOR;
            var CODIGO_DA_PROPRIEDADE = dataset.values[i].CODIGO_DA_PROPRIEDADE;
            var NOME_PRODUTOR = dataset.values[i].NOME_PRODUTOR;
            var ULTIMAVISITA = dataset.values[i].ULTIMAVISITA;
            if (ULTIMAVISITA == '') {
                var produtorVisita = listarDocumentos(CODIGO_PRODUTOR);
                var pastaProdutorVisita = getDocumentosProdutor(produtorVisita);
                if (pastaProdutorVisita != "") {
                    var dataset = pastaProdutorVisita;
                    for (var i = 0; i < dataset.values.length; i++) {
                        if (dataset.values[i]['PASTA_NOME'] == 'Termo de Compromisso') {
                            var termoCompromissoSemVisita = dataset.values[i]['ARQUIVO_NR_PRINCIPAL'];
                            //console.log("termoCompromissoSemVisita "+termoCompromissoSemVisita);
                        }
                    }
                }
            }
            //console.log("CODIGO_PRODUTOR --> "+CODIGO_PRODUTOR);
            //produtor =  listarDocumentos(CODIGO_PRODUTOR);
            aProdutor.push({ 'CODIGO_PRODUTOR': CODIGO_PRODUTOR, 'CODIGO_DA_PROPRIEDADE': CODIGO_DA_PROPRIEDADE, 'NOME_PRODUTOR': NOME_PRODUTOR, 'ULTIMAVISITA': ULTIMAVISITA });

            //console.log("termoCompromissoSemVisita --> " + termoCompromissoSemVisita);
            if (termoCompromissoSemVisita == "" || termoCompromissoSemVisita == 'null') {
                MensagemAlerta("Alerta", `Ainda não há visitas para a propriedade ${CODIGO_DA_PROPRIEDADE}, Código Produtor ${CODIGO_PRODUTOR}, Produtor ${NOME_PRODUTOR}.  Não há termo de compromisso anexado, porém o relatório será gerado normalmente!!`);
                //console.log("continue");
                continue;
            }
        }

    }
    var param = "";
    for (var x = 0; x < aProdutor.length; x++) {
        param += "'" + aProdutor[x].CODIGO_PRODUTOR + "',";
    }

    param = param.substring(0, param.length - 1);
    //console.log(param);
    var pastaProdutor = getDocumentosProdutor2(param);
    if (pastaProdutor != "") {
        var dataset = pastaProdutor;
        for (var i = 0; i < dataset.values.length; i++) {
            //if(dataset.values[i]['ARQUIVO_NR_PRINCIPAL'] != 'null' && dataset.values[i]['ARQUIVO_NR_PRINCIPAL'] != ''){
            if (dataset.values[i]['PASTA_NOME'] == 'Termo de Compromisso') {
                termoCompromisso = dataset.values[i]['ARQUIVO_NR_PRINCIPAL'];
                //console.log("termoCompromisso " + termoCompromisso);
                if (termoCompromisso == "" || termoCompromisso == 'null') {
                    for (var a = 0; a < aProdutor.length; a++) {
                        //console.log("aProdutor[a].CODIGO_PRODUTOR --> " + aProdutor[a].CODIGO_PRODUTOR);
                        //console.log("dataset.values[i]['CODIGOPESSOA'] --> " + dataset.values[i]['CODIGOPESSOA']);
                        if (aProdutor[a].CODIGO_PRODUTOR == dataset.values[i]['CODIGOPESSOA'] &&
                            (aProdutor[a].ULTIMAVISITA != '' && aProdutor[a].ULTIMAVISITA != 'null')) {
                            var PROPRIEDADE = aProdutor[a].CODIGO_DA_PROPRIEDADE;
                            var CODPRODUTOR = aProdutor[a].CODIGO_PRODUTOR;
                            var NOMEPRODUTOR = aProdutor[a].NOME_PRODUTOR;
                            MensagemAlerta("Alerta", `Propriedade ${PROPRIEDADE}, Código Produtor ${CODPRODUTOR}, Produtor ${NOMEPRODUTOR} não tem o termo de compromisso anexado, não é possível realizar a prestação de contas!`);
                            $("#termo").val(termoCompromisso);
                            return termoCompromisso
                        }
                    }
                }
            }
            //}
        }
    }
    //console.log("Fim termoCompromisso " + moment().toString());

    $("#termo").val('0');
    return $("#termo").val();

}