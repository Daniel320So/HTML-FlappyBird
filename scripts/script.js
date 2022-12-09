let score = 0;
let jumpingCount = 0;
let jumping = false;
let gaming = false;
let gameInterval;
let scoreInterval;
let difficultyInterval;

const start = () => {
    //Start
    gaming = true;
    score = 0;
    $("html").on("click", function(){
        if (gaming) jump();
    });
    $("html").on("click");
    $("#start-screen").hide();
    $("#current-score").text(`${score}`);
    $("#score-container").css("display", "flex");
    $("#game-bird").show();
    $("#block").addClass("animateObstacle");
    $("#hole").addClass("animateObstacle");
    $("#block").css("animationPlayState", "running");
    $("#hole").css("animationPlayState", "running");
    started = true;
    gameInterval = setInterval(setGameInterval, 10);
    scoreInterval = setInterval(setScoreInterval, 1000);
};

const gameOver = (birdPosition) => {
    //Game Over 
    gaming = false;
    jumpingCount = 0;
    $("html").off("click");
    clearInterval(gameInterval);
    clearInterval(scoreInterval);
    clearInterval(difficultyInterval);

    //Stop all animations
    $("#block").css("animationPlayState", "paused");
    $("#hole").css("animationPlayState", "paused");

    //Animate Bird
    $(":root").css({ "--bird-game-over": birdPosition.top - 100 + "px" });
    $("#game-bird").addClass("game-over");
    gameOverTimeout = setTimeout(function() {
        $("#game-bird").hide();
        $("#score-container").hide();
        $("#start-screen").show();
        $("#game-bird").css("top", "200px");
        $("#block").removeClass("animateObstacle");
        $("#hole").removeClass("animateObstacle");
        $("#game-bird").removeClass("game-over");
    }, 900);

};

const jump = () => {

    jumpingCount++ ;
    if (jumpingCount == 1) return;

    let jumpTimeout;
    if (jumping){
        $("#game-bird").removeClass("jumping")
        clearInterval(jumpTimeout)
    } 
    jumping = true;
    let position = $("#game-bird").position().top;
    $(":root").css({"--bird-jump-start": position+"px", "--bird-jump-end": position-150+"px"});
    $("#game-bird").addClass("jumping")
    jumpTimeout = setTimeout(function() {
        $("#game-bird").removeClass("jumping")
        jumping = false;
    }, 250)
}

const setGameInterval = () => {

    // bird falling
    $("#game-bird").css("top", $("#game-bird").position().top + 3 + "px");

    // Game Logic

    let _birdposition = $("#game-bird").position();
    let birdPosition = {
        top: _birdposition.top,
        bottom: _birdposition.top + $("#game-bird").height(),
        left: 150,
        right: 150 + $("#game-bird").width(),
    };

    //check whether a block is hitted.
    let _blockPosition = $("#block").position();
    let blockPosition = {
        left: _blockPosition.left,
        right: _blockPosition.left + $("#hole").width()
    };

    let _holePosition = $("#hole").position();
    let holePosition = {
        top: _holePosition.top,
        bottom: _holePosition.top + $("#hole").height()
    };

    //If hit ceiling or floor
    if (birdPosition.bottom >= 625 || birdPosition.top <= 25) gameOver(birdPosition, gameInterval);

    // While birds not hit the block, return empty
    if (birdPosition.right < blockPosition.left || birdPosition.left > blockPosition.right) return;

    // While birds is in the holes
    if (birdPosition.top > holePosition.top && birdPosition.bottom < holePosition.bottom) return;

    gameOver(birdPosition);
}

const setScoreInterval = () => {
    score ++;
    $("#final-score").text(`Your Score: ${score}`);
    $("#current-score").text(`${score}`);
    $("#current-score").addClass("increase-score");
    jumpTimeout = setTimeout(function() {
        $("#current-score").removeClass("increase-score");
    }, 500)
}

const loadPage = () => {

    $("#hole").on("animationiteration", function() {
        let random = Math.random(); //retunr 0 - 1 
        let randomTop = random*(600-250) + 25 + "px"; //Height of the screen 650px - height of holes 250px

        $(this).css("top", randomTop);
    })

    $("#start-button").on("click", function(){
        start();
    });
}

$(window).on("load", loadPage);