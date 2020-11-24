const { getOptions } = require('loader-utils');
const matter = require('gray-matter');

const loader = async function(filetext) {
  const callback = this.async()
  const options = Object.assign({}, getOptions(this), {
    filepath: this.resourcePath
  });

  let { content, data } = matter(filetext);
  
  content += `\nexport const MarkdownData = ${JSON.stringify(data)};`;

  return callback(null, content);
};

module.exports = loader;