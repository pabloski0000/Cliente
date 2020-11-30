window.onload = function() {
	
	let TAMAÑONAVEX = 40;
	let TAMAÑONAVEY = 40;
	const ARRAYPOKEMON = [];
	let cont = 0, numeroAleatorioIA;
	
	const VELOCIDADPIKACHU = 3, VELOCIDADRAICHU = 5;
	
	const YMAQUINA = 35;
	const Y = 425;   // posición inicial y del rectángulo
	let canvas;  // variable que referencia al elemento canvas del html
	let ctx;     // contexto de trabajo
	var id;      // id de la animación
	
	let xIzquierda, xDerecha, xIzquierdaMaquina, xDerechaMaquina;
	const TOPEDERECHA = 460, TOPEIZQUIERDA = 0;
	
	
	var animacionComecocos = [[0,0],[32,0],[0,65],[32,65]]; // Posiciones del sprite donde recortar cada imagenn 
	//(0 cerrado derecha, 1 abierto derecha, 2 cerrado izquierda, 3 cerrado izquierda)
	var posicion=0;                                         // Posición del array 0, 1, 2, 3
	var ejecutarDerecha = true, ejecutarIzquierda = false;  // Control de cambio de posicion derecha - izquierda y viceversa

	let imagenPikachu, imagenRayoPikachu;

	function ObjetoBatalla(x_, y_,imagen,posicionImagenX,posicionImagenY){
		this.x = x_;
	    this.y = y_;
		this.posicionImagenX = posicionImagenX;
		this.posicionImagenY = posicionImagenY;
		this.imagen = imagen;
	}
	
	//La variable pokemonDeUsuario será booleana
	function Pokemon (x_, y_,velocidad,imagen,posicionImagenX,posicionImagenY){
		this.base = ObjetoBatalla;
		this.base(x_,y_,imagen,posicionImagenX,posicionImagenY);
		this.velocidad = velocidad;
	}

	Pokemon.prototype = new ObjetoBatalla();
	
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
		this.posicionImagenX,    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.posicionImagenY,	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
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
        
		
		
		// Pintamos a Pokemon
		
		ARRAYPOKEMON[0].pintarPokemon();
		ARRAYPOKEMON[1].pintarPokemon();
		/*rayoDeLaMuerte.pintar();*/
	}
	
	function generarPosiciones(){
		
		if (xDerecha==true) {
			
			ARRAYPOKEMON[0].generaPosicionDerecha();
			
		}
		
		if (xIzquierda ==true)  {
			
			ARRAYPOKEMON[0].generaPosicionIzquierda();
			
		}
		
		if(xDerechaMaquina){
			ARRAYPOKEMON[1].generaPosicionDerecha();
		}
		
		if(xIzquierdaMaquina){
			ARRAYPOKEMON[1].generaPosicionIzquierda();
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
		
		ejecutarIzquierda = true;
		
	}
	function activarDerecha() {
		
		// Solo la primera vez se ejecutara posicion = 0. De esta forma conseguimos
        // que aunque pulsemos repetidamente a la derecha solo se actualice la posicion
        // de acceso al array la primera vez		
		
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

		function movimientoIA(){
		numeroAleatorioIA = Math.round(Math.random());
		console.log(numeroAleatorioIA);
		if(numeroAleatorioIA == 0){
			xDerechaMaquina = true;
			xIzquierdaMaquina = false;
		}else{
			xDerechaMaquina = false;
			xIzquierdaMaquina = true;
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
	imagenRayoPikachu = new Image();
	imagenRayoPikachu.src = '../css/imagenes/sprites de pikachu_batalla.png';
	
	let rayoDeLaMuerte = new ObjetoBatalla(0,0,imagenRayoPikachu,0,0);
	
	//Declaramos los tres pokemons
	let pikachu = new Pokemon(Math.random() * 460, Y, VELOCIDADPIKACHU,imagenPikachu,205,205);
	let pikachuIA = new Pokemon(Math.random() * 460, YMAQUINA, VELOCIDADPIKACHU,imagenPikachu,10,20);
	
	ARRAYPOKEMON.push(pikachu);
	ARRAYPOKEMON.push(pikachuIA);
	
	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/100);
	
	// Animación encargada de abrir y cerra la boca
	id = setInterval(generarPosiciones, 1000/100);

	/*setInterval(movimientoIA, 1000/3);*/
}

