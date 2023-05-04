import { NeutronToastContainer } from '@/components/toasts/NeutronToastContainer';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { injectStyle } from 'react-toastify/dist/inject-style';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    injectStyle();
  })
  const getLayout = Component.getLayout || ((page) => page)


  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <NeutronToastContainer />
    </>)


}
