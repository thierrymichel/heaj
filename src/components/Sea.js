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

    // Détecte les vertex en doublons.
    // Les retire et met à jour les faces.
    geom.mergeVertices();

    // Nombre de vertex
    const l = geom.vertices.length;

    // Stock de vagues
    this._waves = [];

    for (let i = 0; i < l; i++) {
      // On récupère chaque vertex
      const v = geom.vertices[i];

      this._waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        // Angle aéatoire
        ang: Math.random() * Math.PI * 2,
        // Distance aléatoire = amplitude
        amp: 5 + (Math.random() * 15),
        // Vitesse aléatoire = .016 < .048 radians/frame
        speed: 0.016 + (Math.random() * 0.032),
      });
    }

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

  update() {
    const verts = this.mesh.geometry.vertices;
    const l = verts.length;

    for (let i = 0; i < l; i++) {
      // Pour chaque vertex, avec ses propriétés
      const v = verts[i];
      const vprops = this._waves[i];

      // Position
      v.x = vprops.x + (Math.cos(vprops.ang) * vprops.amp);
      v.y = vprops.y + (Math.sin(vprops.ang) * vprops.amp);

      // On change l'angle pour la prochaine frame
      vprops.ang += vprops.speed;
    }

    this.mesh.rotation.z += 0.005;
  }
}

export default Sea;
