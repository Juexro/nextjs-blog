import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';

export default function Profile() {
  const links = [
    {
      icon: <span className="iconfont">&#xe6a5;</span>,
      href: '/',
      title: '首页'
    }
  ];

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <img className={styles.head} src="/head.jpg" alt=""/>
      </div>
      <ul className={styles.menu}>
        {
          links.map(({ href, icon, title }, index) => {
            return (
              <li key={index}>
                <Link href={href}>
                  <a className={styles.link}>
                    {icon}
                    <span className={styles.menuTitle}>{title}</span>
                  </a>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}