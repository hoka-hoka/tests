module.exports = {
  env: {
    es6: true,
    browser: true,
    jquery: true,
  },
  extends: ['react-app', 'react-app/jest', 'airbnb-base', 'airbnb-typescript'],
  rules: {
    'react/jsx-one-expression-per-line': 'off', // использовать пропсы в одной строчке с тегом
    'react-hooks/rules-of-hooks': 'error', // Проверяем правила хуков
    'react-hooks/exhaustive-deps': 'warn', // Проверяем зависимости эффекта
    'no-var': 'error',
    'linebreak-style': ['error', 'windows'], // CRLF - windows and LF - unix
    'no-bitwise': ['error', { allow: ['~'] }],
  },
};
