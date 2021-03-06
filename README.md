[Demo地址](https://www.advanta.top)

## 开始

安装Node.js环境，选择LTS版本。 [下载地址](https://nodejs.org/en/)

搭建前建议先阅读 [Next.js开发文档](https://www.nextjs.cn/docs/getting-started)

```bash
$ # 全局安装yarn命令
$ npm install yarn -g
$
$ # 从example分支下载项目
$ yarn create next-app [项目名] -e https://github.com/Juexro/nextjs-blog/tree/example
$
$ # 启动开发环境，默认访问地址 http://localhost:3000
$ yarn run dev
```

## 配置

#### config.js
```js
module.exports = {
  // 个人信息
  profile: {
    name: 'Juexro',
    github: 'https://github.com/Juexro',
    email: 'juexro@163.com',
    avatar: '/avatar.jpg',
    location: 'Su Zhou, China',
    position: 'Web Developer'
  },
  // 评论工具参数
  gitalk: {
    // 用于初始化评论
    accessToken: '',
    // gitalk参数
    clientID: '',
    clientSecret: '',
    // 提交的仓库
    repo: '',
    owner: 'Juexro',
    admin: ['Juexro'],
  },
  // 友链
  blogrolls: [
    {
      name: 'Juexro',
      description: '基于Next.js的个人博客',
      avatar: '/avatar.jpg',
      link: 'https://www.advanta.top'
    }
  ],
  // 页脚
  footer: `<div>Copyright &copy; 2020 Juexro</div>`,
    // 服务器参数
  sftp: {
    // 上传目录 默认 ./out
    srcDir: './out',
    // 服务器目录
    dstDir: '',
    host: '',
    username: '',
    password: ''
  }
}
```

快捷链接
  + [生成AccessToken](https://github.com/settings/tokens)
  + [创建OAuth App，生成ClientId、ClientSecret](https://github.com/settings/developers)

#### 环境变量

文件
 + `.env`
 + `.env.development`
 + `.env.production`

```yaml
# .env
# 请求接口时使用的地址
NEXT_PUBLIC_DEV_HOST=http://localhost:3000
# 拼接跳转链接
NEXT_PUBLIC_HOST=http://localhost:3000

# .env.production
# 生产环境下更改为要发布的域名
NEXT_PUBLIC_HOST=https://www.advanta.top
```


## 创建文章

在`documents`目录下创建`.mdx`文件，页面链接以文件名命名，确保文件名的唯一性。

填入文章信息 `YAML格式`，以本篇为例。
```yaml
---
create_time: 2020-12-09T02:54:45.017Z    # 创建时间
title: 如何使用nextjs-blog搭建自己的博客    # 文章名称
tags: [部署]                             # 标签
keywords: [nextjs, blog]                # 关键字
---

import SolidLink from '@/components/solid-link';


## 开始

安装Node.js环境，选择LTS版本。<SolidLink href="https://nodejs.org/en/">[下载地址]</SolidLink>

搭建前建议先阅读 <SolidLink href="https://www.nextjs.cn/docs/getting-started">Next.js开发文档</SolidLink>
```

支持引入组件，如上方示例中的`SolidLink`。

## 部署

```bash
$ # 启动开发环境，使接口可用
$ yarn run dev
$ 
$ # 打开新的终端
$ # 生成HTML文件和sitemap.txt
$ yarn run build
$ # 发布 执行操作：初始化gitalk -> 上传文件至ftp
$ yarn run publish
```

## 说明

+ 启动开发环境时，会删除`pages/article`目录下的所有文件并根据`.mdx`文件重新生成。

+ 编译过程中会在`documents`目录下创建`index.json`文件，用以包含所有文章的`YAML`信息，请勿操作此文件。

## LICENSE

MIT