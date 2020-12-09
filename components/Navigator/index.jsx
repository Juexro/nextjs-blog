import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import config from '@/config';
import { classNames } from '@/utils';

export default function Navigator() {
  const [expand, setExpand] = useState(false);
  const { name, avatar, github, email, location, position } = config.profile || {};
  const links = [
    {
      icon: <span className="iconfont">&#xe6a5;</span>,
      href: '/',
      title: '首页'
    },
    {
      icon: <span className="iconfont">&#58923;</span>,
      href: '/tags',
      title: '标签云'
    },
    {
      icon: <span className="iconfont">&#59260;</span>,
      href: '/blogroll',
      title: '友情链接'
    }
  ];

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={`iconfont ${styles.btn}`} onClick={() => { setExpand(!expand)}}>&#58910;</span>
          <div className={styles.note}>{`${name}'s Notes`}</div>
          <div className={styles.snote}>Quick notes</div>
        </div>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src={avatar} alt=""/>
          </div>
          <div className={styles.name}>{name}</div>
          <div className={styles.position}>{position}</div>
          <div className={styles.location}>
            <span className="iconfont">&#59247;</span> {location}
          </div>
        </div>

        <div className={styles.row}>
          <a className={styles.icon} href={github} target="_blank">
            <span className="iconfont">&#58999;</span>
          </a>
          <a className={styles.icon} href={`mailto:${email}`} target="_blank">
            <span className="iconfont">&#58887;</span>
          </a>
        </div>
      </div>

      <ul className={classNames([styles.menu, expand && styles.expand])}>
        {
          links.map(({ href, icon, title }, index) => {
            return (
              <li key={index}>
                <Link href={href}>
                  <a className={styles.link}>
                    {icon}
                    <span className={styles.title}>{title}</span>
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