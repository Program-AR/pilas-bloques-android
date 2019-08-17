Math.randomIntBetween = function(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

Math.randomFrom = function (array) {
    return array[Math.randomIntBetween(0, array.length)];
}

Math.takeRandomFrom = function (array) {
    var index = Math.randomIntBetween(0, array.length);
    return array.splice(index, 1)[0];
}
;// Copyright Alfredo Héctor Sanzo - asanzo@github

// Takes a function, evaluates it "this" times.
Number.prototype.timesRepeat = function(f){
	for(var i=0; i<this; i++){
		f();
	}
}

// Takes an object, gives back a list with the object repeated "this" times.
Number.prototype.times = function(object){
	var l = [];
	this.timesRepeat(function(){l.push(object)});
	return l;
}
;(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        function stringifySymbolSequence (e) {
            return e.literal ? JSON.stringify(e.literal) :
                   e.type ? '%' + e.type : e.toString();
        }
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(stringifySymbolSequence).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var line = buffer.substring(this.lastLineBreak, nextLineBreak)
            var col = this.index - this.lastLineBreak;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += "  " + line + "\n"
            message += "  " + Array(col).join(" ") + "^"
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }
    }


    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (token = lexer.next()) {
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var message = this.lexer.formatError(token, "invalid syntax") + "\n";
                message += "Unexpected " + (token.type ? token.type + " token: " : "");
                message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
                var err = new Error(message);
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));
;// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "Main", "symbols": ["_", "Term", "_"], "postprocess": d => d[1]},
    {"name": "Main", "symbols": ["_", "Matrix", "_"], "postprocess": d => d[1]},
    {"name": "Main", "symbols": ["_", {"literal":"["}, "_", "Matrix", "_", {"literal":"]"}, "_"], "postprocess": d => d[3]},
    {"name": "Matrix$ebnf$1", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "Matrix$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Matrix", "symbols": [{"literal":"["}, "_", "Row", "_", {"literal":"]"}, "_", "Matrix$ebnf$1", "_"], "postprocess": d => [d[2]]},
    {"name": "Matrix", "symbols": [{"literal":"["}, "_", "Row", "_", {"literal":"]"}, "_", {"literal":","}, "_", "Matrix"], "postprocess": d => [d[2]].concat(d[8])},
    {"name": "Row", "symbols": ["Term"], "postprocess": d => [d[0]]},
    {"name": "Row", "symbols": ["Term", "_", {"literal":","}, "_", "Row"], "postprocess": d => [d[0]].concat(d[4])},
    {"name": "Term", "symbols": ["Subterm1"], "postprocess": id},
    {"name": "Term", "symbols": ["Suc"], "postprocess": d => new GeneradorDeCasillaSucesion(d[0])},
    {"name": "Term", "symbols": ["Macro"], "postprocess": id},
    {"name": "Term", "symbols": [{"literal":"\""}, "_", "Term", "_", {"literal":"\""}], "postprocess": d => d[2]},
    {"name": "Term", "symbols": [{"literal":"'"}, "_", "Term", "_", {"literal":"'"}], "postprocess": d => d[2]},
    {"name": "Suc", "symbols": ["Subterm1", "_", {"literal":">"}, "_", "Subterm1"], "postprocess": d => [d[0],d[4]]},
    {"name": "Suc", "symbols": ["Subterm1", "_", {"literal":">"}, "_", "Suc"], "postprocess": d => [d[0]].concat(d[4])},
    {"name": "Subterm1", "symbols": ["Subterm2"], "postprocess": id},
    {"name": "Subterm1", "symbols": ["Option"], "postprocess": d => new GeneradorDeCasillaOpcion(d[0])},
    {"name": "Option", "symbols": ["Subterm2", "_", {"literal":"|"}, "_", "Subterm2"], "postprocess": d => [d[0],d[4]]},
    {"name": "Option", "symbols": ["Subterm2", "_", {"literal":"|"}, "_", "Option"], "postprocess": d => [d[0]].concat(d[4])},
    {"name": "Subterm2", "symbols": ["Atom"], "postprocess": id},
    {"name": "Subterm2", "symbols": ["Maybe"], "postprocess": id},
    {"name": "Maybe", "symbols": ["Atom", "_", {"literal":"?"}], "postprocess": d => new GeneradorDeCasillaMaybe(d[0])},
    {"name": "Maybe", "symbols": ["Atom", "_", {"literal":"?"}, "_", {"literal":"("}, "_", "decimal", "_", {"literal":")"}], "postprocess": d => new GeneradorDeCasillaMaybe(d[0],d[6])},
    {"name": "Atom", "symbols": ["Id"], "postprocess": d => new GeneradorDeCasillaSimple(d[0])},
    {"name": "Atom", "symbols": ["Bag"], "postprocess": id},
    {"name": "Atom", "symbols": ["Col"], "postprocess": id},
    {"name": "Atom", "symbols": ["Nil"], "postprocess": id},
    {"name": "Atom", "symbols": [{"literal":"("}, "_", "Term", "_", {"literal":")"}], "postprocess": d => d[2]},
    {"name": "Id$ebnf$1", "symbols": [/[a-zA-Z0-9]/]},
    {"name": "Id$ebnf$1", "symbols": ["Id$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Id", "symbols": ["Id$ebnf$1"], "postprocess": d => d[0].join("")},
    {"name": "Bag", "symbols": [{"literal":"$"}], "postprocess": d => new GeneradorDeCasillaBolsa()},
    {"name": "Bag", "symbols": [{"literal":"$"}, "_", "Id"], "postprocess": d => new GeneradorDeCasillaBolsa(d[2])},
    {"name": "Col", "symbols": [{"literal":"*"}], "postprocess": d => new GeneradorDeCasillaColeccion()},
    {"name": "Col", "symbols": [{"literal":"*"}, "_", "Id"], "postprocess": d => new GeneradorDeCasillaColeccion(d[2])},
    {"name": "Nil", "symbols": [{"literal":"-"}], "postprocess": d => new GeneradorDeCasillaVacia()},
    {"name": "Macro", "symbols": [{"literal":"#"}, "_", "Id"], "postprocess": d => new GeneradorDeCasillaMacro(d[2])}
]
  , ParserStart: "Main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
;/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* @class HabilidadAnimada
 * Es la clase de la que heredan todas en ejerciciosPilas, donde
 * va el comportamiento en común que no quiero poner en pilasweb
 *
*/
var HabilidadAnimada = (function (_super) {
    __extends(HabilidadAnimada, _super);
    function HabilidadAnimada() {
        _super.apply(this, arguments);
    }
    HabilidadAnimada.prototype.implicaMovimiento = function () {
        return false;
    };
    return HabilidadAnimada;
})(Habilidad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "HabilidadAnimada.ts"/>
var Animar = (function (_super) {
    __extends(Animar, _super);
    function Animar(receptor, argumentos) {
        _super.call(this, receptor, argumentos);
        this.setearNombreAnimacion();
        this.nombreAnimacion = this.nombreAnimacion || this.argumentos.nombreAnimacion;
        if (this.nombreAnimacion)
            this.receptor.cargarAnimacion(this.nombreAnimacion());
    }
    /* Redefinir si corresponde animar la habilidad. Debe setear this.nombreAnimacion.
     También se puede pasar por uno de los argumentos el nombre de la animación.*/
    Animar.prototype.setearNombreAnimacion = function () {
    };
    // No redefinir
    Animar.prototype.actualizar = function () {
        this.receptor.avanzarAnimacion();
        this.doActualizar();
    };
    Animar.prototype.doActualizar = function () {
        // Redefinir para agregar comportamiento además de la animación
    };
    return Animar;
})(HabilidadAnimada);
// Esto es una clara chanchada. No sé cómo usar el Error original desde Typescript
var ActividadError = (function () {
    function ActividadError(message, nombreAnimacion) {
        if (message === void 0) { message = ""; }
        if (nombreAnimacion === void 0) { nombreAnimacion = "error"; }
        this.message = message;
        this.nombreAnimacion = nombreAnimacion;
    }
    ;
    return ActividadError;
})();
var ProductionErrorHandler = (function () {
    function ProductionErrorHandler(escena) {
        this.escena = escena;
    }
    ProductionErrorHandler.prototype.handle = function (e) {
        if (e instanceof ActividadError) {
            this.handleActividadError(e);
        }
        else {
            throw e;
        }
    };
    ProductionErrorHandler.prototype.handleActividadError = function (e) {
        this.escena.automata.eliminar_comportamientos();
        this.escena.automata.informarError(e);
        if (parent) {
            var mensaje = {
                tipo: "errorDeActividad",
                detalle: e.message
            };
            parent.postMessage(mensaje, window.location.origin);
        }
    };
    return ProductionErrorHandler;
})();
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "../habilidades/Animar.ts" />
/// <reference path = "../escenas/Errores.ts" />
/**
 * @class ActorAnimado
 *
 * Representa un actor que tiene una animación cuando se mueve.
 * Las opciones deben incluir la grilla (imagen) y la cantidad de cuadros que tiene,
 * ó bien la grilla y la lista de cuadros que representan la animación. También puede
 * incluir el cuadroEstatico, que es el cuadro que se muestra al estar parado.
 *
 * Por ejemplo:
 *      @example
 *      miActor = new ActorAnimado(0,0,...documentación en ptrogreso...);
 *      miActor.hacer_luego(CaminaDerecha,{pasos: 2});
 */
var ActorAnimado = (function (_super) {
    __extends(ActorAnimado, _super);
    function ActorAnimado(x, y, opciones) {
        if (opciones === void 0) { opciones = {}; }
        this.desPausar();
        this.sanitizarOpciones(opciones);
        _super.call(this, this.animacionPara(this.opciones.grilla || this.constructor._grilla), x, y);
        this.z = this.escena.minZ() - 1;
        this.setupAnimacion();
        this.objetosRecogidos = [];
        this.habilidadesSuspendidas = [];
        this.pilaAnimaciones = [];
    }
    ActorAnimado.imagenesPreCarga = function () {
        return this._grilla ? [this._grilla] : [];
    };
    ActorAnimado.prototype.pre_actualizar = function () {
        if (!this.pausado)
            _super.prototype.pre_actualizar.call(this);
    };
    ActorAnimado.prototype.pausar = function () {
        this.pausado = true;
    };
    ActorAnimado.prototype.desPausar = function () {
        this.pausado = false;
    };
    ActorAnimado.prototype.sanitizarOpciones = function (ops) {
        this.opciones = ops;
        this.opciones.cuadrosCorrer = ops.cuadrosCorrer || this.seguidillaHasta(ops.cantColumnas) || [0];
        this.opciones.cuadrosParado = ops.cuadrosParado || [0];
        this.opciones.cuadrosError = ops.cuadrosError || this.opciones.cuadrosParado;
        this.opciones.cantColumnas = ops.cantColumnas || this.opciones.cuadrosCorrer.length;
        this.opciones.cantFilas = ops.cantFilas || 1;
    };
    ActorAnimado.prototype.mover = function (x, y) {
        this.x += x;
        this.y += y;
        this.pasito_correr();
    };
    ActorAnimado.prototype.definirAnimacion = function (nombre, cuadros, velocidad, cargarla) {
        if (cargarla === void 0) { cargarla = false; }
        this._imagen.definir_animacion(nombre, cuadros, velocidad);
        if (cargarla)
            this.cargarAnimacion(nombre);
    };
    ActorAnimado.prototype.pasito_correr = function () {
        this.cargarAnimacion("correr");
        this._imagen.avanzar();
    };
    ActorAnimado.prototype.tocando = function (etiqueta) {
        var _this = this;
        return pilas.obtener_actores_con_etiqueta(etiqueta).some(function (objeto) { return objeto.colisiona_con(_this); });
    };
    ActorAnimado.prototype.objetoTocado = function (etiqueta) {
        var _this = this;
        return pilas.obtener_actores_con_etiqueta(etiqueta).filter(function (objeto) { return objeto.colisiona_con(_this); })[0];
    };
    ActorAnimado.prototype.hayAbajo = function () {
        return this.cuadricula.hayAbajo(this.casillaActual());
    };
    ActorAnimado.prototype.hayArriba = function () {
        return this.cuadricula.hayArriba(this.casillaActual());
    };
    ActorAnimado.prototype.hayDerecha = function () {
        return this.cuadricula.hayDerecha(this.casillaActual());
    };
    ActorAnimado.prototype.hayIzquierda = function () {
        return this.cuadricula.hayIzquierda(this.casillaActual());
    };
    ActorAnimado.prototype.tieneEnLaCasillaDeArriba = function (etiqueta) {
        if (this.hayArriba()) {
            return this.casillaActual().casillaDeArriba().tieneActorConEtiqueta(etiqueta);
        }
        else {
            throw new ActividadError("¡No hay nada para ver arriba!");
        }
    };
    ActorAnimado.prototype.tieneEnLaCasillaDeAbajo = function (etiqueta) {
        if (this.hayAbajo()) {
            return this.casillaActual().casillaDeAbajo().tieneActorConEtiqueta(etiqueta);
        }
        else {
            throw new ActividadError("¡No hay nada para ver abajo!");
        }
    };
    ActorAnimado.prototype.tieneEnLaCasillaASuIzquierda = function (etiqueta) {
        if (this.hayIzquierda()) {
            return this.casillaActual().casillaASuIzquierda().tieneActorConEtiqueta(etiqueta);
        }
        else {
            throw new ActividadError("¡No hay nada para ver a la izquierda!");
        }
    };
    ActorAnimado.prototype.tieneEnLaCasillaASuDerecha = function (etiqueta) {
        if (this.hayDerecha()) {
            return this.casillaActual().casillaASuDerecha().tieneActorConEtiqueta(etiqueta);
        }
        else {
            throw new ActividadError("¡No hay nada para ver a la derecha!");
        }
    };
    ActorAnimado.prototype.hayEnEscena = function (etiqueta) {
        return this.escena.contarActoresConEtiqueta(etiqueta) > 0;
    };
    ActorAnimado.prototype.tocandoFlechaAbajo = function () {
        if (this.alFinalDelCamino())
            throw new ActividadError("No se puede preguntar más, ya estoy al final del camino");
        return this.hayAbajo();
    };
    ActorAnimado.prototype.tocandoFlechaDerecha = function () {
        if (this.alFinalDelCamino())
            throw new ActividadError("No se puede preguntar más, ya estoy al final del camino");
        return this.hayDerecha();
    };
    ActorAnimado.prototype.alFinalDelCamino = function () {
        return !this.casillaActual().hayAbajo() && !this.casillaActual().hayDerecha();
    };
    ActorAnimado.prototype.estoyUltimaFila = function () {
        return this.cuadricula.cantFilas - 1 == this.casillaActual().nroFila;
    };
    ActorAnimado.prototype.cambiarImagen = function (nombre) {
        this.imagen = this.animacionPara(nombre);
    };
    ActorAnimado.prototype.animacionPara = function (nombre) {
        return pilas.imagenes.cargar_animacion(nombre, this.opciones.cantColumnas, this.opciones.cantFilas);
    };
    ActorAnimado.prototype.tocandoFin = function () {
        return this.casillaActual().casillaASuDerecha() == undefined;
        // return  pilas.escena_actual().cuadricula.tocandoFin(this)
        // cada cuadricula (multiple,esparsa,etc) implementa su tocandoFin de manera diferente
    };
    ActorAnimado.prototype.tocandoInicio = function () {
        return this.casillaActual().nroColumna == 0;
    };
    ActorAnimado.prototype.setupAnimacion = function () {
        this.definirAnimacion("correr", this.opciones.cuadrosCorrer, 5);
        this.definirAnimacion("parado", this.opciones.cuadrosParado, 5);
        this.definirAnimacion("error", this.opciones.cuadrosError, 5);
        this.animar();
        this.cargarAnimacion("parado");
    };
    ActorAnimado.prototype.detenerAnimacion = function () {
        this.olvidar(Animar);
    };
    ActorAnimado.prototype.animar = function () {
        this.aprender(Animar, {}); //Hace la magia de animar constantemente.
    };
    ActorAnimado.prototype.cargarAnimacion = function (nombre) {
        this._imagen.cargar_animacion(nombre);
    };
    /**
     * Permite cargar una animación recordando el nombre de la animación en curso.
     * Luego, se puede volver a la animación anterior mediante .restaurarAnimacionAnterior().
     */
    ActorAnimado.prototype.cargarAnimacionTemporalmente = function (nombre) {
        this.pilaAnimaciones.push(this._imagen.animacion_en_curso.nombre);
        this.cargarAnimacion(nombre);
    };
    /**
     * Vuelve a cargar la animación que estaba en curso la última vez que se ejecutó
     * .cargarAnimacionTemporalmente().
     */
    ActorAnimado.prototype.restaurarAnimacionAnterior = function () {
        if (this.pilaAnimaciones.length > 0) {
            this.cargarAnimacion(this.pilaAnimaciones.pop());
        }
    };
    ActorAnimado.prototype.avanzarAnimacion = function () {
        return !this._imagen.avanzar();
    };
    ActorAnimado.prototype.cantidadDeSprites = function () {
        return this._imagen.animacion_en_curso.cuadros.length;
    };
    ActorAnimado.prototype.nombreAnimacionActual = function () {
        return this._imagen.animacion_en_curso.nombre;
    };
    ActorAnimado.prototype.seguidillaHasta = function (nro) {
        var seguidilla = [];
        if (nro !== undefined) {
            for (var i = 0; i < nro; i++) {
                seguidilla.push(i);
            }
        }
        else {
            seguidilla.push(0);
        }
        return seguidilla;
    };
    ActorAnimado.prototype.clonar = function () {
        /*var clon =*/ return new this.constructor(this.x, this.y, this.opciones);
        /*for (var attr in this){
            if(typeof this[attr] != "function"){
                clon[attr] = this[attr];
            }
        }
        return clon;*/
    };
    Object.defineProperty(ActorAnimado.prototype, "escena", {
        get: function () {
            // Se asume que todos los actores animados están en la escena actual
            return pilas.escena_actual();
        },
        enumerable: true,
        configurable: true
    });
    //TODO poner en otra clase lo q tenga q ver con casillas
    ActorAnimado.prototype.casillaActual = function () {
        return this._casillaActual;
    };
    ActorAnimado.prototype.setCasillaActual = function (casillaNueva, moverseAhi) {
        if (moverseAhi === void 0) { moverseAhi = false; }
        if (this._casillaActual)
            this._casillaActual.eliminarActor(this);
        this._casillaActual = casillaNueva;
        casillaNueva.agregarActor(this);
        if (moverseAhi) {
            this.x = casillaNueva.x;
            this.y = casillaNueva.y;
        }
    };
    ActorAnimado.prototype.estaEnCasilla = function (nroFila, nroColumna) {
        return this.casillaActual().sos(nroFila, nroColumna);
    };
    ActorAnimado.prototype.largoColumnaActual = function () {
        return this.cuadricula.largoColumna(this.casillaActual().nroColumna);
    };
    ActorAnimado.prototype.cuando_busca_recoger = function () {
        this.escena.intentaronRecolectar();
    };
    ActorAnimado.prototype.recoger = function (a) {
        this.escena.intentaronRecolectar(a);
    };
    ActorAnimado.prototype.informarError = function (error) {
        this.hacer(Decir, { mensaje: error.message, nombreAnimacion: error.nombreAnimacion, autoEliminarGlobo: false });
    };
    // TODO: Esto debería estar en Estudiante, en pilasweb.
    ActorAnimado.prototype.eliminar_comportamientos = function () {
        this.comportamiento_actual = undefined;
        this.comportamientos = [];
    };
    ActorAnimado.prototype.colisiona_con = function (objeto) {
        if (this.cuadricula) {
            return this.cuadricula.colisionan(this, objeto);
        }
        else {
            return _super.prototype.colisiona_con.call(this, objeto);
        }
    };
    ActorAnimado.prototype.suspenderHabilidadesConMovimiento = function () {
        var _this = this;
        this.habilidadesSuspendidas = this.habilidadesSuspendidas.concat(this.habilidades.filter(function (hab) { return hab.implicaMovimiento(); }));
        this.habilidadesSuspendidas.forEach(function (hab) { return _this.olvidar(hab); });
    };
    ActorAnimado.prototype.activarHabilidadesConMovimiento = function () {
        this.habilidadesSuspendidas.forEach(function (hab) {
            hab.actualizarPosicion();
            this.aprender(hab);
        }.bind(this));
        this.habilidadesSuspendidas = [];
    };
    ActorAnimado.prototype.enviarAlFrente = function () {
        this.setZ(Math.min.apply(Math, this.escena.actores.map(function (act) { return act.getZ(); })) - 1);
    };
    ActorAnimado.prototype.lanzarActividadError = function (mensaje) {
        throw new ActividadError(mensaje);
    };
    return ActorAnimado;
})(Actor);
// Helper para construir las animaciones:
var Cuadros = (function () {
    function Cuadros(nroOLista) {
        this._lista = (typeof (nroOLista) === "number") ? [nroOLista] : nroOLista;
    }
    Cuadros.prototype.repetirVeces = function (veces) {
        var lOrig = this._lista;
        for (var i = 0; i < veces - 1; i++) {
            this._lista = this._lista.concat(lOrig);
        }
        return this._lista;
    };
    Cuadros.prototype.repetirRandom = function (veces) {
        return this.repetirVeces(Math.round(Math.random() * veces));
    };
    Cuadros.prototype.lista = function () {
        return this._lista;
    };
    return Cuadros;
})();
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "ActorAnimado.ts" />
var ActorCompuesto = (function (_super) {
    __extends(ActorCompuesto, _super);
    function ActorCompuesto(x, y, opciones) {
        opciones.grilla = 'invisible.png';
        _super.call(this, x, y, opciones);
        this.inicializarSubactores();
    }
    ActorCompuesto.prototype.sanitizarOpciones = function (opciones) {
        _super.prototype.sanitizarOpciones.call(this, opciones);
        if (!opciones.subactores)
            throw "Se debe especificar una lista de subactores";
        this.subactores = opciones.subactores;
    };
    ActorCompuesto.prototype.inicializarSubactores = function () {
        var _this = this;
        this.subactores.forEach(function (actor) { return _this.apegarActor(actor); });
    };
    ActorCompuesto.prototype.agregarSubactor = function (actor) {
        this.subactores.push(actor);
        this.apegarActor(actor);
    };
    ActorCompuesto.prototype.apegarActor = function (actor) {
        actor.agregar_habilidad(ImitarAtributosNumericos2, {
            objeto_a_imitar: this,
            conVariacionEntera: ['x', 'y'],
            conVariacionPorcentual: ['escala_x', 'escala_y'],
            setters: { 'x': 'setX', 'y': 'setY' },
        });
    };
    ActorCompuesto.prototype.eliminarUltimoSubactor = function () {
        this.subactores.pop().eliminar();
    };
    ActorCompuesto.prototype.eliminarSubactor = function (etiqueta) {
        var elQueMuere = this.subactores.filter(function (actor) { return actor.tiene_etiqueta(etiqueta); })[0];
        elQueMuere.eliminar();
        this.subactores.splice(this.subactores.indexOf(elQueMuere), 1);
    };
    ActorCompuesto.prototype.cantSubactores = function () {
        return this.subactores.length;
    };
    ActorCompuesto.prototype.tieneAlgoEnLaMano = function () {
        return this.cantSubactores() >= 2;
    };
    ActorCompuesto.prototype.tieneEnLaMano = function (etiqueta) {
        return this.subactores.some(function (actor) { return actor.tiene_etiqueta(etiqueta); });
    };
    ///////////////////////////////////////////////////////
    // A partir de acá son los métodos del composite polimórfico
    //////////////////////////////////////////////////////
    ActorCompuesto.prototype.eliminar = function () {
        _super.prototype.eliminar.call(this);
        this.subactores.forEach(function (actor) { return actor.eliminar(); });
    };
    ActorCompuesto.prototype.cargarAnimacion = function (nombre) {
        this.subactores.forEach(function (actor) { return actor.cargarAnimacion(nombre); });
    };
    ActorCompuesto.prototype.avanzarAnimacion = function () {
        var parar = false;
        this.subactores.forEach(function (actor) { return parar = parar || actor.avanzarAnimacion(); });
        return parar;
    };
    ActorCompuesto.prototype.nombreAnimacionActual = function () {
        return this.subactores[0].nombreAnimacionActual();
    };
    ActorCompuesto.prototype.detenerAnimacion = function () {
        this.subactores.forEach(function (actor) { return actor.detenerAnimacion(); });
    };
    ActorCompuesto.prototype.animar = function () {
        this.subactores.forEach(function (actor) { return actor.animar(); });
    };
    ActorCompuesto.prototype.getAncho = function () {
        return this.subactores[0].getAncho();
    };
    ActorCompuesto.prototype.getAlto = function () {
        return this.subactores[0].getAlto();
    };
    ActorCompuesto.prototype.colisiona_con = function (objeto) {
        return this.subactores[0].colisiona_con(objeto);
    };
    return ActorCompuesto;
})(ActorAnimado);
var ImitarAtributosNumericos2 = (function (_super) {
    __extends(ImitarAtributosNumericos2, _super);
    function ImitarAtributosNumericos2() {
        _super.apply(this, arguments);
    }
    ImitarAtributosNumericos2.prototype.implicaMovimiento = function () {
        return false;
    };
    return ImitarAtributosNumericos2;
})(ImitarAtributosNumericos);
/// <reference path="ActorAnimado.ts"/>
var AlienAnimado = (function (_super) {
    __extends(AlienAnimado, _super);
    function AlienAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'alienAnimado.png', cantColumnas: 14 });
        this.definirAnimacion("parado", new Cuadros(13).repetirVeces(50).concat([12, 13, 11, 12, 11, 13]).concat(new Cuadros(13).repetirVeces(30)).concat([9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]), 4, true);
        this.definirAnimacion("hablar", [12, 13, 11, 12, 11, 13], 15);
        this.definirAnimacion("recoger", [12, 10, 10, 12], 6);
        this.definirAnimacion("correr", [0, 1, 2, 3, 4, 3, 2, 1], 20);
        this.definirAnimacion("apretar", [12, 6, 5, 5, 5, 5, 5, 6, 12, 13], 6);
        this.definirAnimacion("SerAnimado", [0, 1, 2, 3, 4, 3, 2, 1], 20);
    }
    return AlienAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var AlimentoAnimado = (function (_super) {
    __extends(AlimentoAnimado, _super);
    function AlimentoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'alimento_pez.png', cantColumnas: 4, cantFilas: 1 });
        this.definirAnimacion("parado", new Cuadros(0).repetirRandom(30).concat([0, 1, 2, 3, 2, 1]), 12, true);
    }
    return AlimentoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var BananaAnimada = (function (_super) {
    __extends(BananaAnimada, _super);
    function BananaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'banana-1.png', cantColumnas: 1, cantFilas: 1 });
    }
    return BananaAnimada;
})(ActorAnimado);
var BotonAnimado = (function (_super) {
    __extends(BotonAnimado, _super);
    function BotonAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'botonAnimado.png', cantColumnas: 2 });
        this.definirAnimacion("apagada", [0], 1);
        this.definirAnimacion("prendida", [1], 1);
    }
    return BotonAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Bruja = (function (_super) {
    __extends(Bruja, _super);
    function Bruja(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'bruja.png', cantColumnas: 16 });
        this.definirAnimacion("bailando", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 6);
        this.definirAnimacion("parado", new Cuadros([0]).repetirVeces(30).concat([1, 5, 5, 5, 5, 1]), 6, true);
    }
    return Bruja;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var BuzoAnimado = (function (_super) {
    __extends(BuzoAnimado, _super);
    function BuzoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'buzo.png', cantColumnas: 8, cantFilas: 1 });
        this.definirAnimacion("parado", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1], 4, true);
        this.definirAnimacion("recoger", [3, 4, 5, 6, 7], 6);
        this.definirAnimacion("correr", [1, 0, 2, 1], 10);
    }
    return BuzoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var CaballeroAnimado = (function (_super) {
    __extends(CaballeroAnimado, _super);
    function CaballeroAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'caballero_oscuro.png', cantColumnas: 3 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(95).concat([1, 2, 1]), 6, true);
        this.definirAnimacion("defender", new Cuadros([0, 1, 2, 2, 2, 2, 1, 0]).repetirVeces(3).concat([0, 0, 1, 1]).concat(new Cuadros(2).repetirVeces(999)), 6);
    }
    return CaballeroAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var CangrejoAnimado = (function (_super) {
    __extends(CangrejoAnimado, _super);
    function CangrejoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'cangrejo.png', cantColumnas: 8, cantFilas: 3 });
        this.definirAnimacion("parado", [0, 1, 2, 3, 4, 5, 6, 7], 6, true);
        this.definirAnimacion("correr", [9, 10, 11, 12, 13], 12);
        this.definirAnimacion("recoger", [17, 18, 19, 20, 21, 21, 21, 19, 19], 6);
    }
    return CangrejoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var CarbonAnimado = (function (_super) {
    __extends(CarbonAnimado, _super);
    function CarbonAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'carbon_animado.png', cantColumnas: 3, cantFilas: 1 });
        this.definirAnimacion("quedan3", [0], 1);
        this.definirAnimacion("quedan2", [1], 1);
        this.definirAnimacion("quedan1", [2], 1);
        this.definirAnimacion("correr", [2], 1);
        this.definirAnimacion("parado", [2], 1);
    }
    return CarbonAnimado;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "../actores/Casilla.ts"/>
/**
 * class @Cuadricula
 *
 * Este actor sirve para dibujar una cuadrícula en pantalla, que
 * tenga casillas.
 *
 * Cada casilla tiene la misma grilla (y el cuadro que se muestre puede variar en cada una)
 * Las opciones del Actor cuadrícula son el 5to parámetro.
 * Las opciones del CADA CASILLA son el 6to parámetro. Estas opciones son exactamente
 * las mismas que para cualquier ActorAnimado.
 *
 * Hay varias maneras de crear la cuadrícula.
 *
 * Por ejemplo, si quiero crear una cuadrícula así:
 *     una banana (sprite de 2 cuadros), ubicada en 0,0, con 3 filas y 4 columnas,
 *     que ocupe toda la pantalla.
 * lo hago así:
 *     new Cuadricula(0,0,3,4,{}
 *           {grilla: 'banana.png',
 *           cantColumnas: 2})
 *
 * Si no se especifica ningún tipo de medida, se toma la de toda la pantalla.

 * Ahora, si quiero lo mismo pero con casillas de 50 x 100,
 * lo hago así:
 *     new Cuadricula(0,0,3,4,{}
 *           {grilla: 'banana.png',
 *           cantColumnas: 2,
 *           ancho: 50,
 *           alto: 100})
 *
 * Otro ejemplo, si quiero crear una cuadrícula igual que las anteriores,
 * pero definiendo el ancho y alto totales de la cuadrícula
 *     (y no de cada casilla) como de 300 x 300
 * lo hago así:
 *     new Cuadricula(0,0,3,4,
 *           {ancho: 300,
 *           alto: 300},
 *           {grilla: 'banana.png',
 *           cantColumnas: 2})
 *
 * Nótese que esta vez las opciones que se eligieron son las de la cuadrícula, y
 * no las de la casilla.
 *
 * Por último, en lugar de especificar el ancho y el alto de las casillas,
 * se puede indicar una relación de aspecto deseada para las casillas.
 * Debe ser un número que indique el cociente anchoCasilla/altoCasilla deseado.
 * Por ejemplo, para crear una cuadrícula con casillas cuadradas de a lo sumo
 * 300 píxeles de ancho y 300 píxeles de alto:
 *     new Cuadricula(0,0,3,4,
 *           {ancho: 300,
 *           alto: 300},
 *           {grilla: 'banana.png',
 *           cantColumnas: 2,
 *           relAspecto: 1})
 *
 * IMPORTANTE:
 *   No usar cuadricula.ancho = 300 para cambiar el ancho de la cuadrícula.
 *   Usar en vez de ello cuadricula.setAncho(300);
 *   Idem con el alto.
 *   Aunque claro que lo mejor es crearla directamente con las opciones.
 */
var Cuadricula = (function (_super) {
    __extends(Cuadricula, _super);
    function Cuadricula(x, y, cantFilas, cantColumnas, opcionesCuadricula, opcionesCasilla) {
        this.cantFilas = cantFilas;
        this.cantColumnas = cantColumnas;
        this.sanitizarOpciones(opcionesCuadricula, opcionesCasilla);
        _super.call(this, this.opcionesCuadricula.imagen, x, y, opcionesCuadricula);
        this.ancho = this.cantColumnas * opcionesCasilla.ancho + (this.separacion() * (this.cantColumnas - 1));
        this.alto = this.cantFilas * opcionesCasilla.alto + (this.separacion() * (this.cantFilas - 1));
        this.crearCasillas();
    }
    //TODO: Podría agregar que tome las dimensiones de la
    //imagen como último valor de ancho y alto por defecto
    Cuadricula.prototype.sanitizarOpciones = function (opcionesCuadricula, opcionesCasilla) {
        this.opcionesCasilla = opcionesCasilla;
        this.opcionesCuadricula = opcionesCuadricula;
        this.opcionesCuadricula.imagen = this.opcionesCuadricula.imagen || 'invisible.png';
        this.opcionesCuadricula.ancho = this.opcionesCuadricula.ancho || pilas.opciones.ancho;
        this.opcionesCuadricula.alto = this.opcionesCuadricula.alto || pilas.opciones.alto;
        this.opcionesCuadricula.separacionEntreCasillas = this.opcionesCuadricula.separacionEntreCasillas || 0;
        if (this.opcionesCasilla.relAspecto) {
            this.opcionesCasilla.ancho = this.opcionesCasilla.ancho || this.calcularAnchoCasillaConRelAspecto(this.opcionesCasilla.relAspecto, this.opcionesCuadricula.ancho, this.opcionesCuadricula.alto);
            this.opcionesCasilla.alto = this.opcionesCasilla.alto || this.calcularAltoCasillaConRelAspecto(this.opcionesCasilla.relAspecto, this.opcionesCuadricula.ancho, this.opcionesCuadricula.alto);
        }
        else {
            this.opcionesCasilla.ancho = this.opcionesCasilla.ancho || this.calcularAnchoCasilla(this.opcionesCuadricula.ancho);
            this.opcionesCasilla.alto = this.opcionesCasilla.alto || this.calcularAltoCasilla(this.opcionesCuadricula.alto);
        }
    };
    Cuadricula.prototype.separacion = function () {
        return this.opcionesCuadricula.separacionEntreCasillas;
    };
    Cuadricula.prototype.reubicarCasillas = function () {
        this.forEachCasilla(function (casilla) { casilla.reubicate(); });
    };
    Cuadricula.prototype.setX = function (x) {
        _super.prototype.setX.call(this, x);
        this.reubicarCasillas();
    };
    Cuadricula.prototype.setY = function (y) {
        _super.prototype.setY.call(this, y);
        this.reubicarCasillas();
    };
    Cuadricula.prototype.setAncho = function (nuevo) {
        this.ancho = nuevo;
        this.opcionesCasilla.ancho = this.calcularAnchoCasilla(nuevo);
        this.reubicarCasillas();
    };
    Cuadricula.prototype.calcularAnchoCasilla = function (anchoCuad) {
        // anchoCuad = cols * anchoCas + ((cols-1) * separacion)
        // anchoCuad - ((cols-1) * separacion) = cols * anchoCas
        // anchoCas = (anchoCuad - ((cols-1) * separacion)) / cols
        // anchoCas = anchoCuad / cols - ((cols-1) * separacion) / cols
        return anchoCuad / this.cantColumnas -
            (((this.cantColumnas - 1) * this.separacion()) / this.cantColumnas);
    };
    Cuadricula.prototype.setAlto = function (nuevo) {
        this.alto = nuevo;
        this.opcionesCasilla.alto = this.calcularAltoCasilla(nuevo);
        this.reubicarCasillas();
    };
    Cuadricula.prototype.calcularAltoCasilla = function (altoCuad) {
        return altoCuad / this.cantFilas -
            (((this.cantFilas - 1) * this.separacion()) / this.cantFilas);
    };
    Cuadricula.prototype.calcularAnchoCasillaConRelAspecto = function (relAspecto, anchoCuad, altoCuad) {
        return Math.min(this.calcularAnchoCasilla(anchoCuad), this.calcularAltoCasilla(altoCuad) * relAspecto);
    };
    Cuadricula.prototype.calcularAltoCasillaConRelAspecto = function (relAspecto, anchoCuad, altoCuad) {
        return Math.min(this.calcularAltoCasilla(altoCuad), this.calcularAnchoCasilla(anchoCuad) / relAspecto);
    };
    Cuadricula.prototype.forEachFila = function (func) {
        for (var nroFila = 0; nroFila < this.cantFilas; nroFila++) {
            func(nroFila);
        }
    };
    Cuadricula.prototype.forEachCol = function (func) {
        for (var nroCol = 0; nroCol < this.cantColumnas; nroCol++) {
            func(nroCol);
        }
    };
    Cuadricula.prototype.forEachFilaCol = function (func) {
        var _this = this;
        this.forEachFila(function (nroFila) {
            return _this.forEachCol(function (nroCol) {
                return func(nroFila, nroCol);
            });
        });
    };
    /**
     * Itera sobre todas las casillas de la cuadrícula y aplica la función
     * recibida por parámetro. Las casillas se recorren *ordenadamente*,
     * de izquierda a derecha y de arriba hacia abajo.
     * @param func Función que se aplica a cada casilla. Recibe hasta
     * dos parámetros: la casilla sobre la que se está iterando y un
     * índice que se incrementa con cada casilla.
     */
    Cuadricula.prototype.forEachCasilla = function (func) {
        var _this = this;
        var i = 0;
        this.forEachFilaCol(function (nroFila, nroCol) {
            if (_this.casilla(nroFila, nroCol) !== undefined) {
                func(_this.casilla(nroFila, nroCol), i);
                i += 1;
            }
        });
    };
    Cuadricula.prototype.filterCasillas = function (pred) {
        var cumplen = [];
        this.forEachCasilla(function (casilla) {
            if (pred(casilla)) {
                cumplen.push(casilla);
            }
        });
        return cumplen;
    };
    Cuadricula.prototype.crearCasillas = function () {
        var _this = this;
        this.casillas = new Array();
        this.forEachFilaCol(function (fila, col) {
            return _this.agregarCasilla(fila, col);
        });
    };
    Cuadricula.prototype.agregarCasilla = function (fila, col) {
        if (this.casillas[fila] === undefined) {
            this.casillas[fila] = new Array();
        }
        this.casillas[fila][col] = new Casilla(fila, col, this);
    };
    Cuadricula.prototype.reemplazarCasilla = function (casillaVieja, casillaNueva) {
        this.casillas[casillaVieja.nroFila][casillaVieja.nroCol] = casillaNueva;
    };
    Cuadricula.prototype.agregarActor = function (actor, nroF, nroC, escalarACasilla) {
        if (escalarACasilla === void 0) { escalarACasilla = true; }
        this.agregarActorEnCasilla(actor, this.casilla(nroF, nroC), escalarACasilla);
    };
    Cuadricula.prototype.agregarActorEnCasilla = function (actor, casilla, escalarACasilla) {
        if (escalarACasilla === void 0) { escalarACasilla = true; }
        actor.cuadricula = this;
        if (escalarACasilla) {
            actor.escalarProporcionalALimites(this.anchoCasilla() - 5, this.altoCasilla() - 5);
        }
        actor.setCasillaActual(casilla, true);
    };
    Cuadricula.prototype.agregarActorEnProximaCasillaLibre = function (actor, escalarACasilla) {
        if (escalarACasilla === void 0) { escalarACasilla = true; }
        var casillaDestino = this.proximaCasillaLibre();
        if (casillaDestino) {
            this.agregarActorEnCasilla(actor, this.proximaCasillaLibre(), escalarACasilla);
        }
        else {
            throw Error("Ya no quedan casillas libres");
        }
    };
    Cuadricula.prototype.agregarActorEnPerspectiva = function (actor, nroF, nroC, escalarACasilla) {
        if (escalarACasilla === void 0) { escalarACasilla = true; }
        this.agregarActor(actor, nroF, nroC, false);
        if (escalarACasilla) {
            actor.escalarAAncho(actor.casillaActual().ancho * 0.95);
        }
        actor.abajo = actor.casillaActual().abajo + (0.4 * this.altoCasilla());
    };
    Cuadricula.prototype.altoCasilla = function () {
        return this.opcionesCasilla.alto;
    };
    Cuadricula.prototype.anchoCasilla = function () {
        return this.opcionesCasilla.ancho;
    };
    Cuadricula.prototype.getOpcionesCasilla = function () {
        return this.opcionesCasilla;
    };
    /**
     * Devuelve la casilla de la cuadrícula ubicada en la posición (nroF, nroC).
     * Si tal casilla no existe, devuelve undefined.
     */
    Cuadricula.prototype.casilla = function (nroF, nroC) {
        if (this.casillas[nroF] !== undefined) {
            return this.casillas[nroF][nroC];
        }
        else {
            return undefined;
        }
    };
    Cuadricula.prototype.proximaCasillaLibre = function () {
        return this.filterCasillas(function (casilla) { return casilla.estaLibre(); })[0];
    };
    Cuadricula.prototype.esFin = function (casilla) {
        return this.cantFilas == 1 && casilla.sos(0, this.cantColumnas - 1) ||
            this.cantColumnas == 1 && casilla.sos(this.cantFilas - 1, 0);
    };
    Cuadricula.prototype.esInicio = function (casilla) {
        return casilla.sos(0, 0);
    };
    Cuadricula.prototype.colisionan = function (objeto1, objeto2) {
        return (objeto1.casillaActual() == objeto2.casillaActual());
    };
    Cuadricula.prototype.hayArriba = function (casilla) {
        return !(casilla.sos(0, null));
    };
    Cuadricula.prototype.hayAbajo = function (casilla) {
        return !(casilla.sos(this.cantFilas - 1, null));
    };
    Cuadricula.prototype.hayIzquierda = function (casilla) {
        return !(casilla.sos(null, 0));
    };
    Cuadricula.prototype.hayDerecha = function (casilla) {
        return !(casilla.sos(null, this.cantColumnas - 1));
    };
    Cuadricula.prototype.cantidadCasillas = function () {
        var cant = 0;
        this.forEachCasilla(function (casilla) { return cant += 1; });
        return cant;
    };
    return Cuadricula;
})(Actor);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ActorAnimado.ts"/>
/// <reference path = "Cuadricula.ts"/>
/**
 * @class Casilla
 * Este actor no puede funcionar sólo. Siempre funciona y es creado desde
 * el actor Cuadricula. Todo su comportamiento depende de ella.
 */
var Casilla = (function (_super) {
    __extends(Casilla, _super);
    function Casilla(nroF, nroC, cuadricula) {
        this.cuadricula = cuadricula;
        this.nroFila = nroF;
        this.nroColumna = nroC;
        this.actores = [];
        var opciones = cuadricula.getOpcionesCasilla();
        if (opciones.bordesDecorados) {
            opciones.cuadrosParado = [this.cuadroSegunPosicion()];
            opciones.cuadrosCorrer = opciones.cuadrosParado;
        }
        _super.call(this, 0, 0, opciones);
        this.reubicate();
    }
    Casilla.imagenesPara = function (actor) {
        return [("casillas." + actor + ".png")];
    };
    Casilla.imagenesPreCarga = function () {
        //Como las casillas dependen del actor, se debería usar imagenesPara(actor) para obtener las imágenes.
        throw "Casilla.imagenesPreCarga() is useless. Should use Casilla.imagenesPara(actor)";
    };
    Casilla.prototype.reubicate = function () {
        this.actualizarAncho();
        this.actualizarAlto();
        this.reubicarEnX();
        this.reubicarEnY();
    };
    Casilla.prototype.reubicarEnX = function () {
        this.x =
            this.cuadricula.izquierda +
                (this.ancho / 2) +
                (this.nroColumna * (this.ancho + this.cuadricula.separacion()));
    };
    Casilla.prototype.reubicarEnY = function () {
        this.y =
            this.cuadricula.arriba -
                (this.alto / 2) -
                (this.nroFila * (this.alto + this.cuadricula.separacion()));
    };
    Casilla.prototype.actualizarAncho = function () {
        this.ancho = this.cuadricula.anchoCasilla();
    };
    Casilla.prototype.actualizarAlto = function () {
        this.alto = this.cuadricula.altoCasilla();
    };
    Casilla.prototype.casillaASuDerecha = function () {
        return this.cuadricula.casilla(this.nroFila, this.nroColumna + 1);
    };
    Casilla.prototype.casillaASuIzquierda = function () {
        return this.cuadricula.casilla(this.nroFila, this.nroColumna - 1);
    };
    Casilla.prototype.casillaDeArriba = function () {
        return this.cuadricula.casilla(this.nroFila - 1, this.nroColumna);
    };
    Casilla.prototype.casillaDeAbajo = function () {
        return this.cuadricula.casilla(this.nroFila + 1, this.nroColumna);
    };
    Casilla.prototype.casillaTodoADerecha = function () {
        return this.cuadricula.casilla(this.nroFila, this.cuadricula.cantColumnas - 1);
    };
    Casilla.prototype.casillaTodoAIzquierda = function () {
        return this.cuadricula.casilla(this.nroFila, 0);
    };
    Casilla.prototype.casillaTodoArriba = function () {
        return this.cuadricula.casilla(0, this.nroColumna);
    };
    Casilla.prototype.casillaTodoAbajo = function () {
        return this.cuadricula.casilla(this.cuadricula.cantFilas - 1, this.nroColumna);
    };
    Casilla.prototype.hayArriba = function () {
        return this.cuadricula.hayArriba(this);
    };
    Casilla.prototype.hayAbajo = function () {
        return this.cuadricula.hayAbajo(this);
    };
    Casilla.prototype.hayIzquierda = function () {
        return this.cuadricula.hayIzquierda(this);
    };
    Casilla.prototype.hayDerecha = function () {
        return this.cuadricula.hayDerecha(this);
    };
    Casilla.prototype.sos = function (nroF, nroC) {
        return (nroF === null || nroF === this.nroFila) &&
            (nroC === null || nroC === this.nroColumna);
    };
    Casilla.prototype.esEsquina = function () {
        return this.sos(0, 0) ||
            this.sos(0, this.cuadricula.cantColumnas - 1) ||
            this.sos(this.cuadricula.cantFilas - 1, 0) ||
            this.sos(this.cuadricula.cantFilas - 1, this.cuadricula.cantColumnas - 1);
    };
    Casilla.prototype.esFin = function () {
        return this.cuadricula.esFin(this);
    };
    Casilla.prototype.esInicio = function () {
        return this.cuadricula.esInicio(this);
    };
    // Este método sólo genera una referencia entre la casilla y el actor.
    // Si quiero generar la relación bidireccional no debo usar este, sino actor.setCasillaActual(c).
    Casilla.prototype.agregarActor = function (unActor) {
        this.actores.push(unActor);
    };
    Casilla.prototype.eliminarActor = function (unActor) {
        this.actores.splice(this.actores.indexOf(unActor), 1);
    };
    Casilla.prototype.estaLibre = function () {
        return this.actores.length == 0;
    };
    Casilla.prototype.tieneActorConEtiqueta = function (unaEtq) {
        return this.actores.some(function (actor) { return actor.tiene_etiqueta(unaEtq); });
    };
    Casilla.prototype.actoresConEtiqueta = function (unaEtq) {
        return this.actores.filter(function (actor) { return actor.tiene_etiqueta(unaEtq); });
    };
    Casilla.prototype.cuadroSegunPosicion = function () {
        return 8 * Number(!this.hayArriba())
            + 4 * Number(!this.hayIzquierda())
            + 2 * Number(!this.hayAbajo())
            + Number(!this.hayDerecha());
    };
    Casilla.prototype.cambiarImagen = function (nombre, cantFilas, cantColumnas) {
        if (cantFilas === void 0) { cantFilas = 1; }
        if (cantColumnas === void 0) { cantColumnas = 1; }
        // PARCHEEEEE
        this.renacer(nombre, cantFilas, cantColumnas);
    };
    Casilla.prototype.renacer = function (nombreImagen, cantFilas, cantColumnas) {
        if (cantFilas === void 0) { cantFilas = 1; }
        if (cantColumnas === void 0) { cantColumnas = 1; }
        // POR FAVOR YO FUTURO PERDONAME
        this.eliminar();
        var opsCasilla = {
            grilla: this.cuadricula.opcionesCasilla.grilla,
            cantFilas: this.cuadricula.opcionesCasilla.cantFilas,
            cantColumnas: this.cuadricula.opcionesCasilla.cantColumnas,
        };
        this.cuadricula.opcionesCasilla.grilla = nombreImagen;
        this.cuadricula.opcionesCasilla.cantFilas = cantFilas;
        this.cuadricula.opcionesCasilla.cantColumnas = cantColumnas;
        var nuevoYo = new Casilla(this.nroFila, this.nroColumna, this.cuadricula);
        this.cuadricula.opcionesCasilla.grilla = opsCasilla.grilla;
        this.cuadricula.opcionesCasilla.cantFilas = opsCasilla.cantFilas;
        this.cuadricula.opcionesCasilla.cantColumnas = opsCasilla.cantColumnas;
        this.cuadricula.reemplazarCasilla(this, nuevoYo);
    };
    return Casilla;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var CofreAnimado = (function (_super) {
    __extends(CofreAnimado, _super);
    function CofreAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'cofreAnimado.png', cantColumnas: 4 });
        this.definirAnimacion("abrir", new Cuadros([0, 1, 2]).repetirVeces(1).concat(new Cuadros(3).repetirVeces(999)), 3);
        this.definirAnimacion("parado", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], 1, true);
        this.definirAnimacion("abierto", [3], 4);
    }
    return CofreAnimado;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path="../../src/actores/ActorAnimado.ts"/>
var Colisionable = (function () {
    function Colisionable() {
    }
    Colisionable.prototype.teEstoyPorColisionar = function (actor) {
        this.comportamientosAlColisionar().forEach(function (comportamiento) { return actor.hacer_luego(comportamiento); });
    };
    return Colisionable;
})();
/// <reference path="ActorAnimado.ts"/>
var CompuAnimada = (function (_super) {
    __extends(CompuAnimada, _super);
    function CompuAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'compu_animada.png', cantColumnas: 8, cantFilas: 1 });
        this._yaFuePrendida = false;
        this.definirAnimacion("parado", [0], 5, true);
        this.definirAnimacion("prendida", [1], 5);
        this.definirAnimacion("claveok", [2], 5);
        this.definirAnimacion("instalando", [3, 4, 5, 6, 7], 6);
        this.definirAnimacion("yaInstalado", [7], 1);
    }
    CompuAnimada.prototype.cargarAnimacion = function (nombre) {
        _super.prototype.cargarAnimacion.call(this, nombre);
        if (nombre === "prendida") {
            this._yaFuePrendida = true;
        }
    };
    /**
     * Indica si la computadora fue alguna vez prendida.
     */
    CompuAnimada.prototype.yaFuePrendida = function () {
        return this._yaFuePrendida;
    };
    /**
     * indica si la computadora se encuentra apagada.
     */
    CompuAnimada.prototype.estaApagada = function () {
        return this.nombreAnimacionActual() == "parado";
    };
    return CompuAnimada;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/**
 * @class ComportamientoAnimado
 * Esta clase está pensada para ser usada de superclase,
 * si es que se desea construir un comportamiento que se anime.
 *
 * @example
 * Puede usarse directamente de esta manera:
 *      actor.hacer_luego(ComportamientoAnimado,{nombreAnimacion: 'correr'});
 * De esta manera el actor se animará sin hacer nada.
 *
 * @example
 * Otra manera de usarlo es así:
 *      actor.hacer_luego(Explotar);
 *
 * Donde Explotar es una subclase y tiene definidos los siguientes métodos:
 *      nombreAnimacion(){
 *			return 'explosion'
 *		};
 *      postAnimacion(){
 *			this.receptor.eliminar();
 *		}
 *
 * @example
 * Otra manera de usarlo es independientemente de la animación
 * (Para decidir uno cuándo termina el comportamiento)
 *      actor.hacer_luego(MoverEnX,{destino: 50});
 *
 * Donde MoverEnX es subclase de ComportamientoAnimado y define:
 * 		nombreAnimacion(){
 *			return 'correr';
 *		};
 *		doActualizar(){
 *			super.doActualizar();
 *			this.receptor.x = this.receptor.x + 1;
 *			if (this.receptor.x = this.argumentos.destino){
 *				return true;
 *			}
 *		}
 * Mientras, la animación se ejecuta en un loop hasta que doActualizar devuelve true.
 */
var ComportamientoAnimado = (function (_super) {
    __extends(ComportamientoAnimado, _super);
    function ComportamientoAnimado() {
        _super.apply(this, arguments);
    }
    ComportamientoAnimado.prototype.iniciar = function (receptor) {
        var _this = this;
        _super.prototype.iniciar.call(this, receptor);
        this.sanitizarArgumentos();
        this.configurarVerificaciones();
        this.secuenciaActualizar = [
            function () { _this.configuracionInicial(); _this.preAnimacion(); return true; },
            function () { return _this.doActualizar(); },
            function () { _this.configuracionFinal(); _this.postAnimacion(); return true; }
        ];
    };
    ComportamientoAnimado.prototype.sanitizarArgumentos = function () {
        this.receptor = this.argumentos.receptor || this.receptor;
        this.hayQueAnimar = this.argumentos.hayQueAnimar !== false;
        this.verificacionesPre = this.argumentos.verificacionesPre || [];
        this.verificacionesPost = this.argumentos.verificacionesPost || [];
    };
    /** No se recomienda redefinir. Redefinir en su lugar el doActualizar */
    ComportamientoAnimado.prototype.actualizar = function () {
        if (this.secuenciaActualizar.length > 0) {
            if (this.secuenciaActualizar[0]()) {
                this.secuenciaActualizar.shift();
            }
        }
        else {
            return true;
        }
    };
    ComportamientoAnimado.prototype.configuracionInicial = function () {
        this.realizarVerificacionesPreAnimacion();
        this.receptor.detenerAnimacion(); // Porque hace quilombo
        this.animacionAnterior = this.receptor.nombreAnimacionActual();
        if (this.hayQueAnimar)
            this.receptor.cargarAnimacion(this.nombreAnimacion());
    };
    ComportamientoAnimado.prototype.configuracionFinal = function () {
        this.receptor.animar();
        this.receptor.cargarAnimacion(this.nombreAnimacionSiguiente());
        this.realizarVerificacionesPostAnimacion();
    };
    ComportamientoAnimado.prototype.realizarVerificacionesPreAnimacion = function () {
        this.verificacionesPre.forEach(function (verificacion) {
            verificacion.verificar();
        });
        if (this.argumentos.idTransicion) {
            // Si la transición que se intenta realizar no es válida, explota acá
            this.receptor.escena.estado.realizarTransicion(this.argumentos.idTransicion);
        }
    };
    ComportamientoAnimado.prototype.realizarVerificacionesPostAnimacion = function () {
        this.verificacionesPost.forEach(function (verificacion) { return verificacion.verificar(); });
    };
    /* Redefinir si corresponde animar el comportamiento. */
    ComportamientoAnimado.prototype.nombreAnimacion = function () {
        return this.argumentos.nombreAnimacion || this.nombreAnimacionParado();
    };
    /* Redefinir si corresponde */
    ComportamientoAnimado.prototype.nombreAnimacionParado = function () {
        return this.argumentos.nombreAnimacionParado || 'parado';
    };
    /* Redefinir si corresponde */
    ComportamientoAnimado.prototype.nombreAnimacionSiguiente = function () {
        return this.argumentos.nombreAnimacionSiguiente || this.animacionAnterior;
    };
    /* Redefinir si corresponde */
    ComportamientoAnimado.prototype.configurarVerificaciones = function () {
        // son varios llamados a verificacionesPre.push
        // y a verificacionesPost.push
    };
    /* Redefinir si corresponde */
    ComportamientoAnimado.prototype.preAnimacion = function () {
    };
    /* Redefinir si corresponde */
    ComportamientoAnimado.prototype.postAnimacion = function () {
    };
    /** Redefinir si es necesario.
     *  Redefinir sólo este, no el actualizar original.
     *  Es lo que hace efectivamente el comportamiento, además de animar.
     *  Debe retornar true cuando corresponda terminar el comportamiento.
     *  Por defecto termina cuando termina la animación.
     *  Al redefinir siempre debe llamarse a super */
    ComportamientoAnimado.prototype.doActualizar = function () {
        return this.receptor.avanzarAnimacion();
    };
    return ComportamientoAnimado;
})(Comportamiento);
var Verificacion = (function () {
    function Verificacion(condicionEjecucion, mensajeError, nombreAnimacion) {
        this.condicionEjecucion = condicionEjecucion;
        this.mensajeError = mensajeError;
        this.nombreAnimacion = nombreAnimacion;
    }
    Verificacion.prototype.seCumple = function () {
        return this.condicionEjecucion();
    };
    Verificacion.prototype.verificar = function () {
        if (!this.seCumple()) {
            throw new ActividadError(this.mensajeError, this.nombreAnimacion);
        }
    };
    return Verificacion;
})();
var ArgumentError = (function () {
    function ArgumentError(description) {
        this.name = "ArgumentError";
        this.message = description;
    }
    ArgumentError.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };
    return ArgumentError;
})();
/// <reference path = "ComportamientoAnimado.ts"/>
/**
 * @class ComportamientoConVelocidad
 *
 * Argumentos:
 *    velocidad: Es un porcentaje. 100 significa lo más rápido. Debe ser 1 ó más.
 *               Representa la cantidad de ciclos que efectivamente se ejecutan.
 *    cantPasos: Mayor cantidad de pasos implica mayor "definicion" del movimiento.
 *               Tambien tarda mas en completarse. Jugar tambien con la velocidad.
 *               Como esto juega con la animacion, es preferible no tocarlo.
 */
var ComportamientoConVelocidad = (function (_super) {
    __extends(ComportamientoConVelocidad, _super);
    function ComportamientoConVelocidad() {
        _super.apply(this, arguments);
    }
    ComportamientoConVelocidad.prototype.preAnimacion = function () {
        _super.prototype.preAnimacion.call(this);
        this.argumentos.cantPasos = this.argumentos.cantPasos || 10;
        this.argumentos.velocidad = (ComportamientoConVelocidad.modoTurbo) ? 100 : this.argumentos.velocidad || 20;
        this.argumentos.deboCortarAnimaciones = ComportamientoConVelocidad.modoTurbo || this.argumentos.deboCortarAnimaciones;
        this.vueltasSinEjecutar = 0;
        this.enQueVueltaEjecuto = Math.round(100 / this.velocidad());
        this._pasosRestantes = this.argumentos.cantPasos;
    };
    ComportamientoConVelocidad.prototype.velocidad = function () {
        return this.argumentos.velocidad;
    };
    ComportamientoConVelocidad.prototype.deboCortarAnimacion = function () {
        return this.argumentos.deboCortarAnimaciones;
    };
    ComportamientoConVelocidad.prototype.pasosRestantes = function () {
        return this._pasosRestantes;
    };
    ComportamientoConVelocidad.prototype.doActualizar = function () {
        var terminoAnimacion = _super.prototype.doActualizar.call(this);
        if (this.pasosRestantes() <= 0) {
            this.setearEstadoFinalDeseado();
            return this.deboCortarAnimacion() || terminoAnimacion;
        }
        else if (this.deboEjecutar()) {
            this.darUnPaso();
            this._pasosRestantes -= 1;
        }
    };
    ComportamientoConVelocidad.prototype.deboEjecutar = function () {
        if (this.vueltasSinEjecutar + 1 == this.enQueVueltaEjecuto) {
            this.vueltasSinEjecutar = 0;
            return true;
        }
        else {
            this.vueltasSinEjecutar += 1;
            return false;
        }
    };
    ComportamientoConVelocidad.prototype.darUnPaso = function () {
        // Debe redefinirse. Es el comportamiento a realizar en cada tick.
    };
    ComportamientoConVelocidad.prototype.setearEstadoFinalDeseado = function () {
        // Debe redefinirse. Sirve para asegurar que al terminar los pasos se llegue al estado deseado
        // Por ejemplo, si me estoy moviendo a un lugar, setear ese lugar evita problemas de aproximación parcial.
    };
    ComportamientoConVelocidad.modoTurbo = false;
    return ComportamientoConVelocidad;
})(ComportamientoAnimado);
var Direct = (function () {
    function Direct(origin, destiny) {
        if (destiny === void 0) { destiny = undefined; }
        if (!origin && origin !== 0)
            throw new Error("Origin of versor or degrees must be provided.");
        if (destiny === undefined) {
            var angle = origin * Math.PI / 180;
            this.versor = { x: Math.cos(angle), y: Math.sin(angle) };
        }
        else if (!origin.x && origin.x !== 0) {
            this.versor = Direct.versorFor({ x: origin, y: destiny });
        }
        else {
            this.versor = Direct.versorFor({ x: destiny.x - origin.x, y: destiny.y - origin.y });
        }
    }
    Direct.versorFor = function (vector) {
        var norm = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        if (norm > 0) {
            return { x: vector.x / norm, y: vector.y / norm };
        }
        else {
            return { x: 0, y: 0 };
        }
    };
    Direct.prototype.destinyFrom = function (point, distance) {
        return { x: point.x + (this.versor.x * distance),
            y: point.y + (this.versor.y * distance) };
    };
    Direct.prototype.isNull = function () {
        return this.versor.x == 0 && this.versor.y == 0;
    };
    Direct.prototype.inverse = function () {
        return new Direct(this.versor.x * -1, this.versor.y * -1);
    };
    Direct.prototype.equals = function (other) {
        return this.isNull() || other.isNull() || this.versor.x == other.versor.x && this.versor.y == other.versor.y;
    };
    Direct.prototype.isParallelTo = function (other) {
        return this.equals(other) || this.equals(other.inverse());
    };
    return Direct;
})();
/**
 *  Possible arguments for construction:
 *    - You can provide distance (a number) and direction (an instance of Direct), or:
 *    - Tou can provide an origin and a destiny (two objects with x and y)
 *    - You can just provide the destiny, which in fact will be taken as a vector starting at (0,0).
 */
/*
class TranslationVector {
    x: number;
    y: number;
    finalValues;
    args;

    constructor(args){
        this.args = args;
        this.finalValues = {};
        this.sanitizeArgs();
        this.x = this.finalValues.destiny.x;
        this.y = this.finalValues.destiny.y;
    }
    sanitizeArgs(){
        this.finalValues.origin = this.args.origin || {x:0,y:0};
        this.finalValues.distance = this.args.distance === 0 ? 0 : this.args.distance || this.getDistance();
        if (Array.isArray(this.args.direction) && this.args.direction.length === 2) {
            this.args.direction = new Direct(this.args.direction[0], this.args.direction[1]);
        }
        if (this.args.direction !== undefined && !(this.args.direction instanceof Direct)) throw new Error("Direction should come as an instance of Direct");
        this.finalValues.direction = this.args.direction || this.getDirection();
        this.finalValues.destiny = this.args.destiny || this.getDestiny();
    }

    getDistance(){
        if (!this.args.destiny) throw new Error("Distance or destiny missing");
        return pilas.utils.distancia_entre_dos_puntos(this.args.origin, this.args.destiny);
    }

    getDirection(){
        if (!this.args.destiny) throw new Error("Direction or destiny missing");
        return new Direct(this.args.origin, this.args.destiny);
    }

    getDestiny(){
        return this.args.direction.destinyFrom(this.args.origin, this.args.distance);
    }
}
*/ 
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ComportamientoConVelocidad.ts"/>
/// <reference path = "../Direct.ts"/>
/**
 * @class MovimientoAnimado
 *
 * Argumentos:
 *    distancia: la distancia deseada de recorrer
 *    destino: alternativamente se puede proveer un objeto con x e y, que es el destino.
 *       NOTA: Si se proveen ambos distancia y destino, deben concordar, sino no se
 *              garantiza el comportamiento correcto del Movimiento.
 *    direccion: Sino, se puede proveer una direccion de movimiento. (instancia de Direc)
 *    velocidad: Es un porcentaje. 100 significa lo más rápido. Debe ser 1 ó más.
 *               Representa la cantidad de ciclos que efectivamente se ejecutan.
 *    cantPasos: Mayor cantidad de pasos implica mayor "definicion" del movimiento.
 *               Tambien tarda mas en completarse. Jugar tambien con la velocidad.
 *               Como esto juega con la animacion, es preferible no tocarlo.
 */
var MovimientoAnimado = (function (_super) {
    __extends(MovimientoAnimado, _super);
    function MovimientoAnimado() {
        _super.apply(this, arguments);
        this.valoresFinales = {};
    }
    MovimientoAnimado.prototype.nombreAnimacion = function () {
        return this.argumentos.nombreAnimacion || 'correr';
    };
    MovimientoAnimado.prototype.preAnimacion = function () {
        this.sanitizarArgumentosMovAn();
        _super.prototype.preAnimacion.call(this);
        this.vectorDeAvance = this.valoresFinales.direccion.destinyFrom({ x: 0, y: 0 }, this.valoresFinales.distancia / this.argumentos.cantPasos);
        this.receptor.suspenderHabilidadesConMovimiento();
        this.voltearSiCorresponde();
    };
    MovimientoAnimado.prototype.postAnimacion = function () {
        this.receptor.activarHabilidadesConMovimiento();
    };
    MovimientoAnimado.prototype.darUnPaso = function () {
        this.receptor.x += this.vectorDeAvance.x;
        this.receptor.y += this.vectorDeAvance.y;
    };
    MovimientoAnimado.prototype.setearEstadoFinalDeseado = function () {
        this.receptor.x = this.valoresFinales.destino.x;
        this.receptor.y = this.valoresFinales.destino.y;
    };
    MovimientoAnimado.prototype.sanitizarArgumentosMovAn = function () {
        this.argumentos.cantPasos = this.argumentos.cantPasos || 10; // MovimientoAnimado tiene su propio default de cantidad de pasos.
        this.sanitizarDistancia();
        this.sanitizarDireccion();
        this.valoresFinales.destino = this.argumentos.destino || this.calcularDestino();
        this.valoresFinales.voltearAlIrAIzquierda = this.argumentos.voltearAlIrAIzquierda !== false;
        this.corregirValoresSiHayObstaculo();
    };
    MovimientoAnimado.prototype.sanitizarDistancia = function () {
        this.valoresFinales.distancia = this.argumentos.distancia === 0 ? 0 : this.argumentos.distancia || this.calcularDistancia();
    };
    MovimientoAnimado.prototype.calcularDistancia = function () {
        if (!this.argumentos.destino)
            throw new ArgumentError("No se proporcionó una distancia ni un destino");
        return pilas.utils.distancia_entre_dos_actores(this.receptor, this.argumentos.destino);
    };
    MovimientoAnimado.prototype.sanitizarDireccion = function () {
        if (Array.isArray(this.argumentos.direccion) && this.argumentos.direccion.length === 2) {
            this.argumentos.direccion = new Direct(this.argumentos.direccion[0], this.argumentos.direccion[1]);
        }
        else if (this.argumentos.direccion !== undefined && !(this.argumentos.direccion instanceof Direct)) {
            throw new ArgumentError("La dirección debería ser una instancia de Direct o un array de dos números");
        }
        this.valoresFinales.direccion = this.argumentos.direccion || this.calcularDireccion();
    };
    MovimientoAnimado.prototype.calcularDireccion = function () {
        if (!this.argumentos.destino)
            throw new ArgumentError("No se proporcionó una dirección ni un destino");
        return new Direct(this.receptor, this.argumentos.destino);
    };
    MovimientoAnimado.prototype.calcularDestino = function () {
        return this.argumentos.direccion.destinyFrom(this.receptor, this.valoresFinales.distancia);
    };
    MovimientoAnimado.prototype.corregirValoresSiHayObstaculo = function () {
        if (this.hayObstaculo()) {
            var distanciaOriginal = this.valoresFinales.distancia;
            this.valoresFinales.distancia = this.argumentos.distanciaConObstaculo || this.valoresFinales.distancia;
            this.argumentos.cantPasos = Math.ceil(this.argumentos.cantPasos * (this.valoresFinales.distancia / distanciaOriginal));
            this.valoresFinales.destino = this.calcularDestino();
            if (this.obstaculo() !== undefined) {
                this.obstaculo().teEstoyPorColisionar(this.receptor);
            }
        }
    };
    MovimientoAnimado.prototype.voltearSiCorresponde = function () {
        this.receptor.espejado = this.valoresFinales.voltearAlIrAIzquierda && this.vectorDeAvance.x < 0;
    };
    /**
     * Puede sobreescribirse en subclases.
     * Permite que haya obstáculos impidiendo un movimiento.
     * Si devuelve true, el movimiento se interrumpe y se produce una excepción.
     */
    MovimientoAnimado.prototype.hayObstaculo = function () {
        return false;
    };
    MovimientoAnimado.prototype.obstaculo = function () {
        return undefined;
    };
    MovimientoAnimado.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPost.push(new Verificacion(function () { return !_this.hayObstaculo(); }, "¡Hay un obstáculo!", "obstaculo"));
    };
    MovimientoAnimado.prototype.destino = function () {
        return this.valoresFinales.destino;
    };
    return MovimientoAnimado;
})(ComportamientoConVelocidad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "MovimientoAnimado.ts"/>
/// <reference path = "../escenas/Errores.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/Casilla.ts" />
var MovimientoEnCuadricula = (function (_super) {
    __extends(MovimientoEnCuadricula, _super);
    function MovimientoEnCuadricula() {
        _super.apply(this, arguments);
    }
    MovimientoEnCuadricula.prototype.iniciar = function (receptor) {
        // La dirección puede ya venir predefinida mediante herencia o bien definirse
        // dinámicamente mediante un string que se pasa por parámetro
        if (!this.direccionCasilla) {
            var factory = new DireccionCasillaFactory();
            this.direccionCasilla = factory.obtenerDireccionCasilla(this.argumentos.direccionCasilla);
        }
        _super.prototype.iniciar.call(this, receptor);
        this.cuadricula = this.receptor.cuadricula;
        this.casillaOrigen = this.casillaActual();
        this.casillaDestino = this.proximaCasilla(this.casillaOrigen) || this.casillaOrigen;
        this.argumentos.direccion = new Direct(this.vectorDireccion().x, this.vectorDireccion().y);
        this.argumentos.distancia = this.distancia();
        this.argumentos.distanciaConObstaculo = this.distanciaConObstaculo();
    };
    MovimientoEnCuadricula.prototype.casillaActual = function () {
        return this.receptor.casillaActual();
    };
    MovimientoEnCuadricula.prototype.proximaCasilla = function (casilla) {
        // Template Method. Devolver la casilla a la que se va a avanzar
        return this.direccionCasilla.proximaCasilla(casilla);
    };
    MovimientoEnCuadricula.prototype.vectorDireccion = function () {
        return this.direccionCasilla.vectorDireccion;
    };
    MovimientoEnCuadricula.prototype.distancia = function () {
        // Template Method. Devuelve la distancia vertical u horizontal según corresponda
        return this.direccionCasilla.distancia(this);
    };
    MovimientoEnCuadricula.prototype.distanciaHorizontal = function () {
        return this.cuadricula.anchoCasilla() + this.cuadricula.separacion();
    };
    MovimientoEnCuadricula.prototype.distanciaVertical = function () {
        return this.cuadricula.altoCasilla() + this.cuadricula.separacion();
    };
    MovimientoEnCuadricula.prototype.hayObstaculo = function () {
        return this.casillaDestino.tieneActorConEtiqueta('Obstaculo');
    };
    MovimientoEnCuadricula.prototype.distanciaConObstaculo = function () {
        // Si hay obstáculo solo recorre el 30% del camino.
        return this.distancia() - this.direccionCasilla.distanciaUnaCasilla(this) * 0.3;
    };
    MovimientoEnCuadricula.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.verificarDireccion(); }, "No puedo ir para " + this.textoAMostrar()));
    };
    MovimientoEnCuadricula.prototype.verificarDireccion = function () {
        return this.proximaCasilla(this.casillaOrigen) !== undefined;
    };
    MovimientoEnCuadricula.prototype.textoAMostrar = function () {
        // Template Method. Para mostrar mensaje descriptivo al no poder avanzar
        return this.direccionCasilla.textoAMostrar();
    };
    MovimientoEnCuadricula.prototype.postAnimacion = function () {
        this.receptor.setCasillaActual(this.casillaDestino);
    };
    MovimientoEnCuadricula.prototype.nombreAnimacion = function () {
        return this.hayObstaculo()
            ? "correrChocando"
            : _super.prototype.nombreAnimacion.call(this);
    };
    return MovimientoEnCuadricula;
})(MovimientoAnimado);
var DirCasillaDerecha = (function () {
    function DirCasillaDerecha() {
        this.vectorDireccion = { x: 1, y: 0 };
    }
    DirCasillaDerecha.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaASuDerecha();
    };
    DirCasillaDerecha.prototype.textoAMostrar = function () {
        return "la derecha";
    };
    DirCasillaDerecha.prototype.distanciaUnaCasilla = function (movimiento) {
        return movimiento.distanciaHorizontal();
    };
    DirCasillaDerecha.prototype.distancia = function (movimiento) {
        return this.distanciaUnaCasilla(movimiento);
    };
    return DirCasillaDerecha;
})();
var DirCasillaArriba = (function () {
    function DirCasillaArriba() {
        this.vectorDireccion = { x: 0, y: 1 };
    }
    DirCasillaArriba.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaDeArriba();
    };
    DirCasillaArriba.prototype.textoAMostrar = function () {
        return "arriba";
    };
    DirCasillaArriba.prototype.distanciaUnaCasilla = function (movimiento) {
        return movimiento.distanciaVertical();
    };
    DirCasillaArriba.prototype.distancia = function (movimiento) {
        return this.distanciaUnaCasilla(movimiento);
    };
    return DirCasillaArriba;
})();
var DirCasillaAbajo = (function () {
    function DirCasillaAbajo() {
        this.vectorDireccion = { x: 0, y: -1 };
    }
    DirCasillaAbajo.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaDeAbajo();
    };
    DirCasillaAbajo.prototype.textoAMostrar = function () {
        return "abajo";
    };
    DirCasillaAbajo.prototype.distanciaUnaCasilla = function (movimiento) {
        return movimiento.distanciaVertical();
    };
    DirCasillaAbajo.prototype.distancia = function (movimiento) {
        return this.distanciaUnaCasilla(movimiento);
    };
    return DirCasillaAbajo;
})();
var DirCasillaIzquierda = (function () {
    function DirCasillaIzquierda() {
        this.vectorDireccion = { x: -1, y: 0 };
    }
    DirCasillaIzquierda.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaASuIzquierda();
    };
    DirCasillaIzquierda.prototype.textoAMostrar = function () {
        return "la izquierda";
    };
    DirCasillaIzquierda.prototype.distanciaUnaCasilla = function (movimiento) {
        return movimiento.distanciaHorizontal();
    };
    DirCasillaIzquierda.prototype.distancia = function (movimiento) {
        return this.distanciaUnaCasilla(movimiento);
    };
    return DirCasillaIzquierda;
})();
var MoverACasillaDerecha = (function (_super) {
    __extends(MoverACasillaDerecha, _super);
    function MoverACasillaDerecha() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaDerecha();
    }
    return MoverACasillaDerecha;
})(MovimientoEnCuadricula);
var MoverACasillaArriba = (function (_super) {
    __extends(MoverACasillaArriba, _super);
    function MoverACasillaArriba() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaArriba();
    }
    return MoverACasillaArriba;
})(MovimientoEnCuadricula);
var MoverACasillaAbajo = (function (_super) {
    __extends(MoverACasillaAbajo, _super);
    function MoverACasillaAbajo() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaAbajo();
    }
    return MoverACasillaAbajo;
})(MovimientoEnCuadricula);
var MoverACasillaIzquierda = (function (_super) {
    __extends(MoverACasillaIzquierda, _super);
    function MoverACasillaIzquierda() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaIzquierda();
    }
    return MoverACasillaIzquierda;
})(MovimientoEnCuadricula);
var DirTodoADerecha = (function (_super) {
    __extends(DirTodoADerecha, _super);
    function DirTodoADerecha() {
        _super.apply(this, arguments);
    }
    DirTodoADerecha.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaTodoADerecha();
    };
    DirTodoADerecha.prototype.distancia = function (movimiento) {
        return movimiento.distanciaHorizontal()
            * (movimiento.cuadricula.cantColumnas - 1 - movimiento.casillaActual().nroColumna);
    };
    return DirTodoADerecha;
})(DirCasillaDerecha);
var DirTodoArriba = (function (_super) {
    __extends(DirTodoArriba, _super);
    function DirTodoArriba() {
        _super.apply(this, arguments);
    }
    DirTodoArriba.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaTodoArriba();
    };
    DirTodoArriba.prototype.distancia = function (movimiento) {
        return movimiento.distanciaVertical() * movimiento.casillaActual().nroFila;
    };
    return DirTodoArriba;
})(DirCasillaArriba);
var DirTodoAbajo = (function (_super) {
    __extends(DirTodoAbajo, _super);
    function DirTodoAbajo() {
        _super.apply(this, arguments);
    }
    DirTodoAbajo.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaTodoAbajo();
    };
    DirTodoAbajo.prototype.distancia = function (movimiento) {
        return movimiento.distanciaVertical()
            * (movimiento.cuadricula.cantFilas - 1 - movimiento.casillaActual().nroColumna);
    };
    return DirTodoAbajo;
})(DirCasillaAbajo);
var DirTodoAIzquierda = (function (_super) {
    __extends(DirTodoAIzquierda, _super);
    function DirTodoAIzquierda() {
        _super.apply(this, arguments);
    }
    DirTodoAIzquierda.prototype.proximaCasilla = function (casilla) {
        return casilla.casillaTodoAIzquierda();
    };
    DirTodoAIzquierda.prototype.distancia = function (movimiento) {
        return movimiento.distanciaHorizontal() * movimiento.casillaActual().nroColumna;
    };
    return DirTodoAIzquierda;
})(DirCasillaIzquierda);
var MoverTodoADerecha = (function (_super) {
    __extends(MoverTodoADerecha, _super);
    function MoverTodoADerecha() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirTodoADerecha();
    }
    return MoverTodoADerecha;
})(MovimientoEnCuadricula);
var MoverTodoArriba = (function (_super) {
    __extends(MoverTodoArriba, _super);
    function MoverTodoArriba() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirTodoArriba();
    }
    return MoverTodoArriba;
})(MovimientoEnCuadricula);
var MoverTodoAbajo = (function (_super) {
    __extends(MoverTodoAbajo, _super);
    function MoverTodoAbajo() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirTodoAbajo();
    }
    return MoverTodoAbajo;
})(MovimientoEnCuadricula);
var MoverTodoAIzquierda = (function (_super) {
    __extends(MoverTodoAIzquierda, _super);
    function MoverTodoAIzquierda() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirTodoAIzquierda();
    }
    return MoverTodoAIzquierda;
})(MovimientoEnCuadricula);
var SiguienteFila = (function (_super) {
    __extends(SiguienteFila, _super);
    function SiguienteFila() {
        _super.apply(this, arguments);
    }
    SiguienteFila.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.receptor.casillaActual().esInicio(); }, "No puedo ir desde acá, tengo que estar al inicio de la fila"));
    };
    return SiguienteFila;
})(MoverACasillaAbajo);
var SiguienteColumna = (function (_super) {
    __extends(SiguienteColumna, _super);
    function SiguienteColumna() {
        _super.apply(this, arguments);
    }
    SiguienteColumna.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.receptor.casillaActual().esInicio(); }, "No puedo ir desde acá, tengo que estar al inicio de la columna"));
    };
    return SiguienteColumna;
})(MoverACasillaDerecha);
var DireccionCasillaFactory = (function () {
    function DireccionCasillaFactory() {
    }
    DireccionCasillaFactory.prototype.obtenerDireccionCasilla = function (direccion) {
        if (direccion == "derecha") {
            return new DirCasillaDerecha();
        }
        else if (direccion == "arriba") {
            return new DirCasillaArriba();
        }
        else if (direccion == "abajo") {
            return new DirCasillaAbajo();
        }
        else if (direccion == "izquierda") {
            return new DirCasillaIzquierda();
        }
    };
    return DireccionCasillaFactory;
})();
/// <reference path="../comportamientos/MovimientosEnCuadricula.ts"/>
/// <reference path="Cuadricula.ts"/>
/*

Implementa una cuadrícula donde no están todas las casillas, permitiendo generar
diseños más complejos que un cuadrado, pero reutilizando el comportamiento de la
cuadrícula y sus movimientos.

*/
var CuadriculaEsparsa = (function (_super) {
    __extends(CuadriculaEsparsa, _super);
    function CuadriculaEsparsa(x, y, opcionesCuadricula, opcionesCasilla, matriz) {
        this.matriz = matriz;
        _super.call(this, x, y, matriz.length, matriz[0].length, opcionesCuadricula, opcionesCasilla);
    }
    CuadriculaEsparsa.prototype.agregarCasilla = function (nroFila, nroColumna) {
        /*Crea las casillas definidas por la matriz booleana
        definida ene l constructor*/
        if (this.matriz[nroFila][nroColumna] == 'T') {
            _super.prototype.agregarCasilla.call(this, nroFila, nroColumna);
        }
    };
    CuadriculaEsparsa.prototype.completarConObjetosRandom = function (conjuntoDeClases, argumentos) {
        var _this = this;
        if (argumentos === void 0) { argumentos = { condiciones: [] }; }
        /*Completa la cuadricula esparsa con objetos random
        Opcionalmente se le puede pasar a argumentos.condiciones
        una lista de funciones que seran evaluadas de manera de evitar
        que en determinadas posiciones de la cuadricula se agreguen objetos.*/
        if (argumentos.condiciones === undefined) {
            argumentos.condiciones = [];
        }
        this.forEachCasilla(function (casilla) {
            if (Math.random() < 0.6 && argumentos.condiciones.every(function (condicion) { return condicion(casilla); })) {
                _this.agregarActor(conjuntoDeClases.dameUno(), casilla.nroFila, casilla.nroColumna);
            }
        });
    };
    CuadriculaEsparsa.prototype.hayDerecha = function (casilla) {
        /*Devuelve true sii existe una casilla
        a la inmediata derecha de la casilla */
        return this.casilla(casilla.nroFila, casilla.nroColumna + 1) != undefined;
    };
    CuadriculaEsparsa.prototype.hayIzquierda = function (casilla) {
        return this.casilla(casilla.nroFila, casilla.nroColumna - 1) != undefined;
    };
    CuadriculaEsparsa.prototype.hayAbajo = function (casilla) {
        return this.casilla(casilla.nroFila + 1, casilla.nroColumna) != undefined;
    };
    CuadriculaEsparsa.prototype.hayArriba = function (casilla) {
        return this.casilla(casilla.nroFila - 1, casilla.nroColumna) != undefined;
    };
    return CuadriculaEsparsa;
})(Cuadricula);
/*

1. La clase implementa una matriz donde cada fila tiene una cantidad distinta de columnas.

2. Cada fila es una cuadricula

3. Se permite inicializar con tamaños random o con tamaños fijos.

4. También, dado un definidor de Columnas (ver clase de este archivo), permite inicializar
esta matriz con objetos de esos tipos de manera aleatoria.

5. Se provee el método posicionar objeto que reemplaza al agregarActor tradicional

6. Para un ejemplo de utilizacion ver ElMonoQueSabeContar.ts

*/
/// <reference path = "../actores/CuadriculaEsparsa.ts"/>
// TODO: DEBERIAMOS HACER REFACTOR de manera de mergear constructores/clases.
var CuadriculaMultipleColumnas = (function (_super) {
    __extends(CuadriculaMultipleColumnas, _super);
    function CuadriculaMultipleColumnas(definidor, x, y, opcionesCuadricula, opcionesCasilla) {
        this.cantFilas = definidor.dameMaximo();
        this.cantColumnas = definidor.size();
        this.pmatrix = new Array(this.cantFilas, Array(this.cantColumnas));
        //this.pmatrix =  String[cantidadFilas][cantidadColumnas];
        for (var fila = 0; fila < this.cantFilas; fila++) {
            this.pmatrix[fila] = [];
            for (var col = 0; col < this.cantColumnas; col++) {
                if (definidor.at(col) > fila) {
                    this.pmatrix[fila][col] = 'T';
                }
                else {
                    this.pmatrix[fila][col] = 'F';
                }
            }
        }
        _super.call(this, x, y, opcionesCuadricula, opcionesCasilla, this.pmatrix);
    }
    CuadriculaMultipleColumnas.prototype.cambiarImagenInicio = function (nuevaImagen) {
        for (var nroColumna = 0; nroColumna < this.pmatrix[0].length; nroColumna++) {
            this.casilla(0, nroColumna).cambiarImagen(nuevaImagen);
        }
    };
    CuadriculaMultipleColumnas.prototype.cambiarImagenFin = function (nuevaImagen) {
        for (var fila = 0; fila < this.pmatrix.length; fila++) {
            for (var col = 0; col < this.pmatrix[0].length; col++) {
                if (this.esLaUltima(fila, col)) {
                    this.casilla(fila, col).cambiarImagen(nuevaImagen);
                }
            }
        }
    };
    CuadriculaMultipleColumnas.prototype.esLaUltima = function (fila, col) {
        return this.pmatrix[fila][col] == 'T' && (this.pmatrix[fila + 1] == undefined || this.pmatrix[fila + 1][col] == 'F');
    };
    CuadriculaMultipleColumnas.prototype.esFin = function (casilla) {
        return this.esLaUltima(casilla.nroFila, casilla.nroColumna);
    };
    CuadriculaMultipleColumnas.prototype.esInicio = function (casilla) {
        return casilla.nroFila === 0;
    };
    CuadriculaMultipleColumnas.prototype.largoColumna = function (indice) {
        return this.pmatrix.filter(function (fila) { return fila[indice] === 'T'; }).length;
    };
    return CuadriculaMultipleColumnas;
})(CuadriculaEsparsa);
var CuadriculaMultiple = (function (_super) {
    __extends(CuadriculaMultiple, _super);
    function CuadriculaMultiple(definidor, x, y, opcionesCuadricula, opcionesCasilla) {
        var max = definidor.dameMaximo();
        this.pmatrix = [];
        while (definidor.hayProxFila()) {
            var fila = [];
            var cantColumnas = definidor.dameProxFila();
            var cant = 0;
            while (cant < cantColumnas) {
                fila.push('T');
                cant++;
            }
            while (cant < max) {
                fila.push('F');
                cant++;
            }
            this.pmatrix.push(fila);
        }
        _super.call(this, x, y, opcionesCuadricula, opcionesCasilla, this.pmatrix);
    }
    CuadriculaMultiple.prototype.cambiarImagenCasillas = function (imagenNueva) {
        for (var nroFila = 0; nroFila < this.pmatrix.length; ++nroFila) {
            for (var nroColumna = 0; nroColumna < this.pmatrix[0].length; ++nroColumna) {
                if (this.casilla(nroFila, nroColumna)) {
                    this.casilla(nroFila, nroColumna).cambiarImagen(imagenNueva);
                }
            }
        }
    };
    CuadriculaMultiple.prototype.cambiarImagenInicio = function (nuevaImagen) {
        for (var nroFila = 0; nroFila < this.pmatrix.length; ++nroFila) {
            this.casilla(nroFila, 0).cambiarImagen(nuevaImagen);
        }
    };
    CuadriculaMultiple.prototype.cambiarImagenFin = function (nuevaImagen) {
        for (var nroFila = 0; nroFila < this.pmatrix.length; ++nroFila) {
            this.casilla(nroFila, this.dameIndexUltimaPosicion(nroFila)).cambiarImagen(nuevaImagen);
        }
    };
    // Este método era privado, pero se lo usa desde 'FutbolDeRobots'.
    // Cambiado a público.
    CuadriculaMultiple.prototype.dameIndexUltimaPosicion = function (nroFila) {
        var index = 0;
        while (this.pmatrix[nroFila][index + 1] == 'T') {
            index += 1;
        }
        return index;
    };
    CuadriculaMultiple.prototype.cantidadColumnas = function (nroFila) {
        return this.dameIndexUltimaPosicion(nroFila) + 1;
    };
    CuadriculaMultiple.prototype.esFin = function (casilla) {
        return this.dameIndexUltimaPosicion(casilla.nroFila) === casilla.nroColumna;
    };
    CuadriculaMultiple.prototype.esInicio = function (casilla) {
        return casilla.nroColumna === 0;
    };
    return CuadriculaMultiple;
})(CuadriculaEsparsa);
var ConjuntoClases = (function () {
    function ConjuntoClases(clases) {
        this.clases = clases;
    }
    ConjuntoClases.prototype.dameUno = function () {
        return new this.clases[Math.floor(Math.random() * this.clases.length)](0, 0);
    };
    return ConjuntoClases;
})();
var DefinidorColumnasDeUnaFila = (function () {
    function DefinidorColumnasDeUnaFila() {
        this.index = 0;
        this.tamanos = [];
    }
    DefinidorColumnasDeUnaFila.prototype.size = function () {
        return this.tamanos.length;
    };
    DefinidorColumnasDeUnaFila.prototype.at = function (index) {
        return this.tamanos[index];
    };
    DefinidorColumnasDeUnaFila.prototype.dameProxFila = function () {
        var a = this.tamanos[this.index];
        this.index += 1;
        return a;
    };
    DefinidorColumnasDeUnaFila.prototype.hayProxFila = function () {
        return this.index < this.tamanos.length;
    };
    DefinidorColumnasDeUnaFila.prototype.nroFila = function () {
        //comienza a numerar desde cero
        return this.index;
    };
    DefinidorColumnasDeUnaFila.prototype.dameMaximo = function () {
        var max = this.tamanos[0];
        for (var index = 1; index < this.tamanos.length; index++) {
            if (this.tamanos[index] > max) {
                max = this.tamanos[index];
            }
        }
        return max;
    };
    return DefinidorColumnasDeUnaFila;
})();
var DefinidorColumnasRandom = (function (_super) {
    __extends(DefinidorColumnasRandom, _super);
    function DefinidorColumnasRandom(filas, cantidadMaxColumnas) {
        _super.call(this);
        this.tamanos = Array.apply(null, Array(filas)).map(function (_, i) { return Math.floor((Math.random() * cantidadMaxColumnas) + 3); });
    }
    return DefinidorColumnasRandom;
})(DefinidorColumnasDeUnaFila);
var DefinidorColumnasFijo = (function (_super) {
    __extends(DefinidorColumnasFijo, _super);
    function DefinidorColumnasFijo(filas, tamanos) {
        _super.call(this);
        this.tamanos = tamanos;
    }
    return DefinidorColumnasFijo;
})(DefinidorColumnasDeUnaFila);
/// <reference path="ActorAnimado.ts"/>
var Detective = (function (_super) {
    __extends(Detective, _super);
    function Detective(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'detective.png', cantColumnas: 1 });
        this.definirAnimacion("parado", [0], 4, true);
    }
    Detective.prototype.obtenerActorBajoLaLupa = function () {
        var _this = this;
        return pilas.obtener_actores_con_etiqueta("Sospechoso").filter(function (s) { return s.colisiona_con(_this); })[0];
    };
    Detective.prototype.colisionaConElCulpable = function () {
        var sospechoso = this.obtenerActorBajoLaLupa();
        if (sospechoso.tieneDisflazPuesto) {
            throw new ActividadError("No puedo saber si es el culpable, no lo he interrogado antes.");
        }
        return sospechoso.esCulpable();
    };
    return Detective;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Dibujante = (function (_super) {
    __extends(Dibujante, _super);
    function Dibujante(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'dibujante.png', cantColumnas: 5 });
        this.definirAnimacion("parado", new Cuadros([0, 1, 2, 1]).repetirVeces(4).concat(new Cuadros([0]).repetirVeces(40)), 4, true);
        this.definirAnimacion("correr", [3, 4, 4, 4, 4, 4], 12);
        this.definirAnimacion("rotar", [3], 12);
        this.definirAnimacion("saltar", [3, 4, 4, 4, 4, 4], 12);
    }
    return Dibujante;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Dracula = (function (_super) {
    __extends(Dracula, _super);
    function Dracula(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'dracula.png', cantColumnas: 15 });
        this.definirAnimacion("bailando", [9, 10, 11, 12, 13, 14, 13, 12, 11, 10], 6);
        this.definirAnimacion("parado", [0], 12, true);
        this.definirAnimacion("aparecer", [0, 1, 2, 3, 4, 5, 6, 7, 8], 6);
    }
    return Dracula;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var EstrellaAnimada = (function (_super) {
    __extends(EstrellaAnimada, _super);
    function EstrellaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'estrellaAnimada.png', cantColumnas: 3, cantFilas: 1 });
        this.definirAnimacion("parado", new Cuadros(0).repetirRandom(200).concat([0, 1, 2, 2, 2, 1]), 6, true);
        this.definirAnimacion("recoger", [0, 1, 2], 4);
    }
    return EstrellaAnimada;
})(ActorAnimado);
/*Implementa un tablero, que tiene "nombre de equipo" y "puntaje"*/
/*Notar que aumentar puede tomar valores negativos o positivos*/
/* Para usarlo, hay que construirlo y setearle un observado
ver clase "observado" */
var Tablero = (function (_super) {
    __extends(Tablero, _super);
    function Tablero(x, y, argumentos) {
        this.sanitizarArgumentosTablero(argumentos);
        _super.call(this, x, y, { grilla: argumentos.imagen, cantColumnas: 1, cantFilas: 1 });
        this.buildLabel(argumentos);
        this.buildPuntaje(argumentos);
        this.updateWidth();
        this.updateHeight();
    }
    // label | separacion | puntaje     (el margen es igual tanto para el label como para el puntaje)
    Tablero.prototype.sanitizarArgumentosTablero = function (args) {
        args.imagen = args.imagen || 'invisible.png';
        args.imagenLabel = args.imagenLabel || "PlacaContarGris.png";
        args.imagenPuntaje = args.imagenPuntaje || "PlacaContarNegra.png";
        this.atributoObservado = args.atributoObservado || 'cantidad';
        this.colorTxtLabel = args.colorTxtLabel || "black";
        this.colorTxtPuntaje = args.colorTxtPuntaje || "white";
        this.separacionX = args.separacionX || 0;
        this.separacionY = args.separacionY || 0;
        this.margen = args.margen || 6;
    };
    Tablero.prototype.buildLabel = function (argumentos) {
        this.label = new Texto(0, // no importa, luego se actualiza
        this.y, argumentos.texto, { color: this.colorTxtLabel,
            imagenFondo: argumentos.imagenLabel,
            margen: this.margen,
        });
        this.label.setZ(this.z - 1);
    };
    Tablero.prototype.buildPuntaje = function (argumentos) {
        this.puntaje = new Puntaje(0, // no importa, luego se actualiza
        this.label.y + this.separacionY, argumentos.valorInicial || 0, { color: this.colorTxtPuntaje,
            imagenFondo: argumentos.imagenPuntaje,
            margen: this.margen,
        });
        this.puntaje.setZ(this.z - 2);
    };
    // label | separacion | puntaje   (cada uno tiene su margen)
    Tablero.prototype.updateWidth = function () {
        this.ancho = this.puntaje.ancho + this.separacionX + this.label.ancho;
        this.label.izquierda = this.izquierda;
        this.puntaje.izquierda = this.label.derecha + this.separacionX;
    };
    Tablero.prototype.updateHeight = function () {
        this.alto = this.separacionY + this.label.alto;
        this.label.arriba = this.arriba;
        this.puntaje.arriba = this.label.arriba;
    };
    Tablero.prototype.dameValor = function () {
        return this.puntaje.obtener();
    };
    Tablero.prototype.aumentar = function (aumento) {
        this.puntaje.aumentar(aumento);
    };
    Tablero.prototype.setearValor = function (nuevoValor) {
        if (nuevoValor <= this.puntaje.obtener()) {
            this.puntaje.aumentar(-(this.puntaje.obtener() - nuevoValor));
        }
        else {
            this.puntaje.aumentar(nuevoValor - this.puntaje.obtener());
        }
    };
    Tablero.prototype.tuObservadoCambio = function (observado) {
        this.setearValor(this.leerObservado(observado));
        this.updateWidth();
    };
    Tablero.prototype.leerObservado = function (observado) {
        if (typeof (observado[this.atributoObservado]) === "function") {
            return observado[this.atributoObservado]();
        }
        return observado[this.atributoObservado];
    };
    Tablero.prototype.setX = function (x) {
        _super.prototype.setX.call(this, x);
        this.updateWidth();
    };
    Tablero.prototype.setY = function (y) {
        _super.prototype.setY.call(this, y);
        this.updateHeight();
    };
    return Tablero;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "HabilidadAnimada.ts"/>
var Flotar = (function (_super) {
    __extends(Flotar, _super);
    function Flotar(receptor, argumentos) {
        _super.call(this, receptor);
        this.contador = Math.random() * 3;
        this.desvio = argumentos["Desvio"] || 1;
        this.eje = argumentos.eje || 'Y';
        this.actualizarPosicion();
    }
    Flotar.prototype.actualizar = function () {
        this.contador += 0.025;
        this.contador = this.contador % 256;
        //Esto es para evitar overflow.
        this.receptor['set' + this.eje](this.altura_original + Math.sin(this.contador) * this.desvio);
    };
    Flotar.prototype.implicaMovimiento = function () {
        return true;
    };
    Flotar.prototype.actualizarPosicion = function () {
        this.altura_original = this.receptor['get' + this.eje]();
    };
    return Flotar;
})(HabilidadAnimada);
/// <reference path="Tablero.ts"/>
/// <reference path="../habilidades/Flotar.ts"/>
var FlechaEscenarioAleatorio = (function (_super) {
    __extends(FlechaEscenarioAleatorio, _super);
    function FlechaEscenarioAleatorio() {
        _super.call(this, 120, 220, { imagen: 'flechaEscenarioAleatorio.png',
            texto: "¡Ejecutá varias veces!",
            separacionX: 0,
            imagenLabel: "invisible.png",
        });
        this.aprender(Flotar, { eje: 'X', Desvio: 20 });
        this.setAlto(40);
    }
    FlechaEscenarioAleatorio.prototype.buildPuntaje = function (argumentos) {
        this.puntaje = { ancho: 0 };
    };
    FlechaEscenarioAleatorio._grilla = 'flechaEscenarioAleatorio.png';
    return FlechaEscenarioAleatorio;
})(Tablero);
/// <reference path="ActorAnimado.ts"/>
var Foco = (function (_super) {
    __extends(Foco, _super);
    function Foco(x, y) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'focos.color.png', cantColumnas: 13 });
        this.colores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.colores.forEach(function (nro) {
            return _this.definirAnimacion("color" + nro, [nro], 1);
        });
        this.cargarAnimacion("color0");
    }
    Foco.prototype.cambiarColor = function () {
        this.cargarAnimacion("color" + this.siguienteNumero());
    };
    Foco.prototype.siguienteNumero = function () {
        var sgte = parseInt(this.nombreAnimacionActual().slice(5)) + 1;
        return sgte > 12 ? 0 : sgte;
    };
    return Foco;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var FogataAnimada = (function (_super) {
    __extends(FogataAnimada, _super);
    function FogataAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'actor.Fogata.png', cantColumnas: 3, cantFilas: 1 });
        this.definirAnimacion("parado", [0], 5);
        this.definirAnimacion("prendida", [1, 2], 5);
    }
    return FogataAnimada;
})(ActorAnimado);
/// <reference path = "ActorCompuesto.ts"/>
var FondoAnimado = (function (_super) {
    __extends(FondoAnimado, _super);
    function FondoAnimado(nombre, x, y) {
        _super.call(this, x, y, { subactores: [new ActorAnimado(x, y, { grilla: nombre })] });
    }
    return FondoAnimado;
})(ActorCompuesto);
/// <reference path="ActorAnimado.ts"/>
var Frank = (function (_super) {
    __extends(Frank, _super);
    function Frank(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'frank.png', cantColumnas: 10 });
        this.definirAnimacion("bailando", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], 6);
        this.definirAnimacion("parado", new Cuadros([0]).repetirVeces(20).concat([1, 2, 2, 1]), 6, true);
    }
    return Frank;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var GatoAnimado = (function (_super) {
    __extends(GatoAnimado, _super);
    function GatoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'gatoAnimado.png', cantColumnas: 7, cantFilas: 7 });
        this.definirAnimacion('parado', new Cuadros([0, 1, 2, 3, 2, 1]).repetirVeces(9).concat([8, 9, 10, 11, 12, 12, 12, 12, 12, 12, 11, 10, 9, 8]), 4, true);
        this.definirAnimacion('saltar', [43, 44, 45, 46, 46, 46, 46, 46, 45, 44, 43], 15);
        this.definirAnimacion('saludando', [15, 16, 16, 17, 18, 19, 19, 18, 17, 16, 16, 16, 16, 17, 18, 19, 19, 16, 15], 5);
        this.definirAnimacion('acostado', [8, 9, 10, 11, 12, 11, 10, 9, 8], 5);
        this.definirAnimacion('abrirOjos', [39, 38, 37, 36], 5);
        this.definirAnimacion('ojosCerrados', [39], 5);
        this.definirAnimacion('cerrarOjos', [36, 37, 38, 39], 5);
        this.definirAnimacion('correr', [22, 23, 24, 25, 26], 6);
    }
    return GatoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var GloboAnimado = (function (_super) {
    __extends(GloboAnimado, _super);
    function GloboAnimado(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'globoAnimado.png', cantColumnas: 3, cantFilas: 1 });
        this.definirAnimacion("explotar", [0, 0, 0, 1, 2, 2], 6);
    }
    return GloboAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var HeroeAnimado = (function (_super) {
    __extends(HeroeAnimado, _super);
    function HeroeAnimado(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: this.nombreArchivo(), cantColumnas: 6, cantFilas: 5 });
        this.definirAnimacion("correr", [0, 1, 2, 3, 4, 5], 6);
        this.definirAnimacion("parado", [0], 6, true);
        this.definirAnimacion("agarrarSombrero", [15, 14, 13, 12, 12, 12, 12], 6);
        this.definirAnimacion("cambiarSombreroPorEspada", [12, 13, 14, 15, 4, 4, 4, 4, 4, 4, 9, 8, 7, 6], 6);
        this.definirAnimacion("correrConEspada", [6, 7, 8, 9, 10, 11], 12);
        this.definirAnimacion("correrConSombrero", [12, 13, 14, 15, 16, 17], 12);
        this.definirAnimacion("atacar", new Cuadros([24, 25, 26, 27, 28, 29]).repetirVeces(3), 6);
    }
    HeroeAnimado.prototype.nombreArchivo = function () {
        return 'heroe.png';
    };
    return HeroeAnimado;
})(ActorAnimado);
var Heroina = (function (_super) {
    __extends(Heroina, _super);
    function Heroina() {
        _super.apply(this, arguments);
    }
    Heroina.prototype.nombreArchivo = function () {
        return 'heroina.png';
    };
    return Heroina;
})(HeroeAnimado);
/// <reference path="ActorAnimado.ts"/>
var HierroAnimado = (function (_super) {
    __extends(HierroAnimado, _super);
    function HierroAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'hierro_animado.png', cantColumnas: 3, cantFilas: 1 });
        this.definirAnimacion("quedan3", [0], 1);
        this.definirAnimacion("quedan2", [1], 1);
        this.definirAnimacion("quedan1", [2], 1);
        this.definirAnimacion("correr", [2], 1);
        this.definirAnimacion("parado", [2], 1);
    }
    return HierroAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Hueso = (function (_super) {
    __extends(Hueso, _super);
    function Hueso(x, y) {
        _super.call(this, x, y, { grilla: 'hueso.png', cantColumnas: 1, cantFilas: 1 });
    }
    return Hueso;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var InstaladorAnimado = (function (_super) {
    __extends(InstaladorAnimado, _super);
    function InstaladorAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'instalador.png', cantColumnas: 9, cantFilas: 1 });
        this.definirAnimacion("parado", [0], 1, true);
        this.definirAnimacion("correr", [0, 3, 2, 1, 2, 3], 10);
        this.definirAnimacion("escribir", [3, 4, 5, 6, 7, 8, 7, 8, 7, 6, 5, 4], 9);
    }
    return InstaladorAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Lamparin = (function (_super) {
    __extends(Lamparin, _super);
    function Lamparin(x, y) {
        _super.call(this, x, y, { grilla: 'lamparin.png', cantColumnas: 2, cantFilas: 1 });
        this.definirAnimacion("apagada", [0], 1);
        this.definirAnimacion("prendida", [1], 1);
        this.etiquetas.push('Luz');
    }
    return Lamparin;
})(ActorAnimado);
/// <reference path = "../node_modules/reflect-metadata/Reflect.d.ts"/>
/*
 * For using Classes as Mixins.
 * Usage: if you want to add M1 to class A
 * Before A class definition use decorator:
 *     @mergeWith(M1)
 *
 * You can repeat the use of the decorator to merge mutliple mixins:
 *
 *     @mergeWith(M1)
 *     @mergeWith(M2)
 */
function mergeWith(origin) {
    return function (target) {
        Object.getOwnPropertyNames(origin.prototype).forEach(function (name) { return mergeProperty(name, origin, target); });
        return target;
    };
}
function mergeProperty(name, origin, target) {
    if (!target.prototype[name]) {
        target.prototype[name] = origin.prototype[name];
    }
}
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
var Decir = (function (_super) {
    __extends(Decir, _super);
    function Decir() {
        _super.apply(this, arguments);
    }
    /* Redefinir si corresponde */
    Decir.prototype.preAnimacion = function () {
        this.globo = this.crearGlobo();
    };
    Decir.prototype.doActualizar = function () {
        _super.prototype.doActualizar.call(this);
        return !this.globo.vivo;
    };
    Decir.prototype.crearGlobo = function () {
        return new Globo(this.receptor, this.argumentos.mensaje, { autoEliminar: this.argumentos.autoEliminarGlobo });
    };
    return Decir;
})(ComportamientoAnimado);
var Pensar = (function (_super) {
    __extends(Pensar, _super);
    function Pensar() {
        _super.apply(this, arguments);
    }
    Pensar.prototype.crearGlobo = function () {
        return new GloboPensar(this.receptor, this.argumentos.mensaje);
    };
    return Pensar;
})(Decir);
/// <reference path="../ActorAnimado.ts"/>
/// <reference path="../../comportamientos/Decir.ts"/>
var Coty = (function (_super) {
    __extends(Coty, _super);
    function Coty(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { cantColumnas: 10, cantFilas: 10 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(16)
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
            .concat(new Cuadros(0).repetirVeces(32))
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
            .concat(new Cuadros(0).repetirVeces(32))
            .concat([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49])
            .concat(new Cuadros(0).repetirVeces(5)), 12, true);
        this.definirAnimacion("correrDibujando", [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62], 12);
        this.definirAnimacion("saltar", [63, 64, 65, 66, 67, 68, 69, 69, 69, 70, 71, 72, 73, 74, 75, 76, 77], 14);
        this.definirAnimacion("obstaculo", [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], 7.5);
        this.definirAnimacion("rotar", [0], 1);
    }
    Coty._grilla = 'actor.coty.png';
    return Coty;
})(ActorAnimado);
/// <reference path = "MovimientoAnimado.ts"/>
var SaltarAnimado = (function (_super) {
    __extends(SaltarAnimado, _super);
    function SaltarAnimado() {
        _super.apply(this, arguments);
    }
    SaltarAnimado.prototype.preAnimacion = function () {
        if (this.argumentos.distancia === undefined && this.argumentos.direccion === undefined) {
            // Significa que me llamaron sin los parámetros del movimiento.
            this.argumentos.distancia = 0;
            this.argumentos.direccion = new Direct(0, 1); // No importa
        }
        ;
        this.argumentos.distancia = this.receptor.escena.longitudSegmento || this.argumentos.distancia;
        _super.prototype.preAnimacion.call(this);
        this.sanitizarArgumentosSaltar();
        this.velocidad_vertical = this.velocidad_inicial;
        pilas.sonidos.cargar('libs/data/audio/saltar.wav').reproducir();
        this.vectorDeAvanceOriginal = { x: this.vectorDeAvance.x, y: this.vectorDeAvance.y };
    };
    SaltarAnimado.prototype.sanitizarArgumentosSaltar = function () {
        this.alTerminar = this.argumentos.alTerminar || function (r) { };
        this.gravedad = this.argumentos.gravedad || this.calcularGravedad();
        this.velocidad_inicial = this.argumentos.velocidad_inicial || this.calcularVInicial();
    };
    SaltarAnimado.prototype.calcularGravedad = function () {
        // calculo gravedad porque no vino por argumento.
        if (!this.argumentos.velocidad_inicial || !this.argumentos.alturaDeseada)
            throw new ArgumentError('Si no se proporciona gravedad, debe proporcionarse velocidad inicial y la altura deseada');
        if (this.argumentos.velocidad_inicial * this.argumentos.cantPasos / 2 < this.argumentos.alturaDeseada)
            throw new ArgumentError('Velocidad inicial insuficiente para llegar a la altura deseada en los pasos indicados');
        // justificación de esto abajo
        var cps = this.argumentos.cantPasos / 2;
        var v = this.argumentos.velocidad_inicial;
        var h = this.argumentos.alturaDeseada;
        return Math.floor((cps * v - h) / ((cps - 1) * cps / 2)); //Es preferible manejar siempre enteros.
        //Redondear para abajo se compensa con setearEstadoFinalDeseado
    };
    SaltarAnimado.prototype.calcularVInicial = function () {
        if (!this.argumentos.alturaDeseada)
            throw new ArgumentError('Si no se proporciona velocidad inicial, debe proporcionarse la gravedad y la altura deseada');
        // justificación de esto abajo
        var cps = this.argumentos.cantPasos / 2;
        var g = this.gravedad;
        var h = this.argumentos.alturaDeseada;
        var v = g / 2 * (cps - 1) + (h / cps);
        if (v < 0)
            throw new ArgumentError('Gravedad insuficiente para llegar a la altura deseada en los pasos indicados');
        return Math.floor(v); //Es preferible manejar siempre enteros.
        //Redondear para abajo se compensa con setearEstadoFinalDeseado
    };
    /* Fumata:

     h es altura, v es velocidad inicial, g es gravedad, cps es cantidad de pasos para la subida.
    Mirando darUnPaso, y teniendo en cuenta que la velocidad vertical va disminuyendo relativa a la anterior,
     el cálculo que hay que hacer para calcular h es:

    h = v +
        v - g +
            v - g - g +
            v - g - g - g +
            ..... cps veces.

    Entonces, siendo E() sumatoria de i = 0 a cps - 1
    h = E (v - g * i)
    Sacando la constante v de la sumatoria:
    h = cps * v + E (- g * i)
    Factor común -g
    h = cps * v - g * E (i)
    x Gauss
    h = cps * v - g * ((cps-1+0) * cps/2) --->>> si cps es par
    h = cps * v - g * ((cps-1) * cps/2) -> de acá sale la altura a partir de velocidad inicial y gravedad

    De donde sale que la gravedad g es:
    g * ((cps-1) * cps/2) = cps * v - h
    g = (cps * v - h) / ((cps-1) * cps/2) -> de acá sale la gravedad a partir de altura y velocidad inicial

    Y de donde sale que v es:
    g * ((cps-1) * cps/2) = cps * v - h
    g * ((cps-1) * cps/2) + h = cps * v
    (g * ((cps-1) * cps/2) + h ) / cps = v
    Masajeo:
    g * ((cps-1) * cps/2) / cps + h / cps = v
    g * ((cps-1) /2) + h / cps = v
    g/2 * (cps-1) + h / cps = v -> -> de acá sale la velocidad a partir de altura y gravedad
    */
    SaltarAnimado.prototype.darUnPaso = function () {
        this.vectorDeAvance.y = this.vectorDeAvanceOriginal.y + this.velocidad_vertical;
        _super.prototype.darUnPaso.call(this);
        this.velocidad_vertical -= this.gravedad;
    };
    SaltarAnimado.prototype.setearEstadoFinalDeseado = function () {
        _super.prototype.setearEstadoFinalDeseado.call(this);
        this.alTerminar.call(this.receptor);
    };
    SaltarAnimado.prototype.nombreAnimacion = function () {
        return this.argumentos.nombreAnimacion || "saltar";
    };
    return SaltarAnimado;
})(MovimientoAnimado);
var SaltarHaciaAdelante = (function (_super) {
    __extends(SaltarHaciaAdelante, _super);
    function SaltarHaciaAdelante() {
        _super.apply(this, arguments);
    }
    SaltarHaciaAdelante.prototype.preAnimacion = function () {
        this.argumentos.direccion = new Direct(this.receptor.rotacion);
        _super.prototype.preAnimacion.call(this);
    };
    return SaltarHaciaAdelante;
})(SaltarAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "ComportamientoAnimado.ts" />
var Hundirse = (function (_super) {
    __extends(Hundirse, _super);
    function Hundirse() {
        _super.apply(this, arguments);
    }
    Hundirse.prototype.nombreAnimacion = function () {
        return "obstaculo";
    };
    Hundirse.prototype.preAnimacion = function () {
        this.receptor.decir("¡Me hundo!");
    };
    Hundirse.prototype.postAnimacion = function () {
        this.receptor.eliminar();
    };
    return Hundirse;
})(ComportamientoAnimado);
/// <reference path = "../../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "../../../node_modules/reflect-metadata/Reflect.d.ts"/>
/// <reference path="../../Merge.ts"/>
/// <reference path="../Colisionable.ts"/>
/// <reference path="../../actores/libroPrimaria/Coty.ts"/>
/// <reference path="../../comportamientos/SaltarAnimado.ts"/>
/// <reference path="../../comportamientos/Hundirse.ts"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Charco = (function (_super) {
    __extends(Charco, _super);
    function Charco() {
        _super.call(this, 0, 0);
        this.definirAnimacion("parado", [0], 6, true);
    }
    Charco.prototype.comportamientosAlColisionar = function () {
        return [Hundirse];
    };
    Charco._grilla = 'actor.charco.png';
    Charco = __decorate([
        /// <reference path = "../../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
        mergeWith(Colisionable), 
        __metadata('design:paramtypes', [])
    ], Charco);
    return Charco;
})(ActorAnimado);
var Churrasco = (function (_super) {
    __extends(Churrasco, _super);
    function Churrasco() {
        _super.call(this, 0, 0, { cantColumnas: 2 });
        this.definirAnimacion("parado", [0], 6, true);
        this.definirAnimacion("desaparecer", [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 12);
    }
    Churrasco._grilla = 'actor.churrasco.png';
    return Churrasco;
})(ActorAnimado);
/// <reference path="../ActorAnimado.ts"/>
/// <reference path="../../comportamientos/ComportamientoAnimado.ts"/>
var Duba = (function (_super) {
    __extends(Duba, _super);
    function Duba() {
        _super.call(this, 0, 0, { cantColumnas: 10, cantFilas: 15 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(16)
            .concat([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52])
            .concat(new Cuadros(0).repetirVeces(30))
            .concat([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52])
            .concat(new Cuadros(0).repetirVeces(30))
            .concat([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52])
            .concat(new Cuadros(0).repetirVeces(16))
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 23, 23, 23, 24, 25, 26, 27, 27, 28, 29, 30, 31, 31, 31, 31, 31, 32])
            .concat(new Cuadros(0).repetirVeces(5)), 12, true);
        this.definirAnimacion("correr", [0, 53, 54, 55, 56, 57, 58, 59, 60, 0], 36);
        this.definirAnimacion("correrChocando", [0, 53, 54, 55, 56, 57, 58, 59, 60, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 88, 89, 90, 90], 12);
        this.definirAnimacion("comerChurrasco", [0, 0, 61, 62, 63, 64, 65, 65, 65, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75], 12);
        this.definirAnimacion("obstaculo", [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 128, 128, 128, 128], 12);
        this.definirAnimacion("error", [129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 142, 142, 142], 12);
    }
    Duba._grilla = 'actor.duba.png';
    return Duba;
})(ActorAnimado);
/// <reference path="../ActorAnimado.ts"/>
var Ensaladera = (function (_super) {
    __extends(Ensaladera, _super);
    function Ensaladera() {
        _super.call(this, 0, 0, { cantColumnas: 3 });
        this.definirAnimacion("parado", [0], 12, true);
        this.definirAnimacion("preparando", [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 12);
        this.definirAnimacion("llena", [1], 12);
    }
    Ensaladera._grilla = 'actor.ensaladera.png';
    return Ensaladera;
})(ActorAnimado);
var Tomate = (function (_super) {
    __extends(Tomate, _super);
    function Tomate() {
        _super.call(this, 0, 0, { cantColumnas: 2 });
        this.definirAnimacion("parado", [0], 12, true);
        this.definirAnimacion("desaparecer", [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 12);
    }
    Tomate._grilla = 'actor.tomate.png';
    return Tomate;
})(ActorAnimado);
var Lechuga = (function (_super) {
    __extends(Lechuga, _super);
    function Lechuga() {
        _super.call(this, 0, 0, { cantColumnas: 2 });
        this.definirAnimacion("parado", [0], 12, true);
        this.definirAnimacion("desaparecer", [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 12);
    }
    Lechuga._grilla = 'actor.lechuga.png';
    return Lechuga;
})(ActorAnimado);
/// <reference path = "../../actores/ActorAnimado.ts" />
/// <reference path = "../../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/**
 * Actor que representa una letra en una cuadrícula.
 */
var Letra = (function (_super) {
    __extends(Letra, _super);
    /**
     * @param unString Indica la letra que será representada por el actor (case insensitive).
     */
    function Letra(unString) {
        _super.call(this, 0, 0, {
            cantColumnas: Letra._caracteresValidos.length,
            cantFilas: 1,
            cuadrosParado: [Letra.indiceDeCaracter(Letra.primerLetraDeString(unString))]
        });
        this._caracter = Letra.primerLetraDeString(unString);
        this.agregarEtiqueta("Letra");
    }
    /**
     * Devuelve la letra representada por el actor (en mayúsculas).
     */
    Letra.prototype.caracter = function () {
        return this._caracter;
    };
    /**
     * Permite verificar de antemano si es posible crear una instancia de Letra
     * a partir de cierto string
     */
    Letra.esArgumentoValido = function (unString) {
        return Letra.esCaracterValido(unString[0].toUpperCase());
    };
    /**
     * Auxiliar para recuperar la primer letra de un string, en mayúsculas.
     * Falla si no es una letra.
     */
    Letra.primerLetraDeString = function (unString) {
        var caracter = unString[0].toUpperCase();
        if (Letra.esCaracterValido(caracter)) {
            return caracter;
        }
        else {
            throw Error("El cáracter proporcionado no es una letra");
        }
    };
    /**
     * Convierte una letra en mayúsculas a un código numérico.
     * A => 0, B => 1, C => 2 y así sucesivamente.
     */
    Letra.indiceDeCaracter = function (unString) {
        return this._caracteresValidos.indexOf(unString);
    };
    Letra.esCaracterValido = function (unString) {
        return unString.length == 1 && Letra._caracteresValidos.indexOf(unString) >= 0;
    };
    Letra._caracteresValidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑ ";
    return Letra;
})(ActorAnimado);
var LetraTablero = (function (_super) {
    __extends(LetraTablero, _super);
    function LetraTablero() {
        _super.apply(this, arguments);
    }
    LetraTablero._grilla = 'actor.letra.tablero.png';
    return LetraTablero;
})(Letra);
var LetraLeida = (function (_super) {
    __extends(LetraLeida, _super);
    function LetraLeida() {
        _super.apply(this, arguments);
    }
    LetraLeida._grilla = 'actor.letra.leida.png';
    return LetraLeida;
})(Letra);
var LetraManuscrita = (function (_super) {
    __extends(LetraManuscrita, _super);
    function LetraManuscrita() {
        _super.apply(this, arguments);
    }
    LetraManuscrita._grilla = 'actor.letra.manuscrita.png';
    return LetraManuscrita;
})(Letra);
/// <reference path="../ActorAnimado.ts"/>
var Lita = (function (_super) {
    __extends(Lita, _super);
    function Lita() {
        _super.call(this, 0, 0, { cantColumnas: 10, cantFilas: 17 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(16)
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
            .concat(new Cuadros(0).repetirVeces(28))
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
            .concat(new Cuadros(0).repetirVeces(28))
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
            .concat(new Cuadros(0).repetirVeces(28))
            .concat([0, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 35, 36, 37, 38])
            .concat(new Cuadros(0).repetirVeces(5)), 12, true);
        this.definirAnimacion("correr", [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 39, 40, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53], 20);
        this.definirAnimacion("desenrrollar", [53, 53, 53, 53], 12);
        this.definirAnimacion("agarrarLechuga", [0, 0, 54, 54, 55, 56, 57, 58, 58, 59, 59, 60, 60, 61, 61, 62, 62, 62], 12);
        this.definirAnimacion("agarrarTomate", [0, 0, 63, 63, 64, 65, 66, 67, 68, 69, 69, 70, 70, 71, 71, 72, 72, 72], 12);
        this.definirAnimacion("prepararEnsalada", [0, 0, 0, 0, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97], 12);
        this.definirAnimacion("correrChocando", [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 0, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122], 12);
        this.definirAnimacion("obstaculo", [123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 159, 159, 159, 159], 12);
        this.definirAnimacion("error", [160, 161, 162, 163].concat(new Cuadros(164).repetirVeces(30)).concat([163, 162, 161, 160]), 12);
    }
    Lita._grilla = 'actor.lita.png';
    return Lita;
})(ActorAnimado);
/// <reference path="../ActorAnimado.ts"/>
/**
 * El objetivo es que cualquier obstáculo de una cuadrícula tenga la misma forma
*/
var Obstaculo = (function (_super) {
    __extends(Obstaculo, _super);
    function Obstaculo(imagen, semilla) {
        if (Array.isArray(imagen)) {
            _super.call(this, 0, 0, { grilla: Obstaculo.randomDe(imagen, semilla) });
        }
        else {
            _super.call(this, 0, 0, imagen);
        }
    }
    Obstaculo.imagenesPara = function (actor) {
        //TODO: Usar Lodash
        return [1, 2, 3, 4].map(function (n) { return ("obstaculo." + actor + n + ".png"); });
    };
    Obstaculo.imagenesPreCarga = function () {
        //Como los obstáculos dependen del actor, se debería usar imagenesPara(actor) para obtener las imágenes.
        throw "Obstaculo.imagenesPreCarga() is useless. Should use Obstaculo.imagenesPara(actor)";
    };
    Obstaculo.randomDe = function (lista, semilla) {
        // magia matemática para elegir un elemento random usando un seed
        var x = Math.sin(semilla) * 10000;
        var index = Math.floor((x - Math.floor(x)) * lista.length);
        return lista[index];
    };
    return Obstaculo;
})(ActorAnimado);
/// <reference path="../ActorAnimado.ts"/>
/// <reference path="./Letra.ts"/>
/// <reference path="../Cuadricula.ts"/>
var Toto = (function (_super) {
    __extends(Toto, _super);
    function Toto() {
        _super.call(this, 0, 0, { cantFilas: 24, cantColumnas: 10 });
    }
    Toto.prototype.caracterActual = function () {
        var letra = this.casillaActual().actoresConEtiqueta('Letra')[0];
        if (!letra)
            throw new ActividadError("No hay una letra aquí");
        return letra.caracter();
    };
    Toto.prototype.leyendoCaracter = function (caracter) {
        return this.caracterActual() == caracter.toUpperCase();
    };
    Toto._grilla = 'actor.toto.png';
    return Toto;
})(ActorAnimado);
var TotoLector = (function (_super) {
    __extends(TotoLector, _super);
    function TotoLector() {
        _super.call(this);
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(16)
            .concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
            .concat(new Cuadros(0).repetirVeces(32))
            .concat([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65])
            .concat(new Cuadros(0).repetirVeces(16)), 12, true);
        this.definirAnimacion("correr", [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218], 16);
        this.definirAnimacion("error", [219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234], 12);
    }
    return TotoLector;
})(Toto);
var TotoEscritor = (function (_super) {
    __extends(TotoEscritor, _super);
    function TotoEscritor() {
        _super.call(this);
        this.definirAnimacion("parado", new Cuadros(79).repetirVeces(16)
            .concat([79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99])
            .concat(new Cuadros(79).repetirVeces(32))
            .concat([100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119])
            .concat(new Cuadros(79).repetirVeces(32))
            .concat([120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164])
            .concat(new Cuadros(79).repetirVeces(16)), 12, true);
        this.definirAnimacion("correr", [0, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 0], 36);
        this.definirAnimacion("escribir", [178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197], 12);
    }
    return TotoEscritor;
})(Toto);
/// <reference path="ActorAnimado.ts"/>
/// <reference path="../habilidades/Flotar.ts"/>
var LlaveAnimado = (function (_super) {
    __extends(LlaveAnimado, _super);
    function LlaveAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'llaveAnimada.png', cantColumnas: 1 });
        this.definirAnimacion("recoger", [1], 12);
        this.definirAnimacion("correr", [1], 12);
        this.definirAnimacion("parado", [1], 12, true);
    }
    return LlaveAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var MagoAnimado = (function (_super) {
    __extends(MagoAnimado, _super);
    function MagoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'mago.png', cantColumnas: 4, cantFilas: 2 });
        this.definirAnimacion("parado", new Cuadros(1).repetirVeces(16).concat([2, 2, 2, 2, 2]), 2, true);
        this.definirAnimacion("darEspada", new Cuadros([1, 3, 4, 5, 5, 6, 6, 7, 7]).repetirVeces(1).concat(new Cuadros(0).repetirVeces(999)), 6);
        this.definirAnimacion("paradoConSombrero", [0], 12);
    }
    return MagoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var ManzanaAnimada = (function (_super) {
    __extends(ManzanaAnimada, _super);
    function ManzanaAnimada(x, y, conSombra) {
        if (conSombra === void 0) { conSombra = true; }
        _super.call(this, x, y, { grilla: conSombra ? 'manzanaConSombra.png' : 'manzanaSinSombra.png', cantColumnas: 1, cantFilas: 1 });
    }
    return ManzanaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var MarcianoAnimado = (function (_super) {
    __extends(MarcianoAnimado, _super);
    function MarcianoAnimado(x, y) {
        _super.call(this, x, y, this.opcionesImagen());
        this.definirAnimacion("correr", [7, 8, 9, 10, 11], 12);
        this.definirAnimacion("parado", [0, 1, 2, 3, 4, 5], 5, true);
        this.definirAnimacion("recoger", [11, 12, 12, 11], 5);
        this.definirAnimacion("recogerHierro", [11, 12, 12, 11, 13, 13, 13], 5);
        this.definirAnimacion("recogerCarbon", [11, 12, 12, 11, 14, 14, 14], 5);
        this.definirAnimacion("comerManzana", [11, 12, 12, 11, 15, 15, 15], 5);
        this.definirAnimacion("comerNaranja", [11, 12, 12, 11, 16, 16, 16], 5);
        this.animacionesAdicionales();
    }
    MarcianoAnimado.prototype.opcionesImagen = function () {
        return { grilla: 'marcianoAnimado.png', cantColumnas: 6, cantFilas: 3 };
    };
    MarcianoAnimado.prototype.animacionesAdicionales = function () {
        // Template method
    };
    return MarcianoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var MariaAnimada = (function (_super) {
    __extends(MariaAnimada, _super);
    function MariaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'maria.png', cantColumnas: 10, cantFilas: 2 });
        this.definirAnimacion("parado", [0, 0, 0], 15, true);
        this.definirAnimacion("correr", [0, 1, 2, 3, 4, 5], 12);
        this.definirAnimacion("recoger", [11, 12, 13, 14, 15, 16, 17, 18, 19], 10);
    }
    return MariaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var MonoAnimado = (function (_super) {
    __extends(MonoAnimado, _super);
    function MonoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'monoAnimado.png', cantColumnas: 19, cantFilas: 1 });
        this.definirAnimacion("correr", [0, 1, 2, 3, 4, 5, 6, 7], 9);
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(50).concat([0, 1, 2, 3, 4]).concat(new Cuadros(4).repetirVeces(30)).concat([4, 3, 2, 1, 0]), 6, true);
        this.definirAnimacion("comerBanana", [8, 9, 10, 11, 12], 6);
        this.definirAnimacion("comerManzana", [13, 14, 15, 16, 17], 6);
    }
    return MonoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Murcielago = (function (_super) {
    __extends(Murcielago, _super);
    function Murcielago(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'murcielago.png', cantColumnas: 4 });
        this.definirAnimacion("parado", [0, 1, 2, 3, 2, 1], 12, true);
    }
    return Murcielago;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var NanoAnimado = (function (_super) {
    __extends(NanoAnimado, _super);
    function NanoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'nano.png', cantColumnas: 14 });
        this.definirAnimacion('parado', new Cuadros([0]).repetirVeces(30).
            concat([1, 1, 2, 2]).
            concat(new Cuadros([2]).repetirVeces(15)).
            concat([2, 2, 1, 1]), 6, true);
        this.definirAnimacion('correr', [7, 9, 7, 9], 12);
        this.definirAnimacion('comerBanana', [10, 11, 12, 13, 13, 12, 11, 10], 30);
    }
    return NanoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var NaranjaAnimada = (function (_super) {
    __extends(NaranjaAnimada, _super);
    function NaranjaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'naranja.png', cantColumnas: 1, cantFilas: 1 });
        this.definirAnimacion("comerse", [0], 6);
        this.definirAnimacion("mordida", [0], 1);
    }
    return NaranjaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var NaveAnimada = (function (_super) {
    __extends(NaveAnimada, _super);
    function NaveAnimada(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'naveAnimada.png', cantColumnas: 4, cantFilas: 1 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(30).concat([1]), 4, true);
        this.definirAnimacion("correr", new Cuadros([0, 1, 2]).repetirVeces(1).concat(new Cuadros(3).repetirVeces(100)), 6);
    }
    return NaveAnimada;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path="ActorAnimado.ts"/>
var Obrero = (function (_super) {
    __extends(Obrero, _super);
    function Obrero(x, y) {
        _super.call(this, x, y, { grilla: 'cooperativista.camina.png', cantColumnas: 4 });
        this.definirAnimacion("correr", [0, 1, 2, 3, 2, 1], 15);
        this.definirAnimacion("parado", [3], 5);
    }
    Obrero.prototype.restaurar = function () {
        var grilla = pilas.imagenes.cargar_grilla('cooperativista.camina.png', 4);
        this.imagen = grilla;
    };
    Obrero.prototype.argumentosMartillar = function () {
        return { grilla: 'cooperativista.trabajando.png', cantColumnas: 2 };
    };
    Obrero.prototype.fraseAlSaltar = function () {
        return this.escena.fraseAlSaltar();
    };
    return Obrero;
})(ActorAnimado);
/*
Implementa un objeto que puede ser observado por otros, es decir,
implementa la interfaz registrarObservador y tuObservadorCambio,
que avisa a los observadores sobre el cambio
*/
// Pensado para ser Trait.
var Observado = (function () {
    function Observado() {
    }
    Observado.prototype.inicializarObservadores = function () {
        if (!this.observadores)
            this.observadores = [];
    };
    Observado.prototype.registrarObservador = function (observador) {
        this.inicializarObservadores();
        this.observadores.push(observador);
        this.changed();
    };
    Observado.prototype.changed = function () {
        var _this = this;
        this.inicializarObservadores(); // TODO: se puede sacar?
        this.observadores.forEach(function (o) { return o.tuObservadoCambio(_this); });
    };
    return Observado;
})();
var ObservadoConAumentar = (function (_super) {
    __extends(ObservadoConAumentar, _super);
    function ObservadoConAumentar() {
        _super.apply(this, arguments);
    }
    ObservadoConAumentar.prototype.aumentar = function (atributo, valorAumento) {
        this[atributo] = this[atributo] + valorAumento;
        this.changed();
    };
    return ObservadoConAumentar;
})(Observado);
var ObservadoConDisminuir = (function (_super) {
    __extends(ObservadoConDisminuir, _super);
    function ObservadoConDisminuir() {
        _super.apply(this, arguments);
    }
    ObservadoConDisminuir.prototype.disminuir = function (atributo, valorDisminucion) {
        this[atributo] = this[atributo] - valorDisminucion;
        this.changed();
    };
    return ObservadoConDisminuir;
})(Observado);
/// <reference path="ActorAnimado.ts"/>
var PapaNoelAnimado = (function (_super) {
    __extends(PapaNoelAnimado, _super);
    function PapaNoelAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'papaNoel.png', cantColumnas: 12 });
        this.definirAnimacion('correr', [4, 5, 6, 7, 6, 5, 4], 6);
        this.definirAnimacion('parado', new Cuadros([0]).repetirVeces(40).
            concat(new Cuadros([2, 3, 2, 1]).repetirVeces(3)), 6, true);
        this.definirAnimacion('recoger', [8, 9, 10, 11], 6);
        this.definirAnimacion('depositar', [11, 10, 9, 8], 6);
    }
    return PapaNoelAnimado;
})(ActorAnimado);
var PelotaAnimada = (function (_super) {
    __extends(PelotaAnimada, _super);
    function PelotaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'pelotaAnimada.png', cantColumnas: 16 });
        this.definirAnimacion("patear", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12);
    }
    return PelotaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var PerroCohete = (function (_super) {
    __extends(PerroCohete, _super);
    function PerroCohete(x, y) {
        _super.call(this, x, y, { grilla: 'perro_cohete.png', cantColumnas: 1, cantFilas: 7 });
        this.definirAnimacion("correr", [4, 5, 6, 5], 15, true);
        this.definirAnimacion("parado", [4], 5);
        this.definirAnimacion("recoger", [4, 2, 0, 2, 4], 10);
    }
    return PerroCohete;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var PezAnimado = (function (_super) {
    __extends(PezAnimado, _super);
    function PezAnimado(x, y) {
        _super.call(this, x, y, { grilla: this.nombrePNG(), cantColumnas: 4, cantFilas: 1 });
        this.definirAnimacion("parado", new Cuadros(0).repetirRandom(100).concat([1, 2, 3, 3, 2, 1]), 6, true);
        this.definirAnimacion("recoger", [0, 1, 2, 3, 2, 1], 6);
    }
    PezAnimado.prototype.nombrePNG = function () {
        if (Math.random() < 1 / 3)
            return 'pez1.png';
        if (Math.random() < 0.5)
            return 'pez2.png';
        return 'pez3.png';
    };
    return PezAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Princesa = (function (_super) {
    __extends(Princesa, _super);
    function Princesa(x, y) {
        _super.call(this, x, y, { grilla: this.nombreArchivo(), cantColumnas: 2 });
        this.definirAnimacion("parado", new Cuadros(1).repetirVeces(20).concat([0, 0, 0, 0]), 2, true);
        this.definirAnimacion("correr", [0], 6);
    }
    Princesa.prototype.nombreArchivo = function () {
        return 'princesa.png';
    };
    return Princesa;
})(ActorAnimado);
var Principe = (function (_super) {
    __extends(Principe, _super);
    function Principe() {
        _super.apply(this, arguments);
    }
    Principe.prototype.nombreArchivo = function () {
        return 'principe.png';
    };
    return Principe;
})(Princesa);
/// <reference path="ActorAnimado.ts"/>
var RatonAnimado = (function (_super) {
    __extends(RatonAnimado, _super);
    function RatonAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'raton.png', cantColumnas: 9, cantFilas: 1 });
        this.definirAnimacion("parado", new Cuadros(0).repetirVeces(10).concat([1]), 1, true);
        this.definirAnimacion("correr", [2, 3, 4, 3, 4, 3, 4], 6);
        this.definirAnimacion("recoger", [5, 6, 7, 8], 12);
    }
    return RatonAnimado;
})(ActorAnimado);
var QuesoAnimado = (function (_super) {
    __extends(QuesoAnimado, _super);
    function QuesoAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'queso.png', cantColumnas: 1, cantFilas: 1 });
        this.definirAnimacion("parado", [0], 15, true);
        this.definirAnimacion("correr", [0], 15);
        this.definirAnimacion("recoger", [0], 15);
    }
    return QuesoAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var RecolectorEstrellas = (function (_super) {
    __extends(RecolectorEstrellas, _super);
    function RecolectorEstrellas(x, y) {
        _super.call(this, x, y, { grilla: 'recolectorAnimado.png', cantColumnas: 5, cantFilas: 1 });
        this.definirAnimacion("parado", [0], 2);
        this.definirAnimacion("correr", [0, 1, 2, 3, 3, 3, 4, 0], 9);
        this.definirAnimacion("recoger", [4, 3, 3, 3, 3, 3, 3, 4], 9);
    }
    return RecolectorEstrellas;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var RegaloAnimado = (function (_super) {
    __extends(RegaloAnimado, _super);
    function RegaloAnimado(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'regalo.png', cantColumnas: 1, cantFilas: 1 });
    }
    return RegaloAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var RobotAnimado = (function (_super) {
    __extends(RobotAnimado, _super);
    function RobotAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'robotAnimado.png', cantColumnas: 13 });
        this.definirAnimacion("correr", [0, 1, 2, 3, 4, 5], 6);
        this.definirAnimacion("patear", [8, 9, 10, 11, 12, 11, 10, 9, 8], 6);
    }
    return RobotAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var SandiaAnimada = (function (_super) {
    __extends(SandiaAnimada, _super);
    function SandiaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'sandia.png', cantColumnas: 5, cantFilas: 1 });
        this.definirAnimacion("comerse", [0, 1, 2, 3, 4], 6);
        this.definirAnimacion("mordida", [4], 1);
    }
    return SandiaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var ScoutAnimado = (function (_super) {
    __extends(ScoutAnimado, _super);
    function ScoutAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'actor.BoyScout.png', cantColumnas: 9, cantFilas: 1 });
        this.definirAnimacion("parado", [0], 1, true);
        this.definirAnimacion("correr", [1, 2, 3], 5);
        this.definirAnimacion("prender", [3, 4, 5, 6, 7, 8, 7, 8, 7, 8, 7, 8], 9);
    }
    return ScoutAnimado;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
/// <reference path="../comportamientos/Decir.ts"/>
var Sospechoso = (function (_super) {
    __extends(Sospechoso, _super);
    function Sospechoso(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'sospechosos.png', cantColumnas: 8 });
        this.definirAnimacion("parado", [this.nroDisfraz()], 4, true);
        this.definirAnimacion("culpable", [7], 4);
        this.tieneDisflazPuesto = true;
    }
    Sospechoso.reiniciarDisfraces = function () {
        this.disfracesUsados = [];
    };
    Sospechoso.prototype.nroDisfraz = function () {
        var disfraz = this.disfracesDisponibles()[Math.floor(Math.random() * this.disfracesDisponibles().length)];
        Sospechoso.disfracesUsados.push(disfraz);
        return disfraz;
    };
    Sospechoso.prototype.disfracesDisponibles = function () {
        var disponibles = [0, 1, 2, 3, 4, 5, 6];
        Sospechoso.disfracesUsados.forEach(function (nro) { return disponibles.splice(disponibles.indexOf(nro), 1); });
        return disponibles;
    };
    Sospechoso.prototype.hacerCulpable = function () {
        this.meaCulpa = true;
    };
    Sospechoso.prototype.esCulpable = function () {
        return this.meaCulpa;
    };
    Sospechoso.prototype.sacarDisfraz = function () {
        if (this.meaCulpa) {
            this.cargarAnimacion("culpable");
        }
        this.tieneDisflazPuesto = false; // TODO: podríamos emitir un error si se le quita el disfraz más de una vez.
    };
    Sospechoso.prototype.mensajeAlSacarDisfraz = function () {
        if (this.meaCulpa)
            return "¡ME RINDO!";
        function randomDe(lista) {
            return lista[Math.floor(Math.random() * lista.length)];
        }
        ;
        return randomDe(["¡Yo no fui!", "¡No me mires a mí!", "¡Fue él, a él, muchachos!", "Estaba así cuando llegué..."]);
    };
    Sospechoso.prototype.teEncontraron = function () {
        return this.nombreAnimacionActual() === "culpable";
    };
    return Sospechoso;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Superheroe = (function (_super) {
    __extends(Superheroe, _super);
    function Superheroe(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        _super.call(this, x, y, { grilla: 'superheroe.png', cantColumnas: 7 });
        this.definirAnimacion('parado', new Cuadros([0]).repetirVeces(10).concat([1, 0, 1, 0]), 6, true);
        this.definirAnimacion('correr', [2, 3, 4, 5, 4, 5, 4, 5, 4, 3, 2, 6, 6], 15);
    }
    return Superheroe;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var Tito = (function (_super) {
    __extends(Tito, _super);
    function Tito(x, y) {
        _super.call(this, x, y, { grilla: 'tito.png', cantColumnas: 8, cantFilas: 1 });
        this.definirAnimacion("correr", [3, 4, 5, 6, 6, 6, 6, 6, 6, 5, 4, 8], 12);
        this.definirAnimacion("parado", [0, 1, 2, 2, 3, 4], 6, true);
        this.definirAnimacion("bailando", [0, 1, 2, 2, 3, 4], 6);
        this.definirAnimacion("recoger", [0, 1, 2, 2, 2, 2, 2, 2, 3, 4], 9);
    }
    return Tito;
})(ActorAnimado);
var TuercaAnimada = (function (_super) {
    __extends(TuercaAnimada, _super);
    function TuercaAnimada(x, y) {
        _super.call(this, x, y, { grilla: 'tuerca.png', cantColumnas: 1 });
    }
    return TuercaAnimada;
})(ActorAnimado);
/// <reference path="ActorAnimado.ts"/>
var UnicornioAnimado = (function (_super) {
    __extends(UnicornioAnimado, _super);
    function UnicornioAnimado(x, y) {
        _super.call(this, x, y, { grilla: 'unicornio.png', cantColumnas: 5, cantFilas: 2 });
        this.definirAnimacion("parado", [0, 0, 0, 0, 1, 2, 3, 4, 3], 12);
        this.definirAnimacion("correr", [5, 6, 7, 8, 9], 12);
    }
    return UnicornioAnimado;
})(ActorAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ComportamientoAnimado.ts"/>
var AnimarSiNoEstoyYa = (function (_super) {
    __extends(AnimarSiNoEstoyYa, _super);
    function AnimarSiNoEstoyYa() {
        _super.apply(this, arguments);
    }
    AnimarSiNoEstoyYa.prototype.configurarVerificaciones = function () {
        var _this = this;
        this.verificacionesPre.push(new Verificacion(function () { return _this.puedoRealizarAnimacionYCambio(); }, "No puedo, ya estoy " + this.argumentos.valorEstar));
    };
    AnimarSiNoEstoyYa.prototype.puedoRealizarAnimacionYCambio = function () {
        return (this.esElPrimerCambioDeEstado() && !this.arrancoEnEsteEstado()) ||
            (!this.esElPrimerCambioDeEstado() && !this.yaEstabaEnEsteEstado()); // Porque no puedo cambiar al estado en el que ya estaba.
    };
    AnimarSiNoEstoyYa.prototype.arrancoEnEsteEstado = function () {
        return this.argumentos.arrancoAsi;
    };
    AnimarSiNoEstoyYa.prototype.yaEstabaEnEsteEstado = function () {
        return this.receptor[this.argumentos.descripcionEstar] === this.argumentos.valorEstar;
    };
    AnimarSiNoEstoyYa.prototype.esElPrimerCambioDeEstado = function () {
        return !this.receptor[this.argumentos.descripcionEstar];
    };
    AnimarSiNoEstoyYa.prototype.postAnimacion = function () {
        this.receptor[this.argumentos.descripcionEstar] = this.argumentos.valorEstar;
    };
    return AnimarSiNoEstoyYa;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Errores.ts"/>
/// <reference path = "../actores/ActorAnimado.ts"/>
/// <reference path = "EstadosDeEscena.ts"/>
// Esta escena sirve para todas las escenas de Ejercicios Pilas.
// Toda escena que represente una actividad debe heredar de aquí.
var EscenaActividad = (function (_super) {
    __extends(EscenaActividad, _super);
    function EscenaActividad() {
        _super.apply(this, arguments);
        this.estado = new Estado();
        this.errorHandler = new ProductionErrorHandler(this);
    }
    /**
     * Devuelve todos los nombres de archivo de imagen necesarios para
     * poder correr la escena. De esta forma sólo se precargarán esas imágenes
     * y no todas las existentes de todas las escenas.
     * Es estático porque es necesario antes de la creación de la escena ó sus objetos.
     */
    EscenaActividad.imagenesPreCarga = function () {
        var imgsPrecargar = this.pathFondo() ? [this.pathFondo()] : [];
        this.clasesDeActoresInvolucrados().forEach(function (c) { return imgsPrecargar = imgsPrecargar.concat(c.imagenesPreCarga()); });
        var imgs = imgsPrecargar.concat(this.imagenesAdicionales());
        return this.faltanImagenes ? [] : imgs;
    };
    /**
     * Devuelve las clases de los actores que hay en escena. Se le preguntará la imagen a precargar
     * a cada una de esas clases.
     * Pensado para redefinirse por escena.
     */
    EscenaActividad.clasesDeActoresInvolucrados = function () {
        this.faltanImagenes = true;
        return [];
    };
    ;
    EscenaActividad.pathFondo = function () {
        this.faltanImagenes = true;
        return '';
    };
    /**
     * Además de definir las clases de actores involucradas, las escenas pueden agregar
     * nombres de archivo de imagen adicionales con este método.
     * Pensado para redefinirse por escena.
     */
    EscenaActividad.imagenesAdicionales = function () {
        return [];
    };
    EscenaActividad.prototype.actualizar = function () {
        try {
            _super.prototype.actualizar.call(this);
        }
        catch (e) {
            this.errorHandler.handle(e);
        }
    };
    EscenaActividad.prototype.estaResueltoElProblema = function () {
        return this.estado.soyAceptacion();
    };
    // TODO: Deprecar, reemplazar por contarActoresConEtiqueta.
    EscenaActividad.prototype.cantidadObjetosConEtiqueta = function (etiqueta) {
        return pilas.obtener_actores_con_etiqueta(etiqueta).length;
    };
    EscenaActividad.prototype.personajePrincipal = function () {
        return this.automata;
    };
    EscenaActividad.prototype.maxZ = function () {
        return this.stage.children[0].z;
    };
    EscenaActividad.prototype.minZ = function () {
        return this.stage.children[this.stage.children.length - 1].z;
    };
    EscenaActividad.prototype.obtenerActoresConEtiqueta = function (etiqueta) {
        return this.obtenerActoresConEtiquetas([etiqueta]);
    };
    EscenaActividad.prototype.obtenerActoresConEtiquetas = function (etiquetas) {
        return this.actores.filter(function (actor) { return etiquetas.some(function (etiqueta) { return actor.tiene_etiqueta(etiqueta); }); });
    };
    EscenaActividad.prototype.contarActoresConEtiqueta = function (etiqueta) {
        return this.obtenerActoresConEtiqueta(etiqueta).length;
    };
    /**
     * Computa un multiplicador que crece según la cantidad de filas y columnas de la cuadrícula.
     * El multiplicador es 1 si la cuadrícula es de 1x1, y crece acotado por maxRatio.
     * Es útil para aplicar un factor de escala a los elementos cuando las casillas son muy pequeñas.
     */
    EscenaActividad.prototype.escalaSegunCuadricula = function (maxRatio) {
        return maxRatio - ((maxRatio - 1) / Math.max(this.cuadricula.cantFilas, this.cuadricula.cantColumnas));
    };
    EscenaActividad.faltanImagenes = false;
    return EscenaActividad;
})(Base);
/// <reference path = "EscenaActividad.ts" />
/**

Qué son las FSM - Version clásica

FSM significa máquina de estados finitos. Se las usa para modelar sistemas reactivos y concurrentes,
fundamentalmente porque tienen definido el operador de composición (A||B) que
modela la ejecución concurrente de A y B.

En su versión clásica, es un conjunto de estados con transiciones etiquetadas. Hay un único estado
inicial y uno o más finales. La máquina va cambiando de estado a partir de las transiciones y, en
el caso de querer transicionar por una etiqueta no definida, salta a un estado “trampa” de error,
que se asume implícito en toda máquina.

Para qué usamos las FSM
Tienen tres objetivos en el contexto de Pilas-Bloques:
1. Modelar las restricciones de precedencia en las acciones de la escena.
Por ejemplo, en la escena “La gran aventura del mar encantado” (mirarla), donde
el orden es: llave, cofre, mago, caballero y unicornio, podemos definirlo en
términos de transiciones y “de regalo” sabemos que cualquier otra combinación es errónea.

2. Definir errores ad-hoc, más declarativos para el estudiante respecto de lo
que hizo mal. En LGADME, podemos definir errores específicos, por ejemplo, si no
busco la llave “debés buscar la llave primero”. En el caso de que no se defina nada,
hay un error por default definido.

3. Definir fácilmente el estado “ganador” de la escena: como toda la lógica de la escena
está definida en términos de la máquina, basta con marcar aquellos estados que son
ganadores como “finales”.

Cómo usarlas para implementar el Ganaste!
Todas las escenas deben implementar estaResueltoElProblema().

Cuando las escenas no tienen una máquina de estados (this.estado=undefined),
perfectamente se puede implementar una función que verifique la resolución. Por ejemplo,
en el caso de María la come sandías, basta verificar que no queden sandias en la escena al finalizar.

Cuando hay máquina de estado hay dos opciones: marcar estados como de aceptación
(finales) (notar que la clase EscenaActividad implementa estaResuletoElProblema()
como verificacion de estado de aceptación) o bien hacer override y dejar que la FSM
se encargue pura y exclusivamente  de los errores de orden.


======================================
PROBLEMA:
La máquina de estados por defecto considera errónea cualquier transición no definida
en el grafo de estados.
Es por ello que no sirve para ser usada en casos donde varias soluciones pueden ser correctas,
porque la configuración debe considerarlas todas.
En estos casos, se debe pensar bien si es necesaria la FSM, y cuáles son las transiciones aceptables.
*/
var Estado = (function () {
    function Estado(funcionAceptacion) {
        if (funcionAceptacion === void 0) { funcionAceptacion = function () { return false; }; }
        this.funcionAceptacion = funcionAceptacion;
    }
    Estado.prototype.soyAceptacion = function () {
        return this.funcionAceptacion();
    };
    // Para que sea polimórfico con EstadoConTransicion
    Estado.prototype.realizarTransicion = function (idTransicion) { };
    return Estado;
})();
var EstadoConTransicion = (function (_super) {
    __extends(EstadoConTransicion, _super);
    function EstadoConTransicion(escena, idEstado, soyAceptacion) {
        if (soyAceptacion === void 0) { soyAceptacion = false; }
        _super.call(this, function () { return soyAceptacion; });
        this.datos = {};
        this.escena = escena;
        this.identifier = idEstado;
        this.transiciones = {};
        this.errores = {};
    }
    EstadoConTransicion.prototype.agregarTransicion = function (estadoEntrada, idTransicion, condicionTransicion) {
        if (condicionTransicion === void 0) { condicionTransicion = function () { return true; }; }
        this.transiciones[idTransicion] = {
            estadoEntrada: estadoEntrada,
            condicionTransicion: condicionTransicion,
        };
    };
    EstadoConTransicion.prototype.agregarError = function (idTransicion, mensajeError) {
        this.errores[idTransicion] = mensajeError;
    };
    EstadoConTransicion.prototype.realizarTransicion = function (idTransicion) {
        if (this.puedoTransicionarA(idTransicion)) {
            // console.log("Transicion:" + idTransicion + ", self:" + this.identifier + ", estado escena:" + pilas.escena_actual().estado.identifier + ", al estado:" + this.estadoSiguiente(comportamiento, idTransicion).identifier + ", comportamiento:" + comportamiento.constructor.name + ", receptor:" + comportamiento.receptor.constructor.name);
            this.escena.estado = this.estadoSiguiente(idTransicion);
        }
        else if (idTransicion in this.errores) {
            throw new ActividadError(this.errores[idTransicion]);
        }
        else {
            throw new ActividadError("¡Ups, esa no era la opción correcta!");
        }
    };
    EstadoConTransicion.prototype.puedoTransicionarA = function (idTransicion) {
        return idTransicion in this.transiciones;
    };
    EstadoConTransicion.prototype.estadoSiguiente = function (idTransicion) {
        return this.transiciones[idTransicion].condicionTransicion() ?
            this.transiciones[idTransicion].estadoEntrada :
            this;
    };
    return EstadoConTransicion;
})(Estado);
// Sirve para que no tire error para salirse del camino
var EstadoTransicionSinError = (function (_super) {
    __extends(EstadoTransicionSinError, _super);
    function EstadoTransicionSinError() {
        _super.apply(this, arguments);
    }
    EstadoTransicionSinError.prototype.puedoTransicionarA = function (idTransicion) {
        return !(idTransicion in this.errores); // Siempre que no haya error definido me deja
    };
    EstadoTransicionSinError.prototype.estadoSiguiente = function (idTransicion) {
        if (!_super.prototype.puedoTransicionarA.call(this, idTransicion)) {
            return new EstadoTransicionSinError(this.escena, 'meFuiDelCamino');
        }
        else {
            return _super.prototype.estadoSiguiente.call(this, idTransicion);
        }
    };
    return EstadoTransicionSinError;
})(EstadoConTransicion);
var BuilderStatePattern = (function () {
    function BuilderStatePattern(escena, idEstadoInicial, tiraErrorSiSeVaDelCamino) {
        if (tiraErrorSiSeVaDelCamino === void 0) { tiraErrorSiSeVaDelCamino = true; }
        this.idEstadoInicial = idEstadoInicial;
        this.estados = {};
        this.escena = escena;
        this.estados[idEstadoInicial] = tiraErrorSiSeVaDelCamino
            ? new EstadoConTransicion(this.escena, idEstadoInicial)
            : new EstadoTransicionSinError(this.escena, idEstadoInicial);
    }
    BuilderStatePattern.prototype.estadoInicial = function () {
        return this.estados[this.idEstadoInicial];
    };
    BuilderStatePattern.prototype.agregarEstado = function (idEstado, tiraErrorSiSeVaDelCamino) {
        if (tiraErrorSiSeVaDelCamino === void 0) { tiraErrorSiSeVaDelCamino = true; }
        this.estados[idEstado] = tiraErrorSiSeVaDelCamino
            ? new EstadoConTransicion(this.escena, idEstado)
            : new EstadoTransicionSinError(this.escena, idEstado);
    };
    BuilderStatePattern.prototype.agregarEstadoAceptacion = function (idEstado) {
        this.estados[idEstado] = new EstadoConTransicion(this.escena, idEstado, true);
    };
    BuilderStatePattern.prototype.agregarTransicion = function (estadoSalida, estadoEntrada, transicion, condicionTransicion) {
        if (condicionTransicion === void 0) { condicionTransicion = function () { return true; }; }
        this.estados[estadoSalida].agregarTransicion(this.estados[estadoEntrada], transicion, condicionTransicion);
    };
    BuilderStatePattern.prototype.agregarError = function (estadoSalida, transicion, mensajeError) {
        this.estados[estadoSalida].agregarError(transicion, mensajeError);
    };
    BuilderStatePattern.prototype.agregarErrorAVariosEstadosDeSalida = function (estadoSalida, transicion, error, indexInicialSalida, indexFinalSalida) {
        //agrega un error para varios estados de salida con prefijos.
        //pre indexFinalSalida>indexInicialSalida
        var tamano = indexFinalSalida - indexInicialSalida;
        for (var index = 0; index <= tamano; ++index) {
            this.agregarError(estadoSalida + (indexInicialSalida + index), transicion, error);
        }
    };
    BuilderStatePattern.prototype.agregarEstadosPrefijados = function (prefix, indexInicial, indexFinal) {
        //prefix debe ser string e indexInicial y final ints
        for (var i = indexInicial; i <= indexFinal; ++i) {
            this.agregarEstado(prefix + i);
        }
    };
    BuilderStatePattern.prototype.agregarTransicionesIteradas = function (estadoSalidaPrefix, estadoEntradaPrefix, transicion, inicialSalida, finSalida, inicialEntrada, finEntrada) {
        //pre: |estadosSalida|=|estadosEntrada|
        //implica finSalida-inicialSalida=finEntrada-InicialEntrada
        var tamano = finSalida - inicialSalida;
        for (var index = 0; index <= tamano; ++index) {
            this.agregarTransicion(estadoSalidaPrefix + (inicialSalida + index), estadoEntradaPrefix + (inicialEntrada + index), transicion);
        }
    };
    return BuilderStatePattern;
})();
var EstadoParaContarBuilder = (function (_super) {
    __extends(EstadoParaContarBuilder, _super);
    function EstadoParaContarBuilder(escena, idTransicion, cantidadEsperada) {
        _super.call(this, escena, 'faltan');
        this.agregarEstadoAceptacion('llegue');
        var estado = this.estados['llegue'];
        estado.datos['cant'] = 0;
        this.agregarTransicion('faltan', 'llegue', idTransicion, function () {
            estado.datos['cant'] += 1;
            return (estado.datos['cant'] === cantidadEsperada);
        });
        this.agregarError('llegue', idTransicion, 'Ya no hay más para ' + idTransicion);
    }
    return EstadoParaContarBuilder;
})(BuilderStatePattern);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path="../actores/ObservadoAnimado.ts"/>
/// <reference path = "../actores/ActorAnimado.ts" />
/// <reference path = "ComportamientoAnimado.ts" />
/// <reference path = "../escenas/EstadosDeEscena.ts" />
/**
 * Es un comportamiento genérico con la idea de ser extendido Sus características son:
 * - Si se está tocando con un objeto de etiqueta A: Realizar acciones dependientes de ese objeto.
 * - Caso Contrario: El personaje principal ejecuta un mensaje de error.
 * La escena que lo utiliza debe tener definido automata.
 * Respecto de los argumentos:
 *  - etiqueta: Es obligatorio, es la etiqueta del actor con el que busca interactuar.
 *  - mensajeError: Es el mensaje que aparece cuando no hay un actor con esa etiqueta.
 *  - animacionInteractuadoMientras: Es la animación que se gatilla en el actor interactuado mientras se realiza la interacción.
 *  - animacionInteractuadoAlFinal: Es la animación que se gatilla en el actor interactuado justo luego de terminar la interacción.
 *  - comportamientoAdicional y argumentosComportamiento: Es el comportamiento que se gatilla en el objeto colisionado justo luego de terminar
 * la interacción.
 * Este comportamiento finaliza, y el comportamiento adicional en el actor interactuado continúa.
*/
var Interactuar = (function (_super) {
    __extends(Interactuar, _super);
    function Interactuar() {
        _super.apply(this, arguments);
    }
    Interactuar.prototype.sanitizarArgumentos = function () {
        _super.prototype.sanitizarArgumentos.call(this);
        if (!this.argumentos['etiqueta']) {
            throw new ArgumentError("Debe proveerse una etiqueta para verificar interacción");
        }
    };
    Interactuar.prototype.configurarVerificaciones = function () {
        var _this = this;
        var mensajeError = this.argumentos['mensajeError'] || "¡Acá no hay " + this.hacerLegible(this.argumentos['etiqueta']) + "!";
        this.verificacionesPre.push(new Verificacion(function () { return _this.hayConQuienInteractuar(); }, mensajeError));
    };
    Interactuar.prototype.preAnimacion = function () {
        _super.prototype.preAnimacion.call(this);
        if (this.argumentos['animacionInteractuadoMientras']) {
            this.interactuado().cargarAnimacion(this.argumentos['animacionInteractuadoMientras']);
        }
    };
    Interactuar.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        if (this.argumentos['animacionInteractuadoAlFinal']) {
            this.interactuado().cargarAnimacion(this.argumentos['animacionInteractuadoAlFinal']);
        }
        this.interactuar();
    };
    /**
     * Indica si existe una posible interacción entre dos actores.
     */
    Interactuar.prototype.hayConQuienInteractuar = function () {
        return this.receptor.tocando(this.argumentos['etiqueta']);
    };
    /**
     * Retorna al actor con el cual se realiza la interacción.
     */
    Interactuar.prototype.interactuado = function () {
        return this.receptor.objetoTocado(this.argumentos['etiqueta']);
    };
    /**
     * Se llama al realizarse la interacción.
     */
    Interactuar.prototype.alInteractuar = function () {
    };
    /**
     * Realiza la interacción.
     */
    Interactuar.prototype.interactuar = function () {
        if (this.argumentos['comportamientoAdicional']) {
            var claseComportamiento = window[this.argumentos['comportamientoAdicional']];
            this.interactuado().hacer_luego(claseComportamiento, this.argumentos['argumentosComportamiento']);
        }
        this.alInteractuar();
    };
    Interactuar.prototype.hacerLegible = function (etiqueta) {
        return etiqueta.toLowerCase().split("animada")[0].split("animado")[0];
    };
    return Interactuar;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ComportamientoAnimado.ts"/>
// Decorator de la Secuencia
var SecuenciaAnimada = (function (_super) {
    __extends(SecuenciaAnimada, _super);
    function SecuenciaAnimada() {
        _super.apply(this, arguments);
    }
    SecuenciaAnimada.prototype.iniciar = function (receptor) {
        // Ver bloques de la gran aventura del mar encantado
        for (var i in this.argumentos.secuencia) {
            if (this.argumentos.secuencia[i].comportamiento) {
                var comportamiento = eval(this.argumentos.secuencia[i].comportamiento);
                this.argumentos.secuencia[i] = new comportamiento(this.argumentos.secuencia[i].argumentos);
            }
        }
        _super.prototype.iniciar.call(this, receptor);
        this.laSecuenciaPosta = new Secuencia(this.argumentos);
        this.laSecuenciaPosta.iniciar(receptor);
    };
    SecuenciaAnimada.prototype.doActualizar = function () {
        return this.laSecuenciaPosta.actualizar();
    };
    return SecuenciaAnimada;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
/// <reference path = "SecuenciaAnimada.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
var ComportamientoConComputadora = (function (_super) {
    __extends(ComportamientoConComputadora, _super);
    function ComportamientoConComputadora(argumentos) {
        argumentos.etiqueta = 'CompuAnimada';
        argumentos.mensajeError = "No hay una computadora aquí";
        argumentos.nombreAnimacion = "escribir";
        _super.call(this, argumentos);
    }
    ComportamientoConComputadora.prototype.computadoraInteractuada = function () {
        return this.interactuado();
    };
    return ComportamientoConComputadora;
})(Interactuar);
var PrenderComputadora = (function (_super) {
    __extends(PrenderComputadora, _super);
    function PrenderComputadora(argumentos) {
        argumentos.idTransicion = 'prender';
        argumentos.animacionInteractuadoAlFinal = "prendida";
        _super.call(this, argumentos);
    }
    PrenderComputadora.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return !_this.computadoraInteractuada().yaFuePrendida(); }, "Esta computadora ya fue prendida"));
    };
    return PrenderComputadora;
})(ComportamientoConComputadora);
var ApagarComputadora = (function (_super) {
    __extends(ApagarComputadora, _super);
    function ApagarComputadora(argumentos) {
        argumentos.idTransicion = 'apagar';
        argumentos.animacionInteractuadoAlFinal = "parado";
        _super.call(this, argumentos);
    }
    ApagarComputadora.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return !_this.computadoraInteractuada().estaApagada(); }, "Esta computadora ya está apagada"));
    };
    return ApagarComputadora;
})(ComportamientoConComputadora);
var EscribirEnComputadora = (function (_super) {
    __extends(EscribirEnComputadora, _super);
    function EscribirEnComputadora() {
        _super.apply(this, arguments);
    }
    EscribirEnComputadora.prototype.alInteractuar = function () {
        _super.prototype.alInteractuar.call(this);
        if (this.argumentos['idTransicion'] == 'escribirC') {
            this.interactuado().cargarAnimacion("claveok");
        }
    };
    return EscribirEnComputadora;
})(ComportamientoConComputadora);
var InstalarJuegoEnComputadora = (function (_super) {
    __extends(InstalarJuegoEnComputadora, _super);
    function InstalarJuegoEnComputadora(argumentos) {
        argumentos.secuencia = [
            {
                comportamiento: "EscribirEnComputadora",
                argumentos: {
                    idTransicion: "instalar",
                }
            },
            {
                comportamiento: "EsperarAnimacionTocado",
                argumentos: {
                    etiqueta: "CompuAnimada",
                    nombreAnimacion: "instalando",
                    nombreAnimacionSiguiente: "yaInstalado"
                }
            },
        ];
        _super.call(this, argumentos);
    }
    return InstalarJuegoEnComputadora;
})(SecuenciaAnimada);
/// <reference path="ComportamientoAnimado.ts"/>
var ComportamientoDeAltoOrden = (function (_super) {
    __extends(ComportamientoDeAltoOrden, _super);
    function ComportamientoDeAltoOrden() {
        _super.apply(this, arguments);
    }
    ComportamientoDeAltoOrden.prototype.nombreAnimacion = function () {
        return this.argumentos['nombreAnimacion'];
    };
    ComportamientoDeAltoOrden.prototype.postAnimacion = function () {
        this.argumentos.metodo.apply(this.argumentos['receptor']);
    };
    return ComportamientoDeAltoOrden;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
var Contar = (function (_super) {
    __extends(Contar, _super);
    function Contar() {
        _super.apply(this, arguments);
    }
    Contar.prototype.iniciar = function (receptor) {
        _super.prototype.iniciar.call(this, receptor);
        if (!receptor[this.attrName()]) {
            receptor[this.attrName()] = new ObservadoConAumentar();
            receptor[this.attrName()].cantidad = 0;
            receptor[this.attrName()].registrarObservador(this.receptor.escena.tableros[this.argumentos.etiqueta]);
        }
    };
    Contar.prototype.alInteractuar = function () {
        this.receptor[this.attrName()].aumentar('cantidad', 1);
        if (this.argumentos.eliminar)
            this.interactuado().eliminar();
    };
    Contar.prototype.attrName = function () {
        return 'cant' + this.argumentos.etiqueta;
    };
    return Contar;
})(Interactuar);
/// <reference path="ComportamientoAnimado.ts"/>
var Depositar = (function (_super) {
    __extends(Depositar, _super);
    function Depositar() {
        _super.apply(this, arguments);
    }
    Depositar.prototype.nombreAnimacion = function () {
        return 'depositar';
    };
    Depositar.prototype.postAnimacion = function () {
        this.validarQueLaClaseADepositarSeaString();
        var clase = window[this.argumentos.claseADepositar];
        if (this.receptor.cuadricula) {
            this.receptor.cuadricula.agregarActor(new clase(), this.receptor.casillaActual().nroFila, this.receptor.casillaActual().nroColumna);
        }
        else {
            new clase(this.receptor.x, this.receptor.y);
        }
    };
    Depositar.prototype.validarQueLaClaseADepositarSeaString = function () {
        var tipo = typeof this.argumentos.claseADepositar;
        if (tipo !== "string") {
            throw new Error("Se esperaba que la claseADepositar sea un string, pero se encont\u00F3 " + tipo + ".");
        }
    };
    return Depositar;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "MovimientoAnimado.ts"/>
// Está pensado para iniciar la línea en el centro del receptor.
// Esto hace que no haya que hacer cálculos ni aprender qué significa Shape.regX ó cómo lo usa pilas.
// Llámenme cobarde, sí. Perdón.
var DibujarLinea = (function (_super) {
    __extends(DibujarLinea, _super);
    function DibujarLinea() {
        _super.apply(this, arguments);
    }
    DibujarLinea.prototype.iniciar = function (receptor) {
        _super.prototype.iniciar.call(this, receptor);
        if (!receptor.pizarra)
            receptor.pizarra = new pilas.actores.Pizarra();
    };
    DibujarLinea.prototype.darUnPaso = function () {
        var origen = { x: this.receptor.x, y: this.receptor.y };
        _super.prototype.darUnPaso.call(this);
        this.dibujarLinea(origen.x, origen.y);
    };
    DibujarLinea.prototype.dibujarLinea = function (x, y) {
        if (!this.hayObstaculo()) {
            this.receptor.pizarra.linea(x, y, this.receptor.x, this.receptor.y, this.receptor.escena.colorDibujo(), 6);
        }
    };
    DibujarLinea.prototype.dibujarPunto = function () {
        if (this.argumentos.dibujarPuntos && !this.hayObstaculo()) {
            this.receptor.pizarra.dibujar_punto(this.receptor.x, this.receptor.y, this.receptor.escena.colorDibujo(), 6);
        }
    };
    DibujarLinea.prototype.preAnimacion = function () {
        this.argumentos.distancia = this.argumentos.distancia || this.receptor.escena.longitudSegmento;
        this.argumentos.distanciaConObstaculo = this.argumentos.distancia / 2;
        _super.prototype.preAnimacion.call(this);
        this.dibujarPunto();
    };
    DibujarLinea.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        this.dibujarPunto();
    };
    DibujarLinea.prototype.hayObstaculo = function () {
        var _this = this;
        return this.receptor.escena.obtenerActoresConEtiqueta("Charco").some(function (charco) {
            return charco.colisiona_con_un_punto(_this.puntoMedio().x, _this.puntoMedio().y);
        });
    };
    DibujarLinea.prototype.obstaculo = function () {
        var _this = this;
        return this.receptor.escena.obtenerActoresConEtiqueta("Charco").filter(function (charco) {
            return charco.colisiona_con_un_punto(_this.puntoMedio().x, _this.puntoMedio().y);
        })[0];
    };
    /**
     * Punto medio entre la posición actual del actor que realiza el comportamiento
     * y el destino del movimiento.
     */
    DibujarLinea.prototype.puntoMedio = function () {
        return {
            x: (this.destino().x + this.receptor.x) / 2,
            y: (this.destino().y + this.receptor.y) / 2
        };
    };
    /**
     * Redefino el metodo dejandolo vacio para evitar
     * que se utilicen las validaciones de colision heredadas.
     */
    DibujarLinea.prototype.configurarVerificaciones = function () {
    };
    return DibujarLinea;
})(MovimientoAnimado);
var DibujarHaciaAdelante = (function (_super) {
    __extends(DibujarHaciaAdelante, _super);
    function DibujarHaciaAdelante() {
        _super.apply(this, arguments);
    }
    DibujarHaciaAdelante.prototype.preAnimacion = function () {
        this.argumentos.direccion = new Direct(this.receptor.rotacion);
        _super.prototype.preAnimacion.call(this);
    };
    return DibujarHaciaAdelante;
})(DibujarLinea);
/// <reference path="ComportamientoConVelocidad.ts"/>
var Eliminar = (function (_super) {
    __extends(Eliminar, _super);
    function Eliminar() {
        _super.apply(this, arguments);
    }
    Eliminar.prototype.postAnimacion = function () {
        this.receptor.eliminar();
    };
    return Eliminar;
})(ComportamientoConVelocidad);
var Desaparecer = (function (_super) {
    __extends(Desaparecer, _super);
    function Desaparecer() {
        _super.apply(this, arguments);
    }
    Desaparecer.prototype.postAnimacion = function () {
        this.receptor.suspenderHabilidadesConMovimiento();
        this.receptor.izquierda = pilas.derecha() + 1;
    };
    return Desaparecer;
})(ComportamientoConVelocidad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
var Encender = (function (_super) {
    __extends(Encender, _super);
    function Encender() {
        _super.apply(this, arguments);
    }
    Encender.prototype.nombreAnimacion = function () {
        return "recoger";
    };
    Encender.prototype.alInteractuar = function () {
        this.interactuado().cargarAnimacion(this.nombreProximaAnimacion());
    };
    Encender.prototype.nombreProximaAnimacion = function () {
        return "prendida";
    };
    Encender.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.estaApagada(); }, "¡Ya está " + this.nombreProximaAnimacion() + "!"));
    };
    Encender.prototype.estaApagada = function () {
        return this.interactuado().nombreAnimacionActual() != this.nombreProximaAnimacion();
    };
    return Encender;
})(Interactuar);
/// <reference path = "../comportamientos/MovimientoAnimado.ts" />
// Si se pasa por argumento "escaparCon" entonces el receptor debe ser actor compuesto
var Escapar = (function (_super) {
    __extends(Escapar, _super);
    function Escapar() {
        _super.apply(this, arguments);
    }
    Escapar.prototype.iniciar = function (receptor) {
        this.argumentos.idTransicion = "escapar";
        _super.prototype.iniciar.call(this, receptor);
    };
    Escapar.prototype.preAnimacion = function () {
        this.argumentos.direccion = new Direct(1, 5);
        this.argumentos.distancia = 600;
        this.argumentos.velocidad = 8;
        this.argumentos.cantPasos = 40;
        if (this.argumentos.escaparCon) {
            if (typeof this.argumentos.escaparCon == 'string') {
                this.argumentos.escaparCon = eval("pilas.escena_actual()." + this.argumentos.escaparCon);
            }
            this.receptor.agregarSubactor(this.argumentos.escaparCon);
        }
        _super.prototype.preAnimacion.call(this);
    };
    Escapar.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () {
            return _this.estaEnTransporte();
        }, "Para escapar hace falta un transporte"));
    };
    Escapar.prototype.estaEnTransporte = function () {
        if (typeof this.argumentos.escaparCon == 'string') {
            this.argumentos.escaparCon = eval("pilas.escena_actual()." + this.argumentos.escaparCon);
        }
        var noTieneQueEscaparConNingunActor = (!this.argumentos.escaparCon);
        var colisionaConElActorParaEscapar = this.receptor.colisiona_con(this.argumentos.escaparCon);
        return (noTieneQueEscaparConNingunActor || colisionaConElActorParaEscapar);
    };
    return Escapar;
})(MovimientoAnimado);
/// <reference path = "ComportamientoConVelocidad.ts"/>
/// <reference path = "../actores/libroPrimaria/Letra.ts"/>
/**
 * Comportamiento que escribe una letra en la casilla actual.
 */
var EscribirLetra = (function (_super) {
    __extends(EscribirLetra, _super);
    function EscribirLetra() {
        _super.apply(this, arguments);
    }
    EscribirLetra.prototype.preAnimacion = function () {
        _super.prototype.preAnimacion.call(this);
        this.xInicial = this.receptor.getX();
    };
    EscribirLetra.prototype.darUnPaso = function () {
        var variacion = this.estoyEnElCuarto(1) || this.estoyEnElCuarto(4) ? 10 : -10;
        this.receptor.setX(this.receptor.getX() + variacion);
    };
    /**
     * Indica en qué porción de la duración completa del comportamiento estoy.
     * Por ejemplo, si el comportamiento dura 12 segundos, y voy por el segundo 5,
     * estoyEnElCuarto(2) es cierto, y estoyEnElCuarto(1) es falso, ya que ya pasaron los
     * primeros tres segundos.
     * @param nroCuarto Indica el número de fracción (1 = 1/4, 2=2/4, etc)
     */
    EscribirLetra.prototype.estoyEnElCuarto = function (nroCuarto) {
        return this._pasosRestantes > this.argumentos.cantPasos * (1 - (nroCuarto / 4)) &&
            this._pasosRestantes <= this.argumentos.cantPasos * ((5 - nroCuarto) / 4);
    };
    EscribirLetra.prototype.setearEstadoFinalDeseado = function () {
        this.receptor.setX(this.xInicial);
    };
    EscribirLetra.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        // Esta verificación permite que el autómata avise, con un mensaje de
        // error descriptivo, si se está intentando escribir un carácter que
        // no es soportado por el actor Letra
        this.verificacionesPre.push(new Verificacion(function () { return Letra.esArgumentoValido(_this.argumentos.caracter); }, "No sé escribir ese símbolo"));
    };
    EscribirLetra.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        this.receptor.cuadricula.agregarActorEnCasilla(new LetraManuscrita(this.argumentos.caracter), this.receptor.casillaActual());
    };
    return EscribirLetra;
})(ComportamientoConVelocidad);
/// <reference path = "SecuenciaAnimada.ts"/>
/// <reference path = "MovimientosEnCuadricula.ts"/>
/// <reference path = "EscribirLetra.ts"/>
/// <reference path = "../actores/ActorAnimado.ts"/>
/**
 * Comportamiento que escribe una letra en la casilla actual.
 */
var EscribirTexto = (function (_super) {
    __extends(EscribirTexto, _super);
    function EscribirTexto() {
        _super.apply(this, arguments);
    }
    EscribirTexto.prototype.iniciar = function (receptor) {
        var _this = this;
        this.argumentos.secuencia = [];
        // Por cada letra, debo moverme a la derecha y escribirla
        this.argumentos.texto.split("").forEach(function (caracter) {
            _this.argumentos.secuencia.push(new EscribirLetra({ caracter: caracter, cantPasos: 5 }));
            _this.argumentos.secuencia.push(_this.comportamientoMoverDerecha(receptor));
        });
        _super.prototype.iniciar.call(this, receptor);
    };
    EscribirTexto.prototype.comportamientoMoverDerecha = function (receptor) {
        return new MoverACasillaDerecha({
            cantPasos: 5,
            verificacionesPre: [new Verificacion(function () { return receptor.casillaActual().hayDerecha(); }, "¡Estoy cansado! No quiero escribir más...")]
        });
    };
    EscribirTexto.prototype.preAnimacion = function () {
        this.receptor.escena.automata.cargarAnimacionTemporalmente("escribir");
    };
    EscribirTexto.prototype.postAnimacion = function () {
        this.receptor.escena.automata.restaurarAnimacionAnterior();
    };
    return EscribirTexto;
})(SecuenciaAnimada);
/// <reference path="ComportamientoConVelocidad.ts"/>
// El objetivo de este comportamiento es poder encolar en
// la cola de comportamientos DEL RECEPTOR un comportamiento que ejecute
// EN EL OBJETO TOCADO, para que ejecute antes de que el receptor siga su camino.
var EsperarAnimacionTocado = (function (_super) {
    __extends(EsperarAnimacionTocado, _super);
    function EsperarAnimacionTocado() {
        _super.apply(this, arguments);
    }
    EsperarAnimacionTocado.prototype.iniciar = function (receptor) {
        this.argumentos.receptor = receptor.objetoTocado(this.argumentos.etiqueta);
        _super.prototype.iniciar.call(this, receptor);
    };
    return EsperarAnimacionTocado;
})(ComportamientoConVelocidad);
/// <reference path = "MovimientoAnimado.ts"/>
/// <reference path = "../actores/ActorAnimado.ts"/>
var GirarMarquesina = (function (_super) {
    __extends(GirarMarquesina, _super);
    function GirarMarquesina() {
        _super.apply(this, arguments);
    }
    GirarMarquesina.prototype.preAnimacion = function () {
        this.argumentos.distancia = this.receptor.subactores[0].getAncho();
        this.argumentos.direccion = new Direct(-1, 0);
        this.argumentos.voltearAlIrAIzquierda = false;
        this.posInicial = { x: this.receptor.subactores[0].x, y: this.receptor.subactores[0].y };
        if (!this.receptor.subactores[1]) {
            this.receptor.agregarSubactor(this.espejo());
        }
        else {
            this.receptor.subactores[1].x = this.posInicial.x + this.receptor.subactores[0].getAncho();
        }
        ;
        _super.prototype.preAnimacion.call(this);
    };
    GirarMarquesina.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        this.receptor.setX(this.posInicial.x);
    };
    GirarMarquesina.prototype.espejo = function () {
        var clon = new ActorAnimado(this.posInicial.x + this.receptor.subactores[0].getAncho(), this.posInicial.y, this.receptor.subactores[0].opciones);
        clon.z = this.receptor.subactores[0].z;
        return clon;
    };
    return GirarMarquesina;
})(MovimientoAnimado);
var IrASiguienteFila = (function (_super) {
    __extends(IrASiguienteFila, _super);
    function IrASiguienteFila() {
        _super.apply(this, arguments);
    }
    IrASiguienteFila.prototype.nombreAnimacion = function () {
        // redefinir por subclase
        return "parado";
    };
    IrASiguienteFila.prototype.postAnimacion = function () {
        var nroF = this.argumentos['personaje'].casilla.nroFila + 1;
        this.argumentos['personaje'].casilla = this.argumentos['cuadricula'].casilla(nroF, 0);
    };
    return IrASiguienteFila;
})(ComportamientoAnimado);
var Martillar = (function (_super) {
    __extends(Martillar, _super);
    function Martillar() {
        _super.apply(this, arguments);
    }
    Martillar.prototype.iniciar = function (receptor) {
        _super.prototype.iniciar.call(this, receptor);
        this.vecesRestantes = this.argumentos['veces'];
        var imagen = pilas.imagenes.cargar_grilla("cooperativista.trabajando.png", 3);
        this.receptor.imagen = imagen;
        this.contador = 0;
    };
    Martillar.prototype.actualizar = function () {
        this.contador += 1;
        if (this.contador > 10) {
            this.contador = 0;
            var finaliza = this.receptor._imagen.avanzar();
            if (finaliza) {
                this.vecesRestantes -= 1;
                if (this.vecesRestantes === 0) {
                    this.receptor.restaurar();
                    return true;
                }
            }
        }
    };
    return Martillar;
})(Comportamiento);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "../comportamientos/AnimarSiNoEstoyYa.ts" />
var ModificarRotacionYAltura = (function (_super) {
    __extends(ModificarRotacionYAltura, _super);
    function ModificarRotacionYAltura() {
        _super.apply(this, arguments);
    }
    ModificarRotacionYAltura.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        this.receptor.y = this.argumentos['alturaIr'];
        this.receptor.rotacion = this.argumentos['rotacionIr'];
    };
    return ModificarRotacionYAltura;
})(AnimarSiNoEstoyYa);
/// <reference path = "MovimientosEnCuadricula.ts"/>
/// <reference path = "../actores/libroPrimaria/Letra.ts" />
/**
 * Comportamiento que extiende un movimiento por la cuadrícula
 * con una lectura. El actor receptor debe tener definida la propiedad
 * 'cuadriculaSecundaria'. Si en la casilla de llegada hay un actor Letra,
 * su contenido se registra en la cuadrícula secundaria del receptor.
 */
var MovimientoConLectura = (function (_super) {
    __extends(MovimientoConLectura, _super);
    function MovimientoConLectura() {
        _super.apply(this, arguments);
    }
    MovimientoConLectura.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        var casilla = this.receptor.casillaActual();
        if (this.hayLetra(casilla)) {
            var caracter = this.caracterEnCasilla(casilla);
            var casillaLectura = this.receptor.cuadriculaSecundaria.proximaCasillaLibre();
            if (casillaLectura) {
                this.receptor.cuadriculaSecundaria.agregarActorEnProximaCasillaLibre(new LetraLeida(caracter));
            }
            else {
                throw new ActividadError("Ya leí mucho, ¡estoy cansado!");
            }
        }
    };
    MovimientoConLectura.prototype.hayLetra = function (casilla) {
        return casilla.tieneActorConEtiqueta('Letra');
    };
    MovimientoConLectura.prototype.caracterEnCasilla = function (casilla) {
        return casilla.actoresConEtiqueta('Letra')[0].caracter();
    };
    return MovimientoConLectura;
})(MovimientoEnCuadricula);
var MoverLeyendoDerecha = (function (_super) {
    __extends(MoverLeyendoDerecha, _super);
    function MoverLeyendoDerecha() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaDerecha();
    }
    return MoverLeyendoDerecha;
})(MovimientoConLectura);
var MoverLeyendoArriba = (function (_super) {
    __extends(MoverLeyendoArriba, _super);
    function MoverLeyendoArriba() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaArriba();
    }
    return MoverLeyendoArriba;
})(MovimientoConLectura);
var MoverLeyendoAbajo = (function (_super) {
    __extends(MoverLeyendoAbajo, _super);
    function MoverLeyendoAbajo() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaAbajo();
    }
    return MoverLeyendoAbajo;
})(MovimientoConLectura);
var MoverLeyendoIzquierda = (function (_super) {
    __extends(MoverLeyendoIzquierda, _super);
    function MoverLeyendoIzquierda() {
        _super.apply(this, arguments);
        this.direccionCasilla = new DirCasillaIzquierda();
    }
    return MoverLeyendoIzquierda;
})(MovimientoConLectura);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
var PrepararEnsalada = (function (_super) {
    __extends(PrepararEnsalada, _super);
    function PrepararEnsalada() {
        _super.call(this, {
            etiqueta: "Ensaladera",
            nombreAnimacion: "prepararEnsalada",
            animacionColisionadoMientras: "preparando",
            animacionInteractuadoAlFinal: "llena",
            idTransicion: "prepararEnsalada"
        });
    }
    PrepararEnsalada.prototype.configurarVerificaciones = function () {
        _super.prototype.configurarVerificaciones.call(this);
        var escena = pilas.escena_actual();
        this.verificacionesPre.push(new Verificacion(function () { return !escena.hayDeLosDosIngredientes(); }, '¡Todavía me quedan ingredientes por recoger!'));
        this.verificacionesPre.push(new Verificacion(function () { return escena.noHayMasTomates(); }, '¡Todavía me queda tomate por recoger!'));
        this.verificacionesPre.push(new Verificacion(function () { return escena.noHayMasLechugas(); }, '¡Todavía me queda lechuga por recoger!'));
    };
    PrepararEnsalada.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        if (pilas.escena_actual().noHayMasIngredientes()) {
            pilas.escena_actual().estado = new Estado(function () {
                return true;
            });
        }
    };
    return PrepararEnsalada;
})(Interactuar);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
var Recolectar = (function (_super) {
    __extends(Recolectar, _super);
    function Recolectar() {
        _super.apply(this, arguments);
    }
    Recolectar.prototype.alInteractuar = function () {
        _super.prototype.alInteractuar.call(this);
        this.interactuado().eliminar();
        if (this.argumentos['dondeReflejarValor']) {
            this.argumentos['dondeReflejarValor'].aumentar(1);
        }
    };
    Recolectar.prototype.nombreAnimacion = function () {
        return this.argumentos.nombreAnimacion || "recoger";
    };
    return Recolectar;
})(Interactuar);
/// <reference path = "ComportamientoConVelocidad.ts"/>
var Rotar = (function (_super) {
    __extends(Rotar, _super);
    function Rotar() {
        _super.apply(this, arguments);
    }
    Rotar.prototype.preAnimacion = function () {
        _super.prototype.preAnimacion.call(this);
        if (!this.argumentos.angulo && this.argumentos.angulo !== 0)
            throw new ArgumentError("Angle must be provided for Rotar to work");
        this.anguloAvance = this.argumentos.angulo / this.argumentos.cantPasos;
        this.anguloFinal = this.receptor.rotacion + this.argumentos.angulo;
    };
    Rotar.prototype.darUnPaso = function () {
        this.receptor.rotacion += this.anguloAvance;
    };
    Rotar.prototype.setearEstadoFinalDeseado = function () {
        this.receptor.rotacion = this.anguloFinal;
    };
    Rotar.prototype.nombreAnimacion = function () {
        return "rotar";
    };
    return Rotar;
})(ComportamientoConVelocidad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "SaltarAnimado.ts"/>
/*
Comportamiento que hace saltar al personaje y luego decir una
frase definida por la escena
*/
var SaltarHablando = (function (_super) {
    __extends(SaltarHablando, _super);
    function SaltarHablando() {
        _super.apply(this, arguments);
    }
    SaltarHablando.prototype.postAnimacion = function () {
        this.receptor.decir(this.receptor.escena.fraseAlSaltar());
    };
    return SaltarHablando;
})(SaltarAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "ComportamientoAnimado.ts"/>
var SerPateado = (function (_super) {
    __extends(SerPateado, _super);
    function SerPateado() {
        _super.apply(this, arguments);
    }
    SerPateado.prototype.preAnimacion = function () {
        this.receptor.cargarAnimacion("patear");
        this.receptor.aprender(RotarContinuamente, { 'gradosDeAumentoStep': this.argumentos['gradosDeAumentoStep'] || 1 });
        this.actualizarPosicion();
        this.contador = Math.random() * 3;
        this.aceleracion = this.argumentos['aceleracion'];
        this.tiempoEnElAire = this.argumentos['tiempoEnElAire'] || 10;
        this.elevacionMaxima = this.argumentos['elevacionMaxima'] || 10;
    };
    SerPateado.prototype.doActualizar = function () {
        _super.prototype.doActualizar.call(this);
        return this.patearConSubidaLineal();
    };
    SerPateado.prototype.patearConSubidaLineal = function () {
        this.contador += this.aceleracion;
        this.contador = this.contador % 256; // para evitar overflow
        if (this.receptor.y < this.altura_original + this.elevacionMaxima && this.tiempoEnElAire > 0) {
            //subiendo
            this.receptor.y += this.contador;
        }
        if (this.tiempoEnElAire > 0) {
            //en el aire
            this.tiempoEnElAire -= 1;
        }
        if (this.tiempoEnElAire <= 0) {
            //bajando
            if (this.receptor.y > this.altura_original) {
                this.receptor.y -= this.contador;
            }
        }
        this.receptor.x += this.contador;
        if (this.receptor.izquierda >= pilas.derecha()) {
            this.receptor.eliminar();
            return true;
        }
    };
    SerPateado.prototype.patearParaAdelante = function () {
        this.contador += this.aceleracion;
        this.contador = this.contador % 256; // para evitar overflow
        this.receptor.x += this.contador;
    };
    SerPateado.prototype.implicaMovimiento = function () {
        return true;
    };
    SerPateado.prototype.actualizarPosicion = function () {
        this.altura_original = this.receptor.y;
    };
    return SerPateado;
})(ComportamientoAnimado);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "Interactuar.ts" />
/*
Este comportamiento Agarra al objeto y refleja en un contador
el valor.
Argumentos adicionales al comportamiento colision: puedoSostenerMasDeUno (por defecto es falso)
*/
var Sostener = (function (_super) {
    __extends(Sostener, _super);
    function Sostener() {
        _super.apply(this, arguments);
    }
    Sostener.prototype.preAnimacion = function () {
        _super.prototype.preAnimacion.call(this);
        this.argumentos.nombreAnimacion = this.argumentos.nombreAnimacion || "recoger";
    };
    Sostener.prototype.alInteractuar = function () {
        // TODO: Habría que separarlo en dos comportamientos, Tomar por un lado, Contar por el otro.
        var interactuado = this.interactuado();
        var objetoAgarrado = interactuado.clonar();
        objetoAgarrado.escala = interactuado.escala;
        objetoAgarrado.y = this.receptor.y;
        objetoAgarrado.x = this.receptor.subactores[0].derecha - (this.receptor.subactores[0].ancho / 4);
        this.receptor.agregarSubactor(objetoAgarrado);
        objetoAgarrado.cargarAnimacion("correr"); // porque tiene que cargar la misma imagen que va a usar al moverse
        if (interactuado.disminuir)
            interactuado.disminuir('cantidad', 1);
        if (!interactuado['cantidad'])
            interactuado.eliminar();
    };
    Sostener.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.puedoSostener(); }, "No puedo sostener dos cosas a la vez..."));
    };
    Sostener.prototype.puedoSostener = function () {
        return this.argumentos.puedoSostenerMasDeUno || !this.receptor.tieneAlgoEnLaMano();
    };
    return Sostener;
})(Interactuar);
var Soltar = (function (_super) {
    __extends(Soltar, _super);
    function Soltar() {
        _super.apply(this, arguments);
    }
    Soltar.prototype.alInteractuar = function () {
        if (this.argumentos.queSoltar) {
            this.receptor.eliminarSubactor(this.argumentos.queSoltar);
        }
        else {
            this.receptor.eliminarUltimoSubactor();
        }
    };
    Soltar.prototype.configurarVerificaciones = function () {
        var _this = this;
        _super.prototype.configurarVerificaciones.call(this);
        this.verificacionesPre.push(new Verificacion(function () { return _this.sostieneLoQueCorresponde(); }, "No tengo " + this.hacerLegible(this.argumentos.queSoltar) + " en la mano"));
    };
    Soltar.prototype.sostieneLoQueCorresponde = function () {
        return this.argumentos.queSoltar ?
            this.receptor.tieneEnLaMano(this.argumentos.queSoltar) :
            this.receptor.tieneAlgoEnLaMano();
    };
    Soltar.prototype.hacerLegible = function (etiqueta) {
        return etiqueta ? _super.prototype.hacerLegible.call(this, etiqueta) : "nada";
    };
    return Soltar;
})(Interactuar);
/// <reference path = "ComportamientoConVelocidad.ts" />
/// <reference path = "GirarMarquesina.ts" />
var VolarHeroicamente = (function (_super) {
    __extends(VolarHeroicamente, _super);
    function VolarHeroicamente() {
        _super.apply(this, arguments);
    }
    VolarHeroicamente.prototype.nombreAnimacion = function () {
        return 'correr';
    };
    VolarHeroicamente.prototype.preAnimacion = function () {
        this.argumentos.velocidad = 100;
        this.argumentos.cantPasos = 1;
        _super.prototype.preAnimacion.call(this);
        this.receptor.escena.fondo.hacer_luego(GirarMarquesina, {});
    };
    VolarHeroicamente.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        if (this.receptor.fraseAlVolar)
            this.receptor.decir(this.receptor.fraseAlVolar());
    };
    return VolarHeroicamente;
})(ComportamientoConVelocidad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />
/// <reference path = "../actores/ManzanaAnimada.ts" />
var AlienInicial = (function (_super) {
    __extends(AlienInicial, _super);
    function AlienInicial() {
        _super.apply(this, arguments);
    }
    AlienInicial.prototype.iniciar = function () {
        this.estado = this.armarEstado();
        this.fondo = new Fondo('fondos.alien-inicial.png', 0, 0);
        this.cuadricula = new Cuadricula(-25, -200, 1, 4, { alto: 25, ancho: (pilas.opciones.ancho * 0.8) }, { grilla: 'invisible.png', cantColumnas: 1 });
        this.fondoCuadricula = new Actor("camino-alien-boton.png", this.cuadricula.x, this.cuadricula.y);
        this.fondoCuadricula.ancho = this.cuadricula.ancho;
        this.automata = new AlienAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, false);
        this.boton = new BotonAnimado(0, 0);
        this.boton.derecha = this.cuadricula.derecha + 25;
        this.boton.abajo = this.cuadricula.arriba;
    };
    AlienInicial.prototype.armarEstado = function () {
        var a = new BuilderStatePattern(this, 'inicial');
        a.agregarEstadoAceptacion('final');
        a.agregarTransicion('inicial', 'final', 'apretarBoton');
        return a.estadoInicial();
    };
    return AlienInicial;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
var AlienLevantaTuercas = (function (_super) {
    __extends(AlienLevantaTuercas, _super);
    function AlienLevantaTuercas() {
        _super.apply(this, arguments);
    }
    AlienLevantaTuercas.prototype.iniciar = function () {
        var _this = this;
        this.estado = new Estado(function () { return _this.cantidadObjetosConEtiqueta('TuercaAnimada') == 0; });
        this.fondo = new pilas.fondos.Laberinto1();
        this.cuadricula = new Cuadricula(0, -25, 5, 6, { alto: 400 }, { grilla: 'invisible.png',
            cantColumnas: 1 });
        this.automata = new AlienAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 4, 0, false);
        for (var i = 0; i < 5; i++) {
            var tuerca = new TuercaAnimada(0, 0);
            this.cuadricula.agregarActorEnPerspectiva(tuerca, i, i);
            //tuerca.aprender(Flotar,{'Desvio':10})
            //tuerca.aprender(RotarContinuamente,{'gradosDeAumentoStep':1})
            tuerca.aprender(Vibrar, { 'gradosDeAumentoStep': 2, 'tiempoVibracion': 40 });
            tuerca.escala = 1.0;
        }
    };
    AlienLevantaTuercas.prototype.moverIzquierda = function () {
        this.automata.hacer_luego(MoverACasillaIzquierda);
    };
    AlienLevantaTuercas.prototype.moverDerecha = function () {
        this.automata.hacer_luego(MoverACasillaDerecha);
    };
    AlienLevantaTuercas.prototype.moverAbajo = function () {
        this.automata.hacer_luego(MoverACasillaAbajo);
    };
    AlienLevantaTuercas.prototype.moverArriba = function () {
        this.automata.hacer_luego(MoverACasillaArriba);
    };
    AlienLevantaTuercas.prototype.levantaTuerca = function () {
        this.automata.hacer_luego(Recolectar, { 'etiqueta': 'TuercaAnimada', 'mensajeError': 'No hay una tuerca aquí' });
    };
    return AlienLevantaTuercas;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
var AlimentandoALosPeces = (function (_super) {
    __extends(AlimentandoALosPeces, _super);
    function AlimentandoALosPeces() {
        _super.apply(this, arguments);
    }
    AlimentandoALosPeces.prototype.iniciar = function () {
        this.cantidadFilas = 4;
        this.cantidadColumnas = 5;
        this.fondo = new Fondo('fondo.alimentando_peces.png.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, this.cantidadFilas, this.cantidadColumnas, { ancho: 328, alto: 262 }, { grilla: 'invisible.png',
            cantColumnas: 1 });
        this.automata = new BuzoAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, this.cantidadFilas - 1, 0);
        this.automata.aprender(Flotar, { Desvio: 2 });
        this.alimento = new AlimentoAnimado(0, 0);
        this.cuadricula.agregarActor(this.alimento, 1, this.cantidadColumnas - 1);
        this.colocarPeces();
        this.estado = this.generarEstadoInicial();
    };
    AlimentandoALosPeces.prototype.generarEstadoInicial = function () {
        var builder = new BuilderStatePattern(this, 'inicial');
        builder.agregarEstado('tengoLaComida');
        builder.agregarEstadosPrefijados('alimentado', 1, 6);
        builder.agregarEstadoAceptacion('alimentado7');
        builder.agregarTransicion('inicial', 'tengoLaComida', 'recogerComida');
        builder.agregarTransicion('tengoLaComida', 'alimentado1', 'alimentarPez');
        builder.agregarTransicionesIteradas('alimentado', 'alimentado', 'alimentarPez', 1, 6, 2, 7);
        builder.agregarError('inicial', 'alimentarPez', 'Debés recolectar primero el alimento');
        return builder.estadoInicial();
    };
    AlimentandoALosPeces.prototype.colocarPeces = function () {
        this.cuadricula.agregarActor(new PezAnimado(0, 0), this.cantidadFilas - 1, 1);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), this.cantidadFilas - 1, 2);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), this.cantidadFilas - 1, 3);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), 0, 0);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), 0, 1);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), 0, 2);
        this.cuadricula.agregarActor(new PezAnimado(0, 0), 0, 3);
    };
    return AlimentandoALosPeces;
})(EscenaActividad);
/// <reference path = "../actores/CuadriculaEsparsa.ts" />
/*Builder para una cuadricula esparsa con forma de camino*/
var Camino = (function () {
    function Camino(x, y, direcciones, cantidadFilas, cantidadColumnas, opcionesCuadricula, opcionesCasilla) {
        this.x = x;
        this.y = y;
        this.cantidadFilas = cantidadFilas;
        this.cantidadColumnas = cantidadColumnas;
        this.opcionesCuadricula = opcionesCuadricula;
        this.opcionesCasilla = opcionesCasilla;
        this.direcciones = direcciones;
        this.puntos = [];
        this.matriz = this.dameMatriz();
    }
    Camino.prototype.escalarCasillasCuadradas = function () {
        this.opcionesCasilla['ancho'] = this.opcionesCuadricula['ancho'] / this.cantidadColumnas;
        this.opcionesCasilla['alto'] = this.opcionesCuadricula['alto'] / this.cantidadFilas;
        if (this.opcionesCasilla['ancho'] > this.opcionesCasilla['alto']) {
            this.opcionesCasilla['ancho'] = this.opcionesCasilla['alto'];
        }
        else {
            this.opcionesCasilla['alto'] = this.opcionesCasilla['ancho'];
        }
        this.opcionesCasilla['grilla'] = 'finCamino.png';
        this.opcionesCasilla['cantColumnas'] = 1;
        this.opcionesCuadricula['ancho'] = this.opcionesCasilla['ancho'] * (this.cantidadColumnas);
        this.opcionesCuadricula['alto'] = this.opcionesCasilla['alto'] * (this.cantidadFilas);
    };
    Camino.prototype.dameCamino = function () {
        this.escalarCasillasCuadradas();
        var cuadricula = new CuadriculaEsparsa(this.x, this.y, this.opcionesCuadricula, this.opcionesCasilla, this.matriz);
        this.cambiarImagenesCasillasCamino(cuadricula);
        return cuadricula;
    };
    Camino.prototype.cambiarImagenesCasillasCamino = function (cuadricula) {
        var _this = this;
        this.puntos.slice(0, -1).forEach(function (punto, i) {
            cuadricula.casilla(punto.y, punto.x).cambiarImagen(_this.opcionesCasilla[_this.direcciones[i]]);
        });
        var ultimoPunto = this.puntos.slice(-1)[0];
        cuadricula.casilla(ultimoPunto.y, ultimoPunto.x).cambiarImagen('finCamino.png', 1, 4);
        var llegada = cuadricula.casilla(ultimoPunto.y, ultimoPunto.x); // Porque el cambiarImagen rompe integridad referencial
        llegada.definirAnimacion('->', [0], 1);
        llegada.definirAnimacion('^', [3], 1);
        llegada.definirAnimacion('<-', [2], 1);
        llegada.definirAnimacion('v', [1], 1);
        llegada.cargarAnimacion(this.direcciones[cuadricula.cantidadCasillas() - 2]);
    };
    Camino.prototype.dameMatriz = function () {
        var _this = this;
        var aDevolver = [];
        for (var filas = 0; filas < this.cantidadFilas; ++filas) {
            var aux = [];
            for (var cols = 0; cols < this.cantidadColumnas; ++cols) {
                aux.push('F');
            }
            aDevolver.push(aux);
        }
        var puntoActual = new Punto(0, 0);
        this.puntos.push(puntoActual);
        aDevolver[puntoActual.y][puntoActual.x] = 'T';
        this.direcciones.forEach(function (direccion) {
            puntoActual = puntoActual.siguienteEn(direccion);
            _this.puntos.push(puntoActual);
            aDevolver[puntoActual.y][puntoActual.x] = 'T';
        });
        return aDevolver;
    };
    return Camino;
})();
var Punto = (function () {
    function Punto(x, y) {
        this.x = x;
        this.y = y;
    }
    Punto.prototype.siguienteEn = function (dir) {
        return new Punto(this.x + this.avanceX(dir), this.y + this.avanceY(dir));
    };
    Punto.prototype.avanceX = function (dir) {
        return Punto.mapa[dir].x;
    };
    Punto.prototype.avanceY = function (dir) {
        return Punto.mapa[dir].y;
    };
    Punto.prototype.cambiarOrigenDeCoordenadas = function (nuevoX, nuevoY) {
        this.x = this.x - nuevoX;
        this.y = this.y - nuevoY;
    };
    Punto.prototype.invertirY = function () {
        this.y = 0 - this.y;
    };
    Punto.mapa = {
        '->': { x: 1, y: 0 },
        '<-': { x: -1, y: 0 },
        '^': { x: 0, y: -1 },
        'v': { x: 0, y: 1 }
    };
    return Punto;
})();
var CuadriculaParaRaton = (function (_super) {
    __extends(CuadriculaParaRaton, _super);
    function CuadriculaParaRaton(x, y, cantFilas, cantColumnas, opcionesCuadricula, opcionesCasilla) {
        _super.call(this, x, y, this.dameDirecciones(1, 1, cantFilas, cantColumnas, opcionesCuadricula), cantFilas, cantColumnas, opcionesCuadricula, opcionesCasilla);
    }
    CuadriculaParaRaton.prototype.validarOpcionesCuadricula = function (opciones, maxAbj, maxDer) {
        if (opciones['largo_min'] != undefined &&
            opciones['largo_max'] != undefined) {
            var largo_min = opciones['largo_min'];
            var largo_max = opciones['largo_max'];
            if (largo_min < 1) {
                throw new ArgumentError("El largo debe ser al menos 1");
            }
            if (largo_min > maxAbj + maxDer + 1) {
                throw new ArgumentError("El largo minimo supera al maximo posile");
            }
            if (largo_max < largo_min) {
                throw new ArgumentError("El largo debe maximo debe ser >= al minimo");
            }
            if (largo_max > maxAbj + maxDer + 1) {
                throw new ArgumentError("El largo maximo supera al maximo posile");
            }
        }
    };
    CuadriculaParaRaton.prototype.calcularCantidadMovimientos = function (opciones, maxAbj, maxDer) {
        var largo_min = maxAbj + maxDer + 1;
        var largo_max = largo_min;
        if (opciones['largo_min'] != undefined &&
            opciones['largo_max'] != undefined) {
            largo_min = opciones['largo_min'];
            largo_max = opciones['largo_max'];
        }
        // Elegir al azar un largo entre el min y el max
        var largo = largo_min + Math.floor(Math.random() * (largo_max - largo_min + 1));
        // -1 Porque el largo esta en casillas y necesitamos cantidad de movimientos
        return largo - 1;
    };
    CuadriculaParaRaton.prototype.dameDirecciones = function (filaInicio, colInicio, filaFin, colFin, opcionesCuadricula) {
        //pre: solo me voy a moder para abajo y derecha. Con lo cual la
        //pos posInicialX<posFinalX posInicialY<posFinalY
        var cantMovDer = colFin - colInicio;
        var cantMovAbj = filaFin - filaInicio;
        this.validarOpcionesCuadricula(opcionesCuadricula, cantMovAbj, cantMovDer);
        var nMovimientos = this.calcularCantidadMovimientos(opcionesCuadricula, cantMovAbj, cantMovDer);
        var a = Array.apply(null, new Array(cantMovDer)).map(function () { return '->'; });
        var b = Array.apply(null, new Array(cantMovAbj)).map(function () { return 'v'; });
        var aDevolver = a.concat(b);
        return this.shuffleArray(aDevolver).slice(0, nMovimientos);
    };
    CuadriculaParaRaton.prototype.shuffleArray = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };
    return CuadriculaParaRaton;
})(Camino);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "../Direct.ts" />
/**
 * Aquí se proveen algunas abstracciones que sirven para dibujar en una Pizarra.
 * Es lo necesario para poder trabajar con dibujos (lineales) construidos a partir de una
 * lista de puntos, ó lista de listas de puntos (para cuando el dibujo no es conexo).
 * La semántica de una lista de puntos es la serie de puntos que se conectan, en orden.
 * Cada segmento del dibujo empieza en un punto, y sigue al otro.
 *
 * Para dibujar una "L" se puede usar esta lista:
 *    [{x:0,y:10},{x:0,y:0},{x:5,y:0}]
 * Para dibujar dos rayas "- -" se puede usar esta lista de listas:
 *    [[{x:-5,y:0},{x:0,y:0}],[{x:5,y:0},{x:10,y:0}]]
 */
/**
 * El tipo de un punto (tiene x e y, es una coordenada)
 */
var PuntoDibujo = (function () {
    function PuntoDibujo(x, y) {
        this.x = x;
        this.y = y;
    }
    PuntoDibujo.desdePunto = function (punto) {
        return new PuntoDibujo(punto.x, punto.y);
    };
    PuntoDibujo.prototype.igualA = function (otroPunto) {
        return Math.abs(this.x - otroPunto.x) < PuntoDibujo.epsilon && Math.abs(this.y - otroPunto.y) < PuntoDibujo.epsilon;
    };
    PuntoDibujo.prototype.norma = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    PuntoDibujo.suma = function (p1, p2) {
        return new PuntoDibujo(p1.x + p2.x, p1.y + p2.y);
    };
    PuntoDibujo.prototype.sumar = function (otroPunto) {
        return PuntoDibujo.suma(this, otroPunto);
    };
    PuntoDibujo.comparar = function (p1, p2) {
        if (p1.x == p2.x)
            return p1.y - p2.y;
        else
            return p1.x - p2.x;
    };
    PuntoDibujo.desdePuntoSimple = function (p) {
        return new PuntoDibujo(p.x, p.y);
    };
    PuntoDibujo.epsilon = Math.pow(2, -52);
    return PuntoDibujo;
})();
var SegmentoDibujo = (function () {
    function SegmentoDibujo(inicio, fin) {
        this.inicio = inicio;
        this.fin = fin;
    }
    SegmentoDibujo.prototype.direccion = function () {
        return new Direct(this.inicio, this.fin);
    };
    SegmentoDibujo.prototype.longitud = function () {
        return new PuntoDibujo(this.fin.x - this.inicio.x, this.fin.y - this.inicio.y).norma();
    };
    SegmentoDibujo.prototype.igualA = function (otroSegmento) {
        return this.inicio.igualA(otroSegmento.inicio) &&
            this.fin.igualA(otroSegmento.fin);
    };
    SegmentoDibujo.prototype.contieneA = function (unPunto) {
        var aux = new SegmentoDibujo(this.inicio, unPunto);
        return this.mismaDireccionYSentidoQue(aux) && aux.longitud() <= this.longitud();
    };
    SegmentoDibujo.prototype.paraleloA = function (otroSegmento) {
        return this.direccion().isParallelTo(otroSegmento.direccion());
    };
    SegmentoDibujo.prototype.mismaDireccionYSentidoQue = function (otroSegmento) {
        return this.direccion().equals(otroSegmento.direccion());
    };
    SegmentoDibujo.prototype.adyacenteA = function (otroSegmento) {
        return this.fin.igualA(otroSegmento.inicio);
    };
    SegmentoDibujo.prototype.contiguoA = function (otroSegmento) {
        return this.mismaDireccionYSentidoQue(otroSegmento) && this.adyacenteA(otroSegmento);
    };
    SegmentoDibujo.prototype.unificarConContiguo = function (otroSegmento) {
        return new SegmentoDibujo(this.inicio, otroSegmento.fin);
    };
    SegmentoDibujo.unificarContiguos = function (segmentos) {
        var segmentosUnificados = segmentos.slice(0, 1);
        segmentos.slice(1).forEach(function (s2) {
            var s1 = segmentosUnificados.pop();
            if (s1.contiguoA(s2)) {
                segmentosUnificados.push(s1.unificarConContiguo(s2));
            }
            else {
                segmentosUnificados.push(s1, s2);
            }
        });
        return segmentosUnificados;
    };
    SegmentoDibujo.prototype.unificableCon = function (otroSegmento) {
        return this.paraleloA(otroSegmento) && (this.contieneA(otroSegmento.inicio) || this.contieneA(otroSegmento.fin) || otroSegmento.contieneA(this.inicio));
    };
    SegmentoDibujo.prototype.unificarCon = function (otroSegmento) {
        var puntos = [this.inicio, this.fin, otroSegmento.inicio, otroSegmento.fin];
        puntos.sort(PuntoDibujo.comparar);
        return new SegmentoDibujo(puntos[0], puntos[3]);
    };
    SegmentoDibujo.prototype.unificarConMuchos = function (segmentos) {
        var s1 = this;
        for (var j = 0; j < segmentos.length; j++) {
            var s2 = segmentos[j];
            if (s1.unificableCon(s2)) {
                s1 = this.unificarCon(s2);
                segmentos.splice(j, 1);
                j--;
            }
        }
        return s1;
    };
    SegmentoDibujo.prototype.trasladar = function (vector) {
        return new SegmentoDibujo(this.inicio.sumar(vector), this.fin.sumar(vector));
    };
    SegmentoDibujo.unificarMuchos = function (segmentos) {
        var segmentosUnificados = [];
        segmentos.forEach(function (segmento) {
            return segmentosUnificados.push(segmento.unificarConMuchos(segmentosUnificados));
        });
        return segmentosUnificados;
    };
    SegmentoDibujo.desdePuntos = function (puntos) {
        var segmentos = [];
        var inicio = puntos[0];
        puntos.slice(1).forEach(function (fin) {
            segmentos.push(new SegmentoDibujo(inicio, fin));
            inicio = fin;
        });
        return segmentos;
    };
    SegmentoDibujo.comparar = function (s1, s2) {
        if (PuntoDibujo.comparar(s1.inicio, s2.inicio) == 0)
            return PuntoDibujo.comparar(s1.fin, s2.fin);
        else
            return PuntoDibujo.comparar(s1.inicio, s2.inicio);
    };
    SegmentoDibujo.prototype.ordenarExtremos = function () {
        if (PuntoDibujo.comparar(this.inicio, this.fin) > 0) {
            return new SegmentoDibujo(this.fin, this.inicio);
        }
        else {
            return new SegmentoDibujo(this.inicio, this.fin);
        }
    };
    SegmentoDibujo.desdeSegmentoSimple = function (s) {
        return new SegmentoDibujo(PuntoDibujo.desdePuntoSimple(s.inicio), PuntoDibujo.desdePuntoSimple(s.fin));
    };
    return SegmentoDibujo;
})();
var DibujoLineal = (function () {
    /**
     * Para crear un dibujo a partir de segmentos.
     * @param segmentos Lista de segmentos.
     * @param unificar Determina si se unificarán previamente
     * todos los segmentos que sea posible, es decir, que tengan la misma
     * dirección y que compartan como mínimo un punto. Falso por defecto.
     */
    function DibujoLineal(segmentos, unificar) {
        if (unificar === void 0) { unificar = false; }
        if (unificar) {
            segmentos = SegmentoDibujo.unificarContiguos(segmentos);
            segmentos = SegmentoDibujo.unificarMuchos(segmentos);
        }
        this._segmentos = segmentos;
    }
    DibujoLineal.desdeSegmentosSimples = function (segmentosSimples, unificar) {
        var segmentos = segmentosSimples.map(function (s) {
            return SegmentoDibujo.desdeSegmentoSimple(s);
        });
        return new DibujoLineal(segmentos, unificar);
    };
    /**
     * Para crear un dibujo a partir de puntos.
     * @param puntos Lista o lista de lista de puntos.
     */
    DibujoLineal.desdePuntos = function (puntos, unificar) {
        // Si vino un dibujo conexo, creo un conexo:
        var segmentos;
        if (puntos.length > 0 && Array.isArray(puntos[0])) {
            var aux = puntos.map(function (p) { return SegmentoDibujo.desdePuntos(p); });
            segmentos = aux.reduce(function (acum, actual) { return acum.concat(actual); });
        }
        else {
            segmentos = SegmentoDibujo.desdePuntos(puntos);
        }
        return new DibujoLineal(segmentos, unificar);
    };
    DibujoLineal.desdePuntosSimples = function (puntosSimples, unificar) {
        var puntos;
        if (puntosSimples.length > 0 && Array.isArray(puntosSimples[0])) {
            puntos = puntosSimples.map(function (array) {
                return array.map(function (puntoSimple) {
                    return new PuntoDibujo(puntoSimple.x, puntoSimple.y);
                });
            });
        }
        else {
            puntos = puntosSimples.map(function (puntoSimple) {
                return new PuntoDibujo(puntoSimple.x, puntoSimple.y);
            });
        }
        return DibujoLineal.desdePuntos(puntos, unificar);
    };
    /**
     * Para crear un dibujo a partir de lo que aparece representado en una pizarra.
     */
    DibujoLineal.desdePizarra = function (pizarra, unificar) {
        var segmentos = pizarra.segmentosDeDibujoLineal();
        return DibujoLineal.desdeSegmentosSimples(segmentos, unificar);
    };
    /**
     * El método a llamar para crear una pizarra.
     * @param pizarra La pizarra en la que se dibujará
     */
    DibujoLineal.prototype.dibujarEn = function (pizarra, color, grosor, dibujarPuntos) {
        if (dibujarPuntos === void 0) { dibujarPuntos = false; }
        this.segmentos().forEach(function (segmento) {
            if (dibujarPuntos)
                pizarra.dibujar_punto(segmento.inicio.x, segmento.inicio.y, color, grosor);
            pizarra.linea(segmento.inicio.x, segmento.inicio.y, segmento.fin.x, segmento.fin.y, color, grosor);
            if (dibujarPuntos)
                pizarra.dibujar_punto(segmento.fin.x, segmento.fin.y, color, grosor);
        });
    };
    /**
     * Traslada el dibujo en la dirección indicada
     */
    DibujoLineal.prototype.trasladar = function (vector) {
        return new DibujoLineal(this._segmentos.map(function (segmento) { return segmento.trasladar(vector); }));
    };
    /**
     * Unifica los segmentos eliminando puntos intermedios. Devuelve un dibujo nuevo.
     */
    DibujoLineal.prototype.unificado = function () {
        return new DibujoLineal(this._segmentos, true);
    };
    /**
     * Retorna los segmentos que conforman el dibujo.
     */
    DibujoLineal.prototype.segmentos = function () {
        return this._segmentos;
    };
    DibujoLineal.prototype.segmentosOrdenados = function () {
        return this._segmentos.map(function (segmento) { return segmento.ordenarExtremos(); }).sort(SegmentoDibujo.comparar);
    };
    DibujoLineal.prototype.igualA = function (otroDibujo) {
        var misSegmentos = this.segmentosOrdenados();
        var otrosSegmentos = otroDibujo.segmentosOrdenados();
        return misSegmentos.length == otrosSegmentos.length &&
            misSegmentos.every(function (s, index) { return s.igualA(otrosSegmentos[index]); });
    };
    /**
     * Retorna los puntos que conforman el dibujo.
     */
    DibujoLineal.prototype.puntos = function () {
        var puntos = [];
        var ultimoPunto;
        this.segmentos().forEach(function (segmento) {
            if (ultimoPunto && ultimoPunto.igualA(segmento.inicio)) {
                puntos[puntos.length - 1].push(segmento.fin);
            }
            else {
                puntos.push([segmento.inicio, segmento.fin]);
            }
            ultimoPunto = segmento.fin;
        });
        return puntos;
    };
    /**
     * Da los puntos en string. Es útil para crear desafíos.
     */
    DibujoLineal.prototype.stringPuntos = function () {
        return "[" + this.puntos().map(function (array) { return "[" + array.map(function (p) { return "{x:" + p.x.toString() + ",y:" + p.y.toString() + "}"; }).toString() + "]"; }).toString() + "]";
    };
    ;
    return DibujoLineal;
})();
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "Dibujos.ts" />
/// <reference path = "../actores/Dibujante.ts" />
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
var DibujandoFiguras = (function (_super) {
    __extends(DibujandoFiguras, _super);
    function DibujandoFiguras() {
        _super.apply(this, arguments);
        this.anchoLinea = 6;
    }
    DibujandoFiguras.pathFondo = function () {
        return 'fondo.dibujando.figuras.png';
    };
    DibujandoFiguras.prototype.iniciar = function () {
        this.fondo = new Fondo(this.constructor.pathFondo(), 0, 0);
        this.crearAutomata();
        this.dibujoEsperado = DibujoLineal.desdePuntosSimples(this.puntosEsperados());
        this.hacerDibujoPreexistente();
        this.hacerDibujoEsperado();
    };
    DibujandoFiguras.prototype.crearAutomata = function () {
        this.automata = new Dibujante();
        this.automata.escala = 0.5;
        this.automata.x = -150;
        this.automata.y = 100;
    };
    /** Se puede completar en subclases para realizar un dibujo antes de trazar el dibujo esperado */
    DibujandoFiguras.prototype.hacerDibujoPreexistente = function () { };
    DibujandoFiguras.prototype.hacerDibujoEsperado = function () {
        this.pizarraFantasma = new Pizarra();
        this.dibujoEsperado.dibujarEn(this.pizarraFantasma, this.colorDibujoEsperado(), this.anchoLinea);
    };
    DibujandoFiguras.prototype.dibujoRealizado = function () {
        return this.automata.pizarra ?
            DibujoLineal.desdePizarra(this.automata.pizarra, true) :
            new DibujoLineal([]);
    };
    DibujandoFiguras.prototype.estaResueltoElProblema = function () {
        return this.dibujoRealizado().igualA(this.dibujoEsperado.unificado());
    };
    DibujandoFiguras.prototype.colorDibujo = function () {
        return pilas.colores.azuloscuro;
    };
    DibujandoFiguras.prototype.colorDibujoEsperado = function () {
        return pilas.colores.grisclaro;
    };
    return DibujandoFiguras;
})(EscenaActividad);
// Puntos obtenidos haciendo:
// pilas.escena_actual().automata.pizarra.puntosDeLineas().map(p => " {x:" + p.x.toString() +",y:" + p.y.toString() + "}").toString()
var DibujandoCuadrado = (function (_super) {
    __extends(DibujandoCuadrado, _super);
    function DibujandoCuadrado() {
        _super.apply(this, arguments);
    }
    DibujandoCuadrado.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 90 }, { x: -50, y: 80 }, { x: -50, y: 70 }, { x: -50, y: 60 }, { x: -50, y: 50 }, { x: -50, y: 40 }, { x: -50, y: 30 }, { x: -50, y: 20 }, { x: -50, y: 10 }, { x: -50, y: 0 }, { x: -60, y: 0 }, { x: -70, y: 0 }, { x: -80, y: 0 }, { x: -90, y: 0 }, { x: -100, y: 0 }, { x: -110, y: 0 }, { x: -120, y: 0 }, { x: -130, y: 0 }, { x: -140, y: 0 }, { x: -150, y: 0 }, { x: -150, y: 10 }, { x: -150, y: 20 }, { x: -150, y: 30 }, { x: -150, y: 40 }, { x: -150, y: 50 }, { x: -150, y: 60 }, { x: -150, y: 70 }, { x: -150, y: 80 }, { x: -150, y: 90 }, { x: -150, y: 100 }];
    };
    return DibujandoCuadrado;
})(DibujandoFiguras);
var Dibujando5CuadradosHorizontal = (function (_super) {
    __extends(Dibujando5CuadradosHorizontal, _super);
    function Dibujando5CuadradosHorizontal() {
        _super.apply(this, arguments);
    }
    Dibujando5CuadradosHorizontal.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -145, y: 100 }, { x: -140, y: 100 }, { x: -135, y: 100 }, { x: -130, y: 100 }, { x: -125, y: 100 }, { x: -120, y: 100 }, { x: -115, y: 100 }, { x: -110, y: 100 }, { x: -105, y: 100 }, { x: -100, y: 100 }, { x: -100, y: 95 }, { x: -100, y: 90 }, { x: -100, y: 85 }, { x: -100, y: 80 }, { x: -100, y: 75 }, { x: -100, y: 70 }, { x: -100, y: 65 }, { x: -100, y: 60 }, { x: -100, y: 55 }, { x: -100, y: 50 }, { x: -105, y: 50 }, { x: -110, y: 50 }, { x: -115, y: 50 }, { x: -120, y: 50 }, { x: -125, y: 50 }, { x: -130, y: 50 }, { x: -135, y: 50 }, { x: -140, y: 50 }, { x: -145, y: 50 }, { x: -150, y: 50 }, { x: -150, y: 55 }, { x: -150, y: 60 }, { x: -150, y: 65 }, { x: -150, y: 70 }, { x: -150, y: 75 }, { x: -150, y: 80 }, { x: -150, y: 85 }, { x: -150, y: 90 }, { x: -150, y: 95 }, { x: -150, y: 100 }, { x: -145, y: 100 }, { x: -140, y: 100 }, { x: -135, y: 100 }, { x: -130, y: 100 }, { x: -125, y: 100 }, { x: -120, y: 100 }, { x: -115, y: 100 }, { x: -110, y: 100 }, { x: -105, y: 100 }, { x: -100, y: 100 }, { x: -95, y: 100 }, { x: -90, y: 100 }, { x: -85, y: 100 }, { x: -80, y: 100 }, { x: -75, y: 100 }, { x: -70, y: 100 }, { x: -65, y: 100 }, { x: -60, y: 100 }, { x: -55, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 95 }, { x: -50, y: 90 }, { x: -50, y: 85 }, { x: -50, y: 80 }, { x: -50, y: 75 }, { x: -50, y: 70 }, { x: -50, y: 65 }, { x: -50, y: 60 }, { x: -50, y: 55 }, { x: -50, y: 50 }, { x: -55, y: 50 }, { x: -60, y: 50 }, { x: -65, y: 50 }, { x: -70, y: 50 }, { x: -75, y: 50 }, { x: -80, y: 50 }, { x: -85, y: 50 }, { x: -90, y: 50 }, { x: -95, y: 50 }, { x: -100, y: 50 }, { x: -100, y: 55 }, { x: -100, y: 60 }, { x: -100, y: 65 }, { x: -100, y: 70 }, { x: -100, y: 75 }, { x: -100, y: 80 }, { x: -100, y: 85 }, { x: -100, y: 90 }, { x: -100, y: 95 }, { x: -100, y: 100 }, { x: -95, y: 100 }, { x: -90, y: 100 }, { x: -85, y: 100 }, { x: -80, y: 100 }, { x: -75, y: 100 }, { x: -70, y: 100 }, { x: -65, y: 100 }, { x: -60, y: 100 }, { x: -55, y: 100 }, { x: -50, y: 100 }, { x: -45, y: 100 }, { x: -40, y: 100 }, { x: -35, y: 100 }, { x: -30, y: 100 }, { x: -25, y: 100 }, { x: -20, y: 100 }, { x: -15, y: 100 }, { x: -10, y: 100 }, { x: -5, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 95 }, { x: 0, y: 90 }, { x: 0, y: 85 }, { x: 0, y: 80 }, { x: 0, y: 75 }, { x: 0, y: 70 }, { x: 0, y: 65 }, { x: 0, y: 60 }, { x: 0, y: 55 }, { x: 0, y: 50 }, { x: -5, y: 50 }, { x: -10, y: 50 }, { x: -15, y: 50 }, { x: -20, y: 50 }, { x: -25, y: 50 }, { x: -30, y: 50 }, { x: -35, y: 50 }, { x: -40, y: 50 }, { x: -45, y: 50 }, { x: -50, y: 50 }, { x: -50, y: 55 }, { x: -50, y: 60 }, { x: -50, y: 65 }, { x: -50, y: 70 }, { x: -50, y: 75 }, { x: -50, y: 80 }, { x: -50, y: 85 }, { x: -50, y: 90 }, { x: -50, y: 95 }, { x: -50, y: 100 }, { x: -45, y: 100 }, { x: -40, y: 100 }, { x: -35, y: 100 }, { x: -30, y: 100 }, { x: -25, y: 100 }, { x: -20, y: 100 }, { x: -15, y: 100 }, { x: -10, y: 100 }, { x: -5, y: 100 }, { x: 0, y: 100 }, { x: 5, y: 100 }, { x: 10, y: 100 }, { x: 15, y: 100 }, { x: 20, y: 100 }, { x: 25, y: 100 }, { x: 30, y: 100 }, { x: 35, y: 100 }, { x: 40, y: 100 }, { x: 45, y: 100 }, { x: 50, y: 100 }, { x: 50, y: 95 }, { x: 50, y: 90 }, { x: 50, y: 85 }, { x: 50, y: 80 }, { x: 50, y: 75 }, { x: 50, y: 70 }, { x: 50, y: 65 }, { x: 50, y: 60 }, { x: 50, y: 55 }, { x: 50, y: 50 }, { x: 45, y: 50 }, { x: 40, y: 50 }, { x: 35, y: 50 }, { x: 30, y: 50 }, { x: 25, y: 50 }, { x: 20, y: 50 }, { x: 15, y: 50 }, { x: 10, y: 50 }, { x: 5, y: 50 }, { x: 0, y: 50 }, { x: 0, y: 55 }, { x: 0, y: 60 }, { x: 0, y: 65 }, { x: 0, y: 70 }, { x: 0, y: 75 }, { x: 0, y: 80 }, { x: 0, y: 85 }, { x: 0, y: 90 }, { x: 0, y: 95 }, { x: 0, y: 100 }, { x: 5, y: 100 }, { x: 10, y: 100 }, { x: 15, y: 100 }, { x: 20, y: 100 }, { x: 25, y: 100 }, { x: 30, y: 100 }, { x: 35, y: 100 }, { x: 40, y: 100 }, { x: 45, y: 100 }, { x: 50, y: 100 }, { x: 55, y: 100 }, { x: 60, y: 100 }, { x: 65, y: 100 }, { x: 70, y: 100 }, { x: 75, y: 100 }, { x: 80, y: 100 }, { x: 85, y: 100 }, { x: 90, y: 100 }, { x: 95, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 95 }, { x: 100, y: 90 }, { x: 100, y: 85 }, { x: 100, y: 80 }, { x: 100, y: 75 }, { x: 100, y: 70 }, { x: 100, y: 65 }, { x: 100, y: 60 }, { x: 100, y: 55 }, { x: 100, y: 50 }, { x: 95, y: 50 }, { x: 90, y: 50 }, { x: 85, y: 50 }, { x: 80, y: 50 }, { x: 75, y: 50 }, { x: 70, y: 50 }, { x: 65, y: 50 }, { x: 60, y: 50 }, { x: 55, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 55 }, { x: 50, y: 60 }, { x: 50, y: 65 }, { x: 50, y: 70 }, { x: 50, y: 75 }, { x: 50, y: 80 }, { x: 50, y: 85 }, { x: 50, y: 90 }, { x: 50, y: 95 }, { x: 50, y: 100 }, { x: 55, y: 100 }, { x: 60, y: 100 }, { x: 65, y: 100 }, { x: 70, y: 100 }, { x: 75, y: 100 }, { x: 80, y: 100 }, { x: 85, y: 100 }, { x: 90, y: 100 }, { x: 95, y: 100 }, { x: 100, y: 100 }];
    };
    return Dibujando5CuadradosHorizontal;
})(DibujandoFiguras);
var Dibujando5CuadradosDiagonal = (function (_super) {
    __extends(Dibujando5CuadradosDiagonal, _super);
    function Dibujando5CuadradosDiagonal() {
        _super.apply(this, arguments);
    }
    Dibujando5CuadradosDiagonal.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -145, y: 100 }, { x: -140, y: 100 }, { x: -135, y: 100 }, { x: -130, y: 100 }, { x: -125, y: 100 }, { x: -120, y: 100 }, { x: -115, y: 100 }, { x: -110, y: 100 }, { x: -105, y: 100 }, { x: -100, y: 100 }, { x: -100, y: 95 }, { x: -100, y: 90 }, { x: -100, y: 85 }, { x: -100, y: 80 }, { x: -100, y: 75 }, { x: -100, y: 70 }, { x: -100, y: 65 }, { x: -100, y: 60 }, { x: -100, y: 55 }, { x: -100, y: 50 }, { x: -105, y: 50 }, { x: -110, y: 50 }, { x: -115, y: 50 }, { x: -120, y: 50 }, { x: -125, y: 50 }, { x: -130, y: 50 }, { x: -135, y: 50 }, { x: -140, y: 50 }, { x: -145, y: 50 }, { x: -150, y: 50 }, { x: -150, y: 55 }, { x: -150, y: 60 }, { x: -150, y: 65 }, { x: -150, y: 70 }, { x: -150, y: 75 }, { x: -150, y: 80 }, { x: -150, y: 85 }, { x: -150, y: 90 }, { x: -150, y: 95 }, { x: -150, y: 100 }, { x: -145, y: 100 }, { x: -140, y: 100 }, { x: -135, y: 100 }, { x: -130, y: 100 }, { x: -125, y: 100 }, { x: -120, y: 100 }, { x: -115, y: 100 }, { x: -110, y: 100 }, { x: -105, y: 100 }, { x: -100, y: 100 }, { x: -100, y: 95 }, { x: -100, y: 90 }, { x: -100, y: 85 }, { x: -100, y: 80 }, { x: -100, y: 75 }, { x: -100, y: 70 }, { x: -100, y: 65 }, { x: -100, y: 60 }, { x: -100, y: 55 }, { x: -100, y: 50 }, { x: -95, y: 50 }, { x: -90, y: 50 }, { x: -85, y: 50 }, { x: -80, y: 50 }, { x: -75, y: 50 }, { x: -70, y: 50 }, { x: -65, y: 50 }, { x: -60, y: 50 }, { x: -55, y: 50 }, { x: -50, y: 50 }, { x: -50, y: 45 }, { x: -50, y: 40 }, { x: -50, y: 35 }, { x: -50, y: 30 }, { x: -50, y: 25 }, { x: -50, y: 20 }, { x: -50, y: 15 }, { x: -50, y: 10 }, { x: -50, y: 5 }, { x: -50, y: 0 }, { x: -55, y: 0 }, { x: -60, y: 0 }, { x: -65, y: 0 }, { x: -70, y: 0 }, { x: -75, y: 0 }, { x: -80, y: 0 }, { x: -85, y: 0 }, { x: -90, y: 0 }, { x: -95, y: 0 }, { x: -100, y: 0 }, { x: -100, y: 5 }, { x: -100, y: 10 }, { x: -100, y: 15 }, { x: -100, y: 20 }, { x: -100, y: 25 }, { x: -100, y: 30 }, { x: -100, y: 35 }, { x: -100, y: 40 }, { x: -100, y: 45 }, { x: -100, y: 50 }, { x: -95, y: 50 }, { x: -90, y: 50 }, { x: -85, y: 50 }, { x: -80, y: 50 }, { x: -75, y: 50 }, { x: -70, y: 50 }, { x: -65, y: 50 }, { x: -60, y: 50 }, { x: -55, y: 50 }, { x: -50, y: 50 }, { x: -50, y: 45 }, { x: -50, y: 40 }, { x: -50, y: 35 }, { x: -50, y: 30 }, { x: -50, y: 25 }, { x: -50, y: 20 }, { x: -50, y: 15 }, { x: -50, y: 10 }, { x: -50, y: 5 }, { x: -50, y: 0 }, { x: -45, y: 0 }, { x: -40, y: 0 }, { x: -35, y: 0 }, { x: -30, y: 0 }, { x: -25, y: 0 }, { x: -20, y: 0 }, { x: -15, y: 0 }, { x: -10, y: 0 }, { x: -5, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -5 }, { x: 0, y: -10 }, { x: 0, y: -15 }, { x: 0, y: -20 }, { x: 0, y: -25 }, { x: 0, y: -30 }, { x: 0, y: -35 }, { x: 0, y: -40 }, { x: 0, y: -45 }, { x: 0, y: -50 }, { x: -5, y: -50 }, { x: -10, y: -50 }, { x: -15, y: -50 }, { x: -20, y: -50 }, { x: -25, y: -50 }, { x: -30, y: -50 }, { x: -35, y: -50 }, { x: -40, y: -50 }, { x: -45, y: -50 }, { x: -50, y: -50 }, { x: -50, y: -45 }, { x: -50, y: -40 }, { x: -50, y: -35 }, { x: -50, y: -30 }, { x: -50, y: -25 }, { x: -50, y: -20 }, { x: -50, y: -15 }, { x: -50, y: -10 }, { x: -50, y: -5 }, { x: -50, y: 0 }, { x: -45, y: 0 }, { x: -40, y: 0 }, { x: -35, y: 0 }, { x: -30, y: 0 }, { x: -25, y: 0 }, { x: -20, y: 0 }, { x: -15, y: 0 }, { x: -10, y: 0 }, { x: -5, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -5 }, { x: 0, y: -10 }, { x: 0, y: -15 }, { x: 0, y: -20 }, { x: 0, y: -25 }, { x: 0, y: -30 }, { x: 0, y: -35 }, { x: 0, y: -40 }, { x: 0, y: -45 }, { x: 0, y: -50 }, { x: 5, y: -50 }, { x: 10, y: -50 }, { x: 15, y: -50 }, { x: 20, y: -50 }, { x: 25, y: -50 }, { x: 30, y: -50 }, { x: 35, y: -50 }, { x: 40, y: -50 }, { x: 45, y: -50 }, { x: 50, y: -50 }, { x: 50, y: -55 }, { x: 50, y: -60 }, { x: 50, y: -65 }, { x: 50, y: -70 }, { x: 50, y: -75 }, { x: 50, y: -80 }, { x: 50, y: -85 }, { x: 50, y: -90 }, { x: 50, y: -95 }, { x: 50, y: -100 }, { x: 45, y: -100 }, { x: 40, y: -100 }, { x: 35, y: -100 }, { x: 30, y: -100 }, { x: 25, y: -100 }, { x: 20, y: -100 }, { x: 15, y: -100 }, { x: 10, y: -100 }, { x: 5, y: -100 }, { x: 0, y: -100 }, { x: 0, y: -95 }, { x: 0, y: -90 }, { x: 0, y: -85 }, { x: 0, y: -80 }, { x: 0, y: -75 }, { x: 0, y: -70 }, { x: 0, y: -65 }, { x: 0, y: -60 }, { x: 0, y: -55 }, { x: 0, y: -50 }, { x: 5, y: -50 }, { x: 10, y: -50 }, { x: 15, y: -50 }, { x: 20, y: -50 }, { x: 25, y: -50 }, { x: 30, y: -50 }, { x: 35, y: -50 }, { x: 40, y: -50 }, { x: 45, y: -50 }, { x: 50, y: -50 }, { x: 50, y: -55 }, { x: 50, y: -60 }, { x: 50, y: -65 }, { x: 50, y: -70 }, { x: 50, y: -75 }, { x: 50, y: -80 }, { x: 50, y: -85 }, { x: 50, y: -90 }, { x: 50, y: -95 }, { x: 50, y: -100 }, { x: 55, y: -100 }, { x: 60, y: -100 }, { x: 65, y: -100 }, { x: 70, y: -100 }, { x: 75, y: -100 }, { x: 80, y: -100 }, { x: 85, y: -100 }, { x: 90, y: -100 }, { x: 95, y: -100 }, { x: 100, y: -100 }, { x: 100, y: -105 }, { x: 100, y: -110 }, { x: 100, y: -115 }, { x: 100, y: -120 }, { x: 100, y: -125 }, { x: 100, y: -130 }, { x: 100, y: -135 }, { x: 100, y: -140 }, { x: 100, y: -145 }, { x: 100, y: -150 }, { x: 95, y: -150 }, { x: 90, y: -150 }, { x: 85, y: -150 }, { x: 80, y: -150 }, { x: 75, y: -150 }, { x: 70, y: -150 }, { x: 65, y: -150 }, { x: 60, y: -150 }, { x: 55, y: -150 }, { x: 50, y: -150 }, { x: 50, y: -145 }, { x: 50, y: -140 }, { x: 50, y: -135 }, { x: 50, y: -130 }, { x: 50, y: -125 }, { x: 50, y: -120 }, { x: 50, y: -115 }, { x: 50, y: -110 }, { x: 50, y: -105 }, { x: 50, y: -100 }, { x: 55, y: -100 }, { x: 60, y: -100 }, { x: 65, y: -100 }, { x: 70, y: -100 }, { x: 75, y: -100 }, { x: 80, y: -100 }, { x: 85, y: -100 }, { x: 90, y: -100 }, { x: 95, y: -100 }, { x: 100, y: -100 }, { x: 100, y: -105 }, { x: 100, y: -110 }, { x: 100, y: -115 }, { x: 100, y: -120 }, { x: 100, y: -125 }, { x: 100, y: -130 }, { x: 100, y: -135 }, { x: 100, y: -140 }, { x: 100, y: -145 }, { x: 100, y: -150 }];
    };
    return Dibujando5CuadradosDiagonal;
})(DibujandoFiguras);
var Dibujando4CuadradosInteriores = (function (_super) {
    __extends(Dibujando4CuadradosInteriores, _super);
    function Dibujando4CuadradosInteriores() {
        _super.apply(this, arguments);
    }
    Dibujando4CuadradosInteriores.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -145, y: 100 }, { x: -140, y: 100 }, { x: -135, y: 100 }, { x: -130, y: 100 }, { x: -125, y: 100 }, { x: -120, y: 100 }, { x: -115, y: 100 }, { x: -110, y: 100 }, { x: -105, y: 100 }, { x: -100, y: 100 }, { x: -100, y: 95 }, { x: -100, y: 90 }, { x: -100, y: 85 }, { x: -100, y: 80 }, { x: -100, y: 75 }, { x: -100, y: 70 }, { x: -100, y: 65 }, { x: -100, y: 60 }, { x: -100, y: 55 }, { x: -100, y: 50 }, { x: -105, y: 50 }, { x: -110, y: 50 }, { x: -115, y: 50 }, { x: -120, y: 50 }, { x: -125, y: 50 }, { x: -130, y: 50 }, { x: -135, y: 50 }, { x: -140, y: 50 }, { x: -145, y: 50 }, { x: -150, y: 50 }, { x: -150, y: 55 }, { x: -150, y: 60 }, { x: -150, y: 65 }, { x: -150, y: 70 }, { x: -150, y: 75 }, { x: -150, y: 80 }, { x: -150, y: 85 }, { x: -150, y: 90 }, { x: -150, y: 95 }, { x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 90 }, { x: -50, y: 80 }, { x: -50, y: 70 }, { x: -50, y: 60 }, { x: -50, y: 50 }, { x: -50, y: 40 }, { x: -50, y: 30 }, { x: -50, y: 20 }, { x: -50, y: 10 }, { x: -50, y: 0 }, { x: -60, y: 0 }, { x: -70, y: 0 }, { x: -80, y: 0 }, { x: -90, y: 0 }, { x: -100, y: 0 }, { x: -110, y: 0 }, { x: -120, y: 0 }, { x: -130, y: 0 }, { x: -140, y: 0 }, { x: -150, y: 0 }, { x: -150, y: 10 }, { x: -150, y: 20 }, { x: -150, y: 30 }, { x: -150, y: 40 }, { x: -150, y: 50 }, { x: -150, y: 60 }, { x: -150, y: 70 }, { x: -150, y: 80 }, { x: -150, y: 90 }, { x: -150, y: 100 }, { x: -135, y: 100 }, { x: -120, y: 100 }, { x: -105, y: 100 }, { x: -90, y: 100 }, { x: -75, y: 100 }, { x: -60, y: 100 }, { x: -45, y: 100 }, { x: -30, y: 100 }, { x: -15, y: 100 }, { x: 0, y: 100 }, { x: 0, y: 85 }, { x: 0, y: 70 }, { x: 0, y: 55 }, { x: 0, y: 40 }, { x: 0, y: 25 }, { x: 0, y: 10 }, { x: 0, y: -5 }, { x: 0, y: -20 }, { x: 0, y: -35 }, { x: 0, y: -50 }, { x: -15, y: -50 }, { x: -30, y: -50 }, { x: -45, y: -50 }, { x: -60, y: -50 }, { x: -75, y: -50 }, { x: -90, y: -50 }, { x: -105, y: -50 }, { x: -120, y: -50 }, { x: -135, y: -50 }, { x: -150, y: -50 }, { x: -150, y: -35 }, { x: -150, y: -20 }, { x: -150, y: -5 }, { x: -150, y: 10 }, { x: -150, y: 25 }, { x: -150, y: 40 }, { x: -150, y: 55 }, { x: -150, y: 70 }, { x: -150, y: 85 }, { x: -150, y: 100 }, { x: -130, y: 100 }, { x: -110, y: 100 }, { x: -90, y: 100 }, { x: -70, y: 100 }, { x: -50, y: 100 }, { x: -30, y: 100 }, { x: -10, y: 100 }, { x: 10, y: 100 }, { x: 30, y: 100 }, { x: 50, y: 100 }, { x: 50, y: 80 }, { x: 50, y: 60 }, { x: 50, y: 40 }, { x: 50, y: 20 }, { x: 50, y: 0 }, { x: 50, y: -20 }, { x: 50, y: -40 }, { x: 50, y: -60 }, { x: 50, y: -80 }, { x: 50, y: -100 }, { x: 30, y: -100 }, { x: 10, y: -100 }, { x: -10, y: -100 }, { x: -30, y: -100 }, { x: -50, y: -100 }, { x: -70, y: -100 }, { x: -90, y: -100 }, { x: -110, y: -100 }, { x: -130, y: -100 }, { x: -150, y: -100 }, { x: -150, y: -80 }, { x: -150, y: -60 }, { x: -150, y: -40 }, { x: -150, y: -20 }, { x: -150, y: 0 }, { x: -150, y: 20 }, { x: -150, y: 40 }, { x: -150, y: 60 }, { x: -150, y: 80 }, { x: -150, y: 100 }];
    };
    return Dibujando4CuadradosInteriores;
})(DibujandoFiguras);
var DibujandoCabezaElefante = (function (_super) {
    __extends(DibujandoCabezaElefante, _super);
    function DibujandoCabezaElefante() {
        _super.apply(this, arguments);
    }
    DibujandoCabezaElefante.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 90 }, { x: -50, y: 80 }, { x: -50, y: 70 }, { x: -50, y: 60 }, { x: -50, y: 50 }, { x: -50, y: 40 }, { x: -50, y: 30 }, { x: -50, y: 20 }, { x: -50, y: 10 }, { x: -50, y: 0 }, { x: -60, y: 0 }, { x: -70, y: 0 }, { x: -80, y: 0 }, { x: -90, y: 0 }, { x: -100, y: 0 }, { x: -110, y: 0 }, { x: -120, y: 0 }, { x: -130, y: 0 }, { x: -140, y: 0 }, { x: -150, y: 0 }, { x: -150, y: 10 }, { x: -150, y: 20 }, { x: -150, y: 30 }, { x: -150, y: 40 }, { x: -150, y: 50 }, { x: -150, y: 60 }, { x: -150, y: 70 }, { x: -150, y: 80 }, { x: -150, y: 90 }, { x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 90 }, { x: -50, y: 80 }, { x: -50, y: 70 }, { x: -50, y: 60 }, { x: -50, y: 50 }, { x: -50, y: 40 }, { x: -50, y: 30 }, { x: -50, y: 20 }, { x: -50, y: 10 }, { x: -50, y: 0 }, { x: -50, y: -5 }, { x: -50, y: -10 }, { x: -50, y: -15 }, { x: -50, y: -20 }, { x: -50, y: -25 }, { x: -50, y: -30 }, { x: -50, y: -35 }, { x: -50, y: -40 }, { x: -50, y: -45 }, { x: -50, y: -50 }, { x: -55, y: -50 }, { x: -60, y: -50 }, { x: -65, y: -50 }, { x: -70, y: -50 }, { x: -75, y: -50 }, { x: -80, y: -50 }, { x: -85, y: -50 }, { x: -90, y: -50 }, { x: -95, y: -50 }, { x: -100, y: -50 }, { x: -100, y: -45 }, { x: -100, y: -40 }, { x: -100, y: -35 }, { x: -100, y: -30 }, { x: -100, y: -25 }, { x: -100, y: -20 }, { x: -100, y: -15 }, { x: -100, y: -10 }, { x: -100, y: -5 }, { x: -100, y: 0 }, { x: -95, y: 0 }, { x: -90, y: 0 }, { x: -85, y: 0 }, { x: -80, y: 0 }, { x: -75, y: 0 }, { x: -70, y: 0 }, { x: -65, y: 0 }, { x: -60, y: 0 }, { x: -55, y: 0 }, { x: -50, y: 0 }, { x: -50, y: -5 }, { x: -50, y: -10 }, { x: -50, y: -15 }, { x: -50, y: -20 }, { x: -50, y: -25 }, { x: -50, y: -30 }, { x: -50, y: -35 }, { x: -50, y: -40 }, { x: -50, y: -45 }, { x: -50, y: -50 }, { x: -50, y: -55 }, { x: -50, y: -60 }, { x: -50, y: -65 }, { x: -50, y: -70 }, { x: -50, y: -75 }, { x: -50, y: -80 }, { x: -50, y: -85 }, { x: -50, y: -90 }, { x: -50, y: -95 }, { x: -50, y: -100 }, { x: -55, y: -100 }, { x: -60, y: -100 }, { x: -65, y: -100 }, { x: -70, y: -100 }, { x: -75, y: -100 }, { x: -80, y: -100 }, { x: -85, y: -100 }, { x: -90, y: -100 }, { x: -95, y: -100 }, { x: -100, y: -100 }, { x: -100, y: -95 }, { x: -100, y: -90 }, { x: -100, y: -85 }, { x: -100, y: -80 }, { x: -100, y: -75 }, { x: -100, y: -70 }, { x: -100, y: -65 }, { x: -100, y: -60 }, { x: -100, y: -55 }, { x: -100, y: -50 }, { x: -95, y: -50 }, { x: -90, y: -50 }, { x: -85, y: -50 }, { x: -80, y: -50 }, { x: -75, y: -50 }, { x: -70, y: -50 }, { x: -65, y: -50 }, { x: -60, y: -50 }, { x: -55, y: -50 }, { x: -50, y: -50 }, { x: -50, y: -55 }, { x: -50, y: -60 }, { x: -50, y: -65 }, { x: -50, y: -70 }, { x: -50, y: -75 }, { x: -50, y: -80 }, { x: -50, y: -85 }, { x: -50, y: -90 }, { x: -50, y: -95 }, { x: -50, y: -100 }, { x: -50, y: -105 }, { x: -50, y: -110 }, { x: -50, y: -115 }, { x: -50, y: -120 }, { x: -50, y: -125 }, { x: -50, y: -130 }, { x: -50, y: -135 }, { x: -50, y: -140 }, { x: -50, y: -145 }, { x: -50, y: -150 }, { x: -55, y: -150 }, { x: -60, y: -150 }, { x: -65, y: -150 }, { x: -70, y: -150 }, { x: -75, y: -150 }, { x: -80, y: -150 }, { x: -85, y: -150 }, { x: -90, y: -150 }, { x: -95, y: -150 }, { x: -100, y: -150 }, { x: -100, y: -145 }, { x: -100, y: -140 }, { x: -100, y: -135 }, { x: -100, y: -130 }, { x: -100, y: -125 }, { x: -100, y: -120 }, { x: -100, y: -115 }, { x: -100, y: -110 }, { x: -100, y: -105 }, { x: -100, y: -100 }, { x: -95, y: -100 }, { x: -90, y: -100 }, { x: -85, y: -100 }, { x: -80, y: -100 }, { x: -75, y: -100 }, { x: -70, y: -100 }, { x: -65, y: -100 }, { x: -60, y: -100 }, { x: -55, y: -100 }, { x: -50, y: -100 }, { x: -50, y: -105 }, { x: -50, y: -110 }, { x: -50, y: -115 }, { x: -50, y: -120 }, { x: -50, y: -125 }, { x: -50, y: -130 }, { x: -50, y: -135 }, { x: -50, y: -140 }, { x: -50, y: -145 }, { x: -50, y: -150 }, { x: -50, y: -155 }, { x: -50, y: -160 }, { x: -50, y: -165 }, { x: -50, y: -170 }, { x: -50, y: -175 }, { x: -50, y: -180 }, { x: -50, y: -185 }, { x: -50, y: -190 }, { x: -50, y: -195 }, { x: -50, y: -200 }, { x: -55, y: -200 }, { x: -60, y: -200 }, { x: -65, y: -200 }, { x: -70, y: -200 }, { x: -75, y: -200 }, { x: -80, y: -200 }, { x: -85, y: -200 }, { x: -90, y: -200 }, { x: -95, y: -200 }, { x: -100, y: -200 }, { x: -100, y: -195 }, { x: -100, y: -190 }, { x: -100, y: -185 }, { x: -100, y: -180 }, { x: -100, y: -175 }, { x: -100, y: -170 }, { x: -100, y: -165 }, { x: -100, y: -160 }, { x: -100, y: -155 }, { x: -100, y: -150 }, { x: -95, y: -150 }, { x: -90, y: -150 }, { x: -85, y: -150 }, { x: -80, y: -150 }, { x: -75, y: -150 }, { x: -70, y: -150 }, { x: -65, y: -150 }, { x: -60, y: -150 }, { x: -55, y: -150 }, { x: -50, y: -150 }, { x: -50, y: -155 }, { x: -50, y: -160 }, { x: -50, y: -165 }, { x: -50, y: -170 }, { x: -50, y: -175 }, { x: -50, y: -180 }, { x: -50, y: -185 }, { x: -50, y: -190 }, { x: -50, y: -195 }, { x: -50, y: -200 }];
    };
    return DibujandoCabezaElefante;
})(DibujandoFiguras);
var DibujandoHexagono = (function (_super) {
    __extends(DibujandoHexagono, _super);
    function DibujandoHexagono() {
        _super.apply(this, arguments);
    }
    DibujandoHexagono.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -45, y: 91 }, { x: -40, y: 83 }, { x: -35, y: 74 }, { x: -30, y: 65 }, { x: -25, y: 57 }, { x: -20, y: 48 }, { x: -15, y: 39 }, { x: -10, y: 31 }, { x: -5, y: 22 }, { x: 0, y: 13 }, { x: -5, y: 5 }, { x: -10, y: -4 }, { x: -15, y: -13 }, { x: -20, y: -21 }, { x: -25, y: -30 }, { x: -30, y: -39 }, { x: -35, y: -47 }, { x: -40, y: -56 }, { x: -45, y: -65 }, { x: -50, y: -73 }, { x: -60, y: -73 }, { x: -70, y: -73 }, { x: -80, y: -73 }, { x: -90, y: -73 }, { x: -100, y: -73 }, { x: -110, y: -73 }, { x: -120, y: -73 }, { x: -130, y: -73 }, { x: -140, y: -73 }, { x: -150, y: -73 }, { x: -155, y: -65 }, { x: -160, y: -56 }, { x: -165, y: -47 }, { x: -170, y: -39 }, { x: -175, y: -30 }, { x: -180, y: -21 }, { x: -185, y: -13 }, { x: -190, y: -4 }, { x: -195, y: 5 }, { x: -200, y: 13 }, { x: -195, y: 22 }, { x: -190, y: 31 }, { x: -185, y: 39 }, { x: -180, y: 48 }, { x: -175, y: 57 }, { x: -170, y: 65 }, { x: -165, y: 74 }, { x: -160, y: 83 }, { x: -155, y: 91 }, { x: -150, y: 100 }];
    };
    return DibujandoHexagono;
})(DibujandoFiguras);
var DibujandoTrianguloEquilatero = (function (_super) {
    __extends(DibujandoTrianguloEquilatero, _super);
    function DibujandoTrianguloEquilatero() {
        _super.apply(this, arguments);
    }
    DibujandoTrianguloEquilatero.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -55, y: 91 }, { x: -60, y: 83 }, { x: -65, y: 74 }, { x: -70, y: 65 }, { x: -75, y: 57 }, { x: -80, y: 48 }, { x: -85, y: 39 }, { x: -90, y: 31 }, { x: -95, y: 22 }, { x: -100, y: 13 }, { x: -105, y: 22 }, { x: -110, y: 31 }, { x: -115, y: 39 }, { x: -120, y: 48 }, { x: -125, y: 57 }, { x: -130, y: 65 }, { x: -135, y: 74 }, { x: -140, y: 83 }, { x: -145, y: 91 }, { x: -150, y: 100 }];
    };
    return DibujandoTrianguloEquilatero;
})(DibujandoFiguras);
var DibujandoPoligonosInteriores = (function (_super) {
    __extends(DibujandoPoligonosInteriores, _super);
    function DibujandoPoligonosInteriores() {
        _super.apply(this, arguments);
    }
    DibujandoPoligonosInteriores.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -55, y: 91 }, { x: -60, y: 83 }, { x: -65, y: 74 }, { x: -70, y: 65 }, { x: -75, y: 57 }, { x: -80, y: 48 }, { x: -85, y: 39 }, { x: -90, y: 31 }, { x: -95, y: 22 }, { x: -100, y: 13 }, { x: -105, y: 22 }, { x: -110, y: 31 }, { x: -115, y: 39 }, { x: -120, y: 48 }, { x: -125, y: 57 }, { x: -130, y: 65 }, { x: -135, y: 74 }, { x: -140, y: 83 }, { x: -145, y: 91 }, { x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -50, y: 90 }, { x: -50, y: 80 }, { x: -50, y: 70 }, { x: -50, y: 60 }, { x: -50, y: 50 }, { x: -50, y: 40 }, { x: -50, y: 30 }, { x: -50, y: 20 }, { x: -50, y: 10 }, { x: -50, y: 0 }, { x: -60, y: 0 }, { x: -70, y: 0 }, { x: -80, y: 0 }, { x: -90, y: 0 }, { x: -100, y: 0 }, { x: -110, y: 0 }, { x: -120, y: 0 }, { x: -130, y: 0 }, { x: -140, y: 0 }, { x: -150, y: 0 }, { x: -150, y: 10 }, { x: -150, y: 20 }, { x: -150, y: 30 }, { x: -150, y: 40 }, { x: -150, y: 50 }, { x: -150, y: 60 }, { x: -150, y: 70 }, { x: -150, y: 80 }, { x: -150, y: 90 }, { x: -150, y: 100 }, { x: -140, y: 100 }, { x: -130, y: 100 }, { x: -120, y: 100 }, { x: -110, y: 100 }, { x: -100, y: 100 }, { x: -90, y: 100 }, { x: -80, y: 100 }, { x: -70, y: 100 }, { x: -60, y: 100 }, { x: -50, y: 100 }, { x: -47, y: 90 }, { x: -44, y: 81 }, { x: -41, y: 71 }, { x: -38, y: 62 }, { x: -35, y: 52 }, { x: -31, y: 43 }, { x: -28, y: 33 }, { x: -25, y: 24 }, { x: -22, y: 14 }, { x: -19, y: 5 }, { x: -27, y: -1 }, { x: -35, y: -7 }, { x: -43, y: -13 }, { x: -51, y: -19 }, { x: -60, y: -24 }, { x: -68, y: -30 }, { x: -76, y: -36 }, { x: -84, y: -42 }, { x: -92, y: -48 }, { x: -100, y: -54 }, { x: -108, y: -48 }, { x: -116, y: -42 }, { x: -124, y: -36 }, { x: -132, y: -30 }, { x: -140, y: -24 }, { x: -149, y: -19 }, { x: -157, y: -13 }, { x: -165, y: -7 }, { x: -173, y: -1 }, { x: -181, y: 5 }, { x: -178, y: 14 }, { x: -175, y: 24 }, { x: -172, y: 33 }, { x: -169, y: 43 }, { x: -165, y: 52 }, { x: -162, y: 62 }, { x: -159, y: 71 }, { x: -156, y: 81 }, { x: -153, y: 90 }, { x: -150, y: 100 }];
    };
    return DibujandoPoligonosInteriores;
})(DibujandoFiguras);
var DibujandoCuevaEstalagtitas = (function (_super) {
    __extends(DibujandoCuevaEstalagtitas, _super);
    function DibujandoCuevaEstalagtitas() {
        _super.apply(this, arguments);
    }
    DibujandoCuevaEstalagtitas.prototype.puntosEsperados = function () {
        return [{ x: -150, y: 100 }, { x: -130, y: 100 }, { x: -110, y: 100 }, { x: -90, y: 100 }, { x: -70, y: 100 }, { x: -50, y: 100 }, { x: -30, y: 100 }, { x: -10, y: 100 }, { x: 10, y: 100 }, { x: 30, y: 100 }, { x: 50, y: 100 }, { x: 50, y: 80 }, { x: 50, y: 60 }, { x: 50, y: 40 }, { x: 50, y: 20 }, { x: 50, y: 0 }, { x: 50, y: -20 }, { x: 50, y: -40 }, { x: 50, y: -60 }, { x: 50, y: -80 }, { x: 50, y: -100 }, { x: 30, y: -100 }, { x: 10, y: -100 }, { x: -10, y: -100 }, { x: -30, y: -100 }, { x: -50, y: -100 }, { x: -70, y: -100 }, { x: -90, y: -100 }, { x: -110, y: -100 }, { x: -130, y: -100 }, { x: -150, y: -100 }, { x: -150, y: -80 }, { x: -150, y: -60 }, { x: -150, y: -40 }, { x: -150, y: -20 }, { x: -150, y: 0 }, { x: -150, y: 20 }, { x: -150, y: 40 }, { x: -150, y: 60 }, { x: -150, y: 80 }, { x: -150, y: 100 }, { x: -146, y: 100 }, { x: -142, y: 100 }, { x: -138, y: 100 }, { x: -134, y: 100 }, { x: -130, y: 100 }, { x: -126, y: 100 }, { x: -122, y: 100 }, { x: -118, y: 100 }, { x: -114, y: 100 }, { x: -110, y: 100 }, { x: -112, y: 97 }, { x: -114, y: 93 }, { x: -116, y: 90 }, { x: -118, y: 86 }, { x: -120, y: 83 }, { x: -122, y: 79 }, { x: -124, y: 76 }, { x: -126, y: 72 }, { x: -128, y: 69 }, { x: -130, y: 65 }, { x: -132, y: 69 }, { x: -134, y: 72 }, { x: -136, y: 76 }, { x: -138, y: 79 }, { x: -140, y: 83 }, { x: -142, y: 86 }, { x: -144, y: 90 }, { x: -146, y: 93 }, { x: -148, y: 97 }, { x: -150, y: 100 }, { x: -146, y: 100 }, { x: -142, y: 100 }, { x: -138, y: 100 }, { x: -134, y: 100 }, { x: -130, y: 100 }, { x: -126, y: 100 }, { x: -122, y: 100 }, { x: -118, y: 100 }, { x: -114, y: 100 }, { x: -110, y: 100 }, { x: -104, y: 100 }, { x: -98, y: 100 }, { x: -92, y: 100 }, { x: -86, y: 100 }, { x: -80, y: 100 }, { x: -74, y: 100 }, { x: -68, y: 100 }, { x: -62, y: 100 }, { x: -56, y: 100 }, { x: -50, y: 100 }, { x: -53, y: 95 }, { x: -56, y: 90 }, { x: -59, y: 84 }, { x: -62, y: 79 }, { x: -65, y: 74 }, { x: -68, y: 69 }, { x: -71, y: 64 }, { x: -74, y: 58 }, { x: -77, y: 53 }, { x: -80, y: 48 }, { x: -83, y: 53 }, { x: -86, y: 58 }, { x: -89, y: 64 }, { x: -92, y: 69 }, { x: -95, y: 74 }, { x: -98, y: 79 }, { x: -101, y: 84 }, { x: -104, y: 90 }, { x: -107, y: 95 }, { x: -110, y: 100 }, { x: -104, y: 100 }, { x: -98, y: 100 }, { x: -92, y: 100 }, { x: -86, y: 100 }, { x: -80, y: 100 }, { x: -74, y: 100 }, { x: -68, y: 100 }, { x: -62, y: 100 }, { x: -56, y: 100 }, { x: -50, y: 100 }, { x: -40, y: 100 }, { x: -30, y: 100 }, { x: -20, y: 100 }, { x: -10, y: 100 }, { x: 0, y: 100 }, { x: 10, y: 100 }, { x: 20, y: 100 }, { x: 30, y: 100 }, { x: 40, y: 100 }, { x: 50, y: 100 }, { x: 45, y: 91 }, { x: 40, y: 83 }, { x: 35, y: 74 }, { x: 30, y: 65 }, { x: 25, y: 57 }, { x: 20, y: 48 }, { x: 15, y: 39 }, { x: 10, y: 31 }, { x: 5, y: 22 }, { x: 0, y: 13 }, { x: -5, y: 22 }, { x: -10, y: 31 }, { x: -15, y: 39 }, { x: -20, y: 48 }, { x: -25, y: 57 }, { x: -30, y: 65 }, { x: -35, y: 74 }, { x: -40, y: 83 }, { x: -45, y: 91 }, { x: -50, y: 100 }];
    };
    return DibujandoCuevaEstalagtitas;
})(DibujandoFiguras);
var DibujandoLibremente = (function (_super) {
    __extends(DibujandoLibremente, _super);
    function DibujandoLibremente() {
        _super.apply(this, arguments);
    }
    DibujandoLibremente.prototype.puntosEsperados = function () {
        return [];
    };
    DibujandoLibremente.prototype.estaResueltoElProblema = function () {
        return false;
    };
    return DibujandoLibremente;
})(DibujandoFiguras);
/// <reference path = "EscenaActividad.ts" />
/// <reference path="../actores/CuadriculaEsparsa.ts"/>
/// <reference path="../actores/GloboAnimado.ts"/>
/// <reference path="../actores/CangrejoAnimado.ts"/>
var ElCangrejoAguafiestas = (function (_super) {
    __extends(ElCangrejoAguafiestas, _super);
    function ElCangrejoAguafiestas() {
        _super.apply(this, arguments);
    }
    ElCangrejoAguafiestas.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.cangrejo_aguafiestas.png', 0, 0);
        this.cantidadFilas = 5;
        this.cantidadColumnas = 6;
        var matriz = [
            ['T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T']];
        this.cuadricula = new CuadriculaEsparsa(0, 15, { alto: 360, ancho: 400 }, { grilla: 'casilla.cangrejo_aguafiestas.png' }, matriz);
        this.completarConGlobos();
        this.automata = new CangrejoAnimado(0, 0);
        this.automata.escala *= 1.2;
        this.cuadricula.agregarActor(this.automata, 0, 0);
        this.estado = new EstadoParaContarBuilder(this, 'explotar', 18).estadoInicial();
    };
    ElCangrejoAguafiestas.prototype.completarConGlobos = function () {
        var _this = this;
        this.cuadricula.forEachCasilla(function (c) { if (!c.esEsquina())
            _this.agregarGlobo(c); });
    };
    ElCangrejoAguafiestas.prototype.agregarGlobo = function (casilla) {
        var globo = new GloboAnimado();
        this.cuadricula.agregarActorEnCasilla(globo, casilla, false);
        globo.y += 20;
        globo.escala *= 0.8;
        globo.aprender(Flotar, { Desvio: 5 });
    };
    return ElCangrejoAguafiestas;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Detective.ts" />
/// <reference path = "../actores/Sospechoso.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
/// <reference path = "../comportamientos/Decir.ts" />
var ElDetectiveChaparro = (function (_super) {
    __extends(ElDetectiveChaparro, _super);
    function ElDetectiveChaparro() {
        _super.apply(this, arguments);
    }
    ElDetectiveChaparro.prototype.iniciar = function () {
        var _this = this;
        this.fondo = new Fondo('fondo.detective.png', 0, 0);
        this.cuadricula = new Cuadricula(0, -30, 1, 7, { ancho: 400, alto: 400 }, { grilla: 'invisible.png', cantColumnas: 1 });
        Sospechoso.reiniciarDisfraces();
        var nroCulpable = Math.floor(Math.random() * 7);
        [0, 1, 2, 3, 4, 5, 6].forEach(function (pos) {
            var sospechoso = new Sospechoso();
            _this.cuadricula.agregarActor(sospechoso, 0, pos, false);
            if (pos === nroCulpable)
                _this.culpable = sospechoso;
        });
        this.culpable.hacerCulpable();
        this.automata = new Detective();
        this.cuadricula.agregarActor(this.automata, 0, Math.floor(Math.random() * 7), false);
        this.automata.y = -100;
        this.automata.aprender(Flotar, {});
    };
    ElDetectiveChaparro.prototype.estaResueltoElProblema = function () {
        return this.automata.casillaActual() === this.culpable.casillaActual() &&
            this.culpable.teEncontraron();
    };
    return ElDetectiveChaparro;
})(EscenaActividad);
var SacarDisfraz = (function (_super) {
    __extends(SacarDisfraz, _super);
    function SacarDisfraz() {
        _super.apply(this, arguments);
    }
    SacarDisfraz.prototype.iniciar = function (receptorDetective) {
        this.argumentos.receptor = receptorDetective.obtenerActorBajoLaLupa();
        this.argumentos.receptor.sacarDisfraz();
        this.argumentos.mensaje = this.argumentos.receptor.mensajeAlSacarDisfraz();
        _super.prototype.iniciar.call(this, receptorDetective);
    };
    return SacarDisfraz;
})(Decir);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/GatoAnimado.ts" />}
var ElGatoEnLaCalle = (function (_super) {
    __extends(ElGatoEnLaCalle, _super);
    function ElGatoEnLaCalle() {
        _super.apply(this, arguments);
    }
    ElGatoEnLaCalle.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.gatoEnLaCalle.png', 0, 0);
        this.automata = new GatoAnimado(0, -150);
        this.construirFSM();
    };
    ElGatoEnLaCalle.prototype.construirFSM = function () {
        // ver https://github.com/Program-AR/pilas-bloques/issues/187
        var builder = new BuilderStatePattern(this, 'inicial', false);
        builder.agregarEstado('posCorrecta', false);
        builder.agregarEstado('semiDormido1', false);
        builder.agregarEstado('semiDormido2', false);
        builder.agregarEstado('dormido', false);
        builder.agregarEstado('semiDespierto1', false);
        builder.agregarEstado('semiDespierto2', false);
        builder.agregarEstado('despierto', false);
        builder.agregarEstado('saludado', false);
        builder.agregarEstado('noResuelve', false);
        builder.agregarEstadoAceptacion('fin');
        builder.agregarTransicion('inicial', 'posCorrecta', 'avanzar');
        builder.agregarTransicion('posCorrecta', 'semiDormido1', 'acostarse');
        builder.agregarTransicion('posCorrecta', 'semiDormido2', 'cerrarOjos');
        builder.agregarTransicion('semiDormido1', 'dormido', 'cerrarOjos');
        builder.agregarTransicion('semiDormido2', 'dormido', 'acostarse');
        builder.agregarTransicion('dormido', 'dormido', 'soniar');
        builder.agregarTransicion('dormido', 'semiDespierto1', 'abrirOjos');
        builder.agregarTransicion('dormido', 'semiDespierto2', 'levantarse');
        builder.agregarTransicion('semiDespierto1', 'despierto', 'levantarse');
        builder.agregarTransicion('semiDespierto2', 'despierto', 'abrirOjos');
        builder.agregarTransicion('despierto', 'saludado', 'saludar');
        builder.agregarTransicion('saludado', 'fin', 'volver');
        this.estado = builder.estadoInicial();
    };
    return ElGatoEnLaCalle;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/**
 * @class ElMarcianoEnElDesierto
 *
 * Objetivos: Ejercitarse en el uso de programas para la resolución de problemas.
 * Enunciado: Comer todas las manzanas del tablero.
 */
var ElMarcianoEnElDesierto = (function (_super) {
    __extends(ElMarcianoEnElDesierto, _super);
    function ElMarcianoEnElDesierto() {
        _super.apply(this, arguments);
    }
    ElMarcianoEnElDesierto.prototype.iniciar = function () {
        var _this = this;
        this.estado = new Estado(function () { return _this.cantidadObjetosConEtiqueta('ManzanaAnimada') == 0; });
        this.fondo = new Fondo('fondo.elMarcianoEnElDesierto.png', 0, 0);
        var cantidadFilas = 4;
        var cantidadColumnas = 5;
        this.cuadricula = new Cuadricula(0, -9, cantidadFilas, cantidadColumnas, { alto: 262, ancho: 330 }, { grilla: 'invisible.png' });
        this.manzanas = [];
        var posiciones = [[0, 0], [0, 2], [0, 4], [1, 4], [2, 4], [3, 2], [3, 1]];
        for (var i = 0; i < posiciones.length; i++) {
            var objeto = new ManzanaAnimada(0, 0, false);
            posiciones[i];
            this.cuadricula.agregarActor(objeto, posiciones[i][0], posiciones[i][1]);
            objeto.escala *= 0.8;
            this.manzanas.push(objeto);
        }
        this.automata = new MarcianoAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, cantidadFilas - 1, 0);
        this.automata.escala = 0.8;
    };
    return ElMarcianoEnElDesierto;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path="../actores/CuadriculaMultiple.ts"/>
/// <reference path="../actores/ManzanaAnimada.ts"/>
/// <reference path="../actores/BananaAnimada.ts"/>
/// <reference path="../actores/MonoAnimado.ts"/>
/// <reference path="../actores/Tablero.ts"/>
/// <reference path="../actores/ObservadoAnimado.ts"/>
var ElMonoQueSabeContar = (function (_super) {
    __extends(ElMonoQueSabeContar, _super);
    function ElMonoQueSabeContar() {
        _super.apply(this, arguments);
    }
    ElMonoQueSabeContar.prototype.iniciar = function () {
        this.fondo = new Fondo('fondos.selva.png', 0, 0);
        this.cuadricula = new CuadriculaMultipleColumnas(new DefinidorColumnasRandom(5, 6), 0, -45, { separacionEntreCasillas: 5 }, { alto: 40, ancho: 40, grilla: 'casillamediomono.png', cantColumnas: 1 });
        this.cuadricula.cambiarImagenInicio('casillainiciomono.png');
        this.cambiarImagenesFin();
        this.cuadricula.completarConObjetosRandom(new ConjuntoClases([ManzanaAnimada, BananaAnimada]), { condiciones: [
                function (casilla) { return casilla.hayArriba(); },
                function (casilla) { return casilla.hayAbajo(); } //no incluye en ultima fila
                 //no incluye en ultima fila
            ] });
        this.automata = new MonoAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
        this.automata.escala *= 1.5;
        this.tableros = {};
        this.tableros.ManzanaAnimada = new Tablero(150, 210, { texto: "Manzanas" });
        this.tableros.BananaAnimada = new Tablero(-150, 210, { texto: "Bananas" });
    };
    ElMonoQueSabeContar.prototype.cambiarImagenesFin = function () {
        this.cuadricula.cambiarImagenFin('casillafinalmono.png');
    };
    ElMonoQueSabeContar.prototype.estaResueltoElProblema = function () {
        return this.cantidadObjetosConEtiqueta('BananaAnimada') === this.tableros.BananaAnimada.dameValor() &&
            this.cantidadObjetosConEtiqueta('ManzanaAnimada') === this.tableros.ManzanaAnimada.dameValor();
    };
    return ElMonoQueSabeContar;
})(EscenaActividad);
/// <reference path="ElMonoQueSabeContar.ts"/>
var ElMonoCuentaDeNuevo = (function (_super) {
    __extends(ElMonoCuentaDeNuevo, _super);
    function ElMonoCuentaDeNuevo() {
        _super.apply(this, arguments);
    }
    ElMonoCuentaDeNuevo.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.tableros.largoFila = new Tablero(0, 210, { texto: "Largo Columna Actual", atributoObservado: 'largoColumnaActual2' });
        Trait.toObject(Observado, this.automata);
        this.automata.largoColumnaActual2 = function () { return this.largoColumnaActual() - 1; };
        this.automata.registrarObservador(this.tableros.largoFila);
        this.automata.setCasillaActualViejo = this.automata.setCasillaActual;
        this.automata.setCasillaActual = function (c, m) {
            this.setCasillaActualViejo(c, m);
            this.changed();
        };
        this.automata.changed();
    };
    ElMonoCuentaDeNuevo.prototype.cambiarImagenesFin = function () {
        //No hace nada
    };
    return ElMonoCuentaDeNuevo;
})(ElMonoQueSabeContar);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />
/// <reference path = "../actores/ManzanaAnimada.ts" />
/// <reference path = "../actores/MonoAnimado.ts" />
/// <reference path = "../actores/FlechaEscenarioAleatorio.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />
var LaEleccionDelMono = (function (_super) {
    __extends(LaEleccionDelMono, _super);
    function LaEleccionDelMono() {
        _super.apply(this, arguments);
    }
    LaEleccionDelMono.prototype.iniciar = function () {
        var _this = this;
        this.estado = new Estado(function () { return _this.cantidadObjetosConEtiqueta('BananaAnimada') == 0 && _this.cantidadObjetosConEtiqueta('ManzanaAnimada') == 0 && _this.automata.casillaActual().sos(0, 1); });
        this.fondo = new Fondo('fondos.selva.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, 1, 2, { alto: 200 }, { grilla: 'casillas.violeta.png',
            cantColumnas: 1 });
        this.automata = new MonoAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0, false);
        this.agregarFruta();
        new FlechaEscenarioAleatorio();
    };
    LaEleccionDelMono.prototype.agregarFruta = function () {
        if (Math.random() < .5) {
            this.agregar(ManzanaAnimada);
        }
        else {
            this.agregar(BananaAnimada);
        }
    };
    LaEleccionDelMono.prototype.agregar = function (objeto) {
        this.cuadricula.agregarActorEnPerspectiva(new objeto(0, 0), 0, 1, false);
    };
    return LaEleccionDelMono;
})(EscenaActividad);
/// <reference path = "LaEleccionDelMono.ts" />
/// <reference path = "../actores/BananaAnimada.ts" />
var ElMonoYLasBananas = (function (_super) {
    __extends(ElMonoYLasBananas, _super);
    function ElMonoYLasBananas() {
        _super.apply(this, arguments);
    }
    ElMonoYLasBananas.prototype.agregarFruta = function () {
        if (Math.random() < .5) {
            this.agregar(BananaAnimada);
        }
    };
    return ElMonoYLasBananas;
})(LaEleccionDelMono);
/// <reference path = "EscenaActividad.ts" />
var ElPlanetaDeNano = (function (_super) {
    __extends(ElPlanetaDeNano, _super);
    function ElPlanetaDeNano() {
        _super.apply(this, arguments);
    }
    ElPlanetaDeNano.prototype.iniciar = function () {
        //this.recolector.izquierda = pilas.izquierda();
        this.cantidadFilas = 4;
        this.cantidadColumnas = 5;
        this.fondo = new Fondo('fondos.elPlanetaDeNano.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, this.cantidadFilas, this.cantidadColumnas, { alto: 300, ancho: 300, separacionEntreCasillas: 3 }, { grilla: 'casillas.elPlanetaDeNano.png' });
        this.automata = new NanoAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, this.cantidadFilas - 1, 0);
        this.automata.escala *= 1.8;
        this.automata.y += 15;
        this.secuenciaCaminata = new Secuencia({ 'secuencia': [new MoverACasillaIzquierda({})] });
        this.secuenciaCaminata.iniciar(this.automata);
        this.completarConBananas();
        this.cantidadInicial = this.contarActoresConEtiqueta('BananaAnimada');
        this.tablero = new Tablero(150, 220, { texto: "Bananas" });
    };
    ElPlanetaDeNano.prototype.actualizar = function () {
        _super.prototype.actualizar.call(this);
        this.tablero.setearValor(this.cantidadRecolectadas());
    };
    ElPlanetaDeNano.prototype.cantidadRecolectadas = function () {
        var cantidadActual = this.contarActoresConEtiqueta('BananaAnimada');
        return this.cantidadInicial - cantidadActual;
    };
    ElPlanetaDeNano.prototype.completarConBananas = function () {
        var cantidad = [2, 4, 1, 3];
        for (var i = 0; i < this.cantidadFilas; i++) {
            for (var j = 1; j <= cantidad[i]; j++) {
                this.cuadricula.agregarActor(new BananaAnimada(0, 0), i, j);
            }
        }
    };
    ElPlanetaDeNano.prototype.estaResueltoElProblema = function () {
        return this.contarActoresConEtiqueta('BananaAnimada') == 0;
    };
    return ElPlanetaDeNano;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/RecolectorEstrellas.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
var ElRecolectorDeEstrellas = (function (_super) {
    __extends(ElRecolectorDeEstrellas, _super);
    function ElRecolectorDeEstrellas() {
        _super.apply(this, arguments);
    }
    ElRecolectorDeEstrellas.prototype.iniciar = function () {
        var _this = this;
        this.estado = new Estado(function () { return _this.cantidadObjetosConEtiqueta('EstrellaAnimada') == 0; });
        this.fondo = new Fondo('fondo.recolector.png', 0, 0);
        //this.recolector.izquierda = pilas.izquierda();
        var cantidadFilas = 4;
        var cantidadColumnas = 5;
        this.cuadricula = new Cuadricula(0, -20, cantidadFilas, cantidadColumnas, { alto: 400 }, {
            grilla: 'invisible.png',
            cantColumnas: 1
        });
        this.automata = new RecolectorEstrellas(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, cantidadFilas - 1, 0);
        this.automata.aprender(Flotar, { Desvio: 5 });
        // La posición inicial pretende respectar el ejemplo
        this.objetos = [];
        for (var fila = 0; fila < cantidadFilas; fila++) {
            for (var columna = 1; columna < cantidadColumnas; columna++) {
                var objeto = new EstrellaAnimada(0, 0);
                this.cuadricula.agregarActor(objeto, fila, columna);
                objeto.escala *= 0.7;
                this.objetos.push(objeto);
            }
        }
    };
    return ElRecolectorDeEstrellas;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
var EscenaTests = (function (_super) {
    __extends(EscenaTests, _super);
    function EscenaTests() {
        _super.apply(this, arguments);
    }
    EscenaTests.prototype.iniciar = function () {
    };
    return EscenaTests;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path="../actores/ActorAnimado.ts"/>
/// <reference path="../actores/CuadriculaMultiple.ts"/>
/// <reference path = "EstadosDeEscena.ts" />
var FutbolRobots = (function (_super) {
    __extends(FutbolRobots, _super);
    function FutbolRobots() {
        _super.apply(this, arguments);
    }
    FutbolRobots.prototype.iniciar = function () {
        this.fondo = new Fondo('fondos.futbolRobots.png', 0, 0);
        this.cantidadFilas = 8;
        this.cuadricula = new CuadriculaMultiple(new DefinidorColumnasRandom(this.cantidadFilas, 6), 0, -50, { separacionEntreCasillas: 5 }, { grilla: 'casilla.futbolRobots2.png', alto: 40, ancho: 40 });
        this.cuadricula.cambiarImagenInicio('casilla.futbolRobots1.png');
        this.automata = new RobotAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, 0, 0);
        var casilla = this.cuadricula.casilla(0, 0);
        this.automata.escalarAAlto(3.5 * casilla.alto);
        this.automata.abajo = casilla.y - (0.25 * casilla.alto);
        this.automata.radio_de_colision = this.automata.alto / 2.5;
        for (var fila = 0; fila < this.cantidadFilas; ++fila) {
            this.cuadricula.agregarActor(new PelotaAnimada(0, 0), fila, this.cuadricula.dameIndexUltimaPosicion(fila));
        }
        ;
        this.estado = new EstadoParaContarBuilder(this, 'patear', this.cantidadFilas).estadoInicial();
    };
    return FutbolRobots;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
/// <reference path = "../actores/InstaladorAnimado.ts" />
/// <reference path = "../comportamientos/ComportamientoAnimado.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts" />
var InstalandoJuegos = (function (_super) {
    __extends(InstalandoJuegos, _super);
    function InstalandoJuegos() {
        _super.apply(this, arguments);
    }
    InstalandoJuegos.prototype.iniciar = function () {
        this.fondo = new Fondo('fondos.biblioteca.png', 0, 0);
        this.cuadricula = new Cuadricula(20, -50, 1, 4, { alto: 100, ancho: 400 }, { grilla: 'invisible.png', cantColumnas: 1 });
        for (var i = 1; i <= 3; ++i) {
            this.cuadricula.agregarActor(new CompuAnimada(0, 0), 0, i);
        }
        this.colocarAutomata();
        this.construirFSM();
    };
    InstalandoJuegos.prototype.construirFSM = function () {
        var builder = new BuilderStatePattern(this, 'inicial');
        builder.agregarEstadosPrefijados('prendido', 1, 3);
        builder.agregarEstadosPrefijados('escritoA', 1, 3);
        builder.agregarEstadosPrefijados('escritoB', 1, 3);
        builder.agregarEstadosPrefijados('escritoC', 1, 3);
        builder.agregarEstadosPrefijados('juegoInstalado', 1, 3);
        builder.agregarEstadosPrefijados('maquinaApagada', 1, 3);
        builder.agregarEstadoAceptacion('todoInstalado');
        builder.agregarTransicionesIteradas('prendido', 'escritoA', 'escribirA', 1, 3, 1, 3);
        builder.agregarTransicionesIteradas('escritoA', 'escritoB', 'escribirB', 1, 3, 1, 3);
        builder.agregarTransicionesIteradas('escritoB', 'escritoC', 'escribirC', 1, 3, 1, 3);
        builder.agregarTransicionesIteradas('escritoC', 'juegoInstalado', 'instalar', 1, 3, 1, 3);
        builder.agregarTransicionesIteradas('juegoInstalado', 'maquinaApagada', 'apagar', 1, 2, 1, 2);
        builder.agregarTransicion('juegoInstalado3', 'todoInstalado', 'apagar');
        builder.agregarTransicion('inicial', 'prendido1', 'prender');
        builder.agregarTransicion('maquinaApagada1', 'prendido2', 'prender');
        builder.agregarTransicion('maquinaApagada2', 'prendido3', 'prender');
        builder.agregarError('inicial', 'instalar', 'Primero hay que prender la computadora');
        builder.agregarError('inicial', 'escribirA', 'Primero hay que prender la computadora');
        builder.agregarError('inicial', 'escribirB', 'Primero hay que prender la computadora');
        builder.agregarError('inicial', 'escribirC', 'Primero hay que prender la computadora');
        builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'instalar', 'Primero hay que prender la computadora', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirC', 'Primero hay que prender la computadora', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirA', 'Primero hay que prender la computadora', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('maquinaApagada', 'escribirB', 'Primero hay que prender la computadora', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('prendido', 'escribirC', 'Esa no es la clave correcta', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('prendido', 'escribirB', 'Esa no es la clave correcta', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('escritoA', 'escribirC', 'Esa no es la clave correcta', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('escritoA', 'escribirA', 'Esa no es la clave correcta', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('escritoB', 'escribirB', 'Esa no es la clave correcta', 1, 3);
        builder.agregarErrorAVariosEstadosDeSalida('escritoB', 'escribirA', 'Esa no es la clave correcta', 1, 3);
        this.estado = builder.estadoInicial();
    };
    InstalandoJuegos.prototype.colocarAutomata = function () {
        this.automata = new InstaladorAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, 0, 0);
        this.automata.escala = 1;
        this.automata.y = -70;
        this.automata.x = -170;
    };
    return InstalandoJuegos;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "Camino.ts" />
/// <reference path = "../actores/RatonAnimado.ts" />
var LaberintoLargo = (function (_super) {
    __extends(LaberintoLargo, _super);
    function LaberintoLargo() {
        _super.apply(this, arguments);
    }
    LaberintoLargo.prototype.iniciar = function () {
        this.fondo = new Fondo(this.nombreFondo(), 0, 0);
        this.cuadricula = new CuadriculaParaRaton(0, 0, this.cantidadFilas(), this.cantidadColumnas(), this.dameOpcionesCuadricula(), { '->': 'casillaDerecha.png', '<-': 'casillaIzquierda.png', 'v': 'casillaAbajo.png', '^': 'casillaArriba.png' }).dameCamino();
        this.automata = new RatonAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, 0, 0);
        this.automata.escala *= 2;
        this.automata.x -= 5;
    };
    LaberintoLargo.prototype.dameOpcionesCuadricula = function () {
        return { 'alto': 440, 'ancho': 400 };
    };
    LaberintoLargo.prototype.cantidadFilas = function () {
        return 8;
    };
    LaberintoLargo.prototype.cantidadColumnas = function () {
        return 8;
    };
    LaberintoLargo.prototype.nombreFondo = function () {
        return 'fondo.laberinto.largo.png';
    };
    LaberintoLargo.prototype.estaResueltoElProblema = function () {
        return this.automata.alFinalDelCamino();
    };
    return LaberintoLargo;
})(EscenaActividad);
/// <reference path = "LaberintoLargo.ts" />
/// <reference path="../actores/RatonAnimado.ts"/>
var LaberintoConQueso = (function (_super) {
    __extends(LaberintoConQueso, _super);
    function LaberintoConQueso() {
        _super.apply(this, arguments);
    }
    LaberintoConQueso.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.cuadricula.completarConObjetosRandom(new ConjuntoClases([QuesoAnimado]), { condiciones: [
                function (casilla) { return casilla.hayAbajo() || casilla.hayDerecha(); }
            ]
        });
        this.automata.setZ(pilas.escena_actual().minZ() - 1);
    };
    LaberintoConQueso.prototype.dameOpcionesCuadricula = function () {
        return { 'alto': 440, 'ancho': 400, 'largo_min': 3, 'largo_max': 15 };
    };
    LaberintoConQueso.prototype.nombreFondo = function () {
        return 'fondo.laberinto.queso.png';
    };
    LaberintoConQueso.prototype.estaResueltoElProblema = function () {
        return this.automata.alFinalDelCamino() && this.contarActoresConEtiqueta('QuesoAnimado') == 0;
    };
    return LaberintoConQueso;
})(LaberintoLargo);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "../escenas/LaberintoLargo.ts"/>
var LaberintoCorto = (function (_super) {
    __extends(LaberintoCorto, _super);
    function LaberintoCorto() {
        _super.apply(this, arguments);
    }
    LaberintoCorto.prototype.iniciar = function () {
        this.aDerecha = Math.random() < 0.5;
        _super.prototype.iniciar.call(this);
    };
    LaberintoCorto.prototype.cantidadFilas = function () {
        return this.aDerecha ? 1 : 2;
    };
    LaberintoCorto.prototype.cantidadColumnas = function () {
        return this.aDerecha ? 2 : 1;
    };
    LaberintoCorto.prototype.nombreFondo = function () {
        return 'fondo.laberinto.corto.png';
    };
    LaberintoCorto.prototype.dameOpcionesCuadricula = function () {
        return { 'alto': 200, 'ancho': 200 };
    };
    return LaberintoCorto;
})(LaberintoLargo);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Frank.ts" />
/// <reference path = "../actores/Bruja.ts" />
/// <reference path = "../actores/Dracula.ts" />
/// <reference path = "../actores/Tito.ts" />
/// <reference path = "../actores/Murcielago.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
/// <reference path = "../comportamientos/SecuenciaAnimada.ts" />
/// <reference path = "../comportamientos/Interactuar.ts" />
var LaFiestaDeDracula = (function (_super) {
    __extends(LaFiestaDeDracula, _super);
    function LaFiestaDeDracula() {
        _super.apply(this, arguments);
        this.focos = [];
        this.bailarines = [];
    }
    LaFiestaDeDracula.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.fiestadracula.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 200, 1, 3, { alto: 100 }, { grilla: 'invisible.png', cantColumnas: 1 });
        this.agregarAutomata();
        this.agregarFocos();
        this.agregarBailarines();
        this.crearEstado();
    };
    LaFiestaDeDracula.prototype.agregarAutomata = function () {
        this.automata = new Murcielago();
        this.cuadricula.agregarActor(this.automata, 0, 0, false);
        this.automata.y -= 120;
        this.automata.aprender(Flotar, { Desvio: 10 });
    };
    LaFiestaDeDracula.prototype.agregarFocos = function () {
        this.focos.push(new Foco());
        this.focos.push(new Foco());
        this.focos.push(new Foco());
        this.cuadricula.agregarActor(this.focos[0], 0, 0, false);
        this.cuadricula.agregarActor(this.focos[1], 0, 1, false);
        this.cuadricula.agregarActor(this.focos[2], 0, 2, false);
        this.focos.forEach(function (f) { return f.y -= 30; });
    };
    LaFiestaDeDracula.prototype.agregarBailarines = function () {
        this.bailarines.push(new Frank(-150, -150));
        this.bailarines.push(new Bruja(-50, -150));
        var tito = new Tito(50, -150);
        tito.definirAnimacion("parado", [0], 6, true);
        this.bailarines.push(tito);
        this.bailarines.push(new Dracula(150, -150));
        this.bailarines.forEach(function (b) { return b.escala = 0.7; });
    };
    LaFiestaDeDracula.prototype.crearEstado = function () {
        var builder = new BuilderStatePattern(this, 'nadieBaila');
        builder.agregarEstadoAceptacion('todosBailando');
        builder.agregarTransicion('nadieBaila', 'todosBailando', 'empezarFiesta');
        this.estado = builder.estadoInicial();
    };
    return LaFiestaDeDracula;
})(EscenaActividad);
var CambiarColor = (function (_super) {
    __extends(CambiarColor, _super);
    function CambiarColor() {
        _super.apply(this, arguments);
    }
    CambiarColor.prototype.sanitizarArgumentos = function () {
        this.argumentos.etiqueta = "Foco";
        _super.prototype.sanitizarArgumentos.call(this);
    };
    CambiarColor.prototype.alInteractuar = function () {
        this.interactuado().cambiarColor();
    };
    return CambiarColor;
})(Interactuar);
var EmpezarFiesta = (function (_super) {
    __extends(EmpezarFiesta, _super);
    function EmpezarFiesta() {
        _super.apply(this, arguments);
    }
    EmpezarFiesta.prototype.sanitizarArgumentos = function () {
        _super.prototype.sanitizarArgumentos.call(this);
        var dracula = pilas.escena_actual().bailarines[pilas.escena_actual().bailarines.length - 1];
        this.argumentos.secuencia = [
            new Desaparecer({}),
            new ComportamientoConVelocidad({ receptor: dracula, nombreAnimacion: "aparecer" }),
        ];
    };
    EmpezarFiesta.prototype.configurarVerificaciones = function () {
        _super.prototype.configurarVerificaciones.call(this);
        this.agregarVerificacionFoco(0, 5, "primer");
        this.agregarVerificacionFoco(1, 8, "segundo");
        this.agregarVerificacionFoco(2, 12, "tercer");
    };
    EmpezarFiesta.prototype.agregarVerificacionFoco = function (i, veces, ordinal) {
        this.verificacionesPre.push(new Verificacion(function () { return pilas.escena_actual().focos[i].nombreAnimacionActual() === "color" + veces; }, "¡El " + ordinal + " foco debe cambiarse de color " + veces + " veces!"));
    };
    EmpezarFiesta.prototype.postAnimacion = function () {
        _super.prototype.postAnimacion.call(this);
        pilas.escena_actual().bailarines.forEach(function (b) { return b.cargarAnimacion("bailando"); });
    };
    return EmpezarFiesta;
})(SecuenciaAnimada);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../comportamientos/Sostener.ts"/>
/// <reference path = "../actores/Cuadricula.ts"/>
/// <reference path = "../actores/HeroeAnimado.ts"/>
/// <reference path = "../actores/CofreAnimado.ts"/>
/// <reference path = "../actores/LlaveAnimado.ts"/>
/// <reference path = "../actores/MagoAnimado.ts"/>
/// <reference path = "../actores/CaballeroAnimado.ts"/>
/// <reference path = "../actores/UnicornioAnimado.ts"/>
/// <reference path = "../actores/ActorCompuesto.ts" />
/// <reference path = "../actores/Princesa.ts" />
/**
 * @class LaGranAventuraDelMarEncantado
 *
 */
var LaGranAventuraDelMarEncantado = (function (_super) {
    __extends(LaGranAventuraDelMarEncantado, _super);
    function LaGranAventuraDelMarEncantado() {
        _super.apply(this, arguments);
    }
    LaGranAventuraDelMarEncantado.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.marEncantado.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, 4, 5, { alto: 376, ancho: 380 }, { grilla: 'invisible.png' });
        this.llave = new LlaveAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.llave, 1, 4);
        this.llave.escala *= 0.5;
        this.llave.aprender(Flotar, { Desvio: 5 });
        this.cofre = new CofreAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.cofre, 0, 0);
        this.cofre.x += 8;
        this.cofre.aprender(Flotar, { Desvio: 5 });
        this.caballero = new CaballeroAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.caballero, 1, 2);
        this.caballero.x += 19;
        this.caballero.escala *= 1.5;
        this.princesa = new Principe(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.princesa, 1, 2);
        this.princesa.x -= 19;
        this.princesa.escala *= 1.5;
        this.mago = new MagoAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.mago, 3, 1);
        this.mago.escala *= 1.5;
        this.unicornio = new UnicornioAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.unicornio, 3, 4);
        this.unicornio.escala *= 1.5;
        this.automata = new ActorCompuesto(0, 0, { subactores: [new Heroina(0, 0)] });
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 3, 0);
        this.automata.escala *= 0.08;
        // se carga el estado inicial
        this.construirFSM();
    };
    LaGranAventuraDelMarEncantado.prototype.construirFSM = function () {
        var builder = new BuilderStatePattern(this, 'inicial');
        builder.agregarEstado('llaveEnMano');
        builder.agregarEstado('cofreAbierto');
        builder.agregarEstado('magoConSombrero');
        builder.agregarEstado('princesaRescatada');
        builder.agregarEstadoAceptacion('montandoUnicornio');
        builder.agregarTransicion('inicial', 'llaveEnMano', 'agarrarLlave');
        builder.agregarTransicion('llaveEnMano', 'cofreAbierto', 'abrirCofre');
        builder.agregarTransicion('cofreAbierto', 'magoConSombrero', 'darSombrero');
        builder.agregarTransicion('magoConSombrero', 'princesaRescatada', 'atacarConEspada');
        builder.agregarTransicion('princesaRescatada', 'montandoUnicornio', 'escapar');
        var estados = ['inicial', 'llaveEnMano', 'cofreAbierto', 'magoConSombrero', 'princesaRescatada', 'montandoUnicornio'];
        for (var i = 0; i < estados.length; i++) {
            if (estados[i] != 'llaveEnMano') {
                builder.agregarError(estados[i], 'abrirCofre', 'Para abrir el cofre necesitás la llave.');
            }
            if (estados[i] != 'cofreAbierto') {
                builder.agregarError(estados[i], 'darSombrero', 'Para darle el sombrero al mago necesitás sacarlo del cofre.');
            }
            if (estados[i] != 'magoConSombrero') {
                builder.agregarError(estados[i], 'atacarConEspada', 'Para atacar al caballero, el mago debe darte la espada.');
            }
            if (estados[i] != 'princesaRescatada') {
                builder.agregarError(estados[i], 'escaparEnUnicornio', 'Para escapar en unicornio, debés rescatar al príncipe.');
            }
        }
        this.estado = builder.estadoInicial();
    };
    return LaGranAventuraDelMarEncantado;
})(EscenaActividad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "HabilidadAnimada.ts"/>
// No sólo avisa al salir de la pantalla, sino que no lo deja irse.
// Usar en reemplazo de la habilidad SeMantieneEnPantalla
// TODO: Repite código con SeMantieneEnPantalla, modificar pilas para que deje de hacerlo.
var EstallarAlSalirDePantalla = (function (_super) {
    __extends(EstallarAlSalirDePantalla, _super);
    function EstallarAlSalirDePantalla(receptor) {
        _super.call(this, receptor);
        this.receptor.evto_se_movio.conectar(this);
    }
    EstallarAlSalirDePantalla.prototype.recibir = function (evento, tipo) {
        if (tipo == this.receptor.evto_se_movio &&
            this.seSalioDeLaPantalla()) {
            throw new ActividadError("¡Me salgo de la pantalla!");
        }
    };
    EstallarAlSalirDePantalla.prototype.seSalioDeLaPantalla = function () {
        return this.seFuePorDerecha() ||
            this.seFuePorIzquierda() ||
            this.seFuePorArriba() ||
            this.seFuePorAbajo();
    };
    EstallarAlSalirDePantalla.prototype.seFuePorIzquierda = function () {
        return this.receptor.x < pilas.izquierda();
    };
    EstallarAlSalirDePantalla.prototype.seFuePorDerecha = function () {
        return this.receptor.x > pilas.derecha();
    };
    EstallarAlSalirDePantalla.prototype.seFuePorArriba = function () {
        return this.receptor.y > pilas.arriba();
    };
    EstallarAlSalirDePantalla.prototype.seFuePorAbajo = function () {
        return this.receptor.y < pilas.abajo();
    };
    return EstallarAlSalirDePantalla;
})(HabilidadAnimada);
/// <reference path = "../DibujandoFiguras.ts" />
/// <reference path = "../../actores/libroPrimaria/Coty.ts" />
/// <reference path = "../../actores/libroPrimaria/Charco.ts" />
/// <reference path = "../../actores/FlechaEscenarioAleatorio.ts" />
/// <reference path = "../../habilidades/EstallarAlSalirDePantalla.ts"/>
var EscenaCoty = (function (_super) {
    __extends(EscenaCoty, _super);
    function EscenaCoty(dibujoPreexistente, puntosEsperados, argumentos) {
        if (dibujoPreexistente === void 0) { dibujoPreexistente = []; }
        if (puntosEsperados === void 0) { puntosEsperados = []; }
        _super.call(this);
        this._puntosEsperados = puntosEsperados;
        this.dibujoPreexistente = DibujoLineal.desdePuntosSimples(dibujoPreexistente);
        this.sanitizarArgumentos(argumentos);
    }
    EscenaCoty.clasesDeActoresInvolucrados = function () {
        return [Coty, Charco, FlechaEscenarioAleatorio];
    };
    EscenaCoty.pathFondo = function () {
        return 'fondo.coty.png';
    };
    EscenaCoty.prototype.sanitizarArgumentos = function (argumentos) {
        this.xCoty = argumentos.xCoty || 0;
        this.yCoty = argumentos.yCoty || 0;
        this.longitudSegmento = argumentos.longitudSegmento || 50;
        this.puedeHaberCharco = Boolean(argumentos.puedeHaberCharco);
    };
    EscenaCoty.prototype.iniciar = function () {
        if (this.puedeHaberCharco) {
            new FlechaEscenarioAleatorio();
        }
        if (this.puedeHaberCharco && Math.random() >= 0.5) {
            this.crearCharco();
        }
        _super.prototype.iniciar.call(this);
        if (this.charco) {
            this.ubicarCharco();
        }
        this.automata.aprender(EstallarAlSalirDePantalla, {});
    };
    EscenaCoty.prototype.hacerDibujoEsperado = function () {
        this.pizarraFantasma = new Pizarra();
        this.dibujoEsperado.dibujarEn(this.pizarraFantasma, this.colorDibujoEsperado(), this.anchoLinea, true);
    };
    EscenaCoty.prototype.hacerDibujoPreexistente = function () {
        this.pizarraDibujoPreexistente = new Pizarra();
        this.dibujoPreexistente.dibujarEn(this.pizarraDibujoPreexistente, createjs.Graphics.getRGB(41, 105, 165), this.anchoLinea);
    };
    EscenaCoty.prototype.crearCharco = function () {
        this.charco = new Charco();
    };
    EscenaCoty.prototype.ubicarCharco = function () {
        var _this = this;
        this.charco.escala = this.automata.escala * 0.85;
        this.charco.setX(this.automata.getX() + (this.longitudSegmento / 2));
        this.charco.setY(this.automata.getY() - this.automata.alto * 0.04);
        [this.pizarraDibujoPreexistente, this.pizarraFantasma].forEach(function (pizarra) { return pizarra.setX(pizarra.getX() + _this.longitudSegmento); });
        this.dibujoEsperado = this.dibujoEsperado.trasladar(new PuntoDibujo(this.longitudSegmento, 0));
    };
    EscenaCoty.prototype.crearAutomata = function () {
        this.automata = new Coty(this.xCoty, this.yCoty);
        this.automata.escala = 0.6;
    };
    EscenaCoty.prototype.puntosEsperados = function () {
        return this._puntosEsperados;
    };
    EscenaCoty.prototype.colorDibujo = function () {
        return pilas.colores.rgb(35, 105, 166);
    };
    EscenaCoty.prototype.colorDibujoEsperado = function () {
        return pilas.colores.gris;
    };
    return EscenaCoty;
})(DibujandoFiguras);
var EscenaCotySonrisa = (function (_super) {
    __extends(EscenaCotySonrisa, _super);
    function EscenaCotySonrisa() {
        _super.call(this, [[{ x: -25, y: 10 }, { x: -25, y: 60 }, { x: -75, y: 60 }, { x: -75, y: 10 }, { x: -25, y: 10 }]], [[{ x: 25, y: 10 }, { x: 25, y: 60 }, { x: 75, y: 60 }, { x: 75, y: 10 }, { x: 25, y: 10 }]], { xCoty: -25, yCoty: 10 });
    }
    EscenaCotySonrisa.prototype.hacerDibujoPreexistente = function () {
        _super.prototype.hacerDibujoPreexistente.call(this);
        this.pizarraDibujoPreexistente.circulo(0, 0, 150, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.arco(0, 0, 100, Math.PI * 0.25, Math.PI * 0.75, this.colorDibujo(), this.anchoLinea);
    };
    return EscenaCotySonrisa;
})(EscenaCoty);
var EscenaCotyCactus = (function (_super) {
    __extends(EscenaCotyCactus, _super);
    function EscenaCotyCactus() {
        _super.call(this, [], [[{ x: -50, y: 50 }, { x: -50, y: 0 }, { x: -50, y: -50 }], [{ x: 50, y: -50 }, { x: 50, y: 0 }, { x: 50, y: 50 }]], { xCoty: 0, yCoty: 50 });
    }
    EscenaCotyCactus.prototype.hacerDibujoPreexistente = function () {
        _super.prototype.hacerDibujoPreexistente.call(this);
        // Cabeza grande
        this.pizarraDibujoPreexistente.arco(0, 100, 50, Math.PI, 0, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(-50, 50, -50, 100, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(50, 50, 50, 100, this.colorDibujo(), this.anchoLinea);
        // Líneas cuerpo central
        this.pizarraDibujoPreexistente.linea(50, -50, 50, -100, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(50, -150, 50, -200, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(-50, -100, -50, -200, this.colorDibujo(), this.anchoLinea);
        // Bracito 1
        this.pizarraDibujoPreexistente.arco(-50, 0, 50, Math.PI * 1 / 2, Math.PI, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.arco(-50, 0, 100, Math.PI * 1 / 2, Math.PI, this.colorDibujo(), this.anchoLinea);
        // Cabeza chica 1
        this.pizarraDibujoPreexistente.arco(-125, 25, 25, Math.PI, 0, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(-150, 0, -150, 25, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(-100, 0, -100, 25, this.colorDibujo(), this.anchoLinea);
        // Bracito 2
        this.pizarraDibujoPreexistente.arco(50, -50, 50, 0, Math.PI * 1 / 2, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.arco(50, -50, 100, 0, Math.PI * 1 / 2, this.colorDibujo(), this.anchoLinea);
        // Cabeza chica 2
        this.pizarraDibujoPreexistente.arco(125, -25, 25, Math.PI, 0, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(150, -50, 150, -25, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(100, -50, 100, -25, this.colorDibujo(), this.anchoLinea);
    };
    return EscenaCotyCactus;
})(EscenaCoty);
var EscenaCotyMate = (function (_super) {
    __extends(EscenaCotyMate, _super);
    function EscenaCotyMate() {
        _super.call(this, [], [[{ x: -100, y: -50 }, { x: -100, y: -100 }], [{ x: -100, y: 0 }, { x: -50, y: 0 }, { x: 0, y: 0 }, { x: 50, y: 0 }], [{ x: 50, y: 100 }, { x: 50, y: 150 }, { x: 100, y: 150 }]], { xCoty: -100, yCoty: -100 });
    }
    EscenaCotyMate.prototype.hacerDibujoPreexistente = function () {
        _super.prototype.hacerDibujoPreexistente.call(this);
        this.pizarraDibujoPreexistente.arco(-100, -25, 25, Math.PI / 2, -Math.PI / 2, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.arco(50, -25, 25, -Math.PI / 2, Math.PI / 2, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.arco(-25, -100, 75, 0, Math.PI, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(50, -50, 50, -100, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(-10, 0, 50, 100, this.colorDibujo(), this.anchoLinea);
        this.pizarraDibujoPreexistente.linea(10, 0, 100, 150, this.colorDibujo(), this.anchoLinea);
    };
    return EscenaCotyMate;
})(EscenaCoty);
/// <reference path = "../../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "../../../dependencias/helpers.d.ts" />
//// <reference types = "nearley" /> // Requiere TypeScript ^2.0.0. Solución por ahora:
/// <reference path = "../../../dependencias/nearley.d.ts" />
/// <reference path = "../EscenaActividad.ts" />
/// <reference path = "../../actores/Cuadricula.ts" />
/// <reference path = "../../actores/FlechaEscenarioAleatorio.ts" />
/**
 * Esta escena consta de una cuadrícula que se llena de actores automáticamente
 * a partir de un mapa, es decir, una matriz que la describe.
 * Se pensó originalmente para realizar un camino al estilo de las actividades
 * iniciales de code.org, con varios obstáculos.
 *
 * Los mapas son matrices de dos dimensiones. Cada elemento puede ser un string,
 * que es el identificador del actor que irá en cada casilla.
 * Por ejemplo, se puede usar una letra 'A' para identificar al autómata.
 * Los strings vacíos y el caracter espacio ' ' significa "casilla libre".
 * TODO: Cambiar por '-'.
 */
var EscenaDesdeMapa = (function (_super) {
    __extends(EscenaDesdeMapa, _super);
    /**
     * @param generadorDeMapas El generador que se utilizará para obtener mapas para la actividad.
     */
    function EscenaDesdeMapa(generadorDeMapas) {
        _super.call(this);
        this.generadorDeMapas = generadorDeMapas;
    }
    EscenaDesdeMapa.prototype.initDesdeMapa = function (mapa) {
        this.generadorDeMapas = new GeneradorDeMapasSimple(mapa);
    };
    EscenaDesdeMapa.prototype.initDesdeArrayDeMapas = function (mapas) {
        var generadores = mapas.map(function (m) { return new GeneradorDeMapasSimple(m); });
        this.generadorDeMapas = new GeneradorDeMapasArray(generadores);
    };
    EscenaDesdeMapa.prototype.initDesdeDescripcion = function (descripcion, opciones) {
        this.generadorDeMapas = new GeneradorDeMapasAleatorios(descripcion, opciones);
    };
    EscenaDesdeMapa.prototype.initDesdeArrayDeDescripciones = function (descripciones, opciones) {
        var generadores = descripciones.map(function (d) { return new GeneradorDeMapasAleatorios(d, opciones); });
        this.generadorDeMapas = new GeneradorDeMapasArray(generadores);
    };
    EscenaDesdeMapa.prototype.initDesdeUnaOVariasDescripciones = function (especificacion, opciones) {
        if (Array.isArray(especificacion))
            this.initDesdeArrayDeDescripciones(especificacion, opciones);
        else
            this.initDesdeDescripcion(especificacion, opciones);
    };
    EscenaDesdeMapa.prototype.iniciar = function () {
        this.fondo = new Fondo(this.archivoFondo(), 0, 0);
        this.automata = this.obtenerAutomata();
        if (this.generadorDeMapas) {
            this.mapaEscena = this.generadorDeMapas.obtenerMapa();
        }
        else
            throw Error("Esta escena no fue correctamente inicializada con un generador de mapas");
        this.cuadricula = this.construirCuadricula(this.mapaEscena);
        this.automata.enviarAlFrente();
        if (this.tieneAleatoriedad())
            this.indicarAleatoriedad();
        this.ajustarGraficos();
    };
    EscenaDesdeMapa.prototype.construirCuadricula = function (mapa) {
        var _this = this;
        var cuadricula = new Cuadricula(this.cuadriculaX(), this.cuadriculaY(), mapa.length, mapa[0].length, this.opsCuadricula(), this.opsCasilla());
        cuadricula.forEachCasilla(function (casilla) { return _this.llenarCasilla(cuadricula, casilla, mapa); });
        return cuadricula;
    };
    EscenaDesdeMapa.prototype.llenarCasilla = function (cuadricula, casilla, mapa) {
        var nroFila = casilla.nroFila;
        var nroColumna = casilla.nroColumna;
        var id = mapa[nroFila][nroColumna];
        if (id != '' && id != ' ' && id != '-') {
            var actor = this.mapearIdentificadorAActor(id, nroFila, nroColumna);
            cuadricula.agregarActorEnCasilla(actor, casilla, true);
        }
    };
    /**
     * Indica si el mapa es distinto cada vez que se ejecuta la escena.
     */
    EscenaDesdeMapa.prototype.tieneAleatoriedad = function () {
        return this.generadorDeMapas.tieneAleatoriedad();
    };
    /**
     * Incorpora una indicación gráfica al canvas de que la escena cuenta con aleatoriedad.
     * Se puede sobreescribir.
     */
    EscenaDesdeMapa.prototype.indicarAleatoriedad = function () {
        new FlechaEscenarioAleatorio();
    };
    /**
     * Se puede sobreescribir esta función para definir acciones que se realizarán
     * justo después de iniciar la escena para mejorar su aspecto visual. Por ejemplo,
     * ajustar la escala o la posición de los actores. Por defecto, no hace nada.
     */
    EscenaDesdeMapa.prototype.ajustarGraficos = function () { };
    ;
    /** Devuelve la posición en el eje X de la cuadrícula. Se puede sobreescribir. */
    EscenaDesdeMapa.prototype.cuadriculaX = function () { return 0; };
    /** Devuelve la posición en el eje X de la cuadrícula. Se puede sobreescribir. */
    EscenaDesdeMapa.prototype.cuadriculaY = function () { return 0; };
    /** Devuelve las opciones que se usarán para crear la cuadrícula. Se puede sobreescribir. */
    EscenaDesdeMapa.prototype.opsCuadricula = function () { return {}; };
    /** Devuelve las opciones que se usarán para crear la casilla. Se puede sobreescribir. */
    EscenaDesdeMapa.prototype.opsCasilla = function () { return { grilla: 'invisible.png' }; };
    return EscenaDesdeMapa;
})(EscenaActividad);
/**
 * Este generador se inicializa con un mapa y devuelve siempre dicho mapa.
 */
var GeneradorDeMapasSimple = (function () {
    function GeneradorDeMapasSimple(mapa) {
        this.mapa = mapa;
    }
    GeneradorDeMapasSimple.prototype.obtenerMapa = function () { return this.mapa; };
    GeneradorDeMapasSimple.prototype.tieneAleatoriedad = function () { return false; };
    return GeneradorDeMapasSimple;
})();
/**
 * Este generador se inicializa desde un array de mapas.
 * Cada vez que se le pide un mapa, elige uno de ellos al azar.
 */
var GeneradorDeMapasArray = (function () {
    function GeneradorDeMapasArray(generadores) {
        this.generadores = generadores;
    }
    GeneradorDeMapasArray.prototype.obtenerMapa = function () { return Math.randomFrom(this.generadores).obtenerMapa(); };
    GeneradorDeMapasArray.prototype.tieneAleatoriedad = function () { return this.generadores.length > 1 || this.generadores[0].tieneAleatoriedad(); };
    return GeneradorDeMapasArray;
})();
/**
 * Generador complejo que permite crear mapas con aleatoriedad a partir de
 * strings descriptivos.
 * El string debe consistir en una matriz de strings (pueden omitirse las comillas)
 * representando cada una de las casillas del mapa. El contenido de cada casilla
 * puede ser de los siguientes tipos:
 * - Un identificador de la forma `[a-zA-Z0-9]+`, que será interpretado según lo
 *   indique cada escena.
 * - El caracter especial `$`, que indica "tomar al azar un elemento de la bolsa".
 *   La bolsa es un array de identificadores que se provee al crear el generador.
 *   Opcionalmente, el caracter puede ir seguido de un identificador; esto permite
 *   indicar varias bolsas distintas.
 * - El caracter especial `*`, que indica "considerar esta casilla al repartir
 *   los elementos de la colección". La colección es un array de identificadores que
 *   se provee al crear el generador. Cuando se crea un mapa, estos elementos son
 *   distribuidos al azar (respetando las apariciones de cada uno) entre las casillas
 *   marcadas de esta manera. Al igual que `$`, puede ir seguido de un identificador.
 * - El caracter especial `-`, que indica una casilla vacía.
 * - Puede usarse el modificador `?` para indicar que un elemento puede ser omitido
 *   de manera aleatoria. Opcionalmente puede usarse `?(p)`, donde p es la probabilidad
 *   de que aparezca el elemento. De lo contrario, se usa el valor por defecto
 *   configurado en el generador.
 * - Pueden proveerse múltiples opciones para una casilla, de la forma
 *   `opcion1|opcion2|...|opcionN`.
 * - Puede indicarse que una casilla se intente llenar con determinado contenido y,
 *   de quedar vacía, se pruebe con un contenido distinto, de la forma
 *   `opcion1>opcion2>...>opcionN`.
 * - Pueden usarse macros, de la forma `#identificador`, que serán expandidas a la
 *   string indicada en la opción `macros`.
 */
var GeneradorDeMapasAleatorios = (function () {
    /**
     * @param descripcionDeMapa String descriptivo de los mapas que generará el generador.
     * @param opciones Parámetros adicionales. Se pueden definir:
     *  - `probaPorDefecto`: La probabilidad considerada para el modificador `?`.
     *  - `bolsa`: La bolsa de elementos para las casillas señaladas con `$`.
     *  - `bolsas`: Diccionario de bolsas para utilizar `$` con identificadores.
     *  - `coleccion`: La colección de elementos para las casillas señaladas con `*`.
     *  - `colecciones`: Diccionario de colecciones para utilizar `$` con identificadores.
     */
    function GeneradorDeMapasAleatorios(descripcionDeMapa, opciones) {
        if (opciones === void 0) { opciones = {}; }
        this._semillasEncoladas = [];
        this._posActual = [0, 0];
        this.configurar(opciones);
        this.generadoresDeSemillas = GeneradorDeMapasAleatorios.parsear(descripcionDeMapa);
    }
    GeneradorDeMapasAleatorios.prototype.configurar = function (opciones) {
        this._probaPorDefecto = opciones.probaPorDefecto || 0.5;
        this.bolsa = opciones.bolsa || [];
        this.bolsas = opciones.bolsas || {};
        this.coleccion = opciones.coleccion || [];
        this.colecciones = opciones.colecciones || {};
        this.macros = opciones.macros || {};
        this._anotadosParaColeccion = [];
        for (var id in this.colecciones) {
            this._anotadosParaColecciones[id] = [];
        }
    };
    GeneradorDeMapasAleatorios.prototype.obtenerMapa = function () {
        var _this = this;
        // Primera pasada
        var semillas = this.generadoresDeSemillas.map(function (fila) { return fila.map(function (semilla) { return semilla.generarSemillaDeCasilla(_this); }); });
        this.repartirElementosDeColecciones();
        // Segunda pasada
        var mapa = semillas.map(function (fila, i) { return fila.map(function (semilla, j) { return semilla.germinar(_this, [i, j]); }); });
        // Pasadas adicionales
        while (this._semillasEncoladas.length > 0) {
            this.repartirElementosDeColecciones();
            var semillasEncoladas = this._semillasEncoladas;
            this._semillasEncoladas = [];
            semillasEncoladas.forEach(function (e) {
                mapa[e.pos[0]][e.pos[1]] = e.semilla.germinar(_this, e.pos);
            }, this);
        }
        this.vaciarAnotadosParaColecciones();
        return mapa;
    };
    /** Se utiliza durante la obtención del mapa, para realizar pasadas extra */
    GeneradorDeMapasAleatorios.prototype.encolarSemilla = function (pos, semilla) {
        this._semillasEncoladas.push({ pos: pos, semilla: semilla });
    };
    GeneradorDeMapasAleatorios.prototype.tieneAleatoriedad = function () {
        var _this = this;
        return this.generadoresDeSemillas.some(function (fila) { return fila.some(function (semilla) { return semilla.esAleatorioPara(_this); }); });
    };
    GeneradorDeMapasAleatorios.prototype.probaPorDefecto = function () {
        return this._probaPorDefecto;
    };
    GeneradorDeMapasAleatorios.prototype.dameUnoDeLaBolsa = function (idBolsa) {
        var bolsa = idBolsa ? this.bolsas[idBolsa] : this.bolsa;
        return Math.randomFrom(bolsa);
    };
    GeneradorDeMapasAleatorios.prototype.anotarParaLaColeccion = function (semilla, idColeccion) {
        var dondeAnotar = idColeccion ?
            this._anotadosParaColecciones[idColeccion] : this._anotadosParaColeccion;
        dondeAnotar.push(semilla);
    };
    GeneradorDeMapasAleatorios.prototype.repartirElementosDeColecciones = function () {
        this.repartirElementos(this.coleccion, this._anotadosParaColeccion);
        for (var id in this.colecciones) {
            this.repartirElementos(this.colecciones[id], this._anotadosParaColecciones[id]);
        }
    };
    GeneradorDeMapasAleatorios.prototype.repartirElementos = function (coleccion, semillas) {
        coleccion.forEach(function (elemento) {
            if (semillas.length > 0)
                Math.takeRandomFrom(semillas).definir(elemento);
        });
    };
    GeneradorDeMapasAleatorios.prototype.vaciarAnotadosParaColecciones = function () {
        this._anotadosParaColeccion.splice(0);
        for (var id in this._anotadosParaColecciones) {
            this._anotadosParaColecciones[id].splice(0);
        }
    };
    GeneradorDeMapasAleatorios.prototype.obtenerGeneradorParaMacro = function (idMacro) {
        return GeneradorDeMapasAleatorios.parsear(this.macros[idMacro]);
    };
    GeneradorDeMapasAleatorios.parsear = function (string) {
        var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed(string);
        return parser.results[0];
    };
    return GeneradorDeMapasAleatorios;
})();
/**
 * Contenedor temporario para la string que representará el contenido de una casilla
 * de un mapa. Se utiliza durante el proceso de generación de un mapa aleatorio.
 */
var SemillaDeCasilla = (function () {
    function SemillaDeCasilla(contenido) {
        this.generadoresExtra = [];
        this.definir(contenido);
    }
    SemillaDeCasilla.prototype.definir = function (contenido) { this.contenido = contenido || "-"; };
    SemillaDeCasilla.prototype.encolarGeneradoresExtra = function (generadores) {
        this.generadoresExtra = this.generadoresExtra.concat(generadores);
        return this;
    };
    SemillaDeCasilla.prototype.seraVacia = function () { return this.contenido == "-"; };
    SemillaDeCasilla.prototype.germinar = function (generador, pos) {
        if (this.seraVacia() && this.generadoresExtra.length > 0) {
            var semillaSiguiente = (this.generadoresExtra.splice(0, 1)[0].generarSemillaDeCasilla(generador));
            semillaSiguiente.encolarGeneradoresExtra(this.generadoresExtra);
            generador.encolarSemilla(pos, semillaSiguiente);
        }
        return this.contenido;
    };
    ;
    return SemillaDeCasilla;
})();
/** Corresponde a identificadores de la forma `[a-zA-Z0-9]+`. */
var GeneradorDeCasillaSimple = (function () {
    function GeneradorDeCasillaSimple(id) {
        this.id = id;
    }
    GeneradorDeCasillaSimple.prototype.generarSemillaDeCasilla = function (generador) { return new SemillaDeCasilla(this.id); };
    GeneradorDeCasillaSimple.prototype.esAleatorioPara = function (generador) { return false; };
    return GeneradorDeCasillaSimple;
})();
/** Corresponde a las casillas indicadas con `$` y `$(id)`. */
var GeneradorDeCasillaBolsa = (function () {
    function GeneradorDeCasillaBolsa(idBolsa) {
        this.idBolsa = idBolsa;
    }
    GeneradorDeCasillaBolsa.prototype.generarSemillaDeCasilla = function (generador) {
        return new SemillaDeCasilla(generador.dameUnoDeLaBolsa(this.idBolsa));
    };
    // Por simplicidad se devuelve siempre true, aunque en rigor puede no ser correcto.
    // Se asume que si se está usando esta funcionalidad, el mapa es lo suficientemente
    // complejo como para tener aleatoriedad.
    GeneradorDeCasillaBolsa.prototype.esAleatorioPara = function (generador) { return true; };
    return GeneradorDeCasillaBolsa;
})();
/** Corresponde a las casillas indicadas con `*` y `*(id)`. */
var GeneradorDeCasillaColeccion = (function () {
    function GeneradorDeCasillaColeccion(idColeccion) {
        this.idColeccion = idColeccion;
    }
    GeneradorDeCasillaColeccion.prototype.generarSemillaDeCasilla = function (generador) {
        var semilla = new SemillaDeCasilla();
        generador.anotarParaLaColeccion(semilla, this.idColeccion);
        return semilla;
    };
    // Por simplicidad. Ver GeneradorDeCasillaBolsa.esAleatorioPara.
    GeneradorDeCasillaColeccion.prototype.esAleatorioPara = function (generador) { return true; };
    return GeneradorDeCasillaColeccion;
})();
/** Corresponde a las casillas indicadas con `-`. */
var GeneradorDeCasillaVacia = (function () {
    function GeneradorDeCasillaVacia() {
    }
    GeneradorDeCasillaVacia.prototype.generarSemillaDeCasilla = function (generador) { return new SemillaDeCasilla('-'); };
    GeneradorDeCasillaVacia.prototype.esAleatorioPara = function (generador) { return false; };
    return GeneradorDeCasillaVacia;
})();
/** Corresponde al modificador `?` (recursivo). */
var GeneradorDeCasillaMaybe = (function () {
    function GeneradorDeCasillaMaybe(generadorInterno, proba) {
        this.generadorInterno = generadorInterno;
        this.proba = proba;
    }
    GeneradorDeCasillaMaybe.prototype.generarSemillaDeCasilla = function (generador) {
        var proba = this.proba || generador.probaPorDefecto();
        if (Math.random() < proba)
            return this.generadorInterno.generarSemillaDeCasilla(generador);
        else
            return new SemillaDeCasilla('-');
    };
    GeneradorDeCasillaMaybe.prototype.esAleatorioPara = function (generador) {
        var proba = this.proba || generador.probaPorDefecto();
        return 0 < proba && proba < 1;
    };
    return GeneradorDeCasillaMaybe;
})();
/** Corresponde al modificador `|` (recursivo). */
var GeneradorDeCasillaOpcion = (function () {
    function GeneradorDeCasillaOpcion(opciones) {
        this.opciones = opciones;
    }
    GeneradorDeCasillaOpcion.prototype.generarSemillaDeCasilla = function (generador) {
        return Math.randomFrom(this.opciones)
            .generarSemillaDeCasilla(generador);
    };
    GeneradorDeCasillaOpcion.prototype.esAleatorioPara = function (generador) {
        return this.opciones.length > 1;
    };
    return GeneradorDeCasillaOpcion;
})();
/** Corresponde al modificador `>` (recursivo). */
var GeneradorDeCasillaSucesion = (function () {
    function GeneradorDeCasillaSucesion(opciones) {
        this.opciones = opciones;
    }
    GeneradorDeCasillaSucesion.prototype.generarSemillaDeCasilla = function (generador) {
        return this.opciones[0].generarSemillaDeCasilla(generador)
            .encolarGeneradoresExtra(this.opciones.splice(1));
    };
    GeneradorDeCasillaSucesion.prototype.esAleatorioPara = function (generador) {
        return this.opciones[0].esAleatorioPara(generador);
    };
    return GeneradorDeCasillaSucesion;
})();
var GeneradorDeCasillaMacro = (function () {
    function GeneradorDeCasillaMacro(id) {
        this.id = id;
    }
    GeneradorDeCasillaMacro.prototype.generarSemillaDeCasilla = function (generador) {
        return generador.obtenerGeneradorParaMacro(this.id).generarSemillaDeCasilla(generador);
    };
    GeneradorDeCasillaMacro.prototype.esAleatorioPara = function (generador) {
        return generador.obtenerGeneradorParaMacro(this.id).esAleatorioPara(generador);
    };
    return GeneradorDeCasillaMacro;
})();
/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../habilidades/Flotar.ts" />
/// <reference path = "../../actores/libroPrimaria/Duba.ts" />
/// <reference path = "../../actores/libroPrimaria/Obstaculo.ts" />
/// <reference path = "../../actores/libroPrimaria/Churrasco.ts" />
var EscenaDuba = (function (_super) {
    __extends(EscenaDuba, _super);
    function EscenaDuba(especificacion, opciones, posFinal) {
        _super.call(this);
        this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
        if (posFinal) {
            this.xFinal = posFinal[0];
            this.yFinal = posFinal[1];
        }
    }
    EscenaDuba.clasesDeActoresInvolucrados = function () {
        return [Duba, Churrasco, FlechaEscenarioAleatorio];
    };
    ;
    EscenaDuba.pathFondo = function () {
        return 'fondo.duba.png';
    };
    EscenaDuba.imagenesAdicionales = function () {
        return Casilla.imagenesPara('duba').concat(Obstaculo.imagenesPara('duba'));
    }; //TODO: Usar flatMap (lodash)
    EscenaDuba.prototype.ajustarGraficos = function () {
        var _this = this;
        this.automata.escala *= this.escalaSegunCuadricula(1.6);
        this.automata.setY(this.automata.getY() + this.automata.getAlto() / 8);
        this.obtenerActoresConEtiqueta("Churrasco").forEach(function (churrasco) {
            churrasco.aprender(Flotar, { Desvio: 5 });
            churrasco.escala *= _this.escalaSegunCuadricula(1.2) * 0.85;
        });
        this.obtenerActoresConEtiqueta("Obstaculo").forEach(function (obstaculo) {
            obstaculo.escala *= _this.escalaSegunCuadricula(1.1);
        });
    };
    EscenaDuba.prototype.mapearIdentificadorAActor = function (id, nroFila, nroColumna) {
        switch (id) {
            case 'A': return this.automata;
            case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
            case 'P': return new Churrasco();
            default: throw new Error("El identificador '" + id +
                "' no es válido en una escena de Duba.");
        }
    };
    EscenaDuba.prototype.obtenerAutomata = function () {
        return new Duba();
    };
    EscenaDuba.prototype.obtenerObstaculo = function (fila, columna) {
        var archivosObstaculos = ["obstaculo.duba1.png", "obstaculo.duba2.png", "obstaculo.duba3.png", "obstaculo.duba4.png"];
        return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
    };
    EscenaDuba.prototype.estaResueltoElProblema = function () {
        return (this.contarActoresConEtiqueta("Churrasco")) === 0 &&
            (this.xFinal === undefined || this.automata.casillaActual().sos(this.xFinal, this.yFinal));
    };
    EscenaDuba.prototype.archivoFondo = function () {
        return "fondo.duba.png";
    };
    EscenaDuba.prototype.cuadriculaX = function () {
        return 0;
    };
    EscenaDuba.prototype.cuadriculaY = function () {
        return -20;
    };
    EscenaDuba.prototype.opsCuadricula = function () {
        return { ancho: 340, alto: 380 };
    };
    EscenaDuba.prototype.opsCasilla = function () {
        return {
            grilla: 'casillas.duba.png',
            cantFilas: 1,
            cantColumnas: 16,
            bordesDecorados: true,
            relAspecto: 1,
        };
    };
    return EscenaDuba;
})(EscenaDesdeMapa);
/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../EstadosDeEscena.ts" />
/// <reference path = "../../actores/libroPrimaria/Lita.ts" />
/// <reference path = "../../actores/libroPrimaria/Obstaculo.ts" />
/// <reference path = "../../actores/libroPrimaria/Ensalada.ts" />
var EscenaLita = (function (_super) {
    __extends(EscenaLita, _super);
    function EscenaLita(especificacion, opciones, posFinal) {
        _super.call(this);
        this.initDesdeUnaOVariasDescripciones(especificacion, opciones);
        if (posFinal) {
            this.xFinal = posFinal[0];
            this.yFinal = posFinal[1];
        }
    }
    EscenaLita.clasesDeActoresInvolucrados = function () {
        return [Lita, Ensaladera, Tomate, Lechuga, FlechaEscenarioAleatorio];
    };
    ;
    EscenaLita.pathFondo = function () {
        return 'fondo.lita.png';
    };
    EscenaLita.imagenesAdicionales = function () {
        return Casilla.imagenesPara('lita').concat(Obstaculo.imagenesPara('lita'));
    }; //TODO: Usar flatMap (lodash)
    EscenaLita.prototype.iniciar = function () {
        var _this = this;
        _super.prototype.iniciar.call(this);
        if (!this.hayEnsaladera()) {
            this.estado = new Estado(function () {
                return _this.noHayMasIngredientes();
            });
        }
    };
    EscenaLita.prototype.hayEnsaladera = function () {
        return this.contarActoresConEtiqueta("Ensaladera") > 0;
    };
    EscenaLita.prototype.noHayMasTomates = function () {
        return this.contarActoresConEtiqueta("Tomate") === 0;
    };
    EscenaLita.prototype.noHayMasLechugas = function () {
        return this.contarActoresConEtiqueta("Lechuga") === 0;
    };
    EscenaLita.prototype.noHayMasIngredientes = function () {
        return this.noHayMasLechugas() && this.noHayMasTomates();
    };
    EscenaLita.prototype.hayDeLosDosIngredientes = function () {
        return this.contarActoresConEtiqueta("Tomate") >= 1 && this.contarActoresConEtiqueta("Lechuga") >= 1;
    };
    EscenaLita.prototype.estaResueltoElProblema = function () {
        // Además de verificar que Lita haya cumplido el objetivo de la escena,
        // en el caso de que se haya proporcionado una posición final,
        // queremos verificar que Lita esté ahí.
        return _super.prototype.estaResueltoElProblema.call(this) &&
            (this.xFinal === undefined || this.automata.casillaActual().sos(this.xFinal, this.yFinal));
    };
    EscenaLita.prototype.ajustarGraficos = function () {
        var _this = this;
        this.automata.escala *= this.escalaSegunCuadricula(1.9);
        this.automata.setY(this.automata.getY() + this.automata.getAlto() / 4);
        this.obtenerActoresConEtiqueta("Ensaladera").forEach(function (ensaladera) {
            ensaladera.enviarAlFrente();
            ensaladera.setY(ensaladera.getY() - ensaladera.getAlto() / 5);
        });
        this.obtenerActoresConEtiquetas(["Tomate", "Lechuga", "Ensaladera"]).forEach(function (actor) {
            actor.aprender(Flotar, { Desvio: 5 });
            actor.escala *= _this.escalaSegunCuadricula(1.2) * 0.85;
        });
        this.obtenerActoresConEtiqueta("Obstaculo").forEach(function (obstaculo) {
            obstaculo.escala *= _this.escalaSegunCuadricula(1.1);
        });
    };
    EscenaLita.prototype.mapearIdentificadorAActor = function (id, nroFila, nroColumna) {
        switch (id) {
            case 'A': return this.automata;
            case 'L': return new Lechuga();
            case 'T': return new Tomate();
            case 'E': return new Ensaladera();
            case 'O': return this.obtenerObstaculo(nroFila, nroColumna);
            default: throw new Error("El identificador '" + id +
                "' no es válido en una escena de Lita.");
        }
    };
    EscenaLita.prototype.obtenerAutomata = function () {
        return new Lita();
    };
    EscenaLita.prototype.obtenerObstaculo = function (fila, columna) {
        var archivosObstaculos = ["obstaculo.lita1.png", "obstaculo.lita2.png", "obstaculo.lita3.png", "obstaculo.lita4.png"];
        return new Obstaculo(archivosObstaculos, (fila + 1) + (fila + 1) * (columna + 1));
    };
    EscenaLita.prototype.archivoFondo = function () {
        return "fondo.lita.png";
    };
    EscenaLita.prototype.cuadriculaX = function () {
        return 0;
    };
    EscenaLita.prototype.cuadriculaY = function () {
        return -20;
    };
    EscenaLita.prototype.opsCuadricula = function () {
        return { ancho: 340, alto: 380 };
    };
    EscenaLita.prototype.opsCasilla = function () {
        return {
            grilla: 'casillas.lita.png',
            cantFilas: 1,
            cantColumnas: 16,
            bordesDecorados: true,
            relAspecto: 1,
        };
    };
    return EscenaLita;
})(EscenaDesdeMapa);
/// <reference path = "EscenaDesdeMapa.ts" />
/// <reference path = "../../actores/libroPrimaria/Toto.ts" />
/// <reference path = "../../actores/libroPrimaria/Letra.ts" />
/**
 * En esta escena, el zorro Toto se mueve por una cuadrícula de letras y las va leyendo.
 * A medida que el zorro lee las letras, estas van apareciendo en otra cuadrícula.
 */
var EscenaToto = (function (_super) {
    __extends(EscenaToto, _super);
    /**
     * @param mapaEscena Matriz bidimensional de strings a partir de la cual se crea la escena.
     * Toto se representa con una 'A' mayúscula. Las letras a leer van en minúscula
     * ('a', 'b', etc.). Los strings ' ' y '' representan casillas vacías.
     * @param textoObjetivo El texto que Toto debe leer.
     * @param topeDeLetras Cantidad máxima de letras que Toto puede leer. Es opcional; por defecto
     * se toma la longitud de `textoObjetivo`.
     */
    function EscenaToto(mapaEscena, textoObjetivo, topeDeLetras) {
        if (topeDeLetras === void 0) { topeDeLetras = 0; }
        _super.call(this, new GeneradorDeMapasSimple(mapaEscena));
        this.textoObjetivo = textoObjetivo;
        this.topeDeLetras = topeDeLetras > 0 ? topeDeLetras : this.textoObjetivo.length;
    }
    EscenaToto.pathFondo = function () {
        return 'fondo.toto.png';
    };
    EscenaToto.clasesDeActoresInvolucrados = function () {
        var actores = [Toto, LetraTablero];
        return actores.concat(this.clasesDeActoresExtrasToto());
    };
    ;
    EscenaToto.clasesDeActoresExtrasToto = function () {
        return [];
    };
    EscenaToto.imagenesAdicionales = function () {
        return Casilla.imagenesPara('toto').concat(this.imagenesAdicionalesToto());
    };
    EscenaToto.imagenesAdicionalesToto = function () {
        return [];
    };
    EscenaToto.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.cuadriculaSecundaria = this.construirCuadriculaSecundaria();
        // Toto debe conocer la cuadrícula secundaria (ver comportamiento 'MovimientoConLectura').
        this.automata.cuadriculaSecundaria = this.cuadriculaSecundaria;
    };
    EscenaToto.prototype.ajustarGraficos = function () {
        this.automata.enviarAlFrente();
        this.automata.setY(this.automata.getY() + this.automata.alto * 0.15);
        this.automata.escala *= this.escalaSegunCuadricula(1.55);
    };
    EscenaToto.prototype.mapearIdentificadorAActor = function (id, nroFila, nroColumna) {
        switch (id) {
            case 'A': return this.automata;
            default: return new LetraTablero(id);
        }
    };
    EscenaToto.prototype.archivoFondo = function () {
        return "fondo.toto.png";
    };
    EscenaToto.prototype.cuadriculaX = function () {
        return 0;
    };
    EscenaToto.prototype.cuadriculaY = function () {
        return 80;
    };
    EscenaToto.prototype.opsCuadricula = function () {
        return { ancho: 360, alto: 280 };
    };
    EscenaToto.prototype.opsCasilla = function () {
        return { grilla: "casillas.toto.png", cantColumnas: 16, bordesDecorados: true, relAspecto: 1 };
    };
    /**
     * Devuelve en forma de string el contenido actual de la cuadrícula secundaria.
     */
    EscenaToto.prototype.textoEnCuadriculaSecundaria = function () {
        var texto = "";
        this.cuadriculaSecundaria
            .filterCasillas(function (casilla) { return casilla.tieneActorConEtiqueta("Letra"); })
            .forEach(function (casilla) {
            return texto += casilla.actoresConEtiqueta("Letra")[0].caracter();
        });
        return texto;
    };
    EscenaToto.prototype.estaResueltoElProblema = function () {
        return this.textoEnCuadriculaSecundaria() == this.textoObjetivo.toUpperCase();
    };
    return EscenaToto;
})(EscenaDesdeMapa);
/// <reference path = "EscenaToto.ts" />
/// <reference path = "../../actores/libroPrimaria/Toto.ts" />
/// <reference path = "../../actores/libroPrimaria/Letra.ts" />
/**
 * En esta escena, el zorro Toto se mueve por una cuadrícula de letras y las va leyendo.
 * A medida que el zorro lee las letras, estas van apareciendo en otra cuadrícula.
 */
var EscenaTotoLector = (function (_super) {
    __extends(EscenaTotoLector, _super);
    function EscenaTotoLector() {
        _super.apply(this, arguments);
    }
    EscenaTotoLector.clasesDeActoresExtrasToto = function () {
        return [LetraLeida];
    };
    EscenaTotoLector.imagenesAdicionalesToto = function () {
        return ['pensamientoToto.png'];
    };
    EscenaTotoLector.prototype.obtenerAutomata = function () {
        return new TotoLector();
    };
    EscenaTotoLector.prototype.construirCuadriculaSecundaria = function () {
        new ActorAnimado(0, -160, { grilla: "pensamientoToto.png" });
        return new Cuadricula(70, -160, 1, this.topeDeLetras, { alto: 160, ancho: 210, imagen: 'invisible.png', separacionEntreCasillas: -24 }, { grilla: 'invisible.png', relAspecto: 1 });
    };
    return EscenaTotoLector;
})(EscenaToto);
/// <reference path = "EscenaToto.ts" />
/// <reference path = "../../comportamientos/EscribirTexto.ts" />
var EscenaTotoEscritor = (function (_super) {
    __extends(EscenaTotoEscritor, _super);
    function EscenaTotoEscritor(estilo) {
        _super.call(this, estilo.mapa(), estilo.textoEsperado(), estilo.topeDeLetras());
    }
    EscenaTotoEscritor.clasesDeActoresExtrasToto = function () {
        return [LetraManuscrita];
    };
    EscenaTotoEscritor.imagenesAdicionalesToto = function () {
        return ['manoToto.png', 'libretaToto.png'];
    };
    EscenaTotoEscritor.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.manoQueEscribe = new ActorAnimado(0, 0, { grilla: "manoToto.png" });
        this.cuadriculaSecundaria.agregarActor(this.manoQueEscribe, 0, 0, false);
        this.manoQueEscribe.escalarAAncho(190);
        this.manoQueEscribe.setY(this.manoQueEscribe.getY() - 25);
        this.manoQueEscribe.setX(this.manoQueEscribe.getX() + 85);
    };
    EscenaTotoEscritor.prototype.obtenerAutomata = function () {
        return new TotoEscritor();
    };
    EscenaTotoEscritor.prototype.opsCuadricula = function () {
        return { ancho: 400, alto: 280 };
    };
    EscenaTotoEscritor.prototype.construirCuadriculaSecundaria = function () {
        new ActorAnimado(-30, -170, { grilla: "libretaToto.png" });
        return new Cuadricula(30, -140, 1, this.topeDeLetras, { alto: 160, ancho: 300, imagen: 'invisible.png', separacionEntreCasillas: -20 }, { grilla: 'invisible.png', relAspecto: 1 });
    };
    EscenaTotoEscritor.prototype.estaResueltoElProblema = function () {
        return _super.prototype.estaResueltoElProblema.call(this) && this.automata.tocandoFin();
    };
    return EscenaTotoEscritor;
})(EscenaToto);
var EscribirTextoEnOtraCuadricula = (function (_super) {
    __extends(EscribirTextoEnOtraCuadricula, _super);
    function EscribirTextoEnOtraCuadricula() {
        _super.apply(this, arguments);
    }
    EscribirTextoEnOtraCuadricula.prototype.iniciar = function (receptor) {
        this.argumentos.texto = this.obtenerTexto();
        this.argumentos.receptor = pilas.escena_actual().manoQueEscribe;
        _super.prototype.iniciar.call(this, this.argumentos.receptor);
    };
    return EscribirTextoEnOtraCuadricula;
})(EscribirTexto);
var EscribirLetraActualEnOtraCuadricula = (function (_super) {
    __extends(EscribirLetraActualEnOtraCuadricula, _super);
    function EscribirLetraActualEnOtraCuadricula() {
        _super.apply(this, arguments);
    }
    EscribirLetraActualEnOtraCuadricula.prototype.obtenerTexto = function () { return pilas.escena_actual().automata.caracterActual(); };
    return EscribirLetraActualEnOtraCuadricula;
})(EscribirTextoEnOtraCuadricula);
var EscribirTextoDadoEnOtraCuadricula = (function (_super) {
    __extends(EscribirTextoDadoEnOtraCuadricula, _super);
    function EscribirTextoDadoEnOtraCuadricula() {
        _super.apply(this, arguments);
    }
    EscribirTextoDadoEnOtraCuadricula.prototype.obtenerTexto = function () { return this.argumentos.texto; };
    return EscribirTextoDadoEnOtraCuadricula;
})(EscribirTextoEnOtraCuadricula);
var EstiloTotoEscritor = (function () {
    function EstiloTotoEscritor() {
        this.palabraElegida = this.palabras()[Math.floor(Math.random() * this.palabras().length)];
    }
    /** Elige una palabra de una lista, y arma el mapa para la escena a partir de esa palabra */
    EstiloTotoEscritor.prototype.mapa = function () {
        return [["A"].concat(this.palabraElegida.split(""))];
    };
    EstiloTotoEscritor.prototype.topeDeLetras = function () {
        return this.textoEsperado().length + 1;
    };
    EstiloTotoEscritor.prototype.palabras = function () {
        return ["después", "trabajo", "partido", "público", "todavía", "espacio", "difícil", "pública", "popular", "gracias", "palabra", "jóvenes", "escuela", "corazón", "actitud", "octubre", "ciencia", "razones", "perdido", "destino", "tercera", "viernes", "febrero", "pueblos", "treinta", "pintura", "plantas", "abierto", "colegio", "estatal", "cerebro", "actores", "dientes", "piedras", "fiestas", "círculo", "clásico", "canción", "alfredo", "córdoba", "ochenta", "botella", "rodrigo", "sonidos", "jugando", "incluir", "dibujos", "oxígeno", "lenguas", "pájaros", "vegetal", "teórico", "rurales", "pilotos", "rodilla", "enseñar", "balanza", "ingenio", "vinagre", "celeste", "abuelos", "espejos", "orillas", "sendero", "fósiles", "nativos", "oficios", "vocales", "diseñar", "cautela", "aceites", "saludar", "engañar", "abuelas", "nativas", "teórica", "clásica", "perdida", "abierta", "tercero", "primera", "sistema", "mujeres", "familia", "minutos", "estamos", "mundial", "tenemos", "domingo", "américa", "mayores", "humanos", "llamado", "hermano", "semanas", "maestro", "médicos", "mensaje", "volumen", "musical", "caminos", "montaña", "moderno", "remedio", "cámaras", "premios", "emoción", "caminar", "mendoza", "humedad", "músicos", "comedor", "manteca", "miradas", "formato", "armando", "inmenso", "monedas", "maestra", "emisora", "amantes", "miranda", "famosos", "manzana", "minoría", "motores", "mezclar", "semilla", "cemento", "mineral", "mañanas", "tomates", "mediano", "perfume", "milenio", "almacén", "melodía", "molesto", "mineros", "amorosa", "manzano", "anónimo", "dormida", "vómitos", "inmensa", "famosas", "humanas", "llamada", "hermana", "moderna", "maestra", "médicas", "músicas", "mediana", "molesta", "mineras", "amoroso", "anónima", "dormido", "primero", "momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro"];
    };
    EstiloTotoEscritor.prototype.textoEsperado = function () {
        var _this = this;
        return this.palabraElegida.split("").map(function (letra) { return _this.transformacionEsperadaPorLetra(letra); }).join("");
    };
    return EstiloTotoEscritor;
})();
var ObjetivoCopiar = (function (_super) {
    __extends(ObjetivoCopiar, _super);
    function ObjetivoCopiar() {
        _super.apply(this, arguments);
    }
    ObjetivoCopiar.prototype.transformacionEsperadaPorLetra = function (letra) {
        return letra;
    };
    return ObjetivoCopiar;
})(EstiloTotoEscritor);
var ObjetivoX = (function (_super) {
    __extends(ObjetivoX, _super);
    function ObjetivoX() {
        _super.apply(this, arguments);
    }
    ObjetivoX.prototype.transformacionEsperadaPorLetra = function (letra) {
        return "x";
    };
    return ObjetivoX;
})(EstiloTotoEscritor);
var ObjetivoJeringozo = (function (_super) {
    __extends(ObjetivoJeringozo, _super);
    function ObjetivoJeringozo() {
        _super.apply(this, arguments);
    }
    ObjetivoJeringozo.prototype.palabras = function () {
        var _this = this;
        return _super.prototype.palabras.call(this).filter(function (palabra) { return _this.todasLetrasSimples(palabra) && _this.pocasVocales(palabra); });
    };
    ObjetivoJeringozo.prototype.transformacionEsperadaPorLetra = function (letra) {
        return letra + (this.esVocal(letra) ? "p" + letra : "");
    };
    ObjetivoJeringozo.prototype.esVocal = function (letra) {
        return letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u";
    };
    ObjetivoJeringozo.prototype.todasLetrasSimples = function (palabra) {
        return palabra.split("").every(function (letra) { return "abcdefghijklmnñopqrstuvwxyz".indexOf(letra) >= 0; });
    };
    ObjetivoJeringozo.prototype.pocasVocales = function (palabra) {
        var _this = this;
        return palabra.split("").filter(function (letra) { return _this.esVocal(letra); }).length <= 3;
    };
    return ObjetivoJeringozo;
})(EstiloTotoEscritor);
var ObjetivoMicha = (function (_super) {
    __extends(ObjetivoMicha, _super);
    function ObjetivoMicha() {
        _super.apply(this, arguments);
    }
    ObjetivoMicha.prototype.palabras = function () {
        return ["momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro",
            "momento", "memoria", "mínimos", "mínimas", "máximos", "máximas", "tomamos", "murmuro",
            "vómitos", "médicas", "amoroso", "manzano", "cemento", "mineral", "mañanas", "humanas", "llamada"];
    };
    ObjetivoMicha.prototype.transformacionEsperadaPorLetra = function (letra) {
        return letra + (letra === "m" ? "ich" : "");
    };
    return ObjetivoMicha;
})(EstiloTotoEscritor);
/// <reference path = "EscenaDuba.ts" />
/// <reference path = "EscenaCoty.ts" />
/// <reference path = "EscenaLita.ts" />
/// <reference path = "EscenaTotoLector.ts" />
/// <reference path = "EscenaTotoEscritor.ts" />
var EscenaDubaFondoBlanco = (function (_super) {
    __extends(EscenaDubaFondoBlanco, _super);
    function EscenaDubaFondoBlanco() {
        _super.apply(this, arguments);
    }
    EscenaDubaFondoBlanco.prototype.archivoFondo = function () {
        return "fondo.blanco.png";
    };
    return EscenaDubaFondoBlanco;
})(EscenaDuba);
var EscenaCotyFondoBlanco = (function (_super) {
    __extends(EscenaCotyFondoBlanco, _super);
    function EscenaCotyFondoBlanco() {
        _super.apply(this, arguments);
    }
    EscenaCotyFondoBlanco.pathFondo = function () {
        return "fondo.blanco.png";
    };
    return EscenaCotyFondoBlanco;
})(EscenaCoty);
var EscenaLitaFondoBlanco = (function (_super) {
    __extends(EscenaLitaFondoBlanco, _super);
    function EscenaLitaFondoBlanco() {
        _super.apply(this, arguments);
    }
    EscenaLitaFondoBlanco.prototype.archivoFondo = function () {
        return "fondo.blanco.png";
    };
    return EscenaLitaFondoBlanco;
})(EscenaLita);
var EscenaTotoLectorFondoBlanco = (function (_super) {
    __extends(EscenaTotoLectorFondoBlanco, _super);
    function EscenaTotoLectorFondoBlanco() {
        _super.apply(this, arguments);
    }
    EscenaTotoLectorFondoBlanco.prototype.archivoFondo = function () {
        return "fondo.blanco.png";
    };
    return EscenaTotoLectorFondoBlanco;
})(EscenaTotoLector);
var EscenaTotoEscritorFondoBlanco = (function (_super) {
    __extends(EscenaTotoEscritorFondoBlanco, _super);
    function EscenaTotoEscritorFondoBlanco() {
        _super.apply(this, arguments);
    }
    EscenaTotoEscritorFondoBlanco.prototype.archivoFondo = function () {
        return "fondo.blanco.png";
    };
    return EscenaTotoEscritorFondoBlanco;
})(EscenaTotoEscritor);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/MariaAnimada.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
var MariaLaComeSandias = (function (_super) {
    __extends(MariaLaComeSandias, _super);
    function MariaLaComeSandias() {
        _super.apply(this, arguments);
    }
    MariaLaComeSandias.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.mariaSandia.png', 0, 0);
        var cantidadFilas = 5;
        this.cantidadColumnas = 6;
        this.cuadricula = new Cuadricula(0, 0, cantidadFilas, this.cantidadColumnas, { alto: 300, ancho: 300, separacionEntreCasillas: 5 }, { grilla: 'casilla.mariaSandia.png',
            cantColumnas: 5 });
        this.completarConSandias();
        this.automata = new MariaAnimada(0, 0);
        this.cuadricula.agregarActor(this.automata, cantidadFilas - 1, 0);
        this.automata.escala *= 2;
        this.automata.abajo = this.cuadricula.casilla(cantidadFilas - 1, 0).abajo;
    };
    MariaLaComeSandias.prototype.completarConSandias = function () {
        this.completarFila(0);
        this.completarFila(2);
        this.completarFila(4);
        this.cuadricula.agregarActor(new SandiaAnimada(0, 0), 1, 0);
        this.cuadricula.agregarActor(new SandiaAnimada(0, 0), 3, 0);
    };
    MariaLaComeSandias.prototype.completarFila = function (numeroFila) {
        for (var x = 0; x < this.cantidadColumnas; x++) {
            this.cuadricula.agregarActor(new SandiaAnimada(0, 0), numeroFila, x);
        }
    };
    MariaLaComeSandias.prototype.estaResueltoElProblema = function () {
        return this.contarActoresConEtiqueta('SandiaAnimada') == 0;
    };
    return MariaLaComeSandias;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../comportamientos/SaltarHablando.ts" />
/// <reference path = "../actores/GatoAnimado.ts" />
/**
 * @class NoMeCansoDeSaltar
 *
 * Objetivos: Introducir Repetición
 * Enunciado: Repetir salto.
 */
var NoMeCansoDeSaltar = (function (_super) {
    __extends(NoMeCansoDeSaltar, _super);
    function NoMeCansoDeSaltar() {
        _super.apply(this, arguments);
    }
    NoMeCansoDeSaltar.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.noMeCansoDeSaltar.png', 0, 0);
        this.automata = new GatoAnimado(0, -17);
        this.saltosFaltantes = 30;
    };
    NoMeCansoDeSaltar.prototype.fraseAlSaltar = function () {
        this.saltosFaltantes--;
        if (this.saltosFaltantes > 0)
            return "Faltan " + this.saltosFaltantes + " saltos";
        if (this.saltosFaltantes == 0)
            return "¡Ya salté todo lo necesario!";
        throw new ActividadError("¡Uy! Salté mucho... ¡Me pasé!");
    };
    NoMeCansoDeSaltar.prototype.estaResueltoElProblema = function () {
        return this.saltosFaltantes == 0;
    };
    return NoMeCansoDeSaltar;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/InstaladorAnimado.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
var PrendiendoLasCompus = (function (_super) {
    __extends(PrendiendoLasCompus, _super);
    function PrendiendoLasCompus() {
        _super.apply(this, arguments);
    }
    PrendiendoLasCompus.prototype.iniciar = function () {
        this.compus = [];
        this.cantidadMaxColumnas = 12;
        this.cantidadMinColumnas = 4;
        this.cantidadMaxFilas = 10;
        this.cantidadMinFilas = 5;
        this.ladoCasilla = 30;
        this.fondo = new Fondo('fondo.prendiendoLasCompus.png', 0, 0);
        this.cantidadFilas = Math.floor(this.cantidadMinFilas + (Math.random() * (this.cantidadMaxFilas - this.cantidadMinFilas)));
        this.cantidadColumnas = Math.floor(this.cantidadMinColumnas + (Math.random() * (this.cantidadMaxColumnas - this.cantidadMinColumnas)));
        this.cuadricula = new Cuadricula(0, (this.ladoCasilla + 2) * 2, this.cantidadFilas, this.cantidadColumnas, { separacionEntreCasillas: 2 }, { grilla: 'casilla.prendiendoLasCompus.png', alto: this.ladoCasilla, ancho: this.ladoCasilla });
        this.automata = new InstaladorAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
        this.completarConCompusEnLaterales();
    };
    PrendiendoLasCompus.prototype.completarConCompusEnLaterales = function () {
        //Completo la primer y ultima fila
        for (var i = 1; i < this.cantidadColumnas - 1; ++i) {
            this.addCompu(0, i);
            this.addCompu(this.cantidadFilas - 1, i);
        }
        //Completo la primer y ultima columna
        for (var i = 1; i < this.cantidadFilas - 1; ++i) {
            this.addCompu(i, 0);
            this.addCompu(i, this.cantidadColumnas - 1);
        }
    };
    PrendiendoLasCompus.prototype.addCompu = function (fila, columna) {
        var compu = new CompuAnimada(0, 0);
        this.cuadricula.agregarActor(compu, fila, columna);
        this.compus.push(compu);
    };
    PrendiendoLasCompus.prototype.estaResueltoElProblema = function () {
        return this.compus.every(function (compu) { return compu.nombreAnimacionActual() === 'prendida'; });
    };
    return PrendiendoLasCompus;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/ScoutAnimado.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/CompuAnimada.ts" />
var PrendiendoLasFogatas = (function (_super) {
    __extends(PrendiendoLasFogatas, _super);
    function PrendiendoLasFogatas() {
        _super.apply(this, arguments);
    }
    PrendiendoLasFogatas.prototype.iniciar = function () {
        this.fogatas = [];
        this.cantidadFilas = 7;
        this.cantidadColumnas = 7;
        var matriz = [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T']
        ];
        this.cuadricula = new CuadriculaEsparsa(0, 0, { ancho: 400, alto: 400 }, { grilla: 'casillas.violeta.png' }, matriz);
        this.ladoCasilla = 30;
        this.fondo = new Fondo('fondo.BosqueDeNoche.png', 0, 0);
        this.agregarFogatas();
        this.automata = new ScoutAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
    };
    PrendiendoLasFogatas.prototype.agregarFogatas = function () {
        for (var i = 1; i < this.cantidadColumnas - 1; i++) {
            if (Math.random() < .5) {
                this.agregarFogata(0, i);
            }
            if (Math.random() < .5) {
                this.agregarFogata(this.cantidadFilas - 1, i);
            }
        }
        for (var j = 1; j < this.cantidadFilas - 1; j++) {
            if (Math.random() < .5) {
                this.agregarFogata(j, 0);
            }
            if (Math.random() < .5) {
                this.agregarFogata(j, this.cantidadColumnas - 1);
            }
        }
    };
    PrendiendoLasFogatas.prototype.agregarFogata = function (fila, columna) {
        var fogata = new FogataAnimada(0, 0);
        this.cuadricula.agregarActor(fogata, fila, columna);
        this.fogatas.push(fogata);
    };
    PrendiendoLasFogatas.prototype.estaResueltoElProblema = function () {
        return this.fogatas.every(function (fogata) {
            return (fogata.nombreAnimacionActual() === 'prendida');
        });
    };
    return PrendiendoLasFogatas;
})(EscenaActividad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts" />
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/MarcianoAnimado.ts" />
/// <reference path = "../actores/NaveAnimada.ts" />
/// <reference path = "../actores/CarbonAnimado.ts" />
/// <reference path = "../actores/HierroAnimado.ts" />
/// <reference path = "../actores/Tablero.ts" />
/// <reference path = "../actores/ObservadoAnimado.ts" />
/// <reference path = "../actores/ActorCompuesto.ts" />
/// <reference path = "EstadosDeEscena.ts" />
/// <reference path = "../habilidades/Flotar.ts" />
var ReparandoLaNave = (function (_super) {
    __extends(ReparandoLaNave, _super);
    function ReparandoLaNave() {
        _super.apply(this, arguments);
    }
    ReparandoLaNave.prototype.iniciar = function () {
        this.fondo = new Fondo('fondos.reparandoLaNave.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, 4, 5, { ancho: 323, alto: 261 }, {
            grilla: 'invisible.png',
            cantColumnas: 1
        });
        this.crearActores();
        this.crearTableros();
        this.crearEstado();
    };
    ReparandoLaNave.prototype.crearActores = function () {
        this.crearAutomata();
        var lanave = new NaveAnimada();
        this.cuadricula.agregarActor(lanave, this.cuadricula.cantFilas - 1, 0);
        this.nave = new ActorCompuesto(0, 0, { subactores: [lanave] });
        this.nave.escala = 2.5;
        this.nave.y += 10;
        this.hierro = new HierroAnimado(0, 0);
        this.hierro.cantidad = 3;
        this.carbon = new CarbonAnimado(0, 0);
        this.carbon.cantidad = 3;
        this.cuadricula.agregarActor(this.hierro, 0, 0);
        this.hierro.aprender(Flotar, { Desvio: 2 });
        this.cuadricula.agregarActor(this.carbon, 0, this.cuadricula.cantColumnas - 1);
        this.carbon.aprender(Flotar, { Desvio: 2 });
    };
    ReparandoLaNave.prototype.crearAutomata = function () {
        this.automata = new ActorCompuesto(0, 0, { subactores: [new MarcianoAnimado(0, 0)] });
        this.cuadricula.agregarActorEnPerspectiva(this.automata, this.cuadricula.cantFilas - 1, 0, false);
        this.automata.escala = 0.8;
        this.automata.y += 50;
    };
    ReparandoLaNave.prototype.crearTableros = function () {
        Trait.toObject(ObservadoConDisminuir, this.carbon);
        Trait.toObject(ObservadoConDisminuir, this.hierro);
        this.hierro.registrarObservador(new Tablero(-150, 190, { texto: "Hierro" }));
        this.carbon.registrarObservador(new Tablero(150, 190, { texto: "Carbón" }));
        this.carbon.changed();
        this.hierro.changed();
    };
    ReparandoLaNave.prototype.crearEstado = function () {
        var _this = this;
        var builder = new BuilderStatePattern(this, 'faltanMateriales');
        builder.agregarEstado('naveReparada');
        builder.agregarEstadoAceptacion('haEscapado');
        builder.agregarError('faltanMateriales', 'escapar', '¡No puedo escaparme sin antes haber reparado la nave!');
        builder.agregarTransicion('faltanMateriales', 'naveReparada', 'depositar', function () { return _this.hierro.cantidad == 0 && _this.carbon.cantidad == 0; });
        builder.agregarTransicion('naveReparada', 'haEscapado', 'escapar');
        this.estado = builder.estadoInicial();
    };
    return ReparandoLaNave;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/CuadriculaMultiple.ts" />
/// <reference path = "../actores/PapaNoelAnimado.ts" />
var SalvandoLaNavidad = (function (_super) {
    __extends(SalvandoLaNavidad, _super);
    function SalvandoLaNavidad() {
        _super.apply(this, arguments);
    }
    SalvandoLaNavidad.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.salvandonavidad.png', 0, 0);
        this.cuadricula = new CuadriculaMultiple(new DefinidorColumnasFijo(5, [5, 6, 8, 4, 7]), 0, 0, { separacionEntreCasillas: 5 }, { grilla: 'casilla.futbolRobots2.png', alto: 40, ancho: 40 });
        this.cuadricula.cambiarImagenInicio('casillainiciomono.png');
        this.automata = new PapaNoelAnimado(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
        this.automata.escala *= 1.8;
    };
    SalvandoLaNavidad.prototype.estaResueltoElProblema = function () {
        return this.hayRegalosAlFinalDeLasFilas() && this.cuadricula.cantFilas === this.cantidadObjetosConEtiqueta("RegaloAnimado");
    };
    SalvandoLaNavidad.prototype.hayRegalosAlFinalDeLasFilas = function () {
        return this.ultimasCasillas().every(function (casilla) { return casilla.tieneActorConEtiqueta('RegaloAnimado'); });
    };
    SalvandoLaNavidad.prototype.ultimasCasillas = function () {
        return this.cuadricula.filterCasillas(function (casilla) { return casilla.esFin(); });
    };
    return SalvandoLaNavidad;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "../actores/Tito.ts"/>
/// <reference path = "../actores/Lamparin.ts"/>
/// <reference path = "../actores/Cuadricula.ts"/>
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts"/>
/**
 * @class SuperTito1
 *
 */
var SuperTito1 = (function (_super) {
    __extends(SuperTito1, _super);
    function SuperTito1() {
        _super.apply(this, arguments);
    }
    SuperTito1.prototype.iniciar = function () {
        this.fondo = new Fondo(this.constructor.pathFondo(), 0, 0);
        this.objetos = [];
        this.cuadricula = new Cuadricula(0, 0, this.cantidadFilas(), 1, { separacionEntreCasillas: 5 }, { grilla: 'casilla.grisoscuro.png',
            cantColumnas: 1, ancho: 100, alto: 50 });
        this.cuadricula.casilla(this.cantidadFilas() - 1, 0).cambiarImagen('casilla.titoFinalizacion.png');
        for (var i = 0; i < this.cantidadFilas() - 1; i++) {
            this.agregarLamparinEnFila(i);
        }
        this.automata = new Tito(0, 0);
        this.cuadricula.agregarActor(this.automata, 0, 0);
        this.automata.escala *= 2;
        this.automata.y += 30;
        this.automata.x -= 15;
    };
    SuperTito1.prototype.cantidadFilas = function () {
        if (!this.cantFilas)
            this.cantFilas = Math.floor((Math.random() * 5) + 3);
        return this.cantFilas;
    };
    SuperTito1.prototype.agregarLamparinEnFila = function (i) {
        var lamparin = new Lamparin(0, 0);
        this.objetos.push(lamparin);
        this.cuadricula.agregarActor(lamparin, i, 0);
        lamparin.x += 15;
    };
    SuperTito1.pathFondo = function () {
        return 'fondo.superTito1.png';
    };
    SuperTito1.prototype.estaResueltoElProblema = function () {
        return this.objetos.every(function (o) { return o.nombreAnimacionActual() == 'prendida'; }) && this.automata.alFinalDelCamino();
    };
    return SuperTito1;
})(EscenaActividad);
/// <reference path = "SuperTito1.ts" />
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/**
 * @class SuperTito2
 *
 */
var SuperTito2 = (function (_super) {
    __extends(SuperTito2, _super);
    function SuperTito2() {
        _super.apply(this, arguments);
    }
    SuperTito2.prototype.iniciar = function () {
        _super.prototype.iniciar.call(this);
        this.hayLuz = false;
    };
    SuperTito2.pathFondo = function () {
        return 'fondo.superTito2.png';
    };
    SuperTito2.prototype.agregarLamparinEnFila = function (i) {
        if (Math.random() < 0.5 || (i == this.cantidadFilas() - 2 && !this.hayLuz)) {
            _super.prototype.agregarLamparinEnFila.call(this, i);
            this.hayLuz = true;
        }
    };
    return SuperTito2;
})(SuperTito1);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "Errores.ts" />
/// <reference path = "../actores/FondoAnimado.ts"/>
/// <reference path = "../actores/Superheroe.ts"/>
/**
 * @class SuperViaje
 *
 */
var SuperViaje = (function (_super) {
    __extends(SuperViaje, _super);
    function SuperViaje() {
        _super.apply(this, arguments);
    }
    SuperViaje.prototype.iniciar = function () {
        this.fondo = new FondoAnimado('fondo.elSuperviaje.png', pilas.derecha(), 0);
        this.automata = new Superheroe();
        this.automata.aprender(Flotar, { Desvio: 10 });
        this.automata.totalKM = 15 + Math.round(Math.random() * 30);
        this.automata.restantesKM = this.automata.totalKM;
        this.automata.kmsTotales = function () {
            return this.totalKM;
        };
        this.crearTablero();
        this.automata.fraseAlVolar = function () {
            this.restantesKM--;
            if (this.restantesKM == 0)
                return "¡Llegué!";
            if (this.restantesKM == 1)
                return "¡Falta 1 kilometro!";
            if (this.restantesKM < 0)
                throw new ActividadError("Ya llegué, ¡no debo seguir volando!");
            return "¡Faltan " + this.restantesKM + " kilometros!";
        };
    };
    SuperViaje.prototype.crearTablero = function () {
        Trait.toObject(Observado, this.automata);
        var tablero = new Tablero(0, 210, { texto: "Kilómetros a recorrer", atributoObservado: 'kmsTotales' });
        this.automata.registrarObservador(tablero);
    };
    SuperViaje.prototype.estaResueltoElProblema = function () {
        return this.automata.restantesKM === 0;
    };
    return SuperViaje;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Tito.ts" />
/// <reference path = "../actores/Lamparin.ts" />
/// <reference path = "../actores/CuadriculaEsparsa.ts" />
var TitoCuadrado = (function (_super) {
    __extends(TitoCuadrado, _super);
    function TitoCuadrado() {
        _super.apply(this, arguments);
    }
    TitoCuadrado.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.tito-cuadrado.png', 0, 0);
        this.luces = [];
        this.cantidadFilas = 7;
        this.cantidadColumnas = 7;
        var matriz = [
            ['T', 'T', 'T', 'T', 'T', 'T', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'F', 'F', 'F', 'F', 'F', 'T'],
            ['T', 'T', 'T', 'T', 'T', 'T', 'T']
        ];
        this.cuadricula = new CuadriculaEsparsa(0, 0, { ancho: 400, alto: 400 }, { grilla: 'casillas.violeta.png' }, matriz);
        this.agregarLuces();
        this.automata = new Tito(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 0, 0);
        this.automata.escala *= 1.5;
    };
    TitoCuadrado.prototype.agregarLuces = function () {
        for (var i = 1; i < this.cantidadColumnas - 1; i++) {
            if (Math.random() < .5) {
                this.agregarLuz(0, i);
            }
            if (Math.random() < .5) {
                this.agregarLuz(this.cantidadFilas - 1, i);
            }
        }
        for (var j = 1; j < this.cantidadFilas - 1; j++) {
            if (Math.random() < .5) {
                this.agregarLuz(j, 0);
            }
            if (Math.random() < .5) {
                this.agregarLuz(j, this.cantidadColumnas - 1);
            }
        }
    };
    TitoCuadrado.prototype.agregarLuz = function (f, c) {
        var luz = new Lamparin(0, 0);
        this.luces.push(luz);
        this.cuadricula.agregarActor(luz, f, c);
    };
    TitoCuadrado.prototype.estaResueltoElProblema = function () {
        return this.luces.every(function (l) { return l.nombreAnimacionActual() == 'prendida'; });
    };
    return TitoCuadrado;
})(EscenaActividad);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../actores/Cuadricula.ts" />
/// <reference path = "../actores/Tito.ts" />
/// <reference path = "../actores/Lamparin.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts"/>
var TitoEnciendeLuces = (function (_super) {
    __extends(TitoEnciendeLuces, _super);
    function TitoEnciendeLuces() {
        _super.apply(this, arguments);
        this.objetos = [];
    }
    TitoEnciendeLuces.prototype.iniciar = function () {
        this.fondo = new Fondo('fondos.estrellas.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, 5, 6, { separacionEntreCasillas: 5 }, {
            grilla: 'casilla.grisoscuro.png',
            cantColumnas: 1, alto: 50, ancho: 50
        });
        //se cargan las luces
        var cant = 0;
        var fila = 3;
        var col = 0;
        while (cant < 4) {
            this.agregarLuz(fila, col);
            fila -= 1;
            col += 1;
            cant += 1;
        }
        cant = 0;
        fila = 4;
        col = 2;
        while (cant < 4) {
            this.agregarLuz(fila, col);
            fila -= 1;
            col += 1;
            cant += 1;
        }
        ;
        // se crea el automata
        this.automata = new Tito(0, 0);
        this.cuadricula.agregarActorEnPerspectiva(this.automata, 4, 0);
        this.automata.escalarAAncho(this.cuadricula.anchoCasilla() * 1.5);
    };
    TitoEnciendeLuces.prototype.agregarLuz = function (fila, columna) {
        var casillaLuminosa = new Lamparin(0, 0);
        this.cuadricula.agregarActor(casillaLuminosa, fila, columna);
        this.objetos.push(casillaLuminosa);
    };
    TitoEnciendeLuces.prototype.estaResueltoElProblema = function () {
        return this.objetos.every(function (o) { return o.nombreAnimacionActual() == 'prendida'; });
    };
    return TitoEnciendeLuces;
})(EscenaActividad);
/// <reference path = "SuperTito2.ts" />
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts"/>
/**
 * @class TitoRecargado
 *
 */
var TitoRecargado = (function (_super) {
    __extends(TitoRecargado, _super);
    function TitoRecargado() {
        _super.apply(this, arguments);
    }
    TitoRecargado.pathFondo = function () {
        return 'fondos.estrellas.png';
    };
    TitoRecargado.prototype.cantidadFilas = function () {
        return 7;
    };
    TitoRecargado.prototype.avanzar = function () {
        this.automata.hacer_luego(MoverACasillaDerecha);
    };
    TitoRecargado.prototype.prenderLuz = function () {
        this.automata.hacer_luego(Encender, { etiqueta: 'Luz' });
    };
    return TitoRecargado;
})(SuperTito2);
/// <reference path = "EscenaActividad.ts" />
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "../actores/Cuadricula.ts"/>
/// <reference path = "../actores/PerroCohete.ts"/>
/// <reference path = "../comportamientos/MovimientosEnCuadricula.ts"/>
/**
 * @class TresNaranjas
 *
 */
var TresNaranjas = (function (_super) {
    __extends(TresNaranjas, _super);
    function TresNaranjas() {
        _super.apply(this, arguments);
        this.objetos = [];
    }
    TresNaranjas.prototype.iniciar = function () {
        this.fondo = new Fondo('fondo.tresNaranjas.png', 0, 0);
        this.cuadricula = new Cuadricula(0, 0, 1, 4, { separacionEntreCasillas: 5 }, { grilla: 'casilla.tresNaranjas.png', ancho: 100, alto: 100 });
        //se cargan los Naranjas
        var hayAlMenosUno = false;
        for (var i = 0; i < 3; i++) {
            if (Math.random() < .5) {
                hayAlMenosUno = true;
                this.agregarNaranja(i + 1);
            }
        }
        if (!hayAlMenosUno) {
            var columna = 1;
            var rand = Math.random();
            if (rand > 0.33 && rand < 0.66) {
                columna = 2;
            }
            else if (rand > 0.66) {
                columna = 3;
            }
            this.agregarNaranja(columna);
        }
        // se crea el personaje
        this.automata = new MarcianoAnimado(0, 0);
        this.cuadricula.agregarActor(this.automata, 0, 0, false);
        this.automata.y += 20;
        this.automata.x -= 20;
    };
    TresNaranjas.prototype.agregarNaranja = function (columna) {
        var naranja = new NaranjaAnimada(0, 0);
        this.cuadricula.agregarActor(naranja, 0, columna, false);
        naranja.escala = 0.5;
        naranja.x += 20;
        naranja.y -= 20;
        this.objetos.push(naranja);
    };
    TresNaranjas.prototype.estaResueltoElProblema = function () {
        return this.contarActoresConEtiqueta('NaranjaAnimada') == 0 && this.automata.estaEnCasilla(null, 3);
    };
    return TresNaranjas;
})(EscenaActividad);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "HabilidadAnimada.ts"/>
/*Si los grados de aumento son positivos gira para la derecha
caso contrario gira para la izquierda*/
var RotarContinuamente = (function (_super) {
    __extends(RotarContinuamente, _super);
    function RotarContinuamente(receptor, argumentos) {
        _super.call(this, receptor);
        this.gradosDeAumentoStep = argumentos['gradosDeAumentoStep'] || 1;
    }
    RotarContinuamente.prototype.actualizar = function () {
        this.receptor.rotacion += this.gradosDeAumentoStep;
    };
    return RotarContinuamente;
})(HabilidadAnimada);
/// <reference path = "../../../bower_components/pilasweb/dist/pilasweb.d.ts"/>
/// <reference path = "HabilidadAnimada.ts"/>
/*Si los grados de aumento son positivos gira para la derecha
caso contrario gira para la izquierda*/
var Vibrar = (function (_super) {
    __extends(Vibrar, _super);
    function Vibrar(receptor, argumentos) {
        _super.call(this, receptor);
        this.gradosDeAumentoStep = argumentos['gradosDeAumentoStep'] || 1;
        this.tiempoVibracion = argumentos['tiempoVibracion'] || 2;
        this.izquierda = true;
        this.tiempoAEmplear = this.tiempoVibracion;
        this.enPause = true;
    }
    Vibrar.prototype.actualizar = function () {
        /*
              if(this.tiempoVibracion>0){
                this.tiempoVibracion--;
              }*/
        if (this.enPause) {
            this.tiempoAEmplear--;
            if (this.tiempoAEmplear < 0) {
                this.enPause = false;
                this.tiempoAEmplear = this.tiempoVibracion;
            }
        }
        else {
            if (this.izquierda) {
                this.receptor.rotacion += this.gradosDeAumentoStep;
                this.tiempoAEmplear--;
                if (this.tiempoAEmplear < 0) {
                    this.izquierda = false;
                    this.tiempoAEmplear = this.tiempoVibracion;
                }
            }
            else {
                this.receptor.rotacion -= this.gradosDeAumentoStep;
                this.tiempoAEmplear--;
                if (this.tiempoAEmplear < 0) {
                    this.izquierda = true;
                    this.tiempoAEmplear = this.tiempoVibracion;
                    this.enPause = true;
                }
            }
        }
    };
    return Vibrar;
})(HabilidadAnimada);
