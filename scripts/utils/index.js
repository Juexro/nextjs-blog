const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function readDirectory(dir, handler) {
  const read = (dir) => {
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
      fs.readdirSync(dir).forEach(sub => {
        read(path.join(dir, sub));
      });
    } else {
      handler(dir);
    }
  };
  read(dir);
}


function loadMdxYAML(filepath) {
  return {
    ...matter(fs.readFileSync(filepath)).data,
    name: path.basename(filepath, '.mdx')
  };
}

function loadAllMdxYAML(dir) {
  const result = [];

  readDirectory(dir, (filepath) => {
      if (path.extname(filepath) === '.mdx') {
        result.push({
          ...matter(fs.readFileSync(filepath)).data,
          name: path.basename(filepath, '.mdx')
        });
      }
  });
  return result;
}

function throttle(fn, delay = 300) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  }
}

module.exports = {
  loadAllMdxYAML,
  loadMdxYAML,
  readDirectory,
  throttle
}