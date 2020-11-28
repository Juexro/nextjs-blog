import Head from 'next/head';
import Link from 'next/link';
import Component, { yaml, toc } from '@/documents/apply-cert';
import * as fetch from '@/utils/fetch';
import Toc from '@/components/Toc';
import Profile from '@/components/Profile';
import ArticleCopyright from '@/components/ArticleCopyright';
import styles from '@/styles/Article.module.scss';
import { useRef } from 'react';

export default function Article({ prev, current, next }) {
  const ref = useRef();
  const onAnchorClick = (data) => {
    const anchor = ref.current.querySelectorAll('h1,h2,h3,h4,h5,h6')[data.i];
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
      // ref.current.scrollTo({ top: anchor.offsetTop - 32,  behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      <div className="profile">
        <Profile></Profile>
      </div>
      <div className={styles.container} ref={ref}>
        <div className={styles.article}>
          {current.title}
          <Component></Component>
          <ArticleCopyright></ArticleCopyright>
          
          <div className={styles.turns}>
            <div className={styles.turn}>
              {
                prev && (
                  <>
                    <span className="iconfont">&#xe62c;</span>
                    <Link href={`/article/${prev.name}`}>{prev.title}</Link>
                  </>
                )
              }
            </div>
            <div className={styles.turn}>
              {
                next && (
                  <>
                    <Link href={`/article/${next.name}`}>{next.title}</Link>
                    <span className="iconfont">&#xe62d;</span>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.toc}>
          <Toc data={toc} onAnchorClick={onAnchorClick}></Toc>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const name = 'apply-cert';
  const response = await fetch.get(`/article/${name}`);

  const { tags, create_time } = response.data.current;
  const paths = [];

  if (tags) {
    paths.push(...(Array.isArray(tags) ? tags : [tags]).map(tag => {
      return {
        params: {
          name,
          tag
        }
      }
    }));
  }

  if (create_time) {
    const date = new Date(create_time);
    paths.push({
      params: {
        name,
        archive: `${date.getFullYear()}${date.getMonth() + 1}`
      }
    });
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps() {
  const name = 'apply-cert';
  const response = await fetch.get(`/article/${name}`);
  return {
    props: response.data,
  }
}