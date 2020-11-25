import Head from 'next/head';
import Component, { yaml, toc } from '../../documents/apply-cert';
import fetch from '../../utils/fetch';
import Toc from '../../components/Toc';

export default function Article({ current }) {
  return (
    <div>
      {current.title}
      article
      <Component></Component>
      <Toc data={toc}></Toc>
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