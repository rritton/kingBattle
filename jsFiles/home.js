/**
 * Génération du @plateau de jeu
 * 
 * @param plateau
 * @returns
 */
function plateauGenerate() {
	var plateau = [ 100 ]; // creation du plateau de 10x10
	var nbRock = 0; // variable du nombre de cases interdites
	var nbArme = 0; // variable du nombre d'armes

	// initialisation des case à "libre"
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			plateau[i * 10 + j] = 0;
		}
	}
	//Génération du nombre de cases interdites (entre 10 et 15)
	nbRock = getRandomInt(10, 16);
	//Génération du nombre d'armes sur la carte (entre 1 et 4)
	nbArme = getRandomInt(1, 5);
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
	for (var i=0, numArme = 0, tabArmes = []; i < nbArme; i++) {
		while(1){
			numArme = getRandomInt(0, 4) + 1;
			if (tabArmes.indexOf(numArme) != -1) {
				continue;
			}
			tabArmes.push(numArme);
			while (1) {
				var cas = getRandomInt(0, 100);
				if (plateau[cas] == 0) {
					plateau[cas] = 2 * numArme;
					break;
				}
			}
			break;
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
	savePlateau(plateau);
	// Instalation Joueur 2
	while (1) {
		var cas = getRandomInt(0, 100);
		// les joueurs ne peuvent pas être sur le bord du plateau (choix
		// personnel)
		if (cas < 10 || (cas % 10) == 0 || cas > 90 || (cas % 10) == 9) {
			continue;
		}
		// les joueurs ne peuvent être cote à cote
		if (voisin(cas)) {
			continue;
		}
		if (plateau[cas] == 0) {
			plateau[cas] = 5;
			break;
		}
	}
	savePlateau(plateau);
}
