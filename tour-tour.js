const aventure = document.getElementById("launch");
const taperButton = document.getElementById("taper");
const shopButton = document.getElementById("shopButton");
//const inventaireButton = document.getElementById("inventaireButton");
const forcePot = document.getElementById("forcePot");
const agiPot = document.getElementById("agiPot");
const enduPot = document.getElementById("enduPot");
const healPotMax = document.getElementById("soinPoMax");
const healPotMin = document.getElementById("soinPoMin");

const dayTime = document.getElementById("dayTime");
const mainAffiche = document.getElementById("mainAffiche");
const shop = document.getElementById("shop");	
const scoreAffiche = document.getElementById("score");

var monPerso = {
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
var score = [[],[]]
var listeMonstre = ["Slime", "Gobelin","Squelette","Armure_Maudite","Hogobelin","Ogre","Troll","Lamia","Succube","Lord","Dalek","Sith","Joker","Thanos","Magicarpe","Bowser","Bowsette","Sauron","Rick","Gozilla","King_Kong","Ganon"];
var monsterLvl = 0;
var pseudo;
const randomPot = 10;
var day = true;
var time;

function timer(){
	time = setInterval(function(){
		day = !day;
		dayTime.innerHTML = (day?"Il fait jour, les monstres se calment un peu de nouveau":"Il fait nuit, les monstres sont plus puissants !");
		if(day)
			monMonstre.force -=1;
		else
			monMonstre.force +=1;

	},45000)
}

function start(){
	do{
		pseudo = prompt("Veuillez entrer votre Pseudo : ");
	}while(pseudo == "" || pseudo == undefined);
	if(time === undefined){
		timer();
		dayTime.innerHTML = "Il fait jour";
	}else{
		clearInterval(time);
		timer();
	}
	inventaire.potionForce = 0;
	inventaire.potionAgi = 0;
	inventaire.potionEndu = 0;
	inventaire.potionSoinMineur = 0;
	inventaire.potionSoinMajeur = 0;
	inventaire.gold = 0;
	monPerso.force = 10;
	monPerso.agilite = 10;
	monPerso.endurance = 100;
	monPerso.vie = 100;
	monsterLvl = 0;
	aventure.disabled = false;
	taperButton.disabled = true;
	shopButton.disabled = true;
	forcePot.disabled = true;
	agiPot.disabled = true;
	enduPot.disabled = true;
	healPotMax.disabled = true;
	healPotMin.disabled = true;

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
	mainAffiche.innerHTML = string;
}

function persoMort(){
   	mainAffiche.innerHTML = "You Died";
	taperButton.disabled = true;
	score[0].push(pseudo);
	score[1].push(monsterLvl);
	alert("Tu as perdu !");
	tri();
	start();
}

function monstreMort(){
	inventaire.gold += 3;
    if(hasard(1,100)<= randomPot){
    	inventaire.potionSoinMineur++;
    	mainAffiche.innerHTML="<br>tu as gagner une potion de soin mineure !";
    }
    mainAffiche.innerHTML +="<br>tu as " + inventaire.gold + " gold et " + inventaire.potionSoinMineur + " potions de soin mineur";
    taperButton.disabled = true;
    shopButton.disabled = false;
}

function soinPoMin(){
	if (monPerso.vie < monPerso.endurance && inventaire.potionSoinMineur >= 1){
		monPerso.vie = monPerso.vie + 10;
		if(monPerso.vie > monPerso.endurance){
			monPerso.vie = monPerso.endurance;
		}
		inventaire.potionSoinMineur--;
		mainAffiche.innerHTML = "<br> tu te soignes, tu as " + monPerso.vie + "hp";
		if (monPerso.vie > monPerso.endurance){
			monPerso.vie == monPerso.endurance;

		}
	}
	else if (monPerso.vie == monPerso.endurance){
		alert ("Vous avez toutes votre vie");
	}else if(inventaire.potionSoinMineur == 0 ){
	 	mainAffiche.innerHTML = "<br>Tu n'as plus de petites potion";
	
	}
	else {
		alert ("wtf???");
	}

}

function enterShop()
{
	var string = "<br>";
	var argList = ["heal","endu","force","agi","no"];
	string += "tes caracteristiques : <br>" + "<br>Ta force : " + monPerso.force + "<br>Ton endurance : "+monPerso.endurance + "<br> Ton agilite : "+ monPerso.agilite + "<br> Ta vie : " +monPerso.vie + "<br>" ;
	var itemList = ["Potion de soin","Potion d'endurance","Potion de force","Potion d'agilité","Aller à l'inventaire"];
	for(var i = 0; i < itemList.length; i++){
		string += "<button onclick='buyItem(\"" + argList[i] + "\")'>" + itemList[i] + "</button>";
	}
	shop.innerHTML = string;
	shopButton.disabled = true;
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
		mainAffiche.innerHTML = "";	
		document.getElementById("shopButton").disabled = true;
		clear = true;
		getinventaire();					
	} else{
		string = "<br>Désolé, vous n'avez pas assez de pièces d'or";
	}
	if(!clear){
		string += "<br> il vous reste " + inventaire.gold + " pièces d'or.";
		mainAffiche.innerHTML = string;
	}
}

function getinventaire(){
	shop.innerHTML = "";		
	lance.disabled = false;
	forcePot.disabled = false;
	agiPot.disabled = false;
	enduPot.disabled = false;
	healPotMax.disabled = false;
	healPotMin.disabled = false;
	//inventaireButton.disabled = true;
}

function hasard(Min,Max) { 
    return (Math.floor((Max-Min)*Math.random())+Min); 
} 

function genMonster(){
	monMonstre.nom = listeMonstre[hasard(0,22)];
	monMonstre.force = 5 + monsterLvl;
	monMonstre.endurance = 7 + monsterLvl;
	monMonstre.vie = 7 + monsterLvl;
	monsterLvl++;
	mainAffiche.innerHTML = "Un " + monMonstre.nom + "  sauvage apparait ";
	mainAffiche.innerHTML += "<br>" +monMonstre.nom+ " a " + monMonstre.vie + " Point de vie";
	mainAffiche.innerHTML += "<br>" + monMonstre.nom + " a " + monMonstre.endurance + " d endurence";
	mainAffiche.innerHTML += "<br>" + monMonstre.nom + " a " + monMonstre.force + " de Force";	
	taperButton.disabled = false;
	lance.disabled = true;
	forcePot.disabled = true;
	agiPot.disabled = true;
	enduPot.disabled = true;
	healPotMax.disabled = true;
}
		
function forcePo(){
    if(inventaire.potionForce >=1){
        monPerso.force++;
        inventaire.potionForce--;
        mainAffiche.innerHTML = "<br>tu te renforces, tu fais donc  " + monPerso.force + "de degat";
    } else{
    	mainAffiche.innerHTML = "<br>Vous ne possedez pas de potion de force";
    }
}

function agiPo(){	
    if(inventaire.potionAgi >=1){
        monPerso.agilite++;
        inventaire.potionAgi--;
        mainAffiche.innerHTML = "<br> tu renforces ton agilite , tu as donc une agilite de  " + monPerso.agilite ;
    } else{
    	mainAffiche.innerHTML = "<br>Vous ne possedez pas de potion d'agilité";
    }
        
}

function enduPo(){
    if(inventaire.potionEndu >=1){
        monPerso.endurance++;
        inventaire.potionEndu--;
        mainAffiche.innerHTML = "<br> tu renforces ton endurance, tu as donc  " + monPerso.endurance + "d'endurance";
    } else{
    	mainAffiche.innerHTML = "<br>Vous ne possedez pas de potion d'endurance";
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
			mainAffiche.innerHTML = "<br>Tu utilise une grande potion de soin, tu as désormais " + monPerso.vie + " pv !";
		}else{
			mainAffiche.innerHTML = "<br>Tu as déjà toute ta vie !";
		}
	} else{
		mainAffiche.innerHTML = "<br>Tu n'as plus de grande potion de vie";
	}
}



function tri()
{
	var tri;
	var bufferScore;
	var bufferPseudo;
	do{
		tri = true;
		for(var i = 0; i < (score[1].length); i++){
			if(score[1][i] < score[1][i+1]){
				bufferScore = score[1][i];
				bufferPseudo = score[0][i];
				score[1][i] = score[1][i+1];
				score[0][i] = score[0][i+1];
				score[1][i+1] = bufferScore;
				score[0][i+1] = bufferPseudo;
				tri = false;
			}
		}
	}while(!tri);
}

function afficheHighScore()
{
	var string = "<table>";
	string += "<tr><th>Pseudo</th><th>Score</th></tr>";
	for(var i = 0; i < score[0].length;i++){
		string += "<tr><td>" + score[0][i] + "</td><td>" + score[1][i] + "</td></tr>";
	}
	string += "</table>";
	scoreAffiche.innerHTML = string;
}