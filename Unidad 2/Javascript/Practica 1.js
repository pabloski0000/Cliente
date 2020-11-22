window.onload = function(){
    var color = 'color1';
    const checkearElemento = /seleccionado$/;
    var activado = false;
    
    //Creamos la llamada a una función diferente con cada una de las tabletas de color
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[0].onclick = clickPrimerElemento;
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[1].onclick = clickSegundoElemento;
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[2].onclick = clickTercerElemento;
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[3].onclick = clickCuartoElemento;
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[4].onclick = clickQuintoElemento;
    document.getElementById('paleta').getElementsByTagName('tr')[0].getElementsByTagName('td')[5].onclick = clickSextoElemento;

    //Creamos una tabla sobre la que posteriormente pintaremos
    var tablero = document.createElement('table');
    tablero.className = 'tablerodibujo';
    tablero.addEventListener('click',activarDesactivar,false);
    document.getElementById('zonadibujo').appendChild(tablero); //Y la ponemos como hija de un div con id = 'zonadibujo'

    let tituloTablero = document.createElement('caption');
    tituloTablero.innerHTML = 'Haga CLICK en cualquier celda para activar/desactivar el Pincel:';

    tablero.appendChild(tituloTablero);
    
    //Creamos los tr y td de la tabla (tablero)
    for(let i = 0;i < 30;++i){
        var fila = document.createElement('tr');
        tablero.appendChild(fila);
        for(let j = 0;j < 30;++j){
            let pixel = document.createElement('td');
            pixel.addEventListener('mouseover',pintar,false);

            if(i < 2 || i > 27 || j < 2 || j > 27 || j == i || j + i == 29){
                //Aparte del color que le corresponde le añadimos una clase que se usará para diferenciar a este tipo de píxeles del resto
                pixel.className = 'tablerodibujo color3 noPintar';
            }else{
                pixel.className = 'tablerodibujo color6';
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            fila.appendChild(pixel);
        }
    }

    //Cada uno de los métodos que se activaran cada vez que pulsemos un td de la paleta de colores
    function clickPrimerElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color1';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color1 seleccionado';
        }
    }

    function clickSegundoElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color2';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color2 seleccionado';
        }
    }

    function clickTercerElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color3';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color3 seleccionado';
        }
    }

    function clickCuartoElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color4';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color4 seleccionado';
        }
    }

    function clickQuintoElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color5';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color5 seleccionado';
        }
    }

    function clickSextoElemento(){
        if(!checkearElemento.test(this.className)){
            color = 'color6';
            
            for(let i = 0;i < 6;++i){ //Quitamos la clase seleccionado del td
                if(checkearElemento.test(document.getElementById('paleta').getElementsByTagName('td')[i].className)){
                    document.getElementById('paleta').getElementsByTagName('td')[i].className = 'color' + (i + 1);
                }
            }
            //Le añadimos la clase seleccionado al td que más recientemente haya sido clickado
            this.className = 'color6 seleccionado';
        }
    }

    //Función que se ejecutará cada vez que pasemos por encima de alguno de los píxeles del tablero
    function pintar(){
        if(activado && !/noPintar$/.test(this.className)){
            this.className = 'tablerodibujo ' + color;
        }
    }

    //Cada vez que hagamos click dentro del tablero (table) se activará esta función
    function activarDesactivar(){
        activado = !activado;
    }
}