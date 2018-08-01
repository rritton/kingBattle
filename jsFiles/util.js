/**
 * Generation de nombre entier aléatoire entre la valeur @min (comprise) 
 * et la valeur @max (non-comprise)
 * 
 * @autor developer.mozilla.org
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

function getPlateau(){
	var plateauStringTable = sessionStorage.getItem('plateau');
	var plateau = [ 100 ];
	for(var i = 0; i < 200 ;i +=2){
		plateau[i/2] = parseInt(plateauStringTable[i]);
	}
 	return plateau;
}

function savePlateau(plateau){
	var plateauString = plateau.join();
	sessionStorage.setItem('plateau',plateauString);
}

function ouEstLeJoueur(joueur){
	var plateau = getPlateau();
	for(var i =0; i<100; i++){
		if(joueur==1 && plateau[i]==3){
			return i;
		}

		if(joueur==2 && plateau[i]==5){
			return i;
		}
	}
}