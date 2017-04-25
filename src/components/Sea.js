import {
  CylinderGeometry,
  Matrix4,
  MeshPhongMaterial,
  FlatShading,
  Mesh,
} from 'three';
import colors from '../utils/colors';

class Sea {
  constructor() {
    // Création d'un cylindre.
    // Paramètres : rayon sup, inf, hauteur, segment rayon, segments hauteur.
    const geom = new CylinderGeometry(600, 600, 800, 40, 10);

    // Rotation sur l'axe des x
    geom.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));

    // Création du matériau
    const mat = new MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: 0.6,
      shading: FlatShading,
    });

    // Création du mesh + propriétés
    this._mesh = new Mesh(geom, mat);
    this._mesh.name = 'sea';
    this._mesh.position.y = -600;
    this._mesh.receiveShadow = true;
  }

  get mesh() {
    return this._mesh;
  }
}

export default Sea;
