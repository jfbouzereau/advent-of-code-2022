var fs = require("fs");

var d = fs.readFileSync("e15.txt","utf8").split("\n").filter(x=>x);

var limit = 4000000;

var data = [];

for(var i=0;i<d.length;i++) {
	var m = d[i].match(/Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/);
	if(!m) console.log("ERREUR ",d[i]);
	var xsensor = 1*m[1];
	var ysensor = 1*m[2];
	var xbeacon = 1*m[3];
	var ybeacon = 1*m[4];
	data.push({xs:1*m[1],ys:1*m[2],xb:1*m[3],yb:1*m[4]});
}

console.log(data);

for(var y=0;y<=limit;y++) {
	
	var off = [];

	for(var i=0;i<data.length;i++) {
		e = data[i];
		var dist = Math.abs(e.xs-e.xb)+Math.abs(e.ys-e.yb);
		var dy = Math.abs(y-e.ys);
		if(dy>=dist) continue;
		var dx = dist-dy;
		var xmin = e.xs-dx;
		var xmax = e.xs+dx;
		off.push([xmin,xmax]);
	}

	for(var i=0;i<off.length;i++)	 {
		var oi = off[i]
		for(var j=0;j<off.length;j++) {
			var oj = off[j];
			if(oi[1]+2==oj[0]) {
				var z = oi[1]+1;
				for(var k=0;k<off.length;k++) {
					ok = off[k];
					if((z>=ok[0])&&(z<=ok[1])) {
						z = -1;
						break;
					}
				}
				if(z>0) console.log(y,z,4000000*z+y);
			}
		}
	}
}




