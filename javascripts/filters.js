angular.module("rander")
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
	})
