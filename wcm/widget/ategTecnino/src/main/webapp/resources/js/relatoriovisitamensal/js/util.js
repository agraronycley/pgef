var modalMyLoading, 
	autoClose = false;

function MensagemAlerta(titulo, mensagem, fechar){
	
	autoClose = fechar;
	
	modalMyLoading = FLUIGC.modal({
		title: titulo,
		content: mensagem,
		id: 	'fluig-modal',
		size: 	'larger',
		actions: [{
			'label': 	'Ok',
			'bind': 	'data-open-modal',
			'autoClose': true
		}]
	});	
	$(".modal-title").text(titulo);
	$(".modal-body").text(mensagem);
}


function myLoading(title, content, func, disable, close){	
	
	MensagemAlerta(title, content, close);
	
	if(disable){
		$(".modal-footer").find("button").attr("disabled",true);
	}
	
	var i = 0, _busy = false; 	
	var _processor = setInterval(function(){ 

		if(!_busy){ 
			_busy = true; 
			if(i == 0){
				i++;
				window[func]()
			}
			if(!modalMyLoading.isOpen() || autoClose){
				modalMyLoading.remove();
				clearInterval(_processor);
			}
			_busy = false; 
		} 
	}, 100);
}

function criaElementoXML(campo, valor){	

	var element = "<" + campo + ">" + valor + "</" + campo + "> ";
	return element;

}

//Executa uma função e apresenta mensagem na tela enquanto processa
//Ex: myLoading("Exemplo" "Mensagem de Exemplo enquanto carrega", nomeFuncaoComParametro, 'parametro', false, true);
function myLoadingParam(title, content, func, param, disable, close){	

	MensagemAlerta(title, content, close);

	if(disable){
		$(".modal-footer").find("button").attr("disabled",true);
	}

	var i = 0, _busy = false; 	
	var _processor = setInterval(function(){ 

		if(!_busy){ 
			_busy = true; 
			if(i == 0){
				i++;
				window[func](param)
			}
			if(!modalMyLoading.isOpen() || autoClose){
				modalMyLoading.remove();
				clearInterval(_processor);
			}
			_busy = false; 
		} 
	}, 100);
}

function dataCorrente() { //NOTE: Retorna Data Atual Dia - Mês - Ano
	this.date = new Date();
	this.day = ((this.date.getDate() < 10) ? "0" : "") + this.date.getDate();
	this.monthin = (this.date.getMonth()).toString();
	this.month = ((this.date.getMonth() < 9) ? "0" : "") + (this.date.getMonth() + 1);
	this.year = (this.date.getFullYear()).toString();
	this.dayWeek = (this.date.getDay() + 1).toString();
	this.dayWeekin = (this.date.getDay()).toString();
	this.dayWeekStr = new Array('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado');
	this.monthStr = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
	this.result = new Object({
		'day': this.day,
		'month': this.month,
		'year': this.year,
		'dayWeek': this.dayWeek,
		'monthStr': this.monthStr[this.monthin],
		'dayWeekStr': this.dayWeekStr[this.dayWeekin]
	});
	return this.result;
};