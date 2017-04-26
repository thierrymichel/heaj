import {
  Scene,
  Fog,
  PerspectiveCamera,
  WebGLRenderer,
  CameraHelper,
} from 'three';

const { Stats } = require('three-stats');

class World {
  /**
   * Crée une instance de World.
   * @param {number} w largeur du viewport
   * @param {number} h hauteur du viewport
   *
   * @memberOf World
   */
  constructor(w, h) {
    console.info('World:construtor');
    // On récupère les dimension du viewport
    // et on les utilise pour le ratio de la caméra
    // et les dimensions de "renderer".
    this._width = w;
    this._height = h;
    this._lights = [];
    this._objects = [];

    // Création de la scène
    this._scene = new Scene();
    this._scene.name = 'scene';

    this.initFog();
    this.initCamera();
    this.initRenderer();

    if (global.debug) {
      this.initStats();
    }

    this.render();
  }

  // Getters / Setters
  get scene() {
    return this._scene;
  }

  get camera() {
    return this._camera;
  }

  get renderer() {
    return this._renderer;
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
   * Resize
   *
   * @param {number} w largeur du viewport
   * @param {number} h hauteur du viewport
   * @returns {undefined}
   *
   * @memberOf World
   */
  resize(w, h) {
    this._renderer.setSize(w, h);
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
  }

  /**
   * Rend la scène
   *
   * @returns {undefined}
   *
   * @memberOf World
   */
  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    if (this._stats) {
      this._stats.begin();
    }

    this._objects.forEach((obj) => {
      if (obj.update) {
        obj.update();
      }
    });

    this._renderer.render(this._scene, this._camera);

    if (this._stats) {
      this._stats.end();
    }
  }

  /**
   * Crée et ajoute un helper à la scène
   *
   * @param {any} camera camera
   * @param {any} name nom du helper
   * @returns {undefined}
   *
   * @memberOf World
   */
  addHelper(camera, name) {
    const helper = new CameraHelper(camera);

    helper.name = `${name}Helper`;
    this._scene.add(helper);
  }

  /**
   * Ajoute une lumière à la scène
   *
   * @param {any} instance Light
   * @returns {undefined}
   * @memberOf World
   */
  addLight(instance) {
    // ES6 object destructuring
    // const light = instance.light;
    const { light } = instance;

    this._lights.push(light);
    this._scene.add(light);

    if (light.helper && global.debug) {
      this.addHelper(light.shadow.camera, light.name);
    }

    console.info(this._lights);
  }

  /**
   * Ajoute un objet à la scène
   *
   * @param {any} instance Object
   * @returns {undefined}
   * @memberOf World
   */
  addObject(instance) {
    // ES6 object destructuring
    // const light = instance.light;
    const { mesh } = instance;

    this._objects.push(instance);
    this._scene.add(mesh);

    console.info(this._objects);
  }
}

export default World;
