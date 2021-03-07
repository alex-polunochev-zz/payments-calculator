import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

export default class WebappDocument extends Document {
  render() {
    return (
      <Html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Work around Material UI and Styled Components stylesheets SSR
WebappDocument.getInitialProps = async (ctx) => {
  const materialUiSheets = new MaterialUiServerStyleSheets();
  const styledComponentSheet = new StyledComponentSheets();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
        enhanceComponent: (Component) => Component
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentSheet.getStyleElement()}
          {materialUiSheets.getStyleElement()}
        </>
      )
    };
  } finally {
    styledComponentSheet.seal();
  }
};
