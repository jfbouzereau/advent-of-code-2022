var fs = require("fs");

var d = fs.readFileSync("e18.txt","utf8").split("\n").filter(x=>x);

var cubes = []

for(var i=0;i<d.length;i++) {
	cubes.push(d[i].split(",").map(x=>parseInt(x)));
}

var surface = 0;

for(var i=0;i<cubes.length;i++) {
	var ci = cubes[i];
	var common = 0 ;
	for(var j=i+1;j<cubes.length;j++) {
		var cj = cubes[j];
		var dx = Math.abs(ci[0]-cj[0]);
		var dy = Math.abs(ci[1]-cj[1]);
		var dz = Math.abs(ci[2]-cj[2]);
		if(dx+dy+dz==1) common++;
	}
	surface += 6-2*common;
}


console.log(surface);


