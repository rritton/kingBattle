/**
 * Fonction main du jeu
 * @returns
 */
function jeu(){
	console.log('lancement du jeu');
	var plateau = [ 100 ]; // creation du plateau de 10x10
	var nbRock = 0; // variable du nombre de cases interdites
	var nbArme = 0; // variable du nombre d'armes

	//initialisation des case à "libre"
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			plateau[i * 10 + j] = 0;
		}
	}

	plateauGenerate(plateau);
	plateauAffich(plateau);

	moveAutorise(plateau, 0);
	moveAutorise(plateau, 9);
	moveAutorise(plateau, 45);
	moveAutorise(plateau, 90);
	moveAutorise(plateau, 99);


}

/**
 * Génération du @plateau de jeu
 * 
 * @param plateau
 * @returns
 */
function plateauGenerate(plateau) {
	console.log('appelle du générateur de plateau');
	nbRock = getRandomInt(10, 16);		//génération du nombre de case interdite
	//entre 10 et 15 
	nbArme = getRandomInt(1, 5);		//génération du nombre d'arme
	//entre 1 et 4

	// Instalation des cases interdites
	for (var i = 0; i < nbRock; i++) {
		while (1) {
			var cas = getRandomInt(0, 100);
			if (plateau[cas] == 0) {
				plateau[cas] = 1;
				break;
			}
		}
	}
	// Instalation des armes
	for (var i = 0, numArme = 0, tabArmes = []; i < nbArme; i++) {
		numArme = getRandomInt(0,5)+1;
		if(tabArmes.indexOf(numArme) != -1){
			continue;
		}
		tabArmes.push(numArme);
		while (1) {
			var cas = getRandomInt(0, 100);
			if (plateau[cas] == 0) {
				plateau[cas] = 2*numArme;
				break;
			}
		}
	}
	// Instalation Joueur 1
	while (1) {
		var cas = getRandomInt(0, 100);
		// les joueurs ne peuvent pas être sur le bord du plateau (choix
		// personnel)
		if (cas < 10 || cas % 10 == 0 || cas > 90 || cas % 10 == 9) {
			continue;
		}
		if (plateau[cas] == 0) {
			plateau[cas] = 3;
			break;
		}
	}
	// Instalation Joueur 2
	while (1) {
		var cas = getRandomInt(0, 100);
		// les joueurs ne peuvent pas être sur le bord du plateau (choix
		// personnel)
		if (cas < 10 || (cas % 10) == 0 || cas > 90 || (cas % 10) == 9) {
			continue;
		}
		// les joueurs ne peuvent être cote à cote
		if (plateau[cas - 1] == 3 || plateau[cas + 1] == 3
				|| plateau[cas - 10] == 3 || plateau[cas + 10] == 3) {
			continue;
		}
		if (plateau[cas] == 0) {
			plateau[cas] = 5;
			break;
		}
	}
}

/**
 * Affichage du @plateau de jeu
 * 
 * @param plateau
 * @returns
 */
function plateauAffich(plateau) {
	console.log('affichage du plateau');
	var ecrasement = "";
	for (var i = 0; i < 10; i++) {				//boucle sur les lignes
		for (var j = 0; j < 10; j++) {			//boucle sur les colonnes
			switch (plateau[10 * i + j]) {		//mesure de la valeur associé à la case

			case 0:			//case vide 
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/texture.jpg">';
				break;
			case 1:			//case interdite
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/dark.jpg">';
				break;
			case 3:			//case du joueur 1
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/Brand.png">';
				break;
			case 5:			//case du joueur 2
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/Jinx.png">';
				break;
					//case avec des armes
			case 2:			//case avec une arme : grenade
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/grenade.jpg">';
				break;
			case 4:			//case avec une arme : bazooka
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/bazooka.jpg">';
				break;
			case 6:			//case avec une arme : corde à sauter
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/corde_sauter.jpg">';
				break;
			case 8:			//case avec une arme : hache
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/hache.jpg">';
				break;
			case 10:		//case avec une arme : point de feu
				ecrasement += '<img class="photo" id="case'+i+j
				+ '" src="../imgFiles/point_fire.jpg">';
				break;
			}
		}
		ecrasement += '<br>';			//changement de ligne
	}
	//Ecrasement de lancien affichage par le nouveau
	try{
		document.getElementById('zoneDeJeu').innerHTML = ecrasement;
	}
	catch(e){
		console.log(e);
	}
}

/**
 * Generation d'un affichage des case autorisées au déplacement
 * pour un personnage placé sur une @position donnée du @plateau
 * 
 * @param plateau
 * @param position
 * @returns
 */
function moveAutorise(plateau, position) {
	console.log('verification des mouvements en '+position+' V2');

	for(var i=0; i<10; i++) {
		for(var j=0; j<10; j++) {
			//Les cases hors du carré 7x7 centré sur @position
			if(Math.abs(10*i+j-position) > 30 || Math.abs(j-position%10) > 3) {
				document.getElementById('case'+i+j).style.opacity = 0.5;
			}
			//Les cases qui sont dans la croix
			else if(position%10 == j || (position-j) == i) {	//même collone ou même ligne
				document.getElementById('case'+i+j).style.border = 'solid black 0.06em';
			}
			//Les dernières cases du carré
			else {
				document.getElementById('case'+i+j).style.opacity = 0.5;
			}
		}
	}
}

	//gesstion des cases adjacentes horizontalement
	for (k = -3; k <= 3; k++) {
		// test des positions aux bords pour ne pas sortir du plateau de jeu
		if (k==0 || (position + k) < 0 || (position + k) >= 100			//sortie au-dessous ou au-dessus (pour premières et dernières cases)
				|| ((position % 10 < 3) && ((position + k)%10 >= 7))	//sortie à gauche
				|| ((position % 10 >= 7) && ((position + k)%10 < 3))) {	//sortie à droite
			continue;
		}

		//Test si la case est libre ou a une arme (la valeur associée est paire)
		if (plateau[position + k]%2 == 0 ) {
			var j = (position + k) % 10;
			var i = ((position + k) - j) / 10;
			document.getElementById('case'+i+j).style.border = 'solid black 0.06em';
			document.getElementById('case'+i+j).style.boxShadow = '0.2em 0.2em 0.2em black';
		}
	}

	//gesstion des cases adjacentes verticalement
	for (k = -3; k <= 3; k++) {
		// test des positions aux bords pour ne pas sortir du plateau de jeu
		if (k==0 || (position + 10*k) < 0 || (position + 10*k) >= 100) {	//sortie au-dessous ou au-dessus
			continue;
		}

		//Test si la case est libre ou a une arme (la valeur associée est paire)
		if (plateau[position + 10*k]%2 == 0 ) {
			var j = (position + 10*k) % 10;
			var i = ((position + 10*k) - j) / 10;
			document.getElementById('case'+i+j).style.border = 'solid black 0.06em';
			document.getElementById('case'+i+j).style.boxShadow = '0.2em 0.2em 0.2em black, -0.2em -0.2em 0.2em black';
		}
	}
}


/**
 * Generation de nombre entier aléatoire 
 * entre la valeur @min (comprise) et la valeur @max (non-comprise)
 * 
 * Récupéré sur developer.mozilla.org
 * 
 * @param min
 * @param max
 * @returns un entier
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
