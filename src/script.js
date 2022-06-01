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
particlesMaterial.size = 0.02
particlesMaterial.sizeAttenuation = true
particlesMaterial.color='black'

const particles= new THREE.Points(particlesGeometry,particlesMaterial)
particles.position.y=20
particles.position.z=50
particles.scale.x=6
particles.scale.y=8
particles.scale.z=-3
console.log(particles)


scene.add(camera,particles)


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
	const height = window.innerHeight;
  
  windowHalf.set( width / 2, height / 2 );
	
  camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
				
}



//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );

function animate() {

	requestAnimationFrame( animate );

    
	target.x = ( 1 - mouse.x ) * 0.0002;
    target.y = ( 1 - mouse.y ) * 0.0002;
    
    camera.rotation.x += 0.05 * ( target.y - camera.rotation.x );
    camera.rotation.y += 0.05 * ( target.x - camera.rotation.y );
	// required if controls.enableDamping or controls.autoRotate are set to true


	renderer.render( scene, camera );


}
animate()
renderer.render(scene,camera)

