var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const frameUrls = [
  "./img/0.png",
  "./img/1.png",
  "./img/2.png",
  "./img/3.png",
  "./img/4.png",
  "./img/5.png",
  "./img/6.png",
  "./img/7.png",
  "./img/8.png",
  "./img/9.png",
];

const arr = {
  entity: [],
  num: 10,
};
const BASE_SPEED = 3;
const RANDOM_SPEED = 12;
const FRAME_DELAY = 3;

const frames = loadFrames();
let animationId = null;

function Parrot(sharedFrames) {
  this.frames = sharedFrames;
  this.currentFrameIndex = Math.floor(Math.random() * this.frames.length);
  this.frameTick = 0;
  this.dir = Math.random();
  this.reset(true);
}

Parrot.prototype = {
  reset: function (initial) {
    this.y = Math.random() * height - 100;
    if (this.dir >= 0.5) {
      this.x = initial ? -50 : -100;
      this.vx = BASE_SPEED + Math.random() * RANDOM_SPEED;
      this.width = width * 0.1 * Math.random() + 150;
    } else {
      this.x = initial ? canvas.width + 50 : canvas.width + 50;
      this.vx = -(BASE_SPEED + Math.random() * RANDOM_SPEED);
      this.width = width * 0.2 * Math.random() + 50;
    }
    this.height = this.width;
  },
  update: function () {
    if (this.x < -100 || this.x > canvas.width + 50) {
      this.reset(false);
    }
    this.x += this.vx;
    this.frameTick++;
    if (this.frameTick >= FRAME_DELAY) {
      this.frameTick = 0;
      this.currentFrameIndex++;
      if (this.currentFrameIndex >= this.frames.length) {
        this.currentFrameIndex = 0;
      }
    }
  },
  draw: function () {
    ctx.drawImage(
      this.frames[this.currentFrameIndex],
      this.x,
      this.y,
      this.width,
      this.height,
    );
  },
};

function loadFrames() {
  var framesArray = [];
  frameUrls.forEach(function (url) {
    const frame = new Image();
    frame.src = url;
    framesArray.push(frame);
  });
  return framesArray;
}

function initParrots() {
  arr.entity = [];
  for (let i = 0; i < arr.num; i++) {
    arr.entity.push(new Parrot(frames));
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalAlpha = 0.8;
  for (let i = 0; i < arr.entity.length; i++) {
    arr.entity[i].update();
    arr.entity[i].draw();
  }
  animationId = requestAnimationFrame(animate);
}

function randomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function start() {
  const audio = document.querySelector("audio");
  const play = document.querySelector(".play");
  const mainParrot = document.querySelector(".mainParrot");

  initParrots();
  if (animationId === null) {
    animate();
  }

  const setBgColor = () => {
    canvas.style.backgroundColor = randomHexColor();
    canvas.style.border = "30px solid " + randomHexColor();
  };
  setInterval(setBgColor, 1000);
  audio.play();
  play.style.opacity = 0;
  mainParrot.style.display = "block";
  mainParrot.animate(
    { width: ["0", "(1vh + 1vw)*20"], height: ["0", "(1vh + 1vw)*20"] },
    { duration: 800 },
  );
}
