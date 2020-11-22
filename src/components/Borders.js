import * as THREE from "three";
import React, { Suspense, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox } from "use-cannon";
import clamp from "lodash-es/clamp";
import Post from "./Post";

import { useSprings, useSpring, animated, interpolate } from "react-spring";
import { useGesture, useDrag } from "react-use-gesture";
import Number from "./Number";
import Box from './Box'
import Blocks from './Blocks'
import PullRelease from './PullRelease'

// A physical plane without visual representation
function Plane({ color, ...props }) {
    const [ref] = usePlane(() => ({ ...props }));
    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color={color} />
      </mesh>
    );
  }
  
  
  
  
  
  
  
  
  // Creates a crate that catches the spheres
 export default function Borders() {
    const { viewport } = useThree();
    return (
      <>
        <Plane
          position={[0, -viewport.height / 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color="#fff"
          receiveShadow
        />
        <Plane
          position={[-viewport.width / 2 , 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          color="#fff"
          receiveShadow
        />
        <Plane
          position={[viewport.width / 2 , 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          color="#fff"
          receiveShadow
        />
        <Plane
          position={[0, 0, 5]}
          rotation={[0, 0, 0]}
          color="#fff"
          receiveShadow
        />
        <Plane
          position={[0, 0, 12]}
          rotation={[0, -Math.PI, 0]}
          color="#fff"
          receiveShadow
        />
      </>
    );
  }