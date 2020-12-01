window.onload = function() {
	let c = 0;
	let TAMAÑONAVEX = 40;
	let TAMAÑONAVEY = 40;
	const ARRAYPOKEMON = [];
	const ARRAYATAQUES = [];
	let cont = 0, numeroAleatorioIA;
	let puedoAtacar = true;
	
	const VELOCIDADPIKACHU = 3, VELOCIDADRAICHU = 5;
	
	const YMAQUINA = 35;
	const YJUGADOR = 425;   // posición inicial y del rectángulo
	let canvas;  // variable que referencia al elemento canvas del html
	let ctx;     // contexto de trabajo
	var id;      // id de la animación
	
	let xIzquierda, xDerecha, xIzquierdaMaquina, xDerechaMaquina;
	const TOPEDERECHA = 460, TOPEIZQUIERDA = 0, TOPEARRIBA = 0, TOPEABAJO = 500;
	
	
	var animacionComecocos = [[0,0],[32,0],[0,65],[32,65]]; // Posiciones del sprite donde recortar cada imagenn 
	//(0 cerrado derecha, 1 abierto derecha, 2 cerrado izquierda, 3 cerrado izquierda)
	/* provisional -> */ let posicion = 0;                                         // Posición del array 0, 1, 2, 3
	var ejecutarDerecha = true, ejecutarIzquierda = false;  // Control de cambio de posicion derecha - izquierda y viceversa

	let imagenPikachu, imagenRayoPikachu;

	function ObjetoBatalla(x_, y_,velocidad,imagen,posicionImagenX,posicionImagenY,anchoDibujo,altoDibujo,anchoImagen,altoImagen){
		this.x = x_;
		this.y = y_;
		this.velocidad = velocidad;
		this.arrayImagenes = [[posicionImagenX,posicionImagenY]];
		this.imagen = imagen;
		this.anchoDibujo = anchoDibujo;
		this.altoDibujo = altoDibujo;
		this.anchoImagen = anchoImagen;
		this.altoImagen = altoImagen;
	}
	
	//La variable pokemonDeUsuario será booleana
	function Ataque(x_, y_,velocidad,imagen,posicionEnDibujoX,posicionEnDibujoY,anchoDibujo,altoDibujo,anchoImagen,altoImagen,posicionImagenX2,posicionImagenY2){
		this.base = ObjetoBatalla;
		this.base(x_,y_,velocidad,imagen,posicionEnDibujoX,posicionEnDibujoY,anchoDibujo,altoDibujo,anchoImagen,altoImagen);
		this.arrayImagenes.push([posicionImagenX2,posicionImagenY2]);
	}

	Ataque.prototype = new ObjetoBatalla();

	function Pokemon(x_, y_,velocidad,imagen,posicionEnDibujoX,posicionEnDibujoY,anchoDibujo,altoDibujo,anchoImagen,altoImagen){
		this.base = ObjetoBatalla;
		this.base(x_, y_,velocidad,imagen,posicionEnDibujoX,posicionEnDibujoY,anchoDibujo,altoDibujo,anchoImagen,altoImagen);

		this.lanzarAtaque = function(){
			let rayoDeLaMuerte = new Ataque(this.x + 10,this.y,9,imagenRayoPikachu,0,0,35,80,20,45,35,0);
			ARRAYATAQUES.push(rayoDeLaMuerte);
		}
	}

	Pokemon.prototype = new ObjetoBatalla();

	ObjetoBatalla.prototype.generaPosicionArriba = function() {
		this.y = this.y - this.velocidad;	
	}

	ObjetoBatalla.prototype.generaPosicionDerecha = function() {
		
		this.x = this.x + this.velocidad;
		
		if (this.x > TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA;   
		}		
		
	}
	
	
	ObjetoBatalla.prototype.generaPosicionIzquierda = function() {
		
		this.x = this.x - this.velocidad;
		
		if (this.x < TOPEIZQUIERDA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEIZQUIERDA;
		}
		
	}
	
	ObjetoBatalla.prototype.pintarObjeto = function(){
		ctx.drawImage(this.imagen, // Imagen completa con todos los comecocos (Sprite)
		this.arrayImagenes[posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.arrayImagenes[posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.anchoDibujo, 		  // Tamaño X del comecocos que voy a recortar para dibujar
		this.altoDibujo,	      // Tamaño Y del comecocos que voy a recortar para dibujar
		this.x,      // Posicion x de pantalla donde voy a dibujar el comecocos recortado
		this.y,				  // Posicion y de pantalla donde voy a dibujar el comecocos recortado
		this.anchoImagen,		  // Tamaño X del comecocos que voy a dibujar
		this.altoImagen);       // Tamaño Y del comecocos que voy a dibujar
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, 500, 500);
        
		
		
		// Pintamos a Pokemon
		
		ARRAYPOKEMON[0].pintarObjeto();
		ARRAYPOKEMON[1].pintarObjeto();
		for(i in ARRAYATAQUES){
			ARRAYATAQUES[i].pintarObjeto();
		}
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
		
		for(i in ARRAYATAQUES){
			ARRAYATAQUES[i].generaPosicionArriba();
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
	
	function activaFuncionalidad(evt) {
		
		switch (evt.keyCode) {
			case 37: 
				xIzquierda = true;
				activarIzquierda();
			break;

			case 39:
				xDerecha = true;
				activarDerecha();
			break;				

			/*case 32:
				ARRAYPOKEMON[0].lanzarAtaque();
			break;*/
			
			default:
				
		}
	}
		
	function desactivaFuncionalidad(evt){
			
		switch (evt.keyCode) {
			case 37: 
				xIzquierda = false;
				desactivarIzquierda();
			break;
				
			case 39:
				xDerecha = false;
				desactivarDerecha();
			break;

			case 32:
				puedoAtacar = true;
			break;
					
			default:

		}	
	}
		
	function activarAtaque(event){
		if(puedoAtacar){
			switch (event.keyCode){
				case 32:
					ARRAYPOKEMON[0].lanzarAtaque();
					puedoAtacar = false;
				break;
			}
		}
	}

	function movimientoIA(){
		console.log('Cantidad de ataques en pantalla: ' + ARRAYATAQUES.length);
		numeroAleatorioIA = Math.round(Math.random());
		if(numeroAleatorioIA == 0){
			xDerechaMaquina = true;
			xIzquierdaMaquina = false;
		}else{
			xDerechaMaquina = false;
			xIzquierdaMaquina = true;
		}
	}

	function eliminarObjetosBatalla(){
		for(i in ARRAYATAQUES){
			if((ARRAYATAQUES[i].y < TOPEARRIBA - 35) || ARRAYATAQUES[i].y > TOPEABAJO){
				ARRAYATAQUES.splice(i,1);
			}
		}
	}
		
	document.addEventListener("keydown", activaFuncionalidad, false);
	document.addEventListener("keyup", desactivaFuncionalidad, false);
	document.addEventListener("keypress", activarAtaque,false);
	
	// localizamos el canvas
	canvas = document.getElementById("main-canvas");
	
	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");
	
	imagenPikachu = new Image();
	imagenPikachu.src="../css/imagenes/sprites de prueba de pikachu.png";
	imagenRayoPikachu = new Image();
	imagenRayoPikachu.src = '../css/imagenes/Prototipo-ataque-pikachu_pasado-por-photoshop.png';
	
	
	if(true){
		let pikachuJugador = new Pokemon(Math.random() * 460, YJUGADOR, VELOCIDADPIKACHU,imagenPikachu,205,205,40,40,40,40);
		ARRAYPOKEMON.push(pikachuJugador);
	}
	
	if(true){
		let pikachuIA = new Pokemon(Math.random() * 460, YMAQUINA, VELOCIDADPIKACHU,imagenPikachu,10,20,40,40,40,40);
		ARRAYPOKEMON.push(pikachuIA);
	}

	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/100);
	
	// Animación encargada de abrir y cerra la boca
	id = setInterval(generarPosiciones, 1000/100);

	setInterval(movimientoIA, 1000/3);

	setInterval(eliminarObjetosBatalla, 1000/5);
}

