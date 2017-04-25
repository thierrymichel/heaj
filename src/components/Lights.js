import {
  HemisphereLight,
  AmbientLight,
  DirectionalLight,
} from 'three';

/**
 * Classe commune
 *
 * @class Light
 */
class Light {
  constructor() {
    this._hasHelper = false;
  }

  get light() {
    return this._light;
  }

  get hasHelper() {
    return this._hasHelper;
  }
}

/**
 * Gradient de lumière
 *
 * @export
 * @class Hemisphere
 * @extends {Light}
 */
export class Hemisphere extends Light {
  constructor() {
    super();
    this._light = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    this._light.name = 'hemisphereLight';
  }
}

/**
 * Lumière ambiante
 *
 * @export
 * @class Ambient
 * @extends {Light}
 */
export class Ambient extends Light {
  constructor() {
    super();
    this._light = new AmbientLight(0xdc8874, 0.5);
    this._light.name = 'ambientLight';
  }
}

/**
 * Lumière directionnelle, agit comme le soleil
 * avec des rayons parallèles
 *
 * @export
 * @class Directional
 * @extends {Light}
 */
export class Directional extends Light {
  constructor() {
    super();
    this._hasHelper = true;
    this._light = new DirectionalLight(0xffffff, 0.9);
    this._light.name = 'directionalLight';
    this._light.position.set(150, 350, 350);
    this._light.castShadow = true;
    this._light.shadow.camera.left = -400;
    this._light.shadow.camera.right = 400;
    this._light.shadow.camera.top = 400;
    this._light.shadow.camera.bottom = -400;
    this._light.shadow.camera.near = 1;
    this._light.shadow.camera.far = 1000;
    this._light.shadow.mapSize.width = 4096;
    this._light.shadow.mapSize.height = 4096;
  }
}

