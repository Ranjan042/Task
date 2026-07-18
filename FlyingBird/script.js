let gamestarted=false;
let gameOver = false
let score = 0;
function AddPipe() {
     if(gameOver){ 
        return
    }
    const pipes = document.querySelector(".pipes");
    console.dir(pipes)


    const topPipe = document.createElement('div')
    const bottomPipe = document.createElement('div')

    topPipe.classList.add('pipe')
    bottomPipe.classList.add("pipe")

    topPipe.dataset.scored = "false";
bottomPipe.dataset.pair = "bottom";

    const gap = 400;
    const topHeight = Math.floor(Math.random() * pipes.offsetHeight / 2) + 50;
    const bottomHeight = Math.floor(pipes.offsetHeight - topHeight - gap);

    topPipe.style.height = `${topHeight}px`;
    bottomPipe.style.height = `${bottomHeight}px`;

    topPipe.style.top = "0";
    bottomPipe.style.bottom = "0";

    topPipe.style.left = `${pipes.offsetWidth - 50}px`;
    bottomPipe.style.left = `${pipes.offsetWidth - 50}px`;



    pipes.append(topPipe)
    pipes.append(bottomPipe)

   
    
    setTimeout(AddPipe, 2500)


}

function MovePipe() {
  
    if(gameOver){
        return
    }
    const pipes = document.querySelectorAll(".pipe")
      pipes.forEach(pipe => { 
        const left=pipe.offsetLeft;
        pipe.style.left=(left-3)+"px";

        if(left<-90){
            pipe.remove();
        }
    })
    requestAnimationFrame(MovePipe)
}

function updateScore() {
    const bird = document.querySelector(".bird");
    const pipes = document.querySelectorAll(".pipe");

    pipes.forEach(pipe => {
        // Only check top pipes
        if (pipe.dataset.pair === "bottom") return;

        if (
            pipe.dataset.scored === "false" &&
            pipe.offsetLeft + pipe.offsetWidth < bird.offsetLeft
        ) {
            pipe.dataset.scored = "true";
            score++;

            console.log(score);
            // document.querySelector(".score").textContent = score;
        }
    });
}
function checkCollision() {
    const birdRect = bird.getBoundingClientRect();

    const pipes = document.querySelectorAll(".pipe");

    for (const pipe of pipes) {

        const pipeRect = pipe.getBoundingClientRect();
        console.log("pipeRect", pipeRect);

        if (
            birdRect.left < pipeRect.right &&
            birdRect.right > pipeRect.left &&
            birdRect.top < pipeRect.bottom &&
            birdRect.bottom > pipeRect.top
        ) {
            gameOver = true;
            console.log("Game Over");
            break;
        }
    }
}

const bird=document.querySelector(".bird");
console.log(bird.getBoundingClientRect());
console.dir(bird);
let birdY = bird.offsetTop;
let velocity=0;
const gravity=0.5;
function MoveBird(){

    velocity+=gravity;
    birdY+=velocity;

 
    bird.style.top=birdY+"px";
    if(birdY+bird.clientHeight/2>bird.offsetParent.clientHeight || birdY<-bird.clientHeight/2){
        console.log("Game Over");
        console.log("Score",score)
        gameOver=true
        return
    }

    checkCollision();
    updateScore();


    requestAnimationFrame(MoveBird)
}

function JumpBird(){
   velocity=-10;
}


// console.log(e)

function StartGame() {
    gameOver = false;
    score = 0;

    AddPipe();
    MovePipe();
    MoveBird();
}



document.addEventListener("keydown",(e)=>{
    if(gameOver){
        return
    }
    if(e.code=="Space"){
        if(!gamestarted){
            gamestarted=true;
            StartGame();
        }
        JumpBird();
        
    }
})