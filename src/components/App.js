/* eslint-disable no-magic-numbers, no-floating-decimal */

import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)
const { Stats } = require('three-stats') // eslint-disable-line
import debounce from 'lodash/debounce'

/**
 * App manager
 *
 * @class App
 */
class App {
  /**
   * Creates an instance of App.
   *
   * @memberOf App
   */
  constructor() {
    // Lights store
    this._lights = []
    // Objects store
    this._objects = []
    // Initialiser une scène
    this.initScene()
  }

  /**
   * Scene init
   *
   * @returns {undefined}
   *
   * @memberOf App
   */
  initScene() {
    console.info('initScene')
    // Create scene
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._scene = new THREE.Scene()
    this._scene.name = 'scene'

    if (global.debug) {
      window.scene = this._scene
      window.THREE = THREE
    }

    // Init camera
    this.initCamera()

    // Init light
    this.initLight()

    // Init renderer
    this.initRenderer()

    this.bind()

    // Init controls
    if (global.debug) {
      this.initControls()
    }

    // Init stats
    if (global.debug) {
      this.initStats()
    }

    // Init helpers
    if (global.debug) {
      this.addHelpers()
    }

    // Render !!!
    this.render()
  }

  initCamera() {
    const fieldOfView = 60
    const aspectRatio = this._width / this._height
    const nearPlane = 1
    const farPlane = 2000

    this._camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    this._camera.position.x = 200
    this._camera.position.y = 300
    this._camera.position.z = 500
    this._camera.lookAt(new THREE.Vector3(0, 0, 0))
  }

  initLight() {
    const ambientLight = new THREE.AmbientLight(0x999999, 1)

    ambientLight.name = 'ambient'
    this._scene.add(ambientLight)

    const spotLight = new THREE.SpotLight(0xffffff, .75)

    spotLight.name = 'spot'
    spotLight.position.set(-100, 100, 100)
    spotLight.castShadow = true
    this._lights.push(spotLight)
    this._scene.add(spotLight)
  }

  bind() {
    window.addEventListener(
      'resize',
      debounce(this.onResize.bind(this), 500)
    )
  }

  onResize() {
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._renderer.setSize(this._width, this._height)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
  }

  initRenderer() {
    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
    })
    this._renderer.setSize(this._width, this._height)
    this._renderer.shadowMap.enabled = true
    document.body.appendChild(this._renderer.domElement)
  }

  initControls() {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement)
  }

  initStats() {
    this._stats = new Stats()
    this._stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom)
  }

  render() {
    requestAnimationFrame(() => {
      this.render()
    })

    if (this._stats) {
      this._stats.begin()
    }

    this._objects.forEach((obj) => {
      obj.update()
    })

    this._renderer.render(this._scene, this._camera)

    if (this._stats) {
      this._stats.end()
    }
  }

  addHelpers() {
    // Parcourir les lumière
    this._lights.forEach((light) => {
      // Ajouter un helper
      this.addHelper(light.shadow.camera, light.name)
    })
  }

  addHelper(camera, name) {
    const helper = new THREE.CameraHelper(camera)

    helper.name = `${name}Helper`
    this._scene.add(helper)
  }

  add(obj) {
    this._objects.push(obj)
    this._scene.add(obj.mesh)
  }
}
export default App
