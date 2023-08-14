
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const width = window.innerWidth,
	height = window.innerHeight
canvas.width = width
canvas.height = height
let radius = 50

var frameUrls = ["../img/0.gif",
	"../img/1.gif",
	"../img/2.gif",
	"../img/3.gif",
	"../img/4.gif",
	"../img/5.gif",
	"../img/6.gif",
	"../img/7.gif",
	"../img/8.gif",
	"../img/9.gif",]

var parrot = {
	frames: [],
	x: 0,
	y: 0,
	speed: 10,
	currentFrameIndex: 0
};
let arr = {
	entity: [],
	num: 20
}
function Parrot() {
	this.x = -50
	this.y = Math.random() * height
	this.vx = 10 + Math.random() * 5
	this.vy = 0
	this.radius = radius * Math.random() + 15
	this.dir = Math.random()
	this.frames = loadFrames() // функция возвращающая массив с кадрами
	this.currentFrameIndex = Math.floor(Math.random() * 10)
	this.opacity = Math.random()
}

Parrot.prototype = {
	animate: function () {
		for (let i = 0; i < arr.num; i++) {
			let par = arr.entity[i];
			ctx.globalAlpha = 0.8;
			if (par.dir >= 0.5) {
				if (par.x < -100 || par.x > canvas.width + 50) {
					par.x = -100
					par.vx = 10 + Math.random() * 5
					par.y = Math.random() * height
				}
				par.x += par.vx
			}
			else {
				if (par.x < -100 || par.x > canvas.width + 50) {
					par.x = canvas.width + 50
					
					par.vx = -10 - Math.random() * 5
					par.y = Math.random() * height
				}
				par.x += par.vx
			}
			// Отрисовываем текущий кадр
			ctx.drawImage(par.frames[par.currentFrameIndex], par.x, par.y);
			par.currentFrameIndex++;

			if (par.currentFrameIndex >= par.frames.length) {
				par.currentFrameIndex = 0;
			}
		}
	}
}

function loadFrames() {
  var loadedFrames = 0;
  let framesArray = [];
  frameUrls.forEach(function(url) {
	var frame = new Image();

	// Устанавливаем источник изображения для каждого кадра
	frame.src = url;

	// Обработчик события загрузки кадра
	frame.onload = function() {
	  loadedFrames++;
	};
	framesArray.push(frame);
  });
  return framesArray;
}

function createParrots() {
	ctx.clearRect(0, 0, width, height)
	for (let i = 0; i < arr.num; i++) {
		arr.entity.push(new Parrot())
		par = arr.entity[i]
	}
	par.animate()
}

setInterval(createParrots, 1000 / 25)
setBgColor = () => {
		canvas.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16)
		canvas.style.border = `30px solid ${'#' +Math.floor(Math.random()*16777215).toString(16)}` 
	}
	setInterval(setBgColor, 1000)


