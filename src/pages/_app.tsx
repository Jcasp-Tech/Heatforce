import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@splidejs/react-splide/css';
import '../styles/Pages/Navbar.module.scss';
import '../styles/Pages/FirstSection.module.scss';
import '../styles/Pages/SecondSection.module.scss';
import '../styles/Pages/VideoPage.module.scss';
import '../styles/Pages/FifthSection.module.scss';
import '../styles/Pages/GroupSlider.module.scss';
import '../styles/Pages/FooterSection.module.scss';

import type { AppProps } from 'next/app';
import App from 'next/app';
import type { AppContextType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useStore } from 'react-redux';

import Pixel from '@/components/Pixel';
import { DefaultSkeleton } from '@/components/theme';
import { LayoutContextProvider } from '@/contexts/layoutContext';
import { getLoginUser } from '@/redux/services/auth.api';
import {
  loginReset,
  loginUserFail,
  loginUserReset,
  loginUserSuccess,
} from '@/redux/slices/auth';
import { wrapper } from '@/redux/store';
import { API, nextRedirect } from '@/utils/helpers';
import Intercom from '@intercom/messenger-js-sdk';
// import Script from 'next/script';
// Typography: Roboto (primary) + Montserrat (secondary) loaded in _document.tsx
// import MaintenancePage from '../components/MaintenanceComponent/MaintenancePage';

const Noop = ({ children }: { children: JSX.Element }) => children;

const MyApp = ({
  Component,
  Component: { Layout = Noop, ...restLayoutProps },
  pageProps,
  pathNameProps,
}: AppProps | any): JSX.Element => {

  // Intercom must run only in the browser (SSR/static export has no window)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Intercom({ app_id: 'zv64k8s5' });
    }
  }, []);

  const queryClient = new QueryClient();

  const { statusCode = 200 } = pageProps || {};
  const pathName = pathNameProps ?? '';
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore();

  Router.events.on('routeChangeStart', (/* url */) => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });
  Router.events.on('routeChangeError', () => {
    setIsLoading(false);
  });

  // const MaintenancePageVal:any = process.env.NEXT_MAINTENANCE_MODE;
  // if(MaintenancePageVal === "on"){
  //   return (
  //   <MaintenancePage/>
  //   );    
  // }

  return (
    <>
      <Head>
        <title>
          {pathName.length > 1
            ? `${pathName} | CES Solar`
            : ' CES Solar'}
        </title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
          key="viewport"
        />

        {pathName === ' Quote Results' && (
          <>
            <meta
              name="keywords"
              content="Consumer Energy Solutions, Solar panel, solar Installation, Solar services, Sustainable energy, Eco-friendly products."
            />
            <meta
              name="description"
              content="Take our Solar Survey for a personalized solar experience! Answer a few questions about your energy requirements, and receive expert recommendations for the best solar panels, batteries, and inverters tailored to your needs."
            />
            <meta
              name="image"
              property="og:image"
              content="https://solarshopsite.jcasptechnologies.com/images/quote.webp"
            />
          </>
        )}
        {(pathName !== ' ' ||
          pathName === ' Survey' ||
          pathName === ' About Us' ||
          pathName === ' Our Products' ||
          pathName === ' Contact Us' ||
          pathName === ' Faq' ||
          pathName === ' deposit-goods-advance' ||
          pathName === ' complaints-procedure' ||
          pathName === ' Privacy Policy') &&
          (pathName === ' Quote Results' && (
            <>
              <meta
                name="keywords"
                content="Consumer Energy Solutions, Solar panel, solar Installation, Solar services, Sustainable energy, Eco-friendly products."
              />
              <meta
                name="description"
                content="Take our Solar Survey for a personalized solar experience! Answer a few questions about your energy requirements, and receive expert recommendations for the best solar panels, batteries, and inverters tailored to your needs."
              />
              <meta
                name="image"
                property="og:image"
                content="https://solarshopsite.jcasptechnologies.com/images/home.webp"
              />
            </>
          ))}
        <script defer id="zappr_chat_bot" src="/scripts/zappr_chat_bot.js" />
        <script defer src="https://static.zappr.ai/static/widget-pro/embed-v1.0.0.min.js"/>
        <script defer id="google_tag_manager" src="/scripts/google_tag_manager.js" />
      </Head>
      <Pixel />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <LayoutContextProvider>
              {statusCode === 200 && (
                <Layout {...restLayoutProps}>
                  {isLoading && (
                    <div>
                      <DefaultSkeleton isContent />
                    </div>
                  )}
                  {!isLoading && <Component {...pageProps} />}
                </Layout>
              )}
            </LayoutContextProvider>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext: AppContextType | any) => {
    const { ctx } = appContext;
    let appProps: any = {};
    const pathNameProps = ctx.pathname
      ?.replaceAll('/', ' ')
      .replaceAll('-', ' ')
      .replaceAll('[code]', '')
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    if (appContext.ctx.req) {
      const cookies = new Cookies(ctx.req.headers.cookie);
      const authCookies: any = cookies.get('authApp');
      // Server Side Axios Setup.
      const axiosInstance = API(true);
      axiosInstance.interceptors.request.use(
        (c: any) => {
          if (authCookies?.token) {
            c.headers.authorization = `Bearer ${authCookies?.token}`;
          }
          return c;
        },
        (error: any) => {
          // Do something with request error
          return Promise.reject(error);
        }
      );

      // This Line will trigger component level getInitialProps
      appProps = await App.getInitialProps(appContext);
      const statusCode = appProps?.pageProps?.statusCode || 200;

      if (statusCode === 404) {
        if (ctx.pathname === '/404') {
          nextRedirect({ ctx, location: '/404' });
        }
      }

      if (statusCode < 400) {
        const redirectUrls = [
          '/404',
          '/',
          '/about-us',
          '/privacy-policy',
          '/cookie-policy',
          '/resultPagePopup',
          '/requestHelpPopup',
          '/saveEstimationProgressPopup',
          '/letsTalkItThroughPopup',
          '/financeCalculatorPopup',
          '/solarSavingsPopup',
          '/primaryProductImageSpliderPopup',
          '/survey',
          '/quote/results/[code]',
          '/save/[code]',
          '/faq',
          '/contact-us',
          '/thankyou',
          '/cancellation-policy',
          '/finalForm',
          '/package-detail',
          '/deposit-goods-advance',
          '/complaints-procedure'
        ];
        if (redirectUrls.indexOf(ctx.pathname) === -1) {
          nextRedirect({ ctx, location: '/' });
        }
      }
      // Fill data of loginUser in redux from Serverside.
      if (authCookies?.token) {
        try {
          const loginUser = await getLoginUser({
            Authorization: `Bearer ${authCookies?.session?.token}`,
          });

          // Redirect to onboarding if it's not completed
          store.dispatch(loginUserSuccess(loginUser));
        } catch (e: any) {
          store.dispatch(loginUserFail(e.message));
          store.dispatch(loginReset());
          store.dispatch(loginUserReset());
        }
      }
    } else {
      appProps = await App.getInitialProps(appContext);

      const statusCode = appProps?.pageProps?.statusCode || 200;

      if (statusCode === 404) {
        if (ctx.pathname === '/404') {
          nextRedirect({ ctx, location: '/404' });
        }
      }
      const redirectUrls = [
        '/404',
        '/',
        '/about-us',
        '/privacy-policy',
        '/cookie-policy',
        '/survey',
        '/result',
        '/quote/results/[code]',
        '/faq',
        '/contact-us',
        '/save/[code]',
        '/thankyou',
        '/deposit-goods-advance',
        '/complaints-procedure',
        '/cancellation-policy',
      ]

      if (redirectUrls.indexOf(ctx.pathname) === -1) {
        nextRedirect({ ctx, location: '/' });
      }
    }


    return { ...appProps, pathNameProps };
  }
);


export default wrapper.withRedux(MyApp);
