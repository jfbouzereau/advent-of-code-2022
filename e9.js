var fs = require("fs");

var d = fs.readFileSync("e9.txt","utf8").split("\n").filter(x=>x);

var visited = [];

// head
var hx = 0;
var hy = 0;

// tail
var tx = 0
var ty = 0;

for(var i=0;i<d.length;i++) {
	//console.log(d[i]," ",hx,hy,tx,ty);
	var words = d[i].split(" ");
	var dir = words[0];
	var count = 1*words[1];
	switch(dir) {
		case "R":	
			move(1,0,count);
			break;
		case "L":	
			move(-1,0,count);
			break;
		case "U":
			move(0,1,count);
			break;
		case "D":
			move(0,-1,count);
			break;
		default:
			console.log("ERREUR ",d[i]);
	}
}

console.log(visited.length);

function move(dx,dy,count) {
	for(var i=0;i<count;i++) {
		hx += dx;
		hy += dy;
		if(hy==ty) {
			// vertical alignment
			if(hx==tx+2)
				tx++;
			else if(hx==tx-2)
				tx--;
		}
		else if(hx==tx) {
			// horizontal alignment
			if(hy==ty+2)
				ty++;
			else if(hy==ty-2)
				ty--;
		}
		else if((Math.abs(hx-tx)==2)&&(Math.abs(hy-ty)==1)) {
			ty = hy;
			tx = tx + (hx-tx)/2;
		}
		else if((Math.abs(hx-tx)==1)&&(Math.abs(hy-ty)==2)) {
			tx = hx;
			ty = ty + (hy-ty)/2;
		}
		else {
			//console.log("IGNORED ",hx,hy,tx,ty);
		}

		//console.log("  ",hx,hy,tx,ty,"    ",hx-tx,hy-ty);
		var pos = tx+","+ty;
		if(visited.indexOf(pos)<0)
			visited.push(pos);
	}
}


