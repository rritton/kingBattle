/**
 * Fonction main du jeu
 * 
 * @returns
 */
function jeu() {
	console.log('lancement du jeu');

	plateauAffich();

	moveAutorise(ouEstLeJoueur(getRandomInt(1, 3)));

}

/**
 * Affichage du @plateau de jeu
 * passage du tableau 10X10 en HTML
 * 
 * @param plateau
 * @returns
 */
function plateauAffich() {
	console.log('affichage du plateau');
	var ecrasement = "";
	var plateau = getPlateau();
	for (var i = 0; i < 10; i++) { // boucle sur les lignes
		for (var j = 0; j < 10; j++) { // boucle sur les colonnes
			switch (plateau[10 * i + j]) { // mesure de la valeur associé à la case

			case 0: // case vide
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/texture.jpg">';
				break;
			case 1: // case interdite
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/dark.jpg">';
				break;
			case 3: // case du joueur 1
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/Brand.png">';
				break;
			case 5: // case du joueur 2
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/Jinx.png">';
				break;
				// case avec des armes
			case 2: // case avec une arme : grenade
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/grenade.jpg">';
				break;
			case 4: // case avec une arme : bazooka
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/bazooka.jpg">';
				break;
			case 6: // case avec une arme : corde à sauter
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/corde_sauter.jpg">';
				break;
			case 8: // case avec une arme : point de feu
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/point_fire.jpg">';
				break;
			case 10: // case avec une arme : hache
				ecrasement += '<img class="photo" id="case' + i + j
				+ '" src="../imgFiles/hache.jpg">';
				break;
			}
		}
		ecrasement += '<br>'; // changement de ligne
	}
	// Ecrasement de lancien affichage par le nouveau
	try {
		document.getElementById('zoneDeJeu').innerHTML = ecrasement;
	} catch (e) {
		console.log(e);
	}
}

/**
 * Déplacement  sur le plateau depuis une @position vers la case (@i,@j)
 * 
 * @param position
 * @param i
 * @param j
 * @returns
 * @version 3.0
 */
function deplacement(position,i,j){

	var plateau = getPlateau();
	var caseDepart = plateau[position];

	var joueur = new JoueurStorage(plateau[position]);

	if(joueur.depose == true){
		plateau[position] = joueur.armeADeposer.num*2;
		joueur.depose = false;
	}
	else {plateau[position] = 0}

	if(plateau[10*i+j] != 0) {
		joueur.armeADeposer = joueur.armeActuel;
		joueur.depose = true;
		joueur.armeActuel = ramasseArme(plateau[10*i+j]);
	}
	plateau[10*i+j] = caseDepart;

	savePlateau(plateau);
	joueur.save();

	if(voisin(10*i+j)){
		lancementCombat();
	}
	else{
		plateauAffich();
		if(caseDepart == 5){
			moveAutorise(ouEstLeJoueur(1));
		}
		else {moveAutorise(ouEstLeJoueur(2));}
	}
}

function ramasseArme(numArm){
	var armeAuSol;
	switch(numArm){
	case 2: // case avec une arme : grenade
		 armeAuSol = new ArmeStorage('Grenade');
		break;
	case 4: // case avec une arme : bazooka
		 armeAuSol = new ArmeStorage('Bazooka');
		break;
	case 6: // case avec une arme : corde à sauter
		 armeAuSol = new ArmeStorage('Corde à sauter');
		break;
	case 8: // case avec une arme : point de feu
		 armeAuSol = new ArmeStorage('Point de feu');
		break;
	case 10: // case avec une arme : hache
		 armeAuSol = new ArmeStorage('Hache');
		break;
	}
	return armeAuSol;
}
