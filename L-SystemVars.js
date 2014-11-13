// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Variable declaration file

//*******************************/
//*****ADJUST THESE FREELY*******/
//*******************************/

//*******************************/
//*****TWEAK WITH CAUTION********/
//*******************************/
const colorGround = vec4(0, 1, 0, 1.0); // green		0	255	0
const colorModel = vec4(.97, .97, 1, 1.0); // grey		248	248	255
const colorSky = vec4(0, .75, 1, 1.0); // light blue	0	191	255
const colorTree = vec4(.13, .55, .13, 1.0); // dark green	34	139	34
const colorMount = vec4(.69, .77, .87, 1.0); // grey 				176	196	222
const colorSun = vec4(1, 1, 0, 1); // yellow	255	255	0

//******************************/
//****DO NOT CHANGE THESE*******/
//******************************/

// Sets initial values
function setInitialGlobalValues(){
	colors = [
		vec4(1.0, 0.0, 0.0, 1.0),  // red
		vec4(1.0, 1.0, 0.0, 1.0),  // yellow
		vec4(0.0, 1.0, 0.0, 1.0),  // green
		vec4(0.0, 0.0, 1.0, 1.0),  // blue
		vec4(1.0, 0.0, 1.0, 1.0),  // magenta
		vec4(0.0, 1.0, 1.0, 1.0)   // cyan
	];
	pyramidIndices = [
		0, 1, 2, 
		0, 1, 3, 
		0, 2, 3, 
		1, 2, 3	 
	];
	cubeIndices = [
		1, 0, 3, 3, 2, 1,  // front face
		2, 3, 7, 7, 6, 2,  // right face
		3, 0, 4, 4, 7, 3,  // bottom face
		6, 5, 1, 1, 2, 6,  // top face
		4, 5, 6, 6, 7, 4,  // back face
		5, 4, 0, 0, 1, 5   // left face
	];
	for (var i = 0; i < cubeIndices.length; i++){
		cubeIndices[i] += vec4PerPyramid;
	}
	rectangleIndices = [
		0, 1, 2, 2, 3, 0
	];
	for (var i = 0; i < rectangleIndices.length; i++){
		rectangleIndices[i] += vec4PerPyramid + vec4PerCube;
	}
	sphereIndices = [];
	defineSphereIndices();
	for (var i = 0; i < sphereIndices.length; i++){
		sphereIndices[i] += vec4PerPyramid + vec4PerCube + vec4PerRectangle;
	}
	
	
	//console.log(rectangleIndices);
	
	pyramidVertexIndexStart = 0;
	pyramidIndexIndexStart = 0;
	cubeVertexIndexStart = pyramidVertexIndexStart+ pyramidVertexIndexIncrement;
	cubeIndexIndexStart = pyramidIndexIndexStart+ pyramidIndexIndexIncrement;
	rectangleVertexIndexStart = cubeVertexIndexStart + cubeVertexIndexIncrement;
	rectangleIndexIndexStart = cubeIndexIndexStart + cubeIndexIndexIncrement;
	sphereVertexIndexStart = rectangleVertexIndexStart + rectangleVertexIndexIncrement;
	rectangleIndexIndexStart = rectangleIndexIndexStart + rectangleIndexIndexIncrement;
	pyramidVertexIndex = pyramidVertexIndexStart;
	pyramidIndexIndex = pyramidIndexIndexStart;
	cubeVertexIndex = cubeVertexIndexStart;
	cubeIndexIndex = cubeIndexIndexStart;
	rectangleVertexIndex = rectangleVertexIndexStart;
	rectangleIndexIndex = rectangleIndexIndexStart;
	sphereVertexIndex = sphereVertexIndexStart;
	sphereIndexIndex = sphereIndexIndexStart;
}

function defineSphereIndices(){
	
}