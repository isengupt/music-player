import * as THREE from "three";
import React, { useMemo, Suspense, useState, useCallback } from "react";
import {  useFrame, useThree} from "react-three-fiber";
import { useBox } from "use-cannon";

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)

function Block({ position, color, ...props }) {
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
  
  
    const [ref, api] = useBox(() => ({
      ...props,
      mass: 1,
      args: [4, 4, 4],
      
    }));
   


    const factor = useMemo(() => 0.5 + Math.random(), [])
    useFrame((state) => {
      const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
     // api.position.set(position[0], 1 + t * 3 - 7, position[2] )
     api.position.set(position[0], props.music ? -14 + props.music / aspect: -15 , position[2])
    //ref.current.position.y = 1 + t * 3 - 5
    })
    return (
      <mesh ref={ref} position={position} {...props} >
        <boxBufferGeometry attach="geometry"  args={[0.7, 0.7, 0.7]} />
        <meshPhongMaterial
          attach="material"
          color="white"
        transparent
        opacity={0}
         // side={THREE.DoubleSide}
        />
      </mesh>
    );
  }
  
export default function Blocks(props) {
    const { viewport } = useThree();
  console.log(props.amplitudeValues)
  let boxes =  [...Array(25).keys()]

    return (
      <>
      {boxes.map((box) => 
        <Block position={[(-viewport.width /2) + ( (viewport.width) / boxes.length) * box,-viewport.height / 2 - 10 , 9]} music={props.amplitudeValues ? props.amplitudeValues[box] : null } />
        )}
      </>
    );
  }