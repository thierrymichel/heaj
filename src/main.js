/**
 * Main JS entry file
 */
// Debug start
global.debug = true;
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
// Debug end

import World from 'World';
import Sea from 'Sea';
import Sky from 'Sky';
import {
  Hemisphere,
  Ambient,
  Directional,
} from 'Lights';

/**
 * The game
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   *
   * @memberOf Game
   */
  constructor() {
    // Quand le DOM est prêt, on initialise le jeu
    Game.domReady.then(() => {
      this.init();
    });
  }

  /**
   * Attend que le DOM soit prêt.
   *
   * @readonly
   * @static
   * @returns {Promise} statut du chargement
   * @memberOf Game
   */
  static get domReady() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }

  /**
   * Initialise le jeu.
   *
   * @returns {undefined}
   * @memberOf Game
   */
  init() {
    console.info('Game:init! 🚀', this);
    document.documentElement.classList.add('ready');

    this._world = new World();
    this._world.addLight(new Hemisphere());
    this._world.addLight(new Ambient());
    this._world.addLight(new Directional());
    this._world.addObject(new Sea());
    this._world.addObject(new Sky());

    if (global.debug) {
      window.scene = this._world.scene;
      window.THREE = THREE;
      // this._controls = new OrbitControls(
      //   this._world.camera,
      //   this._world.renderer.domElement
      // );
    }
  }
}

new Game(); // eslint-disable-line no-new
