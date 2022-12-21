var fs=require("fs");

var d= fs.readFileSync("e21.txt","utf8").split("\n").filter(x=>x);

var monkeys = {};

for(var i=0;i<d.length;i++) {

	var m = d[i].match(/([a-z]{4}): ([0-9]+)/);
	if(m) {
		monkeys[m[1]] = m[2]*1
		continue;
	}
		
	m = d[i].match(/([a-z]{4}): ([a-z]{4}) ([-+*/]) ([a-z]{4})/);
	if(m) {
		monkeys[m[1]] = [m[2],m[3],m[4]];
		continue;
	}

	console.log("ERREUR ",d[i]);
}

//console.log(monkeys);

var r = compute("root");

console.log(r);

function compute(name) {

	if(typeof monkeys[name] =="number") return monkeys[name];
	
	var op = monkeys[name][1];
	var p1 = monkeys[name][0];
	var p2 = monkeys[name][2];

	switch(op) {
		case '+' : return compute(p1)+compute(p2);
		case '-' : return compute(p1)-compute(p2);
		case '*' : return compute(p1)*compute(p2);
		case '/' : return compute(p1)/compute(p2);
	}

}
