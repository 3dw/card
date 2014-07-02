
	var now = new Date(); var qa; var maybeX; var dotColor;
	var ring = Infinity;
	var posRight = ["強！", "讚！", "用心！", "認真!"];
	var negWrong = ["你是菜，還是呆？","這很簡單，你怎麼都不會？","拜託你小心一點！","不要胡亂回答！"];
	var upBound = 20; var lowBound = 0;
	var win = 0; var start = 0;
	
	var objNow; var bottonFunNow; var n1Now = 0; var n2Now = 0;
	var rep = "6"; var mode = "閃卡模式";




	Toolkit = Backbone.Model.extend({
		defaults: {
				rep: 6,
	        },
	    makeTools: function() {
	    	$("body").append("<div class = 'tool zero'></div>"
							+"<div class = 'tool one'></div>"
							+"<div class = 'tool two'></div>"
							+"<div class = 'tool three'></div>"
							+"<div class = 'tool four'></div>"
							+"<div class = 'tool five'></div>");
	    },
		initialize: function(model) {

			this.on("change:rep", function(model){

				$(".piece, tool").remove();

				switch (model.get('rep')) {

					case '$':
						model.makeTools();
						for (var i = 0; i < 20; i++) {
							$(".tool.five").append("<div class='rect fiveHundred piece'>500</div>");
							$(".tool.four").append("<div class='rect piece'>100</div>");
							$(".tool.three").append("<div class='circle fifty piece'>50</div>");
							$(".tool.two").append("<div class='circle ten piece'>10</div>");
							$(".tool.one").append("<div class='circle five piece'>5</div>");
							$(".tool.zero").append("<div class='circle piece'>1</div>");
						}

						break;

					case '.':

						model.makeTools();
						var dotColor =["darkgreen","goldenrod","brown","purple","darkred","darkblue"];

						for (var i = 0; i < 20; i++) {
							$(".tool.zero").append("<div class='circle dot piece' style = 'background:"+dotColor[0]+";'></div>");
							$(".tool.one").append("<div class='circle dot piece' style = 'background:"+dotColor[1]+";'></div>");  
							$(".tool.two").append("<div class='circle dot piece' style = 'background:"+dotColor[2]+";'></div>");  
							$(".tool.three").append("<div class='circle dot piece' style = 'background:"+dotColor[3]+";'></div>");  
							$(".tool.four").append("<div class='circle dot piece' style = 'background:"+dotColor[4]+";'></div>");  
							$(".tool.five").append("<div class='circle dot piece' style = 'background:"+dotColor[5]+";'></div>");
						}    
						break;

					default:
//						$(".piece, tool").remove()			

				}		

				$('.piece').draggable().click(function (){$(this).hide()});
			});
		}       
    });

	var fcTool = new Toolkit();
	

	function symbol (t, sym) {
		switch (sym){
			case ' + ': 
				if (t == 'S') return '，又面向前方';
				if (t == 'C') return '加';
				if (t == 'M') return '<div style ="float:left">又有</div>';
				if (t == 'D') {chDotColor(); return '<div style ="float:left">&nbsp;+&nbsp;</div>'}
				if (t == 'R') return '<div style ="float:left">&nbsp+&nbsp</div>';
			case ' - ':
				if (t == 'S') return '，又面向後方';
				if (t == 'C') return '減';
				if (t == 'M') return '<div style ="float:left">扣掉</div>';
				if (t == 'D') {chDotColor(); return '<div style ="float:left">&nbsp;-&nbsp;</div>'}
				if (t == 'R') return '<div style ="float:left">&nbsp;-&nbsp;</div>';
			case ' × ':
				
				if (t == 'S') return '，每段是';
				if (t == 'C') return '乘以';
				if (t == 'M') return '<div style ="float:left">個</div>';
				if (t == 'D') {chDotColor(); return '<div style ="float:left">&nbsp;×&nbsp;</div>'}
				if (t == 'R') return '<div style ="float:left">&nbsp;×&nbsp;</div>';
			case ' ÷ ':
				chDotColor();
				if (t == 'S') return '，就是';
				if (t == 'C') return '除以';
				if (t == 'M') return '<div style ="float:left">平分給</div>';
				if (t == 'D') {chDotColor(); return '<div style ="float:left">&nbsp;÷&nbsp;</div>'}
				if (t == 'R') return '<div style ="float:left">&nbsp÷&nbsp</div>';
			default:
				return '';  
		}
	}

	function toX (sym, n1, n2) {
		var maybeQ = '';
		rep == '()' ? maybeX = '(&nbsp;&nbsp;&nbsp;&nbsp;)' : maybeX = 'x';
		if ((mode == "挑戰模式" || mode == "挫折模式") && qa == "Q") maybeQ = ', ' +maybeX;
		switch (sym){
			case ' + ': 
				return maybeX + ' - '+n2+' = '+n1+ maybeQ;
			case ' - ':
				return maybeX + ' + '+n2+' = '+n1+ maybeQ;
			case ' × ':
				return maybeX + ' ÷ '+n2+' = '+n1+ maybeQ;
			case ' ÷ ':
				return maybeX + ' × '+n2+' = '+n1+ maybeQ;
			default:
				return '';
		}
	}

//Step
	function toS (num, isDuan) {
		var ansS = "";
		num < 0 ? ansS = "倒退" : ansS = "";
		num < 0 ? num = Math.abs(num) : num = num;
		isDuan ? ansS += "走" + num + "步" : ansS += num + "段路";
		if (isDuan && num < 0) {
			 ansS = "反著走" + num + "段路";
		}
		return ansS;
	}


//中文
	function toC(num) {		
		var ansC = "";
		num < 0 ? ansC = "負" : ansC = "";
		num < 0 ? num = Math.abs(num) : num = num;
		
		var hunds = Math.floor(num / 100);
		var tens = Math.floor((num - hunds * 100 ) / 10);
		var ones = num - hunds * 100 - 10 * tens;

		var list = ['','','二','三','四','五','六','七','八','九'];
		var list1 = ['','一','二','三','四','五','六','七','八','九'];

		if (num == 0) {
			return '零';
		}

		if (hunds) {
			ansC = ansC + list1[hunds] + '百';
			if (tens) {
				ansC += list1[tens] + '十';
			}
			else {
				if (ones) {
					ansC += '零';
				}
			};
		}		
		else {
			if (tens) {
				ansC += list[tens] + '十';
			}
			else {
			};

		}
		ansC += list1[ones];

		return ansC;
	}


//Money
	function toM (num) {		
		var ansM = "";
		num < 0 ? ansM = "<div style ='float:left'>欠債</div>" : ansM = "";
		num < 0 ? num = Math.abs(num) : num = num;
		
		var fHunds = Math.floor(num / 500);
		var hunds = Math.floor((num - fHunds * 500) / 100);
		var fiftys = Math.floor((num - fHunds * 500 - hunds * 100) / 50);
		var tens = Math.floor((num - fHunds * 500 - hunds * 100 - fiftys * 50) / 10);
		var fives = Math.floor((num - fHunds * 500 - hunds * 100 - fiftys * 50 - 10 * tens) / 5);
		var ones = num - fHunds * 500 - hunds * 100 - fiftys * 50 - 10 * tens - 5 * fives;

		for (var i = 0; i < fHunds; i++) {
			ansM +=  "<div class='rect fiveHundred'>500</div>";
		};
		for (var i = 0; i < hunds; i++) {
			ansM +=  "<div class=rect>100</div>";
		};
		for (var i = 0; i < fiftys; i++) {
			ansM +=  "<div class='circle fifty'>50</div>";
		};
		for (var i = 0; i < tens; i++) {
			ansM +=  "<div class='circle ten'>10</div>";
		};
		for (var i = 0; i < fives; i++) {
			ansM +=  "<div class='circle five'>5</div>";
		};
		for (var i = 0; i < ones; i++) {
			ansM += "<div class=circle>1</div>";
		};	

		return ansM;
	}

//Dot
	function toD(num) {
		var ansD = "";	
		for (var i = 0; i < num; i++) {
			ansD = ansD + "<div class='circle dot' style = 'background:"+dotColor+";'></div>";
			if (i % 5 == 4) ansD += "<div class=roman>&nbsp;&nbsp;&nbsp;</div>";
			if (i % 10 == 9) ansD += "<br />";
		};
		ansD += "<br />";
		return ansD;
	}

//Roman

	function toR(num) {
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

// Check Answer

	function checkAns (bigAns, data, att){
		var ans = eval(data);
		if (document.getElementById(bigAns).getElementsByTagName("input")[0].value == eval(data)) {
			win++;
			var bonus = "真";
			for (var i = 0; i < Math.floor(win / 3);i++) {
				if (bonus == "真") {
					bonus = "";
				}					
				bonus += "超";
			}
			if (att == "positive") {
				var many = "";
				if (win > 1) many = "連續";
				alert("答對了！這是你第"+win+"次"+many+"答對！你"+bonus+posRight[Math.floor(Math.random()*posRight.length)]);
			}
			if (att =="negative") {
				alert("才連續答對"+win+"次…根本就是"+bonus+"靠運氣！");
			}
		}
		else {
			if (att == "positive") {
				alert("答案是"+ans+"。沒關係，再接再勵！在此之前你已連續答對了"+win+"次！");
				win = 0;
			}
			if (att =="negative") {
				alert("答案是"+ans+"才對，"+negWrong[Math.floor(Math.random()*negWrong.length)]);
			}
		}
		start = 1;
	}

	function clk (){
//		alert(objNow);
		objNow ? objNow.onclick(objNow) : alert("請先點一個按鈕");
	}


    

	function askq (data, pnword){	

		document.getElementById('bigans').innerHTML = data+" = "+"<input class='ui input' type = 'text' ></input> <button class='ui small teal button' onclick = 'clk()'>"+pnword+"</button>";
		document.getElementById('bigans').getElementsByTagName("input")[0].focus();

		start = 0;

	}

	function innerBig (data, data2) {

		if (!data2) {
			document.getElementById('bigans').innerHTML = data;
		}
		else {
			document.getElementById('bigans').innerHTML = data+"<br /><hr><font color = 'black'>"+data2+"</font>";
		}


		$('#bigans').children().children('div').addClass("piece").draggable().click(function (){$(this).hide()});
	}

// 書寫
	function writeBig (data, dataD, dataR, dataM, dataC, dataS, dataList, dataX){
		(qa == "Q") ? document.getElementById('bigans').style.color = "red" : document.getElementById('bigans').style.color = "blue";
		var dataRep;
		switch (rep) {
			case "6":
					dataRep = data; break;
			case ".":
					dataRep = dataD; break;
			case "VI":
					dataRep = dataR; break;
			case "$":
					dataRep = dataM; break;
			case "六":
					dataRep = dataC; break;
			case "步":
					dataRep = dataS; break;
			case "列":
					dataRep = dataList; break;
			case "x":
			case "()":
					dataRep = dataX; break;						
			default:
					break;				
		}

		switch (mode) {
			case "挑戰模式":
				if (qa == "Q") { askq(dataRep,"送出挑戰！") }
				else {
					checkAns('bigans',data, "positive");
					innerBig(dataRep);
				}
				break;				
			case "挫折模式":			
				if (qa == "Q") { askq(dataRep,"忍受挫折！") }
				else {
					checkAns('bigans',data, "negative");
					innerBig(dataRep);
				}
				break;
			default:
				if (rep == "6") {
					innerBig(data);
				}
				else {
					innerBig(data, dataRep);
				}
		}
	}

	function runCode(e) {
		var keycode; 
		if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
		if (keycode == 13) bottonFunNow(objNow); // 32:Spacebar  13:ENTER
	}

	function setNow (obj, bottonFun){
		objNow = obj; // funNow = fun; parNow = par; symNow = sym;
		bottonFunNow = bottonFun;

		document.onkeydown = runCode;

		var mil = now.getMilliseconds(); var sec = now.getSeconds();
		now = new Date();
		var mil1 = now.getMilliseconds(); var sec1 = now.getSeconds();

		if ((mil1-mil < 100 && sec1 - sec < 1)) {
			return 0;
		}
		return 1;  // 防止Chrome瀏覽器自動把Enter鍵當按下，變成按兩次。
	}

	//Eval Answer

	function evAns(formula, up) {
		var ans;
		if (formula.split(" ")[2]) {
			formula = formula.split(" ")[0] + formula.split(" ")[1] + '('+ formula.split(" ")[2] + '+' + up +')';
		}
		else {
			formula = '(' + formula + '+'+ up +')';
		}
		ring != Infinity ? ans = (eval(formula) % ring + ring) % ring : ans = eval(formula);
		return ans;
	}

	function makeQues (obj, n1, n2, sym) {

		var ques = n1+sym+n2;
		var quesD = toD(n2); quesD = symbol('D',sym) + quesD; quesD = toD(n1)+ quesD; //為了變色
		var quesR = toR(n1)+symbol('R',sym)+toR(n2);
		var quesM = toM(n1)+symbol('M',sym)+toM(n2);		
		if (sym == " × ") quesM = toD(n2)+symbol('M',sym)+toM(n1);
		if (sym == " ÷ ") quesM = toM(n1)+symbol('M',sym)+toD(n2)+'個人';
		var quesC = toC(n1)+symbol('C',sym)+toC(n2);
		var quesS = toS(n1,1)+symbol('S',sym)+toS(n2,1);
		if (sym == " × ") quesS = toS(n1,0)+symbol('S',sym)+toS(n2,1);
		if (sym == " ÷ ") quesS = toS(n1,1)+symbol('S',sym)+toS(n2,0);

		var quesList = [ques, n1+sym+(n2+1), n1+sym+(n2+2), n1+sym+(n2+3), n1+sym+(n2+4)];

		quesList = quesList.join(',&nbsp;&nbsp;');

		var quesX = toX(sym, n1, n2);

		obj.innerHTML = ques;
		writeBig(ques,quesD,quesR,quesM,quesC,quesS,quesList, quesX);

	}

	function chDotColor (){
		dotColor = ["darkgreen","goldenrod","brown","purple","darkred","darkblue"][Math.floor(Math.random()*6)];
	}

	// Abstract flashcard
	function flashcard (obj, bottonFun, symR, symE, n1, n2){

		if (!setNow(obj,bottonFun)) return;

		// construct formula   symR: Readable Symbol, symE: Evaluable Symbol
		var formula = obj.innerHTML;
		if (symR != symE) formula = obj.innerHTML.split(symR).join(symE);

		// modulus ring
		n1 = n1 % ring; n2 = n2 % ring;

		//construct Ans
		var ans = evAns(formula,0);

//		if (qa == "A") chDotColor();
		var ansD = toD(ans);
		var ansR = toR(ans); var ansM = toM(ans); var ansC = toC(ans);

		var ansS = toS(ans,1);
			if (symR == " × ") ansS = toS(ans,1);
			if (symR == " ÷ ") ansS = "每段路要：" + toS(ans,1);

		var ansList = [ans, evAns(formula,1),  evAns(formula,2),  evAns(formula,3),  evAns(formula,4)];  ansList = ansList.join(',&nbsp;&nbsp;');

		var ansX;
		if (maybeX == 'x') {
			ansX = "x = " + ans;
		}
		else {
			if (toX(symR, n1Now, n2Now).split(')')[1]) {
				ansX = "(" + ans + ")" + toX(symR, n1Now, n2Now).split(')')[1].split(',')[0];
			} else {
				ansX = "(" + ans + ")" + toX(symR, n1Now, n2Now).split(')')[1];
			}
		} 
	
		// dicide Q or A
		if (ans && obj.innerHTML !== String(ans) && start != 1) {
			obj.innerHTML = ans; qa = "A";
			writeBig(ans, ansD, ansR,ansM,ansC, ansS, ansList, ansX);
		} else {
			qa = "Q";
			n1Now = n1; n2Now = n2;
			makeQues(obj, n1, n2, symR);
		}

	}

	// 加減法 
	function plmi(obj, bottonFun, add, sym) {

		//construct n1,n2
		var n1 = Math.floor(Math.random() * ((upBound - lowBound) / 2 - 1)) + add;
		var n2 = Math.floor(Math.random() * ((upBound - lowBound) / 2 - 1)) + 1;
		n1 = eval(n1 + lowBound / 2);
		n2 = eval(n2 + lowBound / 2);

		//main
		flashcard(obj, bottonFun, sym, sym, n1, n2);		
	}

	// 乘除法 
	function tmdv(obj, bottonFun,symR,symE) {

		//construct n1,n2
		var n1, n2;	var sig = 1;
			lowBound < 0 ? sig = -1 : sig = 1;
		while (!(n1 * n2) || ( sig == -1 && n1 > 0 && n2 > 0)) {
			if (symR == " × ") {
				n1 = Math.floor(Math.random() * (15 - sig * 5)) + 1 + (sig-1) * 5;
				n2 = Math.floor(Math.random() * (15 - sig * 5)) + 1 + (sig-1) * 5;

			}
			else {	
				n2 = Math.floor(Math.random()*(15 - sig * 5)) + 1 + (sig-1) * 5;
				n1 = n2 * (Math.floor(Math.random()*(15 - sig * 5)) + 1 + (sig-1) * 5);
			}
		}

		//main
		flashcard(obj, bottonFun, symR, symE, n1, n2);
	}

	function pl(obj) { plmi(obj, pl, 1, ' + ') }
	function mi(obj) { plmi(obj, mi, (upBound - lowBound) / 2, ' - ') }
	function tm(obj) { tmdv(obj, tm, " × "," * ") }
	function dv(obj) { tmdv(obj, dv, " ÷ "," / ") }

	function showdv (nOrs) {
		document.getElementById("dv1").style.display = nOrs;
		document.getElementById("dv2").style.display = nOrs;
	}

	function doSwi(obj, doRep, word, doStart, doInner){
		if (confirm(word)) {rep = doRep; fcTool.set({rep: doRep}) ;doStart; if (doInner) obj.innerHTML = doInner}
	}

	function swi(obj) {
		var data = obj.innerHTML;

		switch (data)
		{
			case "6" :
				doSwi(obj, "6", "無參照?", 0);break;
			case "." : 
				doSwi(obj, ".", "點點參照?", 0,"VI");	break;
			case "VI" : 
				doSwi(obj, "VI", "羅馬數字參照?", 0, ".");	break;
			case "$" : 
				doSwi(obj, "$", "錢幣參照?", 0); break;
			case "六" : 
				doSwi(obj, "六", "中文參照?", 0); break;
			case "步" : 
				doSwi(obj, "步", "走路參照?", 0); break;			
			case "列" : 
				doSwi(obj, "列", "數列參照?", 0); break;			
			case "x" : 
				doSwi(obj, "x", "代數方程式參照?", 0, '()');	break;
			case "()":
				doSwi(obj, "()", "算式填空參照?", 0, 'x'); break;

			case "閃卡" : 
				if (confirm("回到閃卡模式?")) {mode = "閃卡模式"; start = 0}; break;	
			case "挑戰" : 
				if (confirm("進入挑戰模式?")) {mode = "挑戰模式"; start = 1}; break;
			case "挫折" : 
				if (confirm("進入挫折模式?")) {mode = "挫折模式"; start = 1}; break;

			case "Z" : 
				if (confirm("回到整數系?")){ring = Infinity; showdv("")}; break;
			case "Z/7Z" : 
				if (confirm("改為星期鐘(7的數環)?")){ring = 7; showdv("none")}; break;
			case "Z/12Z" : 
				if (confirm("改為時鐘(12的數環)?")){ring = 12; showdv("none")}; break;			
			default : 
				alert("發生錯誤");
		};			
	}
	
	function chUp(obj) {
		upBound = obj.innerHTML;
		alert("加減法上限已設為"+upBound);
	}
	
	function chLow(obj) {
		lowBound = obj.innerHTML;
		var words = '';
		lowBound < 0 ? words = "，乘除負數已開啟。" : words = "乘除負數已關閉";
		alert("加減法下限已設為"+lowBound+words);

	}
	

	function hacker(obj,val) {
		var objs = document.getElementById('bigans').getElementsByTagName("input");
		var ans = [];
		var objT = objs[val];
		var list = objT.value.split(",");

		for (var i = 0; i < list.length; i++) {
			ans.push(list[i]);
		};

		switch (val) {
			case 0:
				posRight = ans;
				break;
			case 1:
				negWrong = ans;
				break;
		}
		alert(ans);
	}

	function hack(obj) {
		document.getElementById('bigans').innerHTML = "挑戰模式正評<br /><input type='text'  class='ui input' size = '60' value = '" + posRight + "'></input> <button  class='ui button small teal' onclick = 'hacker(this, 0)'>修改完畢</button><hr><br />" +"挫折模式負評<br /><input type='text' size='100' class='ui input' value = '" + negWrong + "'></input> <button onclick='hacker(this, 1)' class='ui button small teal'>修改完畢</button><hr><br />";

		document.getElementById('bigans').getElementsByTagName("input")[1].focus();
	}



	function touchAble() {
		document.getElementById("card").addEventListener("touchstart", function(ev){
			console.log(ev.touches); // good
			clk();
	    });

    }

    touchAble();
