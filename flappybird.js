window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = "images/background.png";
  var imgX = 0;
  var imgY = 0;

  var isCrashed = false;

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };

  function drawBackground() {
    ctx.drawImage(img, 0, 0);
    faby.y = faby.y + gravity;
    // ctx.drawImage(img, imgX + canvas.width, 0);
  }

  var srcX;

  var trackUp = 1;
  var trackNone = 0;

  var sheetWidth = 190;
  var sheetHeight = 63;
  var frameCount = 3;
  var cols = 3;
  var rows = 1;
  var height = sheetHeight / rows;
  const srcY = 0;
  var width = sheetWidth / frameCount;
  var currentFrame = 0;
  var fabyImg = new Image();
  fabyImg.src = "images/faby1.png";
  fabyImg.onload = () => {
    drawImage();
  };

  var moveUp = false;

  function updateFrame() {
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;
    //ctx.clearRect(faby.x, faby.y, width, height);
  }

  function drawImage() {
    updateFrame();
    ctx.drawImage(
      fabyImg,
      srcX,
      srcY,
      width,
      height,
      faby.x,
      faby.y,
      width,
      height
    );
  }
  // setInterval(function() {
  //   drawImage();
  // }, 500);

  var faby = {
    x: 130,
    y: 190,
    width: 61,
    height: 53
  };

  var gravity = 1.5;

  // faby sounds
  var fly = new Audio();
  var scorePoint = new Audio();
  fly.src = "sounds/fly.wav";
  scorePoint.src = "sounds/score.wav";
  var die = new Audio();
  die.src = "sounds/diesound.wav";
  var hit = new Audio();
  hit.src = "hitsound.wav";

  function Up() {
    faby.y -= 40;
  }

  var pipes = [];
  pipes[0] = {
    x: canvas.width,
    y: 0
  };
  var spaceBetween = 112;
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
        (faby.x + faby.width > pipes[i].x &&
          faby.x < pipes[i].x + pipetop.width &&
          (faby.y < pipes[i].y + pipetop.height ||
            faby.y + faby.height > pipes[i].y + totalTop)) ||
        faby.y + faby.height > canvas.height
      ) {
        isCrashed = true;
        setInterval(() => location.reload(), 2000);
      }
      if ((pipes[i].x <= 80) & (pipes[i].x >= 60)) {
        // put score here maybe
        scorePoint.play();
        // setTimeout(() => {
        //   scorePoint.pause();
        // }, 1000);
      }
    }
  }

  // function gameOver() {
  //   if (
  //     (faby.x + faby.width > pipes[i].x &&
  //       faby.x < pipes[i].x + pipetop.width &&
  //       (faby.y < pipes[i].y + pipetop.height ||
  //         faby.y + faby.height > pipes[i].y + totalTop)) ||
  //     faby.y + faby.height > canvas.height
  //   ) {
  //   }
  //   //   faby.y += 45;
  //   // faby = 424;
  // }

  // // }
  // setTimeout(() => (isCrashed = true), 200);
  // document.getElementById(
  //   "new-button"
  // ).outerHTML = `<button id="start-button">Start New Game</button>`;
  //   document.getElementById("getready").outerHTML = `
  //   <div id="getready">
  //   <img src="images/gameover.png" width="150px" height="50px">
  // </div>

  function startGame() {
    document.getElementById(
      "start-button"
    ).outerHTML = `<button id="new-button">Start New Game</button>`;
    document.getElementById("getready").outerHTML = "";
    drawingLoop();
    document.onkeydown = function(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
        Up();
      }
    };
  }

  function drawingLoop() {
    if (isCrashed === false) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawImage();
      Pipes();
      requestAnimationFrame(function() {
        drawingLoop();
      });
    }
  }

  //setInterval(() => drawingLoop(), 50);
};
