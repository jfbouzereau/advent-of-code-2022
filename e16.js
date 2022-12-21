var fs = require('fs');

var d = fs.readFileSync("e16bis.txt","utf8").split("\n").filter(x=>x);

// Valve AA has flow rate=0; tunnels lea to valves DD, II, BB

var max = 0;

var valves = {};

for(var i=0;i<d.length;i++) {
	var m = d[i].match(/Valve (..) has flow rate=([0-9]+); tunnels? leads? to valves? (.*)/);
//	console.log(d[i]);
	var name = m[1];
	var flow = 1*m[2];
	var next = m[3].split(", ");
	valves[name] = {flow,next,open:false};
}

console.log(valves);

run("AA",1,0,0);

console.log("MAX ",max);

function run(name,minutes,flow,cumul) {

	console.log("MINUTE ",minutes,name,flow,cumul);
	cumul += flow;

	if(minutes>=30) {
		if(cumul>max) {
			max = cumul;
		}
		return;
	}

	var v = valves[name];
	if(!v.open) {
		v.open = true;
		run(name,minutes+1,flow,cumul);
		v.open = false;
		return;
	}

	flow += v.flow;
	
	// choose a valve to move to
	var next = valves[name].next;

	for(var i=0;i<next.length;i++) {

		run(next[i],minutes+1,flow,cumul);
		
	}

	flow -= v.flow;
}


