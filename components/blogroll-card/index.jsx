import React from 'react';
import styles from './style.module.scss';
import { classNames } from '@/utils';

export default function BlogrollCard(props) {
  const { name, avatar, description, link, className, ...rest } = props;

  return (
    <a className={classNames([styles.container, className])} href={link} target="_blank" {...rest}>
      <img className={styles.avatar} src={avatar} alt=""/>
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </a>
  )
}