import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';

export default function ArticleCard(props) {
  const { data } = props;
  const { create_time, name, title, tags } = data;
  return (
    <div className={styles.container}>
      <h3>
        <Link href={`${process.env.HOST}/article/${name}`}>
           <a className="hover">{title}</a>
        </Link>
      </h3>
      <div>
        <span className={styles.description}>
          <span className="iconfont">&#59013;</span> {new Date(create_time).toLocaleString('zh-CN', {
            hour12: false
          }).replace(/-/g, '/')}
        </span>
        <span className={styles.description}>
          <span className="iconfont">&#xe62b;</span>
          {
            tags.map((tag, index) => {
              return (
                <span key={index}>{tag}</span>
              )
            })
          }
        </span>
      </div>
    </div>
  )
}