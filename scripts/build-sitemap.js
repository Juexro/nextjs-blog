const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { NEXT_PUBLIC_HOST } = dotenv.parse(fs.readFileSync('.env.production'));

const documents = require('../documents/index.json');

const extraLinks = [
  '',
  '/blogroll',
  '/tags',
  '/archive'
].map(item => {
  return `${NEXT_PUBLIC_HOST}${item}`
});

const articleLinks = documents.map(item => {
  return `${NEXT_PUBLIC_HOST}/article/${item.name}`;
});

fs.writeFileSync(path.resolve('./sitemap.txt'), [...extraLinks, ...articleLinks].join('\n'));