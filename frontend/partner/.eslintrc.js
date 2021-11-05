// 기존 설정
// module.exports = { 
//   root: true,
//   extends: '@react-native-community',
// };
module.exports = {
  extends: [
  "airbnb",
  "prettier",
  "prettier/react",
  "plugin:prettier/recommended",
  "eslint-config-prettier"
  ],
  parser: "babel-eslint",
  rules: {
  "import/no-unresolved": "off",
  "react/jsx-filename-extension": [
    1,
      {
      extensions: [".js", ".jsx"]
      }
    ],
  "prettier/prettier": [
    "error",
      {
      trailingComma: "es5",
      singleQuote: true,
      printWidth: 100
      }
    ]
  },
  plugins: ["prettier"]
};
