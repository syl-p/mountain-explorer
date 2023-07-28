import { useEffect, useMemo, useRef } from "react"
import * as THREE from 'three'
import GpsRelativePosition from '../utils/GpsRelativePosition'
const CENTER = [2.5438099431228546, 43.15117793128316]

export default function Road({coordinates}) {
    if (!coordinates[0][0] || !coordinates[0][1]) return;
    if(coordinates.length < 2 ) return;

    const geometry = useRef()
    const points = useMemo(() => {
        const points = []
        for (let i = 0; i < coordinates.length; i++) {
            let el = coordinates[i]

            if(!el[0] || !el[1]) return;

            let elp = [el[0], el[1]]
            elp = GpsRelativePosition(elp, CENTER)
            points.push(
                new THREE.Vector3(elp[0], 0.5, elp[1])
            )
        }
        return points
    }, [])

    useEffect(() => {
        geometry.current.setFromPoints(points)
    })

    return <>
        <line>
            <bufferGeometry ref={geometry}></bufferGeometry>
            <lineBasicMaterial color="#c5c7c5"></lineBasicMaterial>
        </line>
    </>
}