const environmentPreset = [
  '@babel/preset-env',
  {
    useBuiltIns: 'usage',
    corejs: 3,
    modules: false,
  },
];

module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      environmentPreset,
      '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV === 'development',
          runtime: 'automatic',
          plugins: [
            process.env.BABEL_ENV === 'production' &&
              '@babel/plugin-transform-react-constant-elements',
            process.env.BABEL_ENV === 'production' &&
              '@babel/plugin-transform-react-inline-elements',
          ].filter(Boolean),
        },
      ],
    ],
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  };
};
