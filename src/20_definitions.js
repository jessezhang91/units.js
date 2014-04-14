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