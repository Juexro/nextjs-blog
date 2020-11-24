const path = require('path');
const rehypePrism = require('@mapbox/rehype-prism');
const remarkContainer = require('remark-containers');


module.exports = {
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

    return config;
  }
}