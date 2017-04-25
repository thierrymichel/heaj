import {
  Scene,
  Fog,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

import debounce from 'lodash/debounce';
const { Stats } = require('three-stats');

class World {
  constructor() {
    console.info('World:construtor');
    // On récupère les dimension du viewport
    // et on les utilise pour le ratio de la caméra
    // et les dimensions de "renderer".
    this._width = window.innerWidth;
    this._height = window.innerHeight;

    // Création de la scène
    this._scene = new Scene();
    this._scene.name = 'scene';

    this.initFog();
    this.initCamera();
    this.initRenderer();
    this.bind();

    if (global.debug) {
      this.initStats();
    }

    this.render();
  }

  // Getters / Setters
  get scene() {
    return this._scene;
  }

  /**
   * Ajout d'un brouillard à la scène
   * avec une couleur identique à l'arrière plan.
   * Utile pour limiter les calculs de rendu.
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  initFog() {
    this._scene.fog = new Fog(0xf7d9aa, 100, 950);
  }

  /**
   * Création de la caméra
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  initCamera() {
    const aspectRatio = this._width / this._height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;

    this._camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    // Positionnement de la caméra
    this._camera.position.x = 0;
    this._camera.position.z = 200;
    this._camera.position.y = 100;
  }

  /**
   * Création du renderer
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  initRenderer() {
    this._renderer = new WebGLRenderer({
      // Transparence pour afficher le background CSS
      alpha: true,
      // Antialiasing
      antialias: true,
    });

    // Full screen
    this._renderer.setSize(this._width, this._height);

    // Activation de la gestion des ombres
    this._renderer.shadowMap.enabled = true;

    // Ajout du rendu au HTML
    this._container = document.querySelector('.world');
    this._container.appendChild(this._renderer.domElement);
  }


  /**
   * Affiche les performances
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  initStats() {
    this._stats = new Stats();
    this._stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom);
  }

  /**
   * Ajout des écouteurs d'événements
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  bind() {
    window.addEventListener(
      'resize',
      debounce(this.onResize.bind(this), 500)
    );
  }

  onResize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._renderer.setSize(this._width, this._height);
    this._camera.aspect = this._width / this._height;
    this._camera.updateProjectionMatrix();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    if (this._stats) {
      this._stats.begin();
    }

    this._renderer.render(this._scene, this._camera);

    if (this._stats) {
      this._stats.end();
    }
  }
}

export default World;