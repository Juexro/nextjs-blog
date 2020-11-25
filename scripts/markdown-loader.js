const { getOptions } = require('loader-utils');
const matter = require('gray-matter');
const toc = require('markdown-toc');

const loader = async function(filetext) {
  const callback = this.async()
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  let { content, data } = matter(filetext);
  
  content += `\nexport const yaml = ${JSON.stringify(data)};`;

  content += `\n export const toc = ${JSON.stringify(toc(content).json)}`;

  return callback(null, content);
};

module.exports = loader;