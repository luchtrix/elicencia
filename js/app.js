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
	$scope.tmp = {};
	$scope.myoption = function(option){
		switch(option){
			case 1: $("#saveinfo").hide(); break;
			case 2: $("#saveinfo").show(); break;
			default: $("#saveinfo").hide(); break;
		}
	}

	$scope.saveallinfo = function(){
		//alert("nom "+$scope.tmp.LUSUNOM+" ape "+$scope.tmp.LUSUAPP)
		//validar que todos los campos sean llenados
		var usuarios_guardados = []
        if (localStorage.getItem("usuarios_guardados") == null) 
            localStorage.setItem("usuarios_guardados", JSON.stringify(usuarios_guardados));
        usuarios_guardados = JSON.parse(localStorage.getItem("usuarios_guardados"));
        //localStorage.removeItem("pacientes_guardados")
        usuarios_guardados[usuarios_guardados.length] = $scope.tmp;
            
        localStorage.setItem("usuarios_guardados", JSON.stringify(usuarios_guardados));
		localStorage.removeItem("init");
		localStorage.removeItem("indicator");
		window.location.href = "../index.html";
		/*var array = [];
		//var tmp = [];
		if(localStorage.getItem("data") == null){
			array.push($scope.tmp);
			//tmp.push(array);
			localStorage.setItem("data", array);
		}else{
			array = localStorage.getItem("data");
			array.push($scope.tmp);
			localStorage.setItem("data", array);
		}
		localStorage.removeItem("init");
		localStorage.removeItem("indicator");
		window.location.href = "../index.html";*/
	}

	function verifyUndefined(objeto){
		for(var i = 0 ; i < objeto.length;i++){
			if(objeto[i] == undefined)
				return false;
		}
		return true;
	}

}]);
