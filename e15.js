var fs = require("fs");

var d = fs.readFileSync("e15.txt","utf8").split("\n").filter(x=>x);

var target = 2000000

var map = {};

for(var i=0;i<d.length;i++) {
	var m = d[i].match(/Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/);
	if(!m) console.log("ERREUR ",d[i]);
	var xsensor = 1*m[1];
	var ysensor = 1*m[2];
	var xbeacon = 1*m[3];
	var ybeacon = 1*m[4];
	console.log(xsensor,ysensor,xbeacon,ybeacon);
	var dx = Math.abs(xsensor-xbeacon);
	var dy = Math.abs(ysensor-ybeacon);
//	console.log(d[i]);
//	console.log(xsensor,ysensor,xbeacon,ybeacon);
	var dd = dx+dy;
//	console.log("D = ",dx,dy,dd);
	var gy = Math.abs(target-ysensor);
	if(gy>=dd) continue;
	var ss =dd-gy;
//	console.log("CLEAR FROM ",xsensor-ss,xsensor+ss);
	for(var j=xsensor-ss;j<=xsensor+ss;j++)
		map[j] = 1;
}

// clear existing beacon
for(var i=0;i<d.length;i++) {
	var m = d[i].match(/Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/);
	var xbeacon = 1*m[3];
	var ybeacon = 1*m[4];
	if(ybeacon!=target) continue;
//	console.log("DELETE BEACON AT ",xbeacon)
	delete(map[xbeacon]);
}


var sum =0;
for(var key in map)
	sum++;

console.log(sum);
