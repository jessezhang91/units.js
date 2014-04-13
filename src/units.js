(function (global) {
	var units = global.units = (global.module || {}).exports = function (expression) {
		return units._eval(expression);
	};

	var PREFIXES, BASE_UNIT, DERIVED_UNIT, CONVERSION;
	var SI_UNIT_SYMBOL_LIST, SI_UNIT_NAME_LIST, NONSI_UNIT_SYMBOL_LIST, NONSI_UNIT_NAME_LIST, PREFIX_SYMBOL_LIST, PREFIX_NAME_LIST,
		SI_UNIT_SYMBOL_LIST_REGEX, SI_UNIT_NAME_LIST_REGEX, NONSI_UNIT_SYMBOL_LIST_REGEX, NONSI_UNIT_NAME_LIST_REGEX, PREFIX_SYMBOL_LIST_REGEX, PREFIX_NAME_LIST_REGEX,
		PREFIX_MAP, UNIT_MAP;

	/*
	 * Arithmetic Operations
	 */
	units._add = function (a, b) {
		return {
			value: a.value + b.value,
			unit: a.unit
		};
	};
	units._subtract = function (a, b) {
		return {
			value: a.value - b.value,
			unit: a.unit
		};
	};
	units._times = function (a, b) {
		return {
			value: a.value * b.value,
			unit: units._utimes(a.unit, b.unit)
		};
	};
	units._divide = function (a, b) {
		return {
			value: a.value / b.value,
			unit: units._udivide(a.unit, b.unit)
		};
	};
	units._power = function (a, n) {
		return {
			value: Math.pow(a.value, n),
			unit: units._upower(a.unit, n)
		};
	};

	/*
	 * Unit arithmetic operations
	 */
	units._utimes = function (a, b) {
		return a.concat(b);
	};
	units._udivide = function (a, b) {
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
	units._upower = function (a, n) {
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
	units._parseUnit = function (u) {
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
	units._convert = function (ng, u) {
		var conversion = units._conversion(ng.unit);
		return {
			value: ng.value * conversion.factor * Math.pow(10, conversion.prefix),
			unit: conversion.si
		};
	};

	/*
	 * unit * factor = SI
	 */
	units._conversion = function (u) {
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
			si_array.push({
				symbol: s,
				power: si[s],
				prefix: 0
			});
		});
		dimensions = units._dimensions(si_array);

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
	units._dimensions = function (u) {
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
	 * DEFINITIONS
	 */
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
			equivalent: "kg-m-s^-2",
			aliases: []
		},
		pascal: {
			symbol: "Pa",
			equivalent: "N-m^-2",
			aliases: []
		},
		joule: {
			symbol: "J",
			equivalent: "N-m",
			aliases: []
		},
		watt: {
			symbol: "W",
			equivalent: "J-s^-1",
			aliases: []
		},
		coulomb: {
			symbol: "C",
			equivalent: "s-A",
			aliases: []
		},
		volt: {
			symbol: "V",
			equivalent: "J-C^-1",
			aliases: []
		},
		farad: {
			symbol: "F",
			equivalent: "C-V^-1",
			aliases: []
		},
		ohm: {
			symbol: "\u03A9",
			equivalent: "V-A^-1",
			aliases: []
		},
		siemens: {
			symbol: "S",
			equivalent: "A-V^-1",
			aliases: []
		},
		weber: {
			symbol: "Wb",
			equivalent: "J-A^-1",
			aliases: []
		},
		tesla: {
			symbol: "T",
			equivalent: "Wb-m^-2",
			aliases: []
		},
		henry: {
			symbol: "H",
			equivalent: "Wb-A^-1",
			aliases: []
		},
		lumen: {
			symbol: "lm",
			equivalent: "cd-sr",
			aliases: []
		},
		lux: {
			symbol: "lx",
			equivalent: "lm/m^2",
			aliases: []
		},
		becquerel: {
			symbol: "Bq",
			equivalent: "s^-1",
			aliases: []
		},
		gray: {
			symbol: "Gy",
			equivalent: "J-kg^-1",
			aliases: []
		},
		sievert: {
			symbol: "Sv",
			equivalent: "J-kg^-1",
			aliases: []
		},
		katal: {
			symbol: "kat",
			equivalent: "mol-s^-1",
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

	/*
	 * DERIVED DEFINITIONS
	 */
	SI_UNIT_SYMBOL_LIST = (function () {
		var list = [];
		Object.keys(BASE_UNIT).map(function (key) {
			list.push(BASE_UNIT[key].symbol);
		});
		Object.keys(DERIVED_UNIT).map(function (key) {
			list.push(DERIVED_UNIT[key].symbol);
		});
		list.sort(function (a, b) {
			return a.length > b.length ? -1 : 1;
		});
		return list;
	})();
	SI_UNIT_NAME_LIST = (function () {
		var list = [];
		Object.keys(BASE_UNIT).map(function (key) {
			list.push(key);
			list.push.apply(list, BASE_UNIT[key].aliases);
		});
		Object.keys(DERIVED_UNIT).map(function (key) {
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
		Object.keys(CONVERSION).map(function (key) {
			list.push(CONVERSION[key].symbol);
		});
		list.sort(function (a, b) {
			return a.length > b.length ? -1 : 1;
		});
		return list;
	})();
	NONSI_UNIT_NAME_LIST = (function () {
		var list = [];
		Object.keys(CONVERSION).map(function (key) {
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
		Object.keys(PREFIXES).map(function (key) {
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
		Object.keys(PREFIXES).map(function (key) {
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
		Object.keys(PREFIXES).map(function (key) {
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

	UNIT_MAP = (function () {
		var map = {};
		Object.keys(BASE_UNIT).map(function (key) {
			var i, l = (BASE_UNIT[key].aliases || []).length;
			BASE_UNIT[key].type = "base";
			map[key] = BASE_UNIT[key];
			map[BASE_UNIT[key].symbol] = BASE_UNIT[key];
			for (i = 0; i < l; i++) {
				map[BASE_UNIT[key].aliases[i]] = BASE_UNIT[key];
			}
		});
		Object.keys(DERIVED_UNIT).map(function (key) {
			var i, l = (DERIVED_UNIT[key].aliases || []).length;
			DERIVED_UNIT[key].type = "derived";
			map[key] = DERIVED_UNIT[key];
			map[DERIVED_UNIT[key].symbol] = DERIVED_UNIT[key];
			for (i = 0; i < l; i++) {
				map[DERIVED_UNIT[key].aliases[i]] = DERIVED_UNIT[key];
			}
		});
		Object.keys(CONVERSION).map(function (key) {
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

	// TEMPORARY: This has to go after parser definition
	setTimeout(function () {
		Object.keys(DERIVED_UNIT).map(function (key) {
			if (DERIVED_UNIT[key].equivalent == "") {
				DERIVED_UNIT[key].equivalent = [];
			} else {
				DERIVED_UNIT[key].equivalent = units._parser.parse(DERIVED_UNIT[key].equivalent);
			}
			DERIVED_UNIT[key].prefix = 0;
		});

		// Expand derived^n units
		var hasDerived = true;
		while (hasDerived) {
			hasDerived = false;
			Object.keys(DERIVED_UNIT).map(function (key) {
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
				DERIVED_UNIT[key].prefix = prefix;
			});
		}

		units._eval = function (expression) {
			return units._parser.parse(expression);
		};
	});
})(this);