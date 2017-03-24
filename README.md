# Développement web avancé - 3e année

Ce dépôt vous accompagnera tout au long du cours de cette année.

1. [Setup](#pre-requis)
    - [Terminal](#terminal)
    - [Environnement JS](#environnement-js)
    - [Git](#git)
2. [Workflow](#workflow)
    - [Linters](#linters)
    - [Build](#build)
3. [First scene](#first-scene)
4. [First mesh](#first-mesh)

## Pré-requis

Afin de pouvoir faire du "développement web avancé", nous devons commencer par configurer un environnement "kivabien".

En effet, notre workflow "moderne" nous amènera à utiliser la __ligne de commande__, via un __terminal__, dans un __environnement JS__, à l'aide d'une solution de __gestion de versions__.

Nous aurons donc besoin de :

1. Terminal (Terminal, iTerm, …)
2. Environnement JS :
    - `node`
    - `nvm`
    - `npm`
3. Git

### Terminal

Logiciel qui permet d'émuler un ou plusieurs __terminaux informatiques__ sur notre machine.
Grâce à ce terminal, nous pourrons ouvrir un __shell__.
Un shell est une interface permettant de communiquer avec le système d'exploitation via __CLI__ (Interface en ligne de commande).
Les plus connus sont `bash` et `zsh` (ou PowerShell sous Windows).

Dit autrement, c'est ce qui vous permet de rentrer dans la matrice en mode "Mr Robot"…

> Sous Mac OS X, vous pouvez utiliser Terminal ou [iTerm2](https://www.iterm2.com/).
> Sous Windows, vous pouvez utiliser [Babun](https://babun.github.io/).

Parmi les commandes de base on notera :

- `cd [path/to/move/to]` : __change directory__
- `pwd` : __print working directory__ (si vous êtes perdu…)
- `ls` : __list directory__ (`ls -la`, details + hidden)
- `mkdir [foldername]` : __make directory__
- `touch [path/to/filename]` : crée un fichier
- `echo 'foo' > [path/to/filename]` : crée un fichier contenant 'foo'
- `rm [path/to/filename]` / `rm -r [path/to/foldername]` : efface un fichier / dossier
- `which [command]` : affiche (ou pas) l'emplacement d'une commande
- `[command] -h | --help | …` : aide à l'utilisation de la commande
- `clear` : rafraîchit la fenêtre du terminal
- `exit` : 🚪…

#### Note

- `~` (tilde), fait référence à la racine de votre dossier utilisateur
- `/`, fait référence à la racine de votre système
- `.`, fait référence au dossier courant
- `..`, fait référence au dossier parent

> Ressources :
>
> - [Le designer qui chuchotait à l'oreille des chevaux](http://slides.com/thierrymichel/le-designer-qui-chuchotait-l-oreille-des-ordinateurs#/)
> - [Command Line Crash Course](https://learnpythonthehardway.org/book/appendixa.html)

### Environnement JS

#### Node.js

> Ressources : [Node.js](https://nodejs.org/en/)

#### nvm (Node Version Manager)

Permet de gérer plusieurs versions de Node.js sur un même système.
Simplifie également la question des permissions en s'exécutant et en installant les packages globaux dans le dossier utilisateur…

Installation :

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install node
```

> Ressources : [nvm](https://github.com/creationix/nvm)

#### npm

C'est le gestionnaire de "packages" de Node.js, il est installé par défaut avec ce dernier.
Tout (bon) projet souhaitant utiliser `npm` doit être initialisé via `npm init`.

Cette dernière commande crée simplement un fichier `package.json`, sorte de "pedigree/carte d'identité" de votre projet.

Exemple :

```json
{
  "name": "heaj",
  "version": "1.0.0",
  "description": "Développement web avancé - 3e année",
  "main": "README.md",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/thierrymichel/heaj.git"
  },
  "keywords": [
    "heaj",
    "javascript",
    "learning",
    "threejs"
  ],
  "author": "thierrymichel <thmichel@gmail.com> (http://thierrymichel.net)",
  "license": "http://unlicense.org/",
  "bugs": {
    "url": "https://github.com/thierrymichel/heaj/issues"
  },
  "homepage": "https://github.com/thierrymichel/heaj#readme"
}
```

Lorsque vous installez un package, vous pouvez le sauvegarder automatiquement comme dépendance (simple ou de développement).

- Sans sauvegarde : `npm install [package-name]` ou `npm i [package-name]`
- Comme dépendance : `npm i --save [package-name]` ou `npm i -S [package-name]`
- Comme dépendance de dev : `npm i --save-dev [package-name]` ou `npm i -D [package-name]`

De telle sorte que, lorsque vous récupérez un (votre) projet, la commande `npm install` (`npm i`) vous permet d'installer les différents packages nécessaires à ce projet ou/et à son développement !

`npm` vous permet également d'exécuter des scripts "Node.js" via `npm run [script-name]` (voir plus tard).

> Ressources: [npm](https://www.npmjs.com/)

### Git

Ce cours/projet utilise `git`.

`git` vous permet de gérer facilement l'historique et les versions de votre projet.
Lorsque vous apportez des modifications, vous pouvez les associer à un __commit__ lui-même assorti d'un message.
Chaque __commit__, représente un "noeud" de l'arbre historique de votre projet auquel vous pouvez revenir aisément.

Commandes principales :

- `git status`
- `git pull`
- `git add`
- `git commit`
- `git push`

Doit-on tout mettre dans notre dépôt ? Non !
Toutes données à caractère sensible ainsi que, en règle génerale, les fichiers générés automatiquement doivent être exclus.
À cette fin, on utilise un fichier nommé `.gitignore` qui reprend ce qui ne doit pas figurer dans notre "repo".

> Ressources :
>
> - [Petit guide](http://rogerdudler.github.io/git-guide/index.fr.html)
> - [gitignore.io](https://www.gitignore.io/)
> - [Git](https://git-scm.com/)

---

⚠️ Ce projet utilise le système de __tags__ pour identifier ses différentes étapes.

Vous pouvez afficher les tags via `git tag`.
Vous pouvez à tout moment passer à une autre étape grâce à `git checkout [tag-name]`…

---

## Workflow

L'utilisation des dernières fonctionnalités de JS (ES6+…) nécessite certains "traitements" afin de garantir un bon support navigateur.

Pour ce qui concerne __la syntaxe et les fonctionnalités__, le support est [très variable](https://kangax.github.io/compat-table/es6/).
En mode expérimental, vous pouvez opter pour un bon élève (Chrome, par exemple).
Mais pour la production, un "transpileur" (Babel, Traceur, …) s'avèrera nécessaire pour traduire notre JS moderne en JS compatible ES5.
Nous utiliserons `babel`.

Par ailleurs, nous allons nous atteler à écrire du code "propre" et modulaire.

__Le code "propre"__ respectera certains "standards".
La validation se fera via un linter.

Pour __l'aspect modulaire__, celui n'étant pris en charge par aucun navigateur (sauf Edge en mode expérimental), nous aurons besoin d'un "bundler" (webpack, browserify, rollup, …).

### Linters

Permet de "valider" votre code, tant au niveau des _erreurs de syntaxes_, du respect de certaines _bonnes pratiques_ que de la _mise en forme_.
Pour notre JavaScript, nous utiliserons [`eslint`](http://eslint.org/)

```sh
npm i -D eslint # npm install --save-dev eslint
npm i -D babel-eslint # npm install --save-dev babel-eslint
```

Plusieurs usages sont possibles… Nous l'utiliserons via la ligne de commande et les scripts `npm`, avec un fichier de configuration `.eslintrc.json` ([voir repo](./.eslintrc.json)).
On installe également le plugin pour `babel`…

> Vous pouvez "linter" directement dans votre éditeur préféré et pas que votre JS ! (Sass, php, markdown, …)
> Vous devriez également utiliser [EditorConfig](http://editorconfig.org/)
>
> Ressources : [ESLint](http://eslint.org/)

### Build

Afin de garder un code souple et maintenable pour le développement et un projet performant en production, nous allons devoir "construire" nos fichiers de production.

La structure de notre projet sera la suivante :

- `index.html`
- `src/main.js` (fichier principal de "dev")
- `src/components/[modules].js` (nos différents modules)
- `dist/main.bundle.js` (un seul fichier "compilé", pour la production)

Et les outils utilisés seront :

__Webpack__, qui va nous permettre d'écrire du code modulaire compatible avec le navigateur.

```sh
npm i -D webpack
npm i -D webpack-dev-server
npm i -D webpack-merge
```

- `webpack` est le noyau du bundler [🔗](https://webpack.js.org/)
- `webpack-dev-server` va nous permettre de rafraîchir automatiquement le navigateur à chaque changement de code
- `webpack-merge` va nous aider à maintenir 2 configurations : 1 de développement et 1 de production. Cela nous permettra de concilier facilement confort et productivité côté "dev" et performance côté "prod"

__Babel__, qui vient en complément de `webpack` et permet de "transpiler" du JavaScript ES2015+ en mode ES5 compliant.

```sh
npm i -D babel-core
npm i -D babel-loader
npm i -D babel-preset-env
```

- `babel-core` est le noyau du transpileur [🔗](http://babeljs.io/)
- `babel-loader` permet d'indiquer à `webpack` d'utiliser Babel
- `babel-preset-env` va nous permettre de définir le niveau de support des fonctionnalités [🔗](https://github.com/babel/babel-preset-env)

Nous avons ensuite besoin d'une "petite" configuration… 👻
Les fichiers utilisés sont les suivants :

- pour `webpack` :
    - `webpack.config.js`
    - `config/base.js`
    - `config/dev.js`
    - `config/prod.js`
- pour `babel` :
    - `.babelrc`

À ce stade, les outils sont en place…

Et ne nous reste plus qu'à ajouter quelques scripts pour pouvoir utiliser tout ça (`package.json`) :

```json
"scripts": {
    "clean": "rm -rf dist/*",
    "dev": "npm run lint && npm run clean && webpack-dev-server --env=dev",
    "build": "npm run lint && npm run clean && webpack --env=prod --progress --profile --colors",
},
```

Pour utiliser un de ces scripts, lancez `npm run [script-name]` dans le terminal.

> Ressources : [Webpack](https://webpack.js.org/), [Babel](http://babeljs.io/)

## First scene

1. main.js
    - fichier "pilote" principal. S'occupe de l'import des modules/classes et des initialisations/instanciations
2. App.js
    - classe principale de notre "application". Va s'occuper de tout ce qui touche à la "scène"
    - ES6 import/export
3. ES6 class
    - constructor
    - methods
    - `this`
    - JSDoc comments

    ```js
    /**
    * Scene manager
    *
    * @class App
    */
    class App {
      /**
      * Creates an instance of App.
      *
      * @memberOf App
      */
      constructor() {
        this.createScene()
      }

      /**
      * Scene init
      *
      * @returns {undefined}
      *
      * @memberOf App
      */
      createScene() {
        console.info('App:createScene')
      }
    }
    export defaut App
    ```

    ```js
    /**
     * Main JS entry file
     */

    // Components
    import App from 'App'

    console.info('Ready! 🚀')
    const app = new App()
    ```

    > Rappel : `./components/App.js` -> `App` -> voir `config/base.js`

4. Scene THREE.js
    - Librairie JS pour faire de la 3D dans le navigateur ([wikipedia](https://fr.wikipedia.org/wiki/Three.js))
    - Utilise WebGL -> GPU (vs CPU) ([wikipedia](https://fr.wikipedia.org/wiki/WebGL))
    - Ingrédients de base : scène, caméra, renderer
    - importer THREE
        - NB : possible aussi via CDN et `<script>`
    - Nomenclature propriétés (`_`)

    ```sh
    npm i -S three
    ```

    ```js
    import * as THREE from 'three'

    createScene() {
      // Scene
      this._scene = new THREE.Scene()
      // Camera
      this.initCamera()
      // Renderer
      this.initRenderer()

      this.render()
    }

    /**
     * Camera init
     *
     * @returns {undefined}
     *
     * @memberOf App
     */
    initCamera() {
    }

    /**
     * Renderer init
     *
     * @returns {undefined}
     *
     * @memberOf App
     */
    initRenderer() {
    }

    /**
     * Render the scene
     *
     * @returns {undefined}
     *
     * @memberOf App
     */
    render() {
    }
    ```

5. Camera
    - Options -> RTFM 📖 ([documentation](https://threejs.org/docs/?q=camera#Reference/Cameras/OrthographicCamera))
    - ES6: `const` vs `let` (CodeRunner snippet)

    ```js
    initCamera() {
      const fieldOfView = 60
      const aspectRatio = window.width / window.height
      const nearPlane = 1
      const farPlane = 2000

      this._camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      )
      this._camera.position.x = 200
      this._camera.position.y = 300
      this._camera.position.z = 1000
      this._camera.lookAt(new THREE.Vector3(0, 0, 0))
    }
    ```

6. Renderer
    - Utilise : scene + camera
    - Utilise aussi un DOM element
    - "Déplacer" w/h de `window` à `this`

    ```js
    initRenderer() {
      this._renderer = new THREE.WebGLRenderer()
      this._renderer.setSize(this._width, this._height)

      document.body.appendChild(this.renderer.domElement)
    }
    ```

7. Render
    - Doit être appelé après chaque modifications de la scène (au minimum, à la fin du setup)
    - Permet de rendre une scène via une caméra

    ```js
    render() {
      // Scene rendering
      this._renderer.render(this.scene, this._camera)
    }
    ```

## First mesh

1. Ajouter un cube
    - Nous utiliserons de composants autonomes. Sous forme de classes ou de modules
    - Notre objet (Cube) devra posséder un __mesh__ ([wikipedia](https://en.wikipedia.org/wiki/Polygon_mesh), [doc](https://threejs.org/docs/?q=mesh#Reference/Objects/Mesh))
        - Un __mesh__ est composé de 2 choses : une __geometry__ et un __material__
    - Notre objet (Cube) devra pouvoir retourner son mesh
        - ES6 getters and setters
    - Notre `App` devra pouvoir ajouter le mesh d'un objet à sa scène

    ```js
    import * as THREE from 'three'

    /**
     * Cube object
     *
     * @class Cube
     */
    class Cube {
      /**
       * Creates an instance of Cube.
       * @param {object} size cube dimensions
       * @param {number} size.width width
       * @param {number} size.height height
       * @param {number} size.depth depth
       *
       * @memberOf Cube
       */
      constructor(size) {
        const geometry = new THREE.BoxGeometry(
          size.width,
          size.height,
          size.depth
        )
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
        })

        this._mesh = new THREE.Mesh(geometry, material)
      }

      /**
       * Get mesh
       *
       * @readonly
       *
       * @memberOf Cube
       */
      get mesh() {
        return this._mesh
      }
    }

    export default Cube
    ```

    ```js
    constructor() {
      this._objects = []
      …
    }
    /**
     * Add an object to the scene and store it into an array
     *
     * @param {object} obj Object with a mesh
     *
     * @returns {undefined}
     *
     * @memberOf App
     */
    add(obj) {
      this._objects.push(obj)
      this._scene.add(obj.mesh)
    }
    ```

    ```js
    import Cube from 'Cube'

    app.add(new Cube({
      width: 50,
      height: 50,
      depth: 50,
    }))
    ```

    > `Array.push()`

2. Mon cube ne s'affiche pas ?
    - La scène n'a pas été "re-rendue"
    - Solutions :
        1. appeler `app.render()`
        2. utiliser `requestAnimationFrame()`

    ```js
    render() {
      requestAnimationFrame(() => {
        this.render()
      });
    …
    }
    ```

3. Exercice
    - Créer une classe __Cube__ avec un constructeur et une méthode init (qui affiche un truc dans la console)
    - Créer une instance de Cube dans `main.js`

4. Ajouter de la lumière (et des ombres…)

    ```js
    initLights() {
      const light = new THREE.DirectionalLight(0xeee56e, 1)

      light.position.set(300, 300, 300)
      this._lights.push(light)
      this._scene.add(light)
    }
    ```

    ```js
    constructor(size) {
      …
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
        shading: THREE.FlatShading,
      })

      this._mesh.castShadow = true
      this._mesh.receiveShadow = true
    }
    ```
