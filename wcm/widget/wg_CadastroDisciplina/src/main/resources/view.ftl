<head>
	<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
</head>
<div id="CadastroDisciplina_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="CadastroDisciplina.instance()">
	
	<form id="form-painelDisciplinas" name="form-painelDisciplinas">
	
		<div id="agendamento" class="tab-pane fade in active">
			<div class="component">
				<div class="panel panel-default" id="informacaoDisciplinas">
					<div class="panel-heading">
						<h4 class="panel-title">Filtrar</h4>
					</div>
					<div class="panel-body table-responsive">
						
						<div class="form-group col-md-4 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="DISCIPLINA_CODTIPOCURSO">Contexto</label>
								<select id="DISCIPLINA_CODTIPOCURSO" data-tipoCursoFiltro name="DISCIPLINA_CODTIPOCURSO" class="form-control">
								</select>
							</div>
						</div>
					
						<div class="form-group col-md-4 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="DISCIPLINA_NOMEREDUZIDO">Nome Reduzido</label>
								<input type="text" name="DISCIPLINA_NOMEREDUZIDO" id="DISCIPLINA_NOMEREDUZIDO" class="form-control text-left" />
							</div>
						</div>
						
						<div class="form-group col-md-4 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="DISCIPLINA_CODDISC">Cód. Disciplina</label>
								<input type="text" name="DISCIPLINA_CODDISC" id="DISCIPLINA_CODDISC" class="form-control text-left" />
							</div>
						</div>
						
						<div class="form-group col-md-4 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="DISCIPLINA_NOME">Nome</label>
								<input type="text" name="DISCIPLINA_NOME" id="DISCIPLINA_NOME" class="form-control text-left" />
							</div>
						</div>
						
						<!-- <div class="form-group col-md-3 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="AGENDAMENTOF_CODMODALIDADE">Disciplina</label>
								<select id="AGENDAMENTOF_CODMODALIDADE" data-disciplina name="AGENDAMENTOF_CODMODALIDADE" data-modalidadeFiltro class="form-control">
								</select>
							</div>
						</div> -->

						<input type="hidden" id="ADDEDIT"></input>
						
						<div class="form-group">
							<div class="col-sm-12 col-xs-12">
								<div class="input-group-prepend" align="right">
									
									<button type="button" id="novo"
										name="novo" class="btn btn-primary"
										data-toggle="tooltip" data-placement="left"
										title="Nova Disciplina" data-novo>
										<i class="fluigicon fluigicon-add-test icon-sm"></i>&nbsp Nova Disciplina
									</button>
									
									<a href="/portal/p/Faeg/wgPaginaEducacaoFormal" target="_self" title="Cancelar">
										<button type="button" id="cancelar"
											name="cancelar" class="btn btn-primary"
											data-toggle="tooltip" data-placement="left"
											title="Cancelar">
											<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Cancelar
										</button>
									</a>
									
									<button type="button" id="limpar"
										name="limpar" class="btn btn-primary"
										data-toggle="tooltip" data-limparCamposFiltro data-placement="left"
										title="Limpar">
										<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
										Limpar Campos
									</button>
									
									<button type="button" id="buscar"
										name="buscar" class="btn btn-primary"
										data-toggle="tooltip" data-buscarDadosFiltro data-placement="left"
										title="Buscar">
										<i class="fluigicon fluigicon-search icon-sm"></i>&nbsp
										Buscar
									</button>
								</div>
							</div>
						</div>
					</div><!-- div panel body -->
				</div><!-- div panel default -->
			</div><!-- div componente -->
		</div><!-- div disciplinas -->
		
		<div id="divresultado">
			<div class="table-responsive">
				
				<table class="table table-hover" id="tabelaDisciplinas" name="tabelaDisciplinas">
				
					 <thead>
						<tr>
							<th>#</th>
							<th>Contexto</th>
							<th>Cód. Disciplina</th>
							<th>Nome</th>
							<th>Nome Reduzido</th>
							<th>Complemento</th>
							<th>CH</th>
							<th>Ação</th>
							<th></th>
						</tr>
					</thead>
					
				</table>
			</div>
		</div>
		
	</form>
	
	<div id="cadastroDisciplina">
		<form name="form" role="form">
			
			<!-- MENU LATERAL -->
			<div class="col-md-2 col-sm-2 col-xs-3">
				<ul class="nav nav-pills nav-stacked">
					<li class="nav-item active" id="btn-disciplina">
						<a data-toggle="tab" href="#disciplina">Disciplina</a>
					</li>
					<li class="nav-item" id="btn-disciplina">
						<a data-toggle="tab" href="#valorBasico">Valor Básico por Participante</a>
					</li>
					<li class="nav-item" id="btn-ajudaCusto">
						<a data-toggle="tab" href="#ajudaCusto">Ajuda de Custo</a>
					</li>
					<li class="nav-item" id="btn-cadeiaProdutiva">
						<a data-toggle="tab" href="#cadeiaProdutiva">Cadeia Produtiva</a>
					</li>
				</ul>
			</div><!-- div menu lateral -->
			
			<!-- CONTEÚDO DO FORMULÁRIO -->
			<div class="tab-content col-md-10 col-sm-10 col-xs-9">
								
				<!-- Dados da disciplina -->
				<div id="disciplina" class="tab-pane fade in active">
					<div class="component">
						<div class="panel panel-default" id="informacaoDisciplina">
							<div class="panel-heading">
								<h4 class="panel-title">Disciplina</h4>
							</div>
							<div class="panel-body table-responsive">
								
								<div class="form-group col-md-6 col-sm-12 col-xs-12">
									<div class="form-row">
										<label for="SDISCIPLINA_CODTIPOCURSO">Contexto</label><span style="color: red;">*</span>
										<select id="SDISCIPLINA_CODTIPOCURSO" data-tipoCurso name="SDISCIPLINA_CODTIPOCURSO" class="form-control">
										</select>
									</div>
								</div>
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CODDISC" class="control-label">Código</label>
									<input type="text" class="form-control" name="SDISCIPLINA_CODDISC"
										id="SDISCIPLINA_CODDISC" readonly />
								</div>
								
								<div class="form-group col-md-3 col-sm-12 col-xs-12">
									<label for="SDISCIPLINA_NOMEREDUZIDO" class="control-label">Nome Reduzido</label>
									<span style="color: red;">*</span>
									<input type="text" name="SDISCIPLINA_NOMEREDUZIDO" id="SDISCIPLINA_NOMEREDUZIDO" maxlength="30" class="form-control text-left" />
								</div>
								
								<!-- <div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_DECIMAIS" class="control-label">Nº Casas Decimais</label>
									<input type="text" name="SDISCIPLINA_DECIMAIS" id="SDISCIPLINA_DECIMAIS" class="form-control text-left" required />
								</div>  -->
								
								<!-- <div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CH" class="control-label">Carga Horária</label>
									<input type="text" name="SDISCIPLINA_CH" id="SDISCIPLINA_CH" class="form-control text-left" required />
								</div> -->
								
								<div class="form-group col-md-6 col-sm-12 col-xs-12">
									<label for="SDISCIPLINA_NOME" class="control-label">Descrição</label>
									<span style="color: red;">*</span>
									<input type="text" name="SDISCIPLINA_NOME" id="SDISCIPLINA_NOME" class="form-control text-left" required />
								</div>
								
								<div class="form-group col-md-6 col-sm-12 col-xs-12">
									<label for="SDISCIPLINA_COMPLEMENTO" class="control-label">Segundo Nome</label>
									<span style="color: red;">*</span>
									<input type="text" name="SDISCIPLINA_COMPLEMENTO" id="SDISCIPLINA_COMPLEMENTO" class="form-control text-left" />
								</div>
																
								<!-- <div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_TIPOAULA" class="control-label">Aula</label>
									<select id="SDISCIPLINA_TIPOAULA" name="SDISCIPLINA_TIPOAULA" class="form-control">
									</select>
								</div>
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_TIPONOTA" class="control-label">Nota</label>
									<select id="SDISCIPLINA_TIPONOTA" name="SDISCIPLINA_TIPONOTA" class="form-control">
									</select>
								</div> -->
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CH" class="control-label">CH Total</label>
									<span style="color: red;">*</span>
									<input type="text" name="SDISCIPLINA_CH" id="SDISCIPLINA_CH" class="form-control text-left" required 
									onKeyUp="somenteNumeros(this);"/>
								</div>
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CHTEORICA" class="control-label">CH Teórica</label>
									<input type="text" name="SDISCIPLINA_CHTEORICA" id="SDISCIPLINA_CHTEORICA" class="form-control text-left" required 
									onKeyUp="somenteNumeros(this);"/>
								</div>
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CHPRATICA" class="control-label">CH Prática</label>
									<input type="text" name="SDISCIPLINA_CHPRATICA" id="SDISCIPLINA_CHPRATICA" class="form-control text-left" required 
									onKeyUp="somenteNumeros(this);"/>
								</div>
								
								<div class="form-group col-md-3 col-sm-6 col-xs-12">
									<label for="SDISCIPLINA_CHESTAGIO" class="control-label">CH Estágio</label>
									<input type="text" name="SDISCIPLINA_CHESTAGIO" id="SDISCIPLINA_CHESTAGIO" class="form-control text-left" required 
									onKeyUp="somenteNumeros(this);"/>
								</div>
								
								<div class="custom-checkbox-primary form-group col-md-12 col-sm-12 col-xs-12">
									<label class="control-label">Opção Exclusiva</label>
									<div class="custom-radio custom-radio-primary">
								        <input type="radio" name="SDISCIPLINA_CURSOESTAGIO" id="SDISCIPLINA_NENHUM" checked>
								        <label for="SDISCIPLINA_NENHUM">Nenhum</label>
								    </div>
								    
								    <div class="custom-radio custom-radio-primary">
								        <input type="radio" name="SDISCIPLINA_CURSOESTAGIO" id="SDISCIPLINA_CURSOLIVRE">
								        <label for="SDISCIPLINA_CURSOLIVRE">Curso Livre</label>
								    </div>
								    
								    <div class="custom-radio custom-radio-primary">
								        <input type="radio" name="SDISCIPLINA_CURSOESTAGIO" id="SDISCIPLINA_ESTAGIO">
								        <label for="SDISCIPLINA_ESTAGIO">Estágio</label>
								    </div>
							    </div>
								
								<!-- 
								<div class="custom-checkbox-primary form-group col-md-2 col-sm-3 col-xs-12">
									<input type="checkbox" name="SDISCIPLINA_CURSOLIVRE" id="SDISCIPLINA_CURSOLIVRE" value="">
									<label for="SDISCIPLINA_CURSOLIVRE">Curso Livre</label>
								</div>
								
								<div class="custom-checkbox-primary form-group col-md-2 col-sm-3 col-xs-12">
									<input type="checkbox" name="SDISCIPLINA_ESTAGIO" id="SDISCIPLINA_ESTAGIO" value="">
									<label for="SDISCIPLINA_ESTAGIO">Estágio</label>
								</div>
								 -->
								
							</div><!-- div panel body -->
						</div><!-- div panel default -->
					</div><!-- div componente -->
				</div><!-- div disciplina -->
				
				
				<!-- Dados Valor Básico por Participante -->
				<div id="valorBasico" class="tab-pane">
					<div class="component">
						<div class="panel panel-default" id="informacaoValorBasico">
							<div class="panel-heading">
								<h4 class="panel-title">Valor Básico por Participante</h4>
							</div>
							<div class="panel-body table-responsive">
							
									<div class="panel panel-default" id="dadosValorBasico">
								
								
									<table tablename="valorBasico" class="table table-hover" noaddbutton="true" nodeletebutton="true">
										<tbody>
											
											<tr class="tableBodyRow" detail="true" style="display: none;" detailname="valorBasico">														
												<td>
													
													<div class="form-group col-md-2 col-sm-6 col-xs-12">
														<label for="VBPARTDISC_ID" class="control-label">Id</label>
														<span style="color: red;">*</span>
														<input type="text" class="form-control" name="VBPARTDISC_ID" id="VBPARTDISC_ID" disabled /> 
													</div>
													
													<div class="form-group col-md-4 col-sm-4 col-xs-12">
													    <label for="VBPARTDISC_VIGENTEAPARTIR">Vigente a partir de</label>
													    <span style="color: red;">*</span>
													    <div class="input-group date">
													        <input type="text" mask="00/00/0000" class="form-control" id="VBPARTDISC_VIGENTEAPARTIR" name="VBPARTDISC_VIGENTEAPARTIR" placeholder="Vigente a partir de">
													        <span class="input-group-addon">
													        	<span class="fluigicon fluigicon-calendar"></span>
													        </span>
													    </div>
													</div>
													
													<div class="form-group col-md-6 col-sm-6 col-xs-12">
														<label for="VBPARTDISC_VALORBASICO" class="control-label">Valor Básico por Participante</label>
														<span style="color: red;">*</span>
														<input type="text" class="form-control" name="VBPARTDISC_VALORBASICO" id="VBPARTDISC_VALORBASICO" /> 
													</div>
													

													<div class="form-group">
														<label for="removeValorBasico"
															class="col-md-2 col-sm-2 col-xs-12 control-label"></label>
														<div class="col-sm-12 col-xs-12">
															<div class="input-group-prepend" align="right">
																<button type="button" id="removeValorBasico"
																	name="removeValorBasico" class="btn btn-primary"
																	data-toggle="tooltip" data-placement="left"
																	title="Excluir o item"
																	onclick="fnWdkRemoveChild(this)">
																	<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp
																	Excluir Item
																</button>
															</div>
														</div>
													</div>
														
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<button type="button" id="valorBasicoPorCurso"
									name="valorBasicoPorCurso" data-valorBasicoPorCurso class="btn btn-primary"
									data-toggle="tooltip" data-placement="top"
									title="Incluir novo item"
									onclick="wdkAddChild('valorBasico')">
									<i class="fluigicon fluigicon-plus-circle icon-sm"></i>&nbsp
									Adicionar
								</button>
								
							</div><!-- div panel body -->
						</div><!-- div panel default -->
					</div><!-- div componente -->
				</div><!-- div Valor Básico por Participante -->
				
				
				<!-- Dados Ajuda de Custo -->
				<div id="ajudaCusto" class="tab-pane">
					<div class="component">
						<div class="panel panel-default" id="informacaoAjudaCusto">
							<div class="panel-heading">
								<h4 class="panel-title">Ajuda de Custo</h4>
							</div>
							<div class="panel-body table-responsive">
							
									<div class="panel panel-default" id="dadosAjudaCusto">
								
								
									<table tablename="ajudaCusto" class="table table-hover" noaddbutton="true" nodeletebutton="true">
										<tbody>
											
											<tr class="tableBodyRow" detail="true" style="display: none;" detailname="ajudaCusto">														
												<td>
													
													<div class="form-group col-md-2 col-sm-6 col-xs-12">
														<label for="AJUDACUSTO_ID" class="control-label">Id</label>
														<span style="color: red;">*</span>
														<input type="text" class="form-control" name="AJUDACUSTO_ID" id="AJUDACUSTO_ID" disabled /> 
													</div>
													
													<div class="form-group col-md-6 col-sm-6 col-xs-12">
														<label for="AJUDACUSTO_CODIGO" class="control-label">Tipo de Ajuda de Custo</label>
														<span style="color: red;">*</span>
														<select id="AJUDACUSTO_CODIGO" name="AJUDACUSTO_CODIGO" class="form-control">
														</select>
													</div>
													
													<div class="form-group col-md-4 col-sm-6 col-xs-12">
														<label for="AJUDACUSTO_VALOR" class="control-label">Valor</label>
														<span style="color: red;">*</span>
														<input type="text" class="form-control" name="AJUDACUSTO_VALOR" id="AJUDACUSTO_VALOR" /> 
													</div>
													
													<div class="form-group col-md-3 col-sm-4 col-xs-12">
													    <label for="AJUDACUSTO_DATAINICIAL">Data Inicial</label>
													    <span style="color: red;">*</span>
													    <div class="input-group date">
													        <input type="text" mask="00/00/0000" class="form-control" id="AJUDACUSTO_DATAINICIAL" name="AJUDACUSTO_DATAINICIAL" placeholder="Data Inicial">
													        <span class="input-group-addon">
													        	<span class="fluigicon fluigicon-calendar"></span>
													        </span>
													    </div>
													</div>
													
													<div class="form-group col-md-3 col-sm-4 col-xs-12">
													    <label for="AJUDACUSTO_DATAFINAL">Data Final</label>
													    <div class="input-group date">
													        <input type="text" mask="00/00/0000" class="form-control" id="AJUDACUSTO_DATAFINAL" name="AJUDACUSTO_DATAFINAL" placeholder="Data Final">
													        <span class="input-group-addon">
													        	<span class="fluigicon fluigicon-calendar"></span>
													        </span>
													    </div>
													</div>
													
													<div class="form-group col-md-6 col-sm-12 col-xs-12">
														<label for="AJUDACUSTO_OBS" class="control-label">Observação</label>
														<input type="text" name="AJUDACUSTO_OBS" id="AJUDACUSTO_OBS" class="form-control text-left" required />
													</div>
													

													<div class="form-group">
														<label for="removeAjudaCusto"
															class="col-md-2 col-sm-2 col-xs-12 control-label"></label>
														<div class="col-sm-12 col-xs-12">
															<div class="input-group-prepend" align="right">
																<button type="button" id="removeAjudaCusto"
																	name="removeAjudaCusto" class="btn btn-primary"
																	data-toggle="tooltip" data-placement="left"
																	title="Excluir o item"
																	onclick="fnWdkRemoveChild(this)">
																	<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp
																	Excluir Item
																</button>
															</div>
														</div>
													</div>
														
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<button type="button" id="ajudaDeCusto"
									name="ajudaDeCusto" data-ajudaCusto class="btn btn-primary"
									data-toggle="tooltip" data-placement="top"
									title="Incluir novo item"
									onclick="wdkAddChild('ajudaCusto')">
									<i class="fluigicon fluigicon-plus-circle icon-sm"></i>&nbsp
									Adicionar
								</button>
								
							</div><!-- div panel body -->
						</div><!-- div panel default -->
					</div><!-- div componente -->
				</div><!-- div Ajuda de Custo -->
				
				
				<!-- Dados Cadeia Produtiva -->
				<div id="cadeiaProdutiva" class="tab-pane">
					<div class="component">
						<div class="panel panel-default" id="informacaoCadeiaProdutiva">
							<div class="panel-heading">
								<h4 class="panel-title">Cadeia Produtiva</h4>
							</div>
							<div class="panel-body table-responsive">
							
									<div class="panel panel-default" id="dadosCadeiaProdutiva">
								
								
									<table tablename="cadeiaProdutiva" class="table table-hover" noaddbutton="true" nodeletebutton="true">
										<tbody>
											
											<tr class="tableBodyRow" detail="true" style="display: none;" detailname="cadeiaProdutiva">														
												<td>
													
													<div class="form-group col-md-2 col-sm-6 col-xs-12">
														<label for="CADEIADISCIPLINA_ID" class="control-label">Id</label>
														<span style="color: red;">*</span>
														<input type="text" class="form-control" name="CADEIADISCIPLINA_ID" id="CADEIADISCIPLINA_ID" disabled /> 
													</div>
													
													<div class="form-group col-md-4 col-sm-6 col-xs-12">
														<label for="CADEIADISCIPLINA_CODIGO" class="control-label">Cadeia Produtiva</label>
														<span style="color: red;">*</span>
														<select id="CADEIADISCIPLINA_CODIGO" name="CADEIADISCIPLINA_CODIGO" class="form-control">
														</select>
													</div>
													
													<div class="form-group col-md-6 col-sm-12 col-xs-12">
														<label for="CADEIADISCIPLINA_OBSERVACAO" class="control-label">Observação</label>
														<input type="text" name="CADEIADISCIPLINA_OBSERVACAO" id="CADEIADISCIPLINA_OBSERVACAO" class="form-control text-left" required />
													</div>
													
													<div class="custom-checkbox-primary form-group col-sm-6 col-xs-6">
															<input type="checkbox" name="CADEIADISCIPLINA_ATIVO"
																id="CADEIADISCIPLINA_ATIVO"> <label for="CADEIADISCIPLINA_ATIVO">Ativo</label>
														</div>

													<div class="form-group">
														<label for="removeCadeiaProdutiva"
															class="col-md-2 col-sm-2 col-xs-12 control-label"></label>
														<div class="col-sm-12 col-xs-12">
															<div class="input-group-prepend" align="right">
																<button type="button" id="removeCadeiaProdutiva"
																	name="removeCadeiaProdutiva" class="btn btn-primary"
																	data-toggle="tooltip" data-placement="left"
																	title="Excluir o item"
																	onclick="fnWdkRemoveChild(this)">
																	<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp
																	Excluir Item
																</button>
															</div>
														</div>
													</div>
														
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<button type="button" id="cadeiaP"
									name="cadeiaP" data-cadeiaProdutiva class="btn btn-primary"
									data-toggle="tooltip" data-placement="top"
									title="Incluir novo item"
									onclick="wdkAddChild('cadeiaProdutiva')">
									<i class="fluigicon fluigicon-plus-circle icon-sm"></i>&nbsp
									Adicionar
								</button>
								
							</div><!-- div panel body -->
						</div><!-- div panel default -->
					</div><!-- div componente -->
				</div><!-- div Cadeia Produtiva -->
				
				<div class="form-group">
					<div class="col-sm-12 col-xs-12">
						<div class="input-group-prepend" align="right">
							<a href="/portal/p/Faeg/wgPaginaEducacaoFormal" target="_self" title="Cadastro de Disciplina">
								<button type="button" id="voltar"
									name="voltar" class="btn btn-primary"
									data-toggle="tooltip" data-placement="left"
									title="Cancelar"  data-voltar>
									<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Voltar
								</button>
							</a>
							
							<button type="button" id="limpar"
								name="limpar" class="btn btn-primary"
								data-toggle="tooltip" data-limparCampos data-placement="left"
								title="Limpar">
								<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
								Limpar Campos
							</button>
							
							<button type="button" id="salvar"
								name="salvar" class="btn btn-primary"
								data-toggle="tooltip" data-gravarDados data-placement="left"
								title="Salvar">
								<i class="fluigicon fluigicon-check-circle-on icon-sm"></i>&nbsp
								Salvar
							</button>
						</div>
					</div>
				</div>
				
			</div><!-- div conteúdo do formulário -->
		
		</form>
	</div>
	
	<script src="/ecm_resources/resources/assets/forms/forms.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-maskmoney/3.0.2/jquery.maskMoney.min.js" type="text/javascript"></script>
	
</div>

