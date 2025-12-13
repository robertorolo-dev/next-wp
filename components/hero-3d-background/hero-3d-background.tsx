"use client"

import { Canvas, useFrame, type RootState } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import type * as THREE from "three"

function FloatingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null)
    const groupRef = useRef<THREE.Group>(null)
    const boxMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
    const torusMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

    useFrame((state: RootState) => {
        const time = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2
            meshRef.current.rotation.y = time * 0.3
        }
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(time * 0.5) * 0.3
        }

        // Animate colors (Blue theme)
        if (boxMaterialRef.current) {
            // Hue around 0.6 (Blue), Saturation 0.8, Lightness 0.5
            boxMaterialRef.current.color.setHSL(0.6 + Math.sin(time * 0.5) * 0.05, 0.8, 0.5)
        }
        if (torusMaterialRef.current) {
            torusMaterialRef.current.color.setHSL(0.65 + Math.cos(time * 0.5) * 0.05, 0.8, 0.5)
        }
    })

    return (
        <group ref={groupRef}>
            {/* Main wireframe box */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshBasicMaterial ref={boxMaterialRef} wireframe color="#2d4cc4" opacity={0.15} transparent />
            </mesh>

            {/* Inner rotating torus */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.2, 0.3, 16, 50]} />
                <meshBasicMaterial ref={torusMaterialRef} wireframe color="#1c3bc4" opacity={0.1} transparent />
            </mesh>

            {/* Floating particles */}
            {Array.from({ length: 50 }).map((_, i) => (
                <mesh key={i} position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="#174add" opacity={0.3} transparent />
                </mesh>
            ))}
        </group>
    )
}

export function Hero3DBackground() {
    return (
        <div className="absolute inset-0 w-full h-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="w-full h-full">
                <ambientLight intensity={0.5} />
                <FloatingGeometry />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    )
}
