var fs = require("fs");

var d = fs.readFileSync("e9.txt","utf8").split("\n").filter(x=>x);

var visited = ["0,0"];

var rope = [];
for(var i=0;i<10;i++)
	rope[i] = {x:0,y:0};

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

	var hx,hy,tx,ty;

	for(var i=0;i<count;i++) {

		rope[0].x += dx;
		rope[0].y += dy;
	
	for(var k=0;k<9;k++) {


		hx = rope[k].x;	
		hy = rope[k].y;
		tx = rope[k+1].x;
		ty = rope[k+1].y;
		
		if(hy==ty) {
			if(Math.abs(hx-tx)>2) { console.log("ERROR ",hx,hy,tx,ty); process.exit(1) }
			// vertical alignment
			if(hx==tx+2)
				tx++;
			else if(hx==tx-2)
				tx--;
		}
		else if(hx==tx) {
			if(Math.abs(hy-ty)>2) { console.log("ERROR ",hx,hy,tx,ty); process.exit(1) }
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
		else if((Math.abs(hx-tx)==2)&&(Math.abs(hy-ty)==2)) {
			tx = tx + (hx-tx)/2;
			ty = ty + (hy-ty)/2;
		}
		else if((Math.abs(hx-tx)==1)&&(Math.abs(hy-ty)==1)) {
			// ok
			}
		else {
			console.log("ERROR ",hx,hy,tx,ty);
			process.exit(1)
		}

		rope[k+1] = {x:tx,y:ty};

	}

		
	var pos = rope[9].x+","+rope[9].y;
	if(visited.indexOf(pos)<0)
		visited.push(pos);
	}


}


