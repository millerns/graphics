// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Variable declaration file

//*******************************/
//*****ADJUST THESE FREELY*******/
//*******************************/


//*******************************/
//*****TWEAK WITH CAUTION********/
//*******************************/

/**************SETTINGS***************/
var numVertices  = 36;
var bufferSize = 1000;


//******************************/
//****DO NOT CHANGE THESE*******/
//******************************/


/**************VARS***************/
var canvas;
var gl;
var colorLoc;
var thetaLoc;
var cubeVertexIndex = 0;
var cubeIndexIndex = 0;
var pyramidVertexIndex = 0;
var pyramidIndexIndex = 0;

/**************BUFFERS*****************/
var vBuffer;
var iBuffer;
var vPosition;

/**************ARRAYS****************/
var colors = [];
var cubeIndices = [];
var pyramidIndices = [];
var theta = [];

/****************VALUES**************/
var bytesPerV4 = 32;
var v4PerCube = 8;
var v4PerPyramid = 4;
var bytesPerIndex = 8;
var indexPerCube = 36;
var indexPerPyramid = 36;
var cubeVertexIndexIncrement = bytesPerV4 * v4PerCube;
var cubeIndexIndexIncrement = bytesPerIndex * indexPerCube;
var pyramidVertexIndexIncrement = bytesPerV4 * v4PerCube;
var pyramidIndexIndexIncrement = bytesPerIndex * indexPerCube;

var basicTetrahedronA = vec4(0.0, 0.0, -1.0, 1);
var basicTetrahedronB = vec4(0.0, 0.942809, 0.333333, 1);
var basicTetrahedronC = vec4(-0.816497, -0.471405, 0.333333, 1);
var basicTetrahedronD = vec4(0.816497, -0.471405, 0.333333, 1);
	
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;

// Sets initial values
function setInitialGlobalValues(){
	theta[0] = 0.0;
	theta[1] = 0.0;
	theta[2] = 0.0;
	colors = [
		vec4(1.0, 0.0, 0.0, 1.0),  // red
		vec4(1.0, 1.0, 0.0, 1.0),  // yellow
		vec4(0.0, 1.0, 0.0, 1.0),  // green
		vec4(0.0, 0.0, 1.0, 1.0),  // blue
		vec4(1.0, 0.0, 1.0, 1.0),  // magenta
		vec4(0.0, 1.0, 1.0, 1.0)   // cyan
	];
	cubeIndices = [
		1, 0, 3, 3, 2, 1,  // front face
		2, 3, 7, 7, 6, 2,  // right face
		3, 0, 4, 4, 7, 3,  // bottom face
		6, 5, 1, 1, 2, 6,  // top face
		4, 5, 6, 6, 7, 4,  // back face
		5, 4, 0, 0, 1, 5   // left face
	];
	pyramidIndices = [
		0, 1, 2, // bottom face
		0, 1, 3, // front face
		0, 2, 3, // back face
		1, 2, 3	 // other back face
	];	
}