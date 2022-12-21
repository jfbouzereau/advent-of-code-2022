var fs = require("fs");

var d = fs.readFileSync("e18.txt","utf8").split("\n").filter(x=>x);

var cubes = []

for(var i=0;i<d.length;i++) {
	cubes.push(d[i].split(",").map(x=>parseInt(x)));
}

//console.log(cubes);

var m = {};

for(var i=0;i<cubes.length;i++) {
	var c = cubes[i];
	var key = c[0]+","+c[1]+","+c[2];
	m[key] = 1;
}

var xmin  = 99999999;
var ymin  = 99999999;
var zmin  = 99999999;
var xmax = -99999999;
var ymax = -99999999;
var zmax = -99999999;

for(var i=0;i<cubes.length;i++) {
	var c = cubes[i];
	if(c[0]<xmin) xmin = c[0];
	if(c[0]>xmax) xmax = c[0];
	if(c[1]<ymin) ymin = c[1];
	if(c[1]>ymax) ymax = c[1];
	if(c[2]<zmin) zmin = c[2];	
	if(c[2]>zmax) zmax = c[2];
}

//console.log(xmin,xmax,ymin,ymax,zmin,zmax);

xmin--;
xmax++;
ymin--;
ymax++;
zmin--;
zmax++;

var surface = 0;

run(xmin,ymin,zmin);

console.log(surface);

function run(x,y,z) {

	if(x<xmin) return;
	if(x>xmax) return;
	if(y<ymin) return;
	if(y>ymax) return;
	if(z<zmin) return;
	if(z>zmax) return;	

	var key = x+","+y+","+z;

	// already visited
	if(m[key]==2) return;

	// if reaching the droplet
	if(m[key] == 1) {
	//	console.log(key);
		surface++;
		return;
	}


	m[key] = 2;
	run(x-1,y,z);
	run(x+1,y,z);
	run(x,y-1,z);
	run(x,y+1,z);
	run(x,y,z-1);
	run(x,y,z+1);

}

