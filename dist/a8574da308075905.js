import*as THREE from"./three.min.js";import"./stillies.css";import Parallax from"./parallax.js";var scenes=document.getElementById("body"),parallaxInstance=new Parallax(scenes,{relativeInput:!0});const blok=document.getElementsByClassName(".blok");console.log(blok);const canvas=document.querySelector("canvas.webgl"),can2=document.querySelector("canvas.can2"),ctx=can2.getContext("2d"),scene=new THREE.Scene,sizes={width:window.innerWidth,height:window.innerHeight},camera=new THREE.PerspectiveCamera(75,sizes.height/sizes.width);camera.position.xyz=1;const mat=new THREE.MeshStandardMaterial({color:16776960}),particlesGeometry=new THREE.BufferGeometry,count=1e3,positions=new Float32Array(3e3);for(let e=0;e<3e3;e++)positions[e]=10*(Math.random()-.5);particlesGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));const particlesMaterial=new THREE.PointsMaterial;particlesMaterial.size=.02,particlesMaterial.sizeAttenuation=!0,particlesMaterial.color="black";const particles=new THREE.Points(particlesGeometry,particlesMaterial);particles.position.y=20,particles.position.z=50,particles.scale.x=6,particles.scale.y=8,particles.scale.z=-3,console.log(particles),scene.add(camera,particles);const renderer=new THREE.WebGLRenderer({canvas});renderer.setClearAlpha(.03),renderer.setSize(2*sizes.width,2*sizes.height);const mouse=new THREE.Vector2,target=new THREE.Vector2,windowHalf=new THREE.Vector2(sizes.width/2,sizes.height/2);function onMouseMove(e){mouse.x=e.clientX-windowHalf.x,mouse.y=e.clientY-windowHalf.x,e.pageX,e.pageY}function onResize(e){const t=window.innerWidth,a=window.innerHeight;windowHalf.set(t/2,a/2),camera.aspect=t/a,camera.updateProjectionMatrix(),renderer.setSize(t,a)}document.addEventListener("mousemove",onMouseMove,!1),window.addEventListener("resize",onResize,!1);var x=100,y=75,dx=1;function animate(){requestAnimationFrame(animate),ctx.clearRect(0,0,innerWidth,innerHeight),ctx.strokeStyle="white",ctx.beginPath(),ctx.moveTo(10,10),ctx.lineTo(10,140),ctx.stroke(),ctx.closePath(),ctx.beginPath(),ctx.moveTo(290,10),ctx.lineTo(290,140),ctx.stroke(),ctx.closePath(),ctx.beginPath(),ctx.arc(x,y,15,0,2*Math.PI,!1),ctx.strokeStyle="white",ctx.fillStyle="white",ctx.fill(),ctx.stroke(),(x+15>290||x<25)&&(dx=-dx),console.log(dx),x+=dx,target.x=2e-4*(1-mouse.x),target.y=2e-4*(1-mouse.y),camera.rotation.x+=.05*(target.y-camera.rotation.x),camera.rotation.y+=.05*(target.x-camera.rotation.y),renderer.render(scene,camera)}camera.position.set(0,20,100),animate(),renderer.render(scene,camera);