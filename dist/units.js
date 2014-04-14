/*! units.js 13-04-2014 */
!function(global) {
    var PREFIXES, BASE_UNIT, DERIVED_UNIT, CONVERSION, parser = function() {
        function Parser() {
            this.yy = {};
        }
        var parser = {
            trace: function() {},
            yy: {},
            symbols_: {
                error: 2,
                expression: 3,
                ng: 4,
                "in": 5,
                u: 6,
                EOF: 7,
                "+": 8,
                "-": 9,
                "*": 10,
                "/": 11,
                "^": 12,
                n: 13,
                "(": 14,
                ")": 15,
                "[": 16,
                "]": 17,
                "{": 18,
                "}": 19,
                NUMBER: 20,
                SEP: 21,
                UNIT: 22,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "in",
                7: "EOF",
                8: "+",
                9: "-",
                10: "*",
                11: "/",
                12: "^",
                13: "n",
                14: "(",
                15: ")",
                16: "[",
                17: "]",
                18: "{",
                19: "}",
                20: "NUMBER",
                21: "SEP",
                22: "UNIT"
            },
            productions_: [ 0, [ 3, 4 ], [ 3, 2 ], [ 3, 2 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 1 ], [ 6, 3 ], [ 6, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 3 ], [ 6, 1 ] ],
            performAction: function(yytext, yyleng, yylineno, yy, yystate, $$) {
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    return units._convert($$[$0 - 3], $$[$0 - 1]);

                  case 2:
                    return $$[$0 - 1];

                  case 3:
                    return units._convert({
                        value: 1,
                        unit: $$[$0 - 1]
                    }).unit;

                  case 4:
                    this.$ = units._add($$[$0 - 2], $$[$0]);
                    break;

                  case 5:
                    this.$ = units._subtract($$[$0 - 2], $$[$0]);
                    break;

                  case 6:
                    this.$ = units._times($$[$0 - 2], $$[$0]);
                    break;

                  case 7:
                    this.$ = units._divide($$[$0 - 2], $$[$0]);
                    break;

                  case 8:
                    this.$ = units._power($$[$0 - 2], $$[$0]);
                    break;

                  case 9:
                    this.$ = {
                        value: -$$[$0].value,
                        unit: $$[$0].unit
                    };
                    break;

                  case 10:
                    this.$ = $$[$0 - 1];
                    break;

                  case 11:
                    this.$ = $$[$0 - 1];
                    break;

                  case 12:
                    this.$ = $$[$0 - 1];
                    break;

                  case 13:
                    this.$ = units._convert({
                        value: Number($$[$0 - 2]),
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
                    this.$ = units._udivide($$[$0 - 2], $$[$0]);
                    break;

                  case 16:
                    this.$ = units._utimes($$[$0 - 2], $$[$0]);
                    break;

                  case 17:
                    this.$ = units._upower($$[$0 - 2], Number($$[$0]));
                    break;

                  case 18:
                    this.$ = units._upower($$[$0 - 3], -Number($$[$0]));
                    break;

                  case 19:
                    this.$ = $$[$0 - 1];
                    break;

                  case 20:
                    this.$ = units._parseUnit($$[$0]);
                }
            },
            table: [ {
                3: 1,
                4: 2,
                6: 3,
                9: [ 1, 4 ],
                14: [ 1, 5 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ],
                22: [ 1, 9 ]
            }, {
                1: [ 3 ]
            }, {
                5: [ 1, 10 ],
                7: [ 1, 11 ],
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ]
            }, {
                7: [ 1, 17 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ]
            }, {
                4: 21,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 23,
                6: 24,
                9: [ 1, 4 ],
                14: [ 1, 5 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ],
                22: [ 1, 9 ]
            }, {
                4: 25,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 26,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                5: [ 2, 14 ],
                7: [ 2, 14 ],
                8: [ 2, 14 ],
                9: [ 2, 14 ],
                10: [ 2, 14 ],
                11: [ 2, 14 ],
                12: [ 2, 14 ],
                15: [ 2, 14 ],
                17: [ 2, 14 ],
                19: [ 2, 14 ],
                21: [ 1, 27 ]
            }, {
                5: [ 2, 20 ],
                7: [ 2, 20 ],
                8: [ 2, 20 ],
                9: [ 2, 20 ],
                10: [ 2, 20 ],
                11: [ 2, 20 ],
                12: [ 2, 20 ],
                15: [ 2, 20 ],
                17: [ 2, 20 ],
                19: [ 2, 20 ]
            }, {
                6: 28,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                1: [ 2, 2 ]
            }, {
                4: 30,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 31,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 32,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 33,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                13: [ 1, 34 ]
            }, {
                1: [ 2, 3 ]
            }, {
                6: 35,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                6: 36,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                9: [ 1, 38 ],
                20: [ 1, 37 ]
            }, {
                5: [ 2, 9 ],
                7: [ 2, 9 ],
                8: [ 2, 9 ],
                9: [ 2, 9 ],
                10: [ 2, 9 ],
                11: [ 2, 9 ],
                12: [ 1, 16 ],
                15: [ 2, 9 ],
                17: [ 2, 9 ],
                19: [ 2, 9 ]
            }, {
                4: 23,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 1, 39 ]
            }, {
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 1, 40 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                17: [ 1, 41 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                19: [ 1, 42 ]
            }, {
                6: 43,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                7: [ 1, 44 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ]
            }, {
                6: 24,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                5: [ 2, 4 ],
                7: [ 2, 4 ],
                8: [ 2, 4 ],
                9: [ 2, 4 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 2, 4 ],
                17: [ 2, 4 ],
                19: [ 2, 4 ]
            }, {
                5: [ 2, 5 ],
                7: [ 2, 5 ],
                8: [ 2, 5 ],
                9: [ 2, 5 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 2, 5 ],
                17: [ 2, 5 ],
                19: [ 2, 5 ]
            }, {
                5: [ 2, 6 ],
                7: [ 2, 6 ],
                8: [ 2, 6 ],
                9: [ 2, 6 ],
                10: [ 2, 6 ],
                11: [ 2, 6 ],
                12: [ 1, 16 ],
                15: [ 2, 6 ],
                17: [ 2, 6 ],
                19: [ 2, 6 ]
            }, {
                5: [ 2, 7 ],
                7: [ 2, 7 ],
                8: [ 2, 7 ],
                9: [ 2, 7 ],
                10: [ 2, 7 ],
                11: [ 2, 7 ],
                12: [ 1, 16 ],
                15: [ 2, 7 ],
                17: [ 2, 7 ],
                19: [ 2, 7 ]
            }, {
                5: [ 2, 8 ],
                7: [ 2, 8 ],
                8: [ 2, 8 ],
                9: [ 2, 8 ],
                10: [ 2, 8 ],
                11: [ 2, 8 ],
                12: [ 2, 8 ],
                15: [ 2, 8 ],
                17: [ 2, 8 ],
                19: [ 2, 8 ]
            }, {
                5: [ 2, 15 ],
                7: [ 2, 15 ],
                8: [ 2, 15 ],
                9: [ 2, 15 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 2, 15 ],
                17: [ 2, 15 ],
                19: [ 2, 15 ]
            }, {
                5: [ 2, 16 ],
                7: [ 2, 16 ],
                8: [ 2, 16 ],
                9: [ 2, 16 ],
                10: [ 2, 16 ],
                11: [ 2, 16 ],
                12: [ 1, 20 ],
                15: [ 2, 16 ],
                17: [ 2, 16 ],
                19: [ 2, 16 ]
            }, {
                5: [ 2, 17 ],
                7: [ 2, 17 ],
                8: [ 2, 17 ],
                9: [ 2, 17 ],
                10: [ 2, 17 ],
                11: [ 2, 17 ],
                12: [ 2, 17 ],
                15: [ 2, 17 ],
                17: [ 2, 17 ],
                19: [ 2, 17 ]
            }, {
                20: [ 1, 45 ]
            }, {
                5: [ 2, 10 ],
                7: [ 2, 10 ],
                8: [ 2, 10 ],
                9: [ 2, 10 ],
                10: [ 2, 10 ],
                11: [ 2, 10 ],
                12: [ 2, 10 ],
                15: [ 2, 10 ],
                17: [ 2, 10 ],
                19: [ 2, 10 ]
            }, {
                5: [ 2, 19 ],
                7: [ 2, 19 ],
                8: [ 2, 19 ],
                9: [ 2, 19 ],
                10: [ 2, 19 ],
                11: [ 2, 19 ],
                12: [ 2, 19 ],
                15: [ 2, 19 ],
                17: [ 2, 19 ],
                19: [ 2, 19 ]
            }, {
                5: [ 2, 11 ],
                7: [ 2, 11 ],
                8: [ 2, 11 ],
                9: [ 2, 11 ],
                10: [ 2, 11 ],
                11: [ 2, 11 ],
                12: [ 2, 11 ],
                15: [ 2, 11 ],
                17: [ 2, 11 ],
                19: [ 2, 11 ]
            }, {
                5: [ 2, 12 ],
                7: [ 2, 12 ],
                8: [ 2, 12 ],
                9: [ 2, 12 ],
                10: [ 2, 12 ],
                11: [ 2, 12 ],
                12: [ 2, 12 ],
                15: [ 2, 12 ],
                17: [ 2, 12 ],
                19: [ 2, 12 ]
            }, {
                5: [ 2, 13 ],
                7: [ 2, 13 ],
                8: [ 2, 13 ],
                9: [ 2, 13 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 2, 13 ],
                17: [ 2, 13 ],
                19: [ 2, 13 ]
            }, {
                1: [ 2, 1 ]
            }, {
                5: [ 2, 18 ],
                7: [ 2, 18 ],
                8: [ 2, 18 ],
                9: [ 2, 18 ],
                10: [ 2, 18 ],
                11: [ 2, 18 ],
                12: [ 2, 18 ],
                15: [ 2, 18 ],
                17: [ 2, 18 ],
                19: [ 2, 18 ]
            } ],
            defaultActions: {
                11: [ 2, 2 ],
                17: [ 2, 3 ],
                44: [ 2, 1 ]
            },
            parseError: function(str, hash) {
                if (!hash.recoverable) throw new Error(str);
                this.trace(str);
            },
            parse: function(input) {
                function lex() {
                    var token;
                    return token = self.lexer.lex() || EOF, "number" != typeof token && (token = self.symbols_[token] || token), 
                    token;
                }
                var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1, args = lstack.slice.call(arguments, 1);
                this.lexer.setInput(input), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, 
                this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                var ranges = this.lexer.options && this.lexer.options.ranges;
                this.parseError = "function" == typeof this.yy.parseError ? this.yy.parseError : Object.getPrototypeOf(this).parseError;
                for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, yyval = {}; ;) {
                    if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : ((null === symbol || "undefined" == typeof symbol) && (symbol = lex()), 
                    action = table[state] && table[state][symbol]), "undefined" == typeof action || !action.length || !action[0]) {
                        var errStr = "";
                        expected = [];
                        for (p in table[state]) this.terminals_[p] && p > TERROR && expected.push("'" + this.terminals_[p] + "'");
                        errStr = this.lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), 
                        this.parseError(errStr, {
                            text: this.lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: this.lexer.yylineno,
                            loc: yyloc,
                            expected: expected
                        });
                    }
                    if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                    switch (action[0]) {
                      case 1:
                        stack.push(symbol), vstack.push(this.lexer.yytext), lstack.push(this.lexer.yylloc), 
                        stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, 
                        preErrorSymbol = null) : (yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, 
                        yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, recovering > 0 && recovering--);
                        break;

                      case 2:
                        if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], 
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        }, ranges && (yyval._$.range = [ lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1] ]), 
                        r = this.performAction.apply(yyval, [ yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack ].concat(args)), 
                        "undefined" != typeof r) return r;
                        len && (stack = stack.slice(0, -1 * len * 2), vstack = vstack.slice(0, -1 * len), 
                        lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), 
                        vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], 
                        stack.push(newState);
                        break;

                      case 3:
                        return !0;
                    }
                }
                return !0;
            }
        }, lexer = function() {
            var lexer = {
                EOF: 1,
                parseError: function(str, hash) {
                    if (!this.yy.parser) throw new Error(str);
                    this.yy.parser.parseError(str, hash);
                },
                setInput: function(input) {
                    return this._input = input, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, 
                    this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
                    this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                    }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
                },
                input: function() {
                    var ch = this._input[0];
                    this.yytext += ch, this.yyleng++, this.offset++, this.match += ch, this.matched += ch;
                    var lines = ch.match(/(?:\r\n?|\n).*/g);
                    return lines ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
                    this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
                    ch;
                },
                unput: function(ch) {
                    var len = ch.length, lines = ch.split(/(?:\r\n?|\n)/g);
                    this._input = ch + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - len - 1), 
                    this.offset -= len;
                    var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
                    lines.length - 1 && (this.yylineno -= lines.length - 1);
                    var r = this.yylloc.range;
                    return this.yylloc = {
                        first_line: this.yylloc.first_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.first_column,
                        last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                    }, this.options.ranges && (this.yylloc.range = [ r[0], r[0] + this.yyleng - len ]), 
                    this.yyleng = this.yytext.length, this;
                },
                more: function() {
                    return this._more = !0, this;
                },
                reject: function() {
                    return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                },
                less: function(n) {
                    this.unput(this.match.slice(n));
                },
                pastInput: function() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                    var next = this.match;
                    return next.length < 20 && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                    var pre = this.pastInput(), c = new Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                },
                test_match: function(match, indexed_rule) {
                    var token, lines, backup;
                    if (this.options.backtrack_lexer && (backup = {
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
                    }, this.options.ranges && (backup.yylloc.range = this.yylloc.range.slice(0))), lines = match[0].match(/(?:\r\n?|\n).*/g), 
                    lines && (this.yylineno += lines.length), this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                    }, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, 
                    this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
                    this._more = !1, this._backtrack = !1, this._input = this._input.slice(match[0].length), 
                    this.matched += match[0], token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]), 
                    this.done && this._input && (this.done = !1), token) return token;
                    if (this._backtrack) {
                        for (var k in backup) this[k] = backup[k];
                        return !1;
                    }
                    return !1;
                },
                next: function() {
                    if (this.done) return this.EOF;
                    this._input || (this.done = !0);
                    var token, match, tempMatch, index;
                    this._more || (this.yytext = "", this.match = "");
                    for (var rules = this._currentRules(), i = 0; i < rules.length; i++) if (tempMatch = this._input.match(this.rules[rules[i]]), 
                    tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        if (match = tempMatch, index = i, this.options.backtrack_lexer) {
                            if (token = this.test_match(tempMatch, rules[i]), token !== !1) return token;
                            if (this._backtrack) {
                                match = !1;
                                continue;
                            }
                            return !1;
                        }
                        if (!this.options.flex) break;
                    }
                    return match ? (token = this.test_match(match, rules[index]), token !== !1 ? token : !1) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                },
                lex: function() {
                    var r = this.next();
                    return r ? r : this.lex();
                },
                begin: function(condition) {
                    this.conditionStack.push(condition);
                },
                popState: function() {
                    var n = this.conditionStack.length - 1;
                    return n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
                },
                _currentRules: function() {
                    return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
                },
                topState: function(n) {
                    return n = this.conditionStack.length - 1 - Math.abs(n || 0), n >= 0 ? this.conditionStack[n] : "INITIAL";
                },
                pushState: function(condition) {
                    this.begin(condition);
                },
                stateStackSize: function() {
                    return this.conditionStack.length;
                },
                options: {},
                performAction: function(yy, yy_, $avoiding_name_collisions, YY_START) {
                    switch ($avoiding_name_collisions) {
                      case 0:
                        break;

                      case 1:
                        return 20;

                      case 2:
                        return 10;

                      case 3:
                        return 11;

                      case 4:
                        return 9;

                      case 5:
                        return 8;

                      case 6:
                        return 12;

                      case 7:
                        return 14;

                      case 8:
                        return 15;

                      case 9:
                        return 16;

                      case 10:
                        return 17;

                      case 11:
                        return 18;

                      case 12:
                        return 19;

                      case 13:
                        return 22;

                      case 14:
                        return 5;

                      case 15:
                        return 21;

                      case 16:
                        return 7;

                      case 17:
                        return "INVALID";
                    }
                },
                rules: [ /^(?:\s*\n\s*)/, /^(?:[0-9]+(\.[0-9]+)?\b)/, /^(?:\s*\*\s*)/, /^(?:\s*\/\s*)/, /^(?:\s*-\s*)/, /^(?:\s*\+\s*)/, /^(?:\s*\^\s*)/, /^(?:\(\s*)/, /^(?:\s*\))/, /^(?:\[\s*)/, /^(?:\s*\])/, /^(?:\{\s*)/, /^(?:\s*\})/, /^(?:[A-Za-z]+)/, /^(?:\s+in\s+)/, /^(?:\s+)/, /^(?:$)/, /^(?:.)/ ],
                conditions: {
                    INITIAL: {
                        rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
                        inclusive: !0
                    }
                }
            };
            return lexer;
        }();
        return parser.lexer = lexer, Parser.prototype = parser, parser.Parser = Parser, 
        new Parser();
    }();
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
            aliases: [ "K" ]
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
    }, BASE_UNIT = {
        meter: {
            symbol: "m",
            dimension: "L",
            aliases: [ "metre" ]
        },
        gram: {
            symbol: "g",
            dimension: "M",
            aliases: []
        },
        second: {
            symbol: "s",
            dimension: "T",
            aliases: [ "sec" ]
        },
        ampere: {
            symbol: "A",
            dimension: "I",
            aliases: [ "amp", "Amp", "Ampere" ]
        },
        kelvin: {
            symbol: "K",
            dimension: "Θ",
            aliases: [ "Kelvin" ]
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
    }, DERIVED_UNIT = {
        liter: {
            symbol: "L",
            equivalent: "dm^3",
            aliases: []
        },
        hertz: {
            symbol: "Hz",
            equivalent: "s^-1",
            aliases: [ "Hertz" ]
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
            symbol: "Ω",
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
    }, CONVERSION = {
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
            aliases: [ "inches" ]
        },
        foot: {
            symbol: "ft",
            conversion: {
                unit: "m",
                factor: "0.3048",
                offset: 0
            },
            aliases: [ "feet" ]
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
    var SI_UNIT_SYMBOL_LIST, SI_UNIT_NAME_LIST, NONSI_UNIT_SYMBOL_LIST, NONSI_UNIT_NAME_LIST, PREFIX_SYMBOL_LIST, PREFIX_NAME_LIST, SI_UNIT_SYMBOL_LIST_REGEX, SI_UNIT_NAME_LIST_REGEX, NONSI_UNIT_SYMBOL_LIST_REGEX, NONSI_UNIT_NAME_LIST_REGEX, PREFIX_SYMBOL_LIST_REGEX, PREFIX_NAME_LIST_REGEX, PREFIX_MAP, PREFIX_NUMBER_MAP, UNIT_MAP, parser = function() {
        function Parser() {
            this.yy = {};
        }
        var parser = {
            trace: function() {},
            yy: {},
            symbols_: {
                error: 2,
                expression: 3,
                ng: 4,
                "in": 5,
                u: 6,
                EOF: 7,
                "+": 8,
                "-": 9,
                "*": 10,
                "/": 11,
                "^": 12,
                n: 13,
                "(": 14,
                ")": 15,
                "[": 16,
                "]": 17,
                "{": 18,
                "}": 19,
                NUMBER: 20,
                SEP: 21,
                UNIT: 22,
                $accept: 0,
                $end: 1
            },
            terminals_: {
                2: "error",
                5: "in",
                7: "EOF",
                8: "+",
                9: "-",
                10: "*",
                11: "/",
                12: "^",
                13: "n",
                14: "(",
                15: ")",
                16: "[",
                17: "]",
                18: "{",
                19: "}",
                20: "NUMBER",
                21: "SEP",
                22: "UNIT"
            },
            productions_: [ 0, [ 3, 4 ], [ 3, 2 ], [ 3, 2 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 2 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 3 ], [ 4, 1 ], [ 6, 3 ], [ 6, 3 ], [ 6, 3 ], [ 6, 4 ], [ 6, 3 ], [ 6, 1 ] ],
            performAction: function(yytext, yyleng, yylineno, yy, yystate, $$) {
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    return units_convert($$[$0 - 3], $$[$0 - 1]);

                  case 2:
                    return $$[$0 - 1];

                  case 3:
                    return units_convert({
                        value: 1,
                        unit: $$[$0 - 1]
                    }).unit;

                  case 4:
                    this.$ = units_add($$[$0 - 2], $$[$0]);
                    break;

                  case 5:
                    this.$ = units_subtract($$[$0 - 2], $$[$0]);
                    break;

                  case 6:
                    this.$ = units_times($$[$0 - 2], $$[$0]);
                    break;

                  case 7:
                    this.$ = units_divide($$[$0 - 2], $$[$0]);
                    break;

                  case 8:
                    this.$ = units_power($$[$0 - 2], $$[$0]);
                    break;

                  case 9:
                    this.$ = {
                        value: -$$[$0].value,
                        unit: $$[$0].unit
                    };
                    break;

                  case 10:
                    this.$ = $$[$0 - 1];
                    break;

                  case 11:
                    this.$ = $$[$0 - 1];
                    break;

                  case 12:
                    this.$ = $$[$0 - 1];
                    break;

                  case 13:
                    this.$ = units_convert({
                        value: Number($$[$0 - 2]),
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
                    this.$ = units_udivide($$[$0 - 2], $$[$0]);
                    break;

                  case 16:
                    this.$ = units_utimes($$[$0 - 2], $$[$0]);
                    break;

                  case 17:
                    this.$ = units_upower($$[$0 - 2], Number($$[$0]));
                    break;

                  case 18:
                    this.$ = units_upower($$[$0 - 3], -Number($$[$0]));
                    break;

                  case 19:
                    this.$ = $$[$0 - 1];
                    break;

                  case 20:
                    this.$ = units_parseUnit($$[$0]);
                }
            },
            table: [ {
                3: 1,
                4: 2,
                6: 3,
                9: [ 1, 4 ],
                14: [ 1, 5 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ],
                22: [ 1, 9 ]
            }, {
                1: [ 3 ]
            }, {
                5: [ 1, 10 ],
                7: [ 1, 11 ],
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ]
            }, {
                7: [ 1, 17 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ]
            }, {
                4: 21,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 23,
                6: 24,
                9: [ 1, 4 ],
                14: [ 1, 5 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ],
                22: [ 1, 9 ]
            }, {
                4: 25,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 26,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                5: [ 2, 14 ],
                7: [ 2, 14 ],
                8: [ 2, 14 ],
                9: [ 2, 14 ],
                10: [ 2, 14 ],
                11: [ 2, 14 ],
                12: [ 2, 14 ],
                15: [ 2, 14 ],
                17: [ 2, 14 ],
                19: [ 2, 14 ],
                21: [ 1, 27 ]
            }, {
                5: [ 2, 20 ],
                7: [ 2, 20 ],
                8: [ 2, 20 ],
                9: [ 2, 20 ],
                10: [ 2, 20 ],
                11: [ 2, 20 ],
                12: [ 2, 20 ],
                15: [ 2, 20 ],
                17: [ 2, 20 ],
                19: [ 2, 20 ]
            }, {
                6: 28,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                1: [ 2, 2 ]
            }, {
                4: 30,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 31,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 32,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                4: 33,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                13: [ 1, 34 ]
            }, {
                1: [ 2, 3 ]
            }, {
                6: 35,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                6: 36,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                9: [ 1, 38 ],
                20: [ 1, 37 ]
            }, {
                5: [ 2, 9 ],
                7: [ 2, 9 ],
                8: [ 2, 9 ],
                9: [ 2, 9 ],
                10: [ 2, 9 ],
                11: [ 2, 9 ],
                12: [ 1, 16 ],
                15: [ 2, 9 ],
                17: [ 2, 9 ],
                19: [ 2, 9 ]
            }, {
                4: 23,
                9: [ 1, 4 ],
                14: [ 1, 22 ],
                16: [ 1, 6 ],
                18: [ 1, 7 ],
                20: [ 1, 8 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 1, 39 ]
            }, {
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 1, 40 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                17: [ 1, 41 ]
            }, {
                8: [ 1, 12 ],
                9: [ 1, 13 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                19: [ 1, 42 ]
            }, {
                6: 43,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                7: [ 1, 44 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ]
            }, {
                6: 24,
                14: [ 1, 29 ],
                22: [ 1, 9 ]
            }, {
                5: [ 2, 4 ],
                7: [ 2, 4 ],
                8: [ 2, 4 ],
                9: [ 2, 4 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 2, 4 ],
                17: [ 2, 4 ],
                19: [ 2, 4 ]
            }, {
                5: [ 2, 5 ],
                7: [ 2, 5 ],
                8: [ 2, 5 ],
                9: [ 2, 5 ],
                10: [ 1, 14 ],
                11: [ 1, 15 ],
                12: [ 1, 16 ],
                15: [ 2, 5 ],
                17: [ 2, 5 ],
                19: [ 2, 5 ]
            }, {
                5: [ 2, 6 ],
                7: [ 2, 6 ],
                8: [ 2, 6 ],
                9: [ 2, 6 ],
                10: [ 2, 6 ],
                11: [ 2, 6 ],
                12: [ 1, 16 ],
                15: [ 2, 6 ],
                17: [ 2, 6 ],
                19: [ 2, 6 ]
            }, {
                5: [ 2, 7 ],
                7: [ 2, 7 ],
                8: [ 2, 7 ],
                9: [ 2, 7 ],
                10: [ 2, 7 ],
                11: [ 2, 7 ],
                12: [ 1, 16 ],
                15: [ 2, 7 ],
                17: [ 2, 7 ],
                19: [ 2, 7 ]
            }, {
                5: [ 2, 8 ],
                7: [ 2, 8 ],
                8: [ 2, 8 ],
                9: [ 2, 8 ],
                10: [ 2, 8 ],
                11: [ 2, 8 ],
                12: [ 2, 8 ],
                15: [ 2, 8 ],
                17: [ 2, 8 ],
                19: [ 2, 8 ]
            }, {
                5: [ 2, 15 ],
                7: [ 2, 15 ],
                8: [ 2, 15 ],
                9: [ 2, 15 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 2, 15 ],
                17: [ 2, 15 ],
                19: [ 2, 15 ]
            }, {
                5: [ 2, 16 ],
                7: [ 2, 16 ],
                8: [ 2, 16 ],
                9: [ 2, 16 ],
                10: [ 2, 16 ],
                11: [ 2, 16 ],
                12: [ 1, 20 ],
                15: [ 2, 16 ],
                17: [ 2, 16 ],
                19: [ 2, 16 ]
            }, {
                5: [ 2, 17 ],
                7: [ 2, 17 ],
                8: [ 2, 17 ],
                9: [ 2, 17 ],
                10: [ 2, 17 ],
                11: [ 2, 17 ],
                12: [ 2, 17 ],
                15: [ 2, 17 ],
                17: [ 2, 17 ],
                19: [ 2, 17 ]
            }, {
                20: [ 1, 45 ]
            }, {
                5: [ 2, 10 ],
                7: [ 2, 10 ],
                8: [ 2, 10 ],
                9: [ 2, 10 ],
                10: [ 2, 10 ],
                11: [ 2, 10 ],
                12: [ 2, 10 ],
                15: [ 2, 10 ],
                17: [ 2, 10 ],
                19: [ 2, 10 ]
            }, {
                5: [ 2, 19 ],
                7: [ 2, 19 ],
                8: [ 2, 19 ],
                9: [ 2, 19 ],
                10: [ 2, 19 ],
                11: [ 2, 19 ],
                12: [ 2, 19 ],
                15: [ 2, 19 ],
                17: [ 2, 19 ],
                19: [ 2, 19 ]
            }, {
                5: [ 2, 11 ],
                7: [ 2, 11 ],
                8: [ 2, 11 ],
                9: [ 2, 11 ],
                10: [ 2, 11 ],
                11: [ 2, 11 ],
                12: [ 2, 11 ],
                15: [ 2, 11 ],
                17: [ 2, 11 ],
                19: [ 2, 11 ]
            }, {
                5: [ 2, 12 ],
                7: [ 2, 12 ],
                8: [ 2, 12 ],
                9: [ 2, 12 ],
                10: [ 2, 12 ],
                11: [ 2, 12 ],
                12: [ 2, 12 ],
                15: [ 2, 12 ],
                17: [ 2, 12 ],
                19: [ 2, 12 ]
            }, {
                5: [ 2, 13 ],
                7: [ 2, 13 ],
                8: [ 2, 13 ],
                9: [ 2, 13 ],
                10: [ 1, 19 ],
                11: [ 1, 18 ],
                12: [ 1, 20 ],
                15: [ 2, 13 ],
                17: [ 2, 13 ],
                19: [ 2, 13 ]
            }, {
                1: [ 2, 1 ]
            }, {
                5: [ 2, 18 ],
                7: [ 2, 18 ],
                8: [ 2, 18 ],
                9: [ 2, 18 ],
                10: [ 2, 18 ],
                11: [ 2, 18 ],
                12: [ 2, 18 ],
                15: [ 2, 18 ],
                17: [ 2, 18 ],
                19: [ 2, 18 ]
            } ],
            defaultActions: {
                11: [ 2, 2 ],
                17: [ 2, 3 ],
                44: [ 2, 1 ]
            },
            parseError: function(str, hash) {
                if (!hash.recoverable) throw new Error(str);
                this.trace(str);
            },
            parse: function(input) {
                function lex() {
                    var token;
                    return token = self.lexer.lex() || EOF, "number" != typeof token && (token = self.symbols_[token] || token), 
                    token;
                }
                var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1, args = lstack.slice.call(arguments, 1);
                this.lexer.setInput(input), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, 
                this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                var ranges = this.lexer.options && this.lexer.options.ranges;
                this.parseError = "function" == typeof this.yy.parseError ? this.yy.parseError : Object.getPrototypeOf(this).parseError;
                for (var symbol, preErrorSymbol, state, action, r, p, len, newState, expected, yyval = {}; ;) {
                    if (state = stack[stack.length - 1], this.defaultActions[state] ? action = this.defaultActions[state] : ((null === symbol || "undefined" == typeof symbol) && (symbol = lex()), 
                    action = table[state] && table[state][symbol]), "undefined" == typeof action || !action.length || !action[0]) {
                        var errStr = "";
                        expected = [];
                        for (p in table[state]) this.terminals_[p] && p > TERROR && expected.push("'" + this.terminals_[p] + "'");
                        errStr = this.lexer.showPosition ? "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'" : "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'"), 
                        this.parseError(errStr, {
                            text: this.lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: this.lexer.yylineno,
                            loc: yyloc,
                            expected: expected
                        });
                    }
                    if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                    switch (action[0]) {
                      case 1:
                        stack.push(symbol), vstack.push(this.lexer.yytext), lstack.push(this.lexer.yylloc), 
                        stack.push(action[1]), symbol = null, preErrorSymbol ? (symbol = preErrorSymbol, 
                        preErrorSymbol = null) : (yyleng = this.lexer.yyleng, yytext = this.lexer.yytext, 
                        yylineno = this.lexer.yylineno, yyloc = this.lexer.yylloc, recovering > 0 && recovering--);
                        break;

                      case 2:
                        if (len = this.productions_[action[1]][1], yyval.$ = vstack[vstack.length - len], 
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        }, ranges && (yyval._$.range = [ lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1] ]), 
                        r = this.performAction.apply(yyval, [ yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack ].concat(args)), 
                        "undefined" != typeof r) return r;
                        len && (stack = stack.slice(0, -1 * len * 2), vstack = vstack.slice(0, -1 * len), 
                        lstack = lstack.slice(0, -1 * len)), stack.push(this.productions_[action[1]][0]), 
                        vstack.push(yyval.$), lstack.push(yyval._$), newState = table[stack[stack.length - 2]][stack[stack.length - 1]], 
                        stack.push(newState);
                        break;

                      case 3:
                        return !0;
                    }
                }
                return !0;
            }
        }, lexer = function() {
            var lexer = {
                EOF: 1,
                parseError: function(str, hash) {
                    if (!this.yy.parser) throw new Error(str);
                    this.yy.parser.parseError(str, hash);
                },
                setInput: function(input) {
                    return this._input = input, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, 
                    this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
                    this.yylloc = {
                        first_line: 1,
                        first_column: 0,
                        last_line: 1,
                        last_column: 0
                    }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
                },
                input: function() {
                    var ch = this._input[0];
                    this.yytext += ch, this.yyleng++, this.offset++, this.match += ch, this.matched += ch;
                    var lines = ch.match(/(?:\r\n?|\n).*/g);
                    return lines ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
                    this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
                    ch;
                },
                unput: function(ch) {
                    var len = ch.length, lines = ch.split(/(?:\r\n?|\n)/g);
                    this._input = ch + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - len - 1), 
                    this.offset -= len;
                    var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
                    lines.length - 1 && (this.yylineno -= lines.length - 1);
                    var r = this.yylloc.range;
                    return this.yylloc = {
                        first_line: this.yylloc.first_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.first_column,
                        last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                    }, this.options.ranges && (this.yylloc.range = [ r[0], r[0] + this.yyleng - len ]), 
                    this.yyleng = this.yytext.length, this;
                },
                more: function() {
                    return this._more = !0, this;
                },
                reject: function() {
                    return this.options.backtrack_lexer ? (this._backtrack = !0, this) : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                },
                less: function(n) {
                    this.unput(this.match.slice(n));
                },
                pastInput: function() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function() {
                    var next = this.match;
                    return next.length < 20 && (next += this._input.substr(0, 20 - next.length)), (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
                },
                showPosition: function() {
                    var pre = this.pastInput(), c = new Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                },
                test_match: function(match, indexed_rule) {
                    var token, lines, backup;
                    if (this.options.backtrack_lexer && (backup = {
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
                    }, this.options.ranges && (backup.yylloc.range = this.yylloc.range.slice(0))), lines = match[0].match(/(?:\r\n?|\n).*/g), 
                    lines && (this.yylineno += lines.length), this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                    }, this.yytext += match[0], this.match += match[0], this.matches = match, this.yyleng = this.yytext.length, 
                    this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
                    this._more = !1, this._backtrack = !1, this._input = this._input.slice(match[0].length), 
                    this.matched += match[0], token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]), 
                    this.done && this._input && (this.done = !1), token) return token;
                    if (this._backtrack) {
                        for (var k in backup) this[k] = backup[k];
                        return !1;
                    }
                    return !1;
                },
                next: function() {
                    if (this.done) return this.EOF;
                    this._input || (this.done = !0);
                    var token, match, tempMatch, index;
                    this._more || (this.yytext = "", this.match = "");
                    for (var rules = this._currentRules(), i = 0; i < rules.length; i++) if (tempMatch = this._input.match(this.rules[rules[i]]), 
                    tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        if (match = tempMatch, index = i, this.options.backtrack_lexer) {
                            if (token = this.test_match(tempMatch, rules[i]), token !== !1) return token;
                            if (this._backtrack) {
                                match = !1;
                                continue;
                            }
                            return !1;
                        }
                        if (!this.options.flex) break;
                    }
                    return match ? (token = this.test_match(match, rules[index]), token !== !1 ? token : !1) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                },
                lex: function() {
                    var r = this.next();
                    return r ? r : this.lex();
                },
                begin: function(condition) {
                    this.conditionStack.push(condition);
                },
                popState: function() {
                    var n = this.conditionStack.length - 1;
                    return n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
                },
                _currentRules: function() {
                    return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
                },
                topState: function(n) {
                    return n = this.conditionStack.length - 1 - Math.abs(n || 0), n >= 0 ? this.conditionStack[n] : "INITIAL";
                },
                pushState: function(condition) {
                    this.begin(condition);
                },
                stateStackSize: function() {
                    return this.conditionStack.length;
                },
                options: {},
                performAction: function(yy, yy_, $avoiding_name_collisions, YY_START) {
                    switch ($avoiding_name_collisions) {
                      case 0:
                        break;

                      case 1:
                        return 20;

                      case 2:
                        return 10;

                      case 3:
                        return 11;

                      case 4:
                        return 9;

                      case 5:
                        return 8;

                      case 6:
                        return 12;

                      case 7:
                        return 14;

                      case 8:
                        return 15;

                      case 9:
                        return 16;

                      case 10:
                        return 17;

                      case 11:
                        return 18;

                      case 12:
                        return 19;

                      case 13:
                        return 22;

                      case 14:
                        return 5;

                      case 15:
                        return 21;

                      case 16:
                        return 7;

                      case 17:
                        return "INVALID";
                    }
                },
                rules: [ /^(?:\s*\n\s*)/, /^(?:[0-9]+(\.[0-9]+)?([eE][\+\-]?[0-9]+)?\b)/, /^(?:\s*\*\s*)/, /^(?:\s*\/\s*)/, /^(?:\s*-\s*)/, /^(?:\s*\+\s*)/, /^(?:\s*\^\s*)/, /^(?:\(\s*)/, /^(?:\s*\))/, /^(?:\[\s*)/, /^(?:\s*\])/, /^(?:\{\s*)/, /^(?:\s*\})/, /^(?:[A-Za-z]+)/, /^(?:\s+in\s+)/, /^(?:\s+)/, /^(?:$)/, /^(?:.)/ ],
                conditions: {
                    INITIAL: {
                        rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
                        inclusive: !0
                    }
                }
            };
            return lexer;
        }();
        return parser.lexer = lexer, Parser.prototype = parser, parser.Parser = Parser, 
        new Parser();
    }(), units = global.units = (global.module || {}).exports = function(expression) {
        return units_eval(expression);
    }, units_add = function(a, b) {
        if (!units_sameDimensions(a.unit, b.unit)) throw new Error("Dimension mismatch. " + units_toUnitString(a.unit) + "  =/=>  " + units_toUnitString(b.unit));
        return {
            value: a.value + b.value,
            unit: a.unit
        };
    }, units_subtract = function(a, b) {
        if (!units_sameDimensions(a.unit, b.unit)) throw new Error("Dimension mismatch. " + units_toUnitString(a.unit) + "  =/=>  " + units_toUnitString(b.unit));
        return {
            value: a.value - b.value,
            unit: a.unit
        };
    }, units_times = function(a, b) {
        return {
            value: a.value * b.value,
            unit: units_utimes(a.unit, b.unit)
        };
    }, units_divide = function(a, b) {
        return {
            value: a.value / b.value,
            unit: units_udivide(a.unit, b.unit)
        };
    }, units_power = function(a, n) {
        return {
            value: Math.pow(a.value, n),
            unit: units_upower(a.unit, n)
        };
    }, units_utimes = function(a, b) {
        return a.concat(b);
    }, units_udivide = function(a, b) {
        var c = a.slice(0);
        return b.forEach(function(u) {
            c.push({
                symbol: u.symbol,
                power: -u.power,
                prefix: u.prefix
            });
        }), c;
    }, units_upower = function(a, n) {
        var c = [];
        return a.forEach(function(u) {
            c.push({
                symbol: u.symbol,
                power: u.power * n,
                prefix: u.prefix
            });
        }), c;
    }, units_parseUnit = function(u) {
        var match, symbol, prefix = 0;
        if (match = RegExp("^" + NONSI_UNIT_NAME_LIST_REGEX + "$", "i").exec(u), match && (match = UNIT_MAP[match[1]], 
        match && (symbol = match.symbol)), symbol || (match = RegExp("^" + NONSI_UNIT_SYMBOL_LIST_REGEX + "$").exec(u), 
        match && (match = UNIT_MAP[match[1]], match && (symbol = match.symbol))), symbol || (match = RegExp("^" + PREFIX_NAME_LIST_REGEX + "?" + SI_UNIT_NAME_LIST_REGEX + "$", "i").exec(u), 
        match && (prefix = PREFIX_MAP[match[1]], match = UNIT_MAP[match[2]], match && (prefix = (prefix || {}).value || 0, 
        symbol = match.symbol))), symbol || (match = RegExp("^" + PREFIX_SYMBOL_LIST_REGEX + "?" + SI_UNIT_SYMBOL_LIST_REGEX + "$").exec(u), 
        match && (prefix = PREFIX_MAP[match[1]], match = UNIT_MAP[match[2]], match && (prefix = (prefix || {}).value || 0, 
        symbol = match.symbol))), !match || !symbol) throw new Error("Invalid unit `" + u + "`");
        return [ {
            symbol: symbol,
            power: 1,
            prefix: prefix
        } ];
    }, units_convert = function(ng, u) {
        var conversion = units_conversion(ng.unit), value = ng.value * conversion.factor * Math.pow(10, conversion.prefix) + conversion.offset;
        if (!u) return {
            value: value,
            unit: conversion.si
        };
        var to = units_conversion(u);
        return {
            value: (value - to.offset) / (to.factor * Math.pow(10, to.prefix)),
            unit: u
        };
    }, units_conversion = function(u) {
        var dimensions, si = {}, factor = 1, offset = 0, prefix = 0;
        u.forEach(function(a) {
            var m = UNIT_MAP[a.symbol];
            switch (m.type) {
              case "derived":
                m.equivalent.forEach(function(e) {
                    si[e.symbol] = (si[e.symbol] || 0) + a.power * e.power;
                }), prefix += Number(m.prefix) * a.power;
                break;

              case "conversion":
                si[m.conversion.unit] = (si[m.conversion.unit] || 0) + a.power, 1 == a.power && 1 == u.length && (offset += Number(m.conversion.offset)), 
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
        return Object.keys(si).forEach(function(s) {
            0 != si[s] && si_array.push({
                symbol: s,
                power: si[s],
                prefix: 0
            });
        }), dimensions = units_dimensions(si_array), {
            factor: factor,
            prefix: prefix,
            offset: offset,
            dimensions: dimensions,
            si: si_array
        };
    }, units_dimensions = function(u) {
        var dim = {};
        return u.forEach(function(a) {
            var m = UNIT_MAP[a.symbol];
            dim[m.dimension] = (dim[m.dimension] || 0) + a.power;
        }), Object.keys(dim).forEach(function(d) {
            0 == dim[d] && delete dim[d];
        }), dim;
    }, units_sameDimensions = function(a, b) {
        a = units_dimensions(a), b = units_dimensions(b);
        var isSame = !0;
        return Object.keys(BASE_UNIT).forEach(function(k) {
            var d = BASE_UNIT[k].dimension;
            return a[d] != b[d] ? (isSame = !1, !1) : void 0;
        }), isSame;
    }, units_toString = function(ng) {
        var vstr = units_toValueString(ng.value), ustr = units_toUnitString(ng.unit);
        return 0 == ustr.indexOf("10^") && (ustr = " * " + ustr), vstr + " " + ustr;
    }, units_toValueString = function(v) {
        return Number(Number(v).toPrecision(15));
    }, units_toUnitString = function(u) {
        var m = {}, prefix = 0;
        u.forEach(function(e) {
            var s = e.symbol, p = units_toPrefixString(e.prefix);
            if (!p) {
                var p_ = 3 * Math.round(e.prefix / 3);
                p_ > 27 ? p_ = 27 : -24 > p_ && (p_ = -24), prefix += e.prefix - p_, p = units_toPrefixString(p_);
            }
            m[p + s] = (m[p + s] || 0) + e.power;
        });
        var n = [], d = [];
        Object.keys(m).forEach(function(s) {
            m[s] > 0 ? n.push({
                symbol: s,
                power: m[s]
            }) : m[s] < 0 && d.push({
                symbol: s,
                power: m[s]
            });
        }), n = n.sort(function(a, b) {
            return a.power > b.power ? 1 : -1;
        }), d = d.sort(function(a, b) {
            return a.power < b.power ? 1 : -1;
        });
        var str = [];
        return 0 != prefix && (str.push("10^" + prefix), (n.length > 0 || d.length > 0) && str.push(" ")), 
        n.length > 0 && (n.length > 1 && 0 != d.length && str.push("("), n.forEach(function(u, i) {
            0 != i && str.push("*"), str.push(u.symbol), 1 != u.power && str.push("^" + u.power);
        }), n.length > 1 && 0 != d.length && str.push(")")), d.length > 0 && (n.length > 0 && str.push("/"), 
        d.length > 1 && 0 != d.length && str.push("("), d.forEach(function(u, i) {
            0 != i && str.push("*"), str.push(u.symbol), n.length > 0 ? -1 != u.power && str.push("^" + -u.power) : str.push("^" + u.power);
        }), d.length > 1 && 0 != d.length && str.push(")")), str.join("");
    }, units_toPrefixString = function(p) {
        return (PREFIX_NUMBER_MAP[Number(p)] || {}).symbol;
    }, units_eval = function(expression) {
        var out = parser.parse(expression);
        return out.toString = function() {
            return units_toString(out);
        }, out.toValueString = function() {
            return units_toValueString(out.value);
        }, out.toUnitString = function() {
            return units_toUnitString(out.unit);
        }, out.toJSONString = function() {
            return '{"value":' + out.toValueString() + ',"unit":"' + out.toUnitString() + '"}';
        }, out;
    };
    SI_UNIT_SYMBOL_LIST = function() {
        var list = [];
        return Object.keys(BASE_UNIT).forEach(function(key) {
            list.push(BASE_UNIT[key].symbol);
        }), Object.keys(DERIVED_UNIT).forEach(function(key) {
            list.push(DERIVED_UNIT[key].symbol);
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), SI_UNIT_NAME_LIST = function() {
        var list = [];
        return Object.keys(BASE_UNIT).forEach(function(key) {
            list.push(key), list.push.apply(list, BASE_UNIT[key].aliases);
        }), Object.keys(DERIVED_UNIT).forEach(function(key) {
            list.push(key), list.push.apply(list, DERIVED_UNIT[key].aliases);
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), NONSI_UNIT_SYMBOL_LIST = function() {
        var list = [];
        return Object.keys(CONVERSION).forEach(function(key) {
            list.push(CONVERSION[key].symbol);
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), NONSI_UNIT_NAME_LIST = function() {
        var list = [];
        return Object.keys(CONVERSION).forEach(function(key) {
            list.push(key), list.push.apply(list, CONVERSION[key].aliases);
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), PREFIX_SYMBOL_LIST = function() {
        var list = [];
        return Object.keys(PREFIXES).forEach(function(key) {
            "base" !== key && (list.push(PREFIXES[key].symbol), list.push.apply(list, PREFIXES[key].aliases));
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), PREFIX_NAME_LIST = function() {
        var list = [];
        return Object.keys(PREFIXES).forEach(function(key) {
            "base" !== key && list.push.call(list, key, key[0].toUpperCase() + key.substr(1));
        }), list.sort(function(a, b) {
            return a.length > b.length ? -1 : 1;
        }), list;
    }(), SI_UNIT_SYMBOL_LIST_REGEX = "(" + SI_UNIT_SYMBOL_LIST.join("|") + ")", SI_UNIT_NAME_LIST_REGEX = "(" + SI_UNIT_NAME_LIST.join("|") + ")", 
    NONSI_UNIT_SYMBOL_LIST_REGEX = "(" + NONSI_UNIT_SYMBOL_LIST.join("|") + ")", NONSI_UNIT_NAME_LIST_REGEX = "(" + NONSI_UNIT_NAME_LIST.join("|") + ")", 
    PREFIX_SYMBOL_LIST_REGEX = "(" + PREFIX_SYMBOL_LIST.join("|") + ")", PREFIX_NAME_LIST_REGEX = "(" + PREFIX_NAME_LIST.join("|") + ")", 
    PREFIX_MAP = function() {
        var map = {};
        return Object.keys(PREFIXES).forEach(function(key) {
            var i, l = (PREFIXES[key].aliases || []).length;
            for (PREFIXES[key].type = "prefix", map[key] = PREFIXES[key], map[PREFIXES[key].symbol] = PREFIXES[key], 
            i = 0; l > i; i++) map[PREFIXES[key].aliases[i]] = PREFIXES[key];
        }), map;
    }(), PREFIX_NUMBER_MAP = function() {
        var map = {};
        return Object.keys(PREFIXES).forEach(function(key) {
            map[PREFIXES[key].value] = PREFIXES[key];
        }), map;
    }(), UNIT_MAP = function() {
        var map = {};
        return Object.keys(BASE_UNIT).forEach(function(key) {
            var i, l = (BASE_UNIT[key].aliases || []).length;
            for (BASE_UNIT[key].type = "base", map[key] = BASE_UNIT[key], map[BASE_UNIT[key].symbol] = BASE_UNIT[key], 
            i = 0; l > i; i++) map[BASE_UNIT[key].aliases[i]] = BASE_UNIT[key];
        }), Object.keys(DERIVED_UNIT).forEach(function(key) {
            var i, l = (DERIVED_UNIT[key].aliases || []).length;
            for (DERIVED_UNIT[key].type = "derived", map[key] = DERIVED_UNIT[key], map[DERIVED_UNIT[key].symbol] = DERIVED_UNIT[key], 
            i = 0; l > i; i++) map[DERIVED_UNIT[key].aliases[i]] = DERIVED_UNIT[key];
        }), Object.keys(CONVERSION).forEach(function(key) {
            var i, l = (CONVERSION[key].aliases || []).length;
            for (CONVERSION[key].type = "conversion", map[key] = CONVERSION[key], map[CONVERSION[key].symbol] = CONVERSION[key], 
            i = 0; l > i; i++) map[CONVERSION[key].aliases[i]] = CONVERSION[key];
        }), map;
    }(), Object.keys(DERIVED_UNIT).forEach(function(key) {
        DERIVED_UNIT[key].equivalent = "" == DERIVED_UNIT[key].equivalent ? [] : parser.parse(DERIVED_UNIT[key].equivalent), 
        DERIVED_UNIT[key].prefix = 0;
    });
    for (var hasDerived = !0; hasDerived; ) hasDerived = !1, Object.keys(DERIVED_UNIT).forEach(function(key) {
        var e, m, md, i, equiv = DERIVED_UNIT[key].equivalent, prefix = DERIVED_UNIT[key].prefix, l = equiv.length;
        for (i = 0; l > i; i++) e = equiv[i], m = UNIT_MAP[e.symbol], "derived" == m.type && (hasDerived = !0, 
        equiv.splice(i, 1), i--, l--, md = UNIT_MAP[m.symbol], md.equivalent.forEach(function(mde) {
            equiv.push({
                power: mde.power * e.power,
                prefix: mde.prefix,
                symbol: mde.symbol
            }), l++;
        }), prefix += (e.prefix + md.prefix) * e.power);
        var um, umap = {};
        for (i = 0; l > i; i++) e = equiv[i], um = umap[e.symbol] || {
            power: 0,
            prefix: 0,
            symbol: e.symbol
        }, um.power += e.power, prefix += e.prefix * e.power, umap[e.symbol] = um;
        equiv = [], Object.keys(umap).forEach(function(k) {
            um = umap[k], 0 != um.power && equiv.push(umap[k]);
        }), DERIVED_UNIT[key].equivalent = equiv, DERIVED_UNIT[key].prefix = prefix;
    });
}(this);