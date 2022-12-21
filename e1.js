var fs = require("fs");

var d = fs.readFileSync("e1.txt","utf8").split("\n");

var rennes = [];

var k = 0;
var sum = 0;
for(var i=0;i<d.length;i++) {
	if(d[i]=="") {
		rennes[k] = sum;
		k++;
		sum = 0;
	}	
	else
		sum += 1*d[i];
}

	rennes[k] = sum;

rennes.sort(function(a,b) { return b-a });

// biggest
console.log(rennes[0]);

// biggest three
console.log(rennes[0]+rennes[1]+rennes[2]);
