var attMechant = 10;//a changer 
var nuit = true;
var timer;


++attMechant;

function timer(){
	
	if (nuit == true) {
		setTimeout(timer, 45000);
		nuit = false;
		
		clearTimeout(timer);
		document.getElementById("etat").innerHTML ="<br>"+ "il fait jour";
		
		--attMechant;
		console.log(attMechant);
	}
	else {
		setTimeout(timer, 45000);
		nuit = true;
		
		clearTimeout(timer);
		document.getElementById("etat").innerHTML ="<br>"+ "il fait nuit";
		++attMechant;
		console.log(attMechant);
		
	}
}

var time;
var day = true;

function timer(){
	var time = setInterval(function(){
		day = !day;
	},45000)
}

