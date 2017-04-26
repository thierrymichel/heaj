/**
 * Main JS entry file
 */
// Debug start
global.debug = true;
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);
// Debug end

import debounce from 'lodash/debounce';
import World from 'World';
import Sea from 'Sea';
import Sky from 'Sky';
import Airplane from 'Airplane';
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
      this.bind();
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

    this._width = window.innerWidth;
    this._height = window.innerHeight;

    this._world = new World(this._width, this._height);
    this._world.addLight(new Hemisphere());
    this._world.addLight(new Ambient());
    this._world.addLight(new Directional());
    this._world.addObject(new Sea());
    this._world.addObject(new Sky());
    this._world.addObject(new Airplane());

    if (global.debug) {
      window.scene = this._world.scene;
      window.THREE = THREE;
      // this._controls = new OrbitControls(
      //   this._world.camera,
      //   this._world.renderer.domElement
      // );
    }
  }


  /**
   * Ajout des écouteurs d'événements
   *
   * @returns {undefined}
   *
   * @memberOf Game
   */
  bind() {
    window.addEventListener(
      'resize',
      debounce(this.resize.bind(this), 500)
    );

    document.addEventListener('mousemove', (e) => {
      this.mouseMove(e);
    });
  }

  resize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._world.resize(this._width, this._height);
  }

  mouseMove(e) {
    // On récupère quelque chose entre -1 et 1
    const x = -1 + ((e.clientX / this._width) * 2);
    const y = 1 - ((e.clientY / this._height) * 2);

    this._mouse = {
      x,
      y,
    };
    console.info(this._mouse);
  }
}

new Game(); // eslint-disable-line no-new
