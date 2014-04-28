var scene,camera,renderer;
var ijsbeer, animation;

// Loader
var loader = new THREE.JSONLoader();
loader.load('ijsbeer.js', function (geometry,materials) { 
    ijsbeer = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = ijsbeer.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) {
        var mat = materials[i];
        mat.skinning = true;
    }
    init();
});

// Init
function init() {
// Scene
scene = new THREE.Scene();
// Camera
camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 1, 20000 );
camera.position.set(0,100,0);
camera.rotation.set(-1,0,0);
// Renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xff0000);
// Appenden
container = document.getElementById('container');
container.innerHTML="";
container.appendChild(renderer.domElement);

// Add Bear
scene.add(ijsbeer);
// ijsbeer.scale.set(500,500,500);
ijsbeer.position.set(0,0,-100);

THREE.AnimationHandler.add(ijsbeer.geometry.animations[0]);
animation = new THREE.Animation(ijsbeer, "ArmatureAction", THREE.AnimationHandler.CATMULLROM)
animation.play();

animate();
}

// Animate
function animate() {
    requestAnimationFrame( animate );
    animation.update(0.01);
    render();
}

// Render
function render() {
    renderer.render(scene,camera);
}