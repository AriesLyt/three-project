import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#AAA');

const createSphere = () => {
  const sphere = new THREE.SphereGeometry(2.5);
  const material = new THREE.MeshLambertMaterial({ color: 'skyblue' });
  sphere.translate(-5, 0, 0);
  const mesh = new THREE.Mesh(sphere, material);
  mesh.castShadow = true
  return {
    sphere: mesh,
    disposeSphere: () => {
      material.dispose();
      sphere.dispose();
    }
  };
}

const createBox = () => {
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  geometry.translate(4, 0, 0);
  const material = new THREE.MeshPhongMaterial({ color: 'skyblue' });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true
  return {
    box: mesh,
    disposeBox: () => {
      material.dispose();
      geometry.dispose();
    }
  };
}

const createPlane = () => {
  const plane = new THREE.PlaneGeometry(40, 25);
  plane.rotateX(THREE.MathUtils.degToRad(-90))
  const material = new THREE.MeshLambertMaterial({ color: '#000' });
  material.color = new THREE.Color('#fff');
  const mesh = new THREE.Mesh(plane, material);
  mesh.receiveShadow = true
  mesh.translateY(-4);
  return {
    plane: mesh,
    disposePlane: () => {
      material.dispose();
      plane.dispose();
    }
  };
}

const createRender = (dom: HTMLDivElement) => {
  const render = new THREE.WebGLRenderer()
  render.setSize(dom.clientWidth, dom.clientHeight)
  render.shadowMap.enabled = true
  dom.appendChild(render.domElement)

  return {
    render,
    disposeRender: () => {
      render.dispose()
      dom.removeChild(render.domElement)
    }
  }
}

const BoxAndSphereInit = (dom: HTMLDivElement) => {

  const { sphere, disposeSphere } = createSphere()

  const { box, disposeBox } = createBox()

  const { plane, disposePlane } = createPlane()

  scene.add(sphere)
  scene.add(box)
  scene.add(plane)

  const camera = new THREE.PerspectiveCamera(45, dom.clientWidth / dom.clientHeight, 0.1, 1000)
  camera.position.set(-10, 20, 40)
  camera.lookAt(0, 0, 0)

  const ambientLight = new THREE.AmbientLight(0x4f4f4f)
  ambientLight.intensity = 5
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(0, 10, 10)
  pointLight.intensity = 350
  pointLight.castShadow = true
  scene.add(pointLight)

  const { render, disposeRender } = createRender(dom)

  const controls = new OrbitControls(camera, render.domElement)

  render.render(scene, camera)

  
  function animation () {
    requestAnimationFrame(animation)
    controls.update()
    render.render(scene, camera)
  }

  animation()


  return () => {
    scene.remove(sphere)
    scene.remove(box)
    scene.remove(plane)
    scene.remove(ambientLight)
    scene.remove(pointLight)
    ambientLight.dispose()
    pointLight.dispose()
    disposeSphere()
    disposeBox()
    disposePlane()
    disposeRender()
  }
}

export default BoxAndSphereInit
