import React from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

export default function ArticleCopyright() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <strong>本文链接：</strong><a href={`${process.env.HOST}${router.pathname}`} target="_blank">{process.env.HOST}{router.pathname}</a>
      </div>
      <div>
        <strong>版权声明：</strong>本博客所有文章除特别声明外，均采用
        <a href="http://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">CC BY 4.0 CN</a>
        许可协议。转载请注明出处！
      </div>
    </div>
  )
}