import {useRef} from "react";
import Road from './components/Road'
import { OrbitControls } from "@react-three/drei";
import { useLoader, useThree} from '@react-three/fiber'
import { FileLoader } from "three";
import Water from "./components/Water";
import Peak from './components/Peak'
import Terrain from "./components/Terrain";
import gsap from "gsap";

export default function Experience({roads, waters, picks}) {
    const {camera, controls} = useThree()
    const groupRoad = useRef()
    const groupWater = useRef()
    const groupPick = useRef()
    
    function handleClick(position) {
        gsap.to(controls.target, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: 1,
            ease: "power1.out",
            onUpdate: () => {
                const direction = camera.position.clone().sub(controls.target).normalize();
                // const distance = camera.position.distanceTo(controls.target);
                const distance = 50
                camera.position.copy(controls.target).add(direction.multiplyScalar(distance));
                controls.update()
            }
        });
    }

    return <>
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2}/>
        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5} />
        {/* <Terrain /> */}
            
        <group ref={groupRoad} rotation-y={- Math.PI / 2} rotation-z={Math.PI}>
            {
                roads.features.map((feature, index) => (
                    <Road key={index} coordinates={feature.geometry.coordinates} />
                ))
            }
        </group>

        <group ref={groupWater}>
            {
                waters.features.map((feature, index) => (
                    <Water key={index} coordinates={feature.geometry.coordinates} />
                ))
            }
        </group>

        <group ref={groupPick}>
            {
                picks.features.map((feature, index) => (
                    feature.properties.ele && <Peak key={index} clickCallback={handleClick} coordinates={feature.geometry.coordinates} properties={feature.properties}/>
                ))
            }
        </group>
    </>
}
