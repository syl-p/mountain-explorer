import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import { StrictMode, Suspense } from 'react'
import Layout from "./components/layout.jsx";

function App() {

  return (
    <Layout>
      <StrictMode>
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
            <Experience/>
          </Suspense>
        </Canvas>
      </StrictMode>
    </Layout>
  )
}

export default App
