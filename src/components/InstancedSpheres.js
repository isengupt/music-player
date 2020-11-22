
import * as THREE from "three";
import React, { Suspense, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox } from "use-cannon";
import crossUrl from './dot.png'

// Spheres falling down
export default function InstancedSpheres({  color, count = 100 }) {
    const { viewport } = useThree();
    const map = useLoader(THREE.TextureLoader, '/carbon_normal.jpg')
    /*const [state] = useState(() => ({
      playing: [],
      sounds: [...new Array(10)].map(() => new Audio(strikeUrl))
    }))
    const play = useCallback((index, velocity) => {
      //console.log(state.playing, Math.max(...state.playing))
      if (velocity > 2 && velocity > Math.max(...state.playing) / 2 && state.playing.length < 10) {
        state.playing.push(velocity)
        setTimeout(() => state.playing.splice(0, 1), 200)
        state.playing.forEach((velocity, index) => {
          state.sounds[index].volume = clamp(velocity / 10, 0, 1)
          state.sounds[index].play()
        })
      }
    }, [])*/
  
  
  
    const [ref] = useSphere((index) => ({
      mass: 1,
      position: [4 - Math.random() * 8, viewport.height, 0, 0],
      args: 1,
      //onCollide: e => play(index, e.contact.impactVelocity),
    }));
    return (
      <instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[null, null, count]}
      >
        <sphereBufferGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
        attach="material"
        color={color}
       // vertexColors={THREE.VertexColors}
        normalMap={map}
        normalScale={[1, 1]}
        normalMap-wrapS={THREE.RepeatWrapping}
        normalMap-wrapT={THREE.RepeatWrapping}
        normalMap-repeat={[10, 10]}
      />
      </instancedMesh>
    );
  }