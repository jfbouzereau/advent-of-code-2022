var fs = require("fs");

var d = fs.readFileSync("e6.txt","utf8");

for(var i=4-1;i<d.length;i++) {

	var word = d.substring(i-4+1,i+1);
	
	var dup = 0;
	for(var j=0;j<word.length-1;j++)
		for(var k=j+1;k<word.length;k++)
			if(word[j]==word[k])
				dup = 1;

	if(!dup) {
		console.log(i+1);   // numbered from 1 !!!
		break;
	}
}

for(var i=14-1;i<d.length;i++) {

	var word = d.substring(i-14+1,i+1);
	
	var dup = 0;
	for(var j=0;j<word.length-1;j++)
		for(var k=j+1;k<word.length;k++)
			if(word[j]==word[k])
				dup = 1;

	if(!dup) {
		console.log(i+1);   // numbered from 1 !!!
		break;
	}
}

