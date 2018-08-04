var Configuration = function(){
    this.speed = 0.1;
    this.fov = 600;
};

var configuration = new Configuration();

window.onload = function(){
    var gui = new dat.GUI();
    gui.add(configuration, 'speed', 0, 1);
    gui.add(configuration, 'fov');
};

var canvas;
var ctx;

// TODO: find better approach.
var scale = 100;

// https://en.wikipedia.org/wiki/Projection_(linear_algebra)#Orthogonal_projection
var orthogonalProjectionMatrix = new matrix([
    [1 * scale, 0, 0],
    [0, 1 * scale, 0],
    [0, 0, 0]
]);

var camera = new matrix([
    [0], [0], [-5]
]);
var orientation = new matrix([
    [0], [0], [0]
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

    let projectedVec3 = projectVec3(vec3);

    ctx.fillRect(projectedVec3.values[0][0] - (size /2), projectedVec3.values[1][0] - (size /2), size, size);
}

function line(vec3a, vec3b, size, color){

    let projectedVec3a = projectVec3(vec3a);
    let projectedVec3b = projectVec3(vec3b);

    // let projectedVec3a = orthogonalProjectionMatrix.multiply(vec3a);
    // let projectedVec3b = orthogonalProjectionMatrix.multiply(vec3b);


    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(projectedVec3a.values[0][0], projectedVec3a.values[1][0]);
    ctx.lineTo(projectedVec3b.values[0][0], projectedVec3b.values[1][0]);
    ctx.stroke();
}

// https://en.wikipedia.org/wiki/3D_projection
function projectVec3(vec3){
    // apply camera
    vec3 = vec3.subtract(camera);

    // TODO: apply orientation matrices.    

    let x = (configuration.fov / vec3.values[2][0]) * vec3.values[0][0];
    let y = (configuration.fov / vec3.values[2][0]) * vec3.values[1][0];

    return new matrix([
        [x], [y], [0]
    ]);
}


window.addEventListener("keydown", function(ev){
    switch(ev.keyCode){
        case 87: // W
            camera.values[2][0] += configuration.speed;
            break;
        case 68: // D
            camera.values[0][0] += configuration.speed;
            break;
        case 83: // S
            camera.values[2][0] -= configuration.speed;
            break;
        case 65: // A
            camera.values[0][0] -= configuration.speed;
            break;
    }
});