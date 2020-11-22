// UT4 - Animaciones

window.onload = function() { 

	var TAMAÑONAVEX = 30;
	var TAMAÑONAVEY = 30;
	
	var VELOCIDAD = 1.4;

	var x=0;     // posición inicial x del rectángulo
	var y=250;   // posición inicial y del rectángulo
	var canvas;  // variable que referencia al elemento canvas del html
	var ctx;     // contexto de trabajo
	var id;      // id de la animación
	
	let xIzquierda, xDerecha, yArriba, yAbajo;
	const TOPEARRIBA = 0, TOPEABAJO = 470, TOPEDERECHA = 470, TOPEIZQUIERDA = 0;

	var animacionComecocos = [[0,0],[32,0],[0,65],[32,65],[0,32.5],[32,32.5],[0,95],[32,95]]; // Posiciones del sprite donde recortar cada imagenn 
	                                                        //(0 cerrado derecha, 1 abierto derecha, 2 cerrado izquierda, 3 cerrado izquierda)
	var posicion=0;                                         // Posición del array 0, 1, 2, 3
	var ejecutarDerecha = true, ejecutarIzquierda = false, ejecutarAbajo = false, ejecutarArriba = false;                             // Control de cambio de posicion derecha - izquierda y viceversa
	
	
	var miComecocos;
	var imagen;
	
	function Comecocos (x_, y_) {
	
	  this.x = x_;
	  this.y = y_;
	
	}
	
	Comecocos.prototype.generaPosicionDerecha = function() {

		this.x = this.x + VELOCIDAD;
		
		if (this.x > TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA;   
		}		

	}
	

	Comecocos.prototype.generaPosicionIzquierda = function() {
		
		this.x = this.x - VELOCIDAD;

		if (this.x < TOPEIZQUIERDA) {
			
			// If at edge, reset ship position and set flag.
			miComecocos.x = TOPEIZQUIERDA;	   
		}

	}

	Comecocos.prototype.generaPosicionArriba = function(){
		this.y = this.y - VELOCIDAD;

		if(this.y < TOPEARRIBA){
			this.y = TOPEARRIBA;
		}
	}

	Comecocos.prototype.generaPosicionAbajo = function(){
		this.y = this.y + VELOCIDAD;

		if(this.y > TOPEABAJO){
			this.y = TOPEABAJO;
		}
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
		
		if (xDerecha==true) {
			
			miComecocos.generaPosicionDerecha();
	   
		}
		
		if (xIzquierda ==true)  {
			
			miComecocos.generaPosicionIzquierda();

		}

		if(yArriba){
			miComecocos.generaPosicionArriba();
		}

		if(yAbajo){
			miComecocos.generaPosicionAbajo();
		}

        console.log("posicion " + posicion); 
		console.log("hacia dónde voy true(DERECHA) - false (IZQUIERDA) - " + ejecutarDerecha); 

 		// Pintamos el comecocos
		ctx.drawImage(miComecocos.imagen, // Imagen completa con todos los comecocos (Sprite)
					  animacionComecocos[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
					  animacionComecocos[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
					  TAMAÑONAVEX, 		  // Tamaño X del comecocos que voy a recortar para dibujar
					  TAMAÑONAVEY,	      // Tamaño Y del comecocos que voy a recortar para dibujar
					  miComecocos.x,      // Posicion x de pantalla donde voy a dibujar el comecocos recortado
					  miComecocos.y,				  // Posicion y de pantalla donde voy a dibujar el comecocos recortado
					  TAMAÑONAVEX,		  // Tamaño X del comecocos que voy a dibujar
					  TAMAÑONAVEY);       // Tamaño Y del comecocos que voy a dibujar
	}
	
	function abreCierraBoca() {
		
		if (posicion <=1) {	 
		
		    posicion = (posicion + 1) % 2;  // Cargará posiciones 0 y 1 del array
			
		}else if(posicion == 2 || posicion == 3){
			
			posicion = 2 + (posicion + 1) % 2;  // Cargará posiciones 2 y 3 del array
		}else if(posicion == 4 || posicion == 5){
			posicion = 4 + (posicion + 1) % 2;
		}else{
			posicion = 6 + (posicion + 1) % 2;
		}
		
	}
	
	function activarIzquierda() {
		
		// Solo la primera vez se ejecutara posicion = 2. De esta forma conseguimos
        // que aunque pulsemos repetidamente a la izquierda solo se actualice la posicion
        // de acceso al array a primera vez		
		
		posicion = 2;
		ejecutarIzquierda = true;
		
	}
	function activarDerecha() {
			
		// Solo la primera vez se ejecutara posicion = 0. De esta forma conseguimos
        // que aunque pulsemos repetidamente a la derecha solo se actualice la posicion
        // de acceso al array la primera vez		

		posicion = 0;
		ejecutarDerecha = true;
	}

	function activarArriba(){

		posicion = 6;
		ejecutarArriba = true;
	}

	function activarAbajo(){

		posicion = 4;
		ejecutarAbajo = true;
	}

	function desactivarIzquierda(){
		ejecutarIzquierda = false;

		if(ejecutarAbajo){
			activarAbajo();
		}else if(ejecutarArriba){
			activarArriba();
		}else if(ejecutarDerecha){
			activarDerecha();
		}
	}

	function desactivarArriba(){
		ejecutarArriba = false;

		if(ejecutarAbajo){
			activarAbajo();
		}else if(ejecutarIzquierda){
			activarIzquierda();
		}else if(ejecutarDerecha){
			activarDerecha();
		}
	}
	
	function desactivarDerecha(){
		ejecutarDerecha = false;
		
		if(ejecutarAbajo){
			activarAbajo();
		}else if(ejecutarIzquierda){
			activarIzquierda();
		}else if(ejecutarArriba){
			activarArriba();
		}
	}

	function desactivarAbajo(){
		ejecutarAbajo = false;

		if(ejecutarDerecha){
			activarDerecha();
		}else if(ejecutarIzquierda){
			activarIzquierda();
		}else if(ejecutarArriba){
			activarArriba();
		}
	}


	function activaMovimiento(evt) {

        switch (evt.keyCode) {
		
			// Left arrow.
			case 37: 
			  xIzquierda = true;
			  activarIzquierda();
			  break;

			// Right arrow.
			case 39:
			  xDerecha = true;
			  activarDerecha();
			  break;

			case 38:
				yArriba = true;
				activarArriba();
				break;
			
			case 40:
				yAbajo = true;
				activarAbajo();
				break;
		 
		}
	}

	function desactivaMovimiento(evt){

        switch (evt.keyCode) {

			// Left arrow
			case 37: 
			  xIzquierda = false;
			  desactivarIzquierda();
			  break;

			// Right arrow 
			case 39:
			  xDerecha = false;
			  desactivarDerecha();
			  break;

			case 38:
				yArriba = false;
				desactivarArriba();
				break;
			
			case 40:
				yAbajo = false;
				desactivarAbajo();
				break;
        		  
        }

	}	
	
	document.addEventListener("keydown", activaMovimiento, false);
	document.addEventListener("keyup", desactivaMovimiento, false);	
	
	// localizamos el canvas
	canvas = document.getElementById("miCanvas");
	
	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");

	imagen = new Image();
	imagen.src="spriteComecocos.png";
	Comecocos.prototype.imagen = imagen;

	miComecocos = new Comecocos( x, y);		

	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/50);	
	
	// Animación encargada de abrir y cerra la boca
	id = setInterval(abreCierraBoca, 1000/8);


}


