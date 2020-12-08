import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styles from '../styles/Blogroll.module.scss';
import Navigator from '@/components/navigator';
import Footer from '@/components/footer';
import BlogrollCard from '@/components/blogroll-card';
import config from '@/config';

const GitalkComponent = dynamic(() => import('gitalk/dist/gitalk-component'))
const { accessToken, ...gitalkOptions } = config.gitalk || {};
export default function Blogroll() {
  const router = useRouter();
  const { name } = config.profile || {};
  const blogrolls = config.blogrolls || [];

  return (
    <div className="root">
      <Head>
        <title>友情链接 - {name}'s Notes</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content=""></meta>
      </Head>
      <div className="left-side">
        <Navigator></Navigator>
      </div>
      <div className={styles.container}>
        <div className={styles.full}>
          <h1 className={styles.title}>友情链接</h1>
          <h5 className={styles.description}>欢迎交换链接，可在当前页面留言</h5>
          <div className={styles.blogrolls}>
            {
              blogrolls.map((blogroll, index) => {
                return (
                  <BlogrollCard key={index} className={styles.blogroll} {...blogroll}></BlogrollCard>
                )
              })
            }
          </div>
          {
            process.browser && config.gitalk && (
              <GitalkComponent options={{
                ...gitalkOptions,
                id: `${process.env.NEXT_PUBLIC_HOST}${router.pathname}`
              }} />
            )
          }
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}
