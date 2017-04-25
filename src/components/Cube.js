/* eslint-disable no-magic-numbers, no-floating-decimal */

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
   * @param {color} color material color
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
      shading: THREE.FlatShading,
    })

    this._mesh = new THREE.Mesh(geometry, material);
    this._mesh.name = 'cube'
    this._mesh.position.x = Math.random() * -150
    this._mesh.position.y = Math.random() * 350
    this._mesh.position.z = Math.random() * 250
  }

  get mesh() {
    return this._mesh
  }

  update() {
    this._mesh.rotation.x += 0.01
  }
}
export default Cube
