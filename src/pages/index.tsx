import React, { useEffect, useState } from "react";
import { Link, Router } from "react-router-dom";
import { NewsContent } from "../components/NewsContent";
import { api_url } from "../helpers/utils";

const pageSize = 30;

export function Home() {
  const [page, setPage] = useState(0);
  const [newsInfo, setNewsInfo] = useState({} as any);
  const currentRef = React.createRef();
  useEffect(() => {
    fetch(`${api_url}/search_by_date?tags=story&hitsPerPage=30&page=${page}`)
      .then((res) => res.json())
      .then((news) => {
        setNewsInfo(news);
      })
      .catch((err) => {});
  }, [page]);

  useEffect(() => {
    console.log(newsInfo);
  }, [newsInfo]);
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <div className="w-4/5 bg-[#ff6600]">
        <div className="flex space-x-1 p-0.5">
          <img src="y18.gif" className="border-2" />
          <div className="flex items-center space-x-1">
            <div>
              <strong>Hacker News</strong>
            </div>
            <div className="ml-3 flex items-center space-x-1">
              <a className="text-[#fff]" >new</a>
              <p> | </p>
              <Link to="/search" >search</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f6f6ef] w-4/5 pt-2 pb-2">
        {newsInfo?.hasOwnProperty("hits") ? (
          newsInfo?.hits?.map((news: any, index: number) => {
            return (
              <NewsContent
                newsInfo={news}
                key={index}
                id={page * pageSize + index + 1}
              />
            );
          })
        ) : (
          <p>Loading ...</p>
        )}
        <div className="ml-10 cursor-pointer">
          {!newsInfo?.exhaustiveNbHits && newsInfo?.hasOwnProperty("hits") && (
            <a
              onClick={() => {
                setPage(page + 1);
                if (window) {
                  window?.scrollTo(0, 0);
                }
              }}
            >
              More
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
