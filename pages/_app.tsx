import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import styles from "../styles/loading-dots.module.css";
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-DEZ0CL919K">
      </Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
        function gtag() {dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-DEZ0CL919K', {
          page_path: window.location.pathname,
        });`}
      </Script>
      <Component {...pageProps} />
    </>)
}
