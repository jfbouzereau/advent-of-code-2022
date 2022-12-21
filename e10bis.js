var fs = require("fs");

var d = fs.readFileSync("e10.txt","utf8").split("\n").filter(x=>x);

var marks = [20,60,100,140,180,220];

var sum = 0;
var reg = 1;
var step = 0;

var crt = "";

for(var i=0;i<d.length;i++) {
	var words = d[i].split(" ");
	var op = words[0];
	var count = 1*words[1];
	if(op=="noop") {
		check();		
	}
	else if(op=="addx") {
		check();
		check();
		reg += count;
	}
	else
		console.log("ERROR ",d[i]);
}


function check() {
	var col = step%40;
	if((reg>=col-1)&&(reg<=col+1))
		crt += "#";
	else
		crt += ".";	
	if(col%40==39) {
		console.log(crt);
		crt = "";
	}
	step++;
}

