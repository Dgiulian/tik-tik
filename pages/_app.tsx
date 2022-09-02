import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useIsSSR from '../hooks/useIsSSR';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  const isSSR = useIsSSR();
  if (isSSR) return null;

  if (!process.env.NEXT_PUBLIC_OAUTH_TOKEN)
    throw new Error('OAuth token not found');

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_OAUTH_TOKEN}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
