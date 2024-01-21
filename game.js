var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userPattern = [];
var start = false;
var level = 0;
var lastInd = 0;


function nextSequence() {
    var num = Math.floor(Math.random()*4);
    var color = buttonColors[num];
    gamePattern.push(color);
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
}

// $(document).on("keydown", function () {
//     if(start === false){
//         start = true;
//         $("h1").text("Level " + level);
//         nextSequence();
//     }
// });

$("h1").on("click", function () {
    if(start === false){
        start = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function () {
    userColor = this.id;
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    var ans = checkAnswer(lastInd);

    if(ans === false) reset();
    else lastInd++;
    
    if(lastInd === gamePattern.length && ans === true){
        level++;
        userPattern = [];
        lastInd = 0;
        $("h1").html("Level " + level);
        setTimeout(nextSequence, 1000);
    }
});

function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(ind) {
    if(userPattern[ind] === gamePattern[ind]) return true;
    return false;
}

function reset() {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Click here to Restart");
    level = 0;
    start = false;
    lastInd = 0;
    gamePattern = [];
    userPattern = [];
}