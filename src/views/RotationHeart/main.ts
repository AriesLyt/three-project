import * as THREE from 'three'

import { FBXLoader } from 'three/examples/jsm/Addons.js'

import ttt from '@/assets/fbx/heart/heart1.fbx'

console.log(FBXLoader)

const loader = new FBXLoader()

const create = (dom: Element) => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#AAA')

  const ambientLight = new THREE.AmbientLight('#fff', 0.8)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight('#fff', 5)
  pointLight.position.set(0, 20, 20)
  pointLight.castShadow = true
  pointLight.intensity = 2000
  scene.add(pointLight)

  let heart: THREE.Group<THREE.Object3DEventMap> | null = null

  loader.load(ttt, (object) => {
    console.log(object)
    const metar = new THREE.MeshPhongMaterial({color: '#fb4b4b'})
    // metar.color = new THREE.Color('#fb4b4b')
    // const mesh = new THREE.Mesh(object, metar)
    // object.children.forEach((child) => {
    //   console.log()
    // })
    object.traverse((v) => {
    //   console.log(v.materia)
      v.material = metar
    })
    object.position.set(-5, 0, 0)
    object.scale.set(0.1, 0.1, 0.1)
    console.log('after', object)
    heart = object
    scene.add(object)
  })

  //   const geometry = new THREE.BoxGeometry(5, 5, 5);
  //   geometry.translate(4, 0, 0);
  //   const material = new THREE.MeshPhongMaterial({ color: 'skyblue' });
  //   const mesh = new THREE.Mesh(geometry, material);

  //   scene.add(mesh)

  const render = new THREE.WebGLRenderer()
  render.setSize(dom.clientWidth, dom.clientHeight)
  render.shadowMap.enabled = true
  dom.appendChild(render.domElement)

  const camera = new THREE.PerspectiveCamera(45, dom.clientWidth / dom.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 50)
  camera.lookAt(0, 0, 0)

  console.log('render')

  function animation () {
    requestAnimationFrame(animation)
    render.render(scene, camera)
    if (heart) heart.rotation.y += 0.04
  }
  animation()

  return () => {
    scene.remove(ambientLight)
    scene.remove(pointLight)
    ambientLight.dispose()
    pointLight.dispose()
    render.dispose()
    dom.removeChild(render.domElement)
  }
}

export default create
