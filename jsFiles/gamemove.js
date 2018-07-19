var plateau = [ 100 ]; // creation du plateau de 10x10
var nbRock = 0; // variable du nombre de cases interdites
var nbArme = 0; // variable du nombre d'armes

// initialisation des case à "libre"
for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 10; j++) {
		plateau[i * 10 + j] = 0;
	}
}

plateauGenerate();
plateauAffich();

moveAutorise(50);

function plateauGenerate() {
	nbRock = getRandomInt(10, 16);
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
	for (var i = 0; i < nbArme; i++) {
		while (1) {
			var cas = getRandomInt(0, 100);
			if (plateau[cas] == 0) {
				plateau[cas] = 2;
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

function plateauAffich() {
	var ecrasement = "";
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			switch (plateau[10 * i + j]) {
			case 0:
				ecrasement += '<img class="photo colonne' + j + ' ligne' + i
						+ '" src="../imgFiles/texture.jpg">';
				break;
			case 1:
				ecrasement += '<img class="photo colonne' + j + ' ligne' + i
						+ '" src="../imgFiles/dark.jpg">';
				break;
			case 2:
				ecrasement += '<img class="photo colonne' + j + ' ligne' + i
						+ '" src="../imgFiles/grenade.jpg">';
				break;
			case 3:
				ecrasement += '<img class="photo colonne' + j + ' ligne' + i
						+ '" src="../imgFiles/Brand.png">';
				break;
			case 5:
				ecrasement += '<img class="photo colonne' + j + ' ligne' + i
						+ '" src="../imgFiles/Jinx.png">';
				break;
			}
		}
		ecrasement += '<br>';
	}
	document.getElementById('zoneDeJeu').innerHTML = ecrasement;
}

function moveAutorise(position) {
	for (k = -3; k < 3; k++) {
		// test des positions aux bords pour ne pas sortir du plateau de jeu
		if ((position + k) < 0 || (position + k) >= 100
				|| ((position % 10) < 3 && (position + k) >= 7)
				|| ((position % 10) >= 7 && (position + k) < 3)) {
			continue;
		}
		if (plateau[position + k] == 0) {
			var j = (position + k) % 10;
			var i = ((position + k) - j) / 10;
			$(function() {
				$(' colonne' + j + ' ligne' + i).css('border', 'black').css(
						'box-shadow', '0.1em 0.1em 0.1em black');
			});
		}
	}
}

/**
 * Generation de nombre entier aléatoire
 * 
 * @param min
 * @param max
 * @returns
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}