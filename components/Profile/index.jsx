import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.note}>Juexro's Notes</div>
        <div className="font-xs-size">Quick notes</div>
      </div>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src="/avatar.jpg" alt=""/>
        </div>
        <div className={styles.name}>Juexro</div>
        <div className={styles.position}>Web Developer</div>
        <div className={styles.location}>
          <span className="iconfont">&#59247;</span> Su Zhou, China
        </div>
      </div>

      <div className={styles.row}>
        <a className={styles.link} href="https://github.com/Juexro" target="_blank">
          <span className="iconfont">&#58999;</span>
        </a>
        <a className={styles.link} href="mailto://juexro@163.com" target="_blank">
          <span className="iconfont">&#58887;</span>
        </a>
      </div>
    </div>
  )
}