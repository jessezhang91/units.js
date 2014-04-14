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
		DERIVED_UNIT[key].equivalent = parser.parse(DERIVED_UNIT[key].equivalent);
	}
	DERIVED_UNIT[key].prefix = 0;
});

// Expand derived^n units
var hasDerived = true;
while (hasDerived) {
	hasDerived = false;
	Object.keys(DERIVED_UNIT).forEach(function (key) {
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