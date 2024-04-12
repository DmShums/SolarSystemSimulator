import React, { Children, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RotationQuaternion } from "../../lib/QuaternionLibrary";
import sky1 from "../../imgs/sky1.png";
import sky2 from "../../imgs/sky2.png";
import sky3 from "../../imgs/sky3.png";
import sky4 from "../../imgs/sky4.png";
import mercuryTex from "../../imgs/mercury.jpg";
import venusTex from "../../imgs/venus.jpg";
import sunTex from "../../imgs/sun.jpg";
import earthTex from "../../imgs/earth.jpg";

const SolarSystem = () => {
  function addPlanet(newPlanet){
    childrenRef.current.push(newPlanet);
  };

  // function removePlanet (planetID){
  //   setChildren(children.filter((child) => child["ID"] !== planetID));
  // };

  function getNewPlanetTransform(planetConfig, time){
    const x = planetConfig["a"] * Math.cos(time);
    const z = planetConfig["b"] * Math.sin(time);
    const y = planetConfig["c"] * Math.sin(time);

    const rotation = new RotationQuaternion(0,1,0,planetConfig["d"] * Math.PI);

    return [x,y,z,rotation];
  }

  function createPlanet(size, texture, ring,){
    const textureload = new THREE.TextureLoader();

    const geometry = new THREE.SphereGeometry(size, 45, 35);
    const material = new THREE.MeshStandardMaterial({
      map:textureload.load(texture)
    });

    const planet = new THREE.Mesh(geometry, material);
    sceneRef.current.add(planet);
    planet.position.x = 0;
    planet.position.y = 0;
    planet.position.z = 0;
    planet.needsUpdate = true;

    if(ring)
    {
      const RingGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius, 30
      );
      const RingMat = new THREE.MeshStandardMaterial({
        map:textureload.load(ring.texture),
        side : THREE.DoubleSide
      });
      const Ring = new THREE.Mesh(RingGeo, RingMat);
      planet.add(Ring);

      ring.position.x = 0;
      ring.position.y = 0;
      ring.position.z = 0;
      Ring.rotation.x = -0.5 *Math.PI;
    }
    return planet;
  }

  // Refs for scene, camera, and renderer
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const childrenRef = useRef(null);

  // Set up scene, camera, renderer in useEffect
  useEffect(() => {
    const children = [];
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    childrenRef.current = children;

    renderer.setSize(window.innerWidth, window.innerHeight);

    containerRef.current.appendChild(renderer.domElement);
    ///////Init stuff
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enablePan = false;
    camera.position.set(-90, 140, 140);
    orbit.update();

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      sky1,
      sky2,
      sky3,
      sky4,
      sky1,
      sky4,
    ]);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);

    const sun = {"planet": createPlanet(60, sunTex), planetConfig:{"a":0, "b":0, "c":0, "d":0.015}, "ID":0};
    const mercury = {"planet": createPlanet(15, mercuryTex), planetConfig:{"a":100, "b":100, "c":50, "d":0.005}, "ID":1};
    const venus = {"planet": createPlanet(30, venusTex), planetConfig:{"a":250, "b":250, "c":-50, "d":0.001}, "ID":2};
    const earth = {"planet": createPlanet(50, earthTex), planetConfig:{"a":400, "b":550, "c":60, "d":0.001}, "ID":3};

    // addPlanet(sun);
    // addPlanet(mercury);
    // addPlanet(venus);
    // addPlanet(earth);
    children.push(sun);
    children.push(mercury);
    children.push(venus);
    children.push(earth);

    /////////////////
    const animate = () => {
      requestAnimationFrame(animate);
      const curTime = performance.now()/1500;
      console.log("<---------------------------------------------------------->");
      console.log("Time:", curTime);
      for(let planet of children)
      {
        console.log(planet);
        const newTransform = getNewPlanetTransform(planet.planetConfig, curTime);

        console.log(`Before: X:${planet["planet"].position.x};Y:${planet["planet"].position.y};Z:${planet["planet"].position.z}`);

        planet["planet"].position.set(newTransform[0], newTransform[1], newTransform[2]);
        console.log(`After: X:${planet["planet"].position.x};Y:${planet["planet"].position.y};Z:${planet["planet"].position.z}`);

        newTransform[3].ApplyToThreeObject(planet["planet"]);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animate);
      renderer.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          // Dispose of geometry and material
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
    };
  }, []);

  return <div ref={containerRef} />;
};
export default SolarSystem;