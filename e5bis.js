var fs = require("fs");

var d = fs.readFileSync("e5.txt","utf8").split("\n");

var stack = [];
for(var i=1;i<=9;i++)
	stack[i] = [];

while(1) {
	var line = d.shift();
	if(line.indexOf("1")>=0) break;
	for(var i=0;i<line.length;i+=4) {
		if(line[i]!="[") continue		
		var s = line[i+1];
		stack[i/4+1].push(s);	
	}
}

//console.log(stack);

d.shift();

var temp = [];

while(1) {
	var line = d.shift();
	if(!line) break;
	var m = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
	if(!m) continue;	
	var qte = 1*m[1];
	var from = 1*m[2];
	var dest = 1*m[3];

	for(var k=0;k<qte;k++) 
		temp.unshift( stack[from].shift() );

	for(var k=0;k<qte;k++) 
		stack[dest].unshift( temp.shift() );
}

var r = "";
for(var i=1;i<=9;i++)
	r += stack[i].shift();

console.log(r);


