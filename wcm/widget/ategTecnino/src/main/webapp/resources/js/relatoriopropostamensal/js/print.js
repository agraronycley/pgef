function ImprimeRelatorioPopostaMensal(){
	MontaHTML();
}

function MontaHTML(){
	var html ="";
	
	var ifMontaHTML = document.getElementById('ifMontaHTML');

	html += ' <!DOCTYPE html>                                                                                                                                                         ';
	html += '                                                                                                                                                                         ';
	html += ' <head>                                                                                                                                                                  ';
	html += '     <title>Proposta Mensal de Prestação de Serviço</title>                                                                                                              ';
	html += '     <meta charset="utf-8">                                                                                                                                              ';
	html += '     <link type="text/css" rel="stylesheet" href="https://fluig.sistemafaeg.org.br/portal/resources/style-guide/css/fluig-style-guide.min.css"                            ';
	html += '     />                                                                                                                                                                  ';
	html += '     <script type="text/javascript" src="https://fluig.sistemafaeg.org.br/portal/resources/js/jquery/jquery.js"></script>                                                 ';
	html += '     <script type="text/javascript" src="https://fluig.sistemafaeg.org.br/portal/resources/js/jquery/jquery-ui.min.js"></script>                                          ';
	html += '     <script type="text/javascript" src="https://fluig.sistemafaeg.org.br/portal/resources/style-guide/js/fluig-style-guide.min.js"                                       ';
	html += '         charset="utf-8"></script>                                                                                                                                       ';
	html += ' </head>                                                                                                                                                                 ';
	html += '                                                                                                                                                                         ';
	html += ' <body>                                                                                                                                                                  ';
	html += '     <div class="fluig-style-guide">                                                                                                                                     ';
	html += '         <div class="container-fluid">                                                                                                                                   ';
	html += '                                                                                                                                                                         ';
	html += '             <div class="form-group fs-clearfix">                                                                                                                        ';
	html += '                 <table class="table table-hover table-bordered table-stripped">                                                                                         ';
	html += '                     <tr>                                                                                                                                                ';
	html += '                         <td class="col-sm-1 col-xs-1" align="center">                                                                                                   ';
	html += '                             <img src="https://fluig.sistemafaeg.org.br/portal/resources/images/1/logo_image.png" />                                                      ';
	html += '                                                                                                                                                                         ';
	html += '                         </td>                                                                                                                                           ';
	html += '                         <td class="col-sm-4 col-xs-4">                                                                                                                  ';
	html += '                             <h1 class="panel-title" align="center">PROPOSTA MENSAL DE PRESTAÇÃO DE SERVIÇO - PROGRAMA SENAR MAIS - ASSISTÊNCIA TÉNICA E GERENCIAL       ';
	html += '                                 DO SENAR/AR-GO/GO</h1>                                                                                                                  ';
	html += '                         </td>                                                                                                                                           ';
	html += '                                                                                                                                                                         ';
	html += '                         <td class="col-sm-1 col-xs-1" align="center">                                                                                                   ';
	html += '                             Página 01 de 01                                                                                                                              ';
	html += '                         </td>                                                                                                                                           ';
	html += '                                                                                                                                                                         ';
	html += '                     </tr>                                                                                                                                               ';
	html += '                 </table>                                                                                                                                                ';
	html += '             </div>                                                                                                                                                      ';
	html += '                                                                                                                                                                         ';
	html += '             <div class="form-group fs-clearfix">                                                                                                                        ';
	html += '                 <table class="table table-hover table-bordered table-stripped">                                                                                         ';
	html += '                     <tr>                                                                                                                                                ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Empresa prestadora de serviço: <br>                                                                                                         ';
	html += '                             <span id="empresaNome"></span>                                                                                                              ';
	html += '                         </td>                                                                                                                                           ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             CNPJ Nº: <br>                                                                                                                               ';
	html += '                             <span id="empresaCNPJ"></span>                                                                                                              ';
	html += '                         </td>                                                                                                                                           ';
	html += '                     </tr>                                                                                                                                               ';
	html += '                     <tr>                                                                                                                                                ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Profissional Técnico: <br>                                                                                                                  ';
	html += '                             <span id="tecnicoNome"></span>                                                                                                              ';
	html += '                         </td>                                                                                                                                           ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Região: <br>                                                                                                                                ';
	html += '                             <span id="tecnicoRegiao"></span>                                                                                                            ';
	html += '                         </td>                                                                                                                                           ';
	html += '                     </tr>                                                                                                                                               ';
	html += '                     <tr>                                                                                                                                                ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Município: <br>                                                                                                                             ';
	html += '                             <span id="tecnicoMunicipio"></span>                                                                                                         ';
	html += '                         </td>                                                                                                                                           ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Período Previsto: <br>                                                                                                                      ';
	html += '                             <span id="preiodoPrevisto"></span>                                                                                                          ';
	html += '                         </td>                                                                                                                                           ';
	html += '                     </tr>                                                                                                                                               ';
	html += '                     <tr>                                                                                                                                                ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Previsão de Carga Horária: <br>                                                                                                             ';
	html += '                             <span id="previsaoCargaHoraria"></span>                                                                                                     ';
	html += '                         </td>                                                                                                                                           ';
	html += '                         <td class="col-sm-6 col-xs-6">                                                                                                                  ';
	html += '                             Previsão de KM no Período: <br>                                                                                                             ';
	html += '                             <span id="previsaoKM"></span>                                                                                                               ';
	html += '                         </td>                                                                                                                                           ';
	html += '                     </tr>                                                                                                                                               ';
	html += '                 </table>                                                                                                                                                ';
	html += '             </div>                                                                                                                                                      ';
	html += '                                                                                                                                                                         ';
	html += '             <div class="form-group fs-clearfix">                                                                                                                        ';
	html += '                 <table class="table table-hover table-bordered table-stripped">                                                                                         ';
	html += '                     <thead>                                                                                                                                             ';
	html += '                         <th>Descrição das atividades planejadas no período</th>                                                                                         ';
	html += '                     </thead>                                                                                                                                            ';
	html += '                     <tbody>                                                                                                                                             ';
	html += '                         <tr>                                                                                                                                            ';
	html += '                             <td>                                                                                                                                        ';
	html += '                                 Visitas técnicas nas propriedades selecionadas no minicípio de                                                                          ';
	html += '								  Niquelândia que recebem Assistência Técnica do SENAR/AR-GO, através do Programa SENAR MAIS.                                             ';
	html += '                             </td>                                                                                                                                       ';
	html += '                         </tr>                                                                                                                                           ';
	html += '                     </tbody>                                                                                                                                            ';
	html += '                 </table>                                                                                                                                                ';
	html += $("#divTabela").html();	
	html += '             </div>                                                                                                                                                      ';
	html += '                                                                                                                                                                         ';
	html += '         </div>                                                                                                                                                          ';
	html += '     </div>                                                                                                                                                              ';
	html += ' </body>                                                                                                                                                                 ';
	html += '                                                                                                                                                                         ';
	html += ' </html>                                                                                                                                                                 ';

	ifMontaHTML.srcdoc = html

	console.log(html);
	imprime(null);
}


function imprime(url){
	var _this = this,
	iframeId = 'ifMontaHTML',
	$iframe = $('iframe#ifMontaHTML');
	$iframe.attr('src', url);

	$iframe.load(function() {
		_this.chamaImpressao(iframeId);
	});
}

//initiates print once content has been loaded into iframe
function chamaImpressao(iframeId) {
	var PDF = document.getElementById(iframeId);
	PDF.focus();
	PDF.contentWindow.print();
}