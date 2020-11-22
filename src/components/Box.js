import * as THREE from "three";
import React, { Suspense, useState, useCallback } from "react";
import { useFrame, useThree } from "react-three-fiber";
import {  useBox } from "use-cannon";


function Box({ mouse, scale }) {
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const [ref, api] = useBox(() => ({
      mass: 100,
      args: [4, 4, 4],
      isKinematic: true,
    }));
  useFrame(() => {
    
      api.position.set(- 5 -  (viewport.width / 2 ) + scale / 8, -7, 8)
     /*  api.position.set(
      [10,0,5]
      ); */
    }); 
    return (
      <mesh ref={ref} position={[10,-5,5]}>
        <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
        <meshLambertMaterial
          attach="material"
          color="transparent"
          transparent
          opacity={0}
      
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  export default Box;