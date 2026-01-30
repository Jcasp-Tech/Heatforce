import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
const BackgroundBubblesDesktop=()=>{
    function Box(props: JSX.IntrinsicElements['mesh']) {const ref = useRef<THREE.Mesh>(null!)
        useFrame(() => (ref.current.position.x < 15 ? ref.current.position.x += 0.008 : ref.current.position.x =  ref.current.position.x - 30))

        useFrame(() => (ref.current.scale.y < 0.2 ? ref.current.scale.y += 0.001 : ref.current.scale.y = -0.2))
        useFrame(() => (ref.current.scale.x < 0.2 ? ref.current.scale.x += 0.001 : ref.current.scale.x = -0.2))

        
        return (
          <mesh
            {...props}
            ref={ref}
            >
            <circleGeometry />
            <meshStandardMaterial color={ '#ffffff' } opacity={0.6} transparent/>
          </mesh>
        )
      }
    
    return (
        <div style={{width: '100%', height: '100%',position:"absolute",top:"0px", left:"0px" }}>
        <Canvas  style={{backgroundColor: '#e6f0f9'}}>
            <ambientLight intensity={1} />
          {[...Array(2000)].map((_, i) => (
            <Box key={i} position={[(Math.random() - 0.5) * 30, (Math.random() - 0.65) * 3, 0 ]} scale={(Math.random() * 0.4) - 0.2} />
          ))}
          </Canvas>
      </div>
    )
}
export default BackgroundBubblesDesktop;