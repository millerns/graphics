// L-System Renderer for CSSE351 
// Nick Miller, 11/12/14
// Settings & Init File

// Loads all data and starts the animation
window.onload = function init()
{
	setInitialGlobalValues();
	setupGL();
	loadBuffers();
	addBasicPyramid();
	addBasicCube();
	addBasicRectangle();
	setButtonListeners();
    render();
};

// Register event listeners for the buttons
function setButtonListeners(){
	document.getElementById("RotateXButton").onclick = function(){setRotation(xAxis);};
	document.getElementById("RotateYButton").onclick = function (){setRotation(yAxis); };
	document.getElementById("RotateZButton").onclick = function (){setRotation(zAxis); };
	document.getElementById("RotationToggleButton").onclick = function () { toggleRotation();};
	
	document.onkeydown = function(e) {handleKeyboard(e);};
}

function setRotation(axis){
	switch (axis) {
		case (xAxis):
				axis = xAxis;
			break;
		case (yAxis):
				axis = yAxis;
			break;
		case (zAxis):
				axis = zAxis;
			break;
		default:
			break;
	}
}

// Toggles continuous rotation on and off.
function toggleRotation() {
	rotation = !rotation;
}

// Respond to keyboard input
function handleKeyboard(k){
	switch (k.keyCode) {
		case 37:
			//leftKey();
			rotateLeft();
			break;
		case 38:
			//upKey();
			rotateUp();
			break;
		case 39:
			//rightKey();
			rotateRight();
			break;
		case 40:
			//downKey();
			rotateDown();
			break;
		default:
	}
}

// Moves the camera left
function rotateLeft(){
	theta += dr;
}
// Moves the camera right
function rotateRight(){
	theta -= dr;
}
// Moves the camera up
function rotateUp(){
	phi -= dr;
	if (phi < 0) {phi = 0;}
}
// Moves the camera down
function rotateDown(){
	phi += dr;
	if (phi > Math.PI) {phi = Math.PI;}
}