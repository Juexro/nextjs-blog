import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img className={styles.head} src="/head.jpg" alt=""/>
      </div>
    </div>
  )
}