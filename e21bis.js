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

}

monkeys["root"][1] = "=";

// to test if  monkey does depend on humn
monkeys["humn"] = NaN;


// go back

solve("root",0);

function solve(name,result) {

	if(name=="humn") {
		console.log("HUMN",result);
		return;
	}

	var op = monkeys[name][1];

	var p1 = monkeys[name][0];
	var v1 = compute(p1);

	var p2 = monkeys[name][2];
	var v2 = compute(p2);

	if(isNaN(v1)&&!isNaN(v2)) {
		switch(op) {
			case '+': return solve(p1,result-v2);
			case '-': return solve(p1,result+v2);
			case '*': return solve(p1,result/v2);
			case '/': return solve(p1,result*v2);
			case '=': return solve(p1,v2);
		}		
	}
	else
	if(isNaN(v2)&&!isNaN(v1)) {
		switch(op) {
			case '+': return solve(p2,result-v1);
			case '-': return solve(p2,v1-result);
			case '*': return solve(p2,result/v1);
			case '/': return solve(p2,v1/result);
			case '=': return solve(p2,v1);
		}
	}
	else
	{
		console.log("ERR ",name);
	}

}

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
		case '=' : return compute(p1)==compute(p2);
	}

}

