class monstre {
	constructor() {
		this.nom = listeMonstre[hasard(1,22)];
		this.force = 5 + monsterLvl;
		this.endurance = 7 + monsterLvl;
		this.pv = this.endurance;
	}
}

var listeMonstre = ["Slime", "Gobelin","Squelette","Armure_Maudite","Hogobelin","Ogre","Troll","Lamia","Succube","Lord","Dalek","Sith","Joker","Thanos","Magicarpe","Bowser","Bowsette","Sauron","Rick","Gozilla","King_Kong","Ganon"];

var monsterLvl = 0;

function hasard(Min,Max) { 
    return (Math.floor((Max-Min)*Math.random())+Min); 
} 

function boutton(){
	var monster = new monstre;
	monsterLvl++;
	document.getElementById("ennemi").innerHTML = "Un " + monster.nom + "  sauvage apparait ";
	document.getElementById("ennemi").innerHTML += "<br>" +monster.nom+ " a " + monster.pv + " Point de vie";
	document.getElementById("ennemi").innerHTML += "<br>" + monster.nom + " a " + monster.endurance + " d endurence";
	document.getElementById("ennemi").innerHTML += "<br>" + monster.nom + " a " + monster.force + " de Force";
}