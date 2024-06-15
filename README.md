# nanocolor

Fast Color class for modern browser. Can be a drop-in replacement for `tinycolor`, `tinycolor2`, `@ctrl/tinycolor`, with the follwing differences:

- Don't support CSS color names, like `'darkgreen'`, `'orange'`. This helps reduce bundle size.
- Don't support CMYK, HSL, HSV as input and output formats. This helps reduce bundle size and improve performance.
