import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { AppConfig } from '@/utils/AppConfig';

class MyDocument extends Document {
  render() {
    const isProduction = process.env.NEXT_ENV === 'production';
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          {isProduction && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    if (window.location.protocol === 'http:') {
                      window.location.href = window.location.href.replace(/^http:/, 'https:');
                    }
                  })();
                `,
              }}
            />
          )}
          <meta charSet="UTF-8" key="charset" />

          <link rel="shortcut icon" href="/images/favicon/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/images/favicon/favicon-32x32.png" type="image/png" sizes="32x32" />
          <link rel="icon" href="/images/favicon/favicon-16x16.png" type="image/png" sizes="16x16" />
          <link rel="icon" href="/images/favicon/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/images/favicon/manifest.webmanifest" />

          <script
            async
            src="https://stage-app.vendigo.com/js/calculator/widget.js"
            type="application/javascript"
          />
          <script
            async
            src="https://stage-app.vendigo.com/js/widget/app.js"
            type="application/javascript"
          />

          {/* <!-- vendigo e-commerce widget cdn --> */}
          <script
            async
            src="https://stage-app.vendigo.com/js/widget/app.js"
            type="application/javascript"
          />
          {/* <script src="path/to/vendigo-calculator-widget.js" async /> */}
          <script
            async
            rel="preload dns-prefetch preconnect"
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossOrigin="anonymous"
          />
          <script
            rel="preload dns-prefetch preconnect"
            type="text/javascript"
            src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
            async
          />

          <Script rel="preload dns-prefetch preconnect" id="mfq" type="text/javascript" strategy="beforeInteractive">
            {`window._mfq = window._mfq || [];
(function() {
var mf = document.createElement("script");
mf.type = "text/javascript"; mf.defer = true;
mf.src = "//cdn.mouseflow.com/projects/fe0ec5de-ef5b-407f-982e-483b87cc72eb.js";
document.getElementsByTagName("head")[0].appendChild(mf);
})();`}
          </Script>


          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

          <link rel='preload' as='style' href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' />
        </Head>

        <body className='body'>

          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
