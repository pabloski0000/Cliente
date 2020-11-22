// UT2 cookies

window.onload = function() { 

	let x=0;     // posición inicial x del rectángulo
	let y=0;     // posición inicial y del rectángulo
	var canvas;  // variable que referencia al elemento canvas del html
	var ctx;     // contexto de trabajo
	var id;      // id de la animación
	let figuraDB = new Image();
	let xIzquierda, xDerecha, yArriba, yAbajo;
	
	
	function generaPosicionDerecha() {

		x = x + 2;
		
		if (x > 485) {
			
			// If at edge, reset ship position and set flag.
			x = 485;   
		}
		
		console.log("derecha " + x);
	
	}
	
	function generaPosicionIzquierda() {
		
		x = x - 2;

		if (x < 0) {
			
			// If at edge, reset ship position and set flag.
			x = 0;	   
		}
		
		console.log('izquierda ' + x);
	}

	function generarPosicionArriba(){
		y = y - 2;

		if(y <= 0){
			y = 0;
		}

		console.log('arriba '+ y);
	}

	function generarPosicionAbajo(){
		y = y + 2;

		if(y >= 485){
			y = 485;
		}

		console.log('abajo' + y);
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
		
		if (xDerecha==true) {
			
			generaPosicionDerecha();
	   
		}
		if (xIzquierda ==true)  {
			
			generaPosicionIzquierda();

		}

		if(yArriba){
			generarPosicionArriba();
		}

		if(yAbajo){
			generarPosicionAbajo();
		}
	  
		// pintamos el rectángulo
		/*ctx.fillStyle = "#FF0000";*/
		/*ctx.fillRect(x,y,15,15);*/
		ctx.drawImage(figuraDB);
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
	
	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/24);

	figuraDB.src = '../CSS/Imágenes/spriteComecocos.png';
}


