const buttonColours = ["red", "blue", "green", "yellow"]
const gamePattern = []
const userClickedPattern = []

var started = false
var level = 0

$(document).keypress(function() {
    started = true

    if (started) {
        nextSequence()
        $('#level-title').text('Level ' + level)
    }
})

$(".btn").click(function () {
    var userChosenColour =  this.id

    userClickedPattern.push(userChosenColour)

    animatePress(userChosenColour)

    playSound(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence()
        }, 1000);
      }
    } else {
        playSound("wrong");

        $("body").addClass("game-over")
        setTimeout(function () { 
            $('body').removeClass('game-over')
        }, 200) 

        $('#level-title').text('Game Over, Press Any Key to Restart')

        startOver()
    }
}

function nextSequence() {

    userClickedPattern.length = 0

    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4)

    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

function startOver() {
    level = 0
    gamePattern.length = 0
    started = false
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(function () { 
        $('#' + currentColour).removeClass('pressed')
    }, 100) 
}