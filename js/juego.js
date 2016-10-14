var TECLA_ARRIBA    = 38,
	TECLA_ABAJO     = 40,
	TECLA_DERECHA   = 39,
	TECLA_IZQUIERDA = 37,
	CANVAS_WIDTH    = 814,
	CANVAS_HEIGHT   = 600;

var dragonball = new Array() ;


//Creando el canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.body.appendChild(canvas);

// Imagen de Fondo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/tablero.jpg";

// Imagen de Goku
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
}
heroImage.src = "img/goku.gif";

// Imagen del cemillas  
var cemillasReady = false;
var cemillasImage = new Image();
cemillasImage.onload = function () {
	cemillasReady = true;
};


// Imagen de cemillas1
var cemillas1Ready = false;
var cemillas1Image = new Image();
cemillas1Image.onload = function (){//deadMonsterImage.onload = function (){
	cemillas1Ready = true;
};



// Objetos del juego
var hero = {
	speed: 128 // movimientos en pixeles por segundo
};
var cemillas = {
	speed: 8 //movimientos en pixeles por segundo
};

var monstersCaught = 0;


// control de teclado
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Limpia el juego cuando el mounstro captura al principe
var start = true;

var reset = function () {
	if(start){
		hero.x = canvas.width / 2;
		hero.y = canvas.height / 2;		
		start = false;
	}

	//
	cemillas.x = 32 + (Math.random() * (canvas.width - 64));
	cemillas.y = 32 + (Math.random() * (canvas.height - 64));
	cemillas.speed = (cemillas.speed > 100) ? (cemillas.speed) : (cemillas.speed + monstersCaught);

};



// Actualizar los objetos del juego
var update = function (modifier) {
	if (TECLA_ARRIBA  in keysDown) { // Player holding up
		hero.y = (hero.y > 0) ? (hero.y - hero.speed * modifier) : canvas.height - 32;
		cemillas.y =  (cemillas.y > 0) ? (cemillas.y - cemillas.speed * modifier) : canvas.height - 32;

	}if(TECLA_ABAJO in keysDown){
		hero.y = (hero.y + hero.speed * modifier) %  canvas.height;
		cemillas.y = (cemillas.y  + cemillas.speed * modifier) % canvas.height;


	}if(TECLA_IZQUIERDA in keysDown){
			hero.x = (hero.x > 0) ? (hero.x - hero.speed * modifier) : canvas.width -32;
			cemillas.x = (cemillas.x > 0) ? (cemillas.x - cemillas.speed * modifier) : canvas.width - 32;
	}
	if(TECLA_DERECHA in keysDown){
			hero.x = (hero.x + hero.speed * modifier) % canvas.width;
			cemillas.x = (cemillas.x + cemillas.speed * modifier) % canvas.width;
	}

	// Verifica si el heroe toca
	if (
		hero.x <= (cemillas.x + 32)
		&& cemillas.x <= (hero.x + 32)
		&& hero.y <= (cemillas.y + 32)
		&& cemillas.y <= (hero.y + 32)
	) {
		++monstersCaught;
		dragonball.push({"x": cemillas.x, "y": cemillas.y});
		reset();
	}
};


// Dibujando todo
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(cemillas1Ready){
		for (deadMonster in dragonball){
			ctx.drawImage(cemillas1Image, dragonball[deadMonster].x , dragonball[deadMonster].y)
		}
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (cemillasReady) {
		ctx.drawImage(cemillasImage, cemillas.x, cemillas.y);
	}

	// Score
	
};

// ciclo principal del juego
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	
	requestAnimationFrame(main);
};

reset();
var then =  Date.now();
setInterval(main, 1);

