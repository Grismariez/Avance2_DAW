function init() {

    /*Crea el evento click del boton comentar*/
    document.getElementById('btncomentar').onclick = function () {

        crear_comentario();
        limpiar();
        
    }
}

/*Funcion para limpiar los input de los comentarios cuando se haya hecho*/
function limpiar() {
    document.getElementById("textnombre").value="";
    
    document.getElementById("textcontenido").value="";
}

/*Funcion creada con DOM para crear comentarios con los input del html*/
function crear_comentario() {


    /*Evalua los datos ingresados por teclado*/
    var contenedor = document.getElementById("Comentarios");
    var nombre = document.getElementById("textnombre").value;
    var mensaje = document.getElementById("textcontenido").value;
    var f = new Date();
    var fecha=f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();

    /*Verifica si el nombre o nickname solo usa letras con la validacion de validar nombre*/
       if (validarnombreyapellido(nombre)) {

                   var comentario = document.createElement("div");
        comentario.setAttribute("class","panel panel-default");
        var panel = document.createElement("div");
            panel.setAttribute("class","panel-body");
            var contenidopanel = document.createTextNode(nombre);
            var fnegrita = document.createElement("div");
            fnegrita.setAttribute("style","float: right;");
            var verfecha = document.createTextNode(fecha);
            fnegrita.appendChild(verfecha);
            var ftipo = document.createElement("div");
            ftipo.setAttribute("style","float: inline-block; text-align:center; margin:-20px auto;");
 

        panel.appendChild(contenidopanel);
        panel.appendChild(fnegrita);
        panel.appendChild(ftipo);
        comentario.appendChild(panel);
    
    
        var mostrar = document.createElement("div");
        mostrar.setAttribute("class", "panel-footer");
        var mostrarmensaje = document.createTextNode(mensaje);
        mostrar.appendChild(mostrarmensaje);

   
        comentario.appendChild(mostrar);

    document.getElementById("Comentarios").appendChild(comentario);
       }else{
            /*Si los datos son incorrectos imprime en pantalla un mensaje de error */    
        document.getElementById("comentariovalido").innerHTML = "Error, por favor ingrese un nombre valido";

        
       }

       if (validarnombreyapellido(nombre)==true) {
                        /*Si el usuario se equivoco pero corrigio los errores quita el mensaje de error y deja comentar*/
                        document.getElementById("comentariovalido").innerHTML = "";
             }
 

}

/*Funcion para validar el nombre mediante un expresion regular que solo acepta letras incluidas la Ñ */
function validarnombreyapellido(campo){
    var expresion = new RegExp("^[a-zA-ZÑñ ]*$", "g");
    return expresion.test(campo);
}


/**********************************LocalStorage*********************************/

function comenzar()
{
    var boton=document.getElementById("grabar");
    boton.addEventListener("click", itemNuevo, false);
}


function itemNuevo()
{
    var clave=document.getElementById("clave").value;
    var valor=document.getElementById("valor").value;
    localStorage.setItem(clave, valor);
    leer_mostrar(clave);


    document.getElementById("clave").value="";
    document.getElementById("valor").value="";

}


function leer_mostrar(clave)
{
    var zonadatos=document.getElementById("zonadatos");
    
    zonadatos.innerHTML='<div><button class="btn btn-danger" onclick="eliminarTodo()">Eliminar Todo</button></div>';

    
    

    for (i=0;i<localStorage.length;i++) {
        
        var clave=localStorage.key(i);
        var elvalor=localStorage.getItem(clave);
        zonadatos.innerHTML+='<div>Nickname: '+clave+'    '+'Puntaje: '+elvalor+'<br><button class="btn btn-warning" onclick="eliminarItem(\''+clave+'\')">Eliminar</button><div/>';
    }
    
}


function eliminarTodo(){

    if (confirm("¿Estas seguro?")) {

        localStorage.clear();

        leer_mostrar();
    };
}


function eliminarItem(clave){
    if (confirm("¿Estas seguro?")) {

    localStorage.removeItem(clave);
    leer_mostrar();
    
    };

}

window.addEventListener("load", comenzar,false);
window.onload = init;