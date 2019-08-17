'use strict';



;define("pilasbloques/app", ["exports", "pilasbloques/resolver", "ember-load-initializers", "pilasbloques/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("pilasbloques/breakpoints", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 992px)',
    desktop: '(min-width: 993px) and (max-width: 1200px)',
    jumbo: '(min-width: 1201px)'
  };
  _exports.default = _default;
});
;define("pilasbloques/components/ember-blockly-catalog", ["exports", "ember-blockly/components/ember-blockly-catalog"], function (_exports, _emberBlocklyCatalog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberBlocklyCatalog.default;
    }
  });
});
;define("pilasbloques/components/ember-blockly-list-item", ["exports", "ember-blockly/components/ember-blockly-list-item"], function (_exports, _emberBlocklyListItem) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberBlocklyListItem.default;
    }
  });
});
;define("pilasbloques/components/ember-blockly-list-with-selection", ["exports", "ember-blockly/components/ember-blockly-list-with-selection"], function (_exports, _emberBlocklyListWithSelection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberBlocklyListWithSelection.default;
    }
  });
});
;define("pilasbloques/components/ember-blockly-preview", ["exports", "ember-blockly/components/ember-blockly-preview"], function (_exports, _emberBlocklyPreview) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberBlocklyPreview.default;
    }
  });
});
;define("pilasbloques/components/ember-blockly", ["exports", "ember-blockly/components/ember-blockly"], function (_exports, _emberBlockly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberBlockly.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog-positioned-container", ["exports", "ember-modal-dialog/components/positioned-container"], function (_exports, _positionedContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _positionedContainer.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog/-basic-dialog", ["exports", "ember-modal-dialog/components/basic-dialog"], function (_exports, _basicDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _basicDialog.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog/-in-place-dialog", ["exports", "ember-modal-dialog/components/in-place-dialog"], function (_exports, _inPlaceDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inPlaceDialog.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog/-liquid-dialog", ["exports", "ember-modal-dialog/components/liquid-dialog"], function (_exports, _liquidDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidDialog.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog/-liquid-tether-dialog", ["exports", "ember-modal-dialog/components/liquid-tether-dialog"], function (_exports, _liquidTetherDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidTetherDialog.default;
    }
  });
});
;define("pilasbloques/components/ember-modal-dialog/-tether-dialog", ["exports", "ember-modal-dialog/components/tether-dialog"], function (_exports, _tetherDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _tetherDialog.default;
    }
  });
});
;define("pilasbloques/components/ember-wormhole", ["exports", "ember-wormhole/components/ember-wormhole"], function (_exports, _emberWormhole) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
;define("pilasbloques/components/info-reportar-problema", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("pilasbloques/components/listaImagenes", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // Autogenerado por scripts/generarListaImagenes.py
  // Todo cambio se sobreescribira.
  var _default = ["PlacaContarGris.png", "PlacaContarNegra.png", "actor.BoyScout.png", "actor.Fogata.png", "actor.charco.png", "actor.churrasco.png", "actor.coty.png", "actor.duba.png", "actor.ensaladera.png", "actor.lechuga.png", "actor.letra.leida.png", "actor.letra.manuscrita.png", "actor.letra.tablero.png", "actor.lita.png", "actor.tomate.png", "actor.toto.png", "alienAnimado.png", "alimento_pez.png", "balloon-tip-left.png", "balloon-tip-right.png", "balloon-tip-think-left.png", "balloon-tip-think-right.png", "balloon.png", "banana-1.png", "banana.nano.png", "boton.pboton_press.png", "botonAnimado.png", "bruja.png", "buzo.png", "caballero_oscuro.png", "camino-alien-boton.png", "cangrejo.png", "carbon_animado.png", "casilla.alienLevantaTuercas.png", "casilla.cangrejo_aguafiestas.png", "casilla.futbolRobots1.png", "casilla.futbolRobots2.png", "casilla.grisoscuro.png", "casilla.mariaSandia.png", "casilla.mono.contar.png", "casilla.prendiendoLasCompus.png", "casilla.prendiendoLasCompus2.png", "casilla.prendiendoLasFogatas.png", "casilla.prendiendoLasFogatas2.png", "casilla.recolector.png", "casilla.reparandoNave.png", "casilla.titoFinalizacion.png", "casilla.tresNaranjas.png", "casillaAbajo.png", "casillaArriba.png", "casillaDerecha.png", "casillaIzquierda.png", "casilla_base.png", "casillafinalmono.png", "casillainiciomono.png", "casillamediomono.png", "casillas.alien_inicial.png", "casillas.duba.png", "casillas.elPlanetaDeNano.png", "casillas.lita.png", "casillas.toto.png", "casillas.violeta.png", "cofreAnimado.png", "comedor_naranjas.png", "compu_animada.png", "computadoraAnimada2.png", "cooperativista.sprites.png", "detective.png", "dibujante.png", "dracula.png", "estrellaAnimada.png", "finCamino.png", "flechaEscenarioAleatorio.png", "focos.color.png", "fondo.BosqueDeNoche.png", "fondo.alimentando_peces.png.png", "fondo.blanco.png", "fondo.cangrejo_aguafiestas.png", "fondo.coty.png", "fondo.detective.png", "fondo.dibujando.figuras.png", "fondo.duba.png", "fondo.elMarcianoEnElDesierto.png", "fondo.elPlanetaDeNano.png", "fondo.elSuperviaje.png", "fondo.fiestadracula.png", "fondo.gatoEnLaCalle.png", "fondo.laberinto.corto.png", "fondo.laberinto.largo.png", "fondo.laberinto.queso.png", "fondo.lita.png", "fondo.marEncantado.png", "fondo.mariaSandia.png", "fondo.mono.contar.png", "fondo.monoCuentadeNuevo.png", "fondo.noMeCansoDeSaltar.png", "fondo.prendiendoLasCompus.png", "fondo.recolector.png", "fondo.salvandonavidad.png", "fondo.superTito1.png", "fondo.superTito2.png", "fondo.tito-cuadrado.png", "fondo.toto.png", "fondo.tresNaranjas.png", "fondos.alien-inicial.png", "fondos.alienLevantaTuercas.png", "fondos.biblioteca.png", "fondos.elPlanetaDeNano.png", "fondos.estrellas.png", "fondos.futbolRobots.png", "fondos.laberinto1.png", "fondos.mar.png", "fondos.navidad.png", "fondos.nubes.png", "fondos.obrero.png", "fondos.reparandoLaNave.png", "fondos.selva.png", "frank.png", "gatoAnimado.png", "globoAnimado.png", "heroe.png", "heroina.png", "hierro_animado.png", "hueso.png", "icono.ComputadoraPrendida.png", "iconos.lamparita.png", "instalador.png", "invisible.png", "lamparin.png", "libretaToto.png", "llaveAnimada.png", "mago.png", "manoToto.png", "manzanaConSombra.png", "manzanaSinSombra.png", "marcianoAnimado.png", "maria.png", "monkey_normal.png", "monoAnimado.png", "murcielago.png", "nano.png", "naranja.png", "naveAnimada.png", "obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png", "obstaculo.lita1.png", "obstaculo.lita2.png", "obstaculo.lita3.png", "obstaculo.lita4.png", "papaNoel.png", "pelota.png", "pelotaAnimada.png", "pensamientoToto.png", "perro_cohete.png", "pez1.png", "pez2.png", "pez3.png", "placacontar.png", "plano.png", "portada.lightbot.png", "portada.nano.png", "princesa.png", "principe.png", "queso.png", "quesoAnimado.png", "raton.png", "ratonAnimado.png", "recolectorAnimado.png", "regalo.png", "robotAnimado.png", "sandia.png", "sin_imagen.png", "sospechosos.png", "sprites.png", "superheroe.png", "tito.png", "tuerca.png", "unicornio.heroina.png", "unicornio.png"];
  _exports.default = _default;
});
;define("pilasbloques/components/modal-ayuda", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    actions: {
      close() {
        this.set("mostrar", false);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/modal-dialog", ["exports", "ember-modal-dialog/components/modal-dialog"], function (_exports, _modalDialog) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _modalDialog.default;
    }
  });
});
;define("pilasbloques/components/modal-title", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    actions: {
      ocultar() {
        if (this.close) this.close();
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-acerca-de", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-blockly", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: 'desafio-panel-derecho',
    ejecutando: false,
    terminoDeEjecutar: false,
    errorDeActividad: null,
    cola_deshacer: [],
    data_observar_blockly: false,
    actividad: null,
    interpreterFactory: Ember.inject.service(),
    abrirConsignaInicial: false,
    solucion: null,
    pilas: null,
    // Se espera que sea una referencia al servicio pilas.
    codigoJavascript: "",
    // Se carga como parametro
    persistirSolucionEnURL: false,
    // se le asigna una valor por parámetro.
    debeMostrarFinDeDesafio: false,
    codigo: null,
    modelActividad: null,
    modoTuboHabilitado: false,
    highlighter: Ember.inject.service(),
    availableBlocksValidator: Ember.inject.service(),
    bloques: [],
    codigoActualEnFormatoXML: '',
    // se actualiza automáticamente al modificar el workspace.
    anterior_ancho: -1,
    anterior_alto: -1,
    blockly_toolbox: [{
      category: '...',
      blocks: []
    }],
    pasoAPasoHabilitado: false,
    pausadoEnBreakpoint: false,
    javascriptCode: null,
    inyectarRedimensionado: Ember.on('init', function () {
      // Muestra el dialogo inicial si está definida la consigna inicial.
      if (this.get('actividad.actividad.consignaInicial')) {
        Ember.run.later(() => {
          this.set('abrirConsignaInicial', true);
        });
      }
    }),
    debeMostarRegresarAlLibro: Ember.computed('model', function () {
      return true;
    }),
    debeMostarReiniciar: Ember.computed('ejecutando', 'terminoDeEjecutar', function () {
      return this.ejecutando || this.terminoDeEjecutar;
    }),
    estoyEnMoodle: Ember.computed('modoAlumno', 'modoDocente', function () {
      return this.modoAlumno || this.modoDocente;
    }),

    didInsertElement() {
      var event = new Event('terminaCargaInicial');
      window.dispatchEvent(event);
      Ember.run.scheduleOnce('afterRender', () => {
        this.set('blockly_toolbox', this.obtenerToolboxDesdeListaDeBloques(this.bloques));
        this.set('blockly_comments', this.get('actividad.puedeComentar'));
        this.set('blockly_disable', this.get('actividad.puedeDesactivar'));
        this.set('blockly_duplicate', this.get('actividad.puedeDuplicar')); // Elijo el estilo default de toolbox si es que no viene indicado en el desafio

        if (!this.modelActividad.get('estiloToolbox')) {
          this.modelActividad.set('estiloToolbox', 'desplegable');
        } // Si el código está serializado en la URL, lo intenta colocar en el
        // workspace.


        if (this.codigo) {
          let codigoSerializado = this.codigo;
          let codigoXML = atob(codigoSerializado);
          this.set('initial_workspace', codigoXML);
        } else if (this.modelActividad.get('solucionInicial')) {
          //también puede venir código de la configuración de la actividad.
          this.set('initial_workspace', this.modelActividad.get('solucionInicial'));
        } else {
          //Sino, el código por defecto es el empezar a ejecutar
          this.set('initial_workspace', this._xmlBloqueEmpezarAEjecutar());
        }
      });

      if (this.persistirSolucionEnURL) {} // TODO: puede que esto quede en desuso.
      // Este es un hook para luego agregar a la interfaz 
      // el informe deseado al ocurrir un error.


      this.pilas.on("errorDeActividad", motivoDelError => {
        Ember.run(this, function () {
          this.set('errorDeActividad', motivoDelError);
        });
      });
      $(window).trigger('resize');
    },

    _xmlBloqueEmpezarAEjecutar() {
      return "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" x=\"15\" y=\"15\"></block>\n    </xml>";
    },

    /**
     * Genera el toolbox como lista de categorias con bloques a partir
     * de una lista de bloques simples.
     *
     * Por ejemplo:
     *
     *  >> obtenerToolboxDesdeListaDeBloques(['MoverDerecha', 'TocaSensor', 'TocaEnemigo'])
     *
     * [
     *    {
     *      category: 'Primitivas',
     *      blocks: ['MoverDerecha']
     *    },
     *    {
     *      category: 'Sensores',
     *      blocks: ['TocaSensor', 'TocaEnemigo']
     *    },
     * ]
     *
     */
    obtenerToolboxDesdeListaDeBloques(bloques) {
      if (bloques === undefined) {
        throw new Error("La actividad no tiene bloques definidos, revise el fixture de la actividad para migrarla a ember-blocky.");
      }

      let toolbox = [];
      bloques.forEach(bloque => {
        let bloqueDesdeBlockly = this._obtenerBloqueDesdeBlockly(bloque);

        if (bloqueDesdeBlockly && bloqueDesdeBlockly.categoria) {
          this._agregar_bloque_a_categoria(toolbox, bloqueDesdeBlockly.categoria, bloque, bloqueDesdeBlockly.categoria_custom);
        } else {
          this._agregar_bloque_a_categoria(toolbox, 'SIN CATEGORÍA', bloque);
        }
      });
      toolbox.push({
        category: 'Separator',
        isSeparator: true
      });
      return this._aplicarEstiloAToolbox(this.ordenar_toolbox(toolbox));
    },

    /**
     * Dependiendo del desafío, puede pasar que sea necesario no mostrar las categorías
     * sino directamente los bloques en el toolbox.
     * 
     * TODO: Falta implementar el estilo "desplegado"
     */
    _aplicarEstiloAToolbox(toolbox) {
      var aplanado = toolbox;

      if (!this._debeHaberCategoriasEnToolbox()) {
        aplanado = [];
        toolbox.forEach(bloque => {
          if (bloque.isSeparator || !bloque.category) {
            aplanado.push(bloque); //un separador ó un id de bloque van directo
          } else {
            aplanado = aplanado.concat(this._aplicarEstiloAToolbox(bloque.blocks));
          }
        });
      }

      return aplanado;
    },

    _debeHaberCategoriasEnToolbox() {
      return this.modelActividad.get('estiloToolbox') !== "sinCategorias";
    },

    /**
     * Ordena la lista de ítems de un toolbox (usualmente categorias), por el orden
     * establecido en Pilas Bloques. 
     * Las categorías que no están en la lista definida por Pilas Bloques, quedan al final.
     * @param {*} toolbox 
     */
    ordenar_toolbox(toolbox) {
      let orden_inicial = [// Orden inicial para la lista de categorias.
      'Primitivas', 'Mis procedimientos', 'Repeticiones', 'Alternativas', 'Variables', 'Separator', 'Valores', 'Sensores', 'Operadores', 'Mis funciones'];
      return toolbox.sort((cat1, cat2) => orden_inicial.indexOf(cat1.category) >= orden_inicial.indexOf(cat2.category));
    },

    /**
     * Permite obtener el bloque desde blockly a partir de su nombre simple.
     *
     * TODO: Mover a ember-blockly. Debería estar dentro del servicio blockly.
     */
    _obtenerBloqueDesdeBlockly(bloqueComoString) {
      return Blockly.Blocks[bloqueComoString];
    },

    /**
     * Método auxiliar de "obtenerToolboxDesdeListaDeBloques". Este método
     * permite agregar un bloque a una categoría dentro del toolbox.
     */
    _agregar_bloque_a_categoria(toolbox, categoria, bloque, categoria_custom) {
      function obtenerOCrearCategoria(toolbox, categoria) {
        for (let i = 0; i < toolbox.length; i++) {
          if (toolbox[i].category === categoria) {
            return toolbox[i];
          }
        }

        toolbox.push({
          category: categoria,
          blocks: []
        });
        return toolbox[toolbox.length - 1];
      }

      let categoriaEnElToolbox = obtenerOCrearCategoria(toolbox, categoria);

      if (categoria_custom) {
        categoriaEnElToolbox.custom = categoria_custom;
      }

      categoriaEnElToolbox.blocks.push(bloque);
    },

    ejecutarInterpreteHastaTerminar(interprete, pasoAPaso) {
      // Se abre una promise que termina cuando:
      //     o bien se llega al último comando escrito en el workspace
      //     o bien el usuario frena la ejecución
      //     o bien existe un error en la escena de pilas web
      return new Promise((success, reject) => {
        let hayMasParaEjecutarDespues;

        let execInterpreterUntilEnd = interpreter => {
          // Si el usuario solicitó terminar el programa deja
          // de ejecutar el intérprete.
          if (!this.ejecutando) {
            success();
            return;
          }

          let err = this.errorDeActividad;

          if (err) {
            reject(new ErrorDeActividad(err));
            return;
          }

          try {
            if (pasoAPaso) {
              // Si está activado el modo depurador, intentará suspender
              // la llamada a interpreter.run() hasta que el usuario pulse
              // el botón step.
              if (interpreter.paused_ === false && !this.pausadoEnBreakpoint) {
                hayMasParaEjecutarDespues = interpreter.run();
                this.set('pausadoEnBreakpoint', true);
              }
            } else {
              hayMasParaEjecutarDespues = interpreter.run();
            }
          } catch (e) {
            console.log(e);
            reject(e);
          }

          if (hayMasParaEjecutarDespues) {
            // Llama recursivamente, abriendo thread en cada llamada.
            setTimeout(execInterpreterUntilEnd, 10, interpreter);
          } else {
            success();
          }
        };

        execInterpreterUntilEnd(interprete);
      });
    },

    cuandoTerminaEjecucion() {
      Ember.run(this, function () {
        if (this.onTerminoEjecucion) this.onTerminoEjecucion();

        if (this.debeMostrarFinDeDesafio) {
          if (this.pilas.estaResueltoElProblema() && this.modelActividad.get('debeFelicitarse')) {
            this.send('abrirFinDesafio');
          }
        }

        if (this.ejecutando) {
          this.set('ejecutando', false);
          this.set('terminoDeEjecutar', true);
          this.clearHighlight();
        }
      });
    },

    willDestroyElement() {
      window.removeEventListener('terminaCargaInicial', this.handlerCargaInicial, false);
    },

    restaurar_codigo(codigo) {
      var xml = Blockly.Xml.textToDom(codigo);

      if (Blockly.mainWorkspace) {
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
      }
    },

    setModoTurbo() {
      if (this.modoTuboHabilitado) {
        this.pilas.habilitarModoTurbo();
      } else {
        this.pilas.deshabilitarModoTurbo();
      }
    },

    clearHighlight() {
      this.highlighter.clear();
    },

    allEnabledTopBlocksFilled() {
      return Blockly.mainWorkspace.getTopBlocks().filter(block => !block.disabled).every(block => block.allInputsFilled(false));
    },

    actions: {
      ejecutar(pasoAPaso = false) {
        Blockly.Events.fireRunCode();
        if (!this.allEnabledTopBlocksFilled()) return;
        this.pilas.reiniciarEscenaCompleta();
        this.setModoTurbo(); // Permite obtener el código xml al momento de ejecutar. Se utiliza
        // cuando se accede a la ruta curso/alumno para guardar la solución
        // del usuario en cada momento de ejecución.

        if (this.cuandoEjecuta) {
          let codigo_xml = this.codigoActualEnFormatoXML;
          this.cuandoEjecuta(codigo_xml);
        }

        let factory = this.interpreterFactory;
        let interprete = factory.crearInterprete(this.javascriptCode, bloqueId => this.highlighter.step(bloqueId));
        this.set('pausadoEnBreakpoint', false);
        this.set('ejecutando', true);
        this.ejecutarInterpreteHastaTerminar(interprete, pasoAPaso).then(() => this.cuandoTerminaEjecucion()).catch(ErrorDeActividad, err => {
          /** Los errores de la actividad no deberían burbujear */
        });
      },

      reiniciar() {
        this.clearHighlight();
        this.set('ejecutando', false);
        this.set('terminoDeEjecutar', false);
        this.set('errorDeActividad', null);
        this.pilas.reiniciarEscenaCompleta();
      },

      guardar() {
        if (this.guardar) this.guardar();
      },

      ver_codigo() {
        let codigo_como_string = this.actividad.generarCodigoXMLComoString();
        alert(codigo_como_string);
      },

      ingresar_codigo() {
        var codigo = prompt("Ingrese el código");

        if (codigo) {
          this.actividad.cargarCodigoDesdeStringXML(codigo);
        }
      },

      abrirFinDesafio() {
        this.set('mostrarDialogoFinDesafio', true);
      },

      ocultarFinDesafio() {
        this.set('mostrarDialogoFinDesafio', false);
      },

      abrirReporteProblemas() {
        this.set('mostrarDialogoReporteProblemas', true);
      },

      cerrarReporteProblemas() {
        this.set('mostrarDialogoReporteProblemas', false);
      },

      step() {
        this.set('pausadoEnBreakpoint', false);
      },

      onChangeWorkspace(xml) {
        if (this.isDestroyed) {
          return;
        }

        this.set('codigoActualEnFormatoXML', xml);
        if (this.onChangeWorkspace) this.onChangeWorkspace(xml);
      },

      onNewWorkspace() {
        this.availableBlocksValidator.disableNotAvailableBlocksInWorkspace(this.bloques);
      }

    }
  });

  _exports.default = _default;

  class ErrorDeActividad extends Error {
    constructor(exception) {
      super(exception);
    }

  }
  /* jshint ignore:end */

});
;define("pilasbloques/components/pilas-botones-zoom", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'div',
    classNames: ['nw-zoom'],
    zoomValue: 100,
    zoom: Ember.inject.service(),
    canZoomIn: Ember.computed('zoomValue', function () {
      return this.zoomValue < 120;
    }),
    canZoomOut: Ember.computed('zoomValue', function () {
      return this.zoomValue > 80;
    }),
    cambiarZoom: Ember.observer('zoomValue', function () {
      this.zoom.setValue(this.zoomValue);
      this.aplicarZoom((this.zoomValue - 100) / 10);
    }),

    aplicarZoom(zoomLevel) {
      document.body.style.zoom = 100 + zoomLevel * 10 + "%";
    },

    onStart: Ember.on('init', function () {
      this.set('zoomValue', this.zoom.getValue());
      this.cambiarZoom();
    }),
    actions: {
      zoomIn() {
        this.set('zoomValue', this.zoomValue + 10);
      },

      zoomOut() {
        this.set('zoomValue', this.zoomValue - 10);
      },

      zoomRestore() {
        this.set('zoomValue', 100);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-canvas", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['pilas-canvas-container'],
    classNameBindings: ['media.isMobile:media-mobile'],
    iframeElement: null,
    escena: null,
    pilas: null,

    /* Se espera que este atributo se defina al
     * llamar al componente y es obligatorio. */
    didInsertElement() {
      Ember.run.scheduleOnce('afterRender', this, this.initElement);
    },

    willDestroyElement() {
      if (this.pilas) {
        this.pilas.liberarRecursos();
      }
    },

    initElement() {
      let iframeElement = this.element.querySelector('#innerIframe');
      this.set("iframeElement", iframeElement);

      this.iframeElement.onload = () => {
        if (this.pilas) {
          this.pilas.inicializarPilas(iframeElement, {
            width: 420,
            height: 480
          }, this.escena).then(pilas => {
            if (this.escena) {
              this.pilas.inicializarEscena(iframeElement, this.escena);
            } else {
              console.warn("No especificó una escena para cargar en pilas-canvas.");
            }
            /*
             * Invoca a la acción "onReady" que envía el objeto pilas listo
             * para ser utilizado.
             *
             */


            if (this.onReady) {
              this.onReady(pilas);
            } else {//console.warn("Se a iniciado el componente pilas-canvas sin referencia a la acción onLoad.");
            }
          });
        } else {
          console.warn("No has enviado el objeto pilas.");
        } // onLoad solo se utiliza dentro de la batería de tests. Este
        // componente se tendría que usar mediante el servicio "pilas"
        // en cualquier otro lugar.


        if (this.onLoad) this.onLoad({
          iframeElement
        });
      };
    },

    reloadIframe(onLoadFunction) {
      this.iframeElement.onload = onLoadFunction;
      this.iframeElement.contentWindow.location.reload(true);
    },

    actions: {
      execute(code) {
        this.reloadIframe(() => {
          alert("Ha cargado el código y está todo listo!");
          this.iframeElement.contentWindow.eval(code);
        });
      },

      clear() {
        this.reloadIframe();
      },

      quitFullscreen() {
        this.set('inFullScreen', false);
      },

      enterFullscreen() {
        this.set('inFullScreen', true);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-cargando", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['contenido-principal', 'pilas-cargando-container']
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-desafio", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['desafio'],
    nombre: null,
    deshabilitada: false,
    actions: {
      abrir() {
        if (this.onSelect) this.onSelect(this.nombre);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-editor", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['contenedor-pilas-editor'],
    persistirSolucionEnURL: false,
    blocksGallery: Ember.inject.service(),
    cargando: true,
    showCode: false,
    modoLecturaSimple: Ember.computed('model', function () {
      return this.get('model.grupo.libro.modoLecturaSimple');
    }),

    didInsertElement() {
      this.blocksGallery.start();
    },

    actions: {
      onReady(pilas) {
        if (this.onReady) this.onReady(pilas);
        this.set('cargando', false);

        if (this.modoLecturaSimple) {
          pilas.cambiarAModoDeLecturaSimple();
        }
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-header", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'nav',
    classNames: ['navbar', 'navbar-default'],
    mostrarDialogoAyuda: false,
    actions: {
      abrirAyuda() {
        this.set('mostrarDialogoAyuda', true);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-libro", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['pilas-libro-contenedor']
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-link", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    href: null,
    inElectron: false,

    didInsertElement() {
      this.set('inElectron', typeof process !== "undefined");
    },

    actions: {
      abrirConNavegadorExterno(url) {
        const {
          shell
        } = require("electron");

        shell.openExternal(url);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-notificador", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    servicioNotificador: null,
    hayActualizacion: false,
    tagName: '',
    linkDescarga: _environment.default.linkDeDescarga,

    didInsertElement() {
      const inElectron = typeof process !== "undefined";

      if (this.servicioNotificador && inElectron) {
        /* Solo si está en la versión offline, sobre electron, espera 5 segundos
          * y consulta si existe una versión nueva para descargar. */
        Ember.run.later(this, function () {
          this.consultarSiExisteVersionNueva();
        }, 5000);
      }
    },

    consultarSiExisteVersionNueva() {
      this.servicioNotificador.consultar().then(data => {
        if (data.hayActualizacion) {
          this.set('hayActualizacion', true);
          this.set('versionMasReciente', data.version);
          console.log("Hay una actualizaci\xF3n disponible. La versi\xF3n ".concat(data.version, "."));
        } else {
          console.log("Se consult\xF3 buscando una nueva versi\xF3n, pero el servidor inform\xF3 la versi\xF3n ".concat(data.version, " as\xED que no hace falta actualizar..."));
        }
      }, error => {
        console.warn("Se quiso consultar una nueva versión pero falló el request", error);
      });
    },

    actions: {
      cerrar() {
        this.set('hayActualizacion', false);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-solution-file", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let VERSION_DEL_FORMATO_DE_ARCHIVO = 2;

  var _default = Ember.Component.extend({
    tagName: 'span',
    cuandoSelecciona: null,
    actividad: null,
    workspace: null,
    xml: null,
    inElectron: typeof process !== "undefined",

    //TODO: Mover a un service y reemplazar a todos los lugares donde se usa.
    version() {
      return VERSION_DEL_FORMATO_DE_ARCHIVO;
    },

    leerSolucionWeb(archivo) {
      var reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onerror = err => reject(err);

        reader.onload = event => resolve(event.target.result);

        reader.readAsText(archivo);
      }).then(contenido => this.cargarSolucion(contenido));
    },

    leerSolucionFS(archivo) {
      let fs = Promise.promisifyAll(require("fs"));
      return fs.readFileAsync(archivo, 'utf-8').then(contenido => this.cargarSolucion(contenido));
    },

    cargarSolucion(contenido) {
      // let regex_file = /\.spbq$/
      // let regex_version = /^\d+$/
      let data = null;
      let solucion = null;

      try {
        data = JSON.parse(contenido);
        solucion = atob(data.solucion);
      } catch (e) {
        console.error(e);
        throw "Lo siento, este archivo no tiene una solución de Pilas Bloques.";
      }

      this.set('workspace', solucion);
      let errors = [];

      if (this.get("actividad.nombre") !== data.actividad) {
        errors.push("Cuidado, el archivo indica que es para otra actividad (".concat(data.actividad, "). Se cargar\xE1 de todas formas, pero puede fallar."));
      }

      if (VERSION_DEL_FORMATO_DE_ARCHIVO > data.version) {
        errors.push("Cuidado, el archivo indica que es de una versión anterior. Se cargará de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
      }

      if (errors.length !== 0) {
        throw errors.join('\n');
      }
    },

    openElectronLoadDialog() {
      const {
        dialog
      } = require("electron").remote;

      const archivos = dialog.showOpenDialog({
        //TODO: this config exists in packaging/electron.js
        properties: ['openFile'],
        filters: [{
          name: 'Solución de Pilas Bloques',
          extensions: ['spbq']
        }, {
          name: 'Todos los archivos',
          extensions: ['*']
        }]
      });

      if (archivos) {
        this.leerSolucionFS(archivos[0]).catch(alert);
      }
    },

    descargar(text, name, type) {
      var a = document.getElementById("placeholder");
      var file = new Blob([text], {
        type: type
      });
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.type = type;
      a.click();
    },

    didInsertElement() {
      this.fileInput().change(event => {
        let archivo = event.target.files[0];

        if (archivo) {
          this.leerSolucionWeb(archivo).catch(alert);
        }

        this.limpiarInput(); // Fuerza a que se pueda cargar dos o más veces el mismo archivo

        return false;
      });
    },

    fileInput() {
      return this.$("#cargarActividadInput");
    },

    limpiarInput() {
      this.fileInput().value = null;
    },

    actions: {
      abrirSolucion() {
        if (this.inElectron) {
          this.openElectronLoadDialog();
        } else {
          this.fileInput().click();
        }
      },

      guardarSolucion() {
        let activityName = this.get("actividad.nombre");
        let fileName = "".concat(activityName, ".spbq");
        let contenido = {
          version: VERSION_DEL_FORMATO_DE_ARCHIVO,
          actividad: activityName,
          solucion: btoa(this.xml)
        };
        this.descargar(JSON.stringify(contenido), fileName, 'application/octet-stream');
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-spinner", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['content-spinner'],
    centered: false
  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-splitter", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['pilas-splitter'],

    didInsertElement() {
      $(window).resize(() => {
        this.fixLayout();
      });
      this.$('#splitter').on("mousedown", event => {
        event.preventDefault();
        $('#over-splitter').show();
        let initialX = event.pageX;
        let initialWidth = $(this.panel).width();
        $('#over-splitter').on("mousemove", event => {
          let dx = event.pageX - initialX;
          let newWidth = initialWidth + dx; // Aplica límites de tamaño, entre 200 y 800.

          newWidth = Math.max(newWidth, 200);
          newWidth = Math.min(newWidth, 800);
          $(this.panel).width(newWidth);
          $(window).trigger('resize');
          window.dispatchEvent(new Event('resize'));
        });
        $('.over-splitter').on("mouseup", function () {
          $('.over-splitter').off("mousemove");
          $('.over-splitter').hide();
        });
      });
    },

    willDestroyElement() {
      $(window).off('resize');
    },

    fixLayout() {
      let width = $(this.iframe).width();
      let height = width * 1.1428;
      $(this.iframe).height(height);
      $(this.ayuda).css('top', height);
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/components/pilas-toggle", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'span'
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/acercade", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    notificador: Ember.inject.service(),
    hayActualizacion: Ember.computed.alias('notificador.hayActualizacion'),
    versionMasReciente: Ember.computed.alias('notificador.versionActual'),
    actions: {
      visitarWeb() {
        var url = "http://bloques.pilas-engine.com.ar";
        window.open(url);
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    layout: true,
    queryParams: ['layout'],
    notificador: Ember.inject.service()
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/desafio", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    pilas: Ember.inject.service(),
    queryParams: ['codigo'],
    codigo: "",
    codigoJavascript: '',
    actions: {
      cuandoCargaPilas()
      /*pilas*/
      {},

      onChangeWorkspace()
      /*codigoDelWorkspace*/
      {}

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/desafios/curso-alumno", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    pilas: Ember.inject.service(),
    queryParams: ['codigo'],
    codigo: null,
    codigoJavascript: ''
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/desafios/curso-docente", ["exports", "pilasbloques/controllers/desafios/curso-alumno"], function (_exports, _cursoAlumno) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _cursoAlumno.default.extend({});

  _exports.default = _default;
});
;define("pilasbloques/controllers/galeria", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    queryParams: ['current_block'],
    current_block: null
  });

  _exports.default = _default;
});
;define("pilasbloques/controllers/libros/ver-libro", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({});

  _exports.default = _default;
});
;define("pilasbloques/controllers/test", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actividad: {
      iniciarEscena: function () {
        let fondo = new pilas.fondos.Tarde(); // jshint ignore:line

        pilas.escena_actual().minZ = function () {
          return this.stage.children[this.stage.children.length - 1].z;
        };

        let p = new pilas.actores.Mono();
        p.transparencia = 50;
        let tablero = new Tablero(0, -40, {
          texto: "Hola?"
        }); // jshint ignore:line

        let tablero2 = new Tablero(100, -40, {
          texto: "Hola?"
        }); // jshint ignore:line

        let a = new pilas.actores.Aceituna();
        a.z = 10;
        a.x = [80];
        a.y = [20];
      },
      iniciarBlockly: function () {},
      finalizaCargarBlockly: function () {}
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/electron/reload", [], function () {
  "use strict";

  function setupLivereload() {
    const process = window ? window.processNode : null; // Exit immediately if we're not running in Electron

    if (!window.ELECTRON || process && process.env && process.env.DO_NOT_SETUP_LIVERELOAD) {
      return;
    } // Reload the page when anything in `dist` changes


    let fs;
    let path;
    let devtron;

    try {
      fs = window.requireNode('fs');
      path = window.requireNode('path');
    } catch (e) {
      console.warn('ember-electron tried to require fs and path to enable live-reload features, but failed.');
      console.warn('Automatic reloading is therefore disabled.');
      console.warn(e);
      return;
    }
    /**
     * @private
     * Watch a given directory for changes and reload
     * on change
     *
     * @param sub directory
     */


    function watch(...sub) {
      const dirname = path.join(__dirname, ...sub);
      fs.watch(dirname, {
        recursive: true
      }, () => window.location.reload());
    }
    /**
     * @private
     * Install Devtron in the current window.
     */


    function installDevtron() {
      try {
        devtron = window.requireNode('devtron');

        if (devtron) {
          devtron.install();
        }
      } catch (e) {// no-op
      }
    }
    /**
     * @private
     * Install Ember-Inspector in the current window.
     */


    function installEmberInspector() {
      let location;

      try {
        const eiLocation = window.requireNode.resolve('ember-inspector');
        location = path.join(eiLocation, 'dist', 'chrome');
      } catch (error) {
        location = path.join(__dirname, '..', 'node_modules', 'ember-inspector', 'dist', 'chrome');
      }

      fs.lstat(location, (err, results) => {
        if (err) {
          console.warn('Error loading Ember Inspector', err);
          return;
        }

        if (results && results.isDirectory && results.isDirectory()) {
          const {
            BrowserWindow
          } = window.requireNode('electron').remote;
          const added = BrowserWindow.getDevToolsExtensions && BrowserWindow.getDevToolsExtensions().hasOwnProperty('Ember Inspector');

          try {
            if (!added) {
              BrowserWindow.addDevToolsExtension(location);
            }
          } catch (err) {// no-op
          }
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () =>
    /* e */
    {
      const dirname = __dirname || (process && (process || {}).cwd ? process.cwd() : null);

      if (!dirname) {
        return;
      }

      fs.stat(dirname, (err
      /* , stat */
      ) => {
        if (!err) {
          watch(); // On linux, the recursive `watch` command is not fully supported:
          // https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener
          //
          // However, the recursive option WILL watch direct children of the
          // given directory.  So, this hack just manually sets up watches on
          // the expected subdirs -- that is, `assets` and `tests`.

          if (process && process.platform === 'linux') {
            watch('assets');
            watch('tests');
          }
        }
      });
      installDevtron();
      installEmberInspector();
    });
  }

  setupLivereload();
});
;define("pilasbloques/helpers/app-version", ["exports", "pilasbloques/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("pilasbloques/helpers/append", ["exports", "ember-composable-helpers/helpers/append"], function (_exports, _append) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(_exports, "append", {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
;define("pilasbloques/helpers/array", ["exports", "ember-composable-helpers/helpers/array"], function (_exports, _array) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(_exports, "array", {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
;define("pilasbloques/helpers/chunk", ["exports", "ember-composable-helpers/helpers/chunk"], function (_exports, _chunk) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(_exports, "chunk", {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
;define("pilasbloques/helpers/compact", ["exports", "ember-composable-helpers/helpers/compact"], function (_exports, _compact) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
});
;define("pilasbloques/helpers/compute", ["exports", "ember-composable-helpers/helpers/compute"], function (_exports, _compute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(_exports, "compute", {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
;define("pilasbloques/helpers/contains", ["exports", "ember-composable-helpers/helpers/contains"], function (_exports, _contains) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(_exports, "contains", {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
;define("pilasbloques/helpers/dec", ["exports", "ember-composable-helpers/helpers/dec"], function (_exports, _dec) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(_exports, "dec", {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
;define("pilasbloques/helpers/drop", ["exports", "ember-composable-helpers/helpers/drop"], function (_exports, _drop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
});
;define("pilasbloques/helpers/filter-by", ["exports", "ember-composable-helpers/helpers/filter-by"], function (_exports, _filterBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
});
;define("pilasbloques/helpers/filter", ["exports", "ember-composable-helpers/helpers/filter"], function (_exports, _filter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
});
;define("pilasbloques/helpers/find-by", ["exports", "ember-composable-helpers/helpers/find-by"], function (_exports, _findBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
});
;define("pilasbloques/helpers/flatten", ["exports", "ember-composable-helpers/helpers/flatten"], function (_exports, _flatten) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(_exports, "flatten", {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
;define("pilasbloques/helpers/group-by", ["exports", "ember-composable-helpers/helpers/group-by"], function (_exports, _groupBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
});
;define("pilasbloques/helpers/has-next", ["exports", "ember-composable-helpers/helpers/has-next"], function (_exports, _hasNext) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(_exports, "hasNext", {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
;define("pilasbloques/helpers/has-previous", ["exports", "ember-composable-helpers/helpers/has-previous"], function (_exports, _hasPrevious) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(_exports, "hasPrevious", {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
;define("pilasbloques/helpers/ignore-children", ["exports", "ember-ignore-children-helper/helpers/ignore-children"], function (_exports, _ignoreChildren) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ignoreChildren.default;
    }
  });
  Object.defineProperty(_exports, "ignoreChildren", {
    enumerable: true,
    get: function () {
      return _ignoreChildren.ignoreChildren;
    }
  });
});
;define("pilasbloques/helpers/inc", ["exports", "ember-composable-helpers/helpers/inc"], function (_exports, _inc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(_exports, "inc", {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
;define("pilasbloques/helpers/intersect", ["exports", "ember-composable-helpers/helpers/intersect"], function (_exports, _intersect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
});
;define("pilasbloques/helpers/invoke", ["exports", "ember-composable-helpers/helpers/invoke"], function (_exports, _invoke) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(_exports, "invoke", {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
;define("pilasbloques/helpers/join", ["exports", "ember-composable-helpers/helpers/join"], function (_exports, _join) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
});
;define("pilasbloques/helpers/map-by", ["exports", "ember-composable-helpers/helpers/map-by"], function (_exports, _mapBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
});
;define("pilasbloques/helpers/map", ["exports", "ember-composable-helpers/helpers/map"], function (_exports, _map) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
});
;define("pilasbloques/helpers/media", ["exports", "ember-responsive/helpers/media"], function (_exports, _media) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _media.default;
    }
  });
  Object.defineProperty(_exports, "media", {
    enumerable: true,
    get: function () {
      return _media.media;
    }
  });
});
;define("pilasbloques/helpers/next", ["exports", "ember-composable-helpers/helpers/next"], function (_exports, _next) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(_exports, "next", {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
;define("pilasbloques/helpers/object-at", ["exports", "ember-composable-helpers/helpers/object-at"], function (_exports, _objectAt) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(_exports, "objectAt", {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
;define("pilasbloques/helpers/optional", ["exports", "ember-composable-helpers/helpers/optional"], function (_exports, _optional) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(_exports, "optional", {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
;define("pilasbloques/helpers/pipe-action", ["exports", "ember-composable-helpers/helpers/pipe-action"], function (_exports, _pipeAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
;define("pilasbloques/helpers/pipe", ["exports", "ember-composable-helpers/helpers/pipe"], function (_exports, _pipe) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(_exports, "pipe", {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
;define("pilasbloques/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("pilasbloques/helpers/previous", ["exports", "ember-composable-helpers/helpers/previous"], function (_exports, _previous) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(_exports, "previous", {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
;define("pilasbloques/helpers/queue", ["exports", "ember-composable-helpers/helpers/queue"], function (_exports, _queue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(_exports, "queue", {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
;define("pilasbloques/helpers/range", ["exports", "ember-composable-helpers/helpers/range"], function (_exports, _range) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(_exports, "range", {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
;define("pilasbloques/helpers/reduce", ["exports", "ember-composable-helpers/helpers/reduce"], function (_exports, _reduce) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
});
;define("pilasbloques/helpers/reject-by", ["exports", "ember-composable-helpers/helpers/reject-by"], function (_exports, _rejectBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
});
;define("pilasbloques/helpers/repeat", ["exports", "ember-composable-helpers/helpers/repeat"], function (_exports, _repeat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(_exports, "repeat", {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
;define("pilasbloques/helpers/reverse", ["exports", "ember-composable-helpers/helpers/reverse"], function (_exports, _reverse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
});
;define("pilasbloques/helpers/route-action", ["exports", "ember-route-action-helper/helpers/route-action"], function (_exports, _routeAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _routeAction.default;
    }
  });
});
;define("pilasbloques/helpers/shuffle", ["exports", "ember-composable-helpers/helpers/shuffle"], function (_exports, _shuffle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(_exports, "shuffle", {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
;define("pilasbloques/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("pilasbloques/helpers/slice", ["exports", "ember-composable-helpers/helpers/slice"], function (_exports, _slice) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
});
;define("pilasbloques/helpers/sort-by", ["exports", "ember-composable-helpers/helpers/sort-by"], function (_exports, _sortBy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
});
;define("pilasbloques/helpers/take", ["exports", "ember-composable-helpers/helpers/take"], function (_exports, _take) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
});
;define("pilasbloques/helpers/toggle-action", ["exports", "ember-composable-helpers/helpers/toggle-action"], function (_exports, _toggleAction) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
;define("pilasbloques/helpers/toggle", ["exports", "ember-composable-helpers/helpers/toggle"], function (_exports, _toggle) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(_exports, "toggle", {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
;define("pilasbloques/helpers/union", ["exports", "ember-composable-helpers/helpers/union"], function (_exports, _union) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
});
;define("pilasbloques/helpers/without", ["exports", "ember-composable-helpers/helpers/without"], function (_exports, _without) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(_exports, "without", {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
;define("pilasbloques/initializers/add-modals-container", ["exports", "ember-modal-dialog/initializers/add-modals-container"], function (_exports, _addModalsContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'add-modals-container',
    initialize: _addModalsContainer.default
  };
  _exports.default = _default;
});
;define("pilasbloques/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "pilasbloques/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("pilasbloques/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("pilasbloques/initializers/ember-cli-mirage", ["exports", "pilasbloques/config/environment", "pilasbloques/mirage/config", "ember-cli-mirage/get-rfc232-test-context", "ember-cli-mirage/start-mirage"], function (_exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.startMirage = startMirage;
  _exports.default = void 0;
  //
  // This initializer does two things:
  //
  // 1. Pulls the mirage config objects from the application's config and
  //    registers them in the container so `ember-cli-mirage/start-mirage` can
  //    find them (since it doesn't have access to the app's namespace).
  // 2. Provides legacy support for auto-starting mirage in pre-rfc268 acceptance
  //    tests.
  //
  var _default = {
    name: 'ember-cli-mirage',

    initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, {
          instantiate: false
        });
      }

      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, {
          instantiate: false
        });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};

      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }

  };
  _exports.default = _default;

  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, {
      env,
      baseConfig: _config.default,
      testConfig: _config.testConfig
    });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }

    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }

    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';

    let defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }
  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */


  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';
    return usingInDev || usingInTest;
  }
});
;define("pilasbloques/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    ```app/services/store.js
    import DS from 'ember-data';
  
    export default DS.Store.extend({
      adapter: 'custom'
    });
    ```
  
    ```app/controllers/posts.js
    import { Controller } from '@ember/controller';
  
    export default Controller.extend({
      // ...
    });
  
    When the application is initialized, `ApplicationStore` will automatically be
    instantiated, and the instance of `PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("pilasbloques/initializers/ember-responsive-breakpoints", ["exports", "ember-responsive/initializers/responsive"], function (_exports, _responsive) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _responsive.default;
  _exports.default = _default;
});
;define("pilasbloques/initializers/ember-responsive", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'responsive',

    initialize(application) {
      application.inject('controller', 'media', 'service:media');
      application.inject('component', 'media', 'service:media');
    }

  };
  _exports.default = _default;
});
;define("pilasbloques/initializers/export-application-global", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("pilasbloques/instance-initializers/ember-cli-mirage-autostart", ["exports", "ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart"], function (_exports, _emberCliMirageAutostart) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
;define("pilasbloques/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("pilasbloques/mirage/config", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  /*jshint esversion: 6 */
  function _default() {
    this.get('/desafios');
    this.get('/desafios/:id');
    this.get('/grupos');
    this.get('/grupos/:id');
    this.get('/libros');
    this.get('/libros/:id'); // Deshabilita los console log que emite mirage.

    this.logging = false; // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `api`, for example, if your API is namespaced

    this.timing = 50; // delay for each request, automatically set to 0 during testing

    this.passthrough('http://www.google-analytics.com/**');
    this.passthrough('http://104.131.245.133:9914/**');
    this.passthrough('http://api.pilasbloques.program.ar/**');
    this.passthrough('https://api.github.com/**');
    this.passthrough('http://testing-pilas-bloques-api.enjambrelab.com.ar/**');
    /*
      Shorthand cheatsheet:
       this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');
       http://www.ember-cli-mirage.com/docs/v0.2.0-beta.7/shorthands/
    */
  }
});
;define("pilasbloques/mirage/fixtures/desafios", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * Una actividad se define con el siguiente diccionario:
   * id: <obligatorio> Es el número por el cual se accederá al desafío en la URL.
   * nombre: <obligatorio> Es un segundo identificador único. Se usa para cosas como para chequear que la solución cargada sea de este desafío y no otro.
   * título: <obligatorio> Es el título visible del desafío en la lista del libro y en la pantalla principal del desafío.
   * enunciado: <obligatorio> Es el enunciado del desafío. Es la descripción del objetivo del programa que debe realizar el alumno.
   * consignaInicial: Es una posible pista, el "Sabías qué". En general en Pilas Bloques suele aparecer cuando el desafío introduce un concepto nuevo.
   * escena: <obligatorio> Es un String que puede indicar o bien un nombre de clase, o bien EL STRING con un "new Escena..." que luego se PARSEARÁ como javascript para construir la escena de ejerciciosPilas asociada a este desafío.
   * debeFelicitarse: Es un booleano que indica si tiene sentido que el desafío chequee e informe al alumno la concreción exitosa de su programa. En una actividad de dibujo libre estaría en false.
   * bloques: <obligatorio> Es la lista de ids de bloque de Blockly que habrá en el toolbox de la actividad.
   * estiloToolbox: Tiene tres valores: 
   * * * "sinCategorias", lo que hace un toolbox aplanado, con los bloques directamente en el toolbox sin títulos ni clasificaciones. 
   * * * "desplegable", lo que hace un toolbox con categorías que al clickearlas muestra los bloques. Es el valor por defecto.
   * * * "aplanado", produce el mismo toolbox aplanado con los bloques visibles que "sinCategorias", pero con las categorías en labels. Al momento está sin implementar.
   */

  /*jshint esversion: 6 */
  var _default = [{
    id: 1,
    nombre: 'AlienTocaBoton',
    titulo: 'El alien toca el botón',
    enunciado: 'Ayudá a nuestro Alien a presionar el botón de su laboratorio. \n' + 'Pistas: mirá las acciones disponibles. ¡Vas a tener que avanzar varias veces!',
    consignaInicial: 'Los bloques te permiten formar secuencias de acciones para resolver los desafíos que te proponemos en Pilas Bloques.',
    escena: 'AlienInicial',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'ApretarBoton']
  }, {
    id: 2,
    nombre: 'ElGatoEnLaCalle',
    // sale de 'id' en 'app/actividades/actividadElGatoEnLaCalle.js'
    titulo: 'El gato en la calle',
    // sale de 'nombre' en 'app/actividades/actividadElGatoEnLaCalle.js'
    enunciado: 'Hacé que el gato avance un paso, se duerma, se despierte, salude y vuelva a su lugar.',
    consignaInicial: 'Se pueden crear nuevas acciones en Procedimientos definiendo nuevos bloques que incluyan otras acciones.',
    escena: 'ElGatoEnLaCalle',
    debeFelicitarse: true,
    bloques: ['Saludar', 'Avanzar', 'Volver', 'AbrirOjos', 'CerrarOjos', 'Acostarse', 'Pararse', 'Soniar', 'Procedimiento']
  }, {
    id: 3,
    nombre: 'NoMeCansoDeSaltar',
    titulo: 'No me canso de saltar',
    enunciado: 'Ayudá al gato a quitarse la pereza saltando 30 veces seguidas. Pista: se puede resolver con menos de 30 bloques.',
    consignaInicial: 'El bloque Repetir permite elegir la cantidad de veces que se desea repetir una secuencia de acciones. Esto se llama "Repetición simple".',
    escena: 'NoMeCansoDeSaltar',
    debeFelicitarse: true,
    bloques: ['SaltarHablando', 'Procedimiento', 'Repetir']
  }, {
    id: 4,
    nombre: 'ElMarcianoEnElDesierto',
    titulo: 'El marciano en el desierto',
    enunciado: 'El marciano está perdido en el desierto y necesita alimentarse de su comida favorita: ¡las manzanas! Ayudalo a cumplir su objetivo. Pista: Crear un procedimiento (bloque) para cada conjunto de manzanas',
    consignaInicial: 'Hay muchas formas de comer las manzanas. Podés empezar por las de la derecha, ¡o podés empezar por arriba! ¿Se te ocurre otra estrategia? Pensala siempre antes de programar',
    escena: 'ElMarcianoEnElDesierto',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'ComerManzana', 'Procedimiento', 'Repetir']
  }, {
    id: 5,
    nombre: 'TitoEnciendeLuces',
    titulo: 'Tito enciende las luces',
    enunciado: 'Ayudá a Tito a encender todas las luces. \n' + 'Pista: creá un procedimiento para prender todas las luces de una diagonal.',
    consignaInicial: 'Se puede crear un procedimiento una vez y usarlo todas las veces que quieras dentro de un programa.',
    escena: 'TitoEnciendeLuces',
    debeFelicitarse: true,
    bloques: ['EncenderLuz', 'MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'Procedimiento', 'Repetir']
  }, {
    id: 6,
    nombre: 'ElAlienYLasTuercas',
    titulo: 'El alien y las tuercas',
    enunciado: 'Definí un programa para que el alien junte todas las tuercas. Pista: ¿El alien no puede moverse en diagonal? Podés crear tu propio procedimiento para que lo haga',
    escena: 'AlienLevantaTuercas',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'LevantaTuerca', 'Procedimiento', 'Repetir']
  }, {
    id: 7,
    nombre: 'ElRecolectorDeEstrellas',
    titulo: 'El recolector de estrellas',
    enunciado: 'Ayudá a nuestro personaje a recolectar todas las estrellas. Pista: podés hacer un procedimiento que tome una fila de estrellas.',
    consignaInicial: 'Usar muchas veces un procedimiento te ahorra trabajo.',
    escena: 'ElRecolectorDeEstrellas',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaArriba', 'VolverABordeIzquierdo', 'TomarEstrella', 'Procedimiento', 'Repetir']
  }, {
    id: 8,
    nombre: 'MariaLaComeSandias',
    titulo: 'María y las sandías',
    enunciado: 'María necesita comer todas las sandías de la cuadrícula. Pensá de qué manera puede hacerlo creando los bloques necesarios. Pista: la forma en que las sandías están distribuidas en la cuadrícula, es clave para crear la menor cantidad de procedimientos.',
    escena: 'MariaLaComeSandias',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'MorderSandia', 'Procedimiento', 'Repetir']
  }, {
    id: 9,
    nombre: 'AlimentandoALosPeces',
    titulo: 'Alimentando a los peces',
    enunciado: 'Nuestro buzo debe alimentar con lombrices a los 7 peces que hay en esta escena. Buscá primero a las lombrices y luego pasá por cada pez alimentándolo. Pista: ¿Cuántas partes debería tener tu estrategia?',
    consignaInicial: '',
    escena: 'AlimentandoALosPeces',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'AlimentarPez', 'AgarrarComida', 'Procedimiento', 'Repetir']
  }, {
    id: 10,
    nombre: 'InstalandoJuegos',
    titulo: 'Instalando juegos',
    enunciado: 'Ramiro tiene que instalar un juego en 3 compus para divertirse con sus amigos. Los pasos para instalarlo en cada una son: encenderla, escribir la contraseña ("ABC"), instalar el juego y apagar la máquina. Pista: aprovechá que en cada compu hay que hacer el mismo trabajo.',
    escena: 'InstalandoJuegos',
    debeFelicitarse: true,
    bloques: ['PasarASiguienteComputadora', 'PrenderComputadora', 'ApagarComputadora', 'EscribirC', 'EscribirB', 'EscribirA', 'InstalarJuego', 'Repetir', 'Procedimiento']
  }, {
    id: 11,
    nombre: 'LaGranAventuraDelMarEncantado',
    titulo: 'La gran aventura del mar encantado',
    enunciado: 'Ayuda a la heroína a rescatar a su príncipe. Para ello debe superar en orden cada una de las siguientes pruebas:\n' + '1) Buscar la llave.\n' + '2) Abrir el cofre con la llave y tomar el sombrero mágico que está dentro.\n' + '3) Entregarle el sombrero al mago para recibir la espada a cambio.\n' + '4) Luchar con la espada contra el caballero oscuro.\n' + '5) Escapar en unicornio.',
    escena: 'LaGranAventuraDelMarEncantado',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'AgarrarLlave', 'AbrirCofre', 'DarSombrero', 'AtacarConEspada', 'EscaparEnUnicornio', 'Repetir', 'Procedimiento']
  }, {
    id: 12,
    nombre: 'ReparandoLaNave',
    titulo: 'Reparando la nave',
    enunciado: 'El marciano debe arreglar su nave para poder volver a su hogar. Para lograrlo debe llevar 3 unidades de carbón y 3 de hierro a la nave, pero no puede cargar más de una unidad a la vez.',
    escena: 'ReparandoLaNave',
    debeFelicitarse: true,
    bloques: ['MoverACasillaDerecha', 'MoverACasillaIzquierda', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'TomarHierro', 'TomarCarbon', 'Depositar', 'Escapar', 'Repetir', 'Procedimiento']
  }, {
    id: 13,
    nombre: 'ElMonoYLasBananas',
    titulo: 'El mono y las bananas',
    enunciado: '¿Podés hacer que el mono avance al casillero de enfrente?' + ' Si hay una banana debe comérsela. Si no, es feliz con sólo llegar. \n ' + 'Ejecutá el programa varias veces para asegurarte que siempre funciona. \n' + 'Pista: mirá la categoría "Sensores" y la categoría "Alternativas".',
    consignaInicial: 'El bloque "Si... Entonces" ejecuta una secuencia de instrucciones solamente cuando la condición es verdadera. Esto se llama "alternativa condicional".',
    escena: 'ElMonoYLasBananas',
    debeFelicitarse: true,
    bloques: ['ComerBanana', 'AvanzarMono', 'TocandoBanana', 'Repetir', 'Procedimiento', 'Si']
  }, {
    id: 14,
    nombre: 'LaEleccionDelMono',
    titulo: 'La elección del mono',
    enunciado: '¿Podés ayudar nuevamente a nuestro mono? Esta vez tiene ' + 'que comer la fruta que aparece, ya sea banana o manzana. \n' + 'Ejecutá el programa varias veces para asegurarte que siempre funciona. \n' + 'Pista: ésta vez no alcanza con el bloque "Si".',
    consignaInicial: 'Cuando sólo hay 2 opciones, alcanza con hacer una sola pregunta. En esos casos se puede usar el bloque "Si... si no".',
    escena: 'LaEleccionDelMono',
    debeFelicitarse: true,
    bloques: ['ComerBanana', 'ComerManzana', 'AvanzarMono', 'Procedimiento', 'Repetir', 'Si', 'SiNo', 'TocandoManzana', 'TocandoBanana']
  }, {
    id: 15,
    nombre: 'LaberintoCorto',
    titulo: 'Laberinto corto',
    enunciado: 'Guiá al ratón para llegar a la meta. Para lograrlo, debe avanzar una casilla en la dirección que indica la flecha. Pista: mirá en la categoría "Sensores" qué preguntas podés hacer.',
    escena: 'LaberintoCorto',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'Repetir', 'Si', 'SiNo', 'MoverACasillaDerecha', 'MoverACasillaAbajo', 'TocandoAbajo', 'TocandoDerecha']
  }, {
    id: 16,
    nombre: 'TresNaranjas',
    titulo: 'Tres naranjas',
    enunciado: 'El alien debe comer todos los gajos de naranja que aparezcan en las casillas violetas. ¡Pero no siempre aparecen en los mismos lugares ni la misma cantidad de naranjas! Pista: pensá primero cómo harías un procedimiento para comer una sola naranja si es que la hay.',
    escena: 'TresNaranjas',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaDerecha', 'ComerNaranja', 'Repetir', 'Si', 'SiNo', 'TocandoNaranja']
  }, {
    id: 17,
    nombre: 'TitoRecargado',
    titulo: 'Tito recargado',
    enunciado: 'Tito necesita encender las luces para poder conocer el camino... ¡Pero en cada ejecución cambian de lugar! Podés utlizar los procedimientos y bloques de control.',
    escena: 'TitoRecargado',
    debeFelicitarse: true,
    bloques: ['EncenderLuz', 'MoverACasillaAbajo', 'Procedimiento', 'Repetir', 'Si', 'SiNo', 'TocandoLuz']
  }, {
    id: 18,
    nombre: 'LaberintoLargo',
    titulo: 'Laberinto largo',
    enunciado: 'Ayudá al ratón a salir del laberinto. A diferencia del laberinto anterior, aquí la cantidad de casillas que debe avanzar son muchas. ¿Cuántas? ¿Es siempre la misma? Pista: pensá primero cómo avanzar una sola casilla.',
    escena: 'LaberintoLargo',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaDerecha', 'MoverACasillaAbajo', 'Repetir', 'Si', 'SiNo', 'TocandoAbajo', 'TocandoDerecha']
  }, {
    id: 19,
    nombre: 'SuperTito1',
    titulo: 'Súper Tito 1 ',
    enunciado: ' Ayudá a Tito a encender las luces. \n ¡Ojo! En todas las celdas hay una luz, pero no sabés cuántas celdas hay en cada ejecución.',
    consignaInicial: 'Hay nuevos bloques que pueden ayudarte a resolver el desafío de manera muy sencilla. ¡Aprovechalos!',
    escena: 'SuperTito1',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'EncenderLuz', 'MoverACasillaAbajo', 'TocandoFinal', 'Repetir', 'Si', 'SiNo', 'Hasta']
  }, {
    id: 20,
    nombre: 'SuperTito2',
    titulo: 'Súper Tito 2',
    enunciado: 'Súper Tito debe encender todas las luces, pero a diferencia del desafío anterior, hay celdas sin luz. ¿Podrás utilizar el mismo procedimiento que en Súper Tito 1? \n',
    consignaInicial: 'El bloque "repetir hasta que" repite una secuencia de acciones hasta que se cumple una condición. Esto se llama "repetición condicional".',
    escena: 'SuperTito2',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'TocandoFinal', 'TocandoLuz', 'EncenderLuz', 'MoverACasillaAbajo', 'Repetir', 'Si', 'SiNo', 'Hasta']
  }, {
    id: 21,
    nombre: 'LaberintoConQueso',
    titulo: 'Laberinto con queso',
    enunciado: '¡El ratón está más hambriento que nunca! Guialo por el laberinto para que pueda comer todos los trozos de queso. Pista: antes de empezar, apretá varias veces el botón Ejecutar para conocer cómo varía el escenario.',
    consignaInicial: 'Es importante pensar si en algún momento se cumple la condición del bloque "Repetir hasta qué". Sino, ¡el programa podría no terminar nunca!',
    escena: 'LaberintoConQueso',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaDerecha', 'MoverACasillaAbajo', 'ComerQueso', 'Repetir', 'Si', 'SiNo', 'Hasta', 'TocandoAbajo', 'TocandoDerecha', 'TocandoFinCamino', 'TocandoQueso']
  }, {
    id: 22,
    nombre: 'ElDetectiveChaparro',
    titulo: 'El detective Chaparro',
    enunciado: 'El detective debe descubrir al culpable de un crimen. Comenzando por el primero de la izquierda, ¡interrogá a cada uno de los sospechosos hasta encontrar al culpable!',
    consignaInicial: 'El bloque "Repetir hasta que" nos permite terminar el programa cuando encontramos al culpable sin tener que interrogar a todos los sospechosos de la fila.',
    escena: 'ElDetectiveChaparro',
    debeFelicitarse: true,
    bloques: ['Repetir', 'Si', 'SiNo', 'Hasta', 'Procedimiento', 'IrAlPrimerSospechoso', 'IrAlSiguienteSospechoso', 'InterrogarSospechoso', 'EsCulpable']
  }, {
    id: 23,
    nombre: 'FutbolRobots',
    titulo: 'Fútbol para robots',
    enunciado: 'Ayudá a nuestro robot futbolista a patear todas las pelotas. ' + 'Recordá siempre que una buena división en procedimientos puede ayudarte a encarar ' + 'mejor el problema.',
    consignaInicial: 'El procedimiento que se defina debe considerar el escenario variable y ofrecer una solución con poca cantidad de bloques. Es importante tener en cuenta que la acción se repite varias veces y que la longitud de las filas varía.',
    escena: 'FutbolRobots',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaDerecha', 'MoverACasillaIzquierda', 'SiguienteFila', 'PatearPelota', 'TocandoInicio', 'TocandoPelota', 'Repetir', 'Si', 'SiNo', 'Hasta']
  }, {
    id: 24,
    nombre: 'PrendiendoLasCompus',
    titulo: 'Prendiendo las compus',
    enunciado: 'Debemos prender todas las compus teniendo en cuenta que el ancho y el alto del escenario cambian en cada ejecución. Pista: pensá cómo harías para prender las compus de un solo lado del rectángulo y después repetilo para el resto de los lados.',
    escena: 'PrendiendoLasCompus',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'Repetir', 'Si', 'SiNo', 'Hasta', 'MoverACasillaDerecha', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'MoverACasillaIzquierda', 'PrenderComputadora', 'EstoyEnEsquina']
  }, {
    id: 25,
    nombre: 'ElMonoQueSabeContar',
    titulo: 'El mono que sabe contar',
    enunciado: 'El mono debe recorrer todas las casillas y contar cuántas bananas y manzanas hay en total. Pista: primero pensá cómo contarías si hay una manzana o una banana en una casilla determinada. Luego pensá cómo harías para contar todas las frutas de una sola columna.',
    consignaInicial: 'Subdividir un problema grande en problemas más pequeños ayuda a comprender mejor cada una de las partes que lo componen. Además nos permite concentrarnos en resolver cuestiones más sencillas al problema original.',
    escena: 'ElMonoQueSabeContar',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'SiguienteColumna', 'ContarBanana', 'ContarManzana', 'TocandoBanana', 'TocandoManzana', 'Repetir', 'Si', 'SiNo', 'Hasta', 'EstoySobreElInicio', 'EstoySobreElFinal']
  }, {
    id: 26,
    nombre: 'ElSuperviaje',
    titulo: 'El Superviaje',
    enunciado: 'Nuestro superhéroe debe realizar su súper paseo matutino que consiste en recorrer una cierta cantidad de kilómetros que varía día a día (entre 15 y 45 km). ¡Lográ que nuestro súper amigo llegue siempre a destino sin pasarse! Pista: mirá en la categoría "Sensores" si hay algo que te pueda servir.',
    consignaInicial: 'Se puede usar un bloque "Repetir" con el valor de un sensor. Esto permite repetir una secuencia de código la cantidad de veces que indique el sensor',
    escena: 'SuperViaje',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'KmsTotales', 'Avanzar1km', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta']
  }, {
    id: 27,
    nombre: 'ElMonoCuentaDeNuevo',
    titulo: 'El mono cuenta de nuevo',
    enunciado: 'El mono tiene que contar otra vez las frutas, ¡pero ahora no puede verificar si ya llegó al final de una columna! ¿Habrá algún sensor que lo pueda ayudar?',
    consignaInicial: 'Una sensor nos permite obtener información que puede cambiar en cada ejecución del programa, incluso en una misma ejecución. Por ejemplo, el largo de cada columna varía dependiendo en qué columna esté parado el mono.',
    escena: 'ElMonoCuentaDeNuevo',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaArriba', 'MoverACasillaAbajo', 'SiguienteColumna', 'ContarBanana', 'ContarManzana', 'TocandoBanana', 'TocandoManzana', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'EstoySobreElInicio', 'LargoColumnaActual']
  }, {
    id: 28,
    nombre: 'ElPlanetaDeNano',
    titulo: 'El planeta de Nano',
    escena: 'ElPlanetaDeNano',
    enunciado: 'Ayudá a Nano a comer todas sus bananas. ¡Cuidado! No se puede bajar... \n ¡Tené en cuenta que el escenario no cambia, las bananas están siempre en las mismas casillas!',
    consignaInicial: 'A los procedimientos se les pueden agregar parámetros para que resulten más generales. Por ejemplo, si creamos los procedimientos "Comer 2 bananas a la derecha", "Comer 3 bananas a la derecha" y "Comer 4 bananas a la derecha", podemos reemplazar a los tres por un solo procedimiento que reciba como parámetro la cantidad de bananas que queremos comer a la derecha: "Comer a la derecha esta cantidad: [cantidad]". \n Para agregar un parámetro a un procedimiento nuevo, hay que hacer clic en la estrella que aparece al lado de "Definir" y luego arrastrar el bloque "nombre de entrada" a "entradas".',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'MoverACasillaDerecha', 'MoverACasillaArriba', 'VolverAlBordeIzquierdo', 'ComerBanana', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'Numero']
  }, {
    id: 29,
    nombre: 'DibujandoAlCuadrado',
    titulo: 'Dibujando: Al cuadrado',
    enunciado: 'Dibujá un cuadrado que tenga 100 de lado.',
    consignaInicial: '',
    escena: 'DibujandoCuadrado',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero']
  }, {
    id: 30,
    nombre: 'DibujandoRayuelaRobotica',
    titulo: 'Dibujando: Rayuela robótica',
    enunciado: 'Dibujá 5 cuadrados en fila, cada uno de lado 50, como muestra la figura sombreada.',
    consignaInicial: '',
    escena: 'Dibujando5CuadradosHorizontal',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'SaltarHaciaAdelante']
  }, {
    id: 31,
    nombre: 'DibujandoCortoPorLaDiagonal',
    titulo: 'Dibujando: Corto por la diagonal',
    enunciado: 'Dibujá 5 cuadrados en diagonal, cada uno de lado 50, como muestra la figura sombreada.',
    consignaInicial: '',
    escena: 'Dibujando5CuadradosDiagonal',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'SaltarHaciaAdelante']
  }, {
    id: 32,
    nombre: 'DibujandoMamushkaCuadrada',
    titulo: 'Dibujando: Mamushka cuadrada',
    enunciado: 'Dibujá 4 cuadrados de lados 50, 100, 150 y 200, como muestra la figura sombreada. Pista: creá un procedimiento nuevo para dibujar cuadrados de cualquier longitud de lado.',
    consignaInicial: 'Incluir parámetros en los procedimientos permite generalizar un concepto. Por ejemplo, la longitud del lado de un cuadrado.',
    escena: 'Dibujando4CuadradosInteriores',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'SaltarHaciaAdelante']
  }, {
    id: 33,
    nombre: 'DibujandoEscaleraCuadrada',
    titulo: 'Dibujando: Escalera cuadrada',
    enunciado: 'Dibujá 5 cuadrados: 4 de lado 50 y uno de 100, como muestra la figura sombreada.',
    consignaInicial: 'Al crear un procedimiento con parámetros, sus valores no están definidos (por ej. "longitud de lado"). Al usar los procedimientos hay que darles un valor concreto a esos parámetros (50, 100, etc.).',
    escena: 'DibujandoCabezaElefante',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'SaltarHaciaAdelante']
  }, {
    id: 34,
    nombre: 'DibujandoHexagono',
    titulo: 'Dibujando: Hexágono',
    enunciado: 'Dibujá un hexágono de lado 100, como muestra la figura sombreada. Pista: pensá cuántos grados debe girar el robot sabiendo cuánto miden los ángulos internos del hexágono.',
    consignaInicial: 'En los polígonos, el valor de un ángulo externo es igual a 180 menos el valor de un ángulo interno.',
    escena: 'DibujandoHexagono',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica', 'SaltarHaciaAdelante']
  }, {
    id: 35,
    nombre: 'DibujandoPiramideInvertida',
    titulo: 'Dibujando: Pirámide invertida',
    enunciado: 'Dibujá un triángulo equilátero de lado 100, como muestra la figura sombreada. Pista: pensá si existe una relación entre los ángulos y la cantidad de lados.',
    consignaInicial: 'En los polígonos, la suma de todos los ángulos externos es 360',
    escena: 'DibujandoTrianguloEquilatero',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica', 'SaltarHaciaAdelante']
  }, {
    id: 36,
    nombre: 'DibujandoFigurasDentroDeFiguras',
    titulo: 'Dibujando: Figuras dentro de figuras',
    enunciado: 'Dibujá un triángulo, un cuadrado y un pentágono de lado 100, como muestra la figura sombreada. Pista: creá un procedimiento con un parámetro para la cantidad de lados. ',
    consignaInicial: 'Ahora tenemos Operadores: estos bloques nos van a permitir realizar algunas cuentas automáticamente ¡Como una calculadora!... ¿Cuántos grados tiene un giro completo? ¿Por qué número debemos dividirlo?',
    escena: 'DibujandoPoligonosInteriores',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica', 'SaltarHaciaAdelante']
  }, {
    id: 37,
    nombre: 'DibujandoLaCuevaDeEstalagtitas',
    titulo: 'Dibujando: La cueva de estalagtitas',
    enunciado: 'Dibujá 3 triángulos de lados 40, 60 y 100, y un cuadrado de lado 200, como muestra la figura sombreada. Pista: creá un procedimiento con 2 parámetros, uno para la cantidad de lados y otro para la longitud de los lados.',
    consignaInicial: 'Para poder usar los parámetros en un nuevo procedimiento, hay que hacer clic derecho en el bloque que define dicho procedimiento.',
    escena: 'DibujandoCuevaEstalagtitas',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica', 'SaltarHaciaAdelante']
  }, {
    id: 130,
    nombre: 'LaFiestaDeDracula',
    titulo: 'La fiesta de Drácula',
    escena: 'LaFiestaDeDracula',
    enunciado: 'Para que la fiesta de Drácula comience debemos cambiar el color de los 3 focos una cierta cantidad de veces: 5 veces el primero, 8 el segundo y 12 el tercero.',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'Numero', 'OpAritmetica', 'CambiarColor', 'SiguienteFoco', 'EmpezarFiesta']
  }, {
    id: 131,
    nombre: 'SalvandoLaNavidad',
    titulo: 'Salvando la Navidad',
    escena: 'SalvandoLaNavidad',
    enunciado: 'Ayudá a Papá Noel a dejar un regalo al final de cada fila. ¡Tené en cuenta que el escenario no cambia de una ejecución a la otra! Pista: si tuvieses que elegir un parámetro para tu procedimiento... ¿Cuál eligirías? ¿Qué varía de fila a fila?',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'MoverACasillaDerecha', 'DejarRegalo', 'SiguienteFilaTotal', 'Numero', 'OpAritmetica']
  }, {
    id: 132,
    nombre: 'PrendiendoLasCompusParametrizado',
    titulo: 'Prendiendo las compus parametrizado',
    escena: 'PrendiendoLasCompus',
    enunciado: 'Al igual que antes, debemos prender todas las compus. Pero esta vez tenés que definir un único procedimiento que prenda cualquiera de los lados.',
    consignaInicial: 'Los parámetros pueden ser direcciones, no siempre deben ser números. Por ejemplo, un parámetro podría ser la dirección en que el autómata debe moverse.',
    deshabilitado: false,
    debeFelicitarse: true,
    bloques: ['ParaLaDerecha', 'ParaLaIzquierda', 'ParaArriba', 'ParaAbajo', 'MoverA', 'Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'PrenderComputadora', 'EstoyEnEsquina', 'Numero', 'OpAritmetica']
  }, {
    id: 133,
    nombre: 'TitoCuadrado',
    titulo: 'Tito cuadrado',
    escena: 'TitoCuadrado',
    enunciado: 'Tito debe encender todas las luces del cuadrado pero en cada ejecución están distribuidas de una manera diferente. Tené en cuenta que las casillas de la esquina nunca se prenden y que el tamaño del cuadrado no varía de una ejecución a la otra.',
    debeFelicitarse: true,
    bloques: ['ParaLaDerecha', 'ParaLaIzquierda', 'ParaArriba', 'ParaAbajo', 'MoverA', 'Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'TocandoLuz', 'EncenderLuz', 'Numero', 'OpAritmetica']
  }, {
    id: 134,
    nombre: 'ElCangrejoAguafiestas',
    titulo: 'El cangrejo aguafiestas',
    escena: 'ElCangrejoAguafiestas',
    enunciado: 'El cangrejo quiere pinchar todos los globos de la fiesta. Tené en cuenta que estos no cambian de lugar. Pista: ¿la cantidad de globos y la dirección podrían ser parámetros?',
    consignaInicial: 'Se pueden combinar parámetros numéricos (cantidades, longitudes) con parámetros de texto (direcciones, nombres).',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'ParaLaDerecha', 'ParaLaIzquierda', 'ParaArriba', 'ParaAbajo', 'MoverA', 'ExplotarGlobo', 'Numero', 'OpAritmetica']
  }, {
    id: 135,
    nombre: 'PrendiendoLasFogatas',
    titulo: 'Prendiendo las fogatas',
    escena: 'PrendiendoLasFogatas',
    enunciado: 'En este caso debemos encender todas las fogatas del cuadrado pero en cada ejecución están distribuidas de una manera diferente. Tené en cuenta que las casillas de la esquina nunca se prenden y que el tamaño del cuadrado no varía de una ejecución a la otra.',
    consignaInicial: 'Si no tenés un procedimiento con parámetros para mover en cualquier direccion... ¡Podés crearlo!',
    debeFelicitarse: true,
    bloques: ['Procedimiento', 'RepetirVacio', 'Repetir', 'Si', 'SiNo', 'Hasta', 'TocandoFogata', 'PrenderFogata', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'Numero', 'OpComparacion', 'OpAritmetica', 'ParaLaDerecha', 'ParaLaIzquierda', 'ParaArriba', 'ParaAbajo']
  }, {
    id: 136,
    nombre: 'DibujoLibre',
    titulo: '¡Dibujo libre!',
    imagen: 'DibujoLibre',
    escena: "new DibujandoLibremente()",
    enunciado: 'En esta actividad vas a poder realizar el dibujo que más te guste',
    consignaInicial: 'Incluímos todos los bloques posibles, para que puedas dar rienda suelta a tus conocimientos.',
    debeFelicitarse: false,
    bloques: ['Procedimiento', 'Repetir', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica', 'SaltarHaciaAdelante']
  }, {
    id: 201,
    nombre: '3.1.2a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,-,-,-,O,-],      [-,A,-,-,P,-],      [-,-,-,O,-,-],      [O,O,O,O,-,O],\t\t\")",
    enunciado: 'Ayudá a la puma Duba a comer su churrasco. Evitá los obstáculos.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 202,
    nombre: '3.1.2b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba(\"        [O,O,O,O,O,O],        [O,O,O,O,O,O],        [O,-,O,-,P,O],        [O,-,A,-,O,O],        [O,O,-,O,O,O],        [O,O,O,O,O,O],\t\t\")",
    enunciado: 'Duba quiere comer su churrasco. ¡Ayudala!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 203,
    nombre: '3.1.2c',
    titulo: 'Desafío 3',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,O,O,O,O,O],      [O,A,O,-,-,O],      [O,-,-,-,P,O],      [O,-,O,-,-,O],      [O,O,O,O,O,O],\t\t\")",
    enunciado: '¿Ayudás a la puma a comer su churrasco? Evitá los obstáculos.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 204,
    nombre: '3.1.2d',
    titulo: 'Desafío 4',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,-,A,O,O,O],      [O,O,-,O,O,O],      [O,O,-,-,-,O],      [O,O,O,P,-,O],      [O,O,O,O,O,O],\t\t\")",
    enunciado: 'Duba quiere comer churrasco. ¿Cómo lo puede hacer sin chocarse con los obstáculos?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 205,
    nombre: '3.1.2e',
    titulo: 'Desafío 5',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,O,-,O,-,O],      [O,-,A,-,-,O],      [O,-,-,O,-,O],      [O,O,-,-,P,O],      [O,O,O,O,O,O],\t\t\")",
    enunciado: 'Ayudá a la puma Duba a saciar su hambre, evitando los obstáculos.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 206,
    nombre: '3.1.2f',
    titulo: 'Desafío 6',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,-,-,-,-,O],      [O,-,O,P,-,O],      [O,A,O,-,O,O],      [O,O,O,O,O,O],      [O,O,O,O,O,O],\t\t\")",
    enunciado: 'Duba quiere devorar su churrasco. ¿Cómo lo puede lograr?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco']
  }, {
    id: 207,
    nombre: '3.1.3a',
    titulo: 'Desafío 1',
    escena: "new EscenaCoty(\n      [{x:125,y:75},{x:125,y:-175},{x:-25,y:-175},{x:-25,y:-75},{x:25,y:-75},{x:25,y:-175},{x:-125,y:-175},{x:-125,y:125},{x:-75,y:125},{x:-75,y:75},{x:-25,y:75},{x:-25,y:125},{x:25,y:125},{x:25,y:75}],\n      [{x:25,y:75},{x:75,y:75},{x:75,y:125},{x:125,y:125},{x:125,y:75}],\n      {xCoty: 25, yCoty: 75}\n    )",
    enunciado: 'Ayudá a la llama a completar la torre.',
    consignaInicial: 'Para completar el dibujo, Coty debe dibujar sobre las líneas grises.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando']
  }, {
    id: 208,
    nombre: '3.1.3b',
    titulo: 'Desafío 2',
    escena: "new EscenaCoty(\n      [{x:-50,y:25},{x:0,y:100},{x:50,y:25}],\n      [{x:-50,y:25},{x:0,y:25},{x:50,y:25},{x:50,y:-25},{x:50,y:-75},{x:0,y:-75},{x:-50,y:-75},{x:-50,y:-25},{x:-50,y:25}],\n      {xCoty: -50, yCoty: 25}\n    )",
    enunciado: '¡Coty quiere dibujar la casa! ¿La ayudás?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando']
  }, {
    id: 209,
    nombre: '3.1.3c',
    titulo: 'Desafío 3',
    escena: "new EscenaCoty(\n      [],\n      [[ {x:-125,y:0}, {x:-75,y:0}],[ {x:-25,y:0}, {x:25,y:0}],[ {x:75,y:0}, {x:125,y:0}]],\n      {xCoty: 125, yCoty: 0}\n    )",
    enunciado: 'La llama quiere solo dibujar tres rayas. ¿Cómo puede hacerlo?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda']
  }, {
    id: 210,
    nombre: '3.1.3d',
    titulo: 'Desafío 4',
    escena: "new EscenaCotySonrisa()",
    enunciado: '¿Ayudás a la llama a completar la carita feliz?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda']
  }, {
    id: 211,
    nombre: '3.1.3e',
    titulo: 'Desafío 5',
    escena: "new EscenaCoty(\n      [[{x:-55,y:50},{x:-150,y:50},{x:-150,y:0},{x:-50,y:0}],[{x:-75,y:0},{x:-75,y:-100},{x:-125,y:-100},{x:-125,y:0}],[{x:-25,y:0},{x:25,y:0},{x:25,y:-100},{x:-25,y:-100},{x:-25,y:0}],[{x:125,y:0},{x:125,y:-100},{x:75,y:-100},{x:75,y:0}],[{x:50,y:0},{x:150,y:0},{x:150,y:50},{x:50,y:50}]],\n      [{x:-50,y:0},{x:0,y:0},{x:50,y:0},{x:50,y:50},{x:0,y:50},{x:-50,y:50},{x:-50,y:0}],\n      {xCoty: -50, yCoty: 100}      \n    )",
    enunciado: '¿Cómo puede hacer la llama para terminar de dibujar el puente?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda']
  }, {
    id: 212,
    nombre: '3.1.3f',
    titulo: 'Desafío 6',
    escena: "new EscenaCotyCactus()",
    enunciado: '¿Cómo puede hacer la llama para completar el cardo?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda']
  }, {
    id: 213,
    nombre: '3.1.3g',
    titulo: 'Desafío 7',
    escena: "new EscenaCotyMate()",
    enunciado: 'Es hora de un buen mate. Ayudá a la llama a terminar de dibujarlo.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda']
  }, {
    id: 214,
    nombre: '3.1.4a',
    titulo: 'Desafío 1',
    escena: "new EscenaLita(\"      [O,O,O,O,O,O],      [O,O,O,O,O,O],      [O,A,-,T,L,-],      [O,O,O,O,O,E],      [O,O,O,O,O,O],      [O,O,O,O,O,O]    \")",
    enunciado: 'Ayudá a la mulita a preparar la ensalada mixta.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 215,
    nombre: '3.1.4b',
    titulo: 'Desafío 2',
    escena: "new EscenaLita(\"      [O,O,O,O,O],      [O,O,O,O,O],      [-,-,T,-,-],      [-,-,L,-,-],      [A,O,O,O,E],      [O,O,O,O,O]    \")",
    enunciado: 'Hoy Lita quiere comer una ensaladita. ¡Ayudala a prepararla!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 216,
    nombre: '3.2.2a',
    titulo: 'Desafío 1',
    escena: "new EscenaLita(\"      [-,-,-],      [-,L,-],      [A,-,E],      [-,T,-]    \")",
    enunciado: 'Tomate, lechuga y listo. Ayudá a Lita a preparar su ensalada.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 217,
    nombre: '3.2.2b',
    titulo: 'Desafío 2',
    escena: "new EscenaLita(\"      [-,-,-,-],      [-,L,T,-],      [A,-,-,E],      [-,-,-,-]    \")",
    enunciado: 'Ayudá a Lita a preparar su plato favorito.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 218,
    nombre: '3.2.2c',
    titulo: 'Desafío 3',
    escena: "new EscenaLita(\"      [-,A,-],      [L,E,T],      [-,-,-],      [-,-,-]    \")",
    enunciado: '¿Agarra primero el tomate o la lechuga? Ayudá a Lita a preparar su plato predilecto.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 219,
    nombre: '3.2.2d',
    titulo: 'Desafío 4',
    escena: "new EscenaLita(\"      [-,-,A],      [-,L,T],      [-,-,E]    \")",
    enunciado: '¿Qué pasos puede dar la mulita para preparar su plato favorito?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 220,
    nombre: '3.2.3a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"      [O,O,O,O,O,O],      [O,P,O,-,-,O],      [O,-,O,-,-,-],      [O,-,-,-,O,A],      [O,O,O,O,O,O],      [O,O,O,O,O,O],\t\t\")",
    enunciado: '¿Cuál es el error de problema? Encontralo y ayudá a Duba a comer su churrasco.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 221,
    nombre: '3.2.3b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba(\"        [O,O,O,O,O,O],        [O,-,-,O,O,O],        [O,-,P,O,O,O],        [O,-,-,O,O,O],        [O,-,-,-,A,O],        [O,O,O,O,O,O],\t\t\")",
    enunciado: '¿Qué pasa con Duba que no logra comer su comida? Corregí el programa para que la puma sacie su hambre.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 222,
    nombre: '3.2.3c',
    titulo: 'Desafío 3',
    escena: "new EscenaDuba(\"        [O,O,O,O,O,O],        [O,P,O,A,O,O],        [O,-,O,-,O,O],        [O,-,-,-,O,O],        [O,-,-,O,O,O],        [O,O,O,O,O,O],\t\t\")",
    enunciado: 'Descubrí el problema del programa y corregilo así Duba puede comer su churrasco.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaAbajo\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 223,
    nombre: '3.2.3d',
    titulo: 'Desafío 4',
    escena: "new EscenaDuba(\"        [O,O,O,O,O,O],        [O,O,-,-,-,O],        [O,-,P,-,-,O],        [O,-,O,O,O,O],        [O,-,-,A,-,O],        [O,O,O,O,O,O],\t\t\")",
    enunciado: '¿Hay instrucciones de más o falta alguna? Mirá el programa, descubrí el error y ayudá a Duba a comer su plato predilecto.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaIzquierda\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"MoverACasillaDerecha\">\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 224,
    nombre: '3.2.3e',
    titulo: 'Desafío 5',
    escena: "new EscenaLita(\"      [O,O,O,O,O,O,O],      [O,O,O,O,O,O,O],      [O,O,O,O,-,T,O],      [O,A,-,-,L,E,O],      [O,O,O,O,O,O,O],      [O,O,O,O,O,O,O]    \")",
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"AgarrarLechuga\">\n        <next>\n        <block type=\"MoverACasillaArriba\">\n        <next>\n        <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"MoverACasillaAbajo\">\n        <next>\n        <block type=\"PrepararEnsalada\">\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n      </statement>\n      </block>\n    </xml>",
    enunciado: '¿Qué error encontrás en este programa? Corregilo y ayudá a la mulita a preparar su almuerzo.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada']
  }, {
    id: 225,
    nombre: '3.I1a',
    titulo: 'Desafío 1',
    escena: "new EscenaTotoLector([\n        ['A', 'r', 'e'],\n        ['t', 'o', 'j'],\n        ['i', 't', 'o'],\n    ], \"toto\")",
    enunciado: 'Ayudá al zorro a leer su nombre: TOTO.',
    consignaInicial: 'TOTO lee las letras por las que se mueve.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverLeyendoAbajo', 'MoverLeyendoArriba', 'MoverLeyendoIzquierda', 'MoverLeyendoDerecha']
  }, {
    id: 226,
    nombre: '3.I1b',
    titulo: 'Desafío 2',
    escena: "new EscenaTotoLector([\n        ['r', 'h', 'j', 'a'],\n        ['z', 'A', 'a', 'm'],\n        ['y', 'l', 'l', 'q']\n    ], \"llama\")",
    enunciado: 'El zorro está pensando en su amiga de la Puna, Coty. Ayudalo a leer LLAMA.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverLeyendoAbajo', 'MoverLeyendoArriba', 'MoverLeyendoIzquierda', 'MoverLeyendoDerecha']
  }, {
    id: 227,
    nombre: '3.I1c',
    titulo: 'Desafío 3',
    escena: "new EscenaTotoLector([\n        ['a', 'm', 'A'],\n        ['f', 'u', 'p'],\n        ['r', 'y', 'a'],\n    ], \"puma\")",
    enunciado: '¡Adiviná en quién está pensando el zorro! Una ayuda: es un animal al que le gusta mucho comer churrasco.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverLeyendoAbajo', 'MoverLeyendoArriba', 'MoverLeyendoIzquierda', 'MoverLeyendoDerecha']
  }, {
    id: 228,
    nombre: '3.I1d',
    titulo: 'Desafío 4',
    escena: "new EscenaTotoLector([\n        ['A', 'c', 'a', 'b'],\n        ['o', 'l', 'l', 'e'],\n    ], \"caballo\")",
    enunciado: '¿Qué quiso leer el zorro y qué terminó leyendo? ¡Descubrí el error y corregilo!',
    consignaInicial: 'Toto está volviendo. Va a demorar un poco porque está andando a ...',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverLeyendoAbajo', 'MoverLeyendoArriba', 'MoverLeyendoIzquierda', 'MoverLeyendoDerecha'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverLeyendoDerecha\">\n        <next>\n        <block type=\"MoverLeyendoDerecha\">\n        <next>\n        <block type=\"MoverLeyendoDerecha\">\n        <next>\n        <block type=\"MoverLeyendoAbajo\">\n        <next>\n        <block type=\"MoverLeyendoIzquierda\">\n        <next>\n        <block type=\"MoverLeyendoIzquierda\">\n        <next>\n        <block type=\"MoverLeyendoIzquierda\">\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n      </statement>\n      </block>\n    </xml>"
  }, {
    id: 229,
    nombre: '3.I1e',
    titulo: 'Desafío 5',
    escena: "new EscenaTotoLector([\n        ['w', 'a', 'r'],\n        ['u', 'n', 'e'],\n        ['l', 'A', 's'],\n    ], \"lunes\", 7)",
    enunciado: 'El zorro está distraído. Ayudalo a leer correctamente qué día llega a Humahuaca.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverLeyendoAbajo', 'MoverLeyendoArriba', 'MoverLeyendoIzquierda', 'MoverLeyendoDerecha'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"MoverLeyendoIzquierda\">\n        <next>\n        <block type=\"MoverLeyendoArriba\">\n        <next>\n        <block type=\"MoverLeyendoDerecha\">\n        <next>\n        <block type=\"MoverLeyendoArriba\">\n        <next>\n        <block type=\"MoverLeyendoDerecha\">\n        <next>\n        <block type=\"MoverLeyendoAbajo\">\n        <next>\n        <block type=\"MoverLeyendoAbajo\">\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n      </statement>\n      </block>\n    </xml>"
  }, {
    id: 230,
    nombre: '4.1.3a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"        [-,O,O,O,-,-,-,-],        [-,O,O,O,O,-,-,-],        [O,O,-,O,O,-,-,-],        [O,O,-,-,-,-,-,-],        [A,-,-,-,-,-,-,P],        [-,-,O,-,O,-,-,-],        [-,-,O,O,O,O,O,O],        [-,-,-,O,O,O,O,O],\t\t\")",
    enunciado: '¿Puede la puma llegar al churrasco usando solo una vez el bloque mover?',
    consignaInicial: 'Podés usar el nuevo bloque “Repetir”',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir']
  }, {
    id: 231,
    nombre: '4.1.3b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba(\"        [O,O,-,O,O,-,-,-],        [O,P,-,O,O,-,-,-],        [O,-,-,O,-,-,-,-],        [O,-,O,O,-,-,-,-],        [O,-,O,O,O,-,-,-],        [-,-,O,O,O,O,-,-],        [-,-,O,O,O,O,O,O],        [-,-,A,O,O,O,O,O],\t\t\")",
    enunciado: 'La puma tiene hambre y está lejos del churrasco. ¡Pero ahora sabe repetir!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir']
  }, {
    id: 232,
    nombre: '4.1.3c',
    titulo: 'Desafío 3',
    escena: "new EscenaDuba(\"      [-,-,-,O,O,-,-,O],      [O,O,-,O,-,-,-,O],      [A,O,O,O,-,-,O,O],      [-,O,O,O,O,O,O,O],      [-,O,O,O,-,O,O,O],      [-,-,-,-,-,-,P,O],      [O,O,-,O,O,O,O,O],      [O,O,-,-,O,O,O,O],\t\t\")",
    enunciado: '¿Cómo puede hacer la puma para llegar a su comida sin tener que usar muchos bloques mover?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir']
  }, {
    id: 233,
    nombre: '4.1.4a',
    titulo: 'Desafío 1',
    escena: "new EscenaCoty(\n      [],\n      [[{x:-130,y:20},{x:-90,y:20}], [{x:-50,y:20},{x:-10,y:20}], [{x:30,y:20},{x:70,y:20}], [{x:110,y:20},{x:150,y:20}]],\n      {xCoty: -130, yCoty: 20, longitudSegmento: 40}     \n    )",
    enunciado: 'La llama quiere dibujar cuatro líneas. ¿Qué es lo que se repite esta vez?',
    consignaInicial: 'Puede haber más de un bloque dentro del Repetir',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir']
  }, {
    id: 234,
    nombre: '4.1.4b',
    titulo: 'Desafío 2',
    escena: "new EscenaCoty(\n      [],\n      [[{x:-130,y:20},{x:-90,y:20}], [{x:-50,y:20},{x:-10,y:20}], [{x:30,y:20},{x:70,y:20}], [{x:110,y:20},{x:150,y:20},{x:150,y:-20}]],\n      {xCoty: -130, yCoty: 20, longitudSegmento: 40}      \n    )",
    enunciado: '¡Ahora además hay que dibujar para abajo! ¿Será tan fácil como agregar un bloque a lo que hiciste antes? ¿Cuántas repeticiones son necesarias ahora?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir']
  }, {
    id: 235,
    nombre: '4.1.4c',
    titulo: 'Desafío 3',
    escena: "new EscenaCoty(\n      [],\n      [[{x:-120,y:-60},{x:-120,y:-20},{x:-80,y:-20},{x:-40,y:-20},{x:-40,y:20},{x:0,y:20},{x:40,y:20},{x:40,y:60},{x:80,y:60},{x:120,y:60}]],\n      {xCoty: -120, yCoty: -60, longitudSegmento: 40}\n    )",
    enunciado: 'La llama tiene ganas de dibujar una escalera. ¿Encontrás el patrón que se repite? ¿Cuántas veces se repite? ',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir']
  }, {
    id: 236,
    nombre: '4.2.3a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"      [-,-,-,-,O,O,O,O],      [-,-,-,-,-,-,-,O],      [-,-,-,-,-,-,-,-],      [-,P,-,-,-,-,-,-],      [-,-,-,-,-,O,A,-],      [-,-,-,-,O,O,O,O],      [O,O,O,O,O,O,O,O],      [O,O,O,O,O,O,O,O],\t\t\")",
    enunciado: '¡Qué bueno, ya tenés una solución! ¿La probás?',
    consignaInicial: 'Podés probar los programas paso a paso para descubrir los errores',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"MoverACasillaArriba\">\n      <next>\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">4</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaIzquierda\">\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 237,
    nombre: '4.2.3b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba(\"      [O,-,-,-,O,O,O,O],      [-,A,-,-,-,-,O,-],      [O,O,-,-,-,-,-,-],      [O,O,O,-,-,-,-,-],      [O,O,O,-,-,-,-,-],      [O,O,O,O,O,-,P,-],      [O,O,O,O,O,O,O,O],      [O,O,O,O,O,O,O,O],\t\t\")",
    enunciado: '¿Qué pasa que Duba no llega a comer su plato preferido? Sacá, modificá y/o agregá los bloques que falten para que logre su cometido.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n    <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n    <statement name=\"program\">\n      <block type=\"Repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\">\n            <field name=\"NUM\">5</field>\n          </block>\n        </value>\n        <statement name=\"block\">\n          <block type=\"MoverACasillaDerecha\">\n          <next>\n          <block type=\"MoverACasillaAbajo\">\n          </block>\n          </next>\n          </block>\n        </statement>\n      <next>\n      <block type=\"ComerChurrasco\">\n      </block>\n      </next>\n      </block>\n    </statement>\n    </block>\n  </xml>"
  }, {
    id: 238,
    nombre: '4.2.3c',
    titulo: 'Desafío 3',
    escena: "new EscenaCoty(\n      [],\n      [[{x:-100,y:-100},{x:-100,y:-50},{x:-50,y:-50},{x:-50,y:0},{x:0,y:0},{x:0,y:50},{x:50,y:50},{x:50,y:100},{x:100,y:100}]],\n      {xCoty: -100, yCoty: -100}      \n    )",
    enunciado: '¿Qué patrón debe repetir Coty esta vez? ¿Es correcta la solución propuesta?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n        <statement name=\"program\">\n          <block type=\"Repetir\">\n            <value name=\"count\">\n              <block type=\"math_number\">\n                <field name=\"NUM\">4</field>\n              </block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"MoverArribaDibujando\"></block>\n            </statement>\n            <next>\n              <block type=\"Repetir\">\n                <value name=\"count\">\n                  <block type=\"math_number\">\n                    <field name=\"NUM\">4</field>\n                  </block>\n                </value>\n                <statement name=\"block\">\n                  <block type=\"MoverDerechaDibujando\"></block>\n                </statement>\n              </block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </xml>"
  }, {
    id: 239,
    nombre: '4.2.3d',
    titulo: 'Desafío 4',
    escena: "new EscenaCoty(\n      [],\n      [[{x:-120,y:-60},{x:-120,y:-20},{x:-80,y:-20},{x:-80,y:20},{x:-40,y:20},{x:-40,y:60},{x:0,y:60},{x:40,y:60},{x:40,y:20},{x:80,y:20},{x:80,y:-20},{x:120,y:-20},{x:120,y:-60}]],\n      {xCoty: -120, yCoty: -60, longitudSegmento: 40}      \n    )",
    enunciado: '¡Otra vez Coty está en cualquiera! ¿Podés encontrar los errores y corregirlos? La llama te lo va a agradecer.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir'],
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n        <statement name=\"program\">\n          <block type=\"Repetir\">\n            <value name=\"count\">\n              <block type=\"math_number\">\n                <field name=\"NUM\">2</field>\n              </block>\n            </value>\n            <statement name=\"block\">\n              <block type=\"MoverArribaDibujando\">\n                <next>\n                  <block type=\"MoverDerechaDibujando\"></block>\n                </next>\n              </block>\n            </statement>\n            <next>\n              <block type=\"Repetir\">\n                <value name=\"count\">\n                  <block type=\"math_number\">\n                    <field name=\"NUM\">3</field>\n                  </block>\n                </value>\n                <statement name=\"block\">\n                  <block type=\"MoverDerechaDibujando\"></block>\n                </statement>\n                <next>\n                  <block type=\"Repetir\">\n                    <value name=\"count\">\n                      <block type=\"math_number\">\n                        <field name=\"NUM\">3</field>\n                      </block>\n                    </value>\n                    <statement name=\"block\">\n                      <block type=\"MoverAbajoDibujando\"></block>\n                    </statement>\n                  </block>\n                </next>\n              </block>\n            </next>\n          </block>\n        </statement>\n      </block>\n    </xml>"
  }, {
    id: 240,
    nombre: '4.I1a',
    titulo: 'Desafío 1',
    escena: "new EscenaLita(\"      [O,-,-,-,O,-,A],      [-,-,-,O,O,-,O],      [O,O,O,O,-,-,O],      [O,O,O,O,-,O,O],      [O,-,O,-,-,O,O],      [-,-,O,-,O,O,O],      [E,L,T,-,O,O,O]    \")",
    enunciado: '¿Encontrás pasos que se repiten? ¿Cuáles son? Creá el programa que ayuda a Lita a preparar su ensalada del día.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada', 'Repetir']
  }, {
    id: 241,
    nombre: '4.I1b',
    titulo: 'Desafío 2',
    escena: "new EscenaLita(\"      [L,-,-,-,-,T,E],      [-,O,-,-,O,-,O],      [-,O,O,O,O,-,O],      [-,O,O,O,-,-,O],      [-,-,-,O,-,-,-],      [A,-,-,-,-,-,-],      [-,O,O,-,-,O,O]    \")",
    debugging: true,
    solucionInicial: "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n      <block type=\"al_empezar_a_ejecutar\" id=\"1\" deletable=\"false\" movable=\"false\" editable=\"false\" x=\"15\" y=\"15\">\n      <statement name=\"program\">\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">4</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaArriba\">\n            </block>\n          </statement>\n        <next>\n        <block type=\"AgarrarLechuga\">\n        <next>\n        <block type=\"Repetir\">\n          <value name=\"count\">\n            <block type=\"math_number\">\n              <field name=\"NUM\">5</field>\n            </block>\n          </value>\n          <statement name=\"block\">\n            <block type=\"MoverACasillaDerecha\">\n            <next>\n            <block type=\"AgarrarTomate\">\n            </block>\n            </next>\n            </block>\n          </statement>\n        <next>\n        <block type=\"MoverACasillaDerecha\">\n        <next>\n        <block type=\"PrepararEnsalada\">\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n        </next>\n        </block>\n      </statement>\n      </block>\n    </xml>",
    enunciado: '¡Así como está, la mulita no puede preparar su ensalada! ¿Cuántas veces Lita repite los pasos para llegar a la lechuga? ¿Qué habría que modificar? ¿Qué sucede cuando pretende agarrar el tomate?',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada', 'Repetir']
  }, {
    id: 242,
    nombre: '5.1.3a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"[A,P?(0.6)]\", {}, [0,1])",
    enunciado: '¡A veces hay churrasco y a veces no! ¿Podés hacer un solo programa para que Duba avance siempre y coma solo si hay un churrasco?',
    consignaInicial: 'El bloque "Si" sirve para a veces hacer algo y a veces no. ¡Sirve para preguntar!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Si', 'HayChurrasco']
  }, {
    id: 243,
    nombre: '5.1.3b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba([\"[A,-,-]\",\"[A,P,-]\",\"[A,-,P]\",\"[A,P,P]\"], {}, [0,2])",
    enunciado: 'Ahora Duba debe avanzar dos veces. ¡tiene que comerse todos los churrascos que aparecen! ...Pero sólo si aparecen',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Si', 'HayChurrasco']
  }, {
    id: 244,
    nombre: '5.1.3c',
    titulo: 'Desafío 3',
    escena: "new EscenaCoty(\n      [],\n      [{x:-120,y:50},{x:20,y:50},{x:20,y:-90},{x:-120,y:-90},{x:-120,y:50}],\n      {xCoty: -120, yCoty: 50, puedeHaberCharco: true, longitudSegmento: 140}\n    )",
    enunciado: 'Coty debe dibujar un cuadrado, pero... ¡Cuidado, que a veces aparece un charco!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Si', 'HayCharco']
  }, {
    id: 245,
    nombre: '5.1.4a',
    titulo: 'Desafío 1',
    escena: "new EscenaLita(\"[A,-,L|T]\")",
    enunciado: 'Lita quiere agarrar cualquier verdura. ¡Pero debe ser la correcta!',
    consignaInicial: 'El bloque Si/Sino permite elegir entre dos alternativas. Sólo hay que elegir bien la pregunta',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada', 'Si', 'SiNo', 'HayTomate', 'HayLechuga']
  }, {
    id: 246,
    nombre: '5.1.4b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba([\"      [O,O,O,O,O],      [O,A,-,P,O],      [O,O,O,O,O],      [O,O,O,O,O],      [O,O,O,O,O],    \",\"      [O,O,O,O,O],      [O,A,O,O,O],      [O,-,O,O,O],      [O,P,O,O,O],      [O,O,O,O,O],\t\t\"])",
    enunciado: 'No siempre debe avanzar a la derecha... ¿Qué pregunta le sirve a Duba para decidir?',
    consignaInicial: 'También se puede poner más de una instrucción en el bloque Si/Sino',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Si', 'SiNo', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 247,
    nombre: '5.1.4c',
    titulo: 'Desafío 3',
    escena: "new EscenaDuba(\"      [O,O,O,O,O],      [-,-,*,-,-],      [A,-,*,-,P],      [O,O,O,O,O],\t\t\", { coleccion: [\"O\"] })",
    enunciado: '¡Cuidado, Duba! ¿Dónde puede aparecer un obstáculo? ¡Vamos a tener que decidir el camino a tomar!',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Si', 'SiNo', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 248,
    nombre: '5.2.1a',
    titulo: 'Desafío 1',
    escena: "new EscenaDuba(\"[A,-,-,-,-,-,-,P?]\", {}, [0,7])",
    enunciado: 'Ahora Duba está lejos, y tiene que decidir si comer o no. ¿La ayudamos con los bloques que aprendimos?',
    consignaInicial: 'Es importante apretar ejecutar varias veces para entender el problema',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir', 'Si', 'SiNo', 'HayChurrasco']
  }, {
    id: 249,
    nombre: '5.2.1b',
    titulo: 'Desafío 2',
    escena: "new EscenaDuba(\"[A,#P,#P,#P,#P,#P,#P,#P]\", { macros: { \"P\": \"*>P?\" }, coleccion: [\"P\"] }, [0,7])",
    enunciado: '¡Cuántos churrascos! ¿Qué patrón debe repetir Duba? ¿Cuántas preguntas tiene que hacer?',
    consignaInicial: 'Es importante apretar ejecutar varias veces para entender el problema',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'Repetir', 'Si', 'SiNo', 'HayChurrasco']
  }, {
    id: 250,
    nombre: '5.2.1c',
    titulo: 'Desafío 3',
    escena: "new EscenaLita(\"[A],[*>L|T],[*>L|T],[*>L|T],[*>L|T],[*>L|T],[*>L|T],[E]\", { coleccion: [\"T\", \"L\"] })",
    enunciado: '¡Lita también debe repetir su decisión varias veces! Siempre hay una verdura, sólo debe decidir cuál agarrar en cada paso.',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'AgarrarTomate', 'AgarrarLechuga', 'PrepararEnsalada', 'Repetir', 'Si', 'SiNo', 'HayTomate', 'HayLechuga']
  }, {
    id: 251,
    nombre: '5.I1a',
    titulo: 'Desafío 1',
    escena: "new EscenaTotoEscritor(new ObjetivoCopiar())",
    enunciado: '¡Ahora Toto sabe escribir! Hacé que copie toda la palabra.',
    consignaInicial: 'Toto sabe escribir la letra que está tocando',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'EscribirLetraActualEnOtraCuadricula', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 252,
    nombre: '5.I1b',
    titulo: 'Desafío 2',
    escena: "new EscenaTotoEscritor(new ObjetivoX())",
    enunciado: 'Ahora Toto quiere escribir una X por cada letra. ¡Sin importar lo que lea! ¿Cuantas X debe escribir?',
    consignaInicial: 'Toto también sabe escribir una letra que le digas',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'EscribirLetraActualEnOtraCuadricula', 'EscribirTextoDadoEnOtraCuadricula', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 253,
    nombre: '5.I1c',
    titulo: 'Desafío 3',
    escena: "new EscenaTotoEscritor(new ObjetivoMicha())",
    enunciado: 'A Toto le gusta jugar con las letras: hacé que copie la palabra, pero cuando llegue a la M, que agregue "ICH"',
    consignaInicial: 'Cuando copia "Cemento" escribe "Cemichento"',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'EscribirLetraActualEnOtraCuadricula', 'EscribirTextoDadoEnOtraCuadricula', 'Repetir', 'Si', 'SiNo', 'hayVocalRMT']
  }, {
    id: 254,
    nombre: '5.I1d',
    titulo: 'Desafío 4',
    escena: "new EscenaTotoEscritor(new ObjetivoJeringozo())",
    enunciado: 'Hacé que Toto copie la palabra hablando en Jeringozo. Si la palabra fuera "DUBA" él tiene que copiar "DUPUBAPA"',
    consignaInicial: 'El idioma Jeringozo agrega "PA" después de una A, "PE" después de una E, y así con todas las vocales',
    debeFelicitarse: true,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'EscribirLetraActualEnOtraCuadricula', 'EscribirTextoDadoEnOtraCuadricula', 'Repetir', 'Si', 'SiNo', 'hayVocalRMT']
  }, {
    id: 255,
    nombre: 'CotyDibujoLibre',
    titulo: '¡Coty dibuja libre!',
    imagen: 'Coty',
    escena: "new EscenaCoty([],[],{xCoty: -50, yCoty: 50})",
    enunciado: 'En esta actividad vas a poder realizar el dibujo que más te guste',
    consignaInicial: 'Incluímos todos los bloques posibles, para que puedas dar rienda suelta a tus conocimientos.',
    debeFelicitarse: false,
    estiloToolbox: 'sinCategorias',
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir', 'DibujarLado', 'GirarGrados', 'Numero', 'OpAritmetica']
  }, // Los desafíos a partir de acá (id paracapturaXX) se crearon únicamente para tomar capturas
  // para el manual de Tandil y no están pensados para ser usados por los alumnos.
  {
    id: 'paracaptura01',
    nombre: '3.2.1a',
    titulo: 'Cap. 3 / SD2 / A1 a',
    imagen: 'Duba',
    escena: "new EscenaDubaFondoBlanco(\"      [O,O,O,O],      [O,-,A,O],      [O,P,O,O],      [O,O,O,O],\t\t\")",
    estiloToolbox: 'sinCategorias',
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura02',
    nombre: '3.2.1b-1',
    titulo: 'Cap. 3 / SD2 / A1 b-1',
    imagen: 'Duba',
    escena: "new EscenaDubaFondoBlanco(\"      [O,O,O],      [O,P,O],      [A,-,O],\t\t\")",
    estiloToolbox: 'sinCategorias',
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura03',
    nombre: '3.2.1b-2',
    titulo: 'Cap. 3 / SD2 / A1 b-2',
    imagen: 'Duba',
    escena: "new EscenaDubaFondoBlanco(\"      [O,O,O],      [O,-,P],      [A,-,O],\t\t\")",
    estiloToolbox: 'sinCategorias',
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura04',
    nombre: '3.2.1b-3',
    titulo: 'Cap. 3 / SD2 / A1 b-3',
    imagen: 'Duba',
    escena: "new EscenaDubaFondoBlanco(\"      [O,O,O],      [P,-,A],      [O,O,O],\t\t\")",
    estiloToolbox: 'sinCategorias',
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura05',
    nombre: '3.2.1b-4',
    titulo: 'Cap. 3 / SD2 / A1 b-4',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,A,O],      [-,O,O],      [P,O,O],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura06',
    nombre: '3.2.1 c',
    titulo: 'Cap. 3 / SD2 / A1 c',
    imagen: 'Coty',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaCotyFondoBlanco(\n      [],\n      [[{x:-30,y:60},{x:30,y:60},{x:30,y:0},{x:30,y:-60}]],\n      {xCoty: -30, yCoty: 60, longitudSegmento: 60}\n    )",
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir', 'Si', 'SiNo', 'HayCharco']
  }, {
    id: 'paracaptura07',
    nombre: '3.2.1 d',
    titulo: 'Cap. 3 / SD2 / A1 d',
    imagen: 'Coty',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaCotyFondoBlanco(\n      [],\n      [[{x:-40,y:-40},{x:-40,y:40},{x:40,y:40},{x:40,y:-40},{x:-40,y:-40}]],\n      {xCoty: -40, yCoty: -40, longitudSegmento: 80}\n    )",
    bloques: ['MoverArribaDibujando', 'MoverAbajoDibujando', 'MoverDerechaDibujando', 'MoverIzquierdaDibujando', 'SaltarAbajo', 'SaltarArriba', 'SaltarDerecha', 'SaltarIzquierda', 'Repetir', 'Si', 'SiNo', 'HayCharco']
  }, {
    id: 'paracaptura08',
    nombre: '3.I1 a',
    titulo: 'Cap. 3 / Integradora / A1 a',
    imagen: 'Toto',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaTotoLectorFondoBlanco([\n      ['n', 'A'],\n      ['a', 'b'],\n    ], \"banana\")",
    bloques: ['MoverLeyendoArriba', 'MoverLeyendoAbajo', 'MoverLeyendoDerecha', 'MoverLeyendoIzquierda', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 'paracaptura09',
    nombre: '3.I1 b',
    titulo: 'Cap. 3 / Integradora / A1 b',
    imagen: 'Toto',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaTotoLectorFondoBlanco([\n      ['f', 'A'],\n      ['a', 'h'],\n      ['m', 'u'],\n      ['c', 'a'],\n    ], \"humahuaca\")",
    bloques: ['MoverLeyendoArriba', 'MoverLeyendoAbajo', 'MoverLeyendoDerecha', 'MoverLeyendoIzquierda', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 'paracaptura10',
    nombre: '3.I1 a',
    titulo: 'Cap. 3 / Integradora / A1 a V2',
    imagen: 'Toto',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaTotoLectorFondoBlanco([\n      ['a', 'v', 'u'],\n      ['j', 'n', 'A'],\n      ['n', 'a', 'b'],\n      ['a', 'r', 'e'],\n    ], \"banana\")",
    bloques: ['MoverLeyendoArriba', 'MoverLeyendoAbajo', 'MoverLeyendoDerecha', 'MoverLeyendoIzquierda', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 'paracaptura11',
    nombre: '3.I1 b',
    titulo: 'Cap. 3 / Integradora / A1 b V2',
    imagen: 'Toto',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaTotoLectorFondoBlanco([\n      ['f', 'A', 'p'],\n      ['a', 'h', 'e'],\n      ['m', 'u', 'o'],\n      ['c', 'a', 'j'],\n    ], \"humahuaca\")",
    bloques: ['MoverLeyendoArriba', 'MoverLeyendoAbajo', 'MoverLeyendoDerecha', 'MoverLeyendoIzquierda', 'Repetir', 'Si', 'SiNo']
  }, {
    id: 'paracaptura12',
    nombre: '4.2.1a',
    titulo: 'Cap. 4 / SD2 / A1 a',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [O,-,-,A,O],      [O,O,O,-,O],      [O,-,-,-,-],      [O,-,-,-,-],      [O,O,-,P,-],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura13',
    nombre: '4.2.1b',
    titulo: 'Cap. 4 / SD2 / A1 b',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,P],      [-,-,O,O,-],      [-,-,O,O,-],      [-,-,O,-,-],      [A,O,O,-,O],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura14',
    nombre: '4.2.1c',
    titulo: 'Cap. 4 / SD2 / A1 c',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [A,O,O,O,O],      [-,-,O,O,O],      [-,-,-,O,-],      [O,-,-,-,-],      [O,-,O,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura15',
    nombre: '4.2.2a',
    titulo: 'Cap. 4 / SD2 / A1 a',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-,O,O,O],      [-,A,-,-,-,-,O,O],      [-,-,-,-,-,-,-,O],      [O,O,-,-,P,-,-,O],      [O,-,-,-,-,-,-,O],      [O,-,-,-,-,-,-,-],      [O,O,-,-,-,O,-,O],      [O,O,O,O,O,O,O,O],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura16',
    nombre: '4.2.2b',
    titulo: 'Cap. 4 / SD2 / A1 b',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [O,O,-,-,-,-,-,-],      [O,-,-,-,-,-,-,-],      [-,-,P,-,-,-,-,-],      [-,-,-,-,-,-,-,-],      [-,-,O,O,-,-,-,-],      [O,-,O,O,-,-,-,-],      [O,O,O,O,-,A,-,O],      [O,O,O,O,O,O,O,O],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura17',
    nombre: '4.2.2c',
    titulo: 'Cap. 4 / SD2 / A1 c',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,P,-,-,-,O],      [-,-,-,-,-,-,-,-],      [-,-,-,-,-,-,-,-],      [-,-,-,-,-,-,-,-],      [O,O,O,-,-,-,-,-],      [O,O,O,O,-,-,-,-],      [O,O,O,O,-,O,-,A],      [O,O,O,O,O,O,-,-],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco']
  }, {
    id: 'paracaptura18',
    nombre: '5SD2A2a',
    titulo: 'Cap. 5 / SD2 / A2 a',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-],      [A,O,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura19',
    nombre: '5SD2A2b',
    titulo: 'Cap. 5 / SD2 / A2 b',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-],      [A,-,-,O,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura20',
    nombre: '5SD2A2c',
    titulo: 'Cap. 5 / SD2 / A2 c',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,O,-,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura21',
    nombre: '5SD2A2d',
    titulo: 'Cap. 5 / SD2 / A2 d',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,O,-,-,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura22',
    nombre: '5SD2A2e',
    titulo: 'Cap. 5 / SD2 / A2 e',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,O],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura23',
    nombre: '5SD2A2f',
    titulo: 'Cap. 5 / SD2 / A2 f',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,O,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura24',
    nombre: '5SD2A2g',
    titulo: 'Cap. 5 / SD2 / A2 g',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,O,-,-,-],      [A,-,-,O,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura25',
    nombre: '5SD2A2h',
    titulo: 'Cap. 5 / SD2 / A2 h',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-],      [A,-,-,O,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura26',
    nombre: '5SD2A2i',
    titulo: 'Cap. 5 / SD2 / A2 i',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,O,-,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura27',
    nombre: '5SD2A2j',
    titulo: 'Cap. 5 / SD2 / A2 j',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-],      [A,O,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura28',
    nombre: '5SD2A2k',
    titulo: 'Cap. 5 / SD2 / A2 k',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,O,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }, {
    id: 'paracaptura29',
    nombre: '5SD2A2l',
    titulo: 'Cap. 5 / SD2 / A2 l',
    imagen: 'Duba',
    estiloToolbox: 'sinCategorias',
    escena: "new EscenaDubaFondoBlanco(\"      [-,-,-,-,-],      [A,-,-,-,P],\t\t\")",
    bloques: ['Repetir', 'Si', 'SiNo', 'MoverACasillaAbajo', 'MoverACasillaArriba', 'MoverACasillaIzquierda', 'MoverACasillaDerecha', 'ComerChurrasco', 'HayChurrasco', 'HayObstaculoArriba', 'HayObstaculoAbajo', 'HayObstaculoIzquierda', 'HayObstaculoDerecha']
  }];
  _exports.default = _default;
});
;define("pilasbloques/mirage/fixtures/grupos", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = [{
    id: 1,
    titulo: 'Autómatas, comandos, procedimientos y repetición',
    desafioIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }, {
    id: 2,
    titulo: 'Alternativa condicional',
    desafioIds: [13, 14, 15, 16, 17, 18]
  }, {
    id: 3,
    titulo: 'Repetición condicional',
    desafioIds: [19, 20, 21, 22, 23, 24, 25]
  }, {
    id: 4,
    titulo: 'Sensores Numéricos',
    desafioIds: [26, 27]
  }, {
    id: 5,
    titulo: 'Parametrización de soluciones',
    desafioIds: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 130, 131, 132, 133, 134, 135, 136]
  }, {
    id: 'manual1cPrimaria3',
    titulo: 'Capítulo 3: Programando en la computadora'
  }, {
    id: 'manual1cPrimaria3.1.2',
    titulo: 'Dieta a base de churrascos',
    desafioIds: [201, 202, 203, 204, 205, 206]
  }, {
    id: 'manual1cPrimaria3.1.3',
    titulo: 'Coty empieza a dibujar',
    desafioIds: [207, 208, 209, 210, 211, 212, 213]
  }, {
    id: 'manual1cPrimaria3.1.4',
    titulo: '¡Marche una de lechuga y tomate!',
    desafioIds: [214, 215]
  }, {
    id: 'manual1cPrimaria3.2.2',
    titulo: 'La ensalada secreta',
    desafioIds: [216, 217, 218, 219]
  }, {
    id: 'manual1cPrimaria3.2.3',
    titulo: '¡Problemas para comer!',
    desafioIds: [220, 221, 222, 223, 224]
  }, {
    id: 'manual1cPrimaria3.I',
    titulo: 'Las palabras de Toto',
    desafioIds: [225, 226, 227, 228, 229]
  }, {
    id: 'manual1cPrimaria4',
    titulo: 'Capítulo 4: Repetición'
  }, {
    id: 'manual1cPrimaria4.1.3',
    titulo: 'Más churrascos para Duba',
    desafioIds: [230, 231, 232]
  }, {
    id: 'manual1cPrimaria4.1.4',
    titulo: 'Las líneas de Coty',
    desafioIds: [233, 234, 235]
  }, {
    id: 'manual1cPrimaria4.2.3',
    titulo: 'Corregimos los programas',
    desafioIds: [236, 237, 238, 239]
  }, {
    id: 'manual1cPrimaria4.I',
    titulo: 'Lita, a puro vegetal',
    desafioIds: [240, 241]
  }, {
    id: 'manual1cPrimaria5',
    titulo: 'Capítulo 5: Alternativa condicional'
  }, {
    id: 'manual1cPrimaria5.1.3',
    titulo: 'Sólo en ciertas ocasiones',
    desafioIds: [242, 243, 244]
  }, {
    id: 'manual1cPrimaria5.1.4',
    titulo: '¿Y si no?',
    desafioIds: [245, 246, 247]
  }, {
    id: 'manual1cPrimaria5.2.1',
    titulo: 'Más churrascos y ensaladas',
    desafioIds: [248, 249, 250]
  }, {
    id: 'manual1cPrimaria5.I',
    titulo: 'Agente Secreto Topotopo',
    desafioIds: [251, 252, 253, 254]
  }, {
    id: 'manual1cPrimariaOtros',
    titulo: 'Otros',
    desafioIds: [255]
  }, {
    id: 'manual1cPrimariaCapturasCap3',
    titulo: 'Desafíos para hacer capturas / Capítulo 3',
    desafioIds: ['paracaptura01', 'paracaptura02', 'paracaptura03', 'paracaptura04', 'paracaptura05', 'paracaptura06', 'paracaptura07', 'paracaptura08', 'paracaptura09', 'paracaptura10', 'paracaptura11']
  }, {
    id: 'manual1cPrimariaCapturasCap4',
    titulo: 'Desafíos para hacer capturas / Capítulo 4',
    desafioIds: ['paracaptura12', 'paracaptura13', 'paracaptura14', 'paracaptura15', 'paracaptura16', 'paracaptura17']
  }, {
    id: 'manual1cPrimariaCapturasCap5',
    titulo: 'Desafíos para hacer capturas / Capítulo 5',
    desafioIds: ['paracaptura18', 'paracaptura19', 'paracaptura20', 'paracaptura21', 'paracaptura22', 'paracaptura23', 'paracaptura24', 'paracaptura25', 'paracaptura26', 'paracaptura27', 'paracaptura28', 'paracaptura29']
  }];
  _exports.default = _default;
});
;define("pilasbloques/mirage/fixtures/libros", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = [{
    id: 1,
    grupoIds: ['manual1cPrimaria3', 'manual1cPrimaria3.1.2', 'manual1cPrimaria3.1.3', 'manual1cPrimaria3.1.4', 'manual1cPrimaria3.2.2', 'manual1cPrimaria3.2.3', 'manual1cPrimaria3.I', 'manual1cPrimaria4', 'manual1cPrimaria4.1.3', 'manual1cPrimaria4.1.4', 'manual1cPrimaria4.2.3', 'manual1cPrimaria4.I', 'manual1cPrimaria5', 'manual1cPrimaria5.1.3', 'manual1cPrimaria5.1.4', 'manual1cPrimaria5.2.1', 'manual1cPrimaria5.I', 'manual1cPrimariaOtros'],
    nombre: 'primer-ciclo',
    titulo: 'Primer Ciclo',
    descripcion: 'Desafíos del manual para docentes "Ciencias de la Computación para el aula, 1° ciclo de primaria"',
    modoLecturaSimple: true,
    // modo de lectura para niños pequeños.
    desafiosCortos: true // significa que en un grupo/serie de desafíos, se deben hacer uno detrás del otro.
    // sirve particularmente para mostrar el título de la serie en el desafío.
    // ver pilas-editor.hbs

  }, {
    id: 2,
    grupoIds: [1, 2, 3, 4, 5],
    nombre: 'programar',
    titulo: 'Segundo Ciclo',
    descripcion: 'Desafíos del cuaderno para docentes "Actividades para aprender a Program.AR"  Para 2° ciclo de primaria en adelante.'
  }, // Libro invisible, exclusivo para hacer capturas:
  {
    id: 'capturas1c',
    grupoIds: ['manual1cPrimariaCapturasCap3', 'manual1cPrimariaCapturasCap4', 'manual1cPrimariaCapturasCap5'],
    titulo: 'Primer ciclo para hacer capturas',
    modoLecturaSimple: true,
    desafiosCortos: true,
    oculto: true
  }];
  _exports.default = _default;
});
;define("pilasbloques/mirage/models/desafio", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = _emberCliMirage.Model.extend({
    grupo: (0, _emberCliMirage.belongsTo)('grupo')
  });

  _exports.default = _default;
});
;define("pilasbloques/mirage/models/grupo", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = _emberCliMirage.Model.extend({
    desafios: (0, _emberCliMirage.hasMany)('desafio', {
      inverseOf: 'grupo'
    }),
    libro: (0, _emberCliMirage.belongsTo)('libro')
  });

  _exports.default = _default;
});
;define("pilasbloques/mirage/models/libro", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = _emberCliMirage.Model.extend({
    grupos: (0, _emberCliMirage.hasMany)('grupo', {
      inverseOf: 'libro'
    })
  });

  _exports.default = _default;
});
;define("pilasbloques/mirage/scenarios/default", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  /*jshint esversion: 6 */
  function _default(server) {
    server.loadFixtures();
  }
});
;define("pilasbloques/mirage/serializers/application", ["exports", "ember-cli-mirage"], function (_exports, _emberCliMirage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*jshint esversion: 6 */
  var _default = _emberCliMirage.JSONAPISerializer.extend({
    include: ['libros', 'grupos', 'desafios']
  });

  _exports.default = _default;
});
;define("pilasbloques/models/desafio", ["exports", "ember-data/model", "ember-data/attr", "ember-data/relationships"], function (_exports, _model, _attr, _relationships) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _model.default.extend({
    nombre: (0, _attr.default)('string'),
    titulo: (0, _attr.default)('string'),
    imagen: (0, _attr.default)('string'),
    deshabilitado: (0, _attr.default)('boolean'),
    enunciado: (0, _attr.default)('string'),
    consignaInicial: (0, _attr.default)('string'),
    escena: (0, _attr.default)('string'),
    debeFelicitarse: (0, _attr.default)(),
    estiloToolbox: (0, _attr.default)('string'),
    grupo: (0, _relationships.belongsTo)('grupo'),
    bloques: (0, _attr.default)(),
    solucionInicial: (0, _attr.default)('string'),
    debugging: (0, _attr.default)('boolean'),
    nombreImagen: Ember.computed('imagen', 'nombre', function () {
      return "".concat(this.imagen || this.nombre || 'proximamente', ".png");
    })
  });

  _exports.default = _default;
});
;define("pilasbloques/models/grupo", ["exports", "ember-data/model", "ember-data/attr", "ember-data/relationships"], function (_exports, _model, _attr, _relationships) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _model.default.extend({
    titulo: (0, _attr.default)('string'),
    desafios: (0, _relationships.hasMany)('desafio'),
    // , {inverseOf: 'grupo'})
    libro: (0, _relationships.belongsTo)('libro')
  });

  _exports.default = _default;
});
;define("pilasbloques/models/libro", ["exports", "ember-data", "ember-data/relationships"], function (_exports, _emberData, _relationships) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _emberData.default.Model.extend({
    titulo: _emberData.default.attr('string'),
    nombre: _emberData.default.attr('string'),
    descripcion: _emberData.default.attr('string'),
    grupos: (0, _relationships.hasMany)('grupo'),
    modoLecturaSimple: _emberData.default.attr('boolean'),
    desafiosCortos: _emberData.default.attr('boolean'),
    oculto: _emberData.default.attr('boolean')
  });

  _exports.default = _default;
});
;define("pilasbloques/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("pilasbloques/router", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType
  });
  Router.map(function () {
    this.route('acercade');
    this.route('desafio', {
      path: '/desafio/:desafio_id'
    });
    /* Rutas para el curso online 2016 (moodle) */

    this.route('desafios', function () {
      this.route('cursoAlumno', {
        path: "/cursoAlumno/:hash"
      });
      this.route('cursoDocente', {
        path: "/cursoDocente/:hash"
      });
      this.route('desafioPorNombre', {
        path: '/:nombreDelDesafio'
      });
    });
    this.route('libros', function () {
      this.route('verLibro', {
        path: ":libro_id"
      });
    });
    this.route('galeria');
  });
  Router.reopen({
    notifyGoogleAnalytics: Ember.on("didTransition", function () {
      if (ga && _environment.default.googleAnalyticsEnabled) {
        let url = this.url;
        ga('send', 'pageview', {
          page: url,
          title: url
        });
      }
    })
  });
  var _default = Router;
  _exports.default = _default;
});
;define("pilasbloques/routes/acercade", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({});

  _exports.default = _default;
});
;define("pilasbloques/routes/desafio", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    queryParams: {
      codigo: {
        replace: true
      }
    },
    pilas: Ember.inject.service()
  });

  _exports.default = _default;
});
;define("pilasbloques/routes/desafios/curso-alumno", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* Esta ruta es una especialización de la ruta Nombre,
   * ya que hace algo muy similar, pero esconde elementos
   * de la interfaz y permite guardar la solución en un
   * backend de datos.
   */
  var _default = Ember.Route.extend({
    cursoAPI: Ember.inject.service(),

    model(params) {
      params.nombre = this.decodificarHash(params.hash).actividad;
      return this.store.findAll("desafio").then(data => {
        // TODO: reemplazar la linea anterior (findAll) y la siguiente
        //       por una consulta a ember-data más específica, como la que
        //       realiza findRecord, que solo debería traer un solo registro.
        //
        //       (esto está así ahora porque se debe corregir mirage antes).
        let model = data.findBy('nombre', params.nombre);

        if (!model) {
          throw new Error("No existe una actividad con el nombre ".concat(params.nombre));
        }

        return model;
      });
    },

    /* Agrega los parámetros decodificados del hash al modelo. */
    afterModel(model, transition) {
      let hash = this.obtener_hash_desde_transition(transition);
      let valores = this.decodificarHash(hash);
      model.idAlumno = valores.idAlumno;
      model.hash = valores.hashCompleto;
      return this.cursoAPI.obtener_solucion_xml_desde_hash(model.hash).then(solucion_xml => {
        model.set("solucion", btoa(solucion_xml));
      }).catch(() => {
        console.warn("Ha fallado solicitar la solución al servidor, esto es porque el alumno no hay guardado nunca.");
        return null;
      });
    },

    obtener_hash_desde_transition(transition) {
      return transition.params[this.routeName].hash;
    },

    decodificarHash(hash) {
      let hashString = atob(hash);
      let valores = hashString.split("-");

      if (valores.length !== 3) {
        throw Error("Hash con formato de piezas incorrecto: ".concat(hashString));
      }

      return {
        actividad: valores[0],
        idAlumno: valores[1],
        hashMoodle: valores[2],
        hashCompleto: hash
      };
    },

    activate() {
      this.ocultarLayout();
    },

    ocultarLayout() {
      this.controllerFor('application').set('layout', false);
    },

    actions: {
      cuandoEjecuta(codigoXML) {
        let nombre = this.get('currentModel.nombre');
        let hash = this.get('currentModel.hash');
        let idAlumno = this.get('currentModel.idAlumno');
        let parametros = {
          actividad: nombre,
          hash,
          idAlumno,
          codigo_xml: codigoXML
        };
        this.cursoAPI.guardar(parametros).catch(reason => {
          console.error(reason);
          alert("Se a producido un error al guardar, por favor volvé a intentar.");
        });
      }

    }
  });

  _exports.default = _default;
});
;define("pilasbloques/routes/desafios/curso-docente", ["exports", "pilasbloques/routes/desafios/curso-alumno"], function (_exports, _cursoAlumno) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _cursoAlumno.default.extend({
    afterModel(model, transition) {
      this._super(model, transition);

      return this.cursoAPI.obtener_solucion_xml_desde_hash(model.hash).then(solucion_xml => {
        model.set("solucion", btoa(solucion_xml));
      });
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/routes/desafios/desafio-por-nombre", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model(params) {
      return this.store.findAll("desafio").then(data => {
        // TODO: reemplazar la linea anterior (findAll) y la siguiente
        //       por una consulta a ember-data más específica, como la que
        //       realiza findRecord, que solo debería traer un solo registro.
        //
        //       (esto está así ahora porque se debe corregir mirage antes).
        let model = data.findBy('nombre', params.nombreDelDesafio);

        if (!model) {
          throw new Error("No existe una actividad con el nombre ".concat(params.nombreDelDesafio));
        }

        return this.transitionTo("desafio", model);
      });
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/routes/desafios/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return this.store.findAll('grupo');
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/routes/galeria", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    blockly: Ember.inject.service(),
    blocksGallery: Ember.inject.service(),

    activate() {
      this.blocksGallery.start();
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/routes/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    beforeModel()
    /* transition */
    {
      this.transitionTo('libros');
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/routes/libros/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    model() {
      return this.store.findAll('libro');
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("pilasbloques/services/available-blocks-validator", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /// Este service deshabilita los bloques que no estén disponibles para una actividad
  var _default = Ember.Service.extend({
    globalAvailableBlockTypes: ["al_empezar_a_ejecutar", "numero", "required_value", "required_statement"],
    procedureRelatedBlockTypes: ["procedures_defnoreturn", "procedures_callnoreturn", "variables_get", "param_get"],

    disableNotAvailableBlocksInWorkspace(activityBlocks) {
      Blockly.getMainWorkspace().getAllBlocks().filter(block => !this._isAvailable(block, activityBlocks)).forEach(block => this._disable(block));
    },

    _isAvailable(block, activityBlocks) {
      return this._match(this.globalAvailableBlockTypes, block) || this._match(activityBlocks, block) || this._match(this.procedureRelatedBlockTypes, block) && this._includes(activityBlocks, "procedimiento");
    },

    _match(availableBlockTypes, currentBlock) {
      let aliases = currentBlock.aliases || [];
      return this._includes(availableBlockTypes, currentBlock.type) || aliases.some(alias => this._includes(availableBlockTypes, alias));
    },

    _includes(availableBlockTypes, type) {
      return availableBlockTypes.map(name => name.toLowerCase()).includes(type.toLowerCase());
    },

    _disable(block) {
      block.setDisabled(true);
      block.setWarningText("Este bloque no está disponible en esta actividad.");
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/blockly", ["exports", "ember-blockly/services/blockly"], function (_exports, _blockly) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _blockly.default;
    }
  });
});
;define("pilasbloques/services/blocks-gallery", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    blockly: Ember.inject.service(),

    start() {
      Blockly.textToBlock = this._textToBlock;
      Blockly.Events.fireRunCode = this._fireRunCodeEvent;

      this._generarLenguaje();

      this._definirColores();

      this._definirBloquesIniciales();

      this._definirBloquesAccion();

      this._definirBloquesSensores();

      this._definirBloquesQueRepresentanValores();

      this._definirBloquesEstructurasDeControl();

      this._definirBloquesAlias();

      this._definirOperaciones(); // Should be after alias


      this._makeAllInputsRequired();
    },

    _textToBlock(text) {
      return Blockly.Xml.domToBlock(Blockly.Xml.textToDom(text), Blockly.mainWorkspace);
    },

    _fireRunCodeEvent() {
      let event = Blockly.Events.fromJson({
        type: "ui",
        run: true
      }, Blockly.mainWorkspace);
      event.runCode = true;
      Blockly.Events.fire(event);
    },

    _makeAllInputsRequired() {
      Object.values(Blockly.Blocks).forEach(blockDef => {
        let oldInit = blockDef.init;

        blockDef.init = function () {
          if (oldInit) oldInit.bind(this)();
          requiredAllInputs(this);
        };
      });
    },

    /*
     * Método auxiliar para crear un bloque acción.
     *
     * El argumento 'opciones' tiene que definir estas propiedades:
     *
     *   - descripcion
     *   - icono
     *   - comportamiento
     *   - argumentos
     *
     */
    crearBloqueAccion(nombre, opciones) {
      this._validar_opciones_obligatorias(nombre, opciones, ['descripcion', 'comportamiento', 'argumentos']);

      opciones.colour = opciones.colour || Blockly.Blocks.primitivas.COLOUR;
      let bloque = this.blockly.createCustomBlockWithHelper(nombre, opciones);
      bloque.categoria = "Primitivas";
      return bloque;
    },

    /*
     * Método auxiliar para crear un bloque nuevo a partir de otro original.
     *
     * Este método sirve para crear bloques como 'Si', 'Repetir' etc... ya que
     * esos bloques en realidad se generan a partir de los bloques estándar
     * como 'controls_if'.
     */
    crearBloqueAlias(nombre, nombreDelBloqueOriginal, categoria, categoriaCustom) {
      if (!Blockly.Blocks[nombreDelBloqueOriginal]) {
        throw new Error("No existe el bloque ".concat(nombreDelBloqueOriginal, " al querer crear un alias, \xBFTal vez los argumentos est\xE1n invertidos?"));
      }

      let bloque = this.blockly.createAlias(nombre, nombreDelBloqueOriginal);
      bloque.categoria = categoria || Blockly.Blocks[nombreDelBloqueOriginal].categoria;

      if (categoriaCustom) {
        bloque.categoria_custom = categoriaCustom;
      }

      return bloque;
    },

    areAliases(alias, type) {
      return Blockly.Blocks[type].aliases.includes(alias);
    },

    /*
     * Método auxiliar para crear un bloque que sirva como sensor.
     *
     * El argumento 'opciones' tiene que definir estas propiedades:
     *
     *   - descripcion
     *   - icono
     *   - funcionSensor
     *
     */
    crearBloqueSensor(nombre, opciones) {
      this._validar_opciones_obligatorias(nombre, opciones, ['descripcion', 'funcionSensor']);

      var formaDelBloque = opciones.icono ? "%1 " : "";
      formaDelBloque += opciones.esBool ? "¿" : "";
      formaDelBloque += opciones.descripcion;
      formaDelBloque += opciones.esBool ? "?" : "";
      let blockly = this.blockly;
      let bloque = blockly.createCustomBlock(nombre, {
        message0: formaDelBloque,
        colour: opciones.colour || Blockly.Blocks.sensores.COLOUR,
        inputsInline: true,
        output: null,
        args0: [{
          type: "field_image",
          src: "iconos/".concat(opciones.icono),
          width: 16,
          height: 16,
          alt: "*"
        }],
        code: ""
      }); // TODO: Arreglar generacion de codigo

      bloque.categoria = "Sensores";

      Blockly.MyLanguage[nombre] = function () {
        let codigo = "evaluar(".concat(JSON.stringify(opciones.funcionSensor), ")");
        return [codigo, Blockly.MyLanguage.ORDER_ATOMIC];
      };

      return bloque;
    },

    crearBloqueValor(nombre, opciones) {
      this._validar_opciones_obligatorias(nombre, opciones, ['descripcion', 'icono', 'valor']);

      opciones.colour = opciones.colour || Blockly.Blocks.primitivas.COLOUR;
      let bloque = this.blockly.createBlockValue(nombre, opciones);
      bloque.categoria = "Valores";
      return bloque;
    },

    /*
     * Lanza una exception si un diccionario no presenta alguna clave obligatoria.
     */
    _validar_opciones_obligatorias(nombre, opciones, listaDeOpcionesObligatorias) {
      listaDeOpcionesObligatorias.forEach(opcion => {
        if (!(opcion in opciones)) {
          throw new Error("No se puede crear el bloque ".concat(nombre, " porque no se indic\xF3 un valor para la opci\xF3n ").concat(opcion, "."));
        }
      });
    },

    _definirColores() {
      // Pisar las globales de Blockly es necesario pues usamos algunos bloques de Blockly como aliases.
      Blockly.Blocks.math.HUE = 94; // En PB 1.1.2 era '#48930e'

      Blockly.Blocks.logic.HUE = 210; // En PB 1.1.2 era '#5cb712'

      Blockly.Blocks.procedures.HUE = 290; // En PB 1.1.2 era '#6C52EB'

      Blockly.Blocks.variables.HUE = 330; // En PB 1.1.2 era '#cc5b22'

      Blockly.Blocks.texts.HUE = 160; // En PB 1.1.2 era '#4a6cd4'

      Blockly.Blocks.lists.HUE = 206; // En PB 1.1.2 era '#cc5b22'
      // Para los bloques propios

      Blockly.Blocks.primitivas = {
        COLOUR: '#4a6cd4'
      };
      Blockly.Blocks.control = {
        COLOUR: '#ee7d16'
      };
      Blockly.Blocks.sensores = {
        COLOUR: '#2ca5e2'
      };
      Blockly.Blocks.direcciones = {
        COLOUR: '#2ba4e2'
      };
      Blockly.Blocks.eventos = {
        COLOUR: '#00a65a'
      }; // == boton ejecutar
      // IN SCRATCH THE COLOURS ARE
      // 4a6cd4 MOTION
      // 8a55d7 LOOKS
      // bb42c3 SOUND
      // 0e9a6c PEN
      // ee7d16 DATA Variables
      // cc5b22 DATA Lists
      // c88330 EVENTS
      // e1a91a CONTROL
      // 2ca5e2 SENSING
      // 5cb712 OPERATORS
      // 49930e OPERATORS dark
      // 632d99 MORE BLOCKS
      // 5e4db3 PARAMS
    },

    _definirBloquesAccion() {
      this.crearBloqueAccion('ApretarBoton', {
        descripcion: 'Apretar botón',
        icono: 'iconos.botonRojo.png',
        comportamiento: 'Interactuar',
        argumentos: "{\n        etiqueta: 'BotonAnimado',\n        nombreAnimacion: 'apretar',\n        animacionInteractuadoAlFinal: 'prendida',\n        mensajeError: 'No hay un bot\xF3n aqu\xED',\n        idTransicion: 'apretarBoton'\n      }"
      });
      this.crearBloqueAccion('EncenderLuz', {
        descripcion: 'Prender la luz',
        icono: 'icono.Lamparita.png',
        comportamiento: 'Encender',
        argumentos: "{'etiqueta':'Luz'}"
      });
      this.crearBloqueAccion('ComerBanana', {
        descripcion: 'Comer banana',
        icono: 'icono.banana.png',
        comportamiento: 'Recolectar',
        argumentos: "{etiqueta: 'BananaAnimada', nombreAnimacion: \"comerBanana\"}"
      });
      this.crearBloqueAccion('ComerManzana', {
        descripcion: 'Comer manzana',
        icono: 'icono.manzana.png',
        comportamiento: 'Recolectar',
        argumentos: "{etiqueta: 'ManzanaAnimada', nombreAnimacion: \"comerManzana\"}"
      });
      this.crearBloqueAccion('ComerQueso', {
        descripcion: 'Comer queso',
        icono: 'queso.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta: "QuesoAnimado"}'
      });
      this.crearBloqueAccion('ComerNaranja', {
        descripcion: 'Comer naranja',
        icono: 'naranja.png',
        comportamiento: 'Recolectar',
        argumentos: '{\'etiqueta\' : \'NaranjaAnimada\',  nombreAnimacion: "comerNaranja"}'
      });
      this.crearBloqueAccion('MoverACasillaDerecha', {
        descripcion: 'Mover a la derecha',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverACasillaDerecha',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverACasillaIzquierda', {
        descripcion: 'Mover a la izquierda',
        icono: 'icono.izquierda.png',
        comportamiento: 'MoverACasillaIzquierda',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverACasillaArriba', {
        descripcion: 'Mover arriba',
        icono: 'icono.arriba.png',
        comportamiento: 'MoverACasillaArriba',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverACasillaAbajo', {
        descripcion: 'Mover abajo',
        icono: 'icono.abajo.png',
        comportamiento: 'MoverACasillaAbajo',
        argumentos: '{}'
      });
      this.crearBloqueAccion('LevantaTuerca', {
        descripcion: 'Levantar tuerca',
        icono: 'tuerca.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta: "TuercaAnimada", mensajeError: "No hay tuerca aquí", pasos: 50}'
      });
      this.crearBloqueAccion('Saludar', {
        descripcion: 'Saludar',
        icono: 'icono.saludar.png',
        comportamiento: 'ComportamientoAnimado',
        argumentos: '{nombreAnimacion: "saludando", idTransicion: "saludar"}'
      });
      this.crearBloqueAccion('AbrirOjos', {
        descripcion: 'Abrir ojos',
        icono: 'icono.abrirOjos.png',
        comportamiento: 'AnimarSiNoEstoyYa',
        argumentos: '{nombreAnimacion: "abrirOjos", valorEstar: "con los ojos abiertos", descripcionEstar: "estadoOjos", nombreAnimacionSiguiente: "parado", arrancoAsi:true, idTransicion: "abrirOjos"}'
      });
      this.crearBloqueAccion('CerrarOjos', {
        descripcion: 'Cerrar ojos',
        icono: 'icono.cerrarOjos.png',
        comportamiento: 'AnimarSiNoEstoyYa',
        argumentos: '{nombreAnimacion: "cerrarOjos", valorEstar: "con los ojos cerrados", descripcionEstar: "estadoOjos", nombreAnimacionSiguiente: "ojosCerrados", idTransicion: "cerrarOjos"}'
      });
      this.crearBloqueAccion('Acostarse', {
        descripcion: 'Acostarse',
        icono: 'icono.acostarse.png',
        comportamiento: 'ModificarRotacionYAltura',
        argumentos: '{alturaIr: -180 ,rotacionIr: 90, nombreAnimacion:"acostado", valorEstar: "acostado", descripcionEstar: "posicionCuerpo", idTransicion: "acostarse"}'
      });
      this.crearBloqueAccion('Pararse', {
        descripcion: 'Pararse',
        icono: 'icono.pararse.png',
        comportamiento: 'ModificarRotacionYAltura',
        argumentos: '{alturaIr: -150 ,rotacionIr: 0, nombreAnimacion:"acostado", valorEstar: "parado", descripcionEstar: "posicionCuerpo", arrancoAsi:true, idTransicion: "levantarse"}'
      });
      this.crearBloqueAccion('Volver', {
        descripcion: 'Volver',
        icono: 'icono.izquierda.png',
        comportamiento: 'MovimientoAnimado',
        argumentos: '{direccion: [-1,0], distancia: 50, idTransicion: "volver"}'
      });
      this.crearBloqueAccion('Avanzar', {
        descripcion: 'Avanzar',
        icono: 'icono.derecha.png',
        comportamiento: 'MovimientoAnimado',
        argumentos: '{direccion: [1,0], distancia: 50, idTransicion: "avanzar"}'
      });
      this.crearBloqueAccion('Soniar', {
        descripcion: 'Soñar',
        icono: 'icono.soniar.png',
        comportamiento: 'Pensar',
        argumentos: '{mensaje: "ZZzzZzZ...", hayQueAnimar: false, idTransicion: "soniar"}'
      });
      this.crearBloqueAccion('SaltarHablando', {
        descripcion: 'Saltar',
        icono: 'icono.arriba.png',
        comportamiento: 'SaltarHablando',
        argumentos: "{\n        velocidad_inicial: 30,\n        alturaDeseada: 150,\n        cantPasos: 20,\n        velocidad: 50\n      }"
      });
      this.crearBloqueAccion('VolverABordeIzquierdo', {
        descripcion: 'Ir al borde izquierdo',
        icono: 'icono.izquierdaTope.png',
        comportamiento: 'MoverTodoAIzquierda',
        argumentos: '{}'
      });
      this.crearBloqueAccion('TomarEstrella', {
        descripcion: 'Tomar estrella',
        icono: 'icono.estrella.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta: "EstrellaAnimada", "mensajeError": "Acá no hay una estrella"}'
      });
      this.crearBloqueAccion('MorderSandia', {
        descripcion: 'Comer sandía',
        icono: 'icono.sandia.png',
        comportamiento: 'Recolectar',
        argumentos: '{\'etiqueta\':\'SandiaAnimada\', \'mensajeError\': \'Acá no hay una sandia\'}'
      });
      this.crearBloqueAccion('AlimentarPez', {
        descripcion: 'Alimentar pez',
        icono: 'icono.pez.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta: "PezAnimado", idTransicion: "alimentarPez"}'
      });
      this.crearBloqueAccion('AgarrarComida', {
        descripcion: 'Agarrar comida',
        icono: 'icono.alimento_pez.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta: "AlimentoAnimado", idTransicion: "recogerComida"}'
      });
      this.crearBloqueAccion('PasarASiguienteComputadora', {
        descripcion: 'Pasar a la siguiente computadora',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverACasillaDerecha',
        argumentos: '{}'
      });
      this.crearBloqueAccion('PrenderComputadora', {
        descripcion: 'Prender computadora',
        icono: 'icono.turn_on.svg',
        comportamiento: 'PrenderComputadora',
        argumentos: '{}'
      });
      this.crearBloqueAccion('ApagarComputadora', {
        descripcion: 'Apagar computadora',
        icono: 'icono.turn_off.svg',
        comportamiento: 'ApagarComputadora',
        argumentos: '{}'
      });
      this.crearBloqueAccion('InstalarJuego', {
        descripcion: 'Instalar juego',
        icono: 'icono.installation.svg',
        comportamiento: 'InstalarJuegoEnComputadora',
        argumentos: '{}'
      });
      this.crearBloqueAccion('EscribirA', {
        descripcion: 'Escribir "A"',
        icono: 'icono.letter-a.svg',
        comportamiento: 'EscribirEnComputadora',
        argumentos: '{idTransicion: "escribirA"}'
      });
      this.crearBloqueAccion('EscribirB', {
        descripcion: 'Escribir "B"',
        icono: 'icono.letter-b.svg',
        comportamiento: 'EscribirEnComputadora',
        argumentos: '{idTransicion: "escribirB"}'
      });
      this.crearBloqueAccion('EscribirC', {
        descripcion: 'Escribir "C"',
        icono: 'icono.letter-c.svg',
        comportamiento: 'EscribirEnComputadora',
        argumentos: '{idTransicion : "escribirC"}'
      });
      this.crearBloqueAccion('AgarrarLlave', {
        descripcion: 'Tomar la llave',
        icono: 'icono.llave.png',
        comportamiento: 'Sostener',
        argumentos: "{\n        etiqueta: \"LlaveAnimado\",\n        idTransicion: \"agarrarLlave\"\n      }"
      });
      this.crearBloqueAccion('AbrirCofre', {
        descripcion: 'Abrir el cofre',
        icono: 'icono.cofre.png',
        comportamiento: 'Soltar',
        argumentos: "{\n        etiqueta: \"CofreAnimado\",\n        queSoltar: \"LlaveAnimado\",\n        animacionInteractuadoAlFinal: \"abrir\",\n        idTransicion: \"abrirCofre\"\n      }"
      });
      this.crearBloqueAccion('DarSombrero', {
        descripcion: 'Dar el sombrero',
        icono: 'icono.sombrero.png',
        comportamiento: 'Interactuar',
        argumentos: "{\n        etiqueta: \"MagoAnimado\",\n        nombreAnimacion: \"cambiarSombreroPorEspada\",\n        animacionInteractuadoMientras: \"darEspada\",\n        idTransicion: \"darSombrero\"\n      }"
      });
      this.crearBloqueAccion('AtacarConEspada', {
        id: 'Atacarconespada',
        descripcion: 'Atacar con la espada',
        icono: 'icono.espada.png',
        comportamiento: 'SecuenciaAnimada',
        argumentos: "{\n        idTransicion: \"atacarConEspada\",\n        secuencia: [\n          {\n            comportamiento: \"Interactuar\",\n            argumentos: {\n              etiqueta: \"CaballeroAnimado\",\n              animacionInteractuadoMientras: \"defender\",\n              nombreAnimacion:\"atacar\"\n            }\n          },\n          {\n            comportamiento: \"Sostener\",\n            argumentos: {\n              etiqueta:\"Principe\"\n            }\n          }\n        ]\n      }"
      });
      this.crearBloqueAccion('EscaparEnUnicornio', {
        descripcion: 'Escapar en unicornio',
        icono: 'icono.unicornio.png',
        comportamiento: 'Escapar',
        argumentos: "{\n        escaparCon: \"unicornio\"\n      }"
      });
      this.crearBloqueAccion('Escapar', {
        descripcion: 'Escapar',
        comportamiento: 'Escapar',
        argumentos: "{\n        receptor: \"nave\",\n        escaparCon: \"automata\"\n      }"
      });
      this.crearBloqueAccion('TomarHierro', {
        descripcion: 'Agarrar hierro',
        icono: 'icono.hierro.png',
        comportamiento: 'Sostener',
        argumentos: "{\n        etiqueta: \"HierroAnimado\",\n        nombreAnimacion: \"recogerHierro\"\n      }"
      });
      this.crearBloqueAccion('TomarCarbon', {
        descripcion: 'Agarrar carbón',
        id: 'TomarCarbon',
        icono: 'icono.carbon.png',
        comportamiento: 'Sostener',
        argumentos: "{\n        etiqueta: \"CarbonAnimado\",\n        nombreAnimacion: \"recogerCarbon\"\n      }"
      });
      this.crearBloqueAccion('PrenderFogata', {
        descripcion: 'Prender fogata',
        icono: 'icono.FogataPrendida.png',
        comportamiento: 'Interactuar',
        argumentos: "{\n        etiqueta: \"FogataAnimada\",\n        nombreAnimacion: \"prender\",\n        animacionInteractuadoAlFinal: \"prendida\"\n      }"
      });
      this.crearBloqueAccion('Depositar', {
        descripcion: 'Poner en la nave',
        comportamiento: 'Soltar',
        argumentos: "{\n        idTransicion: \"depositar\",\n        etiqueta: \"NaveAnimada\"\n      }"
      });
      this.crearBloqueAccion('AvanzarMono', {
        descripcion: 'Mover a la derecha',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverACasillaDerecha',
        argumentos: '{velocidad: 25}'
      });
      this.crearBloqueAccion('DejarRegalo', {
        descripcion: 'Dejar un regalo',
        icono: 'icono.regalo.png',
        comportamiento: 'Depositar',
        argumentos: '{claseADepositar: "RegaloAnimado"}'
      });
      this.crearBloqueAccion('SiguienteFila', {
        descripcion: 'Pasar a la siguiente fila',
        icono: 'icono.abajo.png',
        comportamiento: 'SiguienteFila',
        argumentos: '{}'
      });
      this.crearBloqueAccion('SiguienteFilaTotal', {
        descripcion: 'Pasar a la siguiente fila',
        icono: 'icono.izquierdaAbajo.png',
        comportamiento: 'SecuenciaAnimada',
        argumentos: "{secuencia: [\n        {\n          comportamiento: \"MoverTodoAIzquierda\",\n          argumentos: {}\n        },\n        {\n          comportamiento: \"MoverACasillaAbajo\",\n          argumentos: {}\n        }\n      ]}"
      });
      this.crearBloqueAccion('SiguienteColumna', {
        descripcion: 'Pasar a la siguiente columna',
        icono: 'icono.derecha.png',
        comportamiento: 'SiguienteColumna',
        argumentos: '{}'
      });
      this.crearBloqueAccion('ContarBanana', {
        descripcion: 'Contar una banana',
        icono: 'icono.banana.png',
        comportamiento: 'Contar',
        argumentos: '{etiqueta: "BananaAnimada", nombreAnimacion: "comerBanana"}'
      });
      this.crearBloqueAccion('ContarManzana', {
        descripcion: 'Contar una manzana',
        icono: 'icono.manzana.png',
        comportamiento: 'Contar',
        argumentos: '{etiqueta: "ManzanaAnimada", nombreAnimacion: "comerManzana"}'
      });
      this.crearBloqueAccion('ExplotarGlobo', {
        descripcion: 'Explotar globo',
        icono: 'icono.globo.png',
        comportamiento: 'Interactuar',
        argumentos: "{\n        etiqueta: \"GloboAnimado\",\n        nombreAnimacion: \"recoger\",\n        idTransicion: \"explotar\",\n        comportamientoAdicional: 'Eliminar',\n        argumentosComportamiento: {\n          nombreAnimacion: \"explotar\"\n        }}"
      });
      let blockly = this.blockly;
      let bloque = blockly.createCustomBlock('MoverA', {
        message0: "Mover a %1",
        colour: Blockly.Blocks.primitivas.COLOUR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        args0: [{
          "type": "input_value",
          "name": "direccion"
        }],
        code: 'hacer(actor_id, "MovimientoEnCuadricula", {direccionCasilla: $direccion});'
      });
      bloque.categoria = "Primitivas";
      this.crearBloqueAccion('PatearPelota', {
        descripcion: 'Patear pelota',
        icono: 'icono.pelota.png',
        comportamiento: 'Interactuar',
        argumentos: "{\n        etiqueta: \"PelotaAnimada\",\n        idTransicion: \"patear\",\n        comportamientoAdicional: 'SerPateado',\n        argumentosComportamiento: {\n          tiempoEnElAire:25,\n          aceleracion:0.0025,\n          elevacionMaxima:25,\n          gradosDeAumentoStep:-2\n        }\n      }"
      });
      this.crearBloqueAccion('Avanzar1km', {
        descripcion: 'Avanzar 1 Km',
        icono: 'icono.derecha.png',
        comportamiento: 'VolarHeroicamente',
        argumentos: '{}'
      });
      this.crearBloqueAccion('CambiarColor', {
        descripcion: 'Cambiar color del foco',
        icono: 'icono.cambiar.color.png',
        comportamiento: 'CambiarColor',
        argumentos: '{}'
      });
      this.crearBloqueAccion('SiguienteFoco', {
        descripcion: 'Pasar al siguiente foco',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverACasillaDerecha',
        argumentos: '{}'
      });
      this.crearBloqueAccion('EmpezarFiesta', {
        descripcion: 'Empezar fiesta',
        icono: 'icono.empezar.fiesta.png',
        comportamiento: 'EmpezarFiesta',
        argumentos: '{idTransicion: "empezarFiesta"}'
      });
      this.crearBloqueAccion('VolverAlBordeIzquierdo', {
        descripcion: 'Volver al borde izquierdo',
        icono: 'icono.izquierdaTope.png',
        comportamiento: 'MoverTodoAIzquierda',
        argumentos: '{}'
      });
      this.crearBloqueAccion('IrAlPrimerSospechoso', {
        descripcion: 'Ir al primer sospechoso',
        icono: 'icono.izquierda.png',
        comportamiento: 'MoverTodoAIzquierda',
        argumentos: '{}'
      });
      this.crearBloqueAccion('IrAlSiguienteSospechoso', {
        descripcion: 'Pasar al siguiente sospechoso',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverACasillaDerecha',
        argumentos: '{}'
      });
      this.crearBloqueAccion('InterrogarSospechoso', {
        descripcion: 'Interrogar sospechoso',
        icono: 'icono.sacar.disfraz.png',
        comportamiento: 'SacarDisfraz',
        argumentos: '{}'
      });
      blockly.createCustomBlock('SaltarHaciaAdelante', {
        message0: "%1 Saltar hacia adelante %2",
        colour: Blockly.Blocks.primitivas.COLOUR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        args0: [{
          "type": "field_image",
          "src": "iconos/icono.arriba.png",
          "width": 16,
          "height": 20,
          "alt": "*"
        }, {
          "type": "input_value",
          "name": "longitud"
        }],
        code: 'hacer(actor_id, "SaltarHaciaAdelante", {distancia: $longitud, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"});'
      });
      Blockly.Blocks.SaltarHaciaAdelante.toolbox = "\n    <block type=\"SaltarHaciaAdelante\">\n      <value name=\"longitud\">\n        <block type=\"math_number\"><field name=\"NUM\">100</field></block></value>\n    </block>\n  ";
      Blockly.Blocks.SaltarHaciaAdelante.categoria = 'Primitivas';
      blockly.createCustomBlock('DibujarLado', {
        message0: "%1 Dibujar lado de %2",
        colour: Blockly.Blocks.primitivas.COLOUR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        args0: [{
          "type": "field_image",
          "src": "iconos/icono.DibujarLinea.png",
          "width": 16,
          "height": 16,
          "alt": "*"
        }, {
          "type": "input_value",
          "name": "longitud"
        }],
        code: 'hacer(actor_id, "DibujarHaciaAdelante", {distancia: $longitud, voltearAlIrAIzquierda: false, velocidad: 60});'
      });
      Blockly.Blocks.DibujarLado.toolbox = "\n      <block type=\"DibujarLado\">\n        <value name=\"longitud\">\n          <block type=\"math_number\"><field name=\"NUM\">100</field></block></value>\n      </block>\n    ";
      Blockly.Blocks.DibujarLado.categoria = 'Primitivas';
      this.crearBloqueAccion('ComerChurrasco', {
        descripcion: 'Comer churrasco',
        icono: 'icono.churrasco.png',
        comportamiento: 'Recolectar',
        argumentos: '{etiqueta:"Churrasco", nombreAnimacion: "comerChurrasco", animacionInteractuadoMientras: "desaparecer"}'
      });
      this.crearBloqueAccion('AgarrarTomate', {
        descripcion: 'Agarrar tomate',
        icono: 'icono.tomate.png',
        comportamiento: 'Recolectar',
        argumentos: "{\n        etiqueta: \"Tomate\",\n        nombreAnimacion: \"agarrarTomate\",\n        animacionInteractuadoMientras: \"desaparecer\",\n        idTransicion: \"agarrarTomate\"\n        \n      }"
      });
      this.crearBloqueAccion('AgarrarLechuga', {
        descripcion: 'Agarrar lechuga',
        icono: 'icono.lechuga.png',
        comportamiento: 'Recolectar',
        argumentos: "{\n        etiqueta: \"Lechuga\",\n        nombreAnimacion: \"agarrarLechuga\",\n        animacionInteractuadoMientras: \"desaparecer\",\n        idTransicion: \"agarrarLechuga\"\n      }"
      });
      this.crearBloqueAccion('PrepararEnsalada', {
        descripcion: 'Preparar ensalada',
        icono: 'icono.ensaladera.png',
        comportamiento: 'PrepararEnsalada',
        argumentos: "{}"
      }); // Para los desafíos de escribir y leer letras

      this.crearBloqueAccion('EscribirLetraActualEnOtraCuadricula', {
        descripcion: 'Escribir letra que estoy tocando',
        icono: 'icono.DibujarLinea.png',
        comportamiento: 'EscribirLetraActualEnOtraCuadricula',
        argumentos: '{}'
      });
      blockly.createCustomBlock('EscribirTextoDadoEnOtraCuadricula', {
        message0: "%1 Escribir: %2",
        colour: Blockly.Blocks.primitivas.COLOUR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        args0: [{
          "type": "field_image",
          "src": "iconos/icono.DibujarLinea.png",
          "width": 16,
          "height": 16,
          "alt": "*"
        }, {
          "type": "field_input",
          "name": "texto",
          "text": ""
        }]
      });
      Blockly.Blocks.EscribirTextoDadoEnOtraCuadricula.categoria = 'Primitivas';

      Blockly.MyLanguage.EscribirTextoDadoEnOtraCuadricula = function (block) {
        return 'hacer(actor_id, "EscribirTextoDadoEnOtraCuadricula", {texto: "' + (block.getFieldValue('texto') || '') + '"});';
      };

      blockly.createCustomBlock('GirarGrados', {
        message0: "%1 Girar %2 grados",
        colour: Blockly.Blocks.primitivas.COLOUR,
        inputsInline: true,
        previousStatement: true,
        nextStatement: true,
        args0: [{
          "type": "field_image",
          "src": "iconos/icono.Girar.png",
          "width": 16,
          "height": 16,
          "alt": "*"
        }, {
          "type": "input_value",
          "name": "grados"
        }],
        code: 'hacer(actor_id, "Rotar", {angulo: - ($grados), voltearAlIrAIzquierda: false, velocidad: 60});'
      });
      Blockly.Blocks.GirarGrados.toolbox = "\n      <block type=\"GirarGrados\">\n        <value name=\"grados\">\n          <block type=\"math_number\"><field name=\"NUM\">90</field></block></value>\n      </block>\n    ";
      Blockly.Blocks.GirarGrados.categoria = 'Primitivas';
      this.crearBloqueAccion('MoverArribaDibujando', {
        descripcion: 'Mover arriba dibujando',
        icono: 'icono.arribaDibujando.png',
        comportamiento: 'DibujarLinea',
        argumentos: '{direccion: [0,1], nombreAnimacion: "correrDibujando", dibujarPuntos: true}'
      });
      this.crearBloqueAccion('MoverAbajoDibujando', {
        descripcion: 'Mover abajo dibujando',
        icono: 'icono.abajoDibujando.png',
        comportamiento: 'DibujarLinea',
        argumentos: '{direccion: [0,-1], nombreAnimacion: "correrDibujando", dibujarPuntos: true}'
      });
      this.crearBloqueAccion('MoverDerechaDibujando', {
        descripcion: 'Mover derecha dibujando',
        icono: 'icono.derechaDibujando.png',
        comportamiento: 'DibujarLinea',
        argumentos: '{direccion: [1,0], nombreAnimacion: "correrDibujando", dibujarPuntos: true}'
      });
      this.crearBloqueAccion('MoverIzquierdaDibujando', {
        descripcion: 'Mover izquierda dibujando',
        icono: 'icono.izquierdaDibujando.png',
        comportamiento: 'DibujarLinea',
        argumentos: '{direccion: [-1,0], nombreAnimacion: "correrDibujando", dibujarPuntos: true}'
      });
      this.crearBloqueAccion('SaltarArriba', {
        descripcion: 'Saltar arriba',
        icono: 'icono.arriba.png',
        comportamiento: 'SaltarAnimado',
        argumentos: '{direccion: [0,1], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}'
      });
      this.crearBloqueAccion('SaltarAbajo', {
        descripcion: 'Saltar abajo',
        icono: 'icono.abajo.png',
        comportamiento: 'SaltarAnimado',
        argumentos: '{direccion: [0,-1], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}'
      });
      this.crearBloqueAccion('SaltarDerecha', {
        descripcion: 'Saltar derecha',
        icono: 'icono.derecha.png',
        comportamiento: 'SaltarAnimado',
        argumentos: '{direccion: [1,0], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}'
      });
      this.crearBloqueAccion('SaltarIzquierda', {
        descripcion: 'Saltar izquierda',
        icono: 'icono.izquierda.png',
        comportamiento: 'SaltarAnimado',
        argumentos: '{direccion: [-1,0], distancia: 50, alturaDeseada: 50, velocidad_inicial: 20, nombreAnimacion: "saltar"}'
      });
      this.crearBloqueAccion('MoverLeyendoDerecha', {
        descripcion: 'Mover a la derecha',
        icono: 'icono.derecha.png',
        comportamiento: 'MoverLeyendoDerecha',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverLeyendoIzquierda', {
        descripcion: 'Mover a la izquierda',
        icono: 'icono.izquierda.png',
        comportamiento: 'MoverLeyendoIzquierda',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverLeyendoArriba', {
        descripcion: 'Mover arriba',
        icono: 'icono.arriba.png',
        comportamiento: 'MoverLeyendoArriba',
        argumentos: '{}'
      });
      this.crearBloqueAccion('MoverLeyendoAbajo', {
        descripcion: 'Mover abajo',
        icono: 'icono.abajo.png',
        comportamiento: 'MoverLeyendoAbajo',
        argumentos: '{}'
      });
    },

    _definirBloquesSensores() {
      this.crearBloqueSensor('TocandoBanana', {
        descripcion: 'Hay banana acá',
        icono: 'icono.banana.png',
        funcionSensor: 'tocando("BananaAnimada")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoManzana', {
        descripcion: 'Hay manzana acá',
        icono: 'icono.manzana.png',
        funcionSensor: 'tocando("ManzanaAnimada")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoNaranja', {
        descripcion: 'Hay una naranja acá',
        icono: 'icono.naranja.png',
        funcionSensor: 'tocando("NaranjaAnimada")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoFogata', {
        descripcion: 'Hay fogata acá',
        icono: 'icono.FogataApagada.png',
        funcionSensor: 'tocando("FogataAnimada")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoInicio', {
        descripcion: 'Estoy al inicio',
        icono: 'icono.futbolInicio.png',
        funcionSensor: 'tocandoInicio()',
        esBool: true
      });
      this.crearBloqueSensor('TocandoPelota', {
        descripcion: 'Llegué a la pelota',
        icono: 'icono.pelota.png',
        funcionSensor: 'tocando("PelotaAnimada")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoFinal', {
        descripcion: 'Llegué al final',
        icono: 'icono.titoFinalizacion.png',
        funcionSensor: 'estoyUltimaFila()',
        esBool: true
      });
      this.crearBloqueSensor('KmsTotales', {
        descripcion: 'Kilómetros a recorrer',
        icono: 'icono.kms.png',
        funcionSensor: 'kmsTotales()'
      });
      this.crearBloqueSensor('EstoyEnEsquina', {
        descripcion: 'Estoy en una esquina',
        icono: 'icono.prendiendoLasCompus2.png',
        funcionSensor: 'casillaActual().esEsquina()',
        esBool: true
      });
      this.crearBloqueSensor('EstoySobreElInicio', {
        descripcion: 'Estoy al inicio de la columna',
        icono: 'icono.casillainiciomono.png',
        funcionSensor: 'casillaActual().esInicio()',
        esBool: true
      });
      this.crearBloqueSensor('EstoySobreElFinal', {
        descripcion: 'Estoy al final de la columna',
        icono: 'icono.casillafinalmono.png',
        funcionSensor: 'casillaActual().esFin()',
        esBool: true
      });
      this.crearBloqueSensor('LargoColumnaActual', {
        descripcion: 'Largo de la columna actual',
        icono: 'icono.largoCol.png',
        funcionSensor: 'largoColumnaActual()-1'
      });
      this.crearBloqueSensor('TocandoAbajo', {
        descripcion: 'Puedo mover abajo',
        icono: 'icono.abajo.png',
        funcionSensor: 'tocandoFlechaAbajo()',
        esBool: true
      });
      this.crearBloqueSensor('TocandoDerecha', {
        descripcion: 'Puedo mover a la derecha',
        icono: 'icono.derecha.png',
        funcionSensor: 'tocandoFlechaDerecha()',
        esBool: true
      });
      this.crearBloqueSensor('TocandoFinCamino', {
        descripcion: 'Llegó a la meta',
        icono: 'icono.finCamino.png',
        funcionSensor: 'alFinalDelCamino()',
        esBool: true
      });
      this.crearBloqueSensor('TocandoQueso', {
        descripcion: 'Hay queso acá',
        icono: 'queso.png',
        funcionSensor: 'tocando("QuesoAnimado")',
        esBool: true
      });
      this.crearBloqueSensor('TocandoLuz', {
        descripcion: 'Hay lamparita acá',
        icono: 'icono.LamparitaApagada.png',
        funcionSensor: 'tocando("Lamparin")',
        esBool: true
      });
      this.crearBloqueSensor('EsCulpable', {
        id: 'Descubralculpable',
        descripcion: 'Estoy frente al culpable',
        icono: 'icono.culpable.png',
        funcionSensor: 'colisionaConElCulpable() && pilas.escena_actual().culpable.teEncontraron()',
        esBool: true
      });
      this.crearBloqueSensor('HayChurrasco', {
        descripcion: 'Hay un churrasco acá',
        icono: 'icono.churrasco.png',
        funcionSensor: 'tocando("Churrasco")',
        esBool: true
      });
      this.crearBloqueSensor('HayObstaculoArriba', {
        descripcion: 'Hay un obstáculo arriba',
        icono: 'icono.arriba.png',
        funcionSensor: 'tieneEnLaCasillaDeArriba("Obstaculo")',
        esBool: true
      });
      this.crearBloqueSensor('HayObstaculoAbajo', {
        descripcion: 'Hay un obstáculo abajo',
        icono: 'icono.abajo.png',
        funcionSensor: 'tieneEnLaCasillaDeAbajo("Obstaculo")',
        esBool: true
      });
      this.crearBloqueSensor('HayObstaculoIzquierda', {
        descripcion: 'Hay un obstáculo a la izquierda',
        icono: 'icono.izquierda.png',
        funcionSensor: 'tieneEnLaCasillaASuIzquierda("Obstaculo")',
        esBool: true
      });
      this.crearBloqueSensor('HayObstaculoDerecha', {
        descripcion: 'Hay un obstáculo a la derecha',
        icono: 'icono.derecha.png',
        funcionSensor: 'tieneEnLaCasillaASuDerecha("Obstaculo")',
        esBool: true
      });
      this.crearBloqueSensor('HayCharco', {
        descripcion: 'Hay un charco',
        icono: 'icono.charco.png',
        funcionSensor: 'hayEnEscena("Charco")',
        esBool: true
      });
      let sensorHayVocal = this.blockly.createCustomBlock('hayVocalRMT', {
        "type": "block_type",
        "message0": "%1 ¿La letra actual es una %2 ?",
        "args0": [{
          type: "field_image",
          src: "iconos/icono.DibujarLinea.png",
          width: 16,
          height: 16,
          alt: "*"
        }, {
          "type": "field_dropdown",
          "name": "letra",
          "options": [["R", "r"], ["M", "m"], ["T", "t"], ["A", "a"], ["E", "e"], ["I", "i"], ["O", "o"], ["U", "u"]]
        }],
        "output": null,
        "colour": Blockly.Blocks.sensores.COLOUR,
        "tooltip": "Es cierto cuando estoy leyendo esta letra ahora",
        "helpUrl": ""
      });
      sensorHayVocal.categoria = "Sensores";

      Blockly.MyLanguage.hayVocalRMT = function (block) {
        let codigo = "evaluar(\"leyendoCaracter('".concat(block.getFieldValue('letra'), "')\")");
        return [codigo, Blockly.MyLanguage.ORDER_ATOMIC];
      };

      this.crearBloqueSensor('HayLechuga', {
        descripcion: 'Hay lechuga acá',
        icono: 'icono.lechuga.png',
        funcionSensor: 'tocando("Lechuga")',
        esBool: true
      });
      this.crearBloqueSensor('HayTomate', {
        descripcion: 'Hay tomate acá',
        icono: 'icono.tomate.png',
        funcionSensor: 'tocando("Tomate")',
        esBool: true
      });
    },

    _definirBloquesQueRepresentanValores() {
      this.crearBloqueValor("ParaLaDerecha", {
        descripcion: 'la derecha',
        icono: 'icono.derecha.png',
        valor: 'derecha',
        colour: Blockly.Blocks.direcciones.COLOUR
      });
      this.crearBloqueValor('ParaLaIzquierda', {
        descripcion: 'la izquierda',
        icono: 'icono.izquierda.png',
        valor: 'izquierda',
        colour: Blockly.Blocks.direcciones.COLOUR
      });
      this.crearBloqueValor('ParaArriba', {
        descripcion: 'arriba',
        icono: 'icono.arriba.png',
        valor: 'arriba',
        colour: Blockly.Blocks.direcciones.COLOUR
      });
      this.crearBloqueValor('ParaAbajo', {
        descripcion: 'abajo',
        icono: 'icono.abajo.png',
        valor: 'abajo',
        colour: Blockly.Blocks.direcciones.COLOUR
      });
    },

    _definirBloquesIniciales() {
      function fillOpacity(block, opacity) {
        block.getSvgRoot().style["fill-opacity"] = opacity;
      }

      function transparent(block) {
        fillOpacity(block, 0);
      }

      function opaque(block) {
        fillOpacity(block, 1);
      }

      Blockly.Blocks.required_value = {
        init: function () {
          this.jsonInit({
            "type": "required_value",
            "message0": "",
            "output": null,
            "colour": "#ffffff",
            "tooltip": "",
            "helpUrl": ""
          });
          this.setShadow(true);
          transparent(this);
        },
        onchange: function (event) {
          if (event && event.runCode) {
            this.setWarningText("¡Acá falta un bloque expresión!");
            opaque(this);
          }
        }
      };
      Blockly.Blocks.required_statement = {
        init: function () {
          this.jsonInit({
            "type": "required_statement",
            "message0": "",
            "previousStatement": null,
            "colour": "#ffffff",
            "tooltip": "",
            "helpUrl": ""
          });
          this.setShadow(true);
          transparent(this);
        },
        onchange: function (event) {
          if (event && event.runCode) {
            this.setWarningText("¡Acá faltan bloques comandos!");
            opaque(this);
          }
        }
      };
      Blockly.Blocks.al_empezar_a_ejecutar = {
        init: function () {
          this.setColour(Blockly.Blocks.eventos.COLOUR);
          this.appendDummyInput().appendField('Al empezar a ejecutar');
          this.appendStatementInput('program');
          this.setDeletable(false);
          this.setEditable(false);
          this.setMovable(false);
        }
      };
    },

    _definirBloquesEstructurasDeControl() {
      Blockly.Blocks.RepetirVacio = {
        init: function () {
          this.setColour(Blockly.Blocks.control.COLOUR);
          this.setInputsInline(true);
          this.setPreviousStatement(true);
          this.setNextStatement(true);
          this.appendValueInput('count').setCheck('Number').appendField('Repetir');
          this.appendDummyInput().appendField('veces');
          this.appendStatementInput('block');
        },
        categoria: 'Repeticiones'
      };
      Blockly.Blocks.Repetir = {
        init: Blockly.Blocks['RepetirVacio'].init,
        categoria: Blockly.Blocks['RepetirVacio'].categoria,
        toolbox: "\n      <block type=\"repetir\">\n        <value name=\"count\">\n          <block type=\"math_number\"><field name=\"NUM\">10</field></block>\n        </value>\n      </block>\n      "
      };
      Blockly.Blocks.Hasta = {
        init: function () {
          this.setColour(Blockly.Blocks.control.COLOUR);
          this.setInputsInline(true);
          this.appendValueInput('condition').setCheck('Boolean').appendField('Repetir hasta que');
          this.appendStatementInput('block');
          this.setPreviousStatement(true);
          this.setNextStatement(true);
        },
        categoria: 'Repeticiones'
      };
      Blockly.Blocks.Si = {
        init: function () {
          this.setColour(Blockly.Blocks.control.COLOUR);
          this.appendValueInput('condition').setCheck('Boolean').appendField('Si');
          this.setInputsInline(true);
          this.appendStatementInput('block');
          this.setPreviousStatement(true);
          this.setNextStatement(true);
        },
        categoria: 'Alternativas'
      };
      Blockly.Blocks.SiNo = {
        init: function () {
          this.setColour(Blockly.Blocks.control.COLOUR);
          this.appendValueInput('condition').setCheck('Boolean').appendField('Si');
          this.appendStatementInput('block1');
          this.setInputsInline(true);
          this.appendDummyInput().appendField('si no');
          this.appendStatementInput('block2');
          this.setPreviousStatement(true);
          this.setNextStatement(true);
        },
        categoria: 'Alternativas'
      };
      let init_base_callnoreturn = Blockly.Blocks.procedures_callnoreturn.init;

      Blockly.Blocks.procedures_callnoreturn.init = function () {
        this.setInputsInline(true);
        init_base_callnoreturn.call(this);
      };

      Blockly.Blocks.procedures_callnoreturn.onchange = function () {
        requiredAllInputs(this); // Input fields are added after instantiation 
      };

      function isInsideProcedureDef(paramBlock) {
        return paramBlock.getRootBlock().id === paramBlock.$parent;
      }

      function hasParam(procedureBlock, paramBlock) {
        return getParams(procedureBlock).includes(paramBlock.getFieldValue('VAR'));
      }

      function isFlying(block) {
        return block.getRootBlock() === block;
      }

      function getName(procedureBlock) {
        return procedureBlock.getProcedureDef()[0];
      }

      function getParams(procedureBlock) {
        return procedureBlock.getProcedureDef()[1];
      }

      Blockly.Blocks.variables_get = {
        init: function () {
          this.jsonInit({
            "type": "variables_get",
            "message0": "%1",
            "args0": [{
              "type": "field_label",
              "name": "VAR",
              "text": "nombre de variable"
            }],
            "output": null,
            "colour": Blockly.Blocks.variables.HUE,
            "tooltip": "",
            "helpUrl": ""
          });
        },
        mutationToDom: function () {
          var container = document.createElement('mutation');
          container.setAttribute('var', this.getFieldValue('VAR'));

          if (this.$parent) {
            container.setAttribute("parent", this.$parent);
          }

          return container;
        },
        domToMutation: function (xmlElement) {
          var var_name = xmlElement.getAttribute('var');
          this.setFieldValue(var_name, 'VAR');
          this.$parent = xmlElement.getAttribute("parent") || null;
        },
        onchange: function (event) {
          if (event && event.blockId === this.$parent && event.type === Blockly.Events.BLOCK_DELETE) {
            this.dispose();
            return;
          }

          if (this.$parent) {
            // Este if sirve para las soluciones viejas que no tienen $parent
            var procedureDef = this.workspace.getBlockById(this.$parent);
            var ok = isInsideProcedureDef(this) && hasParam(procedureDef, this);
            this.setDisabled(!ok);
            var warning = ok || isFlying(this) || !procedureDef ? null : hasParam(procedureDef, this) ? "Este bloque no puede usarse aqu\xED. Es un par\xE1metro que s\xF3lo puede usarse en ".concat(getName(procedureDef), ".") : "Este bloque ya no puede usarse, el parámetro ha sido eliminado.";
            this.setWarningText(warning);
          }
        }
      };
      Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "Definir";
      let init_base_procedimiento = Blockly.Blocks.procedures_defnoreturn.init;

      Blockly.Blocks.procedures_defnoreturn.init = function () {
        init_base_procedimiento.call(this);
      };

      delete Blockly.Blocks.procedures_defreturn;
      delete Blockly.Blocks.procedures_ifreturn;
    },

    _generarLenguaje() {
      Blockly.MyLanguage = Blockly.JavaScript;
      Blockly.MyLanguage.addReservedWords('main', 'hacer', 'out_hacer', 'evaluar');

      Blockly.MyLanguage.required_value = function () {
        return null;
      };

      Blockly.MyLanguage.required_statement = function () {
        return null;
      };

      Blockly.MyLanguage.al_empezar_a_ejecutar = function (block) {
        let programa = Blockly.JavaScript.statementToCode(block, 'program');
        let codigo = "".concat(programa);
        return codigo;
      };

      Blockly.MyLanguage.RepetirVacio = function (block) {
        var repeats = Blockly.MyLanguage.valueToCode(block, 'count', Blockly.MyLanguage.ORDER_ASSIGNMENT) || '0';
        var branch = Blockly.MyLanguage.statementToCode(block, 'block');
        branch = Blockly.MyLanguage.addLoopTrap(branch, block.id);
        var code = '';
        var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
        var endVar = repeats;

        if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
          endVar = Blockly.MyLanguage.variableDB_.getDistinctName('repeat_end', Blockly.Variables.NAME_TYPE);
          code += 'var ' + endVar + ' = ' + repeats + ';\n';
        }

        code += 'for (var ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' + loopVar + '++) {\n' + branch + '}\n';
        return code;
      };

      Blockly.MyLanguage.Repetir = Blockly.MyLanguage.RepetirVacio;

      Blockly.MyLanguage.Si = function (block) {
        var condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
        var contenido = Blockly.MyLanguage.statementToCode(block, 'block');
        return "if (".concat(condition, ") {\n        ").concat(contenido, "\n      }");
      };

      Blockly.MyLanguage.SiNo = function (block) {
        var condition = Blockly.MyLanguage.valueToCode(block, 'condition', Blockly.MyLanguage.ORDER_ASSIGNMENT) || 'false';
        var bloque_1 = Blockly.JavaScript.statementToCode(block, 'block1');
        var bloque_2 = Blockly.JavaScript.statementToCode(block, 'block2');
        return "if (".concat(condition, ") {\n        ").concat(bloque_1, "\n      } else {\n        ").concat(bloque_2, "\n      }");
      };

      Blockly.MyLanguage.Hasta = function (block) {
        var condition = Blockly.MyLanguage.valueToCode(block, 'condition', Blockly.MyLanguage.ORDER_ASSIGNMENT) || 'false';
        var contenido = Blockly.MyLanguage.statementToCode(block, 'block');
        return "while (!".concat(condition, ") {\n        ").concat(contenido, "\n      }");
      };

      Blockly.MyLanguage.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.MyLanguage.addReservedWords('highlightBlock');
    },

    _definirOperaciones() {
      //Este código fue sacado de Blockly
      this.blockly.createCustomBlock('OpAritmetica', {
        "type": "math_arithmetic",
        "message0": "%1 %2 %3",
        "args0": [{
          "type": "input_value",
          "name": "A",
          "check": "Number"
        }, {
          "type": "field_dropdown",
          "name": "OP",
          "options": [["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"], ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"], ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"], ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"], ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]]
        }, {
          "type": "input_value",
          "name": "B",
          "check": "Number"
        }],
        "inputsInline": true,
        "output": "Number",
        "colour": "%{BKY_MATH_HUE}",
        "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
        "extensions": ["math_op_tooltip"]
      });

      Blockly.MyLanguage.OpAritmetica = function (block) {
        // Basic arithmetic operators, and power.
        var OPERATORS = {
          'ADD': [' + ', Blockly.JavaScript.ORDER_ADDITION],
          'MINUS': [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
          'MULTIPLY': [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
          'DIVIDE': [' / ', Blockly.JavaScript.ORDER_DIVISION],
          'POWER': [null, Blockly.JavaScript.ORDER_COMMA] // Handle power separately.

        };
        var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
        var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
        var op = block.getFieldValue('OP');
        var tuple = OPERATORS[op];
        var operator = tuple[0];
        var order = tuple[1];
        var isPow = !operator;
        var isDivision = op === 'DIVIDE';
        var code; // Power in JavaScript requires a special case since it has no operator.

        if (isPow) {
          code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
          return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        }

        code = "\n      (function(){\n        if (".concat(isDivision, " && ").concat(argument1, " === 0)\n          evaluar(\"lanzarActividadError('No se puede dividir por 0')\")\n        else\n          return ").concat(argument0 + operator + argument1, "\n      })()\n      ");
        return [code, order];
      };

      Blockly.Blocks.OpAritmetica.categoria = 'Operadores';
    },

    _definirBloquesAlias() {
      this.crearBloqueAlias('OpComparacion', 'logic_compare', 'Operadores');
      this.crearBloqueAlias('OpAritmetica', 'math_arithmetic', 'Operadores');
      this.crearBloqueAlias('Booleano', 'logic_boolean', 'Valores');
      this.crearBloqueAlias('Numero', 'math_number', 'Valores');
      this.crearBloqueAlias('Texto', 'text', 'Valores');
      this.crearBloqueAlias('param_get', 'variables_get');
      this.crearBloqueAlias('Procedimiento', 'procedures_defnoreturn', 'Mis procedimientos', 'PROCEDURE');

      this._agregarAliasParaCompatibilidadHaciaAtras();
    },

    /**
     * Crea alias con nombres de bloques que fueron previamente usados
     * en pilas bloques, pero que han cambiado el nombre por otro actualmente.
     * Esto es necesario para mantener la retrocompatibilidad con ejercicios
     * que utilizan los bloques anteriormente citados.
     */
    _agregarAliasParaCompatibilidadHaciaAtras() {
      this.crearBloqueAlias('si', 'Si');
      this.crearBloqueAlias('Sino', 'SiNo');
      this.crearBloqueAlias('sino', 'SiNo');
      this.crearBloqueAlias('Descubralculpable', 'EsCulpable');
      this.crearBloqueAlias('hasta', 'Hasta');
      this.crearBloqueAlias('repetir', 'Repetir');
      this.crearBloqueAlias('tocandoBanana', 'TocandoBanana');
      this.crearBloqueAlias('tocandoManzana', 'TocandoManzana');
      this.crearBloqueAlias('prenderCompuConColision', 'PrenderComputadora');
      this.crearBloqueAlias('PrenderCompuConColision', 'PrenderComputadora');
      this.crearBloqueAlias('Prendercompu', 'PrenderComputadora');
      this.crearBloqueAlias('PrenderCompu', 'PrenderComputadora');
      this.crearBloqueAlias('ApagarCompu', 'ApagarComputadora');
      this.crearBloqueAlias('SiguienteCompu', 'PasarASiguienteComputadora');
      this.crearBloqueAlias('Prenderfogata', 'PrenderFogata');
      this.crearBloqueAlias('Dejarregalo', 'DejarRegalo');
      this.crearBloqueAlias('Contarbanana', 'ContarBanana');
      this.crearBloqueAlias('Contarmanzana', 'ContarManzana');
      this.crearBloqueAlias('AvanzarKm', 'Avanzar1km');
      this.crearBloqueAlias('cambiarColor', 'CambiarColor');
      this.crearBloqueAlias('siguienteFoco', 'SiguienteFoco');
      this.crearBloqueAlias('empezarFiesta', 'EmpezarFiesta');
      this.crearBloqueAlias('Volveralbordeizquierdo', 'VolverAlBordeIzquierdo');
      this.crearBloqueAlias('Primersospechoso', 'IrAlPrimerSospechoso');
      this.crearBloqueAlias('PrimerSospechoso', "IrAlPrimerSospechoso");
      this.crearBloqueAlias('Siguientesospechoso', 'IrAlSiguienteSospechoso');
      this.crearBloqueAlias('SiguienteSospechoso', "IrAlSiguienteSospechoso");
      this.crearBloqueAlias('Sacardisfraz', 'InterrogarSospechoso');
      this.crearBloqueAlias('SacarDisfraz', 'InterrogarSospechoso');
      this.crearBloqueAlias('tocandoFogata', 'TocandoFogata');
      this.crearBloqueAlias('tocandoInicio', 'TocandoInicio');
      this.crearBloqueAlias('tocandoFinal', 'TocandoFinal');
      this.crearBloqueAlias('tocandoPelota', 'TocandoPelota');
      this.crearBloqueAlias('Estoyenunaesquina', 'EstoyEnEsquina');
      this.crearBloqueAlias('tocandoQueso', 'TocandoQueso');
      this.crearBloqueAlias('tocandoLuz', 'TocandoLuz');
      this.crearBloqueAlias('Abrirojos', 'AbrirOjos');
      this.crearBloqueAlias('Cerrarojos', 'CerrarOjos');
      this.crearBloqueAlias('Soar', "Soniar");
      this.crearBloqueAlias('Agarrarllave', "AgarrarLlave");
      this.crearBloqueAlias('Abrircofre', "AbrirCofre");
      this.crearBloqueAlias('Darsombrero', "DarSombrero");
      this.crearBloqueAlias('Atacarconespada', "AtacarConEspada");
      this.crearBloqueAlias('Escaparenunicornio', 'EscaparEnUnicornio');
      this.crearBloqueAlias('estoyInicio', 'EstoySobreElInicio');
      this.crearBloqueAlias('estoyAlInicio', 'EstoySobreElInicio');
      this.crearBloqueAlias('estoyFinColumna', 'EstoySobreElFinal');
      this.crearBloqueAlias('EstoyAlFin', 'EstoySobreElFinal');
      this.crearBloqueAlias('ComerBananaNano', 'ComerBanana');
      this.crearBloqueAlias('saltar1', 'SaltarHablando');
    }

  });

  _exports.default = _default;

  function shouldAddRequiredShadow(connection) {
    return connection.getShadowDom() == null // Should have not a shadow block
    && [Blockly.INPUT_VALUE, Blockly.NEXT_STATEMENT].includes(connection.type); // Should be a "block hole"
  } // Agrega un required shadow a todos los input que sean para encastrar otros bloques


  function requiredAllInputs(block) {
    block.inputList.filter(input => input.connection && shouldAddRequiredShadow(input.connection)).forEach(input => requiredInput(block, input.name));
  }

  function requiredInput(block, inputName) {
    let connection = block.getInput(inputName).connection;
    let shadowType = connection.type == Blockly.INPUT_VALUE ? "required_value" : "required_statement";
    var shadowValue = Blockly.Xml.textToDom("<shadow type=\"".concat(shadowType, "\"></shadow>"));
    connection.setShadowDom(shadowValue);
    if (!connection.targetConnection) connection.respawnShadow_();
  }
});
;define("pilasbloques/services/curso-api", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    guardar(parametros) {
      return new Promise((success, reject) => {
        let data = {
          hash: parametros.hash,
          desafio: parametros.actividad,
          usuario: parametros.idAlumno,
          xml: parametros.codigo_xml
        };
        $.ajax({
          url: "".concat(_environment.default.cursoBackendURL, "/soluciones/"),
          contentType: 'application/json',
          type: "post",
          data: JSON.stringify(data)
        }).done(success).fail(reject);
      });
    },

    obtener_solucion_xml_desde_hash(hash) {
      return new Promise((success, reject) => {
        $.ajax({
          url: "".concat(_environment.default.cursoBackendURL, "/soluciones/").concat(hash),
          contentType: 'application/json',
          type: "get"
        }).done(result => {
          success(result.data[0].xml);
        }).fail(reject);
      });
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/highlighter", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /// Este service va recibiendo los Ids de los bloques que se ejecutan y SOLAMENTE se encarga del highlighting.
  /// Particularmente, tiene la lógica de highligh para los procedimientos.
  /// No sabe nada sobre qué hacen o cuándo se ejecutará cada bloque.
  var _default = Ember.Service.extend({
    blocks: [],

    step(blockId) {
      let block = this._workspace().getBlockById(blockId);

      if (!block) {
        console.warn("Couldn't highlight block id: ".concat(blockId));
        return;
      }

      this._removeLastBlockIfEndOfModule();

      this._removePreviousBlockIfContinue(block);

      if (!this._ignore(block)) {
        this.blocks.push(block);
      }

      this._updateHighlight();
    },

    clear() {
      this.blocks.length = 0;

      this._clearHighlight();
    },

    _lastBlock() {
      return this.blocks[this.blocks.length - 1];
    },

    _removeLastBlockIfEndOfModule() {
      if (this._shouldRemoveLastBlock()) {
        this.blocks.pop();
      }
    },

    _removePreviousBlockIfContinue(block) {
      if (block.getParent() === this._lastBlock()) {
        this.blocks.pop();
      }
    },

    _ignore(block) {
      return this._isModuleDefinition(block);
    },

    _shouldRemoveLastBlock() {
      return this._lastBlock() && this._isEndOfModule(this._lastBlock()) && !this._isProcedureCall(this._lastBlock());
    },

    _isEndOfModule(block) {
      return !block.getNextBlock();
    },

    _isModuleDefinition(block) {
      return !block.getParent();
    },

    _isProcedureCall(block) {
      return !!block.defType_;
    },

    _updateHighlight() {
      this._clearHighlight();

      this.blocks.forEach(b => this._workspace().highlightBlock(b.id, true));
    },

    _clearHighlight() {
      this._workspace().highlightBlock();
    },

    _workspace() {
      return Blockly.getMainWorkspace();
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/interpreter-factory", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    pilas: Ember.inject.service(),

    /**
     * Retorna un intérprete preparado para ejecutar el código que
     * se le envíe como argumento.
     *
     * El código se ejecutará de manera aislada, en un entorno protegido
     * sin acceso al exterior (no tendrá acceso a ember, pilas, window, ni nada...)
     * así que las únicas funciones a las que podrá acceder están detalladas
     * en la función _initFunction, que aparece más abajo.
     */
    crearInterprete(codigo, callback_cuando_ejecuta_bloque) {
      return new Interpreter(this.wrappearCodigo(codigo), (interpreter, scope) => {
        return this._initFunction(interpreter, scope, callback_cuando_ejecuta_bloque);
      });
    },

    /**
     * Inicializa el intérprete y su scope inicial, para que
     * pueda usar funcioens como "hacer", "console.log" etc..
     */
    _initFunction(interpreter, scope, callback_cuando_ejecuta_bloque) {
      let pilasService = this.pilas;
      var actor = pilasService.evaluar("pilas.escena_actual().automata;");

      var console_log_wrapper = function (txt) {
        txt = txt ? txt.toString() : '';
        return interpreter.createPrimitive(console.log(txt));
      };

      interpreter.setProperty(scope, 'console_log', interpreter.createNativeFunction(console_log_wrapper)); // Esto deberia estar en otro lado, es un comportamiento que lo unico que
      // hace es llamar a una función.

      var ComportamientoLlamarCallback = function (args) {
        this.argumentos = args;

        this.iniciar = function () {};

        this.actualizar = function () {
          this.argumentos.callback();
          return true;
        };

        this.eliminar = function () {};
      }; // Genera la función "out_hacer" que se llamará dentro del intérprete.
      //
      // Esta función encadenará dos comportamientos para simplificar el uso
      // de funciones asincrónicas. Agregará el comportamiento que represente
      // la acción que el usuario quiere hacer con el actor y luego agregará
      // otro comportamiento para indicar que la tarea asincrónica terminó.
      //
      // Por ejemplo, si en el código se llama a la función hacer así:
      //
      //      hacer("Saltar", {});
      //      hacer("Caminar", {pasos: 20});
      //
      // Internamente la función hará que el actor primero "salte" y luego
      // "camine" 20 pasos.


      var hacer_wrapper = function (comportamiento, params, callback) {
        comportamiento = comportamiento ? comportamiento.toString() : '';
        params = params ? params.toString() : '';
        params = JSON.parse(params);
        var clase_comportamiento = pilasService.evaluar("\n        var comportamiento = null;\n\n        if (window['".concat(comportamiento, "']) {\n          comportamiento = ").concat(comportamiento, ";\n        } else {\n          if (pilas.comportamientos['").concat(comportamiento, "']) {\n            comportamiento = pilas.comportamientos['").concat(comportamiento, "'];\n          } else {\n            throw new Error(\"No existe un comportamiento llamado '").concat(comportamiento, "'.\");\n          }\n        }\n\n        comportamiento;\n      "));

        if (typeof params.receptor === 'string') {
          params.receptor = pilasService.evaluar("pilas.escena_actual().".concat(params.receptor));
        }

        actor.hacer_luego(clase_comportamiento, params);
        actor.hacer_luego(ComportamientoLlamarCallback, {
          callback
        });
      };

      interpreter.setProperty(scope, 'out_hacer', interpreter.createAsyncFunction(hacer_wrapper));
      /**
       * Es el código que se ejecuta con una expresión (sensor, operación, etc.)
       */

      function out_evaluar(expr) {
        expr = expr ? expr.toString() : '';
        return interpreter.createPrimitive(pilasService.evaluar("\n        try {\n          var value = pilas.escena_actual().automata.".concat(expr, "\n        } catch (e) {\n          pilas.escena_actual().errorHandler.handle(e);\n        }\n\n        value")));
      }

      interpreter.setProperty(scope, 'evaluar', interpreter.createNativeFunction(out_evaluar));
      /**
       * Llama a callback_cuando_ejecuta_bloque con el id del bloque en ejecucion.
       */

      function out_highlightBlock(id) {
        id = id ? id.toString() : '';
        return interpreter.createPrimitive(callback_cuando_ejecuta_bloque.call(this, id));
      }

      interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(out_highlightBlock));
    },

    wrappearCodigo(codigo) {
      return js_beautify("\n        var actor_id = 'demo'; // se asume el actor receptor de la escena.\n\n        function hacer(id, comportamiento, params) {\n          out_hacer(comportamiento, JSON.stringify(params));\n        }\n\n        function main() {\n          ".concat(codigo, "\n        }\n\n        main();\n      "));
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/media", ["exports", "ember-responsive/services/media"], function (_exports, _media) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _media.default;
  _exports.default = _default;
});
;define("pilasbloques/services/modal-dialog", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function computedFromConfig(prop) {
    return Ember.computed(function () {
      return _environment.default['ember-modal-dialog'] && _environment.default['ember-modal-dialog'][prop];
    });
  }

  var _default = Ember.Service.extend({
    hasEmberTether: computedFromConfig('hasEmberTether'),
    hasLiquidWormhole: computedFromConfig('hasLiquidWormhole'),
    hasLiquidTether: computedFromConfig('hasLiquidTether'),
    destinationElementId: null // injected by initializer

  });

  _exports.default = _default;
});
;define("pilasbloques/services/notificador", ["exports", "pilasbloques/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    ajax: Ember.inject.service(),
    hayActualizacion: false,
    versionActual: null,

    esVersionAnterior(stringV1, stringV2) {
      function parseVersionString(str) {
        if (typeof str !== 'string') {
          return false;
        }

        var x = str.split('+')[0].split('.'); // parse from string or default to 0 if can't parse

        var maj = parseInt(x[0]) || 0;
        var min = parseInt(x[1]) || 0;
        var pat = parseInt(x[2]) || 0;
        return {
          major: maj,
          minor: min,
          patch: pat
        };
      }

      var v1 = parseVersionString(stringV1);
      var v2 = parseVersionString(stringV2);
      return v1.major < v2.major || v1.major === v2.major && v1.minor < v2.minor || v1.major === v2.major && v1.minor === v2.minor && v1.patch < v2.patch;
    },

    /**
     * Consulta contra la API de github si existe una versión nueva de la
     * aplicación para actualizar.
     */
    consultar() {
      let versionActual = _environment.default.APP.version;
      let url = _environment.default['versionURL'];
      return this.ajax.request(url).then(data => {
        let versionDesdeElServidor = data.tag_name;

        if (this.esVersionAnterior(versionActual, versionDesdeElServidor)) {
          this.set('hayActualizacion', true);
          this.set('versionActual', data.tag_name);
          return {
            hayActualizacion: true,
            version: data.tag_name
          };
        } else {
          return {
            hayActualizacion: false,
            version: data.tag_name
          };
        }
      });
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/pilas", ["exports", "pilasbloques/components/listaImagenes"], function (_exports, _listaImagenes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   * Provee acceso a pilasweb y sus eventos.
   *
   * @public
   * @module PilasService
   */

  /**
   * Un servicio que provee métodos y eventos para comunicarse
   * con pilasweb y el componente pilas-canvas.
   * DEMO.
   *
   * Estos son los eventos que puede reportar el servicio:
   *
   * - terminaCargaInicial
   * - errorDeActividad
   *
   * @public
   * @class PilasService
   */
  var _default = Ember.Service.extend(Ember.Evented, {
    iframe: null,
    actorCounter: 0,
    pilas: null,
    loading: true,
    inicializadorDeLaEscenaActual: null,
    temporallyCallback: null,

    /* almacena el callback para avisar si pilas
       se reinició correctamente. */

    /**
     * Instancia pilas-engine con los atributos que le envíe
     * el componente x-canvas.
     *
     * Este método realiza una conexión con el servicio pilas, y
     * se llamará automáticamente ante dos eventos: se agrega el
     * componente x-canvas a un template o se ha llamado a `reload`
     * en el servicio pilas.
     *
     * @public
     */
    inicializarPilas(iframeElement, options, nombreOInicializadorDeEscena) {
      this.set("iframe", iframeElement);
      this.set("loading", true);
      return new Promise(success => {
        let width = options.width;
        let height = options.height; // Cuidado: esto hace que no se pueda cargar una escena diferente en esta instancia de pilas.
        // La razón es que se le pregunta a la escena qué imágenes precargar.

        let listaImagenesSerializada = this.imagenesParaPrecargar(nombreOInicializadorDeEscena).join("|");
        var code = "\n        var canvasElement = document.getElementById('canvas');\n        var listaImagenes = \"".concat(listaImagenesSerializada, "\".split(\"|\");\n        var opciones = {ancho: ").concat(width, ",\n                        alto: ").concat(height, ",\n                        canvas: canvasElement,\n                        data_path: 'libs/data',\n                        imagenesExtra: listaImagenes,\n                        cargar_imagenes_estandar: false,\n                        silenciar_advertencia_de_multiples_ejecutar: true\n                      };\n\n        var pilas = pilasengine.iniciar(opciones);\n\n        pilas;\n      ");
        let pilas = iframeElement.contentWindow.eval(code);
        this.conectarEventos();

        pilas.onready = () => {
          //this.get('actividad').iniciarEscena();
          //var contenedor = document.getElementById('contenedor-blockly');
          //this.get('actividad').iniciarBlockly(contenedor);
          //if (this.get('actividad')['finalizaCargarBlockly']) {
          //  this.get('actividad').finalizaCargarBlockly();
          //}
          success(pilas);
          /*
           * Si el usuario llamó a "reload" desde este servicio, tendría
           * que existir una promesa en curso, así que estas lineas se
           * encargan de satisfacer esa promesa llamando al callback success.
           */

          if (this.temporallyCallback) {
            this.temporallyCallback(pilas);
            this.set("temporallyCallback", null);
          }

          this.set("loading", false);
        };

        pilas.ejecutar();
        this.cambiarFPS(100);
      });
    },

    imagenesParaPrecargar(nombreOInicializadorDeEscena) {
      //Le pregunto a la escena qué imágenes va a necesitar
      var imagenes = this.evaluar("".concat(this.nombreDeEscena(nombreOInicializadorDeEscena), ".imagenesPreCarga()")); //Si la escena no las sabe, cargo todas:

      return imagenes.length ? imagenes : _listaImagenes.default;
    },

    nombreDeEscena(nombreOInicializadorDeEscena) {
      if (nombreOInicializadorDeEscena.indexOf('new') === -1) {
        // Significa que vino el nombre.
        return nombreOInicializadorDeEscena;
      } else {
        // Significa que hay una construcción en el string.
        // La expresión regular captura el nombre de la clase (\w+)
        // y el [1] accede al primer grupo de captura.
        return nombreOInicializadorDeEscena.match(/new\s+(\w+)\s*\(/)[1];
      }
    },

    /**
     * Libera los eventos y recursos instanciados por este servicio.
     *
     * @method liberarRecursos
     * @public
     */
    liberarRecursos() {
      this.desconectarEventos();
    },

    /**
     * Captura cualquier mensaje desde el iframe y lo propaga
     * como un evento de ember evented.
     *
     * Los eventos que se originan en el iframe tienen la forma:
     *
     *     {
     *       tipo: "tipoDeMensaje"    # Cualquiera de los listados más arriba.
     *       detalle: [...]           # string con detalles para ese evento.
     *     }
     *
     * Sin embargo esta función separa esa estructura para que sea más
     * sencillo capturarla dentro de ember.
     *
     * Por ejemplo, si queremos capturar un error (como hace la batería de tests),
     * podemos escribir:
     *
     *     pilas.on('errorDeActividad', function(motivoDelError) {
     *       // etc...
     *     });
     *
     * @method contectarEventos
     * @private
     *
     */
    conectarEventos() {
      $(window).on("message.fromIframe", e => {
        let datos = e.originalEvent.data;
        this.trigger(datos.tipo, datos.detalle);
      });
    },

    /**
     * Se llama automáticamente para desconectar los eventos del servicio.
     *
     * @method desconectarEventos
     * @private
     */
    desconectarEventos() {
      $(window).off("message.fromIframe");
    },

    inicializarEscena(iframeElement, nombreOInicializador) {
      var inicializador = nombreOInicializador;

      if (inicializador.indexOf('new') === -1) {
        //Significa que vino un nombre de escena.
        inicializador = "new ".concat(inicializador, "()");
      }

      let codigo = "\n      var escena = ".concat(inicializador, ";\n      pilas.mundo.gestor_escenas.cambiar_escena(escena);\n    ");
      this.evaluar(codigo);
      this.set("inicializadorDeLaEscenaActual", inicializador);
    },

    /**
     * Evalúa código reiniciando completamente la biblioteca.
     *
     * @method ejecutarCodigo
     * @public
     */
    ejecutarCodigo(codigo) {
      this.reiniciar().then(() => {
        let iframeElement = this.iframe;
        iframeElement.contentWindow.eval(codigo);
      });
    },

    /**
     * Retorna true si el problema está resuelto.
     *
     * @method estaResueltoElProblema
     * @public
     */
    estaResueltoElProblema() {
      return this.evaluar("pilas.escena_actual().estaResueltoElProblema();");
    },

    /**
     * Ejecuta el código reiniciando la escena rápidamente.
     *
     * @method ejecutarCodigoSinReiniciar
     * @public
     *
     * @todo convertir en método privado.
     */
    ejecutarCodigoSinReiniciar(codigo) {
      if (this.loading) {
        console.warn("Cuidado, no se puede ejecutar antes de que pilas cargue.");
        return;
      }

      let iframeElement = this.iframe;
      this.reiniciarEscenaCompleta();
      iframeElement.contentWindow.eval(codigo);
    },

    /**
     * Retorna una captura de pantalla de la escena en formato png/base64
     *
     * @method obtenerCapturaDePantalla
     * @public
     */
    obtenerCapturaDePantalla() {
      let iframeElement = this.iframe;
      return iframeElement.contentWindow.document.getElementById('canvas').toDataURL('image/png');
    },

    /**
     * Realiza un reinicio rápido de la escena actual.
     *
     * @method reiniciarEscenaCompleta
     * @private
     */
    reiniciarEscenaCompleta() {
      let iframeElement = this.iframe;
      iframeElement.contentWindow.eval("pilas.reiniciar();");
      this.inicializarEscena(iframeElement, this.inicializadorDeLaEscenaActual);
    },

    /**
     * Modifica la velocidad de las animaciones y la simulación.
     *
     * Este método es particularmente útil para ejecutar los tests de integración
     * super rápido.
     *
     * Por omisión pilas utiliza un temporizador a 60 FPS.
     *
     * @method cambiarFPS
     * @public
     *
     */
    cambiarFPS(fps) {
      this.evaluar("pilas.setFPS(".concat(fps, ");"));
    },

    /**
     * Permite reiniciar pilas por completo.
     *
     * La acción de reinicio se realiza re-cargando el iframe
     * que contiene a pilas, así que se va a volver a llamar al
     * método `instanciarPilas` automáticamente.
     *
     * Este método retorna una promesa, que se cumple cuando pilas se
     * halla cargado completamente.
     *
     * @method reiniciar
     * @private
     */
    reiniciar() {
      return new Promise(success => {
        if (this.loading) {
          console.warn("Cuidado, se está reiniciando en medio de la carga.");
        }

        this.set("loading", true);
        this.iframe.contentWindow.location.reload(true);
        /* Guarda el callback  para que se llame luego de la carga de pilas. */

        this.set("temporallyCallback", success);
      });
    },

    /**
     * Retorna la cantidad de actores en la escena con la etiqueta solicitada.
     *
     * @method contarActoresConEtiqueta
     * @public
     */
    contarActoresConEtiqueta(etiqueta) {
      let codigo = "\n      var actoresEnLaEscena = pilas.escena_actual().actores;\n\n      var actoresConLaEtiqueta = actoresEnLaEscena.filter(function(actor) {\n        return actor.tiene_etiqueta(\"".concat(etiqueta, "\");\n      });\n\n      actoresConLaEtiqueta.length;\n    ");
      return this.evaluar(codigo);
    },

    cambiarAModoDeLecturaSimple() {
      this.evaluar('pilas.cambiarAModoDeLecturaSimple()');
    },

    cambiarAModoDeLecturaNormal() {
      this.evaluar('pilas.cambiarAModoDeLecturaNormal()');
    },

    /**
     * Evalúa código directamente, sin reiniciar de ninguna forma.
     *
     * @method evaluar
     * @public
     */
    evaluar(codigo) {
      let iframeElement = this.iframe;
      return iframeElement.contentWindow.eval(codigo);
    },

    habilitarModoTurbo() {
      this.evaluar('ComportamientoConVelocidad').modoTurbo = true;
      this.evaluar('pilas').ponerVelocidadMaxima();
    },

    deshabilitarModoTurbo() {
      this.evaluar('ComportamientoConVelocidad').modoTurbo = false;
      this.evaluar('pilas').ponerVelocidadNormal();
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/twitter", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  //const URL = "http://localhost:3000/sendMessage";
  const URL_SEND_MESSAGE = "http://104.131.245.133:9914/sendMessage";

  var _default = Ember.Service.extend({
    compartir(mensaje, imagen) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: URL_SEND_MESSAGE,
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify({
            message: mensaje,
            media: imagen
          }),

          success(res) {
            resolve(res);
          },

          error(xhr) {
            console.error(xhr.responseText);
            reject(xhr.responseText);
          }

        });
      });
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/services/zoom", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    zoom: 100,

    getValue() {
      return this.zoom;
    },

    setValue(zoomValue) {
      this.set('zoom', zoomValue);
    }

  });

  _exports.default = _default;
});
;define("pilasbloques/templates/acercade", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "zv9YWZfh",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n\\t\"],[7,\"div\",true],[10,\"class\",\"contenedor-acercade\"],[8],[0,\"\\n\\t\\t\"],[1,[22,\"pilas-acerca-de\"],false],[0,\"\\n\\n\\t\\t\"],[7,\"p\",true],[8],[0,\"Actualmente estás usando la versión \"],[7,\"code\",true],[8],[1,[22,\"app-version\"],false],[9],[0,\"\\n\"],[4,\"if\",[[24,[\"hayActualizacion\"]]],null,{\"statements\":[[0,\"\\t\\t\\t \\t(y se puede actualizar a la versión \"],[1,[22,\"versionMasReciente\"],false],[0,\")\\n\"]],\"parameters\":[]},null],[0,\"\\t\\t\\t\"],[9],[0,\"\\n\\n\\t\\t\"],[7,\"p\",true],[8],[0,\"\\n\\t\\t  \"],[7,\"button\",false],[12,\"class\",\"btn btn-warning\"],[3,\"action\",[[23,0,[]],\"visitarWeb\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-globe\"],[10,\"aria-hidden\",\"true\"],[8],[9],[0,\" Visitar la web del proyecto\"],[9],[0,\"\\n\\t\\t  \"],[1,[22,\"pilas-update\"],false],[0,\"\\n\\t\\t\"],[9],[0,\"\\n\\t\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/acercade.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/application-loading", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "PsKmnNgs",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\"],[1,[22,\"pilas-cargando\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/application-loading.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "w/aQzLDS",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[24,[\"layout\"]]],null,{\"statements\":[[0,\"  \"],[1,[22,\"pilas-header\"],false],[0,\"\\n  \"],[1,[28,\"pilas-notificador\",null,[[\"servicioNotificador\"],[[24,[\"notificador\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"div\",true],[11,\"class\",[28,\"if\",[[24,[\"layout\"]],\"contenedor-padding-superior\",\"contenedor-sin-padding\"],null]],[8],[0,\"\\n\"],[1,[22,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/info-reportar-problema", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "P7rcBc7K",
    "block": "{\"symbols\":[],\"statements\":[[7,\"p\",true],[8],[0,\"¿Tenés algún problema?\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"¿Pensás que este ejercicio tiene un error?\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"Podés escribirnos a \"],[7,\"a\",true],[10,\"href\",\"mailto:pilasbloques@program.ar\"],[8],[0,\"pilasbloques@program.ar\"],[9],[0,\" \"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"Si tenés una cuenta en Github podés también hacernos un reporte de error directamente en el \"],[4,\"pilas-link\",null,[[\"href\"],[\"https://github.com/Program-AR/pilas-bloques/issues\"]],{\"statements\":[[0,\"Issue Tracker\"]],\"parameters\":[]},null],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/info-reportar-problema.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/modal-ayuda", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "oCBP/BeD",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[24,[\"mostrar\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"targetAttachment\",\"translucentOverlay\"],[[28,\"action\",[[23,0,[]],\"close\"],null],\"center\",true]],{\"statements\":[[0,\"\\n  \"],[1,[28,\"modal-title\",null,[[\"title\",\"close\"],[\"Ayuda\",[28,\"action\",[[23,0,[]],\"close\"],null]]]],false],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"modal-body\"],[8],[0,\"\\n    \"],[14,1],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Esta aplicación te presentará varios desafíos que se pueden\\n      resolver conectando bloques.\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"El primer paso es abrir la sección de Desafíos:\"],[9],[0,\"\\n\\n    \"],[7,\"img\",true],[10,\"src\",\"imagenes/ayuda/seleccionar.gif\"],[10,\"class\",\"img-border\"],[8],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Los bloques están agrupados en categorías, usá la barra lateral\\n      para desplegar los bloques.\"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Luego podés arrastrar y soltar los bloques sobre el área\\n      de trabajo.\"],[9],[0,\"\\n\\n    \"],[7,\"img\",true],[10,\"src\",\"imagenes/ayuda/arrastrar.gif\"],[10,\"class\",\"img-border\"],[8],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Una vez que tengas tu programa listo pulsá el botón ejecutar\\n      continuar.\"],[9],[0,\"\\n\\n    \"],[7,\"img\",true],[10,\"src\",\"imagenes/ayuda/ejecutar.gif\"],[10,\"class\",\"img-border\"],[8],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"Ah, y los bloques se pueden borrar arrastrándolos a la papelera.\"],[9],[0,\"\\n\\n    \"],[7,\"img\",true],[10,\"src\",\"imagenes/ayuda/borrar.gif\"],[10,\"class\",\"img-border\"],[8],[9],[0,\"\\n\\n    \"],[7,\"h3\",true],[8],[0,\"Reportar un problema\"],[9],[0,\"\\n    \"],[1,[22,\"info-reportar-problema\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/modal-ayuda.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/modal-title", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "WQ+UAG7U",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[7,\"h4\",true],[10,\"class\",\"modal-title\"],[8],[1,[22,\"title\"],false],[0,\" \"],[7,\"button\",false],[12,\"id\",\"cerrar-modal\"],[12,\"class\",\"pull-right btn btn-xs btn-default\"],[3,\"action\",[[23,0,[]],\"ocultar\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-close fa-2x\"],[10,\"aria-hidden\",\"true\"],[8],[9],[9],[9],[0,\"\\n\\n\"],[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/modal-title.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-acerca-de", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "KKZ5eGF+",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"h1\",true],[8],[0,\"Acerca de Pilas Bloques\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  Pilas Bloques es una aplicación para aprender a programar, desarrollada especialmente para el aula.\\n\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"\\n  Se proponen desafíos con diversos niveles de dificultad para acercar a las y los estudiantes al mundo de la programación por medio de bloques.\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿Qué es programar por medio de bloques?\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  Es desarrollar programas con acciones e instrucciones incorporadas en bloques o piezas prediseñadas. El resultado de encastrar los bloques entre sí es el programa que resuelve el problema ó desafío planteado.\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿Por qué es positiva esta modalidad de aprendizaje?\\n\"],[9],[0,\"\\n\\n\"],[7,\"ul\",true],[8],[0,\"\\n  \"],[7,\"li\",true],[8],[0,\"\\n    Porque cada \"],[7,\"b\",true],[8],[0,\"concepto\"],[9],[0,\" abstracto asociado a la programación tiene su representación \"],[7,\"b\",true],[8],[0,\"visual\"],[9],[0,\".\\n  \"],[9],[0,\"\\n  \"],[7,\"li\",true],[8],[0,\"\\n    Porque ahorra las \"],[7,\"b\",true],[8],[0,\"dificultades\"],[9],[0,\" que genera la sintaxis formal de un lenguaje \"],[7,\"b\",true],[8],[0,\"escrito\"],[9],[0,\" (¡y la frustración cuando cometemos un error al escribir!). Los bloques se seleccionan, arrastran, encastran y listo.\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿En qué se diferencia Pilas Bloques de otras herramientas?\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  La principal diferencia es que esta plataforma fue pensada para \"],[7,\"b\",true],[8],[0,\"acompañar una secuencia didáctica\"],[9],[0,\" para el aprendizaje de la programación en la escuela.\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿Qué es una secuencia didáctica?\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  Es el plan mediante el cual se propone aprender un tema. La secuencia didáctica de Pilas Bloques fue ideada y probada por docentes e investigadores argentinos. Hoy en día, esta propuesta se está profundizando y ampliando. Conocé más sobre las iniciativas que estamos abordando en \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://program.ar/comunidad-conocimiento/\"]],{\"statements\":[[0,\"Comunidad de conocimiento\"]],\"parameters\":[]},null],[0,\".\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿Quién puede hacer los desafíos de Pilas Bloques?\\n\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"\\n  Los desafíos pueden ser realizados por niños de 3 a 99 años ;) . Sin embargo, actualmente poseemos\\n  acompañan dos manuales para docentes orientados a \"],[7,\"b\",true],[8],[0,\" la primaria \"],[9],[0,\", por lo que los niños entre\\n  5 y 8 años podrán aprovechar mejor las actividades del Primer Ciclo, y los niños entre 9 y 12 años\\n  podrán aprovechar mejor las actividades del Segundo Ciclo.\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  ¿Y cualquiera puede hacer los desafíos por su cuenta?\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  La herramienta está pensada como \"],[7,\"b\",true],[8],[0,\"ayuda al docente y al alumno\"],[9],[0,\" en el proceso de aprendizaje \\n  de la programación en un entorno escolar. En la secuencia didáctica que se plantea, \\n  la \"],[7,\"b\",true],[8],[0,\"indagación\"],[9],[0,\" autodidacta es fundamental. Nuestra recomendación, no obstante, es que el \\n  docente sea el que \"],[7,\"b\",true],[8],[0,\"guíe\"],[9],[0,\" y asista el proceso de aprendizaje del alumno.\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  Contacto\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  Por cualquier duda nos pueden contactar a: \"],[7,\"a\",true],[10,\"href\",\"mailto:pilasbloques@program.ar\"],[8],[0,\"pilasbloques@program.ar\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[7,\"h2\",true],[8],[0,\"\\n  Sobre los autores y Program.AR\\n\"],[9],[0,\"\\n\\n\"],[7,\"p\",true],[8],[0,\"\\n  Pilas Bloques fue desarrollada por \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://program.ar/\"]],{\"statements\":[[0,\"Program.AR\"]],\"parameters\":[]},null],[0,\" - \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://www.fundacionsadosky.org.ar/\"]],{\"statements\":[[0,\"Fundación Sadosky\"]],\"parameters\":[]},null],[0,\" con la colaboración de \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://huayra.conectarigualdad.gob.ar/\"]],{\"statements\":[[0,\"Huayra\"]],\"parameters\":[]},null],[0,\". Esta aplicación hace uso de la herramienta \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://pilas-engine.com.ar/\"]],{\"statements\":[[0,\"Pilas Engine Web\"]],\"parameters\":[]},null],[0,\" desarrollada por \"],[4,\"pilas-link\",null,[[\"href\"],[\"https://github.com/hugoruscitti\"]],{\"statements\":[[0,\"Hugo Ruscitti\"]],\"parameters\":[]},null],[0,\".\\n\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"\\n  La secuencia didáctica que guía la herramienta fue elaborada por \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://program.ar/\"]],{\"statements\":[[0,\"Program.AR\"]],\"parameters\":[]},null],[0,\", y puede encontrarse junto con otros materiales en la página web. Contó con el apoyo y la colaboración de la Universidad Nacional de Quilmes y otras universidades nacionales de Argentina.\\n\"],[9],[0,\"\\n\"],[7,\"p\",true],[8],[0,\"\\n  Program.AR es una iniciativa que trabaja para que el aprendizaje significativo de Computación esté presente en todas las escuelas argentinas. Más información: \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://program.ar/por-que-ciencias-de-la-computacion/\"]],{\"statements\":[[0,\"http://program.ar/por-que-ciencias-de-la-computacion/\"]],\"parameters\":[]},null],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-acerca-de.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-blockly", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qLYlaTXr",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"div\",true],[10,\"class\",\"vbox\"],[8],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"pilas-blockly-botones\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[24,[\"cargando\"]]],null,{\"statements\":[[0,\"      \"],[7,\"p\",true],[10,\"class\",\"center\"],[8],[0,\" cargando ... \"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n\"],[4,\"if\",[[24,[\"pasoAPasoHabilitado\"]]],null,{\"statements\":[[4,\"if\",[[24,[\"ejecutando\"]]],null,{\"statements\":[[4,\"if\",[[24,[\"pausadoEnBreakpoint\"]]],null,{\"statements\":[[0,\"            \"],[7,\"button\",false],[12,\"class\",\"btn btn-default btn-info\"],[3,\"action\",[[23,0,[]],\"step\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-step-forward\"],[8],[9],[0,\" Avanzar un paso\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[7,\"button\",true],[10,\"class\",\"btn btn-default btn-info\"],[10,\"disabled\",\"\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-step-forward\"],[8],[9],[0,\" Avanzar un paso\"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[7,\"button\",false],[12,\"class\",\"btn btn-success btn-info\"],[3,\"action\",[[23,0,[]],\"ejecutar\",true]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-play\"],[8],[9],[0,\" Ejecutar paso a paso\"],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"if\",[[24,[\"debeMostarReiniciar\"]]],null,{\"statements\":[[0,\"          \"],[7,\"button\",false],[12,\"class\",\"btn btn-warning\"],[3,\"action\",[[23,0,[]],\"reiniciar\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-refresh\"],[8],[9],[0,\" Reiniciar\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[7,\"button\",false],[12,\"class\",\"btn btn-success btn-ejecutar\"],[3,\"action\",[[23,0,[]],\"ejecutar\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-play\"],[8],[9],[0,\" Ejecutar\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"unless\",[[24,[\"estoyEnMoodle\"]]],null,{\"statements\":[[0,\"\\n        \"],[1,[28,\"pilas-solution-file\",null,[[\"actividad\",\"workspace\",\"xml\"],[[24,[\"modelActividad\"]],[24,[\"initial_workspace\"]],[24,[\"codigoActualEnFormatoXML\"]]]]],false],[0,\"\\n        \\n        \"],[5,\"pilas-toggle\",[],[[\"@isDisabled\",\"@isChecked\",\"@icon\",\"@tooltip\",\"@element-id\"],[[23,0,[\"ejecutando\"]],[23,0,[\"modoTuboHabilitado\"]],\"fa fa-bolt\",\"Modo Turbo\",\"modo-turbo\"]]],[0,\" \\n\\n\"],[4,\"if\",[[24,[\"debeMostarRegresarAlLibro\"]]],null,{\"statements\":[[0,\"          \"],[4,\"link-to\",null,[[\"class\",\"route\",\"model\"],[\"btn btn-default border-right right\",\"libros.verLibro\",[24,[\"model\",\"grupo\",\"libro\"]]]],{\"statements\":[[7,\"i\",true],[10,\"class\",\"fa fa-arrow-left\"],[8],[9],[0,\" Regresar al libro\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[24,[\"mostrarCompartir\"]]],null,{\"statements\":[[0,\"          \"],[7,\"button\",false],[12,\"class\",\"btn btn-info border-right right\"],[3,\"action\",[[23,0,[]],\"compartir\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-twitter\"],[8],[9],[0,\" Compartir\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n  \"],[9],[0,\"\\n\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"contenedor-para-componente-blocky\"],[8],[0,\"\\n\"],[4,\"if\",[[24,[\"cargando\"]]],null,{\"statements\":[[0,\"      \"],[1,[22,\"pilas-cargando\"],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n      \"],[1,[28,\"ember-blockly\",null,[[\"mediaFolder\",\"blocks\",\"workspace\",\"withZoom\",\"withTrash\",\"comments\",\"disable\",\"duplicate\",\"help\",\"disableBlock\",\"javascriptCode\",\"showCode\",\"comment\",\"onChangeWorkspace\",\"onNewWorkspace\",\"disableNotConnectedToMainBlock\"],[\"blockly-package/media/\",[24,[\"blockly_toolbox\"]],[24,[\"initial_workspace\"]],true,true,[24,[\"blockly_comments\"]],[24,[\"blockly_disable\"]],[24,[\"blockly_duplicate\"]],false,false,[24,[\"javascriptCode\"]],[24,[\"showCode\"]],false,[28,\"action\",[[23,0,[]],\"onChangeWorkspace\"],null],[28,\"action\",[[23,0,[]],\"onNewWorkspace\"],null],true]]],false],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\\n  \"],[7,\"div\",false],[12,\"id\",\"preguntaPorProblemas\"],[3,\"action\",[[23,0,[]],\"abrirReporteProblemas\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-question-circle\"],[10,\"aria-hidden\",\"true\"],[8],[9],[0,\" ¿Algún problema con este ejercicio? \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\\n\"],[4,\"if\",[[24,[\"mostrarDialogoFinDesafio\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"attatchment\",\"translucentOverlay\",\"containerClass\"],[[28,\"action\",[[23,0,[]],\"ocultarFinDesafio\"],null],\"middle center\",true,\"dialogoFinDesafio\"]],{\"statements\":[[0,\"\\n    \"],[1,[28,\"modal-title\",null,[[\"title\",\"close\"],[\"¡Lo lograste!\",[28,\"action\",[[23,0,[]],\"ocultarFinDesafio\"],null]]]],false],[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"center\"],[8],[0,\"\\n      \"],[7,\"img\",true],[10,\"src\",\"imagenes/libros/primer-ciclo.png\"],[8],[9],[0,\"\\n      \"],[7,\"img\",true],[10,\"style\",\"transform:scaleX(-1)\"],[10,\"src\",\"imagenes/libros/programar.png\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n    \"],[7,\"p\",true],[8],[7,\"strong\",true],[8],[0,\"Para pensar...\"],[9],[0,\" Tu programa no es el único que resuelve el problema. ¡Existen otras soluciones!\"],[9],[0,\"\\n\"],[0,\"    \"],[7,\"p\",true],[8],[0,\"¿Estás usando los conceptos bien?\"],[9],[0,\"  \\n\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[24,[\"mostrarDialogoReporteProblemas\"]]],null,{\"statements\":[[4,\"modal-dialog\",null,[[\"onClose\",\"targetAttachment\",\"translucentOverlay\",\"containerClass\"],[[28,\"action\",[[23,0,[]],\"cerrarReporteProblemas\"],null],\"center\",true,\"dialogoAjustado\"]],{\"statements\":[[0,\"    \"],[1,[28,\"modal-title\",null,[[\"title\",\"close\"],[\"Reportar un problema\",[28,\"action\",[[23,0,[]],\"cerrarReporteProblemas\"],null]]]],false],[0,\"\\n    \"],[1,[22,\"info-reportar-problema\"],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-blockly.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-botones-zoom", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "XOPozfto",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[24,[\"canZoomOut\"]]],null,{\"statements\":[[0,\"  \"],[7,\"button\",false],[12,\"class\",\"btn btn-success btn-rect\"],[3,\"action\",[[23,0,[]],\"zoomOut\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-minus\"],[8],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"button\",true],[10,\"disabled\",\"\"],[10,\"class\",\"btn btn-success btn-rect\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-minus\"],[8],[9],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n  \"],[7,\"span\",false],[12,\"class\",\"zoom-label\"],[3,\"action\",[[23,0,[]],\"zoomRestore\"]],[8],[1,[22,\"zoomValue\"],false],[0,\"%\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[24,[\"canZoomIn\"]]],null,{\"statements\":[[0,\"  \"],[7,\"button\",false],[12,\"class\",\"btn btn-success btn-rect\"],[3,\"action\",[[23,0,[]],\"zoomIn\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-plus\"],[8],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"button\",true],[10,\"disabled\",\"\"],[10,\"class\",\"btn btn-success btn-rect\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-plus\"],[8],[9],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\"],[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-botones-zoom.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-canvas", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "iAprn5Sg",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[1,[28,\"pilas-spinner\",null,[[\"centered\"],[true]]],false],[0,\"\\n\\n\"],[7,\"iframe\",true],[10,\"src\",\"pilas.html\"],[10,\"width\",\"100%\"],[10,\"height\",\"100%\"],[10,\"class\",\"iframe-pilas-canvas\"],[10,\"id\",\"innerIframe\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-canvas.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-cargando", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "t6sc8X05",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"pilas-spinner\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-cargando.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-desafio", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ARZ4waWa",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[24,[\"model\",\"deshabilitado\"]]],null,{\"statements\":[[0,\"  \"],[7,\"img\",true],[10,\"class\",\"grayscale semi-transparente\"],[11,\"src\",[29,[\"images/desafios/\",[24,[\"model\",\"nombreImagen\"]]]]],[8],[9],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"ribbon right gray semi-transparente\"],[8],[7,\"a\",true],[8],[0,\"Muy pronto\"],[9],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"link-to\",null,[[\"query\",\"route\",\"model\"],[[28,\"hash\",null,[[\"codigo\"],[\"\"]]],\"desafio\",[24,[\"model\"]]]],{\"statements\":[[0,\"    \"],[7,\"img\",true],[10,\"class\",\"desafio-img\"],[11,\"src\",[29,[\"images/desafios/\",[24,[\"model\",\"nombreImagen\"]]]]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"\\n\"],[4,\"unless\",[[24,[\"model\",\"grupo\",\"libro\",\"desafiosCortos\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\",true],[10,\"class\",\"pilas-desafio-titulo\"],[8],[1,[24,[\"model\",\"titulo\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-desafio.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-editor", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "9HtGlKlX",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"contenido-principal desafio-contenedor \",[28,\"if\",[[24,[\"modoLecturaSimple\"]],\"aplicar-modo-lectura-simple\"],null]]]],[8],[0,\"\\n  \\n  \"],[1,[22,\"outlet\"],false],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"desafio-panel-izquierdo\"],[10,\"id\",\"panel-izquierdo\"],[8],[0,\"\\n\\n    \"],[5,\"pilas-canvas\",[],[[\"@pilas\",\"@onReady\",\"@escena\"],[[22,\"pilas\"],[28,\"action\",[[23,0,[]],\"onReady\"],null],[24,[\"model\",\"escena\"]]]]],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"contenedor-panel-ayuda\"],[10,\"id\",\"panel-ayuda\"],[8],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"panel-ayuda puede-seleccionar\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[24,[\"model\",\"grupo\",\"libro\",\"desafiosCortos\"]]],null,{\"statements\":[[0,\"          \"],[7,\"h4\",true],[8],[1,[24,[\"model\",\"grupo\",\"titulo\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[7,\"h4\",true],[8],[1,[24,[\"model\",\"titulo\"]],false],[9],[0,\"\\n\\n        \"],[7,\"p\",true],[8],[1,[24,[\"model\",\"enunciado\"]],false],[9],[0,\"\\n\\n\"],[4,\"if\",[[24,[\"model\",\"consignaInicial\"]]],null,{\"statements\":[[0,\"          \"],[7,\"div\",true],[10,\"class\",\"tip-block\"],[8],[0,\"\\n            \"],[7,\"p\",true],[8],[7,\"em\",true],[8],[0,\"¿Sabías qué...?\"],[9],[9],[0,\"\\n\\n            \"],[7,\"p\",true],[8],[1,[24,[\"model\",\"consignaInicial\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n\"],[1,[28,\"pilas-splitter\",null,[[\"panel\",\"iframe\",\"ayuda\"],[\"#panel-izquierdo\",\"iframe\",\"#panel-ayuda\"]]],false],[0,\"\\n\\n    \"],[1,[28,\"pilas-blockly\",null,[[\"guardar\",\"registrarPrimerCodigo\",\"modoDocente\",\"modoAlumno\",\"hash\",\"idAlumno\",\"codigo\",\"showCode\",\"cargando\",\"modelActividad\",\"cuandoEjecuta\",\"model\",\"pasoAPasoHabilitado\",\"persistirSolucionEnURL\",\"debeMostrarFinDeDesafio\",\"pilas\",\"bloques\",\"onChangeWorkspace\",\"onTerminoEjecucion\"],[\"guardar\",\"registrarPrimerCodigo\",[24,[\"modoDocente\"]],[24,[\"modoAlumno\"]],[24,[\"hash\"]],[24,[\"idAlumno\"]],[24,[\"codigo\"]],[24,[\"showCode\"]],[24,[\"cargando\"]],[24,[\"model\"]],[24,[\"cuandoEjecuta\"]],[24,[\"model\"]],[24,[\"model\",\"debugging\"]],[24,[\"persistirSolucionEnURL\"]],[24,[\"debeMostrarFinDeDesafio\"]],[24,[\"pilas\"]],[24,[\"model\",\"bloques\"]],[24,[\"onChangeWorkspace\"]],[24,[\"onTerminoEjecucion\"]]]]],false],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-editor.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-header", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "h3ImePbt",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"nav\",true],[10,\"class\",\"navbar navbar-default\"],[10,\"role\",\"navigation\"],[8],[0,\"\\n  \"],[7,\"div\",true],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[2,\" Brand and toggle get grouped for better mobile display \"],[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"navbar-header navbar-collapse\"],[8],[0,\"\\n      \"],[7,\"a\",true],[10,\"class\",\"navbar-brand\"],[10,\"href\",\"#\"],[8],[7,\"img\",true],[10,\"src\",\"imagenes/logo.png\"],[8],[9],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[2,\" Collect the nav links, forms, and other content for toggling \"],[0,\"\\n    \"],[7,\"div\",true],[10,\"id\",\"bs-example-navbar-collapse-1\"],[8],[0,\"\\n      \"],[7,\"ul\",true],[10,\"class\",\"nav navbar-nav\"],[8],[0,\"\\n        \"],[4,\"link-to\",null,[[\"tagName\",\"route\"],[\"li\",\"libros\"]],{\"statements\":[[7,\"a\",true],[10,\"href\",\"#\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-home\"],[8],[9],[0,\" Principal\"],[9]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",null,[[\"tagName\",\"route\",\"model\"],[\"li\",\"libros.verLibro\",1]],{\"statements\":[[7,\"a\",true],[10,\"href\",\"#\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-book\"],[8],[9],[0,\" 1er Ciclo\"],[9]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",null,[[\"tagName\",\"route\",\"model\"],[\"li\",\"libros.verLibro\",2]],{\"statements\":[[7,\"a\",true],[10,\"href\",\"#\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-book\"],[8],[9],[0,\" 2do Ciclo\"],[9]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"link-to\",null,[[\"tagName\",\"route\"],[\"li\",\"acercade\"]],{\"statements\":[[7,\"a\",true],[10,\"href\",\"#\"],[8],[7,\"i\",true],[10,\"class\",\"fa fa-info-circle\"],[8],[9],[0,\" Acerca de\"],[9]],\"parameters\":[]},null],[0,\"\\n      \"],[9],[0,\"\\n\\n      \"],[7,\"div\",true],[10,\"class\",\"header-right\"],[8],[0,\"\\n\\n        \"],[7,\"div\",true],[10,\"class\",\"navbar-header navbar-collapse\"],[8],[0,\"\\n          \"],[2,\" Haciendo que el logo de programar no se colapse, y desaparezca en mobile. \"],[0,\"\\n\"],[4,\"unless\",[[28,\"media\",[\"isMobile\"],null]],null,{\"statements\":[[0,\"            \"],[4,\"pilas-link\",null,[[\"href\"],[\"http://program.ar\"]],{\"statements\":[[7,\"img\",true],[10,\"src\",\"imagenes/programar-short.png\"],[8],[9]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"        \"],[9],[0,\"\\n\\n        \"],[1,[22,\"pilas-automatic-update\"],false],[0,\"\\n\\n        \"],[7,\"button\",false],[12,\"class\",\"header-button\"],[12,\"id\",\"abrir-ayuda\"],[3,\"action\",[[23,0,[]],\"abrirAyuda\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-question\"],[10,\"aria-hidden\",\"true\"],[8],[9],[9],[0,\"\\n      \"],[9],[0,\"\\n\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[1,[28,\"modal-ayuda\",null,[[\"mostrar\"],[[24,[\"mostrarDialogoAyuda\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-header.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-libro", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Pl7Ky4K+",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[4,\"link-to\",null,[[\"route\",\"model\"],[\"libros.verLibro\",[24,[\"libro\"]]]],{\"statements\":[[0,\"\\n\"],[4,\"if\",[[24,[\"libro\",\"nombre\"]]],null,{\"statements\":[[0,\"    \"],[7,\"img\",true],[11,\"src\",[29,[\"imagenes/libros/\",[24,[\"libro\",\"nombre\"]],\".png\"]]],[8],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[7,\"h2\",true],[8],[1,[24,[\"libro\",\"titulo\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[7,\"p\",true],[8],[1,[24,[\"libro\",\"descripcion\"]],false],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-libro.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-link", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Op7txFQc",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[24,[\"inElectron\"]]],null,{\"statements\":[[0,\"  \"],[7,\"a\",false],[12,\"href\",\"\"],[3,\"action\",[[23,0,[]],\"abrirConNavegadorExterno\",[24,[\"href\"]]]],[8],[14,1],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"a\",true],[11,\"href\",[22,\"href\"]],[10,\"target\",\"_blank\"],[8],[14,1],[9],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-link.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-notificador", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "c/oVisCv",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"pilas-notificador \",[28,\"if\",[[24,[\"hayActualizacion\"]],\"pilas-notificador-visible\",\"pilas-notificador-oculto\"],null]]]],[8],[0,\"\\n  \"],[7,\"div\",false],[12,\"class\",\"pilas-notificador-cerrar\"],[3,\"action\",[[23,0,[]],\"cerrar\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-close\"],[8],[9],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Hay una nueva versión disponible para descargar.\"],[9],[0,\"\\n  \"],[7,\"p\",true],[8],[0,\"Visitá \"],[4,\"pilas-link\",null,[[\"href\"],[[24,[\"linkDescarga\"]]]],{\"statements\":[[0,\"nuestra web para más información.\"]],\"parameters\":[]},null],[9],[0,\"\\n\\n  \"],[14,1],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-notificador.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-solution-file", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ErvMZCJM",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"input\",true],[10,\"id\",\"cargarActividadInput\"],[10,\"accept\",\".spbq\"],[10,\"class\",\"hidden\"],[10,\"type\",\"file\"],[8],[9],[0,\"\\n\"],[7,\"a\",true],[10,\"id\",\"placeholder\"],[10,\"class\",\"hidden\"],[8],[0,\"..\"],[9],[0,\"\\n\\n\"],[7,\"button\",false],[12,\"class\",\"btn btn-default\"],[3,\"action\",[[23,0,[]],\"abrirSolucion\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-folder-open-o\"],[8],[9],[0,\" Abrir\"],[9],[0,\"\\n\\n\"],[7,\"button\",false],[12,\"class\",\"btn btn-default\"],[3,\"action\",[[23,0,[]],\"guardarSolucion\"]],[8],[7,\"i\",true],[10,\"class\",\"fa fa-download\"],[8],[9],[0,\" Guardar\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-solution-file.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-spinner", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "N0O8/Is+",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"div\",true],[11,\"class\",[29,[\"spinner \",[28,\"if\",[[24,[\"centered\"]],\"spinner-centered\"],null]]]],[8],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-spinner.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-splitter", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "db21lTGS",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"splitter\"],[10,\"id\",\"splitter\"],[8],[9],[0,\"\\n\"],[7,\"div\",true],[10,\"id\",\"over-splitter\"],[10,\"class\",\"over-splitter\"],[8],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-splitter.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/components/pilas-toggle", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "aFhcKgSy",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\\n\"],[7,\"label\",true],[10,\"class\",\"switch\"],[11,\"title\",[22,\"tooltip\"]],[8],[0,\"\\n    \"],[5,\"input\",[],[[\"@type\",\"@id\",\"@checked\",\"@disabled\"],[\"checkbox\",[22,\"element-id\"],[22,\"isChecked\"],[22,\"isDisabled\"]]]],[0,\"\\n    \"],[7,\"span\",true],[10,\"class\",\"slider round\"],[8],[7,\"i\",true],[11,\"class\",[29,[\"slider-icon \",[22,\"icon\"]]]],[8],[9],[9],[0,\"\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/components/pilas-toggle.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafio-loading", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "7++S2KP0",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\"],[1,[22,\"pilas-cargando\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafio-loading.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafio", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "lxXel3Kj",
    "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-editor\",null,[[\"pilas\",\"model\",\"persistirSolucionEnURL\",\"codigo\",\"onReady\",\"debeMostrarFinDeDesafio\",\"onChangeWorkspace\"],[[24,[\"pilas\"]],[24,[\"model\"]],false,[24,[\"codigo\"]],[28,\"action\",[[23,0,[]],\"cuandoCargaPilas\"],null],true,[28,\"action\",[[23,0,[]],\"onChangeWorkspace\"],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafio.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios-loading", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "SSBYe7sq",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\\n\"],[1,[22,\"pilas-cargando\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios-loading.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "zjY08us4",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios/curso-alumno-error", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "2/Hs4D6u",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n\\n  \"],[7,\"h1\",true],[8],[0,\":(\"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Lo siento, la dirección URL no se puede decodificar,\\n  posiblemente el parámetro \"],[7,\"code\",true],[8],[0,\"hash\"],[9],[0,\" tenga un error\\n  de formato.\"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Por favor contacte al docente del curso para informar\\n  este error.\"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios/curso-alumno-error.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios/curso-alumno", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6ay4HLKW",
    "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-editor\",null,[[\"pilas\",\"model\",\"persistirSolucionEnURL\",\"codigo\",\"modoAlumno\",\"hash\",\"idAlumno\",\"cuandoEjecuta\",\"debeMostrarFinDeDesafio\"],[[24,[\"pilas\"]],[24,[\"model\"]],false,[24,[\"model\",\"solucion\"]],true,[24,[\"model\",\"hash\"]],[24,[\"model\",\"idAlumno\"]],[28,\"route-action\",[\"cuandoEjecuta\"],null],true]]],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios/curso-alumno.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios/curso-docente", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "DA9/bGQz",
    "block": "{\"symbols\":[],\"statements\":[[1,[28,\"pilas-editor\",null,[[\"pilas\",\"model\",\"modoDocente\",\"persistirSolucionEnURL\",\"codigo\",\"debeMostrarFinDeDesafio\"],[[24,[\"pilas\"]],[24,[\"model\"]],true,false,[24,[\"model\",\"solucion\"]],true]]],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios/curso-docente.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios/desafio-por-nombre-error", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "JvfOYU2w",
    "block": "{\"symbols\":[],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\\n\"],[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n\\n  \"],[7,\"h2\",true],[8],[0,\"Lo siento, algo salió mal...\"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"No existe un desafío con el nombre indicado en la URL. ¿Podrías\\n    corroborar la correctitud de la dirección a este desafío?.\"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios/desafio-por-nombre-error.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/desafios/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "EAJ8U0LX",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Elegí uno de los libros de la barra superior\"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/desafios/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/galeria", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "NPnPiYeI",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n  \"],[7,\"h1\",true],[8],[0,\"Galería de bloques\"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Esta sección muestra los bloques que actualmente migramos a\\n    la nueva versión de blockly.\"],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[0,\"Esta información es temporal, y solo estará visible en el branch\\n  \"],[7,\"code\",true],[8],[0,\"feature/actualizar-blockly\"],[9],[0,\".\"],[9],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"padding\"],[8],[0,\"\\n    \"],[1,[28,\"ember-blockly-catalog\",null,[[\"current_block\"],[[24,[\"current_block\"]]]]],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/galeria.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "3W6j39Zs",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/libros/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "lRqRtTKA",
    "block": "{\"symbols\":[\"libro\"],\"statements\":[[7,\"div\",true],[10,\"class\",\"contenido-principal\"],[8],[0,\"\\n\\n  \"],[7,\"div\",true],[10,\"class\",\"box\"],[8],[0,\"\\n    \"],[7,\"p\",true],[8],[7,\"img\",true],[10,\"class\",\"main-logo\"],[10,\"src\",\"images/main-logo.png\"],[10,\"width\",\"468\"],[10,\"height\",\"262\"],[8],[9],[9],[0,\"\\n    \"],[7,\"p\",true],[8],[0,\"\\n      ¡Hola! Te damos la bienvenida a \"],[7,\"strong\",true],[8],[0,\"Pilas Bloques\"],[9],[0,\",\\n      una herramienta para aprender a programar.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Los desafíos que ofrecemos están organizados en dos grupos:\\n    \"],[9],[0,\"\\n\\n\"],[4,\"each\",[[24,[\"model\"]]],null,{\"statements\":[[4,\"unless\",[[23,1,[\"oculto\"]]],null,{\"statements\":[[0,\"        \"],[1,[28,\"pilas-libro\",null,[[\"libro\"],[[23,1,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"\\n    \"],[7,\"hr\",true],[8],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Visitá la sección \"],[4,\"link-to\",null,[[\"route\"],[\"acercade\"]],{\"statements\":[[7,\"strong\",true],[8],[0,\"Acerca de\"],[9]],\"parameters\":[]},null],[0,\"\\n      para conocer más en detalle de qué se trata esta herramienta y quién la desarrolló.\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"p\",true],[8],[0,\"\\n      Si necesitás ayuda, presioná (\"],[7,\"i\",true],[10,\"class\",\"fa fa-question\"],[10,\"aria-hidden\",\"true\"],[8],[9],[0,\") ubicado en la parte superior derecha\\n      de la pantalla.\\n    \"],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/libros/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/templates/libros/ver-libro", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "5hfj6Mab",
    "block": "{\"symbols\":[\"grupo\",\"desafio\"],\"statements\":[[7,\"div\",true],[11,\"class\",[29,[\"contenido-principal \",[28,\"if\",[[24,[\"model\",\"modoLecturaSimple\"]],\"aplicar-modo-lectura-simple\"],null]]]],[8],[0,\"\\n\\n  \"],[7,\"h1\",true],[8],[0,\"Desafíos del \"],[1,[24,[\"model\",\"titulo\"]],false],[9],[0,\"\\n\\n  \"],[7,\"p\",true],[8],[4,\"link-to\",null,[[\"route\"],[\"libros\"]],{\"statements\":[[7,\"i\",true],[10,\"class\",\"fa fa-chevron-left\"],[8],[9],[0,\" Volver a la lista de libros\"]],\"parameters\":[]},null],[9],[0,\"\\n\\n\"],[4,\"each\",[[24,[\"model\",\"grupos\"]]],null,{\"statements\":[[0,\"\\n    \"],[7,\"h2\",true],[8],[1,[23,1,[\"titulo\"]],false],[9],[0,\"\\n\\n\"],[4,\"each\",[[23,1,[\"desafios\"]]],null,{\"statements\":[[0,\"      \"],[1,[28,\"pilas-desafio\",null,[[\"model\"],[[23,2,[]]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[0,\"    \"],[7,\"p\",true],[10,\"class\",\"mensaje-sin-desafios\"],[8],[0,\"Lo siento, no hay desafíos para este manual aún.\"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[4,\"if\",[[24,[\"model\",\"grupos\",\"isSettled\"]]],null,{\"statements\":[[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[22,\"pilas-cargando\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "pilasbloques/templates/libros/ver-libro.hbs"
    }
  });

  _exports.default = _default;
});
;define("pilasbloques/tests/mirage/mirage/config.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/fixtures/desafios.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/fixtures/desafios.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/desafios.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/fixtures/grupos.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/fixtures/grupos.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/grupos.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/fixtures/libros.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/fixtures/libros.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/fixtures/libros.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/models/desafio.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/models/desafio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/desafio.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/models/grupo.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/models/grupo.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/grupo.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/models/libro.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/models/libro.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/libro.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/scenarios/default.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
;define("pilasbloques/tests/mirage/mirage/serializers/application.jshint.lint-test", [], function () {
  "use strict";

  QUnit.module('JSHint | mirage/serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass jshint.');
  });
});
;

;define('pilasbloques/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("pilasbloques/app")["default"].create({"name":"pilasbloques","version":"1.5.0+bbe4d09c"});
          }
        
//# sourceMappingURL=pilasbloques.map
