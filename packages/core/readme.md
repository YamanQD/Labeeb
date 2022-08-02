# Labeeb's shared package

You can place shared logic and types here, and export them using an `index.ts` file so other packages can consume them.

## Notes

This package is compiled as a CommonJS module. 

Backend works just fine, but the frontend app needs some configuartion to accept CommonJS. You can find this necessary tweak in the `vite.config.js` file.