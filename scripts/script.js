let jumping = 0;
let gaming = 0;

const jump = () => {
    let jumpTimeout;
    if (jumping){
        $("#bird").removeClass("jumping")
        clearInterval(jumpTimeout)
        jumping = 0;
    } 
    jumping = 1;
    let position = $("#bird").position().top;
    $(":root").css({"--bird-jump-start": position+"px", "--bird-jump-end": position-150+"px"});
    $("#bird").addClass("jumping")
    jumpTimeout = setTimeout(function() {
        $("#bird").removeClass("jumping")
        jumping = 0;
    }, 250)
}



const loadPage = () => {
    $("#hole").on("animationiteration", function() {
        let random = Math.random(); //retunr 0 - 1 
        let randomTop = random*(600-100) + "px"         //Height of the screen 600px - height of bird 100px
        $(this).css("top", randomTop)
    })

    const restart = () => {
        gaming = 1;
    }

    const gameOver = (birdPosition) => {
        //Game Over 
        gaming = 0;
        clearInterval(gameInterval);
    
        //Stop all animations
        $("#block").css("animationPlayState", "paused");
        $("#hole").css("animationPlayState", "paused");
    
        //Animate Bird
        $(":root").css({ "--bird-game-over": birdPosition.top - 100 + "px" });
        $("#bird").addClass("game-over")
        gameOverTimeout = setTimeout(function() {
            $("#bird").hide();
            $("#endScreen").show()
        }, 900)

        restart() 
    }

    let gameInterval = setInterval(function(){
        // bird falling
        $("#bird").css("top", $("#bird").position().top + 1 + "px");

        // Game Logic
        let _birdposition = $("#bird").position()
        let birdPosition = {
            top: _birdposition.top,
            bottom: _birdposition.top + $("#bird").height(),
            left: 150,
            right: 150 + $("#bird").width(),
        }

        //check whether a block is hitted.
        let _blockPosition = $("#block").position();
        let blockPosition = {
            left: _blockPosition.left,
            right: _blockPosition.left + $("#hole").width()
        }

        let _holePosition = $("#hole").position()
        let holePosition = {
            top: _holePosition.top,
            bottom: _holePosition.top + $("#hole").height()
        }

        //If hit ceiling or floor
        if (birdPosition.bottom >= 600 || birdPosition.top <= 0)    gameOver(birdPosition)

        // While birds not hit the block, return empty
        if (birdPosition.right < blockPosition.left || birdPosition.left > blockPosition.right) return;

        // While birds is in the holes
        if(birdPosition.bottom > holePosition.top && birdPosition.top < holePosition.bottom) return;

        gameOver(birdPosition)



    }, 1)

    $("html").on("click", function(){
        jump()
    })

    gaming = 1;
}

$(window).on("load", loadPage)