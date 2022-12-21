var fs = require("fs");

var d = fs.readFileSync("e19bis.txt","utf8").
	replace(/[\n:.]/g," ").
	split(" ").
	filter(x=>x);


var max = 0;

var ib = -1;
var bb = [];

for(var i=0;i<d.length;i+=32) {
	var b = {
			ro:{o:parseInt(d[i+6])},	
			rc:{o:parseInt(d[i+12])},
			rb:{o:parseInt(d[i+18]),c:parseInt(d[i+21])},
			rg:{o:parseInt(d[i+27]),b:parseInt(d[i+30])},
			nro:0,
			nrc:0,
			nrb:0,
			nrg:0,
			no:0,
			nc:0,
			nb:0,
			ng:0
		}
	bb.push(b);
}



for(var i=0;i<bb.length;i++)  {
	console.log("B=",i);
	sub(bb[i],0,1,0,0,0,0,0,0,0);
}


function sub(b,minute,nro,nrc,nrb,nrg,no,nc,nb,ng) {

	//console.log("  SUB ",minute);
	if(minute>24) {
		if(ng>max) {
			console.log("     NG = "+ng);
			max = ng;
		}
		return ;
	}

	no += nro;
	nc += nrc;
	nb += nrb;
	ng += nrg;

//	console.log("   SUB ",no,nc,nb,ng);

	if(no>=b.ro.o) {
		no -= b.ro.o;
		nro++;
		sub(b,minute+1,nro,nrc,nrb,nrg,no,nc,nb,ng);	
		nro--;
		no += b.ro.o;
	}	

	if(no>=b.rc.o) {		
		no -= b.rc.o;
		nrc++;	
		sub(b,minute+1,nro,nrc,nrb,nrg,no,nc,nb,ng);		
		nrc--;		
		no += b.rc.o;
	}
	
	if((no>=b.rb.o)&&(nc>=b.rb.c)) {
		no -= b.rb.o;
		nc -= b.rb.c;
		nrb++;
		sub(b,minute+1,nro,nrc,nrb,nrg,no,nc,nb,ng);		
		nrb--;
		nc += b.rb.c;
		no += b.rb.o;	
	}

	if((no>=b.rg.o)&&(nb>=b.rg.b)) {
		no -= b.rg.o;		
		nb -= b.rg.b;
		nrg++;
		sub(b,minute+1,nro,nrc,nrb,nrg,no,nc,nb,ng);		
		nrg--;
		nb += b.rg.b;
		no += b.rg.o;		
	}

	sub(b,minute+1,nro,nrc,nrb,nrg,no,nc,nb,ng);		
}

