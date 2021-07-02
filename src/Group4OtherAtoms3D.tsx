import React, { FC, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Group4OtherAtoms3DProps = {
  width: number;
  height: number;
  color: string;
};

const Group4OtherAtoms3D: FC<Group4OtherAtoms3DProps> = ({
  width,
  height,
  color,
}) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.background = null;
    controls.update();
    renderer.setSize(width, height);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    document.getElementById("maingroup-3d")!.appendChild(renderer.domElement);

    //create "molecule" that will hold the atoms
    const molecule = new THREE.Object3D();

    //create colors of materials
    const centralAtomMaterial = new THREE.MeshStandardMaterial({
      color: color,
    });
    const otherAtomsMaterial = new THREE.MeshStandardMaterial({
      color: 0x80deea,
    });
    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    //create silicon atom
    const centralAtomGeometry = new THREE.SphereBufferGeometry(6, 32, 32);
    const centralAtom = new THREE.Mesh(
      centralAtomGeometry,
      centralAtomMaterial
    );
    molecule.add(centralAtom);
    // create oxygen atom and cylinder to use as model for others
    const otherAtomGeometry = new THREE.SphereBufferGeometry(4.5, 32, 32);
    otherAtomGeometry.translate(0, 15, 0);
    const otherAtom = new THREE.Mesh(otherAtomGeometry, otherAtomsMaterial);

    const bondGeometry = new THREE.CylinderGeometry(1, 1, 15, 8);
    bondGeometry.translate(0, 5, 0);
    const bond = new THREE.Mesh(bondGeometry, whiteMaterial);

    //create atom-bond object to combine oxygen and bond
    const atomBond = new THREE.Object3D();
    atomBond.add(otherAtom);
    atomBond.add(bond);

    //create 4 copies of the atomBond to add oxygen to the silicon
    const b1 = atomBond.clone();
    b1.position.setY(2);
    molecule.add(b1);

    const b2 = atomBond.clone();
    b2.rotation.x = 2.3;
    b2.rotation.y = -0.3;
    molecule.add(b2);

    const b3 = atomBond.clone();
    b3.rotation.x = -2.3;
    b3.rotation.z = 0.3;
    molecule.add(b3);

    const b4 = atomBond.clone();
    b4.rotation.x = -2.3;
    b4.rotation.z = -1;
    b4.rotation.y = 0.3;
    molecule.add(b4);

    scene.add(molecule);

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
      molecule.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  }, [color, height, width]);

  return <span />;
};

export default Group4OtherAtoms3D;
