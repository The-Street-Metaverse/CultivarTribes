import '~/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { StatusProvider } from "../context/statusContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <StatusProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </StatusProvider>
    </>
  )
}

export default MyApp
