module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'sort-vars': ['error'],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  }
};
