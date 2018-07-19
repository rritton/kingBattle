
var plateau = [100]; 	// creation du plateau de 10x10
var nbRock = 0;			// variable du nombre de cases interdites
var nbArme = 0;			// variable du nombre d'armes

	//initialisation des case à "libre"
for(var i=0; i<10;i++){
	for(var j=0;j<10;j++){
		plateau[i*10+j]=0;
	}
}


function plateauGenerate(){
	nbRock = getRandomInt(10,16);
	nbArme = getRandomInt(1,5);
	
	//Instalation des cases interdites
	for(var i=0; i< nbRock;i++){
		while(1){
			var cas = getRandomInt(0,100);
			if(plateau[cas]==0){
				plateau[cas]=1;
				break;
			}
		}
	}
	
	//Instalation des armes
	for(var i=0; i< nbArme;i++){
		while(1){
			var cas = getRandomInt(0,100);
			if(plateau[cas]==0){
				plateau[cas]=2;
				break;
			}
		}
	}
	
	//Instalation Joueur 1
	while(1){
		var cas = getRandomInt(0,100);
		if(plateau[cas]==0){
			plateau[cas]=3;
			break;
		}
	}
	//Instalation Joueur 2
	while(1){
		var cas = getRandomInt(0,100);
		if(plateau[cas]==0){
			plateau[cas]=5;
			break;
		}
	}
	
}


function plateauAffich(){
	for(var i=0; i<10;i++){
		for(var j=0;j<10;j++){
			document.getElementById('test').innerHTML += '('+i+','+j+')';
		}
		document.getElementById('test').innerHTML += '<br>';
	}
	
}

function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}