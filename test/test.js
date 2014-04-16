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
		expect(b.value).to.be.closeTo(310.094, 0.001);
		expect(b.unit.length).to.equal(1);
		expect(b.unit[0].symbol).to.equal("K");

		var c = units("1000 ft/min^2");
		expect(c.value).to.be.closeTo(0.0846667, 0.00001);
		expect(c.unit.length).to.equal(2);
	});
});