import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RotationQuaternion } from "../../lib/QuaternionLibrary";
import sky1 from "../../imgs/floppface.jpeg";
import sky2 from "../../imgs/floppaass.jpeg";
import sky3 from "../../imgs/floppatop.jpeg";
import sky4 from "../../imgs/floppaleft.jpeg";
import sky5 from "../../imgs/flopparight.jpeg";
import sky6 from "../../imgs/floppabottom.jpeg";

import mercuryTex from "../../imgs/mercury.jpg";
import venusTex from "../../imgs/venus.jpg";
import sunTex from "../../imgs/sun.jpg";
import earthTex from "../../imgs/earth.jpg";
import marsTex from "../../imgs/mars.jpg";
import jupiterTex from "../../imgs/jupiter.jpg";
import saturnTex from "../../imgs/saturn.jpg";
import satRingTex from "../../imgs/saturn_ring.png";
import uranusTex from "../../imgs/uranus.jpg";
import urRingTex from "../../imgs/uranus_ring.png";
import neptuneTex from "../../imgs/neptune.jpg";
import plutoTex from "../../imgs/pluto.jpg";

const SolarSystem = () => {
  function addPlanet(newPlanet) {
    childrenRef.current.push(newPlanet);
  }

  // function removePlanet (planetID){
  //   setChildren(children.filter((child) => child["ID"] !== planetID));
  // };

  function getNewPlanetTransform(planetConfig, time) {
    time *= planetConfig["v"];
    const x = planetConfig["a"] * Math.cos(time);
    const z = planetConfig["b"] * Math.sin(time);
    const y = planetConfig["c"] * Math.sin(time);

    const rotation = new RotationQuaternion(
      0,
      1,
      0,
      planetConfig["d"] * Math.PI
    );

    return [x, y, z, rotation];
  }

  function createPlanet(size, texture, ring, clickEvent) {
    const textureload = new THREE.TextureLoader();

    const geometry = new THREE.SphereGeometry(size, 45, 35);
    const material = new THREE.MeshStandardMaterial({
      map: textureload.load(texture),
    });

    const planet = new THREE.Mesh(geometry, material);
    sceneRef.current.add(planet);
    planet.position.x = 0;
    planet.position.y = 0;
    planet.position.z = 0;
    planet.needsUpdate = true;

    if (ring) {
      const RingGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius
      );
      const RingMat = new THREE.MeshStandardMaterial({
        map: textureload.load(ring.texture),
        side: THREE.DoubleSide,
      });
      const Ring = new THREE.Mesh(RingGeo, RingMat);
      planet.add(Ring);

      Ring.position.x = 0;
      Ring.position.y = 0;
      Ring.position.z = 0;
      Ring.rotation.x = -0.5 * Math.PI;
    }

    if (clickEvent) {
      planet.addEventListener("click", clickEvent);
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
      1500
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    childrenRef.current = children;

    renderer.setSize(window.innerWidth, window.innerHeight);

    containerRef.current.appendChild(renderer.domElement);

    const interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );
    ///////Init stuff
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
      sky1,
      sky2,
      sky3,
      sky4,
      sky5,
      sky6,
    ]);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enablePan = false;
    camera.position.set(-90, 140, 140);
    orbit.update();
    orbit.minDistance = 400;
    orbit.maxDistance = 1000;

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const sun = {
      planet: createPlanet(85, sunTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/sun";
      }),
      planetConfig: { a: 0, b: 0, c: 0, d: 0.015, v: 0.25 },
      ID: 0,
    };

    const mercury = {
      planet: createPlanet(1, mercuryTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/mercury";
      }),
      planetConfig: { a: 120, b: 120, c: 5, d: 0.005, v: 0.5 },
      ID: 1,
    };

    const venus = {
      planet: createPlanet(3, venusTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/venus";
      }),
      planetConfig: { a: 130, b: 130, c: -5, d: 0.001, v: 0.15 },
      ID: 2,
    };

    const earth = {
      planet: createPlanet(3, earthTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/earth";
      }),
      planetConfig: { a: 140, b: 140, c: 6, d: 0.001, v: 0.05 },
      ID: 3,
    };

    const mars = {
      planet: createPlanet(2, marsTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/mars";
      }),
      planetConfig: { a: 150, b: 150, c: 3, d: 0.005, v: 0.15 },
      ID: 4,
    };

    const jupiter = {
      planet: createPlanet(33, jupiterTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/jupiter";
      }),
      planetConfig: { a: 200, b: 200, c: 2, d: 0.001, v: 0.05 },
      ID: 5,
    };

    const saturn = {
      planet: createPlanet(
        27,
        saturnTex,
        {
          innerRadius: 28,
          outerRadius: 35,
          texture: satRingTex,
        },
        (event) => {
          window.location.href = "http://localhost:3000/planetinfo/saturn";
        }
      ),
      planetConfig: { a: 270, b: 270, c: 10, d: 0.01, v: 0.09 },
      ID: 6,
    };

    const uranus = {
      planet: createPlanet(
        12,
        uranusTex,
        {
          innerRadius: 13,
          outerRadius: 19,
          texture: urRingTex,
        },
        (event) => {
          window.location.href = "http://localhost:3000/planetinfo/uranus";
        }
      ),
      planetConfig: { a: 330, b: 330, c: -5, d: 0.01, v: 0.07 },
      ID: 7,
    };

    const neptune = {
      planet: createPlanet(11, neptuneTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/neptune";
      }),
      planetConfig: { a: 350, b: 350, c: -1, d: 0.01, v: 0.3 },
      ID: 8,
    };

    const pluto = {
      planet: createPlanet(1, plutoTex, null, (event) => {
        window.location.href = "http://localhost:3000/planetinfo/pluto";
      }),
      planetConfig: { a: 380, b: 380, c: -1, d: 0.0001, v: 0.12 },
      ID: 9,
    };

    interactionManager.add(sun.planet);
    interactionManager.add(venus.planet);
    interactionManager.add(mercury.planet);
    interactionManager.add(earth.planet);
    interactionManager.add(mars.planet);
    interactionManager.add(jupiter.planet);
    interactionManager.add(saturn.planet);
    interactionManager.add(uranus.planet);
    interactionManager.add(neptune.planet);
    interactionManager.add(pluto.planet);
    // addPlanet(sun);
    // addPlanet(mercury);
    // addPlanet(venus);
    // addPlanet(earth);
    children.push(sun);
    children.push(mercury);
    children.push(venus);
    children.push(earth);
    children.push(mars);
    children.push(jupiter);
    children.push(saturn);
    children.push(uranus);
    children.push(neptune);
    children.push(pluto);

    /////////////////
    const animate = () => {
      requestAnimationFrame(animate);

      interactionManager.update();
      const curTime = performance.now() / 1500;
      // console.log("<---------------------------------------------------------->");
      // console.log("Time:", curTime);
      for (let planet of children) {
        const newTransform = getNewPlanetTransform(
          planet.planetConfig,
          curTime
        );

        // console.log(`Before: X:${planet["planet"].position.x};Y:${planet["planet"].position.y};Z:${planet["planet"].position.z}`);

        planet["planet"].position.set(
          newTransform[0],
          newTransform[1],
          newTransform[2]
        );
        // console.log(`After: X:${planet["planet"].position.x};Y:${planet["planet"].position.y};Z:${planet["planet"].position.z}`);

        newTransform[3].ApplyToThreeObject(planet["planet"]);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animate);
      //scene.remove(skybox);
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
