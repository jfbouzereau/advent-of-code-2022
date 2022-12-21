var fs = require("fs");

var d = fs.readFileSync("e13.txt","utf8").split("\n");


var packets = [];

for(var i=0;i<d.length;i+=3) {
	eval("var a = "+d[i]);
	packets.push(a);
	eval("var b = "+d[i+1]);
	packets.push(b);
}

packets.push([[2]]);
packets.push([[6]]);


packets.sort(compare);

//console.log(JSON.stringify(packets));

var ind1,ind2;

for(var i=0;i<packets.length;i++) {
	var p = packets[i];
	if(JSON.stringify(p)=="[[2]]") ind1 = i+1;
	if(JSON.stringify(p)=="[[6]]") ind2 = i+1;
}

console.log(ind1*ind2);

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

