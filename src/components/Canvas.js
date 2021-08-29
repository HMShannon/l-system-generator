import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {segment} from '../functions/segment.js';

let renderer = new THREE.WebGLRenderer();
let camera;
let controls;

let scene = new THREE.Scene();
let light = new THREE.PointLight(0xFFFFFF, 1, 100000);
light.position.set(0, 400, 0);
light.castShadow = true;
let ambientLight = new THREE.AmbientLight((0xcccccc));

function createOrigin() {
  let geometry = new THREE.SphereGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
  return new THREE.Mesh(geometry, material);
}
scene.add(light, ambientLight);

function Canvas(props) {

  let mount = useRef(null);

  function onResize() {
    if (mount.current && camera) {
      camera.aspect = mount.current.clientWidth / mount.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.current.clientWidth, mount.current.clientHeight);
      renderer.render(scene, camera);
    }
  };

  function constructScene() {
    let xAngle = 0;
    let yAngle = 0;
    let zAngle = 0;
    let length = props.length;
    let radius = props.radius;
    let states = [];
    let origin = createOrigin();
    origin.position.set(0, -4.5, 0);

    if (scene.children[2]) {
      scene.children[2].geometry.dispose();
      scene.children[2].material.dispose();
      scene.remove(scene.children[2]);
    }

    scene.add(origin);
    let prevSeg = origin;
    let prevLength = 0;

    for (let i = 0; i < props.sentence.length; i++) {
      if (props.sentence[i] === 'F') {
        let mySegment = segment(length, radius, props.radialModifier, xAngle, yAngle, zAngle, props.lengthModifier, props.color, props.texture, prevLength);

        prevSeg.add(mySegment);
        prevSeg = mySegment;
        xAngle = 0;
        yAngle = 0;
        zAngle = 0;
        prevLength = length;
        length *= props.lengthModifier;
        radius *= props.radialModifier;

        if (radius * props.radialModifier < 0.03) {
          radius = 0.03;
        }
        if (length * props.lengthModifier < 0.3) {
          length = 0.3;
        }

      }
      if (props.sentence[i] === '+') {
        zAngle += props.angle;
      }
      if (props.sentence[i] === '-') {
        zAngle -= props.angle;
      }
      if (props.sentence[i] === '^') {
        xAngle += props.angle;
      }
      if (props.sentence[i] === '&') {
        xAngle -= props.angle;
      }
      if (props.sentence[i] === '<') {
        yAngle += props.angle;
      }
      if (props.sentence[i] === '>') {
        yAngle -= props.angle;
      }
      if (props.sentence[i] === '[') {
        states.push({segment: prevSeg, zAngle: zAngle, yAngle: yAngle, xAngle: xAngle, length: length, prevLength: prevLength, radius: radius});
      }
      if (props.sentence[i] === ']') {
        let lastState = states[states.length-1];
        prevSeg = lastState.segment;
        zAngle = lastState.zAngle;
        yAngle = lastState.yAngle;
        xAngle = lastState.xAngle;
        length = lastState.length;
        prevLength = lastState.prevLength;
        radius = lastState.radius;
        states.pop();
      }
    }
    props.setTrigger(false);
  }

  useEffect(() => {
    camera = new THREE.PerspectiveCamera(75, mount.current.clientWidth / mount.current.clientHeight, 0.1, 1000);
    camera.position.set( 0, 0, 8);

    renderer.setSize(mount.current.clientWidth, mount.current.clientHeight);
    window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('resize', onResize);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.35;

    function animate() {
      controls.update();
      window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    if (mount.current.children.length === 0) {
      mount.current.appendChild(renderer.domElement);
      controls.update();
    }
    if (props.trigger) {
      constructScene();
    }
    window.requestAnimationFrame(animate);
  }, [props.trigger]);

  return (
    <div id="canvas" ref={mount}>

    </div>
  )
}

export default Canvas;
