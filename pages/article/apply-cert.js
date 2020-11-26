import Head from 'next/head';
import Component, { yaml, toc } from '@/documents/apply-cert';
import * as fetch from '@/utils/fetch';
import Toc from '@/components/Toc';
import style from '@/styles/Article.module.scss';
import { useRef } from 'react';

export default function Article({ current }) {
  const ref = useRef();
  const onAnchorClick = (data) => {
    const anchor = ref.current.querySelector('h1,h2,h3,h4,h5,h6');
    ref.current.scrollTop = anchor.offsetTop;
  };

  return (
    <div className={style.container}>
      <div className={style.article} ref={ref}>
        {current.title}
        <Component></Component>
      </div>
      <div className={style.toc}>
        <Toc data={toc} onAnchorClick={onAnchorClick}></Toc>
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