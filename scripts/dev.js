const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { loadAllMdxYAML, throttle, readDirectory } = require('./utils')
const document_path = path.resolve('./documents');
const article_path = path.resolve('./pages/article');

if (!fs.existsSync(article_path)) {
  fs.mkdirSync(article_path);
}

const generateJSON = () => {
  const options = loadAllMdxYAML(document_path);
  fs.writeFileSync(
    path.resolve(document_path, 'index.json'),
    JSON.stringify(
      options.sort((a, b) => {
        return +new Date(a.create_time) - new Date(b.create_time);
      }), null, 2)
  );
};

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

const createArticles = () => {
  readDirectory(article_path, (filepath) => {
    fs.unlinkSync(filepath);
  });

  readDirectory(document_path, (filepath) => {
    if (path.extname(filepath) === '.mdx') {
      createArticle(filepath);
    }
  });
};

createArticles();
generateJSON();

const generateJSONTask = throttle(generateJSON);
const createArticlesTask = throttle(createArticles);

chokidar
  .watch([path.resolve('./documents/**/*.mdx'), path.resolve('./scripts/template.js')], {
    ignored: ['index.json']
  })
  .on('add', filepath => {
    if (path.basename(filepath) === 'template.js') {
      return;
    }
    createArticle(filepath);
    generateJSONTask();
    console.log(`File ${filepath} has been added`)
  })
  .on('change', filepath => {
    if (path.basename(filepath) === 'template.js') {
      createArticlesTask();
    } else {
      generateJSONTask();
    }
    console.log(`File ${filepath} has been change`)
  })
  .on('unlink', filepath => {
    if (path.basename(filepath) === 'template.js') {
      return;
    }
    unlinkArticle(filepath);
    generateJSONTask();
    console.log(`File ${filepath} has been unlink`)
  });
