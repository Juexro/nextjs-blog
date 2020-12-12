const Client = require('ssh2-sftp-client');
const path = require('path');
const spinner = require('ora')();

const { sftp } = require('../config');
const { dstDir, srcDir = './out', ...config } = sftp;
const client = new Client();

spinner.start(`连接至 ${config.username}@${config.host}`);
client.connect(config).then(async () => {
  spinner.succeed();
  spinner.start(`删除目录 ${dstDir}`);
  await client.rmdir(dstDir, true);
  spinner.succeed();

  spinner.start(`上传目录 ${srcDir} 至 ${dstDir}`);
  await client.uploadDir(path.resolve(srcDir), dstDir);
  spinner.succeed('上传完成');

  client.end();
});