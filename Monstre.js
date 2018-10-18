var PVM = 70
var EM = 7
var FM = 5

function hasard(Min,Max) { 
    return (Math.floor((Max-Min)*Math.random())+Min); 
} 

function nomMonstre(){
	var lesMonstres = ["Slime", "Gobelin","Squelette","Armure_Maudite","Hogobelin","Ogre","Troll","Lamia","Succube","Lord","Dalek","Sith","Joker","Thanos","Magicarpe","Bowser","Bowsette","Sauron","Rick","Gozilla","King_Kong"];
	return lesMonstres[hasard(0,21)];
}
console.log(nomMonstre());

function boutton(){
	var monstre = nomMonstre();
	console.log(nomMonstre());
	document.getElementById("enemie").innerHTML = monstre + " est arriver ";
	document.getElementById("enemie2").innerHTML = monstre+ " a " + PVM + " Point de vie";
	document.getElementById("enemie3").innerHTML = monstre + " a " + EM + " d endurence";
	document.getElementById("enemie4").innerHTML = monstre + " a " + FM + " de Force";
	monstreUp()
}
function monstreUp(){
	FM = FM + 1
	EM = EM + 1
	PVM = EM * 10

}
