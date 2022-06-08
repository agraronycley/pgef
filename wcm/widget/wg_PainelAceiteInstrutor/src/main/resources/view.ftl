<head>
	<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
</head>

<div id="wg_PainelAceiteInstrutor_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="wg_PainelAceiteInstrutor.instance()">

    <form id="formPainelAceiteInstrutor" name="formPainelAceiteInstrutor">

		<div class="panel panel-default" id="informacaoAceiteInstrutor">
			<div class="panel-heading">
				<h4 class="panel-title">Pendente Aceite - Instrutor - <span id="nomeInstrutor" name="nomeInstrutor"></span> </h4>
			</div>
			<div class="panel-body table-responsive">

				<div id="divresultado">
					<div class="table-responsive">
						
						<table class="table table-hover" id="tabelaAgendamento" name="tabelaAgendamento">
						
							<thead>
								<tr>
									<th>Id</th>
									<th>Curso</th>
									<th>Disciplina</th>
									<th>Data Inicial</th>
									<th>Data Final</th>
									<th>Município</th>
									<th>Distância</th>
									<th>Ação</th>
								</tr>
							</thead>
							
						</table>

					</div>
				</div>

			</div>
		</div>

        

    </form>

	<div id="cadastroTurmaDisc">
			
			<form id="form-turmasDisc" name="form-turmasDisc">
				<div class="col-md-2 col-sm-2 col-xs-3">
					<ul class="nav nav-pills nav-stacked">
						<li class="nav-item active" id="btn-TurmaDisc">
							<a data-toggle="tab" href="#turmaDisc">Turma/Disciplina</a>
						</li>
						<li class="nav-item">
							<a data-toggle="tab" href="#tapps">TAPPS</a>
						</li>
					</ul>
				</div>
	
				<div class="tab-content col-md-10 col-sm-10 col-xs-9">
					
					<!-- TELA DE DADOS DE TURMA/DISCIPLINA -->
					<div id="turmaDisc" class="tab-pane fade in active">
						<div class="component">
							<div class="panel panel-default" id="informacaoTurmaDisc">
								<div class="panel-heading">
									<h4 class="panel-title">Agendamento Turma / Disciplina</h4>
								</div>
								<div class="panel-body table-responsive">

									<input type="hidden" name="codccusto" id="codccusto">
									<input type="hidden" name="codcfo" id="codcfo">
									
									<div class="form-group col-md-6 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CODTIPOCURSO">Contexto</label>
											<select type="text" id="AGENDAMENTO_CODTIPOCURSO" name="AGENDAMENTO_CODTIPOCURSO" class="form-control" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-6 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_IDPERLET">Período Letivo</label>
											<select type="text" id="AGENDAMENTO_IDPERLET" name="AGENDAMENTO_IDPERLET" class="form-control" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-6 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CODTURMA">Código da Turma</label>
											<input type="text" name="AGENDAMENTO_CODTURMA" id="AGENDAMENTO_CODTURMA" class="form-control text-left" readonly />
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CODMODALIDADE">Modalidade</label>
											<select type="text" id="AGENDAMENTO_CODMODALIDADE" name="AGENDAMENTO_CODMODALIDADE" class="form-control text-left" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-6 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CODCURSO">Curso</label>
											<select type="text" id="AGENDAMENTO_CODCURSO" name="AGENDAMENTO_CODCURSO" class="form-control" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_NOMERED">Nome Reduzido</label>
											<input type="text" name="AGENDAMENTO_NOMERED" id="AGENDAMENTO_NOMERED" class="form-control text-left" readonly />
										</div>
									</div>
									
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_TIPOTURMA">Tipo de Turma</label><span style="color: red;">*</span>
											<select id="AGENDAMENTO_TIPOTURMA" name="AGENDAMENTO_TIPOTURMA" class="form-control"></select>
										</div>
									</div>
									
									<div class="form-group col-md-6 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_DISCIPLINA">Disciplina</label>
											<select type="text" name="AGENDAMENTO_DISCIPLINA" id="AGENDAMENTO_DISCIPLINA" class="form-control" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-6 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_MAXALUNOS">N° Máximo de alunos</label>
											<input type="text" onKeyUp="somenteNumeros(this);" name="AGENDAMENTO_MAXALUNOS" id="AGENDAMENTO_MAXALUNOS" class="form-control text-left" readonly/>
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_IDHABILITACAOFILIAL">Turno</label>
											<select type="text" id="AGENDAMENTO_IDHABILITACAOFILIAL" name="AGENDAMENTO_IDHABILITACAOFILIAL" class="form-control" ></select>
										</div>
									</div>
									
									<div class="form-group col-md-6 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_LOCAL">Cidade Local de Realização</label><span style="color: red;">*</span>
											<select id="AGENDAMENTO_LOCAL" name="AGENDAMENTO_LOCAL" class="form-control"></select>
										</div>
									</div>
									
									<div class="form-group col-md-3 col-sm-6 col-xs-12">
									    <label for="AGENDAMENTO_DTINICIAL">Data Início</label><span style="color: red;">*</span>
									    <div class="input-group date">
									        <input type="text" mask="00/00/0000" class="form-control" id="AGENDAMENTO_DTINICIAL" name="AGENDAMENTO_DTINICIAL" placeholder="Data Inicial">
									        <span class="input-group-addon">
									        	<span class="fluigicon fluigicon-calendar"></span>
									        </span>
									    </div>
									</div>
									
									<div class="form-group col-md-3 col-sm-6 col-xs-12">
									    <label for="AGENDAMENTO_DTFINAL">Data Término</label><span style="color: red;">*</span>
									    <div class="input-group date">
									        <input type="text" mask="00/00/0000" class="form-control" id="AGENDAMENTO_DTFINAL" name="AGENDAMENTO_DTFINAL" placeholder="Data Final">
									        <span class="input-group-addon">
									        	<span class="fluigicon fluigicon-calendar"></span>
									        </span>
									    </div>
									</div>
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CH">Carga Horária</label>
											<input type="text" name="AGENDAMENTO_CH" id="AGENDAMENTO_CH" class="form-control text-left" readonly />
										</div>
									</div>
									
									<!--<div class="form-group col-md-2 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_CHAGENDADA">CH Agendada</label>
											<input type="text" name="AGENDAMENTO_CHAGENDADA" id="AGENDAMENTO_CHAGENDADA" class="form-control text-left" readonly />
										</div>
									</div>-->
									
									<div class="form-group col-md-3 col-sm-12 col-xs-12">
										<div class="form-row">
											<label for="AGENDAMENTO_IDTURMADISC">Id. Turma/Disc.</label>
											<input type="text" name="AGENDAMENTO_IDTURMADISC" id="AGENDAMENTO_IDTURMADISC" class="form-control text-left" readonly />
										</div>
									</div>
									
									<!-- <input type="hidden" id="AGENDAMENTO_IDTURMADISC" /> -->
									<input type="hidden" id="AGENDAMENTO_CODTURNO" />
									<input type="hidden" id="TAPPS_IDPROFESSORTURMA" />
									
									
									
									
									<!-- 
									<div class="form-group col-md-12 col-sm-12 col-xs-12">
										<label for="STURMACOMPL_DSCPRATICA" class="control-label">Observação</label>
										<textarea class="form-control" rows="3"
											name="STURMACOMPL_DSCPRATICA" id="STURMACOMPL_DSCPRATICA"></textarea>
									</div>
									 -->
									
								</div><!-- div panel body -->
							</div><!-- div panel default -->
						</div><!-- div componente -->
					</div><!-- div turmas -->
					
					
					<!-- TELA DE INFORMAÇÕES DA TAPPS -->
					<div id="tapps" class="tab-pane">
						<div class="component">
							
							<div class="panel panel-default" id="informacaoTapps">
								<div class="panel-heading">
									<h4 class="panel-title">TAPPS</h4>
								</div>
								<div class="panel-body table-responsive">

									<div align="center">
										<p><strong>TERMO DE ACEITE DE PROPOSTA DE PRESTAÇÃO DE SERVIÇO</strong></p>
										<p>(Aditivo Contratual nr. <span id="aditivo" name="aditivo"></span> )</p>
										<p>Código de Identificação Cadastral Nominal do Aceitante: CIC-0</p>
									</div>

									<p><strong>Documento vinculado:</strong> Contrato de Prestação de Serviço nr. <span id="codcontrato" name="codcontrato"></span> </p>

									<p>Por meio deste termo o contratado, expressa formalmente o seu aceite à Proposta de
										Prestação de Serviço abaixo identificada. O presente instrumento, quando assinado,
										adquire a força e o conteúdo de aditivo contratual, gerando direitos e obrigações
										entre as partes, conforme disposto no contrato original acima mencionado, restando
										ratificadas as demais cláusulas.</p>

									<div align="center">
										<p><strong>PROPOSTA DE PRESTAÇÃO DE SERVIÇO</strong></p>
									</div>

									<div class="panel panel-default">
										<div class="panel-body">
											<div align="center"><p><strong>DADOS GERAIS</p></strong></div>

											<input type="hidden" name="kmtotal" id="kmtotal">
											<input type="hidden" name="valorHora" id="valorHora">
											<input type="hidden" name="codprof" id="codprof">
											<input type="hidden" name="aditivoCont" id="aditivoCont">
											<input type="hidden" name="anoAditivoCont" id="anoAditivoCont">

											<strong>Contratado/aceitante:</strong> &nbsp;<span id="TAPPS_EMPRESA" name="TAPPS_EMPRESA"></span> <br />
											<strong>CNPJ nº:</strong> &nbsp;<span id="TAPPS_CNPJ" name="TAPPS_CNPJ"></span> <br />
											<strong>Instrutor designado pelo contratado:</strong>&nbsp;<span id="TAPPS_INSTRUTOR" name="TAPPS_INSTRUTOR"></span> <br />
											<strong>Local da prestação do serviço (município):</strong>&nbsp;<span id="TAPPS_LOCAL" name="TAPPS_LOCAL"></span> <br />
											<strong>Distância em km até o município da prestação de serviço (ida e volta):</strong>&nbsp;<span id="TAPPS_DISTANCIA" name="TAPPS_DISTANCIA"></span> <br />
											<strong>Roteiro:</strong>&nbsp; <span id="roteiro" name="roteiro"></span> <br />
											<strong>Curso/treinamento:</strong>&nbsp;<span id="TAPPS_CURSO" name="TAPPS_CURSO"></span> <br />
											<strong>Id. Turma/Disciplina:</strong>&nbsp;<span id="TAPPS_IDTURMADISC" name="TAPPS_IDTURMADISC"></span> <br />
											<strong>Disciplina:</strong>&nbsp;<span id="TAPPS_DISCIPLINA" name="TAPPS_DISCIPLINA"></span> <br />
											<strong>Evento:</strong> <br />
											<strong>Carga horária total:</strong>&nbsp;<span id="TAPPS_CHTOTAL" name="TAPPS_CHTOTAL"></span> <br />
											<strong>Custo total da prestação de serviço:</strong> &nbsp; R$&nbsp;<span id="VALOR_TOTAL" name="VALOR_TOTAL"></span><br />
											<strong>Valor total por extenso:</strong>  &nbsp;<span id="VALOR_TOTALEXTENSO" name="VALOR_TOTALEXTENSO"></span><br />

											<hr>
											<div align="center"><p><strong><span id="TITULO_PERIODOS" name="TITULO_PERIODOS"></span></p></strong></div>
											
											<div id="periodosDisciplinas"></div>

											<!--<strong><span id="TITULO_DATA" name="TITULO_DATA"></span></strong><span id="DADOS_DATA" name="DADOS_DATA"></span><br />
											<strong><span id="TITULO_CH" name="TITULO_CH"></span></strong><span id="DADOS_CH" name="DADOS_CH"></span><br />
											<strong><span id="TITULO_VALORCH" name="TITULO_VALORCH"></span></strong><span id="DADOS_VALORCH" name="DADOS_VALORCH"></span><br />
											<strong><span id="TITULO_VALORKM" name="TITULO_VALORKM"></span></strong><span id="DADOS_VALORKM" name="DADOS_VALORKM"></span><br />
											<strong><span id="TITULO_CUSTO" name="TITULO_CUSTO"></span></strong><span id="DADOS_CUSTO" name="DADOS_CUSTO"></span> <br />
											<strong><span id="TITULO_VALOREXTENSO" name="TITULO_VALOREXTENSO"></span></strong><span id="DADOS_VALOREXTENSO" name="DADOS_VALOREXTENSO"></span> <br />  -->
											<hr>											
											<p><strong>Observação</p></strong>
											<hr>
											Data da confecção do TAPPS<br />
											Data de alteração do TAPPS <br />
											Motivo da alteração do TAPPS <br />


										</div>
									</div>

									<div align="center">
										<p>Para efeitos legais, o contratado subscreve o presente termo de aceite.</p><br />
										<p>Goiânia-GO, <span id="dataDia" name="dataDia"></span></p>
									</div>

									<#--  <div class="form-group col-md-3 col-sm-6 col-xs-12">
										<div class="form-row">
											<label for="TAPPS_ACEITE">Aceite</label>
											<select id="TAPPS_ACEITE" name="TAPPS_ACEITE" class="form-control">
												<option value="">Selecione...</option>
												<option value="1">Sim</option>
												<option value="2">Não</option>
											</select>
										</div>
									</div>  -->

									<#--  <div class="custom-checkbox-primary form-group col-md-12 col-sm-12 col-xs-12">
										<input type="checkbox" name="TAPPS_ACEITE" id="TAPPS_ACEITE" value="">
										<label for="TAPPS_ACEITE">Aceito</label>
									</div>  -->
									
									<#--  <div class="custom-checkbox-primary form-group col-md-12 col-sm-12 col-xs-12">
										<input type="checkbox" name="TAPPS_CIENCIA" id="TAPPS_CIENCIA" value="">
										<label for="TAPPS_CIENCIA">Declaro estar ciente</label>
									</div>  -->
	
								</div><!-- div panel body -->
							</div><!-- div panel default -->
						</div><!-- div componente -->
					</div><!-- div tapps -->
										
				</div>
				
				<div class="form-group">
					<div class="col-sm-12 col-xs-12">
						<div class="input-group-prepend" align="right">
							<button type="button" id="cancelar"
								name="cancelar" data-voltar class="btn btn-warning"
								data-toggle="tooltip" data-placement="left"
								title="Voltar">
								<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Voltar
							</button>
							
							<!-- <button type="button" id="limparCampos"
								name="limparCampos" class="btn btn-primary"
								data-toggle="tooltip" data-limparCampos data-placement="left"
								title="Limpar">
								<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
								Limpar Campos
							</button> -->
							
							<#--  <button type="button" id="salvar"
								name="salvar" class="btn btn-primary"
								data-toggle="tooltip" data-gravarDados data-placement="left"
								title="Salvar">
								<i class="fluigicon fluigicon-check-circle-on icon-sm"></i>&nbsp
								Salvar
							</button>  -->

							<button type="button" id="rejeitar"
								name="rejeitar" class="btn btn-danger"
								data-toggle="tooltip" onclick="atualizarAceite('R')" data-placement="left"
								title="Rejeitar Agenda">
								<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
								Rejeitar Agenda
							</button>
							
							<button type="button" id="aceitar"
								name="aceitar" class="btn btn-success"
								data-toggle="tooltip" onclick="atualizarAceite('A')" data-placement="left"
								title="Aceitar Agenda">
								<i class="fluigicon fluigicon-check-circle-on icon-sm"></i>&nbsp
								Aceitar Agenda
							</button>
						</div>
					</div>
				</div>
									
			</form>	
			
	</div>

</div>

