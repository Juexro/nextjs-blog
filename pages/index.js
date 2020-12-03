import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import * as fetch from '@/utils/fetch';
import Profile from '@/components/profile';
import ArticleCard from '@/components/article-card';
import Navigator from '@/components/navigator';

export default function Home({ documents }) {
  return (
    <div className="root">
      <Head>
        <title>首页 - Juexro's Notes</title>
        <meta name="keywords" content=""></meta>
      </Head>
      <div className="left-side">
        <Profile></Profile>
        <Navigator></Navigator>
      </div>
      <div className={styles.container}>
        {
          documents.map((document, index) => {
            return (
              <ArticleCard key={index} data={document}></ArticleCard>
            )
          })
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch.get(`/article`);
  return {
    props: {
      documents: response.data
    },
  }
}