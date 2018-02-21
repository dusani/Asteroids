const controls = (controlMovement) => {
    
    function keyDown(playerKeyPress) {
        var keyPressed = playerKeyPress.which;
        if (keyPressed == 38)
            controlMovement.upPressed = 1;
        if (keyPressed == 40)
            controlMovement.downPressed = 1;
        if (keyPressed == 37)
            controlMovement.leftPressed = 1;
        if (keyPressed == 39)
            controlMovement.rightPressed = 1;
    }

    function keyUp(playerKeyPress) {
        var keyPressed = playerKeyPress.which;
        if (keyPressed == 38)
            controlMovement.upPressed = 0;
        if (keyPressed == 40)
            controlMovement.downPressed = 0;
        if (keyPressed == 37)
            controlMovement.leftPressed = 0;
        if (keyPressed == 39)
            controlMovement.rightPressed = 0;
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}

export default controls;