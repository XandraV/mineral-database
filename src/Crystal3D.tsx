import React, { FC, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import shaders from "./shaders";

type CrystalProps = {
  width: number;
  height: number;
  shaderName: string;
  rotationSpeed: number;
  xRotation?: boolean;
};

const Crystal3D: FC<CrystalProps> = ({
  width,
  height,
  shaderName,
  rotationSpeed,
  xRotation = true,
}) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.background = null;
    controls.update();
    renderer.setSize(width, height);
    camera.position.set(-40, 0, 100);
    camera.lookAt(0, 0, 0);

    document.getElementById("crystal-3d")!.appendChild(renderer.domElement);
    const vertices = [
      -1,
      1,
      1, // 0: left top front
      -1,
      -1,
      1, // 1: left bottom front
      1,
      -1,
      1, // 2: right bottom front
      1,
      1,
      1, // 3: right top front
      1,
      -1,
      -1, // 4: right bottom back
      1,
      1,
      -1, // 5: right top back
      -1,
      -1,
      -1, // 6: left bottom back
      -1,
      1,
      -1, // 7: left top back
      0,
      1,
      0, // 8: top middle
      0,
      -1,
      0, // 9: bottom middle
    ];
    const faces = [
      0,
      1,
      2, // front 1
      0,
      2,
      3, // front 2
      3,
      2,
      4, // right 1
      3,
      4,
      5, // right 2
      5,
      4,
      6, // back 1
      5,
      6,
      7, // back 2
      7,
      6,
      1, // left 1
      7,
      1,
      0, // left 2
      8,
      0,
      3, // top front
      8,
      3,
      5, // top right
      8,
      5,
      7, // top back
      8,
      7,
      0, // top left
      9,
      2,
      1, // bottom front
      9,
      4,
      2, // bottom right
      9,
      6,
      4, // bottom back
      9,
      1,
      6, // bottom left
    ];

    const geometry = new THREE.PolyhedronGeometry(vertices, faces, 20, 0);
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
      }
        `;

    const fragmentShader = shaders(shaderName);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);
    crystal.scale.set(0.5, 1, 0.5);

    //add some lighting
    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, -20, 100);

    spotLight.castShadow = true;
    scene.add(spotLight);

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      crystal.rotation.y += 0.01 * rotationSpeed;
      if (xRotation) crystal.rotation.x += 0.01 * rotationSpeed;
      renderer.render(scene, camera);
    };
    animate();
  }, [height, width, shaderName, rotationSpeed]);

  return <span />;
};

export default Crystal3D;
