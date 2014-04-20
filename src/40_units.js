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