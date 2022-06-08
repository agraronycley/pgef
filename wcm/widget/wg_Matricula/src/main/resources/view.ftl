<head>
	<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

</head>

<div id="Matricula_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="Matricula.instance()">
	
	<form id="form-turmas" name="form-turmas">
	
		<div id="turmas" class="tab-pane fade in active">
			<div class="component">
				<div class="panel panel-default" id="informacaoTurmas">
					<div class="panel-heading">
						<h4 class="panel-title">Selecionar Turma</h4>
					</div>
					<div class="panel-body table-responsive">
						
						<div class="form-group col-md-4 col-sm-12 col-xs-12">
							<div class="form-row">
								<label for="STURMADISC_CODTIPOCURSO">Contexto</label>
								<span style="color: red;">*</span> 
								<select id="STURMADISC_CODTIPOCURSO" name="STURMADISC_CODTIPOCURSO" class="form-control" data-tipoCurso data-curso>
								</select>
							</div>
						</div>
						<div></div>
						<div class="form-group col-md-4 col-sm-12 col-xs-12">
							<div class="form-row">
								<label for="STURMADISC_IDPERLET">Período Letivo</label>
								<span style="color: red;">*</span> 
								<select id="STURMADISC_IDPERLET" name="STURMADISC_IDPERLET" class="form-control">
								</select>
							</div>
						</div>
						
						<div class="form-group col-md-4 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="STURMADISC_CODMODALIDADE">Modalidade</label>
								<span style="color: red;">*</span> 
								<select id="STURMADISC_CODMODALIDADE" name="STURMADISC_CODMODALIDADE" data-curso data-turmas class="form-control">
								</select>
							</div>
						</div>
						
						
						<div class="form-group col-md-6 col-sm-6 col-xs-12">
							<div class="form-row">
								<label for="STURMADISC_CODCURSO">Curso</label>
								<span style="color: red;">*</span> 
								<select id="STURMADISC_CODCURSO" name="STURMADISC_CODCURSO" data-turmas class="form-control">
								</select>
							</div>
						</div>

											
						<div id="nomered">
							<!-- campo id STURMADISC_NOMERED adicionado via javascript -->
						</div>
						
						<div class="form-group col-md-6 col-sm-12 col-xs-12">
							<div class="form-row">
								<label for="STURMADISC_CODTURMA">Turma</label>
								<span style="color: red;">*</span> 
								<select id="STURMADISC_CODTURMA" name="STURMADISC_CODTURMA" class="form-control">
								</select>
							</div>
						</div>
						
						<div class="form-group">
							<div class="col-sm-12 col-xs-12">
								<div class="input-group-prepend" align="right">
									<a href="/portal/p/Faeg/wgPaginaEducacaoFormal" target="_self" title="Menu Principal">
										<button type="button" id="cancelar"
											name="cancelar" class="btn btn-primary"
											data-toggle="tooltip" data-placement="left"
											title="Cancelar">
											<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Cancelar
										</button>
									</a>
									
									<button type="button" id="limpar"
										name="limpar" class="btn btn-primary"
										data-toggle="tooltip" data-limparCamposTurma data-placement="left"
										title="Limpar">
										<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
										Limpar Campos
									</button>
									
									<button type="button" id="buscar"
										name="buscar" class="btn btn-primary"
										data-toggle="tooltip" data-buscarDadosTurma data-placement="left"
										title="Buscar">
										<i class="fluigicon fluigicon-search icon-sm"></i>&nbsp
										Buscar Disciplinas
									</button>
								</div>
							</div>
						</div>
						
						
					</div><!-- div panel body -->
				</div><!-- div panel default -->
			</div><!-- div componente -->
		</div><!-- div turmas -->
		
		<div id="divdisciplinas">
			<div class="table-responsive">
				
				<table class="table table-hover" id="tabela-disciplinas" name="tabela-disciplinas">
				
					 <thead>
						<tr>
							<th><input type="checkbox" name="disciplina[]" onclick="marcarTodos(this.checked, 'disciplina');"></th>
							<th>Período</th>
							<th>Cód. Disciplina</th>
							<th>Nome</th>
							<th>Carga Horária</th>
							<!-- <th>Ação</th> -->
						</tr>
					</thead>
					
				</table>
			</div>
			
			
		</div>
		
		
</form>	
	
<form>
    
    <div id="empresa" class="tab-pane fade in active">
		<div class="component">
			<div class="panel panel-default" id="informacaoEmpresa">
				<div class="panel-heading">
					<h4 class="panel-title">Selecionar Empresa</h4>
				</div>
				<div class="panel-body table-responsive">
					
					<div class="form-group col-md-12 col-sm-12 col-xs-12">
						<div class="form-row">
							<label for="FCFO_CODCFO">Empresa</label> 
							<input type="text" name="FCFO_CODCFO" id="FCFO_CODCFO" class="form-control text-left" data-empresa/>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-sm-12 col-xs-12">
							<div class="input-group-prepend" align="right">
								<a href="/portal/p/Faeg/wgPaginaEducacaoFormal" target="_self" title="Menu Principal">
									<button type="button" id="cancelar"
										name="cancelar" class="btn btn-primary"
										data-toggle="tooltip" data-placement="left"
										title="Cancelar">
										<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Cancelar
									</button>
								</a>
								
								<button type="button" id="limpar"
									name="limpar" class="btn btn-primary"
									data-toggle="tooltip" data-limparCamposTurma data-placement="left"
									title="Limpar">
									<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
									Limpar Campos
								</button>
								
								<button type="button" id="buscar"
									name="buscar" class="btn btn-primary"
									data-toggle="tooltip" data-buscarAlunos data-placement="left"
									title="Buscar">
									<i class="fluigicon fluigicon-search icon-sm"></i>&nbsp
									Buscar Alunos
								</button>
							</div>
						</div>
					</div>	
				</div><!-- div panel body -->
			</div><!-- div panel default -->
		</div><!-- div componente -->
	</div>

	<div id="selecaoaluno" class="tab-pane fade in active">
		<div class="component">
			<div class="panel panel-default" id="informacaoAluno">
				<div class="panel-heading">
					<h4 class="panel-title">Selecionar Aluno</h4>
				</div>
				<div class="panel-body table-responsive">
					
					<div class="form-group col-md-6 col-sm-12 col-xs-6">
						<div class="form-row">
							<label for="FCFO_NOME">Nome</label> 
							<input type="text" name="FCFO_NOME" id="FCFO_NOME" class="form-control text-left" data-nome/>
						</div>
					</div>
					<div class="form-group col-md-6 col-sm-12 col-xs-6">
						<div class="form-row">
							<label for="FCFO_CPF">CPF</label> 
							<input type="text" name="FCFO_CPF" id="FCFO_CPF" class="form-control text-left" data-cpf/>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-sm-12 col-xs-12">
							<div class="input-group-prepend" align="right">
								<a href="/portal/p/Faeg/wgPaginaEducacaoFormal" target="_self" title="Menu Principal">
									<button type="button" id="cancelar"
										name="cancelar" class="btn btn-primary"
										data-toggle="tooltip" data-placement="left"
										title="Cancelar">
										<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Cancelar
									</button>
								</a>
								
								<button type="button" id="limpar"
									name="limpar" class="btn btn-primary"
									data-toggle="tooltip" data-limparCamposTurma data-placement="left"
									title="Limpar">
									<i class="fluigicon fluigicon-minus-circle icon-sm"></i>&nbsp
									Limpar Campos
								</button>
								
								<button type="button" id="buscar"
									name="buscar" class="btn btn-primary"
									data-toggle="tooltip" data-buscarAlunosNome data-placement="left"
									title="Buscar">
									<i class="fluigicon fluigicon-search icon-sm"></i>&nbsp
									Buscar Alunos
								</button>
							</div>
						</div>
					</div>	
				</div><!-- div panel body -->
			</div><!-- div panel default -->
		</div><!-- div componente -->
	</div>
		
	<div id="alunos">
		<div class="table-responsive">
			
			<table class="table table-hover" id="tabela-alunos" name="tabela-alunos">
			
					<thead>
					<tr>
						<th><input type="checkbox" name="aluno[]" onclick="marcarTodos(this.checked, 'aluno');"></th>
						<th>RA</th>
						<th>Nome</th>
						<th>CPF</th>
						<th>Telefone 1</th>
						<th>Telefone 2</th>
						<th>E-mail</th>
					</tr>
				</thead>
				
			</table>
		</div>
	</div>

	<div class="form-group">
		<div class="col-sm-12 col-xs-12">
			<div class="input-group-prepend" align="right">
				<button type="button" id="efetuarMatricula"
					name="efetuarMatricula" class="btn btn-primary"
					data-toggle="tooltip" data-placement="left"
					title="Efetuar Matrícula" data-matricular>
					<i class="fluigicon fluigicon-remove-circle icon-sm"></i>&nbsp Efetuar Matrícula
				</button>
			</div>
		</div>
	</div>						

</form>	
	
</div>

