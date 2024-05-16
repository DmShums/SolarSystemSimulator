import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './AddSystem.css';

const AddSystem = ({ fileURL }) => {
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene()).current;
  const [model, setModel] = useState(null);

  // useEffect(() => {
  //   const w = window.innerWidth;
  //   const h = window.innerHeight;

  //   scene.clear();
  //   scene.background = new THREE.Color('#242424');

  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  //   scene.add(ambientLight);

  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  //   directionalLight.position.set(0, 1, 0);
  //   scene.add(directionalLight);

  //   const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  //   camera.position.z = 60;

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(w, h);
  //   containerRef.current.appendChild(renderer.domElement);

  //   const loader = new GLTFLoader();
  //   loader.load(
  //     fileURL,
  //     (gltf) => {
  //       const object = gltf.scene;
  //       setModel(object); // Save the loaded model to state

  //       scene.add(object);

  //       const controls = new OrbitControls(camera, renderer.domElement);
  //       controls.enableDamping = true;

  //       const animate = () => {
  //         requestAnimationFrame(animate);
  //         renderer.render(scene, camera);
  //       };

  //       animate();

  //       return () => {
  //         // Cleanup function
  //         renderer.dispose();

  //         scene.traverse((obj) => {
  //           if (obj instanceof THREE.Mesh) {
  //             // Dispose of geometry and material
  //             obj.geometry.dispose();
  //             obj.material.dispose();
  //           }
  //         });
  //       };
  //     },
  //     undefined,
  //     (error) => {
  //       console.error('Error loading 3D object:', error);
  //     }
  //   );
  // }, [fileURL, scene]);

  // // Function to save the model to your database
  const saveModelToDatabase = () => {
    // Implement your database saving logic here
    console.log('Saving model to database:', model);
  };

  return (
    <div className="addSystem-card" ref={containerRef}>
      <button onClick={saveModelToDatabase}>Save Model</button>
    </div>
  );
};

export default AddSystem;