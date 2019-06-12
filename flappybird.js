window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  document.onkeydown = function (event) {
    if (event.keyCode == 32) {
      event.preventDefault();
      Up();
    }
  };

  var img = new Image();
  img.src = "images/background.png";
  var imgX = 0;
  var imgY = 0;

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };

  function drawBackground() {
    ctx.drawImage(img, 0, 0);
    // ctx.drawImage(img, imgX + canvas.width, 0);
  }

  var faby = new Image();
  faby.src = "images/faby.png";
  var fabyX = 130;
  var fabyY = 190;
  var gravity = 2;

  // faby sounds
  var fly = new Audio();
  var scorePoint = new Audio();
  fly.src = "sounds/fly.wav";
  scorePoint.src = "sounds/score.wav";
  var die = new Audio();
  die.src = "sounds/diesound.wav";
  var hit = new Audio();
  hit.src = "hitsound.wav";

  faby.onload = function () {
    ctx.drawImage(faby, 130, 190);
  };

  function drawFaby() {
    ctx.drawImage(faby, fabyX, fabyY);
    fabyY = fabyY + gravity;
  }

  function Up() {
    fabyY = fabyY - 45;
    fly.play();
  }

  var pipes = [];
  pipes[0] = {
    x: canvas.width,
    y: 0
  };

  var spaceBetween = 100;
  var pipetop = new Image();
  var pipebottom = new Image();
  pipetop.src = "images/pipetop.png";
  pipebottom.src = "images/pipebottom.png";



  function Pipes() {
    for (var i = 0; i < pipes.length; i++) {
      pipes[i].x = pipes[i].x - 1.5; // vitesse
      totalTop = pipetop.height + spaceBetween; // 
      ctx.drawImage(pipetop, pipes[i].x, pipes[i].y);
      ctx.drawImage(pipebottom, pipes[i].x, pipes[i].y + totalTop);
      if (pipes[i].x === 370) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(Math.random() * pipetop.height) - pipetop.height
        });
      }
      if (
        fabyX + faby.width > pipes[i].x &&
        fabyX < pipes[i].x + pipetop.width &&
        (fabyY < pipes[i].y + pipetop.height ||
          fabyY + faby.height > pipes[i].y + totalTop) ||
        fabyY + faby.height > canvas.height
      ) {
        // hit.play();
        location.reload();
        // reload page
      }
      if (pipes[i].x == 22) {
        // put score here maybe
        scorePoint.play();
      }
    }
  }

  function startGame() {
    document.getElementById("start-button").outerHTML = "";
    drawingLoop();
  }

  function drawingLoop() {
    ctx.clearRect(0, 0, 700, 500);
    drawBackground();
    drawFaby();
    Pipes();
    requestAnimationFrame(function () {
      drawingLoop();
    });
  }
};