module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // '@vue/standard',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'curly': 'error',
    // 'vue/html-indent': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  globals: {
    'workbox': 'readonly',
  },
}
