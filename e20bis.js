var fs =require("fs");

var d = fs.readFileSync("e20.txt","utf8").split("\n").
	filter(x=>x).
	map(x=>parseInt(x));

//console.log(d);

for(var i=0;i<d.length;i++)
	d[i] = (d[i]*811589153)+","+i;

var c = d.slice();

var k1,k2,temp;

for(var times=0;times<10;times++) {

	console.log("TIMES ",times);

for(var i=0;i<d.length;i++) {
	var tag = d[i];
	var n = tag.split(",")[0]*1;
	if(n==0) continue;
	if(n>0) {
		n = n % (c.length-1);
		k1 = c.indexOf(tag);
		for(var k=0;k<n;k++) {
			if(k1==c.length-1)  {
				c.unshift(c.pop(1));
				k1 = 0;
			}
			k2 = k1+1;
			temp = c[k1];
			c[k1] = c[k2];
			c[k2] = temp;
			k1 = k2;
		}
	}
	else {
		n = - ((-n) % (c.length-1)  );
		k1 = c.indexOf(tag);
		for(var k=0;k<-n;k++) {
			if(k1==0) {
				c.push(c.shift(1));
				k1 = c.length-1;
			}
			k2 = k1-1;
			temp = c[k1];
			c[k1] = c[k2];
			c[k2] = temp;
			k1 = k2;
		}
	}

//	console.log(c.join(" "));
}

}

var kz;
for(var i=0;i<c.length;i++)
	if(c[i].split(",")[0]=="0")	
		kz = i;

sum = 0;

sum += c[ (kz+1000)%c.length].split(",")[0]*1;
sum += c[ (kz+2000)%c.length].split(",")[0]*1;
sum += c[ (kz+3000)%c.length].split(",")[0]*1;

console.log(sum);
