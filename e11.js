var fs = require("fs");

var d = fs.readFileSync("e11bis.txt","utf8").split("\n").filter(x=>x);

var monkeys = [];

for(var i=0;i<d.length;i++) {
	var line = d[i];
	var m = line.match(/Monkey ([0-9]+):/);
	if(!m) { console.log("ERREUR A",line); process.exit(1); }
	var num = m[1];
	if(num!=monkeys.length) { console.log("ERREUR G",line); process.exit(1) }
	monkey = {};
	
	line = d[++i];
	m = line.match(/Starting items: (.*)/);
	if(!m) { console.log("ERREUR B",line); process.exit(1); }
	monkey.items = m[1].split(", ").map(x=>1*x);

	line = d[++i];
	m = line.match(/Operation: new = (.*)/);
	if(!m) { console.log("ERREUR C",line); process.exit(1); }
	monkey.op = m[1];

	line = d[++i];
	m = line.match(/Test: divisible by ([0-9]+)/);
	if(!m) { console.log("ERREUR E",line); process.exit(1); }
	monkey.div = 1*m[1];
	
	line = d[++i];
	m = line.match(/If true: throw to monkey ([0-9]+)/);
	if(!m) { console.log("ERREUR E",line); process.exit(1); }
	monkey.t = 1*m[1];
	
	line = d[++i];
	m = line.match(/If false: throw to monkey ([0-9]+)/);
	if(!m) { console.log("ERREUR F",line); process.exit(1); }
	monkey.f = 1*m[1];
	
	monkey.count = 0;

	monkeys.push(monkey);
}


//for(var step=1;step<=10000;step++) {
for(var step=1;step<=20;step++) {
	for(var i=0;i<monkeys.length;i++) {
		var monkey = monkeys[i];
		for(var j=0;j<monkey.items.length;j++) {
			var old = monkey.items[j];
			eval("var newval = "+monkey.op);
			newval =  (newval/3)|0;
			var dest = newval%monkey.div==0 ? monkey.t : monkey.f;
			monkeys[dest].items.push(newval);
		}

		monkey.count += monkey.items.length;
		monkey.items = [];
	}

}


var counts = monkeys.map(x=>x.count);
console.log(counts);
counts.sort( function(a,b) { return b-a } );

console.log(counts[0]*counts[1]);
