'use strict';

define("pilasbloques/tests/acceptance/acercade-test", ["qunit", "ember-qunit", "ember-cli-page-object"], function (_qunit, _emberQunit, _emberCliPageObject) {
  "use strict";

  const page = (0, _emberCliPageObject.create)({
    visit: (0, _emberCliPageObject.visitable)('/acercade'),
    scope: '.contenido-principal',
    titulo: (0, _emberCliPageObject.text)("h1"),
    cantidadDeBotones: (0, _emberCliPageObject.count)('button')
  });
  (0, _qunit.module)('Acceptance | acercade', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _qunit.test)('visiting /acercade', async function (assert) {
      await page.visit();
      assert.ok(page.titulo, "Tiene título");
      assert.equal(page.titulo, "Acerca de Pilas Bloques", "Aparece el título de la aplicación.");
      assert.equal(page.cantidadDeBotones, 1, "Existe un solo botón");
    });
  });
});
define("pilasbloques/tests/acceptance/desafios-test", ["qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage", "ember-cli-page-object"], function (_qunit, _emberQunit, _setupMirage, _emberCliPageObject) {
  "use strict";

  const page = (0, _emberCliPageObject.create)({
    cantidadDeDesafiosDisponibles: (0, _emberCliPageObject.count)('.ember-view .desafio .desafio-img')
  });
  const page1 = (0, _emberCliPageObject.create)({
    visit: (0, _emberCliPageObject.visitable)('/libros/1')
  });
  const page2 = (0, _emberCliPageObject.create)({
    visit: (0, _emberCliPageObject.visitable)('/libros/2')
  });
  (0, _qunit.module)('Acceptance | desafios', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('La cantidad de desafíos que se muestra en la pagina 1 es correcta', async function (assert) {
      let cantidadDesafiosEsperada = 55;
      await page1.visit();
      assert.equal(page.cantidadDeDesafiosDisponibles, cantidadDesafiosEsperada, "Hay exactamente ".concat(cantidadDesafiosEsperada, " desafios habilitados para utilizar."));
    });
    (0, _qunit.test)('La cantidad de desafíos que se muestra en la pagina 2 es correcta', async function (assert) {
      let cantidadDesafiosEsperada = 44;
      await page2.visit();
      assert.equal(page.cantidadDeDesafiosDisponibles, cantidadDesafiosEsperada, "Hay exactamente ".concat(cantidadDesafiosEsperada, " desafios habilitados para utilizar."));
    });
  });
});
define("pilasbloques/tests/acceptance/principal-test", ["qunit", "ember-qunit", "ember-cli-page-object", "ember-cli-mirage/test-support/setup-mirage"], function (_qunit, _emberQunit, _emberCliPageObject, _setupMirage) {
  "use strict";

  const page = (0, _emberCliPageObject.create)({
    scope: '.contenido-principal',
    visit: (0, _emberCliPageObject.visitable)('/'),
    tituloModal: (0, _emberCliPageObject.text)('h4', {
      scope: '.ember-modal-dialog',
      resetScope: true
    }),
    cantidadDeImagenes: (0, _emberCliPageObject.count)('img'),
    cantidadDeLinks: (0, _emberCliPageObject.count)('a')
  });
  (0, _qunit.module)('Acceptance | principal', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    (0, _qunit.test)('visiting /', async function (assert) {
      await page.visit();
      assert.equal(page.cantidadDeLinks, 3, "Hay tres links en pantalla.");
    });
  });
});
define("pilasbloques/tests/acceptance/puede-ingresar-en-actividades-test", ["@ember/test-helpers", "qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_testHelpers, _qunit, _emberQunit, _setupMirage) {
  "use strict";

  (0, _qunit.module)('Acceptance | puede ingresar en actividades', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _setupMirage.default)(hooks);
    /*
     * Realiza una validación luego de que se detengan todas las promesas pendientes.
     *
     * La validación consiste en asegurarse de que el título que se muestra en el
     * panel de consigna sea exacamente el título el esperado.
     */

    function testSePuedeVisitar(nombreDesafio, tituloEsperado) {
      (0, _qunit.test)("Se puede visitar ".concat(nombreDesafio), async function (assert) {
        // La razón por la que levantamos este try catch es porque el helper visit tiene un bug
        // descrito acá: https://github.com/emberjs/ember-test-helpers/issues/332 (todavía abierto)        
        try {
          await (0, _testHelpers.visit)("/desafios/".concat(nombreDesafio));
        } catch (e) {
          if (e.message !== 'TransitionAborted') {
            throw e;
          }
        }

        let tituloVisibleEnPantalla = $(".contenedor-panel-ayuda h4").text();
        assert.equal(tituloVisibleEnPantalla, tituloEsperado, "La actividad se llama efectivamente " + tituloEsperado);
      });
    }

    testSePuedeVisitar("DibujandoAlCuadrado", "Dibujando: Al cuadrado");
    testSePuedeVisitar("DibujandoRayuelaRobotica", "Dibujando: Rayuela robótica");
    testSePuedeVisitar("DibujandoCortoPorLaDiagonal", "Dibujando: Corto por la diagonal");
    testSePuedeVisitar("DibujandoMamushkaCuadrada", "Dibujando: Mamushka cuadrada");
    testSePuedeVisitar("DibujandoEscaleraCuadrada", "Dibujando: Escalera cuadrada");
    testSePuedeVisitar("DibujandoHexagono", "Dibujando: Hexágono");
    testSePuedeVisitar("DibujandoPiramideInvertida", "Dibujando: Pirámide invertida");
    testSePuedeVisitar("DibujandoFigurasDentroDeFiguras", "Dibujando: Figuras dentro de figuras");
    testSePuedeVisitar("DibujandoLaCuevaDeEstalagtitas", "Dibujando: La cueva de estalagtitas");
  });
});
define("pilasbloques/tests/helpers/actividadTest", ["exports", "qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage", "jquery"], function (_exports, _qunit, _emberQunit, _setupMirage, _jquery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.moduloActividad = moduloActividad;
  _exports.actividadTest = actividadTest;

  /**
   * Inicia los tests de la actividad definiendo un grupo para qunit.
   */
  function moduloActividad(nombre, runActivityTests) {
    (0, _qunit.module)("Integration | Actividad | ".concat(nombre), hooks => {
      (0, _emberQunit.setupRenderingTest)(hooks);
      (0, _setupMirage.default)(hooks);
      runActivityTests();
    });
  }
  /**
   * Realiza una validación en la cantidad de actores, este función se utiliza
   * como helper para aquellos tests que intentan contar actores antes y
   * después de realizar una actividad.
   */


  function validarCantidadDeActores(actoresEsperadosPorEtiqueta, assert, pilas) {
    $.each(actoresEsperadosPorEtiqueta, (etiqueta, cantidadEsperada) => {
      let mensaje = "Hay ".concat(cantidadEsperada, " actores con la etiqueta ").concat(etiqueta, ".");
      assert.equal(pilas.contarActoresConEtiqueta(etiqueta), cantidadEsperada, mensaje);
    });
  }
  /**
   * Valida las opciones enviadas al test de la actividad para detectar
   * errores o inconsistencias en las opciones antes de iniciar cualquier
   * test.
   *
   * Retorna True si alguna de las opciones enviadas es incorrecta.
   */


  function validarOpciones(opciones) {
    let listaDeOpciones = Object.keys(opciones);
    let opcionesValidas = ['solucion', 'descripcionAdicional', 'errorEsperado', 'resuelveDesafio', 'cantidadDeActoresAlComenzar', 'cantidadDeActoresAlTerminar', 'fps', 'skip'];

    function esOpcionInvalida(opcion) {
      return opcionesValidas.indexOf(opcion) === -1;
    }

    let opcionesInvalidas = $.grep(listaDeOpciones, esOpcionInvalida);
    $.map(opcionesInvalidas, opcionInvalida => {
      let error = "La opcion enviada al test (".concat(opcionInvalida, ") es inv\xE1lida.");
      throw new Error(error);
    });

    if (opciones.errorEsperado && opciones.cantidadDeActoresAlTerminar) {
      let error = "Es inv\xE1lido escribir un test que incluya un errorEsperado y conteo de actores al terminar.";
      throw new Error(error);
    }

    return opcionesInvalidas.length > 0;
  }
  /**
   * Permite realizar una prueba sobre una actividad y su comportamiento.
   *
   * Argumentos:
   *
   *  - nombre: El identificador de la actividad, por ejemplo "AlienTocaBoton".
   *  - opciones: Un diccionario de opciones, con las siguientes claves:
   *
   *        - solucion (obligatorio): El código xml de la solución en base64.
   *        - descripcionAdicional: Un string con un detalle del objetivo del test.
   *        - errorEsperado: El string que debería llevar una excepción esperada.
   *        - cantidadDeActoresAlComenzar: Un diccionario para validar la cantidad de actores en la escena.
   *        - cantidadDeActoresAlTerminar: Un diccionario para validar la cantidad de actores en la escena.
   *        - fps: Los cuadros por segundo esperados (por omisión 200 en los test y 60 normalmente).
   *        - resuelveDesafio: Si es false, verifica que la solución NO resuelva el problema.
   *        - skip: Si es true, se salteara este test.
   * 
   * Para ejemplos de invocación podés ver: actividadElAlienYLasTuercas-test.js
   */


  function actividadTest(nombre, opciones) {
    if (validarOpciones(opciones)) {
      throw new Error("Se ha iniciado el tests ".concat(nombre, " con opciones inv\xE1lidas."));
    }

    let descripcion = opciones.descripcionAdicional || 'Se puede resolver';
    (opciones.skip ? _qunit.skip : _qunit.test)(descripcion, function (assert) {
      let store = this.owner.lookup('service:store');
      let pilas = this.owner.lookup('service:pilas'); //let actividades = this.owner.lookup('service:actividades');

      return new Promise(success => {
        Ember.run(() => {
          // Simula el model hook del router desafío.
          store.findAll("desafio").then(data => {
            // TODO: reemplazar la linea anterior (findAll) y la siguiente
            //       por una consulta a ember-data más específica, como la que
            //       realiza findRecord, que solo debería traer un solo registro.
            //
            //       (esto está así ahora porque se debe corregir mirage antes).
            let model = data.findBy('nombre', nombre);

            if (!model) {
              throw new Error("No existe una actividad con el nombre ".concat(nombre));
            }

            this.set('model', model);
            this.set('pilas', pilas); // Carga la solución en base64, el formato que espera el componente.

            this.set('solucion', window.btoa(opciones.solucion)); // Captura el evento de inicialización de pilas:

            this.set('onReady', () => {
              if (opciones.cantidadDeActoresAlComenzar) {
                validarCantidadDeActores(opciones.cantidadDeActoresAlComenzar, assert, pilas);
              }

              setTimeout(() => {
                (0, _jquery.default)('#modo-turbo').click();
                (0, _jquery.default)('.btn-ejecutar').click();
              }, 1000);
            });
            /**
             * Si hay un error en la actividad intenta determinar
             * si es un error esperado o no. Y en cualquiera de los
             * dos casos finaliza el test.
             */

            pilas.on("errorDeActividad", function (motivoDelError) {
              let errorEsperado = opciones.errorEsperado;

              if (errorEsperado) {
                assert.equal(motivoDelError, errorEsperado, "Ocurri\xF3 el error esperado: '".concat(errorEsperado, "'. Bien!"));
              } else {
                assert.notOk("Ocurri\xF3 un error inesperado: '".concat(motivoDelError, "'"));
              }

              success();
            });
            this.set('onTerminoEjecucion', () => {
              if (opciones.cantidadDeActoresAlTerminar) {
                validarCantidadDeActores(opciones.cantidadDeActoresAlTerminar, assert, pilas);
              } // Los errores esperados no deberían llegar a este punto, así
              // que se emite un error.


              let errorEsperado = opciones.errorEsperado;

              if (errorEsperado) {
                assert.notOk("No ocurri\xF3 el error esperado: '".concat(errorEsperado, "'"));
              } else if (opciones.resuelveDesafio === false) {
                assert.ok(!pilas.estaResueltoElProblema(), "Se esperaba que la solución no resuelva el problema");
              } else {
                assert.ok(pilas.estaResueltoElProblema(), "Se puede resolver el problema");
              }

              success();
            });
            /**
             * Se instancia el componente pilas-editor con los paneles que
             * observará el usuario y una solución pre-cargada, tal y como se
             * hace dentro de la aplicación.
             */

            this.render(Ember.HTMLBars.template({
              "id": "q56eZ2YM",
              "block": "{\"symbols\":[],\"statements\":[[0,\"\\n              \"],[1,[28,\"pilas-editor\",null,[[\"debug\",\"pilas\",\"model\",\"showCode\",\"onReady\",\"codigo\",\"codigoJavascript\",\"persistirSolucionEnURL\",\"onTerminoEjecucion\",\"debeMostrarFinDeDesafio\"],[false,[24,[\"pilas\"]],[24,[\"model\"]],true,[24,[\"onReady\"]],[24,[\"solucion\"]],\"\",false,[24,[\"onTerminoEjecucion\"]],false]]],false],[0,\"\\n            \"]],\"hasEval\":false}",
              "meta": {}
            }));
          });
        });
      });
    });
  }
});
define("pilasbloques/tests/helpers/createPilasTest", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = createPilasTest;

  function createPilasTest(context, escena, callback) {
    // context en este caso es el test en si mismo (this).
    return new Promise(resolve => {
      let pilasService = context.owner.lookup('service:pilas');
      context.set('pilas', pilasService);
      context.set("escena", escena);
      context.set('onReady', function (pilas) {
        callback(pilas, resolve, pilasService);
      });
      context.render(Ember.HTMLBars.template({
        "id": "MD1wkqsn",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-canvas\",null,[[\"pilas\",\"onReady\",\"escena\"],[[24,[\"pilas\"]],[24,[\"onReady\"]],[24,[\"escena\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
    });
  }
});
define("pilasbloques/tests/helpers/destroy-app", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;

  function destroyApp(application) {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});
define("pilasbloques/tests/helpers/ejerciciosPilasTest", ["exports", "qunit", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_exports, _qunit, _emberQunit, _setupMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.moduloEjerciciosPilas = moduloEjerciciosPilas;
  _exports.hacerLuegoConCallback = hacerLuegoConCallback;

  function moduloEjerciciosPilas(nombre, runExerciseTests) {
    (0, _qunit.module)("Integration | EjerciciosPilas | ".concat(nombre), hooks => {
      (0, _emberQunit.setupRenderingTest)(hooks);
      (0, _setupMirage.default)(hooks);
      runExerciseTests();
    });
  }
  /**
   * Decora un comportamiento, permitiendo llamar un callback cuando finaliza.
   */


  function ComportamientoDecorator(argumentos) {
    this.argumentos = argumentos;
  }

  ComportamientoDecorator.prototype = {
    iniciar: function (receptor) {
      this.comportamiento = new this.argumentos.comportamiento(this.argumentos.argumentos);
      this.comportamiento.iniciar(receptor);
    },
    actualizar: function () {
      var termino = this.comportamiento.actualizar();

      if (termino) {
        this.argumentos.callback();
      }

      return termino;
    }
  };
  /**
   * Llama un callback luego que el actor finaliza un comportamiento.
   */

  function hacerLuegoConCallback(actor, ComportamientoClass, argumentos, callback) {
    actor.hacer_luego(ComportamientoDecorator, {
      comportamiento: ComportamientoClass,
      callback: callback,
      argumentos: argumentos
    });
  }
});
define("pilasbloques/tests/helpers/mocks", ["exports", "sinon"], function (_exports, _sinon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.blocklyWorkspaceMock = _exports.actividadMock = _exports.interpreterFactoryMock = _exports.interpreteMock = _exports.pilasMock = void 0;
  const pilasMock = {
    on() {},

    liberarRecursos() {},

    estaResueltoElProblema() {
      return true;
    },

    reiniciarEscenaCompleta: _sinon.default.stub(),
    cambiarAModoDeLecturaSimple: _sinon.default.stub(),
    habilitarModoTurbo: _sinon.default.stub(),
    deshabilitarModoTurbo: _sinon.default.stub()
  };
  _exports.pilasMock = pilasMock;
  const interpreteMock = {
    paused_: false,
    run: _sinon.default.stub().returns(false)
  };
  _exports.interpreteMock = interpreteMock;
  const interpreterFactoryMock = Ember.Service.extend({
    crearInterprete() {
      return interpreteMock;
    }

  });
  _exports.interpreterFactoryMock = interpreterFactoryMock;
  const actividadMock = {
    get(key) {
      return this[key];
    },

    //TODO: Sacar esta definición y usar Ember.Component.extend
    nombre: "Actividad_Mock",
    debeFelicitarse: true,
    grupo: {
      libro: {
        modoLecturaSimple: true
      }
    }
  };
  _exports.actividadMock = actividadMock;

  const blocklyWorkspaceMock = function () {
    let workspace = new Blockly.WorkspaceSvg({});
    workspace.createDom();
    workspace.cachedParentSvg_ = {
      getScreenCTM: _sinon.default.stub()
    };
    Blockly.mainWorkspace = workspace;
    workspace.highlightBlock = _sinon.default.stub();
    return workspace;
  };

  _exports.blocklyWorkspaceMock = blocklyWorkspaceMock;
});
define("pilasbloques/tests/helpers/module-for-acceptance", ["exports", "qunit", "pilasbloques/tests/helpers/start-app", "pilasbloques/tests/helpers/destroy-app", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage"], function (_exports, _qunit, _startApp, _destroyApp, _emberQunit, _setupMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default(name, options = {}) {
    (0, _qunit.module)(name, hooks => {
      (0, _emberQunit.setupRenderingTest)(hooks);
      (0, _setupMirage.default)(hooks);
      hooks.beforeEach(function () {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      });
      hooks.afterEach(function () {
        let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(() => (0, _destroyApp.default)(this.application));
      });
    });
  }
});
define("pilasbloques/tests/helpers/resolver", ["exports", "pilasbloques/resolver", "pilasbloques/config/environment"], function (_exports, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };
  var _default = resolver;
  _exports.default = _default;
});
define("pilasbloques/tests/helpers/start-app", ["exports", "pilasbloques/app", "pilasbloques/config/environment"], function (_exports, _app, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;

  function startApp(attrs) {
    let application;
    let attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    Ember.run(() => {
      application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });
    return application;
  }
});
define("pilasbloques/tests/helpers/utils", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createBlock = createBlock;
  _exports.findBlockByTypeIn = findBlockByTypeIn;
  _exports.assertAsync = assertAsync;
  _exports.assertDisabled = assertDisabled;
  _exports.assertNotDisabled = assertNotDisabled;
  _exports.assertWarning = assertWarning;
  _exports.assertNotWarning = assertNotWarning;

  function createBlock(type) {
    return Blockly.mainWorkspace.newBlock(type);
  }

  function findBlockByTypeIn(rootBlock, type) {
    if (!rootBlock) return null;
    if (rootBlock.type == type) return rootBlock;
    return rootBlock.getChildren().map(b => findBlockByTypeIn(b, type)).find(b => b != null);
  } ////// ASSERT //////


  function assertAsync(assert, fn) {
    let done = assert.async(1);
    setTimeout(function () {
      fn();
      done();
    });
  }

  function assertDisabled(assert, block) {
    assert.ok(block.disabled);
  }

  function assertNotDisabled(assert, block) {
    assert.notOk(block.disabled);
  }

  function assertWarning(assert, block, warning) {
    assert.equal(block.warning.getText(), warning);
  }

  function assertNotWarning(assert, block) {
    assert.notOk(block.warning);
  }
});
define("pilasbloques/tests/integration/components/modal-ayuda-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | modal ayuda', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "93N79IP/",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"modal-ayuda\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('', "No imprime texto si está oculto.");
    });
  });
});
define("pilasbloques/tests/integration/components/modal-title-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | modal title', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Ow0s+FsN",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"modal-title\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "DuuhHezj",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"modal-title\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-acerca-de-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas acerca de', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "T2M2b+wo",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-acerca-de\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasAnyText();
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-blockly-test", ["qunit", "ember-qunit", "@ember/test-helpers", "pilasbloques/tests/helpers/mocks"], function (_qunit, _emberQunit, _testHelpers, _mocks) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas blockly', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.set('bloques', ['Repetir']);
      this.set('pilas', _mocks.pilasMock);
      let modelMock = {
        get(attr) {
          return this[attr];
        },

        estiloToolbox: 'aplanado'
      };
      this.set('model', modelMock);
      this.owner.register('service:interpreterFactory', _mocks.interpreterFactoryMock);
      let environmentMock = Ember.Service.extend({});
      this.owner.register('service:environment', environmentMock);
      this.owner.lookup('service:blocksGallery').start();
    });
    (0, _qunit.test)('Cuando el componente está cargando', async function (assert) {
      this.set('cargando', true);
      await (0, _testHelpers.render)(pilasBlockly());
      assert.dom("button").doesNotExist('No muestra ningún botón');
      assert.ok(existeTexto(this, "cargando"), "Solo muestra el texto 'cargando'");
    });
    (0, _qunit.test)('Cuando el componente está listo para ser usado', async function (assert) {
      await (0, _testHelpers.render)(pilasBlockly());
      assert.ok(existeBoton(this, "Ejecutar"), "Tiene el botón ejecutar visible");
      assert.notOk(existeBoton(this, "Compartir"), 'Ya no existe un botón para compartir por twitter por omisión');
      assert.ok(existeBoton(this, "Abrir"), 'Existe un botón para cargar una solución');
      assert.ok(existeBoton(this, "Guardar"), 'Existe un botón para guardar una solución');
    });
    (0, _qunit.test)('Mientras se ejecuta un ejercicio', async function (assert) {
      this.set("ejecutando", true);
      await (0, _testHelpers.render)(pilasBlockly());
      assert.ok(existeBoton(this, "Reiniciar"), "Tiene el botón reiniciar visible");
    });
    (0, _qunit.test)('Cuando se termina de ejecutar un ejercicio', async function (assert) {
      this.set("terminoDeEjecutar", true);
      await (0, _testHelpers.render)(pilasBlockly());
      assert.ok(existeBoton(this, "Reiniciar"), "Tiene el botón reiniciar visible");
    });
    (0, _qunit.test)('Al reiniciar desaparece reiniciar y aparece ejecutar', async function (assert) {
      this.set("terminoDeEjecutar", true);
      await (0, _testHelpers.render)(pilasBlockly());
      await findElementWithText(this, "button", "Reiniciar").click();
      assert.ok(existeBoton(this, "Ejecutar"), "Tiene el botón ejecutar visible");
      assert.notOk(existeBoton(this, "Reiniciar"), "Desaparece el botón reiniciar");
    });

    function pilasBlockly() {
      return Ember.HTMLBars.template({
        "id": "dWH+YNnz",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-blockly\",null,[[\"cargando\",\"ejecutando\",\"terminoDeEjecutar\",\"pilas\",\"bloques\",\"model\",\"modelActividad\"],[[24,[\"cargando\"]],[24,[\"ejecutando\"]],[24,[\"terminoDeEjecutar\"]],[24,[\"pilas\"]],[24,[\"bloques\"]],[24,[\"model\"]],[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      });
    }

    function findElementWithText(context, elemento, texto) {
      return Array.from(context.element.querySelectorAll(elemento)).find(domElement => domElement.innerText.includes(texto));
    }

    function existeBoton(context, texto) {
      return findElementWithText(context, "button", texto) !== undefined;
    }

    function existeTexto(context, texto) {
      return findElementWithText(context, "p", texto) !== undefined;
    }
  });
});
define("pilasbloques/tests/integration/components/pilas-botones-zoom-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas botones zoom', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "aJGp9aeP",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-botones-zoom\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('100%');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-canvas-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas canvas', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      this.pilas = this.owner.lookup('service:pilas');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "J8VQ5OWQ",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-canvas\",null,[[\"pilas\"],[[24,[\"pilas\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "vm/lZMpu",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-canvas\",null,[[\"pilas\"],[[24,[\"pilas\"]]]],{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-cargando-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas cargando', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "9B+xan0i",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-cargando\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('', "No debe tener texto alguno.");
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-desafio-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas desafio', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set("model", {
        id: 1,
        titulo: 'demo',
        nombre: "AlienTocaBoton",
        escena: "AlienTocaBoton"
      });
      this.set("modelDeshabilitado", {
        id: 1,
        titulo: 'demo',
        nombre: "AlienTocaBoton",
        escena: "AlienTocaBoton",
        deshabilitado: true
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "QItrVAc7",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-desafio\",null,[[\"model\"],[[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('demo', "Muestra el Título del desafio.");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "oOY5EybD",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-desafio\",null,[[\"model\"],[[24,[\"modelDeshabilitado\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom('div.ribbon').hasText("Muy pronto", "Tiene el texto Muy pronto");
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-editor-test", ["qunit", "ember-qunit", "@ember/test-helpers", "pilasbloques/tests/helpers/mocks"], function (_qunit, _emberQunit, _testHelpers, _mocks) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas editor', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('pilas', _mocks.pilasMock);
      this.set('model', Ember.Object.extend({
        bloques: ['controls_if']
      }).create());
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "hn/kVqNI",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-editor\",null,[[\"pilas\",\"model\"],[[24,[\"pilas\"]],[24,[\"model\"]]]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasAnyText('Hay algo de texto');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-header-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas header', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OBs1qOrI",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-header\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasAnyText();
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-libro-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas libro', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "TKu/nk0i",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-libro\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText(''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/HcWXIIP",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"pilas-libro\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasText('template block text');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-notificador-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas notificador', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "SwK06owU",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-notificador\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.dom().hasAnyText('Hay algo de texto');
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-spinner-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas spinner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "Fr7GMXhN",
        "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-spinner\"],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.querySelector(".spinner").className, 'spinner ', "Debe tener las clases normales del spinner");
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lx+cv9K6",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-spinner\",null,[[\"centered\"],[true]]],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.querySelector(".spinner").className, 'spinner spinner-centered', "Deaabe tener las clases normales del spinner");
    });
  });
});
define("pilasbloques/tests/integration/components/pilas-toggle-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilas toggle', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)(toggle);
      assert.ok(this.element.querySelector("input"));
    });
    (0, _qunit.test)('it can be disabled', async function (assert) {
      this.set("disabled", true);
      await (0, _testHelpers.render)(toggle);
      assert.ok(this.element.querySelector("input").disabled);
    });
    (0, _qunit.test)('it can be checked', async function (assert) {
      this.set("checked", true);
      await (0, _testHelpers.render)(toggle);
      assert.ok(this.element.querySelector("input").checked);
    });
    let toggle = Ember.HTMLBars.template({
      "id": "gO9TBd3N",
      "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-toggle\",null,[[\"isDisabled\",\"isChecked\"],[[24,[\"disabled\"]],[24,[\"checked\"]]]]],false]],\"hasEval\":false}",
      "meta": {}
    });
  });
});
define("pilasbloques/tests/integration/components/pilasweb-actores-test", ["qunit", "ember-qunit", "@ember/test-helpers", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _emberQunit, _testHelpers, _createPilasTest) {
  "use strict";

  (0, _qunit.module)('Integration | Component | pilasweb actores', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('Puede crear un actor y actualizar algunos atributos', function (assert) {
      return (0, _createPilasTest.default)(this, 'AlienInicial', (pilas, resolve) => {
        /* CREACION DE ACTORES */
        let actor = new pilas.actores.Mono();
        assert.equal(actor.x, 0, "El actor está en la posición inicial X=0.");
        assert.equal(actor.y, 0, "El actor está en la posición inicial Y=0.");
        /* POSICIONES */

        actor.x = 100;
        assert.equal(actor.x, 100, "El actor puede cambiar de posición.");
        /* ESCALA */

        actor.escala_x = 2;
        actor.escala_y = 3;
        assert.equal(actor.escala_x, 2, "El actor puede cambiar de escala x.");
        assert.equal(actor.escala_y, 3, "El actor puede cambiar de escala y.");
        actor.escala = 1;
        assert.equal(actor.escala, 1, "La escala se guarda correctamente.");
        assert.equal(actor.escala_x, 1, "El atributo escala impacta en la escala_x.");
        assert.equal(actor.escala_y, 1, "El atributo escala impacta en la escala_y.");
        /* ROTACION */

        actor.rotacion = 180;
        assert.equal(actor.rotacion, 180, "El actor puede cambiar de posición.");
        actor.rotacion = 180 + 181; // 361 grados son equivalentes a 1 grado

        assert.equal(actor.rotacion, 1, "Los angulos se simplifican.");
        actor.decir("chau!");
        resolve();
      });
    });
  });
});
define("pilasbloques/tests/integration/desafios/AlienTocaBoton-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'AlienTocaBoton';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t    <statement name=\"program\">\n\t      <block type=\"MoverACasillaDerecha\" id=\"4\">\n\t        <next>\n\t          <block type=\"MoverACasillaDerecha\" id=\"7\">\n\t            <next>\n\t              <block type=\"MoverACasillaDerecha\" id=\"10\">\n\t                <next>\n\t                  <block type=\"ApretarBoton\" id=\"13\"></block>\n\t                </next>\n\t              </block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t</xml>\n\t"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer apretar botón cuando no hay',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t  <block type=\"al_empezar_a_ejecutar\" id=\"21\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t    <statement name=\"program\">\n\t      <block type=\"ApretarBoton\" id=\"24\"></block>\n\t    </statement>\n\t  </block>\n\t</xml>",
      errorEsperado: 'No hay un botón aquí'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer avanzar hacia la derecha cuando ya no hay camino',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t  <block type=\"al_empezar_a_ejecutar\" id=\"21\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t    <statement name=\"program\">\n\t      <block type=\"MoverACasillaDerecha\" id=\"39\">\n\t        <next>\n\t          <block type=\"MoverACasillaDerecha\" id=\"36\">\n\t            <next>\n\t              <block type=\"MoverACasillaDerecha\" id=\"27\">\n\t                <next>\n\t                  <block type=\"MoverACasillaDerecha\" id=\"33\"></block>\n\t                </next>\n\t              </block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t</xml>",
      errorEsperado: 'No puedo ir para la derecha'
    });
  });
});
define("pilasbloques/tests/integration/desafios/AlimentandoALosPeces-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "AlimentandoALosPeces";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t  <block type=\"al_empezar_a_ejecutar\" id=\"141\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t    <statement name=\"program\">\n\t      <block type=\"procedures_callnoreturn\" id=\"142\">\n\t        <mutation name=\"Buscar alimento\"></mutation>\n\t        <next>\n\t          <block type=\"procedures_callnoreturn\" id=\"143\">\n\t            <mutation name=\"Alimentar peces de arriba\"></mutation>\n\t            <next>\n\t              <block type=\"procedures_callnoreturn\" id=\"144\">\n\t                <mutation name=\"Alimentar peces de abajo\"></mutation>\n\t              </block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"145\" x=\"477\" y=\"34\">\n\t    <mutation></mutation>\n\t    <field name=\"NAME\">Alimentar peces de arriba</field>\n\t    <statement name=\"STACK\">\n\t      <block type=\"MoverACasillaArriba\" id=\"146\">\n\t        <next>\n\t          <block type=\"Repetir\" id=\"147\" inline=\"true\">\n\t            <value name=\"count\">\n\t              <block type=\"math_number\" id=\"148\">\n\t                <field name=\"NUM\">4</field>\n\t              </block>\n\t            </value>\n\t            <statement name=\"block\">\n\t              <block type=\"MoverACasillaIzquierda\" id=\"149\">\n\t                <next>\n\t                  <block type=\"AlimentarPez\" id=\"150\"></block>\n\t                </next>\n\t              </block>\n\t            </statement>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"151\" x=\"20\" y=\"219\">\n\t    <mutation></mutation>\n\t    <field name=\"NAME\">Buscar alimento</field>\n\t    <statement name=\"STACK\">\n\t      <block type=\"Repetir\" id=\"152\" inline=\"true\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"153\">\n\t            <field name=\"NUM\">2</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaArriba\" id=\"154\"></block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"Repetir\" id=\"155\" inline=\"true\">\n\t            <value name=\"count\">\n\t              <block type=\"math_number\" id=\"156\">\n\t                <field name=\"NUM\">4</field>\n\t              </block>\n\t            </value>\n\t            <statement name=\"block\">\n\t              <block type=\"MoverACasillaDerecha\" id=\"157\"></block>\n\t            </statement>\n\t            <next>\n\t              <block type=\"AgarrarComida\" id=\"158\"></block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"159\" x=\"473\" y=\"345\">\n\t    <mutation></mutation>\n\t    <field name=\"NAME\">Alimentar peces de abajo</field>\n\t    <statement name=\"STACK\">\n\t      <block type=\"Repetir\" id=\"160\" inline=\"true\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"161\">\n\t            <field name=\"NUM\">3</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaAbajo\" id=\"162\"></block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"Repetir\" id=\"163\" inline=\"true\">\n\t            <value name=\"count\">\n\t              <block type=\"math_number\" id=\"164\">\n\t                <field name=\"NUM\">3</field>\n\t              </block>\n\t            </value>\n\t            <statement name=\"block\">\n\t              <block type=\"MoverACasillaDerecha\" id=\"165\">\n\t                <next>\n\t                  <block type=\"AlimentarPez\" id=\"166\"></block>\n\t                </next>\n\t              </block>\n\t            </statement>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/BlockIDGeneration-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("BlockIDProblematicos", () => {
    // Notar que ambas soluciones tienen ids que terminan en $, por lo que en 1.4.0 genera problemas
    (0, _actividadTest.actividadTest)("TresNaranjas", {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"al_empezar_a_ejecutar\" id=\"|6JNA2=.$0V+DuSa+qbd\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\"><statement name=\"program\"><block type=\"Repetir\" id=\"rUDq?uw@/D8{E|%Pi3;Z\"><value name=\"count\"><block type=\"math_number\" id=\"QSA_?glC*rzkx/.H#tUJ\"><field name=\"NUM\">3</field></block></value><statement name=\"block\"><block type=\"MoverACasillaDerecha\" id=\"%eFKw~*o-wfmLXO6!mj-\"><next><block type=\"procedures_callnoreturn\" id=\"AYf_-:#ke?O[B%eSMVbF\"><mutation name=\"COMER NARANJA SI HAY\"></mutation></block></next></block></statement></block></statement></block><block type=\"procedures_defnoreturn\" id=\"FMF7V%|312bV)g_h5D9$\" x=\"310\" y=\"26\"><field name=\"NAME\">COMER NARANJA SI HAY</field><comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funcin...</comment><statement name=\"STACK\"><block type=\"Si\" id=\"Cvp$!KL$T-SjO2Y?kp/e\"><value name=\"condition\"><block type=\"TocandoNaranja\" id=\"UV9d54{l/1o.jiYP+p@5\"></block></value><statement name=\"block\"><block type=\"ComerNaranja\" id=\"dJ5?cn([fcvs%EZr~DEO\"></block></statement></block></statement></block></xml>"
    });
    (0, _actividadTest.actividadTest)("DibujandoFigurasDentroDeFiguras", {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><block type=\"al_empezar_a_ejecutar\" id=\"!kYgjw}3BbbVT];Yv4b,\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\"><statement name=\"program\"><block type=\"procedures_callnoreturn\" id=\"~z.SKruYLd7ntE*e#(_$\"><mutation name=\"hacer algo\"><arg name=\"x\"></arg><arg name=\"y\"></arg></mutation><value name=\"ARG0\"><block type=\"Numero\" id=\"dTBs32W#STpQ@+,/A|fJ\"><field name=\"NUM\">5</field></block></value><value name=\"ARG1\"><block type=\"Numero\" id=\"EqjKl{!]VKN(NDE-AB{y\"><field name=\"NUM\">100</field></block></value><next><block type=\"procedures_callnoreturn\" id=\"~ayd[uk-{3YX`DPLYd2h\"><mutation name=\"hacer algo\"><arg name=\"x\"></arg><arg name=\"y\"></arg></mutation><value name=\"ARG0\"><block type=\"Numero\" id=\"_a[_/Exf2V*1+4w;@y%6\"><field name=\"NUM\">4</field></block></value><value name=\"ARG1\"><block type=\"Numero\" id=\",3j:P_^I!{XynAp=KQC8\"><field name=\"NUM\">100</field></block></value><next><block type=\"procedures_callnoreturn\" id=\"KQ*x/`[#jYbbeN3Hyo+J\"><mutation name=\"hacer algo\"><arg name=\"x\"></arg><arg name=\"y\"></arg></mutation><value name=\"ARG0\"><block type=\"Numero\" id=\"X}@beG}0s|U_=lD1z8_-\"><field name=\"NUM\">3</field></block></value><value name=\"ARG1\"><block type=\"Numero\" id=\".Oa`0t;?o.spM7s_IZHX\"><field name=\"NUM\">100</field></block></value></block></next></block></next></block></statement></block><block type=\"procedures_defnoreturn\" id=\"H~9q2sAlzr}D3{9*Gf?$\" x=\"41\" y=\"183\"><mutation><arg name=\"x\"></arg><arg name=\"y\"></arg></mutation><field name=\"NAME\">hacer algo</field><comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funcin...</comment><statement name=\"STACK\"><block type=\"RepetirVacio\" id=\"IvT|[DBp5hGl69d?MM+e\"><value name=\"count\"><block type=\"variables_get\" id=\"D3z2HeUFp,Lui3K(fp(m\"><field name=\"VAR\">x</field></block></value><statement name=\"block\"><block type=\"DibujarLado\" id=\"BIlSM-5bS2q:-5GMflNm\"><value name=\"longitud\"><block type=\"variables_get\" id=\"j}q):ve!%T4veFV6kNU(\"><field name=\"VAR\">y</field></block></value><next><block type=\"GirarGrados\" id=\"t;Wxq8lrT:0Nk;J1ArOB\"><value name=\"grados\"><block type=\"OpAritmetica\" id=\"+01IVklSNUtmhe74QS!R\"><field name=\"OP\">DIVIDE</field><value name=\"A\"><block type=\"math_number\" id=\"j,LtYNSPYNJy;?$2(BN5\"><field name=\"NUM\">360</field></block></value><value name=\"B\"><block type=\"variables_get\" id=\"XDuk8LG4[qOtcx|(vCc4\"><field name=\"VAR\">x</field></block></value></block></value></block></next></block></statement></block></statement></block><block type=\"math_number\" id=\"?daCSErBq3I+6(.IbLZb\" disabled=\"true\" x=\"420\" y=\"543\"><field name=\"NUM\">100</field></block></xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/BlocksGallery-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'Blocks Gallery - aliases test';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)("InstalandoJuegos", {
      descripcionAdicional: 'Old Blocks works with new aliases implementation',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n      <xml xmlns=\"http://www.w3.org/1999/xhtml\">\n         <variables />\n         <block type=\"al_empezar_a_ejecutar\" id=\"NLO52_{=EfQ]%h_Mvb-D\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n            <statement name=\"program\">\n               <block type=\"repetir\" id=\"LxS0hW-2K@kVVz_0a|ko\">\n                  <value name=\"count\">\n                     <block type=\"math_number\" id=\"~9wRdqWoB;[8Uq]L?pc^\">\n                        <field name=\"NUM\">3</field>\n                     </block>\n                  </value>\n                  <statement name=\"block\">\n                     <block type=\"procedures_callnoreturn\" id=\"n9WQk+A[t|W+.{sv@*Ry\">\n                        <mutation name=\"Instalar  juego en la siguente computadora\" />\n                     </block>\n                  </statement>\n               </block>\n            </statement>\n         </block>\n         <block type=\"procedures_defnoreturn\" id=\"%Q?:wvM/oV-woP8OJ]i+\" x=\"14\" y=\"171\">\n            <field name=\"NAME\">Instalar  juego en la siguente computadora</field>\n            <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funcin...</comment>\n            <statement name=\"STACK\">\n               <block type=\"SiguienteCompu\" id=\"%LIMS;TJ8SxvkOh|/_45\">\n                  <next>\n                     <block type=\"PrenderCompu\" id=\"~%^r2|]U@(c@/Juk~5i;\">\n                        <next>\n                           <block type=\"EscribirA\" id=\"_%Lq3f(1;$3X;AFr*{No\">\n                              <next>\n                                 <block type=\"EscribirB\" id=\"s_jPxakFyyhmdY1J2+mw\">\n                                    <next>\n                                       <block type=\"EscribirC\" id=\"S5saOm03Q?Gu9x;E#{5K\">\n                                          <next>\n                                             <block type=\"InstalarJuego\" id=\"R#{=LEdni#1:2d%EUQwn\">\n                                                <next>\n                                                   <block type=\"ApagarCompu\" id=\"cF{Zlxg/bjp)jBB.Yu^:\" />\n                                                </next>\n                                             </block>\n                                          </next>\n                                       </block>\n                                    </next>\n                                 </block>\n                              </next>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/DibujandoFiguras-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)('DibujandoAlCuadrado', () => {
    (0, _actividadTest.actividadTest)('DibujandoAlCuadrado', {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"18\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n        <block type=\"procedures_callnoreturn\" id=\"21\">\n          <mutation name=\"Dibujar cuadrado de 100\"></mutation>\n        </block>\n      </statement>\n    </block>\n    <block type=\"procedures_defnoreturn\" id=\"24\" x=\"20\" y=\"180\">\n      <mutation></mutation>\n      <field name=\"NAME\">Dibujar cuadrado de 100</field>\n      <statement name=\"STACK\">\n        <block type=\"repetir\" id=\"25\" inline=\"true\">\n          <value name=\"count\">\n            <block type=\"math_number\" id=\"26\">\n              <field name=\"NUM\">4</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"DibujarLado\" id=\"27\" inline=\"true\">\n              <value name=\"longitud\">\n                <block type=\"math_number\" id=\"28\">\n                  <field name=\"NUM\">100</field>\n                </block>\n              </value>\n              <next>\n                <block type=\"GirarGrados\" id=\"29\" inline=\"true\">\n                  <value name=\"grados\">\n                    <block type=\"math_number\" id=\"30\">\n                      <field name=\"NUM\">90</field>\n                    </block>\n                  </value>\n                </block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoRayuelaRobotica', () => {
    (0, _actividadTest.actividadTest)('DibujandoRayuelaRobotica', {
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n        <statement name=\"program\">\n          <block type=\"repetir\" id=\"38\" inline=\"true\">\n            <value name=\"count\">\n              <block type=\"math_number\" id=\"39\">\n                <field name=\"NUM\">5</field>\n              </block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"procedures_callnoreturn\" id=\"3\">\n                <mutation name=\"Dibujar cuadrado de 50\"></mutation>\n                <next>\n                  <block type=\"DibujarLado\" id=\"28\" inline=\"true\">\n                    <value name=\"longitud\">\n                      <block type=\"math_number\" id=\"29\">\n                        <field name=\"NUM\">50</field>\n                      </block>\n                    </value>\n                  </block>\n                </next>\n              </block>\n            </statement>\n          </block>\n        </statement>\n      </block>\n      <block type=\"procedures_defnoreturn\" id=\"4\" x=\"20\" y=\"180\">\n        <mutation></mutation>\n        <field name=\"NAME\">Dibujar cuadrado de 50</field>\n        <statement name=\"STACK\">\n          <block type=\"repetir\" id=\"5\" inline=\"true\">\n            <value name=\"count\">\n              <block type=\"math_number\" id=\"6\">\n                <field name=\"NUM\">4</field>\n              </block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"DibujarLado\" id=\"7\" inline=\"true\">\n                <value name=\"longitud\">\n                  <block type=\"math_number\" id=\"8\">\n                    <field name=\"NUM\">50</field>\n                  </block>\n                </value>\n                <next>\n                  <block type=\"GirarGrados\" id=\"9\" inline=\"true\">\n                    <value name=\"grados\">\n                      <block type=\"math_number\" id=\"10\">\n                        <field name=\"NUM\">90</field>\n                      </block>\n                    </value>\n                  </block>\n                </next>\n              </block>\n            </statement>\n          </block>\n        </statement>\n      </block>\n    </xml>"
    });
    (0, _actividadTest.actividadTest)('DibujandoRayuelaRobotica', {
      descripcionAdicional: 'La habilidad saltar hacia adelante debe funcionar.',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="YrCGyJP5*Nqd;vN*,P)!" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="repetir" id="1o`5(i4f+*Q.?#Y~aUK("><value name="count"><block type="math_number" id="j:9!5DK!5RRxnK7k{a?n"><field name="NUM">4</field></block></value><statement name="block"><block type="procedures_callnoreturn" id=":{LYG1YcZ5RqI*7hs{)G"><mutation name="hacer cuadradito"></mutation><next><block type="SaltarHaciaAdelante" id="3sU%gT0u+|y0/Bx@;~qp"><value name="longitud"><block type="math_number" id="rcMhOlOZ|YW!+4%n?=KG"><field name="NUM">50</field></block></value></block></next></block></statement><next><block type="procedures_callnoreturn" id="uL,gl|k}tZx/~bfK[Cq;"><mutation name="hacer cuadradito"></mutation></block></next></block></statement></block><block type="procedures_defnoreturn" id=":O!;06MUE)%.c%fD.SGV" x="356" y="42"><field name="NAME">hacer cuadradito</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="D]cQ-tdd_4Nf0IJ$supe"><value name="count"><block type="math_number" id="Acn5=Mj]K)HI#!`TqJY)"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id=";@x:+F+|OP$;dp:yWbH_"><value name="longitud"><block type="math_number" id=".OhWri_#|^gKP?B)L~c."><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="?_m:c$@TST(=/M[Qxtal"><value name="grados"><block type="math_number" id="v{%_Ubp%#fz6B3-N%3~q"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>',
      resuelveDesafio: true
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoCortoPorLaDiagonal', () => {
    (0, _actividadTest.actividadTest)('DibujandoCortoPorLaDiagonal', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">5</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="5"><mutation name="Dibujar cuadrado de 50"></mutation><next><block type="DibujarLado" id="6" inline="true"><value name="longitud"><block type="math_number" id="7"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="50" inline="true"><value name="grados"><block type="math_number" id="51"><field name="NUM">90</field></block></value><next><block type="DibujarLado" id="28" inline="true"><value name="longitud"><block type="math_number" id="29"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="58" inline="true"><value name="grados"><block type="math_number" id="59"><field name="NUM">270</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="8" x="348" y="-9"><mutation></mutation><field name="NAME">Dibujar cuadrado de 50</field><statement name="STACK"><block type="repetir" id="9" inline="true"><value name="count"><block type="math_number" id="10"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="11" inline="true"><value name="longitud"><block type="math_number" id="12"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="13" inline="true"><value name="grados"><block type="math_number" id="14"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)('DibujandoCortoPorLaDiagonal', {
      descripcionAdicional: 'La habilidad saltar hacia adelante debe funcionar.',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="z.*Gl,c~JX@!zbN0PgPK" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="repetir" id="HIeFx)3BIcu|LxnpG9$8"><value name="count"><block type="math_number" id="UJL2_3{BqJ1`c/6m},5O"><field name="NUM">5</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="uAMN`e?Yux._J/=IN/3i"><mutation name="Dibujar cuadradito"></mutation><next><block type="procedures_callnoreturn" id="hr-D112DJ[rxs9;BNXp("><mutation name="Avanzar a siguiente figura"></mutation></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="UbDHz2K}^Ea6cca;A3JA" x="298" y="21"><field name="NAME">Dibujar cuadradito</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="!sA|i=9_cH8P3BHS~flq"><value name="count"><block type="math_number" id="h),2WI+`/LTZp!SQ8)#2"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="~#f`v_8m34edb[HID|V5"><value name="longitud"><block type="math_number" id="/meepkK)}P/%sGAd2LYf"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="J=X*)0APaOR?wq;8tfdb"><value name="grados"><block type="math_number" id="dMDJS[4Rs#;A]/@by3av"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="#5Pjg,9mF8EzSFtQUSDT" x="286" y="192"><field name="NAME">Avanzar a siguiente figura</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="SaltarHaciaAdelante" id="Juc)P^1V7@hV,4Sq@sNm"><value name="longitud"><block type="math_number" id="?%DMonAJE.LvX@4FrV(4"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="O7%i-@Yu32efb3mN_2LS"><value name="grados"><block type="math_number" id=":i.p_r-sN-}6X}w{=l3T"><field name="NUM">90</field></block></value><next><block type="SaltarHaciaAdelante" id="D-@@rE,]^0D$8D?)lSdC"><value name="longitud"><block type="math_number" id="shwwhQd29I52nrG#FPkG"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="(nOA@fC~{_7exTwYOAVV"><value name="grados"><block type="math_number" id="[PVZynw8_/!WF~Fps^oE"><field name="NUM">270</field></block></value></block></next></block></next></block></next></block></statement></block></xml>',
      resuelveDesafio: true
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoMamushkaCuadrada', () => {
    (0, _actividadTest.actividadTest)('DibujandoMamushkaCuadrada', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="5" inline="true"><mutation name="Dibujar cuadrado de 50"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="30"><field name="NUM">50</field></block></value><next><block type="procedures_callnoreturn" id="36" inline="true"><mutation name="Dibujar cuadrado de 50"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="33"><field name="NUM">100</field></block></value><next><block type="procedures_callnoreturn" id="39" inline="true"><mutation name="Dibujar cuadrado de 50"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="43"><field name="NUM">150</field></block></value><next><block type="procedures_callnoreturn" id="46" inline="true"><mutation name="Dibujar cuadrado de 50"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="48"><field name="NUM">200</field></block></value></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="14" x="4" y="290"><mutation><arg name="largo lado"></arg></mutation><field name="NAME">Dibujar cuadrado de 50</field><statement name="STACK"><block type="repetir" id="15" inline="true"><value name="count"><block type="math_number" id="16"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="17" inline="true"><value name="longitud"><block type="param_get" id="27"><field name="VAR">largo lado</field></block></value><next><block type="GirarGrados" id="19" inline="true"><value name="grados"><block type="math_number" id="20"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoEscaleraCuadrada', () => {
    (0, _actividadTest.actividadTest)('DibujandoEscaleraCuadrada', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="20" inline="true"><mutation name="Dibujar cuadrado"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="21"><field name="NUM">100</field></block></value><next><block type="procedures_callnoreturn" id="72"><mutation name="Ir Siguiente grande"></mutation><next><block type="repetir" id="104" inline="true"><value name="count"><block type="math_number" id="105"><field name="NUM">4</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="22" inline="true"><mutation name="Dibujar cuadrado"><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="23"><field name="NUM">50</field></block></value><next><block type="DibujarLado" id="86" inline="true"><value name="longitud"><block type="math_number" id="87"><field name="NUM">50</field></block></value></block></next></block></statement></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="47" x="413" y="200"><mutation></mutation><field name="NAME">Ir Siguiente grande</field><statement name="STACK"><block type="DibujarLado" id="56" inline="true"><value name="longitud"><block type="math_number" id="57"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="39" inline="true"><value name="grados"><block type="math_number" id="40"><field name="NUM">90</field></block></value><next><block type="DibujarLado" id="62" inline="true"><value name="longitud"><block type="math_number" id="63"><field name="NUM">100</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="28" x="40" y="301"><mutation><arg name="largo lado"></arg></mutation><field name="NAME">Dibujar cuadrado</field><statement name="STACK"><block type="repetir" id="29" inline="true"><value name="count"><block type="math_number" id="30"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="31" inline="true"><value name="longitud"><block type="param_get" id="32"><field name="VAR">largo lado</field></block></value><next><block type="GirarGrados" id="33" inline="true"><value name="grados"><block type="math_number" id="34"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)('DibujandoEscaleraCuadrada', {
      descripcionAdicional: 'La habilidad saltar hacia adelante debe funcionar',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="+9CHb~cPzv@du|%Z[DO8" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="procedures_callnoreturn" id="^wP*$fD4n6`dJ(9QNT@$"><mutation name="Dibujar cuadrado"></mutation><next><block type="repetir" id="_KP~-~QM0+x3+3v{%~yX"><value name="count"><block type="math_number" id="c,_L04QILWr(qi;4CK?}"><field name="NUM">4</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="F?~AF=y*^8wEi%1]CxKK"><mutation name="Dibujar Cuadradito"></mutation><next><block type="procedures_callnoreturn" id="0${3C{h@:Cgl?f60/0{c"><mutation name="Avanzar a siguiente cuadradito"></mutation></block></next></block></statement></block></next></block></statement></block><block type="procedures_defnoreturn" id="$H^lKeO))zlt[KD`FBaw" x="408" y="25"><field name="NAME">Dibujar cuadrado</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="PZia#3u|ecS__Jra%:_;"><value name="count"><block type="math_number" id="/[:QP5HjaQn;7ZrVc5P{"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id=":[oeE/75P6Snfgz?M^x="><value name="longitud"><block type="math_number" id="d{*,3tjYpg{~}b$b@Dgc"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="xjoV?KI{Cz~7MaP8Y5df"><value name="grados"><block type="math_number" id="yog.;,ww_?xeU_,6ech9"><field name="NUM">90</field></block></value></block></next></block></statement><next><block type="SaltarHaciaAdelante" id="IP%`$Y=4uD~7?3JxH%YE"><value name="longitud"><block type="math_number" id="gH/$j~+Rk:xi3sll]2yw"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="^t:d6o5n#H*x~r2x^ffB"><value name="grados"><block type="math_number" id="B8aa1KfF85=kJ/7)r9OU"><field name="NUM">90</field></block></value><next><block type="SaltarHaciaAdelante" id="zrvkVQz/:w_+gy(kYF9A"><value name="longitud"><block type="math_number" id="!n?+=u2b*+#9)Jz.K$mE"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="?IX+_oTh[tZ{7:D2)uh)"><value name="grados"><block type="math_number" id=":`v`$-Ol(jy@t[WQbdbw"><field name="NUM">270</field></block></value></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="|pymycmDH.5l^@u!WHV~" x="20" y="198"><field name="NAME">Avanzar a siguiente cuadradito</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="GirarGrados" id="!{c*dq%mopnh6vs;hvMs"><value name="grados"><block type="math_number" id="Bk*dIkD|SDG1M/HWDycv"><field name="NUM">90</field></block></value><next><block type="SaltarHaciaAdelante" id="8onuQ^?{INKZW=(%n(!h"><value name="longitud"><block type="math_number" id="/EQ?xl/l;lT_5BCJl2EK"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="P7!-gDiMm{%34)qJDsv~"><value name="grados"><block type="math_number" id="?V:!Q!Q-f6l~5d_@bUnK"><field name="NUM">270</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="o^1jg67e~h??bcPK5v@5" x="410" y="360"><field name="NAME">Dibujar Cuadradito</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="+V;hsu]FT:69FwV_KO4l"><value name="count"><block type="math_number" id="fe^C/=TGp;2th=_ZCgAu"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="Pu:-FKB9!n,tvm?SG$fz"><value name="longitud"><block type="math_number" id="],iJNu(AGL7G!i[GDuq1"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="y=N`#raR80(TKU/lHUcr"><value name="grados"><block type="math_number" id="f}A#}M:HYp:.1}B6(5nJ"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>',
      resuelveDesafio: true
    });
    (0, _actividadTest.actividadTest)('DibujandoEscaleraCuadrada', {
      descripcionAdicional: 'Solución alternativa debe solucionar el desafío',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables>\n      <variable type=\"\">x</variable>\n      <variable type=\"\">largo del lado</variable>\n    </variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"procedures_callnoreturn\">\n          <mutation name=\"dibujar un cuadrado\">\n            <arg name=\"largo del lado\"></arg>\n          </mutation>\n          <value name=\"ARG0\">\n            <block type=\"Numero\">\n              <field name=\"NUM\">100</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"procedures_callnoreturn\">\n              <mutation name=\"acomodar alien en el cuadrado\">\n                <arg name=\"largo del lado\"></arg>\n              </mutation>\n              <value name=\"ARG0\">\n                <block type=\"Numero\">\n                  <field name=\"NUM\">100</field>\n                </block>\n              </value>\n              <next>\n                <block type=\"DibujarLado\">\n                  <value name=\"longitud\">\n                    <block type=\"math_number\">\n                      <field name=\"NUM\">50</field>\n                    </block>\n                  </value>\n                  <next>\n                    <block type=\"repetir\">\n                      <value name=\"count\">\n                        <block type=\"math_number\">\n                          <field name=\"NUM\">4</field>\n                        </block>\n                      </value>\n                      <statement name=\"block\">\n                        <block type=\"procedures_callnoreturn\">\n                          <mutation name=\"dibujar un cuadrado\">\n                            <arg name=\"largo del lado\"></arg>\n                          </mutation>\n                          <value name=\"ARG0\">\n                            <block type=\"Numero\">\n                              <field name=\"NUM\">50</field>\n                            </block>\n                          </value>\n                          <next>\n                            <block type=\"procedures_callnoreturn\">\n                              <mutation name=\"acomodar alien en el cuadrado\">\n                                <arg name=\"largo del lado\"></arg>\n                              </mutation>\n                              <value name=\"ARG0\">\n                                <block type=\"Numero\">\n                                  <field name=\"NUM\">50</field>\n                                </block>\n                              </value>\n                            </block>\n                          </next>\n                        </block>\n                      </statement>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n    <block type=\"procedures_defnoreturn\" x=\"303\" y=\"168\">\n      <mutation>\n        <arg name=\"largo del lado\"></arg>\n      </mutation>\n      <field name=\"NAME\">dibujar un cuadrado</field>\n      <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n      <statement name=\"STACK\">\n        <block type=\"repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">4</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"DibujarLado\">\n              <value name=\"longitud\">\n                <block type=\"variables_get\">\n                  <field name=\"VAR\" variabletype=\"\">largo del lado</field>\n                </block>\n              </value>\n              <next>\n                <block type=\"GirarGrados\">\n                  <value name=\"grados\">\n                    <block type=\"math_number\">\n                      <field name=\"NUM\">90</field>\n                    </block>\n                  </value>\n                </block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n    <block type=\"procedures_defnoreturn\" x=\"24\" y=\"379\">\n      <mutation>\n        <arg name=\"largo del lado\"></arg>\n      </mutation>\n      <field name=\"NAME\">acomodar alien en el cuadrado</field>\n      <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n      <statement name=\"STACK\">\n        <block type=\"GirarGrados\">\n          <value name=\"grados\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">90</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"DibujarLado\">\n              <value name=\"longitud\">\n                <block type=\"variables_get\">\n                  <field name=\"VAR\" variabletype=\"\">largo del lado</field>\n                </block>\n              </value>\n              <next>\n                <block type=\"GirarGrados\">\n                  <value name=\"grados\">\n                    <block type=\"math_number\">\n                      <field name=\"NUM\">270</field>\n                    </block>\n                  </value>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      resuelveDesafio: true
    });
    (0, _actividadTest.actividadTest)('DibujandoEscaleraCuadrada', {
      descripcionAdicional: 'Otra solución alternativa debe solucionar el desafío',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="ic:eis)a8D|w@Sf`lItT" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="procedures_callnoreturn" id="YecAr$BID!?=oq1gtJDX"><mutation name="dibujar cuadrado grande"></mutation><next><block type="GirarGrados" id="fIgjq}88]:~+{i`]!uQw"><value name="grados"><block type="math_number" id="yzUI+]}sX3kPa4d8kY5a"><field name="NUM">90</field></block></value><next><block type="DibujarLado" id="p3C?!(V%2`Mcqh7-/E}8"><value name="longitud"><block type="math_number" id="u{}fqz^jVcSeoCeVFpkD"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="re4$kz|Hj4w,06e-ONFy"><value name="grados"><block type="math_number" id="q12_lMX`*8jT2(g^VF6I"><field name="NUM">-90</field></block></value><next><block type="DibujarLado" id="D!oo-=kj-a(094lQgOa3"><value name="longitud"><block type="math_number" id="A|/xIpY{KAYAyA@~UtIM"><field name="NUM">50</field></block></value><next><block type="repetir" id="`SdXWs{P%d9hWiXQ[C7i"><value name="count"><block type="math_number" id="(7vDpZNtgN3/w;}~Nv^T"><field name="NUM">4</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="EB$btXbhVra6{[klQ}Vv"><mutation name="dibujar cuadrado pequeo"></mutation><next><block type="GirarGrados" id=";kSB}22$`w|Zcm[y9pX!"><value name="grados"><block type="math_number" id="!xMH)ANUNVGkg8v[GM_4"><field name="NUM">90</field></block></value><next><block type="DibujarLado" id="iEAI.IuDBav?@`*H-lSm"><value name="longitud"><block type="math_number" id="VE%S/eLrtoBdX^0WhTRO"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id="$]Ax#=ckd6[A3ask_d=j"><value name="grados"><block type="math_number" id="lgB_$n8t12=z5BD.|CX6"><field name="NUM">-90</field></block></value></block></next></block></next></block></next></block></statement></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="?G7ZD/00o7OnRlg`dqks" x="325" y="106"><field name="NAME">dibujar cuadrado grande</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="#NN-!of[QJy:|/xCB^Nr"><value name="count"><block type="math_number" id="n@c;T_97sim3gx9-qJNX"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="(o%OWkva8g9[#}BPO3l5"><value name="longitud"><block type="math_number" id=")ZVhG5q}xKu]$e:6$lV%"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="+w3XC5Tk$[Tvi0ns:$HF"><value name="grados"><block type="math_number" id="D6B6R}wh])h])~HNxJ)o"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="[$ek:t9E/AAOk?tA=N$O" x="326" y="250"><field name="NAME">dibujar cuadrado pequeo</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="cG;)F)zOP32GKFOOmxTK"><value name="count"><block type="math_number" id="|D)0K7hFzFkr5^ym2Y@0"><field name="NUM">4</field></block></value><statement name="block"><block type="DibujarLado" id="np:yXxn?Ais.O)Ai5S=}"><value name="longitud"><block type="math_number" id="{RQZA;+dgaZD^b1y$ygR"><field name="NUM">50</field></block></value><next><block type="GirarGrados" id=")l`wC~OiT}cbnBl~ZyPB"><value name="grados"><block type="math_number" id="7JP415vKB.Am.)w9!mXo"><field name="NUM">90</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoHexagono', () => {
    (0, _actividadTest.actividadTest)('DibujandoHexagono', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="repetir" id="29" inline="true"><value name="count"><block type="math_number" id="30"><field name="NUM">6</field></block></value><statement name="block"><block type="DibujarLado" id="31" inline="true"><value name="longitud"><block type="math_number" id="128"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="33" inline="true"><value name="grados"><block type="math_number" id="34"><field name="NUM">60</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoPiramideInvertida', () => {
    (0, _actividadTest.actividadTest)('DibujandoPiramideInvertida', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="repetir" id="29" inline="true"><value name="count"><block type="math_number" id="30"><field name="NUM">3</field></block></value><statement name="block"><block type="DibujarLado" id="31" inline="true"><value name="longitud"><block type="math_number" id="128"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="33" inline="true"><value name="grados"><block type="math_number" id="34"><field name="NUM">120</field></block></value></block></next></block></statement></block></statement></block></xml>'
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoFigurasDentroDeFiguras', () => {
    (0, _actividadTest.actividadTest)('DibujandoFigurasDentroDeFiguras', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="177" inline="true"><mutation name="Dibujar poligono de lados"><arg name="cantidad"></arg></mutation><value name="ARG0"><block type="math_number" id="179"><field name="NUM">3</field></block></value><next><block type="procedures_callnoreturn" id="191" inline="true"><mutation name="Dibujar poligono de lados"><arg name="cantidad"></arg></mutation><value name="ARG0"><block type="math_number" id="196"><field name="NUM">4</field></block></value><next><block type="procedures_callnoreturn" id="194" inline="true"><mutation name="Dibujar poligono de lados"><arg name="cantidad"></arg></mutation><value name="ARG0"><block type="math_number" id="198"><field name="NUM">5</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="130" x="47" y="191"><mutation><arg name="cantidad"></arg></mutation><field name="NAME">Dibujar poligono de lados</field><statement name="STACK"><block type="repetir" id="29" inline="true"><value name="count"><block type="param_get" id="149"><field name="VAR">cantidad</field></block></value><statement name="block"><block type="DibujarLado" id="31" inline="true"><value name="longitud"><block type="math_number" id="128"><field name="NUM">100</field></block></value><next><block type="GirarGrados" id="33" inline="true"><value name="grados"><block type="math_arithmetic" id="139" inline="true"><field name="OP">DIVIDE</field><value name="A"><block type="math_number" id="34"><field name="NUM">360</field></block></value><value name="B"><block type="param_get" id="137"><field name="VAR">cantidad</field></block></value></block></value></block></next></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)('DibujandoFigurasDentroDeFiguras', {
      descripcionAdicional: 'Al tener un bloque con un id que contenga el caracter $, deberia funcionar correctamente, previo a la resolucion del issue no andaba',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="!kYgjw}3BbbVT];Yv4b," deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="procedures_callnoreturn" id="~z.SKruYLd7ntE*e#(_$"><mutation name="hacer algo"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="Numero" id="dTBs`2W#STpQ@+,/A|fJ"><field name="NUM">5</field></block></value><value name="ARG1"><block type="Numero" id="EqjKl{!]VKN(NDE-AB{y"><field name="NUM">100</field></block></value></block></statement></block><block type="procedures_defnoreturn" id="H~9q2sAlzr}D${9*Gf?$" x="178" y="222"><mutation><arg name="x"></arg><arg name="y"></arg></mutation><field name="NAME">hacer algo</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="RepetirVacio" id="IvT|[DBp5hGl69d?MM+e"><value name="count"><block type="variables_get" id="D`z2HeUFp,Lui3K(fp(m"><field name="VAR">x</field></block></value><statement name="block"><block type="DibujarLado" id="BIlSM-5bS2q:-5GMflNm"><value name="longitud"><block type="variables_get" id="j}q):ve!%T4veFV6kNU("><field name="VAR">y</field></block></value><next><block type="GirarGrados" id="t;Wxq8lrT:0Nk;J1ArOB"><value name="grados"><block type="OpAritmetica" id="+01IVklSNUtmhe74QS!R"><field name="OP">DIVIDE</field><value name="A"><block type="math_number" id="j,LtYNSPYNJy;?$2(BN5"><field name="NUM">360</field></block></value><value name="B"><block type="variables_get" id="XDuk8LG4[qOtcx|(vCc4"><field name="VAR">x</field></block></value></block></value></block></next></block></statement></block></statement></block><block type="math_number" id="?daCSErBq`I+6(.IbLZb" disabled="true" x="420" y="543"><field name="NUM">100</field></block></xml>',
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)('DibujandoFigurasDentroDeFiguras', {
      descripcionAdicional: 'Al tener un bloque con un id que contenga el caracter $, deberia funcionar correctamente, previo a la resolucion del issue andaba',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="ov:a}`,YO)1u@{;$U/*D" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="procedures_callnoreturn" id="Pb4ovzuf:+KRB*cG/@U5"><mutation name="hacer algo"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="math_number" id="!vWiv@U1{9J^W9NN.cAa"><field name="NUM">10</field></block></value><value name="ARG1"><block type="math_number" id="(3ecL:P)78xcO!mYo]NQ"><field name="NUM">10</field></block></value></block></statement></block><block type="procedures_defnoreturn" id="3-Wztz*X,htVX|P=0iWH" x="117" y="115"><mutation><arg name="x"></arg><arg name="y"></arg></mutation><field name="NAME">hacer algo</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="Yh_Dt+iV%(fQ2+,.I[D/"><value name="count"><block type="variables_get" id="$EHWhV+/2{W%4@piBs)a"><field name="VAR">y</field></block></value><statement name="block"><block type="DibujarLado" id="1rv~K7(]XaZxH,NqUR7i"><value name="longitud"><block type="math_number" id="{U:Czfjj@s]0DX:rqfKw"><field name="NUM">100</field></block></value><next><block type="DibujarLado" id="aew17*cc0_]{%.QjYTf|"><value name="longitud"><block type="OpAritmetica" id="I|2.;o#9!^WpuAA^E*||"><field name="OP">DIVIDE</field><value name="A"><block type="math_number" id="5T[o1Wm(UGWyi(21-jEU"><field name="NUM">100</field></block></value><value name="B"><block type="variables_get" id="a{)fh?b(n+WA/J=$,d^{"><field name="VAR">x</field></block></value></block></value></block></next></block></statement></block></statement></block><block type="variables_get" id="KDJ5@i|7z@9lfknqAft%" disabled="true" x="272" y="503"><field name="VAR">x</field></block></xml>',
      resuelveDesafio: false
    });
  });
  (0, _actividadTest.moduloActividad)('DibujandoLaCuevaDeEstalagtitas', () => {
    (0, _actividadTest.actividadTest)('DibujandoLaCuevaDeEstalagtitas', {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="352" inline="true"><mutation name="Dibujar poligono"><arg name="cantidad"></arg><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="366"><field name="NUM">4</field></block></value><value name="ARG1"><block type="math_number" id="368"><field name="NUM">200</field></block></value><next><block type="procedures_callnoreturn" id="343" inline="true"><mutation name="Dibujar poligono"><arg name="cantidad"></arg><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="354"><field name="NUM">3</field></block></value><value name="ARG1"><block type="math_number" id="356"><field name="NUM">40</field></block></value><next><block type="DibujarLado" id="317" inline="true"><value name="longitud"><block type="math_number" id="318"><field name="NUM">40</field></block></value><next><block type="procedures_callnoreturn" id="346" inline="true"><mutation name="Dibujar poligono"><arg name="cantidad"></arg><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="358"><field name="NUM">3</field></block></value><value name="ARG1"><block type="math_number" id="360"><field name="NUM">60</field></block></value><next><block type="DibujarLado" id="333" inline="true"><value name="longitud"><block type="math_number" id="334"><field name="NUM">60</field></block></value><next><block type="procedures_callnoreturn" id="349" inline="true"><mutation name="Dibujar poligono"><arg name="cantidad"></arg><arg name="largo lado"></arg></mutation><value name="ARG0"><block type="math_number" id="362"><field name="NUM">3</field></block></value><value name="ARG1"><block type="math_number" id="364"><field name="NUM">100</field></block></value></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="130" x="59" y="315"><mutation><arg name="cantidad"></arg><arg name="largo lado"></arg></mutation><field name="NAME">Dibujar poligono</field><statement name="STACK"><block type="repetir" id="29" inline="true"><value name="count"><block type="param_get" id="149"><field name="VAR">cantidad</field></block></value><statement name="block"><block type="DibujarLado" id="31" inline="true"><value name="longitud"><block type="param_get" id="210"><field name="VAR">largo lado</field></block></value><next><block type="GirarGrados" id="33" inline="true"><value name="grados"><block type="math_arithmetic" id="139" inline="true"><field name="OP">DIVIDE</field><value name="A"><block type="math_number" id="34"><field name="NUM">360</field></block></value><value name="B"><block type="param_get" id="137"><field name="VAR">cantidad</field></block></value></block></value></block></next></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)('DibujandoLaCuevaDeEstalagtitas', {
      descripcionAdicional: 'La habilidad saltar hacia adelante debe funcionar.',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="l]e|T{U$pC%5S@a|9H`4">x</variable><variable type="" id="yd2]Tx-`eIbJbB/NJu8v">cantidad de lados</variable><variable type="" id="kJIbvmiGNlG*Y.#3c)jX">longitud</variable></variables><block type="al_empezar_a_ejecutar" id="){hzjyxad9}}A~(wiZvd" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="procedures_callnoreturn" id="SwKK|!wY%-1h}cmzqfFC"><mutation name="Dibujar  figura"><arg name="cantidad de lados"></arg><arg name="longitud"></arg></mutation><value name="ARG0"><block type="Numero" id="/c.]LuN=Q2Q$_J`C::6-"><field name="NUM">4</field></block></value><value name="ARG1"><block type="Numero" id="a8cJXc~:xN||r$y`U_Xt"><field name="NUM">200</field></block></value><next><block type="procedures_callnoreturn" id="s6V3)CTii0#Z+phW8WK."><mutation name="Dibujar  figura"><arg name="cantidad de lados"></arg><arg name="longitud"></arg></mutation><value name="ARG0"><block type="Numero" id="hL8z{,@s@^G*h#wg;(O1"><field name="NUM">3</field></block></value><value name="ARG1"><block type="Numero" id="e2nQ5Re-#Gc_}s_3969x"><field name="NUM">40</field></block></value><next><block type="SaltarHaciaAdelante" id="6.7kc[7/stXq2jDqf/pD"><value name="longitud"><block type="math_number" id="olkq!R!#!uvfJbGFfotR"><field name="NUM">40</field></block></value><next><block type="procedures_callnoreturn" id="kdh;V^.c|XC,6PpS[.ub"><mutation name="Dibujar  figura"><arg name="cantidad de lados"></arg><arg name="longitud"></arg></mutation><value name="ARG0"><block type="Numero" id="OMsh(w04-|9^D=Ep[;Uo"><field name="NUM">3</field></block></value><value name="ARG1"><block type="Numero" id="^,GjP-U2G9}c_8e}HUy8"><field name="NUM">60</field></block></value><next><block type="SaltarHaciaAdelante" id="1mIzs%;$ArS8-2zRHbuI"><value name="longitud"><block type="math_number" id="Z$HXjRHS_;ksF3kc1`Z#"><field name="NUM">60</field></block></value><next><block type="procedures_callnoreturn" id="+WTH{f;@uSvi|AD$*[j0"><mutation name="Dibujar  figura"><arg name="cantidad de lados"></arg><arg name="longitud"></arg></mutation><value name="ARG0"><block type="Numero" id="p9Lvf-s[,`(gsuyP#+lU"><field name="NUM">3</field></block></value><value name="ARG1"><block type="Numero" id="oD/]cLZ#A2I:`6/N0d10"><field name="NUM">100</field></block></value></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="}/y|d}fM}@f!%LNbblh+" x="212" y="276"><mutation><arg name="cantidad de lados"></arg><arg name="longitud"></arg></mutation><field name="NAME">Dibujar  figura</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="repetir" id="Z:Eckn~eDU8Of(+Css_~"><value name="count"><block type="variables_get" id="bKbIhx0By6{^ak%r-vO)"><field name="VAR" id="yd2]Tx-`eIbJbB/NJu8v" variabletype="">cantidad de lados</field></block></value><statement name="block"><block type="DibujarLado" id="G%OP!$j*K0XLV6v{CW4`"><value name="longitud"><block type="variables_get" id="_nVl4L/4*-Wx|tNjolso"><field name="VAR" id="kJIbvmiGNlG*Y.#3c)jX" variabletype="">longitud</field></block></value><next><block type="GirarGrados" id="-~m0=FrP`B2FUt=)03Y%"><value name="grados"><block type="OpAritmetica" id="{$Gf}XrBI._0:J}i;-o{"><field name="OP">DIVIDE</field><value name="A"><block type="math_number" id="?cRP~7R4l?z+:f+5$AWF"><field name="NUM">360</field></block></value><value name="B"><block type="variables_get" id=":%y`{J^,Wf,Zrw3y(4Bt"><field name="VAR" id="yd2]Tx-`eIbJbB/NJu8v" variabletype="">cantidad de lados</field></block></value></block></value></block></next></block></statement></block></statement></block><block type="math_number" id="FzSP^eJI~1oz,GuABI[5" disabled="true" x="424" y="365"><field name="NUM">100</field></block></xml>',
      resuelveDesafio: true
    });
  });
  (0, _actividadTest.moduloActividad)('DibujoLibre', () => {
    (0, _actividadTest.actividadTest)('DibujoLibre', {
      descripcionAdicional: 'Se tiene que poder dibujar libremente.',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <variables></variables>\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">2</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"DibujarLado\">\n            <value name=\"longitud\">\n              <block type=\"math_number\">\n                <field name=\"NUM\">75</field>\n              </block>\n            </value>\n            <next>\n              <block type=\"GirarGrados\">\n                <value name=\"grados\">\n                  <block type=\"math_number\">\n                    <field name=\"NUM\">90</field>\n                  </block>\n                </value>\n                <next>\n                  <block type=\"SaltarHaciaAdelante\">\n                    <value name=\"longitud\">\n                      <block type=\"math_number\">\n                        <field name=\"NUM\">100</field>\n                      </block>\n                    </value>\n                    <next>\n                      <block type=\"GirarGrados\">\n                        <value name=\"grados\">\n                          <block type=\"math_number\">\n                            <field name=\"NUM\">90</field>\n                          </block>\n                        </value>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </statement>\n  </block>\n  <block type=\"GirarGrados\" disabled=\"true\" x=\"58\" y=\"134\">\n    <value name=\"grados\">\n      <block type=\"math_number\">\n        <field name=\"NUM\">90</field>\n      </block>\n    </value>\n  </block>\n</xml>",
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)('DibujoLibre', {
      descripcionAdicional: 'No se puede dividir por cero.',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"GirarGrados\">\n          <value name=\"grados\">\n            <block type=\"OpAritmetica\">\n              <field name=\"OP\">DIVIDE</field>\n              <value name=\"A\">\n                <block type=\"math_number\">\n                  <field name=\"NUM\">90</field>\n                </block>\n              </value>\n              <value name=\"B\">\n                <block type=\"math_number\">\n                  <field name=\"NUM\">0</field>\n                </block>\n              </value>\n            </block>\n          </value>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "No se puede dividir por 0",
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)('DibujoLibre', {
      descripcionAdicional: 'Se puede girar 0 grados.',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"GirarGrados\">\n          <value name=\"grados\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">0</field>\n            </block>\n          </value>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      resuelveDesafio: false
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElAlienYLasTuercas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'ElAlienYLasTuercas';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="7" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="16" inline="true"><value name="count"><block type="math_number" id="17"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="23"></block></statement><next><block type="Repetir" id="45" inline="true"><value name="count"><block type="math_number" id="46"><field name="NUM">4</field></block></value><statement name="block"><block type="LevantaTuerca" id="29"><next><block type="MoverACasillaAbajo" id="35"><next><block type="MoverACasillaDerecha" id="41"></block></next></block></next></block></statement><next><block type="LevantaTuerca" id="53"></block></next></block></next></block></statement></block></xml>',
      cantidadDeActoresAlComenzar: {
        TuercaAnimada: 5,
        AlienAnimado: 1
      },
      cantidadDeActoresAlTerminar: {
        TuercaAnimada: 0,
        AlienAnimado: 1
      }
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElCangrejoAguafiestas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElCangrejoAguafiestas";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="115" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="308" inline="true"><mutation name="Explotar globos hacia"><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><value name="ARG0"><block type="math_number" id="320"><field name="NUM">4</field></block></value><value name="ARG1"><block type="ParaLaDerecha" id="314"></block></value><next><block type="procedures_callnoreturn" id="180" inline="true"><mutation name="Explotar globos hacia"><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><value name="ARG0"><block type="math_number" id="192"><field name="NUM">3</field></block></value><value name="ARG1"><block type="ParaAbajo" id="275"></block></value><next><block type="procedures_callnoreturn" id="186" inline="true"><mutation name="Explotar globos hacia"><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><value name="ARG0"><block type="math_number" id="198"><field name="NUM">4</field></block></value><value name="ARG1"><block type="ParaLaIzquierda" id="284"></block></value><next><block type="procedures_callnoreturn" id="183" inline="true"><mutation name="Explotar globos hacia"><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><value name="ARG0"><block type="math_number" id="205"><field name="NUM">3</field></block></value><value name="ARG1"><block type="ParaArriba" id="290"></block></value><next><block type="procedures_callnoreturn" id="299"><mutation name="Explotar globos centro"></mutation></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="126" x="20" y="230"><mutation><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><field name="NAME">Explotar globos hacia</field><statement name="STACK"><block type="MoverA" id="323" inline="true"><value name="direccion"><block type="param_get" id="328"><field name="VAR">direccion</field></block></value><next><block type="Repetir" id="141" inline="true"><value name="count"><block type="param_get" id="147"><field name="VAR">cantidad</field></block></value><statement name="block"><block type="ExplotarGlobo" id="160"><next><block type="MoverA" id="157" inline="true"><value name="direccion"><block type="param_get" id="152"><field name="VAR">direccion</field></block></value></block></next></block></statement></block></next></block></statement></block><block type="procedures_defnoreturn" id="221" x="40" y="399"><mutation></mutation><field name="NAME">Explotar globos centro</field><statement name="STACK"><block type="Repetir" id="234" inline="true"><value name="count"><block type="math_number" id="235"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverA" id="210" inline="true"><value name="direccion"><block type="ParaAbajo" id="241"></block></value></block></statement><next><block type="procedures_callnoreturn" id="257" inline="true"><mutation name="Explotar globos hacia"><arg name="cantidad"></arg><arg name="direccion"></arg></mutation><value name="ARG0"><block type="math_number" id="269"><field name="NUM">4</field></block></value><value name="ARG1"><block type="ParaLaDerecha" id="263"></block></value></block></next></block></statement></block></xml>'
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElDetectiveChaparro-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElDetectiveChaparro";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <xml xmlns=\"http://www.w3.org/1999/xhtml\">\n     <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n        <statement name=\"program\">\n           <block type=\"IrAlPrimerSospechoso\" id=\"3\">\n              <next>\n                 <block type=\"InterrogarSospechoso\" id=\"8\">\n                    <next>\n                       <block type=\"Hasta\" id=\"4\" inline=\"true\">\n                          <value name=\"condition\">\n                             <block type=\"EsCulpable\" id=\"5\" />\n                          </value>\n                          <statement name=\"block\">\n                             <block type=\"IrAlSiguienteSospechoso\" id=\"7\">\n                                <next>\n                                   <block type=\"InterrogarSospechoso\" id=\"6\" />\n                                </next>\n                             </block>\n                          </statement>\n                       </block>\n                    </next>\n                 </block>\n              </next>\n           </block>\n        </statement>\n     </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se quiere determinar si un sospechoso es culpable antes de interrogarlo',
      errorEsperado: 'No puedo saber si es el culpable, no lo he interrogado antes.',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n    <statement name=\"program\">\n      <block type=\"IrAlPrimerSospechoso\" id=\"JguD~YdHru6P~fcr%NY\">\n        <next>\n          <block type=\"Hasta\" id=\"eEne^.+K8A^2IFdubL?v\">\n            <value name=\"condition\">\n              <block type=\"EsCulpable\" id=\"]RG,CNdY/tAwH5c5-Fa\"></block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"IrAlSiguienteSospechoso\" id=\"zxo0AF]?Z!i,9bbiRJ+[\">\n                <next>\n                  <block type=\"InterrogarSospechoso\" id=\"Ed*!GNd4vswjF7HVjWL2\"></block>\n                </next>\n              </block>\n            </statement>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n  <block type=\"Repetir\" id=\"hX[/K9]kVi:cxT;yI{bB\" disabled=\"true\" x=\"-20\" y=\"480\"></block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElGatoEnLaCalle-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElGatoEnLaCalle";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t\t<statement name=\"program\">\n\t\t\t\t<block type=\"Avanzar\" id=\"33\">\n\t\t\t\t\t<next>\n\t\t\t\t\t\t<block type=\"procedures_callnoreturn\" id=\"53\">\n\t\t\t\t\t\t\t<mutation name=\"dormirse\"></mutation>\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t<block type=\"procedures_callnoreturn\" id=\"99\">\n\t\t\t\t\t\t\t\t\t<mutation name=\"despertarse\"></mutation>\n\t\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t\t<block type=\"Saludar\" id=\"117\">\n\t\t\t\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t\t\t\t<block type=\"Volver\" id=\"126\"></block>\n\t\t\t\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t</block>\n\t\t\t\t\t</next>\n\t\t\t\t</block>\n\t\t\t</statement>\n\t\t</block>\n\t\t<block type=\"procedures_defnoreturn\" id=\"74\" x=\"476\" y=\"134\">\n\t\t\t<mutation></mutation>\n\t\t\t<field name=\"NAME\">despertarse</field>\n\t\t\t<statement name=\"STACK\">\n\t\t\t\t<block type=\"AbrirOjos\" id=\"83\">\n\t\t\t\t\t<next>\n\t\t\t\t\t\t<block type=\"Pararse\" id=\"108\"></block>\n\t\t\t\t\t</next>\n\t\t\t\t</block>\n\t\t\t</statement>\n\t\t</block>\n\t\t<block type=\"procedures_defnoreturn\" id=\"3\" x=\"209\" y=\"190\">\n\t\t\t<mutation></mutation>\n\t\t\t<field name=\"NAME\">dormirse</field>\n\t\t\t<statement name=\"STACK\">\n\t\t\t\t<block type=\"Acostarse\" id=\"42\">\n\t\t\t\t\t<next>\n\t\t\t\t\t\t<block type=\"CerrarOjos\" id=\"62\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t<block type=\"Soniar\" id=\"71\"></block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t</block>\n\t\t\t\t\t</next>\n\t\t\t\t</block>\n\t\t\t</statement>\n\t\t</block>\n\t</xml>\n\t"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Invirtiendo acciones sigue funcionando la solución',
      solucion: "\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"16\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t<statement name=\"program\">\n\t\t\t<block type=\"Avanzar\" id=\"17\">\n\t\t\t\t<next>\n\t\t\t\t\t<block type=\"procedures_callnoreturn\" id=\"18\">\n\t\t\t\t\t\t<mutation name=\"dormirse\"></mutation>\n\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t<block type=\"procedures_callnoreturn\" id=\"19\">\n\t\t\t\t\t\t\t\t<mutation name=\"despertarse\"></mutation>\n\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t<block type=\"Saludar\" id=\"20\">\n\t\t\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t\t\t<block type=\"Volver\" id=\"21\"></block>\n\t\t\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t</next>\n\t\t\t\t\t</block>\n\t\t\t\t</next>\n\t\t\t</block>\n\t\t</statement>\n\t</block>\n\t<block type=\"procedures_defnoreturn\" id=\"22\" x=\"476\" y=\"134\">\n\t\t<mutation></mutation>\n\t\t<field name=\"NAME\">despertarse</field>\n\t\t<statement name=\"STACK\">\n\t\t\t<block type=\"Pararse\" id=\"24\">\n\t\t\t\t<next>\n\t\t\t\t\t<block type=\"AbrirOjos\" id=\"23\"></block>\n\t\t\t\t</next>\n\t\t\t</block>\n\t\t</statement>\n\t</block>\n\t<block type=\"procedures_defnoreturn\" id=\"25\" x=\"209\" y=\"190\">\n\t\t<mutation></mutation>\n\t\t<field name=\"NAME\">dormirse</field>\n\t\t<statement name=\"STACK\">\n\t\t\t<block type=\"CerrarOjos\" id=\"27\">\n\t\t\t\t<next>\n\t\t\t\t\t<block type=\"Acostarse\" id=\"26\">\n\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t<block type=\"Soniar\" id=\"28\"></block>\n\t\t\t\t\t\t</next>\n\t\t\t\t\t</block>\n\t\t\t\t</next>\n\t\t\t</block>\n\t\t</statement>\n\t</block>\n</xml>\n"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Puedo acostarme y pararme varias veces idem ojos',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="105" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="CerrarOjos" id="155"><next><block type="AbrirOjos" id="164"><next><block type="CerrarOjos" id="173"><next><block type="AbrirOjos" id="182"><next><block type="Acostarse" id="191"><next><block type="Pararse" id="200"><next><block type="Acostarse" id="209"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>',
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'da error al intentar cerrar ojos dos veces',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="39" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="CerrarOjos" id="40"><next><block type="CerrarOjos" id="41"></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo, ya estoy con los ojos cerrados'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'da error al intentar abrir ojos dos veces',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="19" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="CerrarOjos" id="38"><next><block type="AbrirOjos" id="20"><next><block type="AbrirOjos" id="21"></block></next></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo, ya estoy con los ojos abiertos'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'da error al intentar pararse dos veces',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="57" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Acostarse" id="75"><next><block type="Pararse" id="58"><next><block type="Pararse" id="59"></block></next></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo, ya estoy parado'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'da error al intentar acostarse dos veces',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="76" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Acostarse" id="77"><next><block type="Acostarse" id="78"></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo, ya estoy acostado'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'da error al intentar pararse al principio',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="105" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Pararse" id="244"></block></statement></block></xml>',
      errorEsperado: 'No puedo, ya estoy parado'
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElMarcianoEnElDesierto-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElMarcianoEnElDesierto";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    // Solución esperada. Va en sentido antihorario
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="3"><mutation name="Comer 2 derecha"></mutation><next><block type="procedures_callnoreturn" id="4"><mutation name="Mover 2 derecha"></mutation><next><block type="procedures_callnoreturn" id="5"><mutation name="Comer 3 arriba"></mutation><next><block type="procedures_callnoreturn" id="6"><mutation name="Comer 2 izquierda"></mutation></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="8" x="10" y="207"><mutation></mutation><field name="NAME">Comer 2 derecha</field><statement name="STACK"><block type="Repetir" id="9" inline="true"><value name="count"><block type="math_number" id="10"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="11"><next><block type="ComerManzana" id="12"></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="13" x="449" y="201"><mutation></mutation><field name="NAME">Mover 2 derecha</field><statement name="STACK"><block type="Repetir" id="14" inline="true"><value name="count"><block type="math_number" id="15"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="16"></block></statement></block></statement></block><block type="procedures_defnoreturn" id="17" x="8" y="387"><mutation></mutation><field name="NAME">Comer 3 arriba</field><statement name="STACK"><block type="Repetir" id="18" inline="true"><value name="count"><block type="math_number" id="19"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="20"><next><block type="ComerManzana" id="21"></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="7" x="445" y="400"><mutation></mutation><field name="NAME">Comer 2 izquierda</field><statement name="STACK"><block type="Repetir" id="33" inline="true"><value name="count"><block type="math_number" id="34"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaIzquierda" id="46"><next><block type="MoverACasillaIzquierda" id="40"><next><block type="ComerManzana" id="52"></block></next></block></next></block></statement></block></statement></block></xml>'
    }); // Solución alternativa. Va en sentido horario

    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="50" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="115"><mutation name="Mover 3 arriba"></mutation><next><block type="ComerManzana" id="121"><next><block type="procedures_callnoreturn" id="103"><mutation name="Comer 2 arriba"></mutation><next><block type="procedures_callnoreturn" id="144"><mutation name="Comer 2 derecha"></mutation><next><block type="procedures_callnoreturn" id="175"><mutation name="Mover 2 izquierda"></mutation><next><block type="procedures_callnoreturn" id="208"><mutation name="Comer 2 abajo"></mutation></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="60" x="3" y="207"><mutation></mutation><field name="NAME">Mover 3 arriba</field><statement name="STACK"><block type="Repetir" id="61" inline="true"><value name="count"><block type="math_number" id="62"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="109"></block></statement></block></statement></block><block type="procedures_defnoreturn" id="69" x="384" y="204"><mutation></mutation><field name="NAME">Comer 2 arriba</field><statement name="STACK"><block type="Repetir" id="70" inline="true"><value name="count"><block type="math_number" id="71"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="86"><next><block type="MoverACasillaDerecha" id="80"><next><block type="ComerManzana" id="74"></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="55" x="15" y="403"><mutation></mutation><field name="NAME">Comer 2 derecha</field><statement name="STACK"><block type="Repetir" id="56" inline="true"><value name="count"><block type="math_number" id="57"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="127"><next><block type="ComerManzana" id="59"></block></next></block></statement><next><block type="MoverACasillaAbajo" id="133"></block></next></block></statement></block><block type="procedures_defnoreturn" id="154" x="379" y="413"><mutation></mutation><field name="NAME">Mover 2 izquierda</field><statement name="STACK"><block type="Repetir" id="147" inline="true"><value name="count"><block type="math_number" id="148"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaIzquierda" id="214"></block></statement></block></statement></block><block type="procedures_defnoreturn" id="64" x="667" y="409"><mutation></mutation><field name="NAME">Comer 2 abajo</field><statement name="STACK"><block type="ComerManzana" id="201"><next><block type="MoverACasillaIzquierda" id="220"><next><block type="ComerManzana" id="68"></block></next></block></next></block></statement></block></xml>'
    }); // Solución alternativa. Va de arriba para abajo

    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="252" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="310"><mutation name="Ir arriba y comer"></mutation><next><block type="MoverACasillaDerecha" id="322"><next><block type="procedures_callnoreturn" id="332"><mutation name="Ir abajo y comer"></mutation><next><block type="MoverACasillaDerecha" id="338"><next><block type="ComerManzana" id="344"><next><block type="procedures_callnoreturn" id="354"><mutation name="Ir arriba y comer"></mutation><next><block type="MoverACasillaDerecha" id="360"><next><block type="MoverACasillaDerecha" id="366"><next><block type="procedures_callnoreturn" id="371"><mutation name="Comer 3 abajo"></mutation></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="259" x="319" y="11"><mutation></mutation><field name="NAME">Ir arriba y comer</field><statement name="STACK"><block type="Repetir" id="260" inline="true"><value name="count"><block type="math_number" id="261"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="262"></block></statement><next><block type="ComerManzana" id="293"></block></next></block></statement></block><block type="procedures_defnoreturn" id="269" x="626" y="8"><mutation></mutation><field name="NAME">Comer 3 abajo</field><statement name="STACK"><block type="Repetir" id="270" inline="true"><value name="count"><block type="math_number" id="271"><field name="NUM">2</field></block></value><statement name="block"><block type="ComerManzana" id="273"><next><block type="MoverACasillaAbajo" id="272"></block></next></block></statement><next><block type="ComerManzana" id="377"></block></next></block></statement></block><block type="procedures_defnoreturn" id="275" x="319" y="209"><mutation></mutation><field name="NAME">Ir abajo y comer</field><statement name="STACK"><block type="Repetir" id="276" inline="true"><value name="count"><block type="math_number" id="277"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="299"></block></statement><next><block type="ComerManzana" id="305"></block></next></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer tomar manzana cuando no hay',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="378" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="ComerManzana" id="409"></block></statement></block></xml>',
      errorEsperado: '¡Acá no hay manzana!'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer ir hacia arriba más allá del tablero',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="410" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="MoverACasillaArriba" id="431"><next><block type="MoverACasillaArriba" id="425"><next><block type="MoverACasillaArriba" id="437"><next><block type="MoverACasillaArriba" id="419"></block></next></block></next></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo ir para arriba'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer ir hacia la izquierda más allá del tablero',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="438" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="MoverACasillaIzquierda" id="454"></block></statement></block></xml>',
      errorEsperado: 'No puedo ir para la izquierda'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer ir hacia abajo más allá del tablero',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="460" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="MoverACasillaAbajo" id="467"></block></statement></block></xml>',
      errorEsperado: 'No puedo ir para abajo'
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElMonoCuentaDeNuevo-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElMonoCuentaDeNuevo";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"3\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"Repetir\" id=\"4\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"5\">\n                  <field name=\"NUM\">4</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"procedures_callnoreturn\" id=\"6\">\n                  <mutation name=\"Contar frutas de columna\" />\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"7\">\n                        <mutation name=\"Volver al inicio\" />\n                        <next>\n                           <block type=\"SiguienteColumna\" id=\"8\" />\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n            <next>\n               <block type=\"procedures_callnoreturn\" id=\"37\">\n                  <mutation name=\"Contar frutas de columna\" />\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"9\" x=\"280\" y=\"35\">\n      <mutation />\n      <field name=\"NAME\">Volver al inicio</field>\n      <statement name=\"STACK\">\n         <block type=\"hasta\" id=\"10\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"EstoySobreElInicio\" id=\"11\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaArriba\" id=\"12\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"13\" x=\"11\" y=\"201\">\n      <mutation />\n      <field name=\"NAME\">Contar frutas de columna</field>\n      <statement name=\"STACK\">\n         <block type=\"Repetir\" id=\"14\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"LargoColumnaActual\" id=\"15\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaAbajo\" id=\"16\">\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"17\">\n                        <mutation name=\"Contar banana si hay\" />\n                        <next>\n                           <block type=\"procedures_callnoreturn\" id=\"18\">\n                              <mutation name=\"Contar manzana si hay\" />\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"19\" x=\"319\" y=\"281\">\n      <mutation />\n      <field name=\"NAME\">Contar manzana si hay</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"20\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoBanana\" id=\"21\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"ContarBanana\" id=\"22\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"23\" x=\"47\" y=\"393\">\n      <mutation />\n      <field name=\"NAME\">Contar banana si hay</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"24\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoManzana\" id=\"25\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"ContarManzana\" id=\"26\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElMonoQueSabeContar-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'ElMonoQueSabeContar';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"Repetir\" id=\"68\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"69\">\n                  <field name=\"NUM\">4</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"procedures_callnoreturn\" id=\"81\">\n                  <mutation name=\"Contar frutas de columna\" />\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"87\">\n                        <mutation name=\"Volver al inicio\" />\n                        <next>\n                           <block type=\"SiguienteColumna\" id=\"93\" />\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n            <next>\n               <block type=\"procedures_callnoreturn\" id=\"108\">\n                  <mutation name=\"Contar frutas de columna\" />\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"53\" x=\"277\" y=\"15\">\n      <mutation />\n      <field name=\"NAME\">Contar frutas de columna</field>\n      <statement name=\"STACK\">\n         <block type=\"hasta\" id=\"114\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"EstoySobreElFinal\" id=\"129\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaAbajo\" id=\"146\">\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"163\">\n                        <mutation name=\"Contar banana si hay\" />\n                        <next>\n                           <block type=\"procedures_callnoreturn\" id=\"157\">\n                              <mutation name=\"Contar manzana si hay\" />\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"49\" x=\"13\" y=\"211\">\n      <mutation />\n      <field name=\"NAME\">Contar banana si hay</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"202\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoBanana\" id=\"217\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"ContarBanana\" id=\"228\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"46\" x=\"411\" y=\"227\">\n      <mutation />\n      <field name=\"NAME\">Contar manzana si hay</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"240\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoManzana\" id=\"222\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"ContarManzana\" id=\"234\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"58\" x=\"154\" y=\"312\">\n      <mutation />\n      <field name=\"NAME\">Volver al inicio</field>\n      <statement name=\"STACK\">\n         <block type=\"hasta\" id=\"251\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"EstoySobreElInicio\" id=\"256\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaArriba\" id=\"262\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElMonoYLasBananas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElMonoYLasBananas";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      //	solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="25" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="AvanzarMono" id="26"><next><block type="procedures_callnoreturn" id="40"><mutation name="Comer banana si hay"></mutation></block></next></block></statement></block><block type="procedures_defnoreturn" id="32" x="-11" y="110"><mutation></mutation><field name="NAME">Comer banana si hay</field><statement name="STACK"><block type="si" id="27" inline="true"><value name="condition"><block type="Tocandobanana" id="28"></block></value><statement name="block"><block type="ComerBanana" id="29"></block></statement></block></statement></block></xml>',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"25\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n    <statement name=\"program\">\n      <block type=\"AvanzarMono\" id=\"26\">\n        <next>\n          <block type=\"procedures_callnoreturn\" id=\"40\">\n            <mutation name=\"Comer banana si hay\"></mutation>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n\n  <block type=\"procedures_defnoreturn\" id=\"32\" x=\"-11\" y=\"110\">\n    <mutation></mutation>\n    <field name=\"NAME\">Comer banana si hay</field>\n    <statement name=\"STACK\">\n      <block type=\"si\" id=\"27\" inline=\"true\">\n        <value name=\"condition\"><block type=\"TocandoBanana\" id=\"28\"></block></value>\n        <statement name=\"block\"><block type=\"ComerBanana\" id=\"29\"></block></statement>\n      </block>\n    </statement>\n  </block>\n  </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElPlanetaDeNano-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "ElPlanetaDeNano";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"procedures_callnoreturn\" id=\"3\" inline=\"true\">\n\t\t\t\t<mutation name=\"comer\">\n\t\t\t\t   <arg name=\"cant\" />\n\t\t\t\t</mutation>\n\t\t\t\t<value name=\"ARG0\">\n\t\t\t\t   <block type=\"math_number\" id=\"4\">\n\t\t\t\t\t  <field name=\"NUM\">3</field>\n\t\t\t\t   </block>\n\t\t\t\t</value>\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"MoverACasillaArriba\" id=\"5\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"6\" inline=\"true\">\n\t\t\t\t\t\t\t<mutation name=\"comer\">\n\t\t\t\t\t\t\t   <arg name=\"cant\" />\n\t\t\t\t\t\t\t</mutation>\n\t\t\t\t\t\t\t<value name=\"ARG0\">\n\t\t\t\t\t\t\t   <block type=\"math_number\" id=\"7\">\n\t\t\t\t\t\t\t\t  <field name=\"NUM\">1</field>\n\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"MoverACasillaArriba\" id=\"8\">\n\t\t\t\t\t\t\t\t  <next>\n\t\t\t\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"9\" inline=\"true\">\n\t\t\t\t\t\t\t\t\t\t<mutation name=\"comer\">\n\t\t\t\t\t\t\t\t\t\t   <arg name=\"cant\" />\n\t\t\t\t\t\t\t\t\t\t</mutation>\n\t\t\t\t\t\t\t\t\t\t<value name=\"ARG0\">\n\t\t\t\t\t\t\t\t\t\t   <block type=\"math_number\" id=\"10\">\n\t\t\t\t\t\t\t\t\t\t\t  <field name=\"NUM\">4</field>\n\t\t\t\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t\t   <block type=\"MoverACasillaArriba\" id=\"11\">\n\t\t\t\t\t\t\t\t\t\t\t  <next>\n\t\t\t\t\t\t\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"12\" inline=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<mutation name=\"comer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t   <arg name=\"cant\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</mutation>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<value name=\"ARG0\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t   <block type=\"math_number\" id=\"13\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t  <field name=\"NUM\">2</field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t\t\t\t\t\t </block>\n\t\t\t\t\t\t\t\t\t\t\t  </next>\n\t\t\t\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t\t\t </block>\n\t\t\t\t\t\t\t\t  </next>\n\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"14\" x=\"282\" y=\"33\">\n\t\t  <mutation>\n\t\t\t <arg name=\"cant\" />\n\t\t  </mutation>\n\t\t  <field name=\"NAME\">comer</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"Repetir\" id=\"15\" inline=\"true\">\n\t\t\t\t<value name=\"count\">\n\t\t\t\t   <block type=\"param_get\" id=\"16\">\n\t\t\t\t\t  <field name=\"VAR\">cant</field>\n\t\t\t\t   </block>\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"MoverACasillaDerecha\" id=\"17\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"ComerBanana\" id=\"18\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"VolverAlBordeIzquierdo\" id=\"19\" />\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElRecolectorDeEstrellas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'ElRecolectorDeEstrellas';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="115" inline="true"><value name="count"><block type="math_number" id="116"><field name="NUM">3</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="107"><mutation name="tomar estellas de la fila completa"></mutation><next><block type="VolverABordeIzquierdo" id="121"><next><block type="MoverACasillaArriba" id="126"></block></next></block></next></block></statement><next><block type="procedures_callnoreturn" id="129"><mutation name="tomar estellas de la fila completa"></mutation></block></next></block></statement></block><block type="procedures_defnoreturn" id="92" x="14" y="268"><mutation></mutation><field name="NAME">tomar estellas de la fila completa</field><statement name="STACK"><block type="Repetir" id="89" inline="true"><value name="count"><block type="math_number" id="90"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="97"><next><block type="TomarEstrella" id="102"></block></next></block></statement></block></statement></block></xml>',
      cantidadDeActoresAlComenzar: {
        "EstrellaAnimada": 4 * 4
      },
      cantidadDeActoresAlTerminar: {
        "EstrellaAnimada": 0
      }
    });
  });
});
define("pilasbloques/tests/integration/desafios/ElSuperviaje-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'ElSuperviaje';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"Repetir\" id=\"26\" inline=\"true\">\n            \t\t\t\t\t<value name=\"count\">\n               \t\t\t\t\t\t<block type=\"KmsTotales\" id=\"29\" />\n            \t\t\t\t\t</value>\n           \t\t\t\t\t \t<statement name=\"block\">\n               \t\t\t\t\t\t<block type=\"Avanzar1km\" id=\"12\" />\n            \t\t\t\t\t</statement>\n         \t\t\t\t\t</block>\n      \t\t\t\t\t</statement>\n   \t\t\t\t\t</block>\n\t\t\t\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/FutbolDeRobots-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'FutbolRobots';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"Repetir\" id=\"14\" inline=\"true\">\n\t\t\t\t<value name=\"count\">\n\t\t\t\t   <block type=\"math_number\" id=\"15\">\n\t\t\t\t\t  <field name=\"NUM\">7</field>\n\t\t\t\t   </block>\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"95\">\n\t\t\t\t\t  <mutation name=\"Hacer gol\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"99\">\n\t\t\t\t\t\t\t<mutation name=\"Volver al inicio\" />\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"SiguienteFila\" id=\"87\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"107\">\n\t\t\t\t\t  <mutation name=\"Hacer gol\" />\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"21\" x=\"217\" y=\"61\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Hacer gol</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"hasta\" id=\"33\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoPelota\" id=\"70\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"MoverACasillaDerecha\" id=\"54\" />\n\t\t\t\t</statement>\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"PatearPelota\" id=\"75\" />\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"24\" x=\"6\" y=\"235\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Volver al inicio</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"hasta\" id=\"42\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoInicio\" id=\"62\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"MoverACasillaIzquierda\" id=\"59\" />\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/InstalandoJuegos-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'InstalandoJuegos';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"193\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"Repetir\" id=\"212\" inline=\"true\">\n\t\t\t\t<value name=\"count\">\n\t\t\t\t   <block type=\"Numero\" id=\"213\">\n\t\t\t\t\t  <field name=\"NUM\">3</field>\n\t\t\t\t   </block>\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"PasarASiguienteComputadora\" id=\"221\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"209\">\n\t\t\t\t\t\t\t<mutation name=\"Procesar compu\" />\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"Procedimiento\" id=\"195\" x=\"23\" y=\"215\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Procesar compu</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"PrenderComputadora\" id=\"229\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"233\">\n\t\t\t\t\t  <mutation name=\"Ingresar password\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"InstalarJuego\" id=\"241\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"ApagarComputadora\" id=\"249\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"Procedimiento\" id=\"198\" x=\"487\" y=\"218\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Ingresar password</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"EscribirA\" id=\"257\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"EscribirB\" id=\"265\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"EscribirC\" id=\"273\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'No debe poderse resolver la actividad si no están las tres máquinas instaladas',
      errorEsperado: 'Esta computadora ya fue prendida',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml>\n\t   <block y=\"0\" x=\"0\" editable=\"false\" movable=\"false\" deletable=\"false\" id=\"32\" type=\"al_empezar_a_ejecutar\">\n\t\t  <statement name=\"program\">\n\t\t\t <block id=\"35\" type=\"PasarASiguienteComputadora\">\n\t\t\t\t<next>\n\t\t\t\t   <block inline=\"true\" id=\"33\" type=\"Repetir\">\n\t\t\t\t\t  <value name=\"count\">\n\t\t\t\t\t\t <block id=\"34\" type=\"Numero\">\n\t\t\t\t\t\t\t<field name=\"NUM\">3</field>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block id=\"36\" type=\"procedures_callnoreturn\">\n\t\t\t\t\t\t\t<mutation name=\"Procesar compu\" />\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block y=\"215\" x=\"23\" id=\"37\" type=\"Procedimiento\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Procesar compu</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block id=\"38\" type=\"PrenderComputadora\">\n\t\t\t\t<next>\n\t\t\t\t   <block id=\"39\" type=\"procedures_callnoreturn\">\n\t\t\t\t\t  <mutation name=\"Ingresar password\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block id=\"40\" type=\"InstalarJuego\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block id=\"41\" type=\"ApagarComputadora\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block y=\"218\" x=\"487\" id=\"42\" type=\"Procedimiento\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Ingresar password</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block id=\"43\" type=\"EscribirA\">\n\t\t\t\t<next>\n\t\t\t\t   <block id=\"44\" type=\"EscribirB\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block id=\"45\" type=\"EscribirC\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora donde no hay',
      errorEsperado: 'No hay una computadora aquí',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<variables />\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"hI{t44eHqn15uW[!}1B{\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"PrenderComputadora\" id=\"nugWvB;ltf#4R,Kj!MF+\" />\n      \t\t\t\t\t</statement>\n   \t\t\t\t\t</block>\n\t\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta avanzar mas de 3 veces a la siguiente computadora',
      errorEsperado: 'No puedo ir para la derecha',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<variables />\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"e9x6)PO4mZu(;D%S5Fws\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"repetir\" id=\"}9;SLseJ$ok_^EJa^Q*L\">\n            \t\t\t\t\t<value name=\"count\">\n               \t\t\t\t\t<block type=\"math_number\" id=\"hb:M6waC5J7_eBG,Pki6\">\n                  \t\t\t\t\t<field name=\"NUM\">10</field>\n               \t\t\t\t\t</block>\n            \t\t\t\t\t</value>\n            \t\t\t\t\t<statement name=\"block\">\n               \t\t\t\t\t<block type=\"PasarASiguienteComputadora\" id=\"nsFTpu=3(AA/8}@rBf?h\" />\n            \t\t\t\t\t</statement>\n         \t\t\t\t\t</block>\n      \t\t\t\t\t</statement>\n   \t\t\t\t\t</block>\n\t\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora que ya esta prendida',
      errorEsperado: 'Esta computadora ya fue prendida',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<variables />\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"t:SYqPq{bs.BNKDmH.wk\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"PasarASiguienteComputadora\" id=\"e,)4hv.:V0gkgcpcT=@7\">\n            \t\t\t\t\t<next>\n               \t\t\t\t\t<block type=\"PrenderComputadora\" id=\"5;*S9+]*@XrvkZ};%99]\">\n                  \t\t\t\t\t<next>\n                     \t\t\t\t\t<block type=\"PrenderComputadora\" id=\"5;*S9+]*@XrvkZ};%92]\"/>\n                  \t\t\t\t\t</next>\n               \t\t\t\t\t</block>\n            \t\t\t\t\t</next>\n         \t\t\t\t\t</block>\n      \t\t\t\t\t</statement>\n   \t\t\t\t\t</block>\n\t\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta apagar una computadora que ya esta apagada',
      errorEsperado: 'Esta computadora ya está apagada',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<variables />\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"so@Q*BAb]=G_!6k##0])\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"PasarASiguienteComputadora\" id=\"4QF!}.61@^Vhg1IeE~5y\">\n            \t\t\t\t\t<next>\n               \t\t\t\t\t<block type=\"ApagarComputadora\" id=\"iR{[:q[8r/@*jg9/=//^\" />\n            \t\t\t\t\t</next>\n         \t\t\t\t\t</block>\n     \t\t\t\t\t\t</statement>\n   \t\t\t\t\t</block>\n\t\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta apagar una computadora que ya esta apagada luego de haber instalado un juego',
      errorEsperado: 'Esta computadora ya está apagada',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <variables />\n   <block type=\"al_empezar_a_ejecutar\" id=\"t:SYqPq{bs.BNKDmH.wk\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n         <block type=\"PasarASiguienteComputadora\" id=\"e,)4hv.:V0gkgcpcT=@7\">\n            <next>\n               <block type=\"PrenderComputadora\" id=\"5;*S9+]*@XrvkZ};%99]\">\n                  <next>\n                     <block type=\"EscribirA\" id=\"01R6!qo_|g@ZO!y:sp;I\">\n                        <next>\n                           <block type=\"EscribirB\" id=\"S6Lo+~]f3js1:ORx1l0P\">\n                              <next>\n                                 <block type=\"EscribirC\" id=\"IvsDp]9(QH{u:28}Fo/J\">\n                                    <next>\n                                       <block type=\"InstalarJuego\" id=\"%z2U+O_q.M_+a/C.P%e}\">\n                                          <next>\n                                             <block type=\"ApagarComputadora\" id=\"d@aya8s:mow9pTAMA=mA\">\n                                                <next>\n                                                   <block type=\"ApagarComputadora\" id=\"0!jy:__2hKNhTSaLE5K(\" />\n                                                </next>\n                                             </block>\n                                          </next>\n                                       </block>\n                                    </next>\n                                 </block>\n                              </next>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora en la cual ya se termino de instalar el juego de forma satisfactoria',
      errorEsperado: 'Esta computadora ya fue prendida',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <variables></variables>\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"PasarASiguienteComputadora\">\n        <next>\n          <block type=\"PrenderComputadora\">\n            <next>\n              <block type=\"EscribirA\">\n                <next>\n                  <block type=\"EscribirB\">\n                    <next>\n                      <block type=\"EscribirC\">\n                        <next>\n                          <block type=\"InstalarJuego\">\n                            <next>\n                              <block type=\"ApagarComputadora\">\n                                <next>\n                                  <block type=\"PrenderComputadora\"></block>\n                                </next>\n                              </block>\n                            </next>\n                          </block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaEleccionDelMono-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'LaEleccionDelMono';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <xml xmlns=\"http://www.w3.org/1999/xhtml\">\n     <block type=\"al_empezar_a_ejecutar\" id=\"16\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n        <statement name=\"program\">\n           <block type=\"AvanzarMono\" id=\"20\">\n              <next>\n                 <block type=\"SiNo\" id=\"22\" inline=\"true\">\n                    <value name=\"condition\">\n                       <block type=\"TocandoManzana\" id=\"30\" />\n                    </value>\n                    <statement name=\"block1\">\n                       <block type=\"ComerManzana\" id=\"26\" />\n                    </statement>\n                    <statement name=\"block2\">\n                       <block type=\"ComerBanana\" id=\"34\" />\n                    </statement>\n                 </block>\n              </next>\n           </block>\n        </statement>\n     </block>\n  </xml>",
      descripcionAdicional: 'por Banana',
      cantidadDeActoresAlTerminar: {
        "MonoAnimado": 1
      }
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaFiestaDeDracula-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "LaFiestaDeDracula";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"procedures_callnoreturn\" id=\"3\" inline=\"true\">\n            <mutation name=\"Cambiar foco veces\">\n               <arg name=\"veces\" />\n            </mutation>\n            <value name=\"ARG0\">\n               <block type=\"Numero\" id=\"4\">\n                  <field name=\"NUM\">5</field>\n               </block>\n            </value>\n            <next>\n               <block type=\"SiguienteFoco\" id=\"5\">\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"6\" inline=\"true\">\n                        <mutation name=\"Cambiar foco veces\">\n                           <arg name=\"veces\" />\n                        </mutation>\n                        <value name=\"ARG0\">\n                           <block type=\"Numero\" id=\"7\">\n                              <field name=\"NUM\">8</field>\n                           </block>\n                        </value>\n                        <next>\n                           <block type=\"SiguienteFoco\" id=\"8\">\n                              <next>\n                                 <block type=\"procedures_callnoreturn\" id=\"9\" inline=\"true\">\n                                    <mutation name=\"Cambiar foco veces\">\n                                       <arg name=\"veces\" />\n                                    </mutation>\n                                    <value name=\"ARG0\">\n                                       <block type=\"Numero\" id=\"10\">\n                                          <field name=\"NUM\">12</field>\n                                       </block>\n                                    </value>\n                                    <next>\n                                       <block type=\"EmpezarFiesta\" id=\"11\" />\n                                    </next>\n                                 </block>\n                              </next>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"Procedimiento\" id=\"12\" x=\"23\" y=\"254\">\n      <mutation>\n         <arg name=\"veces\" />\n      </mutation>\n      <field name=\"NAME\">Cambiar foco veces</field>\n      <statement name=\"STACK\">\n         <block type=\"Repetir\" id=\"13\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"param_get\" id=\"14\">\n                  <field name=\"VAR\">veces</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"CambiarColor\" id=\"15\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaGranAventuraDelMarEncantado-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'LaGranAventuraDelMarEncantado';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al dar sombrero sin tenerlo',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t\t\t<statement name=\"program\">\n\t\t\t\t\t <block type=\"MoverACasillaDerecha\" id=\"11\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t <block type=\"DarSombrero\" id=\"24\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t </block>\n\t\t\t\t</statement>\n\t\t </block>\n\t</xml>",
      errorEsperado: 'Para darle el sombrero al mago necesitás sacarlo del cofre.'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t  <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t    <statement name=\"program\">\n\t      <block type=\"procedures_callnoreturn\" id=\"3\">\n\t        <mutation name=\"Buscar llave\"></mutation>\n\t        <next>\n\t          <block type=\"procedures_callnoreturn\" id=\"4\">\n\t            <mutation name=\"Buscar Sombrero\"></mutation>\n\t            <next>\n\t              <block type=\"procedures_callnoreturn\" id=\"5\">\n\t                <mutation name=\"Buscar espada\"></mutation>\n\t                <next>\n\t                  <block type=\"procedures_callnoreturn\" id=\"6\">\n\t                    <mutation name=\"Luchar con el caballero\"></mutation>\n\t                    <next>\n\t                      <block type=\"procedures_callnoreturn\" id=\"7\">\n\t                        <mutation name=\"Rescatar princesa\"></mutation>\n\t                      </block>\n\t                    </next>\n\t                  </block>\n\t                </next>\n\t              </block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"8\" x=\"500\" y=\"-5\">\n\t    <field name=\"NAME\">Buscar Sombrero</field>\n\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t    <statement name=\"STACK\">\n\t      <block type=\"MoverACasillaArriba\" id=\"9\">\n\t        <next>\n\t          <block type=\"repetir\" id=\"10\">\n\t            <value name=\"count\">\n\t              <block type=\"math_number\" id=\"11\">\n\t                <field name=\"NUM\">4</field>\n\t              </block>\n\t            </value>\n\t            <statement name=\"block\">\n\t              <block type=\"MoverACasillaIzquierda\" id=\"12\"></block>\n\t            </statement>\n\t            <next>\n\t              <block type=\"AbrirCofre\" id=\"49\"></block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"13\" x=\"249\" y=\"14\">\n\t    <field name=\"NAME\">Rescatar princesa</field>\n\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t    <statement name=\"STACK\">\n\t      <block type=\"repetir\" id=\"14\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"15\">\n\t            <field name=\"NUM\">2</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaAbajo\" id=\"16\">\n\t            <next>\n\t              <block type=\"MoverACasillaDerecha\" id=\"17\"></block>\n\t            </next>\n\t          </block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"EscaparEnUnicornio\" id=\"18\"></block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"19\" x=\"552\" y=\"138\">\n\t    <field name=\"NAME\">Luchar con el caballero</field>\n\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t    <statement name=\"STACK\">\n\t      <block type=\"repetir\" id=\"20\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"21\">\n\t            <field name=\"NUM\">2</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaArriba\" id=\"22\"></block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"MoverACasillaDerecha\" id=\"23\">\n\t            <next>\n\t              <block type=\"AtacarConEspada\" id=\"24\"></block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"25\" x=\"10\" y=\"274\">\n\t    <field name=\"NAME\">Buscar llave</field>\n\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t    <statement name=\"STACK\">\n\t      <block type=\"repetir\" id=\"26\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"27\">\n\t            <field name=\"NUM\">2</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaArriba\" id=\"28\"></block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"repetir\" id=\"29\">\n\t            <value name=\"count\">\n\t              <block type=\"math_number\" id=\"30\">\n\t                <field name=\"NUM\">4</field>\n\t              </block>\n\t            </value>\n\t            <statement name=\"block\">\n\t              <block type=\"MoverACasillaDerecha\" id=\"31\"></block>\n\t            </statement>\n\t            <next>\n\t              <block type=\"AgarrarLlave\" id=\"73\"></block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t  <block type=\"procedures_defnoreturn\" id=\"32\" x=\"309\" y=\"270\">\n\t    <field name=\"NAME\">Buscar espada</field>\n\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t    <statement name=\"STACK\">\n\t      <block type=\"repetir\" id=\"33\">\n\t        <value name=\"count\">\n\t          <block type=\"math_number\" id=\"34\">\n\t            <field name=\"NUM\">3</field>\n\t          </block>\n\t        </value>\n\t        <statement name=\"block\">\n\t          <block type=\"MoverACasillaAbajo\" id=\"35\"></block>\n\t        </statement>\n\t        <next>\n\t          <block type=\"MoverACasillaDerecha\" id=\"36\">\n\t            <next>\n\t              <block type=\"DarSombrero\" id=\"37\"></block>\n\t            </next>\n\t          </block>\n\t        </next>\n\t      </block>\n\t    </statement>\n\t  </block>\n\t</xml>\n\t"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Solo puede escapar sobre el unicornio',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"procedures_callnoreturn\" id=\"58\">\n            <mutation name=\"Ir a buscar la llave\" />\n            <next>\n               <block type=\"procedures_callnoreturn\" id=\"306\">\n                  <mutation name=\"Ir al Cofre\" />\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"328\">\n                        <mutation name=\"Ir al mago\" />\n                        <next>\n                           <block type=\"procedures_callnoreturn\" id=\"299\">\n                              <mutation name=\"Ir a pelear\" />\n                              <next>\n                                 <block type=\"procedures_callnoreturn\" id=\"292\">\n                                    <mutation name=\"Ir a Escapar\" />\n                                 </block>\n                              </next>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"78\" x=\"233\" y=\"26\">\n      <mutation />\n      <field name=\"NAME\">Ir al Cofre</field>\n      <statement name=\"STACK\">\n         <block type=\"repetir\" id=\"120\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"121\">\n                  <field name=\"NUM\">4</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaIzquierda\" id=\"137\" />\n            </statement>\n            <next>\n               <block type=\"MoverACasillaArriba\" id=\"147\">\n                  <next>\n                     <block type=\"AbrirCofre\" id=\"267\" />\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"3\" x=\"-30\" y=\"191\">\n      <mutation />\n      <field name=\"NAME\">Ir a buscar la llave</field>\n      <statement name=\"STACK\">\n         <block type=\"repetir\" id=\"17\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"18\">\n                  <field name=\"NUM\">4</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaDerecha\" id=\"34\" />\n            </statement>\n            <next>\n               <block type=\"repetir\" id=\"23\" inline=\"true\">\n                  <value name=\"count\">\n                     <block type=\"math_number\" id=\"24\">\n                        <field name=\"NUM\">2</field>\n                     </block>\n                  </value>\n                  <statement name=\"block\">\n                     <block type=\"MoverACasillaArriba\" id=\"46\" />\n                  </statement>\n                  <next>\n                     <block type=\"AgarrarLlave\" id=\"257\" />\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"96\" x=\"252\" y=\"216\">\n      <mutation />\n      <field name=\"NAME\">Ir a pelear</field>\n      <statement name=\"STACK\">\n         <block type=\"MoverACasillaArriba\" id=\"422\">\n            <next>\n               <block type=\"MoverACasillaArriba\" id=\"392\">\n                  <next>\n                     <block type=\"MoverACasillaDerecha\" id=\"402\">\n                        <next>\n                           <block type=\"AtacarConEspada\" id=\"237\" />\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"102\" x=\"223\" y=\"404\">\n      <mutation />\n      <field name=\"NAME\">Ir a Escapar</field>\n      <statement name=\"STACK\">\n         <block type=\"repetir\" id=\"444\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"445\">\n                  <field name=\"NUM\">2</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaAbajo\" id=\"465\" />\n            </statement>\n            <next>\n               <block type=\"EscaparEnUnicornio\" id=\"163\" />\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"82\" x=\"-29\" y=\"448\">\n      <mutation />\n      <field name=\"NAME\">Ir al mago</field>\n      <statement name=\"STACK\">\n         <block type=\"repetir\" id=\"340\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"341\">\n                  <field name=\"NUM\">3</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaAbajo\" id=\"357\" />\n            </statement>\n            <next>\n               <block type=\"MoverACasillaDerecha\" id=\"367\">\n                  <next>\n                     <block type=\"DarSombrero\" id=\"217\" />\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n</xml>",
      errorEsperado: 'Para escapar hace falta un transporte'
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaberintoConQueso-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'LaberintoConQueso';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"hasta\" id=\"51\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoFinCamino\" id=\"61\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"si\" id=\"74\" inline=\"true\">\n                  <value name=\"condition\">\n                     <block type=\"TocandoQueso\" id=\"79\" />\n                  </value>\n                  <statement name=\"block\">\n                     <block type=\"ComerQueso\" id=\"92\" />\n                  </statement>\n                  <next>\n                     <block type=\"SiNo\" id=\"14\" inline=\"true\">\n                        <value name=\"condition\">\n                           <block type=\"TocandoAbajo\" id=\"26\" />\n                        </value>\n                        <statement name=\"block1\">\n                           <block type=\"MoverACasillaAbajo\" id=\"30\" />\n                        </statement>\n                        <statement name=\"block2\">\n                           <block type=\"MoverACasillaDerecha\" id=\"38\" />\n                        </statement>\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaberintoCorto-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'LaberintoCorto';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="23" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="SiNo" id="24" inline="true"><value name="condition"><block type="TocandoAbajo" id="25"></block></value><statement name="block1"><block type="MoverACasillaAbajo" id="26"></block></statement><statement name="block2"><block type="MoverACasillaDerecha" id="27"></block></statement></block></statement></block></xml>'
    });
  });
});
define("pilasbloques/tests/integration/desafios/LaberintoLargo-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'LaberintoLargo';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="88" inline="true"><value name="count"><block type="math_number" id="89"><field name="NUM">14</field></block></value><statement name="block"><block type="SiNo" id="10" inline="true"><value name="condition"><block type="TocandoAbajo" id="24"></block></value><statement name="block1"><block type="MoverACasillaAbajo" id="27"></block></statement><statement name="block2"><block type="MoverACasillaDerecha" id="55"></block></statement></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer avanzar hacia la derecha cuando ya no hay camino',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">14</field></block></value><statement name="block"><block type="SiNo" id="5" inline="true"><value name="condition"><block type="TocandoAbajo" id="6"></block></value><statement name="block1"><block type="MoverACasillaAbajo" id="7"></block></statement><statement name="block2"><block type="MoverACasillaDerecha" id="8"></block></statement></block></statement><next><block type="MoverACasillaDerecha" id="11"></block></next></block></statement></block></xml>',
      errorEsperado: 'No puedo ir para la derecha'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Debe dar error si se intenta preguntar en la meta final',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="11" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="12" inline="true"><value name="count"><block type="math_number" id="13"><field name="NUM">14</field></block></value><statement name="block"><block type="si" id="20" inline="true"><value name="condition"><block type="TocandoAbajo" id="15"></block></value><statement name="block"><block type="MoverACasillaAbajo" id="16"></block></statement><next><block type="si" id="23" inline="true"><value name="condition"><block type="TocandoDerecha" id="34"></block></value><statement name="block"><block type="MoverACasillaDerecha" id="17"></block></statement></block></next></block></statement></block></statement></block></xml>',
      errorEsperado: 'No se puede preguntar más, ya estoy al final del camino'
    });
  });
});
define("pilasbloques/tests/integration/desafios/MariaLaComeSandias-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'MariaLaComeSandias';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="78" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="87"><mutation name="Morder todas las filas"></mutation><next><block type="procedures_callnoreturn" id="91"><mutation name="Morder columna final"></mutation></block></next></block></statement></block><block type="procedures_defnoreturn" id="95" x="8" y="176"><mutation></mutation><field name="NAME">Morder fila de sandias</field><statement name="STACK"><block type="Repetir" id="115" inline="true"><value name="count"><block type="math_number" id="116"><field name="NUM">5</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="134"><next><block type="MorderSandia" id="140"></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" id="100" x="382" y="175"><mutation></mutation><field name="NAME">Volver al borde izquierdo</field><statement name="STACK"><block type="Repetir" id="119" inline="true"><value name="count"><block type="math_number" id="120"><field name="NUM">5</field></block></value><statement name="block"><block type="MoverACasillaIzquierda" id="146"></block></statement></block></statement></block><block type="procedures_defnoreturn" id="106" x="739" y="171"><mutation></mutation><field name="NAME">Siguiente fila</field><statement name="STACK"><block type="procedures_callnoreturn" id="153"><mutation name="Volver al borde izquierdo"></mutation><next><block type="MoverACasillaArriba" id="159"><next><block type="MoverACasillaArriba" id="165"></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="80" x="10" y="345"><mutation></mutation><field name="NAME">Morder todas las filas</field><statement name="STACK"><block type="Repetir" id="123" inline="true"><value name="count"><block type="math_number" id="124"><field name="NUM">2</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="172"><mutation name="Morder fila de sandias"></mutation><next><block type="procedures_callnoreturn" id="179"><mutation name="Siguiente fila"></mutation></block></next></block></statement><next><block type="procedures_callnoreturn" id="186"><mutation name="Morder fila de sandias"></mutation><next><block type="procedures_callnoreturn" id="193"><mutation name="Volver al borde izquierdo"></mutation></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="83" x="386" y="349"><mutation></mutation><field name="NAME">Morder columna final</field><statement name="STACK"><block type="Repetir" id="127" inline="true"><value name="count"><block type="math_number" id="128"><field name="NUM">4</field></block></value><statement name="block"><block type="MorderSandia" id="199"><next><block type="MoverACasillaAbajo" id="210"></block></next></block></statement><next><block type="MorderSandia" id="216"></block></next></block></statement></block></xml>'
    });
  });
});
define("pilasbloques/tests/integration/desafios/NoMeCansoDeSaltar-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'NoMeCansoDeSaltar';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    // Solución esperada. Usa el bloque Repetir
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="13" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="14" inline="true"><value name="count"><block type="math_number" id="15"><field name="NUM">30</field></block></value><statement name="block"><block type="SaltarHablando" id="16"></block></statement></block></statement></block></xml>'
    }); // Solución alternativa donde no usa el bloque Repetir y ejecuta 30 bloques saltar seguidos.

    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="46" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="SaltarHablando" id="109"><next><block type="SaltarHablando" id="107"><next><block type="SaltarHablando" id="105"><next><block type="SaltarHablando" id="103"><next><block type="SaltarHablando" id="101"><next><block type="SaltarHablando" id="99"><next><block type="SaltarHablando" id="97"><next><block type="SaltarHablando" id="95"><next><block type="SaltarHablando" id="93"><next><block type="SaltarHablando" id="91"><next><block type="SaltarHablando" id="89"><next><block type="SaltarHablando" id="87"><next><block type="SaltarHablando" id="85"><next><block type="SaltarHablando" id="83"><next><block type="SaltarHablando" id="81"><next><block type="SaltarHablando" id="79"><next><block type="SaltarHablando" id="77"><next><block type="SaltarHablando" id="75"><next><block type="SaltarHablando" id="73"><next><block type="SaltarHablando" id="71"><next><block type="SaltarHablando" id="69"><next><block type="SaltarHablando" id="67"><next><block type="SaltarHablando" id="65"><next><block type="SaltarHablando" id="63"><next><block type="SaltarHablando" id="61"><next><block type="SaltarHablando" id="59"><next><block type="SaltarHablando" id="57"><next><block type="SaltarHablando" id="55"><next><block type="SaltarHablando" id="51"><next><block type="SaltarHablando" id="53"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer saltar más de 30 veces',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="4" inline="true"><value name="count"><block type="math_number" id="5"><field name="NUM">31</field></block></value><statement name="block"><block type="SaltarHablando" id="7"></block></statement></block></statement></block></xml>',
      errorEsperado: '¡Uy! Salté mucho... ¡Me pasé!'
    });
  });
});
define("pilasbloques/tests/integration/desafios/PrendiendoLasCompus-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'PrendiendoLasCompus';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"procedures_callnoreturn\" id=\"114\">\n\t\t\t\t<mutation name=\"Prender hacia derecha\" />\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"120\">\n\t\t\t\t\t  <mutation name=\"Prender hacia abajo\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"procedures_callnoreturn\" id=\"132\">\n\t\t\t\t\t\t\t<mutation name=\"prender hacia izquierda\" />\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"126\">\n\t\t\t\t\t\t\t\t  <mutation name=\"prender hacia arriba\" />\n\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"32\" x=\"263\" y=\"32\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Prender hacia derecha</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"MoverACasillaDerecha\" id=\"202\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"hasta\" id=\"60\" inline=\"true\">\n\t\t\t\t\t  <value name=\"condition\">\n\t\t\t\t\t\t <block type=\"EstoyEnEsquina\" id=\"62\" />\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"68\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"MoverACasillaDerecha\" id=\"79\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"44\" x=\"10\" y=\"172\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">prender hacia arriba</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"MoverACasillaArriba\" id=\"208\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"hasta\" id=\"147\" inline=\"true\">\n\t\t\t\t\t  <value name=\"condition\">\n\t\t\t\t\t\t <block type=\"EstoyEnEsquina\" id=\"149\" />\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"178\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"MoverACasillaArriba\" id=\"172\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"35\" x=\"260\" y=\"265\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Prender hacia abajo</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"MoverACasillaAbajo\" id=\"214\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"hasta\" id=\"85\" inline=\"true\">\n\t\t\t\t\t  <value name=\"condition\">\n\t\t\t\t\t\t <block type=\"EstoyEnEsquina\" id=\"91\" />\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"108\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"MoverACasillaAbajo\" id=\"97\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"39\" x=\"128\" y=\"355\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">prender hacia izquierda</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"MoverACasillaIzquierda\" id=\"221\">\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"hasta\" id=\"154\" inline=\"true\">\n\t\t\t\t\t  <value name=\"condition\">\n\t\t\t\t\t\t <block type=\"EstoyEnEsquina\" id=\"156\" />\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"184\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"MoverACasillaIzquierda\" id=\"195\" />\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora donde no hay',
      errorEsperado: 'No hay una computadora aquí',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t<variables />\n   \t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"f??M^^OalsGN9_LMY{!8\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t<statement name=\"program\">\n         \t\t\t\t\t<block type=\"PrenderComputadora\" id=\"0h,Qgm8I1;Z5CLtd[U(4\" />\n      \t\t\t\t\t</statement>\n\t\t\t\t\t   </block>\n\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora que ya esta prendida',
      errorEsperado: 'Esta computadora ya fue prendida',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="m]4qN#uBu1{*2RN{P7b/" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="MoverACasillaAbajo" id="Vcm9$Ds4ZHA8.%cgUoL3"><next><block type="PrenderComputadora" id="G(LhjH54n`MKDK:OMZ=A"><next><block type="PrenderComputadora" id="ob^9-_ZqX[Jc)c#+jt}F"></block></next></block></next></block></statement></block></xml>'
    });
  });
});
define("pilasbloques/tests/integration/desafios/PrendiendoLasCompusParametrizado-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'PrendiendoLasCompusParametrizado';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "\n\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t    <statement name=\"program\">\n\t\t      <block type=\"procedures_callnoreturn\" id=\"46\">\n\t\t        <mutation name=\"Prender compus hacia\">\n\t\t          <arg name=\"direccion\"></arg>\n\t\t        </mutation>\n\t\t        <value name=\"ARG0\">\n\t\t          <block type=\"ParaLaDerecha\" id=\"61\"></block>\n\t\t        </value>\n\t\t        <next>\n\t\t          <block type=\"procedures_callnoreturn\" id=\"64\">\n\t\t            <mutation name=\"Prender compus hacia\">\n\t\t              <arg name=\"direccion\"></arg>\n\t\t            </mutation>\n\t\t            <value name=\"ARG0\">\n\t\t              <block type=\"ParaAbajo\" id=\"72\"></block>\n\t\t            </value>\n\t\t            <next>\n\t\t              <block type=\"procedures_callnoreturn\" id=\"77\">\n\t\t                <mutation name=\"Prender compus hacia\">\n\t\t                  <arg name=\"direccion\"></arg>\n\t\t                </mutation>\n\t\t                <value name=\"ARG0\">\n\t\t                  <block type=\"ParaLaIzquierda\" id=\"83\"></block>\n\t\t                </value>\n\t\t                <next>\n\t\t                  <block type=\"procedures_callnoreturn\" id=\"92\">\n\t\t                    <mutation name=\"Prender compus hacia\">\n\t\t                      <arg name=\"direccion\"></arg>\n\t\t                    </mutation>\n\t\t                    <value name=\"ARG0\">\n\t\t                      <block type=\"ParaArriba\" id=\"89\"></block>\n\t\t                    </value>\n\t\t                  </block>\n\t\t                </next>\n\t\t              </block>\n\t\t            </next>\n\t\t          </block>\n\t\t        </next>\n\t\t      </block>\n\t\t    </statement>\n\t\t  </block>\n\t\t  <block type=\"procedures_defnoreturn\" id=\"18\" x=\"7\" y=\"207\">\n\t\t    <mutation>\n\t\t      <arg name=\"direccion\"></arg>\n\t\t    </mutation>\n\t\t    <field name=\"NAME\">Prender compus hacia</field>\n\t\t    <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n\t\t    <statement name=\"STACK\">\n\t\t      <block type=\"MoverA\" id=\"95\">\n\t\t        <value name=\"direccion\">\n\t\t          <block type=\"param_get\" id=\"99\">\n\t\t            <field name=\"VAR\">direccion</field>\n\t\t          </block>\n\t\t        </value>\n\t\t        <next>\n\t\t          <block type=\"hasta\" id=\"29\">\n\t\t            <value name=\"condition\">\n\t\t              <block type=\"EstoyEnEsquina\" id=\"31\"></block>\n\t\t            </value>\n\t\t            <statement name=\"block\">\n\t\t              <block type=\"PrenderComputadora\" id=\"41\">\n\t\t                <next>\n\t\t                  <block type=\"MoverA\" id=\"34\">\n\t\t                    <value name=\"direccion\">\n\t\t                      <block type=\"param_get\" id=\"38\">\n\t\t                        <field name=\"VAR\">direccion</field>\n\t\t                      </block>\n\t\t                    </value>\n\t\t                  </block>\n\t\t                </next>\n\t\t              </block>\n\t\t            </statement>\n\t\t          </block>\n\t\t        </next>\n\t\t      </block>\n\t\t    </statement>\n\t\t  </block>\n\t\t</xml>\n\t"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora donde no hay',
      errorEsperado: 'No hay una computadora aquí',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t\t\t\t\t\t\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   \t\t\t\t\t\t\t<variables />\n  \t \t\t\t\t\t\t<block type=\"al_empezar_a_ejecutar\" id=\"IAu_wXvP7R@SfU%v^Vtk\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      \t\t\t\t\t\t<statement name=\"program\">\n        \t\t \t\t\t\t<block type=\"PrenderComputadora\" id=\"zcbpp]rCxf0V_fAjI_B,\" />\n      \t\t\t\t\t\t</statement>\n   \t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error si se intenta prender una computadora que ya esta prendida',
      errorEsperado: 'Esta computadora ya fue prendida',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t\t <variables />\n\t\t <block type=\"al_empezar_a_ejecutar\" id=\"i(OI|s9pE2Qvpapiwd/6\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t\t\t\t<statement name=\"program\">\n\t\t\t\t\t <block type=\"MoverA\" id=\"|]=Mhkm?SiH~~(CmXm5A\">\n\t\t\t\t\t\t\t<value name=\"direccion\">\n\t\t\t\t\t\t\t\t <block type=\"ParaAbajo\" id=\"G({j[b8r$e.%v_}Y{wri\" />\n\t\t\t\t\t\t\t</value>\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"eKE{4Vs^$=VZ;T-Ze!0M\">\n\t\t\t\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t\t\t\t\t <block type=\"PrenderComputadora\" id=\"hn_h}miHQ6Jo9Ng_t5Zt\" />\n\t\t\t\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t\t\t </block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t </block>\n\t\t\t\t</statement>\n\t\t </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/PrendiendoLasFogatas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'PrendiendoLasFogatas';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n  <xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"procedures_callnoreturn\" id=\"3\" inline=\"true\">\n            <mutation name=\"Avanzar prendiendo hacia\">\n               <arg name=\"direccion\" />\n            </mutation>\n            <value name=\"ARG0\">\n               <block type=\"ParaLaDerecha\" id=\"47\" />\n            </value>\n            <next>\n               <block type=\"procedures_callnoreturn\" id=\"4\" inline=\"true\">\n                  <mutation name=\"Avanzar prendiendo hacia\">\n                     <arg name=\"direccion\" />\n                  </mutation>\n                  <value name=\"ARG0\">\n                     <block type=\"ParaAbajo\" id=\"65\" />\n                  </value>\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"5\" inline=\"true\">\n                        <mutation name=\"Avanzar prendiendo hacia\">\n                           <arg name=\"direccion\" />\n                        </mutation>\n                        <value name=\"ARG0\">\n                           <block type=\"ParaLaIzquierda\" id=\"53\" />\n                        </value>\n                        <next>\n                           <block type=\"procedures_callnoreturn\" id=\"6\" inline=\"true\">\n                              <mutation name=\"Avanzar prendiendo hacia\">\n                                 <arg name=\"direccion\" />\n                              </mutation>\n                              <value name=\"ARG0\">\n                                 <block type=\"ParaArriba\" id=\"77\" />\n                              </value>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"7\" x=\"25\" y=\"238\">\n      <mutation>\n         <arg name=\"direccion\" />\n      </mutation>\n      <field name=\"NAME\">Avanzar prendiendo hacia</field>\n      <statement name=\"STACK\">\n         <block type=\"Repetir\" id=\"8\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"9\">\n                  <field name=\"NUM\">6</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"procedures_callnoreturn\" id=\"10\" inline=\"true\">\n                  <mutation name=\"Avanzar hacia\">\n                     <arg name=\"direccion\" />\n                  </mutation>\n                  <value name=\"ARG0\">\n                     <block type=\"param_get\" id=\"11\">\n                        <field name=\"VAR\">direccion</field>\n                     </block>\n                  </value>\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"12\">\n                        <mutation name=\"Prender si hay fogata\" />\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"13\" x=\"270\" y=\"363\">\n      <mutation />\n      <field name=\"NAME\">Prender si hay fogata</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"14\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoFogata\" id=\"15\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"PrenderFogata\" id=\"16\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"17\" x=\"1\" y=\"514\">\n      <mutation>\n         <arg name=\"direccion\" />\n      </mutation>\n      <field name=\"NAME\">Avanzar hacia</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"18\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"logic_compare\" id=\"19\" inline=\"true\">\n                  <field name=\"OP\">EQ</field>\n                  <value name=\"A\">\n                     <block type=\"param_get\" id=\"20\">\n                        <field name=\"VAR\">direccion</field>\n                     </block>\n                  </value>\n                  <value name=\"B\">\n                     <block type=\"ParaLaDerecha\" id=\"93\" />\n                  </value>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaDerecha\" id=\"22\" />\n            </statement>\n            <next>\n               <block type=\"si\" id=\"23\" inline=\"true\">\n                  <value name=\"condition\">\n                     <block type=\"logic_compare\" id=\"24\" inline=\"true\">\n                        <field name=\"OP\">EQ</field>\n                        <value name=\"A\">\n                           <block type=\"param_get\" id=\"25\">\n                              <field name=\"VAR\">direccion</field>\n                           </block>\n                        </value>\n                        <value name=\"B\">\n                           <block type=\"ParaLaIzquierda\" id=\"99\" />\n                        </value>\n                     </block>\n                  </value>\n                  <statement name=\"block\">\n                     <block type=\"MoverACasillaIzquierda\" id=\"27\" />\n                  </statement>\n                  <next>\n                     <block type=\"si\" id=\"28\" inline=\"true\">\n                        <value name=\"condition\">\n                           <block type=\"logic_compare\" id=\"29\" inline=\"true\">\n                              <field name=\"OP\">EQ</field>\n                              <value name=\"A\">\n                                 <block type=\"param_get\" id=\"30\">\n                                    <field name=\"VAR\">direccion</field>\n                                 </block>\n                              </value>\n                              <value name=\"B\">\n                                 <block type=\"ParaArriba\" id=\"105\" />\n                              </value>\n                           </block>\n                        </value>\n                        <statement name=\"block\">\n                           <block type=\"MoverACasillaArriba\" id=\"32\" />\n                        </statement>\n                        <next>\n                           <block type=\"si\" id=\"33\" inline=\"true\">\n                              <value name=\"condition\">\n                                 <block type=\"logic_compare\" id=\"34\" inline=\"true\">\n                                    <field name=\"OP\">EQ</field>\n                                    <value name=\"A\">\n                                       <block type=\"param_get\" id=\"35\">\n                                          <field name=\"VAR\">direccion</field>\n                                       </block>\n                                    </value>\n                                    <value name=\"B\">\n                                       <block type=\"ParaAbajo\" id=\"111\" />\n                                    </value>\n                                 </block>\n                              </value>\n                              <statement name=\"block\">\n                                 <block type=\"MoverACasillaAbajo\" id=\"37\" />\n                              </statement>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer avanzar hacia la izquierda si no hay camino',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n              <xml xmlns=\"http://www.w3.org/1999/xhtml\">\n                <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n                  <statement name=\"program\">\n                  <block type=\"MoverACasillaIzquierda\" id=\"32\" />\n                </statement>\n                </block>\n              </xml>",
      errorEsperado: 'No puedo ir para la izquierda'
    });
  });
});
define("pilasbloques/tests/integration/desafios/ReparandoLaNave-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'ReparandoLaNave';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="3" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="4" inline="true"><value name="count"><block type="math_number" id="5"><field name="NUM">3</field></block></value><statement name="block"><block type="procedures_callnoreturn" id="6"><mutation name="Buscar Hierro y volver"></mutation><next><block type="procedures_callnoreturn" id="7"><mutation name="Buscar Carbón y volver"></mutation></block></next></block></statement><next><block type="Escapar" id="8"></block></next></block></statement></block><block type="procedures_defnoreturn" id="9" x="344" y="6"><mutation></mutation><field name="NAME">Buscar Hierro y volver</field><statement name="STACK"><block type="Repetir" id="10" inline="true"><value name="count"><block type="math_number" id="11"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="12"></block></statement><next><block type="TomarHierro" id="13"><next><block type="Repetir" id="14" inline="true"><value name="count"><block type="math_number" id="15"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="16"></block></statement><next><block type="Depositar" id="17"></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="18" x="35" y="199"><mutation></mutation><field name="NAME">Buscar Carbón y volver</field><statement name="STACK"><block type="Repetir" id="19" inline="true"><value name="count"><block type="math_number" id="20"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="21"></block></statement><next><block type="Repetir" id="22" inline="true"><value name="count"><block type="math_number" id="23"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaArriba" id="24"></block></statement><next><block type="TomarCarbon" id="25"><next><block type="Repetir" id="26" inline="true"><value name="count"><block type="math_number" id="27"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="28"></block></statement><next><block type="Repetir" id="29" inline="true"><value name="count"><block type="math_number" id="30"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaIzquierda" id="31"></block></statement><next><block type="Depositar" id="40"></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al depositar cuando no tengo nada',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="25" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Depositar" id="34"></block></statement></block></xml>',
      errorEsperado: 'No tengo nada en la mano'
    });
  });
});
define("pilasbloques/tests/integration/desafios/SalvandoLaNavidad-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = "SalvandoLaNavidad";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"procedures_callnoreturn\" id=\"123\" inline=\"true\">\n            <mutation name=\"dejar regalos en fila\">\n               <arg name=\"cant. casilleros\" />\n            </mutation>\n            <value name=\"ARG0\">\n               <block type=\"math_number\" id=\"125\">\n                  <field name=\"NUM\">4</field>\n               </block>\n            </value>\n            <next>\n               <block type=\"SiguienteFilaTotal\" id=\"79\">\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"82\" inline=\"true\">\n                        <mutation name=\"dejar regalos en fila\">\n                           <arg name=\"cant. casilleros\" />\n                        </mutation>\n                        <value name=\"ARG0\">\n                           <block type=\"math_number\" id=\"84\">\n                              <field name=\"NUM\">5</field>\n                           </block>\n                        </value>\n                        <next>\n                           <block type=\"SiguienteFilaTotal\" id=\"88\">\n                              <next>\n                                 <block type=\"procedures_callnoreturn\" id=\"99\" inline=\"true\">\n                                    <mutation name=\"dejar regalos en fila\">\n                                       <arg name=\"cant. casilleros\" />\n                                    </mutation>\n                                    <value name=\"ARG0\">\n                                       <block type=\"math_number\" id=\"115\">\n                                          <field name=\"NUM\">7</field>\n                                       </block>\n                                    </value>\n                                    <next>\n                                       <block type=\"SiguienteFilaTotal\" id=\"96\">\n                                          <next>\n                                             <block type=\"procedures_callnoreturn\" id=\"102\" inline=\"true\">\n                                                <mutation name=\"dejar regalos en fila\">\n                                                   <arg name=\"cant. casilleros\" />\n                                                </mutation>\n                                                <value name=\"ARG0\">\n                                                   <block type=\"math_number\" id=\"113\">\n                                                      <field name=\"NUM\">3</field>\n                                                   </block>\n                                                </value>\n                                                <next>\n                                                   <block type=\"SiguienteFilaTotal\" id=\"92\">\n                                                      <next>\n                                                         <block type=\"procedures_callnoreturn\" id=\"105\" inline=\"true\">\n                                                            <mutation name=\"dejar regalos en fila\">\n                                                               <arg name=\"cant. casilleros\" />\n                                                            </mutation>\n                                                            <value name=\"ARG0\">\n                                                               <block type=\"math_number\" id=\"111\">\n                                                                  <field name=\"NUM\">6</field>\n                                                               </block>\n                                                            </value>\n                                                         </block>\n                                                      </next>\n                                                   </block>\n                                                </next>\n                                             </block>\n                                          </next>\n                                       </block>\n                                    </next>\n                                 </block>\n                              </next>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"38\" x=\"1\" y=\"342\">\n      <mutation>\n         <arg name=\"cant. casilleros\" />\n      </mutation>\n      <field name=\"NAME\">dejar regalos en fila</field>\n      <statement name=\"STACK\">\n         <block type=\"Repetir\" id=\"51\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"param_get\" id=\"56\">\n                  <field name=\"VAR\">cant. casilleros</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverACasillaDerecha\" id=\"60\" />\n            </statement>\n            <next>\n               <block type=\"DejarRegalo\" id=\"66\" />\n            </next>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/SuperTito1-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'SuperTito1';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"11\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"hasta\" id=\"21\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoFinal\" id=\"24\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"EncenderLuz\" id=\"27\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"MoverACasillaAbajo\" id=\"30\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/SuperTito2-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'SuperTito2';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"76\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"hasta\" id=\"77\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoFinal\" id=\"78\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"79\">\n\t\t\t\t\t  <mutation name=\"Prender si hay luz\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"MoverACasillaAbajo\" id=\"87\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"81\" x=\"-8\" y=\"184\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Prender si hay luz</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"si\" id=\"82\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoLuz\" id=\"83\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"EncenderLuz\" id=\"84\" />\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/TitoCuadrado-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  let nombre = "TitoCuadrado";
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n   <block type=\"al_empezar_a_ejecutar\" id=\"13\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n      <statement name=\"program\">\n         <block type=\"procedures_callnoreturn\" id=\"14\" inline=\"true\">\n            <mutation name=\"Prender luces hacia\">\n               <arg name=\"direccion\" />\n            </mutation>\n            <value name=\"ARG0\">\n               <block type=\"ParaLaDerecha\" id=\"15\" />\n            </value>\n            <next>\n               <block type=\"procedures_callnoreturn\" id=\"20\" inline=\"true\">\n                  <mutation name=\"Prender luces hacia\">\n                     <arg name=\"direccion\" />\n                  </mutation>\n                  <value name=\"ARG0\">\n                     <block type=\"ParaAbajo\" id=\"21\" />\n                  </value>\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"16\" inline=\"true\">\n                        <mutation name=\"Prender luces hacia\">\n                           <arg name=\"direccion\" />\n                        </mutation>\n                        <value name=\"ARG0\">\n                           <block type=\"ParaLaIzquierda\" id=\"17\" />\n                        </value>\n                        <next>\n                           <block type=\"procedures_callnoreturn\" id=\"18\" inline=\"true\">\n                              <mutation name=\"Prender luces hacia\">\n                                 <arg name=\"direccion\" />\n                              </mutation>\n                              <value name=\"ARG0\">\n                                 <block type=\"ParaArriba\" id=\"19\" />\n                              </value>\n                           </block>\n                        </next>\n                     </block>\n                  </next>\n               </block>\n            </next>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"22\" x=\"0\" y=\"196\">\n      <mutation>\n         <arg name=\"direccion\" />\n      </mutation>\n      <field name=\"NAME\">Prender luces hacia</field>\n      <statement name=\"STACK\">\n         <block type=\"Repetir\" id=\"23\" inline=\"true\">\n            <value name=\"count\">\n               <block type=\"math_number\" id=\"24\">\n                  <field name=\"NUM\">6</field>\n               </block>\n            </value>\n            <statement name=\"block\">\n               <block type=\"MoverA\" id=\"25\" inline=\"true\">\n                  <value name=\"direccion\">\n                     <block type=\"param_get\" id=\"26\">\n                        <field name=\"VAR\">direccion</field>\n                     </block>\n                  </value>\n                  <next>\n                     <block type=\"procedures_callnoreturn\" id=\"27\">\n                        <mutation name=\"Prender luz si hay\" />\n                     </block>\n                  </next>\n               </block>\n            </statement>\n         </block>\n      </statement>\n   </block>\n   <block type=\"procedures_defnoreturn\" id=\"28\" x=\"2\" y=\"363\">\n      <mutation />\n      <field name=\"NAME\">Prender luz si hay</field>\n      <statement name=\"STACK\">\n         <block type=\"si\" id=\"29\" inline=\"true\">\n            <value name=\"condition\">\n               <block type=\"TocandoLuz\" id=\"30\" />\n            </value>\n            <statement name=\"block\">\n               <block type=\"EncenderLuz\" id=\"31\" />\n            </statement>\n         </block>\n      </statement>\n   </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/TitoEnciendeLasLuces-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'TitoEnciendeLuces';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="45" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="MoverACasillaArriba" id="115"><next><block type="procedures_callnoreturn" id="59"><mutation name="encender diagonal"></mutation><next><block type="procedures_callnoreturn" id="144"><mutation name="acomodarse en la otra diagonal"></mutation><next><block type="procedures_callnoreturn" id="156"><mutation name="encender diagonal"></mutation></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="56" x="22" y="172"><mutation></mutation><field name="NAME">encender diagonal</field><statement name="STACK"><block type="Repetir" id="76" inline="true"><value name="count"><block type="math_number" id="77"><field name="NUM">3</field></block></value><statement name="block"><block type="EncenderLuz" id="65"><next><block type="MoverACasillaDerecha" id="86"><next><block type="MoverACasillaArriba" id="92"></block></next></block></next></block></statement><next><block type="EncenderLuz" id="98"></block></next></block></statement></block><block type="procedures_defnoreturn" id="109" x="22" y="380"><mutation></mutation><field name="NAME">acomodarse en la otra diagonal</field><statement name="STACK"><block type="Repetir" id="122" inline="true"><value name="count"><block type="math_number" id="123"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id="129"></block></statement><next><block type="MoverACasillaIzquierda" id="135"></block></next></block></statement></block></xml>'
    });
  });
});
define("pilasbloques/tests/integration/desafios/TitoRecargado-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'TitoRecargado';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"Repetir\" id=\"13\" inline=\"true\">\n\t\t\t\t<value name=\"count\">\n\t\t\t\t   <block type=\"math_number\" id=\"14\">\n\t\t\t\t\t  <field name=\"NUM\">6</field>\n\t\t\t\t   </block>\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"25\">\n\t\t\t\t\t  <mutation name=\"Prender si es luz\" />\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t <block type=\"MoverACasillaAbajo\" id=\"22\" />\n\t\t\t\t\t  </next>\n\t\t\t\t   </block>\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"4\" x=\"445\" y=\"11\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Prender si es luz</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"si\" id=\"9\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoLuz\" id=\"16\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"EncenderLuz\" id=\"19\" />\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'La actividad no está resuelta si no estoy al final',
      solucion: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\t<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t   <block type=\"al_empezar_a_ejecutar\" id=\"2\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n\t\t  <statement name=\"program\">\n\t\t\t <block type=\"procedures_callnoreturn\" id=\"60\">\n\t\t\t\t<mutation name=\"Prender luz si esta apagada\" />\n\t\t\t\t<next>\n\t\t\t\t   <block type=\"Repetir\" id=\"45\" inline=\"true\">\n\t\t\t\t\t  <value name=\"count\">\n\t\t\t\t\t\t <block type=\"math_number\" id=\"46\">\n\t\t\t\t\t\t\t<field name=\"NUM\">5</field>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </value>\n\t\t\t\t\t  <statement name=\"block\">\n\t\t\t\t\t\t <block type=\"MoverACasillaAbajo\" id=\"24\">\n\t\t\t\t\t\t\t<next>\n\t\t\t\t\t\t\t   <block type=\"procedures_callnoreturn\" id=\"38\">\n\t\t\t\t\t\t\t\t  <mutation name=\"Prender luz si esta apagada\" />\n\t\t\t\t\t\t\t   </block>\n\t\t\t\t\t\t\t</next>\n\t\t\t\t\t\t </block>\n\t\t\t\t\t  </statement>\n\t\t\t\t   </block>\n\t\t\t\t</next>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t   <block type=\"procedures_defnoreturn\" id=\"13\" x=\"0\" y=\"194\">\n\t\t  <mutation />\n\t\t  <field name=\"NAME\">Prender luz si esta apagada</field>\n\t\t  <statement name=\"STACK\">\n\t\t\t <block type=\"si\" id=\"35\" inline=\"true\">\n\t\t\t\t<value name=\"condition\">\n\t\t\t\t   <block type=\"TocandoLuz\" id=\"30\" />\n\t\t\t\t</value>\n\t\t\t\t<statement name=\"block\">\n\t\t\t\t   <block type=\"EncenderLuz\" id=\"5\" />\n\t\t\t\t</statement>\n\t\t\t </block>\n\t\t  </statement>\n\t   </block>\n\t</xml>",
      resuelveDesafio: false
    });
  });
});
define("pilasbloques/tests/integration/desafios/TresNaranjas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  const nombre = 'TresNaranjas';
  (0, _actividadTest.moduloActividad)(nombre, () => {
    (0, _actividadTest.actividadTest)(nombre, {
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">3</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="5"><next><block type="Si" id="6" inline="true"><value name="condition"><block type="TocandoNaranja" id="7"></block></value><statement name="block"><block type="ComerNaranja" id="8"></block></statement></block></next></block></statement></block></statement></block></xml>'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'No debe marcar actividad resuelta si todavía no llegué al final',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">2</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="5"><next><block type="si" id="6" inline="true"><value name="condition"><block type="TocandoNaranja" id="7"></block></value><statement name="block"><block type="ComerNaranja" id="8"></block></statement></block></next></block></statement></block></statement></block></xml>',
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Da error al querer avanzar hacia la derecha cuando ya no hay camino',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="2" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="Repetir" id="3" inline="true"><value name="count"><block type="math_number" id="4"><field name="NUM">4</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="5"><next><block type="si" id="6" inline="true"><value name="condition"><block type="TocandoNaranja" id="7"></block></value><statement name="block"><block type="ComerNaranja" id="8"></block></statement></block></next></block></statement></block></statement></block></xml>',
      errorEsperado: 'No puedo ir para la derecha'
    });
    (0, _actividadTest.actividadTest)(nombre, {
      descripcionAdicional: 'Al tener un bloque con un id que contenga el caracter $, deberia funcionar correctamente',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="|6JNA2=.$0V+DuSa+qbd" deletable="false" movable="false" editable="false" x="15" y="15"><statement name="program"><block type="MoverACasillaDerecha" id="%eFKw~*o-wfmLXO6!mj-"><next><block type="procedures_callnoreturn" id="AYf_-:#ke?O[B%eSMVbF"><mutation name="COMER NARANJA SI HAY"></mutation></block></next></block></statement></block><block type="procedures_defnoreturn" id="FMF7V%|312bV)g_h5D9$" x="310" y="26"><field name="NAME">COMER NARANJA SI HAY</field><comment pinned="false" h="80" w="160">Describe esta funcin...</comment><statement name="STACK"><block type="Si" id="Cvp$!KL$T-SjO2Y?kp/e"><value name="condition"><block type="TocandoNaranja" id="UV9d54{l/1o.jiYP+p@5"></block></value><statement name="block"><block type="ComerNaranja" id="dJ5?cn([fcvs%EZr~DEO"></block></statement></block></statement></block></xml>',
      resuelveDesafio: false
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Coty-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Coty", () => {
    (0, _actividadTest.actividadTest)("3.1.3a", {
      descripcionAdicional: 'Coty-3.1.3a',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverDerechaDibujando\">\n        <next>\n          <block type=\"MoverArribaDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"MoverAbajoDibujando\"></block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3b", {
      descripcionAdicional: 'Coty-3.1.3b',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverDerechaDibujando\">\n        <next>\n          <block type=\"MoverDerechaDibujando\">\n            <next>\n              <block type=\"MoverAbajoDibujando\">\n                <next>\n                  <block type=\"MoverAbajoDibujando\">\n                    <next>\n                      <block type=\"MoverIzquierdaDibujando\">\n                        <next>\n                          <block type=\"MoverIzquierdaDibujando\">\n                            <next>\n                              <block type=\"MoverArribaDibujando\">\n                                <next>\n                                  <block type=\"MoverArribaDibujando\"></block>\n                                </next>\n                              </block>\n                            </next>\n                          </block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3c", {
      descripcionAdicional: 'Coty-3.1.3c',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverIzquierdaDibujando\">\n        <next>\n          <block type=\"SaltarIzquierda\">\n            <next>\n              <block type=\"MoverIzquierdaDibujando\">\n                <next>\n                  <block type=\"SaltarIzquierda\">\n                    <next>\n                      <block type=\"MoverIzquierdaDibujando\">\n                        <next>\n                          <block type=\"SaltarIzquierda\"></block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3d", {
      descripcionAdicional: 'Coty-3.1.3d',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"SaltarDerecha\">\n        <next>\n          <block type=\"MoverArribaDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"MoverAbajoDibujando\">\n                    <next>\n                      <block type=\"MoverIzquierdaDibujando\"></block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3e", {
      descripcionAdicional: 'Coty-3.1.3e',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"SaltarAbajo\">\n        <next>\n          <block type=\"MoverAbajoDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"MoverDerechaDibujando\">\n                    <next>\n                      <block type=\"MoverArribaDibujando\">\n                        <next>\n                          <block type=\"MoverIzquierdaDibujando\">\n                            <next>\n                              <block type=\"MoverIzquierdaDibujando\"></block>\n                            </next>\n                          </block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3f", {
      descripcionAdicional: 'Coty-3.1.3f',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"SaltarIzquierda\">\n        <next>\n          <block type=\"MoverAbajoDibujando\">\n            <next>\n              <block type=\"MoverAbajoDibujando\">\n                <next>\n                  <block type=\"SaltarDerecha\">\n                    <next>\n                      <block type=\"SaltarDerecha\">\n                        <next>\n                          <block type=\"MoverArribaDibujando\">\n                            <next>\n                              <block type=\"MoverArribaDibujando\"></block>\n                            </next>\n                          </block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.3g", {
      descripcionAdicional: 'Coty-3.1.3g',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverArribaDibujando\">\n          <next>\n            <block type=\"SaltarArriba\">\n              <next>\n                <block type=\"MoverDerechaDibujando\">\n                  <next>\n                    <block type=\"MoverDerechaDibujando\">\n                      <next>\n                        <block type=\"MoverDerechaDibujando\">\n                          <next>\n                            <block type=\"SaltarArriba\">\n                              <next>\n                                <block type=\"SaltarArriba\">\n                                  <next>\n                                    <block type=\"MoverArribaDibujando\">\n                                      <next>\n                                        <block type=\"MoverDerechaDibujando\"></block>\n                                      </next>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.4a", {
      descripcionAdicional: 'Coty-4.1.4a',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">4</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverDerechaDibujando\">\n            <next>\n              <block type=\"SaltarDerecha\"></block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.4b", {
      descripcionAdicional: 'Coty-4.1.4b',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverDerechaDibujando\">\n        <next>\n          <block type=\"SaltarDerecha\">\n            <next>\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"SaltarDerecha\">\n                    <next>\n                      <block type=\"MoverDerechaDibujando\">\n                        <next>\n                          <block type=\"SaltarDerecha\">\n                            <next>\n                              <block type=\"MoverDerechaDibujando\">\n                                <next>\n                                  <block type=\"MoverAbajoDibujando\"></block>\n                                </next>\n                              </block>\n                            </next>\n                          </block>\n                        </next>\n                      </block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.4c", {
      descripcionAdicional: 'Coty-4.1.4c',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">3</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverArribaDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"MoverDerechaDibujando\"></block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("4.2.3c", {
      descripcionAdicional: 'Coty-4.2.3c',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">4</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverArribaDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\"></block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("4.2.3d", {
      descripcionAdicional: 'Coty-4.2.3d',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">3</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverArribaDibujando\">\n            <next>\n              <block type=\"MoverDerechaDibujando\"></block>\n            </next>\n          </block>\n        </statement>\n        <next>\n          <block type=\"Repetir\">\n            <value name=\"count\">\n              <block type=\"math_number\">\n                <field name=\"NUM\">3</field>\n              </block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"MoverDerechaDibujando\">\n                <next>\n                  <block type=\"MoverAbajoDibujando\"></block>\n                </next>\n              </block>\n            </statement>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.3c", {
      descripcionAdicional: 'Coty-5.1.3c',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"si\">\n        <value name=\"condition\">\n          <block type=\"HayCharco\"></block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"SaltarDerecha\"></block>\n        </statement>\n        <next>\n          <block type=\"MoverDerechaDibujando\">\n            <next>\n              <block type=\"MoverAbajoDibujando\">\n                <next>\n                  <block type=\"MoverIzquierdaDibujando\">\n                    <next>\n                      <block type=\"MoverArribaDibujando\"></block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("CotyDibujoLibre", {
      descripcionAdicional: 'Dibujar de lado debe utilizar el argumento proveniente del bloque',
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="z]I_.b!dcu|1J=@|1T9~" deletable="false" movable="false" editable="false" x="325" y="15"><statement name="program"><block type="DibujarLado" id="/*fS@eM|ud8bthJ-An@P"><value name="longitud"><block type="math_number" id="_nVE{R7YB:6R6@_wVGh3"><field name="NUM">100</field></block></value><next><block type="MoverAbajoDibujando" id="tkOmc`_a2T@OBMMIc2e}"><next><block type="MoverAbajoDibujando" id="4Ms{N#sWk[d8w6Yw-0q|"><next><block type="MoverIzquierdaDibujando" id="?/D{K{1C=DkW*2fF8C@y"><next><block type="MoverIzquierdaDibujando" id="o1JXJ]2sl2#gY^m]yN-d"><next><block type="GirarGrados" id="igLgk25ZFq1tG,Ybax}T"><value name="grados"><block type="math_number" id="/z_N]T1+,OLAv7Ar5N8;"><field name="NUM">270</field></block></value><next><block type="DibujarLado" id="4yJ18jVY+,ylFr.lmH}C"><value name="longitud"><block type="math_number" id="rnp{X#qu-SVX/IuSZx:Y"><field name="NUM">100</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>',
      resuelveDesafio: false
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Duba-AlternativaCondicional-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Duba - Alternativa condicional", () => {
    (0, _actividadTest.actividadTest)("5.1.3a", {
      descripcionAdicional: "5.1.3a: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"si\">\n        <value name=\"condition\">\n          <block type=\"HayChurrasco\"></block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"ComerChurrasco\">\n          </block>\n        </statement>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.3b", {
      descripcionAdicional: "5.1.3b: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"si\">\n        <value name=\"condition\">\n          <block type=\"HayChurrasco\"></block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"ComerChurrasco\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"si\">\n        <value name=\"condition\">\n          <block type=\"HayChurrasco\"></block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"ComerChurrasco\">\n          </block>\n        </statement>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.4b", {
      descripcionAdicional: "5.1.4b: Se puede resolver (solución 1)",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"SiNo\">\n        <value name=\"condition\">\n          <block type=\"HayObstaculoDerecha\"></block>\n        </value>\n        <statement name=\"block1\">\n          <block type=\"MoverACasillaAbajo\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n        </statement>\n        <statement name=\"block2\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.4b", {
      descripcionAdicional: "5.1.4b: Se puede resolver (solución 2)",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"SiNo\">\n        <value name=\"condition\">\n          <block type=\"HayObstaculoAbajo\"></block>\n        </value>\n        <statement name=\"block1\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n          </next>\n          </block>\n        </statement>\n        <statement name=\"block2\">\n          <block type=\"MoverACasillaAbajo\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.4c", {
      descripcionAdicional: "5.1.4c: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"SiNo\">\n        <value name=\"condition\">\n          <block type=\"HayObstaculoDerecha\"></block>\n        </value>\n        <statement name=\"block1\">\n          <block type=\"MoverACasillaArriba\">\n          <next>\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n          </next>\n          </block>\n          </next>\n          </block>\n        </statement>\n        <statement name=\"block2\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.2.1a", {
      descripcionAdicional: "5.2.1a: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">7</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"si\">\n        <value name=\"condition\">\n          <block type=\"HayChurrasco\"></block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"ComerChurrasco\">\n          </block>\n        </statement>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.2.1b", {
      descripcionAdicional: "5.2.1b: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">7</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"si\">\n            <value name=\"condition\">\n              <block type=\"HayChurrasco\"></block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"ComerChurrasco\">\n              </block>\n            </statement>\n          </block>\n          </next>\n          </block>\n        </statement>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Duba-PrimerosProgramas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Duba - Primeros programas", () => {
    (0, _actividadTest.actividadTest)("3.1.2a", {
      descripcionAdicional: "3.1.2a: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaDerecha\" id=\"8[h9[(my?v_@jD)IcuKE\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaDerecha\" id=\"v+,Ok5cc3fDiIKwPAk/4\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"OARN?q)8N!G$yqD~ggLS\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"@q@H9YgNq*KKMvwR1piM\"></block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2a", {
      descripcionAdicional: '2.1.2a: Da error al querer ir hacia un obstáculo para arriba',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\" id=\"[j1z:])m?Mh%?/XP?l[L\">\n        <next>\n          <block type=\"MoverACasillaArriba\" id=\"S-R^yFz^|+NIp(zQ%NQz\"></block>\n        </next>\n      </block>\n    </statement>\n\t</block>\n\t</xml>",
      errorEsperado: '¡Hay un obstáculo!'
    });
    (0, _actividadTest.actividadTest)("3.1.2a", {
      descripcionAdicional: '2.1.2a: Da error al querer ir hacia un obstáculo para abajo',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\" id=\"]1_W/tT]L@3Fen:kZ./o\">\n        <next>\n          <block type=\"MoverACasillaAbajo\" id=\"I=#YBk`DIMK(HwFxND^: \"></block>\n        </next >\n      </block >\n    </statement >\n  </block >\n\t<block type=\"MoverACasillaIzquierda\" id=\"sUjx|1FMK-$Qk*M]r+v0\" disabled=\"true\" x=\"180\" y=\"412\"></block>\n\t</xml>",
      errorEsperado: '¡Hay un obstáculo!'
    });
    (0, _actividadTest.actividadTest)("3.1.2a", {
      descripcionAdicional: '2.1.2a: Da error al querer ir hacia un obstáculo para la izquierda',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\" id=\"[j1z:])m?Mh%?/XP?l[L\">\n        <next>\n          <block type=\"MoverACasillaIzquierda\" id=\"sUjx|1FMK-$Qk*M]r+v0\"></block>\n        </next>\n      </block>\n    </statement>\n  </block>\n\t</xml>",
      errorEsperado: '¡Hay un obstáculo!'
    });
    (0, _actividadTest.actividadTest)("3.1.2a", {
      descripcionAdicional: '2.1.2a: Da error al querer ir hacia un obstáculo para la derecha',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\" id=\"]1_W/tT]L@3Fen:kZ./o\">\n        <next>\n          <block type=\"MoverACasillaDerecha\" id=\"jl?^E$CNB+bTIr6s?Cm:\">\n            <next>\n              <block type=\"MoverACasillaDerecha\" id=\"A`EX-GcDLDQ3: R3^)a1{\n\"></block>\n            </next >\n          </block >\n        </next >\n      </block >\n    </statement >\n  </block >\n\t</xml>",
      errorEsperado: '¡Hay un obstáculo!'
    });
    (0, _actividadTest.actividadTest)("3.1.2b", {
      descripcionAdicional: "3.1.2b: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaDerecha\" id=\"vWmE|Gys1c:mq}x1MZd`\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaArriba\" id=\"blishcLMaS@!CJ/jN2*C\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"v4eE0P;G:4s^0_J)g;aZ\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"1Ung=~(.u7.3|xb=rB}T\"></block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2c", {
      descripcionAdicional: "3.1.2c: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaAbajo\" id=\"!qt`8P39sG1c-Q]vH?_Y\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaDerecha\" id=\",p].T7y2yKjPus:BWD{*\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"Y0f~w(|^hBZd#CDF[r.s\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"fo}s{cSKtXd[[}U_gIYV\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"NUpdF^nWU:j|27,ujCJq\"></block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2d", {
      descripcionAdicional: "3.1.2d: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaAbajo\" id=\"4d^RFl:3Hm3l4}%72ACw\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaAbajo\" id=\"Gn0fSd*`m}f@zd]Oc{/w\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"n0+i)4+X,f9Jq1EtY[_y\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverACasillaAbajo\" id=\"!pg3lRSOp_a|CFYEi3Vc\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"?+W)lEebw*)`.V^6bg$~\"></block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2e", {
      descripcionAdicional: "3.1.2e: Se puede resolver (solución 1)",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaAbajo\" id=\"[R9.}A16EZ4|v*+kAx81\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaAbajo\" id=\"Unq{?$;[gC-|U$*V7ljp\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"bIhb6Dg~ath3ms_.BA(M\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"[3K3sg;Nx(A^z#,K(^9m\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"8`.V6vsJ)0TG}o$m|CFo\"></block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2e", {
      descripcionAdicional: "3.1.2e: Se puede resolver (solución 2)",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaDerecha\" id=\"bIhb6Dg~ath3ms_.BA(M\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaDerecha\" id=\"[3K3sg;Nx(A^z#,K(^9m\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaAbajo\" id=\"[R9.}A16EZ4|v*+kAx81\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverACasillaAbajo\" id=\"Unq{?$;[gC-|U$*V7ljp\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"8`.V6vsJ)0TG}o$m|CFo\"></block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.2f", {
      descripcionAdicional: "3.1.2f: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverACasillaArriba\" id=\"c/ns5YzzTOu52ksu`$fA\">\n\t\t  <next>\n\t\t\t<block type=\"MoverACasillaArriba\" id=\"X!=;kUH]p$;}@N%Ze-c2\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"T0E[i5GoG_?*d$V!=hXv\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverACasillaDerecha\" id=\"^HU+kGMwLLAyseYZEp]1\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"MoverACasillaAbajo\" id=\";|msv)0jl+P(/01!Z(hk\">\n\t\t\t\t\t\t  <next>\n\t\t\t\t\t\t\t<block type=\"ComerChurrasco\" id=\"+1DMZb!Q2.O?L:NZj{K(\"></block>\n\t\t\t\t\t\t  </next>\n\t\t\t\t\t\t</block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n\t</xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.3a", {
      descripcionAdicional: "3.2.3a: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n  <statement name=\"program\">\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"MoverACasillaIzquierda\">\n    <next>\n    <block type=\"MoverACasillaIzquierda\">\n    <next>\n    <block type=\"MoverACasillaAbajo\">\n    <next>\n    <block type=\"MoverACasillaIzquierda\">\n    <next>\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"ComerChurrasco\">\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n  </statement>\n  </block>\n</xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("3.2.3a", {
      descripcionAdicional: "3.2.3a: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.3b", {
      descripcionAdicional: "3.2.3b: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n  <statement name=\"program\">\n    <block type=\"MoverACasillaIzquierda\">\n    <next>\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"ComerChurrasco\">\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n  </statement>\n  </block>\n</xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("3.2.3b", {
      descripcionAdicional: "3.2.3b: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.3c", {
      descripcionAdicional: "3.2.3c: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n  <statement name=\"program\">\n    <block type=\"MoverACasillaAbajo\">\n    <next>\n    <block type=\"MoverACasillaAbajo\">\n    <next>\n    <block type=\"MoverACasillaIzquierda\">\n    <next>\n    <block type=\"MoverACasillaArriba\">\n    <next>\n    <block type=\"ComerChurrasco\">\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n    </next>\n    </block>\n  </statement>\n  </block>\n</xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("3.2.3c", {
      descripcionAdicional: "3.2.3c: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n    </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.3d", {
      descripcionAdicional: "3.2.3d: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("3.2.3d", {
      descripcionAdicional: "3.2.3d: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Duba-Repeticion-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Duba - Repetición", () => {
    (0, _actividadTest.actividadTest)("4.1.3a", {
      descripcionAdicional: "4.1.3a: La solución sin repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.3a", {
      descripcionAdicional: "4.1.3a: La solución con repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">7</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.3b", {
      descripcionAdicional: "4.1.3b: La solución sin repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.3b", {
      descripcionAdicional: "4.1.3b: La solución con repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">6</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaArriba\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.3c", {
      descripcionAdicional: "4.1.3c: La solución sin repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.1.3c", {
      descripcionAdicional: "4.1.3c: La solución con repetición resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">3</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">6</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.2.3a", {
      descripcionAdicional: "4.2.3a: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">4</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaIzquierda\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Acá no hay churrasco!"
    });
    (0, _actividadTest.actividadTest)("4.2.3a", {
      descripcionAdicional: "4.2.3a: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">5</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaIzquierda\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("4.2.3b", {
      descripcionAdicional: "4.2.3b: La solución provista no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">5</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("4.2.3b", {
      descripcionAdicional: "4.2.3b: La solución corregida resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">4</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Lita-AlternativaCondicional-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Lita - Alternativa condicional", () => {
    (0, _actividadTest.actividadTest)("5.1.4a", {
      descripcionAdicional: '5.1.4a: Se puede resolver (solución 1)',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"SiNo\">\n                  <value name=\"condition\">\n                    <block type=\"HayTomate\"></block>\n                  </value>\n                  <statement name=\"block1\">\n                    <block type=\"AgarrarTomate\"></block>\n                  </statement>\n                  <statement name=\"block2\">\n                    <block type=\"AgarrarLechuga\"></block>\n                  </statement>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.4a", {
      descripcionAdicional: '5.1.4a: Se puede resolver (solución 2)',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"SiNo\">\n                  <value name=\"condition\">\n                    <block type=\"HayLechuga\"></block>\n                  </value>\n                  <statement name=\"block1\">\n                    <block type=\"AgarrarLechuga\"></block>\n                  </statement>\n                  <statement name=\"block2\">\n                    <block type=\"AgarrarTomate\"></block>\n                  </statement>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.1.4a", {
      descripcionAdicional: '5.1.4a: Se puede resolver (solución 3)',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"si\">\n                  <value name=\"condition\">\n                    <block type=\"HayLechuga\"></block>\n                  </value>\n                  <statement name=\"block\">\n                    <block type=\"AgarrarLechuga\"></block>\n                  </statement>\n                  <next>\n                    <block type=\"si\">\n                      <value name=\"condition\">\n                        <block type=\"HayTomate\"></block>\n                      </value>\n                      <statement name=\"block\">\n                        <block type=\"AgarrarTomate\"></block>\n                      </statement>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.2.1c", {
      descripcionAdicional: "5.2.1c: Se puede resolver",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">6</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaAbajo\">\n              <next>\n                <block type=\"si\">\n                  <value name=\"condition\">\n                    <block type=\"HayTomate\"></block>\n                  </value>\n                  <statement name=\"block\">\n                    <block type=\"AgarrarTomate\"></block>\n                  </statement>\n                  <next>\n                    <block type=\"si\">\n                      <value name=\"condition\">\n                        <block type=\"HayLechuga\"></block>\n                      </value>\n                      <statement name=\"block\">\n                        <block type=\"AgarrarLechuga\"></block>\n                      </statement>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </statement>\n          <next>\n            <block type=\"MoverACasillaAbajo\">\n              <next>\n                <block type=\"PrepararEnsalada\"></block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    }); // Se necesita implementar un algoritmo de mocking para resolver los tests en donde pueda haber un tomate o una lechuga.

    (0, _actividadTest.actividadTest)("5.2.1c", {
      descripcionAdicional: "3.1.4a: Solo se puede preparar ensalada si hay ensaladera",
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="aeQFM$g(t%`)|=s~[]yA" deletable="false" movable="false" editable="false" x="271" y="15"><statement name="program"><block type="PrepararEnsalada" id="!FM]Q.=?#.H_Yox_6Q.?"></block></statement></block></xml>',
      resuelveDesafio: false,
      errorEsperado: "¡Acá no hay ensaladera!"
    });
    (0, _actividadTest.actividadTest)("5.2.1c", {
      descripcionAdicional: "3.1.4a: No se puede preparar ensalada aun, faltan recoger todas las verduras restantes",
      solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="al_empezar_a_ejecutar" id="m+bao0~F%Q;[seB/+6/3" deletable="false" movable="false" editable="false" x="271" y="15"><statement name="program"><block type="Repetir" id="%6n:[itB,;QL.6sXUuIx"><value name="count"><block type="math_number" id="U.-e{r/vX+Z(A5mz+i5:"><field name="NUM">7</field></block></value><statement name="block"><block type="MoverACasillaAbajo" id=",G_SMDg%CGYuVOpeZBf3"></block></statement><next><block type="PrepararEnsalada" id="Z~_|BigUji_!L?Q-DxdR"></block></next></block></statement></block></xml>',
      resuelveDesafio: false,
      errorEsperado: "¡Todavía me quedan ingredientes por recoger!"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Lita-PrimerosProgramas-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Lita - Primeros programas", () => {
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: '3.1.4a: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"AgarrarTomate\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"AgarrarLechuga\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\">\n                                  <next>\n                                    <block type=\"PrepararEnsalada\"></block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Da error al chocarse un obstáculo",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaIzquierda\"></block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Hay un obstáculo!"
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Hacen falta tomate y lechuga",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"MoverACasillaDerecha\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"MoverACasillaAbajo\">\n                          <next>\n                            <block type=\"PrepararEnsalada\"></block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Todavía me quedan ingredientes por recoger!"
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Hace falta tomate",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"MoverACasillaDerecha\">\n                  <next>\n                    <block type=\"AgarrarLechuga\">\n                      <next>\n                        <block type=\"MoverACasillaDerecha\">\n                          <next>\n                            <block type=\"MoverACasillaAbajo\">\n                              <next>\n                                <block type=\"PrepararEnsalada\"></block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Todavía me queda tomate por recoger!"
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Hace falta lechuga",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"AgarrarTomate\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"MoverACasillaDerecha\">\n                          <next>\n                            <block type=\"MoverACasillaAbajo\">\n                              <next>\n                                <block type=\"PrepararEnsalada\"></block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: '¡Todavía me queda lechuga por recoger!'
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Solo se puede preparar ensalada si hay ensaladera",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"PrepararEnsalada\"></block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Acá no hay ensaladera!"
    });
    (0, _actividadTest.actividadTest)("3.1.4a", {
      descripcionAdicional: "3.1.4a: Se chequea que se haya preparado la ensalada",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"AgarrarTomate\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"AgarrarLechuga\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\"></block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)("3.1.4b", {
      descripcionAdicional: '3.1.4b: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaArriba\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"MoverACasillaDerecha\">\n                  <next>\n                    <block type=\"AgarrarLechuga\">\n                      <next>\n                        <block type=\"MoverACasillaArriba\">\n                          <next>\n                            <block type=\"AgarrarTomate\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\">\n                                  <next>\n                                    <block type=\"MoverACasillaDerecha\">\n                                      <next>\n                                        <block type=\"MoverACasillaDerecha\">\n                                          <next>\n                                            <block type=\"MoverACasillaAbajo\">\n                                              <next>\n                                                <block type=\"PrepararEnsalada\"></block>\n                                              </next>\n                                            </block>\n                                          </next>\n                                        </block>\n                                      </next>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.2a", {
      descripcionAdicional: '3.2.2a: Se puede resolver (solución 1)',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaArriba\">\n              <next>\n                <block type=\"AgarrarLechuga\">\n                  <next>\n                    <block type=\"MoverACasillaAbajo\">\n                      <next>\n                        <block type=\"MoverACasillaAbajo\">\n                          <next>\n                            <block type=\"AgarrarTomate\">\n                              <next>\n                                <block type=\"MoverACasillaArriba\">\n                                  <next>\n                                    <block type=\"MoverACasillaDerecha\">\n                                      <next>\n                                        <block type=\"PrepararEnsalada\"></block>\n                                      </next>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.2a", {
      descripcionAdicional: '3.2.2a: Se puede resolver (solución 2)',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaAbajo\">\n              <next>\n                <block type=\"AgarrarTomate\">\n                  <next>\n                    <block type=\"MoverACasillaArriba\">\n                      <next>\n                        <block type=\"MoverACasillaArriba\">\n                          <next>\n                            <block type=\"AgarrarLechuga\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\">\n                                  <next>\n                                    <block type=\"MoverACasillaDerecha\">\n                                      <next>\n                                        <block type=\"PrepararEnsalada\"></block>\n                                      </next>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.2b", {
      descripcionAdicional: '3.2.3b: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaArriba\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"AgarrarLechuga\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"AgarrarTomate\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\">\n                                  <next>\n                                    <block type=\"PrepararEnsalada\"></block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.2c", {
      descripcionAdicional: '3.2.3c: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaIzquierda\">\n          <next>\n            <block type=\"MoverACasillaAbajo\">\n              <next>\n                <block type=\"AgarrarLechuga\">\n                  <next>\n                    <block type=\"MoverACasillaDerecha\">\n                      <next>\n                        <block type=\"MoverACasillaDerecha\">\n                          <next>\n                            <block type=\"AgarrarTomate\">\n                              <next>\n                                <block type=\"MoverACasillaIzquierda\">\n                                  <next>\n                                    <block type=\"PrepararEnsalada\"></block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.2d", {
      descripcionAdicional: '3.2.3d: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaAbajo\">\n          <next>\n            <block type=\"AgarrarTomate\">\n              <next>\n                <block type=\"MoverACasillaIzquierda\">\n                  <next>\n                    <block type=\"AgarrarLechuga\">\n                      <next>\n                        <block type=\"MoverACasillaAbajo\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"PrepararEnsalada\"></block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.2.3e", {
      descripcionAdicional: '3.2.3e: La solución provista no resuelve el problema',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"MoverACasillaDerecha\">\n                  <next>\n                    <block type=\"AgarrarLechuga\">\n                      <next>\n                        <block type=\"MoverACasillaArriba\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"MoverACasillaAbajo\">\n                                  <next>\n                                    <block type=\"PrepararEnsalada\"></block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: '¡Todavía me queda tomate por recoger!'
    });
    (0, _actividadTest.actividadTest)("3.2.3e", {
      descripcionAdicional: '3.2.3e: La solución correcta resuelve el problema',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"MoverACasillaDerecha\">\n                  <next>\n                    <block type=\"AgarrarLechuga\">\n                      <next>\n                        <block type=\"MoverACasillaArriba\">\n                          <next>\n                            <block type=\"MoverACasillaDerecha\">\n                              <next>\n                                <block type=\"AgarrarTomate\">\n                                  <next>\n                                    <block type=\"MoverACasillaAbajo\">\n                                      <next>\n                                        <block type=\"PrepararEnsalada\"></block>\n                                      </next>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/Lita-Repeticion-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Lita - Repetición", () => {
    (0, _actividadTest.actividadTest)("4.I1a", {
      descripcionAdicional: '4.I1.a: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n        <statement name=\"program\">\n        <block type=\"Repetir\">\n            <value name=\"count\">\n            <block type=\"math_number\">\n                <field name=\"NUM\">3</field>\n            </block>\n            </value>\n            <statement name=\"block\">\n            <block type=\"MoverACasillaIzquierda\">\n                <next>\n                <block type=\"MoverACasillaAbajo\">\n                    <next>\n                    <block type=\"MoverACasillaAbajo\"></block>\n                    </next>\n                </block>\n                </next>\n            </block>\n            </statement>\n            <next>\n            <block type=\"MoverACasillaIzquierda\">\n                <next>\n                <block type=\"AgarrarTomate\">\n                    <next>\n                    <block type=\"MoverACasillaIzquierda\">\n                        <next>\n                        <block type=\"AgarrarLechuga\">\n                            <next>\n                            <block type=\"MoverACasillaIzquierda\">\n                                <next>\n                                <block type=\"PrepararEnsalada\"></block>\n                                </next>\n                            </block>\n                            </next>\n                        </block>\n                        </next>\n                    </block>\n                    </next>\n                </block>\n                </next>\n            </block>\n            </next>\n        </block>\n        </statement>\n    </block>\n    </xml>"
    });
    (0, _actividadTest.actividadTest)("4.I1b", {
      descripcionAdicional: "4.I1b: La solución propuesta no resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"Repetir\" disabled=\"true\" x=\"42\" y=\"-249\">\n        <value name=\"count\">\n        <block type=\"math_number\">\n            <field name=\"NUM\">10</field>\n        </block>\n        </value>\n    </block>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n        <statement name=\"program\">\n        <block type=\"Repetir\">\n            <value name=\"count\">\n            <block type=\"math_number\">\n                <field name=\"NUM\">4</field>\n            </block>\n            </value>\n            <statement name=\"block\">\n            <block type=\"MoverACasillaArriba\"></block>\n            </statement>\n            <next>\n            <block type=\"AgarrarLechuga\">\n                <next>\n                <block type=\"Repetir\">\n                    <value name=\"count\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">5</field>\n                    </block>\n                    </value>\n                    <statement name=\"block\">\n                    <block type=\"MoverACasillaDerecha\">\n                        <next>\n                        <block type=\"AgarrarTomate\"></block>\n                        </next>\n                    </block>\n                    </statement>\n                    <next>\n                    <block type=\"MoverACasillaDerecha\">\n                        <next>\n                        <block type=\"PrepararEnsalada\"></block>\n                        </next>\n                    </block>\n                    </next>\n                </block>\n                </next>\n            </block>\n            </next>\n        </block>\n        </statement>\n    </block>\n    </xml>",
      errorEsperado: "¡Acá no hay lechuga!"
    });
    (0, _actividadTest.actividadTest)("4.I1b", {
      descripcionAdicional: "4.I1b: La solución correcta resuelve el problema",
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"Repetir\" disabled=\"true\" x=\"42\" y=\"-249\">\n        <value name=\"count\">\n        <block type=\"math_number\">\n            <field name=\"NUM\">10</field>\n        </block>\n        </value>\n    </block>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n        <statement name=\"program\">\n        <block type=\"Repetir\">\n            <value name=\"count\">\n            <block type=\"math_number\">\n                <field name=\"NUM\">5</field>\n            </block>\n            </value>\n            <statement name=\"block\">\n            <block type=\"MoverACasillaArriba\"></block>\n            </statement>\n            <next>\n            <block type=\"AgarrarLechuga\">\n                <next>\n                <block type=\"Repetir\">\n                    <value name=\"count\">\n                    <block type=\"math_number\">\n                        <field name=\"NUM\">5</field>\n                    </block>\n                    </value>\n                    <statement name=\"block\">\n                    <block type=\"MoverACasillaDerecha\"></block>\n                    </statement>\n                    <next>\n                    <block type=\"AgarrarTomate\">\n                        <next>\n                        <block type=\"MoverACasillaDerecha\">\n                            <next>\n                            <block type=\"PrepararEnsalada\"></block>\n                            </next>\n                        </block>\n                        </next>\n                    </block>\n                    </next>\n                </block>\n                </next>\n            </block>\n            </next>\n        </block>\n        </statement>\n    </block>\n    </xml>"
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/TotoEscritor-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Toto escritor", () => {
    (0, _actividadTest.actividadTest)("5.I1a", {
      descripcionAdicional: '5.I1a: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">7</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"EscribirLetraActualEnOtraCuadricula\"></block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.I1a", {
      descripcionAdicional: '5.I1a: No puede copiar la letra en un casillero vacío',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"EscribirLetraActualEnOtraCuadricula\"></block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "No hay una letra aquí"
    });
    (0, _actividadTest.actividadTest)("5.I1a", {
      descripcionAdicional: '5.I1a: No puede salir de la cuadrícula',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaIzquierda\"></block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "No puedo ir para la izquierda"
    });
    (0, _actividadTest.actividadTest)("5.I1a", {
      descripcionAdicional: '5.I1a: No puede escribir de más',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n          <next>\n            <block type=\"Repetir\">\n              <value name=\"count\">\n                <block type=\"math_number\">\n                  <field name=\"NUM\">8</field>\n                </block>\n              </value>\n              <statement name=\"block\">\n                <block type=\"EscribirLetraActualEnOtraCuadricula\"></block>\n              </statement>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "¡Estoy cansado! No quiero escribir más..."
    });
    (0, _actividadTest.actividadTest)("5.I1b", {
      descripcionAdicional: '5.I1b: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">7</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                  <field name=\"texto\">x</field>\n                </block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.I1b", {
      descripcionAdicional: '5.I1b: Solamente escribir sin moverse NO resuelve el desafio',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">7</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n              <field name=\"texto\">x</field>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      resuelveDesafio: false
    });
    (0, _actividadTest.actividadTest)("5.I1c", {
      descripcionAdicional: '5.I1c: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">7</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"EscribirLetraActualEnOtraCuadricula\">\n                  <next>\n                    <block type=\"si\">\n                      <value name=\"condition\">\n                        <block type=\"hayVocalRMT\">\n                          <field name=\"letra\">m</field>\n                        </block>\n                      </value>\n                      <statement name=\"block\">\n                        <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                          <field name=\"texto\">ich</field>\n                        </block>\n                      </statement>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.I1c", {
      descripcionAdicional: '5.I1c: No puede preguntar sobre la letra actual en un casillero vacío',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"si\">\n          <value name=\"condition\">\n            <block type=\"hayVocalRMT\">\n              <field name=\"letra\">m</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n              <field name=\"texto\">ich</field>\n            </block>\n          </statement>\n          <next>\n            <block type=\"MoverACasillaDerecha\"></block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "No hay una letra aquí"
    });
    (0, _actividadTest.actividadTest)("5.I1d", {
      descripcionAdicional: '5.I1d: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"382\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">7</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaDerecha\">\n              <next>\n                <block type=\"EscribirLetraActualEnOtraCuadricula\">\n                  <next>\n                    <block type=\"si\">\n                      <value name=\"condition\">\n                        <block type=\"hayVocalRMT\">\n                          <field name=\"letra\">a</field>\n                        </block>\n                      </value>\n                      <statement name=\"block\">\n                        <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                          <field name=\"texto\">pa</field>\n                        </block>\n                      </statement>\n                      <next>\n                        <block type=\"si\">\n                          <value name=\"condition\">\n                            <block type=\"hayVocalRMT\">\n                              <field name=\"letra\">e</field>\n                            </block>\n                          </value>\n                          <statement name=\"block\">\n                            <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                              <field name=\"texto\">pe</field>\n                            </block>\n                          </statement>\n                          <next>\n                            <block type=\"si\">\n                              <value name=\"condition\">\n                                <block type=\"hayVocalRMT\">\n                                  <field name=\"letra\">i</field>\n                                </block>\n                              </value>\n                              <statement name=\"block\">\n                                <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                                  <field name=\"texto\">pi</field>\n                                </block>\n                              </statement>\n                              <next>\n                                <block type=\"si\">\n                                  <value name=\"condition\">\n                                    <block type=\"hayVocalRMT\">\n                                      <field name=\"letra\">o</field>\n                                    </block>\n                                  </value>\n                                  <statement name=\"block\">\n                                    <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                                      <field name=\"texto\">po</field>\n                                    </block>\n                                  </statement>\n                                  <next>\n                                    <block type=\"si\">\n                                      <value name=\"condition\">\n                                        <block type=\"hayVocalRMT\">\n                                          <field name=\"letra\">u</field>\n                                        </block>\n                                      </value>\n                                      <statement name=\"block\">\n                                        <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n                                          <field name=\"texto\">pu</field>\n                                        </block>\n                                      </statement>\n                                    </block>\n                                  </next>\n                                </block>\n                              </next>\n                            </block>\n                          </next>\n                        </block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </statement>\n        </block>\n      </statement>\n    </block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("5.I1d", {
      descripcionAdicional: 'Se brinda un mensaje de error al intentar escribir un carácter inválido',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"378\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"EscribirTextoDadoEnOtraCuadricula\">\n          <field name=\"texto\">\xA1HOLA!</field>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: 'No sé escribir ese símbolo'
    });
  });
});
define("pilasbloques/tests/integration/desafios/libroPrimaria/TotoLector-test", ["pilasbloques/tests/helpers/actividadTest"], function (_actividadTest) {
  "use strict";

  (0, _actividadTest.moduloActividad)("Toto lector", () => {
    (0, _actividadTest.actividadTest)("3.I1a", {
      descripcionAdicional: '3.I1a: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverLeyendoAbajo\">\n        <next>\n          <block type=\"MoverLeyendoDerecha\">\n            <next>\n              <block type=\"MoverLeyendoAbajo\">\n                <next>\n                  <block type=\"MoverLeyendoDerecha\"></block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.I1a", {
      descripcionAdicional: '3.I1a: Estalla al leer de más',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverLeyendoAbajo\">\n          <next>\n            <block type=\"MoverLeyendoDerecha\">\n              <next>\n                <block type=\"MoverLeyendoIzquierda\">\n                  <next>\n                    <block type=\"MoverLeyendoDerecha\">\n                      <next>\n                        <block type=\"MoverLeyendoIzquierda\"></block>\n                      </next>\n                    </block>\n                  </next>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "Ya leí mucho, ¡estoy cansado!"
    });
    (0, _actividadTest.actividadTest)("3.I1a", {
      descripcionAdicional: '3.I1a: No puede salir del tablero',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <variables></variables>\n    <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverLeyendoArriba\"></block>\n      </statement>\n    </block>\n  </xml>",
      errorEsperado: "No puedo ir para arriba"
    });
    (0, _actividadTest.actividadTest)("3.I1b", {
      descripcionAdicional: '3.I1b: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverLeyendoAbajo\">\n        <next>\n          <block type=\"MoverLeyendoDerecha\">\n            <next>\n              <block type=\"MoverLeyendoArriba\">\n                <next>\n                  <block type=\"MoverLeyendoDerecha\">\n                    <next>\n                      <block type=\"MoverLeyendoArriba\"></block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.I1c", {
      descripcionAdicional: '3.I1c: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverLeyendoAbajo\">\n        <next>\n          <block type=\"MoverLeyendoIzquierda\">\n            <next>\n              <block type=\"MoverLeyendoArriba\">\n                <next>\n                  <block type=\"MoverLeyendoIzquierda\"></block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
    (0, _actividadTest.actividadTest)("3.I1d", {
      descripcionAdicional: '3.I1d: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n\t  <statement name=\"program\">\n\t\t<block type=\"MoverLeyendoDerecha\">\n\t\t  <next>\n\t\t\t<block type=\"MoverLeyendoDerecha\">\n\t\t\t  <next>\n\t\t\t\t<block type=\"MoverLeyendoDerecha\">\n\t\t\t\t  <next>\n\t\t\t\t\t<block type=\"MoverLeyendoIzquierda\">\n\t\t\t\t\t  <next>\n\t\t\t\t\t\t<block type=\"MoverLeyendoAbajo\">\n\t\t\t\t\t\t  <next>\n\t\t\t\t\t\t\t<block type=\"MoverLeyendoIzquierda\">\n\t\t\t\t\t\t\t  <next>\n\t\t\t\t\t\t\t\t<block type=\"MoverLeyendoIzquierda\"></block>\n\t\t\t\t\t\t\t  </next>\n\t\t\t\t\t\t\t</block>\n\t\t\t\t\t\t  </next>\n\t\t\t\t\t\t</block>\n\t\t\t\t\t  </next>\n\t\t\t\t\t</block>\n\t\t\t\t  </next>\n\t\t\t\t</block>\n\t\t\t  </next>\n\t\t\t</block>\n\t\t  </next>\n\t\t</block>\n\t  </statement>\n\t</block>\n  </xml>"
    });
    (0, _actividadTest.actividadTest)("3.I1e", {
      descripcionAdicional: '3.I1e: Se puede resolver',
      solucion: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverLeyendoIzquierda\">\n        <next>\n          <block type=\"MoverLeyendoArriba\">\n            <next>\n              <block type=\"MoverLeyendoDerecha\">\n                <next>\n                  <block type=\"MoverLeyendoDerecha\">\n                    <next>\n                      <block type=\"MoverLeyendoAbajo\"></block>\n                    </next>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </next>\n      </block>\n    </statement>\n  </block>\n</xml>"
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/Casilla-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  const nombre = 'Casilla';
  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    (0, _qunit.test)('propiedades', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let Cuadricula = pilasService.evaluar("Cuadricula");
        let cuadricula = new Cuadricula(0, 0, 3, 5, {
          alto: 300,
          ancho: 200
        }, {
          grilla: 'invisible.png',
          cantColumnas: 1
        });
        let casilla = cuadricula.casilla(1, 2);
        let casilla2 = cuadricula.casilla(0, 0);
        cuadricula.setAlto(150);
        cuadricula.setAncho(100);
        assert.equal(casilla.alto, 50, 'resizea alto bien');
        assert.equal(casilla.ancho, 20, 'resizea ancho bien');
        assert.equal(casilla.x, 0, 'reposiciona x bien cuando es 0');
        assert.equal(casilla.y, 0, 'reposiciona y bien cuando es 0');
        assert.equal(casilla2.x, -40, 'reposiciona x bien');
        assert.equal(casilla2.y, 50, 'reposiciona y bien');
        resolve();
      });
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/Cuadricula-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  const nombre = 'Cuadricula';
  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    /**
     * Preparar cuadricula y actores para los tests de este archivo
     *
     * @return diccionario con todos los elementos de la escena
     */
    function prepararEscena(pilas, pilasService) {
      let escena = {};
      let Cuadricula = pilasService.evaluar("Cuadricula");
      let AlienAnimado = pilasService.evaluar("AlienAnimado");
      escena.cuadricula = new Cuadricula(0, 0, 3, 5, {
        alto: 300,
        ancho: 200
      }, {
        grilla: 'invisible.png',
        cantColumnas: 1
      });
      escena.actor1 = new AlienAnimado(0, 0);
      escena.actor2 = new AlienAnimado(0, 0);
      escena.actor3 = new AlienAnimado(0, 0);
      return escena;
    }

    (0, _qunit.test)('Set Ancho', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        escena.cuadricula.setAncho(100);
        assert.equal(escena.cuadricula.ancho, 100);
        assert.equal(escena.cuadricula.casilla(0, 0).ancho, 20);
        assert.equal(escena.cuadricula.casilla(0, 0).alto, 100);
        resolve();
      });
    });
    (0, _qunit.test)('Set Alto', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        escena.cuadricula.setAlto(600);
        assert.equal(escena.cuadricula.alto, 600);
        assert.equal(escena.cuadricula.casilla(0, 0).ancho, 40);
        assert.equal(escena.cuadricula.casilla(0, 0).alto, 200);
        resolve();
      });
    });
    (0, _qunit.test)('Colisionan', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        escena.cuadricula.agregarActor(escena.actor1, 0, 0);
        escena.cuadricula.agregarActor(escena.actor2, 0, 0);
        escena.cuadricula.agregarActor(escena.actor3, 0, 1);
        assert.equal(escena.cuadricula.colisionan(escena.actor1, escena.actor2), true);
        assert.equal(escena.cuadricula.colisionan(escena.actor2, escena.actor1), true);
        assert.equal(escena.cuadricula.colisionan(escena.actor1, escena.actor3), false);
        assert.equal(escena.cuadricula.colisionan(escena.actor3, escena.actor1), false);
        assert.equal(escena.cuadricula.colisionan(escena.actor3, escena.actor2), false);
        assert.equal(escena.cuadricula.colisionan(escena.actor2, escena.actor3), false);
        resolve();
      });
    });
    (0, _qunit.test)('Casilla', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        assert.equal(escena.cuadricula.casilla(0, 0) !== escena.cuadricula.casilla(0, 1), true, 'son distintas');
        assert.equal(escena.cuadricula.casilla(0, 0).nroFila, 0);
        assert.equal(escena.cuadricula.casilla(0, 0).nroColumna, 0);
        assert.equal(escena.cuadricula.casilla(0, 1).nroFila, 0);
        assert.equal(escena.cuadricula.casilla(0, 1).nroColumna, 1);
        assert.equal(escena.cuadricula.casilla(1, 1).nroColumna, 1);
        assert.equal(escena.cuadricula.casilla(1, 1).nroFila, 1);
        resolve();
      });
    }); // test('Constructor', function(assert) {
    //   return createPilasTest(this, 'EscenaTests', (pilas, resolve, pilasService) => {
    //     let escena = prepararEscena(pilas, pilasService);
    //     assert.equal(escena.cuadricula.cantidadCasillas(),3*5,'tiene la cantidad de casillas que debe');
    //     function estaFueraRango(casillas,index,filas,cols){
    //       return casillas[index].nroFila<0 || casillas[index].nroFila>=filas || casillas[index].nroColumna<0 && casillas[index].nroColumna>=cols;
    //     }
    //     function sonLaMismaCasilla(casillas,i,j) {
    //       return casillas[i].nroFila===casillas[j].nroFila&&casillas[i].nroColumna===casillas[j].nroColumna;
    //     }
    //     function todasCoordenadasDistintasEInRange(casillas,cantFilas,cantColumnas) {
    //       for (var i = 0; i < casillas.size; i++) {
    //         if(estaFueraRango(casillas,i,cantFilas,cantColumnas)){
    //           return false;
    //         }
    //         for (var j = i; j < casillas.size; j++) {
    //           if(sonLaMismaCasilla(casillas,i,j)){
    //             return false;
    //           }
    //         }
    //       }
    //       return true;
    //     }
    //     assert.equal(todasCoordenadasDistintasEInRange(escena.cuadricula.casillas,3,5),true,'todas las casillas tienen coordenadas distintas e in_range');
    //     resolve();
    //   });
    // });

    (0, _qunit.test)('Mover a la casilla derecha', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        let MoverACasillaDerecha = pilasService.evaluar("MoverACasillaDerecha");
        escena.cuadricula.agregarActor(escena.actor1, 0, 0);
        var x = escena.actor1.x;
        var y = escena.actor1.y;
        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(escena.actor1, MoverACasillaDerecha, {}, function () {
          assert.equal(escena.actor1.x, x + escena.cuadricula.casilla(0, 0).ancho, 'Movi a la derecha bien');
          assert.equal(escena.actor1.y, y, 'Me mantuve en altura');
          assert.equal(escena.actor1.casillaActual(), escena.cuadricula.casilla(0, 1), 'Mi casillaActual es la correspondiente');
          resolve();
        });
      });
    });
    (0, _qunit.test)('Mover a la casilla izquierda', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        let MoverACasillaIzquierda = pilasService.evaluar("MoverACasillaIzquierda");
        escena.cuadricula.agregarActor(escena.actor1, 0, 1);
        var x = escena.actor1.x;
        var y = escena.actor1.y;
        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(escena.actor1, MoverACasillaIzquierda, {}, function () {
          assert.equal(escena.actor1.x, x - escena.cuadricula.casilla(0, 0).ancho, 'Movi a la izquierda bien');
          assert.equal(escena.actor1.y, y, 'Me mantuve en altura');
          assert.equal(escena.actor1.casillaActual(), escena.cuadricula.casilla(0, 0), 'Mi casillaActual es la correspondiente');
          resolve();
        });
      });
    });
    (0, _qunit.test)('Mover a casilla abajo', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        let MoverACasillaAbajo = pilasService.evaluar("MoverACasillaAbajo");
        escena.cuadricula.agregarActor(escena.actor1, 1, 0);
        var x = escena.actor1.x;
        var y = escena.actor1.y;
        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(escena.actor1, MoverACasillaAbajo, {}, function () {
          assert.equal(escena.actor1.y, y - escena.cuadricula.casilla(0, 0).alto, 'Movi abajo bien');
          assert.equal(escena.actor1.x, x, 'Me mantuve en eje x');
          assert.equal(escena.actor1.casillaActual(), escena.cuadricula.casilla(2, 0), 'Mi casillaActual es la correspondiente');
          resolve();
        });
      });
    });
    (0, _qunit.test)('Mover a casilla arriba', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let escena = prepararEscena(pilas, pilasService);
        let MoverACasillaArriba = pilasService.evaluar("MoverACasillaArriba");
        escena.cuadricula.agregarActor(escena.actor1, 1, 0);
        var x = escena.actor1.x;
        var y = escena.actor1.y;
        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(escena.actor1, MoverACasillaArriba, {}, function () {
          assert.equal(escena.actor1.y, y + escena.cuadricula.casilla(0, 0).alto, 'Movi arriba bien');
          assert.equal(escena.actor1.x, x, 'Me mantuve en eje x');
          assert.equal(escena.actor1.casillaActual(), escena.cuadricula.casilla(0, 0), 'Mi casillaActual es la correspondiente');
          resolve();
        });
      });
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/CuadriculaEsparsa-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  const nombre = 'Cuadricula Esparsa';
  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    (0, _qunit.test)('Constructor', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let CuadriculaEsparsa = pilasService.evaluar("CuadriculaEsparsa");
        let matriz = [['T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'F', 'F', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'F', 'F', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T']];
        let cuadricula = new CuadriculaEsparsa(0, 0, {
          alto: 100
        }, {
          grilla: 'invisible.png',
          cantColumnas: 1
        }, matriz);
        assert.ok(cuadricula.cantidadCasillas() === 22);
        resolve();
      });
    });
    (0, _qunit.test)('Direcciones', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let CuadriculaEsparsa = pilasService.evaluar("CuadriculaEsparsa");
        let matriz = [['T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'F', 'F', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T'], ['T', 'F', 'F', 'F', 'F', 'T'], ['T', 'T', 'T', 'T', 'T', 'T']];
        let cuadricula = new CuadriculaEsparsa(0, 0, {
          alto: 100
        }, {
          grilla: 'invisible.png',
          cantColumnas: 1
        }, matriz);
        /*Cuatro esquinas*/
        //izquierda arriba

        let casilla = cuadricula.casilla(0, 0);
        assert.ok(!cuadricula.hayArriba(casilla));
        assert.ok(cuadricula.hayAbajo(casilla));
        assert.ok(!cuadricula.hayIzquierda(casilla));
        assert.ok(cuadricula.hayDerecha(casilla)); //izquierda abajo

        casilla = cuadricula.casilla(4, 0);
        assert.ok(cuadricula.hayArriba(casilla));
        assert.ok(!cuadricula.hayAbajo(casilla));
        assert.ok(!cuadricula.hayIzquierda(casilla));
        assert.ok(cuadricula.hayDerecha(casilla)); //derecha arriba

        casilla = cuadricula.casilla(0, 5);
        assert.ok(!cuadricula.hayArriba(casilla));
        assert.ok(cuadricula.hayAbajo(casilla));
        assert.ok(cuadricula.hayIzquierda(casilla));
        assert.ok(!cuadricula.hayDerecha(casilla)); //derecha abajo

        casilla = cuadricula.casilla(4, 5);
        assert.ok(cuadricula.hayArriba(casilla));
        assert.ok(!cuadricula.hayAbajo(casilla));
        assert.ok(cuadricula.hayIzquierda(casilla));
        assert.ok(!cuadricula.hayDerecha(casilla));
        casilla = cuadricula.casilla(1, 0); //assert.equal(cuadricula.hayIzquierda(casilla),false);

        assert.ok(cuadricula.hayArriba(casilla));
        assert.ok(cuadricula.hayAbajo(casilla));
        assert.ok(!cuadricula.hayIzquierda(casilla));
        assert.ok(!cuadricula.hayDerecha(casilla));
        casilla = cuadricula.casilla(2, 2); //assert.equal(cuadricula.hayIzquierda(casilla),false);

        assert.ok(!cuadricula.hayArriba(casilla));
        assert.ok(!cuadricula.hayAbajo(casilla));
        assert.ok(cuadricula.hayIzquierda(casilla));
        assert.ok(cuadricula.hayDerecha(casilla));
        resolve();
      });
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/Estado-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  const nombre = 'Estado';
  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    (0, _qunit.test)('Agregar Transicion', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let Estado = pilasService.evaluar("Estado");
        let EstadoConTransicion = pilasService.evaluar("EstadoConTransicion");
        let e2 = new Estado('id2');
        let e = new EstadoConTransicion(pilas.escena_actual(), 'id');
        e.agregarTransicion(e2, 'transi');
        assert.equal(e.transiciones['transi']['estadoEntrada'], e2, "Por la etiqueta llego a destino");
        resolve();
      });
    });
    (0, _qunit.test)('Constructor', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let EstadoConTransicion = pilasService.evaluar("EstadoConTransicion");
        let e = new EstadoConTransicion(pilas.escena_actual(), 'id');
        assert.equal(Object.keys(e.transiciones).length, 0);
        assert.equal(e.identifier, 'id');
        resolve();
      });
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/ImagenesPreCarga-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)('Imagenes Pre-carga', () => {
    function testDePrecarga(escena, constructor, imagenesEsperadas) {
      (0, _qunit.test)(escena, function (assert) {
        return (0, _createPilasTest.default)(this, constructor, (pilas, resolve, pilasService) => {
          let imagenes = pilasService.imagenesParaPrecargar(constructor);
          assert.deepEqual(imagenes, imagenesEsperadas);
          resolve();
        });
      });
    }

    testDePrecarga('EscenaDuba', "new EscenaDuba(\"[O,-,A,P,*]\")", ["fondo.duba.png", "actor.duba.png", "actor.churrasco.png", "flechaEscenarioAleatorio.png", "casillas.duba.png", "obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png"]);
    testDePrecarga('EscenaLita', "new EscenaLita(\"[O,-,A,T,L,E]\")", ["fondo.lita.png", "actor.lita.png", "actor.ensaladera.png", "actor.tomate.png", "actor.lechuga.png", "flechaEscenarioAleatorio.png", "casillas.lita.png", "obstaculo.lita1.png", "obstaculo.lita2.png", "obstaculo.lita3.png", "obstaculo.lita4.png"]);
    testDePrecarga('EscenaCoty', "new EscenaCoty(\n    [],\n    [{x:-120,y:50},{x:20,y:50}],\n    {xCoty: -0, yCoty: 0, puedeHaberCharco: true}\n  )", ["fondo.coty.png", "actor.coty.png", "actor.charco.png", "flechaEscenarioAleatorio.png"]);
    testDePrecarga('EscenaTotoEscritor', "new EscenaTotoEscritor(new ObjetivoCopiar())", ["fondo.toto.png", "actor.toto.png", "actor.letra.tablero.png", "actor.letra.manuscrita.png", "casillas.toto.png", "manoToto.png", "libretaToto.png"]);
    testDePrecarga('EscenaTotoLector', "new EscenaTotoLector([['A', 'r', 'e']], \"\")", ["fondo.toto.png", "actor.toto.png", "actor.letra.tablero.png", "actor.letra.leida.png", "casillas.toto.png", "pensamientoToto.png"]);
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/Interactuar-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest", "sinon"], function (_qunit, _ejerciciosPilasTest, _createPilasTest, _sinon) {
  "use strict";

  const nombre = 'Interactuar';
  let argumentosParaApretar = {
    etiqueta: "BotonAnimado",
    nombreAnimacion: "apretar",
    animacionInteractuadoAlFinal: "prendida"
  };

  function setup(pilasService) {
    let Interactuar = pilasService.evaluar("Interactuar");
    let alien = new (pilasService.evaluar("AlienAnimado"))(0, 0);
    pilasService.evaluar("pilas").escena_actual().automata = alien;
    let boton = new (pilasService.evaluar("BotonAnimado"))(0, 0);
    let cuadricula = new (pilasService.evaluar("Cuadricula"))(0, 0, 1, 2, {}, {
      grilla: 'invisible.png'
    });
    return {
      Interactuar,
      alien,
      boton,
      cuadricula
    };
  }

  function interactuarAlienThrows(argumentos, mensajeError, pilasService, assert, alien) {
    // Idealmente estas 3 líneas deberían ser un hacerLuegoConCallback, pero
    // no hay hooks para esperar un error, así que por eso se usa el iniciar y configuracionInicial
    let elInteractuar = new (pilasService.evaluar("Interactuar"))(argumentos);
    elInteractuar.iniciar(alien);
    assert.throws(() => elInteractuar.configuracionInicial(), new (pilasService.evaluar("ActividadError"))(mensajeError));
  }

  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    (0, _qunit.test)('Sanitización: Interactuar sanitiza correctamente argumentos correctos', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let Interactuar = pilasService.evaluar("Interactuar");
        let instance = new Interactuar(argumentosParaApretar);
        instance.sanitizarArgumentos();
        assert.ok(true); // la linea anterior no debe estallar.

        resolve();
      });
    });
    (0, _qunit.test)('Sanitización: No se puede crear una instancia de Interactuar, falta la etiqueta', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let ArgumentError = pilasService.evaluar("ArgumentError");
        let Interactuar = pilasService.evaluar("Interactuar");
        assert.throws(() => new Interactuar({}).sanitizarArgumentos(), new ArgumentError("Debe proveerse una etiqueta para verificar interacción"));
        resolve();
      });
    });
    (0, _qunit.test)('Sin cuadrícula: No se puede interactuar con un objeto si estoy lejos', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          alien,
          boton
        } = setup(pilasService);
        boton.x += 300;
        interactuarAlienThrows(argumentosParaApretar, "¡Acá no hay boton!", pilasService, assert, alien);
        resolve();
      });
    });
    (0, _qunit.test)('Con cuadrícula: No se puede interactuar con un objeto si estoy en otra casilla', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          alien,
          boton,
          cuadricula
        } = setup(pilasService);
        cuadricula.agregarActor(alien, 0, 0);
        cuadricula.agregarActor(boton, 0, 1);
        interactuarAlienThrows(argumentosParaApretar, "¡Acá no hay boton!", pilasService, assert, alien);
        resolve();
      });
    });
    (0, _qunit.test)('Sin cuadrícula: Interactúa cuando está el objeto. AnimacionInteractuadoFinal funciona correctamente', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          Interactuar,
          alien,
          boton
        } = setup(pilasService);
        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(alien, Interactuar, argumentosParaApretar, () => {
          assert.equal(argumentosParaApretar.animacionInteractuadoAlFinal, boton.nombreAnimacionActual());
          resolve();
        });
      });
    });
    (0, _qunit.test)('Con cuadrícula: Interactúa cuando está el objeto', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          Interactuar,
          alien,
          boton,
          cuadricula
        } = setup(pilasService);
        cuadricula.agregarActor(alien, 0, 0);
        cuadricula.agregarActor(boton, 0, 0);
        boton.x += 300; // para asegurar que no está chequeando por proximidad sino por casilla

        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(alien, Interactuar, argumentosParaApretar, () => {
          assert.equal(argumentosParaApretar.animacionInteractuadoAlFinal, boton.nombreAnimacionActual());
          resolve();
        });
      });
    });
    (0, _qunit.test)('mensajeError funciona correctamente', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          alien
        } = setup(pilasService);
        let argumentosMensajeError = {
          etiqueta: 'AbortoLegal',
          mensajeError: 'Para no morir'
        };
        interactuarAlienThrows(argumentosMensajeError, "Para no morir", pilasService, assert, alien);
        resolve();
      });
    });
    (0, _qunit.test)("animacionInteractuadoMientras funciona correctamente", function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          Interactuar,
          alien
        } = setup(pilasService);
        let argumentos = {
          etiqueta: "AlienAnimado",
          animacionInteractuadoMientras: "hablar",
          nombreAnimacion: "apretar"
        };
        let elInteractuar = new Interactuar(argumentos);

        let spy = _sinon.default.spy(alien, 'cargarAnimacion');

        _sinon.default.stub(Interactuar.prototype, 'interactuado').callsFake(() => {
          return alien;
        });

        elInteractuar.preAnimacion();
        assert.equal(argumentos.animacionInteractuadoMientras, elInteractuar.interactuado().nombreAnimacionActual());
        assert.ok(spy.calledOnce);
        spy.restore();
        resolve();
      });
    });
    (0, _qunit.test)('comportamientoAdicional funciona correctamente', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let {
          Interactuar,
          alien,
          boton
        } = setup(pilasService);
        let argumentos = {
          etiqueta: 'BotonAnimado',
          comportamientoAdicional: 'ComportamientoAnimado',
          argumentosComportamiento: {
            nombreAnimacion: 'apagada'
          }
        };

        let spy = _sinon.default.spy(boton, 'hacer_luego');

        (0, _ejerciciosPilasTest.hacerLuegoConCallback)(alien, Interactuar, argumentos, () => {
          assert.ok(spy.calledOnce);
          spy.restore();
          resolve();
        });
      });
    });
  });
});
define("pilasbloques/tests/integration/ejerciciosPilas/StatePattern-test", ["qunit", "pilasbloques/tests/helpers/ejerciciosPilasTest", "pilasbloques/tests/helpers/createPilasTest"], function (_qunit, _ejerciciosPilasTest, _createPilasTest) {
  "use strict";

  const nombre = 'State Pattern';
  (0, _ejerciciosPilasTest.moduloEjerciciosPilas)(nombre, () => {
    (0, _qunit.test)('Agregar Estado', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarEstado('estado1');
        assert.equal(builder.estados['estado1'].identifier, 'estado1', 'El estado que se agrega tiene el id correspondiente');
        assert.equal(Object.keys(builder.estados['estado1'].transiciones).length, 0, 'El nuevo estado no tiene transiciones');
        resolve();
      });
    });
    (0, _qunit.test)('Agregar Transicion', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarEstado('e1');
        builder.agregarEstado('e2');
        builder.agregarTransicion('e1', 'e2', 'transi');
        assert.equal(builder.estados['e1'].transiciones['transi']['estadoEntrada'], builder.estados['e2']);
        resolve();
      });
    });
    (0, _qunit.test)('Agregar Error', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarError('inicial', 'instalar', 'Primero hay que prender la computadora');
        assert.equal(builder.estados['inicial'].errores['instalar'], 'Primero hay que prender la computadora');
        resolve();
      });
    });
    (0, _qunit.test)('Agregar estados prefijados', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarEstadosPrefijados('prendido', 1, 3);
        assert.notEqual(builder.estados['prendido1'], undefined, "Lo que se agrega es lo prefijado");
        assert.notEqual(builder.estados['prendido2'], undefined, "Lo que se agrega es lo prefijado");
        assert.notEqual(builder.estados['prendido3'], undefined, "Lo que se agrega es lo prefijado");
        resolve();
      });
    });
    (0, _qunit.test)('Estado Inicial (construir state pattern)', function (assert) {
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        assert.equal(builder.estadoInicial(), builder.estados['inicial']);
        resolve();
      });
    });
    (0, _qunit.test)('Agregar error a varios estados de salida', function (assert) {
      /*Caso de test donde, para tres estados prefijados e1, e2 y e3,
      se agregan con una instruccion transiciones con la etiqueta
      'transiError' a un estado de error con el mensaje 'te equivocaste'
      */
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarEstadosPrefijados('e', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('e', 'transiError', 'te equivocaste', 1, 3); // assert.equal(builder.estados['e1'].transiciones['transiError']['estadoEntrada'].estadoAlQueVuelve,builder.estados['e1'],"El estado al que vuelve es correcto");
        // assert.equal(builder.estados['e2'].transiciones['transiError']['estadoEntrada'].estadoAlQueVuelve,builder.estados['e2'],"El estado al que vuelve es correcto");
        // assert.equal(builder.estados['e3'].transiciones['transiError']['estadoEntrada'].estadoAlQueVuelve,builder.estados['e3'],"El estado al que vuelve es correcto");
        // assert.equal(builder.estados['e1'].transiciones['transiError']['estadoEntrada'].mensajeError,'te equivocaste',"Los mensajes de error son correctos");
        // assert.equal(builder.estados['e2'].transiciones['transiError']['estadoEntrada'].mensajeError,'te equivocaste',"Los mensajes de error son correctos");
        // assert.equal(builder.estados['e3'].transiciones['transiError']['estadoEntrada'].mensajeError,'te equivocaste',"Los mensajes de error son correctos");

        assert.equal(builder.estados['e1'].errores['transiError'], 'te equivocaste', "Los mensajes de error son correctos");
        assert.equal(builder.estados['e2'].errores['transiError'], 'te equivocaste', "Los mensajes de error son correctos");
        assert.equal(builder.estados['e3'].errores['transiError'], 'te equivocaste', "Los mensajes de error son correctos");
        resolve();
      });
    });
    (0, _qunit.test)('Agregar transiciones iteradas', function (assert) {
      /* Dados estados a1, a2, a3, b1, b2, b3, buscamos con una
      instrucción generar transiciones con etiqueta 't'
      de a_i a b_i 0<i<4
      */
      return (0, _createPilasTest.default)(this, 'EscenaTests', (pilas, resolve, pilasService) => {
        let BuilderStatePattern = pilasService.evaluar("BuilderStatePattern");
        let builder = new BuilderStatePattern(pilas.escena_actual(), 'inicial');
        builder.agregarEstadosPrefijados('a', 1, 3);
        builder.agregarEstadosPrefijados('b', 1, 3);
        builder.agregarTransicionesIteradas('a', 'b', 't', 1, 3, 1, 3);
        assert.equal(builder.estados['a1'].transiciones['t']['estadoEntrada'].identifier, 'b1');
        assert.equal(builder.estados['a2'].transiciones['t']['estadoEntrada'].identifier, 'b2');
        assert.equal(builder.estados['a3'].transiciones['t']['estadoEntrada'].identifier, 'b3');
        resolve();
      });
    });
  });
});
define("pilasbloques/tests/lint/acceptance/acercade-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | acceptance/acercade-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/acercade-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/acceptance/desafios-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | acceptance/desafios-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/desafios-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/acceptance/principal-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | acceptance/principal-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/principal-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/acceptance/puede-ingresar-en-actividades-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | acceptance/puede-ingresar-en-actividades-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/puede-ingresar-en-actividades-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/app.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/breakpoints.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | breakpoints.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'breakpoints.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/info-reportar-problema.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/info-reportar-problema.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/info-reportar-problema.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/listaImagenes.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/listaImagenes.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/listaImagenes.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/modal-ayuda.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/modal-ayuda.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modal-ayuda.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/modal-title.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/modal-title.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modal-title.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-acerca-de.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-acerca-de.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-acerca-de.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-blockly.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-blockly.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-blockly.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-botones-zoom.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-botones-zoom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-botones-zoom.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-canvas.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-canvas.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-canvas.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-cargando.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-cargando.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-cargando.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-desafio.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-desafio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-desafio.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-editor.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-editor.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-editor.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-header.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-header.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-header.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-libro.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-libro.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-libro.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-link.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-link.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-link.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-notificador.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-notificador.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-notificador.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-solution-file.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-solution-file.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-solution-file.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-spinner.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-spinner.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-spinner.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-splitter.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-splitter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-splitter.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/components/pilas-toggle.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | components/pilas-toggle.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/pilas-toggle.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/acercade.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/acercade.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/acercade.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/application.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/desafio.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/desafio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/desafio.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/desafios/curso-alumno.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/desafios/curso-alumno.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/desafios/curso-alumno.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/desafios/curso-docente.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/desafios/curso-docente.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/desafios/curso-docente.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/galeria.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/galeria.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/galeria.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/libros/ver-libro.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/libros/ver-libro.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/libros/ver-libro.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/controllers/test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | controllers/test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/actividadTest.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/actividadTest.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/actividadTest.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/createPilasTest.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/createPilasTest.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/createPilasTest.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/destroy-app.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/ejerciciosPilasTest.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/ejerciciosPilasTest.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/ejerciciosPilasTest.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/mocks.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/mocks.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/mocks.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/module-for-acceptance.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/resolver.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/start-app.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/helpers/utils.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | helpers/utils.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/utils.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/initializers/ember-responsive.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | initializers/ember-responsive.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/ember-responsive.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/modal-ayuda-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/modal-ayuda-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/modal-ayuda-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/modal-title-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/modal-title-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/modal-title-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-acerca-de-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-acerca-de-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-acerca-de-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-blockly-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-blockly-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-blockly-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-botones-zoom-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-botones-zoom-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-botones-zoom-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-canvas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-canvas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-canvas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-cargando-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-cargando-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-cargando-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-desafio-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-desafio-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-desafio-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-editor-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-editor-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-editor-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-header-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-header-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-header-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-libro-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-libro-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-libro-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-notificador-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-notificador-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-notificador-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-spinner-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-spinner-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-spinner-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilas-toggle-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilas-toggle-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilas-toggle-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/components/pilasweb-actores-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/components/pilasweb-actores-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/pilasweb-actores-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/AlienTocaBoton-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/AlienTocaBoton-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/AlienTocaBoton-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/AlimentandoALosPeces-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/AlimentandoALosPeces-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/AlimentandoALosPeces-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/BlockIDGeneration-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/BlockIDGeneration-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/BlockIDGeneration-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/BlocksGallery-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/BlocksGallery-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/BlocksGallery-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/DibujandoFiguras-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/DibujandoFiguras-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/DibujandoFiguras-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElAlienYLasTuercas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElAlienYLasTuercas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElAlienYLasTuercas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElCangrejoAguafiestas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElCangrejoAguafiestas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElCangrejoAguafiestas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElDetectiveChaparro-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElDetectiveChaparro-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElDetectiveChaparro-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElGatoEnLaCalle-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElGatoEnLaCalle-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElGatoEnLaCalle-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElMarcianoEnElDesierto-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElMarcianoEnElDesierto-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElMarcianoEnElDesierto-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElMonoCuentaDeNuevo-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElMonoCuentaDeNuevo-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElMonoCuentaDeNuevo-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElMonoQueSabeContar-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElMonoQueSabeContar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElMonoQueSabeContar-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElMonoYLasBananas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElMonoYLasBananas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElMonoYLasBananas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElPlanetaDeNano-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElPlanetaDeNano-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElPlanetaDeNano-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElRecolectorDeEstrellas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElRecolectorDeEstrellas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElRecolectorDeEstrellas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ElSuperviaje-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ElSuperviaje-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ElSuperviaje-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/FutbolDeRobots-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/FutbolDeRobots-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/FutbolDeRobots-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/InstalandoJuegos-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/InstalandoJuegos-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/InstalandoJuegos-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaEleccionDelMono-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaEleccionDelMono-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaEleccionDelMono-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaFiestaDeDracula-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaFiestaDeDracula-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaFiestaDeDracula-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaGranAventuraDelMarEncantado-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaGranAventuraDelMarEncantado-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaGranAventuraDelMarEncantado-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaberintoConQueso-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaberintoConQueso-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaberintoConQueso-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaberintoCorto-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaberintoCorto-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaberintoCorto-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/LaberintoLargo-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/LaberintoLargo-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/LaberintoLargo-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/MariaLaComeSandias-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/MariaLaComeSandias-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/MariaLaComeSandias-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/NoMeCansoDeSaltar-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/NoMeCansoDeSaltar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/NoMeCansoDeSaltar-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/PrendiendoLasCompus-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/PrendiendoLasCompus-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/PrendiendoLasCompus-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/PrendiendoLasCompusParametrizado-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/PrendiendoLasCompusParametrizado-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/PrendiendoLasCompusParametrizado-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/PrendiendoLasFogatas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/PrendiendoLasFogatas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/PrendiendoLasFogatas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/ReparandoLaNave-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/ReparandoLaNave-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/ReparandoLaNave-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/SalvandoLaNavidad-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/SalvandoLaNavidad-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/SalvandoLaNavidad-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/SuperTito1-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/SuperTito1-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/SuperTito1-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/SuperTito2-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/SuperTito2-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/SuperTito2-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/TitoCuadrado-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/TitoCuadrado-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/TitoCuadrado-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/TitoEnciendeLasLuces-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/TitoEnciendeLasLuces-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/TitoEnciendeLasLuces-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/TitoRecargado-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/TitoRecargado-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/TitoRecargado-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/TresNaranjas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/TresNaranjas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/TresNaranjas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Coty-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Coty-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Coty-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Duba-AlternativaCondicional-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Duba-AlternativaCondicional-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Duba-AlternativaCondicional-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Duba-PrimerosProgramas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Duba-PrimerosProgramas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Duba-PrimerosProgramas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Duba-Repeticion-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Duba-Repeticion-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Duba-Repeticion-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Lita-AlternativaCondicional-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Lita-AlternativaCondicional-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Lita-AlternativaCondicional-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Lita-PrimerosProgramas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Lita-PrimerosProgramas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Lita-PrimerosProgramas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/Lita-Repeticion-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/Lita-Repeticion-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/Lita-Repeticion-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/TotoEscritor-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/TotoEscritor-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/TotoEscritor-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/desafios/libroPrimaria/TotoLector-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/desafios/libroPrimaria/TotoLector-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/desafios/libroPrimaria/TotoLector-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/Casilla-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/Casilla-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/Casilla-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/Cuadricula-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/Cuadricula-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/Cuadricula-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/CuadriculaEsparsa-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/CuadriculaEsparsa-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/CuadriculaEsparsa-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/Estado-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/Estado-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/Estado-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/ImagenesPreCarga-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/ImagenesPreCarga-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/ImagenesPreCarga-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/Interactuar-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/Interactuar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/Interactuar-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/integration/ejerciciosPilas/StatePattern-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | integration/ejerciciosPilas/StatePattern-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/ejerciciosPilas/StatePattern-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/models/desafio.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | models/desafio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/desafio.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/models/grupo.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | models/grupo.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/grupo.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/models/libro.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | models/libro.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/libro.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/resolver.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/router.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/acercade.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/acercade.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/acercade.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/desafio.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/desafio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/desafio.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/desafios/curso-alumno.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/desafios/curso-alumno.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/desafios/curso-alumno.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/desafios/curso-docente.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/desafios/curso-docente.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/desafios/curso-docente.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/desafios/desafio-por-nombre.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/desafios/desafio-por-nombre.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/desafios/desafio-por-nombre.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/desafios/index.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/desafios/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/desafios/index.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/galeria.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/galeria.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/galeria.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/index.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/routes/libros/index.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | routes/libros/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/libros/index.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/available-blocks-validator.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/available-blocks-validator.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/available-blocks-validator.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/blocks-gallery.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/blocks-gallery.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/blocks-gallery.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/curso-api.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/curso-api.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/curso-api.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/highlighter.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/highlighter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/highlighter.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/interpreter-factory.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/interpreter-factory.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/interpreter-factory.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/notificador.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/notificador.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/notificador.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/pilas.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/pilas.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/pilas.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/twitter.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/twitter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/twitter.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/services/zoom.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | services/zoom.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/zoom.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/test-helper.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/components/pilas-blockly-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/components/pilas-blockly-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/pilas-blockly-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/components/pilas-editor-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/components/pilas-editor-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/pilas-editor-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/components/pilas-solution-file-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/components/pilas-solution-file-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/components/pilas-solution-file-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/controllers/acercade-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/controllers/acercade-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/acercade-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/controllers/test-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/controllers/test-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/test-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/models/desafio-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/models/desafio-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/desafio-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/models/libro-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/models/libro-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/libro-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/routes/acercade-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/routes/acercade-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/acercade-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/routes/desafio-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/routes/desafio-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/desafio-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/routes/index-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/available-blocks-validator-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/available-blocks-validator-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/available-blocks-validator-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/blocks-gallery-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/blocks-gallery-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/blocks-gallery-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/highlighter-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/highlighter-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/highlighter-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/notificador-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/notificador-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/notificador-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/pilas-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/pilas-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/pilas-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/lint/unit/services/zoom-test.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | unit/services/zoom-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/zoom-test.js should pass jshint.');
  });
});
define("pilasbloques/tests/page-object", ["exports", "ember-cli-page-object"], function (_exports, _emberCliPageObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "alias", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.alias;
    }
  });
  Object.defineProperty(_exports, "attribute", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.attribute;
    }
  });
  Object.defineProperty(_exports, "clickOnText", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickOnText;
    }
  });
  Object.defineProperty(_exports, "clickable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickable;
    }
  });
  Object.defineProperty(_exports, "collection", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.collection;
    }
  });
  Object.defineProperty(_exports, "contains", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.contains;
    }
  });
  Object.defineProperty(_exports, "count", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.count;
    }
  });
  Object.defineProperty(_exports, "create", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.create;
    }
  });
  Object.defineProperty(_exports, "fillable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "selectable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "focusable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.focusable;
    }
  });
  Object.defineProperty(_exports, "hasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.hasClass;
    }
  });
  Object.defineProperty(_exports, "is", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.is;
    }
  });
  Object.defineProperty(_exports, "isHidden", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isHidden;
    }
  });
  Object.defineProperty(_exports, "isPresent", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isPresent;
    }
  });
  Object.defineProperty(_exports, "isVisible", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isVisible;
    }
  });
  Object.defineProperty(_exports, "notHasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.notHasClass;
    }
  });
  Object.defineProperty(_exports, "property", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.property;
    }
  });
  Object.defineProperty(_exports, "text", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.text;
    }
  });
  Object.defineProperty(_exports, "triggerable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.triggerable;
    }
  });
  Object.defineProperty(_exports, "value", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.value;
    }
  });
  Object.defineProperty(_exports, "visitable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.visitable;
    }
  });
  Object.defineProperty(_exports, "buildSelector", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(_exports, "findElementWithAssert", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(_exports, "findElement", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(_exports, "getContext", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.getContext;
    }
  });
  Object.defineProperty(_exports, "fullScope", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fullScope;
    }
  });
  _exports.default = void 0;
  var _default = {
    alias: _emberCliPageObject.alias,
    attribute: _emberCliPageObject.attribute,
    blurrable: _emberCliPageObject.blurrable,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    focusable: _emberCliPageObject.focusable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isPresent: _emberCliPageObject.isPresent,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
  _exports.default = _default;
  (true && !(false) && Ember.deprecate("Importing from \"test-support\" is now deprecated. Please import directly from the \"ember-cli-page-object\" module instead.", false, {
    id: 'ember-cli-page-object.import-from-test-support',
    until: "2.0.0",
    url: "https://gist.github.com/san650/17174e4b7b1fd80b049a47eb456a7cdc#file-import-from-test-support-js"
  }));
});
define("pilasbloques/tests/test-helper", ["pilasbloques/app", "pilasbloques/config/environment", "@ember/test-helpers", "ember-qunit", "pilasbloques/tests/helpers/resolver"], function (_app, _environment, _testHelpers, _emberQunit, _resolver) {
  "use strict";

  (0, _testHelpers.setResolver)(_resolver.default);
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("pilasbloques/tests/unit/components/pilas-blockly-test", ["qunit", "ember-qunit", "pilasbloques/tests/helpers/mocks", "pilasbloques/tests/helpers/utils", "sinon"], function (_qunit, _emberQunit, _mocks, _utils, _sinon) {
  "use strict";

  (0, _qunit.module)('Unit | Components | pilas-blockly', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:interpreterFactory', _mocks.interpreterFactoryMock);
      this.owner.lookup('service:highlighter').workspace = (0, _mocks.blocklyWorkspaceMock)();
      this.owner.lookup('service:blocksGallery').start();
      this.ctrl = this.owner.factoryFor('component:pilas-blockly').create();
      this.ctrl.pilas = _mocks.pilasMock; //TODO: Injectar como service

      this.ctrl.set('modelActividad', _mocks.actividadMock);

      _sinon.default.resetHistory();
    }); //TODO: Ver de agrupar en modules

    (0, _qunit.test)('Al ejecutar se encuentra ejecutando y ejecuta el intérprete', function (assert) {
      this.ctrl.send('ejecutar');
      assert.ok(this.ctrl.get('ejecutando'));
      assert.notOk(this.ctrl.get('pausadoEnBreakpoint'));
      assert.ok(_mocks.interpreteMock.run.called);
    });
    (0, _qunit.test)('Ejecutar paso a paso bloquea la ejecución', function (assert) {
      this.ctrl.send('ejecutar', true);
      Ember.run.later(() => {
        assert.ok(_mocks.interpreteMock.run.calledOnce);
        assert.ok(this.ctrl.get('pausadoEnBreakpoint'));
      });
    });
    (0, _qunit.test)('Step desbloquea el breakpoint', function (assert) {
      this.ctrl.send('ejecutar', true);
      Ember.run.later(() => {
        assert.ok(this.ctrl.get('pausadoEnBreakpoint'));
        this.ctrl.send('step');
        assert.notOk(this.ctrl.get('pausadoEnBreakpoint'));
      });
    });
    (0, _qunit.test)('Luego de ejecutar termina de ejecutar', function (assert) {
      this.ctrl.send('ejecutar');
      Ember.run.later(() => {
        assert.notOk(this.ctrl.get('ejecutando'));
        assert.ok(this.ctrl.get('terminoDeEjecutar'));
      });
    });
    (0, _qunit.test)('Al resolver el problema muestra el fin del desafío', function (assert) {
      this.ctrl.set('debeMostrarFinDeDesafio', true);
      this.ctrl.send('ejecutar');
      Ember.run.later(() => {
        assert.ok(this.ctrl.get('mostrarDialogoFinDesafio'));
      });
    });
    (0, _qunit.test)('Al reiniciar settea flags y reinicia la escena de pilas', function (assert) {
      this.ctrl.send('reiniciar');
      assert.notOk(this.ctrl.get('ejecutando'));
      assert.notOk(this.ctrl.get('terminoDeEjecutar'));
      assert.notOk(this.ctrl.get('errorDeActividad'));
      assert.ok(_mocks.pilasMock.reiniciarEscenaCompleta.called);
    });
    let filledProgram = "\n    <block type=\"al_empezar_a_ejecutar\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\"></block>\n      </statement>\n    </block>\n  ";
    let emptyProcedure = "    \n  <block type=\"procedures_defnoreturn\">\n    <field name=\"NAME\">Hacer algo</field>\n  </block>\n  ";
    (0, _qunit.test)('Ejecuta cuando todos los bloques están completos', function (assert) {
      Blockly.textToBlock(filledProgram);
      this.ctrl.send('ejecutar');
      assert.ok(_mocks.interpreteMock.run.called);
    });
    (0, _qunit.test)('No ejecuta cuando el programa tiene algún agujero', function (assert) {
      let program = "\n    <block type=\"al_empezar_a_ejecutar\">\n      <statement name=\"program\">\n        <block type=\"repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">10</field>\n            </block>\n          </value>\n        </block>\n      </statement>\n    </block>\n    ";
      Blockly.textToBlock(program);
      this.ctrl.send('ejecutar');
      assert.notOk(_mocks.interpreteMock.run.called);
    });
    (0, _qunit.test)('Ejecuta cuando existe algún bloque con agujeros pero no se usa', function (assert) {
      let bloqueSuelto = "    \n    <block type=\"repetir\" disabled=\"true\">\n      <value name=\"count\">\n        <block type=\"math_number\">\n          <field name=\"NUM\">10</field>\n        </block>\n      </value>\n    </block>\n    ";
      Blockly.textToBlock(filledProgram);
      Blockly.textToBlock(bloqueSuelto);
      this.ctrl.send('ejecutar');
      assert.ok(_mocks.interpreteMock.run.called);
    });
    (0, _qunit.test)('No ejecuta cuando existe algún procedimiento vacío', function (assert) {
      Blockly.textToBlock(filledProgram);
      Blockly.textToBlock(emptyProcedure);
      this.ctrl.send('ejecutar');
      assert.notOk(_mocks.interpreteMock.run.called);
    });
    (0, _qunit.test)('Al ejecutar aparecen los warnings de bloques vacíos', function (assert) {
      let procedure = Blockly.textToBlock(emptyProcedure);
      let required = (0, _utils.findBlockByTypeIn)(procedure, "required_statement");
      (0, _utils.assertNotWarning)(assert, required);
      this.ctrl.send('ejecutar');
      Ember.run.later(() => (0, _utils.assertWarning)(assert, required, "¡Acá faltan bloques comandos!"));
    });
  });
});
define("pilasbloques/tests/unit/components/pilas-editor-test", ["qunit", "ember-qunit", "pilasbloques/tests/helpers/mocks", "sinon"], function (_qunit, _emberQunit, _mocks, _sinon) {
  "use strict";

  (0, _qunit.module)('Unit | Components | pilas-editor', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      this.owner.register('service:interpreterFactory', _mocks.interpreterFactoryMock);
      this.ctrl = this.owner.factoryFor('component:pilas-editor').create();
      this.ctrl.set('model', _mocks.actividadMock);

      _sinon.default.resetHistory();
    });
    (0, _qunit.test)('Si el desafío necesita modo de lectura simple debería indicárselo a pilas', function (assert) {
      this.ctrl.send('onReady', _mocks.pilasMock);
      assert.ok(_mocks.pilasMock.cambiarAModoDeLecturaSimple.called);
    });
  });
});
define("pilasbloques/tests/unit/components/pilas-solution-file-test", ["qunit", "ember-qunit", "pilasbloques/tests/helpers/mocks", "sinon"], function (_qunit, _emberQunit, _mocks, _sinon) {
  "use strict";

  let ctrl;
  let version;
  let actividad = _mocks.actividadMock.nombre;
  let solucion = "PHhtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI+PHZhcmlhYmxlcz48L3ZhcmlhYmxlcz48YmxvY2sgdHlwZT0iYWxfZW1wZXphcl9hX2VqZWN1dGFyIiBpZD0idX4vczBQV1BEWkQ1aFEtLFFnPXQiIGRlbGV0YWJsZT0iZmFsc2UiIG1vdmFibGU9ImZhbHNlIiBlZGl0YWJsZT0iZmFsc2UiIHg9IjIyNyIgeT0iMTUiPjwvYmxvY2s+PC94bWw+";
  (0, _qunit.module)('Unit | Components | pilas-solution-file', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      ctrl = this.owner.factoryFor('component:pilas-solution-file').create();
      ctrl.set('actividad', _mocks.actividadMock);
      ctrl.descargar = _sinon.default.stub();
      version = ctrl.version();

      _sinon.default.resetHistory();
    });
    (0, _qunit.test)("Al guardar solución crea el archivo correctamente", function (assert) {
      let contenido = JSON.stringify({
        version,
        actividad,
        solucion: "bnVsbA=="
      });
      let archivo = "".concat(actividad, ".spbq");
      let tipo = 'application/octet-stream';
      ctrl.send("guardarSolucion");
      assert.ok(ctrl.descargar.calledWith(contenido, archivo, tipo));
    });
    let solucionCompleta = {
      version,
      actividad,
      solucion
    };
    goodFileTest("Carga un archivo de solución correctamente", solucionCompleta);
    let solucionCompletaConVersionPosterior = {
      version: 999,
      actividad,
      solucion
    };
    goodFileTest("Carga un archivo de solución aunque tenga una versión posterior", solucionCompletaConVersionPosterior);
    let solucionCompletaConVersionAnterior = {
      version: -1,
      actividad,
      solucion
    };
    failFileTest("Verifica que se está cargando una versión anterior", solucionCompletaConVersionAnterior, function (assert, err) {
      assert.equal(err, "Cuidado, el archivo indica que es de una versión anterior. Se cargará de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
    });
    failFileTest("Aunque no tenga una versión actual se carga al workspace", solucionCompletaConVersionAnterior, function (assert) {
      assert.ok(ctrl.get("workspace"));
    });
    let solucionCompletaSinVersion = {
      actividad,
      solucion
    };
    goodFileTest("Carga un archivo de solución aunque no tenga versión", solucionCompletaSinVersion);
    let solucionParaOtraActividad = {
      version,
      actividad: "Otra_Actividad",
      solucion
    };
    failFileTest("Verifica que sea para la actividad que se está cargando", solucionParaOtraActividad, function (assert, err) {
      assert.equal(err, "Cuidado, el archivo indica que es para otra actividad (Otra_Actividad). Se cargará de todas formas, pero puede fallar.");
    });
    failFileTest("Aunque no sea una solución para la actividad se carga al workspace", solucionParaOtraActividad, function (assert) {
      assert.ok(ctrl.get("workspace"));
    });
    let solucionCompletaConVersionAnteriorParaOtraActividad = {
      version: -1,
      actividad: "Otra_Actividad",
      solucion
    };
    failFileTest("Acumula las validaciones con soluciones", solucionCompletaConVersionAnteriorParaOtraActividad, function (assert, err) {
      assert.equal(err, "Cuidado, el archivo indica que es para otra actividad (Otra_Actividad). Se cargar\xE1 de todas formas, pero puede fallar.\nCuidado, el archivo indica que es de una versi\xF3n anterior. Se cargar\xE1 de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
    });
    failFileTest("Aunque no tenga versión actual y sea una solución para la actividad se carga al workspace", solucionCompletaConVersionAnteriorParaOtraActividad, function (assert) {
      assert.ok(ctrl.get("workspace"));
    });
    let archivoSinSolucion = {
      version,
      actividad
    };
    failFileTest("Verifica que tenga una solucion", archivoSinSolucion, function (assert, err) {
      assert.equal(err, "Lo siento, este archivo no tiene una solución de Pilas Bloques.");
    });
    failFileTest("Verifica que tenga una solucion", archivoSinSolucion, function (assert) {
      assert.notOk(ctrl.get("workspace"));
    });

    function goodFileTest(mensaje, contenido) {
      fileTest(mensaje, contenido, assert => {
        assert.ok(ctrl.get("workspace"));
      }, () => {});
    }

    function failFileTest(mensaje, contenido, cb) {
      fileTest(mensaje, contenido, () => {}, cb);
    }

    function fileTest(mensaje, contenido, cbGood, cbFail) {
      (0, _qunit.test)(mensaje, function (assert) {
        let done = assert.async();
        let archivo = new Blob([JSON.stringify(contenido)]);
        ctrl.leerSolucionWeb(archivo).then(() => {
          cbGood(assert);
          done();
        }).catch(err => {
          cbFail(assert, err);
          done();
        });
      });
    }
  });
});
define("pilasbloques/tests/unit/controllers/acercade-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | acercade', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:acercade');
      assert.ok(controller);
    });
  });
});
define("pilasbloques/tests/unit/controllers/test-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('controller:test', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      var controller = this.owner.lookup('controller:test');
      assert.ok(controller);
    });
  });
});
define("pilasbloques/tests/unit/models/desafio-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | desafio', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('desafio')); // let store = this.store();

      assert.ok(!!model);
    });
  });
});
define("pilasbloques/tests/unit/models/libro-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | libro', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let model = Ember.run(() => this.owner.lookup('service:store').createRecord('libro')); // let store = this.store();

      assert.ok(!!model);
    });
  });
});
define("pilasbloques/tests/unit/routes/acercade-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | acercade', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:acercade');
      assert.ok(route);
    });
  });
});
define("pilasbloques/tests/unit/routes/desafio-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | desafio', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:desafio');
      assert.ok(route);
    });
  });
});
define("pilasbloques/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("pilasbloques/tests/unit/services/available-blocks-validator-test", ["ember-qunit", "pilasbloques/tests/helpers/mocks", "pilasbloques/tests/helpers/utils"], function (_emberQunit, _mocks, _utils) {
  "use strict";

  var validator;
  (0, _emberQunit.moduleFor)('service:available-blocks-validator', 'Unit | Service | available-blocks-validator', {
    needs: ['service:blocksGallery', 'service:blockly'],

    setup() {
      (0, _mocks.blocklyWorkspaceMock)();
      validator = this.subject();
      this.container.lookup('service:blocksGallery').start();
    }

  });
  let simpleProgram = "\n<block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n    <statement name=\"program\">\n    <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"MoverACasillaIzquierda\"></block>\n        </next>\n    </block>\n    </statement>\n</block>\n";
  (0, _emberQunit.test)('Should not disable global available blocks', function (assert) {
    let program = Blockly.textToBlock(simpleProgram);
    validator.disableNotAvailableBlocksInWorkspace([]);
    (0, _utils.assertNotDisabled)(assert, program);
  });
  (0, _emberQunit.test)('Should disable not available activity blocks', function (assert) {
    let program = Blockly.textToBlock(simpleProgram);
    let moveLeft = (0, _utils.findBlockByTypeIn)(program, "MoverACasillaIzquierda");
    validator.disableNotAvailableBlocksInWorkspace(["MoverACasillaDerecha"]);
    assertNotAvailable(assert, moveLeft);
  });
  (0, _emberQunit.test)('Should not disable available activity blocks', function (assert) {
    let program = Blockly.textToBlock(simpleProgram);
    let moveRight = (0, _utils.findBlockByTypeIn)(program, "MoverACasillaDerecha");
    validator.disableNotAvailableBlocksInWorkspace(["MoverACasillaDerecha"]);
    (0, _utils.assertNotDisabled)(assert, moveRight);
  });
  let procedureDefinition = "\n<block type=\"procedures_defnoreturn\" id=\"whpKBVIV.;:t%=8XN+E_\" x=\"778\" y=\"185\">\n<mutation>\n  <arg name=\"param\"></arg>\n</mutation>\n<field name=\"NAME\">Hacer algo</field>\n<field name=\"ARG0\">param</field>\n<statement name=\"STACK\">\n  <block type=\"GirarGrados\" id=\";qf!gXUI;'/BUa0nx#y]\">\n    <value name=\"grados\">\n      <block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\">\n        <mutation var=\"param\" parent=\"whpKBVIV.;:t%=8XN+E_\"></mutation>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
  let procedureCallProgram = "\n<block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"0\" y=\"0\">\n<statement name=\"program\">\n  <block type=\"procedures_callnoreturn\">\n    <mutation name=\"Hacer algo\"></mutation>\n  </block>\n</statement>\n</block>\n";
  (0, _emberQunit.test)('Should disable procedure blocks when they are not available', function (assert) {
    let procedure = Blockly.textToBlock(procedureDefinition);
    let variable = (0, _utils.findBlockByTypeIn)(procedure, "variables_get");
    let program = Blockly.textToBlock(procedureCallProgram);
    let procedureCall = (0, _utils.findBlockByTypeIn)(program, "procedures_callnoreturn");
    validator.disableNotAvailableBlocksInWorkspace(["GirarGrados"]);
    assertNotAvailable(assert, procedure);
    assertNotAvailable(assert, variable);
    assertNotAvailable(assert, procedureCall);
  });
  (0, _emberQunit.test)('Should not disable procedure blocks when they are available', function (assert) {
    let procedure = Blockly.textToBlock(procedureDefinition);
    let variable = (0, _utils.findBlockByTypeIn)(procedure, "variables_get");
    let program = Blockly.textToBlock(procedureCallProgram);
    let procedureCall = (0, _utils.findBlockByTypeIn)(program, "procedures_callnoreturn");
    validator.disableNotAvailableBlocksInWorkspace(["GirarGrados", "Procedimiento"]);
    (0, _utils.assertNotDisabled)(assert, procedure);
    (0, _utils.assertNotDisabled)(assert, variable);
    (0, _utils.assertNotDisabled)(assert, procedureCall);
  });
  let mathArithmeticProgram = "\n<block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n<statement name=\"program\">\n  <block type=\"GirarGrados\">\n    <value name=\"grados\">\n      <block type=\"math_arithmetic\">\n        <field name=\"OP\">ADD</field>\n        <value name=\"A\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">90</field>\n          </block>\n        </value>\n        <value name=\"B\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">90</field>\n          </block>\n        </value>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
  (0, _emberQunit.test)('Should works for original blocks with alias', function (assert) {
    let program = Blockly.textToBlock(mathArithmeticProgram);
    let mathArithmetic = (0, _utils.findBlockByTypeIn)(program, "math_arithmetic");
    validator.disableNotAvailableBlocksInWorkspace(["GirarGrados", "OpAritmetica"]);
    (0, _utils.assertNotDisabled)(assert, mathArithmetic);
  });

  function assertNotAvailable(assert, block) {
    (0, _utils.assertDisabled)(assert, block);
    (0, _utils.assertWarning)(assert, block, "Este bloque no está disponible en esta actividad.");
  }
});
define("pilasbloques/tests/unit/services/blocks-gallery-test", ["qunit", "ember-qunit", "pilasbloques/tests/helpers/mocks", "pilasbloques/tests/helpers/utils"], function (_qunit, _emberQunit, _mocks, _utils) {
  "use strict";

  (0, _qunit.module)('Unit | Service | blocks-gallery', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      this.blocksGallery = this.owner.lookup('service:blocksGallery');
      this.blockly = this.owner.lookup('service:blockly');
      (0, _mocks.blocklyWorkspaceMock)();
      this.blocksGallery.start();
    }); ///////////// REQUIRED INPUTS /////////////

    function testHasRequiredInputs(blockType) {
      (0, _qunit.test)("".concat(blockType, " has required inputs"), function (assert) {
        let block = (0, _utils.createBlock)(blockType);
        assertRequiredInputs(assert, block, Blockly.INPUT_VALUE, 'required_value');
        assertRequiredInputs(assert, block, Blockly.NEXT_STATEMENT, 'required_statement');
      });
    }

    testHasRequiredInputs('al_empezar_a_ejecutar'); // Repeticiones

    testHasRequiredInputs('RepetirVacio');
    testHasRequiredInputs('Repetir');
    testHasRequiredInputs('Hasta'); // Alternativas

    testHasRequiredInputs('Si');
    testHasRequiredInputs('SiNo'); // Operadores

    testHasRequiredInputs('OpAritmetica');
    testHasRequiredInputs('OpComparacion'); // Primitivas

    testHasRequiredInputs('MoverA');
    testHasRequiredInputs('DibujarLado');
    testHasRequiredInputs('GirarGrados');
    testHasRequiredInputs('SaltarHaciaAdelante'); // testHasRequiredInputs('EscribirTextoDadoEnOtraCuadricula') // field_input (texto) por default ya tiene string vacío
    // Procedimientos

    testHasRequiredInputs('procedures_defnoreturn');
    let precedureCall = "\n<block type=\"procedures_callnoreturn\">\n  <mutation name=\"Hacer algo\">\n    <arg name=\"par\xE1metro 1\"></arg>\n  </mutation>\n</block>\n";
    (0, _qunit.test)('procedures_callnoreturn has required inputs', function (assert) {
      let block = Blockly.textToBlock(precedureCall);
      block.onchange(); // Force update

      assert.ok((0, _utils.findBlockByTypeIn)(block, "required_value"));
    }); // Toolbox

    let toolbox = "\n<block type=\"GirarGrados\">\n  <value name=\"grados\">\n    <block type=\"math_number\"><field name=\"NUM\">90</field></block>\n  </value>\n</block>\n";
    (0, _qunit.test)('When required input exists should be ok', function (assert) {
      let block = Blockly.textToBlock(toolbox);
      assert.notOk((0, _utils.findBlockByTypeIn)(block, "required_value"));
      assert.ok(block.allInputsFilled(false));
    });
    (0, _qunit.test)('When required input exists and it is disposed should be required again', function (assert) {
      let block = Blockly.textToBlock(toolbox);
      (0, _utils.findBlockByTypeIn)(block, "math_number").dispose();
      assert.ok((0, _utils.findBlockByTypeIn)(block, "required_value"));
      assert.notOk(block.allInputsFilled(false));
    });

    function assertRequiredInputs(assert, block, inputType, blockType) {
      block.inputList.filter(input => input.type == inputType).forEach(input => {
        let inputBlock = input.connection.targetBlock();
        assert.ok(inputBlock, "".concat(input.name, " is required"));
        assert.equal(inputBlock.type, blockType);
      });
    } ///////////// PARAMS /////////////


    let procedure = "\n<block type=\"procedures_defnoreturn\" id=\"whpKBVIV.;:t%=8XN+E_\" x=\"778\" y=\"185\">\n<mutation>\n  <arg name=\"param\"></arg>\n</mutation>\n<field name=\"NAME\">Hacer algo</field>\n<field name=\"ARG0\">param</field>\n<statement name=\"STACK\">\n  <block type=\"GirarGrados\" id=\";qf!gXUI;'/BUa0nx#y]\">\n    <value name=\"grados\">\n      <block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\">\n        <mutation var=\"param\" parent=\"whpKBVIV.;:t%=8XN+E_\"></mutation>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
    (0, _qunit.test)('Parameter in parent procedure should be ok', function (assert) {
      let param = findParam(Blockly.textToBlock(procedure));
      (0, _utils.assertNotDisabled)(assert, param);
      (0, _utils.assertNotWarning)(assert, param);
    });
    let procedureWithDeletedParam = "\n<block type=\"procedures_defnoreturn\" id=\"whpKBVIV.;:t%=8XN+E_\" x=\"778\" y=\"185\">\n<field name=\"NAME\">Hacer algo</field>\n<statement name=\"STACK\">\n  <block type=\"GirarGrados\" id=\";qf!gXUI;'/BUa0nx#y]\">\n    <value name=\"grados\">\n      <block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\">\n        <mutation var=\"param\" parent=\"whpKBVIV.;:t%=8XN+E_\"></mutation>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
    (0, _qunit.test)('Parameter in parent procedure without param should be disabled', function (assert) {
      let param = findParam(Blockly.textToBlock(procedureWithDeletedParam));
      assert.ok(param.disabled);
      assert.equal(param.warning.getText(), "Este bloque ya no puede usarse, el parámetro ha sido eliminado.");
    });
    let emptyProcedure = "\n<block type=\"procedures_defnoreturn\" id=\"whpKBVIV.;:t%=8XN+E_\" x=\"41\" y=\"112\">\n<mutation>\n  <arg name=\"param\"></arg>\n</mutation>\n<field name=\"NAME\">Hacer algo</field>\n<field name=\"ARG0\">param</field>\n</block>\n";
    let main = "\n<block type=\"al_empezar_a_ejecutar\" id=\"~7u[uK:$SQa$}1uY9,h6\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n<statement name=\"program\">\n  <block type=\"GirarGrados\" id=\"jvQK2Fm?8Sh72]]8qk$Z\">\n    <value name=\"grados\">\n      <block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\">\n        <mutation var=\"param\" parent=\"whpKBVIV.;:t%=8XN+E_\"></mutation>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
    (0, _qunit.test)('Parameter in non parent procedure should be disabled and with warning', function (assert) {
      Blockly.textToBlock(emptyProcedure);
      let param = findParam(Blockly.textToBlock(main));
      (0, _utils.assertDisabled)(assert, param);
      (0, _utils.assertWarning)(assert, param, "Este bloque no puede usarse aquí. Es un parámetro que sólo puede usarse en Hacer algo.");
    });
    let flying = "\n<block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\" disabled=\"true\" x=\"399\" y=\"294\">\n<mutation var=\"param\" parent=\"whpKBVIV.;:t%=8XN+E_\"></mutation>\n</block>\n";
    (0, _qunit.test)('Parameter in non parent procedure should only be disabled', function (assert) {
      Blockly.textToBlock(emptyProcedure);
      let param = findParam(Blockly.textToBlock(flying));
      (0, _utils.assertDisabled)(assert, param);
      (0, _utils.assertNotWarning)(assert, param);
    });
    (0, _qunit.test)('Parameter should dispose when procedure is disposed', function (assert) {
      let procedure = Blockly.textToBlock(emptyProcedure);
      let param = findParam(Blockly.textToBlock(flying));
      assert.ok(param.workspace);
      procedure.dispose();
      (0, _utils.assertAsync)(assert, function () {
        assert.notOk(param.workspace);
      });
    });
    let mainWithoutParent = "\n<block type=\"al_empezar_a_ejecutar\" id=\"~7u[uK:$SQa$}1uY9,h6\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n<statement name=\"program\">\n  <block type=\"GirarGrados\" id=\"jvQK2Fm?8Sh72]]8qk$Z\">\n    <value name=\"grados\">\n      <block type=\"variables_get\" id=\"wAE7-:@m*P0G[x'Uf$Hv\">\n        <mutation var=\"param\"></mutation>\n      </block>\n    </value>\n  </block>\n</statement>\n</block>\n";
    (0, _qunit.test)('Parameter without parent procedure should be always ok', function (assert) {
      let param = findParam(Blockly.textToBlock(mainWithoutParent));
      (0, _utils.assertNotDisabled)(assert, param);
      (0, _utils.assertNotWarning)(assert, param);
    });

    function findParam(rootBlock) {
      let param = (0, _utils.findBlockByTypeIn)(rootBlock, "variables_get");
      param.onchange(); // Force initialize

      return param;
    } ///////////// ALIAS /////////////


    let testAlias = function (alias, type) {
      (0, _qunit.test)("check if ".concat(alias, " block definition exist and is equal to ").concat(type, " block definition"), function (assert) {
        assert.ok(this.blocksGallery.areAliases(alias, type));
      });
    };

    testAlias('si', 'Si');
    testAlias('sino', 'SiNo');
    testAlias('Sino', 'SiNo');
    testAlias('hasta', 'Hasta');
    testAlias('prenderCompuConColision', 'PrenderComputadora');
    testAlias('PrenderCompu', 'PrenderComputadora');
    testAlias('ApagarCompu', 'ApagarComputadora');
    testAlias('SiguienteCompu', 'PasarASiguienteComputadora');
    testAlias('Descubralculpable', 'EsCulpable');
    testAlias('repetir', 'Repetir');
    testAlias('tocandoBanana', 'TocandoBanana');
    testAlias('tocandoManzana', 'TocandoManzana');
    testAlias('Dejarregalo', 'DejarRegalo');
    testAlias('Contarbanana', 'ContarBanana');
    testAlias('Contarmanzana', 'ContarManzana');
    testAlias('AvanzarKm', 'Avanzar1km');
    testAlias('cambiarColor', 'CambiarColor');
    testAlias('empezarFiesta', 'EmpezarFiesta');
    testAlias('Volveralbordeizquierdo', 'VolverAlBordeIzquierdo');
    testAlias('Primersospechoso', 'IrAlPrimerSospechoso');
    testAlias('PrimerSospechoso', 'IrAlPrimerSospechoso');
    testAlias('Siguientesospechoso', 'IrAlSiguienteSospechoso');
    testAlias('SiguienteSospechoso', 'IrAlSiguienteSospechoso');
    testAlias('Sacardisfraz', 'InterrogarSospechoso');
    testAlias('SacarDisfraz', 'InterrogarSospechoso');
    testAlias('Estoyenunaesquina', 'EstoyEnEsquina');
    testAlias('tocandoFogata', 'TocandoFogata');
    testAlias('tocandoInicio', 'TocandoInicio');
    testAlias('tocandoFinal', 'TocandoFinal');
    testAlias('tocandoPelota', 'TocandoPelota');
    testAlias('tocandoQueso', 'TocandoQueso');
    testAlias('tocandoLuz', 'TocandoLuz');
    testAlias('Abrirojos', 'AbrirOjos');
    testAlias('Cerrarojos', 'CerrarOjos');
    testAlias('Soar', 'Soniar');
    testAlias('Agarrarllave', 'AgarrarLlave');
    testAlias('Abrircofre', 'AbrirCofre');
    testAlias('Darsombrero', 'DarSombrero');
    testAlias('Atacarconespada', 'AtacarConEspada');
    testAlias('Escaparenunicornio', 'EscaparEnUnicornio');
    testAlias('estoyInicio', 'EstoySobreElInicio');
    testAlias('estoyAlInicio', 'EstoySobreElInicio');
    testAlias('estoyFinColumna', 'EstoySobreElFinal');
    testAlias('EstoyAlFin', 'EstoySobreElFinal');
    testAlias('ComerBananaNano', 'ComerBanana');
    testAlias('saltar1', 'SaltarHablando');
  });
});
define("pilasbloques/tests/unit/services/highlighter-test", ["qunit", "ember-qunit", "pilasbloques/tests/helpers/mocks"], function (_qunit, _emberQunit, _mocks) {
  "use strict";

  var highlighter;
  (0, _qunit.module)('Unit | Service | highlighter', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    hooks.beforeEach(function () {
      highlighter = this.owner.lookup('service:highlighter');
      this.blockly = this.owner.lookup('service:blockly');
      highlighter.workspace = (0, _mocks.blocklyWorkspaceMock)();
      highlighter.clear();
      this.owner.lookup('service:blocksGallery').start();
    });
    let linealProgram = ["\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n      <statement name=\"program\">\n      <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaIzquierda\">\n              <next>\n              <block type=\"MoverACasillaDerecha\"></block>\n              </next>\n          </block>\n          </next>\n      </block>\n      </statement>\n  </block>\n  "];
    (0, _qunit.test)('Should not highlight program block', function (assert) {
      loadProgramAndSendSteps(1, linealProgram);
      assertHighlight(assert, []);
    });
    (0, _qunit.test)('On lineal program should highlight only current block', function (assert) {
      loadProgramAndSendSteps(3, linealProgram);
      assertHighlight(assert, ['MoverACasillaIzquierda']);
    });
    (0, _qunit.test)('At finish, last block stay highlighted', function (assert) {
      loadProgramAndSendSteps(Infinity, linealProgram);
      assertHighlight(assert, ['MoverACasillaDerecha']);
    });
    let repetitionProgram = ["\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n      <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n          <next>\n          <block type=\"repetir\">\n              <value name=\"count\">\n              <block type=\"math_number\">\n                  <field name=\"NUM\">1</field>\n              </block>\n              </value>\n              <statement name=\"block\">\n              <block type=\"MoverACasillaIzquierda\">\n                  <next>\n                  <block type=\"MoverACasillaDerecha\"></block>\n                  </next>\n              </block>\n              </statement>\n              <next>\n              <block type=\"MoverACasillaAbajo\"></block>\n              </next>\n          </block>\n          </next>\n      </block>\n      </statement>\n  </block>\n  "];
    (0, _qunit.test)('Should highlight repetition block', function (assert) {
      loadProgramAndSendSteps(3, repetitionProgram);
      assertHighlight(assert, ['repetir']);
    });
    (0, _qunit.test)('When enter on repetition block should only highlight current block', function (assert) {
      loadProgramAndSendSteps(5, repetitionProgram);
      assertHighlight(assert, ['MoverACasillaDerecha']);
    });
    (0, _qunit.test)('When go out repetition block should only highlight next block', function (assert) {
      loadProgramAndSendSteps(6, repetitionProgram);
      assertHighlight(assert, ['MoverACasillaAbajo']);
    });
    let alternativeProgram = ["\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"269\" y=\"15\">\n      <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\">\n          <next>\n          <block type=\"si\">\n              <value name=\"condition\">\n              <block type=\"HayTomate\"></block>\n              </value>\n              <statement name=\"block\">\n              <block type=\"MoverACasillaArriba\">\n                  <next>\n                  <block type=\"MoverACasillaAbajo\"></block>\n                  </next>\n              </block>\n              </statement>\n              <next>\n              <block type=\"MoverACasillaAbajo\"></block>\n              </next>\n          </block>\n          </next>\n      </block>\n      </statement>\n  </block>\n  "];
    (0, _qunit.test)('Should highlight alternative block', function (assert) {
      loadProgramAndSendSteps(3, alternativeProgram);
      assertHighlight(assert, ['si']);
    });
    (0, _qunit.test)('When enter on alternative block should only highlight current block', function (assert) {
      loadProgramAndSendSteps(5, alternativeProgram);
      assertHighlight(assert, ['MoverACasillaAbajo']);
    });
    (0, _qunit.test)('When go out alternative block should only highlight next block', function (assert) {
      loadProgramAndSendSteps(6, alternativeProgram);
      assertHighlight(assert, ['MoverACasillaAbajo']);
    });
    let programWithProcedures = ["\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"DibujarLado\">\n          <value name=\"longitud\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">100</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"procedures_callnoreturn\">\n              <mutation name=\"procedimiento general\"></mutation>\n              <next>\n                <block type=\"DibujarLado\">\n                  <value name=\"longitud\">\n                    <block type=\"math_number\">\n                      <field name=\"NUM\">100</field>\n                    </block>\n                  </value>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n  </block>", "<block type=\"procedures_defnoreturn\" x=\"46\" y=\"247\">\n      <field name=\"NAME\">procedimiento general</field>\n      <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n      <statement name=\"STACK\">\n        <block type=\"GirarGrados\">\n          <value name=\"grados\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">90</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"procedures_callnoreturn\">\n              <mutation name=\"procedimiento especifico\"></mutation>\n              <next>\n                <block type=\"GirarGrados\">\n                  <value name=\"grados\">\n                    <block type=\"math_number\">\n                      <field name=\"NUM\">90</field>\n                    </block>\n                  </value>\n                </block>\n              </next>\n            </block>\n          </next>\n        </block>\n      </statement>\n  </block>", "<block type=\"procedures_defnoreturn\" x=\"62\" y=\"421\">\n      <field name=\"NAME\">procedimiento especifico</field>\n      <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n      <statement name=\"STACK\">\n        <block type=\"SaltarHaciaAdelante\">\n          <value name=\"longitud\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">100</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"SaltarHaciaAdelante\">\n              <value name=\"longitud\">\n                <block type=\"math_number\">\n                  <field name=\"NUM\">100</field>\n                </block>\n              </value>\n            </block>\n          </next>\n        </block>\n      </statement>\n  </block>\n  "];
    (0, _qunit.test)('Should not highlight procedure definition block', function (assert) {
      loadProgramAndSendSteps(4, programWithProcedures);
      assertHighlight(assert, ['procedures_callnoreturn']);
    });
    (0, _qunit.test)('When enter on procedure block should highlight procedure call and current block', function (assert) {
      loadProgramAndSendSteps(5, programWithProcedures);
      assertHighlight(assert, ['procedures_callnoreturn', 'GirarGrados']);
    });
    (0, _qunit.test)('Step on procedure block should highlight procedure call and go lineal', function (assert) {
      loadProgramAndSendSteps(6, programWithProcedures);
      assertHighlight(assert, ['procedures_callnoreturn', 'procedures_callnoreturn']);
    });
    (0, _qunit.test)('Should highlight all procedure calls involve in current stack', function (assert) {
      loadProgramAndSendSteps(8, programWithProcedures);
      assertHighlight(assert, ['procedures_callnoreturn', 'procedures_callnoreturn', 'SaltarHaciaAdelante']);
    });
    (0, _qunit.test)('When go out procedure block should only highlight next block', function (assert) {
      loadProgramAndSendSteps(11, programWithProcedures);
      assertHighlight(assert, ['DibujarLado']);
    });
    let programFinishInProcedure = ["\n  <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"DibujarLado\">\n          <value name=\"longitud\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">100</field>\n            </block>\n          </value>\n          <next>\n            <block type=\"procedures_callnoreturn\">\n              <mutation name=\"procedimiento general\"></mutation>\n            </block>\n          </next>\n        </block>\n      </statement>\n  </block>", "<block type=\"procedures_defnoreturn\" x=\"46\" y=\"247\">\n      <field name=\"NAME\">procedimiento general</field>\n      <comment pinned=\"false\" h=\"80\" w=\"160\">Describe esta funci\xF3n...</comment>\n      <statement name=\"STACK\">\n        <block type=\"GirarGrados\">\n          <value name=\"grados\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">90</field>\n            </block>\n          </value>\n        </block>\n      </statement>\n  </block>"];
    (0, _qunit.test)('When program finishes with procedure call should highlight both blocks', function (assert) {
      loadProgramAndSendSteps(Infinity, programFinishInProcedure);
      assertHighlight(assert, ['procedures_callnoreturn', 'GirarGrados']);
    });

    function loadProgramAndSendSteps(steps, blocksAsText) {
      let definitionIndex = 0;
      let definitionBlocks = blocksAsText.map(Blockly.textToBlock);
      let ignoredBlockTypes = ["math_number", "HayTomate"]; // Esta ejecución solamente RECORRE los bloques. ¡No tiene en cuenta la lógica!
      // En los procedure_call ejecuta el próximo bloque de definición

      function doStep(block) {
        if (steps === 0 || ignoredBlockTypes.includes(block.type)) return;
        highlighter.step(block.id);
        steps--;

        if (block.defType_) {
          // procedure_call
          definitionIndex++;
          doStep(definitionBlocks[definitionIndex]);
        }

        block.getChildren().forEach(doStep);
      }

      doStep(definitionBlocks[definitionIndex]);
    } //TODO: Config assert?


    function assertHighlight(assert, expectedTypes) {
      assertLength(assert, highlighter.blocks, expectedTypes.length);
      assertTypes(assert, highlighter.blocks, expectedTypes);
    }

    function assertTypes(assert, blocks, expectedTypes) {
      assert.deepEqual(blocks.map(it => it.type), expectedTypes);
    } //TODO: Mover a un lugar más general


    function assertLength(assert, list, count) {
      assert.deepEqual(list.length, count);
    }
  });
});
define("pilasbloques/tests/unit/services/notificador-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | notificador', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:notificador');
      assert.ok(service);
      assert.ok(service.esVersionAnterior("1.0.0", "1.1.1"), "La versión 1.1.1 es superior a la 1.0.0.");
      assert.ok(service.esVersionAnterior("1.0.0", "2.0.0"), "La versión 2.0.0 es superior a la 1.0.0.");
      assert.ok(service.esVersionAnterior("1.0.0", "2"), "La versión 2 es superior a la 1.0.0.");
      assert.notOk(service.esVersionAnterior("1.0.0", "1"), "Es la misma versión, no hay que actualizar.");
      assert.notOk(service.esVersionAnterior("1.2.0", "1.0.0"), "Hay una versión más nueva en ejecución, no hay que actualizar.");
      assert.notOk(service.esVersionAnterior("1.0.1", "1.0.1+c6e44"), "Asume que son la misma versión, porque es una versión  en desarrollo.");
      assert.notOk(service.esVersionAnterior("1.0.1+a33ce", "1.0.1+c6e44"), "Asume que son la misma versión, porque es una versión  en desarrollo.");
      assert.notOk(service.esVersionAnterior("1.1.0+b398e2bc", "1.0.8"), "Mismo major, minor mayor, patch menor debe dar false");
    });
  });
});
define("pilasbloques/tests/unit/services/pilas-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | pilas', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:pilas');
      assert.ok(service);
    });
  });
});
define("pilasbloques/tests/unit/services/zoom-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | zoom', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:zoom');
      assert.ok(service);
    });
  });
});
define('pilasbloques/config/environment', [], function() {
  var prefix = 'pilasbloques';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('pilasbloques/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
