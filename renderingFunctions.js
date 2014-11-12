// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Rendering Functions File

/**************SETTINGS***************/
var numVertices  = 36;
var bufferSize = 1000;

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
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
/**********PERSPECTIVE VALUES************/
var near = -10;
var far = 10;
var radius = 6.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;
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
	//thetaLoc = gl.getUniformLocation (program, "theta");
	
	// Vertex Buffer
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	//gl.bufferData(target, size, data, usage)
	gl.bufferData(gl.ARRAY_BUFFER, bufferSize, gl.STATIC_DRAW);
    //gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

	// Position buffer
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

// Rotate the scene
// function rotate(){
	// theta[axis] += 1.0;
// }

// Render a cube
function renderCube(){
	for (var i=0; i<6; i++) {
		gl.uniform4fv (colorLoc, colors[i]);
		gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 6*i );
	}
}

// Render a pyramid
function renderPyramid(){
	var sides = 4;
	var trianglesPerSide = 1;
	var arrayPositions = 3 * trianglesPerSide;
	for (var i=0; i<sides; i++) {
		gl.uniform4fv (colorLoc, colors[i]);
		gl.drawElements( gl.TRIANGLES, arrayPositions, gl.UNSIGNED_BYTE, arrayPositions*i );
	}
}

function rotate(){
	theta += dr;
	if (theta > 2*Math.PI) {
		theta -= 2*Math.PI;
	}
}

function adjustPerspective(){
	eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
				radius*Math.sin(theta)*Math.sin(phi), 
				radius*Math.cos(theta));
	//adjust perspective
	console.log("Theta: " + theta + " Phi: " + phi + " Eye: " + eye + " At: " + at + " Up: " + up);
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
	gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
}

// Render the scene
function render()
{
    gl.clear( gl.COLOR_BUFER_BIT | gl.DEPTH_BUFFER_BIT);
	adjustPerspective();
	if (rotation) {rotate()};
	renderPyramid();	
	
	requestAnimFrame (render);
}