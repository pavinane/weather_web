"use client";
import LeftCard from "./components/LeftCard";
import Head from "next/head";
import RightCard from "./components/RightCard";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-between text-black `}>
      <Head>
        <title>Weather</title>
        <meta
          name="weather web appliction"
          content="checking weather for perticulat city "
        />
      </Head>
      <div className="flex justify-between bg-[#f6f6f8]  rounded-xl  ">
        <div className="left bg-[#fff]  rounded-l-xl ">
          <LeftCard />
        </div>
        <div className="right p-6  w-full ">
          <RightCard />
        </div>
      </div>
    </main>
  );
}
