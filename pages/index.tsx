import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Sidebar from "@/components/sidebar";
import Feed from "@/components/feed";
import Widget from "@/components/widget";
//import styles from "@/styles/Home.module.css";

//const inter = Inter({ subsets: ["latin"] });
import { HomeProps } from "@/type/postType";

export default function Home({ newsData }: HomeProps) {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/twitter_logo.svg" />
      </Head>
      <main className="flex min-h-screen mx-auto ">
        {/** sidebar here */}
        <Sidebar />
        {/** Feed Section */}
        <Feed />
        {/** Widgets */}
        <Widget newsData={newsData.articles} />
      </main>
    </>
  );
}

// https://saurav.tech/NewsAPI/top-headlines/category/health/in.json
export async function getServerSideProps() {
  const newsData = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
  return {
    props: {
      newsData,
    },
  };
}
