window.onload = function(){

    document.getElementById('crearTabla').addEventListener('click',crearTabla,false);

    function crearTabla(){
        let numeroFilas = document.getElementById('filas').value;
        let numeroColumnas = document.getElementById('columnas').value;

        if(document.getElementsByTagName('table').length > 0){
            document.getElementsByTagName('table')[0].remove();
        }

        let nuevaTabla = document.createElement('table');
        nuevaTabla.setAttribute('id','main-table');
        nuevaTabla.setAttribute('class','tabla');
        document.body.appendChild(nuevaTabla);

        for(let i = 0;i < numeroFilas;++i){
            let fila = document.createElement('tr');
            fila.setAttribute('class','error');
            let direccionFila = document.getElementById('main-table').appendChild(fila);

            for(let j = 0;j < numeroColumnas;++j){
                let columna = document.createElement('td');
                columna.setAttribute('class','error');
                columna.innerHTML = i + '' + j;
                direccionFila.appendChild(columna);
            }
        }
    }
}