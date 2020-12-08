import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { throttle, classNames } from '@/utils';

export default function BackTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 300) {
        setShow(true);
      } else { 
        setShow(false);
      }
    };
    checkScrollTop();

    const onScroll = throttle(() => {
      checkScrollTop();
    }, 50);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const onClick = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={classNames([styles.btn, show && styles.show])} onClick={onClick}>
      <span className="iconfont">&#58931;</span>
    </div>
  )
}