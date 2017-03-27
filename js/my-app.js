var application = angular.module('nayeapp', []);
var url_server = 'http://127.0.0.1:8080/';

application.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

/* Controlador para el login */
application.controller('loginCtrl', ['$scope', '$http', function($scope, $http){
	var usuario = localStorage.getItem('usuario');
	if (usuario != null) {
		window.location.href = 'views/home.html'
	}
	/* Funcion de registro */
	$scope.register = function(){
		$(".error").empty();
		$http.post(url_server+"apiu/register", $scope.data).then(function(response) {
            if(response.data.status){
            	// Alamcenamos la información del usuario
            	localStorage.setItem("usuario", JSON.stringify(response.data.data));
				window.location.href = 'views/home.html';
            }else{
            	$(".error").empty();
                $(".error").append('<div class="alert alert-danger" style="font-size:9pt;"><i class="fa fa-thumbs-up"></i> Error de Autenticación, verifique bien sus datos.</div>');
            }
        });
	}
	/* Funcion de login */
	$scope.login = function(){
		$(".error").empty();
		$http.get(url_server+'apiu/login', { params : {USUEMA: $scope.data.USUEMA, USUPAS: $scope.data.USUPAS }}).then(function(response){//Nomenclatura nueva
		//$http.post(url_server+"apiu/login", $scope.data).then(function(response) {
            if(response.data.status){
            	// Alamcenamos la información del usuario
            	localStorage.setItem("usuario", JSON.stringify(response.data.data));
				window.location.href = 'views/home.html';
            }else{
                $(".error").empty();
                $(".error").append('<div class="alert alert-danger" style="font-size:9pt;"><i class="fa fa-thumbs-up"></i> Error de Autenticación, verifique bien sus datos.</div>');
            }
        });
	}

	$scope.redirect = function(url){
		window.location.href = url;
	}

}]);

application.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	// Initialize your app
	var myApp = new Framework7();
	// Export selectors engine
	var $$ = Dom7;
	// Add views
	/*var view1 = myApp.addView('#view-1',{
		dynamicNavbar: true
	});
	var view2 = myApp.addView('#view-2', {
	    // Because we use fixed-through navbar we can enable dynamic navbar
	    dynamicNavbar: true
	});
	var view3 = myApp.addView('#view-3');
	var view4 = myApp.addView('#view-4');*/

	var usuario = localStorage.getItem("usuario");
	if (usuario == null) {
        window.location.href = '../index.html';
    }
    $scope.usuario = JSON.parse(usuario);// toda la informacion acerca del usuario

    getUsuarios();

    function getUsuarios(){
    	//alert("getUsuarios");
    	$scope.usuarios = [];
    	$http.get(url_server+"apiu/get").then(function(response) {
            if(response.data.status){
            	//$scope.usuarios = response.data.data;
            	for (var i = 0 ; i < response.data.data.length ; i++) {
            		if(response.data.data[i]._id != $scope.usuario._id){
            			response.data.data[i].USUIMG = url_server+response.data.data[i].USUIMG;
            			$scope.usuarios.push(response.data.data[i]);
            		}
            	}
            }else{
            	console.log("error en la recogida de datos!");
            	//$(".error").empty();
                //$(".error").append('<div class="alert alert-danger" style="font-size:9pt;"><i class="fa fa-thumbs-up"></i> Error de Autenticación, verifique bien sus datos.</div>');
            }
        });	
    }

    //funcion que obtiene el parametro que esta en la url...si existe
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
	
    var id = getUrlParameter('id');//capturando id de la url
    alert(id)
    /*$scope.onlychat = function(user){
    	alert("onlychat "+user.USUNOM);
    	$scope.oneuser = user;
    }*/

    $scope.redirect = function(url){
    	alert("redirect");
    	myApp.router.load(url);
		//window.location.href = url;
	}

}]);