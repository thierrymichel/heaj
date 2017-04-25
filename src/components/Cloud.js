import {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
} from 'three';
import colors from '../utils/colors';

/**
 * Machine à fabriquer des nuages
 *
 * @class Cloud
 */
class Cloud {
  constructor() {
    // On crée un groupe "3D" pour y ajouter des petits cubes
    // qui seront également des meshs…
    this._mesh = new Object3D();

    const geom = new BoxGeometry(20, 20, 20);
    const mat = new MeshPhongMaterial({
      color: colors.white,
    });
    // De 3 à 5 cubes
    const nb = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < nb; i++) {
      const cube = new Mesh(geom, mat);
      const s = 0.1 + (Math.random() * 0.9); // Tailles différentes

      cube.position.x = i * 15;
      cube.position.y = Math.random() * 10;
      cube.position.y = Math.random() * 10;
      cube.rotation.y = Math.random() * Math.PI * 2; // 0 à 360 degrés
      cube.rotation.z = Math.random() * Math.PI * 2; // 0 à 360 degrés
      cube.scale.set(s, s, s);
      cube.castShadow = true;
      cube.receiveShadow = true;

      this._mesh.add(cube);
    }
  }

  get mesh() {
    return this._mesh;
  }
}

export default Cloud;
