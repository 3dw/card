var rander = angular.module("rander",[]);

rander.service("$M", function(){
	this.eval = function(formula){
		if (formula.indexOf('/') > -1) {
			var a = formula.split('/')[0];
			var b = formula.split('/')[1];
			if (a % b) return (Math.floor(eval(formula)) + '...' + a % b);
				return Math.floor(eval(formula));
		}
		return eval(formula);
	}
}).service("$plus", function($M){
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
}).service("$minus", function($M){
	this.up = function(n1,op,n2) {
		var upList = new Array;
		return upList;
	}
	this.md = function (n1,op,n2){
		var mdList = new Array;
		return mdList;
	}
}).service("$times", function($M){
	this.up = function(n1,op,n2) {
		var upList = new Array;
		return upList;
	}
	this.md = function (n1,op,n2){
		var mdList = new Array;
			for (var i = 0; i < n2.length; i++) {
				var n = parseInt(n2[n2.length-i-1]) * Math.pow(10,i);
				mdList.push($M.eval(n1+op+n));
			};
		return mdList;
	}
}).service("$rander", function () {
	this.toR = function(num) {
		var ansR = "";
		num < 0 ? ansR = "-" : ansR = "";
		num < 0 ? num = Math.abs(num) : num = num;

		var fHunds = Math.floor(num / 500);
		var hunds = Math.floor((num - fHunds * 500) / 100);
		var fiftys = Math.floor((num - fHunds * 500 - hunds * 100) / 50);
		var tens = Math.floor((num - fHunds * 500 - hunds * 100 - fiftys * 50) / 10);
		var fives = Math.floor((num - fHunds * 500 - hunds * 100 - fiftys * 50 - 10 * tens) / 5);
		var ones = num - fHunds * 500 - hunds * 100 - fiftys * 50 - 10 * tens - 5 * fives;

		for (var i = 0; i < fHunds; i++)
			{ ansR = ansR + "<div class = 'roman'>" + "D" + "</div>"};
		for (var i = 0; i < hunds; i++)
		 	{ ansR = ansR + "<div class = 'roman'>" + "C" + "</div>" };
		for (var i = 0; i < fiftys; i++)
		 	{ ansR = ansR + "<div class = 'roman'>" + "L" + "</div>" };
		for (var i = 0; i < tens; i++)
		 		{ ansR = ansR + "<div class = 'roman'>" + "X" + "</div>" };
		for (var i = 0; i < fives; i++)
		 	{ ansR = ansR + "<div class = 'roman'>" + "V" + "</div>" };
		for (var i = 0; i < ones; i++)
		 		{ ansR = ansR + "<div class = 'roman'>" + "I" + "</div>" };

		return ansR;
	}
});
