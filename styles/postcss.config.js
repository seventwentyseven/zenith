config = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    require('autoprefixer'),
        require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true }
      }]
    })
  );
}

module.exports = config;