// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Shape Functions File


/**************VARS***************/
var cubeVertexIndex = 0;
var cubeIndexIndex = 0;
var pyramidVertexIndex = 0;
var pyramidIndexIndex = 0;
/**************ARRAYS****************/
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



// Add a cube to the vertex and index buffer
function addCube(v1, v2, v3, v4, v5, v6, v7, v8){
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, cubeVertexIndex, flatten([v1, v2, v3, v4, v5, v6, v7, v8]))
	
	cubeVertexIndex += cubeVertexIndexIncrement;
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, cubeIndexIndex, new Uint8Array(cubeIndices));
	
	cubeIndexIndex += cubeIndexIndexIncrement;
}

// Add a pyramid to the vertex and index buffer
function addPyramid(v1, v2, v3, v4){
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, pyramidVertexIndex, flatten([v1, v2, v3, v4]))
	
	pyramidVertexIndex += pyramidVertexIndexIncrement;
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexIndex, new Uint8Array(pyramidIndices));
	
	pyramidIndexIndex += pyramidIndexIndexIncrement;
}

// Add a standard pyramid to the scene
function addBasicPyramid(){
	addPyramid(basicTetrahedronA, basicTetrahedronB, basicTetrahedronC, basicTetrahedronD);
}

// Add a standard cube to the scene
function addBasicCube(){
	var v1 = vec4(-0.5, -0.5, 0.5, 1.0);
	var v2 = vec4(-0.5, 0.5, 0.5, 1.0);
	var v3 = vec4(0.5, 0.5, 0.5, 1.0);
	var v4 = vec4(0.5, -0.5, 0.5, 1.0);
	var v5 = vec4(-0.5, -0.5, -0.5, 1.0);
	var v6 = vec4(-0.5, 0.5, -0.5, 1.0);
	var v7 = vec4(0.5, 0.5, -0.5, 1.0);
	var v8 = vec4(0.5, -0.5, -0.5, 1.0);
	addCube(v1, v2, v3, v4, v5, v6, v7, v8);
}