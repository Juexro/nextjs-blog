import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <script dangerouslySetInnerHTML={{__html: `window.addEventListener('load', function() { document.body.className=""; })`}}></script>
        <body className="preload">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;