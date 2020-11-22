// UT4 - Animaciones

window.onload = function() { 

	var TIEMPOCAMBIOCERRADO = 10;   // "Tiempo" para pasar de boca abierta a cerrada
	var TIEMPOCAMBIOABIERTO = 20;   // "Tiempo" para pasar de boca cerrada a abierta

	var TAMAÑONAVEX = 30;
	var TAMAÑONAVEY = 30;
	
	var VELOCIDAD = 1.4;

	var x=0;     // posición inicial x del rectángulo
	var y=250;   // posición inicial y del rectángulo
	var canvas;  // variable que referencia al elemento canvas del html
	var ctx;     // contexto de trabajo
	var id;      // id de la animación
	
	let xIzquierda, xDerecha, yArriba, yAbajo;
	
	var posicionXSprite = 0;   // Posición del sprite X donde vamos a recortar
	var posicionYSprite = 0;   // Posición del sprite Y donde vamos a recortar
	
	var cambia = 10;
	
	var miComecocos;
	var imagen;
	
	function Comecocos (x_, y_) {
	
	  this.x = x_;
	  this.y = y_;
	
	}

	Comecocos.prototype.generaPosicionArribaDiagonalDerecha = function(){
		this.y = this.y - VELOCIDAD;
		this.x = this.x + VELOCIDAD;

		if(this.y < 0){
			this.y = 0;
		}

		if(this.x > 470){
			this.x = 470;
		}

		if (cambia == TIEMPOCAMBIOCERRADO) {
			
			// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la derecha
			posicionXSprite = 0;
			posicionYSprite = 160;
			cambia ++;
			  
		} else {
			
			cambia ++;
			
			if (cambia == TIEMPOCAMBIOABIERTO) {
			
				// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la izquierda
				posicionXSprite = 30;
				posicionYSprite = 160;
				cambia = 0;
				
			}// else cambia ++;
		}
	}

	Comecocos.prototype.generaPosicionArriba = function(){
		this.y = this.y - VELOCIDAD;

		if(this.y < 0){
			this.y = 0;
		}

		if (cambia == TIEMPOCAMBIOCERRADO) {
			
			// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la derecha
			posicionXSprite = 0;
			posicionYSprite = 95;
			cambia ++;
			  
		} else {
			
			cambia ++;
			
			if (cambia == TIEMPOCAMBIOABIERTO) {
			
				// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la izquierda
				posicionXSprite = 30;
				posicionYSprite = 95;
				cambia = 0;
				
			}// else cambia ++;
		}
	}

	Comecocos.prototype.generaPosicionAbajo = function(){
		this.y = this.y + VELOCIDAD;

		if(this.y > 470){
			this.y = 470;
		}

		if (cambia == TIEMPOCAMBIOCERRADO) {
			
			// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la derecha
			posicionXSprite = 0;
			posicionYSprite = 32.5;
			cambia ++;
			  
		} else {
			
			cambia ++;
			
			if (cambia == TIEMPOCAMBIOABIERTO) {
			
				// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la izquierda
				posicionXSprite = 30;
				posicionYSprite = 32.5;
				cambia = 0;
				
			}// else cambia ++;
		}
	}
	
	Comecocos.prototype.generaPosicionDerecha = function() {

		this.x = this.x + VELOCIDAD;
		
		if (this.x > 470) {
			
			// If at edge, reset ship position and set flag.
			this.x = 470;   
		}		
		
		if (cambia == TIEMPOCAMBIOCERRADO) {
			
			// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la derecha
			posicionXSprite = 0;
			posicionYSprite = 0;
			cambia ++;
			  
		} else {
			
			cambia ++;
			
			if (cambia == TIEMPOCAMBIOABIERTO) {
			
				// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la izquierda
				posicionXSprite = 30;
				posicionYSprite = 0;
				cambia = 0;
				
			}// else cambia ++;
		}
	}
	

	Comecocos.prototype.generaPosicionIzquierda = function() {
		
		this.x = this.x - VELOCIDAD;

		if (this.x < 0) {
			
			// If at edge, reset ship position and set flag.
			miComecocos.x = 0;	   
		}
		
		if (cambia == TIEMPOCAMBIOCERRADO) {
			
			// Posición x e y del sprite donde se encuentra el comecocos con la boca cerrada que mira a la izquierda
			posicionXSprite = 0;
			posicionYSprite = 65;
			cambia ++;
			  
		} else {
			
			cambia ++;
			
			if (cambia == TIEMPOCAMBIOABIERTO) {
			
				// Posición x e y del sprite donde se encuentra el comecocos con la boca abierta que mira a la izquierda
				posicionXSprite = 30;
				posicionYSprite = 65;
				cambia = 0;
				
			}// else cambia ++;
		
		}
		
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
		
		if (xDerecha==true && !yArriba) {
			
			miComecocos.generaPosicionDerecha();
	   
		}
		if (xIzquierda ==true)  {
			
			miComecocos.generaPosicionIzquierda();

		}

		if(yArriba && !xDerecha){
			miComecocos.generaPosicionArriba();
		}

		if(yAbajo){
			miComecocos.generaPosicionAbajo();
		}

		if(yArriba && xDerecha){
			miComecocos.generaPosicionArribaDiagonalDerecha();
		}
	  

		// Pintamos el comecocos
		ctx.drawImage(miComecocos.imagen, // Imagen completa con todos los comecocos (Sprite)
					  posicionXSprite,    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
					  posicionYSprite,	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
					  TAMAÑONAVEX, 		  // Tamaño X del comecocos que voy a recortar para dibujar
					  TAMAÑONAVEY,	      // Tamaño Y del comecocos que voy a recortar para dibujar
					  miComecocos.x,      // Posicion x de pantalla donde voy a dibujar el comecocos recortado
					  miComecocos.y,				  // Posicion y de pantalla donde voy a dibujar el comecocos recortado
					  TAMAÑONAVEX,		  // Tamaño X del comecocos que voy a dibujar
					  TAMAÑONAVEY);       // Tamaño Y del comecocos que voy a dibujar
	}

	function activaMovimiento(evt) {


        switch (evt.keyCode) {
		
			// Left arrow.
			case 37:
			  xIzquierda = true;
			  break;

			// Right arrow.
			case 39:
			  xDerecha = true;
			  break;

			case 38:
				yArriba = true;
				break;

			case 40:
				yAbajo = true;
				break;
		 
		}
	}

	function desactivaMovimiento(evt){

        switch (evt.keyCode) {

			// Left arrow
			case 37: 
			  xIzquierda = false;
			  break;

			// Right arrow 
			case 39:
			  xDerecha = false;
			  break;

			case 38:
				yArriba = false;
				break;

			case 40:
				yAbajo = false;
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
	imagen.src="../CSS/Imágenes/spriteComecocosDiagonal.png";
	Comecocos.prototype.imagen = imagen;


	miComecocos = new Comecocos( x, y);
	
	

	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/50);


}


