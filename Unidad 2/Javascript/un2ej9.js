window.onload = function(){
    //Preguntar a Víctor para pasar por parámetro una variable/array a un evento (función en javascript)
    var errores = [];

    let mensajeErrorNombre = document.createElement('p');
    document.body.appendChild(mensajeErrorNombre);
    let mensajeErrorApellidos = document.createElement('p');
    document.body.appendChild(mensajeErrorApellidos);
    let mensajeErrorEdad = document.createElement('p');
    document.body.appendChild(mensajeErrorEdad);
    let mensajeErrorMatricula = document.createElement('p');
    document.body.appendChild(mensajeErrorMatricula);
    let mensajeErrorProvincia = document.createElement('p');
    document.body.appendChild(mensajeErrorProvincia);
    
    let boton = document.getElementById('formulario');
    boton.addEventListener('submit',comprobacion,true);

    function comprobacion(event){
        
        let formularioValido = true;
        let comprobacionNombre = /[a-z]+/i;
        let comprobacionApellidos = /[a-z]{1}(\s[a-z]+)?/i;
        let comprobacionEdad = /[0-9]{1,3}/;
        let comprobacionMatricula = /[0-9]{4}(\s)?[a-z]{3}/i;
        let inputNombre = document.getElementById('nombre');
        let labelApellidos = document.getElementById('formulario').getElementsByTagName('label')[1];
        let inputApellidos = document.getElementById('apellidos');
        let inputEdad = document.getElementById('edad');
        let inputMatricula = document.getElementById('matricula');
        let inputProvincia = document.getElementById('provincia');
        
        if(!comprobacionNombre.test(inputNombre.value)){
            formularioValido = false;
            inputNombre.className = 'error';
            mensajeErrorNombre.innerHTML = 'Debes introducir un nombre sin carácteres especiales ni tildes';
        }else{
            inputNombre.className = '';
            mensajeErrorNombre.innerHTML = '';
        }
        
        if(!comprobacionApellidos.test(inputApellidos.value)){
            formularioValido = false;
            inputApellidos.className = 'error';
            mensajeErrorApellidos.innerHTML = 'Debes un introducir tus apellidos sin caracteres especiales ni tildes';
        }else{
            inputApellidos.className = '';
            mensajeErrorApellidos.innerHTML = '';
        }
        
        if(!(comprobacionEdad.test(inputEdad.value) && inputEdad.value >= 18 && inputEdad.value <= 105)){
            formularioValido = false;
            inputEdad.className = 'error';
            mensajeErrorEdad.innerHTML = 'Debes un introducir un número entre los 15 y los 108 años';
        }else{
            inputEdad.className = '';
            mensajeErrorEdad.innerHTML = '';
        }

        if(!comprobacionMatricula.test(inputMatricula.value)){
            formularioValido = false;
            inputMatricula.className = 'error';
            mensajeErrorMatricula.innerHTML = 'Comprueba la matrícula, recuerda que debe llevar 4 números y 3 letras';
        }else{
            inputMatricula.className = '';
            mensajeErrorMatricula.innerHTML = '';
        }

        if(inputProvincia.value == 0){
            formularioValido = false;
            mensajeErrorProvincia.innerHTML = 'Debes escoger una provincia (no vale la primera)';
        }else{
            mensajeErrorProvincia.innerHTML = '';
        }
        
        if(!formularioValido){
            event.preventDefault();
        }
    }

}