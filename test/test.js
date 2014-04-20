describe("units", function () {
	it("should do simple arithmetic", function () {
		expect(units("1 + 1").value).to.equal(2);
		expect(units("1 - 1").value).to.equal(0);
		expect(units("2 * 3").value).to.equal(6);
		expect(units("3 / 4").value).to.equal(0.75);
		expect(units("3.4 ^ 4.2").value).to.be.closeTo(170.691325761, 0.000000001);
	});

	it("should convert to SI", function () {
		var a = units("1 in");
		expect(a.value).to.equal(0.0254);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("m");

		var b = units("98.5 degF");
		expect(b.value).to.be.closeTo(310.094, 1e-3);
		expect(b.unit.length).to.equal(1);
		expect(b.unit[0].symbol).to.equal("K");

		var c = units("1000 ft/min^2");
		expect(c.value).to.be.closeTo(0.0846667, 1e-6);
		expect(c.unit.length).to.equal(2);
	});

	it("should convert to other units", function () {
		var a = units("1 cm to in");
		expect(a.value).to.closeTo(0.3937, 1e-6);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("in");

		var a = units("1 kg*cd/Hz*A to lb*s*cd/A");
		expect(a.value).to.closeTo(2.20462262, 1e-6);
		expect(a.unit.length).to.equal(4);
	});

	it("should do unit arithmetic", function () {
		var a = units("1 cm + 1 in to mm");
		expect(a.value).to.closeTo(35.4, 1e-6);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("m");

		var a = units("1 cm - 1 in to mm");
		expect(a.value).to.closeTo(-15.4, 1e-6);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("m");

		var a = units("-1 cm + 1 in to mm");
		expect(a.value).to.closeTo(15.4, 1e-6);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("m");

		var a = units("(1 cm)*(1 in) to mil^2");
		expect(a.value).to.closeTo(393700.787, 1);
		expect(a.unit.length).to.equal(1);
		expect(a.unit[0].symbol).to.equal("mil");

		var a = units("(1 cm)/(1 in)");
		expect(a.value).to.closeTo(0.3937007, 1e-6);
	});

	it("should pretty print", function () {
		var a = units("1 L");
		expect(a.toValueString()).to.equal("0.001");
		expect(a.toUnitString()).to.equal("m^3");
		expect(a.toString()).to.equal("0.001 m^3");
		expect(a.toJSONString()).to.equal('{"value":0.001,"unit":"m^3"}');

		var a = units("1 Hz");
		expect(a.toValueString()).to.equal("1");
		expect(a.toUnitString()).to.equal("s^-1");
		expect(a.toString()).to.equal("1 s^-1");
		expect(a.toJSONString()).to.equal('{"value":1,"unit":"s^-1"}');

		var a = units("1 kW*s/N*m");
		expect(a.toValueString()).to.equal("1000");
		expect(a.toUnitString()).to.equal("");
		expect(a.toString()).to.equal("1000");
		expect(a.toJSONString()).to.equal('{"value":1000,"unit":""}');

		var a = units("1 V*N*s/cd*A");
		expect(a.toValueString()).to.equal("1");
		expect(a.toUnitString()).to.equal("(kg^2*m^3)/(cd*A^2*s^4)");
		expect(a.toString()).to.equal("1 (kg^2*m^3)/(cd*A^2*s^4)");
		expect(a.toJSONString()).to.equal('{"value":1,"unit":"(kg^2*m^3)/(cd*A^2*s^4)"}');

		var a = units("rad/cd*s");
		expect(a.toUnitString()).to.equal("cd^-1*s^-1");
		expect(a.toString()).to.equal("cd^-1*s^-1");
		expect(a.toJSONString()).to.equal('"cd^-1*s^-1"');
	});

	it("should throw conversion errors", function () {
		expect(function () {
			units("1 kg to m");
		}).to.
		throw ("Dimension mismatch. g  =/=>  m");

		expect(function () {
			units("1 kg  + 1 m");
		}).to.
		throw ("Dimension mismatch. g  =/=>  m");

		expect(function () {
			units("1 kg  - 1 m");
		}).to.
		throw ("Dimension mismatch. g  =/=>  m");
	});
});