import { useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Tag.module.scss';
import * as fetch from '@/utils/fetch';
import Navigator from '@/components/navigator';
import Footer from '@/components/footer';
import config from '@/config';
import BackTop from '@/components/back-top';
import Link from 'next/link';

export default function Tags({ data }) {
  const { name } = config.profile || {};
  const onAnchorClick = (index) => {
    const anchor = document.querySelectorAll(`.${styles.list}`)[index];
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="root">
      <BackTop />
      <Head>
        <title>标签云 - {name}'s Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content=""></meta>
      </Head>
      <div className="left-side">
        <Navigator></Navigator>
        <div className={styles.sticky}>
          {
            data.map((item, index) => {
              return (
                <div className={styles.anchor} key={index} onClick={() => { onAnchorClick(index) }}>{item.tag}</div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.full}>
          <h1 className={styles.title}>标签云</h1>
          {
            data.map((item, index) => {
              return (
                <div key={index} className={styles.list}>
                  <div><span className="iconfont">&#58923;</span> {item.tag}</div>
                  <div>
                    {
                      item.articles.map((article, index) => {
                        const { title, name } = article;
                        return (
                          <div key={index}>
                            <Link href={`/article/${name}`}>
                              <a className="link">
                                {title}
                              </a>
                            </Link>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
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
  const response = await fetch.get(`/tags`);
  return {
    props: {
      data: response.data
    },
  }
}