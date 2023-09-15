import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import {Suspense } from 'react'

import Filters from "./components/Filters.jsx";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { DataContextProvider } from "./DataContext.jsx";

function App() {
  return <>
    <DataContextProvider>
      <div className="h-full w-full absolute top-0 left-0">
        <Canvas
          style={{ background: "#0f172a" }}
          flat
          gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}
          camera={
            {
                fov: 25,
                near: 0.1,
                far: 5000,
                position: [-60, 59, 100]
            }
          }
          shadows
        >

          <Suspense fallback={<Loader />}>
            <Experience />
          </Suspense>

          <EffectComposer>
            <Vignette eskil={false} offset={0.1} darkness={1.3} />
            {/* <DepthOfField focusDistance={1} focalLength={0.5} bokehScale={2} height={500} /> */}
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
          <Filters />
        </aside>
        <footer className="p-6 z-50 text-white">
            <p>Développer par Websylvain</p>
        </footer>
      </main>
    </DataContextProvider>
  </>
}

export default App
