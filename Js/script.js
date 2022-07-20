const grid = document.querySelector(".grid");
const message = document.querySelector("#game-over");
const scoreDisplay = document.getElementById("score");
const restart = document.querySelector('#restart')

// brick size
const blockHeight = 20;
const blockWidth = 50;

//ball size
const ballDiameter = 15;

// Player brick Position
const playerStart = [175, 10];
let currentPosition = playerStart;

// Ball position
const ballStart = [198, 50];
let currentBallPosition = ballStart;

//size of the grid
const gridWidth = 400;
const gridHeight = 500;

// ball movement speed
let timerId;

//movement of the Ball
let xDirection = 2;
let yDirection = 2;

let score = 0;

// create brick
class brick {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];

    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//ALL OF MY BRICKS
const bricks = [
  new brick(8, 470),
  new brick(8, 445),
  new brick(8, 420),
  new brick(8, 395),
  new brick(8, 370),
  new brick(8, 345),
  new brick(8, 320),
  new brick(8, 295),
  new brick(8, 270),
  new brick(8, 245),
  new brick(8, 320),

  new brick(63, 470),
  new brick(63, 445),
  new brick(63, 420),
  new brick(63, 395),
  new brick(63, 370),
  new brick(63, 345),
  new brick(63, 320),
  new brick(63, 295),
  new brick(63, 270),
  new brick(63, 245),
  new brick(63, 320),

  new brick(118, 470),
  new brick(118, 445),
  new brick(118, 420),
  new brick(118, 395),
  new brick(118, 370),
  new brick(118, 345),
  new brick(118, 320),
  new brick(118, 295),
  new brick(118, 270),
  new brick(118, 245),
  new brick(118, 320),

  new brick(173, 470),
  new brick(173, 445),
  new brick(173, 420),
  new brick(173, 395),
  new brick(173, 370),
  new brick(173, 345),
  new brick(173, 320),
  new brick(173, 295),
  new brick(173, 270),
  new brick(173, 245),
  new brick(173, 320),

  new brick(228, 470),
  new brick(228, 445),
  new brick(228, 420),
  new brick(228, 395),
  new brick(228, 370),
  new brick(228, 345),
  new brick(228, 320),
  new brick(228, 295),
  new brick(228, 270),
  new brick(228, 245),
  new brick(228, 320),

  new brick(283, 470),
  new brick(283, 445),
  new brick(283, 420),
  new brick(283, 395),
  new brick(283, 370),
  new brick(283, 345),
  new brick(283, 320),
  new brick(283, 295),
  new brick(283, 270),
  new brick(283, 245),
  new brick(283, 320),

  new brick(338, 470),
  new brick(338, 445),
  new brick(338, 420),
  new brick(338, 395),
  new brick(338, 370),
  new brick(338, 345),
  new brick(338, 320),
  new brick(338, 295),
  new brick(338, 270),
  new brick(338, 245),
  new brick(338, 320),
];



const start = (function(){

  //Draw a Brick
  function addBricks() {
    for (let i = 0; i < bricks.length; i++) {
      const brick = document.createElement("div");
      brick.classList.add("brick");
      brick.style.left = bricks[i].bottomLeft[0] + "px";
      brick.style.bottom = bricks[i].bottomLeft[1] + "px";
      grid.appendChild(brick)
    }
  }
  
  addBricks()
  
  // createPlayerBrick
  const player = document.createElement("div");
  player.classList.add("player");
  drawPlayer();
  grid.appendChild(player);
  
  function drawPlayer() {
    player.style.left = currentPosition[0] + "px";
    player.style.bottom = currentPosition[1] + "px";
  }
  
  //Move User
  function movePlayer(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (currentPosition[0] > 5) {
          currentPosition[0] -= 20;
          drawPlayer();
        }
  
        break;
      case "ArrowRight":
        if (currentPosition[0] < gridWidth - 70) {
          currentPosition[0] += 20;
          drawPlayer();
        }
        break;
    }
  }
  
  document.addEventListener("keydown", movePlayer);
  
  //add a ball
  const ball = document.createElement("div");
  ball.classList.add("ball");
  drawBall();
  grid.appendChild(ball);
  
  function drawBall() {
    ball.style.left = currentBallPosition[0] + "px";
    ball.style.bottom = currentBallPosition[1] + "px";
  }
  
  //ball Movement
  function moveBall() {
    currentBallPosition[0] += xDirection;
    currentBallPosition[1] -= yDirection;
    drawBall();
    checkCollision();
  }
  
  timerId = setInterval(moveBall, 10);
  
  //check ball collision
  function checkCollision() {
    // check for brick Collision
    for (let i = 0; i < bricks.length; i++) {
      if (
        currentBallPosition[0] > bricks[i].bottomLeft[0] &&
        currentBallPosition[0] < bricks[i].bottomRight[0] &&
        currentBallPosition[1] + ballDiameter > bricks[i].bottomLeft[1] &&
        currentBallPosition[1] < bricks[i].topLeft[1]
      ) {
        const allBlocks = Array.from(document.querySelectorAll(".brick"));
        allBlocks[i].classList.remove("brick");
        bricks.splice(i, 1);
        changeDirection();
        score++;
        scoreDisplay.innerHTML = score;
      }
    }
  
    //check wall collision
    if (
      currentBallPosition[0] >= gridWidth - ballDiameter ||
      currentBallPosition[1] >= gridHeight - ballDiameter ||
      currentBallPosition[0] <= 0
    ) {
      changeDirection();
    }
  
    if (currentBallPosition[1] <= 0) {
      clearInterval(timerId);
      ball.classList.remove("ball")
      message.innerHTML = "game over";
      document.removeEventListener("keydown", movePlayer);
      restart.style.display = 'inline-block'
    }
    // check for winning
    if( bricks.length===0){
      document.removeEventListener("keydown", movePlayer);
      clearInterval(timerId);
     message.innerHTML= "you win "
     restart.style.display = 'inline-block'
    }
  
    //check for player Collision
    if (
      currentBallPosition[0] > currentPosition[0] &&
      currentBallPosition[0] < currentPosition[0] + (blockWidth) &&
      currentBallPosition[1] > currentPosition[1] &&
      currentBallPosition[1] < currentPosition[1] + (blockHeight)
    ) {
      changeDirection();
    }
  }
  
  function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2;
      return;
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2;
      return;
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2;
      return;
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2;
      return;
    }
    /*
           if(yDirection===2 && xDirection===2){
               xDirection= -2
               return
  
           } if(yDirection=== 2 && xDirection=== -2){
              yDirection= -2
              return
           } 
  
          
             if( yDirection === -2 && xDirection === -2){
                 yDirection= 2
                 return
  
             }
             
             if( yDirection === -2 && xDirection === 2){
              xDirection= -2
              return
          }
          
          */
  
  }
  
  
})()

 
restart.addEventListener("click", function(){
    restart.style.display ="none"
    ball.classList.add('ball')
    message.innerHTML= ""
    score=0
    scoreDisplay.innerHTML=score
    ball.style.left =  "198px"
    ball.style.bottom = "50px"
    addBricks()
    document.addEventListener("keydown", movePlayer);


    
})


