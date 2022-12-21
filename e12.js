var fs = require("fs");


var d = fs.readFileSync("e12.txt","utf8").split("\n").filter(x=>x);

var nrow = d.length;
var ncol = d[0].length;

var dist = [];
var prev = [];
var queue = [];
for(var i=0;i<nrow;i++) {
	dist[i] = [];
	prev[i] = [];
	queue[i] = [];
	for(var j=0;j<ncol;j++) {
		dist[i][j] = nrow*ncol+1;
		prev[i][j] = null;
		queue[i][j] = 1;
	}
}

// init source
for(var i=0;i<nrow;i++) {
	for(var j=0;j<ncol;j++) {
		if(d[i][j] == "S") {
			dist[i][j] = 0;
		}
	}
}

while(1) {

	// look for best element in queue
	var min = nrow*ncol+1;
	var row = -1;
	var col = -1;
	for(var i=0;i<nrow;i++) {
		for(var j=0;j<ncol;j++) {
			if(queue[i][j]==0) continue;
			if(dist[i][j]<min) {
				min = dist[i][j];
				row = i;
				col = j;
			}
		}
	}
	if(row<0) break;

	//console.log("BEST",row,col);
	queue[row][col] = 0;

	var val = A(d[row][col]);
	check(row-1,col,val,dist[row][col]+1);
	check(row+1,col,val,dist[row][col]+1);
	check(row,col-1,val,dist[row][col]+1);
	check(row,col+1,val,dist[row][col]+1);
}


// find dest
for(var i=0;i<nrow;i++) {
	for(var j=0;j<ncol;j++) {
		if(d[i][j]=="E") {
			row = i;
			col = j;
			break;
		}
	}
}

// build path
var path = [];
while(1) {
	path.push([row,col]);
	if(!prev[row][col]) break;
	[row,col] = prev[row][col]	
}

var s = "";
for(var i=0;i<path.length;i++)
	s += " "+path[i];
console.log(s);
console.log(path.length);

function check(r,c,v,dd) {
	if(r<0) return;
	if(r>=nrow) return;
	if(c<0) return;
	if(c>=ncol) return;
	if(queue[r][c]==0) return;
	if(A(d[r][c])>v+1) return;
	if(dd<dist[r][c]) {
		dist[r][c] = dd;
		prev[r][c] = [row,col];
	}	
}

function A(x) {
	if(x=="S") return 0;
	if(x=="E") return 25;
	return "abcdefghijklmnopqrstuvwxyz".indexOf(x);
}

