import {
  Object3D,
} from 'three';
import Cloud from 'Cloud';

class Sky {
  constructor() {
    this._mesh = new Object3D();
    this._mesh.name = 'sky';
    this._mesh.position.y = -600;

    // X nuages répartis dans le ciel (360º).
    const nb = 20;
    const stepAngle = Math.PI * 2 / nb;

    for (let i = 0; i < nb; i++) {
      const cloud = new Cloud();
      const angle = stepAngle * i; // Un nuage par "step".
      const height = 700 + (Math.random() * 200); // Hauteur random…
      const s = 1 + (Math.random() * 2);

      cloud.mesh.name = `cloud${i}`;
      cloud.mesh.position.x = Math.cos(angle) * height;
      cloud.mesh.position.y = Math.sin(angle) * height;
      cloud.mesh.position.z = -400 - (Math.random() * 400); // Profondeur
      cloud.mesh.rotation.z = angle + (Math.PI / 2); // Bien orienté
      cloud.mesh.scale.set(s, s, s);

      this._mesh.add(cloud.mesh);
    }
  }

  get mesh() {
    return this._mesh;
  }
}

export default Sky;
