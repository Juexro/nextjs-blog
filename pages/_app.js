import smoothscroll from 'smoothscroll-polyfill';
import '../styles/reset.css';
import 'gitalk/dist/gitalk.css';
import '../styles/prism.scss';
import '../styles/global.scss';

if (process.browser) {
  smoothscroll.polyfill();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
