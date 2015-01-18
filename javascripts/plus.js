angular.module("rander")
.service("$plus", function($M){
	this.up = function(n1,op,n2) {
		var upList = new Array;

		for (var i = 0; i < Math.max(n1.length,n2.length); i++) {
			var m = (parseInt(n1[n1.length-i-1]) || 0) * Math.pow(10,i);
			var n = (parseInt(n2[n2.length-i-1]) || 0) * Math.pow(10,i);

			var ans = $M.eval(m+op+n);

			var beautifulAns = [];

			if (ans >= Math.pow(10,i+1)) {
				beautifulAns[i] = (""+ans)[0];
			} else {
				beautifulAns[i] = "&nbsp;&nbsp;";
			}
			upList.unshift(beautifulAns.join(""));
		};
		return upList;
	}
	this.md = function (n1,op,n2){
		var mdList = new Array;
		return mdList;
	}
})