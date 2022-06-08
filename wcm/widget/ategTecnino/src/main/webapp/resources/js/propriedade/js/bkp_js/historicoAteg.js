const fsHistoricoAteg = document.querySelector("#fsHistoricoAteg");
const btnAdicionarHistorico = document.querySelector(
    "[data-button-name='btnAdicionarHistorico']"
);

btnAdicionarHistorico.addEventListener("click", () => {
    const hasHistoricoAtegToBeIncluded = getHistoricoAtegToBeIncluded();
    if (!hasHistoricoAtegToBeIncluded) {
        const data = getDataToFillTableHistoricoAteg();
        addDataToTableHistoricoAteg(data);
        enableFieldsAfterMoveDataToTable();
    }
});

function loadHistoricoAteg(idPropriedade, idProdutor) {
    const historicoAteg = getZdmHistoricoAtegByPropriedadeAndProdutor(
        idPropriedade,
        idProdutor
    );

    if (!!historicoAteg) {
        console.log({ historicoAteg });

        historicoAteg
            .map((data) => {
                return {
                    ...data,
                    DATAINCLUSAO: AjustaDataRm(data["DATAINCLUSAO"]),
                    DATADESISTENCIA: AjustaDataRm(data["DATADESISTENCIA"]),
                    RECCREATEDON: AjustaDataRm(data["RECCREATEDON"]),
                };
            })
            .forEach((data) => addDataToTableHistoricoAteg(data));
    }
}

function getDataToFillTableHistoricoAteg() {
    const codPPessoa = document.querySelector("#codPPessoa");
    const in_buscaAluno = document.querySelector("#in_buscaAluno");

    const idPropriedade = document.querySelector("#idPropriedade");
    const zoomPropriedadeRural = document.querySelector("#zoomPropriedadeRural");

    const cadeiaProdutiva = document.querySelector("#cadeiaProdutiva");
    const cadeiaProdutivaOption = getSelectedOptionFromSelectOptions(
        cadeiaProdutiva.options,
        cadeiaProdutiva.value
    );

    const projetoPrograma = document.querySelector("#projetoPrograma");
    const projetoProgramaOption = getSelectedOptionFromSelectOptions(
        projetoPrograma.options,
        projetoPrograma.value
    );

    const codParceiro = document.querySelector("#codParceiro");
    const in_buscaParceiro = document.querySelector("#in_buscaParceiro");

    const statusPropriedade = document.querySelector("#statusPropriedade");
    const statusPropriedadeOption = getSelectedOptionFromSelectOptions(
        statusPropriedade.options,
        statusPropriedade.value
    );

    const dataInclusao = document.querySelector("#dataInclusao");
    const dataDesistencia = document.querySelector("#dataDesistencia");

    const idArquivo = getCodigoTermoCompromisso();

    const cookie = getCookie("jwt.token");
    let colleague = null;

    if (!!cookie) {
        const jwt = parseJwt(getCookie("jwt.token"));

        if (!!jwt) {
            login = jwt["sub"];
            colleague = getColleagueByLogin(login);
        }
    }

    let ppessoa = getPpessoaByCodigo(paginaPai.codPessoa);

    const justificativaStatus = document.querySelector("#justificativaStatus");

    return {
        ID: -1,
        IDPRODUTOR: parseInt(codPPessoa.value),
        IDPROPRIEDADE: parseInt(idPropriedade.value),
        IDCADEIAPRODUTIVA: parseInt(cadeiaProdutiva.value),
        IDPROGRAMA: parseInt(projetoPrograma.value),
        IDPARCEIRO: parseInt(codParceiro.value),
        IDSTATUS: parseInt(statusPropriedade.value),
        IDARQUIVO: idArquivo,
        IDPROCESSOADMINISTRATIVO: "teste",
        DESCRICAOPRODUTOR: in_buscaAluno.value,
        DESCRICAOPROPRIEDADE: zoomPropriedadeRural.value,
        DESCRICAOCADEIAPRODUTIVA: !!cadeiaProdutivaOption ? cadeiaProdutivaOption.text : "",
        DESCRICAOPROGRAMA: !!projetoProgramaOption ? projetoProgramaOption.text : "",
        DESCRICAOPARCEIRO: in_buscaParceiro.value,
        DESCRICAOSTATUS: !!statusPropriedadeOption ? statusPropriedadeOption.text : "",
        DESCRICAOARQUIVO: "Termo de Compromisso",
        DESCRICAOPROCESSOADMINISTRATIV: "teste",
        DATAINCLUSAO: dataInclusao.value,
        DATADESISTENCIA: dataDesistencia.value,
        IDUSUARIO: !!colleague ? colleague["login"] : "",
        NOMEUSUARIO: !!colleague ? colleague["colleagueName"] : "",
        CPFTECNICO: !!ppessoa ? ppessoa["CPF"] : "",
        NOMETECNICO: !!ppessoa ? ppessoa["NOME"] : "",
        JUSTIFICATIVA: justificativaStatus.value,
    };
}

function addDataToTableHistoricoAteg(historicoAteg) {
    const tabelaHistoricoAteg = document.querySelector("#tabelaHistoricoAteg");
    const thead = tabelaHistoricoAteg.querySelector("thead");
    const tbody = tabelaHistoricoAteg.querySelector("tbody");
    const tr = tbody.insertRow();
    tr.dataset.historicoAteg = JSON.stringify(historicoAteg);

    Array.from(thead.querySelector("tr").cells).forEach((cell) => {
        const attribute = cell.attributes[0].value;
        const value = historicoAteg[attribute];
        const td = tr.insertCell();

        if (attribute === "ID") {
            const id = value === -1 ? "new" : value;
            const inputId = `btn_historicoAteg_${id}`;

            td.outerHTML = "<td>" +
                "		<button class='btn btn-default' " +
                "			title='Histórico ATeG' " +
                "       	id='" + inputId + "' >" +
                "			<span class='fluigicon fluigicon-form fluigicon-md'></span>" +
                "		</button>" +
                "</td>";
            const input = document.getElementById(inputId);
            input.addEventListener("click", () => {
                openHistoricoAteg(historicoAteg);
            });
        } else if (
            attribute === "DATAINCLUSAO" ||
            attribute === "DATADESISTENCIA"
        ) {
            td.textContent = !!value ? value.split("-").reverse().join("/") : "";
        } else {
            td.textContent = !!value ? value : "";
        }
    });
}

function getHistoricoAtegToBeIncluded() {
    return Array.from(
        document.querySelector("#tabelaHistoricoAteg > tbody").rows
    ).find(
        (row) =>
        !!row &&
        !!row.dataset &&
        !!row.dataset.historicoAteg &&
        !!(JSON.parse(row.dataset.historicoAteg).ID === -1)
    );
}

let modalHistoricoAteg;

function openHistoricoAteg(historicoAteg) {
    //trata o bug de abrir varias vezes
    if (modalHistoricoAteg != undefined && modalHistoricoAteg.isOpen()) {
        return;
    }

    const optionsModal = {
        title: "Histórico ATeG",
        content: getHtmlHistoriAteg(),
        id: "fluig-historico-ateg",
        size: "full",
        formModal: true,
        actions: [{
            label: "Ok",
            autoClose: true,
        }, ],
    };

    modalHistoricoAteg = FLUIGC.modal(optionsModal, () => {
        showModalHistoricoAteg(historicoAteg);
    });
}

function showModalHistoricoAteg(historicoAteg) {
    document.getElementById("modalHistoricoAtegIdCadeiaProdutiva").value =
        historicoAteg["IDCADEIAPRODUTIVA"];
    document.getElementById("modalHistoricoAtegDescricaoCadeiaProdutiva").value =
        historicoAteg["DESCRICAOCADEIAPRODUTIVA"];
    document.getElementById("modalHistoricoAtegIdProgramaProjeto").value =
        historicoAteg["IDPROGRAMA"];
    document.getElementById("modalHistoricoAtegDescricaoProgramaProjeto").value =
        historicoAteg["DESCRICAOPROGRAMA"];
    document.getElementById("modalHistoricoAtegIdParceiro").value =
        historicoAteg["IDPARCEIRO"];
    document.getElementById("modalHistoricoAtegDescricaoParceiro").value =
        historicoAteg["DESCRICAOPARCEIRO"];
    document.getElementById("modalHistoricoAtegIdStatus").value =
        historicoAteg["IDSTATUS"];
    document.getElementById("modalHistoricoAtegDescricaoStatus").value =
        historicoAteg["DESCRICAOSTATUS"];
    document.getElementById(
            "modalHistoricoAtegDataDesistencia"
        ).value = !!historicoAteg["DATADESISTENCIA"] ?
        historicoAteg["DATADESISTENCIA"].split("-").reverse().join("/") :
        "";
    document.getElementById(
            "modalHistoricoAtegDataInclusao"
        ).value = !!historicoAteg["DATAINCLUSAO"] ?
        historicoAteg["DATAINCLUSAO"].split("-").reverse().join("/") :
        "";
    document.getElementById("modalHistoricoAtegIdProcessoAdmnistrativo").value =
        historicoAteg["IDPROCESSOADMINISTRATIVO"];
    document.getElementById(
        "modalHistoricoAtegDescricaoProcessoAdmnistrativo"
    ).value = historicoAteg["DESCRICAOPROCESSOADMINISTRATIV"];
    document.getElementById("modalHistoricoAtegIdProdutor").value =
        historicoAteg["IDPRODUTOR"];
    document.getElementById("modalHistoricoAtegDescricaoProdutor").value =
        historicoAteg["DESCRICAOPRODUTOR"];
    document.getElementById("modalHistoricoAtegIdPropriedade").value =
        historicoAteg["IDPROPRIEDADE"];
    document.getElementById("modalHistoricoAtegDescricaoPropriedade").value =
        historicoAteg["DESCRICAOPROPRIEDADE"];
    document.getElementById("modalHistoricoAtegIdArquivo").value =
        historicoAteg["IDARQUIVO"];

    document
        .getElementById("modalHistoricoAtegTermoCompromisso")
        .addEventListener("click", () => {
            openDocument(historicoAteg["IDARQUIVO"]);
        });

    document.getElementById("modalHistoricoAtegIdTecnico").value =
        historicoAteg["CPFTECNICO"];
    document.getElementById("modalHistoricoAtegDescricaoTecnico").value =
        historicoAteg["NOMETECNICO"];
    document.getElementById("modalHistoricoAtegIdHistorico").value =
        historicoAteg["ID"];
    document.getElementById("modalHistoricoAtegIdUsuario").value =
        historicoAteg["IDUSUARIO"];
    document.getElementById("modalHistoricoAtegNomeUsuario").value =
        historicoAteg["NOMEUSUARIO"];
    document.getElementById("modalHistoricoAtegJustificativa").value =
        historicoAteg["JUSTIFICATIVA"];
    document.getElementById(
            "modalHistoricoAtegDataInclusaoHistorico"
        ).value = !!historicoAteg["RECCREATEDON"] ?
        historicoAteg["RECCREATEDON"] :
        "";
}

function getHtmlHistoriAteg() {
    return (
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Cadeia Produtiva</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsCadeiaProdutiva">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdCadeiaProdutiva">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdCadeiaProdutiva" id="modalHistoricoAtegIdCadeiaProdutiva" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoCadeiaProdutiva">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoCadeiaProdutiva" id="modalHistoricoAtegDescricaoCadeiaProdutiva" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Programa / Projeto</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsProgramaProjeto">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdProgramaProjeto">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdProgramaProjeto" id="modalHistoricoAtegIdProgramaProjeto" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoProgramaProjeto">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoProgramaProjeto" id="modalHistoricoAtegDescricaoProgramaProjeto" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Parceiro</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsParceiro">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdParceiro">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdParceiro" id="modalHistoricoAtegIdParceiro" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoParceiro">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoParceiro" id="modalHistoricoAtegDescricaoParceiro" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Status</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsStatus">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdStatus">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdStatus" id="modalHistoricoAtegIdStatus" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoStatus">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoStatus" id="modalHistoricoAtegDescricaoStatus" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Data</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsStatus">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-6 col-xs-12">' +
        '					<label for="modalHistoricoAtegDataInclusao">Inclusão</label> <input type="text" class="form-control" name="modalHistoricoAtegDataInclusao" id="modalHistoricoAtegDataInclusao" disabled>' +
        "				</div>" +
        '				<div class="col-sm-6 col-xs-12">' +
        '					<label for="modalHistoricoAtegDataDesistencia">Desistência</label> <input type="text" class="form-control" name="modalHistoricoAtegDataDesistencia" id="modalHistoricoAtegDataDesistencia" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Processo Admnistrativo</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsProcessoAdmnistrativo">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdProcessoAdmnistrativo">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdProcessoAdmnistrativo" id="modalHistoricoAtegIdProcessoAdmnistrativo" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoProcessoAdmnistrativo">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoProcessoAdmnistrativo" id="modalHistoricoAtegDescricaoProcessoAdmnistrativo" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Produtor</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsProdutor">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdProdutor">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdProdutor" id="modalHistoricoAtegIdProdutor" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoProdutor">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoProdutor" id="modalHistoricoAtegDescricaoProdutor" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Propriedade</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsPropriedade">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdPropriedade">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdPropriedade" id="modalHistoricoAtegIdPropriedade" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoPropriedade">Descrição</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoPropriedade" id="modalHistoricoAtegDescricaoPropriedade" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Termo de Compromisso</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsArquivo">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdArquivo">Código</label> <input type="text" class="form-control" name="modalHistoricoAtegIdArquivo" id="modalHistoricoAtegIdArquivo" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<br><div class="btn-group"><a name="modalHistoricoAtegTermoCompromisso" id="modalHistoricoAtegTermoCompromisso" class="btn btn-md" title="Visualizar Arquivo"><i class="fluigicon fluigicon-file-pdf icon-sm"style="color: #ff0000"></i> Visualizar Termo de Compromisso</a></div>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Técnico</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsTecnico">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdTecnico">CPF</label> <input type="text" class="form-control" name="modalHistoricoAtegIdTecnico" id="modalHistoricoAtegIdTecnico" disabled>' +
        "				</div>" +
        '				<div class="col-sm-10 col-xs-12">' +
        '					<label for="modalHistoricoAtegDescricaoTecnico">Nome</label> <input type="text" class="form-control" name="modalHistoricoAtegDescricaoTecnico" id="modalHistoricoAtegDescricaoTecnico" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Histórico</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsTecnico">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdHistorico">ID</label> <input type="text" class="form-control" name="modalHistoricoAtegIdHistorico" id="modalHistoricoAtegIdHistorico" disabled>' +
        "				</div>" +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegDataInclusaoHistorico">Data</label> <input type="text" class="form-control" name="modalHistoricoAtegDataInclusaoHistorico" id="modalHistoricoAtegDataInclusaoHistorico" disabled>' +
        "				</div>" +
        '				<div class="col-sm-2 col-xs-12">' +
        '					<label for="modalHistoricoAtegIdUsuario">Matrícula</label> <input type="text" class="form-control" name="modalHistoricoAtegIdUsuario" id="modalHistoricoAtegIdUsuario" disabled>' +
        "				</div>" +
        '				<div class="col-sm-6 col-xs-12">' +
        '					<label for="modalHistoricoAtegNomeUsuario">Nome</label> <input type="text" class="form-control" name="modalHistoricoAtegNomeUsuario" id="modalHistoricoAtegNomeUsuario" disabled>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>" +
        '<div class="panel panel-default">' +
        '	<div class="panel-heading">' +
        '		<h3 class="panel-title">Justificativa</h3>' +
        "	</div>" +
        '	<div class="panel-body">' +
        '		<fieldset id="fsTecnico">' +
        '			<div class="form-group fs-clearfix">' +
        '				<div class="col-sm-12 col-xs-12">' +
        '					<label for="modalHistoricoAtegJustificativa">Justificativa</label> <textarea id="modalHistoricoAtegJustificativa" name="modalHistoricoAtegJustificativa" class="form-control" rows="4" disabled></textarea>' +
        "				</div>" +
        "			</div>" +
        "		</fieldset>" +
        "	</div>" +
        "</div>"
    );
}

function enableFieldsAfterMoveDataToTable() {
    btnAdicionarHistorico.style.display = "none";

    enableUploadNewFile();
}

function MontaXMLZMDHISTORICOATEG() {
    const historicoAteg = getHistoricoAtegToBeIncluded();
    let objHistoricoAteg = null;
    let fieldsXml = "";
    let isSaved = true;
    if (!!historicoAteg &&
        !!historicoAteg.dataset &&
        !!historicoAteg.dataset.historicoAteg
    ) {
        objHistoricoAteg = JSON.parse(historicoAteg.dataset.historicoAteg);
        fieldsXml = "<ZMDHISTORICOATEG>";
        for (let prop in objHistoricoAteg) {
            fieldsXml += criaElementoXML(prop, objHistoricoAteg[prop]);
        }
        fieldsXml += "</ZMDHISTORICOATEG>";
    }

    if (!!fieldsXml) {
        isSaved = GravarZMDHISTORICOATEG(fieldsXml);
    }

    return isSaved;
}

function GravarZMDHISTORICOATEG(fieldsXml) {
    var c1 = DatasetFactory.createConstraint(
        "fieldsXml",
        fieldsXml,
        fieldsXml,
        ConstraintType.MUST
    );
    var constraints = new Array(c1);
    var gravaRM = DatasetFactory.getDataset(
        "rm_teste_ZMDHISTORICOATEG_saverecord",
        null,
        constraints,
        null
    );
    if (gravaRM.values.length > 0) {
        if (gravaRM.values.length == 1) {
            //alert(gravaRM.values[0].RETORNO);
            return true;
        } else {
            MensagemAlerta(
                "Atenção",
                "<h3>Erro para gravar o Historico ATEG, contate o Administrador</h3><br/>" +
                gravaRM.values[0].RETORNO
            );
            return false;
        }
    } else {
        MensagemAlerta(
            "Atenção",
            "<h3>Erro para gravar o Historico ATEG, contate o Administrador</h3>"
        );
        return false;
    }
}

function openDocument(documentId) {
    const url =
        "/portal/p/Faeg/ecmnavigation?app_ecm_navigation_doc=" + documentId;
    window.open(url);
}