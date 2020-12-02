const path = require('path');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkContainer = require('remark-containers');


module.exports = {
  env: {
    HOST: 'http://localhost:3000'
  },
  sassOptions: {
    prependData: `@import "@/styles/variable.scss";`
  },
  webpack: (config, { defaultLoaders }) => {
    config.resolve.extensions.push('.md', '.mdx');

    config.module.rules.push({
      test: /\.(md|mdx)$/,
      include: [path.resolve('./documents')],
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkContainer],
            rehypePlugins: [rehypePrism]
          }
        },
        path.resolve('./scripts/markdown-loader.js')
      ]
    });
    config.resolve.alias['@'] = path.resolve('.');

    return config;
  }
}