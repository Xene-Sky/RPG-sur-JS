var monPerso = {
	nom : "",
	force : 10,
	agilite : 10,
	endurance : 100,
	vieJoueur : 100
} ;

var vieMonstre = 50;
var degatJ = 10; 
var degatE = 5;
var inventaire = {
	potionForce  : 0,
	potionAgi : 0,
	potionEndu : 0,
	potionSoinMineur : 1,
	potionSoinMajeur : 0
} ;
//var vieJ1 = vieJoueur - degatE;


function taper(){
	

		if( monPerso.vieJoueur != 0 && monPerso.vieMonstre != 0  ){
			if(hasard(1,100) <= monPerso.agilite ){
			 monPerso.vieJoueur -= degatE;
			 vieMonstre -= monPerso.force;

			 document.getElementById("taper").innerHTML = "tu tapes en premier et tu enleves  " + monPerso.force + " pv" + "<br> et il t enleve" + degatE + "pv" ;
			 document.getElementById("taper").innerHTML +="<br>tu as " + monPerso.vieJoueur + "pv" + "<br>il a " + vieMonstre +"pv <br>" ;
			 if(vieMonstre == 0 ){
				document.getElementById("taper").innerHTML +="<br>le mechant est mort tu as gagne ";
				document.getElementById("rez").disabled = true;}
				else if(monPerso.vieJoueur == 0 ){
					document.getElementById("taper").innerHTML +="<br>You Are Dead";
				}
			}
			
			else if(hasard(1,100) >= monPerso.agilite ){
				monPerso.vieJoueur -= degatE;
				vieMonstre -= monPerso.force;
				 
				document.getElementById("taper").innerHTML = "le monstre tape en premier et t enleve  " + degatE + " pv   " + "<br>tu enleves  " + monPerso.force + " pv" ;
				document.getElementById("taper").innerHTML +="<br>il a " + vieMonstre +"pv" + "<br>tu as " + monPerso.vieJoueur + "pv <br>";
				if(vieMonstre == 0 ){
					document.getElementById("taper").innerHTML +="<br>le mechant est mort tu as gagne ";
					document.getElementById("rez").disabled = true;}
				else if(monPerso.vieJoueur == 0 ){
					document.getElementById("taper").innerHTML +="<br>You Are Dead";
				}

			} 
				
			

			
		}
}

function soinPoMin(){
	if (monPerso.vieJoueur <= monPerso.endurance && inventaire.potionSoinMineur >= 1){
		monPerso.vieJoueur = monPerso.vieJoueur + 10;
		inventaire.potionSoinMineur--;
		document.getElementById("taper").innerHTML = "<br> tu te soignes, tu as " + monPerso.vieJoueur + "hp";
		if (monPerso.vieJoueur > monPerso.endurance){
			monPerso.vieJoueur == monPerso.endurance;

		}
	}
	else if (monPerso.vieJoueur == monPerso.endurance){
		alert ("Vous avez toutes votre vie");
	}else if(inventaire.potionSoinMineur == 0 ){
	 	document.getElementById("taper").innerHTML = "<br> tu n'as plus de potion";
	
	}
	else {
		alert ("wtf???");
	}

}

function hasard(Min,Max) { 
    return (Math.floor((Max-Min)*Math.random())+Min); 
} 

