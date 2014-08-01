


var cardApp = angular.module("cardApp",["rander"]);

cardApp.value("$s",3)
		.constant("$u",99)


	.filter("showOp", function(){
		return function(str) {
			if (str == '*') return '×';
			if (str == '/') return '÷';
			return str;
		}
	}).filter("makeOp", function($sce){
		return function(str, rep) {
			var html = str;
			return $sce.trustAsHtml(html);
		}
	}).filter("rep", function($sce, $rander){
		return function(str, rep) {
			str = ""+str;
			var nums = str.split('...');
	//		var dots = '';
			var dots = (str.indexOf('...') > -1 && '...') || '';
			var htmls = [];

			for (var i = 0; i < nums.length; i++) {
				var num = nums[i];
				switch (rep) {
					case 'IV':
						htmls.push("" + $rander.toR(parseInt(num)));
						break;
					default:
						htmls.push(""+num);
				}
			};

			var html = htmls.join(dots) || '<br/>';
			return $sce.trustAsHtml(html);

		}
	});

function cardCtrl ($scope, $M, $s, $u, $plus, $minus, $times) {

	$scope.side = 0;
	$scope.n1 = 1;
	$scope.n2 = 1;
	$scope.op = '+';
	$scope.rep = 6;
	$scope.mode = "flash";
	$scope.ring = Infinity;
	$scope.upBound = $u; $scope.lowBound = 1;
//	$scope.win = 0; $scope.start = 0;

/*	$scope.posRight = ["強！", "讚！", "用心！", "認真!"];
	$scope.negWrong = ["你是菜，還是呆？","這很簡單，你怎麼都不會？","拜託你小心一點！","不要胡亂回答！"]; */


	$scope.flash = function(e){

		if ($scope.op == '+' || $scope.op == '-') {$s = 2} else {$s = 3}

		if (e.which == 13 || e == 1)  {
			if ($scope.side == $s) {
				$scope.n1 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
				$scope.n2 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
			}

		//	$scope.side = $s+1 - ($scope.side || $s);
			$scope.side++;
			if ($scope.side > $s) $scope.side -= $s;
		}
	}

	$scope.isMax = function(num){
		return num == $s;
	}

	$scope.myEval = function (formula) {
		return $M.eval(formula);
	}


	$scope.myMiddle = function (n1,op,n2) {
		var upList = [];
		var mdList = [];
		n1 = ""+n1; n2 = ""+n2;
		switch (op) {
			case '*':
				return [$times.up(n1,op,n2),$times.md(n1,op,n2)];

			case '+':
				return [$plus.up(n1,op,n2),$plus.md(n1,op,n2)];
			default:
				return [['Error'],['Error']];
		}
			console.log(upList,mdList);


		return [upList,mdList];
	}
}
