var cardApp = angular.module("cardApp",[]);

cardApp.filter("showOp", function(){
		return function(str) {
			if (str == '*') return '×';
			if (str == '/') return '÷';
			return str;
		}
	});

function cardCtrl ($scope) {

	$scope.side = 0;

	$scope.n1 = 1;
	$scope.n2 = 1;

	$scope.op = '+';

	$scope.rep = 6;
	$scope.mode = "閃卡模式";

	$scope.ring = Infinity;

	$scope.upBound = 20; $scope.lowBound = 0;
	$scope.win = 0; $scope.start = 0;

	$scope.posRight = ["強！", "讚！", "用心！", "認真!"];
	$scope.negWrong = ["你是菜，還是呆？","這很簡單，你怎麼都不會？","拜託你小心一點！","不要胡亂回答！"];

	$scope.flash = function(e){
		if (e.which == 13)  {

			if ($scope.side == 1) {
						$scope.n1 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
						$scope.n2 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
			}

			$scope.side = 1 - $scope.side;
		}
	}
}