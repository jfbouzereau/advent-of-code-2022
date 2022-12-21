var fs = require("fs");

var d = fs.readFileSync("e3.txt","utf8").split("\n").filter(x=>x);

var sum = 0;

for(var i=0;i<d.length;i++) {
	
	var l = d[i].length/2;
	var c1 = d[i].substring(0,l);
	var c2 = d[i].substring(l,2*l);

	var r = intersect(c1,c2);
	sum += value(r[0]);
}

console.log(sum);

sum = 0;

for(var i=0;i<d.length;i+=3) {

	var c1 = d[i];
	var c2 = d[i+1];
	var c3 = d[i+2];

	r = intersect(c1,intersect(c2,c3));
	sum += value(r[0]);
}

console.log(sum);

function ascii(x) { return x.charCodeAt(0) }

function value(r) {
	if((r>='a')&&(r<='z'))
		return ascii(r)-ascii('a')+1;
	else if((r>='A')&&(r<='Z'))
		return ascii(r)-ascii('A')+27;
}

function intersect(a,b) {

	var r = "";
	for(var i=0;i<b.length;i++)
		if(a.indexOf(b[i])>=0)
			r += b[i];

	return r;
}

