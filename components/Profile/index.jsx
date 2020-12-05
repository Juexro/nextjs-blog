import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';
import config from '@/config';

export default function Profile() {
  const { name, avatar, github, email, location, position } = config.profile || {};

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.note}>{`${name}'s Notes`}</div>
        <div className="font-xs-size">Quick notes</div>
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
        <a className={styles.link} href={github} target="_blank">
          <span className="iconfont">&#58999;</span>
        </a>
        <a className={styles.link} href={`mailto:${email}`} target="_blank">
          <span className="iconfont">&#58887;</span>
        </a>
      </div>
    </div>
  )
}