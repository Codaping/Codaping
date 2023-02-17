import "../styles/globals.css";

import { Rajdhani } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Layout } from "../common/Layout";

export const rajdhani = Rajdhani({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"] });

const MyApp = ({ Component, pageProps, session }: AppProps & { session: Session }) => {
  return (
    <div className={rajdhani.className}>
      <Head>
        <title>Codaping</title>
        <meta name="description" content="Search subject" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  );
};

export default MyApp;
