import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 페비콘 */}
          <link rel="shortcut icon" href="/fav1.ico" />
          {/* SEO */}
          <meta name="keyword" content="blegram, 인스타그램 클론 코딩" />
          {/* 작성자 */}
          <meta name="author" content="1-blue" />
          {/* 문자 */}
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          {/* 카카오톡, 네이버 블로그 미리보기 제공할 정보 */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="blegram" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />

          {/* 구글 폰트 */}
          {/* "jua" - https://fonts.google.com/specimen/Jua?subset=korean#standard-styles */}
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
