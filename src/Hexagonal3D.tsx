import React, { FC, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Hexagonal3DProps = {
  width: number;
  height: number;
};

const Hexagonal3D: FC<Hexagonal3DProps> = ({ width, height }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.background = null;
    controls.update();
    renderer.setSize(width, height);
    camera.position.set(0, 80, 100);
    camera.lookAt(0, 0, 0);

    document.getElementById("system-3d")!.appendChild(renderer.domElement);

    const hexagonal = new THREE.Object3D();
    const material = new THREE.LineBasicMaterial({
      color: "white",
    });

    // base lines
    const base = new THREE.Object3D();

    const line1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, -4),
        new THREE.Vector3(-4, 0, 4),
      ]),
      material
    );
    const lineObject = new THREE.Object3D().add(line1);
    base.add(lineObject);
    base.add(lineObject.clone().translateX(8)); //line2

    const line2 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(-4, 0, -4),
      ]),
      material
    );
    const line2Object = new THREE.Object3D().add(line2);
    base.add(line2Object); //line3
    base.add(line2Object.clone().translateX(4).translateZ(10));

    const line3 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(4, 0, -4),
      ]),
      material
    );
    const line3Object = new THREE.Object3D().add(line3);
    base.add(line3Object);
    base.add(line3Object.clone().translateX(-4).translateZ(10));

    const cross1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, -4),
        new THREE.Vector3(4, 0, 4),
      ]),
      material
    );
    const cross1Object = new THREE.Object3D().add(cross1);
    base.add(cross1Object);

    const cross2 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, 4),
        new THREE.Vector3(4, 0, -4),
      ]),
      material
    );
    const cross2Object = new THREE.Object3D().add(cross2);
    base.add(cross2Object);

    const cross3 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(0, 0, 6),
      ]),
      material
    );
    const cross3Object = new THREE.Object3D().add(cross3);
    base.add(cross3Object);

    // cloning base for the top
    const top = base.clone();
    top.translateY(15);
    hexagonal.add(base);
    hexagonal.add(top);

    const line4 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(0, 15, -6),
      ]),
      material
    );
    const line4Object = new THREE.Object3D().add(line4);
    hexagonal.add(line4Object);
    hexagonal.add(line4Object.clone().translateZ(12));
    hexagonal.add(line4Object.clone().translateX(-4).translateZ(2));
    hexagonal.add(line4Object.clone().translateX(4).translateZ(2));
    hexagonal.add(line4Object.clone().translateX(-4).translateZ(10));
    hexagonal.add(line4Object.clone().translateX(4).translateZ(10));

    const edges = [
      //bottom
      new THREE.Vector3(0, 0, -6),
      new THREE.Vector3(0, 0, 6),
      new THREE.Vector3(-4, 0, -4),
      new THREE.Vector3(-4, 0, 4),
      new THREE.Vector3(4, 0, -4),
      new THREE.Vector3(4, 0, 4),
      //top
      new THREE.Vector3(0, 15, -6),
      new THREE.Vector3(0, 15, 6),
      new THREE.Vector3(-4, 15, -4),
      new THREE.Vector3(-4, 15, 4),
      new THREE.Vector3(4, 15, -4),
      new THREE.Vector3(4, 15, 4),
      new THREE.Vector3(0, 0, 0), //center bottom
      new THREE.Vector3(0, 15, 0), //center top
    ];

    // add points to edges
    edges.forEach((edge) => {
      const pointGeometry = new THREE.SphereGeometry(0.7, 32, 32);
      const point3D = new THREE.Mesh(pointGeometry, material);
      scene.add(point3D);
      point3D.position.set(edge.x, edge.y, edge.z);
      hexagonal.add(point3D);
    });

    hexagonal.scale.set(2, 2, 2);
    scene.add(hexagonal);

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
      hexagonal.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, [height, width]);

  return <span />;
};

export default Hexagonal3D;
