// eslint-disable-next-line no-undef
module.exports = {
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'update',
        'fix',
        'del',
        'refactor',
        'docs',
        'chore',
        'test',
        'revert',
        'asset',
        'style',
        'dependency',
        'build',
      ],
    ],
    'type-empty': [2, 'never'],
  },
};
