/**
 * utils.js
 */
console.log('utils.js Loading...');


/** Variables of Register **/
var $myInstanceId = null;
var $myLoading = null;
var $btnElement = null;
var $metaData = new Object({
	prodRural: new Array(),
	propRural: new Array(),
});
var emailTecnico = parent.WCMAPI.userEmail;
var $modalFluig = null;
var modalMyLoading = null;
var autoClose = false;

/** Objects of Register **/
var components = new Object({
	modal: new Object(),
	myModal: new Object(),
	messagePage: null
});

function MensagemAlerta(titulo, mensagem, fechar) {
	try{
		autoClose = fechar;
		modalMyLoading = FLUIGC.modal({
			title: titulo,
			content: mensagem,
			id: 'fluig-modal',
			size: 'larger',
			actions: [{
				'label': 'Ok',
				'bind': 'data-open-modal',
				'autoClose': true
			}]
		});
		$(".modal-title").text(titulo);
		$(".modal-body").text(mensagem);
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: mensagemAlerta - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function myLoading(title, content, func, disable, close){	
	try{
		MensagemAlerta(title, content, close);
		if (disable) {
			$(".modal-footer").find("button").attr("disabled", true);
		}
		var i = 0;
		var _busy = false;
		var _processor = setInterval(function() {
			if (!_busy) {
				_busy = true;
				if (i == 0){
					i++;
					window[func]()
				}
				if (!modalMyLoading.isOpen() || autoClose) {
					modalMyLoading.remove();
					clearInterval(_processor);
				}
				_busy = false;
			}
		}, 100);
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: myLoading - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function myLoadingParam(title, content, func, param, disable, close) {
	try{
		MensagemAlerta(title, content, close);
		if (disable) {
			$(".modal-footer").find("button").attr("disabled", true);
		}
		var i = 0;
		var _busy = false;
		var _processor = setInterval(function() {
			if (!_busy) {
				_busy = true;
				if (i == 0) {
					i++;
					window[func](param);
				}
				if (!modalMyLoading.isOpen() || autoClose) {
					modalMyLoading.remove();
					clearInterval(_processor);
				}
				_busy = false;
			}
		}, 100);
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: myLoadingParam - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function criaElementoXML(campo, valor){
	var element = "<" + campo + ">" + valor + "</" + campo + "> ";
	return element;

};

function alertaToast(titulo, mensagem, type) {
	try{
		FLUIGC.toast({
			title: titulo,
			message: mensagem,
			type: type,
			timeout: 'slow'
		});
	} catch (ex) {
		// TODO: handle exception
		FLUIGC.toast({
			title: 'Atenção!', 
			message: "Ocorreu um erro! Function: alertaToast - Exception: "+ ex.message, 
			type: 'warning',
			timeout: 'slow'
		});
		loadHideButton();
	}
};

function mensagemErro(titulo, mensagem, detalhes) { 
	try{
		FLUIGC.message.error({
			title: titulo,
			message: mensagem,
			details: detalhes
		}, function (el, ev) {
			//console.log('el:', el, 'ev:', ev);
		});
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: mensagemErro - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function loadShowButton(el, ev){
	try{
		$myLoading.show();
		$btnElement = $(el);
		$btnElement.button('loading');
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: loadShowButton - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function loadHideButton(el, ev){
	try{
		setTimeout(function() { 
			if($btnElement != null){
				$btnElement.button('reset');					
			}
			$myLoading.hide();
		}, 300);
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: loadHideButton - Exception: "+ ex.message, 'warning');
		setTimeout(function() { 
			if($btnElement != null){
				$btnElement.button('reset');					
			}
			$myLoading.hide();
		}, 300);
	}
};

function loadOpen(url){
	window.open(url);
	loadHideButton();
};

function loadIsDate(date, type) {
	this.currentDate = date;
	this.isdate = (this.currentDate +'-01').split('-').join('/');
	this.date = new Date(this.isdate);
	if(type == 'add'){
		this.date.setMonth((this.date.getMonth() + 1));		
	}
	if(type == 'subtract'){
		this.date.setMonth((this.date.getMonth() - 1));	
	}
	return ((this.date.toISOString()).substr(0, 7));
};

function dataDDMMYYYY(data){
	return (data ? data.substring(0,10).split('-').reverse().join('/') : '') ;
};

function loadShowModal(title, content, button, id, size, formModal){
	try{
		this.size = ((size == undefined) ? 'large' : size); //NOTE: full | large | small
		this.actions = new Array();
		this.formModal = ((formModal == undefined) ? false : formModal); 
		if (button != null && button.length > 0) {
			for (var i = 0; i < button.length; i++) {
				this.actions.push({
					'label': button[i].label,
					'bind': 'data-open-' + ((button[i].dataOpen != undefined)? button[i].dataOpen: button[i].label.replace(' ', '-')).toLowerCase(),
					'classType': 'btn-' + button[i].type,
					'autoClose': button[i].autoClose
				});
			}
		} else if (button != null && button.length == 0) { 
			this.actions = button;
		} else {
			this.actions.push({
				'label': 'Fechar',
				'bind': 'data-open-fechar',
				'classType': 'btn-primary',
				'autoClose': true
			});
		}
		if (components.myModal[id] != undefined) {
			components.myModal[id].remove();
		}
		components.myModal[id] = FLUIGC.modal({
			title: title,
			content: content,
			id: id,
			size: this.size,
			actions: this.actions,
			formModal: this.formModal
		}, function (err, data) {
			if (err) {
				// do error handling
			} else {
				// do something with data
			}
		});
		loadHideButton();
		$modalFluig = components.myModal[id];
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: loadShowModal - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function getElement(element) {
	try{
		this.result = document.getElementById(element).value;
		if (this.result == '' || this.result == null) {
			this.result = $('#' + element).val();
		} else {
			this.result = this.result;
		}
		this.result = (Array.isArray(this.result)) ? this.result[0] : this.result;
		this.result = (this.result == null)? "": this.result;
		return this.result;
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: getElement - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

function setElement(element, value) {
	try{
		document.getElementById(element).value = value;
		$('#' + element).val(value);
	} catch (ex) {
		// TODO: handle exception
		alertaToast('Atenção!', "Ocorreu um erro! Function: setElement - Exception: "+ ex.message, 'warning');
		loadHideButton();
	}
};

/**
 * Funções padroes do elemento zoom do fluig 
 */
function removedZoomItem(removedItem) {
	if(removedItem.inputId == "propriedade_nome"){
		setElement('codPropriedade', "");
	}else if(removedItem.inputId == "propriedade_municipio"){					
		setElement('codMunicipio', "");
		setElement('codUf', "");
	}else if(removedItem.inputId == "propriedade_cadeia"){
		setElement('codCadeiaProdutiva', "");
	}else if(removedItem.inputId == "produtor_rural"){
		setElement('codProdutor', "");
	}
	window[removedItem.inputId].clear();
}

function setSelectedZoomItem(selectedItem) {
	if(selectedItem.inputId == "propriedade_nome"){
		setElement('codPropriedade', selectedItem.ID);
	}else if(selectedItem.inputId == "propriedade_municipio"){					
		setElement('codMunicipio', selectedItem.CODMUNICIPIO);					
		setElement('codUf', selectedItem.CODETDMUNICIPIO);	
	}else if(selectedItem.inputId == "propriedade_cadeia"){
		setElement('codCadeiaProdutiva', selectedItem.CODIGO);
	}else if(selectedItem.inputId == "produtor_rural"){
		setElement('codProdutor', selectedItem.CODIGO);
	}
}
