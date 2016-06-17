var move_up = 0;
var move_down = 0;
var hit = new sound("hit.mp3");
var bgm = new sound('bgm_3.mp3');
var gameover = new sound("gameover.mp3");
var canvas = document.getElementById("game_area");
var pad1 = canvas.getContext("2d");
var pad2 = canvas.getContext("2d");
var object = canvas.getContext("2d");
var pongball = new Image();
pongball.src = "ball.png";
var time = new Date();
var start_time = time.getTime();

var paddle1 = {
    x: 5,
    y: 160,
    width: 15,
    height: 100,
    score: 0,
    color: 'yellow'
}

var paddle2 = {
    x: 1280,
    y: 160,
    width: 15,
    height: 100,
    score: 0,
    color: 'aqua'
}

var ball = {
    x: 625,
    y: 190,
    width: 20,
    height: 20,
    speed: 5,
    left: 1,         //ball.left=1 shows ball should move leftwards
    down: 1,         //ball.down=1 shows ball should move downwards 
    move: 1,         //ball.move=1 shows ball should move
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

window.addEventListener("keydown", move, false);
pad1.fillStyle = paddle1.color;
pad1.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
pad2.fillStyle = paddle2.color;
pad2.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

function animate() {
    if (ball.move == 1) {
        reqAnimFrame = window.mozRequestAnimationFrame || //since different browsers have different names for this function
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame;

        reqAnimFrame(animate);
        draw();
    }
}

function draw() {
    pad1.clearRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    pad2.clearRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    object.clearRect(ball.x, ball.y, ball.width, ball.height);
    var t = new Date();

    if ((ball.x == (paddle1.x + 15)) && (((ball.y < (paddle1.y + 100)) && (ball.y > paddle1.y)) || (((ball.y + 20) < (paddle1.y + 100)) && ((ball.y + 20) > paddle1.y)))) {
        ball.collide = 1;
        ball.left = 0;
        hit.play();
        paddle1.score++;
        paddle1.y = Math.floor(Math.random() * 300);
    } else if ((ball.x == (paddle2.x - 15)) && (((ball.y < (paddle2.y + 100)) && (ball.y > paddle2.y)) || (((ball.y + 20) < (paddle2.y + 100)) && ((ball.y + 20) > paddle2.y)))) {
        ball.collide = 1;
        ball.left = 1;
        hit.play();
        paddle2.score++;
        paddle2.y = Math.floor(Math.random() * 300);
    }

    if (move_up == 1) {
        if (ball.left == 1) {
            paddle1.y -= 50;
            move_up = 0;
        } else {
            paddle2.y -= 50;
            move_up = 0;
        }
    }
    if (move_down == 1) {
        if (ball.left == 1) {
            paddle1.y += 50;
            move_down = 0;
        } else {
            paddle2.y += 50;
            move_down = 0;
        }
    }


    if (ball.left == 1) {
        ball.x -= ball.speed;
        if (ball.down == 1) {
            ball.y += ball.speed;
        } else {
            ball.y -= ball.speed;
        }
    } else {
        ball.x += ball.speed;
        if (ball.down == 1) {
            ball.y += ball.speed;
        } else {
            ball.y -= ball.speed;
        }
    }
    if (ball.y <= 0) {
        ball.y += ball.speed;
        ball.down = 1;
    }
    if (ball.y >= 380) {
        ball.y -= ball.speed;
        ball.down = 0;
    }

    pad1.fillStyle = paddle1.color;
    pad1.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    pad2.fillStyle = paddle2.color;
    pad2.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    object.drawImage(pongball, ball.x, ball.y, ball.width, ball.height);

    document.getElementById("score").innerHTML = "SCORE = " + paddle1.score + " : " + paddle2.score;
    if (ball.x <= 0) {
        object.clearRect(ball.x, ball.y, ball.width, ball.height);
        paddle2.score++;
        document.getElementById("score").innerHTML = "SCORE = " + paddle1.score + " : " + paddle2.score;
        bgm.stop();
        gameover.play();
        pad1.clearRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
        pad2.clearRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
        pad1.rect(0, 0, 1300, 400);
        pad1.fillStyle = "#009900";
        pad1.fill();
        object.font = "50px 'Exo',sans-serif";
        object.fillStyle = "white";
        object.fillText("GAME OVER !!", 494, 150);
        object.fillText("PLAYER-2 WINS !", 465, 220);
        ball.move = 0;
    }

    if (ball.x >= 1280) {
        object.clearRect(ball.x, ball.y, ball.width, ball.height);
        paddle1.score++;
        document.getElementById("score").innerHTML = "SCORE = " + paddle1.score + " : " + paddle2.score;
        bgm.stop();
        gameover.play();
        pad1.clearRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
        pad2.clearRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
        pad1.rect(0, 0, 1300, 400);
        pad1.fillStyle = "#009900";
        pad1.fill();
        object.font = "50px 'Exo',sans-serif";
        object.fillStyle = "white";
        object.fillText("GAME OVER !!", 494, 150);
        object.fillText("PLAYER-1 WINS !", 465, 220);
        ball.move = 0;
    }

}

function start() {
    bgm.play();
    animate();

}

function move(e) {
    if (e.keyCode == 38) {
        move_up = 1;
    }

    if (e.keyCode == 40) {
        move_down = 1;
    }
}

function resume() {
    ball.move = 1;
    animate();
    //start();
}

function pause() {
    ball.move = 0;
    bgm.stop();
}