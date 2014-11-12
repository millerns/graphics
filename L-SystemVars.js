// L-System Renderer for CSSE351
// Nick Miller, 11/12/14
// Variable declaration file

//*******************************/
//*****ADJUST THESE FREELY*******/
//*******************************/

//*******************************/
//*****TWEAK WITH CAUTION********/
//*******************************/


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