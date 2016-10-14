
window.onload = init;
function init (){


/*Crea el evento submit de el boton enviar del formulario*/
document.getElementById("enviar").onsubmit= function (){
	validacion();
	limpiar();


}

}//init

/*Funcion que nos servira para validar todos los campos de los textbox que querramos*/
function validacion(){

	/*Recibe en una variable los textos ingresados en los input del formulario*/
	nombre = document.getElementById("nombre").value;
	pais = document.getElementById("pais").value;
	correo = document.getElementById("correo").value;
	
	/*Verifica si el nombre esta vacio y si esta correctamente escrito segun la expresion regular*/
	if( nombre == null || nombre == 0 || !(validar_letrasyespacios(nombre)) ) {

		document.getElementById("nombrevalido").innerHTML = "Error, por favor ingrese un nombre valido";
		limpiar();
		return false;

		if (validar_letrasyespacios(nombre)==true) {

                        document.getElementById("nombrevalido").innerHTML = "";
             }
 
	}
	/*Verifica si el pais esta vacio y si esta correctamente escrito segun la expresion regular*/
	else if (pais == null || pais.length == 0 || !(validar_letrasyespacios(pais))) {

		document.getElementById("paisvalido").innerHTML = "Error, por favor ingrese un nombre de pais valido";
		limpiar();
		if (validar_letrasyespacios(nombre)==true) {

                        document.getElementById("paisvalido").innerHTML = "";
             }
		return false;
	}
	/*Verifica si el e-mail esta vacio y si esta correctamente escrito segun la expresion regular*/
	else if (!(validar_email(correo))) {

		document.getElementById("correovalido").innerHTML = "Error, por favor ingrese un correo valido";
		limpiar();
		if (validar_email(nombre)==true) {

                        document.getElementById("correovalido").innerHTML = "";
             }
		return false;

	}


	/*Si el usuario ha escrito todos los campos correctamente le muestra un alert diciendo que los campos han sido enviados correctamente*/
	alert('Su mensaje ha sido enviado correctamente');
	return true;



	

}//funcion validacion

/*Funcion para limpiar los textbox del formulario*/
function limpiar(){
	document.getElementById("nombre").value="";
	document.getElementById("pais").value="";
	document.getElementById("correo").value="";
	
}

/*Funcion donde se encuentra la expresion regular que valida el nombre y el pais*/
function validar_letrasyespacios(campo){
	var expresion = new RegExp("^[a-zA-ZÑñ ]*$", "g");
	return expresion.test(campo);
}


/*Funcion donde se encuentra la expresion regular que valida el e-mail*/
function validar_email(campo){
var email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
return email.test(campo);
}
