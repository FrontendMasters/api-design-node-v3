module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    node: true
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended'
  ],
  plugins: ['prettier', 'jest'],
  rules: {
    'promise/catch-or-return': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false
      }
    ]
  }
}
