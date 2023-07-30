import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import { StrictMode, Suspense } from 'react'
import Layout from "./components/Layout.jsx";
import { useLoader} from '@react-three/fiber'
import { FileLoader } from "three";
import Filters from "./components/Filters.jsx";

function App() {
  let [roads, waters, picks] = useLoader(FileLoader, ['/geo_jsons/road.geojson', '/geo_jsons/water.geojson', '/geo_jsons/pick.geojson'])
  roads = JSON.parse(roads)
  waters = JSON.parse(waters)
  picks = JSON.parse(picks)

  return (
    <Layout>
      <Filters filters={[
          {name: "roads", data: roads.features},
          {name: "waters", data: waters.features},
          {name: "picks", data: picks.features}
      ]} />
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
              fov: 70,
              near: 0.1,
              far: 200,
              position: [0, 50, 25]
          }
        }
        shadows="basic"
      >
        <fog attach="fog" args={["#0f172a", 150, 200]}></fog>
        <Suspense fallback={<Loader />}>
          <Experience roads={roads} waters={waters} picks={picks}/>
        </Suspense>
      </Canvas>
    </Layout>
  )
}

export default App
