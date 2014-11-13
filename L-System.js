// L-System Renderer for CSSE351 
// Nick Miller, 11/12/14
// Settings & Init File

// Loads all data and starts the animation
window.onload = function init()
{
	setInitialGlobalValues();
	setupGL();
	loadBuffers();
	initializeLight();
	//addBasicCube(); 
	addBasicPyramid();
	setButtonListeners();
    render();
};

// Register event listeners for the buttons
function setButtonListeners(){
	document.getElementById("RotateXButton").onclick = function(){setRotation(xAxis);};
	document.getElementById("RotateYButton").onclick = function (){setRotation(yAxis); };
	document.getElementById("RotateZButton").onclick = function (){setRotation(zAxis); };
	document.getElementById("RotationToggleButton").onclick = function () { toggleRotation();};
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

function toggleRotation() {
	rotation = !rotation;
}