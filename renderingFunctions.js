// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Rendering Functions File

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
	thetaLoc = gl.getUniformLocation (program, "theta");
	
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
	
	// Index Buffer
	iBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, bufferSize, gl.STATIC_DRAW);
	//gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
}

// Rotate the scene
function rotate(){
	theta[axis] += 1.0;
}

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

// Render the scene
function render()
{
    gl.clear( gl.COLOR_BUFER_BIT | gl.DEPTH_BUFFER_BIT);
	rotate();
	gl.uniform3fv (thetaLoc, flatten(theta));
	//renderCube();
	renderPyramid();
	requestAnimFrame (render);
}