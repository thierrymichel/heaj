/**
 * Main JS entry file
 */

/**
 * The game
 *
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   *
   * @memberOf Game
   */
  constructor() {
    // Quand le DOM est prêt, on initialise le jeu
    Game.domReady.then(() => {
      this.init();
    });
  }

  /**
   * Attend que le DOM soit prêt.
   *
   * @readonly
   * @static
   * @returns {Promise} statut du chargement
   * @memberOf Game
   */
  static get domReady() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }

  /**
   * Initialise le jeu.
   *
   * @returns {undefined}
   * @memberOf Game
   */
  init() {
    console.info('Game:init! 🚀', this);
    global.debug = true;
    document.documentElement.classList.add('ready');
  }
}

new Game(); // eslint-disable-line no-new
