let jumping = 0;

const jump = () => {
    if (jumping) $("#bird").removeClass("jumping")

    jumping = 1;
    let position = $("#bird").position().top;
    $(":root").css({"--bird-jump-start": position+"px", "--bird-jump-end": position-150+"px"});
    $("#bird").addClass("jumping")
    let jumpTimeout = setTimeout(function() {
        $("#bird").removeClass("jumping")
        jumping = 0;
    }, 250)
}

const loadPage = () => {
    $("#hole").on("animationiteration", function() {
        let random = Math.random(); //retunr 0 - 1 
        let randomTop = random*(600-50) + "px"         //Height of the screen 600px - height of bird 50px
        $(this).css("top", randomTop)
    })

    let gameInterval = setInterval(function(){
        // bird falling
        $("#bird").css("top", $("#bird").position().top + 3 + "px");

        // Game Logic
    }, 10)

    $("html").on("click", function(){
        console.log("jump")
        jump()
    })
}

$(window).on("load", loadPage)