let score = 0;
let jumpingCount = 0;
let holeHeight = 300;
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
    $(".block").addClass("animateObstacle");
    $(".block").css("animationPlayState", "running");
    holeHeight = 300;
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
    $(".block").css("animationPlayState", "paused");

    //Animate Bird
    $(":root").css({ "--bird-game-over": birdPosition.top - 100 + "px" });
    $("#game-bird").addClass("game-over");
    gameOverTimeout = setTimeout(function() {
        $("#game-bird").hide();
        $("#score-container").hide();
        $("#start-screen").show();
        $("#game-bird").css("top", "200px");
        $(".block").removeClass("animateObstacle");
        $("#game-bird").removeClass("game-over");
        $("#final-score").show();
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
    let _block1Position = $("#block-1").position();
    let block1Position = {
        top: _block1Position.top,
        bottom: _block1Position.top + $("#block-1").height(),
        left: _block1Position.left,
        right: _block1Position.left + $("#block-1").width()
    };

    let _block2Position = $("#block-2").position();
    let block2Position = {
        top: _block2Position.top,
        bottom: _block2Position.top + $("#block-1").height(),
        left: _block2Position.left,
        right: _block2Position.left + $("#block-2").width()
    };


    //If hit ceiling or floor
    if (birdPosition.bottom >= 625 || birdPosition.top <= 25) gameOver(birdPosition, gameInterval);

    // While birds not hit the block, return empty
    if (birdPosition.right < block1Position.left || birdPosition.left > block1Position.right) return;

    //While birds is in the holes
    if (birdPosition.top > block1Position.bottom && birdPosition.bottom < block2Position.top) return;

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

const loadBackground = () => {

    let backgroundWidth = $("#playground").width();

    for (let i=0; i<50; i++){
        let snow =  $(document.createElement('div'))
        snow.html("❅");
        snow.addClass("snow")
        let randomSize = Math.random() * 1.5 + 1;
        let randomLeft = Math.random() * backgroundWidth;
        let seconds = i/2.5;
        snow.css("font-size", randomSize + "em")
        snow.css("left", randomLeft + "px")
        snow.css("animation-delay", seconds + "s")
        $("#background").append(snow);
    }
}


const loadPage = () => {

    loadBackground()

    $("#block-1").on("animationiteration", function() {
        holeHeight = holeHeight - 10; //Increase difficulty each time
        let random = Math.random(); //retunr 0 - 1 
        let randomHeightForBlock1 = random*(600-holeHeight); // 0 to 350
        let randomHeightForBlock2 = 600 - randomHeightForBlock1 - holeHeight; // 0 - 350

        $(this).css("height", randomHeightForBlock1 + "px");
        $("#block-2").css("height", randomHeightForBlock2 + "px");
    })

    $("#start-button").on("click", function(){
        start();
    });
}

$(window).on("load", loadPage);