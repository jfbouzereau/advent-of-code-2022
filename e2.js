var fs = require("fs");

var d=  fs.readFileSync("e2.txt","utf8").split("\n").filter(x=>x);


var score1 = {
	"A X":1+3,
	"A Y":2+6,
	"A Z":3+0,
	"B X":1+0,
	"B Y":2+3,	
	"B Z":3+6,
	"C X":1+6,
	"C Y":2+0,
	"C Z":3+3
}

var sum = 0;

for(var i=0;i<d.length;i++)
	sum += score1[d[i]];

console.log(sum);

var score2 = {
	"A X":3+0,
	"A Y":1+3,
	"A Z":2+6,
	"B X":1+0,
	"B Y":2+3,	
	"B Z":3+6,
	"C X":2+0,
	"C Y":3+3,
	"C Z":1+6
}

var sum = 0;

for(var i=0;i<d.length;i++)
	sum += score2[d[i]];

console.log(sum);

