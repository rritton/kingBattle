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