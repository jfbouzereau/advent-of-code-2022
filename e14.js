var fs = require("fs");

var d = fs.readFileSync("e14.txt","utf8").split("\n").filter(x=>x);

var xmin = 99999999;
var xmax = -99999999;
var ymin = 99999999;
var ymax = -99999999;

var x,y,w;
var xlast,ylast;

for(var i=0;i<d.length;i++) {
	var words = d[i].split(" -> ");
	for(var j=0;j<words.length;j++) {
		w = words[j].split(",");
		x = 1*w[0];
		y = 1*w[1];
		if(x<xmin) xmin = x;
		if(x>xmax) xmax = x;
		if(y<ymin) ymin = y;
		if(y>ymax) ymax = y;
	}
}

console.log(xmin,xmax,ymin,ymax);

var ny = ymax+1;

var G = [];
for(var i=0;i<ny;i++) {
	G[i] = [];
}


for(var i=0;i<d.length;i++) {
	var words = d[i].split(" -> ");
	for(var j=0;j<words.length;j++) {
		w = words[j].split(",");
		x = 1*w[0];
		y = 1*w[1];
		if(j>0) fill(xlast,ylast,x,y);
		xlast = x;
		ylast = y;
	}
}


// try to pour sand
var count = 0;
var loop = true;
while(loop) {
	if(get(500,0)) break;
	x = 500;
	y = 0;
	while(1) {
		if(y>=ymax) { loop = false; break; }
		if(!get(x,y+1))
			y++;
		else if(!get(x-1,y+1))
			{ x--; y++; }	
		else if(!get(x+1,y+1))
			{ x++; y++; }
		else
			{ 
			//console.log("PUT INTO ",x,y);
			count++; set(x,y,2); break }	
	}
}

console.log("COUNT",count);


function fill(xa,ya,xb,yb) {
	if(xa==xb) {
		if(ya<=yb)
			for(var y=ya;y<=yb;y++)
				set(xa,y,1);
		else	
			for(var y=yb;y<=ya;y++)
				set(xa,y,1);
	}
	else if(ya==yb) {
		if(xa<=xb)
			for(var x=xa;x<=xb;x++)
				set(x,ya,1);
		else
			for(var x=xb;x<=xa;x++)
				set(x,ya,1);
	}
	else
		console.log("ERREUR");
}


function set(x,y,v) {
	G[y][x-xmin] = v;
}

function get(x,y) {	
	return G[y][x-xmin];
}

