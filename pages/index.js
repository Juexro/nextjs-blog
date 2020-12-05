import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import * as fetch from '@/utils/fetch';
import Profile from '@/components/profile';
import ArticleCard from '@/components/article-card';
import Navigator from '@/components/navigator';
import Footer from '@/components/footer';

export default function Home({ documents }) {
  return (
    <div className="root">
      <Head>
        <title>首页 - Juexro's Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content=""></meta>
      </Head>
      <div className="left-side">
        <Profile></Profile>
        <Navigator></Navigator>
      </div>
      <div className={styles.container}>
        <div className={styles.full}>
          {
            documents.map((document, index) => {
              return (
                <ArticleCard key={index} data={document}></ArticleCard>
              )
            })
          }
        </div>
        <Footer></Footer>
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