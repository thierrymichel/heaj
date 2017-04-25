/**
 * Main JS entry file
 */
// Debug start
global.debug = true;
import * as THREE from 'three';
// Debug end

import World from 'World';

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

    if (global.debug) {
      window.scene = this._world.scene;
      window.THREE = THREE;
    }
  }
}

new Game(); // eslint-disable-line no-new
