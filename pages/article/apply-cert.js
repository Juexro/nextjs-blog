import Head from 'next/head';
import Link from 'next/link';
import Component, { yaml, toc } from '@/documents/apply-cert';
import * as fetch from '@/utils/fetch';
import Toc from '@/components/Toc';
import ArticleCopyright from '@/components/ArticleCopyright';
import style from '@/styles/Article.module.scss';
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
      <div className={style.container} ref={ref}>
        <div className={style.article}>
          {current.title}
          <Component></Component>
          <ArticleCopyright></ArticleCopyright>
          <div>
            {
              prev && (
                <div>上一篇 <Link href={`/article/${prev.name}`}>{prev.title}</Link></div>
              )
            }
            {
              next && (
                <div>下一篇 <Link href={`/article/${next.name}`}>{next.title}</Link></div>
              )
            }
          </div>
        </div>
        <div className={style.toc}>
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

export async function getStaticProps({ params }) {
  const name = 'apply-cert';
  const response = await fetch.get(`/article/${name}`);
  return {
    props: response.data,
  }
}