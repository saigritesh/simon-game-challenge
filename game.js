
var buttonColors=["red", "blue", "green","yellow"];
var gamePattern=[];
var clickedPattern=[];


var started=false;
var level=0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");


    clickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(clickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===clickedPattern[currentLevel]){
        if(clickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            startover();
        }
}

function nextSequence() {
    clickedPattern=[];

    level++;
    
    $("#level-title").text("Level "+ level);
    var random=Math.floor(Math.random()*4);
    var choosenColor=buttonColors[random];
    gamePattern.push(choosenColor);
    $("#"+choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(choosenColor);

}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function (){
        $("#"+currentColor).removeClass("pressed");
    },100);

}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}
