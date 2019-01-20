var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var isGameStarted =false;
var level = 0;


$(document).on("keypress", function() {
  if(isGameStarted === false) {
    isGameStarted=true;
    $("h1").text("Level " + level);
    nextSequence()
  }
})

// Add event to buttons
$(".btn").on("click",function(event) {
  var userChosenColour = event.target.id; //get the id of clicked button
  userClickedPattern.push(userChosenColour); //Add to user logic array.

  playSound(userChosenColour);

  animatePress(userChosenColour);

 console.log("User");
  console.log(userClickedPattern);
  console.log("Game");
  console.log(gamePattern);
  checkAnswer(userClickedPattern.length -1);
})

function nextSequence() {
  var randomNumber  = Math.floor(Math.random() * 4); //random number between 0-3
  var randomChosenColour = buttonColours[randomNumber]; //transfer random number to a defined color
  gamePattern.push(randomChosenColour); //added to game logic

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //make button fade in and fade out

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //select the specific audio for generated color
  audio.play(); //play specific audio to the colo
}

function animatePress(currentColour){
 $("#" + currentColour).addClass("pressed");
 setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(currentLevel === gamePattern.length-1)
    {
     setTimeout(nextSequence,1000);
     userClickedPattern=[];
   }
  }
  else {
    console.log("You loose");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
           $("body").removeClass("game-over");
   }, 1000);
     $("h1").text("Game Over, Press Any Key to Restart");
     startOver()
  }
}

function startOver() {
  isGameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
