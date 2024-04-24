import LeftCard from "./components/LeftCard";
import Head from "next/head";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col justify-between `}>
      <Head>
        <title>Weather</title>
        <meta
          name="weather web appliction"
          content="checking weather for perticulat city "
        />
      </Head>
      <div className="flex justify-between bg-[#f6f6f8]  rounded-xl  ">
        <div className="left bg-[#fff]  rounded-l-xl w-1/3 ">
          <LeftCard />
        </div>
        <div className="right ">right</div>
      </div>
    </main>
  );
}
