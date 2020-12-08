import React from 'react';
import styles from './style.module.scss';
import config from '@/config';

export default function Footer() {
  return (
    <footer className={styles.footer} dangerouslySetInnerHTML={{__html: config.footer}}>

    </footer>
  )
}