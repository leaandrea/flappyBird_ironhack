window.onload = function() {
  document.body.onkeyup = function(e) {
    // press space bar to start the game
    if (e.keyCode == 32) {
      startGame();
    }
  };
  var score = 0;
  // press space bar to move up
  document.onkeydown = function(event) {
    if (event.keyCode == 32) {
      event.preventDefault();
      Up();
    }
  };

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  // variables
  // var score = 0;
  var img = new Image();
  img.src = "images/background.png";
  var imgX = 0;
  var imgY = 0;
  var isCrashed = false;

  // background image
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  function drawBackground() {
    ctx.drawImage(img, 0, 0);
    faby.y = faby.y + gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("score : " + score, 30, canvas.height - 20);
  }

  // variables and functions for the sprites of faby
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

  function updateFrame() {
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;
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

  var faby = {
    x: 130,
    y: 190,
    width: 61,
    height: 50
  };

  var gravity = 1.5;

  // faby sounds
  var fly = new Audio();
  var scorePoint = new Audio();
  fly.src = "sounds/fly.wav";
  scorePoint.src = "sounds/ez1.wav";
  var die = new Audio();
  die.src = "sounds/diesound.wav";
  var hit = new Audio();
  hit.src = "hitsound.wav";

  // function playRandomSound() {
  //   var sounds = [
  //     "sounds/ezz.wav",
  //     "sounds/hitsound.wav",
  //     "sounds/hitsound.wav",
  //     "sounds/hitsound.wav"
  //   ];

  //   var soundFile = sounds[Math.floor(Math.random() * sounds.length)];
  //   var soundFile = new Audio();
  // }

  // moving up faby when pressing space bar
  function Up() {
    faby.y -= 40;
  }

  // the pipes part - variables and big function to create the pipes

  var pipes = [];
  pipes[0] = {
    x: canvas.width,
    y: 0
  };
  var spaceBetween = 117;
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
      // the collision part / if this or that, the faby touch a pipe and the game stops
      if (
        (faby.x + faby.width > pipes[i].x &&
          faby.x < pipes[i].x + pipetop.width &&
          (faby.y < pipes[i].y + pipetop.height ||
            faby.y + faby.height > pipes[i].y + totalTop)) ||
        faby.y + faby.height > canvas.height
      ) {
        isCrashed = true;
        // document.getElementById("getready").classList.add("gameoverbitch");
        setInterval(() => location.reload(), 2800);
      }
      // if a pipe is at a certain place it means the faby has made a point
      // if ((pipes[i].x <= 80) & (pipes[i].x >= 60)) {
      if (pipes[i].x == 70) {
        score++;
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

  // function for the game to run correctly and infinitly
  function startGame() {
    // document.getElementById(
    //   "start-button"
    // ).outerHTML = `<button id="new-button">Start New Game</button>`;
    // for the "get ready" to disappear after the game has started
    document.getElementById("getready").outerHTML = "";
    drawingLoop();
    document.onkeydown = function(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
        Up();
      }
    };
  }

  // function displayScore() {
  //   ctx.fillStyle = "#000";
  //   ctx.font = "20px Verdana";
  //   ctx.fillText("Score : " + score, 10, canvas.height - 20);
  //   return score;
  // }

  // //to display the score
  // setTimeout(() => {
  //   set();
  // }, 7000);
  // function set() {
  //   setInterval(() => (score = score + 1), 3500);
  // }

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
};
