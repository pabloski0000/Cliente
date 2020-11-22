// UT2 cookies

window.onload = function() { 


	let canvas;
	let arrayRectangulos = [];
	let ctx;
	let final;
	const CANTIDADRECTANGULOS = 10000, Y = 0;
	let velocidad, velocidadMenor = Infinity, rectanguloMenorVelocidad, mostrarPorPantalla = false;

	function Rectangulo(x_,y_,velocidad_){
		this.x = x_;
		this.y = y_;
		this.velocidad = velocidad_;

		this.incrementar = function() {
			this.y = this.y + this.velocidad;
		}
	}

	function generaDatos() {
		
		final = false;
		
		// Generamos las coordenadas iniciales y comprobamos el que irá más lento
		for(let i = 0;i < CANTIDADRECTANGULOS;++i){
			
			x = Math.random() * (600 - 25);
			
			velocidad = Math.random() * 10;
			
			if(velocidad < velocidadMenor){
				velocidadMenor = velocidad;
				rectanguloMenorVelocidad = i;
			}
			
			let rectangulo = new Rectangulo(x,Y,velocidad);

			arrayRectangulos.push(rectangulo);
		}
	}

	function generaAnimación() {
		
		// aproximadamente a 24 frames por segundo (fps)
		// Limpiamos el canvas, eliminando el contenido
		// desde el punto (0, 0) al punto (600, 400)
		ctx.clearRect(0, 0, 600, 400);

		// Generamos nuevas coordenadas
		// Que basicamente representan un desplazamiento lineal
		// Y dibujamos nuestra figura
		for(let i = 0;i < arrayRectangulos.length;++i){
			ctx.fillRect(arrayRectangulos[i].x,arrayRectangulos[i].y, 25, 25);
		}

		for(let i = 0;i < arrayRectangulos.length;++i){
			if (arrayRectangulos[i].y>400) {
			   arrayRectangulos.splice(i,1);
			   console.log('Quedan ' + arrayRectangulos.length + ' objetos');
			}else{
				arrayRectangulos[i].incrementar();
			}
	
			if (final) {
	
			   clearInterval(id);
	
			}
		}

		if(mostrarPorPantalla){
		}
	}

	// Obtenemos una referencia al canvas
	canvas = document.getElementById('miCanvas');

	// Y a su contexto 2d
	ctx = canvas.getContext('2d');

	generaDatos();
	
	var id = setInterval(generaAnimación, 1000/24);

	generaAnimación();

}
