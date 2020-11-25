window.onload = function() {
	
	var TAMAÑONAVEX = 40;
	var TAMAÑONAVEY = 40;
	
	const VELOCIDADPIKACHU = 3, VELOCIDADRAICHU = 5;
	
	const Y = 425;   // posición inicial y del rectángulo
	let canvas;  // variable que referencia al elemento canvas del html
	let ctx;     // contexto de trabajo
	var id;      // id de la animación
	
	let xIzquierda, xDerecha;
	const TOPEDERECHA = 460, TOPEIZQUIERDA = 0;
	
	var animacionComecocos = [[0,0],[32,0],[0,65],[32,65]]; // Posiciones del sprite donde recortar cada imagenn 
	//(0 cerrado derecha, 1 abierto derecha, 2 cerrado izquierda, 3 cerrado izquierda)
	var posicion=0;                                         // Posición del array 0, 1, 2, 3
	var ejecutarDerecha = true, ejecutarIzquierda = false;  // Control de cambio de posicion derecha - izquierda y viceversa

	let imagenPikachu;
	
	
	function Pokemon (x_, y_,velocidad,imagen,posicionDeEspaldasX,posicionDeEspaldasY,posicionDeFrenteX,posicionDeFrenteY/*posicionDelArray*/){
		this.x = x_;
	    this.y = y_;
		this.velocidad = velocidad;
		const POSICIONDESPALDASX = posicionDeEspaldasX, POSICIONDESPALDASY = posicionDeEspaldasY, POSICIONDEFRENTEX = posicionDeFrenteX, POSICIONDEFRENTEY = posicionDeFrenteY;
		this.posicionesImagen = [[POSICIONDESPALDASX,POSICIONDESPALDASY]];
        this.imagen = imagen;
	}
	
	Pokemon.prototype.generaPosicionDerecha = function() {
		
		this.x = this.x + this.velocidad;
		
		if (this.x > TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA;   
		}		
		
	}
	
	
	Pokemon.prototype.generaPosicionIzquierda = function() {
		
		this.x = this.x - this.velocidad;
		
		if (this.x < TOPEIZQUIERDA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEIZQUIERDA;
		}
		
	}
	
	Pokemon.prototype.pintarPokemon = function(){
		ctx.drawImage(this.imagen, // Imagen completa con todos los comecocos (Sprite)
		this.posicionesImagen[0][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.posicionesImagen[0][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		TAMAÑONAVEX, 		  // Tamaño X del comecocos que voy a recortar para dibujar
		TAMAÑONAVEY,	      // Tamaño Y del comecocos que voy a recortar para dibujar
		this.x,      // Posicion x de pantalla donde voy a dibujar el comecocos recortado
		this.y,				  // Posicion y de pantalla donde voy a dibujar el comecocos recortado
		TAMAÑONAVEX,		  // Tamaño X del comecocos que voy a dibujar
		TAMAÑONAVEY);       // Tamaño Y del comecocos que voy a dibujar
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
		
		
        console.log("posicion " + posicion); 
        console.log("hacia dónde voy true(DERECHA) - false (IZQUIERDA) - " + ejecutarDerecha);
        
		
		
		// Pintamos a Pokemon
		
		ARRAYPOKEMON[0].pintarPokemon();
        
	}
	
	function generarPosiciones(){

		if (xDerecha==true) {
			
			ARRAYPOKEMON[0].generaPosicionDerecha();
			
		}
		
		if (xIzquierda ==true)  {
			
			ARRAYPOKEMON[0].generaPosicionIzquierda();
			
		}
	}
	
	function abreCierraBoca() {
		
		if (posicion <=1) {	 
			
			posicion = (posicion + 1) % 2;  // Cargará posiciones 0 y 1 del array
			
		}else if(posicion == 2 || posicion == 3){
			
			posicion = 2 + (posicion + 1) % 2;  // Cargará posiciones 2 y 3 del array
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
	
	function desactivarIzquierda(){
		ejecutarIzquierda = false;
		
		if(ejecutarDerecha){
			activarDerecha();
		}
	}
	
	function desactivarDerecha(){
		ejecutarDerecha = false;
		
		if(ejecutarIzquierda){
			activarIzquierda();
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
				
			}
			
		}	
		
		document.addEventListener("keydown", activaMovimiento, false);
		document.addEventListener("keyup", desactivaMovimiento, false);	
		
		// localizamos el canvas
		canvas = document.getElementById("main-canvas");
		
		// Generamos el contexto de trabajo
		ctx = canvas.getContext("2d");
		
		imagenPikachu = new Image();
		imagenPikachu.src="../css/imagenes/sprites de prueba de pikachu.png";
		
		//Declaramos los tres pokemons
		pikachu = new Pokemon(Math.random() * 460, Y, VELOCIDADPIKACHU,imagenPikachu,205,205,5,5);
		
		const ARRAYPOKEMON = [pikachu];
		
		// Lanzamos la animación
		id= setInterval(pintaRectangulo, 1000/50);
		
		// Animación encargada de abrir y cerra la boca
		id = setInterval(generarPosiciones, 1000/100);
		
}
	
	