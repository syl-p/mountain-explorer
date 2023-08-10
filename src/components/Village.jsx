import GpsRelativePosition from "../utils/GpsRelativePosition";
import { Html } from "@react-three/drei";
import * as THREE from 'three'
const CENTER = [2.5438099431228546, 43.15117793128316]

export default function Village({coordinates, properties, clickCallback}) {
    const pointNormalized = GpsRelativePosition(coordinates, CENTER)
    const  position = new THREE.Vector3(pointNormalized[0], properties['ele'] ? -properties['ele'] / 30 : 0, pointNormalized[1])// position.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); // Rotation autour de l'axe X
        position.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI); // Rotation autour de l'axe Z
        position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); // Rotation autour de l'axe Y

    return <>
        <Html hidden position={[position.x, position.y, position.z]} center>
            <div className="group absolute cursor-pointer left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                <i className="absolute -top-1/2 -left-1/2 bg-yellow-500/70 h-2 w-2 rounded-full"></i>
                <div className="z-50 transition-all duration-500 group-hover:w-auto absolute -top-1/2  -translate-y-1/2 left-10 min-w-[150px]">
                    <p className="uppercase text-xs">{properties['name']}</p>
                </div>
            </div>
        </Html>
    </>
}