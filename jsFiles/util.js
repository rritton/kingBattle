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
	
function voisin(position){
	if(position == 0){			//coin supérieur gauche
		return voisinExtend(position, false, false, true, true);
	}
	else if(position == 9){		//coin supérieur droit
		return voisinExtend(position, true, false, true, false);
	}
	else if(position == 90){	//coin inférieur gauche
		return voisinExtend(position, true, false, false, true);
	}
	else if(position == 99){	//coin inférieur droit
		return voisinExtend(position, true, true, false, false);
	}
	else if(position < 8){		//bord supérieur
		return voisinExtend(position, true, false, true, true);
	}
	else if(position%10 == 0){	//bord gauche
		return voisinExtend(position, false, true, true, true);
	}
	else if(position%10 == 9){	//bord droit
		return voisinExtend(position, true, true, false, true);
	}
	else if(position > 90){		//bord inférieur
		return voisinExtend(position, true, true, true, false);
	}
	else {
		return voisinExtend(position, true, true, true, true);
	}

}

function voisinExtend(position, gauche, haut, droite, bas){
	var plateau = getPlateau();
	
	if(gauche){
		if(plateau[position-1]==3 || plateau[position-1]==5){
			return true;
		}
	}
	if(haut){
		if(plateau[position-10]==3 || plateau[position-10]==5){
			return true;
		}
	}
	if(droite){
		if(plateau[position+1]==3 || plateau[position+1]==5){
			return true;
		}
	}
	if(haut){
		if(plateau[position+10]==3 || plateau[position+10]==5){
			return true;
		}
	}
	
	return false;
}



function lancementCombat(){
	document.getElementById('zoneDeJeu').innerHTML = "C'est l'heure du...du... DUEL";
}

function Joueur(nom, image, arme){
	//les attributs
	this.nom = nom;
	this.pv = 100;
	this.image = image;
	this.armeActuel = arme;
	this.armeADeposer = null;
	this.depose = false;
	//méthodes
	this.changeArmeSimple = function(arme){
		this.armeActuel = arme;
	}
	this.changeArmeSauvgarde = function(arme){
		this.armeADeposer = this.armeActuel;
		this.depose = true;
		this.armeActuel = arme;
	}
	this.resetArmeDeposer = function(){
		this.armeADeposer = null;
		this.depose = false;
	}
//	this.save = function(i){
//		sessionStorage.setItem('joueur'+i,this);
//	}
//	this.load = function(i){
//		this = sessionsStorage.getItem('joueur'+i);
//	}
}


function Arme(nom, image, degats){
	//les attributs
	this.nom = nom;
	this.image = image;
	this.degats = degats;
}







