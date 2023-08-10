import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import { StrictMode, Suspense, useContext } from 'react'
import Layout from "./components/Layout.jsx";
import { useLoader} from '@react-three/fiber'
import { FileLoader } from "three";
import Filters from "./components/Filters.jsx";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

import roadGjson from '/geo_jsons/road.geojson?url'
import waterGjson from '/geo_jsons/water.geojson?url'
import pickGjson from '/geo_jsons/pick.geojson?url'
import villageGjson from '/geo_jsons/village.geojson?url'

function App() {
  let [roads, waters, picks, villages] = useLoader(FileLoader, [roadGjson, waterGjson, pickGjson, villageGjson])
  
  const data = {
    roads: JSON.parse(roads), 
    waters: JSON.parse(waters), 
    picks: JSON.parse(picks), 
    villages: JSON.parse(villages)
  }

  return <>
    <div className="h-full w-full absolute top-0 left-0">
       <Canvas
        style={{ background: "#0f172a" }}
        /*flat*/
        gl={
              {
                  antialias: false
              }
          }
        camera={
          {
              fov: 25,
              near: 0.1,
              far: 5000,
              position: [-60, 59, 100]
          }
        }
        shadows="basic"
      >

        <Suspense fallback={<Loader />}>
          <Experience 
            roads={data.roads} 
            waters={data.waters} 
            picks={data.picks}
            villages={data.villages}/>
        </Suspense>

        <EffectComposer>  
          <Bloom /> 
          <Vignette eskil={false} offset={0.2} darkness={1.0} />         
          <DepthOfField focusDistance={1} focalLength={0.5} bokehScale={2} height={480} />
        </EffectComposer>
        <Perf />
      </Canvas>
    </div>
    <main className="h-full flex flex-col justify-stretch items-start">
      <header className="w-full z-50 text-white flex space-x-12 p-6">
        <div className="flex-1 flex space-x-4 items-center">
            <img src="./svg-logo.svg" className="w-14 h-14 bg-yellow-600"/>
            <a>
                <span className="block text-xl">Mountain explorer</span>
                <span className="block text-sm">Le relief Audois en 3D</span>
            </a>
        </div>
        <div>
          ui...
        </div>
      </header>
      <aside className="z-50 flex-1 flex flex-col justify-around">
        <Filters filters={[
            {name: "Sommets", data: data.picks.features},
            {name: "Routes", data: data.roads.features},
            {name: "Points d'eau", data: data.waters.features},
            {name: 'Villages', data: data.villages.features}
        ]} />
      </aside>
      <footer className="p-6 z-50 text-white">
          <p>Développer par Websylvain</p>
      </footer>
    </main>
  </>
}

export default App
