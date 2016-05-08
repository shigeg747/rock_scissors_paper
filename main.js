'use strict';
(function(global) {

    const HAND_FORMS = [
        0, // rock
        1, // scissors
        2  // paper
    ];
    const HAND_X = [
        0, // rock
        380, // scissors
        750  // paper
    ];
    const HAND_WIDTH = [
        360, // rock
        340, // scissors
        430  // paper
    ];
    const IMAGE_PATH = './images/sprite.png';
    const FPS = 10;

    function main() {
        const canvas = document.getElementById('screen');
        const context = canvas.getContext('2d');
        const imageObj = new Image();
        let currentFrame = 0;

        imageObj.onload = function () {
            function loop () {
                draw(canvas, context, imageObj, currentFrame++);
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
        //const margin = ADJUST_MARGIN[handIndex];

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

    main();
})(window);
