var app = angular.module('me', ['ngRoute']);

//Rotas do APP
app.config( ['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'assets/views/dashboard.html'
	})
	.when('/changepass', {
		templateUrl: 'assets/views/changepass.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);
//Menu superior Controller
app.controller('topMenu', ['$scope','$http', function($scope,$http) {
	$scope.load = function () {
		$(".button-collapse").sideNav();
		$(".dropdown-button").dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: false,
			hover: true, 
			gutter: 0, 
			belowOrigin: true, 
		});
	}
}]);
//Menu Lateral Controller
app.controller('sideMenu', ['$scope','$http', function($scope,$http) {
	$scope.load = function () {
		$(window).bind('resize', function(event) { 
		var widowWidth = $(window).width();     
    		if((widowWidth <= 1023) && (widowWidth >= 768)){
    			$('.menu-label').hide();
    			$('#slide-out').css('width','90px');
    			$('main').css('padding-left','90px');
    			$('.caption').css('margin-left','0px','margin-top','0px');
    		}
    		//desktop back
    		else if ((widowWidth > 1023)){
    			$('.menu-label').show();
    			$('#slide-out').css('width','270px');
    			$('main').css('padding-left','270px');
    			$('.caption').css('margin-left','-108px','margin-top','70px');
    		}

		});
	}
	$http({
		method : "GET",
		url : "fakebase/menu.json"
	}).then(function mySucces(response) {
		$scope.menuData = response.data;
	}, function myError(response) {
	})
}])

//Menu Mobile controller options
app.controller('menuMobile', ['$scope','$http', function($scope,$http) {
	$http({
		method : "GET",
		url : "fakebase/menu.json"
	}).then(function mySucces(response) {
		$scope.menuData = response.data;
	}, function myError(response) {
	})
}])

//Carosel 
app.controller('carousel', ['$scope', function($scope) {
	$scope.load = function () {
		$('.slider').slider({
			full_width: false,
			indicators: false,
			height: 180,

		});
	}
}]);
//Products Base
app.controller('galleryProducts', ['$scope','$http', function($scope,$http) {
	$http({
		method : "GET",
		url : "fakebase/products.json"
	}).then(function mySucces(response) {
		$scope.productData = response.data;
	}, function myError(response) {
	})
}])
//Diretiva
app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});