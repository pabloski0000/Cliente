window.onload = function(){
    var variable = 'hola';

    function escribir(){
        let titulo = document.createElement('h1');
        titulo.innerHTML = variable;
        document.body.appendChild(titulo);
    }

    escribir();
}