import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./styles.css";
import * as PlanetRotation from "../../lib/PlanetRotation";

import sky1 from "../../imgs/box1.jpg";
import sky2 from "../../imgs/box2.jpg";
import sky3 from "../../imgs/box3.jpg";
import sky4 from "../../imgs/box4.jpg";
import sky5 from "../../imgs/box5.jpg";
import sky6 from "../../imgs/box6.jpg";

const planets = [
  PlanetRotation.sun,
  PlanetRotation.mercury,
  PlanetRotation.venus,
  PlanetRotation.earth,
  PlanetRotation.mars,
  PlanetRotation.jupiter,
  PlanetRotation.saturn,
  PlanetRotation.uranus,
  PlanetRotation.neptune,
  PlanetRotation.pluto,
];

const Planet = (props) => {
  const planetIdx = props.planetName;
  const containerRef = useRef(null);

  const planet = planets.find((planet) => planet.ID === parseInt(planetIdx));
  const cfg = planet.planetConfig;

  useEffect(() => {
    const w = window.innerWidth / 2;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#161718");

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);

    containerRef.current.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 45, 35);
    const testMesh = new THREE.Mesh(geometry);

    let planetMesh = planet.planet;
    planetMesh.parent = testMesh.parent;

    const scale = 1 / planet.size;

    planetMesh.scale.set(scale, scale, scale);
    scene.add(planetMesh);

    // const cubeTextureLoader = new THREE.CubeTextureLoader();
    // scene.background = cubeTextureLoader.load([
    //   sky1,
    //   sky2,
    //   sky3,
    //   sky4,
    //   sky5,
    //   sky6,
    // ]);

    const light = new THREE.HemisphereLight("#FFFFFF", "#757575", 1.7);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      const curTime = performance.now() / 1500;

      const newTransform = PlanetRotation.getNewPlanetTransform(cfg, curTime);

      newTransform[3].ApplyToThreeObject(planetMesh);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, []);

  return <div className="planet-container" ref={containerRef}></div>;
};

export default Planet;
