import {
  JSONLoader,
  MeshPhongMaterial,
  FlatShading,
  Mesh,
} from 'three';
import colors from '../utils/colors';

class Import {
  constructor(geom) {
    const mat = new MeshPhongMaterial({
      color: colors.red,
      shading: FlatShading,
    });

    this._mesh = new Mesh(geom, mat);
    this._mesh.name = 'blender';
    this._mesh.position.y = 200;
    this._mesh.receiveShadow = true;
  }

  get mesh() {
    return this._mesh;
  }

  static load(filename) {
    return new Promise((resolve) => {
      const loader = new JSONLoader();

      loader.load(`./exports/${filename}`, (geom) => {
        console.info(geom);
        resolve(new Import(geom));
      });
    });
  }
}

export default Import;
