/**
 * Main JS entry file
 */
import App from 'App'
import Cube from 'Cube'

console.info('Ready! 🚀')

/* eslint-disable no-new */
const app = new App()
const cube = new Cube()

// Ajouter mesh à scene
app.add(cube.mesh);
