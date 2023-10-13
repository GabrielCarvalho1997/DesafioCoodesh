module.exports = {
  // Defina o ambiente do seu código (por exemplo, browser, node, etc.).
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // Extensões de arquivos que o ESLint irá analisar.
  // Certifique-se de ajustar isso para o seu projeto.
  // Pode ser JavaScript, TypeScript, React, etc.
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // Adicione outras extensões, como 'plugin:@typescript-eslint/recommended' para TypeScript.
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Se você estiver usando React
    },
    ecmaVersion: 12, // Versão do ECMAScript que você está usando (ES2021, por exemplo)
    sourceType: 'module',
  },
  plugins: ['react'], // Adicione outros plugins, se necessário
  rules: {
    // Defina suas regras personalizadas aqui
    // Por exemplo:
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    // ...
  },
};
