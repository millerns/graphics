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
var viewDistance = 5;
var left = -viewDistance;
var right = viewDistance;
var ytop = viewDistance;
var bottom = -viewDistance;
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

// Render a cube
function renderCube(){
	for (var i=0; i<6; i++) {
		gl.uniform4fv (colorLoc, colors[i]);
		gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, cubeVertexIndexStart+(6*i) );
	}
}

// Render a pyramid
function renderPyramid(){
	var sides = 4;
	var trianglesPerSide = 1;
	var arrayPositions = 3 * trianglesPerSide;
	for (var i=0; i<sides; i++) {
		gl.uniform4fv (colorLoc, colors[i]);
		//drawElements(mode, number of elements, type of indices, indices location
		gl.drawElements( gl.TRIANGLES, arrayPositions, gl.UNSIGNED_BYTE, pyramidVertexIndexStart+(arrayPositions*i));
	}
}

function initializeLight(){
	// light = vec3(0.0, 2.0, 0.0);
	// light = vec3(a, b, c);
	// m = mat4();
	
	// m[11] = 0.0;
	// m[5] = -1.0/light.y;
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
	//console.log(gl.GetBufferSubData(gl.ARRAY_BUFFER, 100, 1));
	console.log(pyramidVertexIndexStart);
	console.log(pyramidVertexIndex);
	console.log(pyramidIndexIndex);
	console.log(iBuffer);
	console.log(vBuffer[101]);
    gl.clear( gl.COLOR_BUFER_BIT | gl.DEPTH_BUFFER_BIT);
	adjustPerspective();
	if (rotation) {rotate()};
	renderPyramid();	
	//renderCube();
	//requestAnimFrame (render);
}