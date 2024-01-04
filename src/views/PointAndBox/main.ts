import * as THREE from 'three'

const LIGHT_COLOR = 0xffffff
const LIGHT_INTENSITY = 1.0
const AMBIENT_LIGHT_INTENSITY = 0.8
const BOX_COLOR = 0x009dff
const BOX_SIZE = 1
const CAMERA_POSITION = { x: 3, y: 2.5, z: 5 }
const SCENE_BACKGROUND = "#AAA"

const createLight = () => {
  const pointLight = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY)
  pointLight.position.set(4, 4, 2)
  pointLight.intensity = 180
  const ambientLight = new THREE.AmbientLight(LIGHT_COLOR)
  ambientLight.intensity = AMBIENT_LIGHT_INTENSITY
  return { pointLight, ambientLight }
}

const createBox = () => {
  const geomary = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE)
  const material = new THREE.MeshLambertMaterial({ color: BOX_COLOR })
  const cube = new THREE.Mesh(geomary, material)
  return { geomary, material, cube }
}

const createRendererAndCamera = (width: number, height: number) => {
  const render = new THREE.WebGLRenderer()
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  return { render, camera }
}

const createScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(SCENE_BACKGROUND)
  return scene
}

const init = (dom: Element) => {
  const width = dom.clientWidth
  const height = dom.clientHeight
  const { pointLight, ambientLight } = createLight()
  const { geomary, material, cube } = createBox()
  const { render, camera } = createRendererAndCamera(width, height)

  const scene = createScene()
  scene.add(ambientLight)
  scene.add(pointLight)
  scene.add(cube)

  camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z)
  camera.lookAt(0, 0, 0)

  render.setSize(width, height)
  
  dom.appendChild(render.domElement)

  function animation () {
    requestAnimationFrame(animation)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    render.render(scene, camera)
  }

  animation()

  return () => {
    scene.remove(cube)
    pointLight.dispose()
    ambientLight.dispose()
    material.dispose()
    geomary.dispose()
    geomary.attributes = {}
    render.dispose()
    dom.removeChild(render.domElement)
  }
}

export default init
