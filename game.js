const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let xPos = Math.floor(Math.random() * (Math.floor(canvas.width - 50) - Math.floor(0) + 1)) + Math.floor(0);
let yPos = 10;
let xSpeed = 4;
let ySpeed = 4;
let score = 0;
let maxScore = 0;
let attempt = 1;
let difficultyIncreaser = 3;

let xPosSlider = canvas.width / 2 - 70;
let yPosSlider = canvas.height - 29;


let imgBall = new Image();
imgBall.src = "fireball.png";

let imgSlider = new Image();
imgSlider.src = "slider.png";

imgBall.onload = draw;
imgSlider.onload = draw;

let bgImage = new Image();
bgImage.src = 'canvasbackground.png';


function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw canvas background
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

	// Draw the images
	ctx.drawImage(imgBall, xPos, yPos, 45, 45);
	ctx.drawImage(imgSlider, xPosSlider, yPosSlider, 140, 30);


	// if the game has not started yet, the initial state will be drawn but the game will not start.
	if (!gameStarted) {
        return;
    }
	// Request the browser to call draw() again for the next frame
	requestAnimationFrame(update); // Call update() again to animate the next frame
}

function update() {
	ballMove();
	gamelogic();	
	
	// Call the draw() function to update the canvas
	draw();
}

function ballMove () {
	// Update the object's position
	xPos += xSpeed;
	yPos += ySpeed;

	// If the object hits the canvas edge, reverse its direction
	if (xPos + 45 > canvas.width || xPos < 0) {
		xSpeed = -xSpeed;
	}

	if (yPos + 10 > canvas.height) {
		xPos = Math.floor(Math.random() * (Math.floor(canvas.width - 50) - Math.floor(0) + 1)) + Math.floor(0);
		yPos = 10;
		xSpeed =- xSpeed;
		score = 0;
		attempt += 1;
		xSpeed = 4;
		ySpeed = 4;
	}

	if (yPos < 0) {
		ySpeed = -ySpeed;
	}

	if ((yPos + 45 >= yPosSlider && yPos + 45 <= yPosSlider + 2) && (xPos <= xPosSlider + 140 && xPos + 45 >= xPosSlider)) {
		ySpeed = -ySpeed;
		score += 1
	}
}

function gamelogic(){
	scoreIncrement();
	if (score > difficultyIncreaser) {
		if (xSpeed < 0){
			xSpeed -= 1;
		}
		else{
			xSpeed += 1;
		}

		if (ySpeed < 0){
			ySpeed -= 1;
		}
		else{
			ySpeed += 1;
		}
		difficultyIncreaser += 3;
	}
}


function scoreIncrement() {
	const elements = document.getElementsByTagName('h2');
	elements[0].textContent = 'Score: ' + score;
	if (score >= maxScore) {
		maxScore = score;
		elements[1].textContent = 'Max Score: ' + maxScore;
	}
	elements[2].textContent = 'Attempt: ' + attempt;
}

document.addEventListener("keydown", function (event) {
	moveSlider(event.key);
});

function moveSlider(key) {
	if (key == "ArrowLeft") {
		if (xPosSlider - 50 >= 0) {
			xPosSlider -= 50;
		}
		else if (xPosSlider - 50 < 0){
			xPosSlider  = 0;
		}
	} else if (key == "ArrowRight") {
		if (xPosSlider + 140 + 50 <= canvas.width) {
			xPosSlider += 50;
		}
		else if (canvas.width - (xPosSlider + 140) < 50){
			xPosSlider = canvas.width - 140;
		}
	}
}

let gameStarted = false;

function startGame() {
	gameStarted = true;
	update();
}

function resetGame() {
	xPos = Math.floor(Math.random() * (Math.floor(canvas.width - 50) - Math.floor(0) + 1)) + Math.floor(0);
	yPos = 10;
	xSpeed = 4;
	ySpeed = 4;
	score = 0;
	maxScore = 0;
	attempt = 1;
	difficultyIncreaser = 3;
	xPosSlider = canvas.width / 2 - 70;
	yPosSlider = canvas.height - 29;
}