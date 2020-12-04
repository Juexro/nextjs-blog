import React from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';

export default function ArticleCopyright() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <strong>本文链接：</strong><a className="link" href={`${process.env.NEXT_PUBLIC_HOST}${router.pathname}`} target="_blank">{process.env.NEXT_PUBLIC_HOST}{router.pathname}</a>
      </div>
      <div className={styles.column}>
        <strong>版权声明：</strong>本博客所有文章除特别声明外，均采用
        <a className="link" href="http://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">CC BY 4.0 CN</a>
        许可协议。转载请注明出处！
      </div>
    </div>
  )
}