import React, { FC, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type trigonal3DProps = {
  width: number;
  height: number;
};

const Trigonal3D: FC<trigonal3DProps> = ({ width, height }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.background = null;
    controls.update();
    renderer.setSize(width, height);
    camera.position.set(0, 50, 100);
    camera.lookAt(0, 0, 0);

    document.getElementById("system-3d")!.appendChild(renderer.domElement);

    const trigonal = new THREE.Object3D();
    const material = new THREE.LineBasicMaterial({
      color: "black",
    });

    // base lines
    const base = new THREE.Object3D();

    const line1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-7.5, 0, -7.5),
        new THREE.Vector3(7.5, 0, -7.5),
      ]),
      material
    );
    const lineObject = new THREE.Object3D().add(line1)
    base.add(lineObject);
    base.add(lineObject.clone().translateZ(15)) //line2

    const line2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 0, 7.5),
    ]), material);
    const line2Object = new THREE.Object3D().add(line2)
    base.add(line2Object); //line3
    base.add(line2Object.clone().translateX(15)) //line4
    
    // cloning base for the top
    const top = base.clone();
    top.translateY(15).translateZ(4);
    trigonal.add(base);
    trigonal.add(top);

    const line3 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 15, -3.5),
    ]), material);
    const line3Object = new THREE.Object3D().add(line3)
    trigonal.add(line3Object);
    trigonal.add(line3Object.clone().translateZ(15))
    trigonal.add(line3Object.clone().translateX(15))
    trigonal.add(line3Object.clone().translateX(15).translateZ(15))

    const edges = [
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 0, 7.5),
      new THREE.Vector3(7.5, 0, 7.5),
      new THREE.Vector3(-7.5, 15, -3.5),
      new THREE.Vector3(7.5, 15, -3.5),
      new THREE.Vector3(-7.5, 15, 11.5),
      new THREE.Vector3(7.5, 15, 11.5),
    ];

    // create lines from edges to center and points
    edges.forEach((edge) => {
      const pointGeometry = new THREE.SphereGeometry(1, 32, 32);
      const point3D = new THREE.Mesh(pointGeometry, material);
      scene.add(point3D);
      point3D.position.set(edge.x, edge.y, edge.z);
      trigonal.add(point3D);
    });

    trigonal.scale.set(1.5, 1.5, 1.5);
    scene.add(trigonal);

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
      trigonal.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, [height, width]);

  return <span />;
};

export default Trigonal3D;
