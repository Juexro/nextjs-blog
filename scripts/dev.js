const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { loadAllMdxYaml } = require('./utils')
const document_path = path.resolve('./documents');
const article_path = path.resolve('./pages/article');

if (!fs.existsSync(article_path)) {
  fs.mkdirSync(article_path);
}

const generateJSON = () => {
  const options = loadAllMdxYaml(document_path);
  fs.writeFileSync(
    path.resolve(document_path, 'index.json'),
    JSON.stringify(
      options.sort((a, b) => {
        return +new Date(a.create_time) - new Date(b.create_time);
      }), null, 2)
  );
};

generateJSON();

const createArticle = (filepath) => {
  const name = path.basename(filepath, '.mdx');
  const template = fs.readFileSync(path.resolve('./scripts/template.js')).toString('utf-8').replace(/\$ARTICLE/g, name);
  fs.writeFileSync(
    path.resolve(article_path, `${name}.js`),
    template
  )
};

const unlinkArticle = (filepath) => {
  const name = path.basename(filepath, '.mdx');
  fs.unlinkSync(path.resolve(article_path, `${name}.js`));
};

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
  .on('add', filepath => {
    createArticle(filepath);
    throtte();
    console.log(`File ${filepath} has been added`)
  })
  .on('change', filepath => {
    throtte();
    console.log(`File ${filepath} has been change`)
  })
  .on('unlink', filepath => {
    unlinkArticle(filepath);
    throtte();
    console.log(`File ${filepath} has been unlink`)
  });
