'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Points, PointMaterial } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      glowRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      glowRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5
    }
  })

  return (
    <group>
      {/* Glow effect */}
      <Box
        ref={glowRef}
        args={[1.3, 1.3, 1.3]}
      >
        <meshBasicMaterial
          color={hovered ? "#a855f7" : "#3b82f6"}
          transparent
          opacity={0.15}
        />
      </Box>
      
      {/* Main cube */}
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#a855f7" : "#3b82f6"}
          emissive={hovered ? "#a855f7" : "#1e40af"}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>
    </group>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

function FloatingSpheres() {
  const sphere1Ref = useRef<THREE.Mesh>(null)
  const sphere2Ref = useRef<THREE.Mesh>(null)
  const sphere3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphere1Ref.current) {
      sphere1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3
      sphere1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2
      sphere1Ref.current.rotation.x = state.clock.elapsedTime * 0.2
      sphere1Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.4) * -2.5
      sphere2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 1.5
      sphere2Ref.current.rotation.x = state.clock.elapsedTime * -0.15
      sphere2Ref.current.rotation.y = state.clock.elapsedTime * -0.25
    }
    if (sphere3Ref.current) {
      sphere3Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 1.5
      sphere3Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * -2
      sphere3Ref.current.rotation.x = state.clock.elapsedTime * 0.1
      sphere3Ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group>
      {/* Small floating spheres */}
      <Sphere ref={sphere1Ref} args={[0.3, 16, 16]} position={[2, 1, -2]}>
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
      
      <Sphere ref={sphere2Ref} args={[0.25, 16, 16]} position={[-2, -1, -1]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
      
      <Sphere ref={sphere3Ref} args={[0.2, 16, 16]} position={[1, -1.5, -3]}>
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.25}
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </group>
  )
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#3b82f6" />
        
        {/* Main floating cube */}
        <FloatingCube />
        
        {/* Particle field */}
        <ParticleField />
        
        {/* Small floating spheres */}
        <FloatingSpheres />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  )
}
