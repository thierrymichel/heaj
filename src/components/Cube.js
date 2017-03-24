import * as THREE from 'three'

/**
 * Cube manager
 *
 * @class Cube
 */
class Cube {
  /**
   * Creates an instance of Cube.
   *
   * @memberOf Cube
   */
  constructor(color = 0x00ff00) {
    // Initialiser le cube
    this._color = color
    this.init()
  }

  /**
   * Cube init
   *
   * @returns {undefined}
   *
   * @memberOf Cube
   */
  init() {
    const geometry = new THREE.BoxGeometry(50, 50, 50)
    const material = new THREE.MeshLambertMaterial({
      color: this._color,
    })

    this._mesh = new THREE.Mesh(geometry, material);
    console.info('init Cube', this._mesh)
    this._mesh.name = 'cube'
  }

  get mesh() {
    return this._mesh
  }
}
export default Cube
