import React, { FC, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Orthorhombic3DProps = {
  width: number;
  height: number;
};

const Orthorhombic3D: FC<Orthorhombic3DProps> = ({ width, height }) => {
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

    const orthorhombic = new THREE.Object3D();
    const material = new THREE.LineBasicMaterial({
      color: "white",
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
    base.add(lineObject.clone().translateZ(15))


    const line2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 0, 7.5),
    ]), material);
    const line2Object = new THREE.Object3D().add(line2)
    base.add(line2Object);
    base.add(line2Object.clone().translateX(15))
    
    // cloning base for the top
    const top = base.clone();
    top.translateY(15);
    orthorhombic.add(base);
    orthorhombic.add(top);

    const line3 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 15, -7.5),
    ]), material);
    const line3Object = new THREE.Object3D().add(line3)
    orthorhombic.add(line3Object);
    orthorhombic.add(line3Object.clone().translateZ(15))
    orthorhombic.add(line3Object.clone().translateX(15))
    orthorhombic.add(line3Object.clone().translateX(15).translateZ(15))

    const edges = [
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 0, 7.5),
      new THREE.Vector3(7.5, 0, 7.5),
      new THREE.Vector3(-7.5, 15, -7.5),
      new THREE.Vector3(7.5, 15, -7.5),
      new THREE.Vector3(-7.5, 15, 7.5),
      new THREE.Vector3(7.5, 15, 7.5),
    ];
    const center = new THREE.Vector3(0, 7.5, 0);
    // create lines from edges to center and points
    edges.forEach((edge) => {
      const lineToCenter = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([edge, center]),
        material
      );
      orthorhombic.add(lineToCenter);

      const pointGeometry = new THREE.SphereGeometry(1, 32, 32);
      const point3D = new THREE.Mesh(pointGeometry, material);
      scene.add(point3D);
      point3D.position.set(edge.x, edge.y, edge.z);
      orthorhombic.add(point3D);
    });

    const pointGeometry = new THREE.SphereGeometry(1, 32, 32);
    const point3D = new THREE.Mesh(pointGeometry, material);
    scene.add(point3D);
    point3D.position.set(center.x, center.y, center.z);
    orthorhombic.add(point3D);

    orthorhombic.scale.set(1.5, 1.5, 1.5);
    scene.add(orthorhombic);

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
      orthorhombic.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, [height, width]);

  return <span />;
};

export default Orthorhombic3D;
