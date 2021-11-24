/* eslint-env es6 */
/* eslint-disable no-console */
const path = require("path");

const lintOnSave = true;
// const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  lintOnSave,
  pages: {
    index: {
      entry: "src/app/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "How Green",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  productionSourceMap: true,
  outputDir: "dist",
  assetsDir: "static",
  // baseUrl: IS_PRODUCTION
  // ? 'http://cdn123.com'
  // : '/',
  // For Production, replace set baseUrl to CDN
  // And set the CDN origin to `yourdomain.com/static`
  // Whitenoise will serve once to CDN which will then cache
  // and distribute
  devServer: {
    proxy: {
      "/api*": {
        // Forward frontend dev server request for /api to flask dev server
        target: "http://localhost:5000/",
      },
    },
  },
};
