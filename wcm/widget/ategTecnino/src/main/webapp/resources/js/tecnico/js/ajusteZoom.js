console.log('ajusteZoom.js');

var $zoomPreview = $(".zoom-preview");
if ($zoomPreview.length) {
	$zoomPreview.parent().removeClass("input-group");
	$zoomPreview.remove();
}


$(document).ready(function(){

	
	$( window ).load(function() {
	
		$(".zoom-preview").hide()
		
	});
});

function setZoomData(inputObj, item){
	/** ------->> ESSA FUNÇÃO SÓ PODE SER CHAMADA APÓS A PÁGINA SER CARREGADA ------- */
	
	var aux = ('filter_' + inputObj).toString();
	if(jQuery.type( inputObj )  === "string"){
		window[aux].add(item);
	} else {
		inputObj.add(item);
	}
}

function removeZoomData(inputName){

	if(jQuery.type(inputName)  === "string"){
		window["filter_" + inputName].removeAll();
		zoomSpanDisplay('#' + inputName, 'show');
	} else {
		inputName.removeAll();
		zoomSpanDisplay('#' + inputName, 'show');
	}

}


zoomSpanDisplay = function(input, type){
	if(type == 'hide'){
		$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').hide();
	} else {
		$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead').show();
		//$(input).parent('div.input-group.fs-full-width').find('div.bootstrap-tagsinput').find('span.fluig-typeahead > input.tt-input').css('width', '300px');
	}
}


zoomRemoveDiplay = function(input, inputsAux, evalAux){
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').on('click', function(){
		zoomSpanDisplay(input, 'show');

		if((inputsAux !== undefined) && (inputsAux != '')){
			$(inputsAux).val('');  // Apaga a informação dos campos auxiliares ao Zoom (ID, CODIGO, DESCRICAO .. etc)
		}
		if((evalAux !== undefined) && (evalAux != '')){
			eval(evalAux);
		}
	});
}


zoomReadonly = function(input){

	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').css('width', '90%')
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span.tag-text').css('max-width', '100%');
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span[data-role=remove]').hide();

	$(input).parent('div').find('div.input-group-addon').attr('id', '');  // Desabilita botão do input Zoom
	$(input).parent('div').find('div.input-group-addon > span.fluigicon').removeClass('fluigicon-zoom-in');
	$(input).parent('div').find('div.input-group-addon > span.fluigicon').addClass('fluigicon-verified');

	zoomSpanDisplay(input, 'hide')

}


zoomDisabled = function(inputName){

	if(jQuery.type( inputName )  === "string"){
		window["filter_" + inputName].disable(true);
	} else {
		inputName.disable(true);
	}
}


//function fnAtualizaBuscaIndiretamente(input, filterZoom, inputZoom, inputsAux, evalAux){
function indirectReloadZoom (input, filterZoom, inputZoom, inputsAux, evalAux){

	if((input != '') && (filterZoom != '')){
		var value = $(input).val();
		var filter = filterZoom + ',' + value;
		reloadZoomFilterValues(inputZoom, filter);

		if((inputsAux !== undefined) && (inputsAux != '')){
			$(inputsAux).val('');  // Apaga a informação dos campos auxiliares ao Zoom (ID, CODIGO, DESCRICAO .. etc)
		}
		if((evalAux !== undefined) && (evalAux != '')){
			eval(evalAux);
		}
	}
}


zoomFitSize = function(input){
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').css('width', '90%')
	$(input).parent('div').find('div.bootstrap-tagsinput.bootstrap-tagsinput-max').find('span.tag.tag-gray').find('span.tag-text').css('max-width', '100%');		
}


var MaskEvent = {
		init: function(event) {
			if (typeof fluigjQuery === "undefined" || fluigjQuery === true) {
				if (typeof jQuery != "undefined") {
					this.initFormJs()
				} else {
					var js = document.createElement("script");
					js.type = "text/javascript";
					js.src = "/portal/resources/js/jquery/jquery.js";
					js.onload = importFormJs;
					document.body.appendChild(js)
				}
			} else {
				if (typeof console != "undefined") {
					console.warn("A vari\u00E1vel fluigjQuery foi definida como false! O Jquery n\u00E3o ser\u00E1 importado pelo fluig e funcionalidades como mascar\u00E1 de campos do Fluig estar\u00E3o desabilitadas!")
				}
			}
		},
		initFormJs: function(e) {
			var _this = this;
			var maskInputs = [];
			var inputs = $("[mask]");
			$.each(inputs, function(k, o) {
				maskInputs.push(o)
			});
			if (maskInputs.length) {
				if (!jQuery().mask) {
					loadJs("/portal/resources/js/jquery.mask.min.js", function() {
						_this.initMask(maskInputs)
					})
				} else {
					_this.initMask(maskInputs)
				}
			}
		},
		initMask: function(inputs) {
			$.each(inputs, function(i, obj) {
				var inputMask = $(obj);
				var inputID = inputMask.attr("id");
				var inputName = inputMask.attr("name");
				var maskAttr = inputMask.attr("mask");
				var options = {};
				if (maskAttr.indexOf("#") > -1) {
					options.maxlength = false;
					options.reverse = true
				}
				if (inputID) {
					$("#" + inputID).mask(maskAttr, options)
				} else {
					if (inputName) {
						$("input[type='text'][name='" + inputName + "']").mask(maskAttr, options)
					}
				}
			})
		}
};

function loadJs(src, callback) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = src;
	if (callback) {
		js.onload = callback
	}
	document.body.appendChild(js)
}

function loadCss() {
	var css = '<link rel="stylesheet" type="text/css" href="/portal/resources/style-guide/css/fluig-style-guide-filter.min.css" />';
	$("head").append(css)
}

function loadjQuery(callback) {
	if (!window.fluigjQuery || window.fluigjQuery === true) {
		if (window.jQuery) {
			callback()
		} else {
			loadJs("/portal/resources/js/jquery/jquery.js", callback)
		}
	}
}

function hasZoom() {
	if (location.origin == undefined) {
		location.origin = window.location.protocol + "//" + window.location.host
	}
	var inputs = document.getElementsByTagName("input"),
	hasZoom = false;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("type") == "zoom") {
			hasZoom = true;
			break
		}
	}
	if (hasZoom) {
		loadjQuery(function() {
			loadCss();
			if (!FLUIGC || !FLUIGC.filter) {
				$.getScript(location.origin + "/portal/resources/js/mustache/mustache-min.js", function() {
					$.getScript(location.origin + "/portal/resources/style-guide/js/fluig-style-guide.min.js", function() {
						$.getScript(location.origin + "/portal/resources/style-guide/js/fluig-style-guide-filter.min.js", function() {
							loadZoom()
						})
					})
				})
			} else {
				loadZoom()
			}
		})
	}
}

function loadZoomTablename(tablename) {
	$("input[data-zoom]", '[tablename="' + tablename + '"]').each(function() {
		loadZoomForInput(this)
	})
}

function loadZoom() {
	String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
		return this.split(needle).join(replacement)
	};
	$("input[data-zoom]").each(function() {
		if (!$(this).prop("readonly")) {
			loadZoomForInput(this)
		} else {
			$(this).prop("type", "text").addClass("form-control")
		}
	})
}

function loadZoomForInput(input) {
	if ($(input).parents("[tablename]").length > 0 && $(input).closest("tr").index() < 1) {
		return
	}
	var $zoom = $(input),
	zoomOptions = JSON.parse($zoom.data("zoom").replaceAll("'", '"')),
	searchField = "";
	$zoom.removeAttr("data-zoom");
	var dataZoomInstance = "data-zoom_" + $zoom.attr("name");
	window[dataZoomInstance] = zoomOptions;
	var settings = createSettings(zoomOptions, searchField);
	searchField = settings.displayKey;
	var instance = "filter_" + $zoom.attr("name");
	var referenceName = "input[name=" + $zoom.attr("name") + "]";
	window[instance] = FLUIGC.filter(referenceName, settings);
	$(referenceName).attr("filter-instance", instance).attr("display-key", searchField);
	var inputValue = $(input).val();
	if (inputValue != "") {
		var item = {};
		item[searchField] = inputValue;
		window[instance].add(item)
	}
	window[instance].on("fluig.filter.item.added", function(data) {
		if (typeof(setSelectedZoomItem) === "function") {
			data.item.inputName = $zoom.attr("name");
			data.item.inputId = $zoom.attr("id");
			setSelectedZoomItem(data.item)
		}
	});
	var events = "fluig.filter.cursorchanged fluig.filter.opened fluig.filter.closed fluig.filter.selected fluig.filter.filterd fluig.filter.beforeItemAdd fluig.filter.itemAdded fluig.filter.beforeItemUpdate fluig.filter.itemUpdated fluig.filter.beforeItemRemove fluig.filter.itemRemoved fluig.filter.maxTags fluig.filter.focus fluig.filter.blur fluig.filter.loadComplete";
	window[instance].on(events, function(ev) {
		var evNameSpace = ev.namespace.replace(".", "").replace("filter", ""),
		evName = "onfilter" + evNameSpace.toLowerCase(),
		$input = $(ev.currentTarget).find(".tt-input")[0],
		trigger = $zoom.attr(evName);
		(new Function("el", "ev", trigger))($input, ev)
	})
}

function reloadZoomFilterValues(inputName, filterValues) {
	var dataZoomInstance = "data-zoom_" + inputName;
	var zoomOptions = window[dataZoomInstance];
	zoomOptions.filterValues = filterValues;
	var searchField = "";
	var settings = createSettings(zoomOptions, searchField);
	var filterInstance = "filter_" + inputName;
	window[filterInstance].reload(settings)
}

function createSettings(zoomOptions, searchField) {
	var resultFields, header;
	if (zoomOptions.displayKey) {
		searchField = zoomOptions.displayKey
	} else {
		searchField = zoomOptions.fields[0].field
	}
	var orderField = "";
	if (zoomOptions.fields) {
		resultFields = [];
		header = [];
		for (var i in zoomOptions.fields) {
			var column = zoomOptions.fields[i];
			resultFields.push(column.field);
			var columnHeader = {
					title: column.label
			};
			if (column.standard) {
				columnHeader.standard = Boolean(column.standard);
				orderField = column.field + "_ASC"
			}
			header.push(columnHeader)
		}
	}
	var filterFields = [];
	if (zoomOptions.filterValues) {
		var filterValues = zoomOptions.filterValues.split(",");
		if (filterValues && filterValues.length >= 2) {
			for (var j = 0; j < filterValues.length; j = j + 2) {
				if (filterValues[j] && filterValues[j + 1]) {
					filterFields.push(filterValues[j]);
					filterFields.push(filterValues[j + 1])
				}
			}
		}
	}
	var json = {
			searchField: searchField,
			filterFields: filterFields,
			resultFields: resultFields
	};
	var link = location.origin + "/ecm/api/rest/ecm/dataset/datasetZoom/";
	if (zoomOptions.cardDatasetId) {
		link = location.origin + "/ecm/api/rest/ecm/dataset/cardDatasetValues/";
		json.cardDatasetId = zoomOptions.cardDatasetId
	} else {
		json.datasetId = zoomOptions.datasetId
	}
	var strJson = encodeURI(JSON.stringify(json));
	link += strJson;
	var settings = {
			source: {
				url: link,
				contentType: "application/json",
				root: "content",
				pattern: "",
				limit: 300,
				offset: 0,
				patternKey: "pattern",
				limitkey: "limit",
				offsetKey: "offset",
				order: orderField
			},
			displayKey: searchField,
			searchTimeout: zoomOptions.searchTimeout || 500,
			minLength: zoomOptions.minLength || 3,
			style: {
				autocompleteTagClass: "tag-gray",
				tableSelectedLineClass: "info",
				templateTipMessage: ".ecm-zoom-results"
			},
			table: {
				header: header,
				renderContent: resultFields
			},
			navButtons: {
				enabled: false
			},
			initDisabled: zoomOptions.initDisabled === "true"
	};
	if (zoomOptions.templateTag) {
		settings.style.templateTag = zoomOptions.templateTag
	}
	if (zoomOptions.templateSuggestion) {
		settings.style.templateSuggestion = zoomOptions.templateSuggestion
	}
	return settings
}
var _this = this;
var ECM = ECM || {};
document.addEventListener("DOMContentLoaded", function(e) {
	if (ECM.fluigForms) {
		return
	}
	ECM.fluigForms = {};
	_this.MaskEvent.init(e);
	hasZoom()
}, false);
importFormJs = function(e) {
	maskInputs = [];
	var inputs = document.getElementsByTagName("input");
	var count = 0;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].hasAttribute("mask")) {
			maskInputs[count++] = inputs[i]
		}
	}
	if (maskInputs.length) {
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.src = "/portal/resources/js/jquery.mask.min.js";
		js.onload = loadMask;
		document.body.appendChild(js)
	}
};
loadMask = function(e) {
	for (var i = 0; i < maskInputs.length; i++) {
		if (maskInputs[i].id != undefined && maskInputs[i].id != "") {
			$("#" + maskInputs[i].id).mask(maskInputs[i].getAttribute("mask"))
		} else {
			if (maskInputs[i].name != undefined) {
				var mask = maskInputs[i].getAttribute("mask");
				var options = {};
				if (mask.indexOf("#") > -1) {
					options.maxlength = false;
					options.reverse = true
				}
				$("input[type='text'][name='" + maskInputs[i].name + "']").mask(mask, options)
			}
		}
	}
};
hideFields = function(fields) {
	if (Array.isArray(fields)) {
		for (var i = 0; i < fields.length; i++) {
			hideFields(fields[i])
		}
	} else {
		$("#" + fields).css("display", "none")
	}
};
showFields = function(fields) {
	if (Array.isArray(fields)) {
		for (var i = 0; i < fields.length; i++) {
			showFields(fields[i])
		}
	} else {
		$("#" + fields).css("display", "block")
	}
};
/*
if (!parent.WCMAPI._isMobile()) {
	function openInputFile(elementId, parameter) {
		var element = parent.document.getElementById(elementId);
		if (element && document.createEvent) {
			element.setAttribute("data-on-camera", "true");
			if (parameter) {
				element.setAttribute("data-file-name-camera", parameter)
			}
			var event = document.createEvent("MouseEvents");
			event.initEvent("click", true, false);
			element.dispatchEvent(event)
		}
	}
	JSInterface = {};
	JSInterface.showCamera = function(parameter) {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments != null) {
			tabAttachments.click();
			if (parent.WCMAPI.isIe9()) {
				$(".ecm-navigation-silverlight", parent.document).show("fade");
				$(".ecm-navigation-silverlight", parent.document).css("top", 0);
				$("#ecm-navigation-silverlight", parent.document).attr("data-on-camera", "true");
				$("#ecm-navigation-silverlight", parent.document).attr("data-file-name-camera", parameter);
				$(parent.document).on("keyup", this.actionKeyup)
			} else {
				openInputFile("ecm-navigation-inputFile-clone", parameter)
			}
		}
	}
};
*/


