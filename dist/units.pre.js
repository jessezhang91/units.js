(function (global) {
/*
 * DEFINITIONS
 */

var PREFIXES, BASE_UNIT, DERIVED_UNIT, CONVERSION;

PREFIXES = {
	hella: {
		symbol: "H",
		value: 27
	},
	yotta: {
		symbol: "Y",
		value: 24
	},
	zetta: {
		symbol: "Z",
		value: 21
	},
	exa: {
		symbol: "E",
		value: 18
	},
	peta: {
		symbol: "P",
		value: 15
	},
	tera: {
		symbol: "T",
		value: 12
	},
	giga: {
		symbol: "G",
		value: 9
	},
	mega: {
		symbol: "M",
		value: 6
	},
	kilo: {
		symbol: "k",
		value: 3,
		aliases: [
			"K"
		]
	},
	base: {
		symbol: "",
		value: 0
	},
	deci: {
		symbol: "d",
		value: -1
	},
	centi: {
		symbol: "c",
		value: -2
	},
	milli: {
		symbol: "m",
		value: -3
	},
	micro: {
		symbol: String.fromCharCode(181),
		value: -6
	},
	nano: {
		symbol: "n",
		value: -9
	},
	pico: {
		symbol: "p",
		value: -12
	},
	femto: {
		symbol: "f",
		value: -15
	},
	atto: {
		symbol: "a",
		value: -18
	},
	zepto: {
		symbol: "z",
		value: -21
	},
	yocto: {
		symbol: "y",
		value: -24
	}
};

/*
 * Base units are:
 *  - meter   (m)
 *  - gram    (g)   [it should be kilogram but that has a prefix]
 *  - second  (s)
 *  - ampere  (A)
 *  - kelvin  (k)
 *  - mole    (mol)
 *  - canedla (cd)
 */
BASE_UNIT = {
	meter: {
		symbol: "m",
		dimension: "L",
		aliases: [
			"metre"
		]
	},
	gram: {
		symbol: "g",
		dimension: "M",
		aliases: []
	},
	second: {
		symbol: "s",
		dimension: "T",
		aliases: [
			"sec"
		]
	},
	ampere: {
		symbol: "A",
		dimension: "I",
		aliases: [
			"amp",
			"Amp",
			"Ampere"
		]
	},
	kelvin: {
		symbol: "K",
		dimension: "Θ",
		aliases: [
			"Kelvin"
		]
	},
	mole: {
		symbol: "mol",
		dimension: "N",
		aliases: []
	},
	candela: {
		symbol: "cd",
		dimension: "J",
		aliases: []
	}
};

DERIVED_UNIT = {
	liter: {
		symbol: "L",
		equivalent: "dm^3",
		aliases: []
	},
	hertz: {
		symbol: "Hz",
		equivalent: "s^-1",
		aliases: [
			"Hertz"
		]
	},
	radian: {
		symbol: "rad",
		equivalent: "",
		aliases: []
	},
	steradian: {
		symbol: "sr",
		equivalent: "",
		aliases: []
	},
	newton: {
		symbol: "N",
		equivalent: "kg*m*s^-2",
		aliases: []
	},
	pascal: {
		symbol: "Pa",
		equivalent: "N*m^-2",
		aliases: []
	},
	joule: {
		symbol: "J",
		equivalent: "N*m",
		aliases: []
	},
	watt: {
		symbol: "W",
		equivalent: "J*s^-1",
		aliases: []
	},
	coulomb: {
		symbol: "C",
		equivalent: "s*A",
		aliases: []
	},
	volt: {
		symbol: "V",
		equivalent: "J*C^-1",
		aliases: []
	},
	farad: {
		symbol: "F",
		equivalent: "C*V^-1",
		aliases: []
	},
	ohm: {
		symbol: "\u03A9",
		equivalent: "V*A^-1",
		aliases: []
	},
	siemens: {
		symbol: "S",
		equivalent: "A*V^-1",
		aliases: []
	},
	weber: {
		symbol: "Wb",
		equivalent: "J*A^-1",
		aliases: []
	},
	tesla: {
		symbol: "T",
		equivalent: "Wb*m^-2",
		aliases: []
	},
	henry: {
		symbol: "H",
		equivalent: "Wb*A^-1",
		aliases: []
	},
	lumen: {
		symbol: "lm",
		equivalent: "cd*sr",
		aliases: []
	},
	lux: {
		symbol: "lx",
		equivalent: "lm*m^-2",
		aliases: []
	},
	becquerel: {
		symbol: "Bq",
		equivalent: "s^-1",
		aliases: []
	},
	gray: {
		symbol: "Gy",
		equivalent: "J*kg^-1",
		aliases: []
	},
	sievert: {
		symbol: "Sv",
		equivalent: "J*kg^-1",
		aliases: []
	},
	katal: {
		symbol: "kat",
		equivalent: "mol*s^-1",
		aliases: []
	}
};

CONVERSION = {
	// Time
	minute: {
		symbol: "min",
		conversion: {
			unit: "s",
			factor: "60",
			offset: 0
		},
		aliases: []
	},
	hour: {
		symbol: "hr",
		conversion: {
			unit: "s",
			factor: "3600",
			offset: 0
		},
		aliases: []
	},
	day: {
		symbol: "day",
		conversion: {
			unit: "s",
			factor: "86400",
			offset: 0
		},
		aliases: []
	},

	// Length
	mil: {
		symbol: "mil",
		conversion: {
			unit: "m",
			factor: "2.54e-5",
			offset: 0
		},
		aliases: []
	},
	inch: {
		symbol: "in",
		conversion: {
			unit: "m",
			factor: "0.0254",
			offset: 0
		},
		aliases: [
			"inches"
		]
	},
	foot: {
		symbol: "ft",
		conversion: {
			unit: "m",
			factor: "0.3048",
			offset: 0
		},
		aliases: [
			"feet"
		]
	},
	yard: {
		symbol: "yd",
		conversion: {
			unit: "m",
			factor: "0.9144",
			offset: 0
		},
		aliases: []
	},
	mile: {
		symbol: "mi",
		conversion: {
			unit: "m",
			factor: "1609.344",
			offset: 0
		},
		aliases: []
	},

	// Volume
	pint: {
		symbol: "pt",
		conversion: {
			unit: "L",
			factor: "0.473176473",
			offset: 0
		},
		aliases: []
	},
	quart: {
		symbol: "qt",
		conversion: {
			unit: "L",
			factor: "0.946352946",
			offset: 0
		},
		aliases: []
	},
	gallon: {
		symbol: "gal",
		conversion: {
			unit: "L",
			factor: "3.785411784",
			offset: 0
		},
		aliases: []
	},

	// Mass
	ounce: {
		symbol: "oz",
		conversion: {
			unit: "g",
			factor: "28.349523125",
			offset: 0
		},
		aliases: []
	},
	pound: {
		symbol: "lb",
		conversion: {
			unit: "g",
			factor: "453.59237",
			offset: 0
		},
		aliases: []
	},
	ton: {
		symbol: "ton",
		conversion: {
			unit: "g",
			factor: "907184.74",
			offset: 0
		},
		aliases: []
	},

	// Pressure
	bar: {
		symbol: "bar",
		conversion: {
			unit: "Pa",
			factor: "1e5",
			offset: 0
		},
		aliases: []
	},
	atmosphere: {
		symbol: "atm",
		conversion: {
			unit: "Pa",
			factor: "1.01325e5",
			offset: 0
		},
		aliases: []
	},
	torr: {
		symbol: "Torr",
		conversion: {
			unit: "Pa",
			factor: "133.3224",
			offset: 0
		},
		aliases: []
	},
	psi: {
		symbol: "psi",
		conversion: {
			unit: "Pa",
			factor: "6.8948e3",
			offset: 0
		},
		aliases: []
	},

	// Temperature
	Celsius: {
		symbol: "degC",
		conversion: {
			unit: "K",
			factor: "1",
			offset: "273.15"
		},
		aliases: []
	},
	Fahrenheit: {
		symbol: "degF",
		conversion: {
			unit: "K",
			factor: "0.55555555555556",
			offset: "255.372222222222"
		},
		aliases: []
	}
};
/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expression":3,"ng":4,"to":5,"u":6,"EOF":7,"+":8,"-":9,"*":10,"/":11,"^":12,"NUMBER":13,"(":14,")":15,"[":16,"]":17,"{":18,"}":19,"SEP":20,"UNIT":21,"$accept":0,"$end":1},
terminals_: {2:"error",5:"to",7:"EOF",8:"+",9:"-",10:"*",11:"/",12:"^",13:"NUMBER",14:"(",15:")",16:"[",17:"]",18:"{",19:"}",20:"SEP",21:"UNIT"},
productions_: [0,[3,4],[3,2],[3,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,2],[4,3],[4,3],[4,3],[4,3],[4,1],[6,3],[6,3],[6,3],[6,4],[6,3],[6,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
			return units_convert($$[$0-3], $$[$0-1]);
		
break;
case 2:
			return $$[$0-1];
		
break;
case 3:
			return units_convert({
				value: 1,
				unit: $$[$0-1]
			}).unit;
		
break;
case 4:
			this.$ = units_add($$[$0-2], $$[$0]);
		
break;
case 5:
			this.$ = units_subtract($$[$0-2], $$[$0]);
		
break;
case 6:
			this.$ = units_times($$[$0-2], $$[$0]);
		
break;
case 7:
			this.$ = units_divide($$[$0-2], $$[$0]);
		
break;
case 8:
			this.$ = units_power($$[$0-2], Number($$[$0]));
		
break;
case 9:
			this.$ = {
				value: -$$[$0].value,
				unit: $$[$0].unit
			};
		
break;
case 10:
			this.$ = $$[$0-1];
		
break;
case 11:
			this.$ = $$[$0-1];
		
break;
case 12:
			this.$ = $$[$0-1];
		
break;
case 13:
			this.$ = units_convert({
				value: Number($$[$0-2]),
				unit: $$[$0]
			});
		
break;
case 14:
			this.$ = {
				value: Number($$[$0]),
				unit: []
			};
		
break;
case 15:
			this.$ = units_udivide($$[$0-2], $$[$0]);
		
break;
case 16:
			this.$ = units_utimes($$[$0-2], $$[$0]);
		
break;
case 17:
			this.$ = units_upower($$[$0-2], Number($$[$0]));
		
break;
case 18:
			this.$ = units_upower($$[$0-3], -Number($$[$0]));
		
break;
case 19:
			this.$ = $$[$0-1];
		
break;
case 20:
			this.$ = units_parseUnit($$[$0]);
		
break;
}
},
table: [{3:1,4:2,6:3,9:[1,4],13:[1,8],14:[1,5],16:[1,6],18:[1,7],21:[1,9]},{1:[3]},{5:[1,10],7:[1,11],8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16]},{7:[1,17],10:[1,19],11:[1,18],12:[1,20]},{4:21,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{4:23,6:24,9:[1,4],13:[1,8],14:[1,5],16:[1,6],18:[1,7],21:[1,9]},{4:25,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{4:26,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{5:[2,14],7:[2,14],8:[2,14],9:[2,14],10:[2,14],11:[2,14],12:[2,14],15:[2,14],17:[2,14],19:[2,14],20:[1,27]},{5:[2,20],7:[2,20],8:[2,20],9:[2,20],10:[2,20],11:[2,20],12:[2,20],15:[2,20],17:[2,20],19:[2,20]},{6:28,14:[1,29],21:[1,9]},{1:[2,2]},{4:30,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{4:31,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{4:32,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{4:33,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{13:[1,34]},{1:[2,3]},{6:35,14:[1,29],21:[1,9]},{6:36,14:[1,29],21:[1,9]},{9:[1,38],13:[1,37]},{5:[2,9],7:[2,9],8:[2,9],9:[2,9],10:[2,9],11:[2,9],12:[1,16],15:[2,9],17:[2,9],19:[2,9]},{4:23,9:[1,4],13:[1,8],14:[1,22],16:[1,6],18:[1,7]},{8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],15:[1,39]},{10:[1,19],11:[1,18],12:[1,20],15:[1,40]},{8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],17:[1,41]},{8:[1,12],9:[1,13],10:[1,14],11:[1,15],12:[1,16],19:[1,42]},{6:43,14:[1,29],21:[1,9]},{7:[1,44],10:[1,19],11:[1,18],12:[1,20]},{6:24,14:[1,29],21:[1,9]},{5:[2,4],7:[2,4],8:[2,4],9:[2,4],10:[1,14],11:[1,15],12:[1,16],15:[2,4],17:[2,4],19:[2,4]},{5:[2,5],7:[2,5],8:[2,5],9:[2,5],10:[1,14],11:[1,15],12:[1,16],15:[2,5],17:[2,5],19:[2,5]},{5:[2,6],7:[2,6],8:[2,6],9:[2,6],10:[2,6],11:[2,6],12:[1,16],15:[2,6],17:[2,6],19:[2,6]},{5:[2,7],7:[2,7],8:[2,7],9:[2,7],10:[2,7],11:[2,7],12:[1,16],15:[2,7],17:[2,7],19:[2,7]},{5:[2,8],7:[2,8],8:[2,8],9:[2,8],10:[2,8],11:[2,8],12:[2,8],15:[2,8],17:[2,8],19:[2,8]},{5:[2,15],7:[2,15],8:[2,15],9:[2,15],10:[1,19],11:[1,18],12:[1,20],15:[2,15],17:[2,15],19:[2,15]},{5:[2,16],7:[2,16],8:[2,16],9:[2,16],10:[2,16],11:[2,16],12:[1,20],15:[2,16],17:[2,16],19:[2,16]},{5:[2,17],7:[2,17],8:[2,17],9:[2,17],10:[2,17],11:[2,17],12:[2,17],15:[2,17],17:[2,17],19:[2,17]},{13:[1,45]},{5:[2,10],7:[2,10],8:[2,10],9:[2,10],10:[2,10],11:[2,10],12:[2,10],15:[2,10],17:[2,10],19:[2,10]},{5:[2,19],7:[2,19],8:[2,19],9:[2,19],10:[2,19],11:[2,19],12:[2,19],15:[2,19],17:[2,19],19:[2,19]},{5:[2,11],7:[2,11],8:[2,11],9:[2,11],10:[2,11],11:[2,11],12:[2,11],15:[2,11],17:[2,11],19:[2,11]},{5:[2,12],7:[2,12],8:[2,12],9:[2,12],10:[2,12],11:[2,12],12:[2,12],15:[2,12],17:[2,12],19:[2,12]},{5:[2,13],7:[2,13],8:[2,13],9:[2,13],10:[1,19],11:[1,18],12:[1,20],15:[2,13],17:[2,13],19:[2,13]},{1:[2,1]},{5:[2,18],7:[2,18],8:[2,18],9:[2,18],10:[2,18],11:[2,18],12:[2,18],15:[2,18],17:[2,18],19:[2,18]}],
defaultActions: {11:[2,2],17:[2,3],44:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:// Ignore
break;
case 1:return 13
break;
case 2:return 10
break;
case 3:return 11
break;
case 4:return 9
break;
case 5:return 8
break;
case 6:return 12
break;
case 7:return 14
break;
case 8:return 15
break;
case 9:return 16
break;
case 10:return 17
break;
case 11:return 18
break;
case 12:return 19
break;
case 13:return 21
break;
case 14:return 5
break;
case 15:return 20
break;
case 16:return 7
break;
case 17:return 'INVALID'
break;
}
},
rules: [/^(?:\s*\n\s*)/,/^(?:[0-9]+(\.[0-9]+)?([eE][\+\-]?[0-9]+)?\b)/,/^(?:\s*\*\s*)/,/^(?:\s*\/\s*)/,/^(?:\s*-\s*)/,/^(?:\s*\+\s*)/,/^(?:\s*\^\s*)/,/^(?:\(\s*)/,/^(?:\s*\))/,/^(?:\[\s*)/,/^(?:\s*\])/,/^(?:\{\s*)/,/^(?:\s*\})/,/^(?:[A-Za-z]+)/,/^(?:\s+to\s+)/,/^(?:\s+)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();
var units = global.units = (global.module || {}).exports = function (expression) {
	return units_eval(expression);
};

/*
 * Arithmetic Operations
 */
var units_add = function (a, b) {
	if (!units_sameDimensions(a.unit, b.unit)) {
		throw new Error("Dimension mismatch. " + units_toUnitString(a.unit) + "  =/=>  " + units_toUnitString(b.unit));
	}
	return {
		value: a.value + b.value,
		unit: a.unit
	};
};
var units_subtract = function (a, b) {
	if (!units_sameDimensions(a.unit, b.unit)) {
		throw new Error("Dimension mismatch. " + units_toUnitString(a.unit) + "  =/=>  " + units_toUnitString(b.unit));
	}
	return {
		value: a.value - b.value,
		unit: a.unit
	};
};
var units_times = function (a, b) {
	return {
		value: a.value * b.value,
		unit: units_utimes(a.unit, b.unit)
	};
};
var units_divide = function (a, b) {
	return {
		value: a.value / b.value,
		unit: units_udivide(a.unit, b.unit)
	};
};
var units_power = function (a, n) {
	return {
		value: Math.pow(a.value, n),
		unit: units_upower(a.unit, n)
	};
};

/*
 * Unit arithmetic operations
 */
var units_utimes = function (a, b) {
	return a.concat(b);
};
var units_udivide = function (a, b) {
	var c = a.slice(0);
	b.forEach(function (u) {
		c.push({
			symbol: u.symbol,
			power: -u.power,
			prefix: u.prefix
		});
	});
	return c;
};
var units_upower = function (a, n) {
	var c = [];
	a.forEach(function (u) {
		c.push({
			symbol: u.symbol,
			power: u.power * n,
			prefix: u.prefix
		});
	});
	return c;
};

/*
 * Unit parsing
 */
var units_parseUnit = function (u) {
	var match, symbol, prefix = 0;

	match = RegExp("^" + NONSI_UNIT_NAME_LIST_REGEX + "$", "i").exec(u);
	if (match) {
		match = UNIT_MAP[match[1]];
		if (match) {
			symbol = match.symbol;
		}
	}
	if (!symbol) {
		match = RegExp("^" + NONSI_UNIT_SYMBOL_LIST_REGEX + "$").exec(u);
		if (match) {
			match = UNIT_MAP[match[1]];
			if (match) {
				symbol = match.symbol;
			}
		}
	}

	if (!symbol) {
		match = RegExp("^" + PREFIX_NAME_LIST_REGEX + "?" + SI_UNIT_NAME_LIST_REGEX + "$", "i").exec(u);
		if (match) {
			prefix = PREFIX_MAP[match[1]];
			match = UNIT_MAP[match[2]];
			if (match) {
				prefix = (prefix || {}).value || 0;
				symbol = match.symbol;
			}
		}
	}
	if (!symbol) {
		match = RegExp("^" + PREFIX_SYMBOL_LIST_REGEX + "?" + SI_UNIT_SYMBOL_LIST_REGEX + "$").exec(u);
		if (match) {
			prefix = PREFIX_MAP[match[1]];
			match = UNIT_MAP[match[2]];
			if (match) {
				prefix = (prefix || {}).value || 0;
				symbol = match.symbol;
			}
		}
	}

	if (!match || !symbol) {
		throw new Error("Invalid unit `" + u + "`");
	}

	return [{
		symbol: symbol,
		power: 1,
		prefix: prefix
	}];
};

/*
 * Unit conversion
 */
var units_convert = function (ng, u) {
	var conversion = units_conversion(ng.unit);
	var value = ng.value * conversion.factor * Math.pow(10, conversion.prefix) + conversion.offset;
	if (!u) {
		return {
			value: value,
			unit: conversion.si
		};
	}
	var to = units_conversion(u);
	if (!units_sameDimensions(conversion.si, to.si)) {
		throw new Error("Dimension mismatch. " + units_toUnitString(ng.unit) + "  =/=>  " + units_toUnitString(u));
	}
	return {
		value: (value - to.offset) / (to.factor * Math.pow(10, to.prefix)),
		unit: u
	};
};

/*
 * unit * factor = SI
 */
var units_conversion = function (u) {
	var si = {}, factor = 1,
		offset = 0,
		prefix = 0,
		dimensions;
	u.forEach(function (a) {
		var m = UNIT_MAP[a.symbol];
		switch (m.type) {
		case "derived":
			m.equivalent.forEach(function (e) {
				si[e.symbol] = (si[e.symbol] || 0) + a.power * e.power;
			});
			factor *= Math.pow(Number(m.factor), a.power);
			prefix += Number(m.prefix) * a.power;
			break;
		case "conversion":
			si[m.conversion.unit] = (si[m.conversion.unit] || 0) + a.power;
			if (a.power == 1 && u.length == 1) {
				offset += Number(m.conversion.offset);
			}
			factor *= Math.pow(Number(m.conversion.factor), a.power);
			break;
		case "base":
			si[a.symbol] = (si[a.symbol] || 0) + a.power;
			break;
		default:
			throw new Error("Invalid unit `" + a.symbol + "`");
		}
		prefix += a.prefix * a.power;
	});

	var si_array = [];
	Object.keys(si).forEach(function (s) {
		if (si[s] != 0) {
			si_array.push({
				symbol: s,
				power: si[s],
				prefix: 0
			});
		}
	});
	dimensions = units_dimensions(si_array);

	return {
		factor: factor,
		prefix: prefix,
		offset: offset,
		dimensions: dimensions,
		si: si_array
	};
};

/*
 * Unit dimensions (must be all SI base units)
 */
var units_dimensions = function (u) {
	var dim = {};
	u.forEach(function (a) {
		var m = UNIT_MAP[a.symbol];
		dim[m.dimension] = (dim[m.dimension] || 0) + a.power;
	});
	Object.keys(dim).forEach(function (d) {
		if (dim[d] == 0) {
			delete dim[d];
		}
	});
	return dim;
};

/*
 * Check if units have the same dimension (must be all SI base units)
 */
var units_sameDimensions = function (a, b) {
	a = units_dimensions(a);
	b = units_dimensions(b);

	var isSame = true;
	Object.keys(BASE_UNIT).forEach(function (k) {
		var d = BASE_UNIT[k].dimension;
		if (a[d] != b[d]) {
			isSame = false;
			return false;
		}
	});
	return isSame;
};

/*
 * Pretty printers
 */
var units_toString = function (ng) {
	var vstr = units_toValueString(ng.value);
	var ustr = units_toUnitString(ng.unit);
	if (ustr.indexOf("10^") == 0) {
		ustr = " * " + ustr;
	}
	return vstr + (ustr ? " " + ustr : "");
};
var units_toValueString = function (v) {
	return String(Number(Number(v).toPrecision(15)));
};
var units_toUnitString = function (u) {
	var m = {}, prefix = 0;
	u.forEach(function (e) {
		var s = e.symbol;
		var p = units_toPrefixString(e.prefix);
		if (!p) {
			var p_ = Math.round(e.prefix / 3) * 3;
			if (p_ > 27) {
				p_ = 27;
			} else if (p_ < -24) {
				p_ = -24;
			}
			prefix += e.prefix - p_;
			p = units_toPrefixString(p_);
		}
		m[p + s] = (m[p + s] || 0) + e.power;
	});

	var n = [],
		d = [];
	Object.keys(m).forEach(function (s) {
		if (m[s] > 0) {
			n.push({
				symbol: s,
				power: m[s]
			});
		} else if (m[s] < 0) {
			d.push({
				symbol: s,
				power: m[s]
			});
		}
	});
	n = n.sort(function (a, b) {
		if (a.power == b.power) {
			return a.symbol > b.symbol ? 1 : -1;
		} else {
			return a.power > b.power ? 1 : -1;
		}
	});
	d = d.sort(function (a, b) {
		if (a.power == b.power) {
			return a.symbol > b.symbol ? 1 : -1;
		} else {
			return a.power < b.power ? 1 : -1;
		}
	});

	var str = [];
	if (prefix != 0) {
		str.push("10^" + prefix);
		if (n.length > 0 || d.length > 0) {
			str.push(" ");
		}
	}

	if (n.length > 0) {
		if (n.length > 1 && d.length != 0) {
			str.push("(");
		}
		n.forEach(function (u, i) {
			if (i != 0) {
				str.push("*");
			}
			str.push(u.symbol);
			if (u.power != 1) {
				str.push("^" + u.power);
			}
		});
		if (n.length > 1 && d.length != 0) {
			str.push(")");
		}
	}
	if (d.length > 0) {
		if (n.length > 0) {
			str.push("/");
		}
		if (n.length > 0 && d.length > 1 && d.length != 0) {
			str.push("(");
		}
		d.forEach(function (u, i) {
			if (i != 0) {
				str.push("*");
			}
			str.push(u.symbol);
			if (n.length > 0) {
				if (u.power != -1) {
					str.push("^" + (-u.power));
				}
			} else {
				str.push("^" + u.power);
			}
		});
		if (n.length > 0 && d.length > 1 && d.length != 0) {
			str.push(")");
		}
	}

	return str.join("");
};
var units_toPrefixString = function (p) {
	return (PREFIX_NUMBER_MAP[Number(p)] || {}).symbol;
};

/*
 * Handle gram to kilogram prefix issue
 */
var units_fixKilogram = function (e) {
	if (e.unit) {
		e.unit.forEach(function (u) {
			if (u.symbol == "g" && u.prefix == 0) {
				u.prefix = 3;
				e.value /= Math.pow(10, u.power * 3);
			}
		});
	} else {
		// Just units
		e.forEach(function (u) {
			if (u.symbol == "g" && u.prefix == 0) {
				u.prefix = 3;
			}
		});
	}

	return e;
};

/*
 * Eval
 */
var units_eval = function (expression) {
	var out = parser.parse(expression);
	out = units_fixKilogram(out);

	if (out.unit) {
		out.toString = function () {
			return units_toString(out);
		};
		out.toValueString = function () {
			return units_toValueString(out.value);
		};
		out.toUnitString = function () {
			return units_toUnitString(out.unit);
		};
		out.toJSONString = function () {
			return '{"value":' + out.toValueString() + ',"unit":"' + out.toUnitString() + '"}';
		};
	} else {
		// Just units
		out.toString = function () {
			return out.toUnitString();
		};
		out.toUnitString = function () {
			return units_toUnitString(out);
		};
		out.toJSONString = function () {
			return '"' + out.toUnitString() + '"';
		};
	}
	return out;
};
/*
 * DERIVED DEFINITIONS
 */
var SI_UNIT_SYMBOL_LIST, SI_UNIT_NAME_LIST, NONSI_UNIT_SYMBOL_LIST, NONSI_UNIT_NAME_LIST, PREFIX_SYMBOL_LIST, PREFIX_NAME_LIST,
	SI_UNIT_SYMBOL_LIST_REGEX, SI_UNIT_NAME_LIST_REGEX, NONSI_UNIT_SYMBOL_LIST_REGEX, NONSI_UNIT_NAME_LIST_REGEX, PREFIX_SYMBOL_LIST_REGEX, PREFIX_NAME_LIST_REGEX,
	PREFIX_MAP, PREFIX_NUMBER_MAP, UNIT_MAP;

SI_UNIT_SYMBOL_LIST = (function () {
	var list = [];
	Object.keys(BASE_UNIT).forEach(function (key) {
		list.push(BASE_UNIT[key].symbol);
	});
	Object.keys(DERIVED_UNIT).forEach(function (key) {
		list.push(DERIVED_UNIT[key].symbol);
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();
SI_UNIT_NAME_LIST = (function () {
	var list = [];
	Object.keys(BASE_UNIT).forEach(function (key) {
		list.push(key);
		list.push.apply(list, BASE_UNIT[key].aliases);
	});
	Object.keys(DERIVED_UNIT).forEach(function (key) {
		list.push(key);
		list.push.apply(list, DERIVED_UNIT[key].aliases);
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();

NONSI_UNIT_SYMBOL_LIST = (function () {
	var list = [];
	Object.keys(CONVERSION).forEach(function (key) {
		list.push(CONVERSION[key].symbol);
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();
NONSI_UNIT_NAME_LIST = (function () {
	var list = [];
	Object.keys(CONVERSION).forEach(function (key) {
		list.push(key);
		list.push.apply(list, CONVERSION[key].aliases);
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();

PREFIX_SYMBOL_LIST = (function () {
	var list = [];
	Object.keys(PREFIXES).forEach(function (key) {
		if (key === "base") {
			return;
		}
		list.push(PREFIXES[key].symbol);
		list.push.apply(list, PREFIXES[key].aliases);
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();
PREFIX_NAME_LIST = (function () {
	var list = [];
	Object.keys(PREFIXES).forEach(function (key) {
		if (key === "base") {
			return;
		}
		list.push.call(list, key, key[0].toUpperCase() + key.substr(1));
	});
	list.sort(function (a, b) {
		return a.length > b.length ? -1 : 1;
	});
	return list;
})();

SI_UNIT_SYMBOL_LIST_REGEX = "(" + SI_UNIT_SYMBOL_LIST.join("|") + ")";
SI_UNIT_NAME_LIST_REGEX = "(" + SI_UNIT_NAME_LIST.join("|") + ")";
NONSI_UNIT_SYMBOL_LIST_REGEX = "(" + NONSI_UNIT_SYMBOL_LIST.join("|") + ")";
NONSI_UNIT_NAME_LIST_REGEX = "(" + NONSI_UNIT_NAME_LIST.join("|") + ")";
PREFIX_SYMBOL_LIST_REGEX = "(" + PREFIX_SYMBOL_LIST.join("|") + ")";
PREFIX_NAME_LIST_REGEX = "(" + PREFIX_NAME_LIST.join("|") + ")";

PREFIX_MAP = (function () {
	var map = {};
	Object.keys(PREFIXES).forEach(function (key) {
		var i, l = (PREFIXES[key].aliases || []).length;
		PREFIXES[key].type = "prefix";
		map[key] = PREFIXES[key];
		map[PREFIXES[key].symbol] = PREFIXES[key];
		for (i = 0; i < l; i++) {
			map[PREFIXES[key].aliases[i]] = PREFIXES[key];
		}
	});
	return map;
})();
PREFIX_NUMBER_MAP = (function () {
	var map = {};
	Object.keys(PREFIXES).forEach(function (key) {
		map[PREFIXES[key].value] = PREFIXES[key];
	});
	return map;
})();

UNIT_MAP = (function () {
	var map = {};
	Object.keys(BASE_UNIT).forEach(function (key) {
		var i, l = (BASE_UNIT[key].aliases || []).length;
		BASE_UNIT[key].type = "base";
		map[key] = BASE_UNIT[key];
		map[BASE_UNIT[key].symbol] = BASE_UNIT[key];
		for (i = 0; i < l; i++) {
			map[BASE_UNIT[key].aliases[i]] = BASE_UNIT[key];
		}
	});
	Object.keys(DERIVED_UNIT).forEach(function (key) {
		var i, l = (DERIVED_UNIT[key].aliases || []).length;
		DERIVED_UNIT[key].type = "derived";
		map[key] = DERIVED_UNIT[key];
		map[DERIVED_UNIT[key].symbol] = DERIVED_UNIT[key];
		for (i = 0; i < l; i++) {
			map[DERIVED_UNIT[key].aliases[i]] = DERIVED_UNIT[key];
		}
	});
	Object.keys(CONVERSION).forEach(function (key) {
		var i, l = (CONVERSION[key].aliases || []).length;
		CONVERSION[key].type = "conversion";
		map[key] = CONVERSION[key];
		map[CONVERSION[key].symbol] = CONVERSION[key];
		for (i = 0; i < l; i++) {
			map[CONVERSION[key].aliases[i]] = CONVERSION[key];
		}
	});
	return map;
})();


/*
 * Expand Derived Units
 */
Object.keys(DERIVED_UNIT).forEach(function (key) {
	if (DERIVED_UNIT[key].equivalent == "") {
		DERIVED_UNIT[key].equivalent = [];
	} else {
		var u = parser.parse("1 " + DERIVED_UNIT[key].equivalent);
		DERIVED_UNIT[key].equivalent = u.unit;
		DERIVED_UNIT[key].factor = u.value;
	}
	DERIVED_UNIT[key].prefix = 0;
});

// Expand derived^n units
var hasDerived = true;
while (hasDerived) {
	hasDerived = false;
	Object.keys(DERIVED_UNIT).forEach(function (key) {
		var factor = DERIVED_UNIT[key].factor;
		var equiv = DERIVED_UNIT[key].equivalent;
		var prefix = DERIVED_UNIT[key].prefix;
		var e, m, md, i, l = equiv.length;
		for (i = 0; i < l; i++) {
			e = equiv[i];
			m = UNIT_MAP[e.symbol];
			if (m.type == "derived") {
				hasDerived = true;
				equiv.splice(i, 1);
				i--;
				l--;

				md = UNIT_MAP[m.symbol];
				md.equivalent.forEach(function (mde) {
					equiv.push({
						power: mde.power * e.power,
						prefix: mde.prefix,
						symbol: mde.symbol
					});
					l++;
				});
				prefix += (e.prefix + md.prefix) * e.power;
				factor *= Math.pow(Number(e.factor), e.power);
			}
		}

		// Simplify
		var umap = {}, um;
		for (i = 0; i < l; i++) {
			e = equiv[i];
			um = umap[e.symbol] || {
				power: 0,
				prefix: 0,
				symbol: e.symbol
			};
			um.power += e.power;
			prefix += e.prefix * e.power;
			umap[e.symbol] = um;
		}

		equiv = [];
		Object.keys(umap).forEach(function (k) {
			um = umap[k];
			if (um.power != 0) {
				equiv.push(umap[k]);
			}
		});
		DERIVED_UNIT[key].equivalent = equiv;
		DERIVED_UNIT[key].factor = factor;
		DERIVED_UNIT[key].prefix = prefix;
	});
}
})(this);