window.onload = function (){
    let contEnviosFormulario = 0;
    let cookies = [];
    const NOMBRECOOKIE = 'Inicios';
    let comprobacionCookie = /^( )?Inicios=/;
    let respuestaConfirmacion = false;
    let formularioValido = true;
    const CLASEERROR = 'error';


    let formulario = document.getElementById('formulario');
    formulario.addEventListener('submit',comprobarFormulario,false);

    //Cada una de las direcciones de los elementos del html que necesitaremos
    inputNombre = document.getElementById('nombre');
    inputApellidos = document.getElementById('apellidos');
    inputEdad = document.getElementById('edad');
    inputDni = document.getElementById('nif');
    inputEmail = document.getElementById('email');
    selectProvincia = document.getElementById('provincia');
    inputFecha = document.getElementById('fecha');
    inputTelefono = document.getElementById('telefono');
    inputHora = document.getElementById('hora');

    //Localizamos el campo 'intentos' en el HTML
    divIntentos = document.getElementById('intentos');

    //Creamos un elemento 'p' que introduciremos en el div con id='intentos'
    pIntentos = document.createElement('p');
    
    /*Se comprueba que al menos tenga un carácter de la 'a' a la 'z' (ñ o carácteres con tildes no incluidos)*/
    comprobarApellidos = comprobarNombre = /^[a-z]+$/i;
    /*Comprueba que hay un dígito entre el 1 y el 9 y opcionalmente se pueden añadir uno o dos dígitos más*/
    comprobarEdad = /^[1-9]([0-9]{1,2})?$/;
    /*Comprobamos que el DNI contenga 8 dígitos, un guión(obligatorio) y un carácter entre la 'a' y la 'z' (ñ o carácteres con tildes no incluidos)*/
    comprobarDni = /^\d{8}-[a-z]$/i;
    /*Comprueba que se empiece la dirección con uno o más carácteres ASCII comprendidos entre el 32(espacio) y el 237(Ý) después de esto que contenga el '@' uno o más caráteres entre el rago ASCII ya mencionado luego un punto y que termine con dos, tre o cuatro carácteres entre la 'a' y la 'z' (ñ o carácteres con tildes no incluidos)*/
    comprobarEmail = /^[ -Ý]+@[ -Ý]*\.[a-z]{2,4}$/;
    /*Nos aseguramos que contenga al menos un dígito al principio de la fecha que continue con un guión '-' o un slash '/' que vuelva a introducir un dígito como mínimo después un guión o un slash después un uno o un dos seguido de  1 a tres dígitos mas*/
    comprobarFecha = /^[0-9]+(\/||-)[0-9]+(\/||-)[1-2][0-9]{3}$/;
    /*Comprobamos que el número comience por un 6 o un 7 y que le siguan 8 dígitos más (esta expresión regular esta formada para números de origen Español)*/
    comprobarTelefono = /^[6-7][0-9]{8}$/;
    /*Comprobamos que contenga uno a dos dígitos después dos puntos ':' y que termine con uno o dos dígitos*/
    comprobarHora = /^[0-9]{1,2}:[0-9]{1,2}$/;
    
    //Obtenemos la ruta del contenedor ('div') donde se almacerán los errores que se les mostrarán al usuario
    let contenedorErrores = document.getElementById('errores');
    
    //Creamos un elemento 'p' para cada expresarle al usuario cada uno de los errores
    let mensajeErrorNombre = document.createElement('p');
    mensajeErrorNombre.id = 'mensajeErrorNombre';
    let mensajeErrorApellidos = document.createElement('p');
    mensajeErrorApellidos.id = 'mensajeErrorApellidos';
    let mensajeErrorEdad = document.createElement('p');
    mensajeErrorEdad.id = 'mensajeErrorEdad';
    let mensajeErrorDni = document.createElement('p');
    mensajeErrorDni.id = 'mensajeErrorDni';
    let mensajeErrorEmail = document.createElement('p');
    mensajeErrorEmail.id = 'mensajeErrorEmail';
    let mensajeErrorProvincia = document.createElement('p');
    mensajeErrorProvincia.id = 'mensajeErrorProvincia'
    let mensajeErrorFecha = document.createElement('p');
    mensajeErrorFecha.id = 'mensajeErrorFecha';
    let mensajeErrorTelefono = document.createElement('p');
    mensajeErrorTelefono.id = 'mensajeErrorTelefono';
    let mensajeErrorHora = document.createElement('p');
    mensajeErrorHora.id = 'mensajeErrorHora';
    
    //Añadimos el evento 'onblur' para que cuando pierdan el foco el inputNombre o inputApellidos se pongan en mayúscula
    inputNombre.addEventListener('blur',ponerEnMayusculas,false);
    inputApellidos.addEventListener('blur',ponerEnMayusculas,false);
    
    //Añadimos un elemento 'p' para insertar delante de él los demás
    let nodoReferencia = document.createElement('p');
    nodoReferencia.setAttribute('hidden',null);
    contenedorErrores.appendChild(nodoReferencia);
    
    function comprobarFormulario(event){
        formularioValido = true;
        ++contEnviosFormulario;
        setCookie(NOMBRECOOKIE,contEnviosFormulario,1);
        
        cookies = document.cookie.split(';');
        
        
        if(comprobarHora.test(inputHora.value)){
            inputHora.className = '';
            mensajeErrorHora.remove();
        }else{
            asignarError(inputHora);
            contenedorErrores.insertBefore(mensajeErrorHora,contenedorErrores.firstChild);
            mensajeErrorHora.innerHTML = 'HORA DE VISITA: Las horas y los minutos deben ir separados por dos los puntos ":" ';
        }
        
        if(comprobarTelefono.test(inputTelefono.value)){
            inputTelefono.className = '';
            mensajeErrorTelefono.remove();
        }else{
            asignarError(inputTelefono);
            contenedorErrores.insertBefore(mensajeErrorTelefono,contenedorErrores.firstChild);
            mensajeErrorTelefono.innerHTML = 'TELÉFONO: El número de teléfono debe empezar por 6 o 7 y deben ser 9 números en total';
        }
        
        if(comprobarFecha.test(inputFecha.value)){
            inputFecha.className = '';
            mensajeErrorFecha.remove();
        }else{
            asignarError(inputFecha);
            contenedorErrores.insertBefore(mensajeErrorFecha,contenedorErrores.firstChild);
            mensajeErrorFecha.innerHTML = "FECHA NACIMIENTO: Debes separar con guiones '-' o con barras '/', y recuerda que el año debe tener cuatro números";
        }
        
        if(selectProvincia.value != 0){
            selectProvincia.className = '';
            mensajeErrorProvincia.remove();
        }else{
            asignarError(selectProvincia);
            contenedorErrores.insertBefore(mensajeErrorProvincia,contenedorErrores.firstChild);
            mensajeErrorProvincia.innerHTML = "PROVINCIA: Si pulsas sobre 'Seleccione Provincia' te saldrán opciones a elegir, tienes una de las provincias que te aparecen en la lista";
        }
        
        if(comprobarEmail.test(inputEmail.value)){
            inputEmail.className = '';
            mensajeErrorEmail.remove();
        }else{
            asignarError(inputEmail);
            contenedorErrores.insertBefore(mensajeErrorEmail,contenedorErrores.firstChild);
            mensajeErrorEmail.innerHTML = "EMAIL: Debes tener e-mail, asegúrate de haber introducido el '@' y el punto ' . '";
        }
        
        if(comprobarDni.test(inputDni.value)){
            inputDni.className = '';
            mensajeErrorDni.remove();
        }else{
            asignarError(inputDni);
            contenedorErrores.insertBefore(mensajeErrorDni,contenedorErrores.firstChild);
            mensajeErrorDni.innerHTML = "DNI: Cuidado porque debes escribir un guión '-' obligatoriamente después de los 8 números y a continuación la letra";
        }
        
        if(comprobarEdad.test(inputEdad.value) && inputEdad.value >= 18 && inputEdad.value <= 105){
            inputEdad.className = '';
            mensajeErrorEdad.remove();
        }else{
            asignarError(inputEdad);
            contenedorErrores.insertBefore(mensajeErrorEdad,contenedorErrores.firstChild);
            mensajeErrorEdad.innerHTML = 'EDAD: Solo se permiten números del 15 al 105, no se pueden escribir letras ni otro tipo de signos';
        }
        
        if(comprobarApellidos.test(inputApellidos.value)){
            inputApellidos.className = '';
            mensajeErrorApellidos.remove();
        }else{
            asignarError(inputApellidos);
            contenedorErrores.insertBefore(mensajeErrorApellidos,contenedorErrores.firstChild);
            mensajeErrorApellidos.innerHTML = "APELLIDOS: Introduce tus apellidos sin tildes y sin 'ñ' ni otros signos";
        }
        
        if(comprobarNombre.test(inputNombre.value)){
            inputNombre.className = '';
            mensajeErrorNombre.remove();
        }else{
            asignarError(inputNombre);
            contenedorErrores.insertBefore(mensajeErrorNombre,contenedorErrores.firstChild);
            mensajeErrorNombre.innerHTML = "NOMBRE: Tu nombre debe ir sin tildes ni 'ñ' ni otros signos";
        }
        
        //Mostrar cookie dentro de un p que está dentro del divIntentos, id='intentos'
        for(let i=0;i < cookies.length;++i){
            console.log(cookies[i]);
            if(comprobacionCookie.test(cookies[i])){
                /*Buscamos la posición donde se encuentra el más '=' en la cookie para generar a partir de ahí un subtring que mostraremos en pantalla*/
                pIntentos.innerHTML = 'Intentos de envío de formulario: ' + cookies[i].substring((cookies[i].search(/=/) + 1), (cookies[i].length));
            }
        }

        divIntentos.appendChild(pIntentos);
        
        if(!formularioValido){
            event.preventDefault();
        }else{
            //Creamos un mensaje de confirmación para el usuario y recogemos la respuesta 'true' o 'false'
            respuestaConfirmacion = confirm('Confirma que se envíen los datos?');

            if(!respuestaConfirmacion){
                event.preventDefault();
            }
        }
    }

    function asignarError(elemento){
        formularioValido = false;
        elemento.className = CLASEERROR;
        //A provincia no le ponemos foco ya que es un select
        if(elemento != selectProvincia){
            elemento.focus();
        }
    }
    
    function setCookie(cname,cvalue,exdays) {
        
        // Función que crea la cookie. Recibe como parámetro
        //
        //	cname  : Nombre de la cookie
        //    cvalue : Valor de la cookie
        //    exdays : Número de días que tendrá vigencia la cookie
        //
        
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        
    }
    
    function ponerEnMayusculas(){
        inputNombre.value = inputNombre.value.toUpperCase();
        inputApellidos.value = inputApellidos.value.toUpperCase();
    }
}