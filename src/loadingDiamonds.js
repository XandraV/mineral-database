import * as THREE from "three";
export default function myHeart() {
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.lookAt(0, 0, 0);

  var scene = new THREE.Scene();
  var material = new THREE.LineBasicMaterial({ color: "#140078" });
  var geometry1 = new THREE.Geometry();
  geometry1.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry1.vertices.push(new THREE.Vector3(10, 0, 0));
  geometry1.vertices.push(new THREE.Vector3(20, 10, 0));
  geometry1.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry1.vertices.push(new THREE.Vector3(20, 10, 0));
  geometry1.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry1.vertices.push(new THREE.Vector3(0, -6, 0));
  geometry1.vertices.push(new THREE.Vector3(20, -6, 0));
  geometry1.vertices.push(new THREE.Vector3(20, 10, 0));
  var line = new THREE.Line(geometry1, material);

  var geometry2 = new THREE.Geometry();
  geometry2.vertices.push(new THREE.Vector3(-60, 10, 0));
  geometry2.vertices.push(new THREE.Vector3(-50, 0, 0));
  geometry2.vertices.push(new THREE.Vector3(-40, 10, 0));
  geometry2.vertices.push(new THREE.Vector3(-60, 10, 0));
  geometry2.vertices.push(new THREE.Vector3(-40, 10, 0));
  geometry2.vertices.push(new THREE.Vector3(-60, 10, 0));
  geometry2.vertices.push(new THREE.Vector3(-60, -6, 0));
  geometry2.vertices.push(new THREE.Vector3(-40, -6, 0));
  geometry2.vertices.push(new THREE.Vector3(-40, 10, 0));
  var line2 = new THREE.Line(geometry2, material);

  scene.add(line);
  scene.add(line2);
  camera.position.z = 150;

  var animate = function() {
    requestAnimationFrame(animate);
    line.rotation.y += 0.05;
    var seconds = new Date().getTime() / 300;
    line.position.x = -30 + 30 * Math.cos(seconds);
    line.position.y = 30 * Math.sin(seconds);
    line.position.z = -30 + 30 * Math.cos(seconds);

    line2.rotation.y += 0.05;
    line2.position.x = 10 * Math.cos(seconds);
    line2.position.y = -30 * Math.sin(seconds);
    line2.position.z = 10 * Math.cos(seconds);
    renderer.render(scene, camera);
  };
  animate();
}
