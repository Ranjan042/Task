const playArea = document.querySelector(".play-area");
const scoreArea = document.querySelector(".score-area");
const startBtn = document.querySelector(".start");
const box = document.querySelector(".box");
const score = document.querySelector(".score");
const time = document.querySelector(".time");


let scoreCount;
let isPositionSet = false;

startBtn.addEventListener("click", startGame);


//  let isinputValid = false;
//         window.addEventListener("keydown",(e)=>{
//             // console.log(e.key);
//             // console.log(box.innerText);
//             isinputValid = e.key == box.innerText;
//             if( isPositionSet && isinputValid){
//                 ManageScore();
                
//             }
//         });

function ManageBoxPosition() {
    let y = Math.floor(
        Math.random() * (playArea.clientHeight - box.clientHeight)
    );

    let x = Math.floor(
        Math.random() * (playArea.clientWidth - box.clientWidth)
    );
    box.style.top = y + "px";
    box.style.left = x + "px";

    // box.innerText = Math.floor(Math.random() * 10);
    // isPositionSet = true;


        box.addEventListener("click", () => { 
            isPositionSet = true;    
        });
        
        if(isPositionSet){
            ManageScore();
        }
       

}

function ManageScore() {

        scoreCount=scoreCount+1;
        score.innerText = "Score:" + scoreCount;
        isPositionSet = false;
    
}

function ManageColor(){
    box.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
}

function GameOver() {
    document.querySelector(".gameOverPage").style.display = "flex";

    setTimeout(() => {
        document.querySelector(".gameOverPage").style.display = "none";
        StartGame();
    }, 3000);
}

function ManageTimer() {
    
    let timeCount = 10;
    time.innerText = "Time:" + timeCount;
    
    startBtn.disabled = true;
    
    let interval = setInterval(function () {
        timeCount--;
        time.innerText = "Time:" + timeCount;
        ManageBoxPosition();
        ManageColor();
         
      
        if (timeCount === 0) {
            clearInterval(interval);
            startBtn.disabled = false;
            GameOver();
        }
    }, 3000)
}


function startGame() {
    scoreCount=0;
    ManageTimer();
}
