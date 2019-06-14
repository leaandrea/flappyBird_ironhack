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
  }

  function Score() {
    ctx.fillStyle = "black";
    ctx.font = "25px Permanent Marker";
    // ctx.globalCompositeOperation = "source - atop";
    ctx.fillText("score : " + score, 30, 40);
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
  // fabyImg.onload = () => {
  //   drawImage();
  // };

  setInterval(function() {
    drawImage();
  }, 500);

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
  //     new Audio("sounds/ezz.wav"),
  //    new Audio("sounds/hitsound.wav"),
  //     "sounds/hitsound.wav",
  //     "sounds/hitsound.wav"
  //   ];
  //   var soundFile = sounds[Math.floor(Math.random() * sounds.length)];

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
        document.getElementById("gameover").classList.add("active");
        setInterval(() => location.reload(), 3800);
      }
      // if a pipe is at a certain place it means the faby has made a point
      // if ((pipes[i].x <= 80) & (pipes[i].x >= 60)) { -> other possitbility tried but didn't work with the score
      if (pipes[i].x == 70) {
        score++;
        scorePoint.play();
      }
    }
  }

  // function for the game to run correctly and infinitly
  function startGame() {
    // for the "get ready" to disappear after the game has started
    document.getElementById("getready").innerHTML = "";
    // const x = document.getElementById("getready");
    // if (x) x.outerHTML = "";
    drawingLoop();
    document.onkeydown = function(event) {
      if (isCrashed) return;
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
      Score();
      requestAnimationFrame(function() {
        drawingLoop();
      });
    }
  }
};
