var canvas;
var ctx;

// TODO: find better approach.
var spread = 100;

// https://en.wikipedia.org/wiki/Projection_(linear_algebra)#Orthogonal_projection
var orthogonalProjectionMatrix = new matrix([
    [1 * spread, 0, 0],
    [0, 1 * spread, 0],
    [0, 0, 0]
]);

function createCanvas(width, height){
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    
    ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2,canvas.height/2);
}

function fillCanvas(color){
    ctx.beginPath();
    ctx.rect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function dot(vec3, size, color){
    ctx.fillStyle = color;

    let projectedVec3 = orthogonalProjectionMatrix.multiply(vec3);

    ctx.fillRect(projectedVec3.values[0][0] - (size /2), projectedVec3.values[1][0] - (size /2), size, size);
}

function line(vec3a, vec3b, size, color){

    let projectedVec3a = orthogonalProjectionMatrix.multiply(vec3a);
    let projectedVec3b = orthogonalProjectionMatrix.multiply(vec3b);


    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(projectedVec3a.values[0][0], projectedVec3a.values[1][0]);
    ctx.lineTo(projectedVec3b.values[0][0], projectedVec3b.values[1][0]);
    ctx.stroke();
}