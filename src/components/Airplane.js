import {
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  FlatShading,
  Mesh,
} from 'three';
import colors from '../utils/colors';

/**
 * Crée un avion
 *
 * @class Airplane
 */
class Airplane {
  constructor() {
    this._mesh = new Object3D();
    this._mesh.name = 'airplane';
    this._mesh.scale.set(0.25, 0.25, 0.25);
    this._mesh.position.y = 100;

    this._mat = new MeshPhongMaterial({
      shading: FlatShading,
    });

    this.createBody();
    this.createEngine();
    this.createTail();
    this.createWings();
    this.createPropeller();
    this.createBlades();
  }

  get mesh() {
    return this._mesh;
  }

  createBody() {
    const geom = new BoxGeometry(60, 50, 50, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.red);

    const cockpit = new Mesh(geom, mat);

    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this._mesh.add(cockpit);
  }

  createEngine() {
    const geom = new BoxGeometry(20, 50, 50, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.white);

    const engine = new Mesh(geom, mat);

    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this._mesh.add(engine);
  }

  createTail() {
    const geom = new BoxGeometry(15, 20, 5, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.red);

    const tail = new Mesh(geom, mat);

    tail.position.set(-35, 25, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    this._mesh.add(tail);
  }

  createWings() {
    const geom = new BoxGeometry(40, 8, 150, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.red);

    const wings = new Mesh(geom, mat);

    wings.castShadow = true;
    wings.receiveShadow = true;
    this._mesh.add(wings);
  }

  createPropeller() {
    const geom = new BoxGeometry(20, 10, 10, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.brown);

    this.propeller = new Mesh(geom, mat);
    this.propeller.position.set(50, 0, 0);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;
    this._mesh.add(this.propeller);
  }

  createBlades() {
    const geom = new BoxGeometry(1, 100, 20, 1, 1, 1);
    const mat = this._mat.clone();

    mat.color.set(colors.brownDark);

    const blade = new Mesh(geom, mat);

    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
  }
}

export default Airplane;
