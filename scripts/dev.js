const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const execFileSync = require('child_process').spawn;
const { loadAllMdxYaml } = require('./utils')
const document_path = path.resolve('./documents');

const generateJSON = () => {
  const options = loadAllMdxYaml(document_path);
  fs.writeFileSync(
    path.resolve(document_path, 'index.json'),
    JSON.stringify(options, null, 2)
  );
};

generateJSON();

const throtte = (() => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(generateJSON, 300);
  }
})();


chokidar
  .watch([path.resolve('./documents/**/*.mdx')], {
    ignored: ['index.json']
  })
  .on('add', path => {
    throtte();
    console.log(`File ${path} has been added`)
  })
  .on('change', path => {
    throtte();
    console.log(`File ${path} has been change`)
  })
  .on('unlink', path => {
    throtte();
    console.log(`File ${path} has been unlink`)
  });
