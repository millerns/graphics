// L-System Renderer for CSSE351 
// Nick Miller, 11/12/14
// Settings & Init File

// Loads all data and starts the animation
window.onload = function init()
{
	setInitialGlobalValues();
	setupGL();
	loadBuffers();
	//addBasicCube(); 
	addBasicPyramid();
	setButtonListeners();
    render();
};

// Register event listeners for the buttons
function setButtonListeners(){
	document.getElementById("Button1").onclick = function(){axis = xAxis;};
	document.getElementById("Button2").onclick = function () { axis = yAxis; };
	document.getElementById("Button3").onclick = function () { axis = zAxis; };
	document.getElementById("Button4").onclick = function () { theta = [0.0, 0.0, 0.0]; axis = xAxis };
}