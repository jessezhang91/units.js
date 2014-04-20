# units.js
Units calculator made using Jison.

## Wat?
- Simple arithmetic
- Units arithmetic
- SI base and derived units, Imperial units
- Unit conversion
- Simplicity?

## Usage
```js
// Unit conversion
units("1 kg*cd/Hz*A to lb*s*cd/A");     // 2.20462262

// Unit arithmetic and unit conversion
units("1 cm + 1 in to mm");             // 35.4

// Pretty printing
var u = units("1 V*N*s/cd*A");
u.toValueString();      // "1"
u.toUnitString();       // "(kg^2*m^3)/(cd*A^2*s^4)"
u.toString();           // "1 (kg^2*m^3)/(cd*A^2*s^4)"
u.toJSONString();       // '{"value":1,"unit":"(kg^2*m^3)/(cd*A^2*s^4)"}'
```