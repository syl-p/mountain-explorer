import { useLoader } from "@react-three/fiber";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { FileLoader } from "three";
import GpsRelativePosition from "./utils/GpsRelativePosition";

import roadGjson from '/geo_jsons/road.geojson?url'
import waterGjson from '/geo_jsons/water.geojson?url'
import pickGjson from '/geo_jsons/pick.geojson?url'
import villageGjson from '/geo_jsons/village.geojson?url'
import * as GeoTIFF from "geotiff";
const CENTER = [2.5438099431228546, 43.15117793128316]

const DataContext = createContext({
    state: null,
    setActive: () => {},
    setTerrainRef: () => {}
})

// eslint-disable-next-line react/prop-types
function DataContextProvider({children}) {
    let [roads, waters, picks, villages] = useLoader(FileLoader, [roadGjson, waterGjson, pickGjson, villageGjson])
    const parsed_data = {
        roads: {...JSON.parse(roads), name: "Routes", type: "roads"},
        waters: {...JSON.parse(waters), name: "Points d'eau", type: "waters"},
        peaks: {...JSON.parse(picks), name: "Sommets", type: "peaks"},
        villages: {...JSON.parse(villages), name: "Villages", type: "villages"}
    }

    const [state, setState] = useState({
        active: null,
        data: parsed_data,
        terrain: null,
        terrain_ref: null,
    })

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
            
            const terrain =  {
                x,
                y,
                data
            }

            setState(state => ({
                active: null,
                data: state.data,
                terrain: terrain,
                terrain_ref: null
            }))
        }
        
        getTerrainData()
    }, [])


    const setActive = useCallback((t) => {
        setState(state => ({
            active: t,
            data: parsed_data,
            terrain: state.terrain,
            terrain_ref: null
        }))
    }, [])

    const setTerrainRef = useCallback((t) => {
        setState(state => ({
            active: state.active,
            data: parsed_data,
            terrain: state.terrain,
            terrain_ref: t
        }))
    }, [])

    const value = useMemo(() => {
        return {
            state,
            setActive,
            setTerrainRef
        }
    }, [setActive, setTerrainRef, state])

    return <>
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    </>
}

export {DataContext, DataContextProvider}
