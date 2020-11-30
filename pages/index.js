import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import * as fetch from '@/utils/fetch';
import Profile from '@/components/Profile';
import ArticleCard from '@/components/ArticleCard';
import Navigator from '@/components/Navigator';

export default function Home({ documents }) {
  return (
    <div className="root">
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
      <div className="right-side">
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