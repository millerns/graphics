// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Rendering Functions File

/**************SETTINGS***************/
const bufferSize = 1000;
const distanceAboveGround = 5;

/**************VARS***************/
var canvas;
var gl;
var colorLoc;
var thetaLoc;
var rotation = false;
/**************BUFFERS*****************/
var vBuffer;
var iBuffer;
var vPosition;
/**************ARRAYS****************/
var colors = [];
const xAxis = 0;
const yAxis = 1;
const zAxis = 2;
const axis = 0;
/**********PERSPECTIVE VALUES************/
var near = -10;
var far = 10;
var radius = 6.0;
var theta  = 3.0/2.0*Math.PI;
var phi    = 1/4*Math.PI; //.5Pi
var dr = 3.0 * Math.PI/180.0;
var left = -2.0;
var right = 2.0;
var ytop = 2.0;
var bottom = -2.0;
var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

function setupGL(){
	canvas = document.getElementById( "gl-canvas" );	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
}

function loadBuffers(){
	//  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	colorLoc = gl.getUniformLocation (program, "color");
	
	// Vertex Buffer
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	//gl.bufferData(target, size, data, usage)
	gl.bufferData(gl.ARRAY_BUFFER, bufferSize, gl.STATIC_DRAW);
    //gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	// vPosition
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// Set up Model View Matrix
	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );	
	
	// Index Buffer
	iBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferSize, gl.STATIC_DRAW);
	//gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
}


// Render a pyramid
function renderPyramid(color){
	var sides = 4;
	var trianglesPerSide = 1;
	var arrayPositions = 3 * trianglesPerSide;
	gl.uniform4fv (colorLoc, color);
	for (var i=0; i<sides; i++) {
		gl.drawElements( gl.TRIANGLES, arrayPositions, gl.UNSIGNED_BYTE, arrayPositions*i);
	}
}

// Render a cube
function renderCube(color){
	var offset = cubeIndexIndexStart; //12
	gl.uniform4fv (colorLoc, color);
	for (var i=0; i<6; i++) {
		gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, offset+(6*i) );
	}
}

// Render a diamond
function renderDiamond(){
	rotateX(Math.PI / 4.0);
	translate(-1, 1, 0);
	renderCube(colors[3]);
	resetPerspective();
}

// Render a rectangle
function renderRectangle(color){
	var offset = rectangleIndexIndexStart; //48
	gl.uniform4fv (colorLoc, color);
	gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, offset);
}

// Render the floor of the world!
function renderGround(){
	translate(0, -distanceAboveGround, 0);
	renderRectangle(colorGround);
	resetPerspective();
}

function renderTrees(){
	translate(-3, -distanceAboveGround, 3);
	renderPyramid(colorTree);
	translate(2, -.5, 1);
	renderPyramid(colorTree);
	translate(-.75, +.25, -.75);
	renderPyramid(colorTree);
	translate(-.75, +.15, +1.2);
	renderPyramid(colorTree);
	resetPerspective();
}

function renderForest(){
	// forward right (-x, +z)
	renderTrees();	
	translate(-.5, 0, 3);
	renderTrees();
	translate(-2, 0, .5);
	renderTrees();
	translate(0, 0, 1);
	renderTrees();
	// forward left (+x, +z)
	
	// back left (+x, -z)
	
	// back right (-x, -z)
	
	// renderTrees();
	translate(-3, 0, -3);
	renderTrees();
	translate(-3, 0, 0);
	renderTrees();
	translate(3, 0, 2);
	renderTrees();
	translate(5, 0, .75);
	renderTrees();
	translate(7, 0, 0);
	renderTrees();
	translate(5, 0, -4);
	renderTrees();
	translate(7, 0, -5);
	renderTrees();
	translate(5, 0, -7);
	renderTrees();
	translate(7, 0, -7);
	renderTrees();
	translate(2, 0, -2);
	renderTrees();
	translate(0, 0, -4);
	renderTrees();
	translate(-3, 0, -2);
	renderTrees();
	translate(-1, 0, -2);
	renderTrees();
}

function renderMountains(){
	translate(0, -distanceAboveGround, 10);
	scale(2, 5, 2);
	renderPyramid(colorMount);
	resetPerspective();
}

function renderSky() {
	rotateX(Math.PI/2);
	translate(0, 5, 0);
	renderRectangle(colorSky);
	resetPerspective();
	
	rotateX(-Math.PI/2);
	translate(0, 15, 0);
	renderRectangle(colorSky);
	resetPerspective();
	
	rotateZ(Math.PI/2);
	translate(0, 7, 0);
	renderRectangle(colorSky);
	resetPerspective();
	
	rotateZ(-Math.PI/2);
	translate(0, 7, 0);
	renderRectangle(colorSky);
	resetPerspective();
}

// Rotate the camera
function rotate(){
	theta += dr;
	if (theta > 2*Math.PI) {
		theta -= 2*Math.PI;
	}
	phi += dr;
	if (phi > 2*Math.PI) {
		phi -= 2*Math.PI;
	}
}

// Reset the perspective to the default position
function resetPerspective(){
	var z = Math.sin(theta)*Math.cos(phi);
	if (phi > 3.0/2.0*Math.PI || phi < Math.PI/2.0){
		z = -z;
	}
	eye = vec3(Math.cos(theta), Math.cos(phi), Math.sin(theta));
	//console.log(eye);
	//adjust perspective
	//console.log("Theta: " + theta + " Phi: " + phi + " Eye: " + eye + " At: " + at + " Up: " + up);
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
	setPerspective();
}

// Rotate the modelViewMatrix along the x axis
function rotateX(rx){
	var transform = mat4(1, 0, 0, 0, 0, Math.cos(rx), -Math.sin(rx), 0, 0, Math.sin(rx), Math.cos(rx), 0, 0, 0, 0, 1);
	modelViewMatrix = mult(modelViewMatrix, transform);
	setPerspective();
}
// Rotate the modelViewMatrix along the y axis
function rotateY(ry){
	var transform = mat4(Math.cos(ry), 0, Math.sin(ry), 0, 0, 1, 0, 0, -Math.sin(ry), 0, Math.cos(ry), 0, 0, 0, 0, 1);
	modelViewMatrix = mult(modelViewMatrix, transform);
	setPerspective();
}
// Rotate the modelViewMatrix along the z axis
function rotateZ(rz){
	var transform = mat4(Math.cos(rz), -Math.sin(rz), 0, 0, Math.sin(rz), Math.cos(rz), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
	modelViewMatrix = mult(modelViewMatrix, transform);
	setPerspective();
}
// Translate the modelViewMatix the specified distances
function translate(x, y, z){
	var transform = mat4(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
	modelViewMatrix = mult(modelViewMatrix, transform);
	setPerspective();
}
function scale(x, y, z){
	var transform = mat4(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
	modelViewMatrix = mult(modelViewMatrix, transform);
	setPerspective();	
}
// Updates the perspective with the modelViewMatrix and projectionMatrix
function setPerspective(){
	gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
}

// Render the scene
function render()
{
    gl.clear( gl.COLOR_BUFER_BIT | gl.DEPTH_BUFFER_BIT);
	resetPerspective();
	if (rotation) {rotate()};
	// model
	//renderCube(colorModel);
	// model
	renderPyramid(colorModel);
	// model
	renderDiamond(colorModel);
	//renderRectangle();
	//ground/grass
	renderGround();
	//renderTrees();
	renderForest();
	renderSky();
	requestAnimFrame (render);
}