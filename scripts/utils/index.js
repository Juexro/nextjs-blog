const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function loadMdxYaml(filepath) {
  return {
    ...matter(fs.readFileSync(filepath)).data,
    name: path.basename(filepath, '.mdx')
  };
}

function loadAllMdxYaml(dir) {
  const result = [];
  const readMdx = (dir) => {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
      fs.readdirSync(dir).forEach(sub => {
        readMdx(path.join(dir, sub));
      });
    } else {
      if (path.extname(dir) === '.mdx') {
        result.push({
          ...matter(fs.readFileSync(dir)).data,
          name: path.basename(dir, '.mdx')
        });
      }
    }
  };
  readMdx(dir);
  return result;
}


module.exports = {
  loadAllMdxYaml,
  loadMdxYaml
}