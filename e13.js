var fs = require("fs");

var d = fs.readFileSync("e13.txt","utf8").split("\n");

var sum = 0;
var index = 0;

for(var i=0;i<d.length;i+=3) {
	index++;
	eval("var a = "+d[i]);
	eval("var b = "+d[i+1]);
	//console.log(JSON.stringify(a));
	//console.log(JSON.stringify(b));
	var rep = compare(a,b);	
	if(rep<0) sum += index;
}

console.log(sum);

function compare(a,b) {

	var pos = -1;

	while(1) {

		pos++;

		var aa = a[pos];
		var bb = b[pos];

//		console.log(" aa ",aa);
//		console.log(" bb ",bb);		

		if((aa==undefined)&&(bb==undefined)) return 0;
		if(aa==undefined) return -1;
		if(bb==undefined) return 1;

		if((typeof aa == "number")&&(typeof bb == "number")) {
			if(aa<bb) return -1;
			if(aa>bb) return 1;
		}

		if((typeof aa == "number")&&(typeof bb == "object")) {
			var r = compare([aa],b[pos]);
			if(r!=0) return r;
		}
	
		if((typeof aa == "object")&&(typeof bb == "number")) {
			var r = compare(a[pos],[bb]);
			if(r!=0) return r;
		}

		if((typeof aa == "object")&&(typeof bb == "object")) {
			var r = compare(aa,bb);
			if(r!=0) return r;
		}

	}
}

