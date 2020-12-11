window.onload = function() {
	const divVidaMaquina = document.getElementById('vidaMaquina');
	const divVidaJugador = document.getElementById('vidaJugador');
	const audioDisparo = document.getElementById('audioDisparo');
	const audioExplosion = document.getElementById('audioExplosion');
	const ANCHOCANVAS = 500, ALTOCANVAS = 500;
	let auxVidaJugador = 2000, auxVidaMaquina = 2000;
	let siguienteEscudo, randomSalidaEscudo;
	const posicionEnArrayExplosion = [];
	let c = 0;
	let TAMAÑONAVEX = 40;
	let TAMAÑONAVEY = 40;
	const ARRAYPOKEMON = [];
	const ARRAYATAQUES = [];
	const ARRAYEXPLOSIONES = [];
	const ARRAYESCUDOS = [];
	let cont = 0, numeroAleatorioIA;
	let puedoAtacar = true, permisoDispararIA = true;
	let imagenExplosion;
	let randomOIA;
	let intervaloEscudo;
	const VIDAPIKACHU = 2000, VIDASOLDADO = 3000;
	const VELOCIDADEXPLOSION = 0;
	const VELOCIDADPIKACHU = 3, VELOCIDADRAICHU = 5;
	const VELOCIDADATAQUERAYODELAMUERTE = 9;
	let yEscudo;
	const YMAQUINA = 35, YJUGADOR = 425;   // posiciones y iniciales
	const XESCUDO = -ANCHOCANVAS / 10 - 1;
	let canvas;  // variable que referencia al elemento canvas del html
	let ctx;     // contexto de trabajo
	var id;      // id de la animación
	let sumarY = 0;
	let eleccionPersonaje;
	let xIzquierda, xDerecha, xIzquierdaMaquina, xDerechaMaquina;
	const TOPEDERECHA = 500, TOPEIZQUIERDA = 0, TOPEARRIBA = 0, TOPEABAJO = 500;
	
	eleccionPersonaje = parseInt(prompt('Personaje a elegir:'));
	
	var animacionComecocos = [[0,0],[32,0],[0,65],[32,65]]; // Posiciones del sprite donde recortar cada imagenn 
	//(0 cerrado derecha, 1 abierto derecha, 2 cerrado izquierda, 3 cerrado izquierda)
	/* provisional -> */ let posicion = 0;                                         // Posición del array 0, 1, 2, 3
	var ejecutarDerecha = true, ejecutarIzquierda = false;  // Control de cambio de posicion derecha - izquierda y viceversa

	let imagenPikachu, imagenRayoPikachu, imagenSoldado;

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

	ObjetoBatalla.prototype.animacionGenerica = async function(posicionEmpezarAnimacion, posicionTerminarAnimacion, milisegundosEntreFrames){
		if(posicionEmpezarAnimacion <= posicionTerminarAnimacion){
			this.posicion = posicionEmpezarAnimacion;
			await sleep(milisegundosEntreFrames);
			return this.animacionGenerica(this.posicion + 1, posicionTerminarAnimacion, milisegundosEntreFrames);
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
		
		if (this.x + this.anchoImagen >= TOPEDERECHA) {
			
			// If at edge, reset ship position and set flag.
			this.x = TOPEDERECHA - this.anchoImagen;   
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

	function Explosion(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen){
		this.base = ObjetoBatalla;
		this.base(x_, y_,velocidad,imagen,arrayBidimensionalPosiciones,arrayBidimensionalDimensionesDibujo,anchoImagen,altoImagen);
		this.audio = audioExplosion;

		//Es asíncrona por la necesidad de ejecutar la función sleep para cada objeto por separado
		this.animacionExplosion = async function(posicionEmpezarAnimacion, posicionTerminarAnimacion, milisegundosEntreFrames){
			if(posicionEmpezarAnimacion <= posicionTerminarAnimacion){
				this.posicion = posicionEmpezarAnimacion;
				await sleep(milisegundosEntreFrames);
				return this.animacionExplosion(this.posicion + 1, posicionTerminarAnimacion, milisegundosEntreFrames);
			}else{
				this.desaparecerExplosion();
			}
	
			/*if(this.posicion == 0){
				audioExplosion.currentTime = 0.3;
				audioExplosion.play();
			}
	
			if(aumentarPosicion){
				++this.posicion;
			}
			
			if(this.posicion == this.arrayBidimensionalPosiciones.length){
				this.desaparecerExplosion();
			}
			
			await sleep(100);
	
			return this.animacionExplosion(true);*/
		}
	}

	
	Explosion.prototype = new ObjetoBatalla();

	Explosion.prototype.audio = audioExplosion;
	
	Explosion.prototype.desaparecerExplosion = function(){
		ARRAYEXPLOSIONES.splice(0,1);
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
		if(!this.controladoPorJugador){
			this.animacionGenerica(0, 1, 200);
		}else{
			//Nada de momento
		}
		sumarY = this.altoImagen;
		if(this.controladoPorJugador){
			sumarY = -sumarY;
		}

		let rayoDeLaMuerte = new Ataque(this.x + 10,this.y + sumarY,VELOCIDADATAQUERAYODELAMUERTE,imagenRayoPikachu,[[0,1],[35,0]],[[36,80],[35,80]],20,45,this.controladoPorJugador);
		if(!rayoDeLaMuerte.lanzadoPorJugador){
			rayoDeLaMuerte.posicion = 1;
		}
		ARRAYATAQUES.push(rayoDeLaMuerte);
		audioDisparo.currentTime = 0.05;
		audioDisparo.play();
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
				if(this.controladoPorJugador){
					if(ARRAYATAQUES[i].y + ARRAYATAQUES[i].altoImagen >= this.y){
						if(ARRAYATAQUES[i].x + ARRAYATAQUES[i].anchoImagen >= this.x && ARRAYATAQUES[i].x <= this.x + this.anchoImagen){
							let explosion = new Explosion(ARRAYATAQUES[i].x, ARRAYATAQUES[i].y, VELOCIDADEXPLOSION, imagenExplosion,[[63,1662],[24,1431],[18,1116],[0,797],[1,464],[16,189],[48,0]], [[245, 264],[245, 230],[245, 264],[245, 264],[245, 274],[245, 264],[245, 190]], 85, 85);
							ARRAYEXPLOSIONES.push(explosion);
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].animacionExplosion(0, ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].arrayBidimensionalPosiciones.length - 1, 100);
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].audio.currentTime = 0;
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].audio.play();
							ARRAYATAQUES.splice(i,1);
							this.vida -= 100;
							if(this.vida <= 0){
								this.morir();
							}
						}
					}
				}else{
					if(ARRAYATAQUES[i].y <= this.y + this.altoImagen){
						if((ARRAYATAQUES[i].x + ARRAYATAQUES[i].anchoImagen >= this.x) && (ARRAYATAQUES[i].x <= this.x + this.anchoImagen)){
							let explosion = new Explosion(ARRAYATAQUES[i].x, ARRAYATAQUES[i].y, VELOCIDADEXPLOSION, imagenExplosion,[[63,1662],[24,1431],[18,1116],[0,797],[1,464],[16,189],[48,0]], [[245, 264],[245, 230],[245, 264],[245, 264],[245, 274],[245, 264],[245, 190]], 85, 85);
							ARRAYEXPLOSIONES.push(explosion);
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].animacionExplosion(0, ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].arrayBidimensionalPosiciones.length - 1, 100);
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].audio.currentTime = 0;
							ARRAYEXPLOSIONES[ARRAYEXPLOSIONES.length - 1].audio.play();
							ARRAYATAQUES.splice(i,1);
							this.vida -= 100;
							if(this.vida <= 0){
								this.morir();
							}
						}
					}
				}
			}
		}
	}
	
	function pintaRectangulo() {
		
		// borramos el canvas
		ctx.clearRect(0, 0, ANCHOCANVAS, ALTOCANVAS);
		
		
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

		for(i in ARRAYESCUDOS){
			ARRAYESCUDOS[i].pintarObjeto();
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

	Pokemon.prototype.esquivarAtaque = function(){
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

	Pokemon.prototype.permisoDisparar = function(){
		if(Math.abs((this.x + this.anchoImagen) - (ARRAYPOKEMON[0].x + ARRAYPOKEMON[0].anchoImagen)) <= ANCHOCANVAS / 4){
			permisoDispararIA = true;
		}else{
			permisoDispararIA = false;
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
					xDerechaMaquina = true;
					xIzquierdaMaquina = false;
				}else if(ARRAYPOKEMON[1].x > ARRAYPOKEMON[0].x){
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
		if(permisoDispararIA){
			ARRAYPOKEMON[1].lanzarAtaque();
		}
	}

	function generarEscudo(){
		console.log('Escudo generado');
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

	function generarEscudo(){
		intervaloEscudo = Math.random() * 5000;
		randomSalidaEscudo = Math.floor(Math.random * 2);

		switch(randomSalidaEscudo){
			case 0:
				yEscudo = 200;
				break;

			case 1:
				yEscudo = 400;
				break;

			default:
		}

		setTimeout(function () {
			let escudo = ObjetoBatalla(XESCUDO, yEscudo, 2, imagenPikachu, [[0,555]], [[100,130]], 40, 50);
			ARRAYESCUDOS.push(escudo);
		}, intervaloEscudo);
	}
		
	document.addEventListener("keydown", activaFuncionalidad, false);
	document.addEventListener("keyup", desactivaFuncionalidad, false);
	document.addEventListener("keypress", activarAtaque,false);
	
	// localizamos el canvas
	canvas = document.getElementById("main-canvas");
	
	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");
	
	imagenPikachu = new Image();
	imagenPikachu.src="../css/imagenes/sprites-pikachu.png";
	imagenSoldado = new Image();
	imagenSoldado.src = "../css/imagenes/animacion_soldado.png";
	imagenRayoPikachu = new Image();
	imagenRayoPikachu.src = '../css/imagenes/Prototipo-ataque-pikachu_pasado-por-photoshop.png';
	imagenExplosion = new Image();
	imagenExplosion.src = '../css/imagenes/explosiones.png';
	
	if(true){
		let pikachuJugador = new Pokemon(Math.random() * 460, YJUGADOR, VELOCIDADPIKACHU,imagenPikachu,[[0,555]],[[100,130]],40,50,VIDAPIKACHU,true);
		ARRAYPOKEMON.push(pikachuJugador);
		divVidaJugador.innerHTML = ARRAYPOKEMON[0].vida;
	}


	switch (eleccionPersonaje) {
		case 1:
			break;

		case 2:
			let pikachuIA = new Pokemon(Math.random() * 460, YMAQUINA, VELOCIDADPIKACHU,imagenPikachu,[[0,-19]],[[100,130]],40,50,VIDAPIKACHU,false);
			ARRAYPOKEMON.push(pikachuIA);
			divVidaMaquina.innerHTML = ARRAYPOKEMON[1].vida;
			break;
			
		case 3:
			//Posiciones para ataque: 0 a 1;
			let soldadoIA = new Pokemon(Math.random() * 460, YMAQUINA, VELOCIDADPIKACHU,imagenSoldado,[[49,575],[49,742],[487,575],[650,575],[815,575]],[[100,147],[100,147],[100,147],[100,147],[100,147]],40,50,VIDASOLDADO,false);
			ARRAYPOKEMON.push(soldadoIA);
			divVidaMaquina.innerHTML = ARRAYPOKEMON[1].vida;
			break;
	
		default:
			break;
	}

	


	// Lanzamos la animación
	id= setInterval(pintaRectangulo, 1000/100);
	
	// Animación encargada de abrir y cerra la boca
	id = setInterval(generarPosiciones, 1000/100);

	setInterval(movimientoIA, 1000/4);

	setInterval(eliminarAtaqueDelArray, 1000/5);

	setInterval(function(){ ARRAYPOKEMON[1].permisoDisparar(); }, 1000/10);

	setInterval(disparoMaquina, 1000/8);
	
	setInterval(comprobarAtaques, 1000/200);
	
	setInterval(actualizarVidaEnPantalla, 500);

	idIntervaloEscudo = setTimeout(generarEscudo, 1000);
}

