// http://eslint.org/docs/user-guide/configuring

module.exports = {
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ['standard', 'plugin:react/recommended'],
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  plugins: ['react'],
  parser: 'babel-eslint',
  rules: {
    'generator-star-spacing': ['error', { before: false, after: true }]
  }
}
