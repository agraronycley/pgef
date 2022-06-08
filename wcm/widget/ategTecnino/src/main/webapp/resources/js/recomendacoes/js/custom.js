$(document).ready(function() {

    var onlyDate = FLUIGC.calendar('#divDataRecomendacao, #divDataResolucao', {
        pickDate: true,
        pickTime: false
    });

    $("#btnNovaRecomendacao").on('click', function() {
        if (ValidaPreenchimentoCampoRecomendacao()) {
            AdicionarNovaRecomendacao()
        }
    })

    $(window).load(function() {
        EditarPropriedade();
    })
})

function ValidaPreenchimentoCampoRecomendacao() {

    var tipoRecomendacao = $("#tipoRecomendacao").val();
    var dataRecomendacao = $("#dataRecomendacao").val();
    var obsRecomendacao = $("#obsRecomendacao").val();

    if (tipoRecomendacao == "" || tipoRecomendacao == null) {
        MensagemAlerta("Atenção", "Favor preencher o campo TIPO");
        $("#tipoRecomendacao").focus();
        return false;
    } else if (dataRecomendacao == "" || dataRecomendacao == null) {
        MensagemAlerta("Atenção", "Favor preencher o campo DATA RECOMENDAÇÃO");
        $("#dataRecomendacao").focus();
        return false;
    } else if (obsRecomendacao == "" || obsRecomendacao == null) {
        MensagemAlerta("Atenção", "Favor preencher o campo RECOMENDAÇÃO");
        $("#obsRecomendacao").focus();
        return false;
    }

    return true;
}

function AdicionarNovaRecomendacao() {

    var tipoRecomendacao = $("#tipoRecomendacao").val();
    var dataRecomendacao = $("#dataRecomendacao").val();
    var obsRecomendacao = $("#obsRecomendacao").val();
    var linha = ($("#tbodyTabelaRecomendacao tr").length + 1);

    var tbody = '';
    //tbody += '  <tbody id="tbodyTabelaRecomendacao">'
    tbody += '  		<tr>';
    tbody += '  			<td id="id___' + linha + '">' + (linha) + '</td>';
    tbody += '  			<td id="dataRecomendacao___' + linha + '">' + dataRecomendacao + '</td>';
    tbody += '  			<td id="tipoRecomendacao___' + linha + '">' + tipoRecomendacao + '</td>';
    tbody += '  			<td id="obsRecomendacao___' + linha + '">' + obsRecomendacao + '</td>';
    tbody += '  			<td id="dataResolucao___' + linha + '"></td>';
    tbody += '  			<td id="resolucao___' + linha + '"></td>';
    tbody += '  			<td id="situacao___' + linha + '">Pendente</td>		';
    tbody += '				<td><button class="btn btn-default" title="Editar Histórico" onclick="EditarLinhaHistorico(' + linha + ')"><span class="fluigicon fluigicon-pen fluigicon-md"></span></button></td>';
    tbody += '  		</tr>';
    //tbody += '  </tbody>'

    $("#tbodyTabelaRecomendacao").append(tbody);
}


function EditarPropriedade() {

    var idPropriedade = getParameter("idPropriedade");

    if (idPropriedade != "" && idPropriedade != null) {
        ConsultaDadosPropriedade(idPropriedade);
        //ConsultaDadosTecnicoPropriedade(paramSite[1]);
    }
}

function ConsultaDadosPropriedade(idPropriedade) {

    var c1 = DatasetFactory.createConstraint('PROPRIEDADE_ID', idPropriedade, idPropriedade, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset('rmSql_FLUIG011', null, new Array(c1), null);

    if (dataset.values.length > 0) {
        $("#idPropriedade").val(dataset.values[0]["PROPRIEDADE_ID"]);
        $("#produtorNome").val(dataset.values[0]["PRODUTOR_NOME"]);
        $("#nomePropriedadeRural").val(dataset.values[0]["PROPRIEDADE_NOME"]);
        $("#estadoPropriedade").val(dataset.values[0]["PROPRIEDADE_ESTADO"]);
        $("#municipioPropriedade").val(dataset.values[0]["PROPRIEDADE_MUNICIPIO"]);
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


var modalMyLoading,
    autoClose = false;

function MensagemAlerta(titulo, mensagem, fechar) {

    autoClose = fechar;

    modalMyLoading = FLUIGC.modal({
        title: titulo,
        content: mensagem,
        id: 'fluig-modal',
        size: 'larger',
        actions: [{
            'label': 'Ok',
            'bind': 'data-open-modal',
            'autoClose': true
        }]
    });
    $(".modal-title").text(titulo);
    $(".modal-body").text(mensagem);
}


function myLoading(title, content, func, disable, close) {

    MensagemAlerta(title, content, close);

    if (disable) {
        $(".modal-footer").find("button").attr("disabled", true);
    }

    var i = 0,
        _busy = false;
    var _processor = setInterval(function() {

        if (!_busy) {
            _busy = true;
            if (i == 0) {
                i++;
                window[func]()
            }
            if (!modalMyLoading.isOpen() || autoClose) {
                modalMyLoading.remove();
                clearInterval(_processor);
            }
            _busy = false;
        }
    }, 100);
}


function EditarLinhaHistorico(linha) {

    var dataResolucao = $("#dataResolucao___" + linha).text();
    dataResolucao = dataResolucao == "" ? "" : dataResolucao = dataResolucao.split('/').reverse().join('-');
    var resolucao = $("#resolucao___" + linha).text();
    var situacao = $("#situacao___" + linha).text() == "Não será efetuada" ? "checked" : "";

    var html = '';
    //html += '<input type="text" class="form-control" name="idLinhaTabelaHistorico" id="idLinhaTabelaHistorico" value="'+linha+'">';
    html += '<div class="panel panel-default">';
    html += '	<div class="panel-heading">Resolução</div>';
    html += '	<div class="panel-body">';
    html += '		<div class="form-group fs-clearfix ">';
    html += '			<div class="col-sm-6 col-xs-12" data-type="date" data-show-properties="" data-field-name="dataResolucao">';
    html += '				<label for="dataResolucao">Data Resolução</label>';
    html += '				<input type="date" class="form-control" name="dataResolucao" id="dataResolucao" value="' + dataResolucao + '">';
    html += '			</div>';
    html += '			<div class="col-sm-6 col-sm-12">';
    html += '        		<label>Não será efetuada</label><br/>';
    html += '        		<input type="checkbox" id="naoEfetuar" ' + situacao + ' >';
    html += '			</div>';
    html += '		</div>';
    html += '		<div class="form-group fs-clearfix ">';
    html += '			<div class="col-sm-12 col-xs-12">';
    html += '				<label for="obsResolucao">Resolução</label>';
    html += '				<textarea rows="4" id="obsResolucao" class="form-control">' + resolucao + '</textarea>';
    html += '			</div>';
    html += '		</div>';
    html += '	</div>';
    html += '</div>';


    /*
    html += '<script>';
    html += '	alert(1)';
    html += '	onlyDate = FLUIGC.calendar(".divDataResolucao", { pickDate: true, pickTime: false})';
    html += '</script>';
    */

    var myModal = FLUIGC.modal({
        title: 'Resolução',
        content: html,
        id: 'fluig-modal',
        size: 'larger',
        actions: [{
            'label': 'Salvar',
            'bind': 'data-modal-save',
            'classType': 'btn btn-primary modalSave',
            'autoClose': true
        }, {
            'label': 'Cancelar',
            'autoClose': true
        }]
    }, function() {

        $(".modalSave").on('click', function() {

            var naoEfetuar = $("#naoEfetuar");
            if (naoEfetuar[0].checked) {
                $("#dataResolucao___" + linha).text("");
                $("#resolucao___" + linha).text("");
                $("#situacao___" + linha).text("Não será efetuada");
            } else {
                var dataResolucao = $("#dataResolucao").val();
                dataResolucao = dataResolucao.split('-').reverse().join('/');
                var obsResolucao = $("#obsResolucao").val();

                if (dataResolucao != "" && obsResolucao != "") {
                    $("#dataResolucao___" + linha).text(dataResolucao);
                    $("#resolucao___" + linha).text(obsResolucao);
                    $("#situacao___" + linha).text("Resolvido");
                } else {
                    $("#dataResolucao___" + linha).text("");
                    $("#resolucao___" + linha).text("");
                    $("#situacao___" + linha).text("Pendente");
                }
            }


        })

    });
}