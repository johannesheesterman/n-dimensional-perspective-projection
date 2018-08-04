createCanvas(600, 600);
fillCanvas("black");

// TODO: 
// add camera
// read up on https://en.wikipedia.org/wiki/3D_projection#Orthographic_projection

var cube = [
    new matrix([[-1], [1], [1]]), // Front nodes
    new matrix([[1], [1], [1]]),
    new matrix([[-1], [-1], [1]]),
    new matrix([[1], [-1], [1]]),

    new matrix([[-1], [1], [-1]]), // Back nodes
    new matrix([[1], [1], [-1]]),
    new matrix([[-1], [-1], [-1]]),
    new matrix([[1], [-1], [-1]])
];

var edges = [
    [0,1], // Front edges
    [1,3],
    [3,2],
    [2,0],

    [4,5], // Back edges
    [5,7],
    [7,6],
    [6,4],

    [0,4], // Connect front and back edges
    [1,5],
    [3,7],
    [2,6]
];

var angle = 0;

function draw(){
    requestAnimationFrame(draw);
    fillCanvas("black");

    var rotationZ = new matrix([
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ]);

    var rotationX = new matrix([
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]);

    var rotationY = new matrix([
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ]);

    for(let v of cube) {
        let rotatedV = rotationY.multiply(v);
        rotatedV = rotationX.multiply(rotatedV);
        // Plot the 3d coordinates.
        dot(rotatedV, 10, "white");
    }

    for(let edge of edges){
        let rotatedVa = rotationY.multiply(cube[edge[0]]);
        rotatedVa = rotationX.multiply(rotatedVa);

        let rotatedVb = rotationY.multiply(cube[edge[1]]);
        rotatedVb = rotationX.multiply(rotatedVb);

        line(rotatedVa, rotatedVb, 1, "white");
    }

    angle += 0.01
}

draw();