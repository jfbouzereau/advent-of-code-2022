var fs = require("fs");

var d = fs.readFileSync("e7.txt","utf8").split("\n").filter(x=>x);

var dir = {name:"/",parent:null,children:[],size:0};
var home = dir;

for(var i=0;i<d.length;i++) {
	var line = d[i];
//	console.log(line);
	if(line[0]!="$") {
		var words = line.split(" ");
		if(words[0]=="dir") {
			dir.children.push({name:words[1],parent:dir,children:[],size:0});
		}
		else {	
			dir.size += words[0]*1;
		}
	} 
	else {
		var words = line.split(" ");
		if(words[1]=="cd") {
			if(words[2]=="..") {
				dir = dir.parent;
			}
			else if(words[2]=="/") {
				dir = home;
			}
			else {
				var newdir = null;
				for(var j=0;j<dir.children.length;j++) 
					if(dir.children[j].name==words[2]) {
						newdir = dir.children[j];
					}
				if(!newdir) { console.log("ERREUR ",line) }
				dir = newdir;
			}
		}
		else if(words[1]!="ls") {
			console.log("ERREUR ",line);
		}
	}
}



run1(home);

var sum = 0;
run2(home);
console.log(sum);

console.log("USED ",home.size);
var free = 70000000-home.size;
console.log("FREE ",free);
var need = 30000000-free;
console.log("NEED ",need);

var target = home;
run3(home);
console.log(target.size);

function run1(dir) {

	var p = dir.parent;
	while(p) {
		p.size += dir.size;
		p = p.parent;
	}

	for(var i=0;i<dir.children.length;i++)
		run1(dir.children[i]);
}

function run2(dir) {
	if(dir.size<100000)
		sum += dir.size;

	for(var i=0;i<dir.children.length;i++)
			run2(dir.children[i]);
}

function run3(dir) {

	if(dir.size>need)
		if(dir.size<target.size)
			target = dir;

	for(var i=0;i<dir.children.length;i++)
		run3(dir.children[i]);
}

