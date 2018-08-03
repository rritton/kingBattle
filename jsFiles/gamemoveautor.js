
/**
 * Generation d'un affichage des case autorisées au déplacement pour un
 * personnage placé sur une @position donnée du @plateau
 * 
 * @param plateau
 * @param position
 * @returns
 * @version 2.0
 */
function moveAutorise(position) {
	console.log('verification des mouvements en ' + position + ' V2');
	var plateau = getPlateau();

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			//le joueur actif
			if (10 * i + j == position){} //do nothing
			// Les cases hors du "carré" 7x7 centré sur @position & @position
			else if (Math.abs(10 * i + j - position) > 30		// lignes trop éloignées
					|| Math.abs(j - position % 10) > 3) {	// collones trop éloignées
				caseNon(i,j);
			}
			// Les cases qui sont dans la croix
			else if (position % 10 == j){			//même collone
				switch((10*i+j - position)/10){		//mesure de l'éloignement
				case -3: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j+10]%2 == 0 && plateau[10*i+j+20]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 3: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j-10]%2 == 0 && plateau[10*i+j-20]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case -2: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j+10]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 2: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j-10]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case -1: 
					if(plateau[10*i+j]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 1: 
					if(plateau[10*i+j]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				default :
				caseNon(i,j);
				}
			}

			else if ((position-position%10)/10 == i){	//même ligne
				switch(j-position%10){					//mesure de l'éloignement
				case -3: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j+1]%2 == 0 && plateau[10*i+j+2]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 3: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j-1]%2 == 0 && plateau[10*i+j-2]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case -2: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j+1]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 2: 
					if(plateau[10*i+j]%2 == 0 && plateau[10*i+j-1]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case -1: 
					if(plateau[10*i+j]%2 == 0){
						caseOui(position,i,j);
					}
					else {caseNon(i,j);	}
					break;
				case 1: 
					if(plateau[10*i+j]%2 == 0) {caseOui(position,i,j);}
					else {caseNon(i,j);}
					break;
				default :
					caseNon(i,j);
				}
			}
			//case hors croix
			else {caseNon(i,j);	}
		}
	}
}

/**
 * mise à jour de l'affichage d'une case accessible
 * @param i
 * @param j
 * @returns
 */
function caseOui(position,i,j){
	document.getElementById('case' + i + j).style.border = 'solid black 0.06em';
	document.getElementById('case' + i + j).style.cursor ='pointer';
	document.getElementById('case' + i + j).setAttribute('onclick',
			'deplacement('+position+','+i+','+j+');');
}

/**
 * mise à jour de l'affichage d'une case inaccessible
 * @param i
 * @param j
 * @returns
 */
function caseNon(i,j){
	var plateau =  getPlateau();
	if(plateau[10*i+j] != 1){
	document.getElementById('case' + i + j).style.opacity = 0.5;
	}
}