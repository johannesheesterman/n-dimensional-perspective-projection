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

var camera = new Vec3(0, 0, -5);
var orientation = new Vec3(0, 0, 0);

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

    ctx.fillRect(projectedVec3.x - (size /2), projectedVec3.y - (size /2), size, size);
}

function line(vec3a, vec3b, size, color){

    let projectedVec3a = projectVec3(vec3a);
    let projectedVec3b = projectVec3(vec3b);

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(projectedVec3a.x, projectedVec3a.y);
    ctx.lineTo(projectedVec3b.x, projectedVec3b.y);
    ctx.stroke();
}

// https://en.wikipedia.org/wiki/3D_projection
function projectVec3(vec3){



    // apply camera
    vec3 = vec3.subtractVec(camera);

    // Rotate X
    vec3 = vec3.mulMatrix([
        [1, 0, 0],
        [0, Math.cos(orientation.y), -Math.sin(orientation.y)],
        [0, Math.sin(orientation.y), Math.cos(orientation.y)]
    ]);
    // Rotate Y
    vec3 = vec3.mulMatrix([
        [Math.cos(orientation.x), 0, Math.sin(orientation.x)],
        [0, 1, 0],
        [-Math.sin(orientation.x), 0, Math.cos(orientation.x)]
    ]);
    // Rotate Z
    vec3 = vec3.mulMatrix([
        [Math.cos(orientation.z), -Math.sin(orientation.z), 0],
        [Math.sin(orientation.z), Math.cos(orientation.z), 0],
        [0, 0, 1]
    ]);

    
    let x = (configuration.fov / vec3.z) * vec3.x;
    let y = (configuration.fov / vec3.z) * vec3.y;

    return new Vec3(x, y, 0);
}


window.addEventListener("keydown", function(ev){
    switch(ev.keyCode){
        case 87: // W
            camera.z += configuration.speed;
            break;
        case 68: // D
            camera.x += configuration.speed;
            break;
        case 83: // S
            camera.z -= configuration.speed;
            break;
        case 65: // A
            camera.x -= configuration.speed;
            break;
    }
});

window.addEventListener("mousemove", function(event) {
    // Normalize mouse position between -1 and 1.
    let x = event.x/(window.innerWidth/2) -1;
    let y = event.y/(window.innerHeight/2) -1;
    
    this.orientation.x = -x;
    this.orientation.y = y;
});