const fs = require('fs');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const documents = require('../documents/index.json');
const gitalk = require('../config').gitalk;
const { NEXT_PUBLIC_HOST } = dotenv.parse(fs.readFileSync('.env.production'));

const { owner, repo, accessToken } = gitalk;

const url = `https://api.github.com/repos/${owner}/${repo}/issues?access_token=${accessToken}&page=1&per_page=1000`;

async function getUnInitalArticles() {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'github-user'
    }
  }).then(res => res.json());

  const issues = data.map(item => item.body);

  return documents.filter(item => {
    const link = `${NEXT_PUBLIC_HOST}/article/${item.name}`;
    return !issues.find(issue => issue.includes(link))
  });
}

async function initialArticle(document) {
  const { name, title } = document;
  const link = `${NEXT_PUBLIC_HOST}/article/${name}`;

  await fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent': 'github-user'
    },
    body: JSON.stringify({
      body: link,
      labels: ['gitalk', link],
      title
    })
  }).then(res => res.json());
}

async function run() {
  console.log('获取issues数据...');
  const articles = await getUnInitalArticles();
  console.log(`未初始化数量: ${articles.length}`);

  for (let article of articles) {
    await initialArticle(article);
  }

  console.log('初始化完成!');
}

run();
