module.exports = (api) => {
  const isTest = api.env('test');

  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 2 versions'],
          },
          useBuiltIns: 'usage',
          corejs: { version: 3, proposals: true },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      'transform-decorators-legacy',
      '@babel/plugin-transform-react-jsx',
    ],
  };
};
