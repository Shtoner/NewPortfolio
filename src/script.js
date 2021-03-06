import * as THREE from './three.min.js'
import './stillies.css'
import Parallax from './parallax.js'


var scenes = document.getElementById('body');
var parallaxInstance = new Parallax(scenes, {
  relativeInput: true
});


const blok = document.getElementsByClassName('.blok')
console.log(blok)
const canvas = document.querySelector('canvas.webgl')
const can2 = document.querySelector('canvas.can2')
const ctx=can2.getContext("2d");
const scene = new THREE.Scene()
// canvas.style.backgroundColor = '#00F8'
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,sizes.height/sizes.width)
camera.position.xyz=1

const mat = new THREE.MeshStandardMaterial({color:0xffff00})

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 1000

const positions = new Float32Array(count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)

for(let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) // Create the Three.js BufferAttribute and specify that each information is composed of 3 values

const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.2
particlesMaterial.sizeAttenuation = true
particlesMaterial.color='black'

const particles= new THREE.Points(particlesGeometry,particlesMaterial)
particles.position.y+=20
// particles.position.z=50
particles.scale.x=18
particles.scale.y=18
particles.scale.z=18
console.log(particles)


scene.add(camera,particles)
// camera.lookAt(particles)

const renderer = new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setClearAlpha(0.03)
renderer.setSize(sizes.width*2,sizes.height*2)

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( sizes.width / 2, sizes.height / 2 );

document.addEventListener( 'mousemove', onMouseMove, false );
// document.addEventListener( 'wheel', onMouseWheel, false );
    window.addEventListener( 'resize', onResize, false );



function onMouseMove( event ) {

	mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );
    const x = event.pageX,
    y = event.pageY;

}


    
function onResize( event ) {

	const width = window.innerWidth;
	const height = window.innerHeight + 3;
  
  windowHalf.set( width / 2, height / 2 );
	
  camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
				
}

//for pong graphic
var x=100
var y=75
var dx=1


//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );

function animate() {

	requestAnimationFrame( animate );

    //pong graphic code
    ctx.clearRect(0,0,innerWidth,innerHeight)
    var radius=15
    

    ctx.strokeStyle='white'
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 140);
    ctx.stroke();
    ctx.closePath()



    ctx.beginPath();
    ctx.moveTo(290, 10);
    ctx.lineTo(290, 140);
    ctx.stroke();
    ctx.closePath()
    
    ctx.beginPath();
    ctx.arc(x,y,15,0,Math.PI*2,false);
    ctx.strokeStyle='white';
    ctx.fillStyle='white'
    ctx.fill()
    ctx.stroke();

    if(x+radius>290||x<25){
        
        dx=-dx
    } 
    console.log(dx)
    x+=dx
    
    //needed for parallax
	target.x = ( 1 - mouse.x ) * 0.0002;
    target.y = ( 1 - mouse.y ) * 0.0002;
    
    camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
    camera.rotation.y += 0.05 * ( target.x - camera.rotation.y );
	// required if controls.enableDamping or controls.autoRotate are set to true


	renderer.render( scene, camera );


}
animate()
renderer.render(scene,camera)

