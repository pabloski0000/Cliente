window.onload = function() {
	const divVidaMaquina = document.getElementById('vidaMaquina');
	const divVidaJugador = document.getElementById('vidaJugador');
	let auxVidaJugador = 2000, auxVidaMaquina = 2000;
	const posicionEnArrayExplosion = [];
	let c = 0;
	let TAMAÑONAVEX = 40;
	let TAMAÑONAVEY = 40;
	const ARRAYPOKEMON = [];
	const ARRAYATAQUES = [];
	const ARRAYEXPLOSIONES = [];
	let cont = 0, numeroAleatorioIA;
	let puedoAtacar = true;
	let imagenExplosion;
	const VELOCIDADEXPLOSION = 0;
	let randomOIA;
	const VIDAPIKACHU = 2000;
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

	function ObjetoBatalla(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen){
		this.x = x_;
		this.y = y_;
		this.velocidad = velocidad;
		this.arrayBidimensionalPosiciones = arrayBidimensionalPosiciones;
		this.imagen = imagen;
		this.arrayBidimensionalDimensionesDibujo = arrayBidimensionalDimensionesDibujo;
		this.anchoImagen = anchoImagen;
		this.altoImagen = altoImagen;
		this.posicion = 0;
	}

	function Explosion(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen){
		this.base = ObjetoBatalla;
		this.base(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen);

		
		this.animacionExplosion = async function(aumentarPosicion){
			
			if(aumentarPosicion){
				++this.posicion;
			}
			
			if(this.posicion == this.arrayBidimensionalPosiciones.length){
				this.desaparecerExplosion();
			}
			
			await sleep(100);

			return this.animacionExplosion(true);
		}
	}
	
	Explosion.prototype = new ObjetoBatalla();
	
	Explosion.prototype.desaparecerExplosion = function(){
		console.log('Antes: ' + ARRAYEXPLOSIONES.length);
		ARRAYEXPLOSIONES.splice(0,1);
		console.log('Después: ' + ARRAYEXPLOSIONES.length);
	}
	
	//La variable pokemonDeUsuario será booleana
	function Ataque(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen,lanzadoPorJugador){
		this.base = ObjetoBatalla;
		this.base(x_,y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen);
		this.lanzadoPorJugador = lanzadoPorJugador;
	}

	Ataque.prototype = new ObjetoBatalla();

	function Pokemon(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen,vida,controladoPorJugador){
		this.base = ObjetoBatalla;
		this.base(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen);
		this.vida = vida;
		this.controladoPorJugador = controladoPorJugador;
	}
	
	Pokemon.prototype = new ObjetoBatalla();
	
	Pokemon.prototype.lanzarAtaque = function(){
		let rayoDeLaMuerte = new Ataque(this.x + 10,this.y,9,imagenRayoPikachu,[[0,0],[35,0]],[[35,80],[35,80]],20,45,this.controladoPorJugador);
		if(!rayoDeLaMuerte.lanzadoPorJugador){
			rayoDeLaMuerte.posicion = 1;
		}
		ARRAYATAQUES.push(rayoDeLaMuerte);
	}

	Pokemon.prototype.morir = function(){
		if(this.controladoPorJugador){
			//console.log('Ha ganado la IA');
		}else{
			//console.log('Ha ganado el jugador 1');
		}
	}

	Pokemon.prototype.atacado = function(){
		for(i in ARRAYATAQUES){
			if(!(ARRAYATAQUES[i].lanzadoPorJugador == this.controladoPorJugador)){
				if((ARRAYATAQUES[i].x + ARRAYATAQUES[i].anchoImagen >= this.x) && (ARRAYATAQUES[i].x < this.x + this.anchoImagen) && (ARRAYATAQUES[i].y > this.y) && (ARRAYATAQUES[i].y <= this.y + this.altoImagen)){
					let explosion = new Explosion(ARRAYATAQUES[i].x, ARRAYATAQUES[i].y, VELOCIDADEXPLOSION, imagenExplosion,[[63,1662],[24,1431],[18,1116],[0,797],[1,464],[16,189],[48,0]], [[245, 264],[245, 230],[245, 264],[245, 264],[245, 274],[245, 264],[245, 190]], 85, 85);
					ARRAYEXPLOSIONES.push(explosion);
					ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].animacionExplosion(false);
					ARRAYATAQUES.splice(i,1);
					this.vida -= 100;
					if(this.vida <= 0){
						this.morir();
					}
				}
			}
		}
	}

	ObjetoBatalla.prototype.generaPosicionArriba = function() {
		this.y = this.y - this.velocidad;

		/*for(i in ARRAYPOKEMON){
			if(this.lanzadoPorJugador == ARRAYPOKEMON[i].controladoPorJugador){
				if(this.x < ARRAYPOKEMON[i].x){
					this.x += (ARRAYPOKEMON[i].x - this.x) * (ARRAYPOKEMON[i].x - this.x) / 100;
				}else if(this.x > ARRAYPOKEMON[i].x){
					this.x -= (this.x -ARRAYPOKEMON[i].x) * (this.x - ARRAYPOKEMON[i].x) / 100;
				}
			}
		}*/
	}

	ObjetoBatalla.prototype.generaPosicionAbajo = function() {
		this.y = this.y + this.velocidad;	
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
		this.arrayBidimensionalPosiciones[this.posicion][0],    // Posicion X del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.arrayBidimensionalPosiciones[this.posicion][1],	  // Posicion Y del sprite donde se encuentra el comecocos que voy a recortar del sprite para dibujar
		this.arrayBidimensionalDimensionesDibujo[this.posicion][0], 		  // Tamaño X del comecocos que voy a recortar para dibujar
		this.arrayBidimensionalDimensionesDibujo[this.posicion][1],	      // Tamaño Y del comecocos que voy a recortar para dibujar
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

		/*console.log(ARRAYEXPLOSIONES.length);*/
		for(i in ARRAYEXPLOSIONES){
			ARRAYEXPLOSIONES[i].pintarObjeto();
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
			if(ARRAYATAQUES[i].lanzadoPorJugador){
				ARRAYATAQUES[i].generaPosicionArriba();
			}else{
				ARRAYATAQUES[i].generaPosicionAbajo();
			}
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

	Pokemon.prototype.esquivarAtaqueIA = function(){
		for(i in ARRAYATAQUES){
			if(ARRAYATAQUES[i].lanzadoPorJugador != this.controladoPorJugador){
				if((this.x + this.anchoImagen) > ARRAYATAQUES[i].x && this.x < ARRAYATAQUES[i].x){
					if((this.x + 40 - ARRAYATAQUES[i].x + ARRAYATAQUES[i].anchoImagen / 2) < (ARRAYATAQUES[i].x + ARRAYATAQUES[i].anchoImagen / 2 - this.x)){
						xDerechaMaquina = false;
						xIzquierdaMaquina = true;
					}else{
						xDerechaMaquina = true;
						xIzquierdaMaquina = false;
					}
				}
			}
		}
	}

	function movimientoIA(){
		randomOIA = Math.round(Math.random() * 1);

		switch(randomOIA){
			case 0:
				movimientoAleatorio();
			break;
				
			case 1:
				if(ARRAYPOKEMON[1].x < ARRAYPOKEMON[0].x){
					console.log('ir a la derecha');
					xDerechaMaquina = true;
					xIzquierdaMaquina = false;
				}else if(ARRAYPOKEMON[1].x > ARRAYPOKEMON[0].x){
					console.log('ir a la izquierda');
					xDerechaMaquina = false;
					xIzquierdaMaquina = true;
				}
			break;

			default:

		}



	}

	function movimientoAleatorio(){
		numeroAleatorioIA = Math.round(Math.random());
		if(numeroAleatorioIA == 0){
			xDerechaMaquina = true;
			xIzquierdaMaquina = false;
		}else{
			xDerechaMaquina = false;
			xIzquierdaMaquina = true;
		}
	}

	function disparoMaquina(){
		ARRAYPOKEMON[1].lanzarAtaque();
	}

	function comprobarAtaques(){
		for(i in ARRAYPOKEMON){
			ARRAYPOKEMON[i].atacado();
		}
	}

	function eliminarAtaqueDelArray(){
		for(i in ARRAYATAQUES){
			if((ARRAYATAQUES[i].y < TOPEARRIBA - 35) || ARRAYATAQUES[i].y > TOPEABAJO){
				ARRAYATAQUES.splice(i,1);
			}
		}
	}

	function actualizarVidaEnPantalla(){
		if(auxVidaJugador != ARRAYPOKEMON[0].vida){
			divVidaJugador.innerHTML = ARRAYPOKEMON[0].vida;
		}

		if(auxVidaJugador != ARRAYPOKEMON[1].vida){
			divVidaMaquina.innerHTML = ARRAYPOKEMON[1].vida;
		}
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
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
	imagenExplosion = new Image();
	imagenExplosion.src = '../css/imagenes/explosiones.png';
	
	
	if(true){
		let pikachuJugador = new Pokemon(Math.random() * 460, YJUGADOR, VELOCIDADPIKACHU,imagenPikachu,[[205,205]],[[40,40]],40,40,VIDAPIKACHU,true);
		ARRAYPOKEMON.push(pikachuJugador);
	}
	
	if(true){
		let pikachuIA = new Pokemon(Math.random() * 460, YMAQUINA, VELOCIDADPIKACHU,imagenPikachu,[[10,20]],[[40,40]],40,40,VIDAPIKACHU,false);
		ARRAYPOKEMON.push(pikachuIA);
	}

	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/100);
	
	// Animación encargada de abrir y cerra la boca
	id = setInterval(generarPosiciones, 1000/100);

	setInterval(movimientoIA, 1000/4);

	setInterval(eliminarAtaqueDelArray, 1000/5);

	setInterval(comprobarAtaques, 1000/200);

	setInterval(disparoMaquina, 1000/5);

	setInterval(actualizarVidaEnPantalla, 500);
}

