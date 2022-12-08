let jumping = 0;
let gaming = 0;
let gameInerval;

const start = () => {
    gaming = 1;
    $("#start-screen").hide();
    $("#game-bird").show();
    $("#block").addClass("animateObstacle");
    $("#hole").addClass("animateObstacle");
    $("#block").css("animationPlayState", "running");
    $("#hole").css("animationPlayState", "running");
    gameInterval = setInterval(setGameInterval, 10);
};

const gameOver = (birdPosition) => {
    //Game Over 
    gaming = 0;
    clearInterval(gameInterval);

    //Stop all animations
    $("#block").css("animationPlayState", "paused");
    $("#hole").css("animationPlayState", "paused");

    //Animate Bird
    $(":root").css({ "--bird-game-over": birdPosition.top - 100 + "px" });
    $("#game-bird").addClass("game-over");
    gameOverTimeout = setTimeout(function() {
        $("#game-bird").hide();
        $("#endScreen").show();
    }, 900);
};

const jump = () => {
    let jumpTimeout;
    if (jumping){
        $("#game-bird").removeClass("jumping")
        clearInterval(jumpTimeout)
        jumping = 0;
    } 
    jumping = 1;
    let position = $("#game-bird").position().top;
    $(":root").css({"--bird-jump-start": position+"px", "--bird-jump-end": position-150+"px"});
    $("#game-bird").addClass("jumping")
    jumpTimeout = setTimeout(function() {
        $("#game-bird").removeClass("jumping")
        jumping = 0;
    }, 250)
}

const setGameInterval = () => {
    // bird falling
    $("#game-bird").css("top", $("#game-bird").position().top + 3 + "px");

    // Game Logic
    let _birdposition = $("#game-bird").position();
    console.log(_birdposition)
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
    if (birdPosition.bottom >= 600 || birdPosition.top <= 0) gameOver(birdPosition, gameInterval);

    // While birds not hit the block, return empty
    if (birdPosition.right < blockPosition.left || birdPosition.left > blockPosition.right) return;

    // While birds is in the holes
    if (birdPosition.bottom > holePosition.top && birdPosition.top < holePosition.bottom) return;

    gameOver(birdPosition);
}
const loadPage = () => {
    
    $("#hole").on("animationiteration", function() {
        let random = Math.random(); //retunr 0 - 1 
        let randomTop = random*(600-200) + 25 + "px"; //Height of the screen 650px - height of block 100px
        $(this).css("top", randomTop);
    })

    $("html").on("click", function(){
        jump();
    });

    $("#start-button").on("click", function(){
        start();
    });
}

$(window).on("load", loadPage);