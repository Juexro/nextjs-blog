import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import * as fetch from '@/utils/fetch';
import Profile from '@/components/Profile';

export default function Home({ documents }) {
  return (
    <div className="container">
      <div className="profile">
        <Profile></Profile>
      </div>
      <div className={styles.container}>
        {
          documents.map(({ name, title }, index) => {
            return (
              <div key={index}>
                <Link href={`${process.env.HOST}/article/${name}`}>{title}</Link>
              </div>
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