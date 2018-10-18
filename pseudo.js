var nom

function start(){
	nom = prompt("Veuillez entrer votre Prénom : ");
	intro()

}
function intro(){
		if (nom == ""){
		start()
	}
	else{
		document.getElementById("debut").innerHTML = "Bonjour et Bienvenue, " + nom + " au centre d'enrichisment assisté par ordinateur de la coding Factory";
		document.getElementById("debut").innerHTML += "<br>" + "Votre échantillon a été traité ; nous pouvons maintenant procéder aux tests.";
		document.getElementById("debut").innerHTML += "<br>" + "Avant de commencer, vous devez savoir que même si le divertissement et l'apprentissage sont au coeur des activités du centre, vous risquez de subir des lésions irréversibles.";
		document.getElementById("debut").innerHTML += "<br>" + "Por favor bordón de fallar de muchas gracias de fallar gracias";
	}
}