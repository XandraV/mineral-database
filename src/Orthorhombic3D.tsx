import React, { FC, useEffect } from "react";
import * as THREE from "three";

type Orthorhombic3DProps = {
  width: number;
  height: number;
};

const Orthorhombic3D: FC<Orthorhombic3DProps> = ({ width, height }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    scene.background = null;

    renderer.setSize(width, height);
    camera.position.set(0, 50, 100);
    camera.lookAt(0, 0, 0);

    document.getElementById("system-3d")!.appendChild(renderer.domElement);

    const orthorhombic = new THREE.Object3D();
    const material = new THREE.LineBasicMaterial({
      color: "black",
    });

    // base lines
    const base = new THREE.Object3D();

    const line1Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(7.5, 0, -7.5),
    ]);
    base.add(new THREE.Line(line1Geometry, material));

    const line2Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, 7.5),
      new THREE.Vector3(7.5, 0, 7.5),
    ]);
    base.add(new THREE.Line(line2Geometry, material));

    const line3Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 0, 7.5),
    ]);
    base.add(new THREE.Line(line3Geometry, material));

    const line4Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.5, 0, -7.5),
      new THREE.Vector3(7.5, 0, 7.5),
    ]);
    base.add(new THREE.Line(line4Geometry, material));

    // cloning base for the top
    const top = base.clone();
    top.translateY(15);
    orthorhombic.add(base);
    orthorhombic.add(top);

    const line5Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, -7.5),
      new THREE.Vector3(-7.5, 15, -7.5),
    ]);
    const line5 = new THREE.Line(line5Geometry, material);
    orthorhombic.add(line5);

    const line6Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-7.5, 0, 7.5),
      new THREE.Vector3(-7.5, 15, 7.5),
    ]);
    const line6 = new THREE.Line(line6Geometry, material);
    orthorhombic.add(line6);

    const line7Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.5, 0, -7.5),
      new THREE.Vector3(7.5, 15, -7.5),
    ]);
    const line7 = new THREE.Line(line7Geometry, material);
    orthorhombic.add(line7);

    const line8Geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(7.5, 0, 7.5),
      new THREE.Vector3(7.5, 15, 7.5),
    ]);
    const line8 = new THREE.Line(line8Geometry, material);
    orthorhombic.add(line8);

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
      orthorhombic.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <span />;
};

export default Orthorhombic3D;
