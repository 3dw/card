
angular.module("cardApp",["rander"])
	.value("$s",3)
	.value("$u",50)
	.controller("cardCtrl",
		['$scope', '$M', '$s', '$u',
			 "$plus", "$minus", "$times", cardCtrl]);

function cardCtrl ($scope, $M, $s, $u, $plus, $minus, $times) {

	angular.extend($scope, {
		steps : $s,
		side : 0,
		n1 : 1,
		n2 : 1,
		op : '+',
		rep : 6,
		mode : "flash",
		ring : Infinity,
		upBound : $u,
		lowBound : 1
	})
	

//	$scope.win = 0; $scope.start = 0;
/*	$scope.posRight = ["強！", "讚！", "用心！", "認真!"];
	$scope.negWrong = ["你是菜，還是呆？","這很簡單，你怎麼都不會？","拜託你小心一點！","不要胡亂回答！"]; */

	angular.extend($scope,{
		flash: function(e){

				if ($scope.op == '-') {
					$s = 2
				} else {
					$s = 3
				}

				if (e.which == 13 || e == 1)  {
					if ($scope.side == $s) {
						$scope.n1 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
						$scope.n2 = $scope.lowBound + Math.floor(Math.random() * ($scope.upBound - $scope.lowBound));
					}

				//	$scope.side = $s+1 - ($scope.side || $s);
					$scope.side++;
					if ($scope.side > $s) $scope.side -= $s;
				}
			},
		isMax : function(num){
			return num == $s;
		},

		myEval : function (formula) {
			return $M.eval(formula);
		},
		myTail : function (formula,op) {
			switch (op) {
				case '+':
					ans = (""+$M.eval(formula)).substring(1);
					break;
				default:
					ans = '';
			}
			return ans;
		},

		myMiddle : function (n1,op,n2) {
			var upList = [];
			var mdList = [];
			n1 = ""+n1; n2 = ""+n2;
			switch (op) {
				case '*':
					return [$times.up(n1,op,n2),$times.md(n1,op,n2)];
					break;
				case '+':
					return [$plus.up(n1,op,n2),$plus.md(n1,op,n2)];
					break;
				case '-':
					return [$minus.up(n1,op,n2),$minus.md(n1,op,n2)];
					break;
				default:
					return [['Error'],['Error']];
			}
				console.log(upList,mdList);


			return [upList,mdList];
		}

	});




}
