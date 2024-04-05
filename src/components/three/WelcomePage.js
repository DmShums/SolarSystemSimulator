import React, { useEffect, useRef }  from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RotationQuaternion } from '../../lib/QuaternionLibrary';

import sky1 from "../../imgs/sky1.png";
import sky2 from "../../imgs/sky2.png";
import sky3 from "../../imgs/sky3.png";
import sky4 from "../../imgs/sky4.png";


const SolarSystem = () => {
    // Refs for scene, camera, and renderer
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
  
    // Set up scene, camera, renderer in useEffect
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
    
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
    
        renderer.setSize(window.innerWidth, window.innerHeight);

        containerRef.current.appendChild(renderer.domElement);
        ///////Init stuff
        const orbit = new OrbitControls(camera, renderer.domElement);

        camera.position.set(-90, 140, 140);
        orbit.update();

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        scene.background = cubeTextureLoader.load([
        sky1,
        sky2,
        sky3,
        sky4,
        sky1,
        sky4]);

        const ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);
        /////////////////
        
        const animate = () => {
            requestAnimationFrame(animate);
        
            renderer.render(scene, camera);
        };
        
        animate();
        
        return () => {
            // Cleanup function
            renderer.dispose();
        
            scene.traverse(obj => {
            if (obj instanceof THREE.Mesh) {
                // Dispose of geometry and material
                obj.geometry.dispose();
                obj.material.dispose();
            }
            });
        };

    }, []);

    return <div ref={containerRef} />;
}

export default SolarSystem;