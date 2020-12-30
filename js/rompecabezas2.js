
const resultBox = document.querySelector(".result-box")
const box = document.querySelector(".box")

//se obtiene el id de las piezas
var piezas = document.getElementsByClassName('movil');
//medidas de alto y ancho de las piezas
var tamWidh = [147,201,150,168,144,166,134,201,135];
var tamHeight = [167,142,167,155,200,137,170,140,169];

//se agregan las posiciones de forma aleatoria
for(var i=0;i<piezas.length;i++){
	piezas[i].setAttribute("width", tamWidh[i]);
	piezas[i].setAttribute("height",tamHeight[i]);
	piezas[i].setAttribute("x", Math.floor((Math.random() * 10) + 1));
	piezas[i].setAttribute("y", Math.floor((Math.random() * 409) + 1));
	//funcion para seleccionar el elemento
	piezas[i].setAttribute("onmousedown","seleccionarElemento(evt)");
}

//variables para almacenar informacion de movimiento
var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
	elementSelect = reordenar(evt);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	//se llama a la funcion moverElemento
	elementSelect.setAttribute("onmousemove","moverElemento(evt)");
}

function moverElemento(evt){
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	//llama a la funcion deseleccionarElemento
	elementSelect.setAttribute("onmouseout","deseleccionarElemento(evt)");
	elementSelect.setAttribute("onmouseup","deseleccionarElemento(evt)");
	iman();
}

//funcion para soltar la pieza
function deseleccionarElemento(evt){
	testing();
	if(elementSelect != 0){		
		//se eliminan los elementos añadidos en la funcion seleccionarElemento	
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var entorno = document.getElementById('entorno');

//funcion para que las demas piezas no se sobrepongan al arrastrar
function reordenar(evt){
	var padre = evt.target.parentNode;
	var clone = padre.cloneNode(true);
	var id = padre.getAttribute("id");
	entorno.removeChild(document.getElementById(id));
	entorno.appendChild(clone);
	return entorno.lastChild.firstChild;
}

//posicion de las piezas
var origX = [194,300,458,200,328,433,200,299,466];   
var origY = [100,96,101,222,200,231,331,363,332];

//funcion para cuando una pieza se acerque a una posicion, esta se adherira
function iman(){
	for(var i=0;i<piezas.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");
var mover = document.getElementById("mover");

//funcion para comprobar el rompecabezas ha sido armado correctamente
function testing() {
	var bien_ubicada = 0;
	var padres = document.getElementsByClassName('padre');
	for(var i=0;i<piezas.length;i++){
		var posx = parseFloat(padres[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(padres[i].firstChild.getAttribute("y"));
		ide = padres[i].getAttribute("id");
		if(origX[ide] == posx && origY[ide] == posy){
			//se reproduce el sonido
			mover.play();
			//contadora para las piezas bien ubicadas
			bien_ubicada = bien_ubicada + 1;
		}
	}
	if(bien_ubicada == 9){
		//se reproduce el sonido final
		win.play();
		//se muestra la ventana de felicitaciones
		box.classList.add("hide");
		resultBox.classList.remove("hide");
	}
}