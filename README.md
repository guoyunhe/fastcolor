# fastcolor

Color class 2~4x faster than `@ctrl/cinycolor`. Can be a drop-in replacement for `@ctrl/tinycolor`, with the follwing differences:

- Don't support CSS color names, like `'darkgreen'`, `'orange'`. This helps reduce bundle size.
- Don't support CMYK as input and output formats (almost no use case in web apps). This helps reduce bundle size and improve performance.

```
npm install --save fastcolor
```

## Constructor

```js
import { FastColor } from 'fastcolor';

new FastColor('#6cf');
new FastColor('#66ccff');
new FastColor('#66ccff88');
new FastColor('rgba(102, 204, 255)');
new FastColor('rgba(102, 204, 255, .5)');
new FastColor('hsl(200, 60%, 75%)');
new FastColor('hsla(200, 60%, 75%, 50%)');
new FastColor({ r: 103, g: 204, b: 255, a: 0.5 });
new FastColor({ h: 200, s: 0.6, l: 0.75 });
```

## Clone

```js
import { FastColor } from 'fastcolor';

const color1 = new FastColor('#66ccff');
const color2 = color1.clone();
// you can also do
const color3 = new FastColor(color2);
```

## Brightness

Returns the perceived brightness of the color, between 0 and 255. See http://www.w3.org/TR/AERT#color-contrast

If brightness is less than 128, the color is dark. Otherwise, it is light color.

```js
import { FastColor } from 'fastcolor';

const color = new FastColor('#66ccff');
color.getBrightness();
// 179.316
color.isDark();
// false
color.isLight();
// true
```

## Lightness

Lightness value between 0 and 1.

```js
import { FastColor } from 'fastcolor';

const color = new FastColor('#66ccff');
color.getLightness();
// 0.697265625
color.darken(10);
color.lighten(5);
```

## Alpha

Lightness value between 0 and 1.

```js
import { FastColor } from 'fastcolor';

const color = new FastColor('#66ccff');
color.setAlpha(0.67);
```

## onBackground

```js
import { FastColor } from 'fastcolor';

const color = new FastColor('#66ccffaa');
const background = new FastColor('#000000');
const mixed = color.onBackground(background);
// rgb(68,136,170)
```
