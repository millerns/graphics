// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Shape Functions File

var groundSize = 10;
/**************VARS***************/
var cubeVertexIndex;
var cubeIndexIndex;
var cubeVertexIndexStart;
var cubeIndexIndexStart;
var pyramidVertexIndex;
var pyramidIndexIndex;
var pyramidVertexIndexStart;
var pyramidIndexIndexStart;
var rectangleVertexIndex;
var rectangleIndexIndex;
var rectangleVertexIndexStart;
var rectangleIndexIndexStart;
/**************ARRAYS****************/
var cubeIndices = [];
var pyramidIndices = [];
/****************VALUES**************/
const bytesPerUint = 4;
const uintPerVec4 = 4;
const vec4PerPyramid = 4;
const pyramidVertexIndexIncrement = bytesPerUint * uintPerVec4 * vec4PerPyramid;
const vec4PerCube = 8;
const cubeVertexIndexIncrement = bytesPerUint * uintPerVec4 * vec4PerCube;
const vec4PerRectangle = 4;
const rectangleVertexIndexIncrement = bytesPerUint * uintPerVec4 * vec4PerRectangle;
const bytesPerIndex = 1;
const indexPerPyramid = 12;
const pyramidIndexIndexIncrement = bytesPerIndex * indexPerPyramid;
const indexPerCube = 36;
const cubeIndexIndexIncrement = bytesPerIndex * indexPerCube;
const indexPerRectangle = 6;
const rectangleIndexIndexIncrement = bytesPerIndex * indexPerRectangle;

// Add a cube to the vertex and index buffer
function addCube(v1, v2, v3, v4, v5, v6, v7, v8){
	// console.log("CVI: " + cubeVertexIndex);	// CVI: 64
	// console.log("CII: " + cubeIndexIndex);	// CII: 12

	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, cubeVertexIndex, flatten([v1, v2, v3, v4, v5, v6, v7, v8]));	
	cubeVertexIndex += cubeVertexIndexIncrement;
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, cubeIndexIndex, new Uint8Array(cubeIndices));	
	cubeIndexIndex += cubeIndexIndexIncrement;
}

// Add a pyramid to the vertex and index buffer
function addPyramid(v1, v2, v3, v4){
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, pyramidVertexIndex, flatten([v1, v2, v3, v4]));	
	pyramidVertexIndex += pyramidVertexIndexIncrement;
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, pyramidIndexIndex, new Uint8Array(pyramidIndices));	
	pyramidIndexIndex += pyramidIndexIndexIncrement;
}

// Add a rectangle to the vertex and index buffer
function addRectangle(v1, v2, v3, v4){
	// console.log("RVI: " + rectangleVertexIndex); // RVI: 64
	// console.log("RII: " + rectangleIndexIndex);	 // RII: 12
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferSubData(gl.ARRAY_BUFFER, rectangleVertexIndex, flatten([v1, v2, v3, v4]));
	rectangleVertexIndex += rectangleVertexIndexIncrement;
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, rectangleIndexIndex, new Uint8Array(rectangleIndices));	
	rectangleIndexIndex += rectangleIndexIndexIncrement;
}

// Add a standard pyramid to the scene
function addBasicPyramid(){
	var basicTetrahedronA = vec4(0.0, 0.0, -1.0, 1);
	var basicTetrahedronB = vec4(0.0, 0.942809, 0.333333, 1);
	var basicTetrahedronC = vec4(-0.816497, -0.471405, 0.333333, 1);
	var basicTetrahedronD = vec4(0.816497, -0.471405, 0.333333, 1);
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

function addXZRectangle() {
	var v1 = vec4(-groundSize, 0, -groundSize, 1);
	var v2 = vec4(-groundSize, 0, groundSize, 1);
	var v3 = vec4(groundSize, 0, groundSize, 1);
	var v4 = vec4(groundSize, 0, -groundSize, 1);
	addRectangle(v1, v2, v3, v4);
}

function addYZRectangle() {
	var v1 = vec4(0, -groundSize, -groundSize, 1);
	var v2 = vec4(0, -groundSize, groundSize, 1);
	var v3 = vec4(0, groundSize, groundSize, 1);
	var v4 = vec4(0, groundSize, -groundSize, 1);
	addRectangle(v1, v2, v3, v4);
}

function addXYRectangle() {
	var v1 = vec4(-groundSize, -groundSize, 0, 1);
	var v2 = vec4(-groundSize, groundSize, 0, 1);
	var v3 = vec4(groundSize, groundSize, 0, 1);
	var v4 = vec4(groundSize, -groundSize, 0, 1);
	addRectangle(v1, v2, v3, v4);
}

function addBasicRectangle() {
	//addXYRectangle();
	addXZRectangle();
	//addYZRectangle();
}