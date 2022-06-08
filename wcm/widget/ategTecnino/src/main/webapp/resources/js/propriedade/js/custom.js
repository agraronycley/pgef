//console.log("custom.js");

var telaEspera = FLUIGC.loading(window);
var $propriedadeRural = null;
/**
 * Calcula a idade conforme a Data de Nascimento
 */

var paginaPai = top.window["HelloWorld_" + top.$("#campoInstanceId").val()],
    _codigoPPessoa = null;

//Jean --- 16/07/2019 ----
function corPosIni() {
    if ($(".modal-body").scrollTop() > 0 && $(".modal-body").scrollTop() != undefined) {
        $(".modal-body").scrollTop(0);
        ////console.log('corPosIni() -> ' + 	 $('.modal-body').scrollTop() );
    } else if ($(".modal-body").scrollTop() == undefined) {
        ////console.log('corPosIni() -> ' + $('.modal-body').scrollTop() );
    }
}

function validaCoordendas() {
    if (document.getElementById("query").value != "" && document.getElementById("query").value != undefined && document.getElementById("query").value != null) {
        $("#btnSalvarDadosPropriedade").prop("disabled", false);
        ////console.log('validaCoordendas() -> True');
    } else {
        var zipCodeByPass = new Array('38.610-000');
        var zipCode = document.getElementById("cep").value
        if (zipCodeByPass.indexOf(zipCode) === -1) {
            $("#btnSalvarDadosPropriedade").prop("disabled", true);
        }
        ////console.log('validaCoordendas() -> False');
    }
}

function fndesablitaQueryFields() {
    $("#query").prop("readonly", true);
    $("#btnConsultar").prop("disabled", true);
    ////console.log( 'fndesablitaQueryFields() -> Desablita');
}

function fnhablitaQueryFields() {
    $("#query").prop("readonly", false);
    $("#btnConsultar").prop("disabled", false);
    ////console.log('fnhablitaQueryFields()-> Habilita');
}

//Jean --- 16/07/2019 ----end functions declarations --- :)
function CalculaIdade() {
    var dataNascimento = document.getElementById("dataNascimento").value;
    if (dataNascimento == "") {
        return "";
    }
    var idade = document.getElementById("idade");
    var d = new Date();
    var anoAtual = d.getFullYear();
    var mesAtual = d.getMonth() + 1;
    var diaAtual = d.getDate();
    var diaAniversario = dataNascimento.substring(0, 2);
    var mesAniversario = dataNascimento.substring(3, 5);
    var anoAniversario = dataNascimento.substring(6, 10);
    idade.value = anoAtual - anoAniversario;
    if (mesAtual < mesAniversario || (mesAtual == mesAniversario && diaAtual < diaAniversario)) {
        idade.value--;
    }
    if (idade.value < 0) {
        idade.value = 0;
    }
}

/**
 *	Função para validar os campos
 */
function Consulta() {
    var nome = $("#nomePessoaFisica").val();
    var cpfCnpj = $("#cpfPessoaFisica").val();
    if (cpfCnpj == "___.___.___-__" || cpfCnpj == "__.___.___/____-__" || cpfCnpj == "   .   .   -  " || cpfCnpj == "  .   .   /    -  ") {
        cpfCnpj = "";
    }
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, "");
    var filter = "nome," + nome + ",cpf," + cpfCnpj;
    if (filter != "nome,,cpf,") {
        //console.log('Entrou no Filter');
        var c1 = DatasetFactory.createConstraint("nome", nome, nome, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("cpf", cpfCnpj, cpfCnpj, ConstraintType.MUST);
        var constraints = new Array(c1, c2);
        var quant = DatasetFactory.getDataset("rm_ppessoa_senar", null, constraints, null);
        //console.log('quant.values.length: ' +quant.values.length);
        //console.log('filter: ' +filter);
        if (quant.values.length > 0) {
            reloadZoomFilterValues("buscaPessoaFisica", filter);
            document.getElementById("divBuscaPessoaFisica").style.display = "block";
        } else {
            MensagemNaoEncontrado("Atenção!", "Registro não encontrado.", 2);
        }
    }
}

function ConsultaPropriedade() {
    var nome = $("#nomePropriedade").val();
    var cpfCnpj = $("#cpfCnpj").val();
    if (cpfCnpj == "___.___.___-__" || cpfCnpj == "__.___.___/____-__" || cpfCnpj == "   .   .   -  " || cpfCnpj == "  .   .   /    -  ") {
        cpfCnpj = "";
    }
    var filter = "NOME," + nome + ",CGCCFO," + cpfCnpj;
    if (filter != "NOME,,CGCCFO,") {
        var c1 = DatasetFactory.createConstraint("NOME", nome, nome, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("CPFCNPJ", cpfCnpj, cpfCnpj, ConstraintType.MUST);
        var constraints = new Array(c1, c2);
        var quant = DatasetFactory.getDataset("rm_fincfodatabr_readviewauth_prodrural", null, constraints, null);
        if (quant.values.length > 0) {
            reloadZoomFilterValues("buscaProdutorRural", filter);
            document.getElementById("divBuscaProdutorRural").style.display = "block";
        } else {
            MensagemNaoEncontrado();
        }
    }
}

/**
 * Novas Funções
 */
$(document).ready(function() {
    loadDefault();

    $("#divDadosPropriedade, #divGoogleMaps").hide();
    $(window).load(function() {
        InicioMenuPropriedade();
        var onlyDate = FLUIGC.calendar("#divDataNascimentoPessoaFisica, #divDataNascimento", { pickDate: true, pickTime: false, });
        $("#formPropriedadeRural").fadeIn();
        /*
        var _processor = setInterval(function(){ 
            EditarPropriedade();
            clearInterval(_processor);
        }, 2000);
         */
        setTimeout(function() {
            EditarPropriedade();
            myLoading("Aguarde", "Verificando se existe(m) arquivo(s) anexado(s) para o produtor..", "listarDocumentos", true, true);
            //listarDocumentos();
        }, 2000);
        setTimeout(function() {
            if (paginaPai != undefined) {
                var codPressorInstrutor = paginaPai.codigoProfessor;
                reloadZoomFilterValues("in_buscaAluno", "CODIGOPROF," + codPressorInstrutor);
            }
        }, 2000);
        FLUIGC.switcher.init("#editarMapa");
        FLUIGC.switcher.setTrue("#editarMapa");
        FLUIGC.switcher.onChange("#editarMapa", function(event, state) {
            if (state === true) {
                return fnhablitaQueryFields();
            } else if (state !== true) {
                return fndesablitaQueryFields();
            }
        });
    });
    $("#divZoomPropriedadeRural").hide();
    //var scrollInicio = document.getElementById('formPropriedadeRural');
    ////console.log('Corrigir posicao inicial modal --- content --- teste ');
    //$(".modal-body").scrollTop(0); // Jean -- 10/07/2019 -- Corrigir posicao inicial modal --- solved --
    //$('.modal-body').animate({ scrollTop: 0 }, 300);
    //$("#query").prop("readonly", true);
    //$("#btnConsultar").prop("readonly", true);
    $("#btnSalvarDadosPropriedade").attr("onmouseover", "validaCoordendas();");
    corPosIni();
    //scrollInicio.scrollIntoView();

    $("#btnNovaPropriedade").off().on("click", function() {
        /** Regra de limitação de Inclusão de 30 produtores ativos **/
        var cad_PropRural = new Array();
        this.cts = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
        this.cts2 = DatasetFactory.createConstraint("CODPESSOA", document.getElementById("codPPessoa").value, document.getElementById("codPPessoa").value, ConstraintType.MUST);
        this.cts3 = DatasetFactory.createConstraint("IDPROPRIEDADE", document.getElementById("idPropriedade").value, document.getElementById("idPropriedade").value, ConstraintType.MUST);
        var dsProfProdPropRural = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(this.cts, this.cts2, this.cts3), null);
        if (dsProfProdPropRural.values.length == 0) {
            cad_PropRural.push(document.getElementById("idPropriedade").value);
        }
        /** Regra de limitação de Inclusão de 30 produtores ativos **/
        var c1 = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
        var dataset = DatasetFactory.getDataset("rm_wsConsulta_FluigS0053", null, new Array(c1), null);
        if (dataset.values.length >= 30 && cad_PropRural.length > 0) {
            FLUIGC.message.alert({
                message: "O número de produtores excedeu o limite (30).",
                title: "Atenção!",
                label: "OK",
            }, function(el, ev) {
                //Callback action executed by the user...
                //el: Element (button) clicked...
                //ev: Event triggered...
            });
        } else {
            novaPropriedade();
        }
    });
    $("#statusPropriedade").off().on("change", function() {
        //const statusPropriedade = document.querySelector('[data-button-name="btnAdicionarHistorico"]');

        if (this.value == "2" || this.value == "3") {
            $("#divDataDesistencia, #divJustificativaStatus").show();
            /*
            const hasHistoricoAtegToBeIncluded = getHistoricoAtegToBeIncluded();
            if (!hasHistoricoAtegToBeIncluded) {
                statusPropriedade.style.display = "block";
            }
            */
        } else {
            $("#divDataDesistencia, #divJustificativaStatus").hide();
            $("#dataDesistencia, #justificativaStatus").val("");
            //statusPropriedade.style.display = "none";
        }
    });
    $("#cadeiaProdutiva").off().on("change", function() {
        if (this.value == "5" || this.value == "6" || this.value == "9") {
            //if(top.WCMAPI.userEmail == "teste_ateg_tecnico_2@ateg.com.br"){
            $("#fsAreas").show();
            //}
        } else {
            $("#fsAreas").hide();
        }
    });
    //if(top.WCMAPI.userEmail == "teste_ateg_tecnico_2@ateg.com.br"){
    $("#fsAreas").show();
    //}
    $("#btnAdicionarArea").off().on("click", function() {
        janelaArea(null);
    });
    populaSelec("rm_zmd_cadeia_produtiva_readview", "cadeiaProdutiva", "CODIGO", "DESCRICAO");
    populaSelec("rm_ZMDPROJETOPROGRAMA_readview", "projetoPrograma", "CODIGO", "DESCRIÇÃO");
    populaSelec("rm_ZMDSTATUSPROPRIEDADE_readview", "statusPropriedade", "CODIGO", "DESCRICAO");
    $("#documentoTermoCompromisso").off().on("change", function() {
        if (this.files.length == 0) {
            return false;
        }
        if (this.files[0].name.substring(this.files[0].name.lastIndexOf(".") + 1, this.files[0].name.length) != "pdf") {
            this.value = "";
            MensagemAlerta("Atenção", "O formato do arquivo deve ser .PDF!");
            return false;
        }
        if (this.files[0].size / 1024 > 2000) {
            this.value = "";
            MensagemAlerta("Atenção", "O tamanho do arquivo deve ser de até 2MB (2 Megabytes)!");
            return false;
        }
        telaEspera.show();
        var produtor = $("#cfpProdutor").val() + " - " + $("#in_buscaAluno").val();
        var pastaProdutor = getPasta("272262", produtor);
        salvarDocumento(this, pastaProdutor, "Termo de Compromisso");
    });
    /*
    $("#documentoTermoDesistencia").off().on("change", function() {
        if (this.files.length == 0) {
            return false;
        }
        if (this.files[0].name.substring(this.files[0].name.lastIndexOf(".") + 1, this.files[0].name.length) != "pdf") {
            this.value = "";
            MensagemAlerta("Atenção", "O formato do arquivo deve ser .PDF!");
            return false;
        }
        if ((this.files[0].size / 1024) > 2000) {
            this.value = "";
            MensagemAlerta("Atenção", "O tamanho do arquivo deve ser de até 2MB (2 Megabytes)!");
            return false;
        }
        telaEspera.show();
        var produtor = $("#cfpProdutor").val() + " - " + $("#in_buscaAluno").val();
        var pastaProdutor = getPasta("272262", produtor);
        salvarDocumento(this, pastaProdutor, "Termo de Desistência");
    });
    */
});

var modalArea;

function janelaArea(id) {
    //trata o bug de abrir varias vezes
    if (modalArea != undefined && modalArea.isOpen()) {
        return;
    }
    var content = '<div class="panel panel-default">';
    content += '<div class="panel-heading"><h3 class="panel-title">Dados da Área</h3></div>';
    content += '<div class="panel-body"><fieldset id="fsSolicitante">';
    content += '<div class="form-group fs-clearfix">';
    content += '<div class="col-sm-2 col-xs-12"><label for="idArea">ID</label>';
    content += '<input type="text" class="form-control" name="idArea" id="idArea" value="" disabled></div>';
    content += '<div class="col-sm-10 col-xs-12"><label for="nomePropriedade">Nome</label>';
    content += '<input type="text" class="form-control" name="nomePropriedade" id="nomePropriedade" placeholder="Ex: Área 1"></div>';
    content += '</div><div class="form-group fs-clearfix">';
    content += '<div class="col-sm-6 col-xs-12"><label for="latitudePropriedade">Latitude</label>';
    content += '<input type="number" class="form-control" name="latitudePropriedade" id="latitudePropriedade" placeholder="Ex: -16,690663"></div>';
    content += '<div class="col-sm-6 col-xs-12"><label for="longitudePropriedade">Longitude</label>';
    content += '<input type="number" class="form-control" name="longitudePropriedade" id="longitudePropriedade" placeholder="Ex: -49,260707"></div>';
    content += '</div></fieldset>';
    content += '</div></div>';
    if (id == null) {
        var botoes = [{
            label: "Adicionar",
            classType: "btnAlterar",
            bind: "data-modal-alterar",
        }, {
            label: "Cancelar",
            autoClose: true,
        }];
    } else if (id != null && $("#" + id)["0"].children["0"].textContent == "-1") {
        var botoes = [{
            /*'label': 'Excluir',
            'classType': 'btnExcluir',
            'bind': 'data-modal-excluir',
            'autoClose': true
        }, {*/
            label: "Alterar",
            classType: "btnAlterar",
            bind: "data-modal-alterar",
        }, {
            label: "Cancelar",
            autoClose: true,
        }];
    } else {
        var botoes = [{
            /*'label': 'Excluir',
            'classType': 'btnExcluir',
            'bind': 'data-modal-excluir',
            'autoClose': true
        }, {*/
            label: "Alterar",
            classType: "btnAlterar",
            bind: "data-modal-alterar",
        }, {
            label: "Cancelar",
            autoClose: true,
        }];
    }
    modalArea = FLUIGC.modal({
        title: id == null ? "Adicionar Área" : "Editar Área",
        content: content,
        id: "fluig-produtor",
        size: "full",
        formModal: true,
        actions: botoes,
    }, function() {
        if (id == null) {
            $("#idArea").val("-1");
            id = ($("#tabelaAreas tbody").find("tr").length + 1).toString() + "_" + new Date().getTime().toString();
        } else {
            $("#idArea").val($("#" + id)["0"].children["0"].textContent);
            $("#nomePropriedade").val($("#" + id)["0"].children["1"].textContent);
            $("#latitudePropriedade").val($("#" + id)["0"].children["2"].textContent);
            $("#longitudePropriedade").val($("#" + id)["0"].children["3"].textContent);
        }
        $(".btnAlterar").on("click", function(e) {
            e.preventDefault();
            var isOK = true;
            if (!$("#nomePropriedade").val()) {
                return FLUIGC.toast({
                    message: "Favor preencher o campo Nome",
                    type: "info",
                });
                isOK = false;
            } else if (!$("#latitudePropriedade").val()) {
                return FLUIGC.toast({
                    message: "Favor preencher o campo Latitude",
                    type: "info",
                });
                isOK = false;
            } else if (!$("#longitudePropriedade").val()) {
                return FLUIGC.toast({
                    message: "Favor preencher o campo Longitude",
                    type: "info",
                });
                isOK = false;
            }
            var linha = document.getElementById(id);
            if (linha == null) {
                adicionarLinhaTabelaArea(id, $("#idArea").val(), $("#nomePropriedade").val(), $("#latitudePropriedade").val(), $("#longitudePropriedade").val());
            } else {
                $(`#${id}`)["0"].children["0"].textContent = $("#idArea").val();
                $(`#${id}`)["0"].children["1"].textContent = $("#nomePropriedade").val();
                $(`#${id}`)["0"].children["2"].textContent = $("#latitudePropriedade").val();
                $(`#${id}`)["0"].children["3"].textContent = $("#longitudePropriedade").val();
            }
            if (isOK) {
                modalArea.remove();
            }
        });
        $(".btnExcluir").on("click", function(e) {
            /* 
            var nomeTecnico = $("#" + id)["0"].children[2].textContent
            var idVinculuSuperiorTecnico = $("#" + id)["0"].children[0].textContent;
            var idDelete = idVinculuSuperiorTecnico + "$_$" + $("#codigoSupervisor").val() + "$_$2$_$" + nomeTecnico + "$_$3";
            if ($("#idEditar").val() == "-1") {
                FLUIGC.message.confirm({
                    message: 'O técnico ' + nomeTecnico + ' ainda não foi vinculado ao Supervisor. Deseja remover!?',
                    title: 'Atenção',
                    labelYes: 'Sim',
                    labelNo: 'Não'
                }, function(result, el, ev) {
                    if (result) {
                        $("#" + id).remove();
                        FLUIGC.toast({
                            message: "Técnico " + nomeTecnico + " removido com sucesso da lista de vinculo.",
                            type: 'info'
                        });
                    } else {
                        FLUIGC.toast({
                            message: "Técnico " + nomeTecnico + " não foi removido da lista de vinculo.",
                            type: 'info'
                        });
                    }
                });
            } else {
                FLUIGC.message.confirm({
                    message: 'O técnico ' + nomeTecnico + ' será desvinculado ao Supervisor. Deseja continuar!?',
                    title: 'Atenção',
                    labelYes: 'Sim',
                    labelNo: 'Não'
                }, function(result, el, ev) {
                    if (result) {
                        //"6$_$4136$_$2$_$3264$_$3"
                        var dataset = ConsultaRestRM("RestRM", "/rmsrestdataserver/rest/RMSPRJ4746240SERVER/" + idDelete, "delete");
                        if (dataset.length == 0) {
                            FLUIGC.toast({
                                title: 'Erro para excluir o tecnico ' + nomeTecnico + ':',
                                message: dataset.messages[0].detail,
                                type: 'info'
                            });
                        } else {
                            $("#" + id).remove();
                            FLUIGC.toast({
                                message: "Técnico " + nomeTecnico + " desvinculado com sucesso.",
                                type: 'info'
                            });
                        }
                    } else {
                        FLUIGC.toast({
                            message: "Técnico " + nomeTecnico + " não foi desvinculado.",
                            type: 'info'
                        });
                    }
                });
            }
            */
        });
    });
}

function adicionarLinhaTabelaArea(id, idArea, nome, latitude, longitude) {
    var html = `<tr id="${id}">`;
    html += `<td>${idArea}</td>`;
    html += `<td>${nome}</td>`;
    html += `<td>${latitude}</td>`;
    html += `<td>${longitude}</td>`;
    html += `<td><button class="btn btn-default" title="Editar área" id="btn_${id}">`;
    html += `<span class='fluigicon fluigicon-pen fluigicon-md'></span>`;
    html += `</button></td>`;
    html += `</tr>`;
    $("#tabelaAreas tbody").append(html);
    $(`#btn_${id}`).on("click", function() {
        janelaArea(id);
    });
}

function populaSelec(recurso, inputSelect, valueSelect, textSelect) {
    var dataset = DatasetFactory.getDataset(recurso, null, null, null);
    var option;
    var select = document.getElementById(inputSelect);
    if (dataset.values.length > 0) {
        for (var i = 0; i < dataset.values.length; i++) {
            option = document.createElement("option");
            option.value = dataset.values[i][valueSelect];
            option.text = dataset.values[i][textSelect];
            select.appendChild(option);
        }
    }
}

//Jean - Validar  se data de desistencia é menor que a data de inclusão
function fnValidarDataDesistencia() {
    if ($("#statusPropriedade").val() != 1) {
        if ($("#dataInclusao").val() != null && $("#dataInclusao").val() != undefined && $("#dataInclusao").val() != "") {
            if ($("#dataDesistencia").val() != null && $("#dataDesistencia").val() != undefined && $("#dataDesistencia").val() != "") {
                if ($("#dataInclusao").val() < $("#dataDesistencia").val()) {
                    //console.log('fnValidarDataDesistencia() -> OK' );
                    return true;
                } else if ($("#dataInclusao").val() > $("#dataDesistencia").val()) {
                    //console.log('fnValidarDataDesistencia() -> NOT OK' );
                    return false;
                }
            }
        }
    } else if ($("#statusPropriedade").val() == 1) {
        return true;
    }
}

function InicioMenuPropriedade() {
    //Desmarcar campos ao clicar em nenhum
    $("#nenhumTransporte").on("click", function() {
        $("#bicicleta, #carro, #moto, #onibus, #outros").prop("checked", false);
        $("#outroMeioTransporte").val("");
        $("#divOutroMeioTransporte").fadeOut();
    });
    //Checkbox de meio de transporte
    $("#bicicleta, #carro, #moto, #onibus, #outros").on("click", function() {
        //Quando algum check foi marcado, desmarca o nenhum
        if ($(this).prop("checked")) {
            $("#nenhumTransporte").prop("checked", false);
        }
        //Valida o campo outros
        if (this.id == "outros") {
            if ($(this).prop("checked")) {
                $("#divOutroMeioTransporte").fadeIn();
            } else {
                $("#outroMeioTransporte").val("");
                $("#divOutroMeioTransporte").fadeOut();
            }
        }
    });
    $("#btnSalvarDadosPropriedade").on("click", function() {
        //jean -- chamando function validar data desistencia ---
        if (fnValidarDataDesistencia()) {
            myLoading("Aguarde", "Salvando dados da propriedade rural..", "salvarDados", false, true);
        } else if (!fnValidarDataDesistencia()) {
            alert("A data de desistência é menor que a data de inclusão.");
            return false;
        }
    });
    $("#cep").mask("99.999-999");
    //$("#telefone").mask("(99)9999-9999");
    $("#inscricaoEstadual").mask("99.999.999-9");
    $("#produtorRuralDesde").mask("9999");
    $("#fsPessoa").fadeIn();
    $("#btnSalvarDadosPropriedade").fadeIn();
    $("#idPropriedade").val("-1");
    $("#idTecnicoPropriedade").val("-1");
}

function RecarregarPaginaPai() {
    var hello = top.window["HelloWorld_" + top.$("#campoInstanceId").val()];
    if (!!hello && !!hello.hasOwnProperty("loadTable")) {
        hello.loadTable();
    }
}

/**
 * Verifica se é edição de propriedade
 */
function EditarPropriedade() {
    var paramSite = window.location.href.split("=");
    if (paramSite.length > 1) {
        var idPropriedade = getParameter("idPropriedade");
        paginaPai = getProfTecnico(idPropriedade);
        ConsultaDadosPropriedade(idPropriedade);
        ConsultaDadosTecnicoPropriedade(idPropriedade);
        /*
        var mode = getParameter('mode');
        if(mode != undefined){
            if(mode == 'view'){
                DesabilitaCampos();
                $("#btnSalvarDadosPropriedade").attr("disabled",true).fadeOut();
            }
        }
        */
        /*
        ConsultaDadosTecnicoPropriedade(idPropriedade);
        if(paginaPai == undefined){
            paginaPai = {
                    codigoProfessor :  getParameter('codProfessor'),
                    codPessoa : getParameter('codPessoa')
            }
        }
         */
    }
}

function getProfTecnico(idPropriedade) {
    var profTecnico = new Object({ codigoProfessor: "", codPessoa: "", codigoPPessoa: "" });
    profTecnico.codigoProfessor = getTecnicoPropRural(idPropriedade);
    var i = 0;
    if (profTecnico.codigoProfessor != "") {
        var cts = DatasetFactory.createConstraint("CODPROF", profTecnico.codigoProfessor, profTecnico.codigoProfessor, ConstraintType.MUST);
        var ds_eduProfessor = DatasetFactory.getDataset("rm_eduprofessordata_readview", null, new Array(cts), null);
        if (ds_eduProfessor.values != undefined && ds_eduProfessor.values.length > 0) {
            var records = ds_eduProfessor.values[i];
            profTecnico.codPessoa = records.CODPESSOA;
            profTecnico.codigoPPessoa = records.CODPESSOA;
        }
    }
    return profTecnico;
}

function listarDocumentos() {
    var produtor = $("#cfpProdutor").val() + " - " + $("#in_buscaAluno").val();
    var pastaProdutor = getDocumentosProdutor(produtor, "272262");
    if (pastaProdutor != "") {
        /*
        var pastaCompromisso = existePasta("Termo de Compromisso", dataset.values[0]['PASTA_NR_PRINCIPAL'], 0);
        var pastaDesistencia = existePasta("Termo de Desistência", pastaProdutor, 0);
        if(pastaCompromisso != ""){
            popularArquivos(pastaCompromisso, "divArquivoCompromisso");				
        }
        if(pastaDesistencia != ""){
            popularArquivos(pastaCompromisso, "divArquivoDesistencia");
        }
         */
        var dataset = pastaProdutor;
        for (var i = 0; i < dataset.values.length; i++) {
            if (dataset.values[i]["ARQUIVO_NR_PRINCIPAL"] != "null" && dataset.values[i]["ARQUIVO_NR_PRINCIPAL"] != "") {
                if (dataset.values[i]["PASTA_NOME"] == "Termo de Compromisso") {
                    popularArquivos(
                        dataset.values[i]["ARQUIVO_NR_PRINCIPAL"],
                        "divArquivoCompromisso"
                    );
                    /*
                } else if(dataset.values[i]['PASTA_NOME'] == 'Termo de Desistência'){
                    popularArquivos(dataset.values[i]['ARQUIVO_NR_PRINCIPAL'], "divArquivoDesistencia");
                */
                }
            }
        }
    }
}

function getParameter(paramName) {
    var searchString = window.location.search.substring(1),
        i, val, params = searchString.split("&");
    for (i = 0; i < params.length; i++) {
        val = params[i].split("=");
        if (val[0] == paramName) {
            return val[1];
        }
    }
    return null;
}

function ConsultaDadosPropriedade(idPropriedade) {
    var c1 = DatasetFactory.createConstraint("ID", idPropriedade, idPropriedade, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_zmdproprirural_readview", null, new Array(c1), null);
    if (dataset.values.length > 0) {
        /*
        $("#idPropriedade").val(dataset.values[0]["ID"]);    
        $("#codPPessoa").val(dataset.values[0]["CODPESSOA"]);  
        $("#nomePropriedadeRural").val(dataset.values[0]["NOME"]);
        $("#tipoPropriedade").val(dataset.values[0]["TIPOPROPRIEDADE"]);     
        $("#nirf").val(dataset.values[0]["NIRF"]);                
        $("#ccir").val(dataset.values[0]["CCIR"]);                
        $("#dap").val(dataset.values[0]["DAP"]);                 
        $("#areaTotal").val(dataset.values[0]["AREA"]);
        dataset.values[0]["CARRO"] == 'Sim' ? $("#carro").prop("checked",true) : $("#carro").prop("checked",false);
        dataset.values[0]["MOTO"] == 'Sim' ? $("#moto").prop("checked",true) : $("#moto").prop("checked",false);
        dataset.values[0]["BICICLETA"] == 'Sim' ? $("#bicicleta").prop("checked",true) : $("#bicicleta").prop("checked",false);
        dataset.values[0]["ONIBUS"] == 'Sim' ? $("#onibus").prop("checked",true) : $("#onibus").prop("checked",false);
        dataset.values[0]["OUTROSTRANSPORTES"] == 'Sim' ? $("#outros").prop("checked",true) : $("#outros").prop("checked",false);
        dataset.values[0]["NENHUMTRANSPORTE"] == 'Sim' ? $("#nenhumTransporte").prop("checked",true) : $("#nenhumTransporte").prop("checked",false);
        if(dataset.values[0]["OUTROSMEIOS"] != ''){
            $("#outroMeioTransporte").val(dataset.values[0]["OUTROSMEIOS"]);
            $("#divOutroMeioTransporte").fadeIn();
        }
        $("#produtorRuralDesde").val(dataset.values[0]["PRODUTORDESDE"]);  
        $("#inscricaoEstadual").val(dataset.values[0]["INSCRESTADUAL"]);   
        $("#energiaEletrica").val(dataset.values[0]["ENERGIAELETRICA"]);     
        $("#acessoPropriedade").val(dataset.values[0]["ACESSO"]);   
        $("#cep").val(dataset.values[0]["CEP"]);                 
        $("#rua").val(dataset.values[0]["RUA"]);                 
        $("#numero").val(dataset.values[0]["NUMERO"]);              
        $("#complemento").val(dataset.values[0]["COMPLEMENTO"]);         
        $("#bairro").val(dataset.values[0]["BAIRRO"]);              
        $("#estado").val(dataset.values[0]["ESTADO"]);              
        $("#codigoMunicipio").val(dataset.values[0]["MUNICIPIO"]);
        //$("#telefone").val(dataset.values[0]["TELEFONE"]);            
        $("#distanciaMunicipio").val(dataset.values[0]["DISTANCIAMUNICIPIO"]);
        $("#roteiroAcesso").val(dataset.values[0]["ROTEIRO"]);       
        $("#latitude").val(dataset.values[0]["LATITUDE"]);            
        $("#longitude").val(dataset.values[0]["LONGITUDE"]);
        $("#cadeiaProdutiva").val(dataset.values[0]["CADEIAPROD"]);
         */
        PopulaProdutor(dataset.values[0]["CODPESSOA"]);
        var itemSelected = { ID: dataset.values[0]["ID"], NOME: dataset.values[0]["NOME"], idPropriedade: dataset.values[0]["ID"], nomePropriedade: dataset.values[0]["NOME"] };
        setZoomData("zoomPropriedadeRural", itemSelected);
        //PopulaMunicipio(dataset.values[0]["ESTADO"],dataset.values[0]["MUNICIPIO"]);
    }
}

function PopulaMunicipio(estado, codigoMunicipio) {
    //var estado = $("#estado").val();
    //var codigoMunicipio = $("#codigoMunicipio").val();
    var constraintRm_municipio_estado1 = DatasetFactory.createConstraint("cdMunicipio", codigoMunicipio, codigoMunicipio, ConstraintType.MUST);
    var constraintRm_municipio_estado2 = DatasetFactory.createConstraint("cdEstado", estado, estado, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_municipio_estado", null, new Array(constraintRm_municipio_estado1, constraintRm_municipio_estado2), null);
    if (dataset.values.length > 1) {
        var itemSelected = {
            cdEstado: dataset.values[1]["cdEstado"],
            cdMunicipio: dataset.values[1]["cdMunicipio"],
            nmMunicipio: dataset.values[1]["nmMunicipio"]
        };
        //console.log(itemSelected);
        setZoomData("codMunicipio", itemSelected);
    }
}

function PopulaProdutor(codigoProdutor) {
    var constraintRm_edualunodata_readviewauth_senar1 = DatasetFactory.createConstraint("CODPESSOA", codigoProdutor, codigoProdutor, ConstraintType.MUST);
    var datasetRm_edualunodata_readviewauth_senar = DatasetFactory.getDataset("rm_edualunodata_readviewauth_senar", null, new Array(constraintRm_edualunodata_readviewauth_senar1), null);
    if (datasetRm_edualunodata_readviewauth_senar.values.length > 0) {
        //console.log(datasetRm_edualunodata_readviewauth_senar);
        var itemSelected = { CODIGOALUNOPESSOA: datasetRm_edualunodata_readviewauth_senar.values[0]["CODPESSOA"], NOMEALUNO: datasetRm_edualunodata_readviewauth_senar.values[0]["NOME"] };
        $("#codPPessoa").val(datasetRm_edualunodata_readviewauth_senar.values[0]["CODPESSOA"]);
        _codigoPPessoa = datasetRm_edualunodata_readviewauth_senar.values[0]["CODPESSOA"];
        setZoomData("in_buscaAluno", itemSelected);
        //disabledZoomData('in_buscaAluno',true);
        //zoomReadonly('#in_buscaAluno');
    }
}

function ValidarCamposFormulario() {
    if (!$("#nomePropriedadeRural").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Nome Propriedade Rural.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if ($("#outros")["0"].checked && !$("#outroMeioTransporte").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Outos Meio de Transporte");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#projetoPrograma").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Programa / Projeto.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#statusPropriedade").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Status.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#in_buscaParceiro").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Parceiro.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#estado").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Estado.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#codMunicipio").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Município.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#distanciaMunicipio").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Distancia do Município (KM).");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#latitude").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Latitude, clique em um local do mapa.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#longitude").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Longitude, clique em um local do mapa.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#longitude").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Longitude, clique em um local do mapa.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if (!$("#statusPropriedade").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Status.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if ($("#statusPropriedade").val() == "2" && !$("#dataDesistencia").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Data Desistencia.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if ($("#statusPropriedade").val() == "2" && !$("#justificativaStatus").val()) {
        MensagemAlerta("Atenção", "Favor preencher o campo Data Justificativa.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    } else if ($("#statusPropriedade").val() == "2" && !validDates()) {
        MensagemAlerta("Atenção", "A Data de Desistência não pode ser menor que a Data de Inclusão.");
        $(".modal-footer").find("button")["0"].disabled = false;
        return false;
    }
    return true;
}

function setSelectedZoomItem(selectedItem) {
    var inputsAux = "";
    (paginaPai = top.window["HelloWorld_" + top.$("#campoInstanceId").val()]),
    (_codigoPPessoa = null);
    if (selectedItem.inputId == "in_buscaAluno") {
        //console.log(selectedItem);
        var codigoPessoaFisica = selectedItem["CODIGOALUNOPESSOA"];
        var cpf = selectedItem["CPF"];
        document.getElementById("codPPessoa").value = codigoPessoaFisica;
        if (cpf == "" || cpf == undefined) {
            document.getElementById("cfpProdutor").value = getCPF(codigoPessoaFisica);
            //listarDocumentos();
        } else {
            document.getElementById("cfpProdutor").value = cpf;
            //listarDocumentos();
        }
        if (paginaPai == undefined) {
            var paginaPai = "";
        }
        var paramUrl = getParamUrl();
        if (paramUrl.idPropriedade != undefined) {
            if (
                paginaPai.codigoProfessor == null ||
                (paginaPai.codigoProfessor == "" &&
                    paginaPai.codigoProfessor != undefined)
            ) {
                var tecnicoproprural = getTecnicoPropRural(paramUrl.idPropriedade);
                paginaPai.codigoProfessor = tecnicoproprural;
            } else if (paginaPai.codigoProfessor == undefined) {
                var tecnicoproprural = getTecnicoPropRural(paramUrl.idPropriedade);
                paginaPai = new Object({ codigoProfessor: tecnicoproprural });
            }
        }
        reloadZoomFilterValues("zoomPropriedadeRural", "CODPESSOA," + codigoPessoaFisica + "," + "CODPROF," + paginaPai.codigoProfessor);
        consultaPropriedadeRural(codigoPessoaFisica);
        //myLoading("Aguarde", "Verificando se existe(m) arquivo(s) anexado(s) para o produtor..", "listarDocumentos", true, true);
        listarDocumentos();
    } else if (selectedItem.inputId == "codMunicipio") {
        //console.log(selectedItem);
        document.getElementById("estado").value = selectedItem.cdEstado;
        document.getElementById("codigoMunicipio").value = selectedItem.cdMunicipio;
        document.getElementById("descMunicipio").value = selectedItem.nmMunicipio;
    } else if (selectedItem.inputId == "zoomPropriedadeRural") {
        const idProdutor = document.getElementById("codPPessoa").value;
        let idPropriedade = "";

        if (selectedItem.idPropriedade != undefined) {
            idPropriedade = selectedItem.idPropriedade;
        } else {
            idPropriedade = selectedItem.ID;
        }
        consultaDadosPropriedadeRest(idPropriedade);
    } else if (selectedItem.inputId == "in_buscaParceiro") {
        $("#codParceiro").val(selectedItem.CODCFO);
    }
}

function getCPF(codigoPessoaFisica) {
    var retorno = "";
    var c1 = DatasetFactory.createConstraint("CODIGOALUNOPESSOA", codigoPessoaFisica, codigoPessoaFisica, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rmSql_FLUIG0401", null, new Array(c1), null);
    if (dataset.values.length > 0) {
        retorno = dataset.values[0]["CPF"];
    }
    return retorno;
}

function getParamUrl() {
    var query = location.search.slice(1);
    var partes = query.split("&");
    var data = {};
    partes.forEach(function(parte) {
        var chaveValor = parte.split("=");
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    return data;
}

function getTecnicoPropRural(idpropriedade) {
    var retorno = "";
    var c1 = DatasetFactory.createConstraint("IDPROPRIEDADE", idpropriedade, idpropriedade, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(c1), null);
    if (dataset.values.length > 0) {
        retorno = dataset.values[0]["CODPROFESSOR"];
    }
    return retorno;
}

function consultaPropriedadeRural(codigoPessoaFisica) {
    var retorno = false;
    var c1 = DatasetFactory.createConstraint("CODPESSOA", codigoPessoaFisica, codigoPessoaFisica, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_zmdproprirural_readview", null, new Array(c1), null);
    if (dataset.values.length > 0) {
        retorno = true;
        $("#divZoomPropriedadeRural").fadeIn();
    } else {
        retorno = false;
        $("#divZoomPropriedadeRural").fadeOut();
        FLUIGC.message.confirm({
            message: "Nenhuma propriedade cadastrada para o produtor rural selecionado. Deseja adicionar uma nova propriedade?",
            title: "Atenção",
            labelYes: "Sim",
            labelNo: "Não",
        }, function(result, el, ev) {
            if (result) {
                /** Regra de limitação de Inclusão de 30 produtores ativos **/
                var cad_PropRural = new Array();
                this.cts = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
                this.cts2 = DatasetFactory.createConstraint("CODPESSOA", document.getElementById("codPPessoa").value, document.getElementById("codPPessoa").value, ConstraintType.MUST);
                this.cts3 = DatasetFactory.createConstraint("IDPROPRIEDADE", document.getElementById("idPropriedade").value, document.getElementById("idPropriedade").value, ConstraintType.MUST);
                var dsProfProdPropRural = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(this.cts, this.cts2, this.cts3), null);
                if (dsProfProdPropRural.values.length == 0) {
                    cad_PropRural.push(document.getElementById("idPropriedade").value);
                }
                /** Regra de limitação de Inclusão de 30 produtores ativos **/
                var c1 = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
                var dataset = DatasetFactory.getDataset("rm_wsConsulta_FluigS0053", null, new Array(c1), null);
                if (dataset.values.length >= 30 && cad_PropRural.length > 0) {
                    FLUIGC.message.alert({
                        message: "O número de produtores excedeu o limite (30).",
                        title: "Atenção!",
                        label: "OK",
                    }, function(el, ev) {
                        //Callback action executed by the user...
                        //el: Element (button) clicked...
                        //ev: Event triggered...
                    });
                } else {
                    novaPropriedade();
                }
            }
        });
    }
    return retorno;
}

function novaPropriedade() {
    $("#divZoomPropriedadeRural").fadeOut();
    $("#divDadosPropriedade").fadeIn();
    $("#statusPropriedade").val("1").prop("disabled", true);
    $("#divJustificativaStatus, #divDataDesistencia").hide();
    var cadeiaProdutiva = CadeiaDisciplina(paginaPai.codigoProfessor, paginaPai.codigoPPessoa);
    $("#cadeiaProdutiva").val(cadeiaProdutiva);
    if (this.value == "5" || this.value == "6" || this.value == "9") {
        $("#fsAreas").show();
    }
    var codcfo = ParceiroTecnico(paginaPai.codigoPPessoa);
    var c1 = DatasetFactory.createConstraint("CODCFO", codcfo, codcfo, ConstraintType.MUST);
    var datasetParceiro = DatasetFactory.getDataset("rm_FinCFODatabr_readview", null, new Array(c1), null);
    if (datasetParceiro.values.length > 0) {
        var itemSelected = { CODCFO: datasetParceiro.values[0]["CODCFO"], NOME: datasetParceiro.values[0]["NOME"] };
        //console.log(itemSelected);
        setZoomData("in_buscaParceiro", itemSelected);
        disabledZoomData("in_buscaParceiro", true);
    } else {
        removeZoomData("in_buscaParceiro");
        document.getElementById("codParceiro").value = "";
    }
    setTimeout(function() {
        var insentivo = false;
        var discAutorizada = discAutorizadaProf(
            paginaPai.codigoProfessor,
            paginaPai.codigoPPessoa
        );
        if (discAutorizada.length > 0) {
            for (var i = 0; i < discAutorizada.length; i++) {
                if (discAutorizada[i].INCENTIVO) {
                    insentivo = true;
                }
            }
        }
        if (insentivo) {
            $("#projetoPrograma").val("5");
        } else {
            $("#projetoPrograma").val("1");
        }
    }, 300);
    window["in_buscaAluno"].disable(true);
    initialize();
}

function ValidarCadeiaProdutiva() {
    var cadeiaProdutiva = $("#cadeiaProdutiva").val();
    var codigoProdutor = $("#codPPessoa").val();
    var idPropriedade = $("#idPropriedade").val();
    var retorno = true;
    /*
    var constraintRm_zmdproprirural_readview1 = DatasetFactory.createConstraint('CADEIAPROD', cadeiaProdutiva, cadeiaProdutiva, ConstraintType.MUST);
    var constraintRm_zmdproprirural_readview2 = DatasetFactory.createConstraint('CODPESSOA', codigoProdutor, codigoProdutor, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('rm_zmdproprirural_readview', null, new Array(constraintRm_zmdproprirural_readview1, constraintRm_zmdproprirural_readview2), null);

    if(dataset.values.length > 0){
        for(var i = 0; i < dataset.values.length; i++){			
            if(dataset.values[i]['ID'] == idPropriedade){
                return true;
            }else{
                retorno = false;
            }		
        }
    }
    if(!retorno){
        MensagemAlerta('Atenção','Favor selecionar outra CADEIA PRODUTIVA!')
        $("#cadeiaProdutiva").focus();
    }
     */
    return retorno;
    /*
    if($("#codPPessoa").val() == 'undefined'){
        var codigoProdutor = _codigoPPessoa
        $("#codPPessoa").val(_codigoPPessoa);
    }else{
        var codigoProdutor = $("#codPPessoa").val();
    }
    var cadeiaProdutiva = $("#cadeiaProdutiva").val();
    var idPropriedade = $("#idPropriedade").val();
    var retorno = true;
    var c1 = DatasetFactory.createConstraint('CADEIAPROD', cadeiaProdutiva, cadeiaProdutiva, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('CODPESSOA', codigoProdutor, codigoProdutor, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('rm_zmdproprirural_readview', null, new Array(c1, c2), null);
    //Existe propriedade para produtor?
    if(dataset.values.length > 0){
        for(var i = 0; i < dataset.values.length; i++){			
            if(dataset.values[i]['ID'] == idPropriedade){
                return true;
            }else{
                retorno = false;
            }		
        }
    }
    if(!retorno){
        MensagemAlerta('Atenção','Favor selecionar outra CADEIA PRODUTIVA!')
        $("#cadeiaProdutiva").focus();
    }
    return retorno;
     */
}

function MontaXMLZMDPROPRIRURAL() {
    var codParceiro = document.getElementById("codParceiro").value;
    if (codParceiro == "" || codParceiro == null) {
        MensagemAlerta("Atenção", 'Não foi identificado vinculo do Técnico com Entidade Parceira! Por favor contate a "Assessoria de Informática".');
        return false;
    }
    var cadeiaProdutiva = document.getElementById("cadeiaProdutiva").value;
    if (cadeiaProdutiva == "" || cadeiaProdutiva == null) {
        MensagemAlerta("Atenção", 'Não foi identificado vinculo do Técnico com Cadeia Produtiva! Por favor contate a "Assessoria de Informática".');
        return false;
    }
    var fieldsXml = "<ZMDPROPRIEDADERURAL>";
    fieldsXml += criaElementoXML("ID", $("#idPropriedade").val());
    //fieldsXml += criaElementoXML("SITUACAO" ,$("#situacao").val());
    fieldsXml += criaElementoXML("CODPESSOA", $("#codPPessoa").val());
    fieldsXml += criaElementoXML("NOME", $("#nomePropriedadeRural").val());
    fieldsXml += criaElementoXML("TIPOPROPRIEDADE", $("#tipoPropriedade").val());
    fieldsXml += criaElementoXML("NIRF", $("#nirf").val());
    fieldsXml += criaElementoXML("CCIR", $("#ccir").val());
    fieldsXml += criaElementoXML("DAP", $("#dap").val());
    fieldsXml += criaElementoXML("AREA", $("#areaTotal").val());
    fieldsXml += criaElementoXML("CARRO", $("#carro").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("MOTO", $("#moto").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("BICICLETA", $("#bicicleta").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("ONIBUS", $("#onibus").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("NENHUMTRANSPORTE", $("#nenhumTransporte").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("OUTROSTRANSPORTES", $("#outros").prop("checked") ? "Sim" : "Não");
    fieldsXml += criaElementoXML("OUTROSMEIOS", $("#outroMeioTransporte").val());
    fieldsXml += criaElementoXML("PRODUTORDESDE", $("#produtorRuralDesde").val());
    fieldsXml += criaElementoXML("INSCRESTADUAL", $("#inscricaoEstadual").val());
    fieldsXml += criaElementoXML("ENERGIAELETRICA", $("#energiaEletrica").val());
    fieldsXml += criaElementoXML("ACESSO", $("#acessoPropriedade").val());
    fieldsXml += criaElementoXML("CEP", $("#cep").val());
    fieldsXml += criaElementoXML("RUA", $("#rua").val());
    fieldsXml += criaElementoXML("NUMERO", $("#numero").val());
    fieldsXml += criaElementoXML("COMPLEMENTO", $("#complemento").val());
    fieldsXml += criaElementoXML("BAIRRO", $("#bairro").val());
    fieldsXml += criaElementoXML("ESTADO", $("#estado").val());
    fieldsXml += criaElementoXML("MUNICIPIO", $("#codigoMunicipio").val());
    //fieldsXml += criaElementoXML("TELEFONE",$("#telefone").val());
    fieldsXml += criaElementoXML("DISTANCIAMUNICIPIO", $("#distanciaMunicipio").val());
    fieldsXml += criaElementoXML("ROTEIRO", $("#roteiroAcesso").val());
    fieldsXml += criaElementoXML("LATITUDE", $("#latitude").val());
    fieldsXml += criaElementoXML("LONGITUDE", $("#longitude").val());
    fieldsXml += criaElementoXML("PROJETOPROGRAMA", $("#projetoPrograma").val());
    fieldsXml += criaElementoXML("CADEIAPRODUTIVA", $("#cadeiaProdutiva").val());
    fieldsXml += criaElementoXML("PARCEIRO", $("#codParceiro").val());
    fieldsXml += criaElementoXML("STATUSPROPRIEDADE", $("#statusPropriedade").val());
    if ($("#statusPropriedade").val() != "1") {
        fieldsXml += criaElementoXML("JUSTIFICATIVASTATUS", $("#justificativaStatus").val());
        fieldsXml += criaElementoXML("DATADESISTENCIA", $("#dataDesistencia").val());
    }
    /*
    PROJETOPROGRAMA.toString(),
    CADEIAPRODUTIVA.toString(),
    PARCEIRO.toString(),
    itemx.SITUACAO.toString(),
    STATUSPROPRIEDADE.toString(),
    JUSTIFICATIVASTATUS.toString()
     */
    fieldsXml += "</ZMDPROPRIEDADERURAL>";
    //console.log("fieldsXml: " + fieldsXml)
    if (!saveReacordAuthRM(fieldsXml, "RMSPRJ4634112Server", "")) {
        return false;
    }
    return true;
}

function GravarZMDPROPRIRURAL(fieldsXml) {
    var c1 = DatasetFactory.createConstraint("fieldsXml", fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_zmdproprirural_saverecord", null, constraints, null);
    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            $("#idPropriedade").val(gravaRM.values[0].RETORNO);
            return true;
        } else {
            MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3><br/>" + gravaRM.values[0].RETORNO);
            return false;
        }
    } else {
        MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3>");
        return false;
    }
}

function MontaXMLZMDTECNICOPROPRURAL() {
    var fieldsXml = "<ZMDTECNICOPROPRURAL>";
    fieldsXml += criaElementoXML("ID", $("#idTecnicoPropriedade").val());
    if ($("#idpropnova").val() == "") {
        fieldsXml += criaElementoXML("IDPROPRIEDADE", $("#idPropriedade").val());
    }
    if ($("#idpropnova").val() != "") {
        fieldsXml += criaElementoXML("IDPROPRIEDADE", $("#idpropnova").val());
    }
    fieldsXml += criaElementoXML("CODPESSOA", $("#codPPessoa").val());
    fieldsXml += criaElementoXML("CODPROFESSOR", paginaPai.codigoProfessor);
    fieldsXml += criaElementoXML("SITUACAO", "1");
    fieldsXml += "</ZMDTECNICOPROPRURAL>";
    //console.log("fieldsXml: " + fieldsXml)
    var idProp = "";
    if ($("#idpropnova") == "") {
        idProp = $("#idPropriedade").val();
    }
    if ($("#idpropnova") != "") {
        idProp = $("#idpropnova").val();
    }
    var cIdProp = DatasetFactory.createConstraint("IDPROPRIEDADE", idProp, idProp, ConstraintType.MUST);
    var dsTecnicoProp = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(cIdProp), null);
    var temVinculoProp = new Boolean();
    if (dsTecnicoProp.values) {
        for (v = 0; v < dsTecnicoProp.values.length; v++) {
            if (dsTecnicoProp.values[v].IDPROPRIEDADE == idProp) {
                temVinculoProp = true;
            }
        }
    }
    if (temVinculoProp == false) {
        if (GravarZMDTECNICOPROPRURAL(fieldsXml)) {
            return true;
        } else {
            return false;
        }
    } else if (temVinculoProp == true) {
        return true;
    }
}

function GravarZMDTECNICOPROPRURAL(fieldsXml) {
    var c1 = DatasetFactory.createConstraint("fieldsXml", fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_zmdtecnicoproprural_saverecord", null, constraints, null);
    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            //alert(gravaRM.values[0].RETORNO);
            return true;
        } else {
            MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3><br/>" + gravaRM.values[0].RETORNO);
            return false;
        }
    } else {
        MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3>");
        return false;
    }
}

function MontaXMLZMDLOGSTATUSPROPRURAL() {
    if ($("#idpropnova").val() === "" && $("#idPropriedade").val() !== "") {
        $propriedadeRural = buscaPropriedade();
        if ($propriedadeRural !== null) {
            if ($propriedadeRural.values[0].STATUSPROPRIEDADE !== $("#statusPropriedade").val()) {
                var statusAtual = $("#statusPropriedade").val();
                var statusAnterior = $propriedadeRural.values[0].STATUSPROPRIEDADE;
                var dataAtivacao = "";
                var dataInativacao = "";
                if (statusAtual === "1" && statusAnterior === "2") {
                    dataAtivacao = currentDate();
                    dataInativacao = formatDateRm($propriedadeRural.values[0].ULT_DTINATIVACAO);
                } else if (statusAtual === "2" && statusAnterior === "1") {
                    var $statusPropriedadeRural = buscaStatusPropriedade();
                    if ($statusPropriedadeRural !== null) {
                        var $statusPropRural = greaterDate(
                            $statusPropriedadeRural,
                            "DATAATIVA"
                        );
                        dataAtivacao = formatDateRm($statusPropRural.DATAATIVA);
                    } else {
                        dataAtivacao = formatDateRm(
                            $propriedadeRural.values[0].RECCREATEDON
                        );
                    }
                    dataInativacao = $("#dataDesistencia").val();
                }
                var fieldsXml = "<ZMDLOGSTATUSPROPRURAL>";
                fieldsXml += criaElementoXML("ID", -1);
                fieldsXml += criaElementoXML("IDPROPRIEDADE", document.getElementById("idPropriedade").value);
                fieldsXml += criaElementoXML("CODPESSOA", document.getElementById("codPPessoa").value);
                fieldsXml += criaElementoXML("CODSTATUS", statusAtual);
                fieldsXml += criaElementoXML("CODSTATUSANT", statusAnterior);
                fieldsXml += criaElementoXML("DATAATIVA", dataAtivacao);
                fieldsXml += criaElementoXML("DATAINATIVA", dataInativacao);
                fieldsXml += criaElementoXML("USUARIO", top.WCMAPI.userEmail);
                fieldsXml += "</ZMDLOGSTATUSPROPRURAL>";
                //console.log("fieldsXml: " + fieldsXml);
                if (GravarZMDLOGSTATUSPROPRURAL(fieldsXml)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
            $propriedadeRural = null;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function GravarZMDLOGSTATUSPROPRURAL(fieldsXml) {
    var c1 = DatasetFactory.createConstraint("fieldsXml", fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_senar_zmdlogstatusproprural_saverecord", null, constraints, null);
    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            //alert(gravaRM.values[0].RETORNO);
            return true;
        } else {
            MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3><br/>" + gravaRM.values[0].RETORNO);
            return false;
        }
    } else {
        MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3>");
        return false;
    }
}

function MontaXMLZMDAREASPROPRIEDADERURAL() {
    var tabelaAreas = $("#tabelaAreas tbody");
    var iLen = tabelaAreas.find("tr").length;
    var idPropriedade = $("#idPropriedade").val();
    var fieldsXml;
    for (var i = 0; i < iLen; i++) {
        fieldsXml = "<ZMDAREASPROPRIEDADERURAL>";
        fieldsXml += criaElementoXML("IDPROPRIEDADE", idPropriedade);
        fieldsXml += criaElementoXML("IDAREA", tabelaAreas["0"].children[i].children["0"].innerText);
        fieldsXml += criaElementoXML("NOME", tabelaAreas["0"].children[i].children["1"].innerText);
        fieldsXml += criaElementoXML("LATITUDE", tabelaAreas["0"].children[i].children["2"].innerText);
        fieldsXml += criaElementoXML("LONGITUDE", tabelaAreas["0"].children[i].children["3"].innerText);
        fieldsXml += "</ZMDAREASPROPRIEDADERURAL>";
        //console.log("fieldsXml: " + fieldsXml)
        if (!GravarZMDAREASPROPRIEDADERURAL(fieldsXml)) {
            return false;
        }
    }
    return true;
}

function GravarZMDAREASPROPRIEDADERURAL(fieldsXml) {
    var c1 = DatasetFactory.createConstraint("fieldsXml", fieldsXml, fieldsXml, ConstraintType.MUST);
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset("rm_zmdareaspropriedaderural_saverecord", null, constraints, null);
    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            //alert(gravaRM.values[0].RETORNO);
            return true;
        } else {
            MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3><br/>" + gravaRM.values[0].RETORNO);
            return false;
        }
    } else {
        MensagemAlerta("Atenção", "<h3>Erro para gravar o registro, contate o Administrador</h3>");
        return false;
    }
}

function ConsultaDadosTecnicoPropriedade(idPropriedade) {
    var c1 = DatasetFactory.createConstraint("IDPROPRIEDADE", idPropriedade, idPropriedade, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(c1), null);
    if (dataset.values.length > 0) {
        $("#idTecnicoPropriedade").val(dataset.values[0]["CODPROFESSOR"]);
    }
}

function DesabilitaCampos() {
    $(
        "#idPropriedade,#codPPessoa,#nomePropriedadeRural," +
        "#tipoPropriedade,#nirf,#ccir,#dap,#areaTotal," +
        "#carro,#moto,#bicicleta,#onibus,#nenhumTransporte," +
        "#outrosTransporte,#outros,#produtorRuralDesde," +
        "#inscricaoEstadual,#energiaEletrica,#acessoPropriedade," +
        "#cep,#rua,#numero,#complemento,#bairro,#estado," +
        "#codigoMunicipio,#distanciaMunicipio,#roteiroAcesso," +
        "#latitude,#longitude,#cadeiaProdutiva" +
        "#projetoPrograma,#statusPropriedade,#query,#btnConsultar," +
        "#btnAdicionarArea"
    ).prop("disabled", true);
    window["in_buscaParceiro"].disable(true);
    window["codMunicipio"].disable(true);
}

//Funcao para consultar informaçãoes no RM via Rest
function consultaRestRM(serviceCode, endpoint, method, params) {
    var dataset = { length: 0 };
    var c1 = DatasetFactory.createConstraint("serviceCode", serviceCode, serviceCode, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("endpoint", endpoint, endpoint, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("method", method, method, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("params", params, params, ConstraintType.MUST);
    var datasetRestRM = DatasetFactory.getDataset("restRM", null, new Array(c1, c2, c3, c4), null);
    if (datasetRestRM.values.length > 0) {
        try {
            dataset = JSON.parse(datasetRestRM.values[0].SUCESSO);
        } catch (err) {
            //console.log(err);
        }
    }
    return dataset;
}

function consultaDadosPropriedadeRest(id) {
    var codPessoa = $("#codPPessoa").val();
    var key = id + "$_$" + codPessoa;
    /*
    var dataset = consultaRestRM(
        "RestRM", 
        "/rmsrestdataserver/rest/RMSPRJ4634112Server/" + key,
        "GET"
    );
     */
    var c1 = DatasetFactory.createConstraint("CODPESSOA", codPessoa, codPessoa, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("ID", id, id, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("rm_ZMDPROPRIEDADERURAL_readview", null, new Array(c1, c2), null);
    if (dataset.values.length > 0) {
        window["in_buscaAluno"].disable(true);
        window["zoomPropriedadeRural"].disable(true);
        $("#btnNovaPropriedade").fadeOut();
        $("#divDadosPropriedade").fadeIn();
        initialize();
        $("#idPropriedade").val(dataset.values[0].ID);
        $("#codPPessoa").val(dataset.values[0].CODPESSOA);
        $("#nomePropriedadeRural").val(dataset.values[0].NOME);
        $("#tipoPropriedade").val(dataset.values[0].TIPOPROPRIEDADE);
        $("#nirf").val(dataset.values[0].NIRF);
        $("#ccir").val(dataset.values[0].CCIR);
        $("#dap").val(dataset.values[0].DAP);
        $("#areaTotal").val(dataset.values[0].AREA);
        $("#carro").prop("checked", dataset.values[0].CARRO == "Sim" ? true : false);
        $("#moto").prop("checked", dataset.values[0].MOTO == "Sim" ? true : false);
        $("#bicicleta").prop("checked", dataset.values[0].BICICLETA == "Sim" ? true : false);
        $("#onibus").prop("checked", dataset.values[0].ONIBUS == "Sim" ? true : false);
        if (dataset.values[0].OUTROSTRANSPORTES == "Sim") {
            $("#outros").trigger("click");
        }
        /*
        $("#outros").prop("checked", (dataset.values[0].OUTROSTRANSPORTES == "Sim"? true : false)); 	
        if($("#outros").prop("checked")){
            $("#outros").trigger("click");
        }
        $("#nenhumTransporte").prop("checked", (dataset.values[0].NENHUMTRANSPORTE == "Sim"? true : false));
        if($("#nenhumTransporte").prop("checked")){
            $("#nenhumTransporte").trigger("click");
        }
         */
        if (dataset.values[0].NENHUMTRANSPORTE == "Sim") {
            $("#nenhumTransporte").trigger("click");
        }
        /*
        var mesAno = dataset.values[0].PRODUTORDESDE;
        if(mesAno != null){
            var mesAno = mesAno.substring(0,4) + "-" + mesAno.substring(4);
        }		
         */
        $("#outroMeioTransporte").val(dataset.values[0].OUTROSMEIOS);
        $("#produtorRuralDesde").val(dataset.values[0].PRODUTORDESDE);
        //NOTE: Implementação de nova regra Cadeira Produtiva Vinculada ao Técnico por meio da Disciplina
        //TODO: Técnico --> Disciplina Autorizada --> Disciplina --> Cadeia Produtiva da Disciplina
        //$("#cadeiaProdutiva").val(dataset.values[0].CADEIAPRODUTIVA);
        var cadeiaProdutiva = CadeiaDisciplina(paginaPai.codigoProfessor, paginaPai.codigoPPessoa);
        $("#cadeiaProdutiva").val(cadeiaProdutiva);
        if (this.value == "5" || this.value == "6" || this.value == "9") {
            $("#fsAreas").show();
        }
        $("#inscricaoEstadual").val(dataset.values[0].INSCRESTADUAL);
        $("#energiaEletrica").val(dataset.values[0].ENERGIAELETRICA);
        $("#acessoPropriedade").val(dataset.values[0].ACESSO);
        $("#cep").val(dataset.values[0].CEP);
        $("#cep").trigger("blur");
        $("#rua").val(dataset.values[0].RUA);
        $("#numero").val(dataset.values[0].NUMERO);
        $("#complemento").val(dataset.values[0].COMPLEMENTO);
        $("#bairro").val(dataset.values[0].BAIRRO);
        $("#estado").val(dataset.values[0].ESTADO);
        $("#codigoMunicipio").val(dataset.values[0].MUNICIPIO);
        $("#distanciaMunicipio").val(dataset.values[0].DISTANCIAMUNICIPIO);
        $("#roteiroAcesso").val(dataset.values[0].ROTEIRO);
        $("#latitude").val(dataset.values[0].LATITUDE);
        $("#longitude").val(dataset.values[0].LONGITUDE);
        $("#projetoPrograma").val(dataset.values[0].PROJETOPROGRAMA);
        $("#cadeiaProdutiva").val(dataset.values[0].CADEIAPRODUTIVA);
        $("#codParceiro").val(dataset.values[0].PARCEIRO);
        $("#statusPropriedade").val(dataset.values[0].STATUSPROPRIEDADE);
        if ($propriedadeRural === null) {
            $propriedadeRural = buscaPropriedade();
            if ($propriedadeRural !== null) {
                //document.getElementById("dataInclusao").value = formatDateRm($propriedadeRural.values[0].RECMODIFIEDON);
                document.getElementById("dataInclusao").value = formatDateRm($propriedadeRural.values[0].RECCREATEDON);
                $propriedadeRural = null;
            }
        }
        if (dataset.values[0].STATUSPROPRIEDADE != "1") {
            $("#justificativaStatus").val(dataset.values[0].JUSTIFICATIVASTATUS);
            $("#dataDesistencia").val(dataset.values[0].DATADESISTENCIA ? dataset.values[0].DATADESISTENCIA.substring(0, 10) : "");
            $("#divJustificativaStatus, #divDataDesistencia").show();
        } else {
            $("#divJustificativaStatus, #divDataDesistencia").hide();
        }
        /*
        var dadosParceiro = consultaRestRM(
            "RestRM", 
            "/rmsrestdataserver/rest/FinCFODataBR?filter=['CODCFO=:CODCFO','"+dataset.data.PARCEIRO+"']", 
            "GET"
        );
         */
        //NOTE: Implementação de nova regra Parceiro Vinculado ao Técnico
        //TODO: Técnico --> Vinculo do Tecnico com Parceiro
        //var c1 = DatasetFactory.createConstraint('CODCFO', dataset.values[0]['PARCEIRO'], dataset.values[0]['PARCEIRO'], ConstraintType.MUST);
        var codcfo = ParceiroTecnico(paginaPai.codigoPPessoa);
        var c1 = DatasetFactory.createConstraint("CODCFO", codcfo, codcfo, ConstraintType.MUST);
        var datasetParceiro = DatasetFactory.getDataset("rm_FinCFODatabr_readview", null, new Array(c1), null);
        if (datasetParceiro.values.length > 0) {
            var itemSelected = { CODCFO: datasetParceiro.values[0]["CODCFO"], NOME: datasetParceiro.values[0]["NOME"] };
            //console.log(itemSelected);
            setZoomData("in_buscaParceiro", itemSelected);
            disabledZoomData("in_buscaParceiro", true);
        } else {
            removeZoomData("in_buscaParceiro");
            document.getElementById("codParceiro").value = "";
        }
        if (dataset.values[0]["LATITUDE"] && dataset.values[0]["LONGITUDE"]) {
            $("#query").val(dataset.values[0]["LATITUDE"].toString().replace(",", ".") + "," + dataset.values[0]["LONGITUDE"].toString().replace(",", "."));
            submitQuery();
            //$("#query").prop("readonly", true);
        }
        var c1 = DatasetFactory.createConstraint("IDPROPRIEDADE", dataset.values[0].ID, dataset.values[0].ID, ConstraintType.MUST);
        var datasetRm_zmdareaspropriedaderural_readview = DatasetFactory.getDataset("rm_zmdareaspropriedaderural_readview", null, new Array(c1), null);
        if (datasetRm_zmdareaspropriedaderural_readview.values.length > 0) {
            for (var i = 0, iLen = datasetRm_zmdareaspropriedaderural_readview.values.length; i < iLen; i++) {
                id = ($("#tabelaAreas tbody").find("tr").length + 1).toString() + "_" + new Date().getTime().toString();
                adicionarLinhaTabelaArea(id, datasetRm_zmdareaspropriedaderural_readview.values[i]["IDAREA"], datasetRm_zmdareaspropriedaderural_readview.values[i]["NOME"], datasetRm_zmdareaspropriedaderural_readview.values[i]["LATITUDE"], datasetRm_zmdareaspropriedaderural_readview.values[i]["LONGITUDE"]);
            }
        }
        FLUIGC.switcher.init("#editarMapa");
        FLUIGC.switcher.setFalse("#editarMapa");
        /*FLUIGC.switcher.onChange("#editarMapa", function(event, state){
            if(this.state == true){
                return fnhablitaQueryFields();
            }else{
                return fndesablitaQueryFields();
            }
        });*/
        $("#idPropriedade").val();

        /*
        if (!!dataset.values[0].STATUSPROPRIEDADE && dataset.values[0].STATUSPROPRIEDADE !== "1") {
            btnAdicionarHistorico.style.display = "block";
        }
        loadHistoricoAteg(dataset.values[0].ID, dataset.values[0].CODPESSOA);
        */
    }
    PopulaMunicipio(dataset.values[0]["ESTADO"], dataset.values[0]["MUNICIPIO"]);
}

//Funcao para gravar xml no rm
//Ex: saveReacordAuthRM(fieldsXml, 'EduProfessorTurmaData', 'codCurso')
function saveReacordAuthRM(fieldsXml, tabelaRM, campoRetorno) {
    var c1 = DatasetFactory.createConstraint("fieldsXml", fieldsXml, fieldsXml, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("tabelaRM", tabelaRM, tabelaRM, ConstraintType.MUST);
    var constraints = new Array(c1, c2);
    var gravaRM = DatasetFactory.getDataset("rm_saverecordauth", null, constraints, null);
    if (gravaRM.values.length > 0) {
        $("#idpropnova").val(gravaRM.values[0].SUCCESS.substring(0, 4));
    }
    if (gravaRM.values.length > 0) {
        if (gravaRM.values[0]["ERROR"]) {
            MensagemAlerta("Atenção!", "<h3>Erro para gravar o registro, contate o Administrador</h3><br/>" + gravaRM.values[0]["ERROR"]);
            return false;
        } else {
            if (campoRetorno) {
                $("#" + campoRetorno).val(
                    gravaRM.values[0]["SUCCESS"].split(";")[gravaRM.values[0]["SUCCESS"].split(";").length - 1]
                );
            }
            return true;
        }
    } else {
        MensagemAlerta("Atenção!", "<h3>Erro para gravar o registro, contate o Administrador</h3>");
        return false;
    }
}

function salvarDados() {

    radiusProperty().then((radiusproperty) => {
        if (radiusproperty) {
            /** Regra de limitação de Inclusão de 30 produtores ativos **/
            var cad_PropRural = new Array();
            this.cts = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
            this.cts2 = DatasetFactory.createConstraint("CODPESSOA", document.getElementById("codPPessoa").value, document.getElementById("codPPessoa").value, ConstraintType.MUST);
            this.cts3 = DatasetFactory.createConstraint("IDPROPRIEDADE", document.getElementById("idPropriedade").value, document.getElementById("idPropriedade").value, ConstraintType.MUST);
            var dsProfProdPropRural = DatasetFactory.getDataset("rm_zmdtecnicoproprural_readview", null, new Array(this.cts, this.cts2, this.cts3), null);
            if (dsProfProdPropRural.values.length == 0) {
                cad_PropRural.push(document.getElementById("idPropriedade").value);
            }
            /** Regra de limitação de Inclusão de 30 produtores ativos **/
            var c1 = DatasetFactory.createConstraint("CODPROFESSOR", paginaPai.codigoProfessor, paginaPai.codigoProfessor, ConstraintType.MUST);
            var dataset = DatasetFactory.getDataset("rm_wsConsulta_FluigS0053", null, new Array(c1), null);
            if (dataset.values.length >= 30 && cad_PropRural.length > 0) {
                FLUIGC.message.alert({
                    message: "O número de produtores excedeu o limite (30).",
                    title: "Atenção!",
                    label: "OK",
                }, function(el, ev) {
                    //Callback action executed by the user...
                    //el: Element (button) clicked...
                    //ev: Event triggered...
                });
            } else {
                var validarCamposFormulario = ValidarCamposFormulario();
                var constPessoa = DatasetFactory.createConstraint("CODPESSOA", $("#codPPessoa").val(), $("#codPPessoa").val(), ConstraintType.MUST);
                var buscaPropriedades = DatasetFactory.getDataset("rm_ZMDPROPRIEDADERURAL_readview", null, new Array(constPessoa), null);
                var temCadeias = new Array();
                for (var i = 0; i < buscaPropriedades.values.length; i++) {
                    if (
                        buscaPropriedades.values[i].CADEIAPRODUTIVA == $("#cadeiaProdutiva").val() && buscaPropriedades.values[i].ID != $("#idPropriedade").val()) {
                        temCadeias.push(i);
                    }
                }
                if (temCadeias.length <= 0) {
                    if (validarCamposFormulario) {
                        if (ValidarCadeiaProdutiva()) {
                            if (MontaXMLZMDPROPRIRURAL()) {
                                if (MontaXMLZMDTECNICOPROPRURAL()) {
                                    if (MontaXMLZMDLOGSTATUSPROPRURAL()) {
                                        var cadeiaProdutiva = $("#cadeiaProdutiva").val();
                                        var tabelaAreas = $("#tabelaAreas tbody");
                                        if ((cadeiaProdutiva == "5" || cadeiaProdutiva == "6" || cadeiaProdutiva == "9") && tabelaAreas.find("tr").length > 0) {
                                            if (!MontaXMLZMDAREASPROPRIEDADERURAL()) {
                                                return;
                                            }
                                        }

                                        //MontaXMLZMDHISTORICOATEG();
                                        $("#btnSalvarDadosPropriedade").prop("disabled", true);
                                        MensagemAlerta("Sucesso", "Os dados foram salvos com sucesso!");
                                        $(".modal-footer")["0"].children["0"].disabled = false;
                                        RecarregarPaginaPai();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    alert("O Produtor já possui a cadeia produtiva cadastrada!");
                }
            }
        }
    }).catch((err) => {
        // TODO: handle exception
        throw err;
    });
}

//Jean 15/07/2019 --- Validar Se coordenda dentro do estado de GO --
function populaEnderecoMaps(results) {
    //console.log('populaEnderecoMaps()-> ');
    if (results.length > 0) {
        var address = results[0].address_components;
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        var cidade = "";
        var codcidade = "";
        var uf = "";
        var cep = "";
        if (document.getElementById("latitude").value == "" && latitude != "") {
            document.getElementById("latitude").value = latitude;
        }
        if (document.getElementById("longitude").value == "" && longitude != "") {
            document.getElementById("longitude").value = longitude;
        }
        //if (document.getElementById("cep").value == "") {
        for (res in address) {
            this.reg = address[res];
            this.regtype = address[res].types[0];
            switch (this.regtype) {
                case "postal_code":
                    document.getElementById("cep").value = this.reg.long_name;
                    cep = this.reg.long_name;
                    break;
                case "route":
                    document.getElementById("rua").value = this.reg.long_name;
                    break;
                case "street_number":
                    document.getElementById("numero").value = this.reg.long_name;
                    break;
                case "administrative_area_level_1":
                    document.getElementById("estado").value = this.reg.short_name;
                    uf = this.reg.short_name;
                    break;
                case "administrative_area_level_2":
                    cidade = this.reg.long_name;
                    break;
                default:
                    document.getElementById("bairro").value = this.reg.long_name;
                    break;
            }
        }
        if (uf != "" && cidade != "") {
            this.zipcode = cep.replace(/[^\d]+/g, "");
            $.get(`https://viacep.com.br/ws/${this.zipcode}/json/`, function(data) {
                retornoCep = data;
                if (!("erro" in data)) {
                    if (Object.prototype.toString.call(data) === "[object Array]" || Object.prototype.toString.call(data) === "[object Object]") {
                        codcidade = data.ibge.substr(2, data.ibge.length);
                        var itemSelected = { cdEstado: uf, cdMunicipio: codcidade, nmMunicipio: cidade, };
                        setZoomData("codMunicipio", itemSelected);
                        /*
                        if(data.complemento != ""){
                            document.getElementById("complemento").value = data.complemento;                       
                        }
                        */
                    }
                }
            });
        }
        //}
    }
}

function buscaPropriedade() {
    telaEspera.show();
    this.codpessoa = document.getElementById("codPPessoa").value;
    this.idpropriedade = document.getElementById("idPropriedade").value;
    this.cst = DatasetFactory.createConstraint("CODPRODUTOR", this.codpessoa, this.codpessoa, ConstraintType.MUST);
    this.cst2 = DatasetFactory.createConstraint("CODPROPRIEDADE", this.idpropriedade, this.idpropriedade, ConstraintType.MUST);
    this.constraint = new Array(this.cst, this.cst2);
    this.dsPropriedade = DatasetFactory.getDataset("rm_wsConsulta_FluigS0048", null, this.constraint, null);
    if (this.dsPropriedade.values.length > 0) {
        telaEspera.hide();
        return this.dsPropriedade;
    } else {
        telaEspera.hide();
        return null;
    }
}

function buscaStatusPropriedade() {
    //telaEspera.show();
    this.codpessoa = document.getElementById("codPPessoa").value;
    this.idpropriedade = document.getElementById("idPropriedade").value;
    this.cst = DatasetFactory.createConstraint("CODPESSOA", this.codpessoa, this.codpessoa, ConstraintType.MUST);
    this.cst2 = DatasetFactory.createConstraint("IDPROPRIEDADE", this.idpropriedade, this.idpropriedade, ConstraintType.MUST);
    this.constraint = new Array(this.cst, this.cst2);
    this.dsLogStatusPropRural = DatasetFactory.getDataset("rm_senar_zmdlogstatusproprural_readview_offline", null, this.constraint, null);
    if (this.dsLogStatusPropRural.values.length > 0) {
        //telaEspera.hide();
        return this.dsLogStatusPropRural;
    } else {
        //telaEspera.hide();
        return null;
    }
}

function formatDateRm(dateRM) {
    //NOTE: Função para formatar a data do RM e popular o campo
    this.dateRM = dateRM;
    this.dateAdapt = "";
    if (this.dateRM != "" && this.dateRM != null) {
        this.date = this.dateRM.slice(0, 10);
        this.dateAdapt = this.date;
        //this.dateAdapt = this.date.split('-').reverse().join('/');
    }
    return this.dateAdapt;
}

function validDates() {
    var dataCriacao = document.getElementById("dataInclusao").value;
    var dataDesistencia = document.getElementById("dataDesistencia").value;
    var dtCriacao = new Date(dataCriacao.split("-").join("/"));
    var dtDesistencia = new Date(dataDesistencia.split("-").join("/"));
    if (dtCriacao.getTime() <= dtDesistencia.getTime()) {
        return true;
    } else {
        return false;
    }
}

function greaterDate(dsPropriedadeRural, elParam) {
    var row = 0;
    var dataParam = formatDateRm(dsPropriedadeRural.values[row][elParam]);
    var dateInit = new Date(dataParam.split("/").reverse().join("/"));
    for (var i = 0; i < dsPropriedadeRural.values.length; i++) {
        this.dtParam = formatDateRm(dsPropriedadeRural.values[i][elParam]);
        this.dateCompare = new Date(this.dtParam.split("/").reverse().join("/"));
        if (this.dateCompare.getTime() > dateInit.getTime()) {
            row = i;
        }
    }
    return dsPropriedadeRural.values[row];
}

function currentDate() {
    //NOTE: Retorna Data Atual Dia - Mês - Ano
    this.date = new Date();
    this.day = (this.date.getDate() < 10 ? "0" : "") + this.date.getDate();
    this.month = (this.date.getMonth() < 9 ? "0" : "") + (this.date.getMonth() + 1);
    this.year = this.date.getFullYear().toString();
    this.result = `${this.day}/${this.month}/${this.year}`;
    return this.result;
}

/*
function populaSelec(recurso, inputSelect, valueSelect, textSelect){
    //console.log("teste");
    var dataset = consultaRestRM( "RestRM", "/rmsrestdataserver/rest/" + recurso, "GET" );
    var option;
    var select = document.getElementById(inputSelect);
    if(dataset.data.length > 0){
        for(var i = 0; i < dataset.data.length; i++){
            option = document.createElement("option");
            option.value = dataset.data[i][valueSelect];
            option.text = dataset.data[i][textSelect];
            select.appendChild(option);
        }
    }
}
*/

function discAutorizadaProf(codProfessor, codPessoa) {
    var discAutorizadaProf = new Array();
    var cts = DatasetFactory.createConstraint("CODPROF", codProfessor, codProfessor, ConstraintType.MUST);
    var cts2 = DatasetFactory.createConstraint("CODPESSOA", codPessoa, codPessoa, ConstraintType.MUST);
    var cts3 = DatasetFactory.createConstraint("CODTIPOCURSO", "4", "4", ConstraintType.MUST);
    var dsDiscAutorizada = DatasetFactory.getDataset("rm_EduDiscAutorizadaProfessorData_readviewauth", null, new Array(cts, cts2, cts3), null);
    if (dsDiscAutorizada.values.length > 0) {
        for (var i = 0; i < dsDiscAutorizada.values.length; i++) {
            var record = dsDiscAutorizada.values[i];
            var senarMais = ((record.NOMEDISC.indexOf("SENAR MAIS") !== -1) ? true : false);
            var visitaTecnica = ((record.NOMEDISC.indexOf("VISITA TÉCNICA") !== -1) ? true : false);
            var incentivo = ((record.NOMEDISC.indexOf("INCENTIVO") !== -1) ? true : false);
            discAutorizadaProf.push({ CODDISC: record.CODDISC, SENAR_MAIS: senarMais, VISITA_TECNICA: visitaTecnica, INCENTIVO: incentivo, });
        }
    }
    return discAutorizadaProf;
}

function CadeiaDisciplina(codProfessor, codPessoa) {
    var dsDiscAutorizada = discAutorizadaProf(codProfessor, codPessoa);
    if (dsDiscAutorizada.length > 0) {
        for (var i = 0; i < dsDiscAutorizada.length; i++) {
            var record = dsDiscAutorizada[i];
            var senarMais = record.SENAR_MAIS;
            var visitaTecnica = record.VISITA_TECNICA;
            if (senarMais && visitaTecnica) {
                var cts_ = DatasetFactory.createConstraint("ATIVO", "1", "1", ConstraintType.MUST);
                var cts_2 = DatasetFactory.createConstraint("CODDISC", record.CODDISC, record.CODDISC, ConstraintType.MUST);
                var dsCadeiaDisciplina = DatasetFactory.getDataset("rm_zmd_cadeia_disciplina_readview", null, new Array(cts_, cts_2), null);
                if (dsCadeiaDisciplina.values.length > 0) {
                    return dsCadeiaDisciplina.values[0].CODCADEIA;
                } else {
                    return "";
                }
            } else {
                continue;
            }
        }
    } else {
        return "";
    }
}

function ParceiroTecnico(codPessoa) {
    var data = new Date();
    var dtInicio = `${data.getFullYear()}-01-01`;
    var dtLimite = data.toISOString().substr(0, 10);
    var cts = DatasetFactory.createConstraint("ATIVO", "1", "1", ConstraintType.MUST);
    var cts2 = DatasetFactory.createConstraint("CODPESSOA", codPessoa, codPessoa, ConstraintType.MUST);
    var dsParceiroTecnico = DatasetFactory.getDataset("rm_zmd_parceiro_tecnico_readview", null, new Array(cts, cts2), null);
    if (dsParceiroTecnico.values.length > 0) {
        var record = dsParceiroTecnico.values[0];
        if (record.DATAFIM != "") {
            var datafim = new Date(record.DATAFIM.substr(0, 10));
            if (datafim.getTime() >= data.getTime()) {
                return record.CODCFO;
            } else {
                return "";
            }
        } else {
            var datainicio = new Date(record.DATAINICIO.substr(0, 10));
            if (datainicio.getTime() <= data.getTime()) {
                return record.CODCFO;
            } else {
                return "";
            }
        }
    } else {
        return "";
    }
}

/**
 * Função para formatar a data do RM e popular o campo
 * @param dataRM - Data para convertida
 */
function AjustaDataRm(dataRM) {
    var dataAjustada = "";
    if (dataRM != "" && dataRM != null) {
        dataAjustada = `${dataRM.substring(8, 10)}/${dataRM.substring(5, 7)}/${dataRM.substring(0, 4)}`;
    }
    return dataAjustada;
}

function criaElementoXML(campo, valor) {
    var element = `<${campo}>${valor}</${campo}>`;
    return element;
}

function MensagemNaoEncontrado(titulo, mensagem, tipo) {
    FLUIGC.message.confirm({
        message: mensagem,
        title: titulo,
        labelYes: "Sim",
        labelNo: "Não",
    }, function(result, el, ev) {
        if (result) {
            if (tipo == 1) {
                //Novo produtor Rural
                NovoProdutor();
            } else if (tipo == 2) {
                //Nova pessoa física
                NovaPessoa();
            }
        }
    });
}

function loadDefault() {
    var keyDown = false,
        ctrl = 17,
        vKey = 86,
        Vkey = 118;
    $(document).keydown(function(e) {
        if (e.keyCode == ctrl) keyDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrl) keyDown = false;
    });
    $("[data-only-numbers]").on("keypress", function(e) {
        if (!e) {
            var e = window.event;
        }
        if (e.keyCode > 0 && e.which == 0) {
            return true;
        }
        if (e.keyCode) {
            code = e.keyCode;
        } else if (e.which) {
            code = e.which;
        }
        if (code == 46) {
            return true;
        }
        var character = String.fromCharCode(code);
        if (character == "\b" || character == " " || character == "\t") {
            return true;
        }
        if (keyDown && (code == vKey || code == Vkey)) {
            return character;
        } else {
            return /[0-9]$/.test(character);
        }
    }).on("focusout", function(e) {
        var $this = $(this);
        if ($this.val() == "") {
            return true;
        }
        $this.val($this.val().replace(/[^0-9\.]/g, ""));
    }).on("paste", function(e) {
        var $this = $(this);
        setTimeout(function() {
            $this.val($this.val().replace(/[^0-9\.]/g, ""));
        }, 5);
    });
    //permite digitar somente numeros
    $("body").on("keypress", "[data-only-numbers]", function(ev) {
        var k = ev.keyCode || ev.which;
        //Permite apagar o conteúdodo do campo usando as teclas 'backspace' ou 'delete' no firefox.
        //Nos outros navegadores o keypress não gera evento.
        if (k == 8 || k == 46) {
            return true;
        }
        k = String.fromCharCode(k);
        if (isNaN(k)) {
            return false;
        }
        return true;
    });
    $(".create-form-components").on("keyup", 'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]', function() {
        validationFieldsForm($(this), $(this).parents(".form-field").data("type"));
    });
    $(".create-form-components").on("change", 'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]', function() {
        validationFieldsForm($(this), $(this).parents(".form-field").data("type"));
    });

    function validationFieldsForm(field, type) {
        if (type === "checkbox" || type === "radio") {
            if (!field.is(":checked")) {
                field.parents(".form-field").addClass("required");
            } else {
                field.parents(".form-field").removeClass("required");
            }
        } else {
            if (!field.val().trim()) {
                field.parents(".form-field").addClass("required");
            } else {
                field.parents(".form-field").removeClass("required");
            }
        }
    }
    var $zoomPreview = $(".zoom-preview");
    if ($zoomPreview.length) {
        $zoomPreview.parent().removeClass("input-group");
        $zoomPreview.remove();
    }
    var ratings = $(".rating");
    if (ratings.length > 0) ratingStars(ratings);

    function ratingStars(stars) {
        $.each(stars, function(i, obj) {
            var field = $(this).closest(".form-group").find(".rating-value");
            var tgt = $(obj);
            tgt.html("");
            var rating = FLUIGC.stars(tgt, {
                value: field.val(),
            });
            rating.on("click", function(o) {
                field.val($(this).index() + 1);
            });
        });
    }
    $.each($("[data-date]"), function(i, o) {
        var id = $(o).parent().attr("id");
        FLUIGC.calendar("#" + id);
    });
    $(document).ready(function() {
        $.each($("[data-date]"), function(i, o) {
            var id = $(o).attr("id");
            if ($("#" + id).attr("readonly")) {
                $("#" + id).data("DateTimePicker").disable();
            }
        });
    });
}

function setZoomData(inputObj, item) {
    /** ------->> ESSA FUNÇÃO SÓ PODE SER CHAMADA APÓS A PÁGINA SER CARREGADA ------- */
    var aux = inputObj.toString();
    if (jQuery.type(inputObj) === "string") {
        window[aux].setValue(item);
    } else {
        inputObj.setValue(item);
    }
}

function removeZoomData(inputObj) {
    if (jQuery.type(inputObj) === "string") {
        //window[inputName].removeAll();
        window[inputObj].clear();
        //zoomSpanDisplay('#' + inputObj, 'show');
    } else {
        //inputName.removeAll();
        inputName.clear();
        //zoomSpanDisplay('#' + inputObj, 'show');
    }
}

function disabledZoomData(inputObj, val) {
    //NOTE: Função para disabilitar/habilitar campo Zoom
    if ($.type(inputObj) === "string") {
        window[inputObj].disable(val);
    } else {
        inputObj.disable(val);
    }
    //NOTE: Customize zoom
    setTimeout(function() {
        $("#" + inputObj).parent("div.form-field").find("span.select2-selection__choice__remove").text("");
        $("#" + inputObj).parent("div.form-field").find("li.select2-selection__choice").css({ "background-color": "transparent", border: "1px solid transparent", });
    }, 100);
}

function zoomSpanDisplay(input, type) {
    if (type == "hide") {
        $(input).parent("div.input-group.fs-full-width").find("div.bootstrap-tagsinput").find("span.fluig-typeahead").hide();
    } else {
        $(input).parent("div.input-group.fs-full-width").find("div.bootstrap-tagsinput").find("span.fluig-typeahead").show();
        //$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead > input.tt-input').css('width', '300px');
    }
}

function zoomRemoveDiplay(input, inputsAux, evalAux) {
    $(input).parent("div").find("div.bootstrap-tagsinput.bootstrap-tagsinput-max").find("span.tag.tag-gray").find("span[data-role=remove]").on("click", function() {
        //zoomSpanDisplay(input, 'show');
        if (inputsAux !== undefined && inputsAux != "") {
            $(inputsAux).val(""); // Apaga a informação dos campos auxiliares ao Zoom (ID, CODIGO, DESCRICAO .. etc)
        }
        if (evalAux !== undefined && evalAux != "") {
            eval(evalAux);
        }
    });
}

function zoomReadonly(input) {
    $(input).parent("div").find("div.bootstrap-tagsinput.bootstrap-tagsinput-max").find("span.tag.tag-gray").css("width", "90%");
    $(input).parent("div").find("div.bootstrap-tagsinput.bootstrap-tagsinput-max").find("span.tag.tag-gray").find("span.tag-text").css("max-width", "100%");
    $(input).parent("div").find("div.bootstrap-tagsinput.bootstrap-tagsinput-max").find("span.tag.tag-gray").find("span[data-role=remove]").hide();
    $(input).parent("div").find("div.input-group-addon").attr("id", ""); // Desabilita botão do input Zoom
    $(input).parent("div").find("div.input-group-addon > span.fluigicon").removeClass("fluigicon-zoom-in");
    $(input).parent("div").find("div.input-group-addon > span.fluigicon").addClass("fluigicon-verified");
    //zoomSpanDisplay(input, 'hide');
}

function zoomDisabled(inputName) {
    if (jQuery.type(inputName) === "string") {
        window[inputName].disable(true);
    } else {
        inputName.disable(true);
    }
}