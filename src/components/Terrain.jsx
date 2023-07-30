import * as GeoTIFF from "geotiff";
import { useEffect, useRef, useState } from "react";
import GpsRelativePosition from "../utils/GpsRelativePosition";

const CENTER = [2.5438099431228546, 43.15117793128316]
 
function TerrainGeo({x, y, data}) {
    const geometry = useRef()
    console.log(geometry)
    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            geometry.current.getAttribute('position').setZ(i, - (el/30))
            geometry.current.getAttribute('position').needsUpdate = true
        }
        geometry.current.computeBoundingBox()
    }, [])


    return <>
        <mesh rotation-x={Math.PI/2} rotation-z={-Math.PI /2}>
            <planeGeometry ref={geometry} args={[x, y, x-1 , y-1]} />
            <meshPhongMaterial color="#a3a3a3" wireframe/>
        </mesh>
    </>
}


export default function Terrain() {
    const [terrain, setTerrain] = useState(null)

    useEffect(() => {
        async function getTerrainData() {
            const rawTiff = await GeoTIFF.fromUrl("./terrain.tif")
            const tiffImage = await rawTiff.getImage()
            
            const start = [2.4081944439999998,43.0770833329999974]
            const end = [2.7468055560000000, 43.2209722220000003]
            let leftBottom = GpsRelativePosition(start, CENTER)
            let rightTop = GpsRelativePosition(end, CENTER)
        
            let x = Math.abs(leftBottom[0]-rightTop[0])
            let y = Math.abs(leftBottom[1]-rightTop[1])
            const data = await tiffImage.readRasters(
                {width: Math.floor(x), height: Math.floor(y),
                  resampleMethod: 'bilinear', interleave: true})
            
            setTerrain({
                x,
                y,
                data
            })
            console.log(terrain)
        }
        
        getTerrainData()
    }, [])

    return <>
        {terrain && <TerrainGeo x={terrain.x} y={terrain.y} data={terrain.data} /> }
    </>
}