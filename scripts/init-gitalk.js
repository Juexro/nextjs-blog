const fs = require('fs');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const documents = require('../documents/index.json');
const gitalk = require('../config').gitalk;
const { NEXT_PUBLIC_HOST } = dotenv.parse(fs.readFileSync('.env.production'));

const { owner, repo, accessToken } = gitalk;

const url = `https://api.github.com/repos/${owner}/${repo}/issues?access_token=${accessToken}&page=1&per_page=1000`;

const extraLinks = [
  {
    title: '友情链接',
    link: `${NEXT_PUBLIC_HOST}/blogroll`
  }
];

async function getUnInitalLinks() {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': 'github-user'
    }
  }).then(res => res.json());

  const issueLinks = data.map(item => item.body);
  const articleLinks = documents.map(item => {
    return {
      title: item.title,
      link: `${NEXT_PUBLIC_HOST}/article/${item.name}`
    };
  });
  return [...articleLinks, ...extraLinks].filter(item => {
    return !issueLinks.find(link => link.includes(item.link))
  });
}

async function initialLink({ link, title }) {
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
  const links = await getUnInitalLinks();
  console.log(`未初始化数量: ${links.length}`);

  for (let link of links) {
    await initialLink(link);
  }

  console.log('初始化完成!');
}

run();
