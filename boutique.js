var inventaire = {
	potionForce  : 0,
	potionAgi : 0,
	potionEndu : 0,
	potionSoinMineur : 1,
	potionSoinMajeur : 0,
	gold : 10
} ;

const randomPot = 10;

function enterShop()
{
	var string = "<br>";
	var argList = ["heal","endu","force","agi"];
	var itemList = ["Potion de soin","Potion d'endurance","Potion de force","Potion d'agilité"];
	for(var i = 0; i < itemList.length; i++){
		//string += "<button onclick='buyItem(" + argList[i] + )>" + itemList[i] +"</button>";
		string += "<button onclick='buyItem(\"" + argList[i] + "\")'>" + itemList[i] + "</button>";
	}
	document.getElementById("shop").innerHTML = string;
}

function buyItem(item)
{
	var string;
	if(item == "heal" && inventaire.gold >= 5){
		inventaire.gold -= 5;
		string = "<br>Vous avez acheté une potion de vie et dépensé 5 pièces d'or ";
	} else if (item == "endu" && inventaire.gold >= 2){
		inventaire.gold -= 2		
		string = "<br>Vous avez acheté une potion d'endurance et dépensé 2 pièces d'or ";

	} else if (item == "force" && inventaire.gold >= 2){
		inventaire.gold -= 2;		
		string = "<br>Vous avez acheté une potion de force et dépensé 2 pièces d'or ";

	} else if(item == "agi" && inventaire.gold >= 2){
		inventaire.gold -= 2;
		string = "<br>Vous avez acheté une potion de agilité et dépensé 2 pièces d'or ";
	} else{
		string = "<br>Désolé, vous n'avez pas assez de pièces d'or";
	}
	string += "<br> il vous reste " + inventaire.gold + " pièces d'or.";
	document.getElementById("resultShop").innerHTML = string;
}