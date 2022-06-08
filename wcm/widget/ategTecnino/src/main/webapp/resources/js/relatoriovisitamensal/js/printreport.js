/**
 * 
 */
var datadescription = null;
var descrimination = new Array();
var docDefinition = null;

function printCreate() {
	this.datadescription = dadosTecnico;
	this.descrimination = dadosVisitas;
	var verseSettings = new Array();
	var evento = "";
	var cont = 1;
	for(var d in this.descrimination){
		desc = this.descrimination[d];
		evento = desc.evento;
		verseSettings.push(new Array({
			text: cont,
			style: 'tbody'
		},{
			text: desc.processo,
			style: 'tbody'
		},{
			text: desc.propriedade,
			style: 'tbody'
		},{
			text: desc.produtor,
			style: 'tbody'
		},{
			text: desc.dataagendada,
			style: 'tbody'
		},{
			text: desc.periodo,
			style: 'tbody'
		},{
			text: '___/___/_____',
			style: 'tbody'
		},{
			text: '___:___',
			style: 'tbody'
		},{
			text: '___:___',
			style: 'tbody'
		},{
		},{
		})
		);
		cont++;
	}
	//NOTE: Criação do Elemento de impressao de PDF
	this.docdefinition = new Object({
		pageSize: 'A4',
		pageOrientation: 'landscape',
		header: function(currentPage, pageCount) { 
			currentPage = (currentPage < 10)? '0'+currentPage : currentPage;
			pageCount = (pageCount < 10)? '0'+pageCount : pageCount;
			return {
				table: {
					widths: [105, 630, 70],
					body: [[{
						image: 'logoSistema',
						width: 110,
						style: 'headerImage'
					},{
						text: 'RELATÓRIO DE VISITAS AGENDADAS - ATeG/SENAR MAIS - SENAR/AR-GO',
						style: 'headerTitle'
					},
					{
						text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
						style: 'headerPage'
					}]]
				},
				layout: {
					hLineWidth: function (i, node) {
						return (i === 0 || i === node.table.body.length) ? 1 : 1;
					},
					vLineWidth: function (i, node) {
						return (i === 0 || i === node.table.widths.length) ? 1 : 1;
					},
					hLineColor: function (i, node) {
						return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
					},
					vLineColor: function (i, node) {
						return (i === 0 || i === node.table.widths.length) ? '#ddd' : '#ddd';
					},
					paddingLeft: function(i, node) { 
						return 2; 
					},
					paddingRight: function(i, node) { 
						return 2;
					},
					paddingTop: function(i, node) { 
						return 2; 
					},
					paddingBottom: function(i, node) { 
						return 2; 
					},
				},
				margin: [12, 25, 15, 0]
			}
		},
		content: [{
			table: {
				widths: [194, 194, 194, 194],
				body: [
				       [{
				    	   text: [{
				    		   text: 'Empresa prestadora de serviço: ', 
				    		   style: 'label'
				    	   },{
				    		   text: this.datadescription.empresa,
				    		   style: 'text'
				    	   }],
				    	   colSpan: 2,
				    	   style: 'thead'
				       },{
				       },{
				    	   text: [{
				    		   text: 'CNPJ Nº: ',
				    		   style: 'label'
				    	   },{
				    		   text: this.datadescription.cnpj, 
				    		   style: 'text'
				    	   }],
				    	   colSpan: 2,
				    	   style: 'thead'
				       },{
				       }],
				       [{
				    	   text: [{
				    		   text: 'Profissional Técnico: ', 
				    		   style: 'label'
				    	   },{
				    		   text: this.datadescription.tecnico,
				    		   style: 'text'
				    	   }],
				    	   colSpan: 2,
				    	   style: 'thead'
				       },{
				       },{
				    	   text: [{
				    		   text: 'Mês de Referência: ',
				    		   style: 'label'
				    	   },{
				    		   text: this.datadescription.referencia,
				    		   style: 'text'
				    	   }],
				    	   style: 'thead'
				       },{
				    	   text: [{
				    		   text: 'Evento: ',
				    		   style: 'label'
				    	   },{
				    		   text: evento,
				    		   style: 'text'
				    	   }],
				    	   style: 'thead'
				       }]
				       ]
			},
			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 1 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 1 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? '#ddd' : '#ddd';
				},
				paddingLeft: function(i, node) { 
					return 5; 
				},
				paddingRight: function(i, node) { 
					return 5;
				},
				paddingTop: function(i, node) { 
					return 5; 
				},
				paddingBottom: function(i, node) { 
					return 5; 
				}
			},
			margin: [12, 15, 0, 0]
		},{
			table: {
				widths: [15, 47, 110, 105, 54, 50, 58, 44, 40, 36, 140],
				body: [
				       [{
				    	   text: 'VISITAS AGENDADAS',
				    	   colSpan: 11,
				    	   style: 'title'
				       },{
				       },{
				       },{
				       },{
				       },{
				       },{
				       },{
				       },{
				       },{
				       },{
				       }],
				       [{
				    	   text: 'Nº',
				    	   style: 'thead'
				       },{
				    	   text: 'Nº Processo',
				    	   style: 'thead'
				       },{
				    	   text: 'Propriedade',
				    	   style: 'thead'
				       },{
				    	   text: 'Produtor',
				    	   style: 'thead'
				       },{
				    	   text: 'Data Agendada',
				    	   style: 'thead'
				       },{
				    	   text: 'Turno',
				    	   style: 'thead'
				       },{
				    	   text: 'Data Visita',
				    	   style: 'thead'
				       },{
				    	   text: 'Horario Chegada',
				    	   style: 'thead'
				       },{
				    	   text: 'Horario Saída',
				    	   style: 'thead'
				       },{
				    	   text: 'Status',
				    	   style: 'thead'
				       },{
				    	   text: 'Assinatura Produtor',
				    	   style: 'thead'
				       }]
				       ]
			},
			layout: {
				hLineWidth: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? 1 : 1;
				},
				vLineWidth: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? 1 : 1;
				},
				hLineColor: function (i, node) {
					return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
				},
				vLineColor: function (i, node) {
					return (i === 0 || i === node.table.widths.length) ? '#ddd' : '#ddd';
				},
				paddingLeft: function(i, node) { 
					return 5; 
				},
				paddingRight: function(i, node) { 
					return 5;
				},
				paddingTop: function(i, node) { 
					return 5; 
				},
				paddingBottom: function(i, node) { 
					return 5; 
				}
			},
			margin: [12, 15, 0, 0]
		}],
		footer: function(currentPage, pageCount) { 
			if (currentPage === pageCount) {				
				var data = dataCorrente();
				return {
					stack: [{
						text: data.day +' de '+ data.monthStr +' de '+ data.year,
						style: 'footerDate'
					},{
						text: [{
							text: 'Obs: '
						},{
							text: 'VR - Visita Realizada'
						},{
							text: 'NR - Visita Não Realizada'
						}],
						margin: [25, -15, 0, 0],
						style: 'footerInfo'
					}]
				}
			}else{
				return {
					stack: [{
						text: [{
							text: 'Obs: '
						},{
							text: 'VR - Visita Realizada '
						},{
							text: 'NR - Visita Não Realizada'
						}],
						style: 'footerInfo'
					}]
				}
			}
		},
		styles: {
			title: {
				alignment: 'center',
				margin: [0, 0, 0, 0],
				fontSize: 11,
				bold: true,
				color: '#595959'
			},
			thead: {
				alignment: 'center',
				margin: [0, 0, 0, 0],
				fontSize: 11,
				bold: true,
				color: '#363636'
			},
			tbody: {
				alignment: 'center',
				margin: [0, 0, 0, 0],
				fontSize: 10,
				bold: false,
				color: '#595959'
			},
			label: {
				alignment: 'left',
				margin: [0, 0, 0, 0],
				fontSize: 10,
				bold: true,
				color: '#595959'
			},
			text: {
				alignment: 'left',
				margin: [0, 0, 0, 0],
				fontSize: 10,
				bold: false,
				color: '#363636'
			},
			headerImage: {
				alignment: 'center',
				margin: [0, 0, 0, 0]
			},
			headerTitle: {
				alignment: 'center', 
				margin: [2, 7, 2, 0], 
				fontSize: 11,
				bold: true, 
				color: '#595959'
			},
			headerPage: {
				alignment: 'right', 
				margin: [0, 3, 5, 0],
				bold: true, 
				italics: true, 
				fontSize: 7, 
				color: '#595959'
			},
			footerDate: {
				alignment:'right',
				margin: [0, 10, 15, 0],
				bold: true,
				italics: true,
				fontSize: 6,
				color: '#595959'
			},
			footerInfo: {
				alignment:'left',
				margin: [25, 0, 15, 0],
				bold: true,
				italics: true,
				fontSize: 6,
				color: '#000000'
			}
		},
		images: {
			logoSistema: 'data:image/png;base64,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'
		},
		background: function (page) {
			if (page === 1) {
				//return [];
			}
			if (page === 2) {
				//return [];
			}
		},
		pageMargins: [0, 63, 0, 25]
	});
	for(var vs in verseSettings){
		this.docdefinition.content[1].table.body.push(verseSettings[vs]);
	}
	docDefinition = this.docdefinition;
	datadescription = this.datadescription;
	$('button#btnImprimir').prop('disabled', false);
}

function printPDF(){
	this.nameprint = datadescription.referencia;
	this.name = 'Relatório de Visitas Agendadas ' + this.nameprint + '.pdf';
	pdfMake.createPdf(docDefinition).download(this.name);
}