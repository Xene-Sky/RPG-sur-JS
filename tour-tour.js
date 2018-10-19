var monPerso = {
	nom : "",
	force : 10,
	agilite : 10,
	endurance : 100,
	vie : 100
} ;
var monMonstre = {
	nom : "",
	force : 5,
	endurance : 7,
	vie : 7
} ;
var inventaire = {
	potionForce  : 0,
	potionAgi : 0,
	potionEndu : 0,
	potionSoinMineur : 1,
	potionSoinMajeur : 0,
	gold : 0
} ;

var listeMonstre = ["Slime", "Gobelin","Squelette","Armure_Maudite","Hogobelin","Ogre","Troll","Lamia","Succube","Lord","Dalek","Sith","Joker","Thanos","Magicarpe","Bowser","Bowsette","Sauron","Rick","Gozilla","King_Kong","Ganon"];
var monsterLvl = 0;
var pseudo;
const randomPot = 10;
var time;
var day = true;

function timer(){
	console.log("Timer lancer, il fait jour ?" + day);
	setInterval(function(){
		day = !day;
		document.getElementById("dayTime").innerHTML = (day?"Il fait jour, les monstres se calment un peu de nouveau":"Il fait nuit, les monstres sont plus puissants !");
		if(day)
			monMonstre.force -=1;
		else
			monMonstre.force +=1;

	},4500)
}

function start(){
	do{
		pseudo = prompt("Veuillez entrer votre Pseudo : ");
	}while(pseudo == "" || pseudo == undefined);
	timer();
}

function taper(){
	var string = "";
	if(hasard(0,100) <= monPerso.agilite){
		string += "vous avez l'initiative ! vous infligez " + monPerso.force + " de dégats !";
		monMonstre.vie -= monPerso.force;
		if(monMonstre.vie <= 0){
			string += "<br>Vous avez tuer le monstre !";
			monstreMort();
		} else{
			monPerso.vie -= monMonstre.force;
			string += "<br>Le monstre riposte ! Il inflige " + monMonstre.force + " points de dégats !";
			if(monPerso.vie <= 0){
				persoMort();
			}
		}
	} else{
		monPerso.vie -= monMonstre.force;
		string += "<br>Le monstre a l'initiative ! Il inflige " + monMonstre.force + " points de dégats !";
		if(monPerso.vie <= 0){
			persoMort();
		} else{
			monMonstre.vie -= monPerso.force;
			string += "<br>Vous ripostez et vous infligez " + monPerso.force + " points de dégats !";
			if(monMonstre.vie <= 0){
				string += "<br>Vous avez tuer le monstre !";	
				monstreMort();
			}
		}
	}
	string += "<br>Vie Joueur => " + monPerso.vie;
	string += "<br> Vie Monstre =>" + monMonstre.vie;
	document.getElementById("combat").innerHTML = string;
}

function persoMort(){
    document.getElementById("resultCombat").innerHTML = "You Died";
	document.getElementById("taper2").disabled = true;
}

function monstreMort(){
	console.log("Le monstre est mort");		
	inventaire.gold += 3;
    if(hasard(1,100)<= randomPot){
    	inventaire.potionSoinMineur++;
    	document.getElementById("resultCombat").innerHTML="<br>tu as gagner une potion de soin mineure !";
    }
    document.getElementById("resultCombat").innerHTML +="<br>tu as " + inventaire.gold + " gold et " + inventaire.potionSoinMineur + " potions de soin mineur";
    document.getElementById("taper").disabled = true;
    document.getElementById("heal").disabled = true;
    document.getElementById("shopButton").disabled = false;
}

function soinPoMin(){
	if (monPerso.vie < monPerso.endurance && inventaire.potionSoinMineur >= 1){
		monPerso.vie = monPerso.vie + 10;
		if(monPerso.vie > monPerso.endurance){
			monPerso.vie = monPerso.endurance;
		}
		inventaire.potionSoinMineur--;
		document.getElementById("combat").innerHTML = "<br> tu te soignes, tu as " + monPerso.vie + "hp";
		if (monPerso.vie > monPerso.endurance){
			monPerso.vie == monPerso.endurance;

		}
	}
	else if (monPerso.vie == monPerso.endurance){
		alert ("Vous avez toutes votre vie");
	}else if(inventaire.potionSoinMineur == 0 ){
	 	document.getElementById("taper").innerHTML = "<br> tu n'as plus de potion";
	
	}
	else {
		alert ("wtf???");
	}

}

function enterShop()
{
	var string = "<br>";
	var argList = ["heal","endu","force","agi","no"];
	var itemList = ["Potion de soin","Potion d'endurance","Potion de force","Potion d'agilité","Aller à l'inventaire"];
	for(var i = 0; i < itemList.length; i++){
		string += "<button onclick='buyItem(\"" + argList[i] + "\")'>" + itemList[i] + "</button>";
	}
	document.getElementById("shop").innerHTML = string;
	document.getElementById("shopButton").disabled = true;
}

function buyItem(item)
{
	var string;
	var monster;
	var clear = false;
	if(item == "heal" && inventaire.gold >= 5){
		inventaire.gold -= 5;
		inventaire.potionSoinMajeur++;
		string = "<br>Vous avez acheté une potion de vie et dépensé 5 pièces d'or ";
	} else if (item == "endu" && inventaire.gold >= 2){
		inventaire.gold -= 2;
		inventaire.potionEndu++;
		string = "<br>Vous avez acheté une potion d'endurance et dépensé 2 pièces d'or ";

	} else if (item == "force" && inventaire.gold >= 2){
		inventaire.gold -= 2;
		inventaire.potionForce++;		
		string = "<br>Vous avez acheté une potion de force et dépensé 2 pièces d'or ";

	} else if(item == "agi" && inventaire.gold >= 2){
		inventaire.gold -= 2;
		inventaire.potionAgi++;
		string = "<br>Vous avez acheté une potion de agilité et dépensé 2 pièces d'or ";
	} else if(item == "no"){
		console.log(string);
		document.getElementById("combat").innerHTML = "";
		document.getElementById("resultCombat").innerHTML = "";
		document.getElementById("resultShop").innerHTML = "";	
		document.getElementById("shopButton").disabled = true;
		clear = true;
		getinventaire();					
	} else{
		string = "<br>Désolé, vous n'avez pas assez de pièces d'or";
	}
	if(!clear){
		string += "<br> il vous reste " + inventaire.gold + " pièces d'or.";
		document.getElementById("resultShop").innerHTML = string;
	}
}

function getinventaire(){
	document.getElementById("shop").innerHTML = "";
	document.getElementById("lance").disabled = false;
	document.getElementById("forcePot").disabled = false;
	document.getElementById("agiPot").disabled = false;
	document.getElementById("enduPot").disabled = false;
	document.getElementById("healPot").disabled = false;
	document.getElementById("inventaireButton").disabled = true;
}

function hasard(Min,Max) { 
    return (Math.floor((Max-Min)*Math.random())+Min); 
} 

function genMonster(){
	document.getElementById("inventaire").innerHTML = "";
	monMonstre.nom = listeMonstre[hasard(0,22)];
	monMonstre.force = 5 + monsterLvl;
	monMonstre.endurance = 7 + monsterLvl;
	monMonstre.vie = 7 + monsterLvl;
	console.log("monstre créer")
	monsterLvl++;
	document.getElementById("combat").innerHTML = "Un " + monMonstre.nom + "  sauvage apparait ";
	document.getElementById("combat").innerHTML += "<br>" +monMonstre.nom+ " a " + monMonstre.vie + " Point de vie";
	document.getElementById("combat").innerHTML += "<br>" + monMonstre.nom + " a " + monMonstre.endurance + " d endurence";
	document.getElementById("combat").innerHTML += "<br>" + monMonstre.nom + " a " + monMonstre.force + " de Force";
	document.getElementById("combat").innerHTML += "<button onclick='taper(" + monMonstre + ")>Affronter le monstre !</button>";	
	document.getElementById("taper").disabled = false;
	document.getElementById("heal").disabled = false;
	document.getElementById("lance").disabled = true;
	document.getElementById("forcePot").disabled = true;
	document.getElementById("agiPot").disabled = true;
	document.getElementById("enduPot").disabled = true;
	document.getElementById("healPot").disabled = true;
}
		
function forcePo(){
    if(inventaire.potionForce >=1){
        monPerso.force++;
        inventaire.potionForce--;
        document.getElementById("inventaire").innerHTML = "<br>tu te renforces, tu fais donc  " + monPerso.force + "de degat";
    } else{
    	document.getElementById("inventaire").innerHTML = "<br>Vous ne possedez pas de potion de force";
    }
}

function agiPo(){	
    if(inventaire.potionAgi >=1){
        monPerso.agilite++;
        inventaire.potionAgi--;
        document.getElementById("inventaire").innerHTML = "<br> tu renforces ton agilite , tu as donc une agilite de  " + monPerso.agilite ;
    } else{
    	document.getElementById("inventaire").innerHTML = "<br>Vous ne possedez pas de potion d'agilité";
    }
        
}

function enduPo(){
    if(inventaire.potionEndu >=1){
        monPerso.endurance++;
        inventaire.potionEndu--;
        document.getElementById("inventaire").innerHTML = "<br> tu renforces ton endurance, tu as donc  " + monPerso.endurance + "d'endurance";
    } else{
    	document.getElementById("inventaire").innerHTML = "<br>Vous ne possedez pas de potion d'endurance";
    }
}
function soinPoMax(){
	if(inventaire.potionSoinMajeur >= 1){
		if(monPerso.vie < monPerso.endurance){
			monPerso.vie += 20;
			if(monPerso.vie > monPerso.endurance){
				monPerso.vie = monPerso.endurance;
			}
			inventaire.potionSoinMajeur--;
			document.getElementById("inventaire").innerHTML = "<br>Tu utilise une grande potion de soin, tu as désormais " + monPerso.vie + " pv !";
		}else{
			document.getElementById("inventaire").innerHTML = "<br>Tu as déjà toute ta vie !";
		}
	} else{
		document.getElementById("inventaire").innerHTML = "<br>Tu n'as plus de grande potion de vie";
	}
}