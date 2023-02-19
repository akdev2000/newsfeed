import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContent } from "../components/NewsContent";
import { api_url } from "../helpers/utils";

export function Home() {
  const [page, setPage] = useState(0);
  const [newsInfo, setNewsInfo] = useState({} as any);
  useEffect(() => {
    fetch(`${api_url}/search?page=${page}`)
      .then((res) => res.json())
      .then((news) => {
        setNewsInfo(news);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    console.log(newsInfo);
  }, [newsInfo]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5 bg-[#ff6600]">
        <div className="flex space-x-1 p-0.5">
          <img src="y18.gif" className="border-2" />
          <div className="flex items-center space-x-1">
            <div>
              <strong>Hacker News</strong>
            </div>
            <div className="ml-3 flex items-center space-x-1">
              <a>new</a>
              <p> | </p>
              <a>search</a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6ef] w-4/5 p-2">
        {newsInfo?.hasOwnProperty("hits") ? (
          newsInfo?.hits?.map((news: any, index: number) => {
            return <NewsContent newsInfo={news} key={index} id={index + 1} />;
          })
        ) : (
          <p>Cannot load news !!!</p>
        )}
      </div>
    </div>
  );
}
