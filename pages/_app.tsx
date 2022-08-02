import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useIsSSR from '../hooks/useIsSSR';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  const isSSR = useIsSSR();
  if (isSSR) return null;

  return (
    <div>
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
  );
}

export default MyApp;
