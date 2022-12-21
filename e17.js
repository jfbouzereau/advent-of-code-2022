var fs = require("fs");

var d = fs.readFileSync("e17bis.txt","utf8").split("\n").filter(x=>x);
var gas = d[0];

var T = [];
T[0] = ['####'];
T[1] = ['.#.','###','.#.'];
T[2] = ['..#','..#','###'];
T[3] = ['#','#','#','#'];
T[4] = ['##','##'];

var cave = [];
var height = 0;
var ktile = -1;
var tile;
var tw,th;
var tx,ty;
var kgas = -1;

for(var i=0;i<2022;i++) {

	ktile = (ktile+1)%T.length;
	tile = T[ktile];
	tw = tile[0].length;
	th = tile.length;
	tx = 2;
	ty = height+4+th;


	while(1) {

		// fall
		ty--;
		if(th<=height) break;

		kgas = (kgas+1)%gas.length;
		if(gas[kgas]=="<") {
			if(tx>0) tx--;
		}
		else if(gas[kgas]==">") {
			if(tx+tw<7) tx++;
		}
		else 
			console.log("ERREUR ",gas[kgas]);			
		
	}	

		
}





