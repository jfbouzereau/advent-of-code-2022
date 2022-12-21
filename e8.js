var fs = require("fs");

var d = fs.readFileSync("e8.txt","utf8").split("\n").filter(x=>x);

var nl = d.length;
var nc = d[0].length;

var ok = [];

for(var il=0;il<nl;il++) {

	var max = -1;
	for(var ic=0;ic<nc;ic++) {
		if(d[il][ic]>max) {		
			if(ok.indexOf(il+"-"+ic)<0)
				ok.push(il+"-"+ic);
			max = d[il][ic];
		}
	}

	var max = -1;
	for(var c=nc-1;ic>=0;ic--) {
		if(d[il][ic]>max) {		
			if(ok.indexOf(il+"-"+ic)<0)
				ok.push(il+"-"+ic);
			max = d[il][ic];
		}
	}
}


for(var ic=0;ic<nc;ic++) {

	var max = -1;
	for(var il=0;il<nl;il++) {
		if(d[il][ic]>max) {
			if(ok.indexOf(il+"-"+ic)<0)
				ok.push(il+"-"+ic);
			max = d[il][ic];
		}
	}

	var max = -1;
	for(var il=nl-1;il>=0;il--) {
		if(d[il][ic]>max) {
			if(ok.indexOf(il+"-"+ic)<0)
				ok.push(il+"-"+ic);
			max = d[il][ic];
		}
	}
}

console.log(ok.length);


var max = 0;

for(var il=0;il<nl;il++) {
	for(var ic=0;ic<nc;ic++) {
		var view = getview(il,ic);
		if(view>max)
			max = view;
	}
}

console.log(max);

function getview(il,ic) {

	var aa=0,bb=0,cc=0,dd=0;

	for(var jl=il-1;jl>=0;jl--) {
		aa++;
		if(d[jl][ic]>=d[il][ic]) break;
		}

	for(var jl=il+1;jl<nl;jl++)  {
		bb++;
		if(d[jl][ic]>=d[il][ic]) break;
		}

	for(var jc=ic-1;jc>=0;jc--) {
		cc++;
		if(d[il][jc]>=d[il][ic]) break;
		}

	for(var jc=ic+1;jc<nc;jc++) {
		dd++;
		if(d[il][jc]>=d[il][ic]) break;
		}

	return aa*bb*cc*dd;
			
}

