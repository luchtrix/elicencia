var application = angular.module('elicenciaapp', []);
var url_server = 'http://159.203.128.165:8088/';

application.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

application.controller('elicenciaCtrl', ['$scope', '$http', function($scope, $http){
//application.controller('registerCtrl', ['$scope', '$http', function($scope, $http){
	var myApp = new Framework7();
	// Export selectors engine
	var $$ = Dom7;
	if(localStorage.getItem('init') == null)
    	window.location.href = "../index.html";
	//se esconde la opcion de guardar cuando se carga el archivo
	$("#saveinfo").hide();
	$scope.tmp = {
		LUSUNOC: "",//Nombre Completo
		LUSUNOM: "",
		LUSUAPP: "",
		LUSUAPM: "",
		LUSURFC: "",
		LUSUDIR: "",//Direccion completa
		LUSUCAL: "",
		LUSUNUM: "",
		LUSUCOL: "",
		LUSUCOP: "",
		LUSUMUN: "",
		LUSUEMA: "",
		LUSUCEL: "",
		LUSUTIP: "",
		LUSURES: "",
		LUSUPAD: "",
		LUSUDON: "",
		LUSUALE: "",
		LUSUSEX: "",
		LUSUCUR: "",
		LUSUINE: "",
		LUSUTIS: "",//Tipo de samgre
		LUSUNOE: "",
		LUSUCEE: ""
	};

	$scope.myoption = function(option){
		switch(option){
			case 1: $("#saveinfo").hide();myApp.closeModal('.picker-modal'); break;
			case 2: $("#saveinfo").show(); break;
			default: $("#saveinfo").hide(); break;
		}
	}

	$scope.saveallinfo = function(){
		//alert("tipo "+localStorage.getItem('tipo'));
		myApp.closeModal('.picker-modal');
		$scope.tmp.LUSUTIP = localStorage.getItem('tipo');
		$scope.tmp.LUSUNOC = $scope.tmp.LUSUNOM+" "+$scope.tmp.LUSUAPP+" "+$scope.tmp.LUSUAPM;
		$scope.tmp.LUSUDIR = "Calle "+$scope.tmp.LUSUCAL+", #"+$scope.tmp.LUSUNUM+", Col. "+$scope.tmp.LUSUCOL+", Municipio "+$scope.tmp.LUSUMUN+", CP: "+$scope.tmp.LUSUCOP;
		//validar que todos los campos sean llenados
		if(!isEmpty($scope.tmp)){
			alert("Rellene todos los campos...!");
			return;
		}

		$http.post(url_server+"apiu/register", $scope.tmp).then(function(response) {
            if(response.data.status){
            	localStorage.removeItem("init");
				localStorage.removeItem("indicator");
				$scope.tmp = {};
            	window.location.href = 'step4_finish.html';
            }else{
            	alert("Hubo un error al guardar los datos en la bd local!");
            }
        });

		//window.location.href = "../index.html";
	}

	function isEmpty(obj) {
		for(var prop in obj) {
    		var firstProp = obj[prop];
    		//alert(prop+" --> "+firstProp);
    		if(firstProp == "" || firstProp == undefined){
    			return false;
    		}
    	}
    	return true;
	}

}]);
