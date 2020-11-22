import * as THREE from "three";
import React, { Suspense, useState, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane, useSphere, useBox } from "use-cannon";
import Post from "./Post";
import Box from './Box'
import Blocks from './Blocks'
import PullRelease from './PullRelease'
import Borders from './Borders'
import InstancedSpheres from './InstancedSpheres'
import {LogoGithubIcon, PlayIcon} from '@primer/octicons-react'

import './styles.css'




function Layout() {
  return (
    
    <PullRelease />
  )
}



export default function Scene(props) {
  const [mouse,setMouse] = React.useState([1000,1000])
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []

  );

  const amplitudeValues = React.useRef(null);
  const [ampValues, setAmpValues] = React.useState(null)
  const [mainColor, setMainColor] = React.useState("#3336DC")
  const [scale, setScale] = React.useState(1)

  function adjustFreqBandStyle(newAmplitudeData){
    amplitudeValues.current = newAmplitudeData;
  setAmpValues(newAmplitudeData)
   // console.log(props.frequencyBandArray)
   // console.log(amplitudeValues.current)
  /*   let domElements = props.frequencyBandArray.map((num) =>
      document.getElementById(num)) */

  };

  function runSpectrum(){
    props.getFrequencyData(adjustFreqBandStyle)
    requestAnimationFrame(runSpectrum)
  }

  function handleStartBottonClick(){

    props.initializeAudioAnalyser()
    requestAnimationFrame(runSpectrum)
  }

 
  return (
    <>
    <div className="navbar">
    <div style={{color: mainColor}} className="navbar-title">Song Visualizer</div>
    <button style={{background: 'none', border: 'none', color: mainColor, padding: '0px', margin: '0px'}} onClick={() => handleStartBottonClick()}>
    <PlayIcon size='large' aria-label='GitHub'/>
    
    </button>
    </div>
    <div className="top-container">


      <PullRelease setMainColor={setMainColor} setScale = {setScale}/>
      <div style = {{  filter: 'blur(1px) brightness(0.9) opacity(90%)', backgroundBlendMode: 'darken'
 }}  className="container">
        <Canvas
         concurrent 
         shadowMap 
     
          gl={{ alpha: false, antialias: false }}
          camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
        >
          
          {/*  <color attach="background" args={["#fff"]} /> */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[50, 50, 25]}
            angle={0.3}
            intensity={2}
            castShadow
            shadow-mapSize-width={100}
            shadow-mapSize-height={100}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Physics gravity={[0, -30, 0]}>
           
              <group position={[0, 0, -10]}>
                <Box mouse={mouse} scale={scale} />
                <Blocks amplitudeValues={ampValues}/>
                <Borders />
                <InstancedSpheres color={mainColor} />
              </group>
            </Physics>
            <Post />
          </Suspense>
        </Canvas>
      </div>
    </div>
    </>
  );
}
