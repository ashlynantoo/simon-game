var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0, started = false;

$(document).keydown(function() {

  if(!started) {
    setTimeout(function(){ nextSequence(); }, 500);
    started = true;
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  userPattern = [];
}

$(".btn").click(function(){
  var userChosenColor = this.id;
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {
    if(userPattern.length === gamePattern.length) {
      setTimeout(function(){ nextSequence(); }, 500);
    }
  } else {
    animateWrong();
    started = false;
    $("#level-title").text("Game Over! Press Any Key to Start");
    level = 0;
    gamePattern = [];
    userPattern = [];
  }
});

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(color) {
  $("."+color).addClass("pressed");
  setTimeout(function(){ $("."+color).removeClass("pressed"); }, 100);
}

function animateWrong() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){ $("body").removeClass("game-over"); }, 500);
}
