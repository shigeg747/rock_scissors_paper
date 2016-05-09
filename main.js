'use strict';
(function(global) {

    const HAND_FORMS = [
        0, // paper
        1, // rock
        2  // scissors
    ];
    const HAND_X = [
        0,   // rock
        380, // scissors
        750  // paper
    ];
    const HAND_WIDTH = [
        360, // rock
        340, // scissors
        430  // paper
    ];
    const IMAGE_PATH = './images/sprite.png';
    const FPS = 60;
    let isPause = false;
    let currentFrame = 0;

    function main() {
        const canvas = document.getElementById('screen');
        const context = canvas.getContext('2d');
        const imageObj = new Image();
        currentFrame = 0;

        imageObj.onload = function () {
            function loop () {
                if (!isPause) {
                    draw(canvas, context, imageObj, currentFrame++);
                }
                setTimeout(loop, 1000/FPS);
            }
            loop();
        };
        imageObj.src = IMAGE_PATH;
    }

    function draw(canvas, context, imageObject, frame) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 0: rock, 1, scissors, 2: paper
        const handIndex = frame % HAND_FORMS.length;
        const width = imageObject.width / HAND_FORMS.length;
        const sx = HAND_X[handIndex];
        const swidth = HAND_WIDTH[handIndex];

        context.drawImage(
            imageObject,
            //width * handIndex - margin,
            sx,
            0,
            swidth,
            imageObject.height,
            0,
            0,
            swidth,
            canvas.height
        );
    }

    function setButtonAction() {
        const rock = document.getElementById('rock');
        const scissors = document.getElementById('scissors');
        const paper = document.getElementById('paper');
        const restart = document.getElementById('restart');

        function onClick(event) {
            const myHandType = parseInt(event.target.value, 10);
            const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);
            isPause = true;
            judge(myHandType, enemyHandType);
        }

        // decide hand
        rock.addEventListener('click', onClick);
        scissors.addEventListener('click', onClick);
        paper.addEventListener('click', onClick);

        // restart
        restart.addEventListener('click', function (){
            window.location.reload();
        });
    }

    function judge(myHandType, enemyHandType) {
        // 0: DRAW, 1: LOSE, 2: WIN
        const result = (myHandType - Math.abs(enemyHandType) + 3) % HAND_FORMS.length;

        if (result === 0) {
            alert('DRAW!');
        } else if (result === 1) {
            alert('YOU LOSE!');
        } else {
            alert('YOU WIN!');
        }
    }

    setButtonAction();
    main();
})(window);
