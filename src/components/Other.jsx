import React, { Suspense, useState, useCallback } from "react"
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber"
import { Physics, usePlane, useSphere } from "use-cannon"
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';
import { Task } from './Task';
import { Tasks } from '/imports/api/tasks';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import * as THREE from "three"
import "./styles.css"
import clamp from "lodash-es/clamp"
import Post from "./Post"
//import crossUrl from "/cross.jpg"
//import strikeUrl from "./strike.mp3"

// A physical sphere tied to mouse coordinates without visual representation
function Mouse() {
  const { viewport } = useThree()
  const [, api] = useSphere(() => ({ type: "Kinematic", args: 4.5 }))
  return useFrame(state =>
    api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7),
  )
}

// A physical plane without visual representation
function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

// Creates a crate that catches the spheres
function Borders() {
  const { viewport } = useThree()
  return (
    <>
      <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  )
}

// Spheres falling down
function InstancedSpheres({ count = 200 }) {
  const { viewport } = useThree()
  //const texture = useLoader(THREE.TextureLoader, crossUrl)
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
  const [ref] = useSphere(index => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: 1,
    //onCollide: e => play(index, e.contact.impactVelocity),
  }))
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial color="#ff7b00"  clearcoat={1} clearcoatRoughness={0} />
    </instancedMesh>
  )
}


const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call('tasks.setChecked', _id, !isChecked);
};

const togglePrivate = ({ _id, isPrivate }) => {
  Meteor.call('tasks.setPrivate', _id, !isPrivate);
};

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const App = () => {
  const filter = {};

  const [hideCompleted, setHideCompleted] = useState(false);

  if (hideCompleted) {
    _.set(filter, 'checked', false);
  }

  const { tasks, incompleteTasksCount, user } = useTracker(() => {
    Meteor.subscribe('tasks');

    return ({
      tasks: Tasks.find(filter, {sort: {createdAt: -1}}).fetch(),
      incompleteTasksCount: Tasks.find({checked: {$ne: true}}).count(),
      user: Meteor.user(),
    });
  });



  return (
    <div className="main">
    <Canvas
      concurrent
      shadowMap
      gl={{ alpha: false, antialias: false }}
      camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>
      <fog attach="fog" args={["red", 25, 40]} />
      <color attach="background" args={["#ffdd41"]} />
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
        <Physics gravity={[0, -50, 0]} defaultContactMaterial={{ restitution: 0.6 }}>
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders />
            <InstancedSpheres />
          </group>
        </Physics>
        <Post />
      </Suspense>
    </Canvas>
    </div>
  );
};
