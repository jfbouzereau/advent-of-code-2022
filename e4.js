var fs = require("fs");

var d = fs.readFileSync("e4.txt","utf8").split("\n").filter(x=>x);

var n = 0;

for(var i=0;i<d.length;i++) {
	var  m = d[i].match(/([0-9]+)-([0-9]+),([0-9]+)-([0-9]+)/);
	if(!m)  console.log("ERREUR ",d[i]);
	var x1 = m[1]*1;
	var y1 = m[2]*1;
	var x2 = m[3]*1;
	var y2 = m[4]*1;
	if((x1<=x2)&&(y1>=y2))
		n++;
	else if((x2<=x1)&&(y2>=y1))
		n++;

}

console.log(n);



var n = 0;

for(var i=0;i<d.length;i++) {
	var  m = d[i].match(/([0-9]+)-([0-9]+),([0-9]+)-([0-9]+)/);
	if(!m)  console.log("ERREUR ",d[i]);
	var x1 = m[1]*1;
	var y1 = m[2]*1;
	var x2 = m[3]*1;
	var y2 = m[4]*1;
	if((x2>=x1)&&(x2<=y1))
		n++;
	else if((y2>=x1)&&(y2<=y1))
		n++;
	else if((x1>=x2)&&(x1<=y2))
		n++;
	else if((y1>=x2)&&(y1<=y2))
		n++;
}

console.log(n);

