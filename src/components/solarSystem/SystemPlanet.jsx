import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const SystemPlanet = ({params}) => {
    const containerRef = useRef(null);

    getCurrentCoordinates()
    {
        const time = performance.now()/1000;
    }

    useEffect(() => {
        const geometry = new THREE.SphereGeometry(params.planetSize, 25, 20);
        const material = new THREE.MeshStandardMaterial({
        map:textureload.load(params.texturePath)
        });

        const planet = new THREE.Mesh(geometry, material);
        const planetWrapper = new THREE.Object3D;
        planetWrapper.add(planet);
        params.scene.add(planetWrapper);
        planet.position.x = params.position;

        if(params.ring){
            const RingGeo = new THREE.RingGeometry(
                params.ring.innerRadius,
                params.ring.outerRadius, 30
            );
            const RingMat = new THREE.MeshStandardMaterial({
                map:textureload.load(params.ring.texturePath),
                side : THREE.DoubleSide
            });
            const Ring = new THREE.Mesh(RingGeo, RingMat);
            planetWrapper.add(Ring);

            Ring.position.x = params.position;
            Ring.rotation.x = -0.5 *Math.PI;
        }
    }, []);

    return <div ref={containerRef} />;
}

export default SystemPlanet;