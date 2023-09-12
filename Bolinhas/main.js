(function () {
    var field = document.getElementById("field");

    for (var i = 0; i < 180; i++) {
        var b = document.createElement("div");
        b.className = "ball";
        b.style.backgroundColor = "hsl(" + i + ",100%,70%)";
        field.appendChild(b);
    }

    field.style.height = window.innerHeight + "px";
    field.style.perspectiveOrigin = window.innerWidth / 2 + "px " + window.innerHeight / 2 + "px";

    var maxX = window.innerWidth;
    var maxY = window.innerHeight;

    var gridSize = 150;
    var balls = document.getElementsByClassName("ball");

    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i];

        ball.stretchFactor = 1 + Math.random() * 3;

        ball.angle = (Math.PI / 180) * i;

        ball.duration = Math.random() * (16 - 8) + 8;

        ball.start = null;
    }

    function step(timestamp) {
        var progress, x, y, z;

        for (var i = 0; i < balls.length; i++) {
            var ball = balls[i];

            if (ball.start === null) {
                ball.start = timestamp;
            }

            ball.progress = (timestamp - ball.start) / ball.duration / 1000;

            x = Math.cos(ball.progress * 2 * Math.PI);
            z = Math.sin(ball.progress * 2 * Math.PI);

            x = x * gridSize + maxX / 2;
            y = maxY / 2;
            z = z * gridSize;

            var rx = (y - maxY / 2) * Math.sin(ball.angle) + (x - maxX / 2) * Math.cos(ball.angle) + maxX / 2;
            var ry = (y - maxY / 2) * Math.cos(ball.angle) - (x - maxX / 2) * Math.sin(ball.angle) + maxY / 2;

            ball.style.transform = `translate3d(${rx}px, ${ry}px, ${z}px)`;
            ball.style.zIndex = Math.round(z);

            if (ball.progress >= 1) ball.start = null;
        }

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
})();