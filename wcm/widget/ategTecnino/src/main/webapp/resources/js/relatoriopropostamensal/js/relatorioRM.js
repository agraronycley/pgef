/*
function ConsultaRelatorio(idMov) {

	var parameter = new Object();
	parameter['IDMOV'] = idMov;
	var retorno = new Array();
	var relatorio = 494;
	var filtro = '' +
	'<ArrayOfRptFilterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">' +
	'<RptFilterReportPar>' +
	'<BandName>RptReport</BandName>' +
	'<FiltersByTable />' +
	'<MainFilter>true</MainFilter>' +
	'<Value></Value>' +
	'</RptFilterReportPar>' +
	'</ArrayOfRptFilterReportPar>';
	var parametro = '' +
	'<ArrayOfRptParameterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">' +
	'<RptParameterReportPar>' + 
	'<Description>IDMOV</Description>' +
	'<ParamName>IDMOV</ParamName>' +
	'<Type xmlns:d3p1="http://schemas.datacontract.org/2004/07/System" xmlns:d3p2="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.RuntimeType" i:type="d3p2:RuntimeType" xmlns:d3p3="-mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089-System-System.UnitySerializationHolder" z:FactoryType="d3p3:UnitySerializationHolder" xmlns:z="http://schemas.microsoft.com/2003/10/Serialization/">' +
	'<Data xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:string" xmlns="">System.String</Data>' +
	'<UnityType xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:int" xmlns="">4</UnityType>' +
	'<AssemblyName xmlns:d4p1="http://www.w3.org/2001/XMLSchema" i:type="d4p1:string" xmlns="">mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</AssemblyName>' +
	'</Type>' +
	'<Value xmlns:d3p1="http://www.w3.org/2001/XMLSchema" i:type="d3p1:string">'+parameter.IDMOV+'</Value>' +
	'<Visible>true</Visible>' +
	'</RptParameterReportPar>' +
	'</ArrayOfRptParameterReportPar>';

	var constraintRelatorio = DatasetFactory.createConstraint('relatorio', relatorio, relatorio,ConstraintType.MUST);
	var constraintFiltro = DatasetFactory.createConstraint('filtro', filtro, filtro,ConstraintType.MUST);
	var constraintParametro = DatasetFactory.createConstraint('parametro', parametro, parametro,ConstraintType.MUST);
	var constraints = new Array(constraintRelatorio,constraintFiltro,constraintParametro);
	var dsGenerateReportSenar = DatasetFactory.getDataset("GenerateReportSenar",null,  constraints, null);
	if (dsGenerateReportSenar.values.length > 0) {
		retorno = new Array(dsGenerateReportSenar.values[0].fileChunk,dsGenerateReportSenar.values[0].reportSize);
	}
	return retorno;
}
*/


function ConsultaRelatorio(idMov) {
	
	var filter 		= new Object();
	var parameter 	= new Object();
	var report 		= new Object();
	/** Filtros para consultar dataset do Relatório **/
	filter['IDMOV'] = idMov; // ID do Movimento gerado no RM
	
	var retorno;
	var relatorio = 494;// Id do Relatório no RM
	var filtro = '<ArrayOfRptFilterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">'+ 
	'<RptFilterReportPar>'+ 
	'<BandName>RptReport</BandName>'+ 
	'<FiltersByTable>'+ 
	'<RptFilterByTablePar>'+ 
	'<Filter>TMOV.IDMOV = ' + filter['IDMOV'] + '</Filter>'+ 
	'<TableName>TMOV</TableName>'+ 
	'</RptFilterByTablePar>'+ 
	'</FiltersByTable>'+ 
	'<MainFilter>true</MainFilter>'+ 
	'<Value>(TMOV.IDMOV = ' + filter['IDMOV'] + ')</Value>'+ 
	'</RptFilterReportPar>'+ 
	'</ArrayOfRptFilterReportPar>';
	var parametro = '<ArrayOfRptParameterReportPar xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.totvs.com.br/RM/">';
	parametro += '</ArrayOfRptParameterReportPar>';

	var constraintRelatorio 	= DatasetFactory.createConstraint('relatorio', 	relatorio, 	relatorio,	ConstraintType.MUST);
	var constraintFiltro 		= DatasetFactory.createConstraint('filtro', 	filtro, 	filtro,		ConstraintType.MUST);
	var constraintParametro 	= DatasetFactory.createConstraint('parametro', 	parametro, 	parametro,	ConstraintType.MUST);
	var constraints 			= new Array(constraintRelatorio, constraintFiltro, constraintParametro);
	var dsGenerateReportSenar 	= DatasetFactory.getDataset("GenerateReportSenar", null,  constraints, null);
	if (dsGenerateReportSenar.values.length > 0) {
		retorno = new Array(dsGenerateReportSenar.values[0].fileChunk, dsGenerateReportSenar.values[0].reportSize);
	}
	return retorno;
}


function downloadRelatorio(idMov) {

	var guidRM = ConsultaRelatorio(idMov);
	var dlnk = document.getElementById('dwnldLnk_F6');
	if (guidRM.length > 0 && guidRM.length != undefined){
		var fileChunk = guidRM[0];
		var pdf = 'data:application/octet-stream;base64,' + fileChunk;
		dlnk.href = pdf;
		dlnk.download = 'Relatorio_' +idMov+ '.pdf';
		var progress = 0;
		var interval;
		interval = window.setInterval(function () {
			progress++;
			MensagemAlerta('Aguarde','Fazendo download do da proposta mensal de prestação de serviços..', true);
			$(".modal-footer").find("button").attr("disabled",false);
			if (progress >= 100){
				interval = window.clearInterval(interval);
				$(".modal-footer").find("button").click();
				dlnk.click();
			}
		}, 100);
	}else{
		FLUIGC.toast({
			title: 	 'Aten&ccedil;&atilde;o:',
			message: 'Erro ao baixar, favor tentar novamente! Caso erro persista, contate o Administrador.',
			type: 	 'danger',
			timeout: 'slow'
		});
	}

}