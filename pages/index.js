import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import * as fetch from '@/utils/fetch';
import ArticleCard from '@/components/article-card';
import Navigator from '@/components/navigator';
import Footer from '@/components/footer';
import config from '@/config';

export default function Home({ documents }) {
  const { name } = config.profile || {};
  return (
    <div className="root">
      <Head>
        <title>首页 - {name}'s Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content=""></meta>
      </Head>
      <div className="left-side">
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