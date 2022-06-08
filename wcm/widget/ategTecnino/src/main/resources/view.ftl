<head>
    <meta charset="utf-8" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <link href="/portal/resources/style-guide/css/fluig-style-guide.min.css" rel="stylesheet" type="text/css">
    <link href="/portal/resources/style-guide/css/fluig-style-guide-flat.min.css" rel="stylesheet" type="text/css">
    <script src="/portal/resources/js/jquery/jquery-ui.min.js" type="text/javascript"></script>
    <script src="/portal/resources/js/mustache/mustache-min.js" type="text/javascript"></script>
    <script src="/portal/resources/style-guide/js/fluig-style-guide.min.js" type="text/javascript"></script>
    <link href="/portal/resources/style-guide/css/fluig-style-guide-filter.min.css" rel="stylesheet" type="text/css">
    <script src="/portal/resources/style-guide/js/fluig-style-guide-filter.min.js" type="text/javascript"></script>
    <script src="/webdesk/vcXMLRPC.js" type="text/javascript"></script>
</head>
<div id="HelloWorld_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="HelloWorld.instance({message: 'Iniciando...'})">

    <!-- div Alerta de Debbug -->
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="divAlertDebug" style="display:none">
                <div class="alert alert-info alert-dismissible" role="alert">
                    <button type="button" class="close" data-dismiss="alert">
						<span aria-hidden="true">×</span>
						<span class="sr-only">Close</span>
					</button>
                    <span>
                    	<strong>Aten&ccedil;&atilde;o!</strong>
                    	<span id="messageAlert"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <!-- div Cabecalho do Painel -->
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="page-header">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <img src="https://fluig.sistemafaeg.org.br/portal/api/servlet/image/Faeg/custom/logo_image.png" alt="SENAR" style="padding: 0px 0px 0px 0px; max-width: 150px;">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <h1 class="fs-no-margin fs-ellipsis fs-full-width text-center" style="color:#58595b;">${pageTitle}</h1>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 pull-right">&nbsp;</div>
                </div>
            </div>
        </div>
    </div>

    <!-- div Navbar do Painel -->
    <div class="row">
        <input type="hidden" id="campoInstanceId" name="campoInstanceId" value="${instanceId}" />
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div id="customizado">
                <ul>
                    <li class="_dropdown">
                        <a href="#" class="dropbtn">Cadastro <span class="caret"></span></a>
                        <div class="_dropdown-content">
                            <a href="#" id="navProdutor" data-navhref-producer="${instanceId}">Produtor</a>
                            <a href="#" id="navPropriedade" data-navhref-propriety="${instanceId}">Propriedade</a>
                        </div>
                    </li>
                    <li>
                        <a href="#" id="navPainelTecnico" data-navhref-technical="${instanceId}">Painel do T&eacute;cnico</a>
                    </li>
                    <li>
                        <a href="#" id="navVinculo" data-navhref-bond="${instanceId}">Vinculos</a>
                    </li>
                    <li class="_dropdown">
                        <a href="#" class="dropbtn">Relat&oacute;rio <span class="caret"></span></a>
                        <div class="_dropdown-content">
                            <a href="#" id="navAgendamento" data-navhref-report-scheduling="${instanceId}">Visitas Agendadas no M&ecirc;s</a>
                            <a href="#" id="navPrestacaoServico" data-navhref-report-provision="${instanceId}">Relat&oacute;rio Mensal de Presta&ccedil;&atilde;o de Servi&ccedil;os - Programa Senar Mais</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- div Filtros do Painel -->
    <div class="row">
    	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<fieldset id="fsFiltros">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title"><i class="fluigicon fluigicon-filter icon-sm"></i>&nbsp;Filtros</h3>
					</div>
					<div class="panel-body">
				        <div class="form-group fs-clearfix">
				            <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
								<div class="form-field" data-type="textbox" data-show-properties="" data-field-name="ano_mes" title="">
									<label for="ano_mes" class="control-label">Data&nbsp;Evento</label>
									<input type="month" name="ano_mes" id="ano_mes" class="form-control" data-date="" data-size="small"/>
								</div>
							</div>	
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
								<div class="form-field" data-type="textbox" data-show-properties="" data-field-name="turma_evento" title="">
									<label for="turma_evento" class="control-label">Evento</label>
									<input type="text" name="turma_evento" id="turma_evento" class="form-control" data-size="small"/>
								</div>
							</div>
				            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
								<div class="form-field" data-type="zoomfield" data-show-properties="" data-field-name="propriedade_nome" title="">														
									<input type="hidden" name="codPropriedade" id="codPropriedade"/>
									<label for="propriedade_nome" class="control-label">Propriedade</label> 
									<input type="zoom" id="propriedade_nome" name="propriedade_nome" class="form-control" data-zoom="{
										'displayKey':'NOME',
										'datasetId':'rm_senar_zmdpropriedaderural_readview',
										'filterValues':'ID,0',
										'maximumSelectionLength':'1',
										'placeholder':'',
										'fields':[
											{'field':'NOME','label':'Propriedade','standard':'true','search':'true'},
											{'field':'ID','label':'C&oacute;digo Propriedade'}																								
									]}" data-size="small"/>
								</div>
							</div>
				            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
								<div class="form-field" data-type="zoomfield" data-show-properties="" data-field-name="propriedade_municipio" title="">
									<input type="hidden" name="codMunicipio" id="codMunicipio" value=""/>
									<input type="hidden" name="codUf" id="codUf" value=""/>
									<label for="propriedade_municipio" class="control-label">Munic&iacute;pio</label>
									<input type="zoom" name="propriedade_municipio" id="propriedade_municipio" class="form-control" data-zoom="{
										'displayKey':'NOMEMUNICIPIO',
										'datasetId':'rm_senar_municipioestado_readview',
										'filterValues':'CODETDMUNICIPIO,GO',
										'maximumSelectionLength':'1',
										'placeholder':'',
										'fields':[
											{'field':'NOMEMUNICIPIO','label':'Munic&iacute;pio','standard':'true','search':'true'},
											{'field':'CODMUNICIPIO','label':'C&oacute;digo Munic&iacute;pio','visible':'false'},
											{'field':'CODETDMUNICIPIO','label':'Estado','visible':'false'}
									]}" data-size="small"/>
								</div>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 pull-right" style="margin-top: -20px">
				                <label for="listproperty">&nbsp;</label>
				                <ul class="list-group" id="listproperty">
				                	<li class="list-group-item _list-item disabled">
				                        <strong>Propriedades&nbsp;</strong>
				                    </li>
				                    <li class="list-group-item _list-item">
				                        <span class="badge badge-info" id="property_active"></span>&nbsp;Ativas
				                    </li>
				                    <li class="list-group-item _list-item">
				                        <span class="badge badge-success" id="property_scheduled"></span>&nbsp;Agendadas
				                    </li>
				                </ul>
				            </div>
				        </div>				
				        <div class="form-group fs-clearfix" style="margin-top: -90px">
				        	<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
								<div class="form-field" data-type="zoomfield" data-show-properties="" data-field-name="propriedade_cadeia" title="">
									<input type="hidden" name="codCadeiaProdutiva" id="codCadeiaProdutiva" value=""/>
									<label for="propriedade_cadeia" class="control-label">Cadeia&nbsp;Produtiva</label>
									<input type="zoom" name="propriedade_cadeia" id="propriedade_cadeia" class="form-control" data-zoom="{
										'displayKey':'DESCRICAO',
										'datasetId':'rm_senar_zmdcadeiaprodutiva_readview',
										'filterValues':'CODIGO,0',
										'maximumSelectionLength':'1',
										'placeholder':'',
										'fields':[
											{'field':'DESCRICAO','label':'Cadeia Produtiva','standard':'true','search':'true'},
											{'field':'CODIGO','label':'C&oacute;digo Cadeia Produtiva','visible':'false'}
									]}" data-size="small"/>
								</div>
							</div>
							<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
								<div class="form-field" data-type="combobox" data-show-properties="" data-field-name="produtor_rural" title="">														
									<input type="hidden" name="codProdutor" id="codProdutor"/>
									<label for="produtor_rural" class="control-label">Produtor&nbsp;Rural</label> 
									<input type="zoom" id="produtor_rural" name="produtor_rural" class="form-control" data-zoom="{
										'displayKey':'NOME',
										'datasetId':'rm_senar_ppessoa_readview',
										'filterValues':'CODIGO,0',
										'maximumSelectionLength':'1',
										'placeholder':'',
										'fields':[
											{'field':'NOME','label':'Produtor','standard':'true','search':'true'},
											{'field':'CODIGO','label':'C&oacute;digo Produtor','visible':'false'}
									]}" data-size="small"/>
								</div>
							</div>
				        	<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12">
								<div class="form-field" data-type="combobox" data-show-properties="" data-field-name="problema">														
									<label for="problema" class="control-label">Problema&nbsp;?</label> 
									<select class="form-control" name="problema" id="problema" data-size="small" title="">
										<option value="">Ambos</option>
				                		<option value="nao">N&atilde;o</option>
				                		<option value="sim">Sim</option>
									</select>
								</div>
							</div>
				            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
				                <br>
				                <button type="button" name="btnFiltrar" id="btnFiltrar" class="btn btn-primary" data-button-search="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Fitlrando..">Filtrar</button>
				                <button type="button" name="btnAgendarVisita" id="btnAgendarVisita" class="btn btn-primary" data-button-schedule-visit="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde...">Agendar</button>
				                <button type="button" name="btnContratos" id="btnContratos" class="btn btn-primary" data-button-contract="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde...">Contratos</button>
				            </div>
				        </div>				
				        <div class="form-group fs-clearfix">
				        	<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12" style="display: none;">
								<div class="form-field" data-type="combobox" data-show-properties="" data-field-name="agenda_status">														
									<label for="agenda_status" class="control-label">Status&nbsp;Agenda</label>
									<select class="form-control" name="agenda_status" id="agenda_status" data-size="small" title="">
										<option value="">Selecione...</option>
										<option value="1">Aprovado</option>
				                		<option value="2">Reprovado</option>
				                		<option value="3">Pendente</option>
				                		<option value="4">N&atilde;o Agendado</option>
									</select>
								</div>
							</div>
				        </div>
    				</div>
    			</div>
    		</fieldset>
    	</div>
    </div>

	<div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 scrooltable" id="target" data-isolated-scroll>
            <script type="text/template" class="mydatatable-template-row-area-buttons">
                <div id="datatable-area" class="panel-heading">
                    <div class="row">
                        <div id="datatable-area-action" class="col-md-12">
                            <button class="btn btn-primary" data-datatable-edit-row>Editar</button>
                            <button class="btn btn-primary" data-datatable-reload>Recarregar</button>
                            <button class="btn btn-primary" data-datatable-edit-propriedade id="btnEditPropriedade">Editar Propriedade</button>
                            <button class="btn btn-primary" data-datatable-recomendacao id="btnRecomendacao">Recomendações</button>
                        </div>
                    </div>
                </div>
            </script>
            <div id="idtable_${instanceId}"></div>
        </div>

	    <script type="text/template" class="template_datatable_edit">
	        <tr id="area-edit" class="{{classSelected}}">
	            <!-- <td>{{id}}<input type="hidden" value="{{id}}" id="datatable-input-id"></td> -->
	            <td>
	                <input type="date" class="datatable-edit form-control" value="{{visita_data}}" id="datatable-input-visita_data">
	            </td>
	            <td>
	                <select class="datatable-edit form-control" value="{{visita_periodo}}" id="datatable-input-visita_periodo">
						<option value=""></option>
						<option value="Matutino">Matutino</option>
						<option value="Vespertino">Vespertino</option>
					</select>
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{produtor_nome}}" id="datatable-input-produtor_nome">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_id}}" id="datatable-input-propriedade_id">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_nome}}" id="datatable-input-propriedade_nome">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_municipio}}" id="datatable-input-propriedade_municipio">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_estado}}" id="datatable-input-propriedade_estado">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_cadeia}}" id="datatable-input-propriedade_cadeia">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{propriedade_situacao}}" id="datatable-input-propriedade_situacao">
	            </td>
	            <td>
	                <input type="hidden" class="datatable-edit form-control" value="{{turma_idturmadisc}}" id="datatable-input-turma_idturmadisc">
	            </td>
	            <td>
	                <button class="btn btn-default" data-update-row>Atualizar</button>
	            </td>
	        </tr>
	    </script>	
	    <input type="hidden" name="valorEstadoValidar" id="valorEstadoValidar" value="0"></input>
	</div>
	
    <!-- div Tabela do Painel -->
    <div class="row">
        <div class="form-group fs-clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group fs-clearfix" id="divTabela">
                    <div id="tabela" class="table-responsive">
                        <table class="table table-hover table-bordered table-stripped" id="table">
                            <thead>                                
                                <th id="labelFoto">Foto</th>
                                <th id="labelSequencia">Sequencia<i class="fa fa-caret-down" aria-hidden="true" id="iconSequencia"></i></th>
                                <th id="labelEvento">Evento<i class="fa fa-caret-down" aria-hidden="true" id="iconEvento"></i></th>
								<th id="labelProdutor">Produtor<i class="fa fa-caret-down" aria-hidden="true" id="iconProdutor"></i></th>
								<th id="labelPropriedade">Propriedade<i class="fa fa-caret-down" aria-hidden="true" id="iconPropriedade"></i></th>
								<th id="labelMunicipio">Municipio<i class="fa fa-caret-down" aria-hidden="true" id="iconMunicipio"></i></th>
								<th id="labelProjeto">Projeto/Programa<i class="fa fa-caret-down" aria-hidden="true" id="iconProjeto"></i></th>
								<th id="labelCadeiaProdutiva">Cadeia Produtiva<i class="fa fa-caret-down" aria-hidden="true" id="iconCadeiaProdutiva"></i></th>
								<th id="labelDataAgendamento">Data Agendamento<i class="fa fa-caret-down" aria-hidden="true" id="iconDataAgendamento"></i></th>
								<th id="labelDataVisita">Data Visita<i class="fa fa-caret-down" aria-hidden="true" id="iconDataVisita"></i></th>
								<th id="labelStatus">Status<i class="fa fa-caret-down" aria-hidden="true" id="iconStatus"></i></th>
								<th id="labelProblema">Problema<i class="fa fa-caret-down" aria-hidden="true" id="iconProblema"></i></th>
								<th id="labelProcesso">Processo<i class="fa fa-caret-down" aria-hidden="true" id="iconProcesso"></i></th>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <ul class="pager">
                            <li class="previous">
                                <a data-btnhref-date-previous="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..." class="fs-cursor-pointer">← Anterior</a>
                            </li>
                            <li class="next">
                                <a data-btnhref-date-next="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..." class="fs-cursor-pointer">Pr&oacute;xima →</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- div Tags do Painel -->
    <div class="row">
        <div class="form-group fs-clearfix" id="divCalendario" style="display: none;">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <br></br>
                <div id="calendario">
                    <div align="center" id="legenda">
                        <button class="btn input-sm" id="pendente" data-button-scheduling-pending="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..."> PENDENTE </button>
                        <button class="btn input-sm" id="aprovado" data-button-scheduling-approved="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..."> APROVADO </button>
                        <button class="btn input-sm" id="reprovado" data-button-scheduling-disapproved="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..."> REPROVADO </button>
                        <!-- <button class="btn input-sm" id="naoAgendado" data-button-scheduling-notscheduled="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..."> N&Atilde;O AGENDADO </button> -->
                        <button class="btn btn-default input-sm" id="todos" data-button-scheduling-all="${instanceId}" data-loading-text="<i class='fluigicon fluigicon-tint'></i> Aguarde..."> TODOS </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js" type="text/javascript"></script>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script src="/ecm_resources/resources/assets/forms/forms.js" type="text/javascript"></script>
<script src="/ecm_resources/resources/assets/forms/wdkdetail.js" type="text/javascript"></script>

<script src='/ategTecnico/resources/js/custom.js'></script>