import {useContext, useRef} from "react";
import Road from './components/Road'
import { OrbitControls, SoftShadows, useHelper } from "@react-three/drei";
import { useThree } from '@react-three/fiber'
import Water from "./components/Water";
import Peak from './components/Peak'
import Terrain from "./components/Terrain";
import gsap from "gsap";
import * as THREE from "three"
import { DataContext } from "./DataContext";
import Urban from "./components/Urban.jsx";

export default function Experience({roads, waters, picks, villages}) {
    const dirLight = useRef()
    useHelper(dirLight, THREE.DirectionalLightHelper, 1)
    const {camera, controls} = useThree()
    const groupRoad = useRef()
    const groupWater = useRef()
    const groupPick = useRef()
    const groupVillage = useRef()

    const {state, setActive} = useContext(DataContext)

    const terrainGroup = useRef()

    function handleClick(position, name, type) {
        setActive({
            name,
            type
        })
        gsap.to(controls.target, {
            x: position.x,
            y: position.y,
            z: position.z,
            duration: 1,
            ease: "power1.out",
            onUpdate: () => {
                const direction = camera.position.clone().sub(controls.target).normalize();
                // const distance = camera.position.distanceTo(controls.target);
                const distance = 100
                camera.position.copy(controls.target).add(direction.multiplyScalar(distance));
                controls.update()
            }
        });
    }

    return <>
        <axesHelper scale={100}/>
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2}/>
        
        <directionalLight ref={dirLight} 
            position={[-40, 50, -20]} intensity={0.6}
            castShadow  receiveShadow
            shadow-camera-near={ 1 }
            shadow-camera-far={ 200 }
            shadow-camera-top={ 200 }
            shadow-camera-right={ 200 }
            shadow-camera-bottom={ - 200 }
            shadow-camera-left={ - 200 } />

        <ambientLight intensity={1}/>

        <Terrain>
            <group ref={groupRoad} rotation-x={Math.PI/2}>
                {
                    state.data.roads.features.map((feature, index) => (
                        <Road key={index} coordinates={feature.geometry.coordinates}/>
                    ))
                }
            </group>

            <group ref={groupVillage} rotation-y={- Math.PI / 2} rotation-z={Math.PI/2}>
                {
                    state.data.villages.features.filter(v => v.geometry && v.geometry.type === "Polygon").map((feature, index) => (
                        <Urban key={index} coordinates={feature.geometry.coordinates} />
                    ))
                }
            </group>

            <group ref={groupWater} rotation-y={- Math.PI / 2} rotation-z={Math.PI/2}>
                {
                    state.data.waters.features.map((feature, index) => (
                        <Water key={index} coordinates={feature.geometry.coordinates} />
                    ))
                }
            </group>
        </Terrain>

        <group ref={groupPick}>
            {
                state.data.peaks.features.map((feature, index) => (
                    feature.properties.ele && <Peak key={index} clickCallback={handleClick} coordinates={feature.geometry.coordinates} properties={feature.properties}/>
                ))
            }
        </group>

        <SoftShadows />
    </>
}
