  //let computerMove = ''; //Global variable

  //When the page is loaded, the code below laods from localStorage. As the storage value is in a string format, the code transform from JSON string back to JSON object
  
  let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score){
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
*/

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins} \t Losses: ${score.losses} \t Ties: ${score.ties}`;
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();     
}

function pickComputerMove(){
const randomNumber = Math.random();
let computerMove = ''; 

if (randomNumber<1/3){
  computerMove = 'Rock';
}
else if (randomNumber>=1/3 && randomNumber<2/3){
  computerMove = 'Paper';
}else {
  computerMove = 'Scissors';
}

return computerMove;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
     intervalId = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playGame('Scissors');
  });

document.body.addEventListener('keydown',(event)=>{
  if (event.key === 'r'){
    playGame('Rock');
  }else if (event.key === 'p'){
    playGame('Paper');
  }else if (event.key === 's'){
    playGame('Scissors');
  }
  });

function playGame(playerMove){
const computerMove = pickComputerMove();
let result = '';

if (playerMove === 'Scissors'){
  if (computerMove === 'Rock'){
    result = 'Computer Wins!!!';
  } else if(computerMove === 'Paper'){
    result = 'You win!!! :)';
  } else {
    result = 'Tie.';
  }

} else if (playerMove === 'Paper'){
    if (computerMove === 'Rock'){
    result = 'You win!!! :)';
    } else if(computerMove === 'Paper'){
    result = 'Tie.';
    } else {
    result = 'Computer Wins!!!';
  }

  } else {
      if (computerMove === 'Rock'){
      result = 'Tie.';
      } else if(computerMove === 'Paper'){
      result = 'Computer Wins!!!';
      } else {
      result = 'You win!!! :)';
      }
  }

if (result === 'You win!!! :)'){
  score.wins++;
} else if (result === 'Tie.'){
  score.ties++;
} else score.losses++;

//localStorage only supports String
//Code below saves the score in the localstorage. As the score is an object, it needs to be converted to a string first
localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-moves')
.innerHTML = `You <img src="images/${playerMove}-emoji.png"class="move-icon"> \t <img src="images/${computerMove}-emoji.png"class="move-icon"> Computer.`;

document.querySelector('.js-result')
.innerHTML = result;
}