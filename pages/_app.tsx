import type { AppProps } from 'next/app';
import '../node_modules/bootstrap/scss/bootstrap.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
export default MyApp;
