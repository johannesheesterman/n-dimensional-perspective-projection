createCanvas(window.innerWidth, window.innerHeight);
fillCanvas("black");

var cube = [
    new Vec3(-1, 1, 1), // Front nodes
    new Vec3(1, 1, 1),
    new Vec3(-1, -1, 1),
    new Vec3(1, -1, 1),

    new Vec3(-1, 1, -1), // Back nodes
    new Vec3(1, 1, -1),
    new Vec3(-1, -1, -1),
    new Vec3(1, -1, -1)
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
    
    for(let v of cube) {
        dot(v, 5, "white");
    }

    for(let edge of edges){        
        line(cube[edge[0]], cube[edge[1]], 1, "white");
    }

    //orientation.y += 0.01
}

draw();

