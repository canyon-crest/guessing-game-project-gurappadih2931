// time
date.textContent = time();
var name1 = "";
function namefunc(){
    name1 = document.getElementById("name").value;
    msg.textContent = "hi " + name1 + ", select a level to start playing!";

}
namebtn.addEventListener("click", namefunc);


// global variables/constants
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
var current = new Date();
let startTime; //current.getTime();
const timeArr = [];


// event listerners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUpbtn.addEventListener("click", giveUp);
//month array


function time(){
    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date();
    //concatenate the date and time
    let str = monthArr[d.getMonth()] + "/" + d.getDate() + "/"+ d.getFullYear()
    return str;
    
}
function play(){
    startTime = new Date().getTime();
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
    //let current-time = 
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
    
    if (score <= 5){
        msg.textContent += " you're doing great!";
    }
    else{
        msg.textContent += " your not good at this!";
    }
}
function reset(){
    giveUp.disabled = true;
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
    //avg time
   
    var dif = new Date().getTime() - startTime;
    var seconds = Math.floor(dif / 1000);
    //msg.textContent += " It took you " + seconds + " seconds.";
    timeArr.push(seconds);
    avgtime.textContent = "avg time: " + seconds.toFixed(2) + " seconds";
    
    //msg.textContent += (timeArr)/ timeArr.length + " is your average time.";
    let sum2 = 0;
    for(let i=0; i<timeArr.length; i++){
        sum2 += timeArr[i];
    }
    let avg2 = sum2/ timeArr.length;
    //msg.textContent += " Your average time is " + avg2.toFixed(2) + " seconds.";
    
    //leaderboard
    const lb = document.getElementsByName("leaderboard");
    for(let i=0; i<scoreArr.length; i++){
        sum+= scoreArr[i];
        if(i< lb.length){
            lb[i].textContent = scoreArr[i];
        }
        //msg.textContent += " Your avg time is " + avg2.toFixed(2) + " seconds.";
        //msg.textContent += "your score was" + feedback();
    }
    let avg = sum/scoreArr.length
    avgScore.textContent = "avg score: " + avg.toFixed(2);

}
function giveUp(){
  score = level;
  msg.textContent = "Why did you give up " + name1 + "? the answer was " + answer + ".";
  reset();
  updateScore();
  giveUpbtn.disabled = true;
    
}
var startTimer = setInterval(function(){myTimer()}, 1000);

function myTimer(){
  //var current = new Date();
  document.getElementById("timer").innerHTML = current.toLocaleTimeString();
}
function feedback(){
    if(score > 5){
        msg.textContent += "  okay.";
        return;
    }
    if(score <= 5){
        msg.textContent += "  great!";
        return;
    }
    if(score > 7){
        msg.textContent += "  terrible.";
        return;
    }
}