import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import Component, { yaml, toc } from '@/documents/$ARTICLE';
import * as fetch from '@/utils/fetch';
import Toc from '@/components/toc';
import Profile from '@/components/profile';
import Navigator from '@/components/navigator';
import ArticleCopyright from '@/components/article-copyright';
import Footer from '@/components/footer';
import styles from '@/styles/Article.module.scss';
import { useRef } from 'react';

const GitalkComponent = dynamic(() => import('gitalk/dist/gitalk-component'))

export default function Article({ prev, current, next }) {
  const router = useRouter();
  const { create_time, title, tags, keywords = [] } = current;
  const ref = useRef();
  const onAnchorClick = (data) => {
    const anchor = ref.current.querySelectorAll('h1,h2,h3,h4,h5,h6')[data.i + 1];
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="root">
      <Head>
        <title>{`${title} - Juexro's Notes`}</title>
        <meta name="keywords" content={keywords.join(',')}></meta>
      </Head>
      <div className="left-side">
        <Profile></Profile>
        <div className={styles.sticky}>
          <Navigator></Navigator>
          <Toc data={toc} onAnchorClick={onAnchorClick}></Toc>
        </div>
      </div>
      <div className={styles.container} ref={ref}>
        <div className={styles.article}>
          <div className={styles.header}>
            <h1 className={styles.title}>{current.title}</h1>
            <div>
              <span className={styles.description}>
                <span className="iconfont">&#59013;</span> {new Date(create_time).toLocaleString('zh-CN', {
                  hour12: false
                }).replace(/-/g, '/')}
              </span>
              <span className={styles.description}>
                <span className="iconfont">&#xe62b;</span>
                {
                  tags.map((tag, index) => {
                    return (
                      <span key={index}>{tag}</span>
                    )
                  })
                }
              </span>
            </div>
          </div>

          <Component></Component>
          <ArticleCopyright></ArticleCopyright>
          
          <div className={styles.turns}>
            <div className={`${styles.turn} hover`}>
              {
                prev && (
                  <>
                    <span className="iconfont">&#xe62c;</span>
                    <Link href={`/article/${prev.name}`}>{prev.title}</Link>
                  </>
                )
              }
            </div>
            <div className={`${styles.turn} hover`}>
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
        <Footer></Footer>
      </div>
    </div>
  )
}

// export async function getStaticPaths() {
//   const name = '$ARTICLE';
//   const response = await fetch.get(`/article/${name}`);

//   const { tags, create_time } = response.data.current;
//   const paths = [];

//   if (tags) {
//     paths.push(...(Array.isArray(tags) ? tags : [tags]).map(tag => {
//       return {
//         params: {
//           name,
//           tag
//         }
//       }
//     }));
//   }

//   if (create_time) {
//     const date = new Date(create_time);
//     paths.push({
//       params: {
//         name,
//         archive: `${date.getFullYear()}${date.getMonth() + 1}`
//       }
//     });
//   }

//   return {
//     paths,
//     fallback: false,
//   }
// }

export async function getStaticProps() {
  const name = '$ARTICLE';
  const response = await fetch.get(`/article/${name}`);
  return {
    props: response.data,
  }
}