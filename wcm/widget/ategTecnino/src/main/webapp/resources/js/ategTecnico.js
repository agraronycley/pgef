var dadosTabela = new Array();

/**
 * ategTecnico
 */
console.log('ategTecnico.js Loading...');

var HelloWorld = SuperWidget.extend({
    myTable: null,
    mydata: new Array(),
    tableData: null,
    codigoPPessoa: "",
    codigoProfessor: "",
    message: null,
    init: function() {
        //code
        $('.pageTitle').parent().remove();

        this.getUserLogged();
        //NOTE: ** Start Variables **
        $myLoading = FLUIGC.loading(window);
        $myInstanceId = this.instanceId;
        var that = this;
        var eprofessor = this.getTeacherData();
        if (eprofessor != "") {
            that.codigoPPessoa = eprofessor.codpessoa;
            that.codigoProfessor = eprofessor.codprofessor;
        }
        that.mydata = new Array();
        this.getPropertyTec();
        this.getProducerTec();
        this.loadfunctions();
    },
    bindings: {
        local: {
            'show-message': ['click_showMessage'],
            'navhref-producer': ['click_showProducer'],
            'navhref-propriety': ['click_showPropriety'],
            'navhref-technical': ['click_showTechnical'],
            'navhref-bond': ['click_showBond'],
            'navhref-report-scheduling': ['click_showScheduling'],
            'navhref-report-provision': ['click_showProvision'],

            'button-search': ['click_showSearch'],
            'button-schedule-visit': ['click_showScheduleVisit'],
            'button-contract': ['click_showContract'],

            'btnhref-date-previous': ['click_showDatePrevious'],
            'btnhref-date-next': ['click_showDateNext'],

            'button-view-event': ['click_showViewEvent'],
            'button-scheduling-pending': ['click_showSchedulingPending'],
            'button-scheduling-approved': ['click_showSchedulingApproved'],
            'button-scheduling-disapproved': ['click_showSchedulingDisapproved'],
            'button-scheduling-notscheduled': ['click_showSchedulingNotscheduled'],
            'button-scheduling-all': ['click_showSchedulingAll'],
        },
        global: {}
    },
    showViewEvent: function(el, ev) {
        //console.log('showViewEvent - el:', el, 'ev:', ev);
        this.processo = el.children[0].id;
        if ($modalFluig !== undefined && $modalFluig != null && $modalFluig.isOpen()) {
            return false;
        }
        this.cts = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', this.processo, this.processo, ConstraintType.MUST);
        this.cts2 = DatasetFactory.createConstraint('originalMovementSequence', '1', '1', ConstraintType.MUST_NOT);
        this.dataset = DatasetFactory.getDataset('processAttachment', null, new Array(this.cts, this.cts2), null);
        var img;
        if (this.dataset.values.length > 0) {
            html = "";
            for (var i = 0; i < this.dataset.values.length; i++) {
                img = '/webdesk/streamcontrol/?WDCompanyId=1&WDNrDocto=' + this.dataset.values[i]['documentId'] + '&WDNrVersao=1000&thumbnail=480_AUTO';
                html += '<div class="col-sm-4 col-xs-12"><a class="thumbnail" href="' + img + '" target="_blank"><img src="' + img + '" width="100%" heigth="100%"></a></div>';
            }
            this.actions = [{
                'label': 'Ok',
                'autoClose': true
            }];
            loadShowModal('Fotos da propriedade rural', html, this.actions, 'fluig-visualizar-evento', 'full', false);
        } else {
            MensagemAlerta('Atenção', 'Esta visita não possui fotos.');
        }
    },
    showStartLoad: function(el, ev) {
        //console.log('showStartLoad - el:', el, 'ev:', ev);
        this.showSearch();

        //$("#btnAgendarVisita, #btnRecomendacao, #btnEditPropriedade").prop("disabled", true);
        $("#divTabela").fadeIn();

        function highlight(e) {
            if (e.target.parentNode.id != "" && e.target.nodeName != "SPAN") {
                var linhaClicada = e.target;
                var linhaAtiva = selected[0];
                var habilita = true;

                if (linhaAtiva && linhaAtiva.className != '') {
                    if (linhaClicada.parentNode.id != linhaAtiva.id) {
                        linhaClicada.parentNode.className = 'active';
                        habilita = false;
                    }
                    linhaAtiva.className = "";
                } else {
                    linhaClicada.parentNode.className = 'active';
                    habilita = false;
                }
                //$("#btnAgendarVisita, #btnRecomendacao, #btnEditPropriedade").prop("disabled", habilita);
            }
        }
        var table = document.getElementById('table');
        selected = table.getElementsByClassName('active');
        table.onclick = highlight;
        $(".fc-corner-left").on('click', function() {
            alert('teste');
        });

        loadingOnButtons();
    },
    showSearch: function(el, ev) {
        //console.log('showSearch - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        myLoading("Aguarde", "Carregando dados dos agendamentos..", "MontaTabela", true, true);
        this.showIndicatorProperty();
        //$("#btnAgendarVisita, #btnRecomendacao, #btnEditPropriedade").prop("disabled", true);
    },
    showScheduleVisit: function(el, ev) {
        //console.log('showScheduleVisit - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        this.url = '/portal/p/Faeg/pageworkflowview?processID=ATeGVisitaTecnica';
        loadOpen(this.url);
    },
    showContract: function(el, ev) {
        //console.log('showContract - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        this.url = '/portal/p/Faeg/ateggcon_tecnico';
        loadOpen(this.url);
    },
    showProducer: function(el, ev) {
        //console.log('showProducer - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/produtor/index.html" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Produtor Rural', this.content, [], 'fluig-produtor', 'full', true);
        }, 500);
    },
    showPropriety: function(el, ev) {
        //console.log('showPropriety - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/propriedade/index.html" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Propriedade Rural', this.content, [], 'fluig-propriedade', 'full', true);
        }, 500);
    },
    showTechnical: function(el, ev) {
        //console.log('showTechnical - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/tecnico/index.html" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Técnico de Campo', this.content, [], 'fluig-tecnico', 'full', true);
        }, 500);
    },
    showBond: function(el, ev) {
        //console.log('showBond - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/vinculos/index.html" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            this.actions = [{
                'label': 'Ok',
                'bind': 'data-modal-save',
                'classType': 'btn btn-primary modalButtonOk',
                'autoClose': true
            }];
            loadShowModal('ATeG - Técnico de Campo - Vínculos do Técnico', this.content, this.actions, 'fluig-vinculos', 'full', true);
        }, 500);
    },
    showScheduling: function(el, ev) {
        //console.log('showScheduling - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/relatoriovisitamensal/index.html" width="100%" height="' + ($("#wcm-content").height()) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Visitas Agendas no Mês', this.content, [], 'fluig-agenda-visita', 'full', true);
        }, 500);
    },
    showProvision: function(el, ev) {
        //console.log('showProvision - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        setTimeout(function() {
            this.content = '<iframe src="/ategTecnico/resources/js/relatorioprestacaoservico/index.html" width="100%" height="' + ($("#wcm-content").height()) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Relatório Mensal de Prestação de Serviços - Programa Senar Mais', this.content, [], 'fluig-relatorio-prestacao-servico', 'full', true);
        }, 500);
    },
    loadfunctions: function(el, ev) {
        //console.log('loadfunctions - el:', el, 'ev:', ev);
        this.loadDefault();
        this.getProperty();
        $("#ano_mes").val(moment().format("YYYY-MM"));
        BotaoSwitch();
        $("#divCalendario").fadeOut();
        var that = this;
        setTimeout(function() {
            that.showReloadZoom();
            that.showStartLoad();
        }, 500);
    },
    showReloadZoom: function(el, ev) {
        //console.log('showReloadZoom - el:', el, 'ev:', ev);
        //NOTE: Atualiza campo propriedade
        this.filterValues_prop = ("FILTROIN,ID IN(" + $metaData.propRural.join('@') + ")");
        reloadZoomFilterValues('propriedade_nome', this.filterValues_prop);
        //NOTE: Atualiza campo municipio
        this.filterValues_mun = ("CODETDMUNICIPIO,GO,FILTROIN,CODMUNICIPIO IN(" + $metaData.munPropRural.join('@') + ")");
        reloadZoomFilterValues('propriedade_municipio', this.filterValues_mun);
        //NOTE: Atualiza campo cadeia produtiva
        this.filterValues_cad = ("FILTROIN,CODIGO IN(" + $metaData.cadPropRural.join('@') + ")");
        reloadZoomFilterValues('propriedade_cadeia', this.filterValues_cad);
        //NOTE: Atualiza campo produtor rural
        this.filterValues_prod = ("FILTROIN,CODIGO IN(" + $metaData.prodRural.join('@') + ")");
        reloadZoomFilterValues('produtor_rural', this.filterValues_prod);
    },
    getUserLogged: function(el, ev) {
        //console.log('getUserLogged - el:', el, 'ev:', ev);
        if (this.getValidUser('grupoTI')) {
            var emailPadrao = 'alyson.tec@outlook.com';
            if (confirm('Executar função de Debug?')) {
                emailTecnico = prompt("Deseja alterar o email?", emailPadrao);
                emailTecnico = (emailTecnico == '' || emailTecnico === undefined || emailTecnico === null) ? WCMAPI.userEmail : emailTecnico;
                $('div#divAlertDebug').show();
                $('div#divAlertDebug').find('div.alert.alert-info.alert-dismissible').find('span[id=messageAlert]').text('');
                $('div#divAlertDebug').find('div.alert.alert-info.alert-dismissible').find('span[id=messageAlert]').append('Função Debbug ativado para o email: <i><strong>' + emailTecnico + '</strong></i>!');
            } else {
                $('div#divAlertDebug').hide();
            }
        } else {
            $('div#divAlertDebug').hide();
            emailTecnico = parent.WCMAPI.userEmail;
        }
    },
    getPersonData: function(el, ev) {
        //console.log('getPersonData - el:', el, 'ev:', ev);
        this.usermail = emailTecnico;
        this.cst = DatasetFactory.createConstraint('PROFESSOR', '1', '1', ConstraintType.MUST);
        this.cst1 = DatasetFactory.createConstraint('EMAIL', this.usermail, this.usermail, ConstraintType.MUST);
        this.constraints = new Array(this.cst, this.cst1)
        this.dsPessoa = DatasetFactory.getDataset('rm_senar_ppessoa_readview', null, this.constraints, null);
        if (this.dsPessoa != null && this.dsPessoa.values != null && this.dsPessoa.values.length > 0) {
            var i = 0;
            this.retorno.codpessoa = this.dsPessoa.values[i].CODIGO;
            this.retorno.email = this.dsPessoa.values[i].EMAIL;
        }
        return this.retorno;
    },
    getTeacherData: function(el, ev) {
        //console.log('getTeacherData - el:', el, 'ev:', ev);
        this.retorno = new Object({ codprofessor: '', codpessoa: '' });
        this.userperson = this.getPersonData();
        this.cst = DatasetFactory.createConstraint('CODPESSOA', this.userperson.codpessoa, this.userperson.codpessoa, ConstraintType.MUST);
        this.cst1 = DatasetFactory.createConstraint('EMAIL', this.userperson.email, this.userperson.email, ConstraintType.MUST);
        this.constraints = new Array(this.cst, this.cst1)
        this.dsProfessor = DatasetFactory.getDataset('rm_senar_professor_readview_offline', null, this.constraints, null);
        if (this.dsProfessor != null && this.dsProfessor.values != null && this.dsProfessor.values.length > 0) {
            var i = 0;
            this.retorno.codpessoa = this.dsProfessor.values[i].CODPESSOA;
            this.retorno.codprofessor = this.dsProfessor.values[i].CODPROF;
        }
        return this.retorno;
    },
    getValidUser: function(groupId, el, ev) {
        //console.log('getValidUser - el:', el, 'ev:', ev);
        this.cst = DatasetFactory.createConstraint('colleagueGroupPK.colleagueId', WCMAPI.userCode, WCMAPI.userCode, ConstraintType.MUST);
        this.cst2 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', groupId, groupId, ConstraintType.MUST);
        this.dsColleague = DatasetFactory.getDataset('colleagueGroup', null, new Array(this.cst, this.cst2), null);
        if (this.dsColleague != null && this.dsColleague.values != null && this.dsColleague.values.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    getProducerTec: function(el, ev) {
        //console.log('getProducerTec - el:', el, 'ev:', ev);
        var codigoProfessor = this.codigoProfessor;
        this.cst = DatasetFactory.createConstraint('CODPROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST);
        this.cst2 = DatasetFactory.createConstraint('SITUACAO', '1', '1', ConstraintType.MUST);
        this.dsTecProdutor = DatasetFactory.getDataset('rm_senar_zmdtecnicoprodutorrural_readview', null, new Array(this.cst, this.cst2), null);
        if (this.dsTecProdutor != null && this.dsTecProdutor.values != null && this.dsTecProdutor.values.length > 0) {
            for (var i = 0; i < this.dsTecProdutor.values.length; i++) {
                $metaData.prodRural.push(this.dsTecProdutor.values[i].CODPESSOA);
            }
        }
    },
    getPropertyTec: function(el, ev) {
        //console.log('getPropertyTec - el:', el, 'ev:', ev);
        var codigoProfessor = this.codigoProfessor;
        this.cst = DatasetFactory.createConstraint('CODPROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST);
        this.cst2 = DatasetFactory.createConstraint('SITUACAO', '1', '1', ConstraintType.MUST);
        this.dsTecPropriedade = DatasetFactory.getDataset('rm_senar_zmdtecnicopropriedaderural_readview', null, new Array(this.cst, this.cst2), null);
        if (this.dsTecPropriedade != null && this.dsTecPropriedade.values != null && this.dsTecPropriedade.values.length > 0) {
            for (var i = 0; i < this.dsTecPropriedade.values.length; i++) {
                $metaData.propRural.push(this.dsTecPropriedade.values[i].IDPROPRIEDADE);
            }
        }
    },
    getProperty: function(el, ev) {
        //console.log('getProperty - el:', el, 'ev:', ev);
        if ($metaData.prodRural.length > 0 || $metaData.propRural.length > 0) {
            this.filtro = "";
            this.filtro += (($metaData.propRural.length > 0) ? ("ID IN(" + $metaData.propRural.join('@') + ")") : "");
            this.filtro += ((this.filtro != "" && $metaData.prodRural.length > 0) ? " AND " : "");
            this.filtro += (($metaData.prodRural.length > 0) ? ("CODPESSOA IN(" + $metaData.prodRural.join('@') + ")") : "");
            this.cts = DatasetFactory.createConstraint('FILTROIN', this.filtro, this.filtro, ConstraintType.MUST);
            this.dsPropriedade = DatasetFactory.getDataset('rm_senar_zmdpropriedaderural_readview', null, new Array(this.cts), null);
            if (this.dsPropriedade != null && this.dsPropriedade.values != null && this.dsPropriedade.values.length > 0) {
                $metaData['munPropRural'] = new Array();
                $metaData['cadPropRural'] = new Array();
                $metaData['datasetProp'] = this.dsPropriedade.values;
                for (var i = 0; i < this.dsPropriedade.values.length; i++) {
                    $metaData.munPropRural.push(this.dsPropriedade.values[i].MUNICIPIO);
                    $metaData.cadPropRural.push(this.dsPropriedade.values[i].CADEIAPRODUTIVA);
                }
            }
        }
    },
    showDatePrevious: function(el, ev) {
        //console.log('showDatePrevious - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        this.currentDate = $("#ano_mes").val();
        $("#ano_mes").val(loadIsDate(this.currentDate, 'subtract'));
        this.showSearch(el, ev);
    },
    showDateNext: function(el, ev) {
        //console.log('showDateNext - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        this.currentDate = $("#ano_mes").val();
        $("#ano_mes").val(loadIsDate(this.currentDate, 'add'));
        this.showSearch(el, ev);
    },
    showIndicatorProperty: function(el, ev) {
        //console.log('showIndicatorProperty - el:', el, 'ev:', ev);
        var propriedade = $metaData.datasetProp.length;
        var propriedadeAtiva = 0;
        var propriedadeAgendada = 0;
        /** Indicadores do Painel **/
        this.data = document.getElementById('ano_mes').value;
        this.ardata = this.data.split('-');
        this.lastDay = (new Date(this.ardata[0], this.ardata[1], 0)).getDate();
        var datainicio = `${this.data}-01`;
        var datafim = `${this.data}-${this.lastDay}`;
        var codigoProfessor = this.codigoProfessor;
        var constraints = new Array(
            DatasetFactory.createConstraint('CODPROFTECNICO', codigoProfessor, codigoProfessor, ConstraintType.MUST),
            DatasetFactory.createConstraint('DTINICIAL', datainicio, datainicio, ConstraintType.MUST),
            DatasetFactory.createConstraint('DTFINAL', datafim, datafim, ConstraintType.MUST)
        );
        DatasetFactory.getDataset("rm_senar_consultaSql_FLUIG_S084", null, constraints, null, {
            success: function(data) {
                if (data != null && data.values != null && data.values.length > 0) {
                    var records = data.values[0]
                    propriedadeAtiva = ((records.QTDPROPRURAL_ATIVA) ? parseInt((records.QTDPROPRURAL_ATIVA.toString()).trim()) : 0);
                    $metaData['propAtiva'] = ((records.QTDPROPRURAL_ATIVA) ? parseInt((records.QTDPROPRURAL_ATIVA.toString()).trim()) : 0);
                    propriedadeAgendada = ((records.QTDPROPRURAL_AGENDADA) ? parseInt((records.QTDPROPRURAL_AGENDADA.toString()).trim()) : 0);
                    $metaData['propAgendada'] = ((records.QTDPROPRURAL_AGENDADA) ? parseInt((records.QTDPROPRURAL_AGENDADA.toString()).trim()) : 0);
                    $('span#property_active').text(`${propriedadeAtiva}/${propriedade}`);
                    $('span#property_scheduled').text(`${propriedadeAgendada}/${propriedadeAtiva}`);
                } else {
                    $('span#property_active').text(`${propriedadeAtiva}/${propriedade}`);
                    $('span#property_scheduled').text(`${propriedadeAgendada}/${propriedadeAtiva}`);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown);
            }
        });
        /*
        this.cts = DatasetFactory.createConstraint('CODPROF_TECNICO', codigoProfessor, codigoProfessor, ConstraintType.MUST);
        this.cts2 = DatasetFactory.createConstraint('DTFINAL', datafim, datafim, ConstraintType.MUST);		
        this.dsFLUIGS0084 = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIGS0084', null, new Array(this.cts, this.cts2), null);
        if (this.dsFLUIGS0084 != null && this.dsFLUIGS0084.values != null && this.dsFLUIGS0084.values.length > 0) {
        	propriedadeAtiva = this.dsFLUIGS0084.values.length;			
        	$metaData['propAtiva'] = this.dsFLUIGS0084.values.length;
        	var arPropAtiva = new Array();
        	for(var i = 0; i < this.dsFLUIGS0084.values.length; i++){
        		this.records = this.dsFLUIGS0084.values[i];			
        		arPropAtiva.push(this.records.ID_PROPRIEDADE);
        	}			
        	var idPropriedade = ("IDPROPRIRURAL IN("+ arPropAtiva.join('@') +")");
        	this.c1 = DatasetFactory.createConstraint('CODPROF', codigoProfessor, codigoProfessor, ConstraintType.MUST);
        	this.c2 = DatasetFactory.createConstraint('DATAAGENDAMENTO', datainicio, datafim, ConstraintType.MUST);
        	this.c3 = DatasetFactory.createConstraint('FILTROIN', idPropriedade, idPropriedade, ConstraintType.MUST);
        	this.dsAgendamento = DatasetFactory.getDataset('rm_senar_zmdategagendamentotecnico_readview', null, new Array(this.c1, this.c2, this.c3), null);
        	if (this.dsAgendamento != null && this.dsAgendamento.values != null && this.dsAgendamento.values.length > 0) {
        		propriedadeAgendada = this.dsAgendamento.values.length;
        		$metaData['propAgendada'] = this.dsAgendamento.values.length;
        	}			
        }
        */
        //$("ul#listproperty").show();
    },
    showSchedulingApproved: function(el, ev) {
        //console.log('showSchedulingApproved - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        $("#agenda_status").val("1");
        this.showSearch(el, ev);
    },
    showSchedulingDisapproved: function(el, ev) {
        //console.log('showSchedulingDisapproved - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        $("#agenda_status").val("2");
        this.showSearch(el, ev);
    },
    showSchedulingPending: function(el, ev) {
        //console.log('showSchedulingPending - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        $("#agenda_status").val("3");
        this.showSearch(el, ev);
    },
    showSchedulingNotscheduled: function(el, ev) {
        //console.log('showSchedulingNotscheduled - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        $("#agenda_status").val("4");
        this.showSearch(el, ev);
    },
    showSchedulingAll: function(el, ev) {
        //console.log('showSchedulingAll - el:', el, 'ev:', ev);
        loadShowButton(el, ev);
        $("#agenda_status").val("");
        this.showSearch(el, ev);
    },
    loadDefault: function(el, ev) {
        //console.log('loadDefault - el:', el, 'ev:', ev);
        //permite digitar somente numeros
        $('body').on('keypress', '[data-only-numbers]', function(ev) {
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
        $('.create-form-components').on('keyup', 'input[required="required"][type="text"], input[required="required"][type="number"], input[required="required"][type="date"], textarea[required="required"]', function() {
            validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
        });
        $('.create-form-components').on('change', 'input[required="required"][type="checkbox"], input[required="required"][type="radio"], select[required="required"]',
            function() {
                validationFieldsForm($(this), $(this).parents('.form-field').data('type'));
            });

        function validationFieldsForm(field, type) {
            if (type === "checkbox" || type === "radio") {
                if (!field.is(':checked')) {
                    field.parents('.form-field').addClass('required');
                } else {
                    field.parents('.form-field').removeClass('required');
                }
            } else {
                if (!field.val().trim()) {
                    field.parents('.form-field').addClass('required');
                } else {
                    field.parents('.form-field').removeClass('required');
                }
            }
        }
        var $zoomPreview = $(".zoom-preview");
        if ($zoomPreview.length) {
            $zoomPreview.parent().removeClass("input-group");
            $zoomPreview.remove();
        }
        var ratings = $(".rating");
        if (ratings.length > 0)
            ratingStars(ratings);

        function ratingStars(stars) {
            $.each(stars, function(i, obj) {
                var field = $(this).closest(".form-group").find(
                    ".rating-value");
                var tgt = $(obj);
                tgt.html("");
                var rating = FLUIGC.stars(tgt, {
                    value: field.val()
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
    },
});

$(document).on('shown.bs.modal', function() {
    //  Initialize image and canvas
    var element = null;
    element = $("iframe").contents().find('#fluig-produtor');
    element = $("iframe").contents().find('#fluig-propriedade');
    element = $("iframe").contents().find('#fluig-tecnico');
    element = $("iframe").contents().find('#fluig-agenda-visita');
    element = $("iframe").contents().find('#fluig-relatorio-prestacao-servico');
    if (element != null && element != undefined) {
        loadHideButton();
    }
});

function BtnVisualizarEvento() {
    $("*button#btnVisualizarEvento").off().on('click', function(event) {
        HelloWorld.showViewEvent(this, event);
    });
};

function loadingOnButtons() {
    $("#btnEditPropriedade").on("click", function() {
        var selecionado = $(".active")[0].id;
        var idPropriRural = selecionado.split("_")[1];
        if (idPropriRural != "") {
            this.content = '<iframe src="/ategTecnico/resources/js/propriedade/index.html?idPropriedade=' + idPropriRural + '" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Propriedade Rural', this.content, [], 'fluig-propriedade', 'full', true);
        } else {
            FLUIGC.toast({
                message: 'Favor selecionar um registro!',
                type: 'danger'
            });
        }
    });
    $("#btnRecomendacao").on("click", function() {
        var selecionado = $(".active")[0].id;
        var idPropriRural = selecionado.split("_")[1];
        if (idPropriRural != "") {
            this.content = '<iframe src="/ategTecnico/resources/js/recomendacoes/index.html?idPropriedade=' + idPropriRural + '" width="100%" height="' + ($("#wcm-content").height() * 0.78) + '" style="border:none;overflow:auto;"></iframe>';
            loadShowModal('Recomendações', this.content, [], 'fluig-recomendacao', 'full', true);
        } else {
            FLUIGC.toast({
                message: 'Favor selecionar um registro!',
                type: 'danger'
            });
        }
    });
};

function MontaTabela() {
    var codigoProfessor = (window["HelloWorld_" + $("#campoInstanceId").val()].codigoProfessor).trim();

    var dataInicioEvento = (getElement('ano_mes')).trim();
    var numeroEvento = (getElement('turma_evento')).trim();
    var codigoPropriedade = (getElement('codPropriedade')).trim();
    var nomePropriedade = (getElement('propriedade_nome')).trim();
    var nomeMunicipio = (getElement('propriedade_municipio')).trim();
    var codigoMunicipio = (getElement('codUf') + getElement('codMunicipio')).trim();
    var codigoCadeiaProdutiva = (getElement('codCadeiaProdutiva')).trim();
    var codigoProdutor = (getElement('codProdutor')).trim();
    var problema = (getElement('problema')).trim();
    //var agendaStatus = (getElement('agenda_status')).trim();

    var tabelaCorpo = $("#tabela tbody");
    $("#tabela tbody tr").remove();
    var constraints = new Array();
    if (codigoProfessor) {
        constraints.push(DatasetFactory.createConstraint('CODIGO_TECNICO_PROFESSOR', codigoProfessor, codigoProfessor, ConstraintType.MUST));
    }
    if (dataInicioEvento) {
        dataInicioEvento = ((dataInicioEvento.split('-').join('')) + '01').trim();
        constraints.push(DatasetFactory.createConstraint('DATA_INICIAL_EVENTO', dataInicioEvento, dataInicioEvento, ConstraintType.MUST));
    }
    if (numeroEvento) {
        constraints.push(DatasetFactory.createConstraint('EVENTO', numeroEvento, numeroEvento, ConstraintType.MUST));
    }
    if (codigoPropriedade) {
        constraints.push(DatasetFactory.createConstraint('CODIGO_DA_PROPRIEDADE', codigoPropriedade, codigoPropriedade, ConstraintType.MUST));
    }
    if (nomePropriedade) {
        constraints.push(DatasetFactory.createConstraint('NOME_PROPRIEDADE', nomePropriedade, nomePropriedade, ConstraintType.MUST));
    }
    if (codigoMunicipio) {
        constraints.push(DatasetFactory.createConstraint('CODMUNICIPIO', codigoMunicipio, codigoMunicipio, ConstraintType.MUST));
    }
    if (nomeMunicipio) {
        constraints.push(DatasetFactory.createConstraint('MUNICIPIO', nomeMunicipio, nomeMunicipio, ConstraintType.MUST));
    }
    if (codigoCadeiaProdutiva) {
        constraints.push(DatasetFactory.createConstraint('CADEIAPRODUTIVA_PROPRIEDADE_CODIGO', codigoCadeiaProdutiva, codigoCadeiaProdutiva, ConstraintType.MUST));
    }
    if (codigoProdutor) {
        constraints.push(DatasetFactory.createConstraint('CODIGO_PRODUTOR', codigoProdutor, codigoProdutor, ConstraintType.MUST));
    }
    var dsAgendamentoTecnico = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIG048', null, constraints, null);
    if (dsAgendamentoTecnico != null && dsAgendamentoTecnico.values != null && dsAgendamentoTecnico.values.length > 0) {
        var html = "";
        var arrFiltro = new Array();
        if (dsAgendamentoTecnico.values.length > 0) {
            dsAgendamentoTecnico = _.orderBy(dsAgendamentoTecnico.values, ['NOME_PRODUTOR'], ['asc']);
            for (var i = 0; i < dsAgendamentoTecnico.length; i++) {
                this.records = dsAgendamentoTecnico[i];
                var constraints_form = new Array(
                    DatasetFactory.createConstraint('codPressorInstrutor', codigoProfessor, codigoProfessor, ConstraintType.MUST),
                    DatasetFactory.createConstraint('idAgentamento', this.records.ID_AGENDAMENTO, this.records.ID_AGENDAMENTO, ConstraintType.MUST),
                    DatasetFactory.createConstraint('idTurmaDisc', this.records.IDTURMADISC, this.records.IDTURMADISC, ConstraintType.MUST),
                    DatasetFactory.createConstraint('evento', this.records.EVENTO, this.records.EVENTO, ConstraintType.MUST),
                    DatasetFactory.createConstraint('codigoZoomProdutorRural', this.records.CODIGO_PRODUTOR, this.records.CODIGO_PRODUTOR, ConstraintType.MUST),
                    DatasetFactory.createConstraint('codigoZoomPropriedadeRural', this.records.CODIGO_DA_PROPRIEDADE, this.records.CODIGO_DA_PROPRIEDADE, ConstraintType.MUST)
                );
                if (problema) {
                    constraints_form.push(DatasetFactory.createConstraint('PROBLEMA', problema, problema, ConstraintType.MUST));
                }
                var dsAgendamentoTecForm = DatasetFactory.getDataset('rm_senar_consultaSql_FLUIGVISITAATEG', null, constraints_form, null);
                if (dsAgendamentoTecForm != null && dsAgendamentoTecForm.values != null && dsAgendamentoTecForm.values.length > 0) {
                    var x = 0;
                    this.record = dsAgendamentoTecForm.values[x];
                    this.records.PROCESSO = (this.records.PROCESSO == "") ? this.record.NUM_PROCES : this.records.PROCESSO;
                    this.records.NUM_PROCES = (this.records.NUM_PROCES == "") ? this.record.NUM_PROCES : this.records.NUM_PROCES;
                    this.records.MATRICULA = this.record.COD_MATR_REQUISIT;
                    this.records.PROBLEMA = (this.record.problema == 'sim') ? 'Sim' : 'Não';
                    this.records.CURRENTMOVTO = this.record.CURRENTMOVTO;
                    if (arrFiltro.indexOf(this.records.PROCESSO) === -1) {
                        arrFiltro.push(this.records.PROCESSO);
                        var inprocesso = this.records.PROCESSO;
                        var inusuario = WCMAPI.userCode;
                        var link = '/portal/p/Faeg/pageworkflowview?app_ecm_workflowview_processInstanceId=' + inprocesso + '&app_ecm_workflowview_currentMovto=' + this.records.CURRENTMOVTO + '&app_ecm_workflowview_taskUserId=' + inusuario + '&app_ecm_workflowview_managerMode=false';
                        var disabled = ((this.records.PROCESSO_STATUS == 'Finalizado' || this.records.PROCESSO_STATUS == 'Realizado') ? '' : 'disabled');
                        var identificador = this.records.CODIGO_DA_PROPRIEDADE + "_" + new Date().getTime().toString();
                        html = "<tr id='" + identificador + "'>";
                        html += '<td>';
                        html += '<button type="button" name="btnVisualizarEvento" id="btnVisualizarEvento" class="btn btn-default" ' + disabled + ' data-button-view-event="${instanceId}" title="Visualizar Informações" data-loading-text="<i class=\'fluigicon fluigicon-tint\'></i> Aguarde...">';
                        html += '<span class="fluigicon fluigicon-picture fluigicon-md" id="' + this.records.PROCESSO + '"></span>';
                        html += '</button>';
                        html += '</td>';
                        html += "<td>" + this.records.SEQUENCIA + "</td>";
                        html += "<td>" + this.records.EVENTO + "</td>";
                        html += "<td>" + this.records.NOME_PRODUTOR + "</td>";
                        html += "<td>" + this.records.NOME_PROPRIEDADE + "</td>";
                        html += "<td>" + this.records.MUNICIPIO + "</td>";
                        html += "<td>" + this.records.PROJETO_PROGRAMA_PROPRIEDADE + "</td>";
                        html += "<td>" + this.records.CADEIAPRODUTIVA_PROPRIEDADE + "</td>";
                        html += "<td>" + dataDDMMYYYY(this.records.DATA_AGENDAMENTO) + "</td>";
                        html += "<td>" + dataDDMMYYYY(this.records.DATA_REAL_VISITA) + "</td>";
                        html += "<td>" + this.records.PROCESSO_STATUS + "</td>";
                        html += "<td>" + this.records.PROBLEMA + "</td>";
                        html += "<td><a href='" + link + "' target='_blank'>" + this.records.PROCESSO + "</a></td>";
                        html += "</tr>";
                        tabelaCorpo.append(html);

                        dadosTabela.push({
                            SEQUENCIA: this.records.SEQUENCIA,
                            EVENTO: this.records.EVENTO,
                            NOME_PRODUTOR: this.records.NOME_PRODUTOR,
                            NOME_PROPRIEDADE: this.records.NOME_PROPRIEDADE,
                            MUNICIPIO: this.records.MUNICIPIO,
                            PROJETO_PROGRAMA_PROPRIEDADE: this.records.PROJETO_PROGRAMA_PROPRIEDADE,
                            CADEIAPRODUTIVA_PROPRIEDADE: this.records.CADEIAPRODUTIVA_PROPRIEDADE,
                            DATA_AGENDAMENTO: dataDDMMYYYY(this.records.DATA_AGENDAMENTO),
                            DATA_REAL_VISITA: dataDDMMYYYY(this.records.DATA_REAL_VISITA),
                            PROCESSO_STATUS: this.records.PROCESSO_STATUS,
                            PROBLEMA: this.records.PROBLEMA,
                            PROCESSO: this.records.PROCESSO,
                            CODIGO_DA_PROPRIEDADE: this.records.CODIGO_DA_PROPRIEDADE
                        });
                    }
                }
            }
        }
    }
    loadHideButton();
};