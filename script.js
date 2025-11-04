// time
date.textContent = time();

function namefunc(){
    name1 = document.getElementById("name").value;
    msg.textContent = "hi " + name1 + ", select a level to start playing!";

}
namebtn.addEventListener("click", namefunc);


// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];


// event listerners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);




function time(){

    let d = new Date();
    //concatenate the date and time
    let str = d.getMonth()+1 + "/" + d.getDate() + "/"+ d.getFullYear()
    return str;
}
function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i=0; i<levelArr.length;i++){
         levelArr[i].disabled = true;
         if(levelArr[i].checked){
            level = levelArr[i].value;
         }
    }
    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = "guess a number from 1 to " + level   
    guess.placeholder = answer;
    score = 0;
}


function makeGuess(){
    let userGuess = Number(guess.value);
    if(isNaN(userGuess)){
        msg.textContent = "invalid, guess a number!";
        return;
    }
    score++;
    if(userGuess>answer){
        msg.textContent = "too high"
    }
    else if(userGuess < answer){
        msg.textContent = "too low"
        
    }
    else{
        msg.textContent = "correct, it took " + score + " tries.";
        reset();
        updateScore();
    }
}
function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = false;
    for(let i =0; i <levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score); // adds current score to array of score
    wins.textContent = "total wins: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a,b) => a-b)//sorts ascending
    //leaderboard
    const lb = document.getElementsByName("leaderboard");
    for(let i=0; i<scoreArr.length; i++){
        sum+= scoreArr[i];
        if(i< lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length
    avgScore.textContent = "avg score: " + avg.toFixed(2);
}
function giveUp(){
    msg.textContent = "the answer was " + answer;
    reset();
}
